import { Component, OnInit, Input, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  selector: 'app-clinicalsaerpt-general',
  templateUrl: './clinicalsaerpt-general.component.html',
  styleUrls: ['./clinicalsaerpt-general.component.css']
})
export class ClinicalsaerptGeneralComponent implements OnInit {

  @Input() clinicaltrialSaeReportingdetailsfrm:FormGroup;
  @Input() durationDescData: any;
  @Input() payingCurrencyData: any;
  @Input() fastTrackOptionsData: any;
  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() section_id: number;
  @Input() reg_clinical_trial_id: number;
  @Input() zoneData: any;
  @Input() regions: any;
  @Input() countries: any;
  @Input() clinicalStudySitesData:any;
  @Input() districts: any;
  @Input() is_readonly: boolean;
  @Input() docsection_id: any;
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
  trader_id:number;
  is_online:number;
  sae_dictionary_id:number;
  app_resp:any;
  medraTermData:any;
  saeDictionaryData:any;
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

  @Output() docClinicalSectionsEvent = new EventEmitter();
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
    this.patientInformationFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      dateof_birth: new FormControl('', Validators.compose([Validators.required])),
      age: new FormControl('', Validators.compose([Validators.required])),
      id:new FormControl('', Validators.compose([])),
      sex_id: new FormControl('', Validators.compose([Validators.required])),
      species:new FormControl('', Validators.compose([])),
      breed:new FormControl('', Validators.compose([])),
      animal_status_id:new FormControl('', Validators.compose([])),
      humanvet_contact_id:new FormControl('', Validators.compose([])),
      adr_type_id: new FormControl('', Validators.compose([Validators.required])),
    });
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
    this.onLoadSaeDictionary();
    this.onLoadMedraTerm(this.sae_dictionary_id);

  }onClinicalTriaProductSectionChange($event){
      this.docClinicalSectionsEvent.emit($event.value+','+this.section_id);
  }
  adjustTextAreaHeight(event: any): void {
  const textarea = event.target;
  textarea.style.overflow = 'hidden'; // Hide any overflow content
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
  }
  ngOnInit() {
     if(!this.application_code){
        if (!this.clinicaltrialSaeReportingdetailsfrm) {
        } else {
          this.clinicaltrialSaeReportingdetailsfrm.get('country_id').setValue(37);
        }
    }

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

  onLoadSaeDictionary() {
    var data = {
      table_name: 'par_sae_dictionary',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.saeDictionaryData = data;
        });
  }
  onLoadMedraTerm(sae_dictionary_id) {
    var data = {
      table_name: 'par_medra_library',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.medraTermData = data;
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
      is_online:1
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

  onSearchPatientDetails() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'clinical_trial_personnel', trader_id: this.trader_id }, 'getClinicalPatientInformation')
        .subscribe(
          data_response => {
            this.patientInitialPopupVisible = true;
            this.patientData = data_response.data;
          },
          error => {
            return false
    

       });
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
    this.clinicaltrialSaeReportingdetailsfrm.get('study_arm').clearValidators();

    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('study_arm').updateValueAndValidity();

  }else if($event.value == 3){
    this.is_vaterinary = false;
    this.is_medicaldevices=false;
   this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').setValidators([Validators.required]);
    this.clinicaltrialSaeReportingdetailsfrm.get('study_arm').setValidators([Validators.required]);

    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('study_arm').updateValueAndValidity();

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
    this.clinicaltrialSaeReportingdetailsfrm.get('study_arm').setValidators([Validators.required]);

    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('study_arm').updateValueAndValidity();
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
    this.clinicaltrialSaeReportingdetailsfrm.get('study_arm').setValidators([Validators.required]);

    this.clinicaltrialSaeReportingdetailsfrm.get('patient_name').updateValueAndValidity();
    this.clinicaltrialSaeReportingdetailsfrm.get('study_arm').updateValueAndValidity();

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


  onsavePatientInformation() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_patient_information';

    this.appService.onsaveClinicaltrialOtherDetails(this.trader_id, this.patientInformationFrm.value, 'onsavePatientInformation')
      .subscribe(
        response => {
          this.app_resp = response.json();
          if (this.app_resp.success) {
            this.patientDetailsWinVisible = false;
            this.patientInitialPopupVisible = false;
            this.clinicaltrialSaeReportingdetailsfrm.patchValue(this.app_resp.data);
            this.toastr.success(this.app_resp.message, 'Response');
            this.spinner.hide();

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }

}