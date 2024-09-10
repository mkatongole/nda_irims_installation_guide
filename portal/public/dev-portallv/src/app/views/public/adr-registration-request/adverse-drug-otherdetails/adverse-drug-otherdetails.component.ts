import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Utilities } from 'src/app/services/common/utilities.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-adverse-drug-otherdetails',
  templateUrl: './adverse-drug-otherdetails.component.html',
  styleUrls: ['./adverse-drug-otherdetails.component.css']
})
export class AdverseDrugOtherdetailsComponent implements OnInit {
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
  clinicalTrialControl: FormControl;
  confirmationData:any;
  registeredProductsData:any ={};
  isRegisteredProductsWinshow:boolean=false;
  concomittantDrugsDetailsWinVisible:boolean = false;
  isLaboratoryTestWin:boolean = false;
  is_stopdate:boolean = false;
  isRelevantHistoryWin:boolean = false;

  medicalHistoryWinVisible:boolean = false;
  isDrugHistoryWin:boolean = false;
  isReactionDrugWin:boolean = false;
  isDrugInformationWin:boolean = false;
  isTestProcedureWin:boolean = false;

  laboratorytestdetailsfrm:FormGroup;
  isrelevantsaehistoryfrm:FormGroup;
  isReadOnlyProduct:boolean=false;
  is_readOnly:boolean=false;
  reportCategoryData:any;
  reportTypeData:any;
  drugHistoryData:any;
  drugreactionData:any;
  drugInformationData:any;
  testProcedureData:any;
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
  medicalHistoryData:any;
  manufacturersSiteData:any ={};
  clinicaltrailIMPProdData:any;
  isRegisteredProductSearchWinVisible:boolean=false;
  isPreviewApplicationsDetails:boolean=false;
  classificationData:any;
  section_id:number;
  sectionsData:any;
  gmdnCategoryData:any;
  outcomeData:any;
  testResultData:any;
  medicalConfirmationData:any;
  aefiCategoryData:any;
  seriousnessData:any;
  reactionExpectationData:any;
  saelaboratoryData:any;
  drugRoleData:any;
  suspectedIngredientData:any;
  isManufacturerSitePopupVisible:boolean= false;
  isnewmanufacturerModalShow:boolean= false;
  manufacturerFrm:FormGroup;
  product_resp:any;
  isproductManufacturerModalShow:boolean= false;
  devicesTypeData:any;
  siUnitData:any;
  testResultCodeData:any;

  drugHistorydetailsfrm:FormGroup;
  medicalHistoryDetailsFrm:FormGroup;
  drugReactiondetailsfrm:FormGroup;
  isdrugInformationdetailsfrm:FormGroup;
  testProcedurefrm:FormGroup;
    
  constructor(public utilityService: Utilities, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService,public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
      this.medicalHistoryDetailsFrm = new FormGroup({
      relevant_history: new FormControl('', Validators.compose([Validators.required])),
      continueing_id: new FormControl('', Validators.compose([Validators.required])),
      is_family_history_id: new FormControl('', Validators.compose([Validators.required])),
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([Validators.required])),
      remark:new FormControl('', Validators.compose([])), 
      id: new FormControl('', Validators.compose([]))   
    });

      this.drugHistorydetailsfrm = new FormGroup({
      previous_medication: new FormControl('', Validators.compose([Validators.required])),
      previous_medication_whodrug: new FormControl('', Validators.compose([Validators.required])),
      indication_meddra: new FormControl('', Validators.compose([Validators.required])),
      reaction_meddra: new FormControl('', Validators.compose([Validators.required])),
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))   
    });

        this.drugReactiondetailsfrm = new FormGroup({
      reaction_event_medra: new FormControl('', Validators.compose([Validators.required])),
      reaction_event: new FormControl('', Validators.compose([Validators.required])),
      onset_date: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([Validators.required])),
      end_time: new FormControl('', Validators.compose([Validators.required])),
      adr_outcome_id: new FormControl('', Validators.compose([Validators.required])),
      seriousness_id:new FormControl('', Validators.compose([])), 
      confirmation_by_healthcare_id:new FormControl('', Validators.compose([])),
      onset_time:new FormControl('', Validators.compose([])),
      is_serious_id: new FormControl('', Validators.compose([Validators.required])),
      aefi_category_id: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))   
    });

        this.isdrugInformationdetailsfrm = new FormGroup({
      report_category_id: new FormControl('', Validators.compose([Validators.required])),
      report_type_id: new FormControl('', Validators.compose([Validators.required])),
      drug_role_id: new FormControl('', Validators.compose([Validators.required])),
      who_drug_name: new FormControl('', Validators.compose([Validators.required])),
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      mah_holder: new FormControl('', Validators.compose([Validators.required])),
      strength:new FormControl('', Validators.compose([])), 
      indication: new FormControl('', Validators.compose([Validators.required])),
      suspected_ingredient_id: new FormControl('', Validators.compose([Validators.required])),
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([Validators.required])),
      expiry_date: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_name:new FormControl('', Validators.compose([])), 
      use_reasons:new FormControl('', Validators.compose([])), 
      remarks: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))   
    });


    this.testProcedurefrm = new FormGroup({
      test_date: new FormControl('', Validators.compose([Validators.required])),
      tes_name_medra: new FormControl('', Validators.compose([Validators.required])),
      test_name: new FormControl('', Validators.compose([Validators.required])),
      test_logic_id: new FormControl('', Validators.compose([Validators.required])),
      no_of_tests: new FormControl('', Validators.compose([Validators.required])),
      test_si_unit_id: new FormControl('', Validators.compose([Validators.required])),
      test_result_code_id:new FormControl('', Validators.compose([])), 
      result: new FormControl('', Validators.compose([])),
      normal_low_value: new FormControl('', Validators.compose([])),
      lowvalue_si_unit_id: new FormControl('', Validators.compose([Validators.required])),
      normal_high_value: new FormControl('', Validators.compose([Validators.required])),
      highvalue_si_unit_id:new FormControl('', Validators.compose([])), 
      remarks: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))   
    });

  }

  ngOnInit() {
    this.onLoadconfirmDataParm();
    this.onLoadcommonNameData();
    this.onLoadClassifications();
    this.onLoadgmdnCategoryData();
    this.onLoadSeriousnessData();
    this.onLoadreactionExpectationData();
    this.onLoadconfirmationDataData();
    this.onLoaddosageForms();
    this.onLoadrouteOfAdminData();
    this.onLoadAdrOutcomesData();
    this.onLoadAEFICategoriesData();
    this.onLoadReportCategoryData();
    this.onLoadReportTypeData();
    this.onLoadDrugRoleData();
    this.onLoadsuspectedIngredientData();
    this.onLoadtestResultData();
    this.onLoadSIunitData();
    this.onLoadTestCodeData();

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
funcSelectManufacturer(data) {
    let data_resp = data.data;
    this.concomimitantDrugsDetailsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id});
     
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
funcAddManufacturerSite() {
  this.isnewmanufacturerModalShow = true;
  this.manufacturerFrm.reset();
}
onManufacturerPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  }



  onLoadsuspectedIngredientData() {
    var data = {
      table_name: 'par_adr_suspected_ingredients',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.suspectedIngredientData = data;
        });
  }

  onLoadtestResultData() {
    var data = {
      table_name: 'par_adr_test_result_signs',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.testResultData = data;
        });
  }
  onLoadSIunitData() {
    var data = {
      table_name: 'par_si_units',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.siUnitData = data;
        });
  }
  onLoadTestCodeData() {
    var data = {
      table_name: 'par_adr_test_code',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.testResultCodeData = data;
        });
  }
  onLoadReportCategoryData() {
    var data = {
      table_name: 'par_adr_categories',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reportCategoryData = data;
        });
  }

  onLoadReportTypeData() {
    var data = {
      table_name: 'par_adr_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reportTypeData = data;
        });
  }


  onLoadDrugRoleData() {
    var data = {
      table_name: 'par_adr_drugrole',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.drugRoleData = data;
        });
  }




  onLoadAdrOutcomesData() {
    var data = {
      table_name: 'par_adr_outcomes',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.outcomeData = data;
        });
  }
  
  onLoadAEFICategoriesData() {
    var data = {
      table_name: 'par_aefi_categories',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.aefiCategoryData = data;
        });
  }


  onSeriousness($event){
   if ($event.value == 2){
      this.is_readOnly =true;
   
     }else{
      this.is_readOnly =false;
     }
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
    onMedicalHistoryPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddMedicalHistoryDetails, 'Add Medical History');
  }
    funcAddMedicalHistoryDetails() {
    this.medicalHistoryWinVisible = true;
    this.medicalHistoryDetailsFrm.reset();

  }


  onDrugHistoryPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddDrugHistoryDetails, 'Add Drug History');
  }

    funcAddDrugHistoryDetails() {
    this.isDrugHistoryWin = true;
    this.drugHistorydetailsfrm.reset();

  }
  onReactionPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddDrugReactionDetails, 'Add Reaction');
  }

    funcAddDrugReactionDetails() {
    this.isReactionDrugWin = true;
    this.drugReactiondetailsfrm.reset();

  }

  onDrugsPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddDrugDetails, 'Add Drug');
  }

    funcAddDrugDetails() {
    this.isDrugInformationWin = true;
    this.isdrugInformationdetailsfrm.reset();

  }

  onTestPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddTestProcedureDetails, 'Add Test Procedure');
  }

    funcAddTestProcedureDetails() {
    this.isTestProcedureWin = true;
    this.testProcedurefrm.reset();

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
  
  

   funcEditConcomittantDrugsDetails(data) {
    this.concomimitantDrugsDetailsFrm.patchValue(data.data);
    this.concomittantDrugsDetailsWinVisible = true;

  }
   funcEditRelevantHistoryDetails(data) {
    this.isrelevantsaehistoryfrm.patchValue(data.data);
    this.isRelevantHistoryWin = true;

  }

  funcDeleteClinicalConcomittantDetails(site_data) {
    //this.funcClinicalTrialDeletehelper(site_data, 'tra_clinicaltrial_concomittant', 'concomittant_drugs','Concomittant Drug Information');
  }

  funcDeleteClinicalrelevantDetails(site_data) {
    //this.funcClinicalTrialDeletehelper(site_data, 'tra_clinicaltrial_sae_relevanthistory', 'relevant_history', 'Relevant History Details');
  }
    onClinicalTrialDateChange($event) {
    
    if($event.value == 2){
        this.is_stopdate =true;
        this.concomimitantDrugsDetailsFrm.get('end_date').setValidators([Validators.required]);
        this.concomimitantDrugsDetailsFrm.get('end_date').updateValueAndValidity();

    }else{
      this.is_stopdate =false;
     this.concomimitantDrugsDetailsFrm.get('end_date').clearValidators();
      this.concomimitantDrugsDetailsFrm.get('end_date').updateValueAndValidity();
    }
    

  }

}

