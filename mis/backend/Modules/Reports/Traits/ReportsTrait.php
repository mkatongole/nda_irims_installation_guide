<?php

namespace Modules\Reports\Traits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;


use \Mpdf\Mpdf as mPDF;

use PDF;

use Modules\Reports\Providers\PdfProvider;
use Modules\Reports\Providers\PdfLettersProvider;
use Modules\Reports\Providers\PdfPlainLettersProvider;

trait ReportsTrait
{

   public function generatePremisePermit($premise_id)
    {
        $params = array(
            'premise_id' => $premise_id,
            'document_type' => 'permit'
        );
        $report = generateJasperReport('premisePermitReport', 'permit_' . time(), 'pdf', $params);
        return $report;
    }

    public function generatePremiseCertificate($premise_id)
    {
        $params = array(
            'premise_id' => $premise_id,
            'document_type' => 'certificate'
        );
        $report = generateJasperReport('certificateReport', 'certificate_' . time(), 'pdf', $params);
        return $report;
    }
	function getCertificateHeader($pdf,$code){
										// add a page
										$pdf->AddPage();
										$pdf->SetLineWidth(0.4);
										//$pdf->Rect(3,3,204,290);
										$pdf->SetLineWidth(1.2);
										//$pdf->Rect(5,5,200,285);
										$pdf->SetLineWidth(0.4);
									//	$pdf->Rect(7,7,195,280);
										$pdf->setMargins(20,25,20,true);
										$template_url = base_path('/');
										$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
										// import page 1
										$tplId = $pdf->importPage(1);	
									
										// use the imported page and place it at point 10,10 with a width of 100 mm
										$pdf->useTemplate($tplId,0,0);
										$pdf->setPageMark();
										$pdf->SetLineWidth(0.4);
										$pdf->Rect(5,5,200,280);
										$pdf->Rect(3,3,204,285);
			
	}
	function funcGenerateQrCode($row,$pdf){
		
								$data = url('/').'/api/permitValidation?application_code='.$row->application_code.'&module_id='.$row->module_id;

								//$data = "application_code:".$row->certificate_no."; Brand Name:".$row->brandName.";Expiry Date:".formatDate($row->expiry_date);
								 $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
								// QRCODE,H : QR-CODE Best error correction
								$template_url = getcwd();
								$qrc_code = $template_url . '/resources/images/q.jpg';
								$width = 16;
								$height = 16;
								
								$qr_codex = 178;
								$qr_codey = 28;
								$pdf->write2DBarcode($data, 'QRCODE,H', $qr_codex,$qr_codey , $width, $height);
							   $pdf->Image($qrc_code,$qr_codex+$width-4,$qr_codey,$width-3,$height-4);
								
		
	}
	function funcAppGenerateQrCode($row,$pdf){
		
								$data = url('/').'/api/permitValidation?application_code='.$row->application_code.'&module_id='.$row->module_id;

								//$data = "application_code:".$row->certificate_no."; Brand Name:".$row->brandName.";Expiry Date:".formatDate($row->expiry_date);
								 $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
								// QRCODE,H : QR-CODE Best error correction
								$template_url = getcwd();
								$qrc_code = $template_url . '/resources/images/qrc_code.jpg';
								$width = 16;
								$height = 16;
								
								$qr_codex = 178;
								$qr_codey = 28;
								$pdf->write2DBarcode($data, 'QRCODE,H', $qr_codex,$qr_codey , $width, $height);
							   //$pdf->Image($qrc_code,$qr_codex+$width-4,$qr_codey,$width-3,$height-4);
								
		
	}
	public function foodProductRegistrationCertificate($application_code,$row){
		try{
			
						
						$is_provisional =0;
						
						if($row){
							if($row->recommendation_id == 2){
								$is_provisional =1;
							}
							$org_info = $this->getOrganisationInfo();
								
								$pdf = new PdfProvider();
								$this->getCertificateHeader($pdf, 'DAR/FMT/042');
								
								$logo = getcwd() . '/resources/images/org-logo.jpg';
								$pdf->SetFont('times','B',9);
								$pdf->Cell(0,1,'',0,1);
								
								
								$pdf->Cell(0,21,'',0,1);
								
								$pdf->Cell(0,5,'REGISTRATION CERTIFICATE OF FOOD PRODUCT',0,1,'C');
								$pdf->SetFont('times','',10);
								$pdf->ln();
								$act_statement = "Made under Law No. 003/2018 of 09/02/2018 establishing the Uganda NDA and determining its mission, organization and functioning in his article 3 and article 8 and regulation No. CBD/TRG/010. The Authority here issues.\n";
								
								$pdf->MultiCell(0,5,$act_statement,0,'J',0,1);
							
								$pdf->SetFont('times','B',10);
								$pdf->Cell(0,3,'',0,1);
								
								$pdf->SetFont('times','',10);
									
                                if( $is_provisional == 1){
                                   // $pdf->Cell(70,8,0,0);
									$pdf->MultiCell(70,8,'Provisional registration number of the medicine',0,'',0,0);
                                }
                                else{
                                    $pdf->Cell(70,8,'Registration number:',0,0);
								
                                }
								
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,8,$row->certificate_no,0,1);
								//$pdf->Cell(0,1,'',0,2);
								$pdf->SetFont('times','',10);
								
								//Brand NameUganda NDA
								$pdf->MultiCell(0,8,"This is to certify that the medicine described below has been registered in Uganda subject to conditions indicated at the back of the this certificate:\n",0,'J',0,1);
							
								$pdf->SetFont('times','',10);
									
								$pdf->MultiCell(70,8,'Brand Name:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								
								$pdf->MultiCell(0,8,strtoupper($row->brandName),0,'',0,1);
								$pdf->SetFont('times','',10);
								
								$pdf->MultiCell(70,8,'Common Name:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								
								$pdf->MultiCell(0,8,strtoupper($row->common_names),0,'',0,1);
								
								$pdf->SetFont('times','',10);
								$pdf->MultiCell(69,10,'Pack size and Packaging type:',0,'',0,0);
								//$pdf->Cell(70,5,'',0,0,'L');
								
								$pdf->SetFont('times','B',10);
								$packaging = '';
											$container_name = '';
											$retail_packaging_size = '';
								$packaging_data = DB::table('tra_product_packaging as t1')
											->select(DB::raw("t1.*, t2.name as container_type, t3.name as container_name, t4.name as container_material, t5.name as closure_materials, t4.name as container_material, t5.name as closure_material, t6.name as seal_type, t7.name as packaging_units, CONCAT_WS('X',retail_packaging_size,retail_packaging_size1,retail_packaging_size2,retail_packaging_size3,retail_packaging_size4) as retail_packaging"))
											->leftJoin('par_containers_types as t2', 't1.container_type_id', '=', 't2.id')
											->leftJoin('par_containers as t3', 't1.container_id', '=', 't3.id')
											->leftJoin('par_containers_materials as t4', 't1.container_material_id', '=', 't4.id')
											->leftJoin('par_closure_materials as t5', 't1.closure_material_id', '=', 't5.id')
											->leftJoin('par_seal_types as t6', 't1.seal_type_id', '=', 't6.id')
											->leftJoin('par_packaging_units as t7', 't1.packaging_units_id', '=', 't7.id')
											->where(array('t1.product_id' => $row->product_id))
											->get();
								
								if($packaging_data->count() >0){
								$i = 1;
									foreach($packaging_data as $packaging_rec){
										
											$container_material = $packaging_rec->container_material;
											$container_name = $packaging_rec->container_name;
											
											$retail_packaging_size = $packaging_rec->retail_packaging;
											
											$product_unit = $packaging_rec->unit_pack;		
											if($i != 1){
												$pdf->Cell(69,5,'',0,0);
											}									
											if($product_unit == ''){
											
													$pdf->MultiCell(0,5,strtoupper($container_material).' '.strtoupper($container_name) .' OF '.strtoupper($retail_packaging_size),0,'',0,1);
											}
											else{
												
													$pdf->MultiCell(0,5,strtoupper($container_material).' '.strtoupper($container_name) .' OF '.strtoupper($retail_packaging_size).' X '.strtoupper($product_unit),0,'',0,1);													
																							
											}
											
											$i++;									
									}
											
								
								}
								else{
											$pdf->MultiCell(0,10,'',0,'',0,1);
											
								}
								
								$pdf->SetFont('times','',10);
								$pdf->MultiCell(70,8,'Shelf life of medicine in months and Storage statement:',0,'',0,0); ;
								
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(100,8,strtoupper($row->shelf_life).', '.strtoupper(html_entity_decode(($row->storage_condition))),0,'',0,1); ;
								
								$pdf->SetFont('times','B',10);
								
								
								$pdf->MultiCell(70,10,'Name of Marketing authorization holder:',0,'',0,0);
								
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,10,strtoupper($row->trader_name),0,'',0,1);
								//$pdf->Cell(100,12,ucwords($applicantName),0,1,'L'); 
								//$pdf->Cell(0,1,'',0,1);
								//Manufacturer
								 $manrow = DB::table('tra_product_manufacturers as t1')
									->select('t1.*', 't2.email_address','t1.id as manufacturer_id', 't2.physical_address', 't2.name as manufacturer_name','t2.postal_address', 't3.name as country_name', 't4.name as region_name', 't5.name as district_name')
									->join('tra_manufacturers_information as t2', 't1.manufacturer_id', '=', 't2.id')
									->join('par_countries as t3', 't2.country_id', '=', 't3.id')
									->leftJoin('par_regions as t4', 't2.region_id', '=', 't4.id')
									->leftJoin('par_districts as t5', 't2.district_id', '=', 't5.id')
									->leftJoin('par_manufacturing_roles as t6', 't1.manufacturer_role_id', '=', 't6.id')
									->where(array('t1.product_id' => $row->product_id, 'manufacturer_type_id' => 1))
									->first();
									
									$manufacturer_name='';
									$man_postal_address='';
									$man_physical_address='';
									$man_countryName='';
									$man_districtName='';
									$man_regionName = '';
									
								if($manrow){
									$manufacturer_name=$manrow->manufacturer_name;
									$man_postal_address=$manrow->postal_address;
									$man_physical_address=$manrow->physical_address;
									
									$man_countryName= $manrow->country_name;
									$man_regionName = $manrow->region_name;
								}
								
								//Manufacturer sql 
								$pdf->SetFont('times','',10);
								
								$pdf->MultiCell(70,10,'Name and Address of the Manufacturer:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,5,strtoupper($manufacturer_name),0,'',0,1);
								
								$pdf->SetFont('times','',10);
								$pdf->Cell(70,5,'',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,5,strtoupper($man_postal_address),0,'',0,1);
								$pdf->Cell(70,5,'',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,5,strtoupper($man_physical_address),0,'L');
								
								if($man_regionName!=''){
									$pdf->Cell(70,5,'',0,0,'L');
									$pdf->SetFont('times','B',10);
									$pdf->Cell(100,5,strtoupper($man_regionName),0,1,'L'); 
								}
								$pdf->Cell(70,5,'',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,5,strtoupper($man_countryName),0,1,'L'); 
								 
								$pdf->SetFont('times','',10);
								$pdf->MultiCell(70,8,'Name of Local Technical Representative:',0,'',0,0);
								
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,8,strtoupper($row->localAgentName),0,'',0,1);
								
								$pdf->SetFont('times','',10);
								$pdf->Cell(70,8,'Valid From:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(35,8,ucwords(date('F d, Y ',strtotime($row->certificate_issue_date))),0,0,'L'); 
								
								
								$pdf->SetFont('times','',10);
								$pdf->Cell(30,8,'To:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(0,8,ucwords(date('F d, Y ',strtotime($row->expiry_date))),0,1,'L'); 
								
								
								$pdf->Cell(0,2,'',0,1);
								$permit_signitory = '';
								$title= 'ACTING';
								$title= '';
								$approved_by = '';
								$this->funcGenerateQrCode($row,$pdf);
								
								$this->getCertificateSignatoryDetail($row,$pdf);
								
								$pdf->AddPage();
								$pdf->SetFont('times','B',9);
								
								
								$pdf->Cell(0,5,'Conditions of Registration:',0,1);
								$pdf->SetFont('times','',11);
								$pdf->Cell(0,2,'',0,1);
								
								$this->getCertificateRegistrationConditions($row,$pdf);
								
								$pdf->Output();
						}	
							
								
			
			
		} catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
			} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
			}
			print_r($res);
			exit();
        return response()->json($res);
		
	}

	public function printApplicationReceipt($payment_id,$invoice_id,$request, $permit_previewoption,$upload_directory=null){
        $table_name = $request->input('table_name');
        $application_code = $request->input('application_code');
       
        $application_id = $request->input('application_id');
        $module_id = $request->input('module_id');
		
        if(validateIsNumeric($module_id)){
            $module_details = getTableData('modules', array('id' => $module_id));
            $table_name = $module_details->table_name;
        }
        
        if(validateIsNumeric($application_code)){
            $reference_no = getSingleRecordColValue($table_name, array('application_code' => $application_code), 'reference_no');
           // $payment_id = getSingleRecordColValue('tra_payments', array('application_code' => $application_code), 'id');
        }
        else{
            
            $reference_no = getSingleRecordColValue($table_name, array('id' => $application_id), 'reference_no');
            $application_code = getSingleRecordColValue($table_name, array('id' => $application_id), 'application_code');
            
        }
        $payment_receivedby = '';
         $invoice_details = getInvoiceDetails($module_id, $application_id,$application_code);
        $app_description= '';
        if(isset($invoice_details)){
                $app_description = $invoice_details['module_desc'];
            }
        //check the paymetn Control Number 
        $rec = DB::table('tra_payments as t1')
                    ->join('wb_trader_account as t2','t1.applicant_id', 't2.id')
                    ->leftJoin('par_countries as t3', 't2.country_id','t3.id')
                    ->leftJoin('par_regions as t4', 't2.region_id','t4.id')
                    ->leftJoin('modules as t5', 't1.module_id','t5.id')
                    ->leftJoin('sub_modules as t6', 't1.sub_module_id','t6.id')
                    ->leftJoin('par_currencies as t7', 't1.currency_id','t7.id')
                    ->leftJoin('par_payment_modes as t8', 't1.payment_mode_id','t8.id')
                    ->leftJoin('users as t9', 't1.usr_id','t9.id')
                    ->leftJoin('tra_premises_applications as t10', 't10.application_code','t1.application_code')
                    ->leftJoin('tra_premises as t11', 't10.premise_id','t11.id')
                    ->select('t1.*','t11.name as premise_name','t11.physical_address as premise_physical_address','t2.name as applicant_name','t8.name as payment_mode', 't7.name as currency_name', 't2.postal_address', 't2.email','t3.name as country_name','t4.name as region_name', 't5.name as module_name', 't6.name as sub_module', DB::raw(" CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as payment_receivedby"))
                    ->where(array('t1.id'=>$payment_id))->first();
        if($rec){
            $payment_type_id = $rec->payment_type_id;
            $payment_receivedby = $rec->payment_receivedby;
            if($payment_type_id == 3){
                $this->funcGenerateCreditNote($payment_id);
                
            }
            else{
                $pdf = new PdfLettersProvider();
                $pdf->AddPage('');
                $template_url = base_path('/');
                $pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
                                                                        // import page 1
                $tplId = $pdf->importPage(1);   
                $pdf->useTemplate($tplId,0,0);
                $pdf->setPageMark();
                            
                $pdf->setPrintHeader(false);
                $pdf->setPrintFooter(false);
                $org_rec = getSingleRecord('tra_organisation_information', array('id'=>1));
                $logo = getcwd() . '/resources/images/zamra-logo.png';
                $org_rec = getSingleRecord('tra_organisation_information', array('id'=>1));
                $logo = getcwd() . '/resources/images/zamra-logo.png';
                $pdf->SetFont('times', 'B', 11);
                $this->returnReportHeader($pdf,$org_rec,$rec,'RECEIPT');
                
                
                $pdf->SetFont('times','B',10);
                $pdf->Cell(70,7,strtoupper('Account Payer(From)'),0,0); 
                $pdf->Cell(0,7,strtoupper('Receipt Details'),0,1,'R');
                $pdf->SetFont('times', '', 10);
               if($module_id==2 || $module_id===2 || $module_id==29 || $module_id===29){
                    $pdf->Cell(0,7,'Applicant Name:'. $rec->applicant_name,0,1);
                    $pdf->Cell(0,7,'Premise Name:'. $rec->premise_name,0,1);
                    $pdf->Cell(0,7,strtoupper('Payment Date:'.$rec->trans_date),0,1, 'R');
                    $pdf->Cell(0,7,'Physical Address:'. $rec->premise_physical_address,0,1);
                }else{
                    $pdf->Cell(70,7,strtoupper($rec->applicant_name),0,0);
                    $pdf->Cell(0,7,strtoupper('Payment Date:'.$rec->trans_date),0,1, 'R');
                    $pdf->Cell(70,7,strtoupper($rec->postal_address.', '.$rec->region_name.', '.$rec->country_name),0,0);
                }
                $pdf->Cell(0,7,strtoupper('Receipt Number: '.$rec->receipt_no),0,1,'R');
                $pdf->Cell(70,7,strtoupper($rec->email),0,0);
                $pdf->Cell(0,7,strtoupper('Payment Mode: '.$rec->payment_mode),0,1, 'R');
                
                $pdf->SetFont('times', 'b', 10);
                
                $pdf->Cell(0,7,strtoupper('Ref No:'. $rec->tracking_no .' '.$rec->reference_no),0,1, 'R');
                
                $pdf->ln();
                
                $pdf->SetFont('times', 'b', 10);
                
                $pdf->SetFont('times','',10);
                
                $pdf->SetFont('times','B',10);
                //$pdf->Cell(0,7,'Receipt/Payments Details for '.$rec->module_name.' ('.$rec->sub_module.')',0,1,'');
                $pdf->MultiCell(0, 7, 'Receipt/Payments Details for '.$rec->module_name.' ('.$rec->sub_module.') '.$app_description, 0, 'L');
                //invoice details 
                $pdf->SetLineWidth(0.1);
                $pdf->SetFont('times','B',10);
                $pdf->Cell(15,10,'Sn',1,0);
                $pdf->Cell(140,10,'Being Payment for: ',1,0,'C');
                $pdf->Cell(0,10,'Total',1,1,'C');
                $inv_rec = DB::table('payments_references as t1')
                                ->leftJoin('par_currencies as t2','t1.currency_id','t2.id')
                                ->leftJoin('tra_element_costs as t3','t1.element_costs_id','t3.id')
                                ->leftJoin('par_cost_elements as t4','t3.element_id','t4.id')
                                ->leftJoin('par_fee_types as t5','t3.feetype_id','t5.id')
                                ->leftJoin('par_cost_categories as t6','t3.cost_category_id','t6.id')
                                ->select(DB::raw(" t4.name AS cost_element, t5.name AS fee_type, t6.name AS cost_category, t1.amount_paid, t1.currency_id,t2.name as currency_name"))
                                ->where(array('t1.receipt_id'=>$payment_id))
                                ->get();
                                
                if($inv_rec){
                    $i = 1;
                    $total_amount = 0;
                    $currency_name = '';
                    $currency_id = '';$pdf->SetLineWidth(0.1);
                    foreach($inv_rec as $inv){
                        $currency_name = $inv->currency_name;
                        $cost_item = $inv->fee_type." ".$inv->cost_category." ".$inv->cost_element;
                        $pdf->SetFont('times','',10);
                            $rowcount = max($pdf->getNumLines($cost_item, 92),$pdf->getNumLines($inv->amount_paid, 40));
                        $pdf->MultiCell(15,7*$rowcount,$i,1,'',0,0);
                        $pdf->MultiCell(140,7*$rowcount,$cost_item,1,'',0,0);
                        $pdf->MultiCell(0,7*$rowcount,formatMoney($inv->amount_paid),1,'R',0,1);
                        $total_amount = $total_amount+$inv->amount_paid;
                        
                        $i++;
                    }
                    $pdf->SetFont('times','B',10);
                    $pdf->MultiCell(155,10,'Sub-Total('.$currency_name.')',1,'R',0,0);
                    $pdf->MultiCell(0,10,formatMoney($total_amount),1,'R',0,1);
                        
                    $pdf->MultiCell(155,10,'Received with thanks Total Amount('.$currency_name.')',1,'R',0,0);
                    $pdf->MultiCell(0,10,formatMoney($total_amount),1,'R',0,1);
                        
                }
                $pdf->SetFont('times','i',10);
                $pdf->MultiCell(0,7,'Amount in words '.ucwords(convert_number_to_words($rec->amount_paid)).'('.$currency_name.')'.' Only',1,'',0,1);
                $pdf->MultiCell(100,7,'Received By: National Drug Authority',1,'',0,0);
                $pdf->MultiCell(0,7,'Print Date: '.Carbon::now(),1,'',0,1);


                //$pdf->AddPage();

                 if(!validateIsNumeric($module_id)){
                     $module_details = getTableData('sub_modules', array('id' => $sub_module_id));
                     if($module_details){
                          $module_id = $module_details->module_id;
                
                     }
                 
                 }



            if(!validateIsNumeric($invoice_id)){
                $invoice_record = DB::table('tra_application_invoices')->where('application_code',$application_code)->first();
                if($invoice_record){
                        $invoice_id = $invoice_record->id;
                }
             }
            
              $invoice_details = getInvoiceDetails($module_id, $application_id,$application_code);
             $app_description= '';

            if(isset($invoice_details)){
                $app_description = $invoice_details['module_desc'];
            }
            //check the paymetn Control Number 
           $rec = DB::table('tra_application_invoices as t1')
                    ->join('wb_trader_account as t2','t1.applicant_id', 't2.id')
                    ->leftJoin('par_countries as t3', 't2.country_id','t3.id')
                    ->leftJoin('par_regions as t4', 't2.region_id','t4.id')
                    ->leftJoin('modules as t5', 't1.module_id','t5.id')
                    ->leftJoin('sub_modules as t6', 't1.sub_module_id','t6.id')
                    ->leftJoin('tra_premises_applications as t7', 't7.application_code','t1.application_code')
                    ->leftJoin('tra_premises as t8', 't7.premise_id','t8.id')
                    ->select('t1.*','t2.identification_no','t2.name as applicant_name','t2.postal_address', 't2.email','t3.name as country_name','t4.name as region_name', 't5.name as module_name', 't6.name as sub_module','t8.name as premise_name','t8.physical_address as premise_physical_address')
                    ->where(array('t1.id'=>$invoice_id))->first();
                $PayCntrNum = $rec->PayCntrNum;
                
                        $params = array(
                            'invoice_id' => $invoice_id,
                            'application_code'=>$application_code
                        );
                        
                    // $org_info = $this->getOrganisationInfo();
                    // $pdf = new PdfLettersProvider();
                    $pdf->AddPage();
                    // $template_url = base_path('/');
                    // $pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
                    //                                                         // import page 1
                    // $tplId = $pdf->importPage(1);   
                    // $pdf->useTemplate($tplId,0,0);
                    // $pdf->setPageMark();
                                
                                
                    $pdf->SetFont('times','B',9);
                    $pdf->Cell(0,1,'',0,1);
                    $pdf->setPrintHeader(false);
                    $pdf->setPrintFooter(false);
                    
                    $org_rec = getSingleRecord('tra_organisation_information', array('id'=>1));
                    $logo = getcwd() . '/resources/images/org-logo.jpg';
                    $pdf->SetFont('times', 'B', 11);

                    $this->returnInvoiceReportHeader($pdf,$org_rec,$rec, 'TAX INVOICE');
                

                    $pdf->Cell(0,7,'To:',0,1);
                    $pdf->SetFont('times', '', 10);
                    $pdf->Cell(0,7,'Customer No:'. $rec->identification_no,0,1);
                    if($module_id==2 || $module_id===2 || $module_id==29 || $module_id===29){
                        $pdf->Cell(0,7,'Applicant Name:'. $rec->applicant_name,0,1);
                        $pdf->Cell(0,7,'Premise Name:'. $rec->premise_name,0,1);
                         $pdf->Cell(0,7,'Physical Address:'. $rec->premise_physical_address,0,1);
                    }else{
                        $pdf->Cell(0,7,$rec->applicant_name,0,1);
                         $pdf->Cell(0,7,$rec->postal_address.', '.$rec->region_name.', '.$rec->country_name,0,1);
                    }
                
                    $pdf->Cell(0,7,$rec->email,0,1);
                    $pdf->SetFont('times', 'B', 11);
                    
                     $pdf->MultiCell(0, 7, 'Invoice Details for '.$rec->module_name.' ('.$rec->sub_module.') '.$app_description, 0, 'L');
                    $pdf->SetFont('times', 'B', 10);
                   
                    $pdf->SetLineWidth(0.1);
                    //invoice details 
                    $pdf->Cell(15,10,'QTY',1,0);
                    $pdf->Cell(100,10,'IN RESPECT OF',1,0,'C');
                    $pdf->Cell(40,10,'RATE',1,0,'C');
                    $pdf->Cell(0,10,'AMOUNT',1,1,'C');
                    $inv_rec = DB::table('tra_invoice_details as t1')
                                    ->leftJoin('par_currencies as t2','t1.paying_currency_id','t2.id')
                                    ->leftJoin('tra_element_costs as t3','t1.element_costs_id','t3.id')
                                    ->leftJoin('par_cost_elements as t4','t3.element_id','t4.id')
                                    ->leftJoin('par_fee_types as t5','t3.feetype_id','t5.id')
                                    ->leftJoin('par_cost_categories as t6','t3.cost_category_id','t6.id')
                                    ->select(DB::raw(" t4.name AS cost_element, t5.name AS fee_type, t6.name AS cost_category, t1.total_element_amount AS invoice_amount, t1.paying_currency_id,t2.name as currency_name"))
                                    ->where(array('t1.invoice_id'=>$invoice_id))
                                    ->get();


                    if($inv_rec){
                        
                        
                        $i = 1;
                        $total_amount = 0;
                        $currency_name = '';
                        $paying_currency_id = '';
                        $pdf->SetFont('times', '', 10);
                        foreach($inv_rec as $inv){

                            $currency_name = $inv->currency_name;
                            $cost_item = $inv->fee_type." ".$inv->cost_category." ".$inv->cost_element;
                            $paying_currency_id = $inv->paying_currency_id;
                                $rowcount = max($pdf->getNumLines($cost_item, 92),$pdf->getNumLines($inv->invoice_amount, 40));
                            $pdf->MultiCell(15,7*$rowcount,$i,1,'',0,0);
                            $pdf->MultiCell(100,7*$rowcount,$cost_item,1,'',0,0);
                            $pdf->MultiCell(40,7*$rowcount,formatMoney($inv->invoice_amount),1,'R',0,0);
                            $pdf->MultiCell(0,7*$rowcount,formatMoney($inv->invoice_amount),1,'R',0,1);
                            $total_amount = $total_amount+$inv->invoice_amount;
                            
                            $i++;
                        }
                        
                        $pdf->MultiCell(155,10,'Sub-Total('.$currency_name.')',1,'R',0,0);
                        $pdf->MultiCell(0,10,formatMoney($total_amount),1,'R',0,1);
                            
                        $pdf->MultiCell(155,10,'Total('.$currency_name.')',1,'R',0,0);
                        $pdf->MultiCell(0,10,formatMoney($total_amount),1,'R',0,1);
                            
                    }
                    
                    //get the Bank Details based on the paying currency
                    
                    if($module_id==2 || $module_id===2 || $module_id==29 || $module_id===29){

                    $premise_id= getSingleRecordColValue('tra_premises_applications', array('application_code' => $application_code), 'premise_id');

                    $region_id= getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'region_id');
                     
                    if(!validateisNumeric($region_id)){
                      $region_id= getSingleRecordColValue('wb_premises_applications', array('application_code'=>$application_code), 'region_id', 'portal_db');
                     }
                     $bank_rec = DB::table('tra_orgbank_accounts as t1')
                                ->leftJoin('par_banks as t2', 't1.bank_id', 't2.id')
                                ->leftJoin('par_bankbranches as t3', 't1.branch_id', 't3.id')
                                ->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                                ->select(DB::raw("t4.name as currency_name, t1.account_name, t1.account_no, t1.swft_code, t2.name AS bank_name, t3.name AS branch_name"))
                                ->where(array('t1.is_head_office'=>2,'t1.region_id'=>$region_id))
                                ->get();

                         if ($bank_rec->isEmpty()) {
                            $bank_rec = DB::table('tra_orgbank_accounts as t1')
                                ->leftJoin('par_banks as t2', 't1.bank_id', 't2.id')
                                ->leftJoin('par_bankbranches as t3', 't1.branch_id', 't3.id')
                                ->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                                ->select(DB::raw("t4.name as currency_name, t1.account_name, t1.account_no, t1.swft_code, t2.name AS bank_name, t3.name AS branch_name"))
                                ->where(array('t1.is_head_office'=>1))
                                ->get();

                        }

                  }else{
                      $bank_rec = DB::table('tra_orgbank_accounts as t1')
                                ->leftJoin('par_banks as t2', 't1.bank_id', 't2.id')
                                ->leftJoin('par_bankbranches as t3', 't1.branch_id', 't3.id')
                                ->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                                ->select(DB::raw("t4.name as currency_name, t1.account_name, t1.account_no, t1.swft_code, t2.name AS bank_name, t3.name AS branch_name"))
                                ->where(array('t1.is_head_office'=>1))
                                ->get();
                    }
                        if($bank_rec){
                            $pdf->ln();
                            $pdf->SetFont('times',' ',10); 
                            $pdf->MultiCell(0,7,'Total Due in words ***'.ucwords(convert_number_to_words($total_amount)).'('.$currency_name.')'.' Only ***',0,'',0,1); 
                            $pdf->SetFont('times','i',10); 
                            $pdf->MultiCell(0,7,'The amount above is now due:',0,'',0,1);  
                            $pdf->SetFont('times', 'B', 10);
                            $i = 1;
                        foreach($bank_rec as $bank){

                        $pdf->MultiCell(0,7,$i.'.'.$bank->currency_name." "."A/C No.".$bank->account_no.'('.$bank->bank_name.')'.'-'.$bank->account_name,0,'',0,1);   
                           $i++;        
                        }
                    }  
                    //$pdf->ln();
                    $pdf->SetFont('times', '', 10);
                    $pdf->MultiCell(0,7,'Payments to National Drug Authority (NDA) must be net invoice figures',0,'',0,1); 
                     $pdf->SetFont('times', 'B', 10);
                    $pdf->MultiCell(0,7,'All Bank Charges shall be met by the Payer',0,'',0,1);   

                    $pdf->SetFont('','',10);
                    $print_date = date('F d\\, Y',strtotime(Carbon::now()));  
                               
                   // $pdf->ln();
                                            
                    $startY = $pdf->GetY();
                    $startX = $pdf->GetX();


                    $pdf->SetFont('times', 'B', 11);
                    $pdf->Cell(0,8,'System Generated Report',0,1,'C');    
                    $pdf->SetFont('','',11);                                  
                    $pdf->Cell(0,8,'Printed On: '.$print_date,0,1,'C');   
                    
                if($permit_previewoption =='preview'){
											
					$pdf->Output($rec->tracking_no.' Payment Receipt.pdf');											
				}
				else{
					$pdf->Output($upload_directory, "F"); 
				 }	
			}
			
		
		}
		else{
			echo "<h4>Receipt details Not Found</h4>";
		}
       
		
	}

	function returnReportHeader($pdf,$org_rec,$rec,$title){
        $pdf->Cell(0,25,'',0,1);
               $pdf->Cell(0, 6, strtoupper($org_rec->name), 0, 1, 'C');
              $pdf->SetFont('times', 'B', 9);
               $pdf->Cell(0, 4, $org_rec->postal_address.', '.$org_rec->region_name.', '.$org_rec->republic, 0, 1, 'C');
               $pdf->Cell(0, 4, 'Tel: '.$org_rec->telephone_nos.' Fax: '.$org_rec->fax, 0, 1, 'C');
               $pdf->Cell(0,4, $org_rec->physical_address, 0, 1, 'C');
               $pdf->Cell(0, 4, 'Website: '.$org_rec->website.', Email: '.$org_rec->email_address, 0, 1, 'C');
               $pdf->Cell(0, 4, '', 0, 2);
             //  $pdf->Image($logo, 86, 40, 35, 14);
               $pdf->SetFont('times', 'B', 13);
               if(isset($rec->invoice_no)){
                       $data = '{"invoice_no":'.$rec->invoice_no.',"module_id":'.$rec->module_id.',"application_code":'.$rec->application_code.'}';
               }
               else{
                       $data = '{"receipt_no":'.$rec->receipt_no.',"module_id":'.$rec->module_id.',"application_code":'.$rec->application_code.'}';
                   
               }
        

                $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
                                                                                            
                $pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
               $pdf->Cell(0, 7, strtoupper($title), 0, 2, 'C');
                $pdf->SetFont('times', 'B', 11);
        
    }



	public function GetInmportExportProducts($pdf,$application_code,$sub_module){
		$portal_databasename = DB::connection('portal_db')->getDatabaseName();
		$total_amount=0;
			$record = DB::table($portal_databasename.'.wb_importexport_applications as t1')
						->join('sub_modules as t2','t1.sub_module_id','t2.id')
						->leftJoin('wb_trader_account as t3','t1.trader_id', 't3.id')
						->leftJoin('par_countries as t4', 't3.country_id', 't4.id')
						->leftJoin('par_regions as t5', 't3.region_id', 't5.id')
						->leftJoin('par_ports_information as t6', 't1.port_id', 't6.id')
						->leftJoin('tra_managerpermits_review as t7', 't1.application_code', 't7.application_code')
						->leftJoin('users as t8', 't7.permit_signatory', 't8.id')
						->leftJoin('tra_permitsenderreceiver_data as t9','t1.sender_receiver_id', 't9.id')
						->leftJoin('par_countries as t10', 't9.country_id', 't10.id')
						->leftJoin('par_regions as t11', 't9.region_id', 't11.id')
						->leftJoin('par_modesof_transport as t12', 't1.mode_oftransport_id', 't12.id')
						->leftJoin('tra_managerpermits_review as t13', 't1.application_code', 't13.application_code')
						->leftJoin('tra_consignee_data as t14', 't1.consignee_id', 't14.id')
						->leftJoin('par_sections as t15', 't1.section_id', 't15.id')
						->leftJoin('tra_premises as t16', 't1.premise_id', 't16.id')
						->leftJoin('par_sections as t17', 't1.section_id', 't17.id')
						->leftJoin('par_business_types as t20', 't16.business_type_id', 't20.id')
						
							->leftJoin('par_permitsproduct_categories as t18', 't1.permit_productscategory_id', 't18.id')
						->select('t2.title','t20.name as business_type', 't1.premise_id','t13.expiry_date as permit_expiry_date','t18.name as permit_productscat', 't17.name as permit_productscategory', 't3.physical_address as applicant_physical_address', 't3.postal_address as applicant_postal_address', 't15.name  as product_category','t16.*','t2.title as permit_title','t13.permit_no','t14.name as consignee_name', 't1.sub_module_id', 't1.*','t16.name as premise_name','t3.name as applicant_name','t2.action_title','t6.name as port_entry', 't3.*', 't4.name as country_name', 't5.name as region_name','t7.permit_signatory', 't7.approval_date', DB::raw("concat(decrypt(t8.first_name),' ',decrypt(t8.last_name)) as permit_signatoryname, t9.name as suppler_name, t9.physical_address as suppler_address,'t13.expiry_date',  t9.postal_address as supplierpostal_address,
									 t10.name as supplier_country, t11.name as supplier_region, t9.postal_address as supplier_postal_address, t12.name as mode_of_transport"))
						->where('t1.application_code',$application_code)
						->first();
						$sub_module_id = $record->sub_module_id;
						$permit_title = $record->permit_title;
						$action_title = $record->action_title;
						$consignee_name  = $record->consignee_name ;
						$approval_date = '';
						if($record->approval_date != ''){
								$approval_date = $record->approval_date;
						}
						
						if($record){
							
								 if($record->sub_module_id == 82){
									 
										//$pdf->Cell(0,7,'Visa  No: ',0,1);
								 }
									$pdf->SetFont('times','B',14);
								$pdf->Cell(0,8,'Application Details',0,1);
								$pdf->setCellHeightRatio(1.8);
								 if(validateIsNumeric($record->premise_id)){
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'Name of Importer: ',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->premise_name,0,1);
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'TIN: ',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->tpin_no,0,1);
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'Premise No: ',0,0);
									 $pdf->SetFont('','',10);
									 //$pdf->Cell(0,7,$record->premise_reg_no,0,1);
									 $pdf->MultiCell(0,7,$record->premise_reg_no.' ('.$record->business_type.')',0,'',0,1);
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'Postal Address: ',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->postal_address,0,1);
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'Physical Location: ',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->physical_address,0,1);
									 
								 }
								 else{
									 
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'Name of Importer: ',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->applicant_name,0,1);
									 
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'TIN: ',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->tin_no,0,1);
									 
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'Postal Address: ',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->applicant_postal_address,0,1);
									 
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'Physical Location: ',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->applicant_physical_address,0,1);
									 
								 }
								 
								 $pdf->ln();
								 $startY = $pdf->GetY()-5;
										$startX = $pdf->GetX();
										$pdf->SetLineWidth(0.2);
										$pdf->Line(0+10,$startY,198,$startY);
											$pdf->SetFont('','B',10);
								
								$pdf->SetFont('','B',10);
									// $pdf->Cell(40,7,'Product Category: ',0,0);
									 $pdf->SetFont('','',10);
									// $pdf->Cell(0,7,$record->permit_productscategory,0,1);
									  $pdf->MultiCell(40,7,'Product Category:',0,'',0,0);
									 $pdf->MultiCell(0,7,$record->permit_productscategory.' ('.$record->permit_productscat.')',0,'',0,1);
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'Transport Mean:',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->mode_of_transport,0,1);
									 
									 $pdf->SetFont('','B',10);
									 $pdf->Cell(40,7,'Port Of Entry:',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->port_entry,0,1);
									 
								$pdf->SetFont('','',10);
								$pdf->setCellHeightRatio(1.8);
									$pdf->ln();
								$pdf->SetFont('','B',9);
								$pdf->SetLineWidth(0.1);
								
								
								$pdf->SetFont('','',9);
							$records = DB::table($portal_databasename.'.wb_permits_products as t1')
								->leftJoin('tra_product_information as t2', 't1.product_id', 't2.id')
								->leftJoin('par_dosage_forms as t3', 't1.dosage_form_id', 't3.id')
								->leftJoin('par_packaging_units as t4', 't1.packaging_unit_id', 't4.id')
								->leftJoin('par_common_names as t5', 't1.common_name_id', 't5.id')
								->leftJoin('par_si_units as t6', 't1.unitpack_unit_id', 't6.id')
								->leftJoin('par_currencies as t7', 't1.currency_id', 't7.id')
								->leftJoin('tra_manufacturers_information as t8', 't1.manufacturer_id', 't8.id')
								->leftJoin('par_countries as t9', 't1.country_oforigin_id', 't9.id')
								->select('t1.*','t7.name as currency_name','t8.name as manufacturer_name',  't4.name as packaging_unit','t1.product_strength','t5.name as generic_name','t1.permitcommon_name', 't2.brand_name','t9.name as country_name', 't3.name as dosage_form', 't6.name as si_unit', 't1.unitpack_size', 't1.product_strength')
								->where(array('t1.application_code'=>$application_code))
								->get();
								$pdf->SetFont('times','B',14);
								$pdf->Cell(0,8,$sub_module.' Product Listing',0,1);
								$pdf->SetFont('times','',10);
											$i=1;		
								if($records->count() >0){
									$pdf->SetFont('times','B',10);
									$pdf->Cell(10,7,'No',1,0);
									$pdf->Cell(35,7,'Registration No',1,0);
									$pdf->Cell(25,7,'Brand Name',1,0);
									$pdf->Cell(25,7,'Dosage',1,0);
									$pdf->Cell(25,7,'No of Packs',1,0);
									$pdf->Cell(25,7,'Currency',1,0);
									$pdf->Cell(20,7,'Price Per Pack',1,0);
									$pdf->Cell(20,7,'Total Value',1,0);
									$pdf->Cell(20,7,'Verification Fee %',1,0);
									$pdf->Cell(0,7,'Verification Fees',1,1);
									$pdf->SetFont('times','',10);
									foreach($records  as $rec){
											if(validateIsNumeric($rec->product_id)){
																$generic_name = $rec->permitcommon_name ;
																	if($rec->permitcommon_name == ''){
																		$generic_name = $rec->generic_name ;
																	}
																	$permit_brandname = $rec->brand_name.' '.$generic_name .' '.$rec->product_strength.' '.$rec->dosage_form.' '.$rec->unitpack_size;
															}
															else{	
															$generic_name = $rec->generic_name ;
															$generic_name = $rec->permitcommon_name ;
																	if($rec->permitcommon_name == ''){
																		$generic_name = $rec->generic_name ;
																	}
																	$permit_brandname = $rec->permitbrand_name.' '.$generic_name .' '.$rec->product_strength.' '.$rec->dosage_form.' '.$rec->unitpack_size;

															}
											$amount = $rec->unit_price*$rec->quantity;										
											$packaging_data = $rec->unitpack_size;
											$product_batch_no = trim($rec->product_batch_no);
											$manufacturing_dates = 'Mgf Date: '.formatDateRpt($rec->product_manufacturing_date).' Exp. Date'.formatDateRpt($rec->product_expiry_date);
											$rowcount = max($pdf->getNumLines($permit_brandname, 25),$pdf->getNumLines($packaging_data, 25),$pdf->getNumLines($packaging_data, 25),$pdf->getNumLines($packaging_data, 25),$pdf->getNumLines($manufacturing_dates, 25),$pdf->getNumLines($product_batch_no, 24));
																
											$pdf->MultiCell(10,5*$rowcount,$i,1,'',0,0);
											$pdf->MultiCell(35,5*$rowcount,$permit_brandname,1,'',0,0);
											$pdf->MultiCell(25,5*$rowcount,$rec->unitpack_size.' '.$rec->si_unit,1,'',0,0);
																
											$pdf->MultiCell(25,5*$rowcount,$product_batch_no,1,'',0,0);
											$pdf->MultiCell(25,5*$rowcount,$manufacturing_dates,1,'',0,0);
											$pdf->MultiCell(25,5*$rowcount,$rec->quantity,1,'',0,0);//.' '.$rec->packaging_unit
											$pdf->MultiCell(20,5*$rowcount,($rec->unit_price).' ',1,'',0,0);
											$pdf->MultiCell(0,5*$rowcount,formatMoney($amount),1,'R',0,1);	
																		
											$currency_name = $rec->currency_name;
											$total_amount = $total_amount+$amount;
											$i++;
										
									}
									 $pdf->SetFont('','B',10);
														$pdf->Cell(145,8,'Total Value in ('.$currency_name.')',1,0, 'R');
															$pdf->Cell(0,8,formatMoney($total_amount),1,1, 'R');
								}   $pdf->SetFont('','',10);
								
								
								 $pdf->SetFont('','B',10);
									 $pdf->Cell(55,7,'Name of the Supplier:',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->suppler_name,0,1);
									 
									  $pdf->SetFont('','B',10);
									 $pdf->Cell(55,7,'Address:',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->supplierpostal_address,0,1);
									
									 
									  $pdf->SetFont('','B',10);
									 $pdf->Cell(55,7,'Physical Location:',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->suppler_address,0,1);
									 
									 
									  $pdf->SetFont('','B',10);
									 $pdf->Cell(55,7,'Country:',0,0);
									 $pdf->SetFont('','',10);
									 $pdf->Cell(0,7,$record->supplier_country,0,1);
		
		
			
			}
		
		
	}
	

	public function printImportPersonalUseLetter($req){
		try{
				$application_code = $req->application_code;
				$record = DB::table('tra_importexport_applications as t1')
						->join('sub_modules as t2','t1.sub_module_id','t2.id')
						->leftJoin('wb_trader_account as t3','t1.applicant_id', 't3.id')
						->leftJoin('par_countries as t4', 't3.country_id', 't4.id')
						->leftJoin('par_regions as t5', 't3.region_id', 't5.id')
						->leftJoin('par_ports_information as t6', 't1.port_id', 't6.id')
						->leftJoin('tra_managerpermits_review as t7', 't1.application_code', 't7.application_code')
						->leftJoin('users as t8', 't1.inspected_by', 't8.id')
						->leftJoin('tra_permitsenderreceiver_data as t9','t1.sender_receiver_id', 't9.id')
						->leftJoin('par_countries as t10', 't9.country_id', 't10.id')
						->leftJoin('par_regions as t11', 't9.region_id', 't11.id')
						->leftJoin('par_modesof_transport as t12', 't1.mode_oftransport_id', 't12.id')
						->leftJoin('tra_managerpermits_review as t13', 't1.application_code', 't13.application_code')
						->leftJoin('tra_consignee_data as t14', 't1.consignee_id', 't14.id')
						->leftJoin('par_sections as t15', 't1.section_id', 't15.id')
						->leftJoin('tra_premises as t16', 't1.premise_id', 't16.id')
						->leftJoin('par_sections as t17', 't1.section_id', 't17.id')
						->leftJoin('par_sections as t19', 't16.section_id', 't19.id')
						->leftJoin('par_business_types as t20', 't16.business_type_id', 't20.id')
						->leftJoin('par_permitsproduct_categories as t18', 't1.permit_productscategory_id', 't18.id')
						->leftJoin('par_titles as t29', 't8.title_id', '=', 't29.id')
						->leftJoin('par_currencies as t30', 't1.proforma_currency_id', 't30.id')
						->select('t2.title','t20.name as business_type', 't19.name as premise_section','t1.premise_id','t13.expiry_date as permit_expiry_date','t18.name as permit_productscat','t17.name as permit_productscategory', 't3.physical_address as applicant_physical_address', 't3.postal_address as applicant_postal_address', 't15.name  as product_category','t2.title as permit_title','t13.permit_no','t14.name as consignee_name', 't1.sub_module_id', 't1.*','t16.name as premise_name','t3.name as applicant_name','t2.action_title','t6.name as port_entry', 't4.name as country_name', 't5.name as region_name','t1.inspected_by as permit_signatory', 't7.approval_date', DB::raw("CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name),'(',t29.name ,')') as permit_signatoryname, t9.name as suppler_name, t9.physical_address as suppler_address, t10.name as supplier_country, t11.name as supplier_region, t9.postal_address as supplier_postal_address, t12.name as mode_of_transport,t30.name as invoice_currency_name"))
						->where('t1.application_code',$application_code)
						->first();
						$sub_module_id = $record->sub_module_id;
						
						$action_title = $record->action_title;
						$consignee_name  = $record->consignee_name ;
						$invoice_currency_name  = $record->invoice_currency_name;
						$application_type_id  = $record->application_type_id;
						$approval_date = '';

						if($application_type_id==1 || $application_type_id===1){
                              $permit_title = 'IMPORTATION OF MERCHANDISE INTENDED FOR FOREIGN MISSION OR PERSONNEL ENTITLED FOR SPECIAL PREVILEGES AND EXCEPTIONS';
						}else{
							$permit_title = 'IMPORTATION OF PRODUCTS FOR PERSONAL USE';
						}
						if($record->approval_date != ''){
								$approval_date = $record->approval_date;
						}
						if($record){
							    $org_info = $this->getOrganisationInfo();

								$pdf = new PdfPlainLettersProvider();
								
								//$pdf->AddPage();
								$template_url = base_path('/');
								$pdf->setSourceFile($template_url . "resources/templates/certificate_template.pdf");
								$tplId = $pdf->importPage(1);	
								$pdf->useTemplate($tplId, 0, 0);

								//$pdf->setPageMark();
 
								$this->getImpPermitCertificateHeader($pdf, $record, $permit_title);
								
								$pdf->SetFont('','B',10);
								 
								 //$pdf->Cell(60,5,'To:',0,1);
								 $pdf->Cell(0,5,'Applicant Name: '.$record->name,0,1);
							
								 $pdf->Cell(0,5,'Address:'.$record->physical_address.' '.$record->street,0,1);
									
								 //$pdf->Cell(0,5,$postal_address,0,1);

								 $pdf->Cell(0,5,'Telephone No:'.$record->telephone_no,0,1);
										
								 $pdf->Cell(0,5,'Email Address:'.$record->email,0,1);
								 if(isset($record->inspected_on)){
								 $pdf->ln();
								 $pdf->Cell(0,5, 'Date :'.date('d F\\, Y',strtotime($record->inspected_on)),0,1,'R');
								 }
									
								 $pdf->ln();
									$pdf->SetFont('','',10);	
								  $pdf->Cell(0,5,'Dear Sir/Madam,',0,1);
								  $pdf->SetLineWidth(3);
								  $pdf->SetFont('','BU',12);
											
								  //$pdf->SetFont('', 'U');
								 // $pdf->MultiCell(7,7,$permit_title ,0,0);	
								 $pdf->writeHTML($permit_title, true, 0, true, true,'L');
								  $pdf->SetFont('','',11);
								  $pdf->ln();
								 $pdf->writeHTML("Reference is made to your application received by NDA on<b> ". date('d F\\, Y',strtotime($record->date_received))." </b>vide tracking number<b>  ".$record->tracking_no."</b>.\n", true, 0, true, true,'J');
                                 $pdf->ln();
								 if($record->applicant_contact_id==2){
                                    $patient=$record->patients_fullnames;
								 }else{
								 	$patient=$record->name;
								 }
                                 
								 if ($record->has_medical_prescription==1) {
		                            $content = 'under the care of<b> ' . $record->prescribing_doctor . ' </b>at<b> ' . $record->prescribling_hospital . ' </b>located at<b> ' . $record->hospital_address . '</b>';
								 } else {
		                            $content = '';
		                          }


								  // $pdf->MultiCell(0,5,"This is to inform you that permission to import products for personal use by ".$patient." ".$content." and being imported on shipping document with AWB/BOL: ".$record->air_bill_no." has been granted.\n" ,0, 'J', 0, 1, '', '', true);

								  $pdf->writeHTML("This is to inform you that permission to import products for personal use by <b> ".$patient."</b> ".$content." and being imported on shipping document with AWB/BOL:<b> ".$record->air_bill_no." </b>has been granted.\n", true, 0, true, true,'J');
                                  $pdf->ln();
								  $pdf->SetFont('','',10);
									$pdf->WriteHTML("By copy of this letter, the Inspector of Drugs, Uganda Revenue Authority and the courier service/clearing company are hereby requested to facilitate release of the consignment to the importer for the intended use.", true, 0, true, true,'J');
								 
								$this->funcImpGenerateQrCode($record,$pdf);
								$pdf->ln();
								 // $startY = $pdf->GetY()-5;
									// 	$startX = $pdf->GetX();
									// 	$pdf->SetLineWidth(0.2);
									// 	$pdf->Line(0+10,$startY,198,$startY);
										
									 
								$pdf->SetFont('','',10);
								$pdf->setCellHeightRatio(1.8);
									
								$pdf->SetFont('','B',9);
								$pdf->SetLineWidth(0.1);
								$pdf->Cell(10,7,'No',1,0);
								$pdf->Cell(45, 7, 'Product Category', 1, 0);
								$pdf->Cell(55,7,'Product',1,0);
								$pdf->Cell(25,7,'Quantity',1,0);
								$pdf->Cell(30,7,'Unit Value',1,0);
								$pdf->Cell(0,7,'Total Value',1,1,'C');
								$pdf->SetFont('','',9);

							    $prod_rec = DB::table('tra_permits_products as t1')
																		->leftJoin('tra_product_information as t2', 't1.product_id', 't2.id')
																		->leftJoin('par_dosage_forms as t3', 't2.dosage_form_id', 't3.id')
																		->leftJoin('par_packaging_units as t4', 't1.packaging_unit_id', 't4.id')
																		->leftJoin('par_common_names as t5', 't1.common_name_id', 't5.id')
																		->leftJoin('par_si_units as t6', 't1.unitpack_unit_id', 't6.id')
																		->leftJoin('par_currencies as t7', 't1.currency_id', 't7.id')
																		->leftJoin('tra_manufacturers_information as t8', 't1.manufacturer_id', 't8.id')
																		->leftJoin('par_countries as t9', 't1.country_oforigin_id', 't9.id')
																		 ->leftJoin('par_importexport_product_category as t10', 't1.product_category_id','=','t10.id')
																		->select('t1.*','t7.name as currency_name', 't1.manufacturer_name as permitmanufacturer_name','t8.name as manufacturer_name',  't4.name as packaging_unit','t1.product_strength','t5.name as generic_name','t1.permitcommon_name', 't2.brand_name','t9.name as country_name', 't3.name as dosage_form', 't6.name as si_unit', 't1.unitpack_size', 't1.product_strength','t10.name as product_category')
																		->where(array('application_code'=>$record->application_code))
																		->get();
											$prod_counter = $prod_rec->count();		
											
								$currency_name = '';											
								$total_amount = 0;											
								if($prod_counter >0){
											$i=1;
									foreach($prod_rec as $rec){
										if(validateIsNumeric($rec->product_id)){
											$generic_name = $rec->generic_name ;
												if($rec->generic_name == ''){
													$generic_name = $rec->permitcommon_name ;
												}
												$permit_brandname = $rec->brand_name.' '.$generic_name .' '.$rec->product_strength.' '.$rec->dosage_form.' '.$rec->unitpack_size;
												//$permit_brandname = $rec->brand_name.' '.$rec->generic_name .' '.$rec->product_strength.' '.$rec->dosage_form.' '.$rec->unitpack_size;
										}
										else{	
										
												$permit_brandname = $rec->permitbrand_name.' '.$rec->permitcommon_name .' '.$rec->product_strength.' '.$rec->dosage_form.' '.$rec->unitpack_size;

										}
										
										if($rec->permitmanufacturer_name != ''){
											
											$permit_brandname .= ' . Manufacturer: '.$rec->permitmanufacturer_name.' Country: '.$rec->country_name;
												
										}
										else{
											if($rec->manufacturer_name != ''){
												$permit_brandname .= ' . Manufacturer: '.$rec->manufacturer_name.' Country: '.$rec->country_name;
												
											}
											
										}
										
										$amount = $rec->unit_price*$rec->quantity;										
										$packaging_data = $rec->unitpack_size.' '.$rec->si_unit;
										$product_batch_no = $rec->product_batch_no;
										$manufacturing_dates = 'Mgf Date: '.formatDateRpt($rec->product_manufacturing_date).' Exp. Date'.formatDateRpt($rec->product_expiry_date);
											
											$rowcount = max(PDF::getNumLines($rec->permitbrand_name, 35),PDF::getNumLines($rec->product_category, 30),PDF::getNumLines($rec->quantity, 30),PDF::getNumLines($i, 30),PDF::getNumLines($rec->unit_price, 30));
											
											$pdf->MultiCell(10,5*$rowcount,$i,1,'',0,0);
											$pdf->MultiCell(45,5*$rowcount,$rec->product_category,1,'',0,0);
											$pdf->MultiCell(55,5*$rowcount,$rec->permitbrand_name,1,'',0,0);
											//$pdf->MultiCell(30,5*$rowcount,$rec->unitpack_size.' '.$rec->si_unit,1,'',0,0);
											
											//$pdf->MultiCell(25,5*$rowcount,$product_batch_no,1,'',0,0);
											//$pdf->MultiCell(25,5*$rowcount,$manufacturing_dates,1,'',0,0);
											$pdf->MultiCell(25,5*$rowcount,$rec->quantity,1,'',0,0);
											$pdf->MultiCell(30,5*$rowcount,($rec->unit_price).' ',1,'',0,0);
											$pdf->MultiCell(0,5*$rowcount,formatMoney($amount),1,'R',0,1);	
											//$pdf->MultiCell(0,5*$rowcount,formatMoney($amount).' '.$rec->currency_name,1,'R',0,1);
													$i++;
											$currency_name = $rec->currency_name;
											$total_amount = $total_amount+$amount;
									} 
									$pdf->Cell(165,7,'Total Value: ('.$invoice_currency_name.' )',1,0, 'R');
										$pdf->Cell(0,7,formatMoney($total_amount),1,1, 'R');
								}   $pdf->SetFont('','',10);
								
								
							
								$pdf->SetFont('','B',10);
								$pdf->Cell(0,8,formatDateRpt($record->permit_expiry_date),0,0);
								$pdf->SetFont('','',10);
								
								$permit_signitory = '';
								$title= 'ACTING';
								$title= '';
								$approved_by = '';
												
								$this->getImportCertificateSignatoryDetail($record,$pdf);
								// if($permit_watermark != ''){
									
								// 	$this->printWaterMark($pdf,$permit_watermark);
								// }
								
								$pdf->Output($permit_title.'.pdf');

						}
					
										
					
		}catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
			} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
			}
			
			print_r($res);
        return response()->json($res);
		
		
		
	}

	function funcImpGenerateQrCode($row,$pdf){
								$public_ipdomain = Config('constants.base_url.public_ipdomain');

								$data = $public_ipdomain.'permitValidation?application_code='.base64_encode($row->application_code).'&module_id='.base64_encode($row->module_id);

								//$data = "application_code:".$row->certificate_no."; Brand Name:".$row->brandName.";Expiry Date:".formatDate($row->expiry_date);
								 $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
								// QRCODE,H : QR-CODE Best error correction
								$template_url = getcwd();
								$qrc_code = $template_url . '/resources/images/qrc_code.jpg';
								$width = 16;
								$height = 16;
								
								$qr_codex = 178;
								$qr_codey = 75;
								$pdf->write2DBarcode($data, 'QRCODE,H', $qr_codex,$qr_codey , $width, $height);
							   //$pdf->Image($qrc_code,$qr_codex+$width-4,$qr_codey,$width-3,$height-4);
								
		
	}

	function getImportCertificateSignatoryDetail($record ,$pdf){
		
						 		
								
										$director_details = getPermitSignatoryDetails();
								
								
										$dg_signatory = $director_details->director_id;
										//$title_name = $director_details->title_name;
										$director = $director_details->director;
										$is_acting_director = $director_details->is_acting_director;
										
										$approved_by = $record->permit_signatory;
										$permit_signatoryname = $record->permit_signatoryname;
										
										if($dg_signatory != $approved_by){
											$signatory = $approved_by;
										}
										else{
											$signatory = $dg_signatory;
										}
										//manually code but will be changed 
										$signatory = 1701;
										//permit_approval permit_signatory 
										$signature = getUserSignatureDetails($approved_by);
										//kXjKa1684726833.png
										$pdf->ln();
											$pdf->SetFont('times','BI',10);
										 //$pdf->Cell(0,6,'By Authority Delegation', 0,1,'');
										 $pdf->Cell(0,6,'', 0,1,'');
										 
								$startY = $pdf->GetY();
								$startX =$pdf->GetX();
										 $logo = getcwd() . '/resources/images/org_stamp.png'; 
											$pdf->SetFont('times','B',9);
											$startY = $pdf->GetY();
											$startX =$pdf->GetX();
										$signature = getcwd() . '/resources/images/signs/'.$signature;
										///opt/lampp/htdocs/mis/resources/images/signs/kXjKa1684726833.png
										//$pdf->Image($signature,$startX+2,$startY-8,35,15);
										$startY = $pdf->GetY();
											$startX =$pdf->GetX();
											$pdf->Image($logo,$startX+30,$startY-8,20,20);
											
										$pdf->ln();
									
										$pdf->ln();
										 	$pdf->SetFont('times','B',10);
										 //$pdf->Cell(0,4,'MARK', 0,1,'');

										 $pdf->Cell(0,4,$record->permit_signatoryname,0,1,'');
										 $pdf->Cell(0,4,'For DIRECTOR, INSPECTORATE & ENFORCEMENT', 0,1,'');
										

		
	}


	function getImpPermitCertificateHeader($pdf,$record,$permit_title){
										// add a page
										$pdf->AddPage();
									
										$pdf->SetLineWidth(0.2);
										$pdf->SetLineWidth(1.2);
										$pdf->SetLineWidth(0.4);
										$pdf->setMargins(10,4,10,true);
										
										//$pdf->setPageMark();
										
										$pdf->SetLineWidth(0.2);
										$org_info = $this->getOrganisationInfo();
										$logo = getcwd() . '/resources/images/cert_logo.png';
										//$pdf->Image($logo, 10, 10, 27, 29);
										$pdf->Image($logo,10,20,80,33);
										
										
										
										$pdf->SetFont('times','B',9);
										$pdf->SetFont('times','B',10);
										$pdf->Cell(0,7,strtoupper($org_info->name),0,1, 'R');
										$pdf->Cell(0,7,'Telephone '.$org_info->telephone_nos,0,1, 'R');
										$pdf->Cell(0,7,'Address '.$org_info->physical_address,0,1, 'R');
										$pdf->Cell(0,7,$org_info->region_name.', '.$org_info->country_name.'. Website: '.$org_info->website,0,1, 'R');
										$pdf->ln();
										$startY = $pdf->GetY()-3;
										$startX = $pdf->GetX();
										
										$pdf->SetLineWidth(0.2);
										$pdf->Line(0+10,$startY,198,$startY);
										
										$pdf->SetFont('','B',15);
										$pdf->MultiCell(0,5,strtoupper($permit_title),0,'C',0,1);
										
										$pdf->SetFont('','',10);
										//$pdf->Cell(0,7,'Date: '.formatDateRpt($record->approval_date),0,1, 'R');
										
			
	}

public function printImportPersonalUseLette11($req){
	try{  
		$org_info = $this->getOrganisationInfo();
		$application_code = $req->application_code;	
		$res = array(
					'success' => false,
					'message' => 'An Error has occured Please Contact System Admin'
		);									
		$records = DB::table('tra_promotion_adverts_applications as t1')
				   ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
				   ->leftJoin('tra_approval_recommendations as t2','t1.application_code', 't2.application_code')
				    ->join('wb_trader_account as t3', 't1.applicant_id', 't3.id')
					->leftJoin('par_countries as t4', 't3.country_id', 't4.id')
					->leftJoin('par_regions as t5', 't3.region_id','t5.id')
					->leftJoin('par_sections as t6', 't1.section_id', 't6.id')
					->leftJoin('par_advertisement_types as t7', 't1.advertisement_type_id', 't7.id')
					->leftJoin('users as t8', 't2.approved_by', 't8.id')
                    ->leftJoin('par_titles as t9', 't8.title_id', '=', 't9.id')
                    ->leftJoin('tra_submissions as t10', 't10.application_code', '=', 't1.application_code')
					->select(DB::raw("t2.decision_id as recommendation_id, t1.*, t3.name as applicant_name, t3.physical_address,t3.email as email_address, t3.postal_address,t3.telephone_no,t4.name as country_name, t5.name as region_name,t6.name as section_name, t1.id as application_id, t2.expiry_date, t2.approval_date, t2.approved_by,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name),'(',t9.name ,')') as approved_by_name ,t10.date_received"))
					->where('t1.application_code',$application_code)
					->first();
                      

					if($records){
						$row = $records;
						$recommendation_id = $row->recommendation_id;
						$ref = $row->tracking_no;
						$date_received = date('d F\\, Y',strtotime($row->date_received));
						//$date_received = $row->date_received;
						$applicant_name = $row->applicant_name;
						$telephone_no = $row->telephone_no;
						$physical_address = $row->physical_address;
						$postal_address = $row->postal_address;
						$region_name = $row->region_name;
						$country_name = $row->country_name;
						$section_id = $row->section_id;
						$section_name = $row->section_name;
						$expiry_date = $row->expiry_date;
						$application_id = $row->application_id;


                       $adverttype_rec =DB::table('tra_promotion_materials_details as t1')
						    ->join('par_promotion_material_items  as t4','t1.promotions_material_id','=','t4.id')
							->join('par_promotion_material_language  as t5','t1.language_id','=','t5.id')
						    ->leftjoin('par_promotion_decision  as t6','t1.approval_recommendation_id','=','t6.id')
							->select(DB::raw('t5.name as promotion_material_language'),DB::raw("IF(t1.promotions_material_id = 10, CONCAT(t4.name, ' (', t1.other_advert_materials, ') -Language:', t5.name), CONCAT(t4.name, ' -Language:', t5.name)) as promotion_material_name"),DB::raw("(SELECT GROUP_CONCAT(CONCAT(p.brand_name, IFNULL(CONCAT(' (Registration No: ', p.registration_no, ')'), '')) SEPARATOR ' ,') FROM tra_promotion_prod_particulars as p WHERE p.promotions_material_id = t1.id) as brand_names"),'t6.name as approval_recommendation','t1.approval_comments','t1.approval_recommendation_id')
								->where('t1.application_id',$application_id)
								->get();
						if($adverttype_rec){
						//$logo=getcwd().'/assets/images/logo.jpg';
						$pdf = new PdfLettersProvider();
						// foreach($adverttype_rec as $material_data){	
						// $approval_recommendation_id=$material_data->approval_recommendation_id; 
                         //$pdf->AddPage();

						$material_data_by_id = []; // Group material data by approval_recommendation_id
						foreach ($adverttype_rec as $material_data) {
						    $approval_recommendation_id = $material_data->approval_recommendation_id; 
						    if (!isset($material_data_by_id[$approval_recommendation_id])) {
						        $material_data_by_id[$approval_recommendation_id] = [];
						    }
						    $material_data_by_id[$approval_recommendation_id][] = $material_data;
						}



					foreach ($material_data_by_id as $approval_recommendation_id => $materials) {

						if($approval_recommendation_id==1 ||$approval_recommendation_id==1){
									$pdf->AddPage();

									if ($pdf->PageNo() !=1) {
										$logo = getcwd() . '/resources/images/cert_logo.png';
										$pdf->Image($logo,65,20,80,33);
									 
									}

									$template_url = base_path('/');
									$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
																											// import page 1
									$tplId = $pdf->importPage(1);	
									$pdf->useTemplate($tplId,0,0);
									$pdf->setPageMark();
									$pdf->SetFont('times','B',9);
									$pdf->Cell(0,1,'',0,1);
									//$pdf->Cell(0,4,'DMS/7/9/22/PR/155',0,1,'R');
									$pdf->Cell(0,4,'',0,1,'R');
									$pdf->SetFont('times','B',13);
									$pdf->Cell(0,15,'',0,1);
									$pdf->Cell(0,4,$org_info->name,0,1,'C');

									$data = '{"tracking_no":'.$row->tracking_no.',"module_id":'.$row->module_id.',"application_code":'.$row->application_code.'}';

									$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
																								// QRCODE,H : QR-CODE Best error correction name
									$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
								
									  $pdf->ln();

									    $pdf->SetFont('','B',9);
                                        $pdf->Cell(0,4,'Regulation 7 (6)',0,1,'R');
										$pdf->Cell(0,4,'Form 46',0,1,'C');
								
										$pdf->SetFont('','B',11);
										
										$pdf->Cell(0,4,'AUTHORISATION TO MAKE A PUBLICATION OR AN ADVERTISEMENT FOR A DRUG',0,1,'C');



									    $pdf->SetFont('','',11);
										$pdf->ln();
										// $pdf->MultiCell(0,5,"Reference is made to your submitted information, received at National Drug Authority on ".$date_received." (NDA Tracking number ".$ref." ).\n" ,0, 'J', 0, 1, '', '', true);

										$pdf->MultiCell(0,5,"This is to certify that..........".$applicant_name." ..........is authorised to make a publication or an advertisement for the following drugs\n" ,0, 'J', 0, 1, '', '', true);

										$pdf->Cell(7,5,'',0,1);
										$material_rec =	DB::table('tra_promotion_materials_details as t1')
			 
										        ->join('par_promotion_material_items  as t2','t1.promotions_material_id','=','t2.id')
												->select(DB::raw("group_concat(concat(t2.name) separator ' / ') as promotion_material")) 
												->where('t1.application_id',$application_id)
												->first();
										
											
											
											PDF::Cell(7,5,'',0,1);
									        //tra_promotion_prod_particulars
											$tbl = '
												<table width="100%" cellspacing="0" cellpadding="1" border = "0.4" >
													<tr style="font-weight:bold;" >
														<td width="5%">S/n</td>
														<td width="45%" >Promotion Material</td>
														<td width="50%">Brand Name (s)</td>
													</tr>';
													$i= 1;

											$advertmaterial_rec =DB::table('tra_promotion_materials_details as t1')
										    ->join('par_promotion_material_items  as t4','t1.promotions_material_id','=','t4.id')
											->join('par_promotion_material_language  as t5','t1.language_id','=','t5.id')
										    ->leftjoin('par_promotion_decision  as t6','t1.approval_recommendation_id','=','t6.id')
											->select(DB::raw('t5.name as promotion_material_language'),DB::raw("IF(t1.promotions_material_id = 10, CONCAT(t4.name, ' (', t1.other_advert_materials, ') -Language:', t5.name), CONCAT(t4.name, ' -Language:', t5.name)) as promotion_material_name"),DB::raw("(SELECT GROUP_CONCAT(CONCAT(p.brand_name, IFNULL(CONCAT(' (Registration No: ', p.registration_no, ')'), '')) SEPARATOR ' ,') FROM tra_promotion_prod_particulars as p WHERE p.promotions_material_id = t1.id) as brand_names"),'t6.name as approval_recommendation','t1.approval_comments','t1.approval_recommendation_id')
												->where('t1.application_id',$application_id)
												->where('t1.approval_recommendation_id',$approval_recommendation_id)
												->get();

											if($advertmaterial_rec){
												foreach($advertmaterial_rec as $rows1){
													$tbl .= '<tr style="font-weight:normal;" >
															<td width="5%">'.$i.'</td>
															<td width="45%">'.$rows1->promotion_material_name.'</td>
															<td width="50%" stype="">'.$rows1->brand_names.'</td>
														</tr>';
													$i++;
												}
												
											}
											$tbl .= "</table>
											";
											$pdf->writeHTML($tbl, true, false, false, false, '');
								      							
										$pdf->SetFont('times','',10);
														 
									
										$pdf->MultiCell(0,5,"This authorisation is issue with the following conditions –\n" ,0, 'J', 0, 1, '', '', true);
										$pdf->Cell(7,5,'',0,1);

										 $this->getCertificateRegistrationConditions($row,$pdf);
								
									$pdf->ln();

                                    $pdf->Cell(0, 8, "This authorization is valid from..............".date('d F\, Y', strtotime($row->approval_date))."............to............".date('d F\, Y', strtotime($row->expiry_date))."............",  0, 1);
									
									$pdf->ln();
									$pdf->ln();
									$startY = $pdf->GetY();
									$startX =$pdf->GetX();
									$director_details = getPermitSignatoryDetails();
									$dg_signatory = $director_details->director_id;
									$director = $director_details->director;
									$is_acting_director = $director_details->is_acting_director;
									$approved_by = $row->approved_by;
									if($dg_signatory != $approved_by){
											$signatory = $approved_by;
									}
									else{
											$signatory = $dg_signatory;
									}
				
																	
									//$signatory = $dg_signatory;
									$signatory = $approved_by;
									$signature = getUserSignatureDetails($signatory);

									$signature = getcwd() . '/resources/images/signs/'.$signature;
									$pdf->Image($signature,$startX+1,$startY-8,30,12);
								
									$pdf->Cell(0,8,'...............................................................', 0,1,'');
									
									$title = "Minister of Health.";
									if($dg_signatory != $approved_by){
											//$title = 'Acting '.$title;
									}else{
										if($is_acting_director ==1){
											//		$title = 'Acting '.$title;
										}
											
									}

									


									
									 $pdf->Cell(0,8,'For: NATIONAL DRUG AUTHORITY',0,1);
									 $pdf->Cell(0, 8, "Date of issuance:..............".date('d F\, Y', strtotime(now()))."............", 0, 1);
									 $pdf->ln();

									if(isset($row->approved_by)){
										$pdf->SetFont('times','',12);
			                             $pdf->Cell(0,8,$row->approved_by_name,0,1,'R');
									}
										$pdf->SetFont('times','',9);
										$template = "<b>" . $title . "</b>";
			                            $pdf->WriteHTML($template, true, false, true, true, 'R');
								     }

						//start rejection
					     
						if($approval_recommendation_id==2 ||$approval_recommendation_id==2){
									$pdf->AddPage();

									if ($pdf->PageNo() !=1) {
										$logo = getcwd() . '/resources/images/cert_logo.png';
										$pdf->Image($logo,65,20,80,33);
									 
									}

									$template_url = base_path('/');
									$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
																											// import page 1
									$tplId = $pdf->importPage(1);	
									$pdf->useTemplate($tplId,0,0);
									$pdf->setPageMark();
									$pdf->SetFont('times','B',9);
									$pdf->Cell(0,1,'',0,1);
									//$pdf->Cell(0,4,'DMS/7/9/22/PR/155',0,1,'R');
									$pdf->Cell(0,4,'',0,1,'R');
									$pdf->SetFont('times','B',13);
									$pdf->Cell(0,15,'',0,1);
									$pdf->Cell(0,4,$org_info->name,0,1,'C');

									$data = '{"tracking_no":'.$row->tracking_no.',"module_id":'.$row->module_id.',"application_code":'.$row->application_code.'}';

									$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
																								// QRCODE,H : QR-CODE Best error correction name
									   $pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);

								
									    $pdf->SetFont('','',11);
										$pdf->Cell(0,10,'',0,1);
				
										$pdf->Cell(0,5, date('d F\\, Y',strtotime($row->approval_date)),0,1,'R');


										$pdf->Cell(60,5,'To:',0,1);
										$pdf->Cell(0,5,$applicant_name,0,1);
							
										$pdf->Cell(0,5,$physical_address,0,1);
									
										$pdf->Cell(0,5,$postal_address,0,1);

										$pdf->Cell(0,5,'Tel:'.$telephone_no,0,1);
										
										$pdf->Cell(0,5,'Email:'.$row->email_address,0,1);
										//local agent
										$pdf->ln();
										
										$pdf->Cell(0,5,'Dear Sir/Madam,',0,1);
										$pdf->SetLineWidth(3);
										$pdf->SetFont('','B',11);
											
										$pdf->SetFont('', 'BU');
										$pdf->Cell(7,7,'RE: REJECTION OF PROMOTIONAL MATERIALS',0,0);	
									    $pdf->SetFont('','',11);
										$pdf->ln();
										$pdf->MultiCell(0,5,"Reference is made to your submitted information, received at National Drug Authority on ".$date_received." (NDA Tracking number ".$ref." ).\n" ,0, 'J', 0, 1, '', '', true);

										$pdf->MultiCell(0,5,"You requested for vetting and approval to promote product(s) listed in the table below:"."\n" ,0, 'J', 0, 1, '', '', true);
											
											
										$pdf->Cell(7,5,'',0,1);
										$material_rec =	DB::table('tra_promotion_materials_details as t1')
			 
										        ->join('par_promotion_material_items  as t2','t1.promotions_material_id','=','t2.id')
												->select(DB::raw("group_concat(concat(t2.name) separator ' / ') as promotion_material")) 
												->where('t1.application_id',$application_id)
												->first();
										
											
											
											PDF::Cell(7,5,'',0,1);
									        //tra_promotion_prod_particulars
											$tbl = '
												<table width="100%" cellspacing="0" cellpadding="1" border = "0.4" >
													<tr style="font-weight:bold;" >
														<td width="5%">S/n</td>
														<td width="29%" >Promotion Material</td>
														<td width="30%">Brand Name (s)</td>
														<td width="36%">Rejection Reason</td>
													</tr>';
													$i= 1;

											$advertmaterial_rec =DB::table('tra_promotion_materials_details as t1')
										    ->join('par_promotion_material_items  as t4','t1.promotions_material_id','=','t4.id')
											->join('par_promotion_material_language  as t5','t1.language_id','=','t5.id')
										    ->leftjoin('par_promotion_decision  as t6','t1.approval_recommendation_id','=','t6.id')
											->select(DB::raw('t5.name as promotion_material_language'),DB::raw("IF(t1.promotions_material_id = 10, CONCAT(t4.name, ' (', t1.other_advert_materials, ') -Language:', t5.name), CONCAT(t4.name, ' -Language:', t5.name)) as promotion_material_name"),DB::raw("(SELECT GROUP_CONCAT(CONCAT(p.brand_name, IFNULL(CONCAT(' (Registration No: ', p.registration_no, ')'), '')) SEPARATOR ' ,') FROM tra_promotion_prod_particulars as p WHERE p.promotions_material_id = t1.id) as brand_names"),'t6.name as approval_recommendation','t1.approval_comments','t1.approval_recommendation_id')
												->where('t1.application_id',$application_id)
												->where('t1.approval_recommendation_id',$approval_recommendation_id)
												->get();

											if($advertmaterial_rec){
												foreach($advertmaterial_rec as $rows1){
													$tbl .= '<tr style="font-weight:normal;" >
															<td width="5%">'.$i.'</td>
															<td width="29%">'.$rows1->promotion_material_name.'</td>
															<td width="30%" stype="">'.$rows1->brand_names.'</td>
															<td width="36%">'.$rows1->approval_comments.'</td>
														</tr>';
													$i++;
												}
												
											}
											$tbl .= "</table>
											";
											$pdf->writeHTML($tbl, true, false, false, false, '');
								      							
										$pdf->SetFont('times','',10);
														 
									
										$pdf->MultiCell(0,5,"We have reviewed the promotional materials mentioned above and have determined above issues. Such an approach is ethically unacceptable and encourages irrational usage of medicines.\n" ,0, 'J', 0, 1, '', '', true);
										$pdf->Cell(7,5,'',0,1);

										$template = "The promotional materials above are hereby <b> rejected</b> and must not be published.";
                                            $pdf->WriteHTML($template, true, false, true, true, 'J');
											
							
								
									$pdf->ln();
															
									$pdf->Cell(0,8,' Yours Sincerely,',0,1);

									
									$pdf->ln();
									$pdf->ln();
									$startY = $pdf->GetY();
									$startX =$pdf->GetX();
									$director_details = getPermitSignatoryDetails();
									$dg_signatory = $director_details->director_id;
									$director = $director_details->director;
									$is_acting_director = $director_details->is_acting_director;
									$approved_by = $row->approved_by;
									if($dg_signatory != $approved_by){
											$signatory = $approved_by;
									}
									else{
											$signatory = $dg_signatory;
									}
				
																	
									//$signatory = $dg_signatory;
									$signatory = $approved_by;
									$signature = getUserSignatureDetails($signatory);

									$signature = getcwd() . '/resources/images/signs/'.$signature;
									$pdf->Image($signature,$startX+1,$startY-8,30,12);
								
									$pdf->Cell(0,8,'...............................................................', 0,1,'');
									
									$title = "SECRETARY TO THE AUTHORITY";
									if($dg_signatory != $approved_by){
											//$title = 'Acting '.$title;
									}else{
										if($is_acting_director ==1){
											//		$title = 'Acting '.$title;
										}
											
									}
									

									if(isset($row->approved_by)){
			                             $pdf->Cell(0,8,$row->approved_by_name, 0,1);
									}
										$pdf->SetFont('times','',12);
										$template = "<b>" . $title . "</b>";
			                            $pdf->WriteHTML($template, true, false, true, true, 'J');
								     }



								     ///else for No Objection
								     if($approval_recommendation_id==4 ||$approval_recommendation_id==4){
										$pdf->AddPage();
										if ($pdf->PageNo() !=1) {
											$logo = getcwd() . '/resources/images/cert_logo.png';
											$pdf->Image($logo,65,20,80,33);
										 
										}
										$template_url = base_path('/');
										$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
																												// import page 1
										$tplId = $pdf->importPage(1);	
										$pdf->useTemplate($tplId,0,0);
										$pdf->setPageMark();
										$pdf->SetFont('times','B',9);
										$pdf->Cell(0,1,'',0,1);
										//$pdf->Cell(0,4,'DMS/7/9/22/PR/155',0,1,'R');
										$pdf->Cell(0,4,'',0,1,'R');
										$pdf->SetFont('times','B',13);
										$pdf->Cell(0,15,'',0,1);
										$pdf->Cell(0,4,$org_info->name,0,1,'C');

										$data = '{"tracking_no":'.$row->tracking_no.',"module_id":'.$row->module_id.',"application_code":'.$row->application_code.'}';

										$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
																									// QRCODE,H : QR-CODE Best error correction name
										$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);

								
									    $pdf->SetFont('','',11);
										$pdf->Cell(0,10,'',0,1);
				
										$pdf->Cell(0,5, date('d F\\, Y',strtotime($row->approval_date)),0,1,'R');


										$pdf->Cell(60,5,'To:',0,1);
										$pdf->Cell(0,5,$applicant_name,0,1);
							
										$pdf->Cell(0,5,$physical_address,0,1);
									
										$pdf->Cell(0,5,$postal_address,0,1);

										$pdf->Cell(0,5,'Tel:'.$telephone_no,0,1);
										
										$pdf->Cell(0,5,'Email:'.$row->email_address,0,1);
										//local agent
										$pdf->ln();
										
										$pdf->Cell(0,5,'Dear Sir/Madam,',0,1);
										$pdf->SetLineWidth(3);
										$pdf->SetFont('','B',11);
											
										$pdf->SetFont('', 'BU');
										$pdf->Cell(7,7,'RE: RESPONSE TO APPLICATION FOR VETTING OF PROMOTIONAL MATERIALS',0,0);	
									    $pdf->SetFont('','',11);
										$pdf->ln();
										$pdf->MultiCell(0,5,"Reference is made to your submitted information, received at National Drug Authority on ".$date_received." (NDA Tracking number ".$ref." ).\n" ,0, 'J', 0, 1, '', '', true);

										$pdf->MultiCell(0,5,"You requested for vetting and approval to promote product(s) listed in the table below:"."\n" ,0, 'J', 0, 1, '', '', true);
											
											
										$pdf->Cell(7,5,'',0,1);
										$material_rec =	DB::table('tra_promotion_materials_details as t1')
			 
										        ->join('par_promotion_material_items  as t2','t1.promotions_material_id','=','t2.id')
												->select(DB::raw("group_concat(concat(t2.name) separator ' / ') as promotion_material")) 
												->where('t1.application_id',$application_id)
												->first();
										
											
											
											PDF::Cell(7,5,'',0,1);
									        //tra_promotion_prod_particulars
											$tbl = '
												<table width="100%" cellspacing="0" cellpadding="1" border = "0.4" >
													<tr style="font-weight:bold;" >
														<td width="5%">S/n</td>
														<td width="45%" >Promotion Material</td>
														<td width="50%">Brand Name (s)</td>
													</tr>';
													$i= 1;

											$advertmaterial_rec =DB::table('tra_promotion_materials_details as t1')
										    ->join('par_promotion_material_items  as t4','t1.promotions_material_id','=','t4.id')
											->join('par_promotion_material_language  as t5','t1.language_id','=','t5.id')
										    ->leftjoin('par_promotion_decision  as t6','t1.approval_recommendation_id','=','t6.id')
											->select(DB::raw('t5.name as promotion_material_language'),DB::raw("IF(t1.promotions_material_id = 10, CONCAT(t4.name, ' (', t1.other_advert_materials, ') -Language:', t5.name), CONCAT(t4.name, ' -Language:', t5.name)) as promotion_material_name"),DB::raw("(SELECT GROUP_CONCAT(CONCAT(p.brand_name, IFNULL(CONCAT(' (Registration No: ', p.registration_no, ')'), '')) SEPARATOR ' ,') FROM tra_promotion_prod_particulars as p WHERE p.promotions_material_id = t1.id) as brand_names"),'t6.name as approval_recommendation','t1.approval_comments','t1.approval_recommendation_id')
												->where('t1.application_id',$application_id)
												->where('t1.approval_recommendation_id',$approval_recommendation_id)
												->get();

											if($advertmaterial_rec){
												foreach($advertmaterial_rec as $rows1){
													$tbl .= '<tr style="font-weight:normal;" >
															<td width="5%">'.$i.'</td>
															<td width="45%">'.$rows1->promotion_material_name.'</td>
															<td width="50%" stype="">'.$rows1->brand_names.'</td>
														</tr>';
													$i++;
												}
												
											}
											$tbl .= "</table>
											";
											$pdf->writeHTML($tbl, true, false, false, false, '');
								      							
										$pdf->SetFont('times','',10);
														 
									
										$pdf->MultiCell(0,5,"By this letter therefore, National Drug Authority has no objection to the above promotional materials and the content therein.\n" ,0, 'J', 0, 1, '', '', true);
										$pdf->Cell(7,5,'',0,1);

										$template = "Thank you for your cooperation.";
                                            $pdf->WriteHTML($template, true, false, true, true, 'J');
											
							
								
									$pdf->ln();
															
									$pdf->Cell(0,8,' Yours Sincerely,',0,1);

									
									$pdf->ln();
									$pdf->ln();
									$startY = $pdf->GetY();
									$startX =$pdf->GetX();
									$director_details = getPermitSignatoryDetails();
									$dg_signatory = $director_details->director_id;
									$director = $director_details->director;
									$is_acting_director = $director_details->is_acting_director;
									$approved_by = $row->approved_by;
									if($dg_signatory != $approved_by){
											$signatory = $approved_by;
									}
									else{
											$signatory = $dg_signatory;
									}
				
																	
									//$signatory = $dg_signatory;
									$signatory = $approved_by;
									$signature = getUserSignatureDetails($signatory);

									$signature = getcwd() . '/resources/images/signs/'.$signature;
									$pdf->Image($signature,$startX+1,$startY-8,30,12);
								
									$pdf->Cell(0,8,'...............................................................', 0,1,'');
									
									$title = "SECRETARY TO THE AUTHORITY";
									if($dg_signatory != $approved_by){
											//$title = 'Acting '.$title;
									}else{
										if($is_acting_director ==1){
											//		$title = 'Acting '.$title;
										}
											
									}
									

									if(isset($row->approved_by)){
			                             $pdf->Cell(0,8,$row->approved_by_name, 0,1);
									}
										$pdf->SetFont('times','',12);
										$template = "<b>" . $title . "</b>";
			                            $pdf->WriteHTML($template, true, false, true, true, 'J');
								     }



								     //end No Objection



								     //start Query

								      if($approval_recommendation_id==3 ||$approval_recommendation_id==3){
										$pdf->AddPage();
										if ($pdf->PageNo() !=1) {
											$logo = getcwd() . '/resources/images/cert_logo.png';
											$pdf->Image($logo,65,20,80,33);
										 
										}
										$template_url = base_path('/');
										$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
																												// import page 1
										$tplId = $pdf->importPage(1);	
										$pdf->useTemplate($tplId,0,0);
										$pdf->setPageMark();
										$pdf->SetFont('times','B',9);
										$pdf->Cell(0,1,'',0,1);
										//$pdf->Cell(0,4,'DMS/7/9/22/PR/155',0,1,'R');
										$pdf->Cell(0,4,'',0,1,'R');
										$pdf->SetFont('times','B',13);
										$pdf->Cell(0,15,'',0,1);
										$pdf->Cell(0,4,$org_info->name,0,1,'C');

										$data = '{"tracking_no":'.$row->tracking_no.',"module_id":'.$row->module_id.',"application_code":'.$row->application_code.'}';

										$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
																									// QRCODE,H : QR-CODE Best error correction name
										$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);

								
									    $pdf->SetFont('','',11);
										$pdf->Cell(0,10,'',0,1);
				
										$pdf->Cell(0,5, date('d F\\, Y',strtotime($row->approval_date)),0,1,'R');


										$pdf->Cell(60,5,'To:',0,1);
										$pdf->Cell(0,5,$applicant_name,0,1);
							
										$pdf->Cell(0,5,$physical_address,0,1);
									
										$pdf->Cell(0,5,$postal_address,0,1);

										$pdf->Cell(0,5,'Tel:'.$telephone_no,0,1);
										
										$pdf->Cell(0,5,'Email:'.$row->email_address,0,1);
										//local agent
										$pdf->ln();
										
										$pdf->Cell(0,5,'Dear Sir/Madam,',0,1);
										$pdf->SetLineWidth(3);
										$pdf->SetFont('','B',11);
											
										$pdf->SetFont('', 'BU');
										$pdf->Cell(7,7,'RE: QUERY OF PROMOTIONAL MATERIALS',0,0);	
									    $pdf->SetFont('','',11);
										$pdf->ln();
										$pdf->MultiCell(0,5,"Reference is made to your submitted information, received at National Drug Authority on ".$date_received." (NDA Tracking number ".$ref." ).\n" ,0, 'J', 0, 1, '', '', true);

										$pdf->MultiCell(0,5,"You requested for vetting and approval to promote product(s) listed in the table below:"."\n" ,0, 'J', 0, 1, '', '', true);
											
											
										$pdf->Cell(7,5,'',0,1);
										$material_rec =	DB::table('tra_promotion_materials_details as t1')
			 
										        ->join('par_promotion_material_items  as t2','t1.promotions_material_id','=','t2.id')
												->select(DB::raw("group_concat(concat(t2.name) separator ' / ') as promotion_material")) 
												->where('t1.application_id',$application_id)
												->first();
										
											
											
											PDF::Cell(7,5,'',0,1);
									        //tra_promotion_prod_particulars
											$tbl = '
												<table width="100%" cellspacing="0" cellpadding="1" border = "0.4" >
													<tr style="font-weight:bold;" >
														<td width="5%">S/n</td>
														<td width="29%" >Promotion Material</td>
														<td width="30%">Brand Name (s)</td>
														<td width="36%">Query Details</td>
													</tr>';
													$i= 1;

											$advertmaterial_rec =DB::table('tra_promotion_materials_details as t1')
										    ->join('par_promotion_material_items  as t4','t1.promotions_material_id','=','t4.id')
											->join('par_promotion_material_language  as t5','t1.language_id','=','t5.id')
										    ->leftjoin('par_promotion_decision  as t6','t1.approval_recommendation_id','=','t6.id')
											->select(DB::raw('t5.name as promotion_material_language'),DB::raw("IF(t1.promotions_material_id = 10, CONCAT(t4.name, ' (', t1.other_advert_materials, ') -Language:', t5.name), CONCAT(t4.name, ' -Language:', t5.name)) as promotion_material_name"),DB::raw("(SELECT GROUP_CONCAT(CONCAT(p.brand_name, IFNULL(CONCAT(' (Registration No: ', p.registration_no, ')'), '')) SEPARATOR ' ,') FROM tra_promotion_prod_particulars as p WHERE p.promotions_material_id = t1.id) as brand_names"),'t6.name as approval_recommendation','t1.approval_comments','t1.approval_recommendation_id')
												->where('t1.application_id',$application_id)
												->where('t1.approval_recommendation_id',$approval_recommendation_id)
												->get();

											if($advertmaterial_rec){
												foreach($advertmaterial_rec as $rows1){
													$tbl .= '<tr style="font-weight:normal;" >
															<td width="5%">'.$i.'</td>
															<td width="29%">'.$rows1->promotion_material_name.'</td>
															<td width="30%" stype="">'.$rows1->brand_names.'</td>
															<td width="36%">'.$rows1->approval_comments.'</td>
														</tr>';
													$i++;
												}
												
											}
											$tbl .= "</table>
											";
											$pdf->writeHTML($tbl, true, false, false, false, '');
								      							
										$pdf->SetFont('times','',10);
														 
									
										$pdf->MultiCell(0,5,"Please address the above-mentioned issues within 15 working days from the date of this letter.\n" ,0, 'J', 0, 1, '', '', true);
										$pdf->Cell(7,5,'',0,1);
								
									//$pdf->ln();
															
									$pdf->Cell(0,8,' Yours Sincerely,',0,1);

									
									$pdf->ln();
									$pdf->ln();
									$startY = $pdf->GetY();
									$startX =$pdf->GetX();
									$director_details = getPermitSignatoryDetails();
									$dg_signatory = $director_details->director_id;
									$director = $director_details->director;
									$is_acting_director = $director_details->is_acting_director;
									$approved_by = $row->approved_by;
									if($dg_signatory != $approved_by){
											$signatory = $approved_by;
									}
									else{
											$signatory = $dg_signatory;
									}
				
																	
									//$signatory = $dg_signatory;
									$signatory = $approved_by;
									$signature = getUserSignatureDetails($signatory);

									$signature = getcwd() . '/resources/images/signs/'.$signature;
									$pdf->Image($signature,$startX+1,$startY-8,30,12);
								
									$pdf->Cell(0,8,'...............................................................', 0,1,'');
									
									$title = "SECRETARY TO THE AUTHORITY";
									if($dg_signatory != $approved_by){
											//$title = 'Acting '.$title;
									}else{
										if($is_acting_director ==1){
											//		$title = 'Acting '.$title;
										}
											
									}
									

									if(isset($row->approved_by)){
			                             $pdf->Cell(0,8,$row->approved_by_name, 0,1);
									}
										$pdf->SetFont('times','',12);
										$template = "<b>" . $title . "</b>";
			                            $pdf->WriteHTML($template, true, false, true, true, 'J');
								     }
								     //end query
								    }
                                  }
           
                             $pdf->Output("Promotional Advertisement.pdf");
                        }

	 } catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
	} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
	}
			print_r($res);
        return response()->json($res);
}


 function generateLetterPreviewWatermark($pdf){
            // Add watermarks
            $pdf->SetTextColor(128, 128, 128); //grey
           // $pdf->SetTextColor(135, 206, 235); //sky blue
			$pdf->StartTransform();
			$pdf->Rotate(30);
            $pdf->Text(10, 13, 'PREVIEW'); 
			$pdf->StopTransform();

			$pdf->StartTransform();
		    $pdf->Rotate(-45);
		    $pdf->Text(180, 13, 'PREVIEW'); 
	        $pdf->StopTransform();

			$pdf->StartTransform();
			$pdf->SetFont('helvetica','B',35);
			$pdf->Rotate(90); 
			$pdf->Text(40, 8, 'PREVIEW'); 
			$pdf->StopTransform();
        }


     public function printPremisePreInspectionApprovalLetter($request){
	  try{ 
		$org_info = $this->getOrganisationInfo();
		$application_code = $request->application_code;	
		$is_preview = $request->is_preview;
		$record = DB::table('tra_premises_applications as t1')
                                    ->join('tra_premises as t2', 't1.premise_id','t2.id')
                                    ->join('par_countries as t3', 't2.country_id', 't3.id')
                                    ->leftJoin('par_premise_regions as t4', 't2.region_id','t4.id')
                                    ->leftJoin('par_premise_districts as t5', 't2.district_id', 't5.id')
                                    ->join('wb_trader_account as t6', 't1.applicant_id', 't6.id')
                                    ->leftJoin('par_countries as t7', 't6.country_id', 't7.id')
                                    ->leftJoin('par_regions as t8', 't6.region_id','t8.id')
                                    ->leftJoin('par_districts as t9', 't6.district_id', 't9.id')
                                    ->join('tra_approval_recommendations as t10','t1.application_code','t10.application_code')
                                    ->leftJoin('tra_premise_incharge_personnel as t11','t2.nin_no','t11.nin_no')
                                    ->leftJoin('par_personnel_qualifications as t12','t11.qualification_id','t12.id')
                                    ->leftJoin('tra_pharmacist_personnel as t13','t2.psu_no','t13.psu_no')
                                    ->leftJoin('users as t14', 't10.approved_by', 't14.id')
                                   ->leftJoin('par_titles as t15', 't14.title_id', '=', 't15.id')
                                    ->leftJoin('par_business_types as t16', 't2.business_type_id', '=', 't16.id')
                                    ->leftJoin('par_premise_class as t17', 't2.product_classification_id', '=', 't17.id')
                                     ->leftJoin('tra_premiseinspection_applications as t18', 't1.application_code', '=', 't18.application_code')
                                    ->leftJoin('par_recommended_roomsizes as t19', 't2.business_type_id', '=', 't19.business_type_id')
                                    ->leftJoin('par_county as t20', 't2.county_id', '=', 't20.id')
                                    ->leftJoin('par_locationcouncils_definations as t21', 't20.locationcouncils_defination_id', '=', 't21.id')
                                     
                                    ->select(DB::raw("t1.reference_no,t1.tracking_no, t1.premise_id, t1.module_id,t1.sub_module_id,t1.section_id, t2.business_type_id,t2.postal_address as premise_poastal_address,t2.physical_address as premise_physical_address, t4.name as premise_region_name,t5.name as premise_district_name,t7.name as premise_country, t10.expiry_date,t10.approval_date as permit_issue_date,t10.decision_id as approval_recommendation_id,t10.approved_by,CONCAT_WS(' ',decrypt(t14.first_name),decrypt(t14.last_name),'(',t15.name ,')') as approved_by_name,t10.permit_no, t10.approval_date,t2.premise_reg_no,t2.name as premise_name,t2.tpin_no,t6.name as applicant_name,t6.physical_address,t6.postal_address,t6.telephone_no as telephone,t6.telephone_no,t6.email,t6.email as email_address,t9.name as districtName,t8.name as regionName,t7.name as countryName,t11.name as incharge_technician,t11.nin_no,t12.name as qualification,t11.saved_name,t13.psu_no,t13.name as pharmacist,t16.name as business_type,t17.name as product_classification,t18.proposed_changes, (select group_concat(`t`.`distance` separator ' ,') FROM tra_inspectorpremises_storelocation t  WHERE t.premise_id = t1.premise_id) as distance, (select group_concat(`t`.`name` separator ' and ') FROM tra_inspectorpremises_storelocation t  WHERE t.premise_id = t1.premise_id) as nearest_premises,t19.size as recommended_room_size,t21.name as locationcouncils_defination,t21.recommended_premise_distance"))
                                    ->where(array('t1.application_code'=>$application_code))
                                    ->first();


               	 
					if($record){

						$row=$record;
                        $ref = $row->reference_no;
                        $permit_issue_date = $row->permit_issue_date;
                        $expiry_date = $row->expiry_date;
                        $permit_no= $row->permit_no;
                        $premise_reg_no = $row->premise_reg_no;
                        $applicant_name=$row->applicant_name;
                        $physical_address=$row->physical_address;
                        $postal_address=$row->postal_address;
                        $telephone=$row->telephone;
                        $email=$row->email;
                        $districtName=$row->districtName;
                        $regionName=$row->regionName;
                        $countryName=$row->countryName;
                        $premise_id=$row->premise_id;
                        $tracking_no = $row->tracking_no;
                        $approval_recommendation_id =$row->approval_recommendation_id;
                        //$date_received = date('d F\\, Y',strtotime($row->date_received));
                        //premise details
                        $premise_name = $row->premise_name;
                        $premise_poastal_address = $row->premise_poastal_address;
                        $premise_physical_address = $row->premise_physical_address;
                        $premise_region_name = $row->premise_region_name;
                        $premise_country = $row->premise_country;
                        $premise_district_name = $row->premise_district_name;
                        $tpin_no = $row->tpin_no;
                        $incharge_technician = $row->incharge_technician;
                        $nin_no = $row->nin_no;
                        $telephone_no = $row->telephone_no;
                        $business_type_id = $row->business_type_id;
                        $module_id = $row->module_id;
                        $sub_module_id = $row->sub_module_id;
                        $qualification = $row->qualification;
                        $saved_name = $row->saved_name;
                        $destination = getcwd() . '/resources/images/personnel-profile/';
                        $org_info = $this->getOrganisationInfo();
            
                        $logo = getcwd() . '/resources/images/cert_logo.png';
                        $premise_reg_no = $row->premise_reg_no;
                        $approved_by = $row->approved_by;

                        $psu_no = $row->psu_no;
                        $pharmacist = $row->pharmacist;
                        $business_type = $row->business_type;
                        $product_classification = $row->product_classification;
                        $proposed_changes = $row->proposed_changes;
                        $nearest_premises = $row->nearest_premises;
                        $distance = $row->distance;
                        $recommended_room_size = $row->recommended_room_size;
                        $locationcouncils_defination = $row->locationcouncils_defination;
                        $recommended_premise_distance = $row->recommended_premise_distance;
              
                        $pdf = new PdfLettersProvider();
                     
                      
						if($approval_recommendation_id==1 ||$approval_recommendation_id==1 || $is_preview==1){
									$pdf->AddPage();
                                      if($is_preview==1  || $is_preview===1){
										 $this->generateLetterPreviewWatermark($pdf);
				                     }
				    

				                        $pdf->SetTextColor(0, 0, 0);
                                       //end watermark

									if ($pdf->PageNo() !=1) {
										$logo = getcwd() . '/resources/images/cert_logo.png';
										$pdf->Image($logo,65,20,80,33);
									 
									}

									$template_url = base_path('/');
									$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
																											// import page 1
									$tplId = $pdf->importPage(1);	
									$pdf->useTemplate($tplId,0,0);
									$pdf->setPageMark();
									$pdf->SetFont('times','B',9);
									$pdf->Cell(0,1,'',0,1);
									//$pdf->Cell(0,4,'DMS/7/9/22/PR/155',0,1,'R');
									$pdf->Cell(0,4,'',0,1,'R');
									$pdf->SetFont('times','B',13);
									$pdf->Cell(0,15,'',0,1);
									if($is_preview!=1){
									 $pdf->Cell(0,4,$org_info->name,0,1,'C');
									}

									$data = '{"tracking_no":'.$row->tracking_no.',"module_id":'.$row->module_id.',"application_code":'.$application_code.'}';

									$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
																								// QRCODE,H : QR-CODE Best error correction name
									$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
								
									  $pdf->ln();

									     $pdf->SetFont('','',11);
										$pdf->Cell(0,10,'',0,1);
				
										$pdf->Cell(0,5, date('d F\\, Y',strtotime($row->approval_date)),0,1,'R');


										$pdf->Cell(60,5,$permit_no,0,1);
										$pdf->Cell(0,5,$applicant_name,0,1);
							
										$pdf->Cell(0,5,$physical_address,0,1);
									
										$pdf->Cell(0,5,$postal_address,0,1);

										$pdf->Cell(0,5,'Tel:'.$telephone_no,0,1);
										
										$pdf->Cell(0,5,'Email:'.$row->email_address,0,1);
										//local agent
										$pdf->ln();
										
										$pdf->Cell(0,5,'Dear Sir/Madam,',0,1);
										$pdf->SetLineWidth(3);
										$pdf->SetFont('','B',10);
											
										$pdf->SetFont('', 'BU');
										$pdf->Cell(7,7,'RE: PROPOSED PREMISES FOR A '.strtoupper($business_type).' LOCATED AT '.strtoupper($premise_physical_address),0,0);	
									    $pdf->SetFont('','',10);
										$pdf->ln();
										$pdf->MultiCell(0,5,"Reference is made to the above subject.\n" ,0, 'J', 0, 1, '', '', true);
                                        $pdf->ln();
										$pdf->MultiCell(0,5,"According to inspection findings, the proposed premises complied with the minimum space requirements of ".$recommended_room_size."m for licensing of a ".strtolower($business_type)." as well as minimum distance requirements between pharmacies ".$locationcouncils_defination." district."."\n" ,0, 'J', 0, 1, '', '', true);
										$pdf->ln();

                                         $location_details ="The proposed location was at a distance of <b>".$distance."</b> from the nearest existing “like” pharmacies<b>(".$nearest_premises.")</b> and therefore complied with section 4(4) of the NDPA (Licensing) (Amendment) Regulations 2021 which states:";
								
										$pdf->writeHTML($location_details, true, false, true, false, '');

                                        $pdf->SetFont('','',9);
                                        $pdf->ln();
										$pdf->MultiCell(0,5,"“The distance, from any direction, between a pharmacy for which an application for a licence is made under this regulation and any existing ".strtolower($business_type)." , located ".$locationcouncils_defination." shall not be less than ".$recommended_premise_distance." metres”."."\n" ,0, 'C', 0, 1, '', '', true);

                                          $pdf->ln();
                                          $pdf->SetFont('','',10);

                                         $recommendations ='
                                          Based on the above, your request for operating a '.strtolower($business_type).'('.strtolower($product_classification).') at the above location has been granted. However,the following recommendation were made as proposed changes/Adjustments('.$proposed_changes.'). You may visit <a href="https://irims.nda.or.ug/portal">https://irims.nda.or.ug/portal</a> to process the license of your pharmacy before '.date('d F\, Y', strtotime($expiry_date)).'.';
								
										$pdf->writeHTML($recommendations, true, false, true, false, '');
				
										$pdf->SetFont('times','',10);
										//$pdf->AddPage();
										$pdf->ln();			 
										$pdf->MultiCell(0,5,"Please note the following:\n" ,0, 'J', 0, 1, '', '', true);
										$pdf->Cell(7,5,'',0,1);
                                        $pdf->ln();
										 $this->getCertificateRegistrationConditions($row,$pdf);
								
									$pdf->ln();
									$pdf->ln();
									$startY = $pdf->GetY();
									$startX =$pdf->GetX();
									$director_details = getPermitSignatoryDetails();
									$dg_signatory = $director_details->director_id;
									$director = $director_details->director;
									$is_acting_director = $director_details->is_acting_director;
									$approved_by = $row->approved_by;
									if($dg_signatory != $approved_by){
											$signatory = $approved_by;
									}
									else{
											$signatory = $dg_signatory;
									}
				
																	
									//$signatory = $dg_signatory;
									$signatory = $approved_by;
									$signature = getUserSignatureDetails($signatory);

									$signature = getcwd() . '/resources/images/signs/'.$signature;
									$pdf->Image($signature,$startX+1,$startY-8,30,12);
								
									$pdf->Cell(0,8,'...............................................................', 0,1,'');
									
									$title = "For: CHIEF INSPECTOR OF DRUGS /";
									if($dg_signatory != $approved_by){
											//$title = 'Acting '.$title;
									}else{
										if($is_acting_director ==1){
											//		$title = 'Acting '.$title;
										}
											
									}
									
								
									if(isset($row->approved_by)){
			                             $pdf->Cell(0,8,$row->approved_by_name, 0,1);
									}
										$pdf->SetFont('times','',9);
										$template = "<b>" . $title . "<br>DIRECTOR, INSPECTORATE AND ENFORCEMENT</b>";
			                            $pdf->WriteHTML($template, true, false, true, true, 'J');
			                           }

								     //end Approval
           
                             $pdf->Output("Approval Letter.pdf");
                        }

	 } catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
	} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
	}
			print_r($res);
        return response()->json($res);
}

 public function printLicencedSellerPreInspectionApprovalLetter($request){
	  try{
		$org_info = $this->getOrganisationInfo();
		$application_code = $request->application_code;	
		$is_preview = $request->is_preview;
		$record = DB::table('tra_premises_applications as t1')
                                    ->join('tra_premises as t2', 't1.premise_id','t2.id')
                                    ->join('par_countries as t3', 't2.country_id', 't3.id')
                                    ->leftJoin('par_premise_regions as t4', 't2.region_id','t4.id')
                                    ->leftJoin('par_premise_districts as t5', 't2.district_id', 't5.id')
                                    ->join('wb_trader_account as t6', 't1.applicant_id', 't6.id')
                                    ->leftJoin('par_countries as t7', 't6.country_id', 't7.id')
                                    ->leftJoin('par_regions as t8', 't6.region_id','t8.id')
                                    ->leftJoin('par_districts as t9', 't6.district_id', 't9.id')
                                    ->join('tra_approval_recommendations as t10','t1.application_code','t10.application_code')
                                    ->leftJoin('tra_premise_incharge_personnel as t11','t2.nin_no','t11.nin_no')
                                    ->leftJoin('par_personnel_qualifications as t12','t11.qualification_id','t12.id')
                                    ->leftJoin('tra_pharmacist_personnel as t13','t2.psu_no','t13.psu_no')
                                    ->leftJoin('users as t14', 't10.approved_by', 't14.id')
                                   ->leftJoin('par_titles as t15', 't14.title_id', '=', 't15.id')
                                    ->leftJoin('par_business_types as t16', 't2.business_type_id', '=', 't16.id')
                                    ->leftJoin('par_premise_class as t17', 't2.product_classification_id', '=', 't17.id')
                                     ->leftJoin('tra_premiseinspection_applications as t18', 't1.application_code', '=', 't18.application_code')
                                    ->leftJoin('par_recommended_roomsizes as t19', 't2.business_type_id', '=', 't19.business_type_id')
                                    ->leftJoin('par_county as t20', 't2.county_id', '=', 't20.id')
                                    ->leftJoin('par_locationcouncils_definations as t21', 't20.locationcouncils_defination_id', '=', 't21.id')
                                     
                                    ->select(DB::raw("t1.reference_no,t1.tracking_no, t1.premise_id, t1.module_id,t1.sub_module_id,t1.section_id, t1.created_on as application_date,t2.business_type_id,t2.postal_address as premise_poastal_address,t2.physical_address as premise_physical_address, t4.name as premise_region_name,t5.name as premise_district_name,t7.name as premise_country, t10.expiry_date,t10.approval_date as permit_issue_date,t10.decision_id as approval_recommendation_id,t10.approved_by,CONCAT_WS(' ',decrypt(t14.first_name),decrypt(t14.last_name),'(',t15.name ,')') as approved_by_name,t10.permit_no, t10.approval_date,t2.premise_reg_no,t2.name as premise_name,t2.tpin_no,t6.name as applicant_name,t6.physical_address,t6.postal_address,t6.telephone_no as telephone,t6.telephone_no,t6.email,t6.email as email_address,t9.name as districtName,t8.name as regionName,t7.name as countryName,t11.name as incharge_technician,t11.nin_no,t12.name as qualification,t11.saved_name,t13.psu_no,t13.name as pharmacist,t16.name as business_type,t17.name as product_classification,t18.proposed_changes"))
                                    ->where(array('t1.application_code'=>$application_code))
                                    ->first();


               	 
					if($record){
						$row=$record;
                        $ref = $row->reference_no;
                        //$permit_issue_date = $row->permit_issue_date;
                        //$expiry_date = $row->expiry_date;
                        $permit_no= $row->permit_no;
                        $premise_reg_no = $row->premise_reg_no;
                        $applicant_name=$row->applicant_name;
                        $physical_address=$row->physical_address;
                        $postal_address=$row->postal_address;
                        $telephone=$row->telephone;
                        $email=$row->email;
                        $districtName=$row->districtName;
                        $regionName=$row->regionName;
                        $countryName=$row->countryName;
                        $premise_id=$row->premise_id;
                        $tracking_no = $row->tracking_no;
                        $approval_recommendation_id =$row->approval_recommendation_id;
                        //$date_received = date('d F\\, Y',strtotime($row->date_received));
                        //premise details
                        $premise_name = $row->premise_name;
                        $premise_poastal_address = $row->premise_poastal_address;
                        $premise_physical_address = $row->premise_physical_address;
                        $premise_region_name = $row->premise_region_name;
                        $premise_country = $row->premise_country;
                        $premise_district_name = $row->premise_district_name;
                        $tpin_no = $row->tpin_no;
                        $incharge_technician = $row->incharge_technician;
                        $nin_no = $row->nin_no;
                        $telephone_no = $row->telephone_no;
                        $business_type_id = $row->business_type_id;
                        $module_id = $row->module_id;
                        $sub_module_id = $row->sub_module_id;
                        $qualification = $row->qualification;
                        $saved_name = $row->saved_name;
                        $destination = getcwd() . '/resources/images/personnel-profile/';
                        $org_info = $this->getOrganisationInfo();
            
                        $logo = getcwd() . '/resources/images/cert_logo.png';
                        $premise_reg_no = $row->premise_reg_no;
                        $approved_by = $row->approved_by;

                        $psu_no = $row->psu_no;
                        $pharmacist = $row->pharmacist;
                        $business_type = $row->business_type;
                        $product_classification = $row->product_classification;
                        $proposed_changes = $row->proposed_changes;
                        $permit_issue_date = $row->permit_issue_date != null ? formatDateWithSuffix($row->permit_issue_date) : '';
                        $expiry_date = $row->expiry_date != null ? formatDateWithSuffix($row->expiry_date) : '';
                        $application_date = $row->application_date != null ? formatDateWithSuffix($row->application_date) : '';
                        $approval_date = $row->approval_date != null ? formatDateWithSuffix($row->approval_date) : '';
         
                        $pdf = new PdfLettersProvider();
                     
                      
						if($approval_recommendation_id==1 ||$approval_recommendation_id==1 || $is_preview==1){
									$pdf->AddPage();
                                      if($is_preview==1  || $is_preview===1){
										 $this->generateLetterPreviewWatermark($pdf);
				                     }
				    

				                        $pdf->SetTextColor(0, 0, 0);
                                       //end watermark

									if ($pdf->PageNo() !=1) {
										$logo = getcwd() . '/resources/images/cert_logo.png';
										$pdf->Image($logo,65,20,80,33);
									 
									}

									$template_url = base_path('/');
									$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
																											// import page 1
									$tplId = $pdf->importPage(1);	
									$pdf->useTemplate($tplId,0,0);
									$pdf->setPageMark();
									$pdf->SetFont('times','B',9);
									$pdf->Cell(0,1,'',0,1);
									//$pdf->Cell(0,4,'DMS/7/9/22/PR/155',0,1,'R');
									$pdf->Cell(0,4,'',0,1,'R');
									$pdf->SetFont('times','B',13);
									$pdf->Cell(0,15,'',0,1);
									if($is_preview!=1){
									 $pdf->Cell(0,4,$org_info->name,0,1,'C');
									}

									$data = '{"tracking_no":'.$row->tracking_no.',"module_id":'.$row->module_id.',"application_code":'.$application_code.'}';

									$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
																								// QRCODE,H : QR-CODE Best error correction name
									$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
								
									  $pdf->ln();

									     $pdf->SetFont('','',11);
										$pdf->Cell(0,10,'',0,1);
				
										//$pdf->Cell(0,5, date('d F\\, Y',strtotime($row->approval_date)),0,1,'R');
										$pdf->writeHTML($approval_date, true, false, true, false, 'R');


										$pdf->Cell(60,5,$tracking_no,0,1);
										$pdf->Cell(0,5,$applicant_name,0,1);
							
										$pdf->Cell(0,5,$physical_address,0,1);
									
										$pdf->Cell(0,5,$postal_address,0,1);

										$pdf->Cell(0,5,'Tel:'.$telephone_no,0,1);
										
										$pdf->Cell(0,5,'Email:'.$row->email_address,0,1);
										//local agent
										$pdf->ln();
										
										$pdf->Cell(0,5,'Dear Sir/Madam,',0,1);
										$pdf->SetLineWidth(3);
										$pdf->SetFont('','B',10);
											
										$pdf->SetFont('', 'BU');
										// $pdf->MultiCell(7,7,'RE: PRE - INSPECTION OF PROPOSED PREMISES FOR  A '.strtoupper($business_type).' LOCATED AT '.strtoupper($premise_physical_address),0,0);
										$pdf->MultiCell(0,7,'RE: PRE - INSPECTION OF PROPOSED PREMISES FOR  A '.strtoupper($business_type).' LOCATED AT '.strtoupper($premise_physical_address) ,0, 'L', 0, 1, '', '', true);	
									    $pdf->SetFont('','',10);
										//$pdf->ln();
										// $pdf->MultiCell(0,5,"Reference is made to the above subject and your pre - inspection application dated ".$application_date." .\n" ,0, 'J', 0, 1, '', '', true);
										$pdf->writeHTML("Reference is made to the above subject and your pre - inspection application dated ".$application_date." .\n" , true, false, true, false, '');
                                        $pdf->ln();
										$pdf->MultiCell(0,5,"According to inspection findings, your premises met requirements for licensing as per the Professional Licensing Guidelines 2020".".\n" ,0, 'J', 0, 1, '', '', true);
										$pdf->ln();

                                         $location_details ="This approval is valid from  ".$permit_issue_date. " a period of three months to ".$expiry_date." of this letter.";
								
										$pdf->writeHTML($location_details, true, false, true, false, '');
                                        $pdf->ln();
										
                                          $pdf->SetFont('','',10);

                                         $recommendations ='
                                          Please proceed to make an application via  <a href="https://irims.nda.or.ug/portal">https://irims.nda.or.ug/portal</a> for processing of the license to operate as a licensed seller at the above mention location.';
								
										$pdf->writeHTML($recommendations, true, false, true, false, '');
				
										$pdf->SetFont('times','',10);
										//$pdf->AddPage();
										$pdf->ln();			 
										$pdf->MultiCell(0,5,"Please note the following:\n" ,0, 'J', 0, 1, '', '', true);
										$pdf->Cell(7,5,'',0,1);
                                        //$pdf->ln();
										 $this->getCertificateRegistrationConditions($row,$pdf);
									$pdf->ln();
								    $pdf->Cell(0,7,'Yours faithfully,',0,1);
									$pdf->ln();
									$startY = $pdf->GetY();
									$startX =$pdf->GetX();
									$director_details = getPermitSignatoryDetails();
									$dg_signatory = $director_details->director_id;
									$director = $director_details->director;
									$is_acting_director = $director_details->is_acting_director;
									$approved_by = $row->approved_by;
									if($dg_signatory != $approved_by){
											$signatory = $approved_by;
									}
									else{
											$signatory = $dg_signatory;
									}
				
																	
									//$signatory = $dg_signatory;
									$signatory = $approved_by;
									$signature = getUserSignatureDetails($signatory);

									// $signature = getcwd() . '/resources/images/signs/'.$signature;
									// $pdf->Image($signature,$startX+1,$startY-8,30,12);
								
									$pdf->Cell(0,8,'...............................................................', 0,1,'');
									
									$title = "For: CHIEF INSPECTOR OF DRUGS /";
									if($dg_signatory != $approved_by){
											//$title = 'Acting '.$title;
									}else{
										if($is_acting_director ==1){
											//		$title = 'Acting '.$title;
										}
											
									}
									
								
									if(isset($row->approved_by)){
			                             $pdf->Cell(0,8,$row->approved_by_name, 0,1);
									}
										$pdf->SetFont('times','',9);
										$template = "<b>" . $title . "<br>DIRECTOR, INSPECTORATE AND ENFORCEMENT</b>";
			                            $pdf->WriteHTML($template, true, false, true, true, 'J');
			                           }

								     //end Approval
           
                             $pdf->Output("Approval Letter.pdf");
                        }

	 } catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
	} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
	}
			print_r($res);
        return response()->json($res);
}


	function printPremisesCertificateLetter($request,$approvalGrant){
		try{
			$application_code = $request->application_code;
			
			$record = DB::table('tra_premises_applications as t1')
												->join('tra_premises as t2', 't1.premise_id','t2.id')
												->join('par_countries as t3', 't2.country_id', 't3.id')
												->leftJoin('par_regions as t4', 't2.region_id','t4.id')
												->leftJoin('par_districts as t5', 't2.district_id', 't5.id')
												->join('wb_trader_account as t6', 't1.applicant_id', 't6.id')
												->join('par_countries as t7', 't6.country_id', 't7.id')
												->leftJoin('par_regions as t8', 't6.region_id','t8.id')
												->leftJoin('par_districts as t9', 't6.district_id', 't9.id')
												->leftJoin('par_business_types as t11', 't2.business_type_id', 't11.id')
												->join('tra_approval_recommendations as t10','t1.application_code','t10.application_code')
												->leftJoin('users as t17', 't10.permit_signatory', '=', 't17.id')
							
												->select(DB::raw("t1.reference_no,t1.application_code,t1.*,concat(decrypt(t17.first_name),' ',decrypt(t17.last_name)) as permit_signatoryname, t2.*, t10.permit_signatory,t1.premise_id,  t2.postal_address as premise_poastal_address,t11.name as premises_type, t2.physical_address as premise_physical_address, t4.name as premise_region_name,t5.name as premise_district_name,t7.name as premise_country,t1.date_added as date_registered, t10.expiry_date,t10.approval_date as permit_issue_date,t10.permit_no,t2.premise_reg_no,t2.name as premise_name,t6.name as applicant_name,t6.physical_address,t6.postal_address,t6.telephone_no as telephone,t6.email,t9.name as districtName,t8.name as regionName,t7.name as countryName"))
												->where(array('t1.application_code'=>$application_code))
												->first();
        if(!empty($approvalGrant) && $approvalGrant->decision_id == 1){
											$org_info = $this->getOrganisationInfo();
											
											$pdf = new PdfProvider();
											$this->getCertificateHeader($pdf, '');
											
											$this->funcGenerateQrCode($record,$pdf);
												
												 
											$logo = getcwd() . '/resources/images/org-logo.jpg';
											$pdf->SetFont('times','B',9);
											$pdf->Cell(0,1,'',0,1);
											$pdf->Image($logo, 86, 18, 40, 35);
											
											
											$pdf->Cell(0,21,'',0,1);
											$pdf->Cell(0,5,'P.O. Box '.$org_info->postal_address.' '.$org_info->region_name,0,1);
											$pdf->Cell(0,5,$org_info->email_address,0,1);
											$pdf->Cell(0,5,$org_info->website,0,1);
											$pdf->ln();
															
											if($record){
												
												$row=$record;
												$applicantName=$row->applicant_name;
												$premise_name=$row->premise_name;
												$permit_no=$row->permit_no;
																	
												$date_added=$row->date_registered;
												$postal_address=$row->postal_address;
												$physical_address=$row->physical_address;
												$countryName=$row->countryName;
												$regionName=$row->regionName;
												$districtName=$row->districtName;
												$premiseID=$row->premise_id;
												$premise_reg_no=$row->premise_reg_no;
												$premises_id = $row->premise_id;
												$permit_issue_date = $row->permit_issue_date;
												$locationDesc ='';
												$org_info = $this->getOrganisationInfo();

												$premise_name = $row->premise_name;
												$premise_poastal_address = $row->premise_poastal_address;
												$premise_physical_address = $row->premise_physical_address;
												$premise_region_name = $row->premise_region_name;
												$premise_country = $row->premise_country;
												$premise_district_name = $row->premise_district_name;
												
											
												$pdf->Cell(0,5,'Ref No: '.$record->permit_no,0,1);
												$pdf->ln();
												$pdf->Cell(0,5,' DRUG SHOP LICENSE TO OPERATE '.strtoupper($record->premises_type),0,1,'');
												$pdf->ln();
												$pdf->SetFont('times','',10);
												
												$premises_statement1 = "Reference is made to the <b>Law No 003/2018 of 09/02/2018</b> establishing Uganda National Drug Authority and determining its missing, organisation and functioning especially in its article 3: and considering the provisions of the <b>Law No 47/2012 of 14/10/2013</b> relating to the regulations and inspection of food and pharmaceutical products especially in its artical 32;\n";
												
												$pdf->WriteHTML($premises_statement1, true, false, true, true, 'J');
												$pdf->ln();
												$premises_statement2 = "This is to certify that <b>".$record->premise_name."</b>, registered under company code <b>".$record->tpin_no."</b> is licensed to operate as an <b>".$record->premises_type."</b> located in <b>".$record->premise_region_name."<b/>, <b>" .$record->premise_district_name."</b> District, <b>".$record->sector."<b/>Sector, <b>".$record->cell."</b> Cell.\n";
												
												
												$pdf->WriteHTML($premises_statement2, true, false, true, true, 'J');
												$pdf->ln();
												$pdf->Cell(50,5,'Names of the Managing Director ',0,0);
												$pdf->Cell(0,5,$record->managing_director,0,1);
												
												$pdf->Cell(50,5,'Telephone number ',0,0);
												$pdf->Cell(0,5,$record->managing_director_telepone,0,1);
												$pdf->ln();
												$personnel = "";
												$registration_no = "";
												$prem_per = DB::table('tra_premises_personnel as t1')
																->join('tra_personnel_information as t2', 't1.personnel_id','t2.id')
																->join('par_personnel_positions as t3', 't1.position_id','t3.id')
																->where(array('t1.premise_id'=>$record->premise_id, 'position_id'=>1))
																->first();
												if($prem_per){
																		$personnel = $prem_per->name;
																		$registration_no = $prem_per->registration_no;

												}
												
												$pdf->Cell(50,5,'Name of Responsible Pharmacist: ',0,0);
												$pdf->Cell(0,5,$personnel,0,1);
												
												$pdf->MultiCell(50,8,'National Pharmacy Council Registration: ',0,'',0,0);
												$pdf->MultiCell(0,8,strtoupper($registration_no),0,'',0,1);
												
												$pdf->SetFont('times','B',10);
												$pdf->ln();
												$pdf->Cell(0,5,'Validity: This license if valid for one (1) year renewble from the date of its Issuance.',0,1);
												$pdf->ln();
												$pdf->Cell(0,5,'NB: ',0,1);
												$pdf->SetFont('times','I',10);
												$pdf->ln();
												$this->getCertificateRegistrationConditions($record,$pdf);
												$pdf->ln();
												// $pdf->Cell(0,5,'Done at Kigali on : '.formatDateRpt($record->permit_issue_date),0,1);
												
												$permit_signitory = '';
												$title= 'ACTING';
												$title= '';
												$approved_by = '';
												
												$this->getCertificateSignatoryDetail($record,$pdf);
												
												$pdf->Output();
												$i= 1;
												$l =1;
												
												 
											}
												
        }else{
            return "Set rejection letter";
        }
        
				
		} catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
			} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
			}
			print_r($res);
			exit();
        return response()->json($res);
		
		
		
		
	}
	public function printDisposalCertificate($application_code){
									
					$logo=getcwd().'/assets/images/logo.jpg';
					
					
					$records = DB::table('tra_disposal_applications as t1')
										->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
										->leftJoin('par_districts as t7', 't7.id', 't2.district_id')
										->leftJoin('par_regions as t3', 't2.region_id', 't3.id')
										->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
										->leftJoin('par_weights_units as t5', 't1.weights_units_id', 't5.id')
										->leftJoin('par_currencies as t8', 't8.id', 't1.currency_id')
										->join('tra_approval_recommendations as t6', 't1.application_code', 't6.application_code')
										->leftJoin('users as t17', 't6.permit_signatory', '=', 't17.id')
										->select(DB::raw("t4.name as currency,total_weight,t8.name as currency_name, t6.permit_signatory,concat(decrypt(t17.first_name),' ',decrypt(t17.last_name)) as permit_signatoryname, market_value, t5.name as weights_units ,t2.name as applicant,t7.name as district_name, t2.physical_address, t3.name as region_name,t6.approval_date, t2.postal_address, t1.*, t6.decision_id"))
										->where(array('t1.application_code'=>$application_code))
										->first();
				
					if($records){
						$row = $records;
						if($row->decision_id == 1){
								$record = $records;
								$org_info = $this->getOrganisationInfo();
												
								$pdf = new PdfProvider();
								$this->getCertificateHeader($pdf, '');
											
								$this->funcGenerateQrCode($record,$pdf);
												
											
											$logo = getcwd() . '/resources/images/org-logo.jpg';
											$pdf->SetFont('times','B',9);
											$pdf->Cell(0,1,'',0,1);
											$pdf->Image($logo, 86, 18, 40, 35);
											
											
											$pdf->Cell(0,21,'',0,1);
											$pdf->Cell(0,5,'P.O. Box '.$org_info->postal_address.' '.$org_info->region_name,0,1);
											$pdf->Cell(0,5,$org_info->email_address,0,1);
											$pdf->Cell(0,5,$org_info->website,0,1);
											$pdf->ln();
										
								$reference_no  = $records->tracking_no ;
								$applicant_name   = $records->applicant ;
								$district_name  = $records->district_name ;
								$region_name  = $records->region_name ;
								$physical_address  = $records->physical_address ;
								$pdf->Cell(0,5,'',0,1,'C');
								$pdf->SetFont('','BI',10);
								$pdf->Cell(40,5,'Ref No: '.$reference_no,0,0);
								$pdf->Cell(0,5,'Date: '.date('jS F, Y',strtotime($row->approval_date)),0,1,'R');
								$pdf->ln();$pdf->SetFont('','B',12);
								
								$pdf->MultiCell(0,5,'CERTIFICATE OF SAFE DISPOSAL OF SUBSTANDARD, FALSIFIED AND EXPIRED REGULATED PRODUCTS',0,'C',0,1);
								
								$pdf->ln();$pdf->SetFont('','',10);
								$destruction_startdate = formatDaterpt($row->destruction_startdate);
								$destruction_enddate = formatDaterpt($row->destruction_enddate);
								if($destruction_startdate == $destruction_enddate){
									$date_of_destruction =  date('jS F, Y',strtotime($row->destruction_enddate));
								}
								else{
									$date_of_destruction =   date('jS F, Y',strtotime($row->destruction_startdate)).' to '.  date('jS F, Y',strtotime($row->destruction_enddate));
								}
								$text= "Reference is made to the Law Nº 003/2018 of 09/02/2018 establishing Uganda National Drug Authority and determining its mission, organization and functioning especially in its article 8; and considering the provisions of the Law No 47/2012 of 14/01/2013 relating to the regulation and inspection of food and pharmaceutical products especially in its article 38;.\n";
								$pdf->setCellHeightRatio(2);
								$pdf->writeHTML($text, true, false, false, false, 'J');
		
								$methodsof_destructionsdata = DB::table('tra_methodsof_destructions as t1')
																		->join('par_destruction_methods as t2', 't1.destructionmethod_id', 't2.id')
																		->select('t2.name as disposal_method')

																		->where(array('application_code'=>$application_code));
										$methods = '';								
								if($methodsof_destructionsdata->get()){
									$i = 1;
									$totals = $methodsof_destructionsdata->count();
										$results =$methodsof_destructionsdata->get();
									
									foreach($results as $rows){
										
										if($totals == $i && $i != 1){
											$methods .= ' and '.$rows->disposal_method;
										}
										else{
											if(($i+1) == $totals ){
												$methods .= $rows->disposal_method;
											}
											else{
												
												$methods .= $rows->disposal_method.',';
											}
											
										}
										$i++;
									}
									
								}
							$destruction_sites = DB::table('tra_destruction_exercisesites as t1')
																		->join('par_disposaldestruction_sites as t2', 't1.destruction_site_id', 't2.id')
																		->select('t2.name as destruction_site')

																		->where(array('application_code'=>$application_code));
										$destruction_site  = '';								
								if($destruction_sites->get()){
									$i = 1;
									$totals = $destruction_sites->count();
										$results =$destruction_sites->get();
									
									foreach($results as $rows){
										
										if($totals == $i && $i != 1){
											$destruction_site .= ' and '.$rows->destruction_site;
										}
										else{
											if(($i+1) == $totals ){
												$destruction_site .= $rows->destruction_site;
											}
											else{
												
												$destruction_site .= $rows->destruction_site.',';
											}
											
										}
										$i++;
									}
									
								}
							
								$records = DB::table('tra_disposal_inspectors as t1')
								->join('par_disposal_inspectors_titles as t2', 't1.inspectors_title_id', '=', 't2.id')
								->select(DB::raw("count(t1.id) as counter, t2.name as title"))
								->where(array('t1.application_code' => $application_code))
								->groupBy('t2.id');
		$witness = '';
								if(	$records->get()){
									$i = 1;
									
									
									$totals = $records->count();
									$records = $records->get();
									foreach($records as $rows){
										$counter = '';
										if($rows->counter > 1){
											$counter = $rows->counter.' ';
										}
										
										if($totals == $i && $i != 1){
											$witness .= ' and '.$counter.$rows->title;
										}
										else{
											if(($i+1) == $totals ){
												$witness .= $counter.$rows->title;
											}else{
												$witness .= $counter.$rows->title.', ';
											}
										}
										$i++;
									}
									
								}//destruction_site
								$weight_consignement = $row->total_weight.' '. $row->weights_units;
								$market_value = formatMoney($row->market_value).' '. $row->currency_name;
 
								$pdf->Cell(0,2,'',0,1);
								$text2 = "Uganda NDA, hereby certifies the disposal of substandard/ falsified/ expired products being the property of the company named <b>".$applicant_name."</b>.located in <b>".$region_name."</b/> Province, <b>".$district_name."</b> District, <b>".$physical_address."</b> which took place on <b>".$date_of_destruction."</b>.\n";
								$pdf->writeHTML($text2, true, false, false, false, 'J');
								$pdf->Cell(0,2,'',0,1);
								$text3 = "The annexed consignment was destroyed by <b>".$methods ."</b>(method) at <b>".$destruction_site."</b>(location/site) under the witness and supervision of (Uganda NDA Inspectors, and others if any) as specified in the attached disposal form. The weight of the consignment disposed was <b>".$weight_consignement."</b> and its market value was <b>".$market_value."</b>.\n";
								$pdf->writeHTML($text3, true, false, false, false, 'J');
								$pdf->SetFont('','B',10);
								$pdf->ln();
								//$pdf->Cell(0,5,'Done at Kigali on : '.formatDateRpt($record->approval_date),0,1);
												
								
								$permit_signitory = '';
								$title= 'ACTING';
								$title= '';
								$approved_by = '';
												
								$this->getCertificateSignatoryDetail($record,$pdf);
																

						}else{

						}
					}
						$pdf->Output('Disposal Certificate.pdf');


		
		
		
		
	}
	public function generateLetterOfREjection($application_code,$req,$module_id)
{
	try{

																	$application_code = $req->application_code;
																	
																	$query_id = $req->query_id;
																	$module_data = getTableData('modules', ['id'=>$module_id]);
																	if(!isset($module_data->table_name)){
																		return "Module details not found";
																	}
																	$app_data = DB::table($module_data->table_name.' as t1')
																				->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
																				->leftJoin('par_countries as t3', 't2.country_id', 't3.id')
																				->leftJoin('par_regions as t4', 't2.region_id', 't4.id')
																				->leftJoin('sub_modules as t5', 't1.sub_module_id', 't5.id')
																				->leftJoin('tra_apprejprovisional_recommendation as t7', 't1.application_code', 't7.application_code')
																				->where('t1.application_code', $application_code);
																	
																	if($module_id ==1){
																		$app_data->join('tra_product_information as t6', 't1.product_id','t6.id')->select('t7.created_on as approval_date', 't7.reason_for_rejection','t1.applicant_id','t5.title as application_title','t1.reference_no', 't1.tracking_no', 't2.*', 't3.name as country_name', 't4.name as region_name', 't6.brand_name');
																	}
																	else{
																		$app_data->select('t7.created_on as approval_date', 't7.reason_for_rejection','t1.applicant_id','t5.title as application_title','t1.reference_no', 't1.tracking_no', 't2.*', 't3.name as country_name', 't4.name as region_name');
																	}
																	$app_data = $app_data->first();
																
																	if(!$app_data){
																		return "Application details not found";
																	}
																	
																	$org_info = $this->getOrganisationInfo();
																	$pdf = new PdfLettersProvider();
																	$pdf->AddPage();
																	//$pdf->SetLineWidth(0.4);
																	//$pdf->Rect(3,3,204,285);
																		$template_url = base_path('/');
																		$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
																		// import page 1
																		$tplId = $pdf->importPage(1);	
																	
																		// use the imported page and place it at point 10,10 with a width of 100 mm
																		$pdf->useTemplate($tplId,0,0);
																		$pdf->setPageMark();
																	//use template 
																	
																	$logo = getcwd() . '/resources/images/logo.png';
																	$pdf->Image($logo, 86, 18, 40, 35);
																	
																	$pdf->SetFont('times','B',9);
																	
																	
																	$pdf->Cell(0,4,'FORM II',0,1,'R');
																	$pdf->Cell(0,4,'(Regulation 3)',0,1,'R');
																	$pdf->SetFont('times','B',13);
																	$pdf->Cell(0,25,'',0,1);
																	$pdf->Cell(0,15,'',0,1);
																	$pdf->Cell(0,4,$org_info->name,0,1,'C');
																	$pdf->SetFont('times','B',11);
																	$pdf->Cell(0,4,'The Medicines and Allied Substances Act, 2013',0,1,'C');
																	
																	
																	$pdf->Cell(0,4,'(Act No. 3 of 2013)',0,1,'C');
																	$pdf->SetFont('times','B',12);
																	$pdf->Cell(0,8,'The Medicines and Allied Substances',0,1,'C');
																	$pdf->SetFont('times','B',11);
																	if($module_id == 4){
																			$regulation_title = "The Medicines and Allied Substances (Importation and Exportaion) Regulations, 2017";
																			
																	}
																	else if($module_id == 1){
																		$regulation_title = "(Marketing Authorisation of Medicines) Regulations, 2019";
																	
																	}
																	$pdf->Cell(0,4,$regulation_title,0,1,'C');

																	$pdf->Cell(0,5,'',0,1);
																	$pdf->SetFont('times','B',13);
																	//application_title
																	$title = "NOTICE OF REJECTION OF ".$app_data->application_title;

																	$pdf->Cell(0,5,strtoupper($title),0,1,'C');
																	$pdf->SetFont('times','B',10);
																	
																	$application_no = '';

																	if($app_data->tracking_no != ''){

																		$application_no = 	$app_data->tracking_no;
																	}
																	if($app_data->reference_no != ''){

																		$application_no = 	$app_data->reference_no;
																	}
																	$pdf->Cell(0,10,'Application No:'.$application_no,0,1, 'R');
																		// $pdf->MultiCell(0,10,'Application Reference:<u>'.$app_data->tracking_no.'</u>',0,'R',0,1,'','',true,0,true);
																	$data = '{"tracking_no":'.$app_data->tracking_no.',"module_id":'.$module_id.',"application_code":'.$application_code.'}';

																	$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
																	// QRCODE,H : QR-CODE Best error correction
																	$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
																	$pdf->SetFont('times','',12);
																	//Letter heading 
																	$pdf->Cell(0,8,'To:',0,1);
																	$pdf->Cell(0,8,$app_data->name.',',0,1);
																	
																	$pdf->Cell(0,8,$app_data->physical_address.',',0,1);
																	$pdf->Cell(0,8,$app_data->postal_address.',',0,1);
																	$pdf->Cell(0,8,$app_data->region_name." ".$app_data->country_name,0,1);
																	
																	$pdf->SetFont('times','',11);
																	$pdf->ln();
																		
																	if($module_id ==1){

																		$template = "IN THE MATTER OF ".$application_no.' '.$app_data->brand_name." you are notified that your application for (3) a marketing authorisation/renewal of a marketing authorisation has been rejected by the Authority on the following grounds:";
																
																	}
																	else{
																		$template = "IN THE MATTER OF ".$application_no." you are notified that your application for ".$app_data->application_title." has been rejected by the Authority on the following grounds:";
																

																	}
																	$reason_for_rejection = $app_data->reason_for_rejection;
																	if($reason_for_rejection == ''){
																		$data = DB::connection('portal_db')->table('wb_rejection_remarks')->where('application_code',$application_code)->first();
																		$reason_for_rejection = $data->remark;
																		$pdf->setCellHeightRatio(2);
																		$pdf->WriteHTML($template, true, false, true, true);
																		$pdf->WriteHTML($reason_for_rejection, true, false, true, true);
																		$pdf->SetFont('times','B',12);
																	}else{
																		
																		$pdf->setCellHeightRatio(2);
																		$pdf->WriteHTML($template, true, false, true, true);
																		$pdf->WriteHTML($reason_for_rejection, true, false, true, true);
																		$pdf->SetFont('times','B',12);
																		
																		$dt =strtotime($app_data->approval_date); //gets dates instance
																		$year = date("Y", $dt);
																		$month = date("m", $dt);
																		$day = date("d", $dt);
																		
																			$pdf->Cell(0, 0,'Dated this '.$day.' day of '.$month.', '.$year, 0, 1, '', 0, '', 3);

																				$startY = $pdf->GetY();
																				$startX =$pdf->GetX();
																				$signiture = getcwd() . '/backend/resources/templates/signatures_uploads/dg_sinatory.png';
																				//$pdf->Image($signiture,$startX+75,$startY-7,30,12);
																				$pdf->Cell(0, 0, '___________________________',0,1,'C');
																				$pdf->Cell(0, 0, 'AG. Director-General',0,1,'C');
																	}
																	
																	
																			$pdf->Output('Letter of Rejection '.$application_no.'.pdf');
																			
																}catch (\Exception $exception) {
																	$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
											
															} catch (\Throwable $throwable) {
																	$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
															}
															return response()->json($res);									
																	
}
	function getCertificateRegistrationConditions($row,$pdf){
		$module_id = $row->module_id;
		$section_id = $row->section_id;
		
		$where = array('module_id'=>$module_id, 'section_id'=>$section_id);
		
		$records = DB::table('par_certificate_conditions')->where($where)->orderBy('order_no')->get();
			
		if($records){
			
			foreach($records as $rec){
				
					//$pdf->Cell(8,2,$rec->order_no.'. ',0,0);
					//$pdf->MultiCell(0,5,$rec->certificate_conditions." .\n",0,'J',0,1);
				   $pdf->writeHTML($rec->order_no.'. '.$rec->certificate_conditions." .\n", true, false, true, false, '');
				
			}
			
		}
	}
	function getCertificateSignatoryDetail($record ,$pdf){
		
			$pdf->ln();
								$startY = $pdf->GetY();
								$startX =$pdf->GetX();
								
								
								$director_details = getPermitSignatoryDetails();
										$dg_signatory = $director_details->director_id;
										$director = $director_details->director;
										$is_acting_director = $director_details->is_acting_director;
										
										$approved_by = $record->permit_signatory;
										$permit_signatoryname = $record->permit_signatoryname;
										
										if($dg_signatory != $approved_by){
											$signatory = $approved_by;
										}
										else{
											$signatory = $dg_signatory;
										}
										//permit_approval permit_signatory 
										$signature = getUserSignatureDetails($signatory);
										
										$signature = getcwd() . '/backend/resources/templates/signatures_uploads/'.$signature;
										$pdf->Image($signature,$startX+6,$startY-8,30,12);
										
										 $pdf->Cell(0,8,'...............................................................', 0,1,'');
									
										$title = "Director-General";
										if($dg_signatory != $approved_by){
											$title = 'Acting '.$title;
										}else{
											$permit_signatoryname = $director;
											if($is_acting_director ==1){
												$title = 'Acting '.$title;
											}
											
										}
										$pdf->Cell(0,8,'SIGNATURE', 0,1,'');
										$pdf->Cell(0,8,strtoupper($permit_signatoryname), 0,1,'');
										 $pdf->Cell(0,8,$title, 0,0,'');

		
	}    
	 static function getQuantityCategoryIds()
    {
        $quantity_category_obj = DB::table('par_containers')
            ->where('has_quantity', 1)
            ->get();
        $quantity_categories_ass = convertStdClassObjToArray($quantity_category_obj);
        $quantity_categories_simp = convertAssArrayToSimpleArray($quantity_categories_ass, 'id');
        return $quantity_categories_simp;
    }
	
    static function belongsToQuantityCategory($container_id)
        {
            $QuantityCategoryIDs = self::getQuantityCategoryIds();
            $container_id_array = is_array($container_id) ? $container_id : [$container_id];
            $arr_intersect = array_intersect($QuantityCategoryIDs, $container_id_array);
            if (count($arr_intersect) > 0) {
                return true;
            } else {
                return false;
            }
        }


public function medicinesProductRegistration($application_code,$row){
		try{
			        


						$is_provisional =0;
						$strength='';
						
						if($row){
							if($row->recommendation_id == 2){
								$is_provisional =1;
							}
							$org_info = $this->getOrganisationInfo();
								
								$pdf = new PdfProvider();
								$this->getCertificateHeader($pdf,'');
								$pdf->SetLineWidth(0.4);
								$pdf->Rect(3,3,204,285);
                        		$logo = getcwd() . '/resources/images/cert_logo.png';						
                        		$pdf->SetFont('times','B',9);
								$pdf->Cell(0,1,'',0,1);
								
								$pdf->Cell(0,21,'',0,1);
								$pdf->MultiCell(0,5,$row->certificate_title,0,'C',0,1);
								$pdf->ln();

								$pdf->SetFont('times','B',9);
								
								$pdf->Cell(0,5,'NATIONAL DRUG POLICY AND AUTHORITY ACT, CAP 206',0,1,'C');

								$pdf->SetFont('times','I',10);
								$act_statement = "Issued under section Regulation 14(1), National Drug Policy and Authority (Registration) Regulations, 2014\n";
								
								$pdf->MultiCell(0,5,$act_statement,0,'J',0,1);
							
								$pdf->SetFont('times','B',10);
								$pdf->Cell(0,3,'',0,1);
								
								$pdf->SetFont('times','',10);
									
                                if( $is_provisional == 1){
                                   // $pdf->Cell(70,8,0,0);
									$pdf->MultiCell(70,8,'Provisional registration number of the medicine',0,'',0,0);
                                }
                                else{
                                	$pdf->SetFont('times','',10);
                                    $pdf->Cell(70,8,'Registration number:',0,0);
								
                                }
								$data = "Product Registration: Certificate No:".$row->certificate_no."; Brand Name:".$row->brandName.";Expiry Date:".formatDate($row->expiry_date);
								 $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);

								$pdf->SetFont('times','',11);
								$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
								$pdf->Cell(100,7,$row->certificate_no,0,1);
								$pdf->SetFont('times','',11);
								$pdf->Cell(70,7,'Date of registration:',0,0);
								$pdf->Cell(100,5,ucwords(date('F d, Y ',strtotime($row->approval_date))),0,1);
                                $pdf->SetFont('times','',11);
								$pdf->Cell(70,8,'Expiry date of registration:',0,0);
								$pdf->Cell(100,5,ucwords(date('F d, Y ',strtotime($row->expiry_date))),0,1);

								$pdf->SetFont('times','',10);
								$pdf->ln();
								$pdf->Cell(70,8,'Category of Drug or preparation:',0,0);
								$pdf->SetFont('times','B',11);
								$pdf->Cell(100,7,$row->product_category,0,1);

								 $ingred_rows = DB::table('tra_product_ingredients as t1')
									->select('t1.*','t1.strength', 't6.name as reason_for_inclusion', 't2.name as ingredient_specification', 't3.name as si_unit', 't4.name as ingredient_name', 't5.name as ingredient_type')
									->leftJoin('par_specification_types as t2', 't1.specification_type_id', '=', 't2.id')
									->leftJoin('par_si_units as t3', 't1.ingredientssi_unit_id', '=', 't3.id')
									->leftJoin('par_ingredients_details as t4', 't1.ingredient_id', '=', 't4.id')
									->leftJoin('par_ingredients_types as t5', 't1.ingredient_type_id', '=', 't5.id')
									->leftJoin('par_inclusions_reasons as t6', 't1.inclusion_reason_id', '=', 't6.id')
									->where(array('t1.product_id' => $row->product_id))
									->get();
								if($ingred_rows){
									foreach($ingred_rows as $ingred_row){
										$ingr_name=$ingred_row->ingredient_name;
										$strength=$ingred_row->strength;
										
									}
									
								}else{
									$ingr_name='';
									$proportion='';
									$strength='';
									$specification_id=0;
								}
								$pdf->ln();
								$pdf->SetFont('times','B',12);
								$pdf->MultiCell(0,8,"1.	Product information:\n",0,'J',0,1);
								$pdf->SetFont('times', '', 10);
								$text = 'Proprietary (trade) name: ' . strtoupper($row->brandName) . '   Generic name (the international Non-Proprietary name: for herbal product, state botanical name): ' .strtoupper($ingr_name);
								$pdf->MultiCell(0, 8, $text, 0, 'L', 0, 1);
								$text2 = 'Dosage form: ' . strtoupper($row->dosage_form) . '   strength(s) per dosage unit: ' .strtoupper($strength);
								$pdf->MultiCell(0, 8, $text2, 0, 'L', 0, 1);
								$pdf->SetFont('times','',10);

								$pdf->MultiCell(70,8,'Description of drug or preparation:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								
								$pdf->MultiCell(0,8,strtoupper($row->physical_description),0,'J',0,1);
								$pdf->SetFont('times','',10);

								$pdf->MultiCell(70,8,'Therapeutic category:',0,'',0,0);
								$pdf->SetFont('times','',10);
								$pdf->Cell(100,7,$row->therapeutic_category,0,1);
								$pdf->MultiCell(70,8,'Indication:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,7,$row->indication,0,1);
								$pdf->ln();
								$pdf->SetFont('times','B',12);

								$pdf->MultiCell(0,8,"2.	Approved manufacturer(s) information for the product:\n",0,'J',0,1);

								$manrow = DB::table('tra_product_manufacturers as t1')
									->select('t1.*', 't2.email_address','t1.manufacturer_id', 't2.physical_address', 't2.name as manufacturer_name','t2.postal_address', 't3.name as country_name', 't4.name as region_name', 't5.name as district_name')
									->join('tra_manufacturers_information as t2', 't1.manufacturer_id', '=', 't2.id')
									->leftjoin('par_countries as t3', 't2.country_id', '=', 't3.id')
									->leftJoin('par_regions as t4', 't2.region_id', '=', 't4.id')
									->leftJoin('par_districts as t5', 't2.district_id', '=', 't5.id')
									->leftJoin('par_manufacturing_roles as t6', 't1.manufacturer_role_id', '=', 't6.id')
									->where(array('t1.product_id' => $row->product_id))
									->first();
									$manufacturer_name= '';
									$man_postal_address='';
									$man_physical_address='';
									$man_countryName= '';
									$man_districtName= '';
									$man_regionName = '';
									
								if ($manrow) {
										$manufacturer_name=$manrow->manufacturer_name;
										$man_postal_address=$manrow->postal_address;
										$man_physical_address=$manrow->physical_address;
										$man_countryName= $manrow->country_name;
										$man_regionName = $manrow->region_name;

								   
								}


								$pdf->SetFont('','B',11);
								$pdf->MultiCell(40, 6, 'Production Stage:', 1, '', 0, 0);
								$pdf->MultiCell(40, 6, 'Name of manufacturer', 1, '', 0, 0);
								$pdf->MultiCell(40, 6, 'Street address of site', 1, '', 0, 0);
								$pdf->MultiCell(40, 6, 'Manufacturing step', 1, '', 0, 1);


								$street_name = $man_countryName . ', ' . $man_regionName . ', ' . $man_physical_address . ', ' .  $man_postal_address;
								$productstage_height = $pdf->getStringHeight(40, '');
								$manufacturer_name_height = $pdf->getStringHeight(40, $manufacturer_name);
								$street_height = $pdf->getStringHeight(40, $street_name);
								$step_height = $pdf->getStringHeight(40, '');

								$max_height1 = max($productstage_height, $manufacturer_name_height,$street_height,$step_height);

							    $pdf->SetFont('', '', 10);
							    $pdf->MultiCell(40, $max_height1, '', 1, '', 0, 0);
								$pdf->MultiCell(40, $max_height1,  $manufacturer_name, 1, '', 0, 0);
								$pdf->MultiCell(40, $max_height1, $street_name, 1, '', 0, 0);
								$pdf->MultiCell(40, $max_height1,  '', 1, '', 0, 1);


								$pdf->SetFont('times','B',12);
								$pdf->MultiCell(0,8,"3.	Product shelf life :\n",0,'J',0,1);
								$pdf->SetFont('times','',10);
								$text3 = 'The approved shelf life of this product when packaged and labeled as detailed in the application and modified in subsequent correspondence is as follows.';
								$pdf->MultiCell(0, 8, $text3, 0, 'L', 0, 1);
					            $packaging_data = DB::table('tra_product_packaging as t1')
					                ->select(DB::raw("t1.*,t2.name as container_name,t3.name as secondary_container_name,t4.name as tertiary_container_name,t5.name as shipper_container_name,t6.name as si_unit,t7.name as secondary_si_unit,t8.name as tertiary_si_unit,t9.name as shipper_si_unit,t10.description as generic_atc_name"))
					                ->leftJoin('par_containers as t2', 't1.container_id', '=', 't2.id')
					                ->leftJoin('par_containers as t3', 't1.secondary_container_id', '=', 't3.id')
					                ->leftJoin('par_containers as t4', 't1.tertiary_container_id', '=', 't4.id')
					                ->leftJoin('par_containers as t5', 't1.shipper_container_id', '=', 't5.id')
					                ->leftJoin('si_units as t6', 't1.si_unit_id', '=', 't6.id')
					                ->leftJoin('si_units as t7', 't1.secondary_si_unit_id', '=', 't7.id')
					                ->leftJoin('si_units as t8', 't1.tertiary_si_unit_id', '=', 't8.id')
					                ->leftJoin('si_units as t9', 't1.shipper_si_unit_id', '=', 't9.id')
					                 ->leftJoin('par_atc_codes as t10', 't1.active_common_name_id', '=', 't10.id')
					                ->where(array('t1.product_id' => $row->product_id))
					                ->get();


					             foreach ($packaging_data as $packaging_rec) {
					                    $packSize = '';
					                    $packSizediluent = '';
					                    $pack_id = $packaging_rec->id;
					                    $is_quantity_category = $this->belongsToQuantityCategory($packaging_rec->container_id);

					                    // Calculate pack size
					                    if ($is_quantity_category) {
					                        $packSize = "{$packaging_rec->no_of_packs}{$packaging_rec->si_unit} {$packaging_rec->container_name}";
					                    } else {
					                        $packSize = "{$packaging_rec->no_of_units} {$packaging_rec->container_name}";
					                    }

					                    // Add secondary, tertiary, and shipper units if they exist
					                    if ($packaging_rec->secondary_no_of_units) {
					                        $packSize = "{$packaging_rec->secondary_no_of_units}*" . $packSize;
					                    }
					                    if ($packaging_rec->tertiary_no_of_units) {
					                        $packSize = "{$packaging_rec->tertiary_no_of_units}*" . $packSize;
					                    }
					                    if ($packaging_rec->shipper_no_of_units) {
					                        $packSize = "{$packaging_rec->shipper_no_of_units}*" . $packSize;
					                    }
					                    if ($packaging_rec->other_no_of_units) {
					                        $packSize = "{$packaging_rec->other_no_of_units}*" . $packSize;
					                    }

					                    // Retrieve diluent data
					                    $diluent_data = DB::table('tra_product_diluent_packaging as t1')
					                        ->select(DB::raw("t1.*, t2.name as container_type, t3.name as container_name, t4.name as container_material, t5.name as closure_materials, t4.name as container_material, t5.name as closure_material, t6.name as seal_type, t7.name as packaging_units, retail_packaging_size as retail_packaging,t8.name as si_unit,t9.name as packaging_category,t10.name as diluent"))
					                        ->leftJoin('par_containers_types as t2', 't1.container_type_id', '=', 't2.id')
					                        ->leftJoin('par_containers as t3', 't1.container_id', '=', 't3.id')
					                        ->leftJoin('par_containers_materials as t4', 't1.container_material_id', '=', 't4.id')
					                        ->leftJoin('par_closure_materials as t5', 't1.closure_material_id', '=', 't5.id')
					                        ->leftJoin('par_seal_types as t6', 't1.seal_type_id', '=', 't6.id')
					                        ->leftJoin('par_packaging_units as t7', 't1.packaging_units_id', '=', 't7.id')
					                        ->leftJoin('si_units as t8', 't1.si_unit_id', '=', 't8.id')
					                        ->leftJoin('par_container_categories as t9', 't1.packaging_category_id', '=', 't9.id')
					                        ->leftJoin('par_diluents as t10', 't1.diluent_id', '=', 't10.id')
					                        ->where(['t1.product_id' => $row->product_id, 't1.pack_id' => $row->pack_id])
					                        ->get();

					                    // Process each diluent record
					                    foreach ($diluent_data as $diluent_record) {

					                         $is_quantity_category = $this->belongsToQuantityCategory($diluent_record->container_id);

					                            // Calculate pack size
					                            if ($is_quantity_category) {
					                                $packSizediluent = "{$diluent_record->secondary_no_of_units}*{$diluent_record->no_of_packs}{$diluent_record->si_unit} {$diluent_record->container_name} {$diluent_record->diluent}";
					                            } else {
					                                $packSizediluent = "{$diluent_record->secondary_no_of_units}*{$diluent_record->no_of_units} {$diluent_record->container_name} {$diluent_record->diluent}";
					                            }
					                                $packSize .= ' + ' . $packSizediluent;
					                            }

					                    // Assign the calculated pack size to the record
					                    $packaging_rec->pack_size = $packSize;
					                }

								$pdf->SetFont('','B',11);
								$pdf->MultiCell(60, 6, 'Pack description', 1, '', 0, 0);
								$pdf->MultiCell(60, 6, 'Shelf-life', 1, '', 0, 0);
								$pdf->MultiCell(60, 6, 'Storage conditions', 1, '', 0, 1);



								$pack_height = $pdf->getStringHeight(60, $packaging_rec->pack_size);
								$shelf_height = $pdf->getStringHeight(60, $row->shelf_life);
								$storage_height = $pdf->getStringHeight(60, $row->storage_condition);
								$max_height = max($pack_height, $shelf_height,$storage_height);

							    $pdf->SetFont('', '', 10);
								$pdf->MultiCell(60, $max_height,  $packaging_rec->pack_size, 1, '', 0, 0);
								$pdf->MultiCell(60, $max_height, $row->shelf_life, 1, '', 0, 0);
								$pdf->MultiCell(60, $max_height,  $row->storage_condition, 1, '', 0, 1);
								$this->getCertificateHeader($pdf,'');

								$pdf->ln();
								$pdf->SetFont('times','B',12);
								$pdf->MultiCell(0,8,"4.	Restrictions on sale or distribution of drug or preparation\n",0,'J',0,1);
								$pdf->SetFont('times','',10);
								$pdf->Cell(70,8,'Distribution category:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,8,strtoupper($row->distribution_category),0,1,'L'); 
								
								$pdf->SetFont('times','',10);
								//$pdf->Cell(0,1,'',0,1);
								$pdf->Cell(70,8,'Issued on:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,8,ucwords(date('F d, Y ',strtotime($row->certificate_issue_date))),0,1,'L'); 
								
								
								$pdf->SetFont('times','',10);
								//$pdf->Cell(0,1,'',0,1);
								$pdf->Cell(70,8,'Expires on:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,8,ucwords(date('F d, Y ',strtotime($row->expiry_date))),0,1,'L');
								$approved_by = '';
								$permit_signitory = '';
		                        $title= '';
		                        $signatory=$approved_by;
		                        $signature = getUserSignatureDetails($signatory);
		                        $startY = PDF::GetY();
		                        $startX = PDF::GetX();
		                        $signiture = getcwd() . '/resources/images/signs/'.$signature;
		                       	$pdf->Image($signiture,$startX+80,$startY-7,30,12,'L');
		                       	$pdf->ln();

								$pdf->SetFont('times','',11);
								$pdf->Cell(0,8,'...................................................',0,1,'L');

								$pdf->Cell(30, 5, 'FOR THE AUTHORITY', 0, 0, 'L');
								$approval_date = date('d F\\, Y', strtotime($row->certificate_issue_date));
								$pdf->SetFont('times', 'B', 11);
								$pdf->Cell(10); 
								$pdf->SetFont('times', ' ', 11);
								$pdf->WriteHTML(' DATE <b>' . $approval_date . '</b>', true, false, false, false, 'R');								
								$pdf->Output();
						}	
							
								
			
			
		} catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
			} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
			}
			
			print_r($res);
        return response()->json($res);
		
	}
public function printClinicalTrialCertificate($application_code,$application_id){
		
		try{
				$approvalGrant = DB::table('tra_approval_recommendations')->where('application_code', $application_code)->first();
			if(!$approvalGrant){
				echo "The application has not been approved, contact the system administration.";
				exit();
			}
			if($approvalGrant->decision_id == 1){
			 
				$record = DB::table('tra_clinical_trial_applications as t2')
					->join('wb_trader_account as t3', 't2.applicant_id', '=', 't3.id')
					->leftJoin('clinical_trial_personnel as t4', 't2.sponsor_id', '=', 't4.id')
					->leftJoin('clinical_trial_personnel as t5', 't2.investigator_id', '=', 't5.id')
					->join('tra_approval_recommendations as t6', 't2.application_code', '=', 't6.application_code')
					->leftJoin('par_countries as t7', 't4.country_id', '=', 't7.id')
					->leftJoin('par_regions as t8', 't4.region_id', '=', 't7.id')
					->leftJoin('users as t17', 't6.permit_signatory', '=', 't17.id')
					->select(DB::raw("t2.*,t2.id as previous_id,concat(decrypt(t17.first_name),' ',decrypt(t17.last_name)) as permit_signatoryname,t6.approved_by,t6.permit_signatory,t6.permit_no,t3.name as applicant_name,t4.name as sponsor,t5.name as investigator,t5.physical_address as investigator_address,
						t3.id as applicant_id, t3.name as applicant_name, t3.contact_person, t3.tin_no,t2.reference_no,t2.*,t6.expiry_date as regexpiry_date,t6.approval_date as regcertificate_issue_date, t6.certificate_no as registration_no,t7.name as sponsor_country, t7.name as sponsor_region,
						t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,t2.id as application_id, t8.name as region_name,t7.name as country_name,
						t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,t4.postal_address as sponsor_address ,t4.physical_address as sponsor_physical_address ,t4.telephone as sponsor_telephone,t3.telephone_no as app_telephone,t3.fax as app_fax, t3.email as app_email,t4.email as sponsor_email, t3.website as app_website"))
					->where('t2.application_code',$application_code)
					->first();
							if($record){
								$row = $record;
								$principal_investigator= $row->investigator;
								$principal_investigator= $row->investigator;
								$application_id = $row->application_id;
								$application_id = $row->application_id;
                        		$approved_by = $row->approved_by;

								$reference_no = $row->reference_no;	$protocol_no = $row->protocol_no;
								$data = "Clincial Trial Authorisation: Permit No:".$row->registration_no."; Protocol No:".$row->protocol_no.";Issued Date:".formatDate($row->regcertificate_issue_date);

								$pdf = new PdfProvider();											
								$org_info = $this->getOrganisationInfo();
					            $pdf->setPrintHeader(false);
					           	$pdf->setPrintFooter(false);
					            $pdf->AddPage();
					           	$pdf->SetFont('times','',13);
					            $pdf->Cell(0,10,'',0,1);
					            $pdf->SetMargins(20,10,20, true);
					            $pdf->SetFont('times','B',13);
                        		$logo = getcwd() . '/resources/images/cert_logo.png';
								$pdf->SetFont('times','',13);
		                       	$pdf->Cell(78);
		                       	$pdf->SetMargins(14,10,14, true);
		                        $pdf->Image($logo,65,20,80,33);
		                       
		                       	$pdf->SetFont('times','B',17);
	                        	$pdf->Cell(0,30,'',0,1);
	                        	$pdf->Cell(0,4,'CLINICAL TRIAL CERTIFICATE ',0,1,'C');
	                        	$pdf->ln();

	                        	$pdf->SetFont('times','I',11);
	                        	$pdf->Cell(0,4,'Issued under Section 40(1) of the Act and Regulation 6(6) of the National Drug Policy and ',0,1,'C');
	                        	$pdf->Cell(0,4,'Authority (Conduct of the Clinical Trials) Regulations 2014',0,1,'C');
	                        	$pdf->ln();
	                        	$pdf->ln(); 


								$pdf->SetFont('times', '', 11);
								$pdf->Cell(60,5,'Clinical Trial Certificate Number:',0,0);

								$current_x = $pdf->GetX();
								$current_y = $pdf->GetY();
								$pdf->SetFont('times','B',11);
								$pdf->MultiCell(0,5,strtoupper($row->registration_no),0,'',0,1);

								$pdf->SetXY($current_x + 20, $current_y);

								$pdf->SetFont('times','',11);
								$pdf->Cell(0,5,'Issued under section 40 of the Act by the Authority',0,1,'C');
                        		$pdf->ln();

								$pdf->setCellHeightRatio(1.8);
								$htmlContent1 = "
								    <p>Sponsor’s name: <b>" . strtoupper($row->sponsor) . "</b></p>
								    <p>Physical Address:<b> " . strtoupper($row->sponsor_physical_address . ", " . $row->sponsor_address . ", " . $row->region_name . ", " . $row->country_name) . " </b></p>
								    <p>Telephone Number: <b>" . strtoupper($row->sponsor_telephone) . "</b></p>
								    <p>Email Address: <b>" . $row->sponsor_email . "</b></p>";
								$pdf->WriteHTML($htmlContent1, true, 0, true, true, 'J');


                        		$pdf->Cell(0,5,'',0,1);
								$pdf->SetFont('times', '', 11);
								$pdf->Cell(60,5,'Title of the Clinical Trials Protocol:',0,0);
								$pdf->SetFont('times','B',11);
								$pdf->MultiCell(0,5,strtoupper($row->study_title),0,'',0,1);
								$pdf->SetFont('times', '', 11);
								$pdf->Cell(60,5,'Number of the Clinical Trials Protocol: ',0,0);
								$pdf->Cell(10); // Add space
								$pdf->SetFont('times','B',11);
								$pdf->MultiCell(0,5,strtoupper($row->protocol_no),0,'',0,1);
								$pdf->SetFont('times','',11);
								$pdf->Cell(30, 5, 'Date of Approval', 0, 0, 'L');
								$approval_date = date('d F\\, Y', strtotime($row->regcertificate_issue_date));
								$pdf->SetFont('times', 'B', 11);
								$pdf->Cell(20, 5, $approval_date, 0, 0, 'L');
								$pdf->Cell(10); // Add space between the two text segments
								$pdf->SetFont('times', ' ', 11);
								$expiry_date = date('d F\\, Y', strtotime($row->regexpiry_date));
								$pdf->WriteHTML(' Date of Expiry <b>' . $expiry_date . '</b>', true, false, false, false, 'R');

								$pdf->SetFont('','',11);
								$pdf->Cell(60,5,'Name of the Principal Investigator(s).',0,0);
								$pdf->SetFont('','B',11);
								$pdf->MultiCell(0,5,strtoupper($principal_investigator),0,'',0,1);
								$pdf->SetFont('','',11);
								$pdf->Cell(60,5,'Address',0,0);
								$pdf->MultiCell(0,5,strtoupper($row->investigator_address),0,'',0,1);

								$pdf->SetFont('','B',11);
								$pdf->MultiCell(90,6,'Name of the Investigational product(s):',1,'',0,0);
								$pdf->MultiCell(90,6,'Comparator(s)',1,'',0,1);

								$prod_records = DB::table("clinical_trial_products")
								                  ->select("*")
								                  ->where(array('application_id'=>$application_id))
								                  ->get();

								$comparator_records = DB::table("tra_clinical_comparatorproducts")
								                  ->select("*")
								                  ->where(array('application_id'=>$application_id))
								                  ->get();

								$comparator_products = [];                           
								$investigational_products = [];  

								if ($prod_records) {
								    $inv_counter = 1;
								    foreach ($prod_records as $prod_record) {
								        $brand_name = $prod_record->brand_name;
								            $investigational_products[] = "{$inv_counter}. {$brand_name}";
								            $inv_counter++;
								        
								    }
								}

								if ($comparator_records) {
								    $comp_counter = 1;
								    foreach ($comparator_records as $comparator_record) {
								        $brand_name = $comparator_record->brand_name;
								            $comparator_products[] = "{$comp_counter}. {$brand_name}";
								            $comp_counter++;
								        
								    }
								}


								// Calculate the height after fetching the data
								$inv_products_height = $pdf->getStringHeight(90, implode("\n", $investigational_products));
								$comp_products_height = $pdf->getStringHeight(90, implode("\n", $comparator_products));

								$max_height = max($inv_products_height, $comp_products_height);

								$pdf->SetFont('','B',11);
								$pdf->MultiCell(90, $max_height, implode("\n", $investigational_products), 1, '', 0, 0);
								$pdf->MultiCell(90, $max_height, implode("\n", $comparator_products), 1, '', 0, 1);
										

								$study_siterec = DB::table('study_sites as t1')
									->join('par_countries as t2', 't1.country_id', '=', 't2.id')
									->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
									->join('clinical_trial_sites as t4', 't1.id', '=', 't4.study_site_id')
									
									->select('t1.*','t1.name as study_site_name', 't2.name as country_name', 't3.name as region_name')
									->where('t4.application_id',$application_id);
								$total_record = $study_siterec->count();
								$study_siterec = 	$study_siterec->get();
								$study_sites= '';		
								$i = 1;
								if($study_siterec){				
									foreach($study_siterec as $rows){
										if( $total_record == 1){
											$study_sites.= $rows->study_site_name." ".$rows->physical_address." ".$rows->region_name." "; 
																
										}else if($i == $total_record){
											$study_sites.= " and ".$rows->study_site_name." ".$rows->physical_address." ".$rows->region_name." "; 
																
										}else if(($i+1) == $total_record){
											$study_sites.=$rows->study_site_name." ".$rows->physical_address." ".$rows->region_name." "; 
																
										}else{
											$study_sites.= $rows->study_site_name." ".$rows->physical_address." ".$rows->region_name.", "; 
																
										}
										$i++;
									}
															
								}

								$pdf->SetFont('','',11);
								$pdf->Cell(60,5,'Clinical Trials site:',0,0);
								$pdf->SetFont('','B',11);
								$pdf->MultiCell(0,5,strtoupper($study_sites),0,'',0,1);
								$pdf->ln();
								$pdf->SetFont('times','',12);
								$htmlContent2 = "
								<p>Conditions of the Clinical Trials Certificate</p>";
								$pdf->WriteHTML($htmlContent2, true, 0, true, true, 'J');
        						$pdf->Cell(0,10,'',0,1);

								$permit_signitory = '';
		                        $title= '';
		                        $signatory=$approved_by;
		                        $signature = getUserSignatureDetails($signatory);
		                        $startY = PDF::GetY();
		                        $startX = PDF::GetX();
		                        $signiture = getcwd() . '/resources/images/signs/'.$signature;
		                       	$pdf->Image($signiture,$startX+80,$startY-7,30,12,'L');
								$pdf->SetFont('times','',11);
								$pdf->Cell(0,8,'...................................................',0,1,'L');

								$pdf->Cell(30, 5, 'FOR THE AUTHORITY', 0, 0, 'L');
								$approval_date = date('d F\\, Y', strtotime($row->regcertificate_issue_date));
								$pdf->SetFont('times', 'B', 11);
								$pdf->Cell(10); 
								$pdf->SetFont('times', ' ', 11);
								$pdf->WriteHTML(' DATE <b>' . $approval_date . '</b>', true, false, false, false, 'R');
        						$pdf->Cell(0,10,'',0,1);

								$data = ": Clinical Trials Certificate No:".$row->registration_no."; Protocol Title:".$row->study_title.";Issued Date:".$approval_date.";Valid up to:".$expiry_date;
								$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);

								// Set the coordinates for the QR code and text
								$qrCodeX = $pdf->GetX(); // Use the current X position
								$qrCodeY = $pdf->GetY(); // Use the current Y position

								$pdf->write2DBarcode($data, 'QRCODE,H', $qrCodeX, $qrCodeY, 16, 16);

								$qrCodeWidth = 16;

								// Calculate the position of the text
								$textX = $qrCodeX + $qrCodeWidth + 1;
								$textY = $qrCodeY;

								$pdf->SetXY($textX, $textY);

										
									
							}
							else{
									$pdf->SetFont('','B',12);
									$pdf->Cell(0,5,'No Record Found',0,1);
							
							}
								 $pdf->Output('Clinical trial Certificate '.date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
							
	
			}else{
				return "Setup rejection letter";
			}
			
			
		}catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
			} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
			}
			
			print_r($res);
        return response()->json($res);
		
		
	}
	public function printImportExportLicense($application_code,$record,$permit_watermark,$is_preview= false){
		try{
				$record = DB::table('tra_importexport_applications as t1')
						->join('sub_modules as t2','t1.sub_module_id','t2.id')
						->leftjoin('par_licence_type as t16','t1.licence_type_id','t16.id')
						->leftJoin('wb_trader_account as t3','t1.applicant_id', 't3.id')
						->leftjoin('par_countries as t4', 't3.country_id', 't4.id')
						->leftJoin('par_regions as t5', 't3.region_id', 't5.id')
						->leftJoin('par_premise_class as t17','t1.product_classification_id','t17.id')
						->leftJoin('par_importexport_product_range as t18','t1.importexport_product_range_id','t18.id')
	                    ->leftJoin('tra_application_invoices as t19', 't1.application_code', 't19.application_code')
	                    ->leftjoin('tra_invoice_details as t20', 't19.id', 't20.invoice_id')
	                    ->leftJoin('par_currencies as t21', 't20.paying_currency_id', 't21.id')
	                    ->leftJoin('par_batchinvoice_types as t22', 't19.invoice_type_id', 't22.id')
						->leftJoin('par_ports_information as t6', 't1.port_id', 't6.id')
						->leftJoin('tra_permitsrelease_recommendation as t7', 't1.application_code', 't7.application_code')
						->leftJoin('users as t8', 't7.permit_signatory', 't8.id')
						->leftJoin('tra_permitsenderreceiver_data as t9','t1.sender_receiver_id', 't9.id')
						->leftJoin('par_countries as t10', 't9.country_id', 't10.id')
						->leftJoin('par_regions as t11', 't9.region_id', 't11.id')
						->leftJoin('par_modesof_transport as t12', 't1.mode_oftransport_id', 't12.id')
						->leftJoin('tra_managerpermits_review as t13', 't1.application_code', 't13.application_code')
						->leftJoin('tra_consignee_data as t14', 't1.consignee_id', 't14.id')
						->leftJoin('par_permitsproduct_categories as t15', 't1.permit_productscategory_id', 't15.id')
						->select('t20.element_amount as total_element_amount','t22.name as currency','t20.paying_exchange_rate as exchange_rate', 't19.invoice_no', 't20.paying_currency_id','t2.title','t17.name  as product_category','t18.name  as product_classification' ,'t16.name as permit_title','t13.permit_no','t14.name as consignee_name', 't1.sub_module_id', 't1.*','t3.name as applicant_name','t2.action_title','t6.name as port_entry', 't3.*', 't4.name as country_name', 't5.name as region_name','t7.permit_signatory','t13.expiry_date', 't7.approval_date', DB::raw("concat(decrypt(t8.first_name),' ',decrypt(t8.last_name)) as permit_signatoryname,t9.name as suppler_name, t9.physical_address as suppler_address, t10.name as supplier_country, t11.name as supplier_region, t9.postal_address as supplier_postal_address, t12.name as mode_of_transport"))
						->groupBy('t20.invoice_id')
						->where('t1.application_code',$application_code)->first();

						$exchange_rate = $record->exchange_rate;
						$equivalent_paid = $record->total_element_amount*$exchange_rate;
						$sub_module_id = $record->sub_module_id;
						$permit_title = $record->permit_title;
						$action_title = $record->action_title;
						$consignee_name  = $record->consignee_name ;
						$business_type_id  = $record->business_type_id; 
						$licence_type_id =$record->licence_type_id;
						$applicant_name = $record->applicant_name;
						$physical_address =$record->physical_address;
						$approval_date = '';
						$approved_by = '';
                        //dd($application_code);
						//

						if($record->approval_date != ''){
								$approval_date = $record->approval_date;
						}
						if($record){

								PDF::setPrintHeader(false);
				            PDF::setPrintFooter(false);
				            PDF::AddPage();
				            PDF::SetFont('times','',13);
				            PDF::Cell(0,10,'',0,1);
				            PDF::SetMargins(20,10,20, true);
				            PDF::SetFont('times','B',13);
				            $usr_id = '';				        
				            PDF::setPrintHeader(false);
				         
				            PDF::SetFont('times','B',12);

 							$org_info = $this->getOrganisationInfo();
                        	$logo = getcwd() . '/resources/images/cert_logo.png';

							PDF::SetFont('times','',13);
	                        PDF::Cell(78);
	                        PDF::SetMargins(14,10,14, true);
	        
	                        PDF::Image($logo,65,20,80,33);
	                       	PDF::SetFont('times','B',14);

	                        PDF::Cell(0,30,'',0,1);
	                        if($business_type_id==4){
	                        	PDF::Cell(0, 4, strtoupper($permit_title) . ' FOR SURGICAL INSTRUMENTS APPLIANCES', 0, 1, 'C');
	                        }else{
	                         PDF::Cell(0, 4, strtoupper($permit_title) . ' FOR DRUGS', 0, 1, 'C');	
	                        }
							

	                        PDF::ln();
	                        PDF::ln();
	                        PDF::SetFont('times','I',10);
	                        if($business_type_id==4){
	                        	PDF::WriteHTML('Issued under sections 64(g) of the Act, National Drug Policy and Authority (Importation and Exportation of Drugs) Regulations, 2014', true, 0, true, true, 'C');

	                        }else{

		                        if($licence_type_id == 2 || $licence_type_id == 4){
		                        //PDF::MultiCell(0,4,'Issued under and Regulation 3(2), National Drug Policy and Authority (Importation and Exportation of Drugs) Regulations, 2014',0,1,'C');
		                        PDF::WriteHTML('Issued under and Regulation 3(2), National Drug Policy and Authority (Importation and Exportation of Drugs) Regulations, 2014', true, 0, true, true, 'C');
								}else{
								PDF::WriteHTML('Issued under section 44 and 45 of the Act and Regulation 21(2), National Drug Policy and Authority (Importation and Exportation of Drugs) Regulations, 2014', true, 0, true, true, 'C');
		                       // PDF::Cell(0,4,'Issued under section 44 and 45 of the Act and Regulation 21(2), National Drug Policy and Authority (Importation and Exportation of Drugs) Regulations, 2014',0,1,'C');
								}
						    }
	                        PDF::ln();
	                       	PDF::ln();
                        	PDF::SetFont('times','B',13);
                        	PDF::Cell(0,4,'This is to certify that:',0,1,'C');
							PDF::SetFont('times','',12);
							PDF::setCellHeightRatio(1.8);

                            $has_registered_premises = $record->has_registered_premises;
							$business_type_id = $record->business_type_id;
							$manufacturing_site_id = $record->manufacturing_site_id;
							$premise_id = $record->premise_id;

							if ($has_registered_premises == 1) {
							    if ($business_type_id == 5) {
							        // Fetching details from manufacturing sites
							        $premises_name = getSingleRecordColValue('tra_manufacturing_sites', ['id' => $manufacturing_site_id], 'name');
							        $physical_address = getSingleRecordColValue('tra_manufacturing_sites', ['id' => $manufacturing_site_id], 'physical_address');
							        $tin_no = getSingleRecordColValue('tra_manufacturing_sites', ['id' => $manufacturing_site_id], 'tin_no');
							    } else {
							        // Fetching details from premises
							        $premises_name = getSingleRecordColValue('tra_premises', ['id' => $premise_id], 'name');
							        $physical_address = getSingleRecordColValue('tra_premises', ['id' => $premise_id], 'physical_address');
							        $tin_no = getSingleRecordColValue('tra_premises', ['id' => $premise_id], 'tpin_no');
							    }
							} else {
							    // Fetching details from non-licensed business details
							    $premises_name = getSingleRecordColValue('tra_non_license_business_details', ['id' => $premise_id], 'name');
							    $physical_address = getSingleRecordColValue('tra_non_license_business_details', ['id' => $premise_id], 'physical_address');
							    $tin_no = getSingleRecordColValue('tra_non_license_business_details', ['id' => $premise_id], 'tpin_no');
							}

							PDF::WriteHTML("The applicant named: <b>" . strtoupper($premises_name) . "</b> of Address: <b>" . strtoupper($physical_address) . "</b> TIN: <b>" . strtoupper($tin_no) . "</b>", true, 0, true, true, 'J');
							if($business_type_id==4){
	                        	PDF::WriteHTML("is hereby granted a <b>" . $permit_title . "</b> in accordance with sections 64(g) of the Act, for the importation of", true, 0, true, true, 'J');

	                        }else{

		                        if($licence_type_id == 2 || $licence_type_id == 4){
		                       
		                          PDF::WriteHTML("is hereby granted a <b>" . $permit_title . "</b> in accordance with Regulation 3(2), for the importation of", true, 0, true, true, 'J');
								}else{
								 PDF::WriteHTML("is hereby granted a <b>" . $permit_title . "</b> in accordance with sections 44 and 46 of the Act, for the importation of", true, 0, true, true, 'J');
		                   
								}
						    }
							
							//PDF::WriteHTML("is hereby granted a <b>" . $permit_title . "</b> in accordance with sections 44 and 46 of the Act, for the importation of", true, 0, true, true, 'J');

					        $paramdatasets = DB::table('par_importexport_product_range')
							    ->select('id', 'name')
							    ->get()
							    ->keyBy('id')
							    ->toArray();

							$paramIds = json_decode($record->importexport_product_range_id);
                            
							$paramIds = is_array($paramIds) ? $paramIds : (array) $paramIds;
     
							if (is_array($paramIds)) {
							    $i = 'a';
							    foreach ($paramIds as $id) {
							        if (isset($paramdatasets[$id])) {
							            PDF::WriteHTML('('.$i.'): '.$paramdatasets[$id]->name, true, 0, true, true, 'J');
							        }
							        $i++;
							    }
							}


	                       	PDF::ln();
							PDF::SetFont('times','',12);
							PDF::WriteHTML('<b>Conditions</b>', true, 0, true, true, 'J');
							if($business_type_id==4){
								PDF::WriteHTML('1. The importation shall be through authorised customs entry points', true, 0, true, true, 'J');
								PDF::WriteHTML("2. Each consignment to be imported shall be verified prior to importation, by the Authority.", true, 0, true, true, 'J');
								PDF::WriteHTML("3. This permit shall be displayed at the premises for which it is issued.", true, 0, true, true, 'J');
								
							}else{
								PDF::WriteHTML('1. This licence does not allow the importation of narcotic and psychotropic drugs', true, 0, true, true, 'J');
								PDF::WriteHTML("2. The importation shall be through authorized Customs entry points", true, 0, true, true, 'J');
								PDF::WriteHTML("3. Each consignment to be imported shall be verified prior to importation, by the Authority", true, 0, true, true, 'J');
								PDF::WriteHTML("4. This permit shall be displayed at the premises for which it is issued.", true, 0, true, true, 'J');

							}

							PDF::ln();
	                        //PDF::ln();
	                        PDF::SetFont('times','B',13);
	        
	                        PDF::SetFont('times', ' ', 11);

	                        PDF::Cell(90, 4, 'Licence No:'.$record->permit_no, 0, 0, 'L');
	                        PDF::Cell(20,5,'',0,0);
	                       // PDF::Cell(30,5,'Issue Date',0,0);
	                        //$permit_issue_date = date('d F\\, Y',strtotime($record->approval_date));
                            
                           $permit_issue_date = $record->approval_date != null ? formatDateWithSuffix($record->approval_date) : '';
	                        PDF::SetFont('times', '', 11);

	                        //PDF::Cell(20,5,$permit_issue_date,0,1,'R');
	                       // PDF::writeHTMLCell(20, 5, '', '', $permit_issue_date, 0, 1, 0, true, 'R', true);	
	                        PDF::writeHTMLCell(0, 5, '', '', 'Issue Date' .'  '.'<b>'.$permit_issue_date.'</b>', 0, 1, 0, true, 'R', true);	
 							PDF::Cell(20,5,'',0,0);
	                        PDF::SetFont('times', 'B', 11);
	                        PDF::Cell(90, 4, 'Fees paid Ushs: '.$equivalent_paid, 0, 0, 'L');

	                        PDF::ln();
							PDF::SetFont('times',' ',11);
							 $expiry_date = $record->expiry_date != null ? formatDateWithSuffix($record->expiry_date) : '';
	                        //$expiry_date = formatDateWithSuffix($record->expiry_date);
	                        PDF::WriteHTML('This Licence expires on <b>'.$expiry_date.'</b>', true, false, false, false, 'L');

	                         PDF::Cell(0,15,'',0,1);
	                                
	                        PDF::SetFont('times','B',10);
	                                
	                        //check for signitory
	                        $permit_signitory = '';
	                        $title= '';
	                        $signatory=$approved_by;
	                        $signature = getUserSignatureDetails($signatory);
	                        $startY = PDF::GetY();
	                        $startX = PDF::GetX();
	                        $signiture = getcwd() . '/resources/images/signs/'.$signature;
	                        //PDF::Image($signiture,$startX+80,$startY-7,30,12);
	                        PDF::SetFont('times','B',11);

	                        PDF::SetFont('times','B',12);
	                        PDF::Cell(0,8,'...................................................',0,1,'C');
	                                
	                        //  PDF::Cell(0,8, ucwords(strtolower('A. M. Fimbo')),0,1,'');
	                                    
	                        PDF::Cell(0,8,'FOR THE AUTHORITY',0,1,'C');


	                         $data = "Import licence No:".$record->reference_no."; Issued Date:".$permit_issue_date.";Valid up to:".$expiry_date;
	                                $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
	                         // QRCODE,H : QR-CODE Best error correction
	                        $qrCodeX = 10; // X coordinate
	                        $qrCodeY = PDF::GetPageHeight() - 40; // Y coordinate

	                         // Add the QR code
	                        PDF::write2DBarcode($data, 'QRCODE,H', $qrCodeX, $qrCodeY, 16, 16);

	                        // Calculate the width of the QR code
	                        $qrCodeWidth = 16;

	                        // Calculate the position of the text
	                        $textX = $qrCodeX + $qrCodeWidth + 10; // Adjust the 5 based on your desired spacing
	                        $textY = $qrCodeY;

							
							//$this->getCertificateSignatoryDetail($record,$pdf);
							if($permit_watermark != ''){
								 //$this->generatePreviewWatermark();
								$this->printWaterMark($permit_watermark);
							}

                        	PDF::Output($permit_title.date('Y').date('m').date('d').date('i').date('s').'.pdf','I');



						}
					
										
					
		}catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
			} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
			}
			
			print_r($res);
        return response()->json($res);
		
		
		
		
	}
	function printWaterMark($permit_watermark){
		PDF::setPage( 1 );

		// Get the page width/height
		$myPageWidth = PDF::getPageWidth();
		$myPageHeight = PDF::getPageHeight();

		// Find the middle of the page and adjust.
		$myX = ( $myPageWidth / 2 ) - 75;
		$myY = ( $myPageHeight / 2 ) + 25;

		// Set the transparency of the text to really light
		PDF::SetAlpha(0.09);

		// Rotate 45 degrees and write the watermarking text
		PDF::StartTransform();
		PDF::Rotate(45, $myX, $myY);
		PDF::SetFont("courier", "", 80);
		PDF::Text($myX, $myY,$permit_watermark);
		PDF::StopTransform();

		// Reset the transparency to default
		PDF::SetAlpha(1);
		
	}

	public function printImportExportVC($application_code,$record,$permit_watermark,$is_preview= false){
		try{
				$record = DB::table('tra_importexport_applications as t1')
						->join('sub_modules as t2','t1.sub_module_id','t2.id')
						->leftjoin('par_licence_type as t16','t1.licence_type_id','t16.id')
						->leftJoin('wb_trader_account as t3','t1.applicant_id', 't3.id')
						->leftjoin('par_countries as t4', 't3.country_id', 't4.id')
						->leftJoin('par_regions as t5', 't3.region_id', 't5.id')
						->leftJoin('par_premise_class as t17','t1.product_classification_id','t17.id')
						->leftJoin('par_importexport_product_range as t18','t1.importexport_product_range_id','t18.id')
	                    ->leftJoin('tra_application_invoices as t19', 't1.application_code', 't19.application_code')
	                    ->leftjoin('tra_invoice_details as t20', 't19.id', 't20.invoice_id')
	                    ->leftJoin('par_currencies as t21', 't20.paying_currency_id', 't21.id')
	                    ->leftJoin('par_batchinvoice_types as t22', 't19.invoice_type_id', 't22.id')
						->leftJoin('par_ports_information as t6', 't1.port_id', 't6.id')
						->leftJoin('tra_permitsrelease_recommendation as t7', 't1.application_code', 't7.application_code')
						->leftJoin('users as t8', 't7.permit_signatory', 't8.id')
						->leftJoin('tra_permitsenderreceiver_data as t9','t1.sender_receiver_id', 't9.id')
						->leftJoin('par_countries as t10', 't9.country_id', 't10.id')
						->leftJoin('par_regions as t11', 't9.region_id', 't11.id')
						->leftJoin('par_modesof_transport as t12', 't1.mode_oftransport_id', 't12.id')
						->leftJoin('tra_managerpermits_review as t13', 't1.application_code', 't13.application_code')
						->leftJoin('tra_consignee_data as t14', 't1.consignee_id', 't14.id')
						->leftJoin('par_permitsproduct_categories as t15', 't1.permit_productscategory_id', 't15.id')
						->leftJoin('par_ports_information as t23', 't1.port_id', 't23.id')
						->select('t20.element_amount as total_element_amount','t21.name as currency','t20.paying_exchange_rate as exchange_rate', 't19.invoice_no', 't20.paying_currency_id','t2.title','t17.name  as product_category','t18.name  as product_classification' ,'t16.name as permit_title','t13.permit_no','t14.name as consignee_name', 't1.sub_module_id', 't1.*','t3.name as applicant_name','t2.action_title','t6.name as port_entry', 't3.*', 't4.name as country_name', 't5.name as region_name','t7.permit_signatory','t13.expiry_date', 't7.approval_date', DB::raw("concat(decrypt(t8.first_name),' ',decrypt(t8.last_name)) as permit_signatoryname,t9.name as suppler_name, t9.physical_address as suppler_address, t10.name as supplier_country, t11.name as supplier_region, t9.postal_address as supplier_postal_address, t12.name as mode_of_transport,t23.name as port"))
						->groupBy('t20.invoice_id')
						->where('t1.application_code',$application_code)->first();
                    
						$exchange_rate = $record->exchange_rate;
						$equivalent_paid = $record->total_element_amount*$exchange_rate;
						$sub_module_id = $record->sub_module_id;
						$permit_title = $record->permit_title;
						$action_title = $record->action_title;
						$consignee_name  = $record->consignee_name ;
						$business_type_id  = $record->business_type_id; 
						$licence_type_id =$record->licence_type_id;
						$product_category_id =$record->product_category_id;
						$applicant_name = $record->applicant_name;
						$physical_address =$record->physical_address;
						$proforma_invoice_no =$record->proforma_invoice_no;
						$approval_date = '';
						$approved_by = '';
                        //dd($application_code);
						//

						if($record->approval_date != ''){
								$approval_date = $record->approval_date;
						}
						if($record){

								PDF::setPrintHeader(false);
				            PDF::setPrintFooter(false);
				            PDF::AddPage();
				            PDF::SetFont('times','',13);
				            PDF::Cell(0,10,'',0,1);
				            PDF::SetMargins(20,10,20, true);
				            PDF::SetFont('times','B',13);
				            $usr_id = '';				        
				            PDF::setPrintHeader(false);
				         
				            PDF::SetFont('times','B',12);

 							$org_info = $this->getOrganisationInfo();
                        	$logo = getcwd() . '/resources/images/cert_logo.png';

							PDF::SetFont('times','',13);
	                        PDF::Cell(78);
	                        PDF::SetMargins(14,10,14, true);
	        
	                        PDF::Image($logo,65,20,80,33);
	                       	PDF::SetFont('times','B',12);

	                        PDF::Cell(0,30,'',0,1);
	                        if($product_category_id==9){
	                        	PDF::Cell(0, 4, strtoupper('Verification Certificate for the Importation of Surgical Instruments and'), 0, 1, 'C');

	                        	PDF::Cell(0, 4, strtoupper('Appliances'), 0, 1, 'C');
	                        }else{
	                         PDF::Cell(0, 4, 'VERIFICATION CERTIFICATE FOR THE IMPORTATION/EXPORTATION OF THE DRUGS,', 0, 1, 'C');
	                         PDF::Cell(0, 4, ' PHARMACEUTICAL PRODUCTS AND RAW MATERIALS', 0, 1, 'C');	
	                        }
							

	                        PDF::ln();
	                        PDF::ln();
	                        PDF::SetFont('times','I',10);
	                        if($product_category_id==9){
	                        	PDF::WriteHTML('Issued under Regulation 22(1) of the National Drug Policy and Authority (Surgical Instruments and appliances)Regulation 2019', true, 0, true, true, 'C');

	                        }else{
								PDF::WriteHTML('Issued under  Regulation 6(1) of the National Drug Policy and Authority Regulations, 2014', true, 0, true, true, 'C');
		                      
						    }
	                        PDF::ln();
	                       PDF::SetFont('times', ' ', 11);
	                        // Print left cell
							PDF::writeHTMLCell(90, 5, '', '', 'Certificate No:' .'  '.'<b>'.$record->permit_no.'</b>', 0, 0, 0, true, 'L', true);

							// Spacer cell to adjust the position of the right cell
							PDF::Cell(10, 5, '', 0, 0);

							 $permit_issue_date = $record->approval_date != null ? formatDateWithSuffix($record->approval_date) : '';
	                        PDF::SetFont('times', '', 11);

							// Print right cell
							PDF::writeHTMLCell(0, 5, '', '', 'Date:' .'  '.'<b>'.$permit_issue_date.'</b>', 0, 1, 0, true, 'R', true);

	                        //PDF::ln();
							PDF::SetFont('times',' ',11);
							 $expiry_date = $record->expiry_date != null ? formatDateWithSuffix($record->expiry_date) : '';
	                        PDF::ln();
	                        PDF::writeHTMLCell(90, 5, '', '', 'Expiry Date: <b>'.$expiry_date.'</b>', 0, 0, 0, true, 'L', true);
                             PDF::ln();
                        	PDF::SetFont('times','B',13);
                        	PDF::Cell(0,4,'Import Verification Certificate',0,1,'C');
							PDF::SetFont('times','',12);
							PDF::setCellHeightRatio(1.8);
                            PDF::ln();
                            $has_registered_premises = $record->has_registered_premises;
							$business_type_id = $record->business_type_id;
							$premise_id = $record->premise_id;

							if ($has_registered_premises == 1) {
							    if ($business_type_id == 5) {
							        // Fetching details from manufacturing sites
							        $premises_name = getSingleRecordColValue('tra_manufacturing_sites', ['id' => $premise_id], 'name');
							        $physical_address = getSingleRecordColValue('tra_manufacturing_sites', ['id' => $premise_id], 'physical_address');
							        $tin_no = getSingleRecordColValue('tra_manufacturing_sites', ['id' => $premise_id], 'tin_no');
							        $premise_no='';
							    } else {
							        // Fetching details from premises
							        $premises_name = getSingleRecordColValue('tra_premises', ['id' => $premise_id], 'name');
							        $premise_application_code = getSingleRecordColValue('tra_premises_applications', ['premise_id' => $premise_id], 'application_code');
							        $premise_no = getSingleRecordColValue('tra_approval_recommendations', ['application_code' => $premise_application_code], 'permit_no');
							        $physical_address = getSingleRecordColValue('tra_premises', ['id' => $premise_id], 'physical_address');
							        $tin_no = getSingleRecordColValue('tra_premises', ['id' => $premise_id], 'tpin_no');
							    }
							} else {
							    // Fetching details from non-licensed business details
							    $premises_name = getSingleRecordColValue('tra_non_license_business_details', ['id' => $premise_id], 'name');
							    $physical_address = getSingleRecordColValue('tra_non_license_business_details', ['id' => $premise_id], 'physical_address');
							    $tin_no = getSingleRecordColValue('tra_non_license_business_details', ['id' => $premise_id], 'tpin_no');
							    $premise_no='';
							}

						

							// $license_application_code = getSingleRecordColValue('tra_importexport_applications', ['reg_importexport_id' => $record->reg_importexport_id ,'sub_module_id' => 81], 'application_code');

							 $license_expiry_date= getSingleRecordColValue('tra_managerpermits_review', ['permit_no' => $record->importer_licence_number], 'expiry_date');
                            
                            //dd($record->importer_licence_number);
							PDF::SetFont('times', ' ', 11);
	                        PDF::Cell(50, 4, 'Name of firm / Individual: ', 0, 0, 'L');
	                        PDF::SetFont('times','B',11);
	                        PDF::MultiCell(0, 4, strtoupper($premises_name), 0, 'L');
	                        //PDF::ln();
	                        PDF::SetFont('times', ' ', 11);
	                        PDF::Cell(50, 4, 'TIN :', 0, 0, 'L');
	                        PDF::SetFont('times','B',11);
	                        PDF::MultiCell(0, 4, strtoupper($tin_no), 0, 'L');
	                       // PDF::ln();
	                        if(isset($premise_no)){
	                         PDF::SetFont('times', ' ', 11);
	                         PDF::Cell(50, 4, 'Premise No :', 0, 0, 'L');
	                         PDF::SetFont('times','B',11);
	                         PDF::MultiCell(0, 4, strtoupper($premise_no), 0, 'L');
	                         // PDF::ln()
	                        }
	                        PDF::SetFont('times', ' ', 11);
	                        PDF::Cell(50, 4, 'Physical Location:', 0, 0, 'L');
	                        PDF::SetFont('times','B',11);
	                        PDF::MultiCell(0, 4, strtoupper($physical_address), 0, 'L');
	                        PDF::SetFont('times', ' ', 11);
	                        PDF::Cell(50, 4, 'License No :', 0, 0, 'L');
	                        PDF::SetFont('times','B',11);
	                        PDF::MultiCell(0, 4, strtoupper($record->importer_licence_number), 0, 'L');
	                        PDF::SetFont('times', ' ', 11);
	                        PDF::Cell(50, 4, 'Expiry Date :', 0, 0, 'L');
	                        PDF::SetFont('times','B',11);
	                        PDF::MultiCell(0, 4, strtoupper($tin_no), 0, 'L');
	                        PDF::ln();
	                        PDF::SetFont('times',' ',11);
							if($product_category_id==9){
	                        	PDF::WriteHTML("This certificate authorises the above named firm / individual to import the Surgical Instruments and Appliances specified in Proforma Invoice number ".$proforma_invoice_no.".", true, 0, true, true, 'J');

	                        }else{
							PDF::WriteHTML("This certificate authorises the above named firm / individual to import the drugs /pharmaceutical products specified in Proforma Invoice number ".$proforma_invoice_no.".", true, 0, true, true, 'J');
	                        }
	                        PDF::ln();
					        PDF::SetFont('times', ' ', 11);
	                        PDF::Cell(90, 4, 'Name of Supplier / Exporter / Consignee :', 0, 0, 'L');
	                        PDF::SetFont('times','B',11);
	                       // PDF::MultiCell(0, 4, strtoupper($consignee_name), 0, 'L');
	                        PDF::writeHTMLCell(0, 4, '', '', '<b>'.strtoupper($record->suppler_name).'</b>', 0, 1, 0, true, 'L', true);	
	                        //PDF::ln();
	                        PDF::SetFont('times', ' ', 11);
	                       
                         	PDF::WriteHTML("Address : <b>".strtoupper($record->suppler_address.", ".$record->supplier_region.", ".$record->supplier_country).'</b>.', true, 0, true, true,'J');


							// Print left cell
							PDF::writeHTMLCell(90, 5, '', '', 'Shipment Mode: <b>' . $record->mode_of_transport . '</b>', 0, 0, 0, true, 'L', true);

							// Spacer cell to adjust the position of the right cell
							PDF::Cell(10, 5, '', 0, 0);

							// Print right cell
							PDF::writeHTMLCell(0, 5, '', '', 'Entry/Exit Point: <b>' . $record->port. '</b>', 0, 1, 0, true, 'R', true);

	                       	PDF::ln();
							PDF::SetFont('times','',9);
						    PDF::writeHTMLCell(0, 4, 20, '', '<b>Notice to importer:</b> On arrival of the items specified in the above proforma invoice at customs, the consignment will be inspected by an inspector of Drugs in order to verify the above information and check the quality of the goods before passing to the Customs officer for clearance.The importer or his clearing agent must present a copy of this certificate plus other relevant documents to the Drug inspector.', 0, 1, 0, true, 'J', true);	
							

							PDF::ln();
	                        
 							PDF::Cell(20,5,'',0,0);
	                        PDF::SetFont('times', 'B', 11);
	                        PDF::Cell(90, 4, 'Verification fee: '.$record->currency.':'.$equivalent_paid, 0, 0, 'L');

	                         PDF::Cell(0,15,'',0,1);
	                                
	                        PDF::SetFont('times','B',10);
	                                
	                        //check for signitory
	                        $permit_signitory = '';
	                        $title= '';
	                        $signatory=$approved_by;
	                        $signature = getUserSignatureDetails($signatory);
	                        $startY = PDF::GetY();
	                        $startX = PDF::GetX();
	                        $signiture = getcwd() . '/resources/images/signs/'.$signature;
	                        //PDF::Image($signiture,$startX+80,$startY-7,30,12);
	                        PDF::SetFont('times','B',11);

	                        PDF::SetFont('times','B',12);
	                        PDF::Cell(0,8,'...................................................',0,1,'C');
	                                
	                        //  PDF::Cell(0,8, ucwords(strtolower('A. M. Fimbo')),0,1,'');
	                                    
	                        PDF::Cell(0,8,'(Secretary to the Authority)',0,1,'C');


	                         $data = "Import licence No:".$record->reference_no."; Issued Date:".$permit_issue_date.";Valid up to:".$expiry_date;
	                                $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
	                         // QRCODE,H : QR-CODE Best error correction
	                        $qrCodeX = 180; // X coordinate
	                        $qrCodeY = PDF::GetPageHeight() - 40; // Y coordinate

	                         // Add the QR code
	                        PDF::write2DBarcode($data, 'QRCODE,H', $qrCodeX, $qrCodeY, 16, 16);

	                        // Calculate the width of the QR code
	                        $qrCodeWidth = 16;

	                        // Calculate the position of the text
	                        $textX = $qrCodeX + $qrCodeWidth + 10; // Adjust the 5 based on your desired spacing
	                        $textY = $qrCodeY;

							
							//$this->getCertificateSignatoryDetail($record,$pdf);
							if($permit_watermark != ''){
								 //$this->generatePreviewWatermark();
								$this->printWaterMark($permit_watermark);
							}

                        	PDF::Output($permit_title.date('Y').date('m').date('d').date('i').date('s').'.pdf','I');



						}
					
										
					
		}catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
			} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
			}
			
			print_r($res);
        return response()->json($res);
		
		
		
		
	}
	// public function printImportExportvisa($application_code,$record,$permit_watermark){
	// 	try{
	// 			$record = DB::table('tra_importexport_applications as t1')
	// 					->join('sub_modules as t2','t1.sub_module_id','t2.id')
	// 					->leftJoin('wb_trader_account as t3','t1.applicant_id', 't3.id')
	// 					->join('par_countries as t4', 't3.country_id', 't4.id')
	// 					->leftJoin('par_regions as t5', 't3.region_id', 't5.id')
	// 					->leftJoin('par_ports_information as t6', 't1.port_id', 't6.id')
	// 					->leftJoin('tra_permitsrelease_recommendation as t7', 't1.application_code', 't7.application_code')
	// 					->leftJoin('users as t8', 't7.permit_signatory', 't8.id')
	// 					->leftJoin('tra_permitsenderreceiver_data as t9','t1.sender_receiver_id', 't9.id')
	// 					->leftJoin('par_countries as t10', 't9.country_id', 't10.id')
	// 					->leftJoin('par_regions as t11', 't9.region_id', 't11.id')
	// 					->leftJoin('par_modesof_transport as t12', 't1.mode_oftransport_id', 't12.id')
	// 					->leftJoin('tra_managerpermits_review as t13', 't1.application_code', 't13.application_code')
	// 					->leftJoin('tra_consignee_data as t14', 't1.consignee_id', 't14.id')
	// 					->leftJoin('par_permitsproduct_categories as t15', 't1.permit_productscategory_id', 't15.id')
	// 					->select('t2.title','t15.name  as product_category' ,'t2.title as permit_title','t13.permit_no','t14.name as consignee_name', 't1.sub_module_id', 't1.*','t3.name as applicant_name','t2.action_title','t6.name as port_entry', 't3.*', 't4.name as country_name', 't5.name as region_name','t7.permit_signatory', 't7.approval_date', DB::raw("concat(decrypt(t8.first_name),' ',decrypt(t8.last_name)) as permit_signatoryname, t9.name as suppler_name, t9.physical_address as suppler_address, t10.name as supplier_country, t11.name as supplier_region, t9.postal_address as supplier_postal_address, t12.name as mode_of_transport"))
	// 					->where('t1.application_code',$application_code)->first();

	// 					$sub_module_id = $record->sub_module_id;
	// 					$permit_title = $record->permit_title;
	// 					$action_title = $record->action_title;
	// 					$consignee_name  = $record->consignee_name ;
	// 					$approval_date = '';
	// 					if($record->approval_date != ''){
	// 							$approval_date = $record->approval_date;
	// 					}
	// 					if($record){
	// 						$org_info = $this->getOrganisationInfo();
												
	// 							$pdf = new PdfProvider();
	// 							$this->getCertificateHeader($pdf, '');
											
	// 							$this->funcGenerateQrCode($record,$pdf);
	// 							$logo = getcwd() . '/resources/images/org-logo.jpg';
	// 							$pdf->SetFont('times','B',9);
	// 							$pdf->Cell(0,1,'',0,1);
	// 								$pdf->ln();
	// 								$pdf->Image($logo, 89, 15, 33, 35);
											
											
	// 							$pdf->Cell(40,10,'',0,1);
	// 							$pdf->ln();
							   
	// 							$pdf->SetFont('','B',13);
	// 							$pdf->MultiCell(0,5,strtoupper($permit_title),0,'C',0,1);
								
	// 							$pdf->SetFont('','B',10);
	// 							$pdf->Cell(40,7,'Visa No: '.$record->permit_no,0,1);
	// 							//$pdf->ln(); 
	// 							$pdf->SetFont('','',10);
	// 							$pdf->setCellHeightRatio(1.8);
	// 							$pdf->WriteHTML("This is to certify the (Name of permit holder)<b> ".strtoupper($record->applicant_name)."</b> of (Physical Address) <b>".strtoupper($record->physical_address.", ".$record->postal_address.", ".$record->region_name.", ".$record->country_name).$consignee_name."</b> is authorised to <b>".$action_title."</b> Uganda NDA regulated products specified in Proforma Invoice number <b>".$record->proforma_invoice_no."  for the following products categories : ".$record->product_category, true, 0, true, true,'J');
								
	// 							$pdf->MultiCell(0,6,'Total Product Value',0,'',0,1);
								
								
	// 						//	$pdf->Cell(0,5,'Date: '.date('jS F, Y',strtotime($approval_date)),0,1,'R');
	// 							$pdf->SetFont('','B',10);
								
	// 							$pdf->Cell(10,7,'No',1,0);
	// 							$pdf->Cell(45,7,'Product',1,0);
	// 							$pdf->Cell(30,7,'Pack Size',1,0);
	// 							$pdf->Cell(30,7,'Quantity',1,0);
	// 							$pdf->Cell(25,7,'Unit Value',1,0);
	// 							$pdf->Cell(0,7,'Total Value',1,1);$pdf->SetFont('','',10);
	// 						$prod_rec = DB::table('tra_permits_products as t1')
	// 																	->leftJoin('tra_product_information as t2', 't1.product_id', 't2.id')
	// 																	->leftJoin('par_dosage_forms as t3', 't1.dosage_form_id', 't3.id')
	// 																	->leftJoin('par_packaging_units as t4', 't1.packaging_unit_id', 't4.id')
	// 																	->leftJoin('par_common_names as t5', 't1.common_name_id', 't5.id')
	// 																	->leftJoin('par_si_units as t6', 't1.unitpack_unit_id', 't6.id')
	// 																	->leftJoin('par_currencies as t7', 't1.currency_id', 't7.id')
	// 																	->select('t1.*','t7.name as currency_name', 't4.name as packaging_unit','t1.product_strength','t5.name as generic_name', 't2.brand_name', 't3.name as dosage_form', 't6.name as si_unit', 't1.unitpack_size')
	// 																	->where(array('application_code'=>$record->application_code))
	// 																	->get();
	// 										$prod_counter = $prod_rec->count();		
	// 							$currency_name = '';											
	// 							$total_amount = 0;											
	// 							if($prod_counter >0){
	// 										$i=1;
	// 								foreach($prod_rec as $rec){
	// 									if($rec->permitbrand_name != ''){
	// 											$permit_brandname = $rec->permitbrand_name.' '.$rec->generic_name;
	// 									}
	// 									else{
	// 										$permit_brandname = $rec->brand_name.' '.$rec->generic_name;

	// 									}		
	// 									$amount = $rec->unit_price*$rec->quantity;										
	// 									$packaging_data = $rec->unitpack_size.' '.$rec->si_unit;
	// 										$rowcount = max(PDF::getNumLines($permit_brandname, 120),PDF::getNumLines($packaging_data, 40));
	// 										$pdf->MultiCell(10,5*$rowcount,$i,1,'',0,0);
	// 										$pdf->MultiCell(45,5*$rowcount,$permit_brandname,1,'',0,0);
	// 										$pdf->MultiCell(30,5*$rowcount,$rec->unitpack_size.' '.$rec->si_unit,1,'',0,0);
	// 										$pdf->MultiCell(30,5*$rowcount,$rec->quantity.' '.$rec->packaging_unit,1,'',0,0);
	// 										$pdf->MultiCell(25,5*$rowcount,($rec->unit_price).' ',1,'',0,0);
	// 										$pdf->MultiCell(0,5*$rowcount,($amount).' '.$rec->currency_name,1,'R',0,1);	
													
	// 										$currency_name = $rec->currency_name;
	// 										$total_amount = $total_amount+$amount;
	// 								} 
	// 								$pdf->Cell(140,7,'Total Value:',1,0, 'C');
	// 									$pdf->Cell(0,7,($total_amount).' '.$currency_name,1,1, 'R');
	// 							}   $pdf->SetFont('','',10);
	// 							$pdf->ln();
	// 							$pdf->WriteHTML("Name of Supplier / Exporter / Consignee :<b> ".strtoupper($record->suppler_name)."</b> of (Physical Address) <b>".strtoupper($record->suppler_address.", ".$record->supplier_region.", ".$record->supplier_country).'</b>.', true, 0, true, true,'J');
								
								
	// 							$pdf->Cell(0,5,'This Special Case Import Visa is valid for only 3 months from the issue date',0,1);
								
	// 							$pdf->ln();
	// 							//$pdf->Cell(0,5,'Done at Kigali on : '.formatDateRpt($record->approval_date),0,1);
												
								
	// 							$pdf->ln();
	// 							$permit_signitory = '';
	// 							$title= 'ACTING';
	// 							$title= '';
	// 							$approved_by = '';
												
	// 							$this->getCertificateSignatoryDetail($record,$pdf);
	// 								$pdf->Output($permit_title.'.pdf');

	// 					}
					
										
					
	// 	}catch (\Exception $exception) {
	// 			//DB::rollBack();
	// 			$res = array(
	// 				'success' => false,
	// 				'message' => $exception->getMessage()
	// 			);
	// 		} catch (\Throwable $throwable) {
	// 			//DB::rollBack();
	// 			$res = array(
	// 				'success' => false,
	// 				'message' => $throwable->getMessage()
	// 			);
	// 		}
			
	// 		print_r($res);
 //        return response()->json($res);
		
		
		
	//}

	public function printImportExportLetterofRejection($application_code,$record,$permit_watermark){
		
		try{
			
				
					
		}catch (\Exception $exception) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $exception->getMessage()
				);
			} catch (\Throwable $throwable) {
				//DB::rollBack();
				$res = array(
					'success' => false,
					'message' => $throwable->getMessage()
				);
			}
			
			print_r($res);
        return response()->json($res);
		
		
	}function generateRequestForAdditionalInformation($req){
		
		$application_code = $req->application_code;
		$module_id = $req->module_id;
		$query_id = $req->query_id;
		if(!validateIsNumeric($module_id)){
			$app_data = DB::table('tra_submissions')
            ->select('module_id')
			->where(array('application_code'=>$application_code))
            ->first();
			if($app_data){
						$module_id = $app_data->module_id;
					}
			}
			
			
			
			$module_data = getTableData('modules', ['id'=>$module_id]);
			
			$requestadditionalinfo_timespan =getTableData('par_requestadditionalinfo_timespan', ['module_id'=>$module_id]);
			if(!isset($requestadditionalinfo_timespan->time_span)){
				$time_span =23;
			}else{
				
				$time_span =$requestadditionalinfo_timespan->time_span ;
				
			}
					if(!isset($module_data->table_name)){
						return "Module details not found";
					}
			 $invoice_details = getInvoiceDetails($module_id, '',$application_code);
			 $app_description= '';
			if(isset($invoice_details)){
				$app_description = $invoice_details['module_desc'];
			}
			$app_data = DB::table($module_data->table_name.' as t1')
						->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
						->leftJoin('par_countries as t3', 't2.country_id', 't3.id')
						->leftJoin('par_regions as t4', 't2.region_id', 't4.id')
						->where('application_code', $application_code)
						->select('t1.applicant_id','t1.reference_no', 't1.tracking_no', 't2.*', 't3.name as country_name', 't4.name as region_name')
						->first();
			if(!$app_data){
				return "Application details not found";
			}

			$org_info = $this->getOrganisationInfo();
			$base_url = base_path('/');

			$pdf = new mPDF( [
					'mode' => 'utf-8',
					'format' => 'A4',
					'margin_header' => '3',
					'margin_top' => '20',
					'margin_bottom' => '20',
					'margin_footer' => '2',
					'tempDir'=> $base_url.'public/resources'
				]); 
			// $pdf = new PdfLettersProvider();
			$pdf->setMargins(5,25,5,true);
			$pdf->AddPage();
				$template_url = base_path('/');
				$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
				// import page 1
				$tplId = $pdf->importPage(1);	
				$pdf->useTemplate($tplId,0,0);
				// $logo = getcwd() . '/resources/images/logo.png';
				// $pdf->Image($logo,90,15,34,30);

				 $logo = getcwd() . '/resources/images/cert_logo.png';
                 $pdf->Image($logo,65,20,80,33);
				//$pdf->setPageMark();

			// $pdf->SetFont('times','B',9);
			// $pdf->Cell(0,1,'',0,1);

			$pdf->Cell(0,4,'',0,1,'R');
			// $pdf->Cell(0,4,'',0,1,'R');
			$pdf->SetFont('times','B',12);
			// $pdf->Cell(0,15,'',0,1);
			$pdf->Cell(0,4,$org_info->name,0,1,'C');
			//$pdf->Cell(0,4,'The Medicines and Allied Substances Act, 2013',0,1,'C');

			$pdf->SetFont('times','B',12);
			//$pdf->Cell(0,4,'(Act No. 3 of 2013)',0,1,'C');
			//$pdf->Cell(0,30,'',0,1);


			 $pdf->Cell(0,3,'',0,1);
				$startY = $pdf->y;
			$startX = $pdf->x;
			$pdf->SetLineWidth(0.3);
			$pdf->Line(0+55,$startY,160,$startY);
				$pdf->Cell(0,3,'',0,1);
			// if($module_id == 4){
			// 		$regulation_title = "The Medicines and Allied Substances (Importation and Exportaion) Regulations, 2017";
			// 		$pdf->Cell(0,4,$regulation_title,0,1,'C');

			// }
			// else if($module_id == 2){
			// 	//get the premises types 
			// 	$record = DB::table('tra_premises_applications as t1')
			// 					->join('tra_premises as t2', 't1.premise_id', 't2.id')
			// 					->leftJoin('par_premises_types	 as t7', 't2.premise_type_id', 't7.id')
			// 					->select('t7.act_name as premises_type')
			// 					->where('application_code',$application_code)
			// 					->first();
			// 		if($record){
			// 			$premise_type = $record->premises_type;
						
			// 		$regulation_title = $premise_type;
			// 		}else{
						
			// 		$regulation_title = "The Medicines and Allied Substances (Certificate of Registration) Regulations, 2017";
			// 		}
			// 		$pdf->Cell(0,4,$regulation_title,0,1,'C');

			// }
			// else{
			// 	$regulation_title = "The Medicines and Allied Substances";
			// 	$pdf->Cell(0,4,$regulation_title,0,1,'C');
			// 	$regulation_title = "(Marketing Authorisation of Medicines) Regulations, 2019";
				
			// 	$pdf->Cell(0,4,$regulation_title,0,1,'C');
			// }

			 if($module_id==3){
				  $pdf->Cell(0,4,'GMP ASSESSMENT QUERY LETTER',0,1,'C');
              
			  }
			

			$pdf->Cell(0,5,'',0,1);
			$pdf->SetFont('times','B',12);
			
			

            if($module_id!=3){
				$pdf->WriteHTML('REQUEST FOR ADDITIONAL INFORMATION FOR '.strtoupper($app_description)); 
			}

			$pdf->SetFont('times','B',10);

			$pdf->SetFont('times','',10);
			$application_no = '';

			if($app_data->tracking_no != ''){
				
				$application_no = 	$app_data->tracking_no;
				
			}
			if($app_data->reference_no != ''){

				//$application_no .= 	' '.$app_data->reference_no;
			}
			$pdf->Cell(0,10,'Application Reference:'.$application_no,0,1, 'L');
				// $pdf->MultiCell(0,10,'Application Reference:<u>'.$app_data->tracking_no.'</u>',0,'R',0,1,'','',true,0,true);
			$data = '{"tracking_no":'.$app_data->tracking_no.',"module_id":'.$module_id.',"application_code":'.$application_code.'}';

			$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
			// QRCODE,H : QR-CODE Best error correction
			// $pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);

			// $barcode = "<barcode code='".$data."' type='CODE11' height='0.66' text='1' />";
			//$pdf->writeBarcode('111111111',0, 178, 28);
			$pdf->SetFont('times','',12);
			//Letter heading 
			$pdf->Cell(0,8,'To:',0,1);
			$pdf->Cell(0,8,$app_data->name.',',0,1);
			if($app_data->physical_address != ''){
					$pdf->Cell(0,8,$app_data->physical_address.',',0,1);

				}		
				if(($app_data->physical_address !=  $app_data->postal_address)){
					
						$pdf->Cell(0,8,$app_data->postal_address.',',0,1);
				}
			//$pdf->Cell(0,8,$app_data->physical_address.',',0,1);
			//$pdf->Cell(0,8,$app_data->postal_address.',',0,1);
			$pdf->Cell(0,8,$app_data->region_name." ".$app_data->country_name,0,1);

			$pdf->SetFont('times','',11);
			$pdf->ln();

			if($module_id==3){
				$header_details = getGMPQueryHeaderDetails($module_id, '',$application_code);
				 $header_description= '';

				if(isset($header_details)){
					 $header_description = $header_details->module_desc;
				}
                $pdf->WriteHTML('GMP COMPLIANCE ASSESSMENT OF '.strtoupper($header_description)); 
			}
			$pdf->ln();

			//add query header tag
			if($module_id==3){
                 $template = "Reference is made to your application for GMP. Upon review, the information provided was found to be insufficient for determining the GMP compliance status of your facility. In light of this, you are required to respond to the queries summarized below within ".$time_span." days of this request.";
			}else{
				$template = "You are requested to furnish, the following information or documents in request of your application for ".$module_data->name." within ".$time_span." days of this request.";
			}
			

			$pdf->WriteHTML($template);
			$pdf->SetFont('times','B',12);
			//add query items
			//loop through requests
			//$pdf->ln();

			$pdf->Cell(0,5,'',0,1);
			$request_data = DB::table('checklistitems_queries as t1')
							->join('tra_application_query_reftracker as t2', 't1.query_id', 't2.id')
							->leftJoin('par_checklist_items as t3', 't1.checklist_item_id', 't3.id')
							->select('t1.query', 't1.comment', 't2.queried_on', 't2.is_live_signature','t3.name as checklist_item', 't2.sign_file')
							->where('t2.id', $query_id)
							->get();

			$pdf->SetFont('times','',11);

			$counter = 1;
			$is_live_signature=0;
			$sign_data='';
			$query_date = Carbon::now();
			
			
				
			foreach ($request_data as $data){
				$pdf->SetTextColor(0,0,0);
					//$query_data = $data->checklist_item.': '.$data->query;
					$query_data = $data->query;
					$pdf->Cell(12,5,$counter.'. ',0,0);

					// $pdf->WriteHTML($query_data, true, false, true, true);
					if($query_data != ''){
						$pdf->WriteHTML($query_data); 
						$pdf->ln();
					}
					

				$counter++;
			}//setPageMark

			$pdf->cell(10,3,'',0,1);
			

			if($module_id==3){
                 $template = "<p  align='justify'>For any further information or clarifications, please feel free to contact the undersigned.</b></p>";
			}else{
				$template = "<p  align='justify'>If you fail to furnish the requested information within the stipulated period, your application will be treated as invalid and be rejected</b></p>";
			}

			$pdf->WriteHTML($template); 
			$pdf->ln();

			$dt =strtotime($query_date); //gets dates instance
			$year = date("Y", $dt);
			$month = date("F", $dt);
			$day = date("d", $dt);

				$pdf->Cell(0, 0,'Dated this '.$day.' day of '.$month.', '.$year, 0, 1, '', 0, '', 3);
			$pdf->cell(0,8,'',0,1);
					$startY = $pdf->y;
			$startX =$pdf->x;
			$signiture = getcwd() . '/backend/resources/templates/signatures_uploads/dg_sinatory.png';
			//$pdf->Image($signiture,$startX+75,$startY-7,30,12);
					//$pdf->Cell(0, 0, '___________________________',0,1,'C');

			if($module_id==3){
							$record = DB::table('tra_gmp_applications as t11')
			                ->join('tra_manufacturing_sites as t1', 't11.manufacturing_site_id', '=', 't1.id')
							 ->leftJoin('tra_premises as t2', 't1.ltr_id', '=', 't2.id')
			                ->leftJoin('tra_premises_applications as t2a', 't2.id', '=', 't2a.premise_id')
			                ->Join('tra_approval_recommendations as t2b', 't2a.application_code', '=', 't2b.application_code')
			                ->select('t2.id as ltr_id', 't2b.permit_no as link_permit_no','t2.name as ltr_name','t2.tpin_no as ltr_tin_no', 't2.physical_address as link_physical_address','t2.telephone as link_telephone')
							->where('t11.application_code',$application_code)
							->first();						

					if($record){
						$ltr = $record->ltr_name;
					    $copied = $ltr;

					    $pdf->SetFont('times', '', 12);
						$pdf->Cell(0, 10, 'DIRECTOR INSPECTORATE AND ENFORCEMENT.', 0, 1, 'L');
                    	$pdf->SetFont('times', '', 11);
						$pdf->Cell(0, 10, 'Copy to: ' . $copied, 0, 1, 'L');
					}else{
				 	//$copied = '';
					$pdf->SetFont('times', '', 12);

					$pdf->Cell(0, 10, 'DIRECTOR INSPECTORATE AND ENFORCEMENT.', 0, 1, 'L');
                    $pdf->SetFont('times', '', 11);
					//$pdf->Cell(0, 10, 'Copy to: ' . $copied, 0, 1, 'L');
					}

			}else{
				$pdf->Cell(0, 0, 'On behalf of NDA',0,1,'');
			}


					
			return response($pdf->Output('Request for Additional Information('.$application_no.').pdf',"I"),200)->header('Content-Type','application/pdf');
																			
						
		
		
	}


	public function generateAmmendementApprovalletter($application_code, $is_notification = false, $file_path = null){
       $qry = DB::table('tra_product_applications as t1')
                ->join('tra_product_information as t2','t1.product_id','=','t2.id')
                ->leftJoin('tra_product_ingredients as t2a','t2.id','=','t2a.product_id')
                ->leftJoin('par_ingredients_details as t2b','t2a.ingredient_id','=','t2b.id')
                ->leftJoin('par_si_units as t2d','t2a.ingredientssi_unit_id','=','t2d.id')
                ->leftJoin('par_dosage_forms as t2c','t2.dosage_form_id','=','t2c.id') //dosage_form_id par_dosage_forms
                ->leftJoin('par_distribution_categories as t3c','t2.propdistribution_category_id','=','t3c.id') //dosage_form_id par_dosage_forms
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id','t3.id')
                ->leftJoin('par_countries as t3a', 't3.country_id','t3a.id')
                ->leftJoin('par_countries as t4a', 't3.region_id','t4a.id')
                ->join('tra_approval_recommendations as t4', 't1.application_code','t4.application_code')
                ->select('t1.application_code','t3c.name as distribution_category', 't1.*', 't1.reference_no' , 
                            DB::raw("GROUP_CONCAT(CONCAT(t2b.name,' ' ,t2a.strength, ' ', t2d.name) SEPARATOR ' + ') as common_name"),
                            't2.brand_name','t3.name as applicant_name','t3.postal_address', 't3.physical_address', 't3a.name as country_name', 't3.email as applicant_email','t4.permit_signatory as  approved_by', 't4.certificate_no','t4a.name as region_name',
                            't4.approval_date','t2c.name as dosage_form')
                ->where('t1.application_code', $application_code)
                ->groupBy('t2.id');
         $app_details = $qry->first();
         if (is_null($app_details)) {
              $res = 'The Reference provided does not match any record or Not yet approved!!';
              return $res;
          }
		  
		  
          $title = "NOTIFICATION OF APPROVAL OF CHANGE(S) TO ".$app_details->brand_name." (".$app_details->common_name.") ".$app_details->dosage_form;
		  
			$org_info = $this->getOrganisationInfo();
			$pdf = new PdfLettersProvider();
			$pdf->AddPage();
			$template_url = base_path('/');
			$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
			$tplId = $pdf->importPage(1);	
			$pdf->useTemplate($tplId,0,0);
			$pdf->setPageMark();
																				
			$pdf->SetFont('times','B',9);
			$pdf->Cell(0,1,'',0,1);
																				
			$pdf->Cell(0,4,'FORM II',0,1,'R');
			$pdf->Cell(0,4,'(Regulation 3)',0,1,'R');
			$pdf->SetFont('times','B',13);
			$pdf->Cell(0,15,'',0,1);
			$pdf->Cell(0,4,$org_info->org_name,0,1,'C');
			$pdf->Cell(0,4,'The Medicines and Allied Substances Act, 2013',0,1,'C');
																				
			$pdf->SetFont('times','B',12);
			$pdf->Cell(0,4,'(Act No. 3 of 2013)',0,1,'C');
			//title
			if($app_details->tracking_no != ''){

																		$application_no = 	$app_details->tracking_no;
			}
																	if($app_details->reference_no != ''){

																		$application_no = 	' '.$app_details->reference_no;
																	}
																	$pdf->Cell(0,10,'Application Reference:'.$application_no,0,1, 'R');
																	
																	$data = '{"tracking_no":'.$app_details->reference_no.',"module_id":'.$app_details->module_id.',"application_code":'.$app_details->application_code.'}';

																	$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
																	// QRCODE,H : QR-CODE Best error correction
																	$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
																	$pdf->SetFont('times','',12);
																	//Letter heading 
																	$pdf->Cell(0,8,'To:',0,1);
																	$pdf->Cell(0,8,$app_details->applicant_name.',',0,1);
																	
																	$pdf->Cell(0,8,$app_details->physical_address.',',0,1);
																	$pdf->Cell(0,8,$app_details->postal_address.',',0,1);
																	$pdf->Cell(0,8,$app_details->region_name." ".$app_details->country_name,0,1);
																	
																	$pdf->SetFont('times','BU',11);
																	$pdf->Cell(0,8,'RE:  APPLICATION FOR AMENDMENT TO A MARKETING AUTHORISATION ',0,1);
																	$pdf->SetFont('times','',11);
																	$template = "Reference is made to your application for amendment to marketing authorization for a pharmaceutical product, submitted in line with Section 39 of the Medicines and Allied Substances Act (No. 3) of 2013, for the product listed below:";
																
																	$pdf->WriteHTML($template, true, false, true, true);
																	$pdf->ln();
																	$pdf->SetFont('times','B',12);
																	$pdf->cell(10,7, 'No.', 1,0);
																	$pdf->cell(45,7, 'Name of Product.', 1,0);
																	$pdf->cell(45,7, 'Application No.', 1,0);
																	$pdf->cell(45,7, 'CoD.', 1,0);
																	$pdf->cell(0,7, 'Ma No..', 1,1);
																	$pdf->SetFont('times','',11);
																	$pdf->cell(10,7, '1', 1,0);
																	$pdf->cell(45,7, $app_details->brand_name, 1,0);
																	$pdf->cell(45,7,$application_no, 1,0);
																	$pdf->cell(45,7, $app_details->distribution_category, 1,0);
																	$pdf->cell(0,7, $app_details->certificate_no, 1,1);
																	$pdf->SetFont('times','',11);
																	$pdf->ln();
																	$pdf->cell(0,7, 'Abbreviations:', 0,1);
																	$pdf->cell(0,7, 'CoD - Category of Distribution', 0,1);
																	$pdf->cell(0,7, 'Ma No. - Marketing Authorisation Number', 0,1);
																	
																	$pdf->Cell(0,8,'Abbreviation: MA No - Marketing Authorisation Number. ',0,1);
																	
																	$rec = DB::table('tra_application_invoices as t1')
																			->leftJoin('tra_payments as t3', 't1.id', 't3.invoice_id')
																			->leftJoin('par_currencies as t4', 't3.currency_id', 't3.id')
																			->select(DB::Raw("sum(amount_paid) as amount_paid,t1.invoice_no, t1.date_of_invoicing,  t4.name as currency_name"))
																			->where(array('t1.application_code'=>$application_code))
																			->first();
																			
																		if($rec){
																			$template = "We acknowledge receipt of payment of a total sum of ".$rec->currency_name.' '.convert_number_to_words($rec->amount_paid).' ('.$rec->currency_name.' '.$rec->amount_paid.") as per Invoice number ".$rec->invoice_no." dated ".formatDaterpt($rec->date_of_invoicing)." as amendment fees for the above mentioned product.";
																			$pdf->WriteHTML($template, true, false, true, true);
																		}																			
																		$pdf->ln();
																	$template = "We wish to advise that we have completed our review of the application and are pleased to inform you that approval has been granted. Our records have been updated accordingly.";
																	$pdf->WriteHTML($template, true, false, true, true);
																	$pdf->ln();
																	$pdf->Cell(0,7,'In this regard, you may proceed with implementation of the proposed amendment. ',0,1);
																	$pdf->Cell(0,7,'Should you have any questions, please do not hesitate to contact our secretariat.',0,1);
																	$pdf->Cell(0,7,'Yours faithfully,',0,1);
																	$pdf->Cell(0,7,'for/Zambia Medicines Regulatory Authority,',0,1);
																	$pdf->ln();
																	$pdf->ln();
																	$startY = $pdf->GetY();
																	$startX =$pdf->GetX();
																	$director_details = getPermitSignatoryDetails();
																	$dg_signatory = $director_details->director_id;
																	$director = $director_details->director;
																	$is_acting_director = $director_details->is_acting_director;
																	
																	$approved_by = $app_details->approved_by;
																	if($dg_signatory != $approved_by){
																		$signatory = $approved_by;
																	}
																	else{
																		$signatory = $dg_signatory;
																	}
																	$signature = getUserSignatureDetails($signatory);
								$signature = getcwd() . '/backend/resources/templates/signatures_uploads/'.$signature;
								$pdf->Image($signature,$startX+1,$startY-8,30,12);
								
										 $pdf->Cell(0,8,'...............................................................', 0,1,'');
									
										$title = "Director-General";
										if($dg_signatory != $approved_by){
											$title = 'Acting '.$title;
										}else{
											if($is_acting_director ==1){
												$title = 'Acting '.$title;
											}
											
										}
										$pdf->Cell(0,8,'SIGNATURE', 0,1,'');
										 $pdf->Cell(0,8,$title, 0,0,'');
        if($is_notification){
            $pdf->Output($file_path,'F');
        }else{
            $pdf->Output('Ammendment Letter.pdf','I');
        }
		PDF::Reset();
		
    }
}