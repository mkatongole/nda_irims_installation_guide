
import { Component, OnInit, OnDestroy,   Input } from '@angular/core';

import {  FormGroup,Validators} from '@angular/forms';

import { DxDataGridComponent } from 'devextreme-angular';

import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';

import { SharedControldrugsPermitlicenseComponent } from '../../shared-controldrugs-permitlicense/shared-controldrugs-permitlicense.component';

@Component({
  selector: 'app-controlleddrugslicense-prodsdetails',
  templateUrl: './controlleddrugslicense-prodsdetails.component.html',
  styleUrls: ['./controlleddrugslicense-prodsdetails.component.css']
})
export class ControlleddrugslicenseProdsdetailsComponent extends SharedControldrugsPermitlicenseComponent  implements OnInit {
  requireUnitPackData:boolean=false;
  readOnly_drugcontent:boolean=true;
  trader_id:number;
  mistrader_id:number;
  quantity:number;
  strength_asgrams:number;
  drugs_content:number;
  quantity_per_volume:number;
  @Input() controlledDrugsTypesData:any;
  @Input() controlDrugsSubstanceData:any;
  @Input() controlledDrugsBaseSaltData:any;
  @Input() gramsBaseSiUnitData:any;
  @Input() drugsPackagingTypeData:any;
  isregistered_product:boolean=false;
  dataGrid: DxDataGridComponent;
  @Input() permitProductsData: any;
  permitsDrugsProductsDetails:any;
  @Input() isPermitproductsPopupVisible: boolean;
  @Input() registeredProductsData: any;
  @Input() isPermitproductsAddPopupVisible: boolean;
  @Input() confirmDataParam: any;
  @Input() premisesOtherDetailsRows: any;
  @Input() is_regulatedproducts: boolean;
  @Input() productCategoryData: any;
  @Input() importexport_permittype_id: any;
  dosageFormsData:any;
   @Input() deviceTypeData: any;
   @Input() packagingUnitsData: any;
   @Input() product_category_id: number;
   @Input() siUnitsData: any;
   @Input() weightsUnitData: any;
   @Input() currencyData: any;
   @Input() permitProductsFrm: FormGroup;
   @Input() productGeneraldetailsfrm: FormGroup;
   @Input() classificationData: any;
   @Input() commonNamesData: any;
   @Input() application_code: number;
   @Input() enabled_newproductadd: boolean;
   @Input() sectionsData: any;
   @Input() sub_module_id: number;
   @Input() tracking_no: number;
   @Input() business_type_id:number;
   @Input() licence_type_id:number;
   @Input() importation_reason_id: number;
   @Input() classcategoryData: any;
   @Input() is_registered:number;
   @Input() controlleddrugs_basesalt_id:number;
   @Input() module_id: number;
   @Input() section_id: number;
   @Input() proforma_currency_id: number;
   @Input() countries: any;
  UnitsData:any;
  specificationData:any;
  quantityUnitsData:any;
  verificationData:any;
     quantityData:any;
     productImportedData:any;
  hsCodeData:any;
    devicesTypeData:any;
    product_origin_id: number;
    product_id: number;
   ismedicinesproductdetails:boolean;
   prodClassCategoriesData:any;
  unRegisteredpackSizeData:any;
   @Input() siUnitsTypeData:any;
   UnRegisteredProductsData: any={};
   manufacturersData: any ={};
   gmdnCodeData:any={};
    subscriptions: any[] = [];
   manSiteRegisteredProductsData: any={};
   isRegisteredproductsPopupVisible:boolean = false;
  isUnRegisteredProductsDetails:boolean = false;
  is_container_type_vial:boolean = false;
    is_surgicalReadOnly:boolean = false;
  gmdnCodeWinshow:boolean = false;
  is_not_surgicalReadOnly:boolean = false;
  isManufacturerSitePopupVisible:boolean = false;
ingredientsData:any;
  isManufacturingSiteProductsDetails:boolean = false;
    private updatingForm: boolean = false;
  has_quantity:number;
   isnewproductAddWinVisible:boolean;
   loading:boolean;
   permitProductMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Preview/Edit Record", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete Record", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  consignee_sendertitle:string;

  issenderreceiverSearchWinVisible: boolean;
  issenderreceiverAddWinVisible:boolean;
  app_resp:any;
  product_resp:any;
  packSizeData:any;
  
  ngOnInit(){
    this.onLoaddosageFormsData();

    if(this.sub_module_id == 60){
      this.permitProductsFrm.get('pack_price').valueChanges.subscribe(() => {
        this.updateTotalUnits();
      });

      this.permitProductsFrm.get('no_of_packs').valueChanges.subscribe(() => {
        this.updateTotalUnits();
      });  

      this.permitProductsFrm.get('no_of_units').valueChanges.subscribe(() => {
        this.updateTotalUnits();
      });   

    }
    if(this.section_id == 2){
      this.requireUnitPackData = true;
    }
    else{
      this.requireUnitPackData = false;
    }
    let user = this.authService.getUserDetails();
 
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
   
    this.onLoadPermitProductsData();
    this.onLoadcontrolledDrugsBaseSaltData();
     this.onLoadGmdnCodeData();
   // this.updateFormValidators();
    this.onLoadingredientsData();
    this.onLoadUnitsData();
    this.onLoadspecificationData();
    this.onLoadquantityPackagingData();
    this.onLoadHSCodeData();
    this.onLoaddevicesTypeData();
    this.onLoadImportRawMaterialData();


    if(this.is_registered == 1){
        this.permitProductsFrm.get('product_registration_no').setValidators([Validators.required]);
        this.permitProductsFrm.get('product_registration_no').updateValueAndValidity();
    }
    else{

        this.permitProductsFrm.get('product_registration_no').clearValidators();
        this.permitProductsFrm.get('product_registration_no').updateValueAndValidity();
    }


  }



  updateTotalUnits() {
      const pack_price = this.permitProductsFrm.get('pack_price').value || 0;
      const primary = this.permitProductsFrm.get('no_of_packs').value || 0;
      const units = this.permitProductsFrm.get('no_of_units').value || 0;

      // Calculate values
      const unitPrice = (pack_price === 1) ? 1 : ((pack_price !== 0 && units !== 0) ? (pack_price / units).toFixed(2) : 0);
      const totalUnits = primary * units;
      const totalValue = pack_price * primary;
      const VCQuantity = pack_price * primary;

      // Update form controls without emitting events
      this.permitProductsFrm.get('unit_price').setValue(unitPrice, { emitEvent: false });
      this.permitProductsFrm.get('total_value').setValue(totalValue, { emitEvent: false });
      //this.permitProductsFrm.get('vc_quantity').setValue(VCQuantity, { emitEvent: false });
      this.permitProductsFrm.get('total_units').setValue(totalUnits, { emitEvent: false });
      this.permitProductsFrm.get('quantity').setValue(totalUnits, { emitEvent: false });
  }


  onLoadPermitPackSizeData(product_id) {
    this.appService.getPermitsOtherDetails({ 'product_id': this.product_id }, 'getproductPackagingDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.packSizeData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }

  onLoaddosageFormsData() {
    var data = {
      table_name: 'par_dosage_forms'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.dosageFormsData = data;
        });

  }
  funcPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    this.isPermitproductsPopupVisible = true;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height/100;
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  permitProductsActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcPermitsProductPreviewedit(data.data);
    }
    else if (action_btn.action == 'delete_record') {
      this.funcDeletePermitsProducts(data.data);
    }
  }
  onPermitsProductsTabCLick(e: any){
  //this.funcSelectApprovedProductDetails(ta)

  console.log(e.itemIndex);

}
  
funcSearchManufacturingSite() {

  this.isManufacturerSitePopupVisible = true;
  var me = this;
 

this.manufacturersData.store = new CustomStore({
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
onLoaddevicesTypeData() {
    //
    var data = {
      table_name: 'par_device_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.devicesTypeData = data;
        });
  }
onLoadPermitUnregisteredPackSizeData(product_id) {
    this.appService.getPermitsOtherDetails({ 'product_id': this.product_id }, 'getproductUnRegisteredPackagingDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.unRegisteredpackSizeData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
funcSelectManufacturer(data) {
  let data_resp = data.data;
  this.permitProductsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id,country_oforigin_id:data_resp.country_id});
   
  this.isManufacturerSitePopupVisible = false;

}
  funcDeletePermitsProducts(app_data) {

    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want deleted the selected Permit Product with ' + app_data.brand_name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onDeletePermitProductsDetails(record_id, 'wb_permits_products', this.application_code, 'Permit products Details')
            .subscribe(
              response => {
                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
                  this.onLoadPermitProductsData();
                  this.toastr.success(response_data.message, 'Response');
                }
                else {
                  this.toastr.success(response_data.message, 'Response');
                }
              },
              error => {
                this.loading = false;
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
    onLoadHSCodeData() {
    var data = {
      table_name: 'par_hs_code'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.hsCodeData = data;
        });
  }

  onLoadspecificationData() {
    var data = {
      table_name: 'par_specification_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.specificationData = data;
        });
  }

  // onLoadVerificationData(business_type_id , licence_type_id, importation_reason_id, product_category_id, is_registered, country_oforigin_id) {
  //   this.configService.onLoadVerificationDataDetails(business_type_id, licence_type_id, importation_reason_id, product_category_id, is_registered, country_oforigin_id)
  //     //.pipe(first())
  //     .subscribe(
  //       data => {
  //         this.verificationData = data.data;
  //       },
  //       error => {
  //         return false;
  //       });
  // }
    onLoadquantityPackagingData() {
    var data = {
      table_name: 'si_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.quantityData = data;
        });

  }

    onCountriesSelectionChange($event){
    this.product_origin_id = $event.selectedItem.id;
    //this.onLoadVerificationData(this.business_type_id , this.licence_type_id, this.importation_reason_id, this.product_category_id, this.is_registered, this.product_origin_id)
   
    
  }
  onLoadUnitsData() {
    var data = {
      table_name: 'par_si_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.UnitsData = data;
        });

  }
  onSearchGmdnCodeData() {
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

    onLoadGmdnCodeData() {
        //this.gmdnCodeWinshow = true;

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
  onLoadingredientsData() {
    var data = {
      table_name: 'par_ingredients_details',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          //this.commonNamesData = data;
          this.ingredientsData = new DataSource({
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
  onLoadPermitProductsData() {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code }, 'getControlledDrugsLicensesProdDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitsDrugsProductsDetails = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
  onRegisteredProductGridToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add New Products',
        type: 'default',
        icon: 'fa fa-plus',
        visible: this.enabled_newproductadd,
        onClick: this.funAddNewPermitProducts.bind(this)
      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshProductsDataGrid.bind(this)
        }
      });

  }
  refreshProductsDataGrid() {
    this.onLoadPermitProductsData();
  }
  funAddNewPermitProducts(){
    this.isnewproductAddWinVisible = true;
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
          onClick: this.refreshProductsDataGrid.bind(this)
        }
      });
  }

   funcSelectgmdn(data) {
      let resp_data = data.data;
      this.permitProductsFrm.get('gmdn_id').setValue(resp_data.id);
      this.permitProductsFrm.get('gmdn_term').setValue(resp_data.name);
      this.permitProductsFrm.get('gmdn_code').setValue(resp_data.code);
      this.permitProductsFrm.get('gmdn_descriptor').setValue(resp_data.description);
      this.gmdnCodeWinshow = false;

  }
  onSearchRegisteredProductApplication(){

      // let man_site_id = this.gmpapplicationGeneraldetailsfrm.get('man_site_id').value;
    //the loading
    
      this.isRegisteredproductsPopupVisible = true;
      let me = this;
      this.manSiteRegisteredProductsData.store = new CustomStore({
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
              params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter} //,man_site_id:man_site_id ,section_id:me.section_id
            };
            return me.httpClient.get(AppSettings.base_url + 'importexportapp/getManufacturingSiteRegisteredProductsData',this.configData)
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

onSelectcountryOrigin($event) {
  let packSize_details =$event.selectedItem.id;
    if(packSize_details == 37){
    this.permitProductsFrm.get('product_origin_id').setValue(2);

    }else{
        this.permitProductsFrm.get('product_origin_id').setValue(1);
    }

}
funcSelectProductDetails(data) {
  let productdata = data.data;
  const product_id = productdata.product_id;
  this.product_id = product_id;
  this.onLoadPermitPackSizeData(this.product_id);

  // Set other form controls
  this.permitProductsFrm.get('product_registration_no').setValue(productdata.product_registration_no);
  this.permitProductsFrm.get('common_name_id').setValue(productdata.atc_code_id);
  this.permitProductsFrm.get('product_origin_id').setValue(productdata.product_origin_id);
  
  // Handle manufacturing_country_id with potential multiple values
  if (productdata.manufacturing_country_id) {
    let countryIds;
    if (Array.isArray(productdata.manufacturing_country_id)) {
      countryIds = productdata.manufacturing_country_id;
    } else if (typeof productdata.manufacturing_country_id === 'string') {
      countryIds = productdata.manufacturing_country_id.split(',').map(id => parseInt(id.trim(), 10));
    } else {
      countryIds = [productdata.manufacturing_country_id];
    }
    this.permitProductsFrm.get('manufacturing_country_id').setValue(countryIds);
  }

  this.permitProductsFrm.get('brand_name').setValue(productdata.brand_name);
  this.permitProductsFrm.get('specification_type_id').setValue(productdata.specification_type_id);
  this.permitProductsFrm.get('ingredient_id').setValue(productdata.ingredient_id);
  this.permitProductsFrm.get('dosage_form_id').setValue(productdata.dosage_form_id);
  this.permitProductsFrm.get('product_strength').setValue(productdata.product_strength);
  this.permitProductsFrm.get('manufacturer_name').setValue(productdata.manufacturing_site);
  this.permitProductsFrm.get('manufacturer_id').setValue(productdata.manufacturer_id);
  this.permitProductsFrm.get('si_unit_id').setValue(productdata.si_unit_id);
  this.permitProductsFrm.get('gmdn_code').setValue(productdata.gmdn_code);
  this.permitProductsFrm.get('gmdn_term').setValue(productdata.gmdn_term);
  this.permitProductsFrm.get('gmdn_descriptor').setValue(productdata.gmdn_descriptor);
  this.permitProductsFrm.get('medical_device_class_type').setValue(productdata.medical_device_class_type);
  this.isRegisteredproductsPopupVisible = false;
  this.toastr.success('Product Selection', 'The following product has been selected: ' + productdata.brand_name);

}

  funcSelectUnRegisteredProductDetails(data){
    let productdata = data.data;
    const product_id = productdata.product_id;
    this.product_id =product_id;
    this.permitProductsFrm.get('product_registration_no').setValue(productdata.product_registration_no);
    this.permitProductsFrm.get('common_name_id').setValue(productdata.common_name_id);
    this.permitProductsFrm.get('pack_size').setValue(productdata.pack_size);
    this.permitProductsFrm.get('no_of_units').setValue(productdata.no_of_units);
    this.permitProductsFrm.get('product_origin_id').setValue(productdata.product_origin_id);

   if (productdata.manufacturing_country_id) {
      let countryIds;
      if (Array.isArray(productdata.manufacturing_country_id)) {
        countryIds = productdata.manufacturing_country_id;
      } else if (typeof productdata.manufacturing_country_id === 'string') {
        countryIds = productdata.manufacturing_country_id.split(',').map(id => parseInt(id.trim(), 10));
      } else {
        countryIds = [productdata.manufacturing_country_id];
      }
      this.permitProductsFrm.get('manufacturing_country_id').setValue(countryIds);
    }
    this.permitProductsFrm.get('brand_name').setValue(productdata.proprietary_name);
    this.permitProductsFrm.get('specification_type_id').setValue(productdata.specification_type_id);
    this.permitProductsFrm.get('ingredient_id').setValue(productdata.ingredient_id);
    this.permitProductsFrm.get('dosage_form_id').setValue(productdata.dosage_form_id);
    this.permitProductsFrm.get('product_strength').setValue(productdata.product_strength);
    this.permitProductsFrm.get('manufacturer_name').setValue(productdata.manufacturer_name);
    this.permitProductsFrm.get('manufacturer_id').setValue(productdata.manufacturer_id);
    this.permitProductsFrm.get('si_unit_id').setValue(productdata.si_unit_id);
    this.permitProductsFrm.get('container_type_id').setValue(productdata.container_type_id);
    this.permitProductsFrm.get('gmdn_code').setValue(productdata.gmdn_code);
    this.permitProductsFrm.get('gmdn_term').setValue(productdata.gmdn_term);
    this.permitProductsFrm.get('gmdn_descriptor').setValue(productdata.gmdn_descriptor);
    this.permitProductsFrm.get('medical_device_class_type').setValue(productdata.medical_device_class_type);
    this.isUnRegisteredProductsDetails = false;

  }


onPackSizeCboSelect($event) {
  let packSize_details =$event.selectedItem;
  this.permitProductsFrm.get('no_of_units').setValue(packSize_details.no_of_units_packs);
  this.permitProductsFrm.get('units_for_quantity').setValue(packSize_details.si_unit_id);
  this.onLoadQuantityUnitsData();

}

  onLoadQuantityUnitsData() {
    var data = {
      table_name: 'si_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.quantityUnitsData = data;
        });

  }
  onsavePermitProductdetails() {
    const invalid = [];
    const controls = this.permitProductsFrm.controls;
    
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
   
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no, 'saveControlDrugsLicensedetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();
          if (this.app_resp.success) {
            this.permitProductsFrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.isPermitproductsPopupVisible = false;
            this.onLoadPermitProductsData();
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }

   onContainerTypeDetails($event) {
      this.has_quantity = $event.selectedItem.has_quantity;
      if (this.has_quantity == 1) {
          this.is_container_type_vial = true;
          this.permitProductsFrm.get('quantity_per_volume').setValidators(Validators.required);
          this.permitProductsFrm.get('quantity_per_volume').updateValueAndValidity();
          this.permitProductsFrm.get('unit_id').setValidators(Validators.required);
          this.permitProductsFrm.get('unit_id').updateValueAndValidity();
           this.baseStrengthCalculation();
      } else {
          this.is_container_type_vial = false;
          this.permitProductsFrm.get('quantity_per_volume').clearValidators();
          this.permitProductsFrm.get('quantity_per_volume').updateValueAndValidity();
          this.permitProductsFrm.get('unit_id').clearValidators();
          this.permitProductsFrm.get('unit_id').updateValueAndValidity();
          this.permitProductsFrm.get('quantity_per_volume').setValue('');
          this. baseStrengthCalculation();

      }


}

  onupdatePermitProductdetails() {
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no,'saveControlDrugsLicensedetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {

            this.onLoadPermitProductsData();
            this.toastr.success(this.app_resp.message, 'Response');
            this.isPermitproductsAddPopupVisible = false;

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onPermitProductGridToolbar(e) {

    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Controll Drugs Particulars',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funAddPermitProducts.bind(this)
      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshProductsDataGrid.bind(this)
        }
      });
          this.onLoadclasscategoryData(this.product_category_id);

  }


  funAddPermitProducts() {
    this.isPermitproductsPopupVisible = true;
    this.permitProductsFrm.reset();
    
  }
  onSearchUnRegisteredRegisteredProductApplication(){
  this.isUnRegisteredProductsDetails = true;
  var me = this;
 
this.UnRegisteredProductsData.store = new CustomStore({
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
      return me.httpClient.get(AppSettings.base_url + 'importexportapp/getUnRegisteredProductsDetails',this.configData)
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
  funcChangeisRegisteredDrug($event) {
    if($event.value ==1){
      this.isregistered_product = true;
    }
    else{
      this.isregistered_product = false;
    }
  }
  onLoadcontrolDrugsSubstanceData(controlleddrugs_basesalt_id) {
    var data = {
      table_name: 'par_controlled_drugssubstances',
      controlleddrugs_basesalt_id:controlleddrugs_basesalt_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.controlDrugsSubstanceData = data;
        });
  }

    onLoadcontrolledDrugsTypesData(controlleddrugs_basesalt_id) {
    var data = {
      table_name: 'par_controlleddrugs_types',
      controlleddrugs_basesalt_id:controlleddrugs_basesalt_id

    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.controlledDrugsTypesData = data;
        });
  }
  onLoadcontrolledDrugsBaseSaltData() {
    var data = {
      table_name: 'par_controlleddrugs_basesalts',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.controlledDrugsBaseSaltData = data;
        });
  }

  onLoadImportRawMaterialData() {
    var data = {
      table_name: 'par_importrawmaterial_id',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productImportedData = data;
        });
  }


  funcChangeControlDrugType($event) {
    this.funcDrugsContentsCalculations();
  }
  funcChangecontrolledDrugsBaseSaltData($event){
    let controlleddrugs_basesalt  =$event.selectedItem;
    this.controlleddrugs_basesalt_id = controlleddrugs_basesalt.id;
    this.permitProductsFrm.get('substance_schedule').setValue(controlleddrugs_basesalt.substance_schedule);
    this.permitProductsFrm.get('drugs_content').setValue(controlleddrugs_basesalt.drugs_content);
    //this.funcDrugsContentsCalculations();
    this.onLoadcontrolDrugsSubstanceData( this.controlleddrugs_basesalt_id);
    this.onLoadcontrolledDrugsTypesData( this.controlleddrugs_basesalt_id);
  }
  funcChangeProductStrength($event){
    this.permitProductsFrm.get('strength_asgrams').setValue('');
  }
  funcChangeProductStrengthUnits($event){
    let strengthsunits =$event.selectedItem;
    console.log(strengthsunits);
    let conversion_unit = strengthsunits.conversion_unit
    let product_strength = this.permitProductsFrm.get('strength').value
    let pack_unit = this.permitProductsFrm.get('pack_unit').value
    this.permitProductsFrm.get('conversion_unit').setValue(conversion_unit);
    this.calculateProductStrengthinGrams();
  }
  calculateProductStrengthinGrams(){
    let product_strength = this.permitProductsFrm.get('strength').value
    let pack_unit = this.permitProductsFrm.get('pack_unit').value
    let conversion_unit = this.permitProductsFrm.get('conversion_unit').value

    if(product_strength >0){
      this.permitProductsFrm.get('strength_asgrams').setValue(product_strength/conversion_unit*1);
      this.baseStrengthCalculation();
    }else{
      this.permitProductsFrm.get('strength_asgrams').setValue("");
      this.permitProductsFrm.get('strength').setValue("");
      this.permitProductsFrm.get('conversion_unit').setValue("");
     // this.toastr.error('Enter the Product Strength, and proceed.','Alert');
    }

  }
  baseStrengthCalculation(){
   this.quantity = this.permitProductsFrm.get('quantity').value;
   this.quantity_per_volume =this.permitProductsFrm.get('quantity_per_volume').value;
   this.strength_asgrams =this.permitProductsFrm.get('strength_asgrams').value;
   this.drugs_content =this.permitProductsFrm.get('drugs_content').value;
    let controlleddrug_base;
   if(this.quantity_per_volume>0){
    controlleddrug_base =this.quantity*this.strength_asgrams*this.drugs_content*this.quantity_per_volume;

   }else{
      controlleddrug_base =this.quantity*this.strength_asgrams*this.drugs_content;

   }

    this.permitProductsFrm.get('controlleddrug_base').setValue(controlleddrug_base);

  }
  onHsCodeCboSelect($event) {
  let hs_code_details =$event.selectedItem;
  this.permitProductsFrm.get('hs_code_description').setValue(hs_code_details.description);
  }

  funcChangecontrolDrugsSubstance($event){
    this.funcDrugsContentsCalculations();
  }
  funcDrugsContentsCalculations(){
    let controlleddrugs_type_id =   this.permitProductsFrm.get('controlleddrugs_type_id').value;
    let controlled_drugssubstances_id =   this.permitProductsFrm.get('controlled_drugssubstances_id').value;
    let controlleddrugs_basesalt_id =   this.permitProductsFrm.get('controlleddrugs_basesalt_id').value;
    if(controlleddrugs_type_id >0 && controlled_drugssubstances_id >0 && controlleddrugs_basesalt_id >0){
      var data = {
        table_name: 'par_controlleddrugsconv_factorsconfig',
        controlleddrugs_type_id:controlleddrugs_type_id,
        controlled_drugssubstances_id:controlled_drugssubstances_id,
        controlleddrugs_basesalt_id:controlleddrugs_basesalt_id
      };
      this.config.onLoadConfigurationData(data)
        .subscribe(
          data => {
            if(data.appr_pureanhydrousdrug_contents){
              this.permitProductsFrm.get('drugs_content').setValue(data.appr_pureanhydrousdrug_contents);
              this.readOnly_drugcontent =true;
              this.toastr.success('The Drugs Contents(%) has been configured for the selected Drugs ', 'Response');
            }
            else{
              this.toastr.error('The Drugs Contents(%) has not been configured for the selected product, enter Drugs Contents(%) ', 'Alert');
              this.permitProductsFrm.get('drugs_content').setValue('');
              this.readOnly_drugcontent =false;
            }
            
            
          });
     

    }
    
  }
  funcSelectRegisteredProduct(data) {
        
    this.permitProductsFrm.get('product_registration_no').setValue(data.data.certificate_no);
    this.permitProductsFrm.get('brand_name').setValue(data.data.brand_name);
    this.isManufacturingSiteProductsDetails = false;
    this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);

}
}
