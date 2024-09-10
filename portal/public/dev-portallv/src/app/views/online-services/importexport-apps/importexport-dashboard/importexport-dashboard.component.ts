import { Component, OnInit, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { ModalDialogService,SimpleModalComponent } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { DxDataGridComponent, DxActionSheetModule } from 'devextreme-angular';
import { Utilities } from 'src/app/services/common/utilities.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-importexport-dashboard',
  templateUrl: './importexport-dashboard.component.html',
  styleUrls: ['./importexport-dashboard.component.css']
})
export class ImportexportDashboardComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  is_popupguidelines:boolean;
  approved_applications: number = 0;
  pending_submission: number = 0;
  queried_applications: number = 0;
  rejected_applications: number = 0;
  submitted_application:number=0;
  release_underseal:number=0;
  dtImportExpApplicationData: any = [];
  expanded: boolean = false;
  app_route: any;
  module_id:number =4;
  @Input() applicationTypeData:any
  app_response: any;
  @Input() licenceTypeData: any;
  @Input() premiseBusinessTypeData: any;
  @Input() registeredPremiseBusinessTypeData:any;
  processData: any;
  title: string;
  sub_module: number;
  router_link: string;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  isPreviewApplicationDetails:boolean= false;
  frmPreviewAppDetails:FormGroup;
  section_id:number;
 has_registered_products: number;


  product_classification_id: number;
  application_type: number;
  //has_registered_premises: number;
  licence_type_id : number;
  vc_application_type_id: number;
  port_of_declaration_id: number;
  tracking_no: number;
  is_registered: number;
 business_type_id: number;
  applicationSelectionfrm: FormGroup;
  @Input() applicationGeneraldetailsfrm: FormGroup;
  applicationRejectionData:any;
  isApplicationRejectionVisible:boolean= false;
  FilterDetailsFrm:FormGroup;
  productappTypeData:any;
  applicationStatusData:any;
  prodManufacturedSectionData:any;
  sectionsData:any;guidelines_title:string;
  sub_module_id: string;
  vcApplicationTypeData:any;
  //sub_module_id:number;
  permit_type_id: 1;
  application_title:string;
  sectionItem:any;
  prodManufacturedSectionItem:any;
  app_typeItem:any;
  app_registeredProducts: any;
  application_types:any;
  licence_types: any;
  importexport_business_types: any;
  vc_application_types: any;
  registered_type: any;
  declaration_types: any;
  port_of_declaration_types: any;
  tracking_nos: any;
  registrationLevelData: any;
  portOFDeclaration: any;
  app_outletItem:any;
  conditionData: any;
  descriptionData: any;
  verificationcertapp_details:any;
    application_details:any;
    verification_details: any;;
    sub_module_idsel:number;
    isPermitInitialisation:boolean;
    isProductApplicationInitialisation:boolean;
    confirmDataParam:any;
    has_nonregisteredproducts:boolean =false;
    is_imports: boolean = false;
    is_approvedVisaPermit:boolean =false;
    is_registered_premise: boolean = false;
    is_not_registered_premise: boolean = false;
    has_registered_premises: boolean = false;
    win_submitinvoicepayments:boolean;
    permitProductsData:any;
    prodmanufacuredsection_id:number;
    prodmanufactured_id:number;
    appsub_module_id:number;
    app_routing:any;
    appmodule_id:number;
    appsection_id:number;
    appstatus_id:number;
    appapplication_code:number;
    private isFetchingData = false;
    private destroy$ = new Subject<void>();
    
  onApplicationSubmissionFrm:FormGroup;
  constructor(public utilityService:Utilities,private viewRef: ViewContainerRef,private fb: FormBuilder, private modalServ: ModalDialogService, private spinner: SpinnerVisibilityService, public toastr: ToastrService, public router: Router, private configService: ConfigurationsService, private appService: ImportexportService) { // this.onLoadApplicationCounterDetails();
    this.onLoadSections();
    this.onLoadApplicationType();
    //this.onLoadBusinessType();
    this.onLoadpremiseBusinessTypeData();
    this.onLoadregisteredpremiseBusinessTypeData()
    this.onLoadconfirmDataParam();
    this.onLoadApplicationstatuses();
    this.onLoadvcApplicationData();
    this.onLoadImportRegistrationLevelData();
    this.onLoadPortsOfDeclaration();
    //this.onLoadProductAppType();

    this.FilterDetailsFrm = new FormGroup({
      sub_module_id: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([])),
      application_status_id: new FormControl('', Validators.compose([]))
    });
    
   
    this.applicationSelectionfrm = this.fb.group({
      section_id: [this.sectionsData],
      sub_module_id: [''],
      has_registered_premises: [''],
      licence_type_id: [''],
      business_type_id: [''],
      vc_application_type_id: [''],
      port_of_declaration_id: [''],
      tracking_no: [''],
      prodmanufacuredsection_id: [''],
      has_registered_products: [''],
      has_approved_visa: [''],
      is_registered: [''],
      port_id: [''],
      proforma_invoice_no: [''],
      proforma_invoice_date: [''],
      entry_country_id: [''],
      mode_oftransport_id: [''],
      sender_receiver_id: [''],
      shipment_date: [''],
      id: [''],
      custom_declaration_no: [''],
      product_category_id: [''],
      importation_reason_id: [''],
      application_code: ['']


    });


    //   this.applicationSelectionfrm = new FormGroup({
    //     section_id: new FormControl(this.sectionsData, Validators.compose([])),
    //     sub_module_id: new FormControl('', Validators.compose([])),
    //     business_type_id: new FormControl('', Validators.compose([])),
    //     vc_application_type_id: new FormControl('', Validators.compose([])),
    //     prodmanufacuredsection_id:new FormControl('', Validators.compose([])),
    //     has_registered_products: new FormControl('', Validators.compose([])),
    //     has_approved_visa: new FormControl('', Validators.compose([]))
    //   });
      

    this.frmPreviewAppDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),reference_no: new FormControl('', Validators.compose([Validators.required])),
      proforma_invoice_no: new FormControl('', Validators.compose([Validators.required])),
      proforma_invoice_date: new FormControl('', Validators.compose([Validators.required])),
      sender_receiver: new FormControl('', Validators.compose([Validators.required])),
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      has_registered_premises: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    }); 
    
    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
     submission_comments:new FormControl('', Validators.compose([]))
    });

    // this.applicationGeneraldetailsfrm = new FormGroup({
    //     port_id: new FormControl('', Validators.compose([Validators.required])),
    //     proforma_invoice_no: new FormControl('', Validators.compose([])),
    //     proforma_invoice_date: new FormControl('', Validators.compose([])),
    //     entry_country_id: new FormControl('', Validators.compose([])),
    //     mode_oftransport_id: new FormControl('', Validators.compose([])),
    //     sender_receiver_id: new FormControl('', Validators.compose([Validators.required])),
    //     shipment_date: new FormControl('', Validators.compose([Validators.required])),
       
    //   });
}

  ngOnInit(){
     //this.setupSearchByTrackingNumberHandler(this.sub_module_id);
     } 
     ngAfterViewInit() {
    //this.setupSearchByTrackingNumberHandler(this.sub_module_id);
  }

     private setupSearchByTrackingNumberHandler(sub_module_id): void {
    this.applicationSelectionfrm
      .get('tracking_no')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((TrackingNumber) => {
        if (!this.isFetchingData) {
          this.isFetchingData = true;
          this.searchByTrackingNumber(TrackingNumber);
        }
      });
  } 
    searchByTrackingNumber(TrackingNumber){

      
    this.appService.onLoadCustomeDeclaration(TrackingNumber).subscribe(
      (response: any) => {
        this.spinner.show();
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          const dataItem = response.data[0];
       
          this.toastr.success('Success, Proceed with Inspection Booking');
          this.spinner.hide(); 
       
            this.applicationSelectionfrm.get('port_id').setValue(dataItem.port_id);
            this.applicationSelectionfrm.get('proforma_invoice_no').setValue(dataItem.proforma_invoice_no);
            this.applicationSelectionfrm.get('proforma_invoice_date').setValue(dataItem.proforma_invoice_date);
            this.applicationSelectionfrm.get('entry_country_id').setValue(dataItem.entry_country_id);
            this.applicationSelectionfrm.get('mode_oftransport_id').setValue(dataItem.mode_oftransport_id);
            this.applicationSelectionfrm.get('sender_receiver_id').setValue(dataItem.sender_receiver_id);
            this.applicationSelectionfrm.get('shipment_date').setValue(dataItem.shipment_date);
            this.applicationSelectionfrm.get('importation_reason_id').setValue(dataItem.importation_reason_id);
            this.applicationSelectionfrm.get('product_category_id').setValue(dataItem.product_category_id);
            this.applicationSelectionfrm.get('id').setValue(dataItem.id);
            this.applicationSelectionfrm.get('custom_declaration_no').setValue(dataItem.custom_declaration_no);
            this.applicationSelectionfrm.get('application_code').setValue(dataItem.application_code);

            const portID = this.applicationSelectionfrm.get('port_id').value;
            const proformaInvoiceNoValue = this.applicationSelectionfrm.get('proforma_invoice_no').value;
            const proformaInvoiceDate = this.applicationSelectionfrm.get('proforma_invoice_date').value;
            const modeOfTransport = this.applicationSelectionfrm.get('mode_oftransport_id').value;
            const senderReceiver = this.applicationSelectionfrm.get('sender_receiver_id').value;
            const shipmentDate = this.applicationSelectionfrm.get('shipment_date').value;
            const importationReason = this.applicationSelectionfrm.get('importation_reason_id').value;
            const productCategory = this.applicationSelectionfrm.get('product_category_id').value;
            const technicalDeclarationID = this.applicationSelectionfrm.get('id').value;
            const technicalDeclarationNO = this.applicationSelectionfrm.get('custom_declaration_no').value;
            const applicationCode = this.applicationSelectionfrm.get('application_code').value;

           this.configService.getSectionUniformApplicationProces(this.sub_module_id, 1)

      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;

            this.application_details = { module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_id, 
            section_id: this.section_id,application_status_id: 1,status_name: 'New', port_id:portID, 
            proforma_invoice_no:proformaInvoiceNoValue, proforma_invoice_date:proformaInvoiceDate, 
            mode_oftransport_id:modeOfTransport, sender_receiver_id:senderReceiver,shipment_date:shipmentDate,
            technical_declaration_id: technicalDeclarationID, importation_reason_id: importationReason, product_category_id:productCategory,
            custom_declaration_no: technicalDeclarationNO, declaration_application_code:applicationCode};
            this.appService.setApplicationDetail(this.application_details);

            this.app_route = ['./online-services/' + this.router_link];

            this.router.navigate(this.app_route);

          }

        });
    return false;
            this.spinner.hide(); 

        } else {
          //this.router.navigate(['./../online-services/inspectionbookin-dashboard']);
          this.toastr.error('No data found');
          this.app_route = ['./online-services/inspectionbookin-dashboard'];

            this.router.navigate(this.app_route);
            this.spinner.hide(); 
        }

        this.isFetchingData = false;
      },
      (error) => {
        this.isFetchingData = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
     
     onSelectionHasRegistered($event){
    let confirm_id = $event.selectedItem.id;
    if(confirm_id ==1){
      this.has_nonregisteredproducts = false;
    }
    else{
      this.has_nonregisteredproducts = true;
    }

  }

  onSelectDeclarationType($event){
     if ($event.selectedItem.id == 1) {
      this.is_imports = true;

    }
    else {

      this.is_imports = false;
    }

  }

  onLoadPortsOfDeclaration() {
    var data = {
      table_name: 'par_ports_information',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.portOFDeclaration = data;
        });
  }

  refreshDataGrid() {
      this.reloadPermitApplicationsApplications({sub_module_id:this.sub_module_id});   
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


  // funcSelectapprovedPermitforammend(data){
  //   //functiona call to set the application status 
  //   let app_data = data.data;
  //   this.modalServ.openDialog(this.viewRef, {
  //     title: 'Do you want to Initiate Request for License Verification?',
  //     childComponent: '',
  //     settings: {
  //       closeButtonClass: 'fa fa-close'
  //     },
  //     actionButtons: [{
  //       text: 'Yes',
  //       buttonClass: 'btn btn-danger',
  //       onAction: () => new Promise((resolve: any, reject: any) => {
  //         this.spinner.show();
  //         this.utilityService.getApplicationProcessInformation(app_data.application_code,'importexportapp/initiateRequestforPermitAmmendment')
  //       .subscribe(
  //         data => {
  //           this.title = app_data.process_title;
  //             app_data.application_status_id = 1;
  //             this.appService.setApplicationDetail(app_data);
  //             this.app_route = ['./online-services/importexportvc-application'];
  //             this.router.navigate(this.app_route);
  //             this.spinner.hide();
  //         });
  //         resolve();
  //       })
  //     }, {
  //       text: 'no',
  //       buttonClass: 'btn btn-default',
  //       onAction: () => new Promise((resolve: any) => {
  //         resolve();
  //       })
  //     }
  //     ]
  //   });
     

  //  }
  

  onClickSubModuleAppSelection(sub_module_id){
    if(sub_module_id == 81){
      this.isProductApplicationInitialisation= true;
      this.applicationSelectionfrm.controls['has_registered_premises'].setValidators(Validators.required);
      this.applicationSelectionfrm.controls['licence_type_id'].setValidators([Validators.required]);
    }else if(sub_module_id == 12){
      this.isPermitInitialisation = true;
      this.applicationSelectionfrm.controls['vc_application_type_id'].setValidators([Validators.required]);
      this.applicationSelectionfrm.controls['is_registered'].setValidators([Validators.required]);
     
     }else if(sub_module_id == 115){
      this.isPermitInitialisation = true;
      this.applicationSelectionfrm.controls['port_of_declaration_id'].setValidators([Validators.required]);
     
     }else{
      this.toastr.error(this.processData.message, 'Alert!');
     }

  }
  onApplicationSelection(sub_module_id) {
    
    if (this.applicationSelectionfrm.invalid) {
      this.toastr.error('Fill in all the Mandatory Fields', 'Alert!');

      return;
    }
    this.spinner.show();
   // this.section_id = this.applicationSelectionfrm.get('section_id').value;
    this.application_types = this.applicationSelectionfrm.controls['has_registered_premises'];
    this.licence_types = this.applicationSelectionfrm.controls['licence_type_id'];
    this.importexport_business_types = this.applicationSelectionfrm.controls['business_type_id'];
    this.vc_application_types = this.applicationSelectionfrm.controls['vc_application_type_id'];
    this.registered_type = this.applicationSelectionfrm.controls['is_registered'];
    this.port_of_declaration_types = this.applicationSelectionfrm.controls['port_of_declaration_id'];
    this.tracking_nos = this.applicationSelectionfrm.controls['tracking_no'];
    //this.declaration_types = this.applicationSelectionfrm.controls['declaration_type_id'];
    this.has_registered_premises = this.application_types.value
    this.licence_type_id = this.licence_types.value
    this.business_type_id = this.importexport_business_types.value
    this.vc_application_type_id = this.vc_application_types.value
    this.is_registered = this.registered_type.value
    this.port_of_declaration_id = this.port_of_declaration_types.value
    this.tracking_no = this.tracking_nos.value
    //this.declaration_type_id = this.declaration_types.value
  //   this.app_registeredProducts = this.applicationSelectionfrm.controls['has_registered_products'];
  //   //this.app_outletItem  = this.applicationSelectionfrm.controls['product_classification_id'];
  //   this.section_id = this.sectionItem.value;
  //   this.sub_module_id = this.app_typeItem.value;
  //   this.has_registered_products = this.app_registeredProducts.value;
  //  // this.product_classification_id = this.app_outletItem.value;

  if (this.sub_module_id === '12') {
        
    this.application_details = {module_id: this.module_id, vc_application_type_id: this.vc_application_type_id, is_registered: this.is_registered, sub_module_id: this.sub_module_id};
    this.appService.setApplicationDetail(this.application_details);

    this.app_route = ['./online-services/importexport-approvedappsel'];

    this.router.navigate(this.app_route);
    this.spinner.hide(); 
   // return false;

  } else if (this.sub_module_id === '49') {
        
    this.application_details = {module_id: this.module_id, sub_module_id: this.sub_module_id};
    this.appService.setApplicationDetail(this.application_details);

    this.app_route = ['./online-services/importexport-approveddeclaration'];

    this.router.navigate(this.app_route);
    this.spinner.hide(); 
   // return false;

  }else if(this.sub_module_id === '115'){
    this.configService.getSectionUniformApplicationProces(this.sub_module_id, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;

            this.application_details = { module_id: this.module_id, process_title: this.title, has_registered_premises : this.has_registered_premises, licence_type_id : this.licence_type_id, business_type_id :this.business_type_id, sub_module_id: this.sub_module_id, section_id: this.section_id,application_status_id: 1,status_name: 'New' };
            this.appService.setApplicationDetail(this.application_details);

            this.app_route = ['./online-services/' + this.router_link];

            this.router.navigate(this.app_route);

          }

        });
    return false;
       
     }
    
  else if(this.sub_module_id === '81') {
    this.configService.getSectionUniformApplicationProces(this.sub_module_id, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;

            this.application_details = { module_id: this.module_id, process_title: this.title, has_registered_premises : this.has_registered_premises, licence_type_id : this.licence_type_id, business_type_id :this.business_type_id, sub_module_id: this.sub_module_id, section_id: this.section_id,application_status_id: 1,status_name: 'New' };
            console.log(this.application_details);
            this.appService.setApplicationDetail(this.application_details);

            this.app_route = ['./online-services/' + this.router_link];

            this.router.navigate(this.app_route);

          }

        });
    return false;
  }
  
  else {
    this.toastr.error(this.processData.message, 'Alert!');

  }
}

  
  
  
  onSelectionHasApprovedVisa($event){
    let confirmvisa_id = $event.selectedItem.id;
    if(confirmvisa_id ==1){
      this.is_approvedVisaPermit = true;
      this.applicationSelectionfrm.get('section_id').setValidators([]);
    }
    else{
      this.is_approvedVisaPermit = false;
      this.applicationSelectionfrm.get('section_id').setValidators([]);
    }
  }
  //is_approvedVisaPermit
  // onApplicationSelection() {

  //   if (this.applicationSelectionfrm.invalid) {
  //     return;
  //   }
    
  //   this.spinner.show();
  //  this.sectionItem = this.applicationSelectionfrm.controls['section_id'];

  //   this.prodManufacturedSectionItem = this.applicationSelectionfrm.controls['prodmanufacuredsection_id'];
  //    this.prodmanufacuredsection_id = this.prodManufacturedSectionItem.value;
  //   //let has_registered_products = this.applicationSelectionfrm.get('has_registered_products').value;
  //   let has_approved_visa = this.applicationSelectionfrm.get('has_approved_visa').value;
  //  // if(has_registered_products == 1){
  //  //  this.sub_module_idsel = 78;
  //  // }
  //  // else{

  //   if(has_approved_visa == 1){
  //     this.app_route = ['./online-services/import-licensesappselection'];
  //     this.router.navigate(this.app_route);
  //     this.spinner.hide();
  //     return;
  //   }
  //   else{
  //     this.sub_module_idsel = 98;
  //   }
  //  // }

  //   this.section_id = this.sectionItem.value;

  //   if( this.section_id < 1){
  //     this.toastr.error('Select Product Type to proceed', 'Alert!');

  //     return;
  //   }
  //   this.configService.getSectionUniformApplicationProces(this.sub_module_idsel, 1)
  //     .subscribe(
  //       data => {
  //         this.processData = data;
  //         this.spinner.hide();
  //         if (this.processData.success) {
  //           this.title = this.processData[0].name;
  //           this.router_link = this.processData[0].router_link;

  //           this.application_details = { module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_idsel, section_id: this.section_id,application_status_id: 1,status_name: 'New' };
  //           this.appService.setApplicationDetail(this.application_details);

  //           this.app_route = ['./online-services/' + this.router_link];

  //           this.router.navigate(this.app_route);

  //         }
  //         else {
  //           this.toastr.error(this.processData.message, 'Alert!');

  //         }


  //       });
  //   return false;
  // } 
  
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onLoadApplicationCounterDetails(sub_module_id) {

    this.utilityService.onLoadApplicationCounterDetails('wb_importexport_applications',sub_module_id)
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
            // this.dtPremisesApplicationData = data.data;
            for (let rec of records) {

              if (rec.status_id == 1) {

                this.pending_submission = rec.application_counter;
              } if(rec.status_id == 6 || rec.status_id == 8 || rec.status_id == 7 || rec.status_id == 13  || rec.status_id == 14  || rec.status_id == 15){
                this.queried_applications += rec.application_counter;
              } if (rec.status_id == 10 || rec.status_id == 33 || rec.status_id == 26  || rec.status_id == 39) {
                this.approved_applications = rec.application_counter;
              } if (rec.status_id == 11) {
                this.rejected_applications = rec.application_counter;
              }if (rec.status_id == 2 || rec.status_id == 3) {
                this.submitted_application = rec.application_counter;
              }

              
            }
          }

        });

  }

  reloadPermitApplicationsApplications(filter_params) {

    this.appService.onPermitApplicationLoading('importexportapp/getImportExpPermitsApplicationLoading',filter_params)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtImportExpApplicationData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  } 
   onLoadprodmanufacturingSectionData(prodmanufacuredsection_id) {
    var data = {
      table_name: 'par_manufactured_product_types',
      prodmanufacuredsection_id:prodmanufacuredsection_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodManufacturedSectionData = data;
        });

  }
   onsectionDataChange($event) {
    if($event.selectedItem){
      let sectype =$event.selectedItem;
      this.onLoadprodmanufacturingSectionData(sectype.id)
    }
    
  } 
  onLoadApplicationstatuses() {
    
    var data = {
      table_name: 'wb_statuses'
    };
    this.configService.onLoadPortalConfigurationData(data)
      .subscribe(
        data => {
         this.applicationStatusData =  data;
        });
  }
  onSelectApplicationType($event){
    let has_registered_premises = $event.selectedItem.id;
    if (has_registered_premises == 1) {
      this.is_registered_premise = true;
      this.is_not_registered_premise = false;
      this.onLoadLicenceType();
      this.applicationSelectionfrm.get('business_type_id').setValidators([Validators.required]); 
    }
    else{
      this.is_registered_premise = false;
      this.is_not_registered_premise = true;
     this.applicationSelectionfrm.get('business_type_id').setValidators([Validators.required]); 

    }
  }


  onLoadLicenceType() {
    var data = {
      table_name: 'par_licence_type',
      // permit_type_id: 3,
      // module_id: 4,
      //application_type:has_registered_premises
   
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.licenceTypeData = data;
        });
  }

  onLoadBusinessLicenceType(business_type_id:any) {
    var data = {
      table_name: 'par_licence_type',
      business_type_id:business_type_id
   
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.licenceTypeData = data;
        });
  }

  onSelectBusinessType($event) {
    let business_type_id = $event.selectedItem.id;
    this.business_type_id = business_type_id;
    this.onLoadBusinessLicenceType(this.business_type_id);
    
   
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


  onLoadpremiseBusinessTypeData(){
    var data = {
     table_name: 'par_business_types',
     is_non_licenced: 1
   };
   this.configService.onLoadConfigurationData(data)
     .subscribe(
       data => {
         this.premiseBusinessTypeData = data;
       });

 }
  onLoadregisteredpremiseBusinessTypeData(){
    var data = {
     table_name: 'par_business_types',
     is_non_licenced: 0
   };
   this.configService.onLoadConfigurationData(data)
     .subscribe(
       data => {
         this.registeredPremiseBusinessTypeData = data;
       });

 }


  // onLoadBusinessType(){
  //    var data = {
  //     table_name: 'par_business_types',
  //     is_non_licenced: 1
  //   };
  //   this.configService.onLoadConfigurationData(data)
  //     .subscribe(
  //       data => {
  //         this.businessTypeData = data;
  //       });

  // }

  onSelectLicenseType(e:any) {
    let licence_type_id = e.selectedItem.id;
    const business_type_id = this.business_type_id;
          console.log(this.business_type_id);

    if(this.business_type_id == 4){
      this.onLoadSurgicalDescriptionType(this.business_type_id);
      this.onLoadSurgicalConditionType(this.business_type_id);
    }else{
      this.onLoadDescriptionType(licence_type_id);
      this.onLoadConditionType(licence_type_id);
    }

    
    
  }

  onLoadDescriptionType(licence_type_id: number) {
    var data = {
      table_name: 'par_descriptions',
      is_import_export:licence_type_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.descriptionData = data;
        });
  }

  onLoadConditionType(licence_type_id: number) {
    var data = {
      table_name: 'par_conditions',
      is_import_export:licence_type_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.conditionData = data;
        });
        console.log(this.conditionData)
  }
    onLoadSurgicalDescriptionType(business_type_id: number) {
    var data = {
      table_name: 'par_descriptions',
      is_surgical:business_type_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.descriptionData = data;
        });
  }

  onLoadSurgicalConditionType(business_type_id: number) {
    var data = {
      table_name: 'par_conditions',
      is_surgical:business_type_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.conditionData = data;
        });
        console.log(this.conditionData)
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

  
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
      is_product_type:1
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
  onLoadconfirmDataParam() {
    var data = {
      table_name: 'par_confirmations'
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
        });
  }
  
  onLoadProductAppType(sub_module_id) {
    
    var data = {
      table_name: 'sub_modules',
      module_id: 4,
      sub_module_id:sub_module_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.productappTypeData =  data;
        });
  }
   
  funcRequestforPermitAlteration() {
    this.app_route = ['./online-services/importexport-approvedappsel'];
    this.router.navigate(this.app_route);
  }
  
  funcRequestforExportLicenseApplication() {
    this.app_route = ['./online-services/export-licensesappselection'];
    this.router.navigate(this.app_route);
  } 
  funcRequestforImportLicenseApplication() {
    this.isProductApplicationInitialisation = true;
    // this.app_route = ['./online-services/importlicenses-appselection'];
    // this.router.navigate(this.app_route);
  }
  
  funcRequestforPermitInspections() {
    this.app_route = ['./online-services/importexport-approvedappinspection'];
    this.router.navigate(this.app_route);
  }
  
      onClickSubModulehelpGuidelines(){
     this.is_popupguidelines = true;
   }
   /*
  onImportappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Help & Guidelines',
        type: 'normal', stylingMode: 'outlined',
        icon: 'fa fa-question-circle',
        width:150,
        onClick: this.onClickSubModulehelpGuidelines.bind(this)

      }
    },{
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Initiate Import Visa Application',
        tooltip: 'Initialisation of Import/Export Visa Application on Importation of Non-Registered Products.',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcApplicationSelectcion.bind(this)
      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Import License Application',
        tooltip: 'Initialisation of Import/Export License Application on the Approved Visa Application, Import Permit on Registered/Authorised Products.',
        type: 'default',
        icon: 'fa fa-pencil-square-o',
        onClick: this.funcRequestforLicenseApplication.bind(this)
      }
    },{
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Export License Application',
        tooltip: 'Initialisation of Export License Application.',
        type: 'default',
        icon: 'fa fa-pencil-square-o',
        onClick: this.funcRequestforExportLicenseApplication.bind(this)
      }
    },{
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Inspection Booking & Request',
        type: 'default',
        icon: 'fa fa-pencil-square-o',
        onClick: this.funcRequestforPermitInspections.bind(this)
      }
    },{
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  */

  onImportappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  groupChanged(e) {
    this.dataGrid.instance.clearGrouping();
    this.dataGrid.instance.columnOption(e.value, 'groupIndex', 0);

  }

  collapseAllClick(e) {
    this.expanded = !this.expanded;
    e.component.option({
      text: this.expanded ? 'Collapse All' : 'Expand All'
    });
  }


  funcProductPreviewDetails(data){
      this.isPreviewApplicationDetails = true;
      this.frmPreviewAppDetails.patchValue(data);
      this.onLoadPermitProductsData(data.application_code);
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
  applicationActionColClick(e,data){
  
    var action_btn = e.itemData;
    this.funcActionsProcess(action_btn,data.data);

  }
  
  singleApplicationActionColClick(data){
    
    this.funcActionsProcess(data,data);

  }
 
  funcActionsProcess(action_btn, data) {
   
    if(action_btn.action === 'edit'){
      this.funcApplicationPreveditDetails(data);

     // this.funcApplicationPreveditDetails(data);
    }
    else if(action_btn.action === 'preview'){
      this.funcProductPreviewDetails(data);
    }
    else if(action_btn.action == 'print_applications'){
      this.funcPrintApplicationDetails(data);
    }
    else if(action_btn.action == 'archive'){
      this.funcArchivePermitApplication(data);
    }else if(action_btn.action == 'delete_application'){
      this.funcDeletePermitApplication(data);
    }


    
    else if(action_btn.action == 'pre_rejection'){
      this.funcApplicationRejection(data);
    }
    else if(action_btn.action == 'query_response'){
      
      this.funcApplicationPreveditDetails(data);

    }
    else if(action_btn.action == 'processing_details'){
      
      this.onLoadApplicationProcessingData(data);

    }
    else if(action_btn.action == 'print_invoice'){
      
      this.funcPrintApplicationInvoice(data);

    } 
    else if(action_btn.action == 'print_receipt'){
      
      this.funcPrintApplicationReceipts(data);

    }
    else if(action_btn.action == 'print_rejectionletter'){
      
      this.funcPrintLetterofRejection(data);

    }

    else if(action_btn.action == 'reg_certificate' || action_btn.action == 'reg_certificate'){
      
      this.funcgenenerateImportExportPermit(data);

    }
    else if(action_btn.action == 'approval_permit' || action_btn.action == 'print_permit'){
      
      this.funcgenenerateImportExportPermit(data);

    }else if(action_btn.action == 'initiate_license_application' || action_btn.action == 'initiate_license_application'){
      
      this.funcInitiateLicenseApplication(data);

    }
    else if(action_btn.action == 'uploadsub_paymentdetails' || action_btn.action == 'uploadsub_paymentdetails'){
      
      this.funcUploadPaymentDetails(data);

    } else if(action_btn.action == 'inspection_booking' || action_btn.action == 'inspection_booking'){
      
      this.funcInitiateInspectionBooking(data);

    }
  }
  funcUploadPaymentDetails(data){
    this.appsub_module_id = data.sub_module_id;
    this.appmodule_id = data.module_id;
    this.appsection_id = data.section_id;
    this.appapplication_code = data.application_code;
    if(this.appsub_module_id == 112 || this.appsub_module_id ==113 || this.appsub_module_id ==114 || this.appsub_module_id ==81){
      this.app_routing  = ['./online-services/importlicenseapplication-dashboard'];

    }else{
      // this.app_routing  = ['./online-services/exportlicense-dashboard'];

    }
      data.onApplicationSubmissionFrm = this.onApplicationSubmissionFrm;
      data.app_routing = this.app_routing;
      
      this.utilityService.setApplicationDetail(data);
      this.app_route = ['./online-services/application-invoices'];
     
      this.router.navigate(this.app_route);

  }
  funcApplicationRejection(app_data){
    
    //this.spinner.show();
        this.utilityService.getApplicationPreRejectionDetails(app_data.application_code,'wb_importexport_applications', 'application_status_id')
        .subscribe(
          data => {
            this.applicationRejectionData = data.data;
            this.spinner.hide();
            
            this.isApplicationRejectionVisible= true;
          });
  }
  funcPrintApplicationDetails(app_data){
    //print details
      let report_url = this.mis_url+'reports/generateProductsApplicationRpt?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Report")

      // let documentUrl;
      // fetch(report_url)
      //   .then(response => {
      //       if (!response.ok) {
      //           throw new Error('Network response was not ok');
      //       }
      //       return response.json();
      //   })
      //   .then(data => {
      //      documentUrl = data.document_url;
      //     this.funcGenerateRrp(documentUrl,"Report")

      //   })
      //   .catch(error => {
      //       console.error('There was a problem with the fetch operation:', error);
      //   });

  }
   funcgenenerateImportExportPermit(app_data){
    let report_url = this.mis_url+'reports/genenerateImportExportPermit?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_importexport_applications";
    this.funcGenerateRrp(report_url,"Report")

    // let documentUrl;
    //   fetch(report_url)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //        documentUrl = data.document_url;
    //       this.funcGenerateRrp(documentUrl,"Report")

    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);
    //     });

  }
  
  funcPrintApplicationReceipts(app_data){
      this.utilityService.setApplicationDetail(app_data);
      this.app_route = ['./online-services/application-payments'];
     
      this.router.navigate(this.app_route);

    
  }
  funcPrintApplicationInvoice(app_data){

    let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_importexport_applications";
    this.funcGenerateRrp(report_url,"Report")
    
  }


   funcPrintLetterofRejection(app_data){
      //print details

      let report_url = this.mis_url+'reports/generateImportExportRejectionLetter?application_code='+app_data.application_code;
        this.funcGenerateRrp(report_url,"Application Details")


      // let documentUrl;
      // fetch(report_url)
      //   .then(response => {
      //       if (!response.ok) {
      //           throw new Error('Network response was not ok');
      //       }
      //       return response.json();
      //   })
      //   .then(data => {
      //      documentUrl = data.document_url;
      //     this.funcGenerateRrp(documentUrl,"Application Details")

      //   })
      //   .catch(error => {
      //       console.error('There was a problem with the fetch operation:', error);
      //   });

  }
    funcGenerateRrp(report_url,title){
    
      this.printiframeUrl =  this.configService.returnReportIframe(report_url);
      this.printReportTitle= title;
      this.isPrintReportVisible = true;

  }


//     funcGenerateRrp(documentUrl,title){
//     this.printiframeUrl =  this.configService.returnReportIframe(documentUrl);
//     this.printReportTitle= title;
//     this.isPrintReportVisible = true;

// }
  onLoadApplicationProcessingData(data) {

    this.utilityService.onLoadApplicationProcessingData(data.application_code)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.productApplicationProcessingData =  resp_data.data;
            this.isPreviewApplicationProcessing = true;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  }
  
  funcApplicationPreveditDetails(app_data) {
    this.router_link = app_data.router_link;
    if(this.router_link == ''){
      this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
      return;
    }
   
    if (app_data.application_status_id == 1) {
      this.title = app_data.process_title;
      
      this.appService.setApplicationDetail(app_data);
      this.app_route = ['./online-services/' + this.router_link];
     
      this.router.navigate(this.app_route);
    }
    else if (app_data.application_status_id == 2) {
      this.title = app_data.process_title;
      this.router_link = app_data.router_link;
      this.appService.setApplicationDetail(app_data);
      //this.app_route = ['./online-services/premises-reg-preview'];
      this.router.navigate(this.app_route);
    }
    else{
     
      this.title = app_data.process_title;
      this.router_link = app_data.router_link;
      this.appService.setApplicationDetail(app_data);
      this.app_route = ['./online-services/' + this.router_link];
      this.router.navigate(this.app_route);

    }
  }
  funcArchivePermitApplication(data) {
    this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_importexport_applications', this.reloadPermitApplicationsApplications);
    

  }
  
  funcDeletePermitApplication(data) {
    this.utilityService.funcApplicationDeleteCall(this.viewRef,data,'wb_importexport_applications', this.reloadPermitApplicationsApplications);
    

  }
  onSelectProdutFilters(e) {
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let section_id = this.FilterDetailsFrm.get('section_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.reloadPermitApplicationsApplications({sub_module_id:sub_module_id,section_id:section_id,application_status_id:application_status_id});

  }
  onClearProdutFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadPermitApplicationsApplications({});


  }
  funcInitiateInspectionBooking(app_data){
    
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want to Initiate Booking Inspection Application?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.utilityService.getApplicationProcessInformation(app_data.application_code,'importexportapp/funcInitiateInspectionBooking')
        .subscribe(
          data => {
            this.title = app_data.application_type;
            if(data.success){

              app_data.application_status_id = 1;
              app_data.process_title = this.title;
              this.appService.setApplicationDetail(data.app_data);
              this.app_route = ['./online-services/inspection-booking'];
              this.router.navigate(this.app_route);
            }
            else{
              this.toastr.error(data.message, 'Alert!');


            }
              
              this.spinner.hide();
          });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });
     


  }
  funcInitiateLicenseApplication(app_data){
        
   
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want to Initiate Request for Import License Application?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.utilityService.getApplicationProcessInformation(app_data.application_code,'importexportapp/funcInitiateLicenseApplication')
        .subscribe(
          data => {
            this.title = app_data.application_type;
            if(data.success){

              app_data.application_status_id = 1;
              app_data.process_title = this.title;
              this.appService.setApplicationDetail(data.app_data);
              this.app_route = ['./online-services/importexport-application'];
              this.router.navigate(this.app_route);
            }
            else{
              this.toastr.error(data.message, 'Alert!');


            }
              
              this.spinner.hide();
          });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });
     

  }
  onCellPrepared(e) {
      this.utilityService.onCellPrepared(e);
      
  }

}
