import { Component,  Input, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { SharedPsurProdnotificationComponent } from '../../shared-psur-prodnotification/shared-psur-prodnotification.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';

import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
@Component({
  selector: 'app-adverse-reaction-general-details',
  templateUrl: './adverse-reaction-general-details.component.html',
  styleUrls: ['./adverse-reaction-general-details.component.css']
})
export class AdverseReactionGeneralDetailsComponent extends SharedPsurProdnotificationComponent {
  @Input() clinicaltrialSaeReportingdetailsfrm: FormGroup;
  @Input() ReportSourceData: any;
  @Input() ReportTypeData: any;
  @Input() sub_module_id: number;
  @Input () module_id: number;
  @Input() application_code: number;
  @Input () application_id:number;
  @Input() isReadOnly: boolean;
  country_id:number;
  trader_name: string;
  registrant_option_id:number;
  trader_id:number;
  trader_title:string;

  sponsor_investigatortitle:string;
  checkifsponsor:boolean = false;
  checkifAllInvestigatorsponsor:boolean = false;
  sponsorInvestigatorData:any;
  isSponsorInvestigatorSearchWinVisible:boolean = false;
  issponsorInvestigatorAddWinVisible:boolean = false;
  patientInitialPopupVisible:boolean=false;
  sponsorInvestigatorFrm:FormGroup;
  clinicaltInvestigatorFrm:FormGroup;
  patientDetailsWinVisible:boolean = false;
  is_vaterinary:boolean = false;
  is_female:boolean = false;
  is_medicaldevices:boolean = false;
  patientInformationFrm:FormGroup;
  patientData:any;
  is_online:number;
  app_resp:any;
  clinicalStudyPhaseData:any;
  sectionsData:any;
  adverseReactionData:any;
  reportTypeData:any;
  clinicalStudyStatusesData:any;
  sexData:any;
  reportsourceData:any;
  reportCategoryData:any;
  receivedFromData:any;
  productTypeData:any;
  animalStatusData:any;
  animalContactData:any;
  auto:any;
  titleData:any;
  operatordeviceData:any;
  locationdeviceData:any;
  patientpregnantData:any;
  confirmationData:any;
  ageGroupData:any;

  reportProfessionalData:any;
  reporterData:any;
  reportTitleData:any;
  primaryReporterData:any;
  cityData:any;


  ngOnInit() {
    let user_details = this.authService.getUserDetails();
    this.country_id = user_details.country_id;
    this.trader_id = user_details.trader_id;
    this.trader_name = user_details.company_name;

    this.onLoadReportSourceSafetyData();
    this.onLoadReportingTypeData();
    this.onLoadSections();
    this.onLoadclinicalStudyPhaseData()
    this.onLoadclinicalStudyReportCategoryData();
    this.onLoadclinicalReportTypeData();
    this.onLoadclinicalStudyStatusesData();
    this.onLoadclinicalAdverseReactionData();
    this.onLoadGenderData();
    this.onLoadclinicalProductTypeData();
    this.onLoadAnimalStatusData();
    this.onLoadAnimalContactStaustData();
    this.onLoadreceivedFromData();
    this.onLoadSourceSafetyAlerts();
    this.onLoadpatientTitleData();
    this.onLoadoperatordeviceData();
    this.onLoadcurrentdeviceData();
    this.onLoadconfirmationDataData();
    this.onLoadageGroupData();
    this.onLoadReporterType();
    this.onLoadReporterProfessionalType();
    this.onLoadTitle();
    this.onLoadCity();
    this.onLoadCountries();

  } 
  onLoadReportSourceSafetyData() {
    var data = {
      table_name: 'par_sourcesofsafety_alerts'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ReportSourceData = data;
        });
  }

   onLoadReportingTypeData() {
    var data = {
      table_name: 'par_psur_type',
     
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ReportTypeData = data;
        });

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
  //reporter details
  onLoadReporterType() {
    var data = {
      table_name: 'par_adr_reporter_types',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reporterData = data;
        });
  }

 onLoadReporterProfessionalType() {
    var data = {
      table_name: 'par_pv_reporter_qualifications',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reportProfessionalData = data;
        });
  }
 onLoadTitle() {
    var data = {
      table_name: 'par_titles',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reportTitleData = data;
        });
  }
 onLoadCity() {
    var data = {
      table_name: 'par_cities',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.cityData = data;
        });
  }

  onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }  
  onCoutryCboSelect($event) {
    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }

  onLoadCountries() {

    var data = {
      table_name: 'par_countries'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.countries = data;
        },
        error => {
          return false;
        });
  }

  onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.regions = data;
        },
        error => {
          return false
        });
  }

  onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.districts = data
        },
        error => {
          return false;
        });
  }

//end 


    onLoadSourceSafetyAlerts() {
    var data = {
      table_name: 'par_sourcesofsafety_alerts',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reportsourceData = data;
        });
  }

  onLoadclinicalStudyReportCategoryData() {
    var data = {
      table_name: 'par_adr_categories',
      is_online:1
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reportCategoryData = data;
        });
  }
    onLoadclinicalReportTypeData() {
    var data = {
      table_name: 'par_adr_report_types',
      is_online:1
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reportTypeData = data;
        });
  }
    onLoadreceivedFromData() {
    var data = {
      table_name: 'par_adr_reporters_categories',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.receivedFromData = data;
        });
  }

  onLoadclinicalProductTypeData() {
    var data = {
      table_name: 'par_adr_types',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productTypeData = data;
        });
  }
    onLoadpatientTitleData() {
    var data = {
      table_name: 'par_titles',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.titleData = data;
        });
  }

  onLoadGenderData() {
    var data = {
      table_name: 'par_gender',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sexData = data;
        });
  }
  onLoadoperatordeviceData() {
    var data = {
      table_name: 'par_device_operator',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.operatordeviceData = data;
        });
  }
  onLoadcurrentdeviceData() {
    var data = {
      table_name: 'par_current_device_location',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.locationdeviceData = data;
        });
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
  onLoadageGroupData() {

  var data = {
    table_name: 'par_pv_age_groups'
  };
  this.config.onLoadConfigurationData(data)

    .subscribe(
      data => {
        this.ageGroupData = data;
      },
      error => {
        return false;
      });
}

  onLoadAnimalStatusData() {
    var data = {
      table_name: 'par_animal_status',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.animalStatusData = data;
        });
  }

  onLoadAnimalContactStaustData() {
    var data = {
      table_name: 'par_humanvet_contacts',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.animalContactData = data;
        });
  }

  onLoadclinicalAdverseReactionData() {
    var data = {
      table_name: 'par_adverse_reaction',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.adverseReactionData = data;
        });
  }  

  onLoadclinicalStudyStatusesData() {
    var data = {
      table_name: 'par_clinicalstudy_statuses',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.clinicalStudyStatusesData = data;
        });
  }


  onLoadclinicalStudyPhaseData(){
    var data = {
      table_name: 'par_clinical_phases',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.clinicalStudyPhaseData = data;
        });

  }
 onSponsorInvestigatorPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSponsorInvestigatoretails, this.sponsor_investigatortitle);
  }
  funcAddSponsorInvestigatoretails() {

    this.isSponsorInvestigatorSearchWinVisible = false;
    this.issponsorInvestigatorAddWinVisible = true;
    this.sponsorInvestigatorFrm.reset();

  }
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  onPatientDetailPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddPatientDetails, 'Add Patient Information');
  }
  funcAddPatientDetails() {
    this.patientDetailsWinVisible = true;
    this.patientInformationFrm.reset();
  }




  funcSelectPatient(data){ 

    this.clinicaltrialSaeReportingdetailsfrm.patchValue(data.data);
    this.patientInitialPopupVisible= false;         
  }
  refreshDataGrid() {
   // this.dataGrid.instance.refresh();
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onClinicalTrialProductChange($event) {

  if ($event.value == 4){
    this.is_vaterinary = true;
    this.is_medicaldevices=false;
    this.clinicaltrialSaeReportingdetailsfrm.get('species').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('breed').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('animal_status_id').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('humanvet_contact_id').setValidators([Validators.required]);

    this.clinicaltrialSaeReportingdetailsfrm.get('species').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('breed').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('animal_status_id').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('humanvet_contact_id').updateValueAndValidity();

    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('title_id').clearValidators();

    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('title_id').updateValueAndValidity();

  }else if($event.value == 3){
    this.is_vaterinary = false;
    this.is_medicaldevices=false;
   this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('title_id').setValidators([Validators.required]);

    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('title_id').updateValueAndValidity();

    this.clinicaltrialSaeReportingdetailsfrm.get('species').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('breed').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('animal_status_id').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('humanvet_contact_id').clearValidators();

    this.clinicaltrialSaeReportingdetailsfrm.get('device_operator_id').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('local_supplier').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('software_version').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('catalogue_number').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('serial_number').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('model_number').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('device_location_id').clearValidators();

    this.clinicaltrialSaeReportingdetailsfrm.get('species').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('breed').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('animal_status_id').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('humanvet_contact_id').updateValueAndValidity();

    this.clinicaltrialSaeReportingdetailsfrm.get('device_operator_id').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('local_supplier').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('software_version').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('catalogue_number').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('serial_number').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('model_number').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('device_location_id').updateValueAndValidity();
  }else if($event.value == 2){
    this.is_medicaldevices=true;
    this.is_vaterinary = false;
    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('title_id').setValidators([Validators.required]);

    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('title_id').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('device_operator_id').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('local_supplier').setValidators([Validators.required]);;
    this.clinicaltrialSaeReportingdetailsfrm.get('software_version').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('catalogue_number').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('serial_number').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('model_number').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('device_location_id').setValidators([Validators.required]);

    this.clinicaltrialSaeReportingdetailsfrm.get('device_operator_id').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('local_supplier').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('software_version').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('catalogue_number').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('serial_number').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('model_number').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('device_location_id').updateValueAndValidity();

  }else if($event.value == 1){
    this.is_vaterinary = false;
    this.is_medicaldevices=false;
    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('title_id').setValidators([Validators.required]);

    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('title_id').updateValueAndValidity();

    this.clinicaltrialSaeReportingdetailsfrm.get('species').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('breed').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('animal_status_id').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('humanvet_contact_id').clearValidators();

    this.clinicaltrialSaeReportingdetailsfrm.get('device_operator_id').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('local_supplier').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('software_version').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('catalogue_number').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('serial_number').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('model_number').clearValidators();
    this.clinicaltrialSaeReportingdetailsfrm.get('device_location_id').clearValidators();

    this.clinicaltrialSaeReportingdetailsfrm.get('species').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('breed').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('animal_status_id').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('humanvet_contact_id').updateValueAndValidity();

    this.clinicaltrialSaeReportingdetailsfrm.get('device_operator_id').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('local_supplier').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('software_version').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('catalogue_number').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('serial_number').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('model_number').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('device_location_id').updateValueAndValidity();
  }
}   
onClinicalTrialGenderChange($event) {

  if ($event.value == 2){
    this.is_female = true;
  }else{
    this.is_female = false;

  }
}   
}