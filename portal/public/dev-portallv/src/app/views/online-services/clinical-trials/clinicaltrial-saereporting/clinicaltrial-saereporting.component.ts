import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { SharedClinicaltrialComponent } from '../shared-clinicaltrial/shared-clinicaltrial.component';

@Component({
  selector: 'app-clinicaltrial-saereporting',
  templateUrl: './clinicaltrial-saereporting.component.html',
  styleUrls: ['./clinicaltrial-saereporting.component.css']
})
 export class ClinicaltrialSaereportingComponent extends SharedClinicaltrialComponent implements OnInit {

  appmodule_id:number;
  sub_module_id = 102;
  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/clinicaltrial-saerptdashboard']);
      return
    }
    this.application_details = this.appService.getApplicationDetail();
    this.appmodule_id = this.module_id;
    this.clinicaltrialSaeReportingdetailsfrm.patchValue(this.application_details);
    this.clinicaltrialConcomitantdetailsfrm.patchValue(this.application_details);
  }


  onSaveClincialTrialApplication() {

    if (this.clinicaltrialSaeReportingdetailsfrm.invalid) {
      return;
    }

     this.spinner.show();

    this.appService.onSavePermitApplication(this.application_id,this.clinicaltrialSaeReportingdetailsfrm.value, this.tracking_no, 'clinicaltrials/saveCtrSaeReportingApplication')
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

 onSaveClincialConcomitantDrugs() {

    if (this.clinicaltrialConcomitantdetailsfrm.invalid) {
      return;
    }

     this.spinner.show();

    this.appService.onSavePermitApplication(this.application_id,this.clinicaltrialConcomitantdetailsfrm.value, this.tracking_no, 'clinicaltrials/onSaveClincialConcomitantDrugs')
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

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }  






  onClinicalDashboard() {
    this.app_route = ['./online-services/clinicaltrial-saerptdashboard'];

    this.router.navigate(this.app_route);
  }onPermitsApplicationSubmit() {
    this.app_route = ['./online-services/clinicaltrial-saerptdashboard'];
    if(this.status_id == 1){
      if (this.onApplicationSubmissionFrm.invalid) {
        
        this.toastr.error('Fill in the submission details to proceed!!', 'Alert');
        return;
      }
    }
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_clinical_trial_applications', this.app_route,this.onApplicationSubmissionFrm.value);
  }
}

