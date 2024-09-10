import { Component, OnInit, ViewChild, NgModule, ViewContainerRef } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import {
  DxDataGridModule,
  DxDataGridComponent,
  DxTemplateModule
} from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-shared-dashboardclass',
  templateUrl: './shared-dashboardclass.component.html',
  styleUrls: ['./shared-dashboardclass.component.css']
})
@NgModule({
  imports: [
    DxDataGridModule,
    DxTemplateModule
  ],
  declarations: [],
  bootstrap: []
})

export class SharedDashboardclassComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  expanded = true;
  items = [];
  app_renewalduenotifications:number=0
  app_renewalduenotificationsdetails:any;
  isViewApplicationDueforRenewal:boolean = false;
  
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  itemCount = 0;
  premises_applications: any = [];
  title: string;
  processData: any;
  router_link: string;
  app_route: any;
  premisesapp_details: any;
  premises_resp: any;
  dtGMPApplicationData: any = [];
  //counters 
  approved_premises: number = 0;
  pending_submission: number = 0;
  queried_premises: number = 0;
  rejected_premises: number = 0;
  documents_submissions:number=0;
  submitted_application:number =0;
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;

  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  isApplicationRejectionVisible:boolean = false;
  printiframeUrl:string;
  applicationRejectionData:any;
  module_id:number =3;
  gmpappTypeData:any;
  contextMenuItems: any;
  gmpapp_details:any;
  sectionsData:any;
  applicationInspectionData:any;
  FilterDetailsFrm:FormGroup;
  applicationStatusData:any;
  sectionSelection:string;
  sectionsdata:string;
  //applicaiton selction definations 
  dtAppGuidelinesData: any = {};
  gmp_locationItem:any;

  gmp_type_id:number;
  manufacturing_site_id:number;
  GmpAppTypeData: any;
  dtAppsnProcessesData: any;
  
  GmpAppSelectionfrm: FormGroup;
  selectedAppData: any;
  Gmpapp_details: any;
  sectionItem: any;
  app_typeItem: any;
  section_id: number;
  sub_module_id: number;
  inspectionDate:any;
  inspectionHistoryData:any;
  gmpLocationData:any;
  gmpControl: FormControl;
  frmPreviewApplicationssDetails:FormGroup;
  frmInspectionConfirmationApplicationssDetails:FormGroup;
  isPreviewApplicationsDetails:boolean = false;
  isConfirmInspectionApplicationsDetails:boolean = false;
  isonRejection:boolean = false;
  isDismissApplicationWin:boolean=false;
  applicationDismissalFrm:FormGroup;
  inspectionHistorydetailsfrm:FormGroup;
  reasonForDismissalData:any;
  constructor(public viewRef: ViewContainerRef, public modalServ: ModalDialogService, public spinner: SpinnerVisibilityService, public toastr: ToastrService, public router: Router, public configService: ConfigurationsService, public appService: GmpApplicationServicesService,public utilityService:Utilities) {


    this.gmpControl = new FormControl('', Validators.compose([]));


    this.frmPreviewApplicationssDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),
      manufacturing_site_name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
     
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    });

    this.frmInspectionConfirmationApplicationssDetails = new FormGroup({
      customer_confirmation_id: new FormControl('', Validators.compose([Validators.required])),
      client_preferred_start_date:this.gmpControl,
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([Validators.required])),
      client_rejection_reason: this.gmpControl,
    });



    this.FilterDetailsFrm = new FormGroup({
      sub_module_id: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([])),
      application_status_id: new FormControl('', Validators.compose([]))
    });
    this.applicationDismissalFrm = new FormGroup({
      dismissal_reason_id: new FormControl('', Validators.compose([Validators.required])),
      dismissal_remarks: new FormControl('', Validators.compose([Validators.required])),
      application_code: new FormControl('', Validators.compose([Validators.required]))

    });
    this.GmpAppSelectionfrm = new FormGroup({
      section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
      gmp_type_id: new FormControl('', Validators.compose([Validators.required])),
    });
    this.onLoadGmpAppType(this.sub_module_id);
    this.onLoadreasonForDismissalData();
    this.onLoadApplicationstatuses();
    this.onLoadInspectionApplicationstatuses();
    this.onLoadPremisesCounterDetails(this.sub_module_id,this.gmp_type_id);
    this.onLoadInspectionHistoryDetails(this.manufacturing_site_id);
   }

  ngOnInit() {

   
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
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
  }

 onRejection($event) {

  if($event.value == 30){
      this.isonRejection = true;
      this.gmpControl.setValidators([Validators.required]);
      this.gmpControl.updateValueAndValidity();
  }
  else{
    this.isonRejection = false;
    this.gmpControl.clearValidators();
    this.gmpControl.updateValueAndValidity();

  }
}
onCellPrepared(e) {
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
  onSelectGmpsFilters() {
    
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let section_id = this.FilterDetailsFrm.get('section_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.reloadGMPApplications({sub_module_id:sub_module_id,section_id:section_id,application_status_id:application_status_id});

  }
 
  onClearPremisesFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadGMPApplications({});
    

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
  onLoadInspectionApplicationstatuses() {
    
    var data = {
      table_name: 'par_system_statuses'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.inspectionDate =  data;
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
  
  reloadGMPApplications(filter_params) {
    filter_params.sub_module_id = this.sub_module_id;
    filter_params.gmp_type_id = this.gmp_type_id;
    this.appService.onGMPApplicationLoading(filter_params)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtGMPApplicationData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  }
  onLoadingActionMenu(e, data) {

  }
  onLoadGmpAppType(sub_module_id) {
    
    var data = {
      table_name: 'sub_modules',
    sub_module_id:sub_module_id,

      module_id: 3
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.gmpappTypeData =  data;
        });
  }

  onLoadreasonForDismissalData() {
    
    var data = {
      table_name: 'par_applicationdismissal_reasons'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.reasonForDismissalData =  data;
        });
  }
  onLoadPremisesCounterDetails(sub_module_id,gmp_type_id) {

    this.appService.onLoadGmpCounterDetails({sub_module_id:this.sub_module_id,gmp_type_id:this.gmp_type_id})
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
            // this.dtGMPApplicationData = data.data;
            for (let rec of records) {

              if (rec.status_id == 1) {
                this.pending_submission = rec.application_counter;
              } if (rec.status_id == 6 || rec.status_id == 8  || rec.status_id == 9) {
                this.queried_premises += rec.application_counter;
              } if (rec.status_id == 10) {
                this.approved_premises = rec.application_counter;
              } if (rec.status_id == 11) {
                this.rejected_premises = rec.application_counter;
              }
              if (rec.status_id == 27 || rec.status_id == 28) {
                this.documents_submissions += rec.application_counter;
              }if (rec.status_id == 2 || rec.status_id == 3) {
                    this.submitted_application = rec.application_counter;
              }
              //
            }
          }

        });
  }
  funcApplicationRejection(app_data){
    
    //this.spinner.show();
        this.utilityService.getApplicationPreRejectionDetails(app_data.application_code,'wb_gmp_applications', 'application_status_id')
        .subscribe(
          data => {
            this.applicationRejectionData = data.data;
            this.spinner.hide();
            this.isApplicationRejectionVisible= true;
          });
  }
  
  funcPrintApplicationDetails(app_data){
    //print details 
  
    let report_url = "http://localhost:4200/#/online-services/premisesreg-dashboard";
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
        this.printReportTitle= "Premises Application Details";
        this.isPrintReportVisible = true;
        
    }
    singleApplicationActionColClick(data){
    
      this.funcActionsProcess(data.action,data);
  
    }
    funcActionsProcess(action_btn,data){
console.log(action_btn);

      if (action_btn === 'edit') {
        this.funcGMPPreveditDetails(data);
      }
      else if (action_btn === 'preview') {
        this.funcGMPPreviewDetails(data);
      } else if (action_btn === 'confirm_dates') {
        this.funcGMPConfirmDetails(data);
        this.selectedAppData = data;

      }
      else if (action_btn == 'print_applications') {
        this.funcPrintApplicationDetails(data);
      }
      else if (action_btn == 'archive') {
        this.funcPremiseArchiveApplication(data);
      }
      else if (action_btn == 'pre_rejection') {
        this.funcApplicationRejection(data);
      }
      else if (action_btn == 'query_response') {
  
        this.funcGMPPreveditDetails(data);
  
      }else if(action_btn == 'processing_details'){
        
        this.onLoadApplicationProcessingData(data);
      
      }else if(action_btn == 'gmpdocuments_submission'){
        
        this.funcGMPDocumentsSubmissions(data);
      
      }else if(action_btn == 'print_invoice'){
        
        this.funcPrintApplicationInvoice(data);
  
      } else if(action_btn == 'print_rejectionletter'){
        
        this.funcPrintLetterofRejection(data);
  
      } else if(action_btn == 'print_approvalletter'){
        
        this.funcgenerateGmpApprovalLetter(data);
  
      }else if(action_btn == 'reg_certificate'){
        
        this.funcPrintPremisesRegistrationCertificate(data);
  
      }else if(action_btn == 'dismiss_applications'){
        
        this.funcDismissApplication(data);
  
      }else if(action_btn == 'print_receipt'){
        
        this.funcPrintApplicationReceipts(data);
      }
  

    }
  premActionColClick(e, data) {
    var action_btn = e.itemData;

      var action_btn = e.itemData;
      this.funcActionsProcess(action_btn.action,data.data);
  
  }
  funcDismissApplication(data){
    this.applicationDismissalFrm.get('application_code').setValue(data.application_code)
    this.isDismissApplicationWin = true;
  }
  onSubmitApplicationDismissal(data){

    if (this.applicationDismissalFrm.invalid) {
      return;
    }
    this.utilityService.onSubmitApplicationDismissal('tra_gmp_applications','wb_gmp_applications',this.applicationDismissalFrm.value, data.application_code )
    .subscribe(
      data => {
        
        let app_resp = data.json();
        if (app_resp.success) {

          this.toastr.success(app_resp.message, 'Response');
          this.isDismissApplicationWin = false;
          this.reloadGMPApplications({});

        }else{
          this.toastr.error(app_resp.message, 'Alert');
        }
        

      });

  }
  funcgenerateGmpApprovalLetter(app_data){

    let report_url = this.mis_url+'reports/generateGmpApprovalLetter?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_gmp_applications";
    this.funcGenerateRrp(report_url,"Report")
  }
  funcPrintPremisesRegistrationCertificate(app_data){

    let report_url = this.mis_url+'reports/generateGmpCertificate?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_gmp_applications";
    this.funcGenerateRrp(report_url,"Report")
    
  }
  funcPrintApplicationInvoice(app_data){

    let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_gmp_applications";
    this.funcGenerateRrp(report_url,"Report")
    
  }
  funcPrintApplicationReceipts(app_data){
      this.utilityService.setApplicationDetail(app_data);
      this.app_route = ['./online-services/application-payments'];
    
      this.router.navigate(this.app_route);

  }
  funcPrintLetterofRejection(app_data){
      //print details

      let report_url = this.mis_url+'reports/generatePremisesRejectionLetter?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Application Details");

  }
 
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  funcGMPPreviewDetails(data){
    this.isPreviewApplicationsDetails = true;
    this.frmPreviewApplicationssDetails.patchValue(data);

}

funcGMPConfirmDetails(app_data) {
  this.utilityService.getApplicationInspectionDetails(app_data.application_code, 'tra_gmp_inspection_dates', 'application_status_id')
    .subscribe(
      resp_data => {
        if (resp_data.success && resp_data.data.length > 0) {
          const inspectionData = resp_data.data[0];
          this.frmInspectionConfirmationApplicationssDetails.patchValue({
            start_date: inspectionData.start_date,
            end_date: inspectionData.end_date
          });

          this.isConfirmInspectionApplicationsDetails = true;
          this.spinner.hide();

        } else {
          this.toastr.error(resp_data.message, 'Alert!');
        }
      },
      error => {
        // Handle errors if needed
      }
    );
}

onSaveInspectionDetails() {
  this.appService.onSaveInspectionDetails(this.selectedAppData.application_code, this.frmInspectionConfirmationApplicationssDetails.value)
    .subscribe(
      response => {
        let gmp_resp = response.json();
        if (gmp_resp.success) {
          this.toastr.success(gmp_resp.message, 'Response');
          this.isConfirmInspectionApplicationsDetails = false;
          this.frmInspectionConfirmationApplicationssDetails.reset();
        } else {
          this.toastr.error(gmp_resp.message, 'Alert');
        }
      },
      error => {
        // Handle errors if needed
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
  funcGMPApplicationSelectcion() {

    this.app_route = ['./online-services/gmp-applications-selection'];
    this.router.navigate(this.app_route);
  }
  onLoadInspectionHistoryDetails(manufacturing_site_id) {
    this.appService.onLoadInspectionHistoryDetails(manufacturing_site_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.inspectionHistoryData = data.data;
        },
        error => {
          return false
        });
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
    this.reloadGMPApplications({});
  }
  funcPremiseArchiveApplication(data) {
    this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_gmp_applications', this.reloadGMPApplications);
    
  }
  funcGMPPreveditDetails(app_data) {
    
    this.spinner.show();
    this.appService.queryGMPApplicationDetails(app_data.application_id)
      .subscribe(
        data => {
          this.processData = data.data;
          this.spinner.hide();
          if (data.success) {
            this.title = this.processData[0].process_title;
            this.router_link = this.processData[0].router_link;
            // this.router_link = this.processData[0].router_link;
              this.appService.setGmpApplicationDetail(this.processData[0]);
              if(this.processData[0].section_id == 2){
                
                this.app_route = ['./online-services/new-gmp-applications'];

              }
              else{
                if(this.router_link == ''){
                  this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
                  return;
                }
                this.app_route = ['./online-services/' + this.router_link];

              }
              
              this.router.navigate(this.app_route);
           

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }

        });
  }
  funcGMPDocumentsSubmissions(app_data) {
    this.spinner.show();
    this.appService.queryGMPApplicationDetails(app_data.application_id)
      .subscribe(
        data => {
          this.processData = data.data;
          this.spinner.hide();
          if (data.success) {
            console.log(this.processData[0]);
            this.title = this.processData[0].process_title;
            this.router_link = this.processData[0].router_link;
       
              this.appService.setGmpApplicationDetail(this.processData[0]);

              this.app_route = ['./online-services/' + this.router_link];

              this.router.navigate(this.app_route);
           
          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }

        });
  }
  
  onViewRegisteredGMPApps(registration_status,validity_status,process_title){

      
    this.gmpapp_details = {registration_status: registration_status, process_title: process_title, validity_status: validity_status};
    this.appService.setGmpApplicationDetail(this.gmpapp_details);

    this.app_route = ['./online-services/registered-gmpapplications'];

    this.router.navigate(this.app_route);

}
//details 

onLoadgmpLocationData(gmp_type_id) {
  var data = {
    table_name: 'par_gmplocation_details',
    gmp_type_id:gmp_type_id
  };

  this.configService.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.gmpLocationData = data;
      });
}

onApplicationProcessGuidelines() {
  var data = {
    table_name: 'par_sections',
    module_id: 2
  };
  this.configService.onApplicationProcessGuidelines(data)
    .subscribe(
      data => {
        if(data.success){
           this.dtAppGuidelinesData = data.data;
        }
        
      });
}

}