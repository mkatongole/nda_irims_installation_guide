import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardComponent } from 'ng2-archwizard';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-shared-controldrugs-permitlicense',
  templateUrl: './shared-controldrugs-permitlicense.component.html',
  styleUrls: ['./shared-controldrugs-permitlicense.component.css']
})
export class SharedControldrugsPermitlicenseComponent implements OnInit {
  @ViewChild(DxDataGridComponent)
  appuploaded_document_id:number;
  trader_id:number;
  mistrader_id:number;
  dataGrid: DxDataGridComponent;
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;
  deviceTypeData:any;
  modeOfTransportData:any;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  product_resp:any;confirmDataParam:any;
  applicationGeneraldetailsfrm: FormGroup;
  documentUploadfrm: FormGroup;
  permitProductsFrm: FormGroup;
  regulatedProductsPermitData: any;
  sectionsData: any;
  countries:any;
  zoneData: any;
  productClassData:any;
  mis_url:string = AppSettings.mis_url;
  printiframeUrl:any;
  isPrintReportVisible:boolean;
  siUnitsTypeData:any;
  printReportTitle:string;
  registrationLevelData:any;
  verificationData:any;
  application_details: any;
  status_id: number;
  sub_module_id: number;
  process_title: string;;
  section_id: number;
  application_id: number;
  application_code: number;
  tracking_no: number;
  status_name: string;
  module_id: number = 12;
  vc_application_type_id:number;
  app_route: any;
  applicationTypeData: any;
  classcategoryData:any;
  applicationCategoryData: any;
  applicationTypeCategoryData: any;
  permitReasonData: any;
  portOfEntryExitData: any;
  payingCurrencyData: any;
  consigneeOptionsData: any;

  termscheckbox: boolean = false;
  app_resp: any;
  consignee_options_id: number;
  consignee_options_check: boolean = true;

  isPermitproductsPopupVisible: boolean = false;
  isDocumentUploadPopupVisible: boolean = false;

  loading: boolean = true;
  terms_conditions: any;

  regions: any;
  districts: any;
  business_type_id:number;
  licence_type_id:number;
  importation_reason_id:number;
  product_category_id:number; 
  is_registered:number;
  country_oforigin_id:number;

  senderReceiverData: any ={};
  ispremisesSearchWinVisible: boolean = false;
  issenderreceiverSearchWinVisible: boolean = false;
  issenderreceiverAddWinVisible: boolean = false;
  registered_premisesData: any;
  permitReceiverSenderFrm: FormGroup;
  productGeneraldetailsfrm:FormGroup;

  consignee_sendertitle: string;
  checkifsenderreceiver: boolean;


  permitProductsData: any;
  registeredProductsData: any = {};
  commonNamesData:any;
  productCategoryData: any;
  devicesTypeData: any;
  device_type_visible: boolean = false;
  import_typecategory_visible: boolean = false;
  isPermitproductsAddPopupVisible: boolean = false;
  currencyData: any;
  weightsUnitData: any;
  packagingUnitsData: any;
  siUnitsData:any;
  classificationData:any;
  quantity: number = 100;
  unit_price: number;
  isnewproductAddWinVisible:boolean= false;
  enabled_newproductadd:boolean= false;
  showProductAddOption: boolean = false;
  is_regulatedproducts:boolean = false;
  proforma_currency_id:number;
  isInitalQueryResponseFrmVisible:boolean = false;
  initqueryresponsefrm:FormGroup;
  applicationPreckingQueriesData:any;
  query_sectioncheck:string;
  onApplicationSubmissionFrm:FormGroup;
  importexport_permittype_id:number;
  importExportPermitTypesData:number;

  controlledDrugsTypesData:any;
  controlDrugsSubstanceData:any;
  controlledDrugsBaseSaltData:any;
  gramsBaseSiUnitData:any;
  drugsPackagingTypeData:any;

  constructor(public utilityService:Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
          //form 
          let user = this.authService.getUserDetails();

         this.trader_id = user.trader_id;
         this.mistrader_id = user.mistrader_id;
          this.application_details = this.appService.getApplicationDetail();

          if (!this.application_details) {

           // this.router.navigate(['./../online-services/controlleddrugscertificate-dashboard']);
          //  return
          }
          else {
      
            this.sub_module_id = this.application_details.sub_module_id;
            this.process_title = this.application_details.process_title;
            this.section_id = this.application_details.section_id;
      
            this.application_id = this.application_details.application_id;
            this.tracking_no = this.application_details.tracking_no;
            this.is_registered = this.application_details.is_registered;

            this.status_name = this.application_details.status_name;
            this.status_id = this.application_details.application_status_id;
            this.application_code = this.application_details.application_code;
            this.proforma_currency_id = this.application_details.proforma_currency_id;
            
            this.importexport_permittype_id = this.application_details.importexport_permittype_id;
            console.log(this.application_details.importexport_permittype_id);
      
          }
      if(this.sub_module_id == 60){

        this.applicationGeneraldetailsfrm = new FormGroup({
        section_id: new FormControl(this.section_id, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        permit_category_id: new FormControl('', Validators.compose([])),
        permit_productscategory_id: new FormControl('', Validators.compose([])),
        permit_reason_id: new FormControl('', Validators.compose([])),
        manufacturing_site_name: new FormControl('', Validators.compose([])),
        manufacturing_site_id: new FormControl('', Validators.compose([])),
        port_id: new FormControl('', Validators.compose([Validators.required])),
        proforma_invoice_no: new FormControl('', Validators.compose([Validators.required])),
        proforma_invoice_date: new FormControl('', Validators.compose([Validators.required])),
        paying_currency_id: new FormControl('', Validators.compose([])),
        consignee_options_id: new FormControl('', Validators.compose([])),
        consignee_id: new FormControl('', Validators.compose([])),
        consignee_name: new FormControl('', Validators.compose([])),
        sender_receiver: new FormControl('', Validators.compose([Validators.required])),
        sender_receiver_id: new FormControl('', Validators.compose([Validators.required])),
        premises_name: new FormControl('', Validators.compose([])),
        full_names: new FormControl('', Validators.compose([])),
        pharmacist_region_id: new FormControl('', Validators.compose([])),
        psu_date: new FormControl('', Validators.compose([])),
        psu_no: new FormControl('', Validators.compose([])),
        tin_no: new FormControl('', Validators.compose([])),
        name_of_business: new FormControl('', Validators.compose([])),
        email_address:new FormControl('', Validators.compose([])),
        telephone_no: new FormControl('', Validators.compose([])),
        pharmacist_id: new FormControl('', Validators.compose([])),
        pharmacist_telephone: new FormControl('', Validators.compose([])),
        pharmacist_email: new FormControl('', Validators.compose([])),
        pharmacist_qualification: new FormControl('', Validators.compose([])),
        pharmacist_country_id: new FormControl('', Validators.compose([])),
        pharmacist_district_id: new FormControl('', Validators.compose([])),
        has_registered_premises: new FormControl('', Validators.compose([Validators.required])),
        business_type_id: new FormControl('', Validators.compose([Validators.required])),
        premise_id: new FormControl('', Validators.compose([])),
        zone_id: new FormControl('', Validators.compose([])),
        module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
        licence_type_id: new FormControl('', Validators.compose([Validators.required])),
        importexport_product_range_id: new FormControl('', Validators.compose([])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        device_type_id: new FormControl('', Validators.compose([])),
       // importexport_product_range: new FormControl('', Validators.compose([Validators.required])),
        import_typecategory_id: new FormControl('', Validators.compose([])),
        proforma_currency_id: new FormControl('', Validators.compose([Validators.required])),
        mode_oftransport_id: new FormControl('', Validators.compose([Validators.required])),
        reason_fornonregister_outlet: new FormControl('', Validators.compose([])),
        has_registered_outlets: new FormControl('', Validators.compose([])),
        product_classification_id: new FormControl('', Validators.compose([Validators.required])),
        eligible_importerscategory_id: new FormControl('', Validators.compose([])),
        eligible_importersdoctype_id: new FormControl('', Validators.compose([])),
        document_upload_id: new FormControl('', Validators.compose([])),
        has_submitted_outlets: new FormControl('', Validators.compose([])),
        // prodmanufacuredsection_id: new FormControl(this.module_id, Validators.compose([])),

        //vc
        importation_reason_id: new FormControl('', Validators.compose([Validators.required])),
        clinical_trial_name: new FormControl('', Validators.compose([])),
        clinical_trial_id: new FormControl('', Validators.compose([])),
        product_category_id:  new FormControl('', Validators.compose([Validators.required])),
        vc_application_type_id: new FormControl(this.vc_application_type_id, Validators.compose([Validators.required])),
        importer_licence_number: new FormControl('', Validators.compose([])),
        applicant_as_consignee: new FormControl('', Validators.compose([Validators.required])),
        is_registered: new FormControl('', Validators.compose([Validators.required])),
        government_grant_id: new FormControl('', Validators.compose([])),
                // local_agent_id: new FormControl('', Validators.compose([Validators.required])),
        // local_agent_name: new FormControl('', Validators.compose([Validators.required])),

        //business details
        tpin_no: new FormControl('', Validators.compose([])),
        tpin_id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([])),
        physical_address: new FormControl('', Validators.compose([])),
        company_registration_no: new FormControl('', Validators.compose([])),
        // incharge_telephone: new FormControl('', Validators.compose([])),
        email: new FormControl('', Validators.compose([])),

        //billing
        applicant_contact_person: new FormControl('', Validators.compose([Validators.required])),
        contact_person_id: new FormControl('', Validators.compose([])),
        billing_person: new FormControl('', Validators.compose([])),
        billing_person_id: new FormControl('', Validators.compose([])),

        //manufacturer
        entry_country_id: new FormControl('', Validators.compose([Validators.required])),
        telephone: new FormControl('', Validators.compose([])),
        status_of_the_manufacturing_facility: new FormControl('', Validators.compose([])),
        approved_production_lines: new FormControl('', Validators.compose([])),
        man_status_name: new FormControl('', Validators.compose([])),
        contact_person: new FormControl('', Validators.compose([])),
        country_id: new FormControl('', Validators.compose([])),


        shipment_date: new FormControl('', Validators.compose([])),
        proposed_inspection_date: new FormControl('', Validators.compose([])),
        clearing_agent: new FormControl('', Validators.compose([])),
        custom_declaration_no: new FormControl('', Validators.compose([]))
      });

              

            
          }
          else if(this.sub_module_id == 71){
                this.applicationGeneraldetailsfrm = new FormGroup({
                  sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
                  ordered_by: new FormControl('', Validators.compose([Validators.required])),
                  qualification_license_no: new FormControl('', Validators.compose([Validators.required])),
                  qualifications: new FormControl('', Validators.compose([Validators.required])),
                   sender_receiver: new FormControl('', Validators.compose([Validators.required])),
                  sender_receiver_id: new FormControl('', Validators.compose([Validators.required])),
                  zone_id: new FormControl('', Validators.compose([])),
                  module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
                  application_code: new FormControl(this.application_code, Validators.compose([]))
                });

          }
          else{
            this.applicationGeneraldetailsfrm = new FormGroup({
              section_id: new FormControl(this.section_id, Validators.compose([])),
              sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
              permit_category_id: new FormControl('', Validators.compose([])),
              permit_productscategory_id: new FormControl('', Validators.compose([])),
              permit_reason_id: new FormControl('', Validators.compose([])),
              manufacturing_site_name: new FormControl('', Validators.compose([])),
              manufacturing_site_id: new FormControl('', Validators.compose([])),
              port_id: new FormControl('', Validators.compose([])),
              proforma_invoice_no: new FormControl('', Validators.compose([])),
              proforma_invoice_date: new FormControl('', Validators.compose([])),
              paying_currency_id: new FormControl('', Validators.compose([])),
              consignee_options_id: new FormControl('', Validators.compose([])),
              consignee_id: new FormControl('', Validators.compose([])),
              consignee_name: new FormControl('', Validators.compose([])),
              sender_receiver: new FormControl('', Validators.compose([])),
              sender_receiver_id: new FormControl('', Validators.compose([])),
              premises_name: new FormControl('', Validators.compose([])),
              full_names: new FormControl('', Validators.compose([])),
              pharmacist_region_id: new FormControl('', Validators.compose([])),
              psu_date: new FormControl('', Validators.compose([])),
              psu_no: new FormControl('', Validators.compose([])),
              tin_no: new FormControl('', Validators.compose([])),
              name_of_business: new FormControl('', Validators.compose([])),
              email_address:new FormControl('', Validators.compose([])),
              telephone_no: new FormControl('', Validators.compose([])),
              pharmacist_id: new FormControl('', Validators.compose([])),
              pharmacist_telephone: new FormControl('', Validators.compose([])),
              pharmacist_email: new FormControl('', Validators.compose([])),
              pharmacist_qualification: new FormControl('', Validators.compose([])),
              pharmacist_country_id: new FormControl('', Validators.compose([])),
              pharmacist_district_id: new FormControl('', Validators.compose([])),
              has_registered_premises: new FormControl('', Validators.compose([Validators.required])),
              business_type_id: new FormControl('', Validators.compose([Validators.required])),
              premise_id: new FormControl('', Validators.compose([])),
              zone_id: new FormControl('', Validators.compose([])),
              module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
              licence_type_id: new FormControl('', Validators.compose([Validators.required])),
              importexport_product_range_id: new FormControl('', Validators.compose([])),
              application_code: new FormControl(this.application_code, Validators.compose([])),
              device_type_id: new FormControl('', Validators.compose([])),
             // importexport_product_range: new FormControl('', Validators.compose([Validators.required])),
              import_typecategory_id: new FormControl('', Validators.compose([])),
              proforma_currency_id: new FormControl('', Validators.compose([])),
              mode_oftransport_id: new FormControl('', Validators.compose([])),
              reason_fornonregister_outlet: new FormControl('', Validators.compose([])),
              has_registered_outlets: new FormControl('', Validators.compose([])),
              product_classification_id: new FormControl('', Validators.compose([Validators.required])),
              eligible_importerscategory_id: new FormControl('', Validators.compose([])),
              eligible_importersdoctype_id: new FormControl('', Validators.compose([])),
              document_upload_id: new FormControl('', Validators.compose([])),
              has_submitted_outlets: new FormControl('', Validators.compose([])),
              // prodmanufacuredsection_id: new FormControl(this.module_id, Validators.compose([])),
              //vc
              importation_reason_id: new FormControl('', Validators.compose([])),
              clinical_trial_name: new FormControl('', Validators.compose([])),
              clinical_trial_id: new FormControl('', Validators.compose([])),
              product_category_id:  new FormControl('', Validators.compose([])),
              vc_application_type_id: new FormControl(this.vc_application_type_id, Validators.compose([])),
              importer_licence_number: new FormControl('', Validators.compose([])),
              applicant_as_consignee: new FormControl('', Validators.compose([])),
              is_registered: new FormControl('', Validators.compose([])),
              government_grant_id: new FormControl('', Validators.compose([])),
                      // local_agent_id: new FormControl('', Validators.compose([Validators.required])),
              // local_agent_name: new FormControl('', Validators.compose([Validators.required])),

              //business details
              tpin_no: new FormControl('', Validators.compose([])),
              tpin_id: new FormControl('', Validators.compose([])),
              name: new FormControl('', Validators.compose([])),
              physical_address: new FormControl('', Validators.compose([])),
              company_registration_no: new FormControl('', Validators.compose([])),
              // incharge_telephone: new FormControl('', Validators.compose([])),
              email: new FormControl('', Validators.compose([])),

              //billing
              applicant_contact_person: new FormControl('', Validators.compose([])),
              contact_person_id: new FormControl('', Validators.compose([])),
              billing_person: new FormControl('', Validators.compose([])),
              billing_person_id: new FormControl('', Validators.compose([])),

              //manufacturer
              entry_country_id: new FormControl('', Validators.compose([])),
              telephone: new FormControl('', Validators.compose([])),
              status_of_the_manufacturing_facility: new FormControl('', Validators.compose([])),
              approved_production_lines: new FormControl('', Validators.compose([])),
              man_status_name: new FormControl('', Validators.compose([])),
              contact_person: new FormControl('', Validators.compose([])),
              country_id: new FormControl('', Validators.compose([])),


              shipment_date: new FormControl('', Validators.compose([])),
              proposed_inspection_date: new FormControl('', Validators.compose([])),
              clearing_agent: new FormControl('', Validators.compose([])),
              custom_declaration_no: new FormControl('', Validators.compose([]))
            });

           
          }
         
          this.onApplicationSubmissionFrm = new FormGroup({
            paying_currency_id: new FormControl('', Validators.compose([])),
            submission_comments:new FormControl('', Validators.compose([]))
          });
          if(this.sub_module_id == 71 ){
            this.permitProductsFrm = this.fb.group({
              brand_name: new FormControl('', Validators.compose([Validators.required])),
              unit_price: new FormControl('', Validators.compose([])),
              currency_id: new FormControl('', Validators.compose([])),
              quantity: new FormControl('', Validators.compose([Validators.required])),
              is_registered_product: new FormControl('', Validators.compose([])),
              id: new FormControl('', Validators.compose([])),
              product_id: new FormControl('', Validators.compose([])),
              dosage_form_id: new FormControl('', Validators.compose([Validators.required])),
              product_strength: new FormControl('', Validators.compose([Validators.required])),
              product_registration_no: new FormControl('', Validators.compose([])),
              purpose_of_drugsuse: new FormControl('', Validators.compose([])),
              controlleddrugs_type_id: new FormControl('', Validators.compose([])),
              controlled_drugssubstances_id: new FormControl('', Validators.compose([])),
              controlleddrugs_basesalt_id: new FormControl('', Validators.compose([])),
              gramsbasesiunit_id: new FormControl('', Validators.compose([])),
              drugs_content: new FormControl('', Validators.compose([])),
              strength_asgrams: new FormControl('', Validators.compose([])),
              controlleddrug_base: new FormControl('', Validators.compose([])),
              pack_unit: new FormControl('', Validators.compose([])),
              unitpack_unit_id: new FormControl('', Validators.compose([])),
              drugspackaging_type_id: new FormControl('', Validators.compose([])),
              conversion_unit: new FormControl('', Validators.compose([])),
              
            });
          }
          else{
            this.permitProductsFrm = this.fb.group({
              brand_name: new FormControl('', Validators.compose([Validators.required])),
              currency_id: new FormControl('', Validators.compose([Validators.required])),
              quantity: new FormControl('', Validators.compose([Validators.required])),
              substance_schedule: new FormControl('', Validators.compose([Validators.required])),
              is_registered_product: new FormControl('', Validators.compose([])),
              id: new FormControl('', Validators.compose([])),
              product_id: new FormControl('', Validators.compose([])),
              dosage_form_id: new FormControl('', Validators.compose([])),
              product_strength: new FormControl('', Validators.compose([])),
              product_registration_no: new FormControl('', Validators.compose([])),
              imported_product_id: new FormControl('', Validators.compose([])),
              purpose_of_drugsuse: new FormControl('', Validators.compose([])),
              total_units: new FormControl('', Validators.compose([Validators.required])),
              controlleddrugs_type_id: new FormControl('', Validators.compose([Validators.required])),
              controlled_drugssubstances_id: new FormControl('', Validators.compose([Validators.required])),
              controlleddrugs_basesalt_id: new FormControl('', Validators.compose([Validators.required])),
              gramsbasesiunit_id: new FormControl('', Validators.compose([Validators.required])),
              drugs_content: new FormControl('', Validators.compose([Validators.required])),
              strength_asgrams: new FormControl('', Validators.compose([Validators.required])),
              controlleddrug_base: new FormControl('', Validators.compose([Validators.required])),
              pack_unit: new FormControl('', Validators.compose([])),
              unitpack_unit_id: new FormControl('', Validators.compose([])),
              no_of_packs: new FormControl('', Validators.compose([Validators.required])),
              si_unit_id: new FormControl('', Validators.compose([])),
              strength: new FormControl('', Validators.compose([Validators.required])),
              drugspackaging_type_id: new FormControl('', Validators.compose([Validators.required])),
              conversion_unit: new FormControl('', Validators.compose([])),
              product_category_id: new FormControl(this.product_category_id, Validators.compose([])),
              gmdn_id: new FormControl('', Validators.compose([])),
              gmdn_code: new FormControl('', Validators.compose([])),
              gmdn_term: new FormControl('', Validators.compose([])),
              gmdn_descriptor: new FormControl('', Validators.compose([])),
              medical_device_class_type: new FormControl('', Validators.compose([])),
              manufacturer_id: new FormControl('', Validators.compose([])),
              common_name_id: new FormControl('', Validators.compose([])),
              manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
              class_category: new FormControl('', Validators.compose([Validators.required])),
              ingredient_id: new FormControl('', Validators.compose([])),
              name_of_material: new FormControl('', Validators.compose([])),
              product_origin_id: new FormControl('', Validators.compose([])),
              manufacturing_country_id: new FormControl('', Validators.compose([Validators.required])),
              specification_type_id: new FormControl('', Validators.compose([])),
              pack_size: new FormControl('', Validators.compose([Validators.required])),
              no_of_units: new FormControl('', Validators.compose([Validators.required])),
              pack_price: new FormControl('', Validators.compose([Validators.required])),
              unit_price: new FormControl('', Validators.compose([Validators.required])),
              units_for_quantity: new FormControl('', Validators.compose([Validators.required])),
              total_value: new FormControl('', Validators.compose([Validators.required])),
              hs_code_id: new FormControl('', Validators.compose([Validators.required])),
              quantity_per_volume: new FormControl('', Validators.compose([])),
              unit_id: new FormControl('', Validators.compose([])),
              hs_code_description: new FormControl('', Validators.compose([Validators.required])),
            });
            

          }
          this.permitReceiverSenderFrm = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required])),
            country_id: new FormControl('', Validators.compose([Validators.required])),
            region_id: new FormControl('', Validators.compose([Validators.required])),
            district_id: new FormControl('', Validators.compose([])),
            email_address: new FormControl('', Validators.compose([Validators.required])),
            postal_address: new FormControl('', Validators.compose([Validators.required])),
            telephone_no: new FormControl('', Validators.compose([])),
            mobile_no: new FormControl('', Validators.compose([])),
            physical_address: new FormControl('', Validators.compose([Validators.required])),
            tin_no: new FormControl('', Validators.compose([]))
          });

         
          this.productGeneraldetailsfrm = new FormGroup({
            section_id: new FormControl('', Validators.compose([])),
            common_name_id: new FormControl('', Validators.compose([Validators.required])),
            classification_id: new FormControl('', Validators.compose([Validators.required])),
            brand_name: new FormControl('', Validators.compose([Validators.required])),
            physical_description: new FormControl('', Validators.compose([Validators.required])),
            product_category_id: new FormControl('', Validators.compose([Validators.required]))
          });

          this.initqueryresponsefrm = new FormGroup({
            queries_remarks: new FormControl('', Validators.compose([Validators.required])),
            response_txt: new FormControl('', Validators.compose([Validators.required])),
            id: new FormControl('', Validators.compose([])),
            query_id: new FormControl('', Validators.compose([]))
          });
          
          this.funcOnloadApplicationParams();
          this.onLoadImportRegistrationLevelData();
          
          if (this.status_id < 1) {
            this.status_name = "New"
          }
          
          this.onLoadGuidelines(this.sub_module_id);

          if (this.application_details) {
            this.applicationGeneraldetailsfrm.patchValue(this.application_details);
          }
      
          this.onLoadPermitProductsData(this.application_code);
          
         
          if(this.sub_module_id == 61){
               
          }  
  }
  ngOnInit() {

  } 
  submissionsTermscheckbox(e) {
    this.termscheckbox = e.value;
  }

  onLoadcontrolledDrugsBaseSaltData() {
    var data = {
      table_name: 'par_controlleddrugs_basesalts',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.controlledDrugsBaseSaltData = data;
        });
  }    
  onLoadImportRegistrationLevelData() {
    var data = {
      table_name: 'par_import_registration_level',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.registrationLevelData = data;
        });
  }
  onLoadgramsBaseSiUnitData() {
    var data = {
      table_name: 'par_gramsbasesiunits_configs',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.gramsBaseSiUnitData = data;
        });
  }
  onLoaddrugsPackagingTypeData() {
    var data = {
      table_name: 'par_drugspackaging_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.drugsPackagingTypeData = data;
        });
  }

  onLoaddUnitsTypeData() {
    var data = {
      table_name: 'par_containers',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.siUnitsTypeData = data;
        });
  }

  onLoadimportexport_permittypes(sub_module_id) {
    this.spinner.show();
    var data = {
      table_name: 'par_importexport_permittypes',
      sub_module_id:sub_module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.importExportPermitTypesData = data;
          this.spinner.hide();
        });
  }
  
  onSaveControlledDrugsImptPermitApplication() {
    const controls = this.applicationGeneraldetailsfrm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
              this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
                return;
            }
        }
    if (this.applicationGeneraldetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.applicationGeneraldetailsfrm.value, this.tracking_no, 'importexportapp/saveControlledDrugsImptPermitApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.tracking_no = this.app_resp.tracking_no;
            this.application_id = this.app_resp.application_id;
            this.product_category_id =this.app_resp.product_category_id;
            this.setValidatorsBasedOnCategory(this.product_category_id);
            this.application_code = this.app_resp.application_code;
            this.proforma_currency_id = this.app_resp.proforma_currency_id;
            this.toastr.success(this.app_resp.message, 'Response');
            this.onLoadclasscategoryData(this.product_category_id);
            this.onLoadCurrenciesData(this.proforma_currency_id);
            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }

setValidatorsBasedOnCategory(categoryId: number): void {
  if (categoryId == 9) {
    this.permitProductsFrm.get('gmdn_code').setValidators([Validators.required]);
    this.permitProductsFrm.get('gmdn_term').setValidators([Validators.required]);
    this.permitProductsFrm.get('gmdn_descriptor').setValidators([Validators.required]);
    this.permitProductsFrm.get('medical_device_class_type').setValidators([Validators.required]);

    this.permitProductsFrm.get('common_name_id').clearValidators();
    this.permitProductsFrm.get('specification_type_id').clearValidators();
    this.permitProductsFrm.get('ingredient_id').clearValidators();
    this.permitProductsFrm.get('dosage_form_id').clearValidators();
    this.permitProductsFrm.get('product_strength').clearValidators();
    this.permitProductsFrm.get('si_unit_id').clearValidators();
  } else {
    this.permitProductsFrm.get('common_name_id').setValidators([Validators.required]);
    this.permitProductsFrm.get('specification_type_id').setValidators([]);
    this.permitProductsFrm.get('ingredient_id').setValidators([Validators.required]);
    this.permitProductsFrm.get('dosage_form_id').setValidators([Validators.required]);
    this.permitProductsFrm.get('product_strength').setValidators([Validators.required]);
    this.permitProductsFrm.get('si_unit_id').setValidators([Validators.required]);

    this.permitProductsFrm.get('gmdn_code').clearValidators();
    this.permitProductsFrm.get('gmdn_term').clearValidators();
    this.permitProductsFrm.get('gmdn_descriptor').clearValidators();
    this.permitProductsFrm.get('medical_device_class_type').clearValidators();
  }

  // Update validity after setting/clearing validators
  this.permitProductsFrm.get('gmdn_code').updateValueAndValidity();
  this.permitProductsFrm.get('gmdn_term').updateValueAndValidity();
  this.permitProductsFrm.get('gmdn_descriptor').updateValueAndValidity();
  this.permitProductsFrm.get('medical_device_class_type').updateValueAndValidity();
  this.permitProductsFrm.get('common_name_id').updateValueAndValidity();
  this.permitProductsFrm.get('specification_type_id').updateValueAndValidity();
  this.permitProductsFrm.get('ingredient_id').updateValueAndValidity();
  this.permitProductsFrm.get('dosage_form_id').updateValueAndValidity();
  this.permitProductsFrm.get('product_strength').updateValueAndValidity();
  this.permitProductsFrm.get('si_unit_id').updateValueAndValidity();
}




  funcReloadQueriesDetails(){

    this.funcgetPreckingQueriesData();
    
  } onLoadpermitReasonData() {
    var data = {
      table_name: 'par_permit_reasons'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.permitReasonData = data;
        });

  }
  funcgetPreckingQueriesData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_importexport_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.spinner.hide();
      });
  }
  onLoadPermitProductsData(application_code) {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitProductsData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
  funcOnloadApplicationParams(){
          this.onLoadpayingCurrencyData();
          this.onLoadportOfEntryExitData();
          this.onLoadmodeOfTransportData();

          this.onLoadapplicationCategoryData(this.section_id);
          this.onloadApplicationTypes();
          this.onLoadPackagingUnitsData(this.section_id)
          this.onLoadsiUnitsData(this.section_id);

          this.funcReloadQueriesDetails();
          this.onLoadVerificationData(this.business_type_id , this.licence_type_id, this.importation_reason_id, this.product_category_id, this.is_registered, this.country_oforigin_id);
          this.onLoadgramsBaseSiUnitData();
          this.onLoadpermitReasonData() ;
          this.onLoadimportexport_permittypes(this.sub_module_id) ;
          this.onLoadcontrolledDrugsBaseSaltData();
          this.onLoaddrugsPackagingTypeData() ;
          this.onLoadconfirmDataParm();
          this.onLoaddUnitsTypeData();
          this.onLoadCountries();
          this.onLoadclasscategoryData(this.product_category_id)
          //this.onLoadcontrolledDrugsTypesData();
          this.onLoadImportExportProductClassifiction();

  } 
   onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
        });
  }
  onLoadImportExportProductClassifiction() {
    var data = {
      table_name: 'par_premise_class',
      importexport_product_classification:1
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productClassData = data;
        });
  }
  onLoadclasscategoryData(product_category_id) {
    var data = {
      table_name: 'par_importexport_product_category',
      id:product_category_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classcategoryData = data;
        });

  }
   onloadApplicationTypes() {
    var data = {
      table_name: 'par_importexport_application_type',
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeData = data;
        });
  }

  onLoadapplicationCategoryData(section_id) {
    var data = {
      table_name: 'par_permit_category'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationCategoryData = data;
        });

  }onLoadportOfEntryExitData() {
    var data = {
      table_name: 'par_ports_information'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.portOfEntryExitData = data;
        });

  }
  onLoadmodeOfTransportData() {
    var data = {
      table_name: 'par_modesof_transport'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.modeOfTransportData = data;
        });

  }
  
  onLoadpayingCurrencyData() {
    var data = {
      table_name: 'par_currencies',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.payingCurrencyData = data;
        });

  }
  onLoadCurrenciesData(proforma_currency_id) {
    var data = {
      table_name: 'par_currencies',
      id:proforma_currency_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.currencyData = data;
        });

  }

  onLoadPackagingUnitsData(section_id) {
    var data = {
      table_name: 'par_packaging_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.packagingUnitsData = data;
        });

  }
    onLoadCountries() {

    var data = {
      table_name: 'par_countries',
      // id: 36
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.countries = data;
        },
        error => {
          return false;
        });
  }
  onLoadsiUnitsData(section_id) {
    var data = {
      table_name: 'par_si_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.siUnitsData = data;
        });

  }
 onLoadGuidelines(sub_module_id) {
    this.configService.onLoadAppSubmissionGuidelines(sub_module_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.terms_conditions = data.data;
        },
        error => {
          return false
        });
  }
  onApplicationDashboard() {
    if( this.sub_module_id ==60){

      this.app_route = ['./online-services/controlleddrugscertificate-dashboard'];

    }
    else if(this.sub_module_id == 61){

      this.app_route = ['./online-services/controlleddrugsimplicense-dashboard'];

    }else{
      this.app_route = ['./online-services/controlleddrugscertificate-dashboard'];

    }
   
    this.router.navigate(this.app_route);
  }
  onPermitsApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    
    if( this.sub_module_id ==60){

      this.app_route = ['./online-services/controlleddrugscertificate-dashboard'];

    }
    else if(this.sub_module_id == 61){

      this.app_route = ['./online-services/controlleddrugsimplicense-dashboard'];

    }else{
      this.app_route = ['./online-services/controlleddrugscertificate-dashboard'];

    }
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_importexport_applications', this.app_route,this.onApplicationSubmissionFrm.value);
    
  }
  onLoadVerificationData(business_type_id , licence_type_id, importation_reason_id, product_category_id, is_registered, country_oforigin_id) {
    this.configService.onLoadVerificationDataDetails(business_type_id, licence_type_id, importation_reason_id, product_category_id, is_registered, country_oforigin_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.verificationData = data.data;
        },
        error => {
          return false;
        });
  }
  funcValidatePermitProductDetails(validation_title, nextStep) {

    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.application_code,validation_title,'wb_permits_products')
      .subscribe(
        response => {
        if (response.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
        } else {
          this.toastr.error(response.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.message, 'Alert');
        this.spinner.hide();
      });
  }

  funcValidateApplicationQueryresponse( nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code,'wb_importexport_applications')
      .subscribe(
        response => {
        if (response.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
        } else {
          this.toastr.error(response.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.message, 'Alert');
        this.spinner.hide();
      });
  }
  
  funcValidatePermitDocumentsDetails(nextStep) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_importexport_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
         
        }
        else{
         
          this.toastr.error(response_data.message, 'Response');
        }
        
        this.spinner.hide();
      });
    

  }
  funcValidateStepDetails(validation_title, data, nextStep) {

    if (data.length != 0 && data.length) {
      this.wizard.model.navigationMode.goToStep(nextStep);
    }
    else {
      this.toastr.error(validation_title, 'Alert');
    }

  } funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height/100;
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }

printAppREquestforAdditionalInformation(){
  let report_url = this.mis_url+'reports/printRequestForAdditionalInformation?application_code='+this.application_code+"&module_id="+this.module_id+"&sub_module_id="+this.sub_module_id+"&table_name=wb_importexport_applications";
  this.funcGenerateRrp(report_url,"print Query Letter");
  }  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

    
  }
}
