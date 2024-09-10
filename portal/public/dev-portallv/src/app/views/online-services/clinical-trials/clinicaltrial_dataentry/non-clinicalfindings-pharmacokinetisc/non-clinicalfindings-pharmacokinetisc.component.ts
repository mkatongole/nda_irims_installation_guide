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
  selector: 'app-non-clinicalfindings-pharmacokinetisc',
  templateUrl: './non-clinicalfindings-pharmacokinetisc.component.html',
  styleUrls: ['./non-clinicalfindings-pharmacokinetisc.component.css']
})
export class NonClinicalfindingsPharmacokinetiscComponent implements OnInit {

 @Input() clinicalSitesDetailsData: any;

  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() section_id: number;
  @Input() regions: any;
  @Input() countries: any;
  @Input() districts: any;
  @Input() application_id: number;
  @Input() investigatorCategoryData: any;

  
  dosageAddWinVisible:boolean = false;
  toxicityDosageFrm:FormGroup;
  app_resp:any;
  clinicalProductGenericData:any;
  clinicaltraildosageToxicityData: any;
  dosagetypeData:any;
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {

    this.toxicityDosageFrm = new FormGroup({
      dosage_type_id: new FormControl('', Validators.compose([Validators.required])),
      species: new FormControl('', Validators.compose([Validators.required])),
      dose_route: new FormControl('', Validators.compose([])),
      mntd: new FormControl('', Validators.compose([])),
      common_name_id: new FormControl('', Validators.compose([])),
      major_findings: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });
  }
  ngOnInit() {
    this.onLoadclinicaltrailDosageToxicityData();
    this.onLoadToxicityDosage();
  } 
  adjustTextAreaHeight(event: any): void {
  const textarea = event.target;
  textarea.style.overflow = 'hidden'; // Hide any overflow content
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
}
  onLoadclinicaltrailDosageToxicityData() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinicaltrial_toxicitydosage', application_id: this.application_id }, 'getNonClinicaltrailToxicologyData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltraildosageToxicityData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
   onLoadclinicaltrailIMPProdData() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_products', application_id: this.application_id }, 'getClinicaltrailIMPProdData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicalProductGenericData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  } 
 onLoadToxicityDosage() {

    var data = {
      table_name: 'par_clinicaldosage_toxicity',
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.dosagetypeData = data;
        },
        error => {
          return false
        });
  }
     funcEditIMPHandlingDetails(data) {
    this.toxicityDosageFrm.patchValue(data.data);
    this.dosageAddWinVisible = true;

  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
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

  onToxicityDosagePreparing(e) {
    this.functDataGridToolbar(e, this.funcAddToxicityDosageDetails, 'Toxicity Dosage Details');
  }

  funcAddToxicityDosageDetails() {
    this.dosageAddWinVisible = true;
    this.onLoadclinicaltrailIMPProdData();
    this.toxicityDosageFrm.reset();
  }

  funcDeleteDosageToxicityDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'wb_clinicaltrial_toxicitydosage', 'dosage', 'Toxicity Details');
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
                 
                 this.onLoadclinicaltrailDosageToxicityData();
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
  
  onsaveToxicityDosage() {
    this.spinner.show();
    let table_name;
    table_name = 'wb_clinicaltrial_toxicitydosage';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.toxicityDosageFrm.value, 'onsaveToxicityDosage')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.dosageAddWinVisible = false;
            //reload
            this.onLoadclinicaltrailDosageToxicityData();
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
}