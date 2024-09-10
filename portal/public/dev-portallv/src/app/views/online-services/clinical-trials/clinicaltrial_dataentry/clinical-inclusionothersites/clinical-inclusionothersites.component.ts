import { Component, OnInit, Input, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Utilities } from 'src/app/services/common/utilities.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-clinical-inclusionothersites',
  templateUrl: './clinical-inclusionothersites.component.html',
  styleUrls: ['./clinical-inclusionothersites.component.css']
})
export class ClinicalInclusionothersitesComponent implements OnInit {

  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() section_id: number;
  @Input() reg_clinical_trial_id: number;
  @Input() is_readonly: boolean;
  @Input() clinicaltrialGeneralExclusiondetailsfrm:FormGroup;
  @Input() clinicalTrialControl: FormControl;
  is_clinicalin_othercountry:any;
  is_prevclinicalin_othercountry:any;
  is_clinicalin_uganda:any;
  confirmationData:any;
  confirmationparameterData:any;
  parameterData:any;
  app_resp:any;

  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
    
    
  }
  ngOnInit() {
    this.onLoadconfirmationDataData();
    this.onLoadconfirmationParameterDataData();
    this.onLoadparameterDataData();

  } 
  adjustTextAreaHeight(event: any): void {
  const textarea = event.target;
  textarea.style.overflow = 'hidden'; // Hide any overflow content
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
}

onLoadconfirmationDataData() {

  var data = {
    table_name: 'par_confirmations'
  };
  this.config.onLoadConfigurationData(data)

    .subscribe(
      data => {
        this.confirmationData = data;
      },
      error => {
        return false;
      });
}

onLoadconfirmationParameterDataData() {

  var data = {
    table_name: 'par_confirmations'
  };
  this.config.onLoadConfigurationData(data)

    .subscribe(
      data => {
        this.confirmationparameterData = data;
      },
      error => {
        return false;
      });
}



onLoadparameterDataData() {

  var data = {
    table_name: 'par_confirmations'
  };
  this.config.onLoadConfigurationData(data)

    .subscribe(
      data => {
        this.parameterData = data;
      },
      error => {
        return false;
      });
}


  refreshDataGrid() {
   // this.dataGrid.instance.refresh();
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }   
   onClinicaltrialConductedinOtherCountries($event){
   
    if( $event.selectedItem.id == 1){
        this.is_clinicalin_othercountry = true;

        this.clinicaltrialGeneralExclusiondetailsfrm.get('clinicalin_othercountries_sites').setValidators([Validators.required]);
        this.clinicaltrialGeneralExclusiondetailsfrm.get('clinicalin_othercountries_sites').updateValueAndValidity();
    }
    else{
      this.is_clinicalin_othercountry = false;

        this.clinicaltrialGeneralExclusiondetailsfrm.get('clinicalin_othercountries_sites').clearValidators();
        this.clinicaltrialGeneralExclusiondetailsfrm.get('clinicalin_othercountries_sites').updateValueAndValidity();
    }


}
   onPrevClinicaltrialConductedinOtherCountries($event){
   
    if( $event.selectedItem.id == 1){
        this.is_prevclinicalin_othercountry = true;
        this.clinicaltrialGeneralExclusiondetailsfrm.get('prevclinicalin_othercountries_sites').setValidators([Validators.required]);
        this.clinicaltrialGeneralExclusiondetailsfrm.get('prevclinicalin_othercountries_sites').updateValueAndValidity();

    }
    else{
      this.is_prevclinicalin_othercountry = false;

        this.clinicaltrialGeneralExclusiondetailsfrm.get('prevclinicalin_othercountries_sites').clearValidators();
        this.clinicaltrialGeneralExclusiondetailsfrm.get('prevclinicalin_othercountries_sites').updateValueAndValidity();

    }
}




  onClinicaltrialConductedinUganda($event){
   
    if( $event.selectedItem.id == 1){
      this.is_clinicalin_uganda = true;
        this.clinicaltrialGeneralExclusiondetailsfrm.get('clinicalin_otheruganda_sites').setValidators([Validators.required]);
        this.clinicaltrialGeneralExclusiondetailsfrm.get('clinicalin_otheruganda_sites').updateValueAndValidity();

    }
    else{
      this.is_clinicalin_uganda = false;

        this.clinicaltrialGeneralExclusiondetailsfrm.get('clinicalin_otheruganda_sites').clearValidators();
        this.clinicaltrialGeneralExclusiondetailsfrm.get('clinicalin_otheruganda_sites').updateValueAndValidity();

    }
  }
  
}

