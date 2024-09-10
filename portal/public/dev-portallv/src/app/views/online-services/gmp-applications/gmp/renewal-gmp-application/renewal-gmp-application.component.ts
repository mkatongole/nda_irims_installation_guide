import { Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject, combineLatest  } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedGmpapplicationclassComponent } from '../../shared-gmpapplicationclass/shared-gmpapplicationclass.component';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

  @Component({
    selector: 'app-renewal-gmp-application',
    templateUrl: './renewal-gmp-application.component.html',
    styleUrls: ['./renewal-gmp-application.component.css']
  })
export class RenewalGmpApplicationComponent extends SharedGmpapplicationclassComponent implements OnInit {

  is_readonly:boolean = true;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 
    super(modalServ, viewRef, spinner, configService, appService, router, formBuilder, config, modalService, toastr, authService,dmsService,utilityService,httpClient)

}

ngOnInit() {
  this.gmpapp_details = this.appService.getGmpApplicationDetail();

  if (!this.gmpapp_details) {
    this.router.navigate(['./../online-services/renewalgmpapplications-dashboard']);
    return;
  }else{
      this.sub_module_id = this.gmpapp_details.sub_module_id;
      this.process_title = this.gmpapp_details.process_title;
      this.section_id = this.gmpapp_details.section_id;
      this.manufacturing_site_id = this.gmpapp_details.manufacturing_site_id;
      this.tracking_no = this.gmpapp_details.tracking_no;
      this.country_id = this.gmpapp_details.country_id;
      this.region_id = this.gmpapp_details.region_id;
      this.block_id = this.gmpapp_details.manufacturingsite_block_id;
      this.status_name = this.gmpapp_details.status_name;
      this.status_id = this.gmpapp_details.application_status_id;
      this.module_id = this.gmpapp_details.module_id;
      this.gmp_type_id = this.gmpapp_details.gmp_type_id;
      this.initial_site_id =this.gmpapp_details.initial_site_id;
  }

this.appService.onLoadInspectionHistoryDetails(this.manufacturing_site_id).subscribe(
  data => {
    const inspectionDetails = data.data && data.data.length > 0 ? data.data[0] : null;

    if (inspectionDetails) {
      this.inspectionHistorydetailsfrm.patchValue(inspectionDetails);

    } else {
      console.error('No inspection details found.');
    }
  },
  error => {
    console.error('Error loading inspection history details:', error);
  }
);

   if(this.gmp_type_id== 2){
      this.gmppreInspectionGeneraldetailsfrm.patchValue(this.gmpapp_details);

    }else{
      this.gmpapplicationGeneraldetailsfrm.patchValue(this.gmpapp_details);

    }

}


onSaveGMPApplication() {

    if(this.gmp_type_id == 2){

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
            if (this.gmp_resp.success) {
              this.toastr.success(this.gmp_resp.message, 'Response');
              this.onLoadPremisesOtherDetails(this.manufacturing_site_id);
              this.onLoadgmpProductLineDataRows(this.manufacturing_site_id);
              this.onLoadPremisesPersonnelDetails(this.manufacturing_site_id);
              this.onLoadPremisesPersonnelDetails(this.manufacturing_site_id);
              this.onLoadgmpManufacturingBlocksData(this.manufacturing_site_id);
              this.onLoadgmpproductDetailsInformationData(this.manufacturing_site_id);
              this.wizard.model.navigationMode.goToStep(1);

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
      this.appService.onSaveRenewalGmpApplication(this.manufacturing_site_id, this.gmpapplicationGeneraldetailsfrm.value, this.tracking_no)
        .subscribe(
          response => {
            this.gmp_resp = response.json();
            //the details 
            this.spinner.hide();
            this.tracking_no = this.gmp_resp.tracking_no;
            this.manufacturing_site_id = this.gmp_resp.manufacturing_site_id;
            this.application_code =  this.gmp_resp.application_code;
            if (this.gmp_resp.success) {
              this.toastr.success(this.gmp_resp.message, 'Response');
              this.onLoadPremisesOtherDetails(this.manufacturing_site_id);
              this.onLoadgmpProductLineDataRows(this.manufacturing_site_id);
              this.onLoadPremisesPersonnelDetails(this.manufacturing_site_id);
              this.onLoadPremisesPersonnelDetails(this.manufacturing_site_id);
              this.onLoadgmpManufacturingBlocksData(this.manufacturing_site_id);
              this.onLoadgmpproductDetailsInformationData(this.manufacturing_site_id);
              this.wizard.model.navigationMode.goToStep(1);

            } else {
              this.toastr.error(this.gmp_resp.message, 'Alert');
            }
          },
          error => {
            this.loading = false;
          });

    }






  }

onSaveGMPHistoryApplication() {
    if (this.inspectionHistorydetailsfrm.invalid) {
    }
    
    this.spinner.show();
    this.appService.onSaveGmpHistoryInformation(this.manufacturing_site_id, this.inspectionHistorydetailsfrm.value)
      .subscribe(
        response => {
          this.gmp_resp = response.json();
          //the details 
          this.spinner.hide();
          this.manufacturing_site_id = this.gmp_resp.manufacturing_site_id;
          if (this.gmp_resp.success) {
            this.toastr.success(this.gmp_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(2);

          } else {
            this.toastr.error(this.gmp_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }






  funcSelectTraderDetails(data) {
    let record = data.data;
    this.gmpapplicationGeneraldetailsfrm.get('local_agent_name').setValue(record.trader_name);
     this.gmpapplicationGeneraldetailsfrm.get('local_agent_id').setValue(record.id);
    
    this.modalService.getModal('traderAccountsDetailsModal').close();

  }
  onFUncCloseQueryWindow(){
    this.isInitalQueryResponseFrmVisible = false;
  }
}
