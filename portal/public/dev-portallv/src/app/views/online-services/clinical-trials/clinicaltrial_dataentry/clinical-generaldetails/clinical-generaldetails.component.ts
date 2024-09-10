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
  selector: 'app-clinical-generaldetails',
  templateUrl: './clinical-generaldetails.component.html',
  styleUrls: ['./clinical-generaldetails.component.css']
})
export class ClinicalGeneraldetailsComponent implements OnInit {
  @Input() clinicaltrialGeneraldetailsfrm: FormGroup;
  @Input() durationDescData: any;
  @Input() ctrethicsCommitteesData: any;
  @Input() clinicalTrialControl:FormControl;
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

  isInvestigatorSearchWinVisible:boolean = false;
  isInvestigatorAddWinVisible:boolean = false;

  is_otherstudy_phase:boolean = false;
  is_non_clinical:boolean = false;
  is_other_registry:boolean=false;

  sponsorInvestigatorFrm:FormGroup;

  investigatorFrm:FormGroup;
  region_id:number;
  country_id:number;
  district_id:number;
  clinicaltInvestigatorFrm:FormGroup;
  app_resp:any;
  clinicalStudyPhaseData:any;
  clinicalStudyFundingSourceData:any;
  clinicalStudyFieldsTypesData:any;
  typeofVariationData:any;
  sectionsData:any;
  is_clinicalin_othercountry:any;
  is_clinicalin_uganda:any;
  //par_clinical_phases
  @Output() docClinicalSectionsEvent = new EventEmitter();
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
    this.sponsorInvestigatorFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([]))
    });

    this.investigatorFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl(37, Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([]))
    });

    //this.investigatorFrm.get('country_id').setValue(37);


    this.onLoadSections();
    this.onLoadclinicalStudyPhaseData();
    this.OnloadclinicalStudyFieldsTypesData();
    this.onLoadconfirmationDataData();
     this.onLoadtypeofVariationData();
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
        this.clinicaltrialGeneraldetailsfrm.get('zone_id').setValue(2);
        //this.investigatorFrm.get('country_id').setValue(37);
    }


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
  onLoadtypeofVariationData() {
    var data = {
      table_name: 'par_typeof_variations',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.typeofVariationData = data;
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
    this.functDataGridToolbar(e, this.funcAddSponsorInvestigatoretails,'Add');
  }

 onInvestigatorPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddInvestigatoretails,'Add');
  }



  funcAddSponsorInvestigatoretails() {

    this.isSponsorInvestigatorSearchWinVisible = false;
    this.issponsorInvestigatorAddWinVisible = true;
    this.sponsorInvestigatorFrm.reset();

  }


  funcAddInvestigatoretails() {

    this.isInvestigatorSearchWinVisible = false;
    this.isInvestigatorAddWinVisible = true;
    this.investigatorFrm.reset();

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


  funcSelectInvestigator(data) {
    if (this.checkifAllInvestigatorsponsor) {
      this.clinicaltInvestigatorFrm.get('investigator_id').setValue(data.data.id);
      this.clinicaltInvestigatorFrm.get('investigator_name').setValue(data.data.name);
    }
    else if (this.checkifsponsor) {
      this.clinicaltrialGeneraldetailsfrm.get('sponsor_id').setValue(data.data.id);
      this.clinicaltrialGeneraldetailsfrm.get('clinical_trial_sponsor').setValue(data.data.name);
    } else {
      this.clinicaltrialGeneraldetailsfrm.get('investigator_id').setValue(data.data.id);
      this.clinicaltrialGeneraldetailsfrm.get('principal_investigator').setValue(data.data.name);
    }
    this.isInvestigatorSearchWinVisible = false;

  }
  funcSelectSponsorInvestigator(data) {
    if (this.checkifAllInvestigatorsponsor) {
      this.clinicaltInvestigatorFrm.get('investigator_id').setValue(data.data.id);
      this.clinicaltInvestigatorFrm.get('investigator_name').setValue(data.data.name);
    }
    else if (this.checkifsponsor) {
      this.clinicaltrialGeneraldetailsfrm.get('sponsor_id').setValue(data.data.id);
      this.clinicaltrialGeneraldetailsfrm.get('clinical_trial_sponsor').setValue(data.data.name);
    } else {
      this.clinicaltrialGeneraldetailsfrm.get('investigator_id').setValue(data.data.id);
      this.clinicaltrialGeneraldetailsfrm.get('principal_investigator').setValue(data.data.name);
    }
    this.isSponsorInvestigatorSearchWinVisible = false;

  }

  onClinicalTrialSponsor() {
    this.sponsor_investigatortitle = 'Clinical Trial Sponsor';
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
    this.sponsor_investigatortitle = 'Clinical Trials Principal Investigator';
    this.checkifsponsor = false;
    this.checkifAllInvestigatorsponsor = false;
    this.appService.getPermitsOtherDetails({ table_name: 'clinicaltrial_investigator_personnel' }, 'getSenderreceiversInvestigatorDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.sponsorInvestigatorData = data.data;
            this.isInvestigatorSearchWinVisible = true;
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


  onsaveInvestigator() {
    this.spinner.show();
    let table_name;
    table_name = 'clinicaltrial_investigator_personnel';

    let name = this.investigatorFrm.get('name').value;
    this.appService.onAddPermitReceiverSender(table_name, this.investigatorFrm.value)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isInvestigatorAddWinVisible = false;

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
      this.clinicaltrialGeneraldetailsfrm.get('sponsor_id').setValue(id);
      this.clinicaltrialGeneraldetailsfrm.get('clinical_trial_sponsor').setValue(name);
    } else {
      this.clinicaltrialGeneraldetailsfrm.get('investigator_id').setValue(id);
      this.clinicaltrialGeneraldetailsfrm.get('principal_investigator').setValue(name);
    }
  }
  

  onRegionsCboSelect($event) {

    this.region_id = $event.selectedItem.id;
    this.onLoadDistricts(this.region_id);
  }

  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;
   // this.onLoadDistricts(this.country_id);
    this.onLoadRegions(this.country_id);
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
          this.regions = data
        },
        error => {
          return false;
        });
  }
  
  onLoadCountries() {

    var data = {
      table_name: 'par_countries',
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
  oDistrictsCboSelect($event) {
    this.district_id = $event.selectedItem.id;
   // this.onLoadRegions(this.district_id);

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
  onClinicaltrialConductedinOtherCountries($event){
   
    if( $event.selectedItem.id == 1){
        this.is_clinicalin_othercountry = true;
    }
    else{
      this.is_clinicalin_othercountry = false;
    }
}
  onClinicalTrialStudyPhaseChange($event) {

  if($event.value == 11 ){
      this.is_otherstudy_phase = true;
      this.is_non_clinical = false;

  }
  else if ($event.value == 4){
      this.is_non_clinical = true;
      this.is_otherstudy_phase = false;
      this.clinicalTrialControl.setValidators([Validators.required]);
      this.clinicalTrialControl.updateValueAndValidity();

  }else{
      this.is_otherstudy_phase = false;
      this.is_non_clinical = false;
      this.clinicalTrialControl.clearValidators();
      this.clinicalTrialControl.updateValueAndValidity();

  }
}   
onOtherRegistryChange($event) {
    if($event.value == 1){
        this.is_other_registry = true;
        this.clinicalTrialControl.setValidators([Validators.required]);
        this.clinicalTrialControl
    }else{
      this.is_other_registry = false;
      this.clinicalTrialControl.clearValidators();
      this.clinicalTrialControl.updateValueAndValidity();
    }
    

  }
  onClinicaltrialConductedinUganda($event){
   
    if( $event.selectedItem.id == 1){
        this.is_clinicalin_uganda = true;
    }
    else{
      this.is_clinicalin_uganda = false;
    }
}
}
