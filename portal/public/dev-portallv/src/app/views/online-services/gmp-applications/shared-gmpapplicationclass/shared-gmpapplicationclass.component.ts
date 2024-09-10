import { Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { PremisesApplicationsService } from '../../../../services/premises-applications/premises-applications.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-shared-gmpapplicationclass',
  templateUrl: './shared-gmpapplicationclass.component.html',
  styleUrls: ['./shared-gmpapplicationclass.component.css']
})
export class SharedGmpapplicationclassComponent implements OnInit {
  appuploaded_document_id:number;
  @ViewChild(DxDataGridComponent, ArchwizardModule)
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  initWizardPanel:number = 1;
  assessmentProcedureData:any;
  localAssessmentProcedureData:any;
  isManufacturerPopupVisible:boolean= false;
  isaddNewPremisesPersonnelDetails:boolean= false;
  business_type_id:number;
  applicationApplicantdetailsfrm: FormGroup;
  gmp_type_id:number;
  manufacturersSiteData: any ={};
  dtElement: DataTableDirective;
  currentDate = new Date();
  //data table config
  dtpremOtherDetailsData: any = {};
  personnel_informationData: any = {};
  gmpPersonnelDetailsData: any = {};
gmpSurgicalProductLineData:any;
  personnel_QualificationData: any = {};
  personnelPositionData: any = {};
  app_resp:any;
  personnel_id:number;
  dtpremPersonnelData: any = {};
  premDocumentsUploadData: any = {};
  registrantOptionsData: any;
  registrant_option_id: number;
  maxLength: number = 25;
  countries: any;
  regions: any;
  districts: any;
  inspectionHistoryData:any;
  sectionsData: any;
  sectionSelection:string;
  gmpLocationData: any;
  country_id: number;
  region_id: number;
  initial_site_id:number;
  ZoneData: any;
  gmp_resp: any;
  licenseTypeApplicationData:any;
  tracking_no: string;
  gmpControl:FormControl;
  premises_id: number;
  gmpapplicationGeneraldetailsfrm: FormGroup;
  inspectionHistorydetailsfrm:FormGroup;
  manufatcuringSiteActivityfrm:FormGroup;
  gmppreInspectionGeneraldetailsfrm:FormGroup;
  contractManufacturingDetailsfrm:FormGroup;
  gmpOtherDetailsfrm: FormGroup;
  manufatcuringSiteBlocksfrm:FormGroup;
  manufatcuringActivityfrm:FormGroup;
  manufatcuringContractDetailsfrm: FormGroup;
  gmpProductLineDetailsfrm:FormGroup;
  gmpIntendedProductLineDetailsfrm:FormGroup;
  gmpSurgicalProductLineDetailsfrm:FormGroup;
  gmpSurgicalmanufatcuringSiteBlocksfrm:FormGroup
  premisesPersonnelDetailsfrm: FormGroup;
  premanufatcuringSiteBlocksfrm:FormGroup;
  prodSurgicalgmpAddinspectionFrm:FormGroup;
  is_local:number;
  value: any;
  loading: false;
  app_route: any;
  gmpSurgicalProductLineDataRows:any;
  gmpProductLineData:any;
  terms_conditions: any;
  checkPremisesSubmission: boolean = false;


  businessScaleData: any;
  businessCategoryData: any;
  qualificationsData: any = {};
  studyFieldsData: any = {};

  status_name: string;
  status_id: number;
block_id:number;
  manufacturing_site_id: number;
  process_title: string;
  sub_module_id: number;
  section_id: number;
  contract_id: number;
  gmpapp_details: any;
  gmpinspection_details:any;
  //premises other details 
  premisesOtherDetailsRows: any;
  gmpProductLineDataRows:any;
  gmpManufacturingBlocksDataRows:any;
  
  businessTypesData: any;
  product_lineData:any;
  product_lineSurgicalData:any;
  productlineCategoryData:any;
  productlineDescriptionData:any;
  businessTypeDetailsData: any;
  zoneData: any;
  application_code: number;
  //premises pop-ups
  isBusinessTypePopupVisible: boolean = false;
  isProductLinePopupVisible: boolean = false;
  isGMPBlocksPopupVisible:boolean =false;
  isBusinessPersonnelPopupVisible: boolean = false;
  isperssonelAddPopupVisible: boolean = false;
  module_id: number;
  isPersonnelPopupVisible = false;
  traderAccountsDetailsData:any = {};
  registrant_optionDisabled: boolean = false;
  trader_name: string;
  trader_id: number;
  trader_title: string;
  mistrader_id:number;
  is_local_agent: number;
  trader_aslocalagent: number;
  localagent_optionDisabled: boolean;
  manufacturingSiteLocationSet: boolean = false;
  confirmDataParam: any;
  registered_premisesData:any;
  registered_gmpApplicationData:any;
  ispremisesSearchWinVisible:boolean = false;
  isgmpapplicationSearchWinVisible:boolean = false;

  applicationRejectionData:any;
  submission_comments:string;
  appDocumentsUploadData:any;
 

  document_previewurl: any;
  contractManufacturingRows:any;
  premisesDocumentUploadfrm: FormGroup;
isDocumentUploadPopupVisible:boolean= false;
  isDocumentPreviewDownloadwin:boolean= false;
  isApplicationSubmitwin:boolean = false;
  premDocumentsVersionsUploadData:any;
  isDocumentVersionPreviewDownloadwin:boolean= false;
  isManufatcuringSiteBlocks:boolean = false;
  isManufacturingSiteProductsDetails:boolean = false;
  manSiteRegisteredProductsData:any ={};
  //@Inject(WizardState) public wizard: WizardState,

  isgmpAddProductsModalShow:boolean = false;
  prodgmpAddinspectionFrm:FormGroup;
  gmpproductDetailsInformationData:any={};
  devicesTypeData:any;
  newPremisesPersonnelDetailsFrm:FormGroup;
  personnel_type_id:number;
  isReadOnlyTraderasContact:boolean = true;
//queries detail 
query_sectioncheck:string;
applicationPreckingQueriesData:any;
initqueryresponsefrm:FormGroup;
isInitalQueryResponseFrmVisible:boolean;
applicationInitialQueriesData:any;
isInitalQueryWinVisible:boolean;
action_url:string;

fastTrackOptionsData:any;
payingCurrencyData: any;

man_site_id: number;
ltr_id: number;
premise_id: number;

onApplicationSubmissionFrm:FormGroup;
registered_id: number;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) {
   
    let user_details = this.authService.getUserDetails();
    this.country_id = user_details.country_id;
    this.trader_id = user_details.trader_id;
    this.trader_name = user_details.company_name;
    this.mistrader_id =  user_details.mistrader_id;
    this.is_local = user_details.is_local;
    if (this.is_local == 1) {
      this.trader_aslocalagent = 1;
    }
    this.gmpapp_details = this.appService.getGmpApplicationDetail();                   
;

    if (!this.gmpapp_details) {
   
      this.router.navigate(['./../online-services/gmpapplications-dashboard']);
      return;
    }
    else {

      this.sub_module_id = this.gmpapp_details.sub_module_id;
      this.process_title = this.gmpapp_details.process_title;
      this.section_id = this.gmpapp_details.section_id;
      this.manufacturing_site_id = this.gmpapp_details.manufacturing_site_id;
   
      if(this.manufacturing_site_id > 0){
           this.manufacturing_site_id = this.gmpapp_details.manufacturing_site_id;
            this.tracking_no = this.gmpapp_details.tracking_no;
            this.application_code = this.gmpapp_details.application_code;
            
            this.country_id = this.gmpapp_details.country_id;
            this.region_id = this.gmpapp_details.region_id;
      }
      this.status_name = this.gmpapp_details.status_name;
      this.status_id = this.gmpapp_details.application_status_id;
      this.module_id = this.gmpapp_details.module_id;

    }
    console.log(this.status_id);

    if (this.status_id < 1) {
        this.status_name = "New"
    } this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      is_fast_track: new FormControl('', Validators.compose([])),
      submission_comments:new FormControl('', Validators.compose([]))
    });
    
    this.onLoadPremisesPersonnelDetails(this.manufacturing_site_id);
    this.onLoadgmpProductLineDataRows(this.manufacturing_site_id);
    this.onLoadgmpProductLineData(this.manufacturing_site_id,this.block_id);
    this.onLoadgmpSurgicalProductLineDataRows(this.manufacturing_site_id);
    this.onLoadgmpSurgicalProductLineData(this.manufacturing_site_id);
    this.onLoadgmpproductDetailsInformationData(this.manufacturing_site_id);
    this.onLoadgmpManufacturingBlocksData(this.manufacturing_site_id);
    this.onLoadContractDetails(this.manufacturing_site_id);
    this.onLoadInspectionHistoryDetails(this.manufacturing_site_id);
    this.onLoadPremisesOtherDetails(this.manufacturing_site_id);
    this.gmpControl = new FormControl('', Validators.compose([]));


    this.gmppreInspectionGeneraldetailsfrm = new FormGroup({
      manufacturing_site_name: new FormControl('', Validators.compose([])),
      gmp_type_id: new FormControl('', Validators.compose([Validators.required])),
      section_id: new FormControl(this.section_id, Validators.compose([])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      longitude: new FormControl('', Validators.compose([])),
      latitude: new FormControl('', Validators.compose([])),
      gmpsub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),//Validators.required
      gmpmodule_id: new FormControl(this.module_id, Validators.compose([])),//Validators.required
      //zone_id: new FormControl(this.zoneData, Validators.compose([Validators.required])),//Validators.required
      ltr_id:new FormControl('', Validators.compose([])),//Validators.required
      premise_reg_no:new FormControl('', Validators.compose([])),//Validators.required
      local_agent_id:new FormControl('', Validators.compose([])),//Validators.required
      trader_aslocal_agent:new FormControl('', Validators.compose([])),//Validators.required
      local_agent_name:new FormControl('', Validators.compose([])),
      name:new FormControl('', Validators.compose([])),
      premises_name:new FormControl('', Validators.compose([])),
      man_site_id:new FormControl('', Validators.compose([])),
      manufacturer_name:new FormControl('', Validators.compose([Validators.required])),
      assessment_type_id:new FormControl(1, Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_id: new FormControl('', Validators.compose([])),//Validators.required
      applicant_contact_person: new FormControl('', Validators.compose([Validators.required])),//Validators.required
      contact_person_enddate: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_startdate: new FormControl('', Validators.compose([])),//Validators.required
      billing_person_id: new FormControl('', Validators.compose([])),
      billing_person: new FormControl('', Validators.compose([])),
      applicant_billing_person: new FormControl('', Validators.compose([])),
      gmpassessment_countries_ids: new FormControl('', Validators.compose([])),//
      business_type_id: new FormControl('', Validators.compose([])),//Validators.required
      premise_id: new FormControl('', Validators.compose([])),//Validators.required
      registered_id: new FormControl('', Validators.compose([])),//Validators.required
      device_type_id: new FormControl('', Validators.compose([])),//Validators.required
      psu_no: new FormControl('', Validators.compose([])),
      full_names: new FormControl('', Validators.compose([])),
      local_gmp_license_type_id:new FormControl('', Validators.compose([])),
      psu_date: new FormControl('', Validators.compose([])),
      pharmacist_telephone: new FormControl('', Validators.compose([])),
      pharmacist_email: new FormControl('', Validators.compose([])),
      pharmacist_qualification: new FormControl('', Validators.compose([])),
      pharmacist_country_id: new FormControl('', Validators.compose([])),
      pharmacist_district_id: new FormControl('', Validators.compose([])),
      pharmacist_region_id: new FormControl('', Validators.compose([])),
      pharmacist_id:new FormControl('', Validators.compose([])),
      inspection_activities_id:new FormControl('', Validators.compose([])),
      nda_approved_id: this.gmpControl,
      permit_no: this.gmpControl,
      manufacturer_site_name:this.gmpControl,
      site_country_id: this.gmpControl,
      site_physical_address:this.gmpControl,
      initial_site_id:new FormControl('', Validators.compose([]))
    });

    this.gmpapplicationGeneraldetailsfrm = new FormGroup({
      manufacturing_site_name: new FormControl('', Validators.compose([Validators.required])),
      gmp_type_id: new FormControl('', Validators.compose([Validators.required])),
      inspection_activities_id:new FormControl('', Validators.compose([Validators.required])),
      section_id: new FormControl(this.section_id, Validators.compose([])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      longitude: new FormControl('', Validators.compose([])),
      latitude: new FormControl('', Validators.compose([])),
      gmpsub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),//Validators.required
      gmpmodule_id: new FormControl(this.module_id, Validators.compose([])),//Validators.required
      //zone_id: new FormControl(this.zoneData, Validators.compose([Validators.required])),//Validators.required
      ltr_id:new FormControl('', Validators.compose([])),//Validators.required
      premise_reg_no:new FormControl('', Validators.compose([])),
      premise_no:new FormControl('', Validators.compose([])),
      local_agent_id:new FormControl('', Validators.compose([])),//Validators.required
      trader_aslocal_agent:new FormControl('', Validators.compose([])),//Validators.required
      local_agent_name:new FormControl('', Validators.compose([])),
      name:new FormControl('', Validators.compose([Validators.required])),
      premises_name:new FormControl('', Validators.compose([])),
      man_site_id:new FormControl('', Validators.compose([])),
      manufacturer_name:new FormControl('', Validators.compose([Validators.required])),
      assessment_type_id:new FormControl(2, Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_id: new FormControl('', Validators.compose([])),//Validators.required
      applicant_contact_person: new FormControl('', Validators.compose([Validators.required])),//Validators.required
      contact_person_enddate: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_startdate: new FormControl('', Validators.compose([])),//Validators.required
      billing_person_id: new FormControl('', Validators.compose([])),
      billing_person: new FormControl('', Validators.compose([])),
      licence_no: new FormControl('', Validators.compose([Validators.required])),
      applicant_billing_person: new FormControl('', Validators.compose([])),
      gmpassessment_countries_ids: new FormControl('', Validators.compose([])),//
      business_type_id: new FormControl('', Validators.compose([])),//Validators.required
      premise_id: new FormControl('', Validators.compose([])),//Validators.required
      registered_id: new FormControl('', Validators.compose([])),//Validators.required
      device_type_id: new FormControl('', Validators.compose([])),//Validators.required
      intermediate_manufacturing_activity_id:this.gmpControl,
      initial_site_id:new FormControl('', Validators.compose([]))


    });
    

    this.newPremisesPersonnelDetailsFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([]))
    });
   

    this.inspectionHistorydetailsfrm = new FormGroup({
      start_date: new FormControl('', Validators.compose([Validators.required])),
      compliant: new FormControl('', Validators.compose([Validators.required])),
      timesince_lastinspection: new FormControl('', Validators.compose([Validators.required])),
      meet_criteria: new FormControl('', Validators.compose([Validators.required])),
      pms_complaintsreceived_previously: new FormControl('', Validators.compose([Validators.required])),
      product_recallspreviously_conducted: new FormControl('', Validators.compose([Validators.required])),
      approved_renewalprevious_productline: new FormControl('', Validators.compose([Validators.required])),
      total_product_line: new FormControl('', Validators.compose([Validators.required])),
      facility_inspected_who: new FormControl('', Validators.compose([Validators.required])),
      country_id:this.gmpControl,
      approval_date: this.gmpControl,
      expiry_date: this.gmpControl,
      validity_status: this.gmpControl,
      times_to_expiry: this.gmpControl,
      section_id: new FormControl(this.section_id, Validators.compose([])),
      gmpsub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),
      id: new FormControl('', Validators.compose([]))

    });



   this.contractManufacturingDetailsfrm = new FormGroup({
      contract_manufacturing_id: new FormControl('', Validators.compose([Validators.required])),
      inspected_activity_id: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_name: new FormControl('', Validators.compose([])),
      sitecountry_id: new FormControl('', Validators.compose([])),
      siteregion_id: new FormControl('', Validators.compose([])),     
      physical_address: new FormControl('', Validators.compose([])),
      contact_person: new FormControl('', Validators.compose([])),     
      email_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),     
      region_id: new FormControl('', Validators.compose([])),
      inspected_id:new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      personnel_id:new FormControl('', Validators.compose([])),

    });

 
    this.premisesPersonnelDetailsfrm = new FormGroup({
      start_date: new FormControl('', Validators.compose([])),
      position_id: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      personnel_id: new FormControl('', Validators.compose([])),
      ///id: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      institution: new FormControl('', Validators.compose([])),
      registration_no: new FormControl('', Validators.compose([])),
      qualification_id: new FormControl('', Validators.compose([])),
      study_field_id: new FormControl('', Validators.compose([])),
    });
    this.gmpOtherDetailsfrm = new FormGroup({
      business_type_id: new FormControl(this.businessTypesData, Validators.compose([Validators.required])),
      business_type_detail_id: new FormControl(this.businessTypeDetailsData, Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))

    });


      this.gmpSurgicalmanufatcuringSiteBlocksfrm = new FormGroup({
        name: new FormControl(this.businessTypesData, Validators.compose([Validators.required])),
        inspection_category_id:new FormControl('', Validators.compose([Validators.required])),
        general_manufacturing_activity_id:new FormControl('', Validators.compose([Validators.required])),
        special_category_id:new FormControl('', Validators.compose([])),
        id: new FormControl('', Validators.compose([]))
    });

 
      this.manufatcuringSiteBlocksfrm = new FormGroup({
      name: new FormControl(this.businessTypesData, Validators.compose([Validators.required])),
      inspection_category_id:new FormControl('', Validators.compose([Validators.required])),
      special_category_id:new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
      this.premanufatcuringSiteBlocksfrm = new FormGroup({
      name: new FormControl(this.businessTypesData, Validators.compose([Validators.required])),
      inspection_category_id:new FormControl('', Validators.compose([Validators.required])),
      general_manufacturing_activity_id:new FormControl('', Validators.compose([Validators.required])),
      special_category_id:new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
  


    this.manufatcuringActivityfrm = new FormGroup({
      name:new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });



    this.manufatcuringSiteActivityfrm = new FormGroup({
      inteded_manufacturing_id: new FormControl('', Validators.compose([Validators.required])),
      manufacturing_activity_id: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });



     this.manufatcuringContractDetailsfrm = new FormGroup({
      contract_id: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      site_name: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      site_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([Validators.required])),

      id: new FormControl('', Validators.compose([]))
    });

    this.gmpSurgicalProductLineDetailsfrm = new FormGroup({
      group_family_id:new FormControl('', Validators.compose([Validators.required])),
      sterile_id:new FormControl('', Validators.compose([Validators.required])),
      product_name:new FormControl('', Validators.compose([])),
      gmdn_code_id:new FormControl('', Validators.compose([])),
      gmdn_code:new FormControl('', Validators.compose([])),
      gmdn_code_description:new FormControl('', Validators.compose([])),
      classification_id:new FormControl('', Validators.compose([])),
      block_name:new FormControl('', Validators.compose([])),
      invasive_id:new FormControl('', Validators.compose([Validators.required])), 
      manufacturingsite_block_id:new FormControl('', Validators.compose([])),
      active_id:new FormControl('', Validators.compose([Validators.required])),
      medicated_id:new FormControl('', Validators.compose([Validators.required])),
      manufacturing_activity_id:new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });


    this.gmpProductLineDetailsfrm = new FormGroup({
      product_line_id: new FormControl('', Validators.compose([Validators.required])),
      block_name:new FormControl('', Validators.compose([])),
      non_betalactam: new FormControl('', Validators.compose([])),
      beta_lactam_id: new FormControl('', Validators.compose([])), 
      gmpproduct_type_id:new FormControl('', Validators.compose([])), 
      manufacturingsite_block_id:new FormControl('', Validators.compose([])),
      manufacturing_id:new FormControl('', Validators.compose([])),
      manufacturing_activity_id:new FormControl('', Validators.compose([Validators.required])),
      manufacturing_activities:new FormControl('', Validators.compose([])), 
      dosage_form_id:new FormControl('', Validators.compose([])),    
      id: new FormControl('', Validators.compose([]))
    });


    this.premisesDocumentUploadfrm = this.formBuilder.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });
 
  this.prodSurgicalgmpAddinspectionFrm = new FormGroup({
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      applicant_name: new FormControl('', Validators.compose([])),
      reference_no: new FormControl('', Validators.compose([])),
      reg_product_id: new FormControl('', Validators.compose([])),
      gmdn_code: new FormControl('', Validators.compose([Validators.required])),
      gmdn_code_id: new FormControl('', Validators.compose([])),
      gmdn_code_description: new FormControl('', Validators.compose([Validators.required])),
      classification_id: new FormControl('', Validators.compose([Validators.required])),
      product_id: new FormControl('', Validators.compose([])),
      group_family_id: new FormControl('', Validators.compose([Validators.required]))
    });

    this.prodgmpAddinspectionFrm = new FormGroup({
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      applicant_name: new FormControl('', Validators.compose([Validators.required])),
      reference_no: new FormControl('', Validators.compose([Validators.required])),
      reg_product_id: new FormControl('', Validators.compose([])),
      product_id: new FormControl('', Validators.compose([Validators.required])),
      gmp_productline_id: new FormControl('', Validators.compose([Validators.required]))
    });
    this.business_type_id  = this.gmpapp_details.business_type_id;

    this.onBusinessTypesDetailsLoad(this.gmpapp_details.business_type_id);

    this.initqueryresponsefrm = new FormGroup({
      queries_remarks: new FormControl('', Validators.compose([Validators.required])),
      response_txt: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      query_id: new FormControl('', Validators.compose([]))
    });
    this.funcReloadQueriesDetails();
    this.onLoadAutoLoadedParams(this.section_id,this.sub_module_id);
    this.onLoadGMPLocalLicenceTypeAppData(this.section_id);
    this.onLoadfastTrackOptionsData();
    this.onLoadpayingCurrencyData();
  }

  ngOnInit() {
  }
  onLoadpayingCurrencyData() {
    var data = {
      table_name: 'par_currencies',
      is_paying_currency: 1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.payingCurrencyData = data;
        });

  }  
  onLoadContractDetails(manufacturing_site_id) {
    this.appService.onLoadContractDetails(manufacturing_site_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.contractManufacturingRows = data.data;
        },
        error => {
          return false
        });
  } 

  onLoadInspectionHistoryDetails(manufacturing_site_id) {
    this.appService.onLoadInspectionHistoryDetails(manufacturing_site_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.inspectionHistoryData = data.data;
          this.inspectionHistorydetailsfrm.patchValue(data.data);

        },
        error => {
          return false
        });
  } 
onLoadgmpSurgicalProductLineData(manufacturing_site_id) {
  this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id, section_id: this.section_id }, 'gmpinspection/getgmpSurgicalLineDetails')
    .subscribe(
      data => {
        if (data.success) {
        this.gmpSurgicalProductLineData = data.data;
          this.toastr.success(data.message);
        }
      },
      error => {
        return false;
      });
}

onLoadgmpSurgicalProductLineDataRows(manufacturing_site_id) {
  this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id, section_id: this.section_id }, 'gmpinspection/getGmpProductLineSurgicaldetails')
    .subscribe(
      data => {
        if (data.success) {
        this.gmpSurgicalProductLineDataRows = data.data;
          this.toastr.success(data.message);
        }
      },
      error => {
        return false;
      });
}

  onLoadfastTrackOptionsData() {
    var data = {
      table_name: 'par_fasttrack_options'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.fastTrackOptionsData = data;
        });

  }
  funcReloadQueriesDetails(){

    this.funcgetPreckingQueriesData();

    
  }
  funcInitQueryResponse(data) {
  
    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;
    
    this.isInitalQueryResponseFrmVisible = true;
  
  }
  
  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      return;
    }
    
    this.action_url  = 'onSavePrecheckingqueryresponse';
   
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value,this.action_url)
      .subscribe(
        response => {
          this.gmp_resp = response.json();
          if (this.gmp_resp.success) {
            this.toastr.success(this.gmp_resp.message, 'Response');

            this.initqueryresponsefrm.get('query_id').setValue(this.gmp_resp.record_id)
            this.funcReloadQueriesDetails();

          } else {
            this.toastr.error(this.gmp_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  } 
  onSaveGMPApplication() {


    if(this.gmp_type_id == 2 && this.sub_module_id == 5){

      const invalid = [];
      const controls = this.gmppreInspectionGeneraldetailsfrm.controls;
      
      for (const name in controls) {
          if (controls[name].invalid) {
            this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
              return;
          }
      }
     
      if (this.gmppreInspectionGeneraldetailsfrm.invalid) {
        return;
      }

     this.spinner.show();
      this.appService.onSaveRenewalGmpApplication(this.manufacturing_site_id, this.gmppreInspectionGeneraldetailsfrm.value, this.tracking_no)
        .subscribe(
          response => {
            this.gmp_resp = response.json();
            //the details 
            this.spinner.hide();
            this.tracking_no = this.gmp_resp.tracking_no;
            this.manufacturing_site_id = this.gmp_resp.manufacturing_site_id;
            
            this.application_code =  this.gmp_resp.application_code;
            
            this.gmppreInspectionGeneraldetailsfrm.get('manufacturing_site_id').setValue(this.manufacturing_site_id);

            if (this.gmp_resp.success) {
              this.toastr.success(this.gmp_resp.message, 'Response');
            } else {
              this.toastr.error(this.gmp_resp.message, 'Alert');
            }
          },
          error => {
            this.loading = false;
          });



    }else{
      const invalid = [];
      const controls = this.gmpapplicationGeneraldetailsfrm.controls;
      
      for (const name in controls) {
          if (controls[name].invalid) {
            this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
              return;
          }
      }
     
      if (this.gmpapplicationGeneraldetailsfrm.invalid) {
        return;
      }

     this.spinner.show();
      this.appService.onSaveGmpApplication(this.manufacturing_site_id, this.gmpapplicationGeneraldetailsfrm.value, this.tracking_no,'')
        .subscribe(
          response => {
            this.gmp_resp = response.json();
            //the details 
            this.spinner.hide();
            this.tracking_no = this.gmp_resp.tracking_no;
            this.manufacturing_site_id = this.gmp_resp.manufacturing_site_id;
            
            this.application_code =  this.gmp_resp.application_code;
            
            this.gmpapplicationGeneraldetailsfrm.get('manufacturing_site_id').setValue(this.manufacturing_site_id);

            if (this.gmp_resp.success) {
              this.toastr.success(this.gmp_resp.message, 'Response');
            } else {
              this.toastr.error(this.gmp_resp.message, 'Alert');
            }
          },
          error => {
            this.loading = false;
          });


    }

 
  }
  onAppQueryPreparing(e) {
    
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.funcReloadQueriesDetails.bind(this)
        }
      });

  }
  funcgetPreckingQueriesData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_gmp_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.spinner.hide();
      });
  }
  
  funcgetInitialQueriesData(application_code){
      
        this.utilityService.getApplicationPreQueriesDetails(application_code,'wb_gmp_applications', 'application_status_id','utilities/getApplicationPreQueriesDetails')
        .subscribe(
          data => {
            this.applicationInitialQueriesData = data.data;
            this.spinner.hide();
          });
  }
  
  onShowInitalQueriesWin(){
    
    this.isInitalQueryWinVisible = true;
  }
  onLoadAssessmentProcedure(sub_module_id) {
    var data = {
      table_name: 'par_gmp_assessment_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.assessmentProcedureData = data;
        });
  }

  onLoadLocalAssessmentProcedure() {
    var data = {
      table_name: 'par_gmp_assessment_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.localAssessmentProcedureData = data;
        });
  }


  onLoadAutoLoadedParams(section_id,sub_module_id){
      this.onLoadgmpLocationData();
      this.onLoadStudyFieldsDetails();
      this.onLoadQualificationDetails();
  
      this.onLoadSections();
      this.onLoadCountries();
      this.onLoadRegistrantOptions();
  
      this.onLoadZones();
      this.onLoadBusinessScales();
  
      this.onLoadbusinessCategories();
      //this.onLoadPersonnerDetails();
      this.onLoadPersonnelPositionDetails();
      //with section_id 
      this.onBusinessTypesLoad(section_id);
      this.onLoadproduct_lineData();
      this.onLoadproduct_lineSurgicalData();
      this.onLoadproductlineCategoryData(section_id);
      this.onLoadproductlineDescriptionData(section_id);
      this.onLoadGuidelines(this.sub_module_id);
      this.onLoadconfirmDataParm();
      this.onLoadAssessmentProcedure(this.sub_module_id);
      this.onLoadLocalAssessmentProcedure();
      this.onLoadDeviceTypes();


  }

  onGMPApplicationDashboard() {
    //check for unsaved changes 
    if(this.section_id == 2){

      this.app_route = ['./online-services/medicalqualityaudits-dashboard'];
    }
    else{


      this.app_route = ['./online-services/gmpapplications-dashboard'];
    }
    this.router.navigate( this.app_route);

  }
  onLoadRegistrantOptions() {
    var data = {
      table_name: 'par_registrant_options',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.registrantOptionsData = data;
        });
  }
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
      sectionSelection: this.sectionSelection
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe( 
        data => {
          this.sectionsData = data;
        });
  }
  onLoadGMPLocalLicenceTypeAppData(section_id) {
    var data = {
      table_name: 'par_local_gmplicense_application',
      section_id: section_id
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe( 
        data => {
          this.licenseTypeApplicationData = data;
        });
  }



  onLoadDeviceTypes() {
    var data = {
      table_name: 'par_device_types',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.devicesTypeData = data;
        });
  }
  

  onLoadgmpLocationData() {
    var data = {
      table_name: 'par_gmplocation_details',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.gmpLocationData = data;
        });
  }
  onLoadZones() {
    var data = {
      table_name: 'par_zones',
      is_hq: 1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.zoneData = data;
        });

  }
  onLoadBusinessScales() {
    var data = {
      table_name: 'par_business_scales',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessScaleData = data;
        });

  }

  onLoadQualificationDetails() {
    var data = {
      table_name: 'par_personnel_qualifications',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.qualificationsData = data;
        });
  }
  onLoadStudyFieldsDetails() {
    var data = {
      table_name: 'par_personnel_studyfield',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.studyFieldsData = data;
        });
  }
  onLoadPersonnelPositionDetails() {
    var data = {
      table_name: 'par_personnel_positions',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.personnelPositionData = data;
        });
  }
  onLoadbusinessCategories() {
    var data = {
      table_name: 'par_business_categories',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessCategoryData = data;
        });

  }

  onBusinesTypeCboSelect($event) {

    
    this.business_type_id = $event.value;
    this.onBusinessTypesDetailsLoad(this.business_type_id);
    
  }
 
  onSectionsCboSelect($event) {
    this.onBusinessTypesLoad($event.value)
  }
  onFacilityLocationCboSelect($event) {
    
    if(this.manufacturing_site_id < 1){
        this.toastr.error('Gmp Application has already been saved, you are no allowed to make ammedments to the Facility Location', 'Alert');
        return;

    }
    else{
      
      this.manufacturingSiteLocationSet = true;
      
    }
   
  }
  onBusinessTypesLoad(section_id) {

    var data = {
      table_name: 'par_business_types',
      section_id: section_id,
      is_manufacturer:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypesData = data;
        },
        error => {
          return false
        });
  }


  onLoadproduct_lineSurgicalData() {

    var data = {
      table_name: 'par_medical_device_family',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.product_lineSurgicalData = data;
        },
        error => {
          return false
        });
  }
  
  onLoadproduct_lineData() {

    var data = {
      table_name: 'gmp_product_lines',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.product_lineData = data;
        },
        error => {
          return false
        });
  }
  onLoadproductlineCategoryData(section_id){
    var data = {
      table_name: 'gmp_product_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productlineCategoryData = data;
        },
        error => {
          return false
        });
  }
  onLoadproductlineDescriptionData(section_id){
    var data = {
      table_name: 'gmp_product_descriptions',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productlineDescriptionData = data;
        },
        error => {
          return false
        });
  }
  onBusinessTypesDetailsLoad(business_type_id) {

    var data = {
      table_name: 'par_business_type_details',
      business_type_id: business_type_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data);
          this.businessTypeDetailsData = data;
        },
        error => {
          return false
        });
  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
  
  onGmpApplicationSubmit() {
    if(this.section_id == 2){

      this.app_route = ['./online-services/medicalqualityaudits-dashboard'];
    }
    else{


      this.app_route = ['./online-services/gmpapplications-dashboard'];
    }
    this.isApplicationSubmitwin = false;
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_gmp_applications', this.app_route, this.onApplicationSubmissionFrm.value);

  }
  //reload the premsies Other Details 
  onLoadPremisesOtherDetails(manufacturing_site_id) {

    this.appService.onLoadGmpOtherDetails(manufacturing_site_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.premisesOtherDetailsRows = data;
        },
        error => {
          return false
        });
  }
  onClickApplicationSubmitWin(){
    
      this.isApplicationSubmitwin = true;
  }
 
 
  
  

  //load premises personnel dms_repository_structure
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

  onSaveGmpOtherDetails() {
    if (this.gmpOtherDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSaveGmpOtherDetails('wb_mansite_otherdetails', this.gmpOtherDetailsfrm.value,this.manufacturing_site_id)
      .subscribe(
        response => {
          this.gmp_resp = response.json();
          if (this.gmp_resp.success) {
            this.toastr.success(this.gmp_resp.message, 'Response');
            this.isBusinessTypePopupVisible = false;
            this.onLoadPremisesOtherDetails(this.manufacturing_site_id);
          } else {
            this.toastr.error(this.gmp_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
 
  

  onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }
  onLoadCountries() {

    var data = {
      table_name: 'par_countries'
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

  onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.regions = data;
        },
        error => {
          return false
        });
  }

  onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.districts = data
        },
        error => {
          return false;
        });
  }
  funAddPremisesOtherDetails() {
    this.isBusinessTypePopupVisible = true;
    //reset the form 
    this.gmpOtherDetailsfrm.reset();
    
    this.onBusinessTypesDetailsLoad(this.business_type_id);
    this.gmpOtherDetailsfrm.get('business_type_id').setValue(this.business_type_id);
    
  }
  
  
  
  onPremisesBusinesDetailsToolbar(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funAddPremisesOtherDetails, 'Business Type Details',is_readonly);

  }
  

  
  functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        disabled:is_readonly,
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }  refreshDataGrid() {
    //this.dataGrid.instance.refresh();
  }
  

  onPersQualificationGridToolbar(e) {
    e.toolbarOptions.items.unshift();
  }

  funcEditPremisesDetails(data) {
    this.gmpOtherDetailsfrm.patchValue(data.data)

    this.isBusinessTypePopupVisible = true;
  }


  funcDeletePremisesBusinessDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let manufacturing_site_id = data.data.manufacturing_site_id;
    let table_name = 'wb_mansite_otherdetails';
    this.funcDeleteDetailhelper(record_id, manufacturing_site_id, table_name, 'busines_details', 'Manufacturing Details');

  }

  
  
  funcDeletePersonnelDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.manufacturing_site_id;
    let table_name = 'wb_manufacturing_sites_personnel';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Premises Personnel');

  }
  funcDeleteDetailhelper(record_id, manufacturing_site_id, table_name, reload_type, title) {
    this.modalServ.openDialog(this.viewRef, {
      title: 'Are You sure You want to delete ' + title + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [
        {
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
            this.appService.onDeleteGMPDetails(record_id, table_name, manufacturing_site_id, title)
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    if (reload_type == 'busines_details') {
                      this.onLoadPremisesOtherDetails(manufacturing_site_id);

                    }
                    else if (reload_type == 'busines_personnel') {
                  //    this.onLoadPremisesPersonnelDetails(manufacturing_site_id);

                    }
                    else if(reload_type == 'product_line'){
                   //   this.onLoadgmpProductLineDataRows(manufacturing_site_id) 
                    }
                     else if(reload_type == 'gmpproducts'){
                    //  this.onLoadgmpproductDetailsInformationData(manufacturing_site_id) 
                    }
                    
                    this.toastr.success(resp.message, 'Response');
                  }
                  else {
                    this.toastr.error(resp.message, 'Alert');
                  }
                },
                error => {
                  return false
                });
            resolve();
          })
        },
        {
          text: 'no',
          buttonClass: 'btn btn-default',
          onAction: () => new Promise((resolve: any) => {

            resolve();

          })
        }
      ]
    });
  }

  onGMPDashboard() {
    if(this.sub_module_id == 117){
      this.app_route = ['./online-services/gmp-preinspection-dashboard'];

    }
    else if(this.sub_module_id == 5){
      this.app_route = ['./online-services/gmpapplications-dashboard'];

    }else if(this.sub_module_id == 6){
      this.app_route = ['./online-services/renewalgmpapplications-dashboard'];
    }
    else{
       this.app_route = ['./online-services/gmpapplications-dashboard'];

    }
    
    this.router.navigate(this.app_route);
  }
  onPremisesApplicationPrint() {

  }
  newPremTermscheckbox(e) {
    console.log(e.value);
    this.checkPremisesSubmission = e.value;

  }
  
  funcValidateProductLineDetails(nextStep) {
    //chang to premisesOtherDetailsRows line
    this.spinner.show();
    this.appService.onValidateGmpProductOtherdetails(this.manufacturing_site_id,this.section_id)
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
  
  funcValidatePremDocumentsDetails(nextStep) {
  
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'wb_gmp_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);

        }
        else {

          this.toastr.error(response_data.message, 'Response');
        }

        this.spinner.hide();
      });
  }
  
  funcValidateContractManufacturingDetails(nextStep) {

    this.funcValidateStepDetails('Add Manufacturing Site Details to proceed', 'wb_contractmanufacturing_details', nextStep);

  }
  funcValidatePremPersonnelDetails(nextStep) {

    this.funcValidateStepDetails('Add Manufacturing Site Business Details to proceed', 'wb_manufacturing_sites_personnel', nextStep);

  }
  
  funcValidateStepDetails(title_validate, table_name, nextStep) {
    //validate details 
    this.spinner.show();
    this.appService.onValidatePremisesOtherdetails(this.manufacturing_site_id, table_name,title_validate)
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
  

  onDomesticPremisesSearch() {
      if(this.manufacturing_site_id < 1){
          this.toastr.error('Gmp Application has already been saved.', 'Alert');
          return;
          
      }
      else{
        this.appService.getGMPDataDetails({ mistrader_id:this.mistrader_id, section_id: this.section_id }, 'gmpinspection/getTradersRegisteredPremises')
        .subscribe(
          data => {
            if (data.success) {
              
              this.ispremisesSearchWinVisible= true;
              this.registered_premisesData = data.data;

            }
            else {
              this.toastr.success(data.message, 'Alert');
            }
          },
          error => {
            return false
          });
      }
    
  }
  OnSeachRegisteredGMPApplications() {
    if(this.manufacturing_site_id > 0){
        this.toastr.error('Gmp Application has already been saved.', 'Alert');
        return;
    }
    else{
      this.appService.getGMPDataDetails({ mistrader_id:this.mistrader_id, section_id: this.section_id }, 'gmpinspection/getTradersRegisteredGMPApplications')
      .subscribe(
        data => {
          if (data.success) {
            
            this.isgmpapplicationSearchWinVisible= true;
            this.registered_gmpApplicationData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
    }
  
}
  funcAddProductLocalRepresentativeDetails() {
    this.modalService.getModal('productLocalRepresenativeModal').open();
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

  onMovePreviousWizard(previous_step) {
    this.wizard.model.navigationMode.goToStep(previous_step);

  }
  onMoveNextWizard(nextStep) {
    //validate details 
    if (nextStep == 1) {
      this.wizard.model.navigationMode.goToStep(nextStep);

    }
    else if (nextStep == 2) {
      this.wizard.model.navigationMode.goToStep(nextStep);

    }
    else if (nextStep == 3) {
      
      this.wizard.model.navigationMode.goToStep(nextStep);

    }

  }
  funcValidateAppocumentsUpload(nextStep){
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_gmp_applications')
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
  
  onGMPApplicationPrint(){
    
  }
  
  
  funcValidatePremDocumentsUpload(nextStep){
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_gmp_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {

          this.funcValidateStepDetails('Upload  Document Details to proceed', this.appDocumentsUploadData, nextStep);

        }
        else{
          this.toastr.error(response_data.message, 'Response');
        }

        this.spinner.hide();
      });
    
  }
 
  funcValidateApplicationWithdrawalDetails(nextStep) {
    this.utilityService.validateApplicationotherDetails(this.application_code,'wb_application_withdrawaldetails')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          
        }
        else{
         
          this.toastr.error(response_data.message, 'Response');
        }
        this.wizard.model.navigationMode.goToStep(nextStep);
         
        this.spinner.hide();
      });

  }
  
  funcValidateApplicationVariationDetails(nextStep) {
    this.utilityService.validateApplicationotherDetails(this.application_code,'wb_application_variationsdata')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          
        }
        else{
         
          this.toastr.error(response_data.message, 'Response');
        }
        this.wizard.model.navigationMode.goToStep(nextStep);
         
        this.spinner.hide();
      });

  }

  onLoadgmpManufacturingBlocksData(manufacturing_site_id) {
    this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id }, 'gmpinspection/getGmpManufacturingBlocksDetails')
    .subscribe(
      data => {
        if (data.success) {
          this.gmpManufacturingBlocksDataRows = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }onLoadgmpproductDetailsInformationData(manufacturing_site_id) {

    this.appService.getGMPDataDetails({ manufacturing_site_id:manufacturing_site_id }, 'gmpinspection/getgmpproductDetailsInformationData')
    .subscribe(
      data => {
        if (data.success) {
          this.gmpproductDetailsInformationData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
    
}



onLoadgmpProductLineData(manufacturing_site_id, block_id) {
  this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id, block_id: block_id }, 'gmpinspection/getGmpProductLinedetailsDt')
    .subscribe(
      data => {
        if (data.success) {
          this.gmpProductLineData = data.data;
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        // Handle error
      });
}


onLoadgmpProductLineDataRows(manufacturing_site_id) {

    this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id }, 'gmpinspection/getGmpProductLinedetails')
    .subscribe(
      data => {
        if (data.success) {
          this.gmpProductLineDataRows = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
    
} 
onLoadPremisesPersonnelDetails(manufacturing_site_id) {

  this.appService.onLoadPremisesPersonnelDetails(manufacturing_site_id)
    //.pipe(first())
    .subscribe(
      data => {//dtgmpPersonnelDetailsData
        this.gmpPersonnelDetailsData = data.data;
      },
      error => {
        return false
      });
}
funcValidateApplicationQueryresponse( nextStep) {

  this.spinner.show();
  this.utilityService.funcValidateApplicationQueryresponse(this.application_code,'wb_gmp_applications')
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
funcValidateDocumentsDetails(nextStep) {
  console.log(this.application_code)
  this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'wb_gmp_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);

        }
        else {

          this.toastr.error(response_data.message, 'Response');
        }

        this.spinner.hide();
      });
}
funcDownloadUploadedDoc(){
  if(this.appuploaded_document_id >0){
    this.dmsService.getApplicationDocumentDownloadurl(this.application_code, '', this.appuploaded_document_id)
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);
          this.isDocumentPreviewDownloadwin  = true;
        }
        else {
          this.toastr.success(response_data.message, 'Response');
        }
      },
      error => {
        this.loading = false;
      });
  }
  else{
    this.toastr.error('No Query Letter that has been Uploaded, preview the query for detail.', 'Alert');
  }
}
funcDownloadQueryLetter(data){
  this.appuploaded_document_id = data.data.appuploaded_document_id;
  this.funcDownloadUploadedDoc();
}
onFUncCloseQueryWindow(){
  this.isInitalQueryResponseFrmVisible = false;
}
}
