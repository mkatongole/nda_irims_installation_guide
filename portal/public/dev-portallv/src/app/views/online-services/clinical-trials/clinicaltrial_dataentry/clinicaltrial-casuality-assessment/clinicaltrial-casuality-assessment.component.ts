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
import { HttpClient,HttpHeaders} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-clinicaltrial-casuality-assessment',
  templateUrl: './clinicaltrial-casuality-assessment.component.html',
  styleUrls: ['./clinicaltrial-casuality-assessment.component.css']
})
export class ClinicaltrialCasualityAssessmentComponent implements OnInit {
  @Input() clinicalSitesDetailsData: any;
  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() commonNameData: any;
  @Input() casualitytoolData: any;
  @Input() siUnitsData:any;
  @Input() clinicalProductCategoryData:any;
  @Input() manufacturersData:any;
  @Input() routeOfAdminData: any;
  @Input() application_id: number;
  @Input() investigatorCategoryData: any;
  suspectedDrugsDetailsFrm: FormGroup;
  clinicalTrialControl: FormControl;
  confirmationData:any;
  registeredProductsData:any ={};
  isRegisteredProductsWinshow:boolean=false;
  suspectedDrugsDetailsWinVisible:boolean = false;
  isNaranjoAssessment:boolean = false;
  isCasualityAssessmentWin:boolean = false;
  isInvestigationalWin:boolean = false;
  casualityassessmentfrm:FormGroup;
  investigationsdetailsfrm:FormGroup;
  isReadOnlyProduct:boolean=false;
  is_confirmation:boolean=false;
  is_confirmationDate:boolean=false;
  is_othertool:boolean=false;
  reportCategoryData:any;
  reportTypeData:any;
  casualityData:any;
  severityeventData:any;
  outcomeeventData:any;
  relatednessData:any;
  casualityAssessmentData:any;
  dtClinicalTrialApplicationData:any;
  addProductParamsdetailsfrm:FormGroup;
  iMPHandlingProductDetailsFrm:FormGroup;
  addproductCommonNameModal:boolean;
  clinicaltrailPlaceboProdData:any;
  clinicaltrailComparatorPProdData:any;
  clinicaltrailHandlingProdData:any;
  isClinicalSitesDetailsVisible:boolean=false;
  saeinvestigationsData:any;
  studySitesData:any;
  studySiteFrm:FormGroup;
  isStudySiteAddWinVisible:boolean;
  region:any;
  districts:any;
  app_resp:any;
  regions:any;
  confirmDataParam:any;
  IMPProductDetailsWinVisible:boolean;
  IMPHandlingProductDetailsWinVisible:boolean=false
  drugInformationData:any;
  manufacturersSiteData:any ={};
  clinicaltrailIMPProdData:any;
  isRegisteredProductSearchWinVisible:boolean=false;
  isPreviewApplicationsDetails:boolean=false;
  classificationData:any;
  section_id:number;
  sectionsData:any;
  gmdnCategoryData:any;
  saelaboratoryData:any;
  narajoAssessmentToolData:any;
  isManufacturerSitePopupVisible:boolean= false;
  isnewmanufacturerModalShow:boolean= false;
  manufacturerFrm:FormGroup;
  product_resp:any;
  isproductManufacturerModalShow:boolean= false;
  devicesTypeData:any;


  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public appProdService:ProductApplicationService) {
      this.casualityassessmentfrm = new FormGroup({
      tool_id: new FormControl('', Validators.compose([Validators.required])),
      casuality_id: new FormControl('', Validators.compose([Validators.required])),
      conclusion_releted_id: new FormControl('', Validators.compose([Validators.required])),
      severity_event_id: new FormControl('', Validators.compose([Validators.required])),
      outcome_event_id: new FormControl('', Validators.compose([Validators.required])),
      confirmation_id: new FormControl('', Validators.compose([])),
      confirmed_date:new FormControl('', Validators.compose([])),
      drug_stop_id: new FormControl('', Validators.compose([Validators.required])),
      reported_id: new FormControl('', Validators.compose([Validators.required])), 
      other_cause_event: new FormControl('', Validators.compose([])),
      other_tool: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))   
    });


      this.investigationsdetailsfrm = new FormGroup({
      investigations: new FormControl('', Validators.compose([Validators.required])),
      results: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))   
    });
  }

  ngOnInit() {
    this.onLoadclinicalStudyReportCategoryData();
    this.onLoadclinicalReportTypeData();
    this.onLoadconfirmDataParm();
    this.onLoadcommonNameData();
    this.onLoadConclusionreletedData();
    this.onLoadOutcomeEventData();
    this.onLoadgmdnCategoryData();
    this.onLoadsuspecteddrugsdata();
    this.onLoadsaelaboratoryTestData();
    this.onLoadsaeInvestigationData();
    this.onLoadconfirmationDataData();
    this.onLoadCasualityAssessmentDetails();
    this.onLoadToolData();
    this.onLoadconfirmDataData();
    this.onLoadCasualityData();
    this.onLoadSeverityEventData();

  }

   funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  adjustTextAreaHeight(event: any): void {
  const textarea = event.target;
  textarea.style.overflow = 'hidden'; // Hide any overflow content
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
  }
funcSearchManufacturingSite() {

  this.isManufacturerSitePopupVisible = true;
  var me = this;
 

this.manufacturersSiteData.store = new CustomStore({
  load: function (loadOptions: any) {
    console.log(loadOptions)
      var params = '?';
      params += 'skip=' + loadOptions.skip;
      params += '&take=' + loadOptions.take;//searchValue
      var headers = new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + me.authService.getAccessToken(),
      });
    
      this.configData = {
        headers: headers,
        params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter }
      };
      return me.httpClient.get(AppSettings.base_url + 'productregistration/getManufacturersInformation',this.configData)
          .toPromise()
          .then((data: any) => {
              return {
                  data: data.data,
                  totalCount: data.totalCount
              }
          })
          .catch(error => { throw 'Data Loading Error' });
  }
});

} 
funcAddManufacturerSite() {
  this.isnewmanufacturerModalShow = true;
  this.manufacturerFrm.reset();
}
onManufacturerPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  }
funcSelectManufacturer(data) {
    let data_resp = data.data;
    this.suspectedDrugsDetailsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id});
     
    this.isManufacturerSitePopupVisible = false;

  }

  onSearchRegisteredProductApplication(){
    
    this.isRegisteredProductsWinshow = true;
      let me = this;
      this.registeredProductsData.store = new CustomStore({
        load: function (loadOptions: any) {
          console.log(loadOptions)
            var params = '?';
            params += 'skip=' + loadOptions.skip;
            params += '&take=' + loadOptions.take;//searchValue
            var headers = new HttpHeaders({
              "Accept": "application/json",
              "Authorization": "Bearer " + me.authService.getAccessToken(),
            });
          
            this.configData = {
              headers: headers,
              params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter }
            };
            return me.httpClient.get(AppSettings.base_url + 'productregistration/onSearchRegisteredProductApplication',this.configData)
                .toPromise()
                .then((data: any) => {
                    return {
                        data: data.data,
                        totalCount: data.totalCount
                    }
                })
                .catch(error => { throw 'Data Loading Error' });
        }
    });
}    
onLoadToolData() {

  var data = {
    table_name: 'par_adr_tools'
  };
  this.config.onLoadConfigurationData(data)

    .subscribe(
      data => {
        this.casualitytoolData = data;
      },
      error => {
        return false;
      });
}
 

  onLoadgmdnCategoryData() {
    var data = {
      table_name: 'par_gmdn_categories',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.gmdnCategoryData = data;
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


  onLoadconfirmDataData() {

  var data = {
    table_name: 'par_pv_assessment_confirmation'
  };
  this.config.onLoadConfigurationData(data)

    .subscribe(
      data => {
        this.confirmDataParam = data;
      },
      error => {
        return false;
      });
}


  onLoadCasualityData() {

  var data = {
    table_name: 'par_adr_casuality'
  };
  this.config.onLoadConfigurationData(data)

    .subscribe(
      data => {
        this.casualityData = data;
      },
      error => {
        return false;
      });
}
  onLoadConclusionreletedData() {
    var data = {
      table_name: 'par_adr_reletedness',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.relatednessData = data;
        });
  }  onLoadOutcomeEventData() {
    var data = {
      table_name: 'par_adr_outcomes',
      is_online:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.outcomeeventData = data;
        });
  }
    onLoadSeverityEventData() {
    var data = {
      table_name: 'par_adr_severity',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.severityeventData = data;
        });
  }

  onIsRegisteredProductChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyProduct =true;
        this.clinicalTrialControl.setValidators([Validators.required]);
        this.clinicalTrialControl.updateValueAndValidity();

    }else{
      this.isReadOnlyProduct =false;
      this.clinicalTrialControl.clearValidators();
      this.clinicalTrialControl.updateValueAndValidity();
    }
    

  }

onLoadcommonNameData() {
  var data = {
    table_name: 'par_common_names',
  };
  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.commonNameData = new DataSource({
            paginate: true,
            pageSize: 200,
            store: {
              type: "array",
                data: data,
                key: "id"
            }
        });
      });

}
    onDrugsPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSuspectedDrugsDetails, 'Suspected Drugs Details');
  }
    funcAddSuspectedDrugsDetails() {
    this.suspectedDrugsDetailsWinVisible = true;
    this.suspectedDrugsDetailsFrm.reset();

  }
    onCasualityassessmentPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddCasualityAssessmentDetails, 'Casuality Assessment Details');
  }

    funcAddCasualityAssessmentDetails() {
    this.isCasualityAssessmentWin = true;
    this.casualityassessmentfrm.reset();

  }

    onSaeInvestigationsPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSaeInvestigationsDetails, 'Investigations Details');
  }

    funcAddSaeInvestigationsDetails() {
    this.isInvestigationalWin = true;
    this.investigationsdetailsfrm.reset();

  }
  onClinicalTrialProductChange($event) {

  if ($event.value == 1 || $event.value == 4 || $event.value == 10 || $event.value == 11 || $event.value == 12 ){
    this.is_confirmation = true;
    this.casualityassessmentfrm.get('confirmation_id').setValidators([Validators.required]);
    this.casualityassessmentfrm.get('confirmation_id').updateValueAndValidity();
  }else{
    this.is_confirmation = false;
     this.casualityassessmentfrm.get('confirmation_id').clearValidators();
    this.casualityassessmentfrm.get('confirmation_id').updateValueAndValidity();
  }
}   

  onClinicalTrialConfrimChange($event) {

  if ($event.value == 1 ){
    this.is_confirmationDate = true;
    this.casualityassessmentfrm.get('confirmed_date').setValidators([Validators.required]);
    this.casualityassessmentfrm.get('confirmed_date').updateValueAndValidity();

  }else{
    this.is_confirmationDate = false;
     this.casualityassessmentfrm.get('confirmed_date').clearValidators();
      this.casualityassessmentfrm.get('confirmed_date').updateValueAndValidity();
  }
}   
onClinicalTrialToolChange($event) {

  if ($event.value == 3){
    this.is_othertool = true;

  }else if($event.value == 2){
    this.is_othertool = false;
    this.isNaranjoAssessment =true;
    this.onLoadNaranjoAssessmentToolData();

  }else{
    this.is_othertool = false;

  }
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
        onClick: this.funcOnReloadProducts.bind(this)
      }
    });
  }
    funcOnReloadProducts(){

    //this.onLoadclinicaltrailIMPProdData();

  }
    onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmationData = data;
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
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reportTypeData = data;
        });
  }


  onLoadNaranjoAssessmentToolData() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_casuality_assessment', application_code: this.application_code }, 'getCasaultyAssessment')
      .subscribe(
        data => {
          if (data.success) {
            this.narajoAssessmentToolData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onLoadCasualityAssessmentDetails() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_casuality_assessment', application_id: this.application_id }, 'getClinicaltrailCasualityAssessmentDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.casualityAssessmentData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onLoadsuspecteddrugsdata() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_sae_drug', application_id: this.application_id }, 'getClinicaltrailSeaDrugs')
      .subscribe(
        data => {
          if (data.success) {
            this.drugInformationData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }



  onLoadsaelaboratoryTestData() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_sae_labtest', application_id: this.application_id }, 'getClinicaltrailSeaLabTest')
    .subscribe(
      data => {
        if (data.success) {
          this.saelaboratoryData = data.data;
          console.log(this.saelaboratoryData);
        } else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        console.error('Error loading sae laboratory data:', error);
      }
    );
  }


   funcEditSuspectedDrugsDetails(data) {
    this.suspectedDrugsDetailsFrm.patchValue(data.data);
    this.suspectedDrugsDetailsWinVisible = true;

  }
   funcEditCasualityAssessmentDetails(data) {
    this.casualityassessmentfrm.patchValue(data.data);
    this.isCasualityAssessmentWin = true;

  }
    funcEditInvestigationsDetails(data) {
    this.investigationsdetailsfrm.patchValue(data.data);
    this.isInvestigationalWin = true;

  }

  funcDeleteClinicalDrugDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'tra_clinicaltrial_sae_drug', 'sae_drugs','Suspected Drug Information');
  }

  funcDeleteCasualityAssmentDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'tra_clinicaltrial_casuality_assessment', 'casuality_test', 'casuality  Details');
  }
  funcDeleteClinicalInvestigationsDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'tra_clinicaltrial_sae_labtest', 'investigations', 'Investigations Details');
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
          this.appService.onDeleteMisTablePermitdetails(record_id, table_name, this.application_id, delete_title)
            .subscribe(
              response => {
                this.spinner.hide();
                let response_data = response.json();
                
                if (response_data.success) {
                 
                 this.onLoadCasualityAssessmentDetails();
                 this.onLoadsaelaboratoryTestData();
                 this.onLoadsaeInvestigationData();

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
  
  onLoadsaeInvestigationData() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_sae_investigations', application_id: this.application_id }, 'getClinicaltrailSeaVariations')
      .subscribe(
        data => {
          if (data.success) {
            this.saeinvestigationsData = data.data;
            console.log(this.saeinvestigationsData);
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }

  onsaveSuspectedDrugDetails() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_sae_drug';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.suspectedDrugsDetailsFrm.value, 'saveClinicalSaeDrugsDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.suspectedDrugsDetailsWinVisible = false;
            //reload
            this.onLoadsuspecteddrugsdata();

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
  onsaveCasualityAssessmentDetails() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_casuality_assessment';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.casualityassessmentfrm.value, 'saveClinicalCasualityAssessmentDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isCasualityAssessmentWin = false;
            //reload
            this.onLoadCasualityAssessmentDetails();

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
    onsaveSaeInvestigationsDetails() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_sae_investigations';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.investigationsdetailsfrm.value, 'onsaveSaeInvestigationsDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isInvestigationalWin = false;
            //reload
            this.onLoadsaeInvestigationData();

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

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          text: 'Save/Update Changes',
          icon: 'save',
          onClick: this.onSaveChanges.bind(this)
        }
      });
  }

onSaveChanges() {
    const report_questions = this.narajoAssessmentToolData.map(item => ({
      score_id: item.score_id,
      question_id:item.question_id
    }));
    this.appService.onsaveClinicaltrialAppCodeOtherDetails(this.application_code, { report_questions: JSON.stringify(report_questions) }, 'saveAssessmentReportdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          if (this.app_resp.success) {
            this.onLoadNaranjoAssessmentToolData();
            this.toastr.success(this.app_resp.message, 'Response');
            this.spinner.hide();
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        }
      );
  }

 onCellNaranjoPrepared(e) {
    if (e.parentType === 'dataRow' && e.dataField === 'score_id') {
      const rowKey = e.key !== undefined ? e.key : e.row && e.row.key;

      if (rowKey !== undefined) {
        e.editorOptions.onValueChanged = (args) => {
          this.handleValueChange(args.value, rowKey);
        };
      }
    }
  }

  handleValueChange(newValue: any, id: number) {
    const newData = this.narajoAssessmentToolData.map(item => {
      if (item.id === id) {
        return { ...item, score_id: newValue };
      }
      return item;
    });
    this.narajoAssessmentToolData = newData;
  }
customizeSummaryText(summaryInfo) {
  return 'Total Score: ' + summaryInfo.value;
}


}
