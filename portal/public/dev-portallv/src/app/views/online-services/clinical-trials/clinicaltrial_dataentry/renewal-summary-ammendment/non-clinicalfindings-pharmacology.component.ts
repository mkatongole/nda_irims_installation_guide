import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
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
  selector: 'app-non-clinicalfindings-pharmacology',
  templateUrl: './non-clinicalfindings-pharmacology.component.html',
  styleUrls: ['./non-clinicalfindings-pharmacology.component.css']
})
export class NonClinicalfindingsPharmacologyComponent implements OnInit {

 @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() section_id: number;
  @Input() reg_clinical_trial_id: number;
  @Input() is_readonly: boolean;
  @Input() application_id:number;
  confirmationData:any;
  summaryActivityDetailsData:any;
  regulatoryLapseData:any;
  deviationReportData:any;
  inspectionAuditData:any;
  app_resp:any;
  auto:any;
  regulatoryStudyData:any;
  SummaryAmmendmentDetailsWinVisible:boolean=false;
  RegulatoryLapseDetailsWinVisible:boolean=false;
  DeviationReportingDetailsWinVisible:boolean=false;
  InspectionReportingDetailsWinVisible:boolean=false;
  
  summaryAmmendmentFrm: FormGroup;
  regulatoryLapseStudyFrm:FormGroup;
  inspectionRegulatoryReportingFrm:FormGroup;
  deviationReportingFrm:FormGroup;
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
    this.summaryAmmendmentFrm = new FormGroup({
     type_of_ammendment: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      summary_of_ammendment: new FormControl('', Validators.compose([Validators.required])),
      date_of_approval_by: new FormControl('', Validators.compose([]))

    });

    this.regulatoryLapseStudyFrm = new FormGroup({
      lapse_study_id: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      date_of_occurrance: new FormControl('', Validators.compose([Validators.required])),
      reason: new FormControl('', Validators.compose([]))
    
    });

    this.inspectionRegulatoryReportingFrm = new FormGroup({
      regulatory_body: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      date_of_inspection: new FormControl('', Validators.compose([Validators.required])),
      outcome: new FormControl('', Validators.compose([]))
      
    });
    this.deviationReportingFrm = new FormGroup({
      deviation: new FormControl('', Validators.compose([Validators.required])),
      capa: new FormControl('', Validators.compose([Validators.required])),
      date_of_occurrance: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))

    });

    
  }
  ngOnInit() {
  this.onLoadClinicalSummaryActivityDetails();
  this.onLoadClinicalRegulatoryLapseDetails();
  this.onLoadClinicalDeviationReportDetails();
  this.onLoadClinicalInspectionReportDetails();
  this.onLoadRegulatoryStudy();
  } 
  adjustTextAreaHeight(event: any): void {
  const textarea = event.target;
  textarea.style.overflow = 'hidden'; // Hide any overflow content
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
}

  refreshDataGrid() {
   // this.dataGrid.instance.refresh();
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }

onSummaryAmmendmentPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSummaryAmmendmentDetails, 'Summary of Ammendment Details');
  }
  funcAddSummaryAmmendmentDetails() {
    this.SummaryAmmendmentDetailsWinVisible = true;
    this.summaryAmmendmentFrm.reset();
  }
onRegulatoryLapse(e) {
    this.functDataGridToolbar(e, this.funcAddRegulatoryLapseDetails, 'Outline Regulatory Lapse');
  }
  funcAddRegulatoryLapseDetails() {
    this.RegulatoryLapseDetailsWinVisible = true;
    this.regulatoryLapseStudyFrm.reset();
  }

onDeviationReportingPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddDeviationDetails, 'Outline of Deviation Reporting');
  }
  funcAddDeviationDetails() {
    this.DeviationReportingDetailsWinVisible = true;
    this.deviationReportingFrm.reset();
  }

onInspectionBodiesPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddInspectionBodiesDetails, 'Outline Inspection Bodies');
  }
  funcAddInspectionBodiesDetails() {
    this.InspectionReportingDetailsWinVisible = true;
    this.inspectionRegulatoryReportingFrm.reset();
  } 

    funcEditSummaryDetails(data) {
    this.summaryAmmendmentFrm.patchValue(data.data);
    this.SummaryAmmendmentDetailsWinVisible = true;

  }

    funcEditRegulatoryLapseDetails(data) {
    this.regulatoryLapseStudyFrm.patchValue(data.data);
    this.RegulatoryLapseDetailsWinVisible = true;

  }

    funcEditDeviationDetails(data) {
    this.deviationReportingFrm.patchValue(data.data);
    this.DeviationReportingDetailsWinVisible = true;

  }

    funcEditInspectionReportDetails(data) {
    this.inspectionRegulatoryReportingFrm.patchValue(data.data);
    this.InspectionReportingDetailsWinVisible = true;

  }

  onLoadRegulatoryStudy() {

    var data = {
      table_name: 'par_clinical_regulatorystudy',
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.regulatoryStudyData = data;
        },
        error => {
          return false
        });
  }
  




 funcDeleteOtherDetails(site_data,table_name) {
    this.funcClinicalTrialOtherDeletehelper(site_data, table_name, 'tra_clinicaltrial_producthandling', 'Clinical Trial Products');
  }
  funcClinicalTrialOtherDeletehelper(record_data, table_name, reload_funccheck, delete_title) {
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
          this.appService.onDeleteOtherdetails(record_id, table_name, this.application_id, delete_title)
            .subscribe(
              response => {
                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
                  
                  this.refreshDataGrid();
                  
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

  onLoadClinicalSummaryActivityDetails() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_summary_activity', application_id: this.application_id }, 'getClinicalSummaryActivityDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.summaryActivityDetailsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }

  onLoadClinicalRegulatoryLapseDetails() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_regulatorylapse', application_id: this.application_id }, 'getClinicalRegulatoryLapseDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.regulatoryLapseData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
    onLoadClinicalDeviationReportDetails() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_deviationrprt', application_id: this.application_id }, 'getClinicalDeviationReportDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.deviationReportData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
 onLoadClinicalInspectionReportDetails() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_inspectionrprt', application_id: this.application_id }, 'getClinicalInspectionReportDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.inspectionAuditData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
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
 onsaveSummaryActivity() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_summary_activity';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.summaryAmmendmentFrm.value, 'onsaveSummaryActivity')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.SummaryAmmendmentDetailsWinVisible = false;
            //reload
            this.onLoadClinicalSummaryActivityDetails();
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

 onsaveRegulatorystudyLapse() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_regulatorylapse';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.regulatoryLapseStudyFrm.value, 'onsaveRegulatorystudyLapse')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.RegulatoryLapseDetailsWinVisible = false;
            //reload
            this.onLoadClinicalRegulatoryLapseDetails();
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

 onsaveDeviationReport() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_deviationrprt';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.deviationReportingFrm.value, 'onsaveDeviationReport')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.DeviationReportingDetailsWinVisible = false;
            //reload
            this.onLoadClinicalDeviationReportDetails();
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

 onsaveInspectionReport() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_inspectionrprt';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.inspectionRegulatoryReportingFrm.value, 'onsaveInspectionReport')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.InspectionReportingDetailsWinVisible = false;
            //reload
            this.onLoadClinicalInspectionReportDetails();
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

