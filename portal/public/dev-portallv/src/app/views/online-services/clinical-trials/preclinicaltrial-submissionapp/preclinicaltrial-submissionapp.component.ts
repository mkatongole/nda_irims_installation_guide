
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SharedClinicaltrialComponent } from '../shared-clinicaltrial/shared-clinicaltrial.component';
@Component({
  selector: 'app-preclinicaltrial-submissionapp',
  templateUrl: './preclinicaltrial-submissionapp.component.html',
  styleUrls: ['./preclinicaltrial-submissionapp.component.css']
})
export class PreclinicaltrialSubmissionappComponent extends SharedClinicaltrialComponent implements OnInit {
 
  sub_module_id: number = 69;
  appmodule_id:number;
 // preSubmissionGeneraldetailsfrm:FormGroup;

  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/preclinical-trialsubsdashboard']);
      return
    }
    this.application_details = this.appService.getApplicationDetail();
    this.appmodule_id = this.module_id;
    
    this.preSubmissionGeneraldetailsfrm.patchValue(this.application_details);

  }

  onSaveClincialTrialApplication() {


      const invalid = [];
    const controls = this.preSubmissionGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.preSubmissionGeneraldetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.preSubmissionGeneraldetailsfrm.value, this.tracking_no, 'clinicaltrials/saveClinicalTrialApplication')
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
  } onPreSubmissionDashboard() {
    this.app_route = ['./online-services/preclinical-trialsubsdashboard'];
    this.router.navigate(this.app_route);
  }
  onPermitsApplicationSubmit() {
    this.app_route = ['./online-services/preclinical-trialsubsdashboard'];
    if(this.status_id == 1){
      if (this.onApplicationSubmissionFrm.invalid) {
        
        this.toastr.error('Fill in the submission details to proceed!!', 'Alert');
        return;
      }
    }
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_clinical_trial_applications', this.app_route,this.onApplicationSubmissionFrm.value);
  }
}

