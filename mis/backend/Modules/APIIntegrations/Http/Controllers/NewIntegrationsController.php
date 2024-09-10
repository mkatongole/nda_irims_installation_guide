<?php

namespace Modules\APIIntegrations\Http\Controllers;

use PDF;
use DateTime;
use DateTimeZone;
use GuzzleHttp\Client;
use \Mpdf\Mpdf as mPDF;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Modules\Reports\Traits\ReportsTrait;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use SoapClient;
use SoapFault;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Modules\Reports\Providers\PdfProvider;
use Modules\Reports\Providers\PdfLettersProvider;
use Modules\APIIntegrations\App\Models\PvPersonnel;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Modules\APIIntegrations\App\Models\WHODrugInformation;

class NewIntegrationsController extends Controller
{
    public function getApplicationInvoiceDetails(Request $req)
    {
        try {
            $invoicing_data = array();
            $invoice_no = $req->invoice_no;

            // print_r($invoice_no );
            // exit();
            $invoice_id = '';
            if (isset($invoice_no)) {
                $invoicing_data = DB::table('tra_application_invoices as t1')
                    ->join('tra_invoice_details as t2', 't1.id', 't2.invoice_id')
                    ->leftJoin('par_currencies as t3', 't2.paying_currency_id', 't3.id')
                    ->leftJoin('par_batchinvoice_types as t4', 't1.invoice_type_id', 't4.id')
                    ->select(DB::raw("SUM(t2.element_amount) as total_element_amount, SUM(t2.element_amount*t2.paying_exchange_rate) as equivalent_paid, t3.name as currency, t1.date_of_invoicing,t2.paying_exchange_rate as exchange_rate, t1.invoice_no, t1.id as invoice_id"))
                    ->groupBy('t2.invoice_id')
                    ->where(function ($query) use ($invoice_no) {
                        $query->where('t1.invoice_no', $invoice_no)
                            ->orWhereRaw("t1.invoice_no = '" . trim($invoice_no) . "'");
                    })
                    ->get();

                if ($invoicing_data->isEmpty()) {
                    $res = array(
                        'success' => false,
                        'status_code' => 400,
                        'message' => 'Invoice Details not Found!!'
                    );
                    echo json_encode($res, 200);
                    exit();
                }
                foreach ($invoicing_data as $invoice) {
                    $invoice_id = $invoice->invoice_id;
                    $application_code = $invoice->invoice_id;
                    $invoice_amt = getApplicationPaymentsRunningBalance($application_code, $invoice->invoice_id);
                    $invoice->total_balance = $invoice_amt['running_balance'];
                    if ($invoice_amt['running_balance'] > 0) {
                        $invoice->is_cleared = 0;
                    } else {
                        $invoice->is_cleared = 1;
                    }
                }

                $inv_rec = DB::table('tra_invoice_details as t1')
                    ->leftJoin('par_currencies as t2', 't1.paying_currency_id', 't2.id')
                    ->leftJoin('tra_element_costs as t3', 't1.element_costs_id', 't3.id')
                    ->leftJoin('par_cost_elements as t4', 't3.element_id', 't4.id')
                    ->leftJoin('par_fee_types as t5', 't3.feetype_id', 't5.id')
                    ->leftJoin('par_cost_categories as t6', 't3.cost_category_id', 't6.id')
                    ->select(DB::raw("concat(t5.name, '-',t6.name, '-',t4.name) AS element_costs, t1.total_element_amount AS invoice_amount,t2.name as currency_name"))
                    ->where(array('t1.invoice_id' => $invoice_id))
                    ->get();

                //concat(t5.name, '-', t6.name, '-', t3.name) 


                if ($inv_rec->isEmpty()) {
                    $res = array(
                        'success' => false,
                        'status_code' => 400,
                        'message' => 'Invoice Description not Found!!'
                    );
                    echo json_encode($res, 400);
                    exit();
                }

            }

            $res = array(
                'success' => true,
                'status_code' => 200,
                'invoicing_data' => $invoicing_data,
                'invoice_details' => $inv_rec,
                'message' => 'Invoice Details Retrieved Successfully'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res, 200);
    }


    function getOrganisationInfo()
    {
        $org_info = DB::table('tra_organisation_information')->first();
        return $org_info;
    }

    function returnInvoiceReportHeader($pdf, $org_rec, $rec, $title)
    {
        $pdf->Cell(0, 25, '', 0, 1);
        $pdf->SetFont('times', 'B', 9);
        // Left column content
        $pdf->MultiCell(80, 10, "$org_rec->postal_address,\n$org_rec->physical_address,\n$org_rec->region_name , $org_rec->republic\nPhone No: $org_rec->telephone_nos\nHome Page: $org_rec->website\nTIN No: $org_rec->tin_no", 0, 'L', false, 0, '', '', true);

        // Center column content
        $pdf->SetX(90);
        $pdf->SetFont('times', 'B', 12);
        $pdf->MultiCell(60, 10, "\n\n\n" . strtoupper($title), 0, 'L', false, 0, '', '', true);

        // Right column content
        $pdf->SetX(150);
        $pdf->SetFont('times', 'B', 9);
        $date_of_invoicing = date('F d\\, Y', strtotime($rec->date_of_invoicing));
        $invoice_no = 'Invoice No: ' . $rec->invoice_no;
        if ($rec->module_id == 2 || $rec->module_id === 2 || $rec->module_id == 29 || $rec->module_id === 29) {

            $premise_ref_no = getSingleRecordColValue('tra_premises_applications', array('application_code' => $rec->application_code), 'premise_ref_no');

            if ($premise_ref_no == '') {
                $premise_ref_no = getSingleRecordColValue('wb_premises_applications', array('application_code' => $rec->application_code), 'premise_ref_no', 'portal_db');
            }
            $ref_no = 'Premise Ref No: ' . $premise_ref_no . ' ' . $rec->tracking_no;
        } else {
            $ref_no = 'Application No: ' . $rec->tracking_no . ' ' . $rec->reference_no;
        }
        $invoice_date = 'Invoice Date: ' . $date_of_invoicing;
        $invoice_expiry_date = 'Invoice Expiry Date: ' . $date_of_invoicing;
        $pdf->MultiCell(60, 10, "\n\n\n$invoice_no\n$ref_no\n$invoice_date\n$invoice_expiry_date", 0, 'L', false, 1, '', '', true);

        $pdf->SetFont('times', 'B', 13);
        if (isset($rec->invoice_no)) {
            $data = '{"invoice_no":' . $rec->invoice_no . ',"module_id":' . $rec->module_id . ',"application_code":' . $rec->application_code . '}';
        } else {
            $data = '{"receipt_no":' . $rec->receipt_no . ',"module_id":' . $rec->module_id . ',"application_code":' . $rec->application_code . '}';

        }

        $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);

        $pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
        $pdf->SetFont('times', 'B', 11);

    }

    public function viewApplicationInvoice(Request $request)
    {
        $invoice_id = $request->input('invoice_id');
        $invoice_no = $request->input('invoice_no');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        if (!validateIsNumeric($module_id)) {
            $module_details = getTableData('sub_modules', array('id' => $sub_module_id));
            if ($module_details) {
                $module_id = $module_details->module_id;

            }

        }

        if (isset($invoice_no)) {
            $invoice_record = DB::table('tra_application_invoices')->where(function ($query) use ($invoice_no) {
                $query->where('invoice_no', $invoice_no)
                    ->orWhereRaw("invoice_no = '" . trim($invoice_no) . "'");
            })->first();
            if ($invoice_record) {
                $invoice_id = $invoice_record->id;
                $module_id = $invoice_record->module_id;
                $application_code = $invoice_record->application_code;
            }
        }
        $invoice_details = getInvoiceDetails($module_id, $application_id, $application_code);
        $app_description = '';
        if (isset($invoice_details)) {
            $app_description = $invoice_details['module_desc'];
        }
        //check the paymetn Control Number 
        $rec = DB::table('tra_application_invoices as t1')
            ->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
            ->leftJoin('par_countries as t3', 't2.country_id', 't3.id')
            ->leftJoin('par_regions as t4', 't2.region_id', 't4.id')
            ->leftJoin('modules as t5', 't1.module_id', 't5.id')
            ->leftJoin('sub_modules as t6', 't1.sub_module_id', 't6.id')
            ->select('t1.*', 't2.identification_no', 't2.name as applicant_name', 't2.postal_address', 't2.email', 't3.name as country_name', 't4.name as region_name', 't5.name as module_name', 't6.name as sub_module')
            ->where(array('t1.id' => $invoice_id))->first();
        if ($rec) {
            $PayCntrNum = $rec->PayCntrNum;

            $params = array(
                'invoice_id' => $invoice_id,
                'application_code' => $application_code
            );

            $org_info = $this->getOrganisationInfo();
            $pdf = new PdfLettersProvider();
            $pdf->AddPage();
            $template_url = base_path('/');
            $pdf->setSourceFile($template_url . "resources/templates/certificate_template.pdf");
            // import page 1
            $tplId = $pdf->importPage(1);
            $pdf->useTemplate($tplId, 0, 0);
            $pdf->setPageMark();


            $pdf->SetFont('times', 'B', 9);
            $pdf->Cell(0, 1, '', 0, 1);
            $pdf->setPrintHeader(false);
            $pdf->setPrintFooter(false);

            $org_rec = getSingleRecord('tra_organisation_information', array('id' => 1));
            $logo = getcwd() . '/resources/images/org-logo.jpg';
            $pdf->SetFont('times', 'B', 12);

            $this->returnInvoiceReportHeader($pdf, $org_rec, $rec, 'PROFORMA INVOICE');


            $pdf->Cell(0, 7, 'To:', 0, 1);
            $pdf->SetFont('times', '', 11);
            $pdf->Cell(0, 7, 'Customer No:' . $rec->identification_no, 0, 1);
            $pdf->Cell(0, 7, $rec->applicant_name, 0, 1);
            $pdf->Cell(0, 7, $rec->postal_address . ', ' . $rec->region_name . ', ' . $rec->country_name, 0, 1);
            $pdf->Cell(0, 7, $rec->email, 0, 1);
            $pdf->SetFont('times', 'B', 11);

            $pdf->Cell(0, 7, 'Invoice Details for ' . $rec->module_name . ' (' . $rec->sub_module . ') ' . $app_description, 0, 1, '');
            $pdf->SetFont('times', 'B', 11);

            $pdf->SetLineWidth(0.1);
            //invoice details 
            $pdf->Cell(15, 10, 'QTY', 1, 0);
            $pdf->Cell(100, 10, 'IN RESPECT OF', 1, 0, 'C');
            $pdf->Cell(40, 10, 'RATE', 1, 0, 'C');
            $pdf->Cell(0, 10, 'AMOUNT', 1, 1, 'C');
            $inv_rec = DB::table('tra_invoice_details as t1')
                ->leftJoin('par_currencies as t2', 't1.paying_currency_id', 't2.id')
                ->leftJoin('tra_element_costs as t3', 't1.element_costs_id', 't3.id')
                ->leftJoin('par_cost_elements as t4', 't3.element_id', 't4.id')
                ->leftJoin('par_fee_types as t5', 't3.feetype_id', 't5.id')
                ->leftJoin('par_cost_categories as t6', 't3.cost_category_id', 't6.id')
                ->select(DB::raw(" t4.name AS cost_element, t5.name AS fee_type, t6.name AS cost_category, t1.total_element_amount AS invoice_amount, t1.paying_currency_id,t2.name as currency_name"))
                ->where(array('t1.invoice_id' => $invoice_id))
                ->get();

            if ($inv_rec) {


                $i = 1;
                $total_amount = 0;
                $currency_name = '';
                $paying_currency_id = '';
                $pdf->SetFont('times', '', 11);
                foreach ($inv_rec as $inv) {
                    $currency_name = $inv->currency_name;
                    $cost_item = $inv->fee_type . " " . $inv->cost_category . " " . $inv->cost_element;
                    $paying_currency_id = $inv->paying_currency_id;
                    $rowcount = max($pdf->getNumLines($cost_item, 92), $pdf->getNumLines($inv->invoice_amount, 40));
                    $pdf->MultiCell(15, 7 * $rowcount, $i, 1, '', 0, 0);
                    $pdf->MultiCell(100, 7 * $rowcount, $cost_item, 1, '', 0, 0);
                    $pdf->MultiCell(40, 7 * $rowcount, formatMoney($inv->invoice_amount), 1, 'R', 0, 0);
                    $pdf->MultiCell(0, 7 * $rowcount, formatMoney($inv->invoice_amount), 1, 'R', 0, 1);
                    $total_amount = $total_amount + $inv->invoice_amount;

                    $i++;
                }

                $pdf->MultiCell(155, 10, 'Sub-Total(' . $currency_name . ')', 1, 'R', 0, 0);
                $pdf->MultiCell(0, 10, formatMoney($total_amount), 1, 'R', 0, 1);

                $pdf->MultiCell(155, 10, 'Total(' . $currency_name . ')', 1, 'R', 0, 0);
                $pdf->MultiCell(0, 10, formatMoney($total_amount), 1, 'R', 0, 1);

            }


            //get the Bank Details based on the paying currency
            if (!validateisNumeric($module_id)) {
                $module_id = $rec->module_id;
            }
            if ($module_id == 2 || $module_id === 2 || $module_id == 29 || $module_id === 29) {

                $region_id = getSingleRecordColValue('tra_premises_applications', array('application_code' => $application_code), 'region_id');

                if (!validateisNumeric($region_id)) {
                    $region_id = getSingleRecordColValue('wb_premises_applications', array('application_code' => $application_code), 'region_id', 'portal_db');
                }
                $bank_rec = DB::table('tra_orgbank_accounts as t1')
                    ->leftJoin('par_banks as t2', 't1.bank_id', 't2.id')
                    ->leftJoin('par_bankbranches as t3', 't1.branch_id', 't3.id')
                    ->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                    ->select(DB::raw("t4.name as currency_name, t1.account_name, t1.account_no, t1.swft_code, t2.name AS bank_name, t3.name AS branch_name"))
                    ->where(array('t1.is_region_tied' => 1, 't1.region_id' => $region_id))
                    ->get();

                if ($bank_rec->isEmpty()) {
                    $bank_rec = DB::table('tra_orgbank_accounts as t1')
                        ->leftJoin('par_banks as t2', 't1.bank_id', 't2.id')
                        ->leftJoin('par_bankbranches as t3', 't1.branch_id', 't3.id')
                        ->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                        ->select(DB::raw("t4.name as currency_name, t1.account_name, t1.account_no, t1.swft_code, t2.name AS bank_name, t3.name AS branch_name"))
                        ->where(array('t1.is_region_tied' => 2))
                        ->get();

                }

            } else {
                $bank_rec = DB::table('tra_orgbank_accounts as t1')
                    ->leftJoin('par_banks as t2', 't1.bank_id', 't2.id')
                    ->leftJoin('par_bankbranches as t3', 't1.branch_id', 't3.id')
                    ->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                    ->select(DB::raw("t4.name as currency_name, t1.account_name, t1.account_no, t1.swft_code, t2.name AS bank_name, t3.name AS branch_name"))
                    ->where(array('t1.is_region_tied' => 2))
                    ->get();
            }
            if ($bank_rec) {
                $pdf->ln();
                $pdf->SetFont('times', ' ', 11);
                $pdf->MultiCell(0, 7, 'Total Due in words ***' . ucwords(convert_number_to_words($total_amount)) . '(' . $currency_name . ')' . ' Only ***', 0, '', 0, 1);
                $pdf->SetFont('times', 'i', 11);
                $pdf->MultiCell(0, 7, 'The amount above is now due:', 0, '', 0, 1);
                $pdf->SetFont('times', 'B', 11);
                $i = 1;
                foreach ($bank_rec as $bank) {

                    $pdf->MultiCell(0, 7, $i . '.' . $bank->currency_name . " " . "A/C No." . $bank->account_no . '(' . $bank->bank_name . ')' . '-' . $bank->account_name, 0, '', 0, 1);
                    $i++;
                }
            }
            //$pdf->ln();
            $pdf->SetFont('times', '', 11);
            $pdf->MultiCell(0, 7, 'Payments to National Drug Authority (NDA] must be net invoice figures', 0, '', 0, 1);
            $pdf->MultiCell(0, 7, 'All Bark Charges shall be met by the payee', 0, '', 0, 1);

            $pdf->SetFont('', '', 11);
            $print_date = date('F d\\, Y', strtotime(Carbon::now()));

            $pdf->ln();

            $startY = $pdf->GetY();
            $startX = $pdf->GetX();


            // $signiture = getcwd() . '/backend/resources/templates/signatures_uploads/VK3SE1678341493.png';
            // $pdf->Image($signiture,$startX+85,$startY-7,30,12);
            // $pdf->SetFont('','',11);
            // $pdf->Cell(0,8,'Signature ............................................',0,1,'C');
            $pdf->SetFont('times', 'B', 12);
            $pdf->Cell(0, 8, 'System Generated Report', 0, 1, 'C');
            $pdf->SetFont('', '', 11);
            $pdf->Cell(0, 8, 'Printed On: ' . $print_date, 0, 1, 'C');

            $pdfContent = $pdf->Output('Proforma Invoice.pdf', 'S');

            // Encode the PDF content as base64
            $base64PdfContent = base64_encode($pdfContent);

            // ... Your existing $res array ...
            $res = array(
                'success' => true,
                'status_code' => 200,
                'invoice' => $base64PdfContent,
                'message' => 'Invoice Generated Successfully'
            );

            echo json_encode($res, 400);
            exit();

        } else {
            echo "<h4>Invoice details Not Found</h4>";
        }

    }


    public function getCompanyDetails(Request $req)
    {
        try {
            $user_id = $this->user_id;
            $company_registration_no = $req->company_registration_no;
            $where = array(
                'company_registration_no' => $company_registration_no
            );
            $res = array();
            $table_name = 'tra_premise_company_details';
            if (isset($company_registration_no) && $company_registration_no != "") {
                if (recordExists($table_name, $where)) {
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    return $previous_data;
                } else {
                    $token = $this->generateAccessToken();
                    $obrs_configs = $this->getObrsConfigurations();
                    $company_details = $this->curl_post(
                        $token,
                        $obrs_configs->companydetails_url,
                        array(
                            'brn' => trim($company_registration_no)
                            //'brn'=> '80034506867656'
                        )
                    );
                    $company_details = json_decode($company_details, true);
                    if (!isset($company_details['company'])) {
                        $res = array(
                            'success' => false,
                            'message' => $company_details['error']
                        );
                        echo json_encode($res);
                        exit();
                    }

                    if (
                        isset($company_details['company']) &&
                        $company_details['company']['business_reg_no'] !== '' &&
                        $company_details['company']['entity_name'] !== '' &&
                        $company_details['company']['type'] !== '' &&
                        $company_details['company']['subtype'] !== '' &&
                        $company_details['company']['incorporation_date'] !== '' &&
                        $company_details['company']['reg_date'] !== '' &&
                        $company_details['company']['reg_status'] !== ''
                    ) {
                        $company_data = array(
                            'company_registration_no' => $company_details['company']['business_reg_no'],
                            'name' => $company_details['company']['entity_name'],
                            'registration_date' => $company_details['company']['incorporation_date'],
                            'type' => $company_details['company']['type'],
                            'subtype' => $company_details['company']['subtype'],
                            'reg_status' => $company_details['company']['reg_status']
                        );
                        $res = insertRecord($table_name, $company_data, $user_id);
                        if ($res['success'] == true) {
                            $res = getPreviousRecords($table_name, $where);
                        }
                    } else {
                        $res = array(
                            'success' => false,
                            'message' => '<p>No Data found for this brn Number!!</p>'
                        );
                        echo json_encode($res);
                        exit();

                    }
                }
            }
        } catch (\Exception $exception) {
            sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
            $res = array('success' => false, 'message' => $exception->getMessage(), 'source' => 'mis');

        } catch (\Throwable $throwable) {
            sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
            $res = array('success' => false, 'message' => $throwable->getMessage(), 'source' => 'mis');
        }
        return \response()->json($res);
    }

    public function getCompanyShareholders(Request $req)
    {
        $token = $this->generateAccessToken();
        $obrs_configs = $this->getObrsConfigurations();
        $company_shareholder = $this->curl_post(
            $token,
            $obrs_configs->shareholders_url,
            array(
                'brn' => '80034447904226'
            )
        );
        return $company_shareholder;
    }

    public function getObrsConfigurations()
    {
        $obrs_configs = DB::table('tra_obrs_configurations')->first();
        return $obrs_configs;

    }

    public function generateAccessToken()
    {
        $obrs_configs = $this->getObrsConfigurations();
        $baseurl = $obrs_configs->baseurl;
        $endpoint = $obrs_configs->authenticate_url;
        $payload = array(
            'appKey' => $obrs_configs->consumer_key,
            'appSecret' => $obrs_configs->consumer_secret,
        );

        $headers = array(
            'Content-Type: application/json',
            'Accept: application/json'
        );

        $curl = curl_init();
        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => $baseurl . $endpoint,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => json_encode($payload),
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => false,
                CURLOPT_HTTPHEADER => $headers,

            )
        );

        $curl_response = curl_exec($curl);
        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        if ($status !== 200) {
            $res = array(
                'success' => false,
                'message' => '<p>UNABLE TO UTHENTICATE!!<br>PLEASE TRY AGAIN!!</p>'
            );
            echo json_encode($res);
            exit();
        }
        $result = json_decode($curl_response);
        $access_token = $result->access_token;

        return $access_token;
    }

    public function curl_post($token, $endpoint, $payload)
    {
        $obrs_configs = $this->getObrsConfigurations();
        $baseurl = $obrs_configs->baseurl;
        $headers = array(
            'Content-Type: application/json',
            'Authorization: Bearer ' . $token,
            'Accept: application/json'
        );
        $curl = curl_init();
        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => $baseurl . $endpoint,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => json_encode($payload),
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => false,
                CURLOPT_HTTPHEADER => $headers

            )
        );
        $curl_response = curl_exec($curl);
        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        return $curl_response;
    }

    //vigiflow
    public function generateUploadableE2BFile(Request $req)
    {

        try {
            $patientonsetageunit = ''; //to be removed
            // $application_code = $req->application_code;
            $selected = json_decode($req->selected);
            //log export
            $log = DB::table('tra_pv_vigiflow_export_log')->orderBy('id', 'DESC')->first();
            if ($log) {
                $reference = 'NDA-IRIMS-Export-0' . $log->id;
            } else {
                $reference = 'NDA-IRIMS-Export-001';
            }



            $data = array(
                'date_generated' => Carbon::now(),
                'application_codes' => json_encode($selected),
                'reference' => $reference,
                'generated_by' => 1
            );



            $log_res = insertRecord('tra_pv_vigiflow_export_log', $data);
            if (!isset($log_res['record_id'])) {
                return $log_res;
            }

            //messagedate recieved
            $messagedate = strtotime(date("Y/m/d h:i:sa")); //gets dates instance
            $year = date("Y", $messagedate);
            $month = date("m", $messagedate);
            $day = date("d", $messagedate);
            $hr = date("H", $messagedate);
            $min = date("i", $messagedate);
            $sec = date("s", $messagedate);
            $messagedate_fmt = $year . "" . $month . "" . $day . "" . $hr . "" . $min . "" . $sec;
            $trans_date_fmt = $year . "" . $month . "" . $day;

            //start creating xml
            $xml_string = "<?xml version='1.0' encoding='UTF-8'?>
                <!DOCTYPE ichicsr SYSTEM 'http://eudravigilance.ema.europa.eu/dtd/icsr21xml.dtd'>
                <ichicsr lang='en'>";
            /*
               ichicsrmessageheader
           */
            $xml_string .= "
            <ichicsrmessageheader>
                <messagetype>ichicsr</messagetype>
                <messageformatversion>2.1</messageformatversion>
                <messageformatrelease>2.0</messageformatrelease>
                <messagenumb>" . $reference . "</messagenumb>
                <messagesenderidentifier>NDA</messagesenderidentifier>
                <messagereceiveridentifier>IRIMS</messagereceiveridentifier>
                <messagedateformat>204</messagedateformat>
                <messagedate>" . $messagedate_fmt . "</messagedate>
            </ichicsrmessageheader>";

            foreach ($selected as $application_code) {
                //get record
                $report = DB::table('tra_pv_applications as t1')
                    ->leftJoin('tra_application_documents as t2', 't1.application_code', 't2.application_code')
                    ->leftJoin('par_titles as t3', 't1.title_id', 't3.id')
                    ->select('t1.*', DB::raw("CASE WHEN t2.id IS NUll THEN 2 ELSE 1 End has_documents, t3.name as patient_title,CASE WHEN t1.seriousness_id IS NUll THEN 2 ELSE 3 End termhighlighted"))
                    ->where('t1.application_code', $application_code)
                    ->first();

                $primarysource = PvPersonnel::from('tra_pv_personnel as t1')
                    ->leftJoin('par_titles as t2', 't1.title_id', 't2.id')
                    ->leftJoin('par_pv_reporter_qualifications as t3', 't1.qualification_id', 't3.id')
                    ->leftJoin('par_cities as t4', 't1.city_id', 't4.id')
                    ->where('application_code', $application_code)
                    ->select('t1.*', 't2.name as reportertitle', 't3.name as qualification', 't4.name as city')
                    ->firstOrFail();

                //seriousness
                if (validateIsNumeric($report->seriousness_id)) {
                    $serious = 1;
                    $seriousness_id = $report->seriousness_id;
                    $is_lifethreatening = 2;
                    $is_hospitalized = 2;
                    $is_disabling = 2;
                    $is_congenital = 2;
                    $is_other_serious = 2;
                    $is_death = 2;

                    switch ($seriousness_id) {
                        case 1:
                            $is_lifethreatening = 1;
                            break;
                        case 2:
                            $is_hospitalized = 1;
                            break;
                        case 3:
                            $is_congenital = 1;
                            break;
                        case 4:
                            $is_disabling = 4;
                            break;
                        case 5:
                            $is_death = 1;
                            break;
                        case 6:
                            $is_other_serious = 1;
                            break;
                    }
                } else {
                    // to be updated accordingly

                    $serious = 1;
                    $seriousness_id = $report->seriousness_id;
                    $is_lifethreatening = 2;
                    $is_hospitalized = 2;
                    $is_disabling = 2;
                    $is_congenital = 2;
                    $is_other_serious = 2;
                    $is_death = 2;
                }

                //dd($is_death);
                //dates preparation
                //Date recieved
                $date_added = strtotime($report->date_added); //gets dates instance
                $year = date("Y", $date_added);
                $month = date("m", $date_added);
                $day = date("d", $date_added);
                $hr = date("H", $date_added);
                $min = date("i", $date_added);
                $sec = date("s", $date_added);
                $date_added_fmt = $year . "" . $month . "" . $day;

                //Date recieved
                $receipt_date = strtotime($report->created_on); //gets dates instance
                $year = date("Y", $receipt_date);
                $month = date("m", $receipt_date);
                $day = date("d", $receipt_date);
                $hr = date("H", $receipt_date);
                $min = date("i", $receipt_date);
                $sec = date("s", $receipt_date);
                $receipt_date_fmt = $year . "" . $month . "" . $day;

                //reaction start date
                $reaction_start_date = strtotime($report->reaction_start_date); //gets dates instance
                $year = date("Y", $reaction_start_date);
                $month = date("m", $reaction_start_date);
                $day = date("d", $reaction_start_date);
                $reaction_start_date_fmt = $year . "" . $month . "" . $day;

                //reaction start date
                $date_recovered = strtotime($report->date_recovered); //gets dates instance
                $year = date("Y", $date_recovered);
                $month = date("m", $date_recovered);
                $day = date("d", $date_recovered);
                $date_recovered_fmt = $year . "" . $month . "" . $day;

                //reaction format
                switch ($report->duration_id) {
                    case 1:
                        $patientonsetageunit = 801;
                        break;
                    case 2:
                        $patientonsetageunit = 802;
                        break;
                    case 3:
                        $patientonsetageunit = 803;
                        break;
                    case 4:
                        $patientonsetageunit = 804;
                        break;
                    case 4:
                        $patientonsetageunit = 805;
                        break;

                }



                //mentration end date
                $last_menstruation_date = strtotime($report->last_menstruation_date); //gets dates instance
                $year = date("Y", $last_menstruation_date);
                $month = date("m", $last_menstruation_date);
                $day = date("d", $last_menstruation_date);
                $last_menstruation_date_fmt = $year . "" . $month . "" . $day;
                //report refs
                $reportid = $report->tracking_no;
                /*
                    safetyreport
                */
                $xml_string .= "
                <safetyreport>
                    <safetyreportversion>1</safetyreportversion> 
                    <safetyreportid>" . $reportid . "</safetyreportid>
                    <primarysourcecountry>UG</primarysourcecountry>
                    <occurcountry>UG</occurcountry>
                    <transmissiondateformat>102</transmissiondateformat>
                    <transmissiondate>" . $trans_date_fmt . "</transmissiondate>
                    <reporttype>1</reporttype>
                    <serious>" . $serious . "</serious>
                    <seriousnessdeath>" . $is_death . "</seriousnessdeath>
                    <seriousnesslifethreatening>" . $is_lifethreatening . "</seriousnesslifethreatening>
                    <seriousnesshospitalization>" . $is_hospitalized . "</seriousnesshospitalization>
                    <seriousnessdisabling>" . $is_disabling . "</seriousnessdisabling>
                    <seriousnesscongenitalanomali>" . $is_congenital . "</seriousnesscongenitalanomali>
                    <seriousnessother>" . $is_other_serious . "</seriousnessother>
                    <receivedateformat>102</receivedateformat>
                    <receivedate>" . $date_added_fmt . "</receivedate>
                    <receiptdateformat>102</receiptdateformat>
                    <receiptdate>" . $receipt_date_fmt . "</receiptdate>
                    <additionaldocument>" . $report->has_documents . "</additionaldocument>
                    <fulfillexpeditecriteria>1</fulfillexpeditecriteria>
                    <companynumb>" . $reportid . "</companynumb>
                    <primarysource>
                        <reportertitle>" . $primarysource->reportertitle . "</reportertitle>
                        <reportergivename>" . $primarysource->first_name . "</reportergivename>
                        <reporterfamilyname>" . $primarysource->last_name . "</reporterfamilyname>
                        <reporterorganization>" . $primarysource->organisation . "</reporterorganization>
                        <reportercountry>UG</reportercountry>
                        <qualification>" . $primarysource->qualification . "</qualification>
                    </primarysource>
                    <sender>
                        <sendertype>2</sendertype>
                        <senderorganization>" . $primarysource->organisation . "</senderorganization>
                        <senderdepartment>Product-Safety</senderdepartment>
                        <senderstreetaddress>" . $primarysource->physical_address . "</senderstreetaddress>
                        <sendercity>" . $primarysource->city . "</sendercity>
                        <sendercountrycode>UG</sendercountrycode>
                        <sendertel>" . $primarysource->telephone_no . "</sendertel>
                        <sendertelextension></sendertelextension>
                        <sendertelcountrycode></sendertelcountrycode>
                    </sender>
                    <receiver>
                        <receivertype>2</receivertype>
                        <receiverorganization>NDA</receiverorganization>
                        <receivercountrycode>UG</receivercountrycode>
                    </receiver>";

                //patient
                if ($report->gender_id == 1) {//male
                    $xml_string .= "
                    <patient>
                        <patientinitial>" . $report->patient_title . "</patientinitial>
                        <patientonsetage>" . $report->patient_age . "</patientonsetage>
                        <patientonsetageunit>" . $patientonsetageunit . "</patientonsetageunit>
                        <patientweight>" . $report->patient_weight . "</patientweight> 
                        <patientsex>" . $report->gender_id . "</patientsex>
                        <patientmedicalhistorytext>" . $report->other_medical_conditions . "</patientmedicalhistorytext>";
                } else { //female
                    $xml_string .= "
                    <patient>
                        <patientinitial>" . $report->patient_title . "</patientinitial>
                        <patientonsetage>" . $report->patient_age . "</patientonsetage>
                        <patientonsetageunit>" . $patientonsetageunit . "</patientonsetageunit>
                        <patientweight>" . $report->patient_weight . "</patientweight>
                        <patientsex>" . $report->gender_id . "</patientsex>
                        <lastmenstrualdateformat>102</lastmenstrualdateformat>
                        <patientlastmenstrualdate>" . $last_menstruation_date_fmt . "</patientlastmenstrualdate>
                        <patientmedicalhistorytext>" . $report->other_medical_conditions . "</patientmedicalhistorytext>";
                }
                $xml_string .= "<patientdeath>";
                if ($report->adr_outcome_id == 7 && $report->date_recovered) {
                    $xml_string .= "
                            <patientdeathdateformat>102</patientdeathdateformat>
                            <patientdeathdate>" . $date_recovered_fmt . "</patientdeathdate>";
                }
                // else if($report->adr_outcome_id == 6 && $report->date_recovered){
                //         $xml_string .= "
                //             <patientdeathdateformat>102</patientdeathdateformat>
                //             <patientdeathdate>".$date_recovered_fmt."</patientdeathdate>";
                // }
                switch ($report->autopsy_done) {
                    case 1:
                        $xml_string .= "<patientautopsyyesno>1</patientautopsyyesno>";
                        break;
                    case 2:
                        $xml_string .= "<patientautopsyyesno>2</patientautopsyyesno>";
                        break;

                    default:
                        $xml_string .= "<patientautopsyyesno>3</patientautopsyyesno>";
                        break;
                }
                $xml_string .= "</patientdeath>";
                //reaction
                $xml_string .= "
                <reaction>
                    <primarysourcereaction>" . $report->adverse_event . "</primarysourcereaction>

                    <reactionmeddraversionllt>21.0</reactionmeddraversionllt>
                    <reactionmeddrallt>10033557</reactionmeddrallt>

                    <termhighlighted>" . $report->termhighlighted . "</termhighlighted>
                    <reactionstartdateformat>102</reactionstartdateformat>
                    <reactionstartdate>" . $reaction_start_date_fmt . "</reactionstartdate>";
                if ($report->date_recovered) {
                    $xml_string .= "<reactionenddateformat>102</reactionenddateformat>
                    <reactionenddate>" . $date_recovered_fmt . "</reactionenddate>";
                }

                $xml_string .= "<reactionoutcome>" . $report->termhighlighted . "</reactionoutcome>
                </reaction>";

                $investigational_products = DB::table('tra_pv_suspected_drugs')->where('application_code', $report->application_code)->get();
                foreach ($investigational_products as $product) {
                    if ($product->is_other_drugs_used == 1) {
                        $drugcharacterization = 3;
                    } else {
                        $drugcharacterization = 1;
                    }
                    //drugstartdate
                    $start_date = strtotime($product->start_date); //gets dates instance
                    $year = date("Y", $start_date);
                    $month = date("m", $start_date);
                    $day = date("d", $start_date);
                    $start_date_fmt = $year . "" . $month . "" . $day;
                    // drugenddate
                    $end_date = strtotime($product->end_date); //gets dates instance
                    $year = date("Y", $end_date);
                    $month = date("m", $end_date);
                    $day = date("d", $end_date);
                    $end_date_fmt = $year . "" . $month . "" . $day;
                    $route_of_administration = getSingleRecordColValue('par_route_of_administration', ['id' => $product->route_of_administration_id], 'name');
                    $dosage_form = getSingleRecordColValue('par_dosage_forms', ['id' => $product->dosage_form_id], 'name');

                    $xml_string .= "<drug>
                        <drugcharacterization>" . $drugcharacterization . "</drugcharacterization>
                        <medicinalproduct>" . $product->brand_name . "</medicinalproduct>
                        <obtaindrugcountry>UG</obtaindrugcountry>
                        <drugbatchnumb>" . $product->batch_no . "</drugbatchnumb>
                        <drugauthorizationcountry></drugauthorizationcountry>
                        <drugauthorizationholder></drugauthorizationholder>
                        <drugdosagetext>" . $product->dosage . " - " . $product->frequency . "</drugdosagetext>
                        <drugdosageform>" . $dosage_form . "( with Route of administration being - " . $route_of_administration . " )</drugdosageform>
                        ";
                    if ($product->start_date) {
                        $xml_string .=
                            "<drugstartdateformat>201</drugstartdateformat>
                        <drugstartdate>" . $start_date_fmt . "</drugstartdate>
                        ";
                    }
                    if ($product->end_date) {
                        $xml_string .= "
                        <drugenddateformat>201</drugenddateformat>
                        <drugenddate>" . $end_date_fmt . "</drugenddate>";
                    }
                    $xml_string .=
                        "<actiondrug>" . $product->drug_action_id . "</actiondrug>              
                        <activesubstance>
                            <activesubstancename></activesubstancename>
                        </activesubstance>
                        
                    </drug>";
                }
                $xml_string .=
                    "<summary>
                        <narrativeincludeclinical>
                        Treatment sourced 
                        " . $report->treatment . ". 
                        Pre-Exisitng conditions 
                        " . $report->other_medical_conditions . ".</narrativeincludeclinical>
                    </summary>
                </patient>
            </safetyreport>";
                //update status

                if (recordExists('tra_pv_applications', ['application_code' => $application_code])) {
                    $previous_data = getPreviousRecords('tra_pv_applications', ['application_code' => $application_code]);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    updateRecord('tra_pv_applications', $previous_data, ['application_code' => $application_code], ['is_exported' => 1], 1);

                    //updateRecord('tra_pv_applications', ['application_code' => $application_code], );

                }

            }
            $xml_string .= "</ichicsr>";
            $response = array(
                'status' => 'success',
                'message' => 'XML File exported successfully',
                'name' => $reportid . '.xml',
                'file' => "data:application/xml;base64," . base64_encode($xml_string) 
            );

            return $response;


        } catch (\Exception $exception) {
            sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
            $res = array('success' => false, 'message' => $exception->getMessage(), 'source' => 'mis');

        } catch (\Throwable $throwable) {
            sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
            $res = array('success' => false, 'message' => $throwable->getMessage(), 'source' => 'mis');
        }
        return \response()->json($res);
    }


    public function generateNonce()
    {
        return base64_encode(openssl_random_pseudo_bytes(16));
    }
    //   public function getNonce()
    //   {
    //     $phrase = bin2hex(random_bytes(8));
    //     return $phrase;
    // }

    public function getNonce()
    {
        $simple_nonce = random_bytes(16);
        $encoded_nonce = base64_encode($simple_nonce);
        return $encoded_nonce;
    }



    public function generatePasswordDigest($nonce, $dateTime, $password)
    {
        $microseconds = sprintf("%06d", $dateTime->format("u"));
        // Format the timestamp with timezone offset without the last colon
        $created = $dateTime->format("Y-m-d\TH:i:s.") . substr($microseconds, 0, 3) . substr_replace($dateTime->format("P"), "", 3, 1);

        // Calculate SHA1 hash of the password
        $sha1Password = sha1($password); // true parameter returns the binary representation

        // Combine Nonce, Created, and SHA1 Password into a byte array
        $combinedBytes = $nonce . utf8_encode($created) . $sha1Password;

        // dd($combinedBytes);

        // Calculate SHA-1 hash of the combined bytes
        $sha1Result = sha1($combinedBytes, true); // true parameter returns the binary representation


        //$passdigest = base64_encode(sha1($nonce . utf8_encode($created). $sha1Password, true));
        // Base64 encode the resulting hash
        $passwordDigest = base64_encode($sha1Result);

        return $passwordDigest;
    }

    public function getCurrentTimestampFormatted()
    {
        $timeZone = new DateTimeZone('Africa/Nairobi'); // 'Africa/Nairobi' is the 
        return Carbon::now($timeZone);

    }



    public function generateUsernameToken($username, $password)
    {
        $nonceBytes = openssl_random_pseudo_bytes(16);
        $sha1PasswordBytes = sha1($password, true);
        $currentDate = date('Y-m-d\TH:i:s.u');
        $dateForPasswordDigest = $currentDate . '+0300';

        $passwordDigestStream = $nonceBytes . $dateForPasswordDigest . $sha1PasswordBytes;
        $passwordDigestHash = sha1($passwordDigestStream, true);
        $base64PasswordDigest = base64_encode($passwordDigestHash);
        $base64Nonce = base64_encode($nonceBytes);
        $dateForCreated = $currentDate . '+03:00';

        $token = new UsernameToken();
        $token->Nonce = $base64Nonce;
        $token->Username = $username;
        $token->PasswordDigest = $base64PasswordDigest;
        $token->DateCreated = $dateForCreated;

        return $token;
    }
    function receivePayRemittanceNotification111(Request $req)
    {
        $myXMLData = $req->getContent();


        $myXMLData =
            '<?xml version="1.0" encoding="utf-8"?><NDATransaction xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Offline>0</Offline><TimeStamp>0</TimeStamp><CustRef>INV2401128564</CustRef><Reversal>0</Reversal><TellerAccount>241351</TellerAccount><CollectionArea>Nakivubo</CollectionArea><Sent>false</Sent><FileGenerated>false</FileGenerated><Narration>INV2401128564</Narration><CustName>MEDVIN PHARMA LIMITED</CustName><CustomerTel>UNPAID</CustomerTel><VendorTransactionRef>INV2401128564-NDA1420283</VendorTransactionRef><TransactionType>CASH</TransactionType><VendorCode>xxxxxxxxxxx</VendorCode><Password>xxxxxxxxxxxxxx</Password><PaymentDate>2024-01-15T17:30:16</PaymentDate><TransactionAmount>2217466</TransactionAmount><TransactionCharge>0</TransactionCharge><BillAmount>2214591</BillAmount><RecordId>0</RecordId><Channel>xxxxxxxxxx</Channel><Currency>UGX</Currency><PaymentType /><CustomerType /></NDATransaction>';

        $xml = simplexml_load_string($myXMLData) or die("Error: Cannot create object");
        $json_string = json_encode($xml);
        $result_array = json_decode($json_string, TRUE);
        //check ack status

        print_r($result_array);
        exit();
        $log_data = serialize($myXMLData);
        $log_data = array(
            'log' => $log_data,
            'function_id' => "receivePayRemittanceNotification"
        );
        $log_data = DB::table('tra_stanbicbankapi_log')->insert($log_data);

        $enc_key = $result_array['enc_key'];
        if (openssl_private_decrypt(base64_decode($enc_key), $decrypted, $private_key))
            $enc_key = $decrypted;
        else
            $enc_key = '';
        //end enc_key decryption

        $notifyreq = $result_array['notifyreq'];

        $enc_key = strtoupper($enc_key);
        $decryptednotify_req = openssl_decrypt(
            $notifyreq,
            'aes-256-cbc',
            $enc_key,
            0,
            $secret_iv
        );

        //return $decryptednotify_req;

        $payload = explode("&", $decryptednotify_req);
        //return $payload;
        $data1 = array();
        foreach ($payload as $data) {
            $rec = explode('=', $data);
            if (isset($rec[0]) & isset($rec[1])) {
                $data1[$rec[0]] = $rec[1];
            }
        }

        // return $data1;
        $status = $data1['status'];
        $hash = $data1['hash'];

        $verifyhashstring = "amt=" . $data1['amt'] . "&ccy=" . $data1['ccy'] . "&corpid=" . $data1['corpid'] . "&corpref=" . $data1['corpref'] . "&ctry=" . $data1['ctry'] . "&date=" . $data1['date'] . "&optxnid=" . $data1['optxnid'] . "&ref1=" . $data1['ref1'] . "&ref2=" . $data1['ref2'] . "&ref3=" . $data1['ref3'] . "&ref4=" . $data1['ref4'] . "&ref5=" . $data1['ref5'] . "&status=" . $data1['status'] . "&txnid=" . $data1['txnid'] . "&txntype=" . $data1['txntype'] . "";
        $verifyhash = hash_hmac('SHA256', $verifyhashstring, $secret_key);
        $verifyhash = $hash; //test purpose

        if ($hash === "$verifyhash") {
            $notify_data = array(
                'amt' => $data1['amt'],
                'ccy' => $data1['ccy'],
                'corpid' => $data1['corpid'],
                'corpref' => $data1['corpref'],
                'ctry' => $data1['ctry'],
                'date' => $data1['date'],
                'optxnid' => $data1['optxnid'],
                'ref1' => $data1['ref1'],
                'ref2' => $data1['ref2'],
                'ref3' => $data1['ref3'],
                'ref4' => $data1['ref4'],
                'ref5' => $data1['ref5'],
                'status' => $data1['status'],
                'txnid' => $data1['txnid'],
                'txntype' => $data1['txntype'],
                'created_on' => now()

            );

            $corpref = $data1['corpref'];
            $record = DB::table('tra_straight2bankpay_notifyrequests')->where('corpref', $corpref)->count();
            if ($record === 0) {
                $notify_data = DB::table('tra_straight2bankpay_notifyrequests')->insert($notify_data);
                //DB::table(tra_straight2bankpay_notifyrequests)

                //Prepare notify response
                $signing_data = "ackref=8900064789&date=" . $data1['date'] . "&status=" . $data1['status'] . "&txnid=" . $data1['txnid'] . "";

                openssl_sign($signing_data, $signature, $private_key, "sha256WithRSAEncryption");

                $encoded_signature = base64_encode($signature);
            } else {
                $signing_data = "ackref=8900064789&date=" . $data1['date'] . "&status=" . $data1['status'] . "&txnid=" . $data1['txnid'] . "";

                openssl_sign($signing_data, $signature, $private_key, "sha256WithRSAEncryption");

                $encoded_signature = base64_encode($signature);
            }
        } else {
            $signing_data = "ackref=8900064789&date=" . $data1['date'] . "&status=" . $data1['status'] . "&statusdesc=Hashing Error&txnid=" . $data1['txnid'] . "";

            openssl_sign($signing_data, $signature, $private_key, "sha256WithRSAEncryption");

            $encoded_signature = base64_encode($signature);

        }


        $final_signeddata = "$signing_data&sign=$encoded_signature";

        $secret_key = strtoupper($secret_key);
        $notify_respencrypt = openssl_encrypt($final_signeddata, 'aes-256-cbc', $secret_key, 0, $secret_iv);

        $notify_resp = '<?xml version="1.0" encoding="utf-16"?><PaymentResponse xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><StatusMessage xmlns="http://livendaapi.org/">SUCCESS</StatusMessage><StatusCode xmlns="http://livendaapi.org/">0</StatusCode></PaymentResponse>';
        return $notify_resp;
    }

    function receivePayRemittanceNotification(Request $req)
    {
        $myXMLData = $req->getContent();
        $user_id = 0;
        $myXMLData = preg_replace('/encoding="utf-16"/', '', $myXMLData);


        if (!isset($myXMLData)) {
            $notify_resp = '<?xml version="1.0" encoding="utf-16"?><PaymentResponse xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><StatusMessage xmlns="http://livendaapi.org/">ERROR ! BODY CAN NOT BE NULL</StatusMessage><StatusCode xmlns="http://livendaapi.org/">4001</StatusCode></PaymentResponse>';
            print_r($notify_resp);
            exit();

        }
        $notify_resp = '<?xml version="1.0" encoding="utf-16"?><PaymentResponse xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><StatusMessage xmlns="http://livendaapi.org/">ERROR PARSING XML</StatusMessage><StatusCode xmlns="http://livendaapi.org/">4001</StatusCode></PaymentResponse>';

        $xml = simplexml_load_string($myXMLData) or die($notify_resp);
        $json_string = json_encode($xml);
        $result_array = json_decode($json_string, TRUE);
        //check ack status


        $log_data = serialize($myXMLData);
        $log_data = array(
            'log' => $log_data,
            'function_id' => "receivePayRemittanceNotification"
        );
        $log_data = DB::table('tra_stanbicbankapi_log')->insert($log_data);

        $receipt_no = generateReceiptNo($user_id);

        $invoice_no = $result_array['CustRef'];
        $Currency = $result_array['Currency'];

        $currency_id = 1;
        $currency_details = DB::table('par_currencies')->where(function ($query) use ($Currency) {
            $query->where('name', $Currency)
                ->orWhereRaw("name = '" . trim($Currency) . "'");
        })->first();
        if ($currency_details) {
            $currency_id = $currency_details->id;

        }

        $exchange_rate = getSingleRecordColValue('par_exchange_rates', array('currency_id' => $currency_id), 'exchange_rate');



        if (isset($invoice_no)) {
            $invoice_record = DB::table('tra_application_invoices')->where(function ($query) use ($invoice_no) {
                $query->where('invoice_no', $invoice_no)
                    ->orWhereRaw("invoice_no = '" . trim($invoice_no) . "'");
            })->first();



            if ($invoice_record) {
                $invoice_id = $invoice_record->id;
                $module_id = $invoice_record->module_id;
                $sub_module_id = $invoice_record->sub_module_id;
                $section_id = $invoice_record->section_id;
                $application_code = $invoice_record->application_code;
                $application_id = $invoice_record->application_id;
                $applicant_id = $invoice_record->applicant_id;
                $applicant_name = $invoice_record->applicant_name;
                $invoice_type_id = $invoice_record->invoice_type_id;
                $due_date = $invoice_record->due_date;
            }
        }


        $params = array(
            'application_id' => $application_id,
            'application_code' => $application_code,
            'applicant_name' => $applicant_name,
            'amount_paid' => $result_array['TransactionAmount'],
            'invoice_id' => $invoice_id,
            'receipt_no' => $receipt_no,
            'trans_date' => $result_array['PaymentDate'],
            'currency_id' => $currency_id,
            'applicant_id' => $applicant_id,
            'section_id' => $section_id,
            'module_id' => $module_id,
            'payment_type_id' => 1,
            'sub_module_id' => $sub_module_id,
            'receipt_type_id' => 1,
            'payment_mode_id' => 1,
            'trans_ref' => $result_array['VendorTransactionRef'],
            'bank_id' => 0,
            'drawer' => $result_array['CustName'],
            'exchange_rate' => $exchange_rate,
            'created_on' => Carbon::now(),
            'created_by' => $user_id
        );


        $res = insertRecord('tra_payments', $params, $user_id);


        generatePaymentRefDistribution($invoice_id, $res['record_id'], $result_array['TransactionAmount'], $currency_id, $user_id);
        $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $invoice_id);
        $res['balance'] = $payment_details['running_balance'];
        $res['invoice_amount'] = $payment_details['invoice_amount'];


        if ($res['success']) {
            $receipt_id = $res['record_id'];

            $payment_record = DB::table('tra_payments')->where('id', $receipt_id)->first();

            if ($payment_record) {
                $receipt_no = $payment_record->receipt_no;
                $applicant_id = $payment_record->applicant_id;
                $payment_id = $payment_record->id;
                $module_id = $payment_record->module_id;
                $application_code = $payment_record->application_code;
                $application_id = $payment_record->application_id;

                $message = "Kindly find attached Payment Receipt as per the following details:";
                $message .= "<br/>Application No:" . $invoice_record->tracking_no;
                $message .= "<br/>Receipt No:" . $receipt_no;
                $message .= "<br/>Payment Date:" . Carbon::now();

                $subject = 'Payment Receipt';

                $trader_record = getSingleRecord('wb_trader_account', array('id' => $applicant_id), 'mysql');

                if ($trader_record) {
                    $attachement_name = 'Payment Receipt.pdf';
                    $document_root = $_SERVER['DOCUMENT_ROOT'];
                    $attachement = $document_root . '/' . Config('constants.dms.system_uploaddirectory') . date('Y-m-d H:i:s') . 'Receipt' . '.pdf';
                    $request = new Request([
                        'table_name' => 'unit test',
                        'application_code' => $application_code,
                        'application_id' => $application_id,
                        'module_id' => $module_id
                    ]);
                    $this->printApplicationReceipt($payment_id, $invoice_id, $request, 'notify', $attachement);


                    // $this->submitPaymentNextProcessAutoSubmissions($application_code);

                    //$response = sendMailNotification($trader_record->name, $trader_record->email,$subject,$message,'','',$attachement,$attachement_name);

                    $response = sendMailNotification($trader_record->name, 'kenedymuthui1@gmail.com', $subject, $message, '', '', $attachement, $attachement_name);

                    $data = array(
                        'receipt_no' => $receipt_no,
                        'application_code' => $application_code,
                        'trader_name' => $trader_record->name,
                        'notification_sent_on' => Carbon::now(),
                        'notification_sent_to' => $trader_record->email,
                        'notification_status_id' => 2,
                        'created_on' => Carbon::now()
                    );

                    DB::table('tra_paymentinvoices_notifications')->insert($data);

                    $where = array('id' => $payment_id);
                    $data_update = array('notification_status_id' => 2, 'dola' => Carbon::now());
                    DB::table('tra_payments as t')->where($where)->update($data_update);
                    unlink($attachement);
                }


            }
        }

        $notify_resp = '<?xml version="1.0" encoding="utf-16"?><PaymentResponse xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><StatusMessage xmlns="http://livendaapi.org/">SUCCESS</StatusMessage><StatusCode xmlns="http://livendaapi.org/">0</StatusCode></PaymentResponse>';
        return $notify_resp;
    }
    public function test()
    {
        // $nonceToSend = $this->getNonce();
        $dateTime = $this->getCurrentTimestampFormatted();

        // // Format microseconds with three digits
        $microseconds = sprintf("%06d", $dateTime->format("u"));

        // // Format the timestamp with timezone offset without the last colon
        $created = $dateTime->format("Y-m-d\TH:i:s.") . substr($microseconds, 0, 3) . $dateTime->format("P"); //"2018-04-06T19:32:31.543+03:00";

        //dd($nonce);
        $password = "78VGb!";
        $user = "NationalDrugAuthority@ROOT";
        //$passwordDigest = $this->generatePasswordDigest($nonceToSend, $dateTime, $password);

        //dd($created);

        $nonceBytes = openssl_random_pseudo_bytes(16);
        $sha1PasswordBytes = sha1($password, true);
        $currentDate = date('Y-m-d\TH:i:s.u');
        $dateForPasswordDigest = $currentDate . '+0300';

        $passwordDigestStream = $nonceBytes . $dateForPasswordDigest . $sha1PasswordBytes;
        $passwordDigestHash = sha1($passwordDigestStream, true);
        $base64PasswordDigest = base64_encode($passwordDigestHash);
        $base64Nonce = base64_encode($nonceBytes);
        $dateForCreated = $currentDate . '+03:00';



        // URL of the SOAP web service
        $wsdlUrl = 'http://154.72.206.138:8080/pilatusp2-tpi2-ws/ThirdPartyInterfaceNewWS?wsdl';

        // XML content of the SOAP request
        $soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:fac="http://facade.server.pilatus.thirdparty.tidis.muehlbauer.de/"
                      xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
                      <soapenv:Header>
                        <wsse:UsernameToken>
                          <wsse:Username>' . $user . '</wsse:Username>
                          <wsse:Password Type="PasswordDigest">' . $base64PasswordDigest . '</wsse:Password>
                          <wsse:Nonce>' . $base64Nonce . '</wsse:Nonce>
                          <wsse:Created>2024-05-19</wsse:Created>
                        </wsse:UsernameToken>
                      </soapenv:Header>
                      <soapenv:Body>
                        <fac:verifyPersonInformation>
                          <request>
                            <dateOfBirth>01/01/1993</dateOfBirth>
                            <documentId>000092564</documentId>
                            <givenNames>Johnson</givenNames>
                            <nationalId>CM930121003EGE</nationalId>
                            <otherNames></otherNames>
                            <surname>Tipiyai</surname>
                          </request>
                        </fac:verifyPersonInformation>
                      </soapenv:Body>
                    </soapenv:Envelope>';

        // cURL setup
        $ch = curl_init();
        // dd($soapRequest);
        // Set cURL options
        curl_setopt($ch, CURLOPT_URL, $wsdlUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $soapRequest);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: text/xml; charset=utf-8',
                'Content-Length: ' . strlen($soapRequest),
            )
        );

        // Execute cURL request
        $response = curl_exec($ch);

        // Check for cURL errors
        if (curl_errno($ch)) {
            dd('cURL error: ' . curl_error($ch));
        } else {
            // Output the SOAP response
            echo $response;
        }

        // Close cURL session
        curl_close($ch);
    }




    //system notification Api
    public function getStanbicAPIConfigurations()
    {
        $bank_configs = DB::table('tra_stanbicbankapi_configurations')->first();
        return $bank_configs;

    }

    function returnAuthenticationKeys()
    {
        $private_key = file_get_contents(public_path() . '/keys/private_key.pem');
        $public_key = file_get_contents(public_path() . '/keys/public_key.pem');

        $data = array('private_key' => $private_key, 'public_key' => $public_key);

        return $data;
    }

    public function getWHODrugAPIConfigurations($environment)
    {
        if ($environment == 'production') {
            $whodrugapi_configs = DB::table('tra_whodrugproductionapi_configurations')->first();
        } else {
            $whodrugapi_configs = DB::table('tra_whodrugapi_configurations')->first();
        }
        return $whodrugapi_configs;

    }


    public function whoDrugDownloadApi(Request $request)
    {
        $limit = $request->input('limit', 1000); // Default limit is 1000 if not provided
        $page = $request->input('page', 1); // Default page is 1 if not provided

        $offset = ($page - 1) * $limit;

        $WHODrugInformation = WHODrugInformation::offset($offset)->limit($limit)->get();

        $res = array(
            'success' => true,
            'message' => 'All is well!!',
            'results' => $WHODrugInformation
        );

        return response()->json($res);
    }


    public function test1111(Request $req)
    {
        $contentType = $req->header('Content-Type');
        //$contentType ='application/xml';// to be removed
        //$contentType='application/json';

        //demo xml data should be replaced with xml request data

        // {
        //   "corpid": "CUIIN001",
        //   "notifyreq": "bncvFCuEIsshdOOZq56bO6vA37pkkSAkD+n0ZFqNL3TNUNKr+fnXdJan40CjsUVJLKPNWugLteEEGTf4Lsnh0ABcUmnGOik9wasflP5tBqub+b5kGCBY5PAVA5eEVnMBWISBo1PaU7cJWIg9VZyxBVELgBiiwqG3wDYjF7VPyxC+V2KcTvF/y+tdVxbvdNdw5vbp0I3FtVK+NDfalUotHtxL7iGVd9S371AbzFaOtlgn9v16F5zrfVAEsKtMiqRbVAOoROi8WqZ79ww2QT+UH3jpOCJC2kflaoChJKA/8NIT7Fmb0o9Y0GvBYt7CXJ2Ml3oyr6gT8lWimTY6ear0oQ==",
        //   "enc_key": "H/B/EgoS3oFUwx6XsJeb/JDabbVTiukxEMYZ5AsWNbTXq1stLoBWTPKg+hhw4raSpsBqGIq+DJx4p65hc2h6eGFtwPanRldkFKzwojCOVav5Ou49Tx14r92RIgqQ+GxYrl8wwYc70Zdq1wE9yaqEHf8uKcH9udh5mu0clUiAYwtQEzAdxD73B+N1PIYn/gvZISPbV53KM9QDFQJcsyKEHAZVww79HA4R5IBs4Bii3mnwMh2MiTlXik/C3scWiw7ckOGxmAeiUfdKs+QddKkzdOKRpFgrXqRjKfpmGwHuziLBUE87e2hWm1pB1FABnfitlWSzP9cfc8Hlx69xwS4b4A=="
        // }

        $myXMLData1 =
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <xml>
        <corpid>CUIIN001</corpid>    
        <notifyreq>bncvFCuEIsshdOOZq56bO6vA37pkkSAkD+n0ZFqNL3TNUNKr+fnXdJan40CjsUVJLKPNWugLteEEGTf4Lsnh0ABcUmnGOik9wasflP5tBqub+b5kGCBY5PAVA5eEVnMBWISBo1PaU7cJWIg9VZyxBVELgBiiwqG3wDYjF7VPyxC+V2KcTvF/y+tdVxbvdNdw5vbp0I3FtVK+NDfalUotHtxL7iGVd9S371AbzFaOtlgn9v16F5zrfVAEsKtMiqRbVAOoROi8WqZ79ww2QT+UH3jpOCJC2kflaoChJKA/8NIT7Fmb0o9Y0GvBYt7CXJ2Ml3oyr6gT8lWimTY6ear0oQ==</notifyreq>    
        <enc_key>H/B/EgoS3oFUwx6XsJeb/JDabbVTiukxEMYZ5AsWNbTXq1stLoBWTPKg+hhw4raSpsBqGIq+DJx4p65hc2h6eGFtwPanRldkFKzwojCOVav5Ou49Tx14r92RIgqQ+GxYrl8wwYc70Zdq1wE9yaqEHf8uKcH9udh5mu0clUiAYwtQEzAdxD73B+N1PIYn/gvZISPbV53KM9QDFQJcsyKEHAZVww79HA4R5IBs4Bii3mnwMh2MiTlXik/C3scWiw7ckOGxmAeiUfdKs+QddKkzdOKRpFgrXqRjKfpmGwHuziLBUE87e2hWm1pB1FABnfitlWSzP9cfc8Hlx69xwS4b4A==</enc_key>
        </xml>';
        $bank_config = $this->getStanbicAPIConfigurations();
        $authentication_keys = $this->returnAuthenticationKeys();
        $secret_iv = $bank_config->secret_iv;
        // $secret_key = $bank_config->secret_key;
        // $private_key = $authentication_keys['private_key'];

        // $public_key = $authentication_keys['public_key'];

        $result_array = array();
        $log_data = '';
        $secret_iv = '0000000000000000';
        $secret_key = 'y8S74D4JeE86tLcuz6vCZ3TfKYSQh4QQ';
        $private_key = <<<EOD
        -----BEGIN RSA PRIVATE KEY-----
        MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCTHodjrTgE/cBF
        BxCPLbG4HBOtMQRhWTOz58s0bfsRYrGjikPJIJwB423VBGPiYJFPKu1jgBKByfEQ
        qfAyDDufGvIdq8m7uqfWjcvOHxLul2+6gvdyDrx/7K5bpTMXZeBZkBDlTflr4bb3
        mUSoakqW4rAAqvxSTQbGgYrfBwGetHy8srMbsz5TGmnazjKfrIxA54Z1zGKIYVsJ
        0b0/u4Mx+T+vMmLuEUAeFtNHQ1IuR+it+r9aS4KC0T80Gl2DYYJMUyps4zDHfrNS
        D0TwyJwR4eitnzH6TTB48viHsNIIuiixkIVyPTlb82gekMpIYzCM26aYrJrBx939
        OoH+8uHlAgMBAAECggEABX053Xr40FzcZ+bt0/3HOACaLlfaGzy+DFwdbZkd6UXm
        rVyrD03PbFWdQzms9WUXft3x6gi9CAkuHKpOizuAHP1fI8LFXeMGwJ9dR5VKukq9
        sTaSP3fzyg0da090Ys7bClRxAPFCGWecUUwvbt46ZrtSCFBY5kQ3+L+cHBqxkYeJ
        cpQB1hkXR4aWO5eivebRN5ExbWhdDTqpnTYUWPJCaPnbZHUey+VhIsOGcQaCCy28
        Mg6CYIxtq4T7qDjh7+bgcr/CvhvF1Gp8DNvqe6a+Q8og4F+yxvXSMdT/5GY1ecBm
        YEf3tjQYe/SzkCvlPF6IuvhqC4orYq1GvXI5QBq6kQKBgQDJ+UpO8GVMOrERYmSP
        xxVAUAM5yuSQN3H52mSir61//j81IKd0rxam1qPUpae3jwKhzfBERdpz5H39D9vl
        +g/jKFMMF+zlLbNaDtaQ1lnuPcc+sL1HlWxTG0mfM3oskT/WrfEJorwSLUofUZQ9
        HxUDVrjs8wP0D/O7H7M3b3bYlQKBgQC6eOxxqdwGz/OyOcSNkDdH7CM/ICGJplDW
        vgYNwuXnbw8/rn+zseMQ0sCToUXadxd8qB0SF9acxUFCRvIM+1KUXsotKNvQg7/w
        0l3BUEycPJlFxTr+S5W0i7tv9AQykg5/5ym0e9lWSeNcVthWYRrDFCXP33qlgbtH
        xb2ol7SAEQKBgH3kh27g5SM4yjn9zJTaEOL/fKM/VmyWQtLsUCIfwtOvFJL3Aan3
        oPTpgUEA6KO/3nIgvYywxdPLLsTYZ8bXsaNz9R/qodzQOaT+7rtlALVBiLoIzFKc
        TuMWdTNokNTKzLHxxfatmvDxjewrm2zlvOFR4v6/E03Dy7ZtsfXx4nBpAoGAL0Kq
        mnw0eb2GxCsD9+UPPblJjZw1I8/1ORfcLOyynB93u+ocD40MQZ1IlaIQNDhuyXdK
        NuW3zO/phES64DNqUJRdpWhvnb9mjECk5nPVltt89UPxmbXKcYHgtZUg4zhFWIFb
        /pRNFyOO7j5MgkgGIl8e3jqDuSLSNnSVhv88DiECgYBAfsdCSrDYq4q6rXeuC8Pm
        DejbVtvH2O5n+U67qmxjr0+40Jf0XC/VJoWa/QvRgCYpa2VIjD82CvbkkV4bBnWX
        S15aLgAWiwEwc7PY0JwbH3eQHvVE6D0NL55o+Fu1dskb8mS9hZuSgMJh2cyak0ag
        Xh+96RgXp41MkUjHCMxH1A==
        -----END RSA PRIVATE KEY-----
        EOD;
        $public_key = <<<EOD
        -----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkx6HY604BP3ARQcQjy2x
        uBwTrTEEYVkzs+fLNG37EWKxo4pDySCcAeNt1QRj4mCRTyrtY4ASgcnxEKnwMgw7
        nxryHavJu7qn1o3Lzh8S7pdvuoL3cg68f+yuW6UzF2XgWZAQ5U35a+G295lEqGpK
        luKwAKr8Uk0GxoGK3wcBnrR8vLKzG7M+Uxpp2s4yn6yMQOeGdcxiiGFbCdG9P7uD
        Mfk/rzJi7hFAHhbTR0NSLkforfq/WkuCgtE/NBpdg2GCTFMqbOMwx36zUg9E8Mic
        EeHorZ8x+k0wePL4h7DSCLoosZCFcj05W/NoHpDKSGMwjNummKyawcfd/TqB/vLh
        5QIDAQAB
        -----END PUBLIC KEY-----        
        EOD;

        if (!$contentType) {
            $jsonData = $req->getContent();
            $log_data = serialize($jsonData);
            $result_array_data = json_decode($jsonData, true);

            if ($result_array_data !== null) {
                if ($result_array_data !== null) {
                    $result_array = $result_array_data;
                } else {
                    $invalid_data = "status=400&statusdesc=Invalid Request Payload";

                    openssl_sign($invalid_data, $signature, $private_key, "sha256WithRSAEncryption");

                    $encoded_invalid_data_signature = base64_encode($signature);

                    $signed_invalid_data = "$invalid_data&sign=$encoded_invalid_data_signature";

                    $secret_key = strtoupper($secret_key);
                    $invalid_data_respencrypt = openssl_encrypt($signed_invalid_data, 'aes-256-cbc', $secret_key, 0, $secret_iv);

                    $notify_resp = array(
                        'corpid' => 'NDA',
                        'notify_resp' => $invalid_data_respencrypt
                    );
                    echo json_encode($notify_resp);
                    exit();
                }
            } else {
                // JSON decoding failed
                // Assume XML format and try to process as XML
                $myXMLData = $req->getContent(); // enable this on live
                $invalid_data = "status=400&statusdesc=Invalid Request Payload";

                openssl_sign($invalid_data, $signature, $private_key, "sha256WithRSAEncryption");

                $encoded_invalid_data_signature = base64_encode($signature);

                $signed_invalid_data = "$invalid_data&sign=$encoded_invalid_data_signature";

                $secret_key = strtoupper($secret_key);
                $invalid_data_respencrypt = openssl_encrypt($signed_invalid_data, 'aes-256-cbc', $secret_key, 0, $secret_iv);

                $invalid_data_resp = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                      <xml>
                      <corpid>NDA</corpid>
                      <notify_resp>' . $invalid_data_respencrypt . '</notify_resp>
                      </xml>';

                $xml = simplexml_load_string($myXMLData) or die($invalid_data_resp);
                $json_string = json_encode($xml);
                $result_array = json_decode($json_string, true);
                $log_data = serialize($myXMLData);
            }
        } elseif ($contentType === 'application/json') {
            // Request is JSON
            $jsonData = $req->getContent();
            $log_data = serialize($jsonData);
            $result_array_data = json_decode($jsonData, true);

            if ($result_array_data !== null) {
                $result_array = $result_array_data;
            } else {
                $invalid_data = "status=400&statusdesc=Invalid Request Payload";

                openssl_sign($invalid_data, $signature, $private_key, "sha256WithRSAEncryption");

                $encoded_invalid_data_signature = base64_encode($signature);

                $signed_invalid_data = "$invalid_data&sign=$encoded_invalid_data_signature";

                $secret_key = strtoupper($secret_key);
                $invalid_data_respencrypt = openssl_encrypt($signed_invalid_data, 'aes-256-cbc', $secret_key, 0, $secret_iv);

                $notify_resp = array(
                    'corpid' => 'NDA',
                    'notify_resp' => $invalid_data_respencrypt
                );
                echo json_encode($notify_resp);
                exit();
            }
        } elseif ($contentType === 'text/plain') {
            // Request is JSON
            $jsonData = $req->getContent();
            $log_data = serialize($jsonData);
            $result_array_data = json_decode($jsonData, true);

            if ($result_array_data !== null) {
                $result_array = $result_array_data;
            } else {
                $invalid_data = "status=400&statusdesc=Invalid Request Payload";

                openssl_sign($invalid_data, $signature, $private_key, "sha256WithRSAEncryption");

                $encoded_invalid_data_signature = base64_encode($signature);

                $signed_invalid_data = "$invalid_data&sign=$encoded_invalid_data_signature";

                $secret_key = strtoupper($secret_key);
                $invalid_data_respencrypt = openssl_encrypt($signed_invalid_data, 'aes-256-cbc', $secret_key, 0, $secret_iv);

                $notify_resp = array(
                    'corpid' => 'NDA',
                    'notify_resp' => $invalid_data_respencrypt
                );
                echo json_encode($notify_resp);
                exit();
            }
        } elseif ($contentType === 'application/xml' || $contentType === 'text/xml') {
            // Request is XML
            $myXMLData = $req->getContent(); // enable this on live
            $invalid_data = "status=400&statusdesc=Invalid Request Payload";

            openssl_sign($invalid_data, $signature, $private_key, "sha256WithRSAEncryption");

            $encoded_invalid_data_signature = base64_encode($signature);

            $signed_invalid_data = "$invalid_data&sign=$encoded_invalid_data_signature";

            $secret_key = strtoupper($secret_key);
            $invalid_data_respencrypt = openssl_encrypt($signed_invalid_data, 'aes-256-cbc', $secret_key, 0, $secret_iv);

            $invalid_data_resp = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                      <xml>
                      <corpid>NDA</corpid>
                      <notify_resp>' . $invalid_data_respencrypt . '</notify_resp>
                      </xml>';

            $xml = simplexml_load_string($myXMLData) or die($invalid_data_resp);
            $json_string = json_encode($xml);
            $result_array = json_decode($json_string, true);
            $log_data = serialize($myXMLData);
        } else {
            echo json_encode(['error' => 'Unsupported content type'], 415);
            exit();
        }



        $log_data = array(
            'log' => $log_data,
            'function_id' => "receivePayRemittanceNotification"
        );
        $log_data = DB::table('tra_stanbicbankapi_log')->insert($log_data);

        $notifyreq = $result_array['notifyreq'];
        $enc_key = $result_array['enc_key'];
        if (openssl_private_decrypt(base64_decode($enc_key), $decrypted, $private_key)) {
            $enc_key = $decrypted;
        } else {
            $enc_key = '';
        }
        //end enc_key decryption


        $enc_key = strtoupper($enc_key);
        $decryptednotify_req = openssl_decrypt(
            $notifyreq,
            'aes-256-cbc',
            $enc_key,
            0,
            $secret_iv
        );

        //return $decryptednotify_req;

        $payload = explode("&", $decryptednotify_req);
        //return $payload;
        $data1 = array();
        foreach ($payload as $data) {
            $rec = explode('=', $data);
            if (isset($rec[0]) & isset($rec[1])) {
                $data1[$rec[0]] = $rec[1];
            }
        }

        // return $data1;
        $status = $data1['status'];
        $hash = $data1['hash'];

        $verifyhashstring = "amt=" . $data1['amt'] . "&ccy=" . $data1['ccy'] . "&corpid=" . $data1['corpid'] . "&corpref=" . $data1['corpref'] . "&ctry=" . $data1['ctry'] . "&date=" . $data1['date'] . "&optxnid=" . $data1['optxnid'] . "&ref1=" . $data1['ref1'] . "&ref2=" . $data1['ref2'] . "&ref3=" . $data1['ref3'] . "&ref4=" . $data1['ref4'] . "&ref5=" . $data1['ref5'] . "&status=" . $data1['status'] . "&txnid=" . $data1['txnid'] . "&txntype=" . $data1['txntype'] . "";
        $verifyhash = hash_hmac('SHA256', $verifyhashstring, $secret_key);
        //$verifyhash=$hash; //test purpose

        if ($hash === $verifyhash) {
            $notify_data = array(
                'amt' => $data1['amt'],
                'ccy' => $data1['ccy'],
                'corpid' => $data1['corpid'],
                'corpref' => $data1['corpref'],
                'ctry' => $data1['ctry'],
                'date' => $data1['date'],
                'optxnid' => $data1['optxnid'],
                'ref1' => $data1['ref1'],
                'ref2' => $data1['ref2'],
                'ref3' => $data1['ref3'],
                'ref4' => $data1['ref4'],
                'ref5' => $data1['ref5'],
                'status' => $data1['status'],
                'txnid' => $data1['txnid'],
                'txntype' => $data1['txntype'],
                'created_on' => now()

            );

            $corpref = $data1['corpref'];
            $record = DB::table('tra_stanbicbankapi_notifyrequests')->where('corpref', $corpref)->count();
            if ($record === 0) {
                $notify_data = DB::table('tra_stanbicbankapi_notifyrequests')->insert($notify_data);

                //Prepare notify response
                $signing_data = "ackref=8900064789&date=" . $data1['date'] . "&status=" . $data1['status'] . "&txnid=" . $data1['txnid'] . "";

                openssl_sign($signing_data, $signature, $private_key, "sha256WithRSAEncryption");

                $encoded_signature = base64_encode($signature);
            } else {
                $signing_data = "ackref=8900064789&date=" . $data1['date'] . "&status=" . $data1['status'] . "&txnid=" . $data1['txnid'] . "";

                openssl_sign($signing_data, $signature, $private_key, "sha256WithRSAEncryption");

                $encoded_signature = base64_encode($signature);
            }
        } else {
            $signing_data = "ackref=8900064789&date=" . $data1['date'] . "&status=" . $data1['status'] . "&statusdesc=Hashing Error&txnid=" . $data1['txnid'] . "";

            openssl_sign($signing_data, $signature, $private_key, "sha256WithRSAEncryption");

            $encoded_signature = base64_encode($signature);

        }


        $final_signeddata = "$signing_data&sign=$encoded_signature";

        $secret_key = strtoupper($secret_key);
        $notify_respencrypt = openssl_encrypt($final_signeddata, 'aes-256-cbc', $secret_key, 0, $secret_iv);


        if ($contentType === 'application/json') {
            $notify_resp = array(
                'corpid' => $data1['corpid'],
                'notify_resp' => $notify_respencrypt
            );
            echo json_encode($notify_resp);
            exit();

        } else {
            $notify_resp = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
              <xml>
              <corpid>' . $data1['corpid'] . '</corpid>
              <notify_resp>' . $notify_respencrypt . '</notify_resp>
              </xml>';
            return $notify_resp;
        }

    }

    //Export DATA
    public function exportwhodata(Request $req)
    {
        // Increase maximum execution time to 10 minutes (600 seconds)
        set_time_limit(600);
        // $environment = 'sandbox';
        $environment = 'production';
        $whodrugapi_configs = $this->getWHODrugAPIConfigurations($environment);
        $queryParams = http_build_query([
            'MedProdLevel' => 0,
            'IncludeAtc' => 'true',
            'IngredientTranslations' => 'false'
        ]);

        $headers = [
            'umc-license-key: ' . $whodrugapi_configs->license_key,
            'Cache-Control: no-cache',
            'umc-client-key: ' . $whodrugapi_configs->client_key,

        ];
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $whodrugapi_configs->request_url . '?' . $queryParams);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $file = base_path("whodrugdata.json");
        file_put_contents($file, curl_exec($ch));

        if (curl_errno($ch)) {
            $res = array(
                'success' => false,
                'message' => 'Curl error: ' . curl_error($ch) . '!!'
            );
            echo json_encode($res);
            exit();
        }
        curl_close($ch);
        $res = array(
            'success' => true,
            'message' => 'Data Exported Successfully!!',
        );
        return response()->json($res);
    }

    //SYNC WHO DATA
    public function syncwhodata(Request $req)
    {
        // Increase maximum execution time to 100 minutes (6000 seconds)
        set_time_limit(6000);

        ini_set('memory_limit', '1G');

        $file = base_path("whodrugdata.json");

        // Check if the file exists
        if (file_exists($file)) {
            // Read the file content
            $jsonContent = file_get_contents($file);

            // Handle the data
            if ($jsonContent) {
                // Decode the JSON data
                $decodedResponse = json_decode($jsonContent, true);
                if ($decodedResponse) {
                    // Flatten the array structure
                    $flattenedDrugs = [];

                    $chunkSize = 1000; // Adjust the chunk size as needed
                    $totalDrugs = count($decodedResponse);
                    $startIndex = 0;
                    $chunkedDrugs = [];

                    // Manually chunk the array
                    while ($startIndex < $totalDrugs) {
                        $chunk = array_slice($decodedResponse, $startIndex, $chunkSize);
                        $chunkedDrugs[] = $chunk;
                        $startIndex += $chunkSize;
                    }

                    // Process each chunk
                    foreach ($chunkedDrugs as $chunk) {
                        foreach ($chunk as $drug) {
                            $activeIngredients = array_map(function ($active) {
                                return $active['ingredient'];
                            }, $drug['activeIngredients']);

                            // Concatenate activeIngredients with commas and "and" for the last one
                            $concatenatedIngredients = implode(', ', array_slice($activeIngredients, 0, -1));
                            if (count($activeIngredients) > 1) {
                                $concatenatedIngredients .= ' and ' . end($activeIngredients);
                            } else {
                                $concatenatedIngredients = reset($activeIngredients);
                            }

                            // Handle countryOfSales and maHolders
                            if (!empty($drug['countryOfSales'])) {
                                foreach ($drug['countryOfSales'] as $country) {
                                    $countryCode = $country['iso3Code'];
                                    if (!empty($country['maHolders'])) {
                                        foreach ($country['maHolders'] as $maHolder) {
                                            $flattenedDrug = [
                                                'drugName' => $drug['drugName'],
                                                'drugCode' => $drug['drugCode'],
                                                'medicinalProductID' => $drug['medicinalProductID'],
                                                'isGeneric' => $drug['isGeneric'],
                                                'isPreferred' => $drug['isPreferred'],
                                                'countryOfSales' => $countryCode,
                                                'activeIngredients' => $concatenatedIngredients,
                                                'atc_code' => null,
                                                'atc_text' => null,
                                                'atc_official_flag' => null,
                                                'maHolder_name' => $maHolder['name'],
                                                'maHolder_medicinalProductID' => $maHolder['medicinalProductID'],
                                            ];

                                            // Check if 'atcs' array is present
                                            if (!empty($drug['atcs'])) {
                                                foreach ($drug['atcs'] as $atc) {
                                                    $flattenedDrug['atc_code'] = $atc['code'];
                                                    $flattenedDrug['atc_text'] = $atc['text'];
                                                    $flattenedDrug['atc_official_flag'] = $atc['officialFlag'];
                                                    $flattenedDrugs[] = $flattenedDrug;
                                                }
                                            } else {
                                                $flattenedDrugs[] = $flattenedDrug;
                                            }
                                        }
                                    } else {
                                        // No maHolders, add a record with empty maHolder details
                                        $flattenedDrug = [
                                            'drugName' => $drug['drugName'],
                                            'drugCode' => $drug['drugCode'],
                                            'medicinalProductID' => $drug['medicinalProductID'],
                                            'isGeneric' => $drug['isGeneric'],
                                            'isPreferred' => $drug['isPreferred'],
                                            'countryOfSales' => $countryCode,
                                            'activeIngredients' => $concatenatedIngredients,
                                            'atc_code' => null,
                                            'atc_text' => null,
                                            'atc_official_flag' => null,
                                            'maHolder_name' => null,
                                            'maHolder_medicinalProductID' => null,
                                        ];

                                        // Check if 'atcs' array is present
                                        if (!empty($drug['atcs'])) {
                                            foreach ($drug['atcs'] as $atc) {
                                                $flattenedDrug['atc_code'] = $atc['code'];
                                                $flattenedDrug['atc_text'] = $atc['text'];
                                                $flattenedDrug['atc_official_flag'] = $atc['officialFlag'];
                                                $flattenedDrugs[] = $flattenedDrug;
                                            }
                                        } else {
                                            $flattenedDrugs[] = $flattenedDrug;
                                        }
                                    }
                                }
                            } else {
                                // No countryOfSales, handle as before
                                $flattenedDrug = [
                                    'drugName' => $drug['drugName'],
                                    'drugCode' => $drug['drugCode'],
                                    'medicinalProductID' => $drug['medicinalProductID'],
                                    'isGeneric' => $drug['isGeneric'],
                                    'isPreferred' => $drug['isPreferred'],
                                    'countryOfSales' => null,
                                    'activeIngredients' => $concatenatedIngredients,
                                    'atc_code' => null,
                                    'atc_text' => null,
                                    'atc_official_flag' => null,
                                ];

                                // Check if 'atcs' array is present
                                if (!empty($drug['atcs'])) {
                                    foreach ($drug['atcs'] as $atc) {
                                        $flattenedDrug['atc_code'] = $atc['code'];
                                        $flattenedDrug['atc_text'] = $atc['text'];
                                        $flattenedDrug['atc_official_flag'] = $atc['officialFlag'];
                                        $flattenedDrugs[] = $flattenedDrug;
                                    }
                                } else {
                                    $flattenedDrugs[] = $flattenedDrug;
                                }

                            }
                        }

                        foreach ($flattenedDrugs as $flattenedDrug) {
                            // Check if Drug Exists
                            $WHODrugInformation = WHODrugInformation::where('drugCode', $flattenedDrug['drugCode'])->where('atc_code', $flattenedDrug['atc_code'])->first();

                            if (!empty($WHODrugInformation)) {
                                // print ('Already Exists!!');
                            } else {

                                $WHODrugInformation = WHODrugInformation::create($flattenedDrug);
                                // print ('Inserted!!');
                            }
                        }
                    }

                    $res = array(
                        'success' => true,
                        'message' => 'All is well!!',
                        // 'results' => $flattenedDrugs
                    );

                    // Return the flattened array as JSON response
                    return response()->json($res);
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered while decoding JSON response!!'
                    );
                    return response()->json($res);
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'No response from the API!!'
                );
                return response()->json($res);
            }
        } else {
            return response()->json(['error' => 'File not found, please run export data first'], 404);
        }

    }

 public function getNDAMISBankAPIConfigurations()
    {
        $ndamis_configs = DB::table('tra_ndamisbankapi_configurations')->first();
        return $ndamis_configs;

    }


public function validateInvoiceNDAMIS(Request $req){
         // Data from the form
    $invoiceNo = 'INV2405136866';
    //$invoiceNo = 'INV2405136418';
    $ndamis_configs = $this->getNDAMISBankAPIConfigurations();
    // SOAP request body
    $requestBody = <<<XML
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsi="http://services.nda.or.ug" xmlns:ns1="http://wsi.nda.or.ug">
       <soapenv:Header/>
       <soapenv:Body>
          <wsi:validateInvoice>
             <arg0>
                <invoiceNo>$invoiceNo</invoiceNo>
                <requestHeader>
                   <password>$ndamis_configs->password</password>
                   <systemID>$ndamis_configs->system_id</systemID>
                   <systemToken>$ndamis_configs->system_token</systemToken>
                   <username>$ndamis_configs->username</username>
                </requestHeader>
             </arg0>
          </wsi:validateInvoice>
       </soapenv:Body>
    </soapenv:Envelope>
    XML;

    // SOAP headers
    $headers = array(
        "Content-type: text/xml;charset=\"utf-8\"",
        "Accept: text/xml",
        "Cache-Control: no-cache",
        "Pragma: no-cache",
        "Content-length: " . strlen($requestBody),
    );

    $ch = curl_init($ndamis_configs->request_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    // Execute cURL request and capture response
    $response = curl_exec($ch);

    // Check for errors
    if ($response === false) {
        $error = curl_error($ch);
        // Handle error
        echo "cURL Error: $error";
    } else {
            $xml = simplexml_load_string($response);
            $statusCode = (string) $xml->xpath('//statusCode')[0];
            $statusMessage = (string) $xml->xpath('//statusMessage')[0];
            if(!validateisNumeric($statusCode)){
                $amount = (string) $xml->xpath('//amount')[0];
                $currencyCode = (string) $xml->xpath('//currencyCode')[0];
                $customerName = (string) $xml->xpath('//customerName')[0];
                $description = (string) $xml->xpath('//description')[0];
                $dueDate = (string) $xml->xpath('//dueDate')[0];
                $invoiceNo = (string) $xml->xpath('//invoiceNo')[0];
                $paymentExists = (string) $xml->xpath('//paymentExists')[0];
                $reference1 = (string) $xml->xpath('//reference1')[0];
                $status = (string) $xml->xpath('//status')[0];
                $systemMessage = (string) $xml->xpath('//systemMessage')[0];
            }
            

            echo $statusMessage;
    }

    // Close cURL session
    curl_close($ch);
  }
}
