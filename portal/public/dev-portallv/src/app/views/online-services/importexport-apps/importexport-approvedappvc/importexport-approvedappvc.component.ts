import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImportexportDashboardComponent } from '../importexport-dashboard/importexport-dashboard.component';

@Component({
  selector: 'app-importexport-approvedappvc',
  templateUrl: './importexport-approvedappvc.component.html',
  styleUrls: ['./importexport-approvedappvc.component.css']
})
export class ImportexportApprovedappVCComponent implements OnInit {
  title:string;
  app_route:any;dtImportExpApplicationData: any = [];
  application_details:any;
  module_id:number;
  sub_module_id:number;
  application_id: number;
  tracking_no: number;
  application_code : number;
  status_name:string;
  status_id:string;
  process_title:string;
  section_id:number;
  port_of_declaration_id:number;
  is_registered: number;
  vc_application_types:any;
  processData:any;
  router_link:any;
  applicationSelectionfrm: FormGroup;
  
  constructor(public toastr: ToastrService,public utilityService: Utilities,public modalServ: ModalDialogService,public viewRef: ViewContainerRef,public spinner: SpinnerVisibilityService,private configService: ConfigurationsService, private appService: ImportexportService,private router: Router ) { }

 
  ngOnInit() {
    this.application_details = this.appService.getApplicationDetail();

    console.log(this.application_details);
    if (!this.application_details) {
      this.router.navigate(['./../online-services/declaration-dashboard']);
      return;
    }
    else{
      this.sub_module_id = this.application_details.sub_module_id;
      this.process_title = this.application_details.process_title;
      this.section_id = this.application_details.section_id;

      this.application_id = this.application_details.application_id;
      this.port_of_declaration_id = this.application_details.port_of_declaration_id;
      this.tracking_no = this.application_details.tracking_no;
      this.module_id = this.application_details.module_id;
      this.status_name = this.application_details.status_name;
      this.status_id = this.application_details.application_status_id;
      this.application_code = this.application_details.application_code;

    }
    this.reloadPermitApplicationsApplications(this.port_of_declaration_id);
  }
  funcSelectapprovedPermitforammend(data){
    let applicationdata = data.data;
     
    delete applicationdata.application_id;
    delete applicationdata.module_id;
    delete applicationdata.sub_module_id;
    delete applicationdata.application_status_id;
   
  
         delete applicationdata.status_id;
         this.section_id = applicationdata.section_id;
          this.sub_module_id =  this.sub_module_id;

          this.configService.getSectionUniformApplicationProces(this.sub_module_id, 1)
            .subscribe(
              data => {
                this.processData = data;
                this.spinner.hide();
                if (this.processData.success) {
                  this.application_details = this.appService.getApplicationDetail();
                  console.log(this.application_details);
                  this.title = this.processData[0].name;
                  this.router_link = this.processData[0].router_link;
                  applicationdata.module_id = this.module_id;
                  applicationdata.process_title = this.title;
                  applicationdata.sub_module_id = this.sub_module_id;
                  applicationdata.section_id = this.section_id;
                  applicationdata.status_id = 1;

                  applicationdata.status_name = 'New';


                  this.appService.setApplicationDetail(applicationdata);

                  this.app_route = ['./online-services/' + this.router_link];

                  this.router.navigate(this.app_route);
                }
                else {
                  this.toastr.error(this.processData.message, 'Alert!');

                }
              });
          return false;
     

   }
   onImportappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        hidden: true,
        options: {
          icon: 'refresh',hidden: true,
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  refreshDataGrid() {

  }
  reloadPermitApplicationsApplications(port_of_declaration_id) {
    let filter_params = {application_status_id: '10' , sub_module_id: '12', port_of_declaration_id : port_of_declaration_id };
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
  
}
