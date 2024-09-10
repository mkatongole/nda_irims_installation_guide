import { Component, OnInit, ViewChild, ViewContainerRef,  NgModule, Inject, ChangeDetectorRef, Input } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { PremisesApplicationsService } from '../../../../services/premises-applications/premises-applications.service';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Router} from '@angular/router';
import { Subject } from 'rxjs';
import { AnimationStyleNormalizer } from '@angular/animations/browser/src/dsl/style_normalization/animation_style_normalizer';
import { ToastrService } from 'ngx-toastr';
import {
    DxDataGridModule,
    DxDataGridComponent,
    DxTemplateModule
  } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Utilities } from 'src/app/services/common/utilities.service';
import { AppSettings } from 'src/app/app-settings';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedPremisesregistrationclassComponent } from '../shared-premisesregistrationclass/shared-premisesregistrationclass.component';


@Component({
  selector: 'app-pharmacistsaccount-user',
  templateUrl: './pharmacistsaccount-user.component.html',
  styleUrls: ['./pharmacistsaccount-user.component.css']
})
@NgModule({
  imports: [
    DxDataGridModule,
    DxTemplateModule
  ],
  declarations: [],
  bootstrap: []
})
export class PharmacistsaccountUserComponent implements OnInit {

  app_renewalduenotifications:number=0
  app_renewalduenotificationsdetails:any;
  isViewApplicationDueforRenewal:boolean = false;

  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  expanded = true;
  items = [];
  itemCount = 0;
  premises_applications: any = [];
  title: string;
  processData: any;
  status:number;
  submitted_application:number =0;
  router_link: string;
  app_route: any;
  premisesapp_details: any;
  premises_resp:any;
  dtPremisesApplicationData:any = [];
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;
  //counters 
  approved_premises:number= 0;
  pending_submission:number=0;
  queried_premises:number=0;
  rejected_premises:number=0;
  premises_inspections:number = 0;
  contextMenuItems:any;
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  isApplicationRejectionVisible:boolean = false;
  printiframeUrl:string;
  applicationRejectionData:any;
  premisesappTypeData:any;
  premisessapp_details:any;
  module_id:number = 2;
  application_status_id:number;
  businessTypeDetailsData:any;
  sectionsData:number;
   applicationStatusData:number;
   FilterDetailsFrm:FormGroup;
   applicationDismissalFrm:FormGroup;
   isDismissApplicationWin:boolean = false;
   reasonForDismissalData:any;
   isWholePremises:boolean = false;
    is_readonly:boolean = false;
   isPreviewApplicationsDetails:boolean = false;
   frmPreviewApplicationssDetails:FormGroup;
   premisesGeneraldetailsfrm:FormGroup;
    approvalRecomDetailsfrm: FormGroup;
   premises_dashboardtitle:string;
   sub_module_id:number;
   approvalData:any;
   business_typecategory_id:number;
   businessTypesData:any;
   prodProductTypeData:any;
   regulatedSectionsData:any;
   isPremisesApplicationInitialisation:boolean;
   isApprovalPopupVisible: boolean;
   premisesAppSelectionfrm:FormGroup;
   section_id:number;
   premise_id: number;
   loading:boolean;
   business_type_id:number;
  constructor(public cdr: ChangeDetectorRef,private utilityService:Utilities,private viewRef: ViewContainerRef,private modalServ: ModalDialogService, private spinner: SpinnerVisibilityService,public toastr: ToastrService, private router: Router, private configService: ConfigurationsService, private appService: PremisesApplicationsService) {

  this.approvalRecomDetailsfrm = new FormGroup ({
    pharmacist_approvalstatus_id:new FormControl('',Validators.compose([Validators.required])),
    id:new FormControl('',Validators.compose([]))
   });
   this.frmPreviewApplicationssDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required])),
      status_name:new FormControl('', Validators.compose([Validators.required]))
    });

    this.FilterDetailsFrm = new FormGroup({
      sub_module_id: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([])),
      business_type_id:new FormControl('', Validators.compose([])),
      application_status_id: new FormControl('', Validators.compose([]))
    });

    this.applicationDismissalFrm = new FormGroup({
      dismissal_reason_id: new FormControl('', Validators.compose([])),
      dismissal_remarks: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([]))

    });
    
    this.premisesAppSelectionfrm = new FormGroup({
      section_id: new FormControl(this.sectionsData, Validators.compose([])),
      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),
      regulated_producttype_id: new FormControl('', Validators.compose([])),
      business_type_id: new FormControl('', Validators.compose([Validators.required])),
      business_typecategory_id:new FormControl('',  Validators.compose([]))
    });
    this.onBusinessTypesLoad();
    this.onLoadApplicationstatuses();
    this.onLoadPremisesCounterDetails(this.sub_module_id);
    this.reloadPremisesApplicationsPharmacist();
    this.onLoadSections();
    this.onLoadreasonForDismissalData();
    this.onLoadApplicationCounterDueforRenewal();
    this.onLoadprodProductTypeData();
    this.onBusinessTypesDetailsLoad()
    this.onLoadApproval();
   }
  
  ngOnInit() {
    this.funcApproveDetails();
    this.premisesapp_details = this.appService.getPremisesApplicationDetail();
      if (!this.premisesapp_details) {
      return;
    }
    else {
      this.sub_module_id = this.premisesapp_details.sub_module_id;
      this.section_id = this.premisesapp_details.section_id;
      this.premise_id = this.premisesapp_details.premise_id;
      this.module_id = this.premisesapp_details.module_id;

    }

   
  }

  onWholesalepremise($event) {
  if($event.value == 1){
      this.isWholePremises = true;
  }
  else{
    this.isWholePremises = false;
  }
}
  onLoadApplicationCounterDueforRenewal(){
    
    this.utilityService.getApplicationUniformDetails({module_id:this.module_id},'onLoadApplicationCounterDueforRenewal')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.app_renewalduenotifications =  resp_data.app_renewalduenotifications;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }onCellPrepared(e) {
      this.utilityService.onCellPrepared(e);
  }
  onLoadApplicationDetailsDueforRenewal(){
    if(this.app_renewalduenotifications <1){
      this.toastr.error('There is no application due for expiry (3months)!!', 'Alert!');
      return;
    }
    this.utilityService.getApplicationUniformDetails({module_id:this.module_id},'onLoadApplicationDetailsDueforRenewal')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.app_renewalduenotificationsdetails =  resp_data.app_renewalduenotificationsdetails;
            this.isViewApplicationDueforRenewal = true;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  onSelectPremisesFilters(e) {
    
    let business_type_id = this.FilterDetailsFrm.get('business_type_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.reloadPremisesApplicationsPharmacist({sub_module_id:this.sub_module_id,business_type_id:business_type_id,application_status_id:application_status_id});

  }
  onClearPremisesFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadPremisesApplicationsPharmacist({sub_module_id:this.sub_module_id});


  }
  reloadPremisesApplicationsPharmacist(filter_params={}) {

    this.appService.onPremisesApplicationPharmacist(filter_params)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtPremisesApplicationData =  resp_data.data;
            
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  }
  onLoadingActionMenu(e,data){
    
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  funcDismissApplication(data){
    this.applicationDismissalFrm.get('application_code').setValue(data.application_code)
    this.isDismissApplicationWin = true;
  }
  onSubmitApplicationDismissal(data){

    if (this.applicationDismissalFrm.invalid) {
      return;
    }
    this.utilityService.onSubmitApplicationDismissal('tra_premises_applications','wb_premises_applications',this.applicationDismissalFrm.value, data.application_code )
    .subscribe(
      data => {
        
        let app_resp = data.json();
        if (app_resp.success) {

          this.toastr.success(app_resp.message, 'Response');
          this.isDismissApplicationWin = false;
          this.reloadPremisesApplicationsPharmacist({sub_module_id:this.sub_module_id});

        }else{
          this.toastr.error(app_resp.message, 'Alert');
        }
        

      });

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
  onLoadreasonForDismissalData() {
    
    var data = {
      table_name: 'par_applicationdismissal_reasons'
    };
    this.configService.onLoadPortalConfigurationData(data)
      .subscribe(
        data => {
         this.reasonForDismissalData =  data;
        });
  }
  
  onBusinessTypesDetailsLoad() {

    var data = {
      table_name: 'par_businesstype_categories',
      //business_typecategory_id: business_typecategory_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypeDetailsData = data;
        },
        error => {
          return false
        });
  }  
  onLoadApproval() {
    var data = {
      table_name: 'par_pharmacistapproval_status',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe( 
        data => {
          this.approvalData = data;
        });
  }
  
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe( 
        data => {
          this.sectionsData = data;
        });
  }
  onLoadPremisesAppType(sub_module_id) {
    
    var data = {
      table_name: 'sub_modules',
      module_id: 2,
      sub_module_id:this.sub_module_id
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.premisesappTypeData =  data;
        });
  }
  onClickSubModuleAppSelection(sub_module_id,sub_module_name){

    if(sub_module_id == 89){
      this.isPremisesApplicationInitialisation = true;
     //this.app_route = ['./online-services/prepremisesapplication-sel'];
    // this.router.navigate(this.app_route);
    }else{

      this.premisessapp_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
      this.appService.setPremisesApplicationDetail(this.premisessapp_details);

      this.app_route = ['./online-services/registered-premises-selection'];

      this.router.navigate(this.app_route);
    }

  }  
  onSaveApprovalRecomDetails() {
    if (this.approvalRecomDetailsfrm.invalid) {
      return;
    }
    this.appService.onSaveApprovalRecomDetails(this.approvalRecomDetailsfrm.value, this.premise_id)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.isApprovalPopupVisible = false;

            this.reloadPremisesApplicationsPharmacist();

          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onLoadPremisesCounterDetails(sub_module_id) {

    this.utilityService.onLoadApplicationCounterDetails('wb_premises_applications',sub_module_id)
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
             // this.dtPremisesApplicationData = data.data;
             for(let rec of records){
             
                  if(rec.status_id == 79){
                  
                    this.pending_submission = rec.application_counter;
                  }if(rec.status_id == 6 || rec.status_id == 8 || rec.status_id == 17){
                    this.queried_premises += rec.application_counter;
                  }if(rec.status_id == 10){
                    this.approved_premises = rec.application_counter;
                  }if(rec.status_id == 11){
                    this.rejected_premises = rec.application_counter;
                  }if (rec.status_id == 2 || rec.status_id == 3) {
                    this.submitted_application = rec.application_counter;
                  }

            }
          }
          
        });
  }
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
  singleApplicationActionColClick(data){
    
    this.funcActionsProcess(data.action,data);

  }
  
  premActionColClick(e,data){
    
    var action_btn = e.itemData;
    this.funcActionsProcess(action_btn.action,data.data);

  }
  funcActionsProcess(action_btn,data){
    if(action_btn === 'edit'){
        this.funcPremisePreveditDetails(data);
    }
    else if(action_btn === 'preview'){
      this.funcPremisePreviewDetails(data);
    }
    
    else if(action_btn == 'print_applications'){
      this.funcPrintApplicationDetails(data);
    }
    else if(action_btn == 'archive'){
      this.funcPremiseArchiveApplication(data);
    }
    else if(action_btn == 'pre_rejection'){
      this.funcApplicationRejection(data);
    }
    else if(action_btn == 'query_response'){
      
      this.funcPremisePreveditDetails(data);
    }  else if(action_btn == 'processing_details'){
      
      this.onLoadApplicationProcessingData(data);

    }
    else if(action_btn == 'print_invoice'){
      
      this.funcPrintApplicationInvoice(data);

    } else if(action_btn == 'print_rejectionletter'){
      
      this.funcPrintLetterofRejection(data);

    }else if(action_btn == 'reg_certificate'){
      
      this.funcPrintPremisesRegistrationCertificate(data);

    }else if(action_btn == 'business_permit'){
      
      this.funcPrintPremisesBusinessPermit(data);

    }else if(action_btn == 'dismiss_applications'){
      
      this.funcDismissApplication(data);

    }else if(action_btn == 'print_receipt'){
      
      this.funcPrintApplicationReceipts(data);
    }
    else if(action_btn.action == 'uploadsub_paymentdetails' || action_btn.action == 'uploadsub_paymentdetails'){
      
      this.funcUploadPaymentDetails(data);

    }else if(action_btn == 'reinspectionreq'){
      
      this.funcIntiateREinspectionProcesses(data);

    }else if(action_btn == 'reinspectionreq'){
      
      this.funcIntiateREinspectionProcesses(data);

    }
  }
  
  funcIntiateREinspectionProcesses(app_data) {

    //this.spinner.show();
   
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want to Initiate Responses to Re-Inspection Request(Note the service is billed based on the Fees and charges)?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.utilityService.getApplicationProcessInformation(app_data.application_code,'premisesregistration/IntiateREinspectionResponseProcesses')
        .subscribe(
          data => {
            this.title = app_data.process_title;
            if(data.success){
              //let application_data = data.app_data;
              this.processData = data.data;
                app_data.application_status_id = 40;
                this.router_link = this.processData.router_link;

                this.appService.setPremisesApplicationDetail(this.processData);
                if(this.router_link != ''){
                  this.app_route = ['./online-services/' + this.router_link];
      
                  this.router.navigate(this.app_route);
                }
                else{
                  this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
                }
               

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
  funcUploadPaymentDetails(data){
    /*
    this.appsub_module_id = data.sub_module_id;
    this.appmodule_id = data.module_id;
    this.appsection_id = data.section_id;
    this.appapplication_code = data.application_code;
    if(this.appsub_module_id == 78 || this.appsub_module_id ==82){
      this.app_routing  = ['./online-services/importlicense-dashboard'];

    }else{
      this.app_routing  = ['./online-services/exportlicense-dashboard'];

    }
      data.onApplicationSubmissionFrm = this.onApplicationSubmissionFrm;
      data.app_routing = this.app_routing;
      
      this.utilityService.setApplicationDetail(data);
      this.app_route = ['./online-services/application-invoices'];
     
      this.router.navigate(this.app_route);
*/
  }
  funcPrintPremisesRegistrationCertificate(app_data){

    let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_premises_applications";
    this.funcGenerateRrp(report_url,"Application Certificate")
    
  }
  funcPrintPremisesBusinessPermit(app_data){

    let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_premises_applications";
    this.funcGenerateRrp(report_url,"Business Permits")
  }
  
  funcPrintApplicationInvoice(app_data){

    let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_premises_applications";
    this.funcGenerateRrp(report_url,"Application Invoice")
    
  }
  funcPrintApplicationReceipts(app_data){
    this.utilityService.setApplicationDetail(app_data);
    this.app_route = ['./online-services/application-payments'];
   
    this.router.navigate(this.app_route);

  
}
  funcPrintLetterofRejection(app_data){
      //print details
      let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Application Details");

  }
  funcPrintApplicationDetails(app_data){
    //print details

      let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Application Details");
     
  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  funcPremisesApplicationSelectcion() {

    this.app_route = ['./online-services/premisesapplication-sel'];
    this.router.navigate(this.app_route);
  }
  onPremisesappsToolbarPreparing(e) {
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

  refreshDataGrid() {
      this.reloadPremisesApplicationsPharmacist({sub_module_id:this.sub_module_id});   
  }
  funcPremiseArchiveApplication(data){
   this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_premises_applications', this.reloadPremisesApplicationsPharmacist)
   

  }
  funcPremisePreviewDetails(app_data){
      this.isPreviewApplicationsDetails = true;
      this.frmPreviewApplicationssDetails.patchValue(app_data);
   
  }
  
  funcApplicationRejection(app_data){
    
    //this.spinner.show();
        this.utilityService.getApplicationPreRejectionDetails(app_data.application_code,'wb_premises_applications', 'application_status_id')
        .subscribe(
          data => {
            this.applicationRejectionData = data.data;
            this.spinner.hide();
            this.isApplicationRejectionVisible= true;
          });
  }

  funcPremisePreveditDetails(app_data) {

        this.spinner.show();
        this.appService.getpremisesApplicationDetails(app_data.application_id)
        .subscribe(
          data => {
            this.processData = data.data;
            this.spinner.hide();

          if (data.success) {
              this.title = this.processData.process_title;
              this.status = this.processData.application_status_id;
              this.router_link = this.processData.router_link;
              this.appService.setPremisesApplicationDetail(this.processData);

              if (this.router_link !== '') {
                  this.app_route = ['./online-services/' + this.router_link];
                  this.router.navigate(this.app_route);

                  const readOnlyStatuses = [79, ];
                  
                  this.is_readonly = readOnlyStatuses.includes(this.status);
              } else {
                  this.toastr.error("The application process route has not been mapped, contact Support Team!!", 'Alert!');
              }
          }else{
              this.toastr.error(this.processData.message, 'Alert!');

            }
          
          });
  }
  onViewRegisteredPremisesApps(registration_status,validity_status,process_title){

      
      this.premisessapp_details = {registration_status: registration_status, process_title: process_title, validity_status: validity_status};
      this.appService.setPremisesApplicationDetail(this.premisessapp_details);

      this.app_route = ['./online-services/registered-premises'];

      this.router.navigate(this.app_route);
  
  }
 
  // onSectionsCboSelect($event) {
  //   this.onBusinessTypesLoad($event.value)
  //  // this. OnLoadBusinesstypeCategories($event.value);

  // }
  
  onBusinessTypesLoad() {

    var data = {
      table_name: 'par_business_types',
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypesData = data;
        },
        error => {
          return false
        });
  }

    funcApproveDetails() {

    this.approvalRecomDetailsfrm.reset();
    this.isApprovalPopupVisible = true;

  }
  onLoadprodProductTypeData() {
    var data = {
      table_name: 'par_regulated_productstypes'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodProductTypeData = data;
        });
  }
  onprodProductTypeDataChange($event) {
    if($event.selectedItem){
      let prodtypes =$event.selectedItem;
      this.onLoadRegulatedSectionsData(prodtypes.id)
    }
    
  } 

  onLoadRegulatedSectionsData(regulated_producttype_id) {
    var data = {
      table_name: 'par_sections',
      regulated_producttype_id:regulated_producttype_id
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe( 
        data => {
          this.regulatedSectionsData = data;
        });
  }

  onPremisesAppSelection() {

    if (this.premisesAppSelectionfrm.invalid) {
      this.toastr.error('Fill in all the Mandatory Fields', 'Alert!');

      return;
    }
    this.spinner.show();
    this.section_id = this.premisesAppSelectionfrm.get('section_id').value;
    this.business_type_id = this.premisesAppSelectionfrm.get('business_type_id').value;
    
    this.sub_module_id = 89;
    this.configService.getSectionUniformApplicationProces(this.sub_module_id, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.status=this.processData[0].application_status_id;
            this.router_link = this.processData[0].router_link;

            this.premisesapp_details = {business_type_id:this.business_type_id,module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id };
            this.appService.setPremisesApplicationDetail(this.premisesapp_details);
            this.app_route = ['./online-services/' + this.router_link];

            this.router.navigate(this.app_route);

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }


        });
    return false;
  }
  
}

