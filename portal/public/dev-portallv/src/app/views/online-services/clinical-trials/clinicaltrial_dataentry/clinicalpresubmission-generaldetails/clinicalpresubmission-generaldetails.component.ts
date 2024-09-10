import { Component, OnInit, ViewChild,ElementRef, Input,ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Utilities } from 'src/app/services/common/utilities.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { SharedClinicaltrialComponent } from '../../shared-clinicaltrial/shared-clinicaltrial.component';
import { DxTextAreaComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clinicalpresubmission-generaldetails',
  templateUrl: './clinicalpresubmission-generaldetails.component.html',
  styleUrls: ['./clinicalpresubmission-generaldetails.component.css']
})
export class ClinicalpresubmissionGeneraldetailsComponent implements OnInit {

  @Input() preSubmissionGeneraldetailsfrm: FormGroup;
  @Input() durationDescData: any;
  @Input() ctrethicsCommitteesData: any;

  @Input() clinicalTrialRegistryData: any;
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
  @Input() districts: any;
  @Input() is_readonly: boolean;
  @Input() docsection_id: any;
  confirmationData:any;
  sponsor_investigatortitle:string;
  checkifsponsor:boolean = false;
  checkifAllInvestigatorsponsor:boolean = false;
  sponsorInvestigatorData:any;
  isSponsorInvestigatorSearchWinVisible:boolean = false;
  issponsorInvestigatorAddWinVisible:boolean = false;
  is_virtual_meeting:boolean = false;
  is_meeting_venue:boolean = false;
  sponsorInvestigatorFrm:FormGroup;
  clinicaltInvestigatorFrm:FormGroup;
  app_resp:any;
  clinicalStudyPhaseData:any;
  meetingTypeData:any;
  clinicalStudyFundingSourceData:any;
  clinicalStudyFieldsTypesData:any;
  sectionsData:any;
  is_clinicalin_othercountry:any;
  is_clinicalin_uganda:any;
  minDate: Date = new Date();
  minMeetingTime: Date = new Date();
  maxMeetingTime: Date = new Date();

  selectedMeetingTime: Date | null = null;
  isInvalidMeetingTime: boolean = false;

  @Output() docClinicalSectionsEvent = new EventEmitter();

  constructor(private elRef: ElementRef,public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
    this.sponsorInvestigatorFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([Validators.required]))
    });
    this.minMeetingTime.setHours(8, 0, 0); 
    this.maxMeetingTime.setHours(17, 0, 0); 

    this.onLoadSections();
    this.onLoadMeetingType();
    this.onLoadclinicalStudyPhaseData();
    this.OnloadclinicalStudyFieldsTypesData();
    this.onLoadconfirmationDataData();
    
  }
validateMeetingTime(event) {
    const selectedTime = event.value;

    const minTime = new Date();
    minTime.setHours(9, 0, 0, 0); // Set to 8:00 AM

    const maxTime = new Date();
    maxTime.setHours(17, 0, 0, 0); // Set to 5:00 PM

    if (selectedTime < minTime || selectedTime > maxTime) {
      this.isInvalidMeetingTime = true;
      const validTime = new Date(Math.max(minTime.getTime(), Math.min(selectedTime.getTime(), maxTime.getTime())));
      this.selectedMeetingTime = validTime;
    } else {
      this.isInvalidMeetingTime = false;
    }
  }


adjustTextAreaHeight(event: any): void {
  const textarea = event.target;
  textarea.style.overflow = 'hidden'; // Hide any overflow content
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
}

  onClinicalTriaProductSectionChange($event){
    this.docClinicalSectionsEvent.emit($event.value+','+this.section_id);

} onLoadconfirmationDataData() {

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
  ngOnInit() {
    if(!this.application_code){
    }

    //this.selectedMeetingTime = new Date();


  } onLoadSections() {
    var data = {
      table_name: 'par_clinical_investigationalproduct_type',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }

    onLoadMeetingType() {
    var data = {
      table_name: 'par_meeting_types',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.meetingTypeData = data;
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
  OnloadCLincialtrialFundingSources(clincialtrialfields_type_id){
    var data = {
      table_name: 'par_clincialtrialfunding_sources',
      clincialtrialfields_type_id:clincialtrialfields_type_id
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.clinicalStudyFundingSourceData = data;
        });

  }
  
  OnloadclinicalStudyFieldsTypesData(){
    var data = {
      table_name: 'par_clincialtrialfields_types',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.clinicalStudyFieldsTypesData = data;
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

  refreshDataGrid() {
   // this.dataGrid.instance.refresh();
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  funcSelectSponsorInvestigator(data) {
    if (this.checkifAllInvestigatorsponsor) {
      this.clinicaltInvestigatorFrm.get('investigator_id').setValue(data.data.id);
      this.clinicaltInvestigatorFrm.get('investigator_name').setValue(data.data.name);
    }
    else if (this.checkifsponsor) {
      this.preSubmissionGeneraldetailsfrm.get('sponsor_id').setValue(data.data.id);
      this.preSubmissionGeneraldetailsfrm.get('clinical_trial_sponsor').setValue(data.data.name);
    } else {
      this.preSubmissionGeneraldetailsfrm.get('investigator_id').setValue(data.data.id);
      this.preSubmissionGeneraldetailsfrm.get('principal_investigator').setValue(data.data.name);
    }
    this.isSponsorInvestigatorSearchWinVisible = false;
  }
  onClinicalTrialSponsor() {
    this.sponsor_investigatortitle = 'Clinical trial Sponsor';
    this.checkifsponsor = true;
    this.checkifAllInvestigatorsponsor = false;
    this.appService.getPermitsOtherDetails({ table_name: 'clinical_trial_personnel' }, 'getSenderreceiversDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.sponsorInvestigatorData = data.data;
            this.isSponsorInvestigatorSearchWinVisible = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onClinicalTrialInvestigator() {
    this.sponsor_investigatortitle = 'Clinical trial Principal Invetigator';
    this.checkifsponsor = false;
    this.checkifAllInvestigatorsponsor = false;
    this.appService.getPermitsOtherDetails({ table_name: 'clinical_trial_personnel' }, 'getSenderreceiversDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.sponsorInvestigatorData = data.data;
            this.isSponsorInvestigatorSearchWinVisible = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }

  onsaveSponsorInvestigator() {
    this.spinner.show();
    let table_name;
    table_name = 'clinical_trial_personnel';

    let name = this.sponsorInvestigatorFrm.get('name').value;
    this.appService.onAddPermitReceiverSender(table_name, this.sponsorInvestigatorFrm.value)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.issponsorInvestigatorAddWinVisible = false;

            this.updateConsigneeReceiver(this.app_resp.record_id, name);

            this.toastr.success(this.app_resp.message, 'Response');

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  updateConsigneeReceiver(id, name) {
    if (this.checkifAllInvestigatorsponsor) {
      this.clinicaltInvestigatorFrm.get('investigator_id').setValue(id);
      this.clinicaltInvestigatorFrm.get('investigator_name').setValue(name);
    }
    else if (this.checkifsponsor) {
      this.preSubmissionGeneraldetailsfrm.get('sponsor_id').setValue(id);
      this.preSubmissionGeneraldetailsfrm.get('clinical_trial_sponsor').setValue(name);
    } else {
      this.preSubmissionGeneraldetailsfrm.get('investigator_id').setValue(id);
      this.preSubmissionGeneraldetailsfrm.get('principal_investigator').setValue(name);
    }
  }
  
  onRegionsCboSelect($event) {

    this.onLoadDistricts($event.selectedItem.id);

  }
  onCoutryCboSelect($event) {
    

    this.onLoadRegions($event.selectedItem.id);

  }
  onclinicalStudyFieldsTypesSelect($event) {
      
    this.OnloadCLincialtrialFundingSources($event.selectedItem.id);

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
  
  onLoadCountries() {

    var data = {
      table_name: 'par_countries',
       //id: 37
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

  onClinicalTriaMeetingTypeChange($event) {

  if($event.value == 2 ){
      this.is_virtual_meeting = true;
      this.is_meeting_venue = false ;
  }
  else{
    this.is_meeting_venue = true ;
    this.is_virtual_meeting = false;
  }
}

}

