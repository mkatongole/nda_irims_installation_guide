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
  selector: 'app-clinicaltrial-sae-report',
  templateUrl: './clinicaltrial-sae-report.component.html',
  styleUrls: ['./clinicaltrial-sae-report.component.css']
})
export class ClinicaltrialSaeReportComponent implements OnInit {
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
  clinicalTrialControl: FormControl;
  confirmationData:any;
  registeredProductsData:any ={};
  isRegisteredProductsWinshow:boolean=false;
  isLaboratoryTestWin:boolean = false;
  isInvestigationalWin:boolean = false;
  laboratorytestdetailsfrm:FormGroup;
  investigationsdetailsfrm:FormGroup;
  isReadOnlyProduct:boolean=false;
  is_stopdate:boolean=false;
  reportCategoryData:any;
  reportTypeData:any;
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
  isManufacturerSitePopupVisible:boolean= false;

  isnewmanufacturerModalShow:boolean= false;
  manufacturerFrm:FormGroup;
  product_resp:any;
  isproductManufacturerModalShow:boolean= false;
  devicesTypeData:any;

    
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public appProdService:ProductApplicationService) {

      this.laboratorytestdetailsfrm = new FormGroup({
      laboratory_test: new FormControl('', Validators.compose([Validators.required])),
      results: new FormControl('', Validators.compose([Validators.required])),
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
    this.onLoadClassifications();
    this.onLoadgmdnCategoryData();
    this.onLoadsaelaboratoryTestData();
    this.onLoadsaeInvestigationData();
    this.onLoadconfirmationDataData();
    this.onLoaddosageForms();
    this.onLoadrouteOfAdminData();

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

    onSaeLaboratoryPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSaeLabTestDetails, 'Laboratory Test Details');
  }

    funcAddSaeLabTestDetails() {
    this.isLaboratoryTestWin = true;
    this.laboratorytestdetailsfrm.reset();

  }

    onSaeInvestigationsPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSaeInvestigationsDetails, 'Investigations Details');
  }

    funcAddSaeInvestigationsDetails() {
    this.isInvestigationalWin = true;
    this.investigationsdetailsfrm.reset();

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


  onLoadsaelaboratoryTestData() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'tra_clinicaltrial_sae_labtest', application_id: this.application_id }, 'getClinicaltrailSeaLabTest')
    .subscribe(
      data => {
        if (data.success) {
          this.saelaboratoryData = data.data;
        } else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        console.error('Error loading sae laboratory data:', error);
      }
    );
  }


   funcEditLaboratoryTestDetails(data) {
    this.laboratorytestdetailsfrm.patchValue(data.data);
    this.isLaboratoryTestWin = true;

  }
    funcEditInvestigationsDetails(data) {
    this.investigationsdetailsfrm.patchValue(data.data);
    this.isInvestigationalWin = true;

  }

  funcDeleteClinicalLabTestDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'tra_clinicaltrial_sae_labtest', 'laboratory_test', 'Laboratory Test Details');
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
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }

 
  onsaveSaeLaboratoryDetails() {
    this.spinner.show();
    let table_name;
    table_name = 'tra_clinicaltrial_sae_labtest';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.laboratorytestdetailsfrm.value, 'saveClinicalSaeLabTetsDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isLaboratoryTestWin = false;
            //reload
            this.onLoadsaelaboratoryTestData();

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



}
