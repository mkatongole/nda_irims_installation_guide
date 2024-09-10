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
  selector: 'app-clinical-impproducts',
  templateUrl: './clinical-impproducts.component.html',
  styleUrls: ['./clinical-impproducts.component.css']
})
export class ClinicalImpproductsComponent implements OnInit {
  @Input() iMPProductDetailsFrm: FormGroup;
  @Input() application_id: any;
  @Input() countries: any;
  @Input() clinicalProductCategoryData: any;
  @Input() clinicaltrailComparatorPProdData: any;
  @Input() commonNameData: any;
  @Input() dosagFormData: any;
  @Input() routeOfAdminData: any;
  @Input() siUnitsData: any;
  @Input() marketlocationData: any;
   clinicalTrialControl: FormControl;

  @Input() manufacturersData: any ={};
  addProductParamsdetailsfrm:FormGroup;
  iMPHandlingProductDetailsFrm:FormGroup;
  addproductCommonNameModal:boolean;
  clinicaltrailPlaceboProdData:any;
  @Input() clinicaltrailHandlingProdData:any;
  isClinicalSitesDetailsVisible:boolean=false;
  isReadOnlyProduct:boolean=false;
  gmdnCodeWinshow:boolean=false;
  district_id:number;
  country_id:number;
  gmdnCodeData: any ={};                
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
  isRegisteredProductsWinshow:boolean=false;
  
  registeredProductsData:any ={};
  manufacturersSiteData:any ={};
  clinicaltrailIMPProdData:any;
  isRegisteredProductSearchWinVisible:boolean=false;
  isPreviewApplicationsDetails:boolean=false;
  classificationData:any;
  section_id:number;
  sectionsData:any;
  gmdnCategoryData:any;
  isManufacturerSitePopupVisible:boolean= false;

  isnewmanufacturerModalShow:boolean= false;
  manufacturerFrm:FormGroup;
  product_resp:any;
  isproductManufacturerModalShow:boolean= false;
  devicesTypeData:any;
  investigationproductSectionData:any;
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public appProdService:ProductApplicationService) {
    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required]))

    });
    this.addProductParamsdetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      section_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });
  
      this.clinicalTrialControl = new FormControl('', Validators.compose([]));

    this.iMPProductDetailsFrm = new FormGroup({
      product_category_id: new FormControl('', Validators.compose([Validators.required])),
      brand_name: this.clinicalTrialControl,
      common_name_id: new FormControl('', Validators.compose([Validators.required])),
      dosage_form_id: new FormControl('', Validators.compose([Validators.required])),
      routes_of_admin_id: new FormControl('', Validators.compose([Validators.required])),
      si_unit_id: new FormControl('', Validators.compose([Validators.required])),
      identification_mark: new FormControl('', Validators.compose([Validators.required])),
      registration_no: new FormControl('', Validators.compose([])),
      registration_date: new FormControl('', Validators.compose([])),
      market_location_id: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_id: new FormControl('', Validators.compose([])),
      product_desc: new FormControl('', Validators.compose([Validators.required])),
      registered_product_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      product_strength: new FormControl('', Validators.compose([Validators.required])),
      gmdn_code: new FormControl('', Validators.compose([])),
      classification_id: new FormControl('', Validators.compose([])),
      gmdn_term: new FormControl('', Validators.compose([])),
      gmdn_category: new FormControl('', Validators.compose([])),
      abate_after_stopping: new FormControl('', Validators.compose([])),
      reaction_reappear: new FormControl('', Validators.compose([])),
      therapy_start_date: new FormControl('', Validators.compose([])),
      therapy_end_date: new FormControl('', Validators.compose([])),
      therapy_duration: new FormControl('', Validators.compose([])),
      duration: new FormControl('', Validators.compose([])),
      manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
      investigationproduct_section_id: new FormControl('', Validators.compose([Validators.required]))
      
    });
    this.onLoadSections();
    this.onLoadconfirmDataParm();
    this.onLoadinvestigationproductSectionData();
    this.onLoadclinicaltrailIMPProdData();
      this.onLoadClassifications();

     
  }
  ngOnInit() {
   

  }
   funcEditIMPDetails(data) {
    this.section_id = data.data.section_id;
    this.iMPProductDetailsFrm.patchValue(data.data);
    //load the personnel qualifiations
    this.IMPProductDetailsWinVisible = true;

  }
    funcEditIMPHandlingDetails(data) {
    this.section_id = data.data.section_id;
    this.iMPHandlingProductDetailsFrm.patchValue(data.data);
    this.IMPHandlingProductDetailsWinVisible = true;

  }
  onProductSectionChange($event){
    if($event.value == 5 ){
      this.section_id = 2;
    }
    else{
      this.section_id = 1;
    }
      
      this.onLoadgmdnCategoryData(this.section_id);
      this.onLoaddevicesTypeData(this.section_id)
  }funcSelectManufacturer(data) {
    let data_resp = data.data;
    this.iMPProductDetailsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id});
     
    this.isManufacturerSitePopupVisible = false;

  } onManufacturerPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadDistricts(this.country_id);
    this.onLoadRegions(this.country_id);

  }

  oDistrictsCboSelect($event) {
    this.district_id = $event.selectedItem.id;
    this.onLoadRegions(this.district_id);

  }

  onLoadRegions(district_id) {
  this.config.onLoadRegionsData(district_id)
    .subscribe(
      data => {
        if (data.success) {
          this.regions = data.data;
        } else {
        }
      },
      error => {
        console.error('HTTP request failed:', error);
        return false;
      });
}
  onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
        });
  }
  onRegionsCboSelect($event) {

    this.onLoadDistricts($event.selectedItem.id);

  }
  onLoadDistricts(country_id) {
    var data = {
      table_name: 'par_premise_districts',
      country_id: country_id
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
  onLoadinvestigationproductSectionData() {
    var data = {
      table_name: 'par_investigationproduct_sections',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.investigationproductSectionData = data;
        });
  }  
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
  onLoadgmdnCategoryData(section_id) {
    var data = {
      table_name: 'par_gmdn_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.gmdnCategoryData = data;
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
  funcDeleteIMPDetails(site_data,table_name) {
    this.funcClinicalTrialDeletehelper(site_data, table_name, 'imp_products', 'Clinical Trial Products');
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
                  
                  this.funcOnReloadIMPProducts();
                  
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
                  
                  this.funcOnReloadIMPProducts();
                  
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
  onComparatorproductsPreparing(e) {
    this.functIMPDataGridToolbar(e, this.funcAddIMPProductsDetails, 'Comparator Products Details');
  }
  onPlaceboproductsPreparing(e) {
    this.functIMPDataGridToolbar(e, this.funcAddIMPProductsDetails, 'Placebo Products Details');
  }
  onIMPproductsPreparing(e) {
    this.functIMPDataGridToolbar(e, this.funcAddIMPProductsDetails, 'IMP Products Details');
  }

  onIMPhandlingproductsPreparing(e) {
    this.functIMPDataGridToolbar(e, this.funcAddIMPHandlingProductsDetails, 'IMP Handling Products Details');
  }
  functIMPDataGridToolbar(e, funcBtn, btn_title) {
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
        onClick: this.funcOnReloadIMPProducts.bind(this)
      }
    });
  }
  funcOnReloadIMPProducts(){

    this.onLoadclinicaltrailIMPProdData();
    this.onLoadclinicaltrailComparatorProdData();
    this.onLoadclinicaltrailPlaceboProdData();
    this.onLoadclinicaltrailHandlingProdData();

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
    });
  }
  funcAddIMPProductsDetails() {
    this.IMPProductDetailsWinVisible = true;
    this.iMPProductDetailsFrm.reset();
  }

    funcAddIMPHandlingProductsDetails() {
    this.IMPHandlingProductDetailsWinVisible = true;
    this.iMPHandlingProductDetailsFrm.reset();
    this.onLoadclinicaltrailIMPProdData();
  }
  funSelectRegisteredProdcustsApp(data){
    let productdata = data.data;
     
    this.iMPProductDetailsFrm.patchValue({brand_name:productdata.brand_name,manufacturer_name:productdata.manufacturer_name, common_name_id:productdata.common_name_id,product_id:data.tra_product_id,product_category_id:productdata.product_category_id,product_subcategory_id:productdata.product_subcategory_id,registration_no:productdata.certificate_no,registrant_name:productdata.applicant_name, dosage_form_id:productdata.dosage_form_id,routes_of_admin_id:productdata.routes_of_admin_id,product_strength:productdata.product_strength, product_desc: productdata.physical_description, registered_product_id:productdata.registered_product_id});
    this.isPreviewApplicationsDetails = false;
this.isRegisteredProductsWinshow = false;
  }
  prodApplicationActionColClick(data){
    let productdata = data.data;
    this.iMPProductDetailsFrm.patchValue({brand_name:productdata.brand_name, manufacturer_name:productdata.manufacturer_name,common_name_id:productdata.common_name_id,product_id:data.tra_product_id,product_category_id:productdata.product_category_id,product_subcategory_id:productdata.product_subcategory_id,registration_no:productdata.certificate_no,registrant_name:productdata.applicant_name, dosage_form_id:productdata.dosage_form_id,routes_of_admin_id:productdata.routes_of_admin_id,product_strength:productdata.product_strength, product_desc: productdata.physical_description, registered_product_id:productdata.registered_product_id});
    this.isRegisteredProductsWinshow = false;

  }
  
  onLoadclinicaltrailIMPProdData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_products', application_id: this.application_id }, 'getClinicaltrailIMPProdData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailIMPProdData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  
  onLoadclinicaltrailPlaceboProdData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_placebaproducts', application_id: this.application_id }, 'getClinicaltrailIMPProdData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailPlaceboProdData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
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
  
  onLoadclinicaltrailComparatorProdData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_comparatorproducts', application_id: this.application_id }, 'getClinicaltrailIMPProdData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailComparatorPProdData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
    onLoadclinicaltrailHandlingProdData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinicaltrial_Producthandling', application_id: this.application_id }, 'getClinicaltrailIMPHandlingProdData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailHandlingProdData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  
   funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onViewregisteredProduct() {
   
   
    this.appService.getClinicalTrialOtherdetails({ table_name: 'registered_products' }, 'getRegisteredProductsDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.registeredProductsData = data.data;
            this.isRegisteredProductSearchWinVisible = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
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

onAddManufacturerDetails() {
  this.spinner.show();
  let manufacturer_name = this.manufacturerFrm.get('name').value;
  this.appProdService.onAddManufacturingSite('tra_manufacturers_information',  this.manufacturerFrm.value)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.isnewmanufacturerModalShow = false;
          this.isproductManufacturerModalShow = false;
          let manufacturer_id =this.product_resp.record_id;
          //load Manufactureing Sites 
          this.iMPProductDetailsFrm.patchValue({manufacturer_name:manufacturer_name,manufacturer_id:manufacturer_id});
   
         this.isManufacturerSitePopupVisible = false;

          this.toastr.success(this.product_resp.message, 'Response');

        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
      });
} onLoaddevicesTypeData(section_id) {
  //
  var data = {
    table_name: 'par_device_types',
    section_id: section_id
  };
  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.devicesTypeData = data;
      });
}
onAddNewGenericDetails(){

  
  this.addproductCommonNameModal = true;
}
onSaveNewGenericDetails(){
  this.addProductParamsdetailsfrm.get('tablename').setValue('par_common_names')
  this.addProductParamsdetailsfrm.get('section_id').setValue(this.section_id);
  this.utilityService.onsaveApplicationUniformDetails('', this.addProductParamsdetailsfrm.value, 'onsaveProductConfigData')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadcommonNameData();
       
        this.addproductCommonNameModal = false;
        this.iMPProductDetailsFrm.get('common_name_id').setValue(this.product_resp.record_id);

        this.toastr.success(this.product_resp.message, 'Response');

      } else {
        this.toastr.error(this.product_resp.message, 'Alert');
      }
      this.spinner.hide();
    },
    error => {
      this.toastr.error('Error Occurred', 'Alert');
    });

}  
onLoadcommonNameData() {
  var data = {
    table_name: 'par_atc_codes',
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

  onLoadGmdnCodeData() {
        this.gmdnCodeWinshow = true;

        let me = this;
        this.gmdnCodeData.store = new CustomStore({
          load: function (loadOptions: any) {
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
              return me.httpClient.get(AppSettings.base_url + 'configurations/getGMDNDetails',this.configData)
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

 funcSelectgmdn(data) {
      let resp_data = data.data;
      this.iMPProductDetailsFrm.get('gmdn_id').setValue(resp_data.id);
      this.iMPProductDetailsFrm.get('gmdn_term').setValue(resp_data.name);
      this.iMPProductDetailsFrm.get('gmdn_code').setValue(resp_data.code);
      this.iMPProductDetailsFrm.get('gmdn_category').setValue(resp_data.description);
      this.gmdnCodeWinshow = false;

  }


}