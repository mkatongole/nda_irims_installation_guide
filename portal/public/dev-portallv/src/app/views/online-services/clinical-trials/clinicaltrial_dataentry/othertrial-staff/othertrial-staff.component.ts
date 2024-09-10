import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef, Input } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';

@Component({
  selector: 'app-othertrial-staff',
  templateUrl: './othertrial-staff.component.html',
  styleUrls: ['./othertrial-staff.component.css']
})
export class OthertrialStaffComponent implements OnInit {

  @Input() newPremisesStafflDetailsfrm: FormGroup;
  @Input() premPersonnelDetailsData: any;
  @Input() clinicalPersonnellDetailsfrm:any;
  @Input() isBusinessPersonnelPopupVisible: boolean;
  @Input() qualificationsData: any;
  @Input() personnelPositionData: any;
  @Input() studyFieldsData: any;
  @Input() isStaffPopupVisible: boolean;
  @Input() staffDetailsData: any = {};
  @Input() countries: any;
  @Input() sub_module_id: number;
  @Input() regions: any;
  @Input() districts: any;
  @Input() application_id: any;
  @Input() personnel_informationData: any;
  @Input() isaddNewPremisesPersonnelDetails: boolean;
  @Input() is_readonly: boolean;

  @Input() premise_id: number;
  @Input() premisesGeneraldetailsfrm: FormGroup;
  personnelIdentificationTypeData:any;
  trader_id:number;
  personnel_id:number;
  district_id:number;
  region_id:number;
  country_id:number;
  personnel_QualificationData:any;
  personnel_type_id:number;
  app_resp:any;
  auto:any;
  isPersonnelPopupVisible:boolean;
  premises_resp:any;
  isperssonelAddPopupVisible:boolean;
  loading:boolean;
  constructor(public cdr: ChangeDetectorRef,public premappService: PremisesApplicationsService,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {
  }
  ngOnInit() {
    this.onLoadPremisesStaffDetails();
    this.onLoadClinicalDetails()
    this.onpersonnelIdentificationTypeDataLoad();
    this.onLoadQualificationDetails();
    this.onLoadPersonnelPositionDetails();
    if(this.sub_module_id == 108){
        this.is_readonly = true;
    }else{
      this.is_readonly = false;

    }
    this.clinicalPersonnellDetailsfrm = new FormGroup({
      position_id: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      personnel_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      qualification_id: new FormControl('', Validators.compose([Validators.required])),
      personnel_identification_no: new FormControl('', Validators.compose([])),


    });

  }
  funcEditPersonnelDetails(data) {

    this.clinicalPersonnellDetailsfrm.patchValue(data.data);

    this.clinicalPersonnellDetailsfrm.patchValue(data.data);

    this.isBusinessPersonnelPopupVisible = true;
    this.onLoadPersonnerQualifationsDetails(data.data.personnel_id);
    this.personnel_id = data.data.personnel_id;

  }      
  funcSelectStaffDetails(data){ 

    this.clinicalPersonnellDetailsfrm.patchValue(data.data);
    
    this.isStaffPopupVisible= false;         
  }
    onLoadQualificationDetails() {
    var data = {
      table_name: 'par_personnel_qualifications',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.qualificationsData = data;
        });
  }  
  onLoadPersonnelPositionDetails() {
    var data = {
      table_name: 'par_clinicaltrialpersons_roles',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.personnelPositionData = data;
        });
  }  
  onLoadClinicalDetails() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'clinical_trial_personnel', application_id: this.application_id }, 'getClinicalPersonnelDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.premPersonnelDetailsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }

  onSearchStaffDetails() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'clinical_trial_personnel', trader_id: this.trader_id }, 'getClinicalPersonnelInformation')
        .subscribe(
          data_response => {
            this.isStaffPopupVisible = true;
            this.staffDetailsData = data_response.data;
          },
          error => {
            return false
      


       });
  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

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


   onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

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

  onLoadPersonnerQualifationsDetails(personnel_id) {
    this.premappService.onLoadPersonnerQualifationsDetails(personnel_id)
      .subscribe(
        data_response => {
          this.personnel_QualificationData = data_response.data;
        },
        error => {
          return false    
        });

  } onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, '',is_readonly);
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  

  onLoadPremisesStaffDetails() {

    this.premappService.onLoadPremisesStaffDetails(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premPersonnelDetailsData = data.data;
        },
        error => {
          return false
        });
  }

  funcDeletePersonnelDetails(site_data,table_name) {
    this.funcClinicalTrialDeletehelper(site_data, table_name, 'clinical_trial_personnel', 'Clinical Trial Personnel');
  }
  funcClinicalTrialDeletehelper(record_data, table_name, reload_funccheck, delete_title) {
    let app_data = record_data.data;
    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want deleted the selected ' + app_data.name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onDeletePermitProductsDetails(record_id, table_name, this.application_id, delete_title)
            .subscribe(
              response => {
                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
                  
                  this.onLoadClinicalDetails();
                  
                  this.toastr.success(response_data.message, 'Response');
                }
                else {

                  this.toastr.success(response_data.message, 'Response');

                }

              },
              error => {
               // this.loading = false;
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });

  }
  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
  }
  onPersonnelSearchDetails(personnel_type_id) {
    this.personnel_type_id = personnel_type_id;
    this.premappService.onLoadPersonnelInformations()
    .subscribe(
      data_response => {
        this.personnel_informationData = data_response.data;
        
           this.isPersonnelPopupVisible = true;
      },
      error => {
        return false
      });

  }
  
  funcSelectPremisePersonnel(data) {
    if(this.personnel_type_id == 1){
      this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name})
    }
    else{
      this.clinicalPersonnellDetailsfrm.patchValue({ personnel_id: data.data.id, name: data.data.name, email_address: data.data.email_address, telephone_no: data.data.telephone_no, postal_address: data.data.postal_address })
    //reload the qualifications and documents
    this.personnel_id = data.data.id;
    }
    
    
    this.isPersonnelPopupVisible = false;
    
  }onPremisesPersonnelToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddPremisesPersonnelDetails, 'Add Staff',is_readonly);
  }
 
  functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        disabled: is_readonly,
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
         // onClick: this.refreshDataGrid.bind(this)
        }
      });
  } 
  onpersonnelIdentificationTypeDataLoad() {

    var data = {
      table_name: 'par_identification_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data);
          this.personnelIdentificationTypeData = data;
        },
        error => {
          return false
        });
  }
  funAddPremisesPersonnelDetails() {
  
    this.clinicalPersonnellDetailsfrm.reset();
    //load the personnel qualifiations 

    this.isBusinessPersonnelPopupVisible = true;
    this.personnel_id = 0;
    this.personnel_QualificationData = {};

  }

  onSaveNewPremisesPersonnelDetails() {
    //    this.spinner.show();
        let table_name;
        table_name = 'tra_staff_information';
        let name = this.newPremisesStafflDetailsfrm.get('name').value;
        let email_address = this.newPremisesStafflDetailsfrm.get('email_address').value;
        let telephone_no = this.newPremisesStafflDetailsfrm.get('telephone_no').value;
        let postal_address = this.newPremisesStafflDetailsfrm.get('postal_address').value;

        this.utilityService.onAddPersonnDetails(table_name, this.newPremisesStafflDetailsfrm.value)
          .subscribe(
            response => {
              this.app_resp = response.json();
              //the details 
              if (this.app_resp.success) {
                if(this.personnel_type_id == 1){
                
                  this.toastr.success(this.app_resp.message, 'Response');
      
                  this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: this.app_resp.record_id, contact_person: name})
                }
                else{
                  this.clinicalPersonnellDetailsfrm.patchValue({ personnel_id: this.app_resp.record_id, name: name, email_address: email_address, telephone_no: telephone_no, postal_address: postal_address })
                }
                this.isaddNewPremisesPersonnelDetails = false;
                this.isPersonnelPopupVisible = false;
              } else {
                this.toastr.error(this.app_resp.message, 'Alert');
              }
              this.spinner.hide();
            },
            error => {
              this.toastr.error('Error Occurred', 'Alert');
            });
      }
    onSaveClinicalPersonnelDetails() {
    this.spinner.show();
    let table_name;
    table_name = 'clinical_trial_personnel';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.clinicalPersonnellDetailsfrm.value, 'onSaveClinicalPersonnel')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isBusinessPersonnelPopupVisible = false;
            this.isperssonelAddPopupVisible = false;
            //reload
            this.onLoadClinicalDetails();
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
