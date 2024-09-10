import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { SharedClinicaltrialComponent } from '../shared-clinicaltrial/shared-clinicaltrial.component';
@Component({
  selector: 'app-newclinical-trial',
  templateUrl: './newclinical-trial.component.html',
  styleUrls: ['./newclinical-trial.component.css']
})
export class NewclinicalTrialComponent extends SharedClinicaltrialComponent implements OnInit {
 
  sub_module_id: number = 10;
  appmodule_id:number;

  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/newclinical-trialsdashboard']);
      return
    }
    this.application_details = this.appService.getApplicationDetail();
    this.appmodule_id = this.module_id;
    
    this.clinicaltrialGeneraldetailsfrm.patchValue(this.application_details);
    this.clinicaltrialObjectiveGeneraldetailsfrm.patchValue(this.application_details);
    this.clinicaltrialStudyGeneraldetailsfrm.patchValue(this.application_details);  
    this.clinicaltrialMonitoringReportdetailsfrm.patchValue(this.application_details);
    this.clinicaltrialDescriptionGeneraldetailsfrm.patchValue(this.application_details); 
    this.clinicaltrialEndpointGeneraldetailsfrm.patchValue(this.application_details);
    this.clinicaltrialGeneralExclusiondetailsfrm.patchValue(this.application_details);
    this.nonClinicaltrialPharmacologyfrm.patchValue(this.application_details);
    this.nonClinicaltrialtoxicologyfrm.patchValue(this.application_details);
    
  }

  onSaveClincialTrialApplication() {
    const invalid = [];
    const controls = this.clinicaltrialGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.clinicaltrialGeneraldetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.clinicaltrialGeneraldetailsfrm.value, this.tracking_no, 'clinicaltrials/saveClinicalTrialApplication')
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
  onSaveClincialTrialDescriptionApplication() {
      const invalid = [];
    const controls = this.clinicaltrialObjectiveGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.clinicaltrialObjectiveGeneraldetailsfrm.value, this.tracking_no, 'clinicaltrials/onSaveClincialTrialDescriptionApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.application_id = this.app_resp.application_id;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(8);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onSaveClincialTrialOthersApplication() {
   const invalid = [];
    const controls = this.clinicaltrialObjectiveGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.clinicaltrialDescriptionGeneraldetailsfrm.value, this.tracking_no, 'clinicaltrials/onSaveClincialTrialOthersApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.application_id = this.app_resp.application_id;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(9);

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }

onSaveNonClincialTrialPharmacology() {
   const invalid = [];
    const controls = this.nonClinicaltrialPharmacologyfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.nonClinicaltrialPharmacologyfrm.value, this.tracking_no, 'clinicaltrials/onSaveNonClincialTrialPharmacology')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.application_id = this.app_resp.application_id;
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }

  onSaveNonClincialTrialToxicology() {
   const invalid = [];
    const controls = this.nonClinicaltrialtoxicologyfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.nonClinicaltrialtoxicologyfrm.value, this.tracking_no, 'clinicaltrials/onSaveNonClincialTrialToxicology')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.application_id = this.app_resp.application_id;
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }

  onSaveClincialTrialEthicsApplication() {
    if (this.clinicaltrialStudyGeneraldetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.clinicaltrialStudyGeneraldetailsfrm.value, this.tracking_no, 'clinicaltrials/onSaveClincialTrialEthicsApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.application_id = this.app_resp.application_id;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(6);

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }    
  onSaveMonitoringApplication() {
    if (this.clinicaltrialMonitoringReportdetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.clinicaltrialMonitoringReportdetailsfrm.value, this.tracking_no, 'clinicaltrials/onSaveMonitoringApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.application_id = this.app_resp.application_id;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(7);

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
    onSaveClincialTrialParticipantsApplication() {
    if (this.clinicaltrialEndpointGeneraldetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.clinicaltrialEndpointGeneraldetailsfrm.value, this.tracking_no, 'clinicaltrials/onSaveClincialTrialParticipantsApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.application_id = this.app_resp.application_id;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(4);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
    onSaveClincialTrialHistoryApplication() {
    if (this.clinicaltrialGeneralExclusiondetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.clinicaltrialGeneralExclusiondetailsfrm.value, this.tracking_no, 'clinicaltrials/onSaveClincialTrialHistoryApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.application_id = this.app_resp.application_id;
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(5);

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }

  onClinicalDashboard() {
    this.app_route = ['./online-services/newclinical-trialsdashboard'];

    this.router.navigate(this.app_route);
  }  onPermitsApplicationSubmit() {
    this.app_route = ['./online-services/newclinical-trialsdashboard'];
    if(this.status_id == 1){
      if (this.onApplicationSubmissionFrm.invalid) {
        
        this.toastr.error('Fill in the submission details to proceed!!', 'Alert');
        return;
      }
    }
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_clinical_trial_applications', this.app_route,this.onApplicationSubmissionFrm.value);
  }
}

