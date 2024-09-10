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
  selector: 'app-clinical-concomitant-drug',
  templateUrl: './clinical-concomitant-drug.component.html',
  styleUrls: ['./clinical-concomitant-drug.component.css']
})
export class ClinicalConcomitantDrugComponent implements OnInit {
  @Input() clinicalSitesDetailsData: any;
  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() commonNameData: any;
  @Input() dosageFormData: any;
  @Input() siUnitsData:any;
  @Input() clinicalProductCategoryData:any;
  @Input() manufacturersData:any;
  @Input() routeOfAdminData: any;
  @Input() application_id: number;
  @Input() investigatorCategoryData: any;
  concomimitantDrugsDetailsFrm: FormGroup;
  suspectedDrugsDetailsFrm: FormGroup;
  clinicalTrialControl: FormControl;
  confirmationData:any;
  drugInformationData:any;
  registeredProductsData:any ={};
  isRegisteredProductsWinshow:boolean=false;
  concomittantDrugsDetailsWinVisible:boolean = false;
  suspectedDrugsDetailsWinVisible:boolean = false;
  isLaboratoryTestWin:boolean = false;
  is_stopdate:boolean = false;
  isRelevantHistoryWin:boolean = false;
  laboratorytestdetailsfrm:FormGroup;
  isrelevantsaehistoryfrm:FormGroup;
  isReadOnlyProduct:boolean=false;
  reportCategoryData:any;
  reportTypeData:any;
  saerelevantData:any;
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
  IMPProductDetailsWinVisible:boolean;
  IMPHandlingProductDetailsWinVisible:boolean=false
  drugConcommitantData:any;
  manufacturersSiteData:any ={};
  manufactureringData:any ={};
  clinicaltrailIMPProdData:any;
  isRegisteredProductSearchWinVisible:boolean=false;
  isPreviewApplicationsDetails:boolean=false;
  classificationData:any;
  section_id:number;
  sectionsData:any;
  gmdnCategoryData:any;
  seriousnessData:any;
  reactionExpectationData:any;
  saelaboratoryData:any;
  isManufacturerSitePopupVisible:boolean= false;
  isManufacturerPopupVisible:boolean= false;
  isnewmanufacturerModalShow:boolean= false;
  manufacturerFrm:FormGroup;
  product_resp:any;
  isproductManufacturerModalShow:boolean= false;
  devicesTypeData:any;

    
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public appProdService:ProductApplicationService) {
      this.concomimitantDrugsDetailsFrm = new FormGroup({
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      common_name_id: new FormControl('', Validators.compose([Validators.required])),
      dosage_form_id: new FormControl('', Validators.compose([Validators.required])),
      routes_of_admin_id: new FormControl('', Validators.compose([Validators.required])),
      indication: new FormControl('', Validators.compose([Validators.required])),
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date:new FormControl('', Validators.compose([])),
      ongoing_id: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_name: new FormControl('', Validators.compose([Validators.required])), 
      registered_product_id: new FormControl('', Validators.compose([])), 
      manufacturer_id: new FormControl('', Validators.compose([])), 
      registration_date: new FormControl('', Validators.compose([])), 
      registration_no: new FormControl('', Validators.compose([])), 
      id: new FormControl('', Validators.compose([]))   
    });
      this.suspectedDrugsDetailsFrm = new FormGroup({
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      common_name_id: new FormControl('', Validators.compose([Validators.required])),
      dosage_form_id: new FormControl('', Validators.compose([Validators.required])),
      routes_of_admin_id: new FormControl('', Validators.compose([Validators.required])),
      indication: new FormControl('', Validators.compose([Validators.required])),
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date:new FormControl('', Validators.compose([])),
      ongoing_id: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_name: new FormControl('', Validators.compose([Validators.required])), 
      registered_product_id: new FormControl('', Validators.compose([])), 
      manufacturer_id: new FormControl('', Validators.compose([])), 
      registration_date: new FormControl('', Validators.compose([])), 
      registration_no: new FormControl('', Validators.compose([])), 
      id: new FormControl('', Validators.compose([]))   
    });

      this.laboratorytestdetailsfrm = new FormGroup({
      laboratory_test: new FormControl('', Validators.compose([Validators.required])),
      results: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))   
    });

      this.isrelevantsaehistoryfrm = new FormGroup({
      other_relevant_history: new FormControl('', Validators.compose([Validators.required])),
      seriousness_id: new FormControl('', Validators.compose([Validators.required])),
      expected_id: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))   
    });




  }

  ngOnInit() {
    this.onLoadclinicalStudyReportCategoryData();
    this.onLoadclinicalReportTypeData();
    this.onLoadconfirmDataParm();
    this.onLoadcommonNameData();
    this.onLoadClassifications();
    this.onLoadgmdnCategoryData();
    this.onLoadconcommittantData();
    this.onLoadSeriousnessData();
    this.onLoadreactionExpectationData();
    this.onLoadconfirmationDataData();
    this.onLoadrelevantHistoryData();
    this.onLoaddosageForms();
    this.onLoadrouteOfAdminData();
    this.onLoadsuspecteddrugsdata();


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

funcSearchManufacturing() {

  this.isManufacturerPopupVisible = true;
  var me = this;
 

this.manufactureringData.store = new CustomStore({
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
funcSelectManufacturer(data) {
    let data_resp = data.data;
    this.concomimitantDrugsDetailsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id});
    this.isManufacturerSitePopupVisible = false;

  }
funcSelectSiteManufacturer(data) {
    let data_resp = data.data;
    this.suspectedDrugsDetailsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id});
    this.isManufacturerPopupVisible = false;

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
  funcEditSuspectedDrugsDetails(data) {
    this.suspectedDrugsDetailsFrm.patchValue(data.data);
    this.suspectedDrugsDetailsWinVisible = true;

  }
funcAddManufacturerSite() {
  this.isnewmanufacturerModalShow = true;
  this.manufacturerFrm.reset();
}
onManufacturerPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
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
    onLoadrouteOfAdminData() {

  var data = {
    table_name: 'par_route_of_administration'
  };
  this.config.onLoadConfigurationData(data)

    .subscribe(
      data => {
        this.routeOfAdminData = data;
      },
      error => {
        return false;
      });
}
  onLoadSeriousnessData() {
    var data = {
      table_name: 'par_adr_seriousness',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.seriousnessData = data;
        });
  }

  onLoadreactionExpectationData() {
    var data = {
      table_name: 'par_clinical_sae_expectation',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reactionExpectationData = data;
        });
  }

onLoaddosageForms() {

  var data = {
    table_name: 'par_dosage_forms'
  };
  this.config.onLoadConfigurationData(data)

    .subscribe(
      data => {
        this.dosageFormData = data;
      },
      error => {
        return false;
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

  onLoadClassifications() {
    var data = {
      table_name: 'par_classifications',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
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
    onConcomittantDrugsPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddConcommitantDrugsDetails, 'concomitant Drugs Details');
  }
    funcAddConcommitantDrugsDetails() {
    this.concomittantDrugsDetailsWinVisible = true;
    this.concomimitantDrugsDetailsFrm.reset();

  }


    onSaeHistoryPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSaeHistoryDetails, 'Other Relevant History');
  }

    funcAddSaeHistoryDetails() {
    this.isRelevantHistoryWin = true;
    this.isrelevantsaehistoryfrm.reset();

  }
    onDrugsPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSuspectedDrugsDetails, 'Suspected Drugs Details');
  }
    funcAddSuspectedDrugsDetails() {
    this.suspectedDrugsDetailsWinVisible = true;
    this.suspectedDrugsDetailsFrm.reset();

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

  onLoadconcommittantData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_concomittant', application_id: this.application_id }, 'getClinicaltrailconcomittantDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.drugConcommitantData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }

  onLoadrelevantHistoryData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_sae_relevanthistory', application_id: this.application_id }, 'getClinicaltrailRelevantHistoryDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.saerelevantData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
   funcEditConcomittantDrugsDetails(data) {
    this.concomimitantDrugsDetailsFrm.patchValue(data.data);
    this.concomittantDrugsDetailsWinVisible = true;

  }
   funcEditRelevantHistoryDetails(data) {
    this.isrelevantsaehistoryfrm.patchValue(data.data);
    this.isRelevantHistoryWin = true;

  }
  funcDeleteClinicalDrugDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'tra_clinicaltrial_sae_drug', 'sae_drugs','Suspected Drug Information');
  }
  funcDeleteClinicalConcomittantDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'tra_clinicaltrial_concomittant', 'concomittant_drugs','Concomittant Drug Information');
  }

  funcDeleteClinicalrelevantDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'tra_clinicaltrial_sae_relevanthistory', 'relevant_history', 'Relevant History Details');
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
                 this.onLoadsuspecteddrugsdata();
                 this.onLoadconcommittantData();
                 this.onLoadrelevantHistoryData();
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
   onClinicalTrialDateChange($event) {
    
    if($event.value == 2){
        this.is_stopdate =true;
        this.suspectedDrugsDetailsFrm.get('end_date').setValidators([Validators.required]);
        this.suspectedDrugsDetailsFrm.get('end_date').updateValueAndValidity();

    }else{
      this.is_stopdate =false;
     this.suspectedDrugsDetailsFrm.get('end_date').clearValidators();
      this.suspectedDrugsDetailsFrm.get('end_date').updateValueAndValidity();
    }
    

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
  onsaveConcomittantDrugDetails() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_concomittant';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.concomimitantDrugsDetailsFrm.value, 'onsaveConcomittantDrugDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.concomittantDrugsDetailsWinVisible = false;
            //reload
            this.onLoadconcommittantData();

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

    onsaveRelevantHistoryDetails() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_sae_relevanthistory';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.isrelevantsaehistoryfrm.value, 'onsaveRelevantHistoryDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isRelevantHistoryWin = false;
            //reload
            this.onLoadrelevantHistoryData();

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
