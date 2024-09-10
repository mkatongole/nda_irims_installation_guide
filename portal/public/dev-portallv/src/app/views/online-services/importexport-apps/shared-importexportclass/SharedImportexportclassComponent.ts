import { Component, OnInit, ViewChild, ViewContainerRef,ChangeDetectorRef  } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-shared-importexportclass',
  templateUrl: './shared-importexportclass.component.html',
  styleUrls: ['./shared-importexportclass.component.css']
})
export class SharedImportexportclassComponent implements OnInit {
  //ImportexportService
  //dms 
  @ViewChild(DxDataGridComponent)
  appuploaded_document_id: number;
  trader_id: number;
  mistrader_id: number;
  dataGrid: DxDataGridComponent;
  productApplicationProcessingData: any;
  isPreviewApplicationProcessing: boolean = false;
  deviceTypeData: any;
  dosageFormData: any;
  verificationData: any;

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  product_resp: any; confirmDataParam: any;
  applicationGeneraldetailsfrm: FormGroup;
  newPremisesPersonnelDetailsFrm: FormGroup;
  documentUploadfrm: FormGroup;
  permitProductsFrm: FormGroup;
  narcoticProductsFrm: FormGroup;
  regulatedProductsPermitData: any;
  common_name_id: number;
  paying_currency_id:number;
  sectionsData: any;
  zoneData: any;
  permit_product_id: number;
  isUploadedInvoiceProductsWin: boolean;
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
  declaration_application_code: number;
  vc_application_type_id: number;
  product_category_id: number;
  port_id: number;
  is_registered: number;
  tracking_no: string;
  status_name: string;
  module_id: number = 4;
  licence_type_id: number;
  business_type_id:number;
  country_oforigin_id: number;
  product_classification_id: number;
  importation_reason_id: number;
  app_route: any;
  applicationTypeData: any;
  premiseTypeData: any;
  premiseClassData: any;
  applicationCategoryData: any;
  applicationTypeCategoryData: any;
  permitReasonData: any;
  portOfEntryExitData: any;
  payingCurrencyData: any;
  consigneeOptionsData: any;
  businessTypeData: any;
  modeOfTransportData: any;
  declaredProductsData: any;
  declarationpermitProductsData:any;
  classcategoryData:any;
  productClassData:any;
  importationReasonData: any;
  licenceTypeData: any;
   productCategoryData: any;
   productImportationCategoryData: any;

  termscheckbox: boolean = false;
  app_resp: any;
  consignee_options_id: number;
  consignee_options_check: boolean = true;

  isPermitproductsPopupVisible: boolean = false;
  is_surgicalReadOnly: boolean = false;
  is_not_surgicalReadOnly: boolean = true;
  isDocumentUploadPopupVisible: boolean = false;

  loading: boolean = true;
  terms_conditions: any;

  countries: any;
  regions: any;
  districts: any;
  senderReceiverData: any = {};
  ispremisesSearchWinVisible: boolean = false;
  issenderreceiverSearchWinVisible: boolean = false;
  issenderreceiverAddWinVisible: boolean = false;
  registered_premisesData: any = {};
  permitReceiverSenderFrm: FormGroup;
  productGeneraldetailsfrm: FormGroup;
  productBatchdetailsfrm: FormGroup;
 isManufacturerPopupVisible: boolean;
  consignee_sendertitle: string;
  checkifsenderreceiver: boolean;
 is_registered_premise : boolean = false;
 is_importation: boolean = false;
  has_registered_premises:number;

  document_previewurl: any;
  isDocumentPreviewDownloadwin: boolean = false;
  isDocumentVersionPreviewDownloadwin: boolean = false;
  isAddNewManufacturingSite:boolean = false;
  documentsVersionsUploadData: any;
  documentsUploadData: any;
  documentsUploadRequirementData: any;

  permitProductsData: any;
  permitdeclarationProductsData:any;
  permitUploadedProductsData: any;
  registeredProductsData: any = {};
  commonNamesData: any;
  devicesTypeData: any;
  device_type_visible: boolean = false;
  import_typecategory_visible: boolean = false;
  isPermitproductsAddPopupVisible: boolean = false;
  currencyData: any;
  weightsUnitData: any;
  packagingUnitsData: any;
  LicencedproductRangeData: any;
  siUnitsData: any;
  vcApplicationTypeData: any;
  registrationLevelData: any;
  classificationData: any;
  quantity: number = 1;
  no_of_packs_tertiary: number = 1;
  no_of_packs_secondary: number = 1;
  mode_oftransport_id:number;
  no_of_packs: number;
  no_of_units: number;
  verification_fee_percent: number;
  initWizardPanel:number = 0
  unit_price: number;
  isnewproductAddWinVisible: boolean = false;
  enabled_newproductadd: boolean = false;
  showProductAddOption: boolean = false;
  is_regulatedproducts: boolean = false;
  proforma_currency_id: number;
  isInitalQueryResponseFrmVisible: boolean = false;
  initqueryresponsefrm: FormGroup;
  applicationPreckingQueriesData: any;
  query_sectioncheck: string;
  onApplicationSubmissionFrm: FormGroup;
  permitProductsCategoryData: any;
  has_invoicegeneration: boolean=false;
  app_routing: any;
  isprodnextdisable: boolean = true;

  filesToUpload: Array<File> = [];
  constructor(public utilityService: Utilities,private cdr: ChangeDetectorRef,public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService, public httpClient: HttpClient, public appProdService: ProductApplicationService) {
  
    //form 
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.application_details = this.appService.getApplicationDetail();

    console.log(this.sub_module_id);

    if (!this.application_details) {
      // this.router.navigate(['./../online-services/importvisa-dashboard']);
      //return
    }
    else {

      this.sub_module_id = this.application_details.sub_module_id;
      this.process_title = this.application_details.process_title;
      this.section_id = this.application_details.section_id;
      this.licence_type_id = this.application_details.licence_type_id;
      this.business_type_id = this.application_details.business_type_id;
      this.has_registered_premises = this.application_details.has_registered_premises;
      this.importation_reason_id = this.application_details.importation_reason_id;
      this.product_classification_id = this.application_details.product_classification_id;
      this.vc_application_type_id = this.application_details.vc_application_type_id;
      this.product_category_id = this.application_details.product_category_id;
      this.port_id = this.application_details.port_id;
      this.is_registered = this.application_details.is_registered;

      this.application_id = this.application_details.application_id;
      this.tracking_no = this.application_details.tracking_no;

      this.status_name = this.application_details.status_name;
      this.status_id = this.application_details.application_status_id;
      this.application_code = this.application_details.application_code;
      this.declaration_application_code = this.application_details.declaration_application_code;
      this.proforma_currency_id = this.application_details.proforma_currency_id;


    }
    this.funcREturnApplicationDashboardROute();
    if (this.sub_module_id == 49) {
      this.applicationGeneraldetailsfrm = new FormGroup({
        section_id: new FormControl(this.section_id, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        permit_category_id: new FormControl('', Validators.compose([])),
        permit_productscategory_id: new FormControl('', Validators.compose([])),
        permit_reason_id: new FormControl('', Validators.compose([])),
        port_id: new FormControl('', Validators.compose([])),
        proforma_invoice_no: new FormControl('', Validators.compose([Validators.required])),
        proforma_invoice_date: new FormControl('', Validators.compose([Validators.required])),
        entry_country_id: new FormControl('', Validators.compose([])),
        paying_currency_id: new FormControl('', Validators.compose([])),
        consignee_options_id: new FormControl('', Validators.compose([])),
        consignee_id: new FormControl('', Validators.compose([])),
        consignee_name: new FormControl('', Validators.compose([])),
        sender_receiver: new FormControl('', Validators.compose([])),
        sender_receiver_id: new FormControl('', Validators.compose([])),
        premises_name: new FormControl('', Validators.compose([])),
        manufacturer_name: new FormControl('', Validators.compose([])),
        premise_id: new FormControl('', Validators.compose([])),
        manufacturing_site_id: new FormControl('', Validators.compose([])),
        proposed_inspection_time: new FormControl('', Validators.compose([Validators.required])),
        zone_id: new FormControl('', Validators.compose([])),
        module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        device_type_id: new FormControl('', Validators.compose([])),
        import_typecategory_id: new FormControl('', Validators.compose([])),
        proforma_currency_id: new FormControl('', Validators.compose([])),
        mode_oftransport_id: new FormControl('', Validators.compose([])),
        reason_fornonregister_outlet: new FormControl('', Validators.compose([])),
        has_registered_outlets: new FormControl('', Validators.compose([])),
        eligible_importerscategory_id: new FormControl('', Validators.compose([])),
        eligible_importersdoctype_id: new FormControl('', Validators.compose([])),
        document_upload_id: new FormControl('', Validators.compose([])),
        has_submitted_outlets: new FormControl('', Validators.compose([])),
        technical_declaration_id: new FormControl('', Validators.compose([])),
        declaration_application_code: new FormControl(this.declaration_application_code, Validators.compose([])),
        pharmacist_id: new FormControl('', Validators.compose([])),
        td_application_type_id: new FormControl('', Validators.compose([])),
        agent_name: new FormControl('', Validators.compose([Validators.required])),
        clearing_agent_id: new FormControl('', Validators.compose([])),
        shipment_category_id: new FormControl('', Validators.compose([])),
        exit_date: new FormControl('', Validators.compose([])),
        consignment_status_id: new FormControl('', Validators.compose([])),
        submission_date: new FormControl('', Validators.compose([])),
        technical_declaration_no: new FormControl('', Validators.compose([])),
        importation_reason_id: new FormControl('', Validators.compose([])),
        product_category_id: new FormControl('', Validators.compose([])),
        shipment_date: new FormControl('', Validators.compose([])),
        proposed_inspection_date: new FormControl('', Validators.compose([Validators.required])),
        goods_location: new FormControl('', Validators.compose([])),
        clearing_agent_no: new FormControl('', Validators.compose([])),
        clearing_agent_email: new FormControl('', Validators.compose([])),
        clearing_agent_firm: new FormControl('', Validators.compose([])),
        package_no: new FormControl('', Validators.compose([])),
        custom_declaration_no: new FormControl('', Validators.compose([Validators.required]))
      });



    }
    else if (this.sub_module_id == 12){
      this.applicationGeneraldetailsfrm = new FormGroup({
       section_id: new FormControl(this.section_id, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        permit_category_id: new FormControl('', Validators.compose([])),
        permit_productscategory_id: new FormControl('', Validators.compose([])),
        permit_reason_id: new FormControl('', Validators.compose([])),
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

        //business details
        tpin_no: new FormControl('', Validators.compose([])),
        tpin_id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([])),
        physical_address: new FormControl('', Validators.compose([])),
        company_registration_no: new FormControl('', Validators.compose([])),
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

    }else if (this.sub_module_id == 115){
      this.applicationGeneraldetailsfrm = new FormGroup({
       section_id: new FormControl(this.section_id, Validators.compose([])),
        sub_module_id: new FormControl(115, Validators.compose([Validators.required])),
        permit_category_id: new FormControl('', Validators.compose([])),
        permit_productscategory_id: new FormControl('', Validators.compose([])),
        permit_reason_id: new FormControl('', Validators.compose([])),
        port_id: new FormControl('', Validators.compose([Validators.required])),
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
       // physical_address: new FormControl('', Validators.compose([])),
        pharmacist_telephone: new FormControl('', Validators.compose([])),
        pharmacist_id: new FormControl('', Validators.compose([])),
        pharmacist_email: new FormControl('', Validators.compose([])),
        pharmacist_qualification: new FormControl('', Validators.compose([])),
        pharmacist_country_id: new FormControl('', Validators.compose([])),
        pharmacist_district_id: new FormControl('', Validators.compose([])),
        has_registered_premises: new FormControl('', Validators.compose([])),
        business_type_id: new FormControl('', Validators.compose([])),
        premise_id: new FormControl('', Validators.compose([])),
        zone_id: new FormControl('', Validators.compose([])),
        module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
        licence_type_id: new FormControl('', Validators.compose([])),
        importexport_product_range_id: new FormControl('', Validators.compose([])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        device_type_id: new FormControl('', Validators.compose([])),
        import_typecategory_id: new FormControl('', Validators.compose([])),
        shipment_category_id: new FormControl('', Validators.compose([Validators.required])),
        proforma_currency_id: new FormControl('', Validators.compose([])),
        mode_oftransport_id: new FormControl('', Validators.compose([Validators.required])),
        reason_fornonregister_outlet: new FormControl('', Validators.compose([])),
        has_registered_outlets: new FormControl('', Validators.compose([])),
        product_classification_id: new FormControl('', Validators.compose([])),
        eligible_importerscategory_id: new FormControl('', Validators.compose([])),
        eligible_importersdoctype_id: new FormControl('', Validators.compose([])),
        document_upload_id: new FormControl('', Validators.compose([])),
        has_submitted_outlets: new FormControl('', Validators.compose([])),
        shipment_date: new FormControl('', Validators.compose([Validators.required])),
        td_application_type_id: new FormControl('', Validators.compose([Validators.required])),
        pack_list_number: new FormControl('', Validators.compose([Validators.required])),
        commercial_invoice_date: new FormControl('', Validators.compose([Validators.required])),
        commercial_invoice_number: new FormControl('', Validators.compose([Validators.required])),
        agent_name: new FormControl('', Validators.compose([Validators.required])),
        clearing_agent_id: new FormControl('', Validators.compose([])),
        transport_document_number: new FormControl('', Validators.compose([Validators.required])),
        transport_document_id: new FormControl('', Validators.compose([Validators.required])),
        //vc

        importation_reason_id: new FormControl('', Validators.compose([])),
         clinical_trial_name: new FormControl('', Validators.compose([])),
        clinical_trial_id: new FormControl('', Validators.compose([])),
        government_grant_id: new FormControl('', Validators.compose([])),
        product_category_id:  new FormControl('', Validators.compose([])),
        vc_application_type_id: new FormControl('', Validators.compose([])),
        importer_licence_number: new FormControl('', Validators.compose([])),
        applicant_as_consignee: new FormControl('', Validators.compose([])),
        is_registered: new FormControl('', Validators.compose([])),
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

        proposed_inspection_date: new FormControl('', Validators.compose([])),
        clearing_agent: new FormControl('', Validators.compose([])),
        custom_declaration_no: new FormControl('', Validators.compose([]))
      });

    }

    else {
      this.applicationGeneraldetailsfrm = new FormGroup({
       section_id: new FormControl(this.section_id, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        permit_category_id: new FormControl('', Validators.compose([])),
        permit_productscategory_id: new FormControl('', Validators.compose([])),
        permit_reason_id: new FormControl('', Validators.compose([])),
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
       // physical_address: new FormControl('', Validators.compose([])),
        pharmacist_telephone: new FormControl('', Validators.compose([])),
        pharmacist_email: new FormControl('', Validators.compose([])),
        pharmacist_qualification: new FormControl('', Validators.compose([])),
        pharmacist_country_id: new FormControl('', Validators.compose([])),
        pharmacist_district_id: new FormControl('', Validators.compose([])),
        has_registered_premises: new FormControl('', Validators.compose([])),
        pharmacist_id: new FormControl('', Validators.compose([])),
        manufacturing_site_name: new FormControl('', Validators.compose([])),
        manufacturing_site_id: new FormControl('', Validators.compose([])),
        business_type_id: new FormControl('', Validators.compose([])),
        premise_id: new FormControl('', Validators.compose([])),
        zone_id: new FormControl('', Validators.compose([])),
        module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
        licence_type_id: new FormControl('', Validators.compose([])),
        importexport_product_range_id: new FormControl('', Validators.compose([Validators.required])),
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
        declaration_application_code: new FormControl(this.declaration_application_code, Validators.compose([])),
        // prodmanufacuredsection_id: new FormControl(this.module_id, Validators.compose([])),

        //business details
        tpin_no: new FormControl('', Validators.compose([])),
        tpin_id: new FormControl('', Validators.compose([])),
         clinical_trial_name: new FormControl('', Validators.compose([])),
        clinical_trial_id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([])),
        physical_address: new FormControl('', Validators.compose([])),
        company_registration_no: new FormControl('', Validators.compose([])),
        // incharge_telephone: new FormControl('', Validators.compose([])),
        email: new FormControl('', Validators.compose([])),
        government_grant_id: new FormControl('', Validators.compose([])),
        technical_declaration_id: new FormControl('', Validators.compose([])),
        importation_reason_id: new FormControl('', Validators.compose([])),
        product_category_id: new FormControl('', Validators.compose([])),
        shipment_date: new FormControl('', Validators.compose([])),
        proposed_inspection_date: new FormControl('', Validators.compose([])),
        clearing_agent: new FormControl('', Validators.compose([])),
        clearing_agent_no: new FormControl('', Validators.compose([])),
        clearing_agent_email: new FormControl('', Validators.compose([])),
        clearing_agent_firm: new FormControl('', Validators.compose([])),
        custom_declaration_no: new FormControl('', Validators.compose([])),
        package_no: new FormControl('', Validators.compose([]))
      });

    }

    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      submission_comments: new FormControl('', Validators.compose([]))
    });

    this.newPremisesPersonnelDetailsFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([]))
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
      validity_period: new FormControl('', Validators.compose([Validators.required])),
      tin_no: new FormControl('', Validators.compose([]))
    });

    this.documentUploadfrm = this.fb.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });

    if (this.sub_module_id == 115) {

    this.permitProductsFrm = this.fb.group({
      product_registration_no: new FormControl('', Validators.compose([Validators.required])),
      gmdn_descriptor: new FormControl('', Validators.compose([])),
      gmdn_term: new FormControl('', Validators.compose([])),
      gmdn_id: new FormControl('', Validators.compose([])),
      common_name_id: new FormControl('', Validators.compose([Validators.required])),
      name_of_material: new FormControl('', Validators.compose([])),
      material_category: new FormControl('', Validators.compose([])),
      name_chemical_reference: new FormControl('', Validators.compose([])),
      equipment_name: new FormControl('', Validators.compose([])),
      equipment_purpose: new FormControl('', Validators.compose([])),
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      medical_device_class_type: new FormControl('', Validators.compose([])),
      gmdn_code: new FormControl('', Validators.compose([])),
      ingredient_id: new FormControl('', Validators.compose([])),
      dosage_form_id: new FormControl('', Validators.compose([])),
      product_strength: new FormControl('', Validators.compose([])),
      product_origin_id: new FormControl('', Validators.compose([])),
      si_unit_id: new FormControl('', Validators.compose([])),
      specification_type_id: new FormControl('', Validators.compose([])),
      quantity: new FormControl('', Validators.compose([])),
      units_for_quantity: new FormControl('', Validators.compose([Validators.required])),
      no_of_packs_tertiary: new FormControl(this.no_of_packs_tertiary, Validators.compose([])),
      no_of_packs_secondary: new FormControl(this.no_of_packs_secondary, Validators.compose([])),
      no_of_packs: new FormControl('', Validators.compose([])),
      registration_number: new FormControl('', Validators.compose([])),
      no_of_units: new FormControl('', Validators.compose([])),
      container_type_id: new FormControl('', Validators.compose([])),
      total_units: new FormControl('', Validators.compose([])),
      vc_quantity: new FormControl('', Validators.compose([])),
      unit_price: new FormControl('', Validators.compose([])),
      currency_id: new FormControl('', Validators.compose([])),
      verification_fee_percent: new FormControl('', Validators.compose([])),
      supplementary_value: new FormControl('', Validators.compose([Validators.required])),
      total_value: new FormControl('', Validators.compose([])),
      unitpack_size: new FormControl('', Validators.compose([])),
      pack_size: new FormControl('', Validators.compose([])),
      pack_price: new FormControl('', Validators.compose([])),
      vc_no: new FormControl('', Validators.compose([Validators.required])),
      shipped_qty_packs: new FormControl('', Validators.compose([Validators.required])),
      shipped_qty_units: new FormControl('', Validators.compose([Validators.required])),
      approved_qty: new FormControl('', Validators.compose([Validators.required])),
      qty_shipped: new FormControl('', Validators.compose([Validators.required])),
      no_of_batches: new FormControl('', Validators.compose([Validators.required])),
      no_of_shippers: new FormControl('', Validators.compose([Validators.required])),
      no_of_pallets: new FormControl('', Validators.compose([Validators.required])),
      declaration_quantity: new FormControl('', Validators.compose([])),
      total_weight: new FormControl('', Validators.compose([Validators.required])),
      declare_product_id: new FormControl('', Validators.compose([])),
      hs_code_id: new FormControl('', Validators.compose([Validators.required])),
      hs_code_description: new FormControl('', Validators.compose([Validators.required])),
      product_category_id: new FormControl(this.product_category_id, Validators.compose([])),
      port_id: new FormControl(this.port_id, Validators.compose([])),
      //product_batch_no: new FormControl('', Validators.compose([])),
      
      product_manufacturing_date: new FormControl('', Validators.compose([])),
      
      //unit_price: new FormControl(this.quantity, Validators.compose([Validators.required])),
      
      packaging_unit_id: new FormControl('', Validators.compose([])),
      //quantity: new FormControl(this.quantity, Validators.compose([Validators.required])),
      laboratory_no: new FormControl('', Validators.compose([])),
      regulated_prodpermit_id: new FormControl('', Validators.compose([])),
      prodcertificate_no: new FormControl('', Validators.compose([])),
      product_id: new FormControl('', Validators.compose([])),
      is_registered: new FormControl(this.is_registered, Validators.compose([])),
      unitpack_unit_id: new FormControl('', Validators.compose([])),
      
      weights_units_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      is_regulated_product: new FormControl('', Validators.compose([])),
      productphysical_description: new FormControl('', Validators.compose([])),
      manufacturer_id: new FormControl('', Validators.compose([])),
      generic_name_id: new FormControl('', Validators.compose([])),
      manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
      product_subcategory_id: new FormControl('', Validators.compose([])),
      productclassification_id: new FormControl('', Validators.compose([])),
      productdosage_id: new FormControl('', Validators.compose([])),
      consignment_quantity: new FormControl('', Validators.compose([])),
      approvedvisa_product_id: new FormControl('', Validators.compose([])),
      approvedlicense_product_id: new FormControl('', Validators.compose([])),
      licensebalance_quantity: new FormControl('', Validators.compose([])),


      certificate_of_conformity: null, //common_name_id 
    });
    }
    else if(this.sub_module_id == 12){
      this.permitProductsFrm = this.fb.group({
      product_registration_no: new FormControl('', Validators.compose([])),
      gmdn_descriptor: new FormControl('', Validators.compose([])),
      common_name_id: new FormControl('', Validators.compose([])),
      name_of_material: new FormControl('', Validators.compose([])),
      material_category: new FormControl('', Validators.compose([])),
      name_chemical_reference: new FormControl('', Validators.compose([])),
      equipment_name: new FormControl('', Validators.compose([])),
      equipment_purpose: new FormControl('', Validators.compose([])),
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      medical_device_class_type: new FormControl('', Validators.compose([])),
      gmdn_code: new FormControl('', Validators.compose([])),
      imported_product_id: new FormControl('', Validators.compose([])),
      ingredient_id: new FormControl('', Validators.compose([])),
      dosage_form_id: new FormControl('', Validators.compose([])),
      product_strength: new FormControl('', Validators.compose([])),
      product_origin_id: new FormControl('', Validators.compose([])),
      manufacturing_country_id: new FormControl('', Validators.compose([Validators.required])),
      si_unit_id: new FormControl('', Validators.compose([])),
      specification_type_id: new FormControl('', Validators.compose([])),
      quantity: new FormControl('', Validators.compose([])),
      units_for_quantity: new FormControl('', Validators.compose([Validators.required])),
      no_of_packs_tertiary: new FormControl(this.no_of_packs_tertiary, Validators.compose([])),
      pack_price: new FormControl('', Validators.compose([Validators.required])),
      no_of_packs: new FormControl('', Validators.compose([Validators.required])),
      hs_code_id: new FormControl('', Validators.compose([Validators.required])),
      gmdn_id: new FormControl('', Validators.compose([])),
      hs_code_description: new FormControl('', Validators.compose([Validators.required])),
      registration_number: new FormControl('', Validators.compose([])),
      no_of_units: new FormControl('', Validators.compose([Validators.required])),
      container_type_id: new FormControl('', Validators.compose([])),
      total_units: new FormControl('', Validators.compose([])),
      unit_price: new FormControl('', Validators.compose([Validators.required])),
      currency_id: new FormControl('', Validators.compose([Validators.required])),
      verification_fee_percent: new FormControl('', Validators.compose([])),
      total_value: new FormControl('', Validators.compose([Validators.required])),
      vc_quantity: new FormControl('', Validators.compose([])),
      unitpack_size: new FormControl('', Validators.compose([])),
      pack_size: new FormControl('', Validators.compose([Validators.required])),
      vc_no: new FormControl('', Validators.compose([])),
      approved_qty: new FormControl('', Validators.compose([])),
      product_category: new FormControl('', Validators.compose([])),
      qty_shipped: new FormControl('', Validators.compose([])),
      no_of_batches: new FormControl('', Validators.compose([])),
      batch_qty: new FormControl('', Validators.compose([])),
      product_batch_no: new FormControl('', Validators.compose([])),
      product_expiry_date: new FormControl('', Validators.compose([])),
      gmdn_term: new FormControl('', Validators.compose([])),
      product_category_id: new FormControl(this.product_category_id, Validators.compose([])),
      port_id: new FormControl(this.port_id, Validators.compose([])),
      product_manufacturing_date: new FormControl('', Validators.compose([])),
      packaging_unit_id: new FormControl('', Validators.compose([])),
      product_type_id: new FormControl('', Validators.compose([])),
      single_fixed_dose: new FormControl('', Validators.compose([])),
      classification: new FormControl('', Validators.compose([])),
      proprietary_name: new FormControl('', Validators.compose([])),
      class_category: new FormControl('', Validators.compose([Validators.required])),
      atcCodeData: new FormControl('', Validators.compose([])),
      atc_desciption: new FormControl('', Validators.compose([])),
      atc_code_id: new FormControl('', Validators.compose([])),
      therapeutic_group: new FormControl('', Validators.compose([])),
      distribution_category: new FormControl('', Validators.compose([])),
      route_of_administarion: new FormControl('', Validators.compose([])),
      //quantity: new FormControl(this.quantity, Validators.compose([Validators.required])),
      laboratory_no: new FormControl('', Validators.compose([])),
      regulated_prodpermit_id: new FormControl('', Validators.compose([])),
      prodcertificate_no: new FormControl('', Validators.compose([])),
      product_id: new FormControl('', Validators.compose([])),
      is_registered: new FormControl(this.is_registered, Validators.compose([])),
      unitpack_unit_id: new FormControl('', Validators.compose([])),
      total_weight: new FormControl('', Validators.compose([])),
      weights_units_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      is_regulated_product: new FormControl('', Validators.compose([])),
      productphysical_description: new FormControl('', Validators.compose([])),
      manufacturer_id: new FormControl('', Validators.compose([])),
      generic_name_id: new FormControl('', Validators.compose([])),
      manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
      product_subcategory_id: new FormControl('', Validators.compose([])),
      productclassification_id: new FormControl('', Validators.compose([])),
      productdosage_id: new FormControl('', Validators.compose([])),
      consignment_quantity: new FormControl('', Validators.compose([])),
      approvedvisa_product_id: new FormControl('', Validators.compose([])),
      approvedlicense_product_id: new FormControl('', Validators.compose([])),
      licensebalance_quantity: new FormControl('', Validators.compose([])),


      certificate_of_conformity: null,
    });

    }else{
      this.permitProductsFrm = this.fb.group({
        product_registration_no: new FormControl('', Validators.compose([Validators.required])),
        gmdn_descriptor: new FormControl('', Validators.compose([])),
        common_name_id: new FormControl('', Validators.compose([])),
        name_of_material: new FormControl('', Validators.compose([])),
        material_category: new FormControl('', Validators.compose([])),
        name_chemical_reference: new FormControl('', Validators.compose([])),
        equipment_name: new FormControl('', Validators.compose([])),
        equipment_purpose: new FormControl('', Validators.compose([])),
        brand_name: new FormControl('', Validators.compose([Validators.required])),
        medical_device_class_type: new FormControl('', Validators.compose([])),
        gmdn_code: new FormControl('', Validators.compose([])),
        ingredient_id: new FormControl('', Validators.compose([])),
        dosage_form_id: new FormControl('', Validators.compose([Validators.required])),
        product_strength: new FormControl('', Validators.compose([Validators.required])),
        product_origin_id: new FormControl('', Validators.compose([Validators.required])),
        si_unit_id: new FormControl('', Validators.compose([Validators.required])),
        specification_type_id: new FormControl('', Validators.compose([])),
        quantity: new FormControl('', Validators.compose([Validators.required])),
        units_for_quantity: new FormControl('', Validators.compose([Validators.required])),
        no_of_packs_tertiary: new FormControl(this.no_of_packs_tertiary, Validators.compose([Validators.required])),
        no_of_packs_secondary: new FormControl(this.no_of_packs_secondary, Validators.compose([Validators.required])),
        no_of_packs: new FormControl('', Validators.compose([Validators.required])),
        registration_number: new FormControl('', Validators.compose([])),
        no_of_units: new FormControl('', Validators.compose([Validators.required])),
        container_type_id: new FormControl('', Validators.compose([Validators.required])),
        total_units: new FormControl('', Validators.compose([])),
        unit_price: new FormControl('', Validators.compose([Validators.required])),
        currency_id: new FormControl('', Validators.compose([Validators.required])),
        verification_fee_percent: new FormControl('', Validators.compose([Validators.required])),
        total_value: new FormControl('', Validators.compose([Validators.required])),
        vc_quantity: new FormControl('', Validators.compose([])),
        unitpack_size: new FormControl('', Validators.compose([])),
        vc_no: new FormControl('', Validators.compose([])),
        approved_qty: new FormControl('', Validators.compose([])),
        qty_shipped: new FormControl('', Validators.compose([])),
        no_of_batches: new FormControl('', Validators.compose([])),
        batch_qty: new FormControl('', Validators.compose([])),
        product_batch_no: new FormControl('', Validators.compose([])),
        product_expiry_date: new FormControl('', Validators.compose([])),

        product_category_id: new FormControl(this.product_category_id, Validators.compose([])),
        port_id: new FormControl(this.port_id, Validators.compose([])),
        
        product_manufacturing_date: new FormControl('', Validators.compose([])),
        pack_size: new FormControl('', Validators.compose([])),
        
        packaging_unit_id: new FormControl('', Validators.compose([])),
        co_pack: new FormControl('', Validators.compose([])),
        single_fixed_dose: new FormControl('', Validators.compose([])),
        classification: new FormControl('', Validators.compose([])),
        proprietary_name: new FormControl('', Validators.compose([])),
        class_category: new FormControl('', Validators.compose([])),
        atcCodeData: new FormControl('', Validators.compose([])),
        atc_desciption: new FormControl('', Validators.compose([])),
        atc_code_id: new FormControl('', Validators.compose([])),
        therapeutic_group: new FormControl('', Validators.compose([])),
        distribution_category: new FormControl('', Validators.compose([])),
        route_of_administarion: new FormControl('', Validators.compose([])),
        //quantity: new FormControl(this.quantity, Validators.compose([Validators.required])),
        laboratory_no: new FormControl('', Validators.compose([])),
        regulated_prodpermit_id: new FormControl('', Validators.compose([])),
        prodcertificate_no: new FormControl('', Validators.compose([])),
        product_id: new FormControl('', Validators.compose([])),
        is_registered: new FormControl(this.is_registered, Validators.compose([])),
        unitpack_unit_id: new FormControl('', Validators.compose([])),
        total_weight: new FormControl('', Validators.compose([])),
        weights_units_id: new FormControl('', Validators.compose([])),
        id: new FormControl('', Validators.compose([])),
        is_regulated_product: new FormControl('', Validators.compose([])),
        productphysical_description: new FormControl('', Validators.compose([])),
        manufacturer_id: new FormControl('', Validators.compose([])),
        generic_name_id: new FormControl('', Validators.compose([])),
        manufacturer_name: new FormControl('', Validators.compose([])),
        product_subcategory_id: new FormControl('', Validators.compose([])),
        productclassification_id: new FormControl('', Validators.compose([])),
        productdosage_id: new FormControl('', Validators.compose([])),
        consignment_quantity: new FormControl('', Validators.compose([])),
        approvedvisa_product_id: new FormControl('', Validators.compose([])),
        approvedlicense_product_id: new FormControl('', Validators.compose([])),
        licensebalance_quantity: new FormControl('', Validators.compose([])),


        certificate_of_conformity: null,
      });

    }

      this.narcoticProductsFrm = this.fb.group({
      product_registration_no: new FormControl('', Validators.compose([])),
      gmdn_descriptor: new FormControl('', Validators.compose([])),
      common_name_id: new FormControl('', Validators.compose([])),
      scheduled_number: new FormControl('', Validators.compose([Validators.required])),
      convertion_factor: new FormControl('', Validators.compose([])),
      controlled_substance_id: new FormControl('', Validators.compose([Validators.required])),
      controlled_substance_schedule: new FormControl('', Validators.compose([Validators.required])),
      total_narcotic_base: new FormControl('', Validators.compose([Validators.required])),
      total_narcotic_units: new FormControl('', Validators.compose([Validators.required])),
      packs_per_tertiary_pack: new FormControl('', Validators.compose([Validators.required])),
      total_salt_quantity: new FormControl('', Validators.compose([Validators.required])), 
      name_of_material: new FormControl('', Validators.compose([])),
      material_category: new FormControl('', Validators.compose([])),
      name_chemical_reference: new FormControl('', Validators.compose([])),
      equipment_name: new FormControl('', Validators.compose([])),
      equipment_purpose: new FormControl('', Validators.compose([])),
      brand_name: new FormControl('', Validators.compose([])),
      medical_device_class_type: new FormControl('', Validators.compose([])),
      gmdn_code: new FormControl('', Validators.compose([])),
      ingredient_id: new FormControl('', Validators.compose([])),
      dosage_form_id: new FormControl('', Validators.compose([])),
      product_strength: new FormControl('', Validators.compose([Validators.required])),
      product_origin_id: new FormControl('', Validators.compose([Validators.required])),
      si_unit_id: new FormControl('', Validators.compose([Validators.required])),
      specification_type_id: new FormControl('', Validators.compose([])),
      quantity: new FormControl('', Validators.compose([])),
      units_for_quantity: new FormControl('', Validators.compose([])),
      no_of_packs_tertiary: new FormControl(this.no_of_packs_tertiary, Validators.compose([Validators.required])),
      no_of_packs_secondary: new FormControl(this.no_of_packs_secondary, Validators.compose([Validators.required])),
      no_of_packs: new FormControl('', Validators.compose([])),
      registration_number: new FormControl('', Validators.compose([])),
      no_of_units: new FormControl('', Validators.compose([])),
      container_type_id: new FormControl('', Validators.compose([])),
      total_units: new FormControl('', Validators.compose([])),
      currency_id: new FormControl('', Validators.compose([])),
      verification_fee_percent: new FormControl('', Validators.compose([])),
      total_value: new FormControl('', Validators.compose([])),
      vc_quantity: new FormControl('', Validators.compose([])),
      unitpack_size: new FormControl('', Validators.compose([])),
      vc_no: new FormControl('', Validators.compose([])),
      approved_qty: new FormControl('', Validators.compose([])),
      qty_shipped: new FormControl('', Validators.compose([])),
      no_of_batches: new FormControl('', Validators.compose([])),
      batch_qty: new FormControl('', Validators.compose([])),
      product_batch_no: new FormControl('', Validators.compose([])),
      product_expiry_date: new FormControl('', Validators.compose([])),

      product_category_id: new FormControl(this.product_category_id, Validators.compose([])),
      port_id: new FormControl(this.port_id, Validators.compose([])),
      
      product_manufacturing_date: new FormControl('', Validators.compose([Validators.required])),
      
      //unit_price: new FormControl(this.quantity, Validators.compose([Validators.required])),
      
      packaging_unit_id: new FormControl('', Validators.compose([])),
      co_pack: new FormControl('', Validators.compose([])),
      single_fixed_dose: new FormControl('', Validators.compose([])),
      classification: new FormControl('', Validators.compose([])),
      proprietary_name: new FormControl('', Validators.compose([])),
      class_category: new FormControl('', Validators.compose([])),
      atcCodeData: new FormControl('', Validators.compose([])),
      atc_desciption: new FormControl('', Validators.compose([])),
      atc_code_id: new FormControl('', Validators.compose([])),
      therapeutic_group: new FormControl('', Validators.compose([])),
      distribution_category: new FormControl('', Validators.compose([])),
      route_of_administarion: new FormControl('', Validators.compose([])),
      //quantity: new FormControl(this.quantity, Validators.compose([Validators.required])),
      laboratory_no: new FormControl('', Validators.compose([])),
      regulated_prodpermit_id: new FormControl('', Validators.compose([])),
      prodcertificate_no: new FormControl('', Validators.compose([])),
      product_id: new FormControl('', Validators.compose([])),
      is_registered: new FormControl(this.is_registered, Validators.compose([])),
      unitpack_unit_id: new FormControl('', Validators.compose([])),
      total_weight: new FormControl('', Validators.compose([])),
      weights_units_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      is_regulated_product: new FormControl('', Validators.compose([])),
      productphysical_description: new FormControl('', Validators.compose([])),
      manufacturer_id: new FormControl('', Validators.compose([])),
      generic_name_id: new FormControl('', Validators.compose([])),
      manufacturer_name: new FormControl('', Validators.compose([])),
      product_subcategory_id: new FormControl('', Validators.compose([])),
      productclassification_id: new FormControl('', Validators.compose([])),
      productdosage_id: new FormControl('', Validators.compose([])),
      consignment_quantity: new FormControl('', Validators.compose([])),
      approvedvisa_product_id: new FormControl('', Validators.compose([])),
      approvedlicense_product_id: new FormControl('', Validators.compose([])),
      licensebalance_quantity: new FormControl('', Validators.compose([])),


      certificate_of_conformity: null,
    });

    

    this.productBatchdetailsfrm = new FormGroup({
      batch_qty: new FormControl('', Validators.compose([Validators.required])),
      product_batch_no: new FormControl('', Validators.compose([Validators.required])),
      batch_units: new FormControl('', Validators.compose([Validators.required])),
      product_manufacturing_date: new FormControl('', Validators.compose([Validators.required])),
      product_expiry_date: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      product_id: new FormControl('', Validators.compose([])),
      
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
    if (this.sub_module_id == 12 || this.sub_module_id == 81 || this.sub_module_id == 115 || this.sub_module_id == 49) {

      this.enabled_newproductadd = true;

    } else if (this.sub_module_id == 82 || this.sub_module_id == 78) {

      this.enabled_newproductadd = false;

    } else {

      this.enabled_newproductadd = false;

    }

    if (this.status_id < 1) {
      this.status_name = "New";
    }

   // this.updateFormValidators();

    this.funcAutoLoadedParamters();

    this.onLoadPermitProductsData(this.application_code);
    this.onLoadDeclarationPermitProductsData(this.application_code);
    this.onLoadDeclarationProductsData(this.application_code)
    this.onLoadclasscategoryData(this.product_category_id);

    if (this.section_id == 4) {
      this.device_type_visible = true;
    }

    this.import_typecategory_visible = true;


    this.funcReloadQueriesDetails();
    /*  if(this.sub_module_id == 13 || this.sub_module_id == 14 || this.sub_module_id == 15){
        this.applicationGeneraldetailsfrm.get('premises_name').setValidators([]);
        this.applicationGeneraldetailsfrm.get('premise_id').setValidators([]);
      }
      else{
         this.applicationGeneraldetailsfrm.get('premises_name').setValidators([Validators.required]);
         this.applicationGeneraldetailsfrm.get('premise_id').setValidators([Validators.required]);
      }
      */
    if (this.has_registered_premises === 1 || this.has_registered_premises == 1) {
          this.is_registered_premise = true;
        } 

        this.is_importation = false;
        if (this.vc_application_type_id === 1 || this.vc_application_type_id == 1) {
          this.is_importation = true;
        } 

    if (this.sub_module_id == 12 ) {
      this.applicationGeneraldetailsfrm.get('product_classification_id').setValidators([Validators.required]);
      this.has_invoicegeneration = true;
      console.log(this.has_invoicegeneration);
    }

    if(this.sub_module_id == 81 || this.sub_module_id == 82){
         if(this.is_registered_premise){
            this.has_invoicegeneration = true;
          }else{
            this.has_invoicegeneration = false;

          }
        this.applicationGeneraldetailsfrm.get('product_classification_id').setValidators([Validators.required]);

    }

  }

// updateFormValidators() {
//     if (this.product_category_id == 9) {
//         this.setValidators(['gmdn_code', 'gmdn_term', 'gmdn_descriptor', 'medical_device_class_type', 'no_of_units']);
//         this.clearValidators(['common_name_id', 'standard', 'ingredient_id', 'dosage_form_id', 'product_strength', 'si_unit_id']);
//         this.is_surgicalReadOnly = true;
//         this.is_not_surgicalReadOnly = false;

//     } else {
//         this.clearValidators(['gmdn_code', 'gmdn_term', 'gmdn_descriptor', 'medical_device_class_type', 'no_of_units']);
//         this.setValidators(['common_name_id', 'standard', 'ingredient_id', 'dosage_form_id', 'product_strength', 'si_unit_id']);
//             this.is_surgicalReadOnly = false;
//             this.is_not_surgicalReadOnly = true;

//     }


// }
// setValidators(controls: string[]) {
//     controls.forEach(control => {
//         const formControl = this.permitProductsFrm.get(control);
//         if (formControl) {
//             formControl.setValidators([Validators.required]);
//             formControl.updateValueAndValidity();
//         }
//     });
// }

// clearValidators(controls: string[]) {
//     controls.forEach(control => {
//         const formControl = this.permitProductsFrm.get(control);
//         if (formControl) {
//             formControl.clearValidators();
//             formControl.updateValueAndValidity();
//         }
//     });
// }


  funcAutoLoadedParamters() {
    this.onLoadconsigneeOptionsData();
    this.onLoadmodeOfTransportData();
    this.onLoadpayingCurrencyData();
    this.onLoadportOfEntryExitData(this.mode_oftransport_id);

    this.onLoadDeviceTypeData();
    this.onLoadpermitReasonData(this.section_id);
    this.onLoadapplicationCategoryData(this.section_id);
    this.onLoadapplicationTypeCategoryData(this.section_id);
    //this.onloadApplicationTypes();
    this.onLoadClassifications(this.section_id);
    this.onLoadPackagingUnitsData(this.section_id);
    this.onLoadsiUnitsData(this.section_id);
    this.onLoadWeightsData(this.section_id);
    this.onLoadImportReasons(this.business_type_id, this.licence_type_id);
    this.onLoadLicenceProductRangeData(this.business_type_id , this.licence_type_id, this.product_classification_id); 
    //this.onLoadVerificationData(this.business_type_id , this.licence_type_id, this.importation_reason_id, this.product_category_id, this.is_registered, this.country_oforigin_id);

    this.onLoadZones();
    this.onLoadSections();
    this.onLoadDosageFormData();
    this.onLoadImportExportProductClassifiction();
    this.onLoadpermitProductsCategoryData(0);
    this.onLoadconfirmDataParm();
    this.onLoadCommonNames(this.section_id);
    this.onLoadImportExportGuidelines(this.sub_module_id, this.licence_type_id);
    this.onLoadvcApplicationData();
    this.onLoadImportRegistrationLevelData();
    this.onLoadBusinessType();
    this.onLoadLicenceType();
    this.onLoadApplicationType();

    this.onLoadproductCategoryData(this.section_id);
    this.onLoaddevicesTypeData(this.section_id);

    if (this.application_details) {
      this.applicationGeneraldetailsfrm.patchValue(this.application_details);
    }

    this.onLoadCountries();
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

  onLoadImportExportProductClassifiction() {
    var data = {
      table_name: 'par_premise_class',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productClassData = data;
        });
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

  onLoadLicenceProductRangeData(business_type_id , licence_type_id, product_classification_id) {
    this.configService.onLoadProductRangeDetails(business_type_id, licence_type_id, product_classification_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.LicencedproductRangeData = data.data;
        },
        error => {
          return false;
        });
  }

    onLoadBusinessType(){
    var data = {
     table_name: 'par_business_types',
   };
   this.configService.onLoadConfigurationData(data)
     .subscribe(
       data => {
         this.businessTypeData = data;
       });

 }
   onLoadLicenceType() {
    var data = {
      table_name: 'par_licence_type',
   
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.licenceTypeData = data;
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

  onLoadvcApplicationData() {
    var data = {
      table_name: 'par_vc_application_type',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.vcApplicationTypeData = data;
        });
  }
  onLoadImportReasons(business_type_id, licence_type_id) {
     this.appService.onLoadImportationReasonsDetails(business_type_id, licence_type_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.importationReasonData = data.data;
        },
        error => {
          return false;
        });
  } 

   
  // onLoadImportCategoryData(importation_reason_id) {
  //  this.configService.onLoadImportCategoryDetails(importation_reason_id)
  //     //.pipe(first())
  //     .subscribe(
  //       data => {
  //         this.productCategoryData = data.data;
  //       },
  //       error => {
  //         return false;
  //       });
  // }

  // onLoadImportCategoryData(importation_reason_id) {
  //   var data = {
  //     table_name: 'par_importexport_product_category',
  //     importation_reason_id: importation_reason_id
  //   };

  //   this.configService.onLoadConfigurationData(data)
  //     .subscribe(
  //       data => {
  //         this.productCategoryData = data;
  //       });
  // }


  funcReloadQueriesDetails() {

    this.funcgetPreckingQueriesData();

  }
  funcgetPreckingQueriesData() {

    this.utilityService.getApplicationPreQueriesDetails(this.application_code, 'wb_importexport_applications', 'application_status_id', 'utilities/getApplicationQueriesData')
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

  onIsREguatedProdulctsSelect($event) {
    if ($event.selectedItem.id == 1) {
      this.is_regulatedproducts = false;

    }
    else {

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

  onLoadImportExportGuidelines(sub_module_id, licence_type_id) {
    this.configService.onLoadImportExportAppSubmissionGuidelines(sub_module_id, licence_type_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.terms_conditions = data.data;
        },
        error => {
          return false;
        });
  }
  onApplicationDashboard() {
    this.app_route = this.funcREturnApplicationDashboardROute();

    this.router.navigate(this.app_route);
  }
  funcREturnApplicationDashboardROute() {
   
   if (this.sub_module_id == 12) {
      this.app_routing = ['./online-services/importvc-dashboard'];

    }
    else if (this.sub_module_id == 78 || this.sub_module_id == 82) {
      this.app_routing = ['./online-services/importlicense-dashboard'];

    } else if (this.sub_module_id == 81) {
      this.app_routing = ['./online-services/importlicenseapplication-dashboard'];

    }else if (this.sub_module_id == 115) {
      this.app_routing = ['./online-services/declaration-dashboard'];

    }
    else {
      this.app_routing = ['./online-services/inspectionbookin-dashboard'];

    }
    return this.app_routing;

  }
  onSectionsCboSelect($event) {
    //this.onBusinessTypesLoad($event.value)
  }

  onLoadSections() {
    var data = {
      table_name: 'par_sections',
      is_product_type: 1
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
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
  onLoadZones() {
    var data = {
      table_name: 'par_zones',
      zone_notin: 1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.zoneData = data;
        });

  }
   onLoadApplicationType() {
    var data = {
      table_name: 'par_importexport_application_type',
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeData = data;
        });
  }

  // onloadApplicationTypes() {
  //   var data = {
  //     table_name: 'sub_modules',
  //     permit_type_id: 3,
  //     module_id: 4
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
      permit_category_id: permit_category_id
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

onLoadDosageFormData() {
    var data = {
      table_name: 'par_dosage_forms'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.dosageFormData = data;
        });

  }


  onLoadDeviceTypeData() {
    var data = {
      table_name: 'par_containers'
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
      table_name: 'si_units'
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
  funcValidatePermitDetails(validation_title, nextStep) {


    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', '') + ' and save permit application', 'Alert');
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
    for (let i = 0; i < files.length; i++) {
      input.append("file", files[i], files[i]['name']);
    }
    return input;
  }


  onSaveImportExportApplication() {

    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.applicationGeneraldetailsfrm.invalid) {
      return;
    }
    // const uploadData = this.prepareSavePermitDoc();
    this.spinner.show();
    if(this.sub_module_id == 81){
    this.appService.onSavePermitApplication(this.application_id, this.applicationGeneraldetailsfrm.value, this.tracking_no, 'importexportapp/saveImportExportApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.tracking_no = this.app_resp.tracking_no;
            this.application_id = this.app_resp.application_id;
            this.application_code = this.app_resp.application_code;
            this.product_category_id = this.app_resp.product_category_id;
            this.importation_reason_id = this.app_resp.importation_reason_id;
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
       else if (this.sub_module_id == 12){
        this.appService.onSaveRenPermitApplication(this.application_id, this.applicationGeneraldetailsfrm.value, this.tracking_no, 'importexportapp/saveRenImportExportApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.tracking_no = this.app_resp.tracking_no;
            this.application_id = this.app_resp.application_id;
            this.application_code = this.app_resp.application_code;
            this.product_category_id = this.app_resp.product_category_id;
            this.proforma_currency_id = this.app_resp.proforma_currency_id;
            this.setValidatorsBasedOnCategory(this.product_category_id);
            this.importation_reason_id = this.app_resp.importation_reason_id;
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

      }else if (this.sub_module_id == 115){
        this.appService.onSaveDeclarationPermitApplication(this.application_id,this.port_id, this.applicationGeneraldetailsfrm.value, this.tracking_no, 'importexportapp/saveDeclarationImportExportApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.tracking_no = this.app_resp.tracking_no;
            this.application_id = this.app_resp.application_id;
            this.application_code = this.app_resp.application_code;
            this.product_category_id = this.app_resp.product_category_id;
            this.port_id = this.app_resp.port_id;
            this.importation_reason_id = this.app_resp.importation_reason_id;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });

      }else if (this.sub_module_id == 49){
        this.appService.onSaveDeclarationPermitApplication(this.application_id,this.port_id, this.applicationGeneraldetailsfrm.value, this.tracking_no, 'importexportapp/saveDeclarationImportExportApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.tracking_no = this.app_resp.tracking_no;
            this.application_id = this.app_resp.application_id;
            this.application_code = this.app_resp.application_code;
            this.product_category_id = this.app_resp.product_category_id;
            this.port_id = this.app_resp.port_id;
            this.importation_reason_id = this.app_resp.importation_reason_id;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(1);
            this.onLoadDeclaredProductsData(this.declaration_application_code);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });

      }else{
        this.toastr.error('Set Sub Module Form Controls');
      }
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


  onsavePermitProductdetails() {
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no, 'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.permitProductsFrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.onLoadPermitProductsData(this.application_code);
            this.onLoadDeclarationPermitProductsData(this.application_code);
            this.onLoadDeclarationProductsData(this.application_code);
            this.permit_product_id = this.app_resp.record_id;
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }

  onupdatePermitProductdetails() {
    if (this.permitProductsFrm.invalid) {
      return;
    }
    let brand_name = this.permitProductsFrm.get('brand_name').value;
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no, 'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {

            this.onLoadPermitProductsData(this.application_code);
            this.onLoadDeclarationPermitProductsData(this.application_code);
            this.onLoadDeclarationProductsData(this.application_code);
            this.toastr.success(this.app_resp.message, 'Response');
            this.isPermitproductsAddPopupVisible = false;
            // record_id
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }




// onPermitsApplicationPrint() {
//   this.application_details = this.applicationGeneraldetailsfrm.value;

//   const applicationDetailsLabels = {
//     has_registered_premises: 'Application Type',
//     business_type_id: 'Business Type',
//     licence_type_id: 'License Type',
//     product_classification_id: 'Product Category',
//     importexport_product_range_id: 'Product Classification',
//     tpin_no: 'TIN NO.',
//     name: 'Name of Business',
//     physical_address: 'Physical address of the Business or Institution',
//     email: 'Email Address',
//     company_registration_no: 'Company Registration Number',
//   };

//   const printWindow = window.open('', '_blank');

//   let content = `<html><head><title>Application Form</title><style>body { font-family: Arial, sans-serif; line-height: 1.5; }</style></head><body>`;

//   content += `<h2>Application Details</h2>`;
//   for (const key in applicationDetailsLabels) {
//     if (this.application_details.hasOwnProperty(key)) {
//       content += `<p><strong>${applicationDetailsLabels[key]}:</strong> ${this.application_details[key]}</p>`;
//     }
//   }

//   content += `</body></html>`;

//   printWindow.document.write(content);
//   printWindow.document.close(); 
//   printWindow.focus(); 
//   printWindow.print(); 
//   printWindow.close(); 
// }


  submissionsTermscheckbox(e) {

    this.termscheckbox = e.value;

  }

  onPermitsApplicationSubmit() {

     //this.onPermitsApplicationPrint();
    // window.print();

    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = this.app_route = this.funcREturnApplicationDashboardROute();

    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_importexport_applications', this.app_route, this.onApplicationSubmissionFrm.value);

  }
  onLoadPermitProductsData(application_code) {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitProductsData = data.data;
            if (this.permitProductsData.length > 0) {
              this.isprodnextdisable = false;
            }
            else {
              this.isprodnextdisable = true;
            }

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false;
        });
  }

  onLoadDeclarationPermitProductsData(application_code) {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getDeclarationPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.declarationpermitProductsData = data.data;
            if (this.declarationpermitProductsData.length > 0) {
              this.isprodnextdisable = false;
            }
            else {
              this.isprodnextdisable = true;
            }

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false;
        });
  }



  onLoadDeclarationProductsData(application_code) {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getDeclaredProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitdeclarationProductsData = data.data;
            if (this.permitdeclarationProductsData.length > 0) {
              this.isprodnextdisable = false;
            }
            else {
              this.isprodnextdisable = true;
            }

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false;
        });
  }
  onLoadDeclaredProductsData(declaration_application_code) {
    console.log(this.declaration_application_code);
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': this.declaration_application_code }, 'getDeclaredProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.declaredProductsData = data.data;

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

  onLoadpermitUploadedProductsData(application_code) {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getPermitUploadedProductsDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.permitUploadedProductsData = data.data;
            if (this.permitUploadedProductsData.length > 0) {
              this.isprodnextdisable = false;
            }
            else {
              this.isprodnextdisable = true;
            }

            this.isUploadedInvoiceProductsWin = true;;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false;
        });
  }

  onLoadregulatedProductsPermitData() {
    this.spinner.show();

    this.appService.getPermitsOtherDetails({}, 'getregulatedProductsPermitData')
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
          return false;
        });
  }


  OnReloadPermitProducts() {

    let me = this;
    this.registeredProductsData.store = new CustomStore({
      load: function (loadOptions: any) {

        var params = '?';
        params += 'skip=' + loadOptions.skip;
        params += '&take=' + loadOptions.take; //searchValue
        var headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });
        this.configData = {
          headers: headers,
          params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter, table_name: 'registered_products', 'module_id': me.module_id, 'sub_module_id': me.sub_module_id, section_id: me.section_id, trader_id: me.trader_id, mistrader_id: me.mistrader_id }
        };
        return me.httpClient.get(AppSettings.base_url + 'importexportapp/getRegisteredNonRegisteredProducts', this.configData)
          .toPromise()
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount
            };
          })
          .catch(error => {
            throw 'Data Loading Error';
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

  funcSelectRegisteredProduct(data) {
    let validitystatus_id = data.data.validity_status_id;
    let retentionstatus_id = data.data.retentionstatus_id;
    if (this.sub_module_id == 13 || this.sub_module_id == 15 || this.sub_module_id == 14) {

      this.isPermitproductsAddPopupVisible = true;
      this.permitProductsFrm.get('product_id').setValue(data.data.product_id);
      this.permitProductsFrm.get('brand_name').setValue(data.data.brand_name);
      this.permitProductsFrm.get('product_category_id').setValue(data.data.product_category_id);
      this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);

    }
    else {
      //validate the datasets
      if (validitystatus_id != 2) {
        this.toastr.error('Product Registration Alert', 'The product has an invalid registration validity, instatiate a product renewal or contact TFDA Authority for further guidelines.');

      } else if (retentionstatus_id == 2) {
        this.toastr.error('Product Retention Payment Alert', 'The selected product has a pending retention payment, pay the pending retention or contact TFDA Authority for further guidelines.');
      }
      else {
        this.isPermitproductsAddPopupVisible = true;
        this.permitProductsFrm.get('product_id').setValue(data.data.product_id);
        this.permitProductsFrm.get('brand_name').setValue(data.data.brand_name);
        this.permitProductsFrm.get('product_category_id').setValue(data.data.product_category_id);
        this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);

      }
    }
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


onMoveNextWizard(nextStep) {
    //validate details 
    if (nextStep == 2 + this.initWizardPanel) {
      this.wizard.model.navigationMode.goToStep(nextStep);

    }else if (nextStep == 3 + this.initWizardPanel) {
      this.wizard.model.navigationMode.goToStep(nextStep);

    }
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


  funcValidateApplicationQueryresponse(nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code, 'wb_importexport_applications')
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
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'wb_importexport_applications')
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
  funcValidateStepDetails(validation_title, data, nextStep) {

    if (data.length != 0 && data.length) {
      this.wizard.model.navigationMode.goToStep(nextStep);
    }
    else {
      this.toastr.error(validation_title, 'Alert');
    }

  }
  onLoadproductCategoryData(section_id) {
    var data = {
      table_name: 'par_product_categories',
      section_id: section_id
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
  funAddNewPermitProducts() {
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
            this.isInitalQueryResponseFrmVisible = false;
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
    return window.innerWidth * percentage_width / 100;
  }
  funcDownloadUploadedDoc() {
    if (this.appuploaded_document_id > 0) {
      this.dmsService.getApplicationDocumentDownloadurl(this.application_code, '', this.appuploaded_document_id)
        .subscribe(
          response => {
            this.spinner.hide();
            let response_data = response;
            if (response_data.success) {
              this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);
              this.isDocumentPreviewDownloadwin = true;
            }
            else {
              this.toastr.success(response_data.message, 'Response');
            }
          },
          error => {
            this.loading = false;
          });
    }
    else {
      this.toastr.error('No Query Letter that has been Uploaded, preview the query for detail.', 'Alert');
    }
  }
  funcDownloadQueryLetter(data) {
    this.appuploaded_document_id = data.data.appuploaded_document_id;
    this.funcDownloadUploadedDoc();
  }

  funcValidatePermitdetails(previous_step, direction) {
    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');

        return;
      }
    }

  }

  funcValidateNavPermitDocumentsDetails(nextStep, direction) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'wb_importexport_applications')
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
  funcValidateNavPermitProductDetails(nextStep, direction) {

    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.application_code, 'Invoice Product details', 'wb_permits_products')
      .subscribe(
        response => {
          if (response.success) {
            // this.toastr.error('Add the Invoice Product details to proceed', 'Alert');
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
  validateSubmissionApplicationDetails(direction: WizardComponent) {
    let step = 0;
    this.funcValidatePermitdetails(step, direction);
    this.funcValidateNavPermitProductDetails(step + 1, direction);

    this.funcValidateNavPermitDocumentsDetails(step + 2, direction);


  }
  validateApplicationDetails(direction: WizardComponent): void{
   
    this.funcValidatePermitdetails(0,direction);
   
}
  validateProdApplicationDetails(direction: WizardComponent) {
    let step = 0;
    this.funcValidatePermitdetails(step, direction);
    this.funcValidateNavPermitProductDetails(step + 1, direction);

  }

}
