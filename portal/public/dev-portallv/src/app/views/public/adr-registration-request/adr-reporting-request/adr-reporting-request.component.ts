import { Component, OnInit,Input, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { PublicService } from 'src/app/services/public/public.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { WizardComponent } from 'ng2-archwizard';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AdverseDrugDetailsComponent } from 'src/app/views/public/adr-registration-request/adverse-drug-details/adverse-drug-details.component';
import DataGrid from "devextreme/ui/data_grid";
import CustomStore from 'devextreme/data/custom_store';
import { DomSanitizer } from '@angular/platform-browser';
import DataSource from 'devextreme/data/data_source';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';

@Component({
  selector: 'app-adr-reporting-request',
  templateUrl: './adr-reporting-request.component.html',
  styleUrls: ['./adr-reporting-request.component.css']
})
export class AdrReportingRequestComponent extends AdverseDrugDetailsComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  registeredGmpFrm:FormGroup;
  onApplicationSubmissionFrm:FormGroup;
  clinicaltrialSaeReportingdetailsfrm:FormGroup
  registeredGMPData:any ={};
  sectionsData:any;
  businessTypeData:any;
  application_code:any;
  tracking_no:any;
  app_route:any;
  businessTypeDetailsData:any;
  isApplicationSubmitwin:boolean = false;
  checkProductsSubmission: boolean = false;
  adr_resp: any;
  loading:any;


  // constructor(private spinner:SpinnerVisibilityService,private publicService:PublicService, private toastr:ToastrService, public modalService: NgxSmartModalService, private config:ConfigurationsService,public httpClient: HttpClient) {
    
  //   this.onLoadRegisteredGMP();

  //  }
  title:string = "Adverse Drug Reaction Request";

  ngOnInit() {
    this.registeredGmpFrm = new FormGroup({
      registration_no: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_name: new FormControl('', Validators.compose([])),
      registrant: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([])),
      
    });


    this.onLoadSections();
  }
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
    onProductApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = ['./public/app-home'];
    this.isApplicationSubmitwin = false;

  } 
  newProductTermscheckbox(e) {

    this.checkProductsSubmission = e.value;

  }
    onClickApplicationSubmitWin(){
    
    this.isApplicationSubmitwin = true;
}
  onSearchRegisteredgmp(){
    this.onLoadRegisteredGMP();
   /* this.spinner.show();
    this.publicService.OnSearchRegistrationDataSets(this.registeredGmpFrm.value,'onSearchPublicGmpComplaints')
      .subscribe(
        data => {
          if (data.success) {
              this.registeredGMPData = data.data;
          } else {
            this.toastr.error(data.message, 'Alert');
          }
        });
        */
  }
  onSavedApplication() {

    // const invalid = [];
    // const controls = this.clinicaltrialSaeReportingdetailsfrm.controls;
    // for (const name in controls) {
    //     if (controls[name].invalid) {
    //       this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
    //         return;
    //     }
    // }
    // if (this.clinicaltrialSaeReportingdetailsfrm.invalid) {
    //   return;
    // }


    
    this.spinner.show();
    this.publicService.onSaveApplication(this.clinicaltrialSaeReportingdetailsfrm.value,this.tracking_no, 'onSaveApplication')
      .subscribe(
        response => {
          this.adr_resp = response.json();
          //the details 
          if (this.adr_resp.success) {
            this.tracking_no = this.adr_resp.tracking_no;
            this.application_code = this.adr_resp.application_code;
            this.toastr.success(this.adr_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(1);

          } else {
            this.toastr.error(this.adr_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          
          this.spinner.hide();
        });
  }



  onLoadRegisteredGMP(){
    
    this.spinner.show();
    let me = this;
        var headers = new HttpHeaders({
          "Accept": "application/json"
        });
        this.registeredGMPData.store = new CustomStore({
          load: function (loadOptions: any) {
            let extra_params = me.registeredGmpFrm.value;
            let extra_paramsdata = JSON.stringify(extra_params);
              var params = '?';
              params += 'skip=' + loadOptions.skip;
              params += '&take=' + loadOptions.take;
              params += '&extra_paramsdata=' + extra_paramsdata;
              return me.httpClient.get(AppSettings.base_url + 'publicaccess/onSearchPublicGmpComplaints'+ params)
                  .toPromise()
                  .then((data: any) => {
                      return {
                          data: data.data,
                          totalCount: data.totalCount
                      }
                  })
                  .catch(error => { throw 'Data Loading Error' });
          }
      });
        
  }
  onLoadRegisteredGMP12(){
   

        this.spinner.show();
        let me = this;
            var headers = new HttpHeaders({
              "Accept": "application/json"
            });
            this.registeredGMPData.store = new CustomStore({
              load: function (loadOptions: any) {
                let extra_params = me.registeredGmpFrm.value;
                let extra_paramsdata = JSON.stringify(extra_params);
                  var params = '?';
                  params += 'skip=' + loadOptions.skip;
                  params += '&take=' + loadOptions.take;
                  params += '&extra_paramsdata=' + extra_paramsdata;
                  return me.httpClient.get(AppSettings.base_url + 'publicaccess/onSearchPublicGmpComplaints'+ params)
                      .toPromise()
                      .then((data: any) => {
                          return {
                              data: data.data,
                              totalCount: data.totalCount
                          }
                      })
                      .catch(error => { throw 'Data Loading Error' });
              }
          });
            

  }
  onResetRegisteredGMP(){
    this.registeredGmpFrm.reset();
    this.onLoadRegisteredGMP()
  }

  onSectionsCboSelect($event) {
    this.onBusinessTypesLoad($event.value);
  }
  onBusinessTypeCboSelect($event) {
    this.onBusinessTypesDetailsLoad($event.value);
  }
  onBusinessTypesLoad(section_id) {

    var data = {
      table_name: 'par_business_types',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypeData = data;
        },
        error => {
          return false
        });
  }
  onBusinessTypesDetailsLoad(business_type_id) {

    var data = {
      table_name: 'par_business_types',
      business_type_id: business_type_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypeDetailsData = data;
        },
        error => {
          return false
        });
  }

  
}
