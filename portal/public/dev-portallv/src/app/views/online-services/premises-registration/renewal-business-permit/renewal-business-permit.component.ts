import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { PremisesApplicationsService } from '../../../../services/premises-applications/premises-applications.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { SharedPremisesregistrationclassComponent } from '../shared-premisesregistrationclass/shared-premisesregistrationclass.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';

@Component({
  selector: 'app-renewal-business-permit',
  templateUrl: './renewal-business-permit.component.html',
  styleUrls: ['./renewal-business-permit.component.css']
})
export class RenewalBusinessPermitComponent extends SharedPremisesregistrationclassComponent implements OnInit {
  app_routing:any;
  premisesrenGeneraldetailsfrm: FormGroup;
  constructor(public cdr: ChangeDetectorRef,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {
    super(cdr,dmsService,fb,modalServ, viewRef, spinner, configService, appService, router, formBuilder, config, modalService, toastr, authService,utilityService)
  }
  
  ngOnInit() {
    this.is_readonly = true;
    this.premisesapp_details = this.appService.getPremisesApplicationDetail();

    if (!this.premisesapp_details) {

      this.router.navigate(['./../online-services/premisesrenewal-dashboard']);
      return;
    }
    else {
    
      this.sub_module_id = this.premisesapp_details.sub_module_id;
      this.process_title = this.premisesapp_details.process_title;
      this.section_id = this.premisesapp_details.section_id;
      this.business_type_id = this.premisesapp_details.business_type_id;
      this.premise_id = this.premisesapp_details.premise_id;
      this.tracking_no = this.premisesapp_details.tracking_no;
      this.country_id = this.premisesapp_details.country_id;
      this.region_id = this.premisesapp_details.region_id;

      this.status_name = this.premisesapp_details.status_name;
      this.status_id = this.premisesapp_details.status_id;
      this.init_premise_id = this.premisesapp_details.init_premise_id;
      this.registered_id = this.premisesapp_details.registered_id;
      this.tra_premise_id= this.premisesapp_details.tra_premise_id;
      this.module_id = this.premisesapp_details.module_id;

    }
    if(this.status_id < 1){
      this.status_name = "New"
      this.status_id = 1;
    }
    this.onLoadStudyFieldsDetails();
    this.onLoadQualificationDetails();

    this.onLoadSections();
    this.onLoadCountries();


    this.onLoadZones();
    this.onLoadBusinessScales();

    this.onLoadbusinessCategories();
    this.onLoadPersonnerDetails();
    this.onLoadPersonnelPositionDetails();


  }
  
  // onSavePremisesApplication() {
  //   const invalid = [];
  //   const controls = this.premisesGeneraldetailsfrm.controls;
  //   for (const name in controls) {
  //       if (controls[name].invalid) {
  //         this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
  //           return;
  //       }
  //   }
  //   if (this.premisesGeneraldetailsfrm.invalid) {
  //     return;
  //   }
  //   console.log(this.premisesGeneraldetailsfrm.value);
  //   this.spinner.show();
  //   this.appService.onSaveRenPremisesApplication(this.premise_id, this.premisesGeneraldetailsfrm.value, this.tracking_no)
  //     .subscribe(
  //       response => {
  //         this.premises_resp = response.json();
  //         //the details 
  //         this.spinner.hide();
  //         this.tracking_no = this.premises_resp.tracking_no;
  //         this.premise_id = this.premises_resp.premise_id;
  //         this.application_code = this.application_code;
  //         if (this.premises_resp.success) {
  //           this.toastr.success(this.premises_resp.message, 'Response');
  //           this.onLoadPremisesOtherDetails();
  //           this.onLoadPremisesPersonnelDetails();
  //           this.wizard.model.navigationMode.goToStep(1);
  //         } else {
  //           this.toastr.error(this.premises_resp.message, 'Alert');
  //         }
  //       },
  //       error => {
  //         this.loading = false;
  //       });
        
  // }
  onCloseQueryMode(){

    this.isInitalQueryResponseFrmVisible = false;
  }

  funcSelectPremiseDetails(data) {
    //check if there any pending detail
    this.appService.onCheckPendingPremisesRenewal(data.data.init_premise_id)
      .subscribe(
        data_response => {
          if (data_response.success) {
            this.premisesrenGeneraldetailsfrm.patchValue(data.data);

            this.init_premise_id = data.data.initial_premise_id;
            this.ispremisesSearchWinVisible = false;
            this.premisesrenGeneraldetailsfrm.get('init_premise_id').setValue(data.data.initial_premise_id);

          }
          else {
            this.toastr.error(data_response.message, 'Alert');

          }
        },
        error => {
          return false
        });
  }
}
