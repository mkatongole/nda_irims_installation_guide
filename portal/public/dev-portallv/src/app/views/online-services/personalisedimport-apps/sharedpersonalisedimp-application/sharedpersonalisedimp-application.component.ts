import { Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';

import CustomStore from 'devextreme/data/custom_store';
import { WizardComponent } from 'ng2-archwizard';
import { Utilities } from 'src/app/services/common/utilities.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { AppSettings } from 'src/app/app-settings';
import DataSource from 'devextreme/data/data_source';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';

@Component({
  selector: 'app-sharedpersonalisedimp-application',
  templateUrl: './sharedpersonalisedimp-application.component.html',
  styleUrls: ['./sharedpersonalisedimp-application.component.css']
})
export class SharedpersonalisedimpApplicationComponent implements OnInit {
  //ImportexportService
  //dms 
  @ViewChild(DxDataGridComponent)
  appuploaded_document_id:number;
  trader_id:number;
  mistrader_id:number;
  dataGrid: DxDataGridComponent;
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;
  deviceTypeData:any;

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  product_resp:any;confirmDataParam:any;
  applicationGeneraldetailsfrm: FormGroup;
  documentUploadfrm: FormGroup;
  permitProductsFrm: FormGroup;
  regulatedProductsPermitData: any;
  sectionsData: any;
  zoneData: any;
  documentMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        { text: "Update Document", action: 'update', icon: 'fa fa-upload', },
        { text: "Delete Document", action: 'delete', icon: 'fa fa-trash-o' },
        { text: "Preview Previous Versions", action: 'version', icon: 'fa fa-upload', },
      ]
    }
  ];
  documentVersionMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'versiondownload', icon: 'fa fa-download' }
      ]
    }
  ];
 
  appDocumentsUploadData: any = {};
  appDocumentsUploadRequirement: any = {};
  appDocumentsVersionsUploadData: any = {};


  application_details: any;
  status_id: number;
  sub_module_id: number;
  process_title: string;;
  section_id: number;
  application_id: number;
  application_code: number;
  tracking_no: string;
  status_name: string;
  module_id: number = 25;
  application_type_id:number;
  app_route: any;
  applicationTypeData: any;
  applicationCategoryData: any;
  applicationTypeCategoryData: any;
  permitReasonData: any;
  portOfEntryExitData: any;
  payingCurrencyData: any;
  consigneeOptionsData: any;
  modeOfTransportData: any;
  prescriptionDataParam:any;
  termscheckbox: boolean = false;
  app_resp: any;
  consignee_options_id: number;
  consignee_options_check: boolean = true;

  isPermitproductsPopupVisible: boolean = false;
  isDocumentUploadPopupVisible: boolean = false;

  loading: boolean = true;
  terms_conditions: any;

  countries: any;
  regions: any;
  districts: any;

  senderReceiverData: any ={};
  ispremisesSearchWinVisible: boolean = false;
  issenderreceiverSearchWinVisible: boolean = false;
  issenderreceiverAddWinVisible: boolean = false;
  registered_premisesData: any;
  permitReceiverSenderFrm: FormGroup;
  productGeneraldetailsfrm:FormGroup;

  consignee_sendertitle: string;
  checkifsenderreceiver: boolean;

  document_previewurl: any;
  isDocumentPreviewDownloadwin: boolean = false;
  isDocumentVersionPreviewDownloadwin: boolean = false;
  documentsVersionsUploadData: any;
  documentsUploadData: any;
  documentsUploadRequirementData: any;

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
  mode_oftransport_id:number;
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
  permitProductsCategoryData:any;
  has_invoicegeneration:boolean;
  app_routing:any;
  isprodnextdisable:boolean=true;
  
  filesToUpload: Array<File> = [];  
  constructor(public utilityService:Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public appProdService:ProductApplicationService) {
          //form 
          let user = this.authService.getUserDetails();

         this.trader_id = user.trader_id;
         this.mistrader_id = user.mistrader_id;
          this.application_details = this.appService.getApplicationDetail();

          if (!this.application_details) {
           // this.router.navigate(['./../online-services/importvisa-dashboard']);
            //return
          }
          else {
      
            this.sub_module_id = this.application_details.sub_module_id;
            this.process_title = this.application_details.process_title;
            this.section_id = this.application_details.section_id;
      
            this.application_id = this.application_details.application_id;
            this.tracking_no = this.application_details.tracking_no;
      
            this.status_name = this.application_details.status_name;
            this.status_id = this.application_details.application_status_id;
            this.application_code = this.application_details.application_code;
            this.proforma_currency_id = this.application_details.proforma_currency_id;
      
      
          }
          this.funcREturnApplicationDashboardROute();
          
        this.applicationGeneraldetailsfrm = new FormGroup({
          sub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),
          application_type_id: new FormControl(this.application_type_id, Validators.compose([Validators.required])),
          application_code: new FormControl(this.application_code, Validators.compose([])),
          module_id: new FormControl(this.module_id, Validators.compose([])),
          name: new FormControl('', Validators.compose([Validators.required])),
          email: new FormControl('', Validators.compose([Validators.required])),
          country_id: new FormControl('', Validators.compose([Validators.required])),
          region_id: new FormControl('', Validators.compose([])),
          district_id: new FormControl('', Validators.compose([])),
          county_id: new FormControl('', Validators.compose([])),
          sub_county_id: new FormControl('', Validators.compose([])),
          parish_id: new FormControl('', Validators.compose([])),
          village: new FormControl('', Validators.compose([])),
          street: new FormControl('', Validators.compose([Validators.required])),
          telephone_no: new FormControl('', Validators.compose([Validators.required])),
          tpin_id: new FormControl('', Validators.compose([])),
          patients_fullnames: new FormControl('', Validators.compose([])),
          patients_phone_no: new FormControl('', Validators.compose([])),
          patients_email_address: new FormControl('', Validators.compose([])),
          patientscountry_id: new FormControl('', Validators.compose([])),
          patientsregion_id: new FormControl('', Validators.compose([])),
          patientsdistrict_id: new FormControl('', Validators.compose([])),
          patients_physical_address: new FormControl('', Validators.compose([])),
          physical_address: new FormControl('', Validators.compose([Validators.required])),
          applicant_contact_id: new FormControl('', Validators.compose([Validators.required])),
          prescribling_hospital: new FormControl('', Validators.compose([])),
          hospital_address: new FormControl('', Validators.compose([])),
          has_medical_prescription: new FormControl('', Validators.compose([])),
          port_id: new FormControl('', Validators.compose([Validators.required])),
          mode_oftransport_id: new FormControl('', Validators.compose([Validators.required])),
          proforma_invoice_no: new FormControl('', Validators.compose([Validators.required])),
          product_origin_id: new FormControl('', Validators.compose([Validators.required])),
          air_bill_no: new FormControl('', Validators.compose([Validators.required])),
          proforma_invoice_date: new FormControl('', Validators.compose([])),
          proforma_currency_id: new FormControl('', Validators.compose([])),
          tota_invoice_value: new FormControl('', Validators.compose([])),
          prescribing_doctor: new FormControl('', Validators.compose([])),
          patient_tpin_no: new FormControl('', Validators.compose([])),
          tpin_no: new FormControl('', Validators.compose([])),

          });
          this.permitProductsFrm = this.fb.group({
            brand_name: new FormControl('', Validators.compose([Validators.required])),
            product_category_id: new FormControl('', Validators.compose([Validators.required])),
            product_batch_no: new FormControl('', Validators.compose([])),
            product_strength: new FormControl('', Validators.compose([])),
            product_manufacturing_date: new FormControl('', Validators.compose([])),
            product_expiry_date: new FormControl('', Validators.compose([])), 
            country_oforigin_id: new FormControl('', Validators.compose([])),
            unit_price: new FormControl('', Validators.compose([])),
            currency_id: new FormControl('', Validators.compose([])),
            packaging_unit_id: new FormControl('', Validators.compose([])),
            quantity: new FormControl('', Validators.compose([Validators.required])),  
            classification_id: new FormControl('', Validators.compose([])),
            laboratory_no: new FormControl('', Validators.compose([])),
            regulated_prodpermit_id: new FormControl('', Validators.compose([])),
            prodcertificate_no: new FormControl('', Validators.compose([])),
            product_id: new FormControl('', Validators.compose([])),
            unitpack_unit_id: new FormControl('', Validators.compose([])),
            unitpack_size: new FormControl('', Validators.compose([])),
            visa_quantity:new FormControl('', Validators.compose([])),
            total_weight: new FormControl('', Validators.compose([])),
            gmdn_category: new FormControl('', Validators.compose([])),
            gmdn_term: new FormControl('', Validators.compose([])),
            gmdn_code: new FormControl('', Validators.compose([])),
            weights_units_id: new FormControl('', Validators.compose([])),
            id: new FormControl('', Validators.compose([])),
            device_type_id: new FormControl('', Validators.compose([])),
            is_regulated_product: new FormControl('', Validators.compose([])),
            productphysical_description: new FormControl('', Validators.compose([])),
            common_name_id: new FormControl('', Validators.compose([])),
            manufacturer_id: new FormControl('', Validators.compose([])),
            manufacturer_name: new FormControl('', Validators.compose([])),
            product_subcategory_id: new FormControl('', Validators.compose([])),
            productclassification_id: new FormControl('', Validators.compose([])),
            productdosage_id: new FormControl('', Validators.compose([])),
            consignment_quantity:new FormControl('', Validators.compose([])),
            is_registered:new FormControl('', Validators.compose([])),
            certificate_of_conformity:null,
                    
          });
     
          
         
          this.onApplicationSubmissionFrm = new FormGroup({
            paying_currency_id: new FormControl('', Validators.compose([])),
           submission_comments:new FormControl('', Validators.compose([]))
          });

          this.permitReceiverSenderFrm = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required])),
            country_id: new FormControl('', Validators.compose([Validators.required])),
            region_id: new FormControl('', Validators.compose([])),
            district_id: new FormControl('', Validators.compose([])),
            email_address: new FormControl('', Validators.compose([Validators.required])),
            postal_address: new FormControl('', Validators.compose([])),
            telephone_no: new FormControl('', Validators.compose([])),
            mobile_no: new FormControl('', Validators.compose([])),
            physical_address: new FormControl('', Validators.compose([Validators.required])),
            tin_no: new FormControl('', Validators.compose([]))
          });

          this.documentUploadfrm = this.fb.group({
            file: null,
            document_requirement_id: [null, Validators.required],
            node_ref: null,
            id: null,
            description: [null]
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
        
          if (this.status_id < 1) {
            this.status_name = "New"
          }
         
      
          this.funcAutoLoadedParamters();
      
          this.onLoadPermitProductsData(this.application_code);
         
          if (this.section_id == 4) {
            this.device_type_visible = true;
          }
          
          this.import_typecategory_visible = true;
        
          
          this.funcReloadQueriesDetails();
       

  }
  funcAutoLoadedParamters(){
          this.onLoadconsigneeOptionsData();
          this.onLoadmodeOfTransportData();
          this.onLoadpayingCurrencyData();
          this.onLoadportOfEntryExitData(this.mode_oftransport_id);
          
          this.onLoadDeviceTypeData();
          this.onLoadpermitReasonData(this.section_id);
          this.onLoadapplicationCategoryData(this.section_id);
          this.onLoadapplicationTypeCategoryData(this.section_id);
          this.onloadApplicationTypes();
          this.onLoadClassifications(this.section_id);
          this.onLoadPackagingUnitsData(this.section_id)
          this.onLoadsiUnitsData(this.section_id);
          this.onLoadWeightsData(this.section_id)
        
          this.onLoadZones();
          this.onLoadSections();
          this.onLoadpermitProductsCategoryData(0);
          this.onLoadconfirmDataParm();
          this.onLoadCommonNames(this.section_id);
          this.onLoadGuidelines(this.sub_module_id);
          this.onLoadApplicantDetails();

          this.onLoadproductCategoryData()
          this.onLoaddevicesTypeData(this.section_id)
          if (this.application_details) {
            this.applicationGeneraldetailsfrm.patchValue(this.application_details);
          
          }
          
          this.onLoadCurrenciesData();
    this.onLoadCountries();
  }

  onLoadApplicantDetails() {
    this.premappService.onLoadApplicant().subscribe(
      (response: any) => {
      if (response && Array.isArray(response.data) && response.data.length > 0) {
          const dataItem = response.data[0];
          this.applicationGeneraldetailsfrm.get('name').setValue(dataItem.name);
          this.applicationGeneraldetailsfrm.get('email').setValue(dataItem.email);
          this.applicationGeneraldetailsfrm.get('country_id').setValue(dataItem.country_id);
          this.applicationGeneraldetailsfrm.get('region_id').setValue(dataItem.region_id);
          this.applicationGeneraldetailsfrm.get('district_id').setValue(dataItem.district_id);
          this.applicationGeneraldetailsfrm.get('telephone_no').setValue(dataItem.telephone_no);
          this.applicationGeneraldetailsfrm.get('physical_address').setValue(dataItem.physical_address);
      } 

    },
      error => {
        return false
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
  funcReloadQueriesDetails(){

    this.funcgetPreckingQueriesData();
    
  }
  funcgetPreckingQueriesData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_importexport_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.spinner.hide();
      });
  }
  
  ngOnInit() {

    
  }
  onLoadClassifications(section_id) {
    var data = {
      table_name: 'par_classifications',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
        });
  }
  
  onIsREguatedProdulctsSelect($event){
      if($event.selectedItem.id == 1){
          this.is_regulatedproducts = false;

      }
      else{ 

        this.is_regulatedproducts = true;
      }
  }
  onLoadCommonNames(section_id) {
    var data = {
      table_name: 'par_common_names',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.commonNamesData = new DataSource({
              paginate: true,
              pageSize: 200,
              store: {
                type: "array",
                  data: data,
                  key: "id"
              }
          });
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
    this.app_route  = this.funcREturnApplicationDashboardROute();

    this.router.navigate(this.app_route);
  }
  funcREturnApplicationDashboardROute(){
    if(this.sub_module_id == 86){
      this.app_routing = ['./online-services/oneyearauthorisation-dashboard'];

    }
    else if(this.sub_module_id == 87){
      this.app_routing  = ['./online-services/personnalisedimport-dashboard'];

    }
    return this.app_routing;

  }
  onSectionsCboSelect($event) {
    //this.onBusinessTypesLoad($event.value)
  }

  onLoadSections() {
    var data = {
      table_name: 'par_sections',
      is_product_type:1
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }

  onLoadZones() {
    var data = {
      table_name: 'par_zones',
      zone_notin:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.zoneData = data;
        });

  }

  onloadApplicationTypes() {
    var data = {
      table_name: 'par_personalisedpermit_type',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeData = data;
        });
  }

  //   onloadApplicationTypes() {
  //   var data = {
  //     table_name: 'sub_modules',
  //   };
  //   this.config.onLoadConfigurationData(data)
  //     .subscribe(
  //       data => {
  //         this.applicationTypeData = data;
  //       });
  // }

  onLoadapplicationCategoryData(section_id) {

    var data = {
      table_name: 'par_permit_category',
      sub_module_id: this.sub_module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationCategoryData = data;
        });

  }
  //
  onLoadapplicationTypeCategoryData(section_id) {
    var data = {
      table_name: 'par_permit_typecategories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeCategoryData = data;
        });

  }
  //par_import_typecategories
  onLoadpermitReasonData(section_id) {
    var data = {
      table_name: 'par_permit_reasons'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.permitReasonData = data;
        });

  }
  onLoadpermitProductsCategoryData(permit_category_id) {
    var data = {
      table_name: 'par_permitsproduct_categories',
      permit_category_id:permit_category_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.permitProductsCategoryData = data;
        });

  }
    onLoadportOfEntryExitData(mode_oftransport_id) {
        this.configService.onLoaPortOfEntryDetails(mode_oftransport_id,this.sub_module_id)
          //.pipe(first())
          .subscribe(
            data => {
              this.portOfEntryExitData = data.data;
            },
            error => {
              return false;
            });

      }
  onLoadDeviceTypeData() {
    var data = {
      table_name: 'par_device_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.deviceTypeData = data;
        });

  }
  
  onconsigneeOptionsChange($event) {
    this.consignee_options_id = $event.selectedItem.id;
    if (this.consignee_options_id == 1) {
      this.consignee_options_check = true;
    }
    else {
      this.consignee_options_check = false;
    }
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
  onLoadCurrenciesData() {
    var data = {
      table_name: 'par_currencies'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.currencyData = data;
        });

  }

  onLoadWeightsData(section_id) {
    var data = {
      table_name: 'par_weights_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.weightsUnitData = data;
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
  
  onLoadconsigneeOptionsData() {
    var data = {
      table_name: 'par_consignee_options'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.consigneeOptionsData = data;
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
  funcValidatePermitDetails(validation_title, nextStep){

   
    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id','')+' and save permit application', 'Alert');
            return;
        }
    }
    if (this.applicationGeneraldetailsfrm.invalid) {
      this.wizard.model.navigationMode.goToStep(nextStep);
      return;
    }
   
  }
  private prepareSavePermitDoc(): any {
    //let input = new FormData();
    let input = this.applicationGeneraldetailsfrm.value;
    const files: Array<File> = this.filesToUpload;
  // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
    for(let i =0; i < files.length; i++){
        input.append("file", files[i], files[i]['name']);
    }
    return input;
  }
  
  onSaveOneYearAuthorisationApplication() {

    const invalid = [];
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
    const uploadData = this.prepareSavePermitDoc();

    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.applicationGeneraldetailsfrm.value, this.tracking_no, 'importexportapp/saveOneYearAuthorisationApplication',uploadData)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.tracking_no = this.app_resp.tracking_no;
            this.application_id = this.app_resp.application_id;
            this.application_code = this.app_resp.application_code;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }

  onSaveImportExportApplication() {

    const invalid = [];
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
    const uploadData = this.prepareSavePermitDoc();

    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.applicationGeneraldetailsfrm.value, this.tracking_no, 'importexportapp/saveImportExportApplication',uploadData)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.tracking_no = this.app_resp.tracking_no;
            this.application_id = this.app_resp.application_id;
            this.application_code = this.app_resp.application_code;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }


  onPermitsApplicationPrint() {


  }
  submissionsTermscheckbox(e) {
   
    this.termscheckbox = e.value;

  }

  onPermitsApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route =  this.app_route  = this.funcREturnApplicationDashboardROute();
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_importexport_applications', this.app_route,this.onApplicationSubmissionFrm.value);
    
  }
  onLoadPermitProductsData(application_code) {
    let product_basepath = ''
    if(this.sub_module_id == 86){
        product_basepath = 'getpersonalAuthorisedProductsData';
    }
    else{
      product_basepath = 'getPermitProductsDetails';
    }
    this.spinner.show();
    this.appService.getPermitsOtherDetails({'application_code': application_code }, product_basepath)
      .subscribe(
        data => {
          if (data.success) {
            this.permitProductsData = data.data;
            if(this.permitProductsData.length > 0){
              this.isprodnextdisable = false;
            }
            else{
              this.isprodnextdisable = true;
            }
            
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
  
  onLoadregulatedProductsPermitData() {
    this.spinner.show();

    this.appService.getPermitsOtherDetails({},'getregulatedProductsPermitData')
      .subscribe(
        data => {
          if (data.success) {

            this.regulatedProductsPermitData = data.data;

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
  
 
  OnReloadPermitProducts(){

let me = this;
        this.registeredProductsData.store = new CustomStore({
          load: function (loadOptions: any) {
         
              var params = '?';
              params += 'skip=' + loadOptions.skip;
              params += '&take=' + loadOptions.take;//searchValue
              var headers = new HttpHeaders({
                "Accept": "application/json",
                "Authorization": "Bearer " + me.authService.getAccessToken(),
              });
              this.configData = {
                headers: headers,
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, table_name: 'registered_products', 'module_id': me.module_id, 'sub_module_id': me.sub_module_id,section_id:me.section_id,trader_id:me.trader_id, mistrader_id:me.mistrader_id}
              };
              return me.httpClient.get(AppSettings.base_url + 'importexportapp/getRegisteredNonRegisteredProducts',this.configData)
                        .toPromise()
                        .then((data: any) => {
                            return {
                                data: data.data,
                                totalCount: data.totalCount
                            }
                        })
                        .catch(error => {
                           throw 'Data Loading Error' 
                        });
          }
      });
  }

  onApplicationDocumentToolbar(e) {
    this.functDataGridToolbar(e, this.funAddApplicationUploadDetails, 'Upload Document');

  }
  funAddApplicationUploadDetails() {
    this.isDocumentUploadPopupVisible = true;

  }
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
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
  }

  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  onPremisesPerGridToolbar(e) {
    this.functDataGridToolbar(e, this.nullFunc, '');
  }
  nullFunc() {

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
  
  public prepareSave(): any {
    let input = new FormData();
    input.append('document_requirement_id', this.documentUploadfrm.get('document_requirement_id').value);
    input.append('file', this.documentUploadfrm.get('file').value);
    input.append('id', this.documentUploadfrm.get('id').value);
    input.append('node_ref', this.documentUploadfrm.get('node_ref').value);

    return input;
  }
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.documentUploadfrm.get('file').setValue(file);
    }
  }


  funcValidatePermitProductDetails(validation_title, nextStep) {
    let product_table = 'wb_permits_products';
    if(this.sub_module_id == 86){
      product_table = 'wb_personauthorised_products';
    }

    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.application_code,validation_title,product_table)
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

  }
  onLoadproductCategoryData() {
    var data = {
      table_name: 'par_permit_product_categories',
      
    
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productCategoryData = data;
        });
  }

  onLoaddevicesTypeData(section_id) {
    //
    var data = {
      table_name: 'par_device_types',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.devicesTypeData = data;
        });
  }
  funAddNewPermitProducts(){
    this.isnewproductAddWinVisible = true;
  }
 
  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      return;
    }
   
    //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value, 'onSavePrecheckingqueryresponse')
      .subscribe(
        response => {
          this.app_resp = response.json();
          if (this.app_resp.success) {
            this.toastr.success(this.app_resp.message, 'Response');
            this.funcReloadQueriesDetails();
            
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  } funcInitQueryResponse(data) {
  
    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;
    
    this.isInitalQueryResponseFrmVisible = true;
  
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
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
 
  funcValidatePermitdetails(previous_step,direction){
    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
          
          return;
        }
    }
    
  }
  
  funcValidateNavPermitDocumentsDetails(nextStep,direction) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_importexport_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (!response_data.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
          
         
          this.toastr.error(response_data.message, 'Response');
          return;
        }
        
        this.spinner.hide();
      });
    

  }
  funcValidateNavPermitProductDetails(nextStep,direction) {
    let product_table = 'wb_permits_products';
    if(this.sub_module_id == 86){
      product_table = 'wb_personauthorised_products';
    }
    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.application_code,'Invoice Product details',product_table)
      .subscribe(
        response => {
        if (!response.success) {
          this.toastr.error('Add the Invoice Product details to proceed', 'Alert');
       this.wizard.model.navigationMode.goToStep(nextStep);
          
          
          return;
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.message, 'Alert');
        this.spinner.hide();
      });
  }
  validateSubmissionApplicationDetails(direction: WizardComponent){
        let step=0
        this.funcValidatePermitdetails(step,direction);
        this.funcValidateNavPermitProductDetails(step+1,direction);
        
        this.funcValidateNavPermitDocumentsDetails(step+2,direction);


  }
  validateApplicationDetails(direction: WizardComponent){
   
    this.funcValidatePermitdetails(0,direction);
   
}
  validateProdApplicationDetails(direction: WizardComponent){
      let step = 0;
       this.funcValidatePermitdetails(step,direction);
        this.funcValidateNavPermitProductDetails(step+1,direction);
        
  }
  
}
