import { Component, OnInit, ViewChild, NgModule, ViewContainerRef } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { PremisesApplicationsService } from '../../../../services/premises-applications/premises-applications.service';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Router } from '@angular/router';
import { Subject} from 'rxjs';

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

@Component({
  selector: 'app-drugshop-reg-dashboard',
  templateUrl: './drugshop-reg-dashboard.component.html',
  styleUrls: ['./drugshop-reg-dashboard.component.css']
})
export class DrugshopRegDashboardComponent implements OnInit {
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
  drugshopappTypeData:any;
  premisessapp_details:any;
  module_id:number = 29;
  businessTypeDetailsData:any;
  sectionsData:number;
  
   applicationStatusData:number;
   FilterDetailsFrm:FormGroup;
   applicationDismissalFrm:FormGroup;
   isDismissApplicationWin:boolean = false;
   reasonForDismissalData:any;
   isWholePremises:boolean = false;
   isPreviewApplicationsDetails:boolean = false;
   frmPreviewApplicationssDetails:FormGroup;
   premises_dashboardtitle:string;
   sub_module_id:number;
   business_typecategory_id:number;
   businessTypesData:any;
   prodProductTypeData:any;
   premiseClassData:any;
   regulatedSectionsData:any;
   isPremisesApplicationInitialisation:boolean;
   premisesAppSelectionfrm:FormGroup;
   section_id:number;
   report_type_id:number;
   business_type_id:7;
  constructor(private utilityService:Utilities,private viewRef: ViewContainerRef,private modalServ: ModalDialogService, private spinner: SpinnerVisibilityService,public toastr: ToastrService, private router: Router, private configService: ConfigurationsService, private appService: PremisesApplicationsService) {

    
    this.frmPreviewApplicationssDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status_name: new FormControl('', Validators.compose([Validators.required]))
    });
    this.FilterDetailsFrm = new FormGroup({
      sub_module_id: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([])),
      product_classification_id: new FormControl('', Validators.compose([])),
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
    this.onLoadBusinessTypesLoad();
    this.onLoadApplicationstatuses();
    this.onLoadSections();
    this.onLoadreasonForDismissalData();
    this.onLoadApplicationCounterDueforRenewal();
    this.onLoadprodProductTypeData();
    this.onBusinessTypesDetailsLoad();
   }
  
  ngOnInit() {
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
    
    let product_classification_id = this.FilterDetailsFrm.get('product_classification_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id,product_classification_id:product_classification_id,application_status_id:application_status_id});

  }
  onClearPremisesFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});


  }  
 
  reloadPremisesApplications(filter_params={}) {

    this.appService.onPremisesApplicationLoading(filter_params)
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
          this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

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
  
  onLoadSections() {
    var data = {
      table_name: 'par_premise_class',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.premiseClassData = data;
        });
  }


  onLoadDrugshopAppType(sub_module_id) {
    var data = {
      table_name: 'sub_modules',
      module_id: 29,
      sub_module_id:this.sub_module_id
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.drugshopappTypeData =  data;
        });
  }
  onClickSubModuleAppSelection(sub_module_id,sub_module_name){

    if(sub_module_id == 97){
       this.premisessapp_details = {businsess_type_id:7,module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
      this.appService.setPremisesApplicationDetail(this.premisessapp_details);
      //this.isPremisesApplicationInitialisation = true;
     this.app_route = ['./online-services/drugshopspreinspection-application'];
    this.router.navigate(this.app_route);
    }else{

      this.premisessapp_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
      this.appService.setPremisesApplicationDetail(this.premisessapp_details);

      this.app_route = ['./online-services/registered-application-selection'];

      this.router.navigate(this.app_route);
    }

  }
  onLoadPremisesCounterDetails(sub_module_id) {

    this.utilityService.onLoadApplicationCounterDetails('wb_premises_applications',sub_module_id)
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
             // this.dtPremisesApplicationData = data.data;
             for(let rec of records){
             
                  if(rec.status_id == 1){
                  
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

// onLoadApplicationSystemReportsType() {
//   this.utilityService.onLoadApplicationSystemReportsType('par_systemreport_types')
//     .subscribe(data => {
//       if (data.success) {
//         if (Array.isArray(data.records)) {
//           let records = data.records;
//           this.reportTypeIds = records.map(record => record.id);
//         } else {
//           console.error('Data is not in the expected format.');
//         }
//       } else {
//         console.error('Data retrieval was not successful.');
//       }
//     });
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
singleApplicationActionColClick(data) {
  this.funcActionsProcess(data.action, data);
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
      const report_type_id = 3;
      let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&report_type_id="+report_type_id+"&table_name=tra_premises_applications";
      let documentUrl;
      fetch(report_url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
           documentUrl = data.document_url;
          this.funcGenerateRrp(documentUrl,"Application Certificate")

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    }
  funcPrintPremisesBusinessPermit(app_data){
        const report_type_id = 3; 
        let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&report_type_id="+report_type_id+"&table_name=tra_premises_applications";
        let documentUrl;
        fetch(report_url)
          .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
         })
          .then(data => {
             documentUrl = data.document_url;
            this.funcGenerateRrp(documentUrl,"Business Permits")

          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
  }
  
  funcPrintApplicationInvoice(app_data){
      const report_type_id = 1 
      let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&report_type_id="+report_type_id+"&table_name=tra_premises_applications";
      let documentUrl;
        fetch(report_url)
          .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
          .then(data => {
             documentUrl = data.document_url;
            this.funcGenerateRrp(documentUrl,"Application Invoice")

          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });    
  }
  funcPrintApplicationReceipts(app_data){
    this.utilityService.setApplicationDetail(app_data);
    this.app_route = ['./online-services/application-payments'];
   
    this.router.navigate(this.app_route);

  
}
  funcPrintLetterofRejection(app_data){
      const report_type_id = 3
      let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&report_type_id="+report_type_id+"&table_name=tra_premises_applications";
      let documentUrl;
        fetch(report_url)
          .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
          .then(data => {
             documentUrl = data.document_url;
            this.funcGenerateRrp(documentUrl,"Application Details")

          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          }); 
  }
  funcPrintApplicationDetails(app_data){
    //print details
  
       const report_type_id = 4; 
      let report_url = this.mis_url+'reports/getReportUrl?application_code='+app_data.application_code+"&report_type_id="+report_type_id;
      this.funcGenerateRrp(report_url,"Application Details");
   
  }
  funcGenerateRrp(documentUrl,title){
    this.printiframeUrl =  this.configService.returnReportIframe(documentUrl);
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
      this.reloadPremisesApplications({sub_module_id:this.sub_module_id});   
  }
  funcPremiseArchiveApplication(data){
   this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_premises_applications', this.reloadPremisesApplications)
   

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
            if(data.success){
                  this.title = this.processData.process_title;
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
    onLoadBusinessTypesLoad() {
    this.appService.onLoadBusinessTypesLoad()
      .subscribe(
        data_response => {
          this.businessTypesData = data_response.data;
        },
        error => {
          return false
        });

  }
  // onBusinessTypesLoad(business_type_id) {

  //   var data = {
  //     table_name: 'par_business_types',
  //      business_type_id:business_type_id
  //   };
  //   this.configService.onLoadConfigurationData(data)
  //     .subscribe(
  //       data => {
  //         this.businessTypesData = data;
  //       },
  //       error => {
  //         return false
  //       });
  // }
   
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
    
    this.sub_module_id = 97;
    this.configService.getSectionUniformApplicationProces(this.sub_module_id, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
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

