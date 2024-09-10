import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, Inject, Input, EventEmitter, Output, ChangeDetectorRef  } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { DxDataGridComponent } from 'devextreme-angular';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/SharedImportexportclassComponent';

import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-permit-productsdetails',
  templateUrl: './permit-productsdetails.component.html',
  styleUrls: ['./permit-productsdetails.component.css']
})
export class PermitProductsdetailsComponent extends SharedImportexportclassComponent implements OnInit, OnDestroy  {
  requireUnitPackData:boolean=false;
  trader_id:number;
  mistrader_id:number;
  selected_id:number;
  dataGrid: DxDataGridComponent;printiframeUrl:any;
  @Input() permitProductsData: any;
  @Input() declarationpermitProductsData:any;
  @Input() permitdeclarationProductsData:any;
  @Input() declaredProductsData: any;
  @Input() isPermitproductsPopupVisible: boolean;
  @Input() isBatchPopupVisible: boolean ;
  isApprovedVisaproductsPopupVisible:boolean;
  @Input() registeredProductsData: any;
  @Input() permitDrugDetailsData: any;
  approvedVisaProducts:any={};
  @Input() isPermitproductsAddPopupVisible: boolean;
  @Input() isNarcoticproductsAddPopupVisible: boolean;
  @Input() isAddBatchPopupVisible: boolean; 
 isManufacturingSiteProductsDetails: boolean;
 isApprovedProductsDetails: boolean;
  @Input() confirmDataParam: any;
  @Input() premisesOtherDetailsRows: any;
  @Input() is_regulatedproducts: boolean;
  @Input() productCategoryData: any;
   @Input() deviceTypeData: any;
   @Input() verificationData: any;
   @Input() dosageFormData: any;
   @Input() packagingUnitsData: any;
   @Input() siUnitsData: any;
   @Input() weightsUnitData: any;
   @Input() currencyData: any;
   @Input() permitProductsFrm: FormGroup;
   @Input() narcoticProductsFrm: FormGroup;
   @Input() productGeneraldetailsfrm: FormGroup;
   @Input() classificationData: any;
   @Input() commonNamesData: any;
   @Input() application_code: number;
   @Input() declaration_application_code: number;
   @Input() product_category_id: number;
   @Input() common_name_id: number;
   @Input() port_id: number;
   @Input() importation_reason_id: number;
   @Input() enabled_newproductadd: boolean;
   @Input() sub_module_id: number;
   @Input() tracking_no: string;
   @Input() business_type_id:number;
   @Input() module_id: number;
   @Input() section_id: number;
   @Input() proforma_currency_id: number;
   @Input() countries: any;
   @Input() classcategoryData: any;
   manufacturersData: any ={};
   isManufacturerSitePopupVisible:boolean= false;
   manSiteRegisteredProductsData: any={};
   UnRegisteredProductsData: any={};
   approvedProductsData: any={};
   isproductManufacturerModalShow:boolean;
   isnewmanufacturerModalShow:boolean= false;
   addproductCommonNameModal:boolean;
   isRegisteredLevel:boolean;
  addProductParamsdetailsfrm:FormGroup;
  isRegisteredProductsWinshow:boolean = false;
  isgmdnCodeWinshow:boolean = false;
  isUnRegisteredProductsDetails:boolean = false;
  is_not_surgicalReadOnly:boolean = false;
  gmdnCodeWinshow:boolean=false;
  surgical_product_category:boolean=false;
  dugs_product_category:boolean=false;
  raw_materials_category:boolean=false;
  isPermitproductsDeclarationAddPopupVisible:boolean=false;
  registeredProductsDetails:any = {};
   isFoodPermitProducts:boolean;
   isnewproductAddWinVisible:boolean;
   loading:boolean;
   productImportedData:any;
   permitUnitsData:any;
   enabled_productadd:boolean;
   product_batch_no: number;
   isPermitVisaLicProductsAddPopupVisible:boolean;
   region:any;
   gmdnCodeData:any={};
  districts:any;
  doseData: any;
  hsCodeData:any;
  productTypeDta:any;
   ingredientsData: any;
   therapeuticGroupData: any;
   distributionCateoryData: any;
   routeOfAdministrationData:any;
   atcCodeData:any;
   packSizeData:any;
   quantityData:any;
   quantityUnitsData:any;
   unRegisteredpackSizeData:any;
  app_resp:any;
  permit_product_id:number;
  vc_product_id:number;
  product_id:number;
  product_origin_id: number;
  batch_product_id: number;
  regions:any;
  mis_url:string = AppSettings.mis_url;
  isInvoiceProductsUploadVisable:boolean;
  isUploadedInvoiceProductsWin:boolean;
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
  permitApprovedVisaProductMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Update Batch and Manufacturing Date(s)", action: 'edit_record', icon: 'fa fa-edit' },
        //{ text: "Delete Record", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  
  consignee_sendertitle:string;
  manufacturerFrm:FormGroup;
  issenderreceiverSearchWinVisible: boolean;
  issenderreceiverAddWinVisible:boolean;

  product_resp:any;
  is_visaapplication:boolean;
  commonNameData:any;
  controlledSubstanceData: any;
  filesToUpload: Array<File> = [];  
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  document_previewurl: any;
  specificationData: any;
  devicesTypeData:any;
  formattedProduct: string;
  safetyFactor: number = 1000;
   subscriptions: any[] = [];
  isReadOnlyProduct:boolean = false;
  isDocumentPreviewDownloadwin: boolean = false;
  is_brandreadonly:boolean = true;
  common_name_title: string = 'Common Name';
  productSubCategoryData: any;
  document_type_id:number=25;
  @Output() premitProductIdEvent = new EventEmitter();
    @Output() vcProductIdEvent = new EventEmitter();

  invoiceProductsUploadFrm:FormGroup;
  private isFetchingData = false;
  is_surgicalReadOnly:boolean = false;

  private destroy$ = new Subject<void>();
  private updatingForm: boolean = false;

 
  ngOnInit(){


    if(this.sub_module_id == 12){
     this.enableSubscriptions();
    }else if(this.sub_module_id == 115){
      this.productBatchdetailsfrm.get('batch_qty').valueChanges.subscribe(value => {
      this.onLoadBatchUnits(this.batch_product_id);
    });
    }else{
         // this.updateFormValidators();

    }
  

    this.onLoadImportReasons(this.business_type_id, this.licence_type_id);
   // this.onLoadVerificationData(this.business_type_id , this.licence_type_id, this.importation_reason_id, this.product_category_id, this.is_registered, this.country_oforigin_id);
    this.onLoadingredientsData();
    this.onLoadspecificationData();
    this.onLoadDeviceTypeData();
    this.onLoaddoseDataParm();
    this.onLoadclassificationDataDataParm();
    this.onLoadAtcCodeData();
    this.onLoadTherapeuticGroupData();
    this.onLoadDistributionCategoryData();
    this.onLoadRouteOfAdministrationData();
    this.onLoadControlledSubstanceData();
    this.onLoadproductTypeDta();
    this.onLoadHSCodeData();
    this.onLoadGmdnCodeData();
    this.onLoaddevicesTypeData();
    this.onLoadquantityPackagingData();
    this.onLoadImportRawMaterialData();
     this.onLoadQuantityUnitsData();
    this.invoiceProductsUploadFrm = this.formBuilder.group({
      file: null,
      description:null,
      currency_id:null
    });

    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([]))
    });




    if(this.is_registered == 1){
        this.permitProductsFrm.get('product_registration_no').setValidators([Validators.required]);
        this.permitProductsFrm.get('product_registration_no').updateValueAndValidity();
    }
    else{

        this.permitProductsFrm.get('product_registration_no').clearValidators();
        this.permitProductsFrm.get('product_registration_no').updateValueAndValidity();
    }

    this.onLoadcommonNameData();
    if(this.section_id == 2 || this.section_id == 7){
      this.requireUnitPackData = true;
      this.isFoodPermitProducts =false;
      this.common_name_title = 'Generic Name';
    }
    else if(this.section_id == 1){

      this.isFoodPermitProducts =true;
      this.requireUnitPackData = false;
    }
    else{
      
      this.isFoodPermitProducts =false;
      this.requireUnitPackData = false;
    }
    if(this.sub_module_id == 78){
      this.enabled_productadd = true;
      this.is_visaapplication = false;
    }
    else if(this.sub_module_id == 81){
      this.enabled_productadd = true;
      this.is_visaapplication = false;
    }
    
    else if (this.sub_module_id == 82){
      this.enabled_productadd = false;
      this.is_visaapplication = false;

    }
    else{
      this.enabled_productadd = true;
      this.is_visaapplication = true;
    }

    let user = this.authService.getUserDetails();
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.addProductParamsdetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      section_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });

    this.setupSearchByControlledSubstanceHandler();
  }

 onLoadBatchUnits(product_id) {
    this.batch_product_id = product_id; 
    this.permitUnitsData = [];
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code,'product_id':this.batch_product_id }, 'getProductsUnitsDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.permitProductsData = data.data;
            if (this.permitProductsData.length > 0) {
              const batch_units = this.permitProductsData[0].no_of_units;
              const batch_qty = this.productBatchdetailsfrm.get('batch_qty').value || 0;
              const new_batch_units = batch_units * batch_qty;
              this.productBatchdetailsfrm.get('batch_units').setValue(new_batch_units, { emitEvent: false });
            }
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


  onProductCategoryCboSelect($event) {

    this.onLoadproductSubCategory($event.selectedItem.id);

  }

   private setupSearchByControlledSubstanceHandler(): void {
    this.narcoticProductsFrm
      .get('controlled_substance_id')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((ControlledSubstance) => {
        if (!this.isFetchingData) {
          this.isFetchingData = true;
          this.searchByControlledSubstance(ControlledSubstance);
        }
      });
  } 
    searchByControlledSubstance(ControlledSubstance){
    this.appService.onLoadControlledSubstance(ControlledSubstance).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          const dataItem = response.data[0];
           this.narcoticProductsFrm.get('scheduled_number').setValue(dataItem.scheduled_number);
           this.narcoticProductsFrm.get('convertion_factor').setValue(dataItem.convertion_factor);
           this.narcoticProductsFrm.get('controlled_substance_schedule').setValue(dataItem.controlled_substance_schedule);


        } else {
          
          this.toastr.error('No data found');
        }

        this.isFetchingData = false;
      },
      (error) => {
        this.isFetchingData = false;
      }
    );
  }

 onLoadRouteOfAdministrationData() {
    var data = {
      table_name: 'par_route_of_administration'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.routeOfAdministrationData = data;
        });

  }
// updateFormValidators() {
//     if (this.product_category_id == 9) {
//         this.setValidators(['gmdn_code', 'gmdn_term', 'gmdn_descriptor', 'medical_device_class_type', 'no_of_units']);
//         this.clearValidators(['common_name_id', 'standard', 'ingredient_id', 'dosage_form_id', 'product_strength', 'si_unit_id']);
//         this.is_surgicalReadOnly = true;
//         this.is_not_surgicalReadOnly = false;

//     } else {
//         this.clearValidators(['gmdn_code', 'gmdn_term', 'gmdn_descriptor', 'medical_device_class_type', 'no_of_units']);
//         this.setValidators(['common_name_id', 'standard', 'ingredient_id', 'dosage_form_id', 'product_strength', 'si_unit_id']);
//             this.is_surgicalReadOnly = false;
//             this.is_not_surgicalReadOnly = true;

//     }

//     if (this.is_registered == 1) {
//         this.setValidators(['product_registration_no']);
//     } else {
//         this.clearValidators(['product_registration_no']);
//     }
// }

// setValidators(controls: string[]) {
//     controls.forEach(control => {
//         const formControl = this.permitProductsFrm.get(control);
//         if (formControl) {
//             formControl.setValidators([Validators.required]);
//             formControl.updateValueAndValidity();
//         }
//     });
// }

// clearValidators(controls: string[]) {
//     controls.forEach(control => {
//         const formControl = this.permitProductsFrm.get(control);
//         if (formControl) {
//             formControl.clearValidators();
//             formControl.updateValueAndValidity();
//         }
//     });
// }

 funcSelectgmdn(data) {
      let resp_data = data.data;
      this.permitProductsFrm.get('gmdn_id').setValue(resp_data.id);
      this.permitProductsFrm.get('gmdn_term').setValue(resp_data.name);
      this.permitProductsFrm.get('gmdn_code').setValue(resp_data.code);
      this.permitProductsFrm.get('gmdn_descriptor').setValue(resp_data.description);
      this.isgmdnCodeWinshow = false;

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
  onLoadDistributionCategoryData() {
    var data = {
      table_name: 'par_distribution_categories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.distributionCateoryData = data;
        });

  }

  onLoadTherapeuticGroupData() {
    var data = {
      table_name: 'par_therapeutic_group'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.therapeuticGroupData = data;
        });

  }


  onLoadAtcCodeData() {
    var data = {
      table_name: 'par_atc_codes'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.atcCodeData = data;
        });

  }
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
  onLoadControlledSubstanceData() {
    var data = {
      table_name: 'par_controlled_substance_active_ingredient_salt',
      //section_id: this.section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.controlledSubstanceData = data;
        });
  
  }

  onLoadDeviceTypeData() {
    var data = {
      table_name: 'par_containers'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.deviceTypeData = data;
        });

  }


  onLoadclassificationDataDataParm() {
    var data = {
      table_name: 'classification',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
        });
  }

  onLoaddoseDataParm() {
    var data = {
      table_name: 'par_product_fdc',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.doseData = data;
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

  // onLoadVerificationData(business_type_id , licence_type_id, importation_reason_id, product_category_id, is_registered, product_origin_id) {
  //   this.configService.onLoadVerificationDataDetails(business_type_id, licence_type_id, importation_reason_id, product_category_id, is_registered, product_origin_id)
  //     //.pipe(first())
  //     .subscribe(
  //       data => {
  //         this.verificationData = data.data;
  //         console.log(this.verificationData)
  //       },
  //       error => {
  //         return false;
  //       });
  // }

  onGetNarcoticPopUp($event){

    if ($event.value == 2) {
      this.isNarcoticproductsAddPopupVisible = true;
       this.isRegisteredLevel = true;

    }
    else {

      this.isNarcoticproductsAddPopupVisible = false;
      this.isRegisteredLevel = false;
    }

  }

  onCountriesSelectionChange($event){
    this.product_origin_id = $event.selectedItem.id;
    this.onLoadVerificationData(this.business_type_id , this.licence_type_id, this.importation_reason_id, this.product_category_id, this.is_registered, this.product_origin_id)
   
    
  }
  onLoadGmdnCodeData() {
       // this.isgmdnCodeWinshow = true;
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

  onSearchGmdnCodeData() {
        this.isgmdnCodeWinshow = true;
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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

 enableSubscriptions() {
    this.subscriptions.push(
      this.permitProductsFrm.get('no_of_packs').valueChanges.subscribe(() => {
        if (!this.updatingForm) {
          this.updateTotalUnits();
        }
      }),
      this.permitProductsFrm.get('pack_price').valueChanges.subscribe(() => {
        if (!this.updatingForm) {
          this.updateTotalUnits();
        }
      }),
      this.permitProductsFrm.get('no_of_units').valueChanges.subscribe(() => {
        if (!this.updatingForm) {
          this.updateTotalUnits();
        }
      }),
      this.permitProductsFrm.get('verification_fee_percent').valueChanges.subscribe(() => {
        if (!this.updatingForm) {
          this.updateTotalUnits();
        }
      })
    );
  }

  updateTotalUnits() {
    this.updatingForm = true;

    try {
      const pack_price = this.permitProductsFrm.get('pack_price').value || 0;
      const primary = this.permitProductsFrm.get('no_of_packs').value || 0;
      const units = this.permitProductsFrm.get('no_of_units').value || 0;
      const verification = this.permitProductsFrm.get('verification_fee_percent').value || 0;

      // Calculate values
      const unitPrice = (pack_price === 1) ? 1 : ((pack_price !== 0 && units !== 0) ? (pack_price / units).toFixed(2) : 0);
      const totalUnits = primary * units;
      const totalValue = pack_price * primary;
      const VCQuantity = pack_price * primary;
      const totalQuantity = pack_price * primary * units;

      // Update form controls without emitting events
      this.permitProductsFrm.get('unit_price').setValue(unitPrice, { emitEvent: false });
      this.permitProductsFrm.get('total_units').setValue(totalUnits, { emitEvent: false });
      this.permitProductsFrm.get('total_value').setValue(totalValue, { emitEvent: false });
      this.permitProductsFrm.get('vc_quantity').setValue(VCQuantity, { emitEvent: false });
      this.permitProductsFrm.get('quantity').patchValue(totalQuantity, { emitEvent: false });

    } catch (error) {
      console.error('Error updating total units:', error);
    } finally {
      this.updatingForm = false;
    }
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



  // onSelectRegistrationLevel($event){
  //    if($event.value == 1){
  //       this.isRegisteredLevel = true;

  //   }else{
  //     this.isRegisteredLevel = false;
  //   }
    
  // }
  onLoadproductSubCategory(product_category_id) {
    var data = {
      table_name: 'par_subproduct_categories',
      product_category_id: product_category_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productSubCategoryData = data;
        });
  }
  onAddNewGenericDetails(){

  
    this.addproductCommonNameModal = true;
  }
  funcPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    //load the personnel qualifiations
  //  this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
    this.permit_product_id = data.id;
    this.premitProductIdEvent.emit(this.permit_product_id);

    this.isPermitproductsAddPopupVisible = true;
    this.isPermitproductsDeclarationAddPopupVisible =true;

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
    // this.funcVisaLisPermitsProductPreviewedit(data);
    }
    else if (action_btn.action == 'delete_record') {
      this.funcDeletePermitsProducts(data.data);
    }
  }

  funcREmoveProductDetails(data){
    this.funcDeletePermitsProducts(data);

  }
  funcUpdateLicenseVisaprod(data){
    this.funcVisaLisPermitsProductPreviewedit(data);

  }funcVisaLisPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    //load the personnel qualifiations
   // this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
    this.isPermitVisaLicProductsAddPopupVisible = true;

  }
  funcDeletePermitsProducts(app_data) {

    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want remove the selected Permit Product with ' + app_data.brand_name + '?',
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
                  this.onLoadDeclarationPermitProductsData();
                  this.onLoadDeclarationProductsData();
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

  onSearchRegisteredProductApplication(){

      // let man_site_id = this.gmpapplicationGeneraldetailsfrm.get('man_site_id').value;
    //the loading
    
      this.isManufacturingSiteProductsDetails = true;
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





  funAddNewPermitProducts(){
    const batch_product_id =this.batch_product_id;
    this.isAddBatchPopupVisible = true;
    this.productBatchdetailsfrm.reset();
    this.onLoadBatchUnits(this.batch_product_id);
    this.is_brandreadonly = false;
  }
  onAddBatches(product_id){
    this.product_id = product_id; 
    this.spinner.show();
    this.isBatchPopupVisible = true;
    this.permitProductsData = [];
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code,'product_id':this.product_id }, 'getBatchPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.permitProductsData = data.data;
            if (this.permitProductsData.length > 0) {
              this.permitProductsFrm.get('no_of_batches').setValue(this.permitProductsData[0].no_of_batches);
              this.permitProductsFrm.get('shipped_qty_packs').setValue(data.shipped_qty_packs);
              this.permitProductsFrm.get('shipped_qty_units').setValue(data.shipped_qty_units);
            }
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





  funcSelectApprovedVisaProduct(data){
    let productdata = data.data;
    const product_category_id = productdata.product_category_id;
    this.product_category_id = product_category_id;
    if(this.product_category_id ==9){
      this.surgical_product_category = true;
      this.dugs_product_category =false;
      this.raw_materials_category= false;

    }else if(this.product_category_id ==8){
      this.surgical_product_category = false;
      this.dugs_product_category = true;
      this.raw_materials_category= false;
    }else{
      this.surgical_product_category = false;
      this.dugs_product_category =false;
      this.raw_materials_category= true;
    }
    this.permitProductsFrm.reset();
    let permitprod_recommendation_id = data.permitprod_recommendation_id;

    let visabalance_quantity = productdata .visabalance_quantity;
    
    if(permitprod_recommendation_id == 4 || permitprod_recommendation_id == 3){
      this.toastr.success('The selected product is not accepted for Importation as a result of '+data.permitprod_recommendation_remarks, 'Alert');
       return;
    }
    if(visabalance_quantity ==0 || visabalance_quantity < 0){
      this.toastr.success('The Approved VC Product Quantity has been depleted.', 'Alert');
        return;
    }
    
    this.permitProductsFrm.get('brand_name').setValue(productdata.brand_name);
    this.permitProductsFrm.get('product_registration_no').setValue(productdata.product_registration_no);
    this.permitProductsFrm.get('ingredient_id').setValue(productdata.ingredient_id);
    this.permitProductsFrm.get('common_name_id').setValue(productdata.common_name_id);
    this.permitProductsFrm.get('dosage_form_id').setValue(productdata.dosage_form_id);
    this.permitProductsFrm.get('product_strength').setValue(productdata.product_strength);
    this.permitProductsFrm.get('manufacturer_name').setValue(productdata.manufacturer_name);
    this.permitProductsFrm.get('manufacturer_id').setValue(productdata.manufacturer_id);
    this.permitProductsFrm.get('vc_no').setValue(productdata.vc_no);
    this.permitProductsFrm.get('si_unit_id').setValue(productdata.si_unit_id);
    this.permitProductsFrm.get('container_type_id').setValue(productdata.container_type_id);
    this.permitProductsFrm.get('gmdn_code').setValue(productdata.gmdn_code);
    this.permitProductsFrm.get('gmdn_term').setValue(productdata.gmdn_term);
    this.permitProductsFrm.get('gmdn_descriptor').setValue(productdata.gmdn_descriptor);
    this.permitProductsFrm.get('medical_device_class_type').setValue(productdata.medical_device_class_type);
    this.permitProductsFrm.get('gmdn_id').setValue(productdata.gmdn_id);
    this.permitProductsFrm.get('approved_qty').setValue(productdata.no_of_packs);
    this.permitProductsFrm.get('pack_price').setValue(productdata.unit_price);
    this.permitProductsFrm.get('qty_shipped').setValue(productdata.total_units);
    this.permitProductsFrm.get('hs_code_id').setValue(productdata.hs_code_id);
    this.permitProductsFrm.get('hs_code_description').setValue(productdata.hs_code_description);
    this.permitProductsFrm.get('units_for_quantity').setValue(productdata.units_for_quantity);
    this.permitProductsFrm.get('currency_id').setValue(productdata.currency_id);

    this.permit_product_id = productdata.id;
    this.premitProductIdEvent.emit(this.permit_product_id);
    this.onLoadBatchUnits(productdata.id);

    this.isApprovedProductsDetails = false;
  }


  public shouldDisplaySelectBox(): boolean {
    const approvedQty = this.permitProductsFrm.get('approved_qty').value;
    const qtyShipped = this.permitProductsFrm.get('shipped_qty_packs').value;
    const subModuleId = this.sub_module_id; 

    return (subModuleId === 115 || subModuleId === 49) && approvedQty !== qtyShipped;
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
  this.permitProductsFrm.get('container_type_id').setValue(productdata.container_type_id);
  this.permitProductsFrm.get('gmdn_code').setValue(productdata.gmdn_code);
  this.permitProductsFrm.get('gmdn_term').setValue(productdata.gmdn_term);
  this.permitProductsFrm.get('gmdn_descriptor').setValue(productdata.gmdn_descriptor);
  this.permitProductsFrm.get('medical_device_class_type').setValue(productdata.medical_device_class_type);
  this.isManufacturingSiteProductsDetails = false;
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
    this.permitProductsFrm.get('product_origin_id').setValue(productdata.product_origin_id);
    this.permitProductsFrm.get('units_for_quantity').setValue(productdata.units_for_quantity);
    this.permitProductsFrm.get('brand_name').setValue(productdata.proprietary_name);
    this.permitProductsFrm.get('specification_type_id').setValue(productdata.specification_type_id);
    this.permitProductsFrm.get('ingredient_id').setValue(productdata.ingredient_id);
    this.permitProductsFrm.get('dosage_form_id').setValue(productdata.dosage_form_id);
    this.permitProductsFrm.get('product_strength').setValue(productdata.product_strength);
    this.permitProductsFrm.get('manufacturer_name').setValue(productdata.manufacturing_site);
    this.permitProductsFrm.get('manufacturer_id').setValue(productdata.manufacturer_id);
    this.permitProductsFrm.get('si_unit_id').setValue(productdata.si_unit_id);
    this.permitProductsFrm.get('container_type_id').setValue(productdata.container_type_id);
    this.permitProductsFrm.get('gmdn_code').setValue(productdata.gmdn_code);
    this.permitProductsFrm.get('gmdn_term').setValue(productdata.gmdn_term);
    this.permitProductsFrm.get('atc_code_id').setValue(productdata.atc_code_id);
    this.permitProductsFrm.get('product_category').setValue(productdata.product_category);
    this.permitProductsFrm.get('gmdn_descriptor').setValue(productdata.gmdn_descriptor);
    this.permitProductsFrm.get('medical_device_class_type').setValue(productdata.medical_device_class_type);
    this.isUnRegisteredProductsDetails = false;
    this.toastr.success('Product Selection', 'The following product has been selected: ' + productdata.brand_name);

  }
  onLoadproductTypeDta() {
    var data = {
      table_name: 'par_product_type'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productTypeDta = data;
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


  funSelectRegisteredProdcustsApp(data){
    let productdata = data.data;
    const product_id = productdata.product_id;
    this.product_id =product_id;
    this.permitProductsFrm.patchValue({brand_name:productdata.brand_name, product_registration_no:productdata.product_registration_no,
      common_name:productdata.common_name,active_ingredient:productdata.active_ingredient, product_strength:productdata.product_strength, weights_units_id:productdata.weights_units_id, standard:productdata.standard, packaging_unit_id: productdata.packaging_unit_id,
      device_type_id:productdata.device_type_id,currency_name:productdata.currency_name,dosage_form_id:productdata.dosage_form_id,product_id:productdata.product_id,
      tra_product_id:productdata.tra_product_id,product_category_id:productdata.product_category_id,product_subcategory_id:productdata.product_subcategory_id,registration_no:productdata.certificate_no,registrant_name:productdata.applicant_name});
    this.onLoadPermitPackSizeData(this.product_id);
    this.isRegisteredProductsWinshow = false;


  }

  
  onLoadPermitProductsData() {
    const batch_product_id =this.batch_product_id;
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code ,'product_id':this.batch_product_id}, 'getPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitProductsData = data.data;

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
  
  onLoadDeclarationPermitProductsData() {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code}, 'getDeclarationPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.declarationpermitProductsData = data.data;

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
  



  onLoadDeclarationProductsData() {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code }, 'getDeclaredProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitdeclarationProductsData = data.data;

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
  onLoadPermitQuantityData(product_id) {
    this.appService.getPermitsOtherDetails({ 'product_id': this.product_id }, 'getproductPackagingDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.quantityUnitsData = data.data;

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
        text: 'Add New Batch',
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
          onClick: this.refreshDataGrid.bind(this)
        }
      });

  }
  refreshDataGrid() {
  //  this.dataGrid.instance.refresh();
  }


  funcSelectRegisteredProduct(data) {
    this.permitProductsFrm.reset();
    console.log(data.data.product_id);
    let validitystatus_id = data.data.validity_status_id;
    let retentionstatus_id = data.data.retentionstatus_id;
    
    if (this.sub_module_id == 12 || this.sub_module_id == 115) {
       this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
        this.permitProductsFrm.get('product_registration_no').setValue(data.data.product_registration_no);
        this.permitProductsFrm.get('active_ingredient').setValue(data.data.active_ingredient);
        this.permitProductsFrm.get('brand_name').setValue(data.data.brand_name);
        this.permitProductsFrm.get('dosage_form').setValue(data.data.dosage_form);
        
        this.permitProductsFrm.get('product_strength').setValue(data.data.product_strength);
        this.permitProductsFrm.get('common_name_id').setValue(data.data.common_name_id);
        this.permitProductsFrm.get('packaging_unit_id').setValue(data.data.packaging_unit_id);
        this.permitProductsFrm.get('standard').setValue(data.data.standard);
        this.permitProductsFrm.get('quantity').setValue(data.data.quantity);
        this.permitProductsFrm.get('unit_price').setValue(data.data.unit_price);
        this.permitProductsFrm.get('number_of_primary_packs').setValue(data.data.number_of_primary_packs);
        this.permitProductsFrm.get('number_of_units_packs').setValue(data.data.number_of_units_packs);
        this.permitProductsFrm.get('device_type_id').setValue(data.data.device_type_id);
        this.permitProductsFrm.get('unit_price').setValue(data.data.unit_price);
        this.permitProductsFrm.get('manufacturer_name').setValue(data.data.manufacturer_name);
        this.permitProductsFrm.get('manufacturer_id').setValue(data.data.manufacturer_id);
        this.permitProductsFrm.get('country_oforigin_id').setValue(data.data.country_oforigin_id);
        this.isPermitproductsAddPopupVisible = false;
        this.isPermitproductsPopupVisible = false;

        this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);
      
    }
    else {
      //validate the datasets
      if (validitystatus_id != 2) {
        this.toastr.error('Product Registration Alert', 'The product must be registered, confirm the registration status or submit Permit as a special case application.');
        return;

      } else if (retentionstatus_id == 2) {
        this.toastr.error('Product Retention Payment Alert', 'The selected product has a pending retention payment, pay the pending retention or contact Authority for further guidelines.');
        return;
      }
      else {
        this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
        this.isPermitproductsAddPopupVisible = true;
             this.permitProductsFrm.get('product_registration_no').setValue(data.data.product_registration_no);
        this.permitProductsFrm.get('active_ingredient').setValue(data.data.active_ingredient);
        this.permitProductsFrm.get('brand_name').setValue(data.data.brand_name);
        this.permitProductsFrm.get('dosage_form').setValue(data.data.dosage_form);
        
        this.permitProductsFrm.get('product_strength').setValue(data.data.product_strength);
        this.permitProductsFrm.get('common_name_id').setValue(data.data.common_name_id);
        this.permitProductsFrm.get('packaging_unit_id').setValue(data.data.packaging_unit_id);
        this.permitProductsFrm.get('standard').setValue(data.data.standard);
        this.permitProductsFrm.get('quantity').setValue(data.data.quantity);
        this.permitProductsFrm.get('unit_price').setValue(data.data.unit_price);
        this.permitProductsFrm.get('number_of_primary_packs').setValue(data.data.number_of_primary_packs);
        this.permitProductsFrm.get('number_of_units_packs').setValue(data.data.number_of_units_packs);
        this.permitProductsFrm.get('device_type_id').setValue(data.data.device_type_id);
        this.permitProductsFrm.get('unit_price').setValue(data.data.unit_price);
        this.permitProductsFrm.get('manufacturer_name').setValue(data.data.manufacturer_name);
        this.permitProductsFrm.get('manufacturer_id').setValue(data.data.manufacturer_id);
        this.permitProductsFrm.get('country_oforigin_id').setValue(data.data.country_oforigin_id);

        this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);

      }
    }
  }
  onLoadcommonNameData() {
    var data = {
      table_name: 'par_atc_codes',
      //section_id: this.section_id
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
  }onSaveNewGenericDetails(){
    this.addProductParamsdetailsfrm.get('tablename').setValue('par_common_names')
    // this.addProductParamsdetailsfrm.get('section_id').setValue(this.section_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addProductParamsdetailsfrm.value, 'onsaveProductConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onLoadcommonNameData();
         
          this.addproductCommonNameModal = false;
          this.permitProductsFrm.get('common_name_id').setValue(this.product_resp.record_id);
  
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
  fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  
  funcDownloadUploadedDocuments(data) {
    
    this.premitProductIdEvent.emit(data.id);
    this.isDocumentPreviewDownloadwin = true;
      
  }
  private prepareIMPSave(): any {
    let input = new FormData();
    const files: Array<File> = this.filesToUpload;
   // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
    for(let i =0; i < files.length; i++){
        input.append("file", files[i], files[i]['name']);
    }
    input.append('brand_name', this.permitProductsFrm.get('brand_name').value);
    input.append('product_category_id', this.permitProductsFrm.get('product_category_id').value);
    input.append('product_batch_no', this.permitProductsFrm.get('product_batch_no').value);
    input.append('product_strength', this.permitProductsFrm.get('product_strength').value);
    input.append('product_manufacturing_date', this.permitProductsFrm.get('product_manufacturing_date').value);
    input.append('product_expiry_date', this.permitProductsFrm.get('product_expiry_date').value);
    input.append('country_oforigin_id', this.permitProductsFrm.get('country_oforigin_id').value);

    
    input.append('unit_price', this.permitProductsFrm.get('unit_price').value);
    input.append('currency_id', this.permitProductsFrm.get('currency_id').value);
    input.append('packaging_unit_id', this.permitProductsFrm.get('packaging_unit_id').value);
    input.append('quantity', this.permitProductsFrm.get('quantity').value);
    input.append('laboratory_no', this.permitProductsFrm.get('laboratory_no').value);
    input.append('regulated_prodpermit_id', this.permitProductsFrm.get('regulated_prodpermit_id').value);
    input.append('prodcertificate_no', this.permitProductsFrm.get('prodcertificate_no').value);
    input.append('product_id', this.permitProductsFrm.get('product_id').value);
    input.append('unitpack_unit_id', this.permitProductsFrm.get('unitpack_unit_id').value);
    input.append('unitpack_size', this.permitProductsFrm.get('unitpack_size').value);
    input.append('vc_quantity', this.permitProductsFrm.get('vc_quantity').value);
    input.append('total_weight', this.permitProductsFrm.get('total_weight').value);
    input.append('weights_units_id', this.permitProductsFrm.get('weights_units_id').value);
    input.append('id', this.permitProductsFrm.get('id').value);
    input.append('device_type_id', this.permitProductsFrm.get('device_type_id').value);
    input.append('is_regulated_product', this.permitProductsFrm.get('is_regulated_product').value);
    input.append('productphysical_description', this.permitProductsFrm.get('productphysical_description').value);
    input.append('common_name_id', this.permitProductsFrm.get('common_name_id').value);
    input.append('manufacturer_id', this.permitProductsFrm.get('manufacturer_id').value);
    input.append('manufacturer_name', this.permitProductsFrm.get('manufacturer_name').value);
    return input;
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
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no, 'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           this.permitProductsFrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.isPermitproductsPopupVisible = false;
            this.isPermitVisaLicProductsAddPopupVisible = false;
            this.isPermitproductsDeclarationAddPopupVisible=false;
            this.vc_product_id = this.app_resp.vc_product_id;
            this.onLoadPermitProductsData();
            this.onLoadDeclarationProductsData();
            this.onLoadDeclarationPermitProductsData();
            this.permit_product_id = this.app_resp.record_id;
            this.premitProductIdEvent.emit(this.permit_product_id);
            this.vcProductIdEvent.emit(this.vc_product_id);


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

  onsaveNarcoticPermitProductdetails() {
    const invalid = [];
    const controls = this.narcoticProductsFrm.controls;
    
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
   
    if (this.narcoticProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.narcoticProductsFrm.value, this.tracking_no, 'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           this.narcoticProductsFrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.isNarcoticproductsAddPopupVisible = false;
            this.isPermitproductsPopupVisible = false;
            this.isPermitVisaLicProductsAddPopupVisible = false;
            this.onLoadPermitProductsData();
            this.permit_product_id = this.app_resp.record_id;
            this.premitProductIdEvent.emit(this.permit_product_id);

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

  onsaveBatchProductdetails(){
    this.spinner.show();
    const batch_product_id =this.batch_product_id;
    this.appService.onsaveBatchProductdetails(this.application_code, this.productBatchdetailsfrm.value, this.tracking_no,this.batch_product_id,'saveBatchProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.productBatchdetailsfrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.isPermitproductsPopupVisible = false;
            this.isPermitVisaLicProductsAddPopupVisible = false;
            this.isAddBatchPopupVisible = false;
            this.isBatchPopupVisible=true;
            this.onAddBatches(this.app_resp.product_id);
            this.permit_product_id = this.app_resp.record_id;
            this.premitProductIdEvent.emit(this.permit_product_id);

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

  
  onupdatePermitProductdetails() {
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no,'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.onLoadPermitProductsData();
            this.onLoadDeclarationPermitProductsData();
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
   onPermitVisaLicenseProductGridToolbar(e) {
   
   
    //sub_module_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Visa(Approved) Products',
        type: 'default',
        icon: 'fa fa-plus',
        //onClick: this.funAddApprovedVisaPermitProducts.bind(this)

      }
    },  {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });

  }

  funcUploadOptionProducts(){
      
      this.onpermitUploadedProductsData();

  }
  funcDownloadOptionProducts(){
      
    let report_url = this.mis_url+'reports/onDownloadImportInvoiceProductstemplate?module_id='+this.module_id+'&sub_module_id='+this.sub_module_id+'&section_id='+this.section_id;
    this.funcGenerateRrp(report_url,"Download Invoice Template");

  }
  
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
funcSynchronisedUploadedProducts(){
  if(this.permitUploadedProductsData.length  ==  0){
    this.toastr.success('No Uploaded Invoice Products Found', 'Response');

      return;
  }

  this.modalServ.openDialog(this.viewRef, {
    title: 'Do you want to syncronise/Save the uploaded Products()',
    childComponent: '',
    settings: {
      closeButtonClass: 'fa fa-close'
    },
    actionButtons: [{
      text: 'Yes',
      buttonClass: 'btn btn-danger',
      onAction: () => new Promise((resolve: any, reject: any) => {
        this.spinner.show();
        this.appService.onSynchronisedUploadedProducts('wb_uploadpermits_products', this.application_code, 'Permit products Details')
          .subscribe(
            response => {

              this.spinner.hide();
              let response_data = response.json();
              if (response_data.success) {
                this.onLoadpermitUploadedProductsData(this.application_code);
                this.isUploadedInvoiceProductsWin= false;
              
                this.onLoadPermitProductsData();
                this.toastr.success(response_data.message, 'Response');
              }
              else {
                this.isUploadedInvoiceProductsWin= false;
              
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
        this.isUploadedInvoiceProductsWin= true;
        
         resolve();
      })
    }
    ]
  });


}
funcClearUploadedProducts(){
    if(this.permitUploadedProductsData.length  ==  0){
      this.toastr.success('No Uploaded Invoice Products Found', 'Response');

        return;
    }

    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want remove the uploaded Products()',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onDeletePermitUploadedProductsDetails('wb_uploadpermits_products', this.application_code, 'Permit products Details')
            .subscribe(
              response => {

                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
                  this.onLoadpermitUploadedProductsData(this.application_code);
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
          this.isUploadedInvoiceProductsWin= true;
          resolve();
        })
      }
      ]
    });


}
funcUploadOptionProductsWin(){

    this.isInvoiceProductsUploadVisable = true;

}
  onPermitUploadProductGridToolbar(e) {
   
    //sub_module_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Download Upload Form(Template)',
        type: 'default',
        icon: 'fa fa-upload',
        onClick: this.funcDownloadOptionProducts.bind(this)

      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Upload Products',
        type: 'default',
        icon: 'fa fa-upload',
        onClick: this.funcUploadOptionProductsWin.bind(this)
      }
    },{
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Synchronised Validated Products',
        type: 'success',
        icon: 'fa fa-upload',
        onClick: this.funcSynchronisedUploadedProducts.bind(this)
      }
    },{
      location: 'after',
      widget: 'dxButton',
      options: {
        text: 'Clear Uploaded Products',
        type: 'danger',
        icon: 'fa fa-upload',
        onClick: this.funcClearUploadedProducts.bind(this)
      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.onpermitUploadedProductsData.bind(this)
        }
      });

  } 
  onpermitUploadedProductsData(){
      this.onLoadpermitUploadedProductsData(this.application_code);
  }

  onPermitProductGridToolbar(e) {

    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Products and Information',
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


  onPermitProductDeclarationGridToolbar(e) {

    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Product Information',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funAddPermitProductsDeclaration.bind(this)
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
    this.onLoadDeclarationPermitProductsData();
    this.onLoadDeclarationProductsData();
  }


 funAddPermitProducts() {
  
    this.OnReloadPermitProducts();
    this.permitProductsFrm.reset();
    this.isPermitproductsAddPopupVisible = true;
    
  }

  funAddPermitProductsDeclaration() {
   
    this.OnReloadPermitProducts();
    this.permitProductsFrm.reset();
    this.isPermitproductsDeclarationAddPopupVisible = true;
    
  }
  funUploadPermitProducts() {
   
    this.OnReloadPermitProducts();
    this.isPermitproductsPopupVisible = true;
    
  }
  
  onSearchApprovedProductDetails() {
    let port_id  = this.port_id;
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code, 'port_id':this.port_id}, 'getApprovedProductsDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.approvedProductsData = data.data;
            this.isApprovedProductsDetails = true;
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

OnReloadPermitDrugProducts(){

    let me = this;
            this.permitDrugDetailsData.store = new CustomStore({
              load: function (loadOptions: any) {
                  var params = '?';
                  params += 'skip=' + loadOptions.skip;
                  params += '&take=' + loadOptions.take;//searchValue
                  var headers = new HttpHeaders({
                    "Accept": "application/json",
                    "Authorization": "Bearer " + me.authService.getAccessToken(),
                  });
                  console.log(loadOptions.filter);
                  this.configData = {
                    headers: headers,
                    params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, table_name: 'registered_products'}
                  };
                  return me.httpClient.get(AppSettings.base_url + 'importexportapp/getRegisteredNonRegisteredProducts',this.configData)
                            .toPromise()
                            .then((data: any) => {
                                return {
                                    data: data.data,
                                    totalCount: data.totalCount
                                }
                            })
                            .catch(error => {
                               throw 'Data Loading Error' 
                            });
              }
          });
      }
  
  
  OnReloadPermitProducts(){

    let me = this;
            this.registeredProductsData.store = new CustomStore({
              load: function (loadOptions: any) {
                  var params = '?';
                  params += 'skip=' + loadOptions.skip;
                  params += '&take=' + loadOptions.take;//searchValue
                  var headers = new HttpHeaders({
                    "Accept": "application/json",
                    "Authorization": "Bearer " + me.authService.getAccessToken(),
                  });
                  console.log(loadOptions.filter);
                  this.configData = {
                    headers: headers,
                    params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, table_name: 'registered_products', 'module_id': me.module_id, 'sub_module_id': me.sub_module_id,section_id:me.section_id,trader_id:me.trader_id, mistrader_id:me.mistrader_id}
                  };
                  return me.httpClient.get(AppSettings.base_url + 'importexportapp/getRegisteredNonRegisteredProducts',this.configData)
                            .toPromise()
                            .then((data: any) => {
                                return {
                                    data: data.data,
                                    totalCount: data.totalCount
                                }
                            })
                            .catch(error => {
                               throw 'Data Loading Error' 
                            });
              }
          });
      }

      onAddNewProductinformation() {
 
        if (this.productGeneraldetailsfrm.invalid) {
          return;
        }
        this.productGeneraldetailsfrm.get('section_id').setValue(this.section_id);
        let brand_name =  this.productGeneraldetailsfrm.get('brand_name').value;
        this.spinner.show();
        this.appService.onAddNewProductinformation(this.productGeneraldetailsfrm.value, 'onAddNewProductinformation')
          .subscribe(
            response => {
              this.product_resp = response.json();
              
              if (this.product_resp.success) {
                
                //reload prodct details
                this.isnewproductAddWinVisible = false;
                //this.OnReloadPermitProducts();
                this.OnReloadPermitDrugProducts();
                this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
                this.isPermitproductsAddPopupVisible = true;
                this.permitProductsFrm.get('brand_name').setValue(brand_name);
                this.permitProductsFrm.get('product_id').setValue(this.product_resp.record_id);
                
                this.toastr.success(this.product_resp.message, 'Response');
              } else {
                this.toastr.error(this.product_resp.message, 'Alert');
              }
              this.spinner.hide();
            },
            error => {
              this.loading = false;
            });
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
          this.permitProductsFrm.patchValue({manufacturer_name:manufacturer_name,manufacturer_id:manufacturer_id});
   
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
funcAddManufacturerSite() {
  this.isnewmanufacturerModalShow = true;
  this.manufacturerFrm.reset();
}
funcSelectManufacturer(data) {
  let data_resp = data.data;
  this.permitProductsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id,country_oforigin_id:data_resp.country_id});
   
  this.isManufacturerSitePopupVisible = false;

}
// onManufacturerPreparing(e) {
//   this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
// }
onCoutryCboSelect($event) {


  this.onLoadRegions($event.selectedItem.id);

}onLoadRegions(country_id) {

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

onPackSizeCboSelect($event) {
  let packSize_details =$event.selectedItem;
  this.permitProductsFrm.get('no_of_units').setValue(packSize_details.no_of_units_packs);
  this.permitProductsFrm.get('units_for_quantity').setValue(packSize_details.si_unit_id);
  this.onLoadQuantityUnitsData();

}
onSelectcountryOrigin($event) {
  let packSize_details =$event.selectedItem.id;
    if(packSize_details == 37){
    this.permitProductsFrm.get('product_origin_id').setValue(2);

    }else{
        this.permitProductsFrm.get('product_origin_id').setValue(1);
    }

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


onHsCodeCboSelect($event) {
  let hs_code_details =$event.selectedItem;
 this.permitProductsFrm.get('hs_code_description').setValue(hs_code_details.description);
}

onRegionsCboSelect($event) {

  this.onLoadDistricts($event.selectedItem.id);

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
onPermitsProductsTabCLick(e: any){
  //this.funcSelectApprovedProductDetails(ta)

  console.log(e.itemIndex);

}
onVisaProductCellPrepared(e) {
  if(e.rowType === "data" && e.column.dataField === "status_name") {
    let visabalance_quantity =e.data.visabalance_quantity;

      if(visabalance_quantity >0){
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#64B0F2';    
      }
      else{
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF5D48';  
      
      }
    }
    if(e.rowType === "data" && e.column.dataField === "permitprod_recommendation") {
      let permitprod_recommendation_id =e.data.permitprod_recommendation_id;
  
        if(permitprod_recommendation_id == 2){
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#64B0F2';    
        }
        else{
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#FF5D48';  
        
        }
      }

}


public prepareUploadSave(): any {
  let input = new FormData();
  const files: Array<File> = this.filesToUpload;
 // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
  for(let i =0; i < files.length; i++){
      input.append("file", files[i], files[i]['name']);
  }

  input.append('description', this.invoiceProductsUploadFrm.get('description').value);
  input.append('currency_id', this.invoiceProductsUploadFrm.get('currency_id').value);
 
  return input;
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
onunInvoiceProductsUpload() {
  if(this.invoiceProductsUploadFrm.get('currency_id').value == ''){
    this.toastr.error('Select Invoice Products Currency', 'Error');
    return;
  }
  const uploadData = this.prepareUploadSave();
  this.spinner.show();
  this.dmsService.uploadApplicationDMSDocument(uploadData,  this.module_id, this.sub_module_id, '',this.application_code, '','onunInvoiceProductsUpload')
    //.pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response.json();

        if (response_data.success) {

           this.onLoadpermitUploadedProductsData(this.application_code);
           this.isInvoiceProductsUploadVisable = false;

          this.toastr.success(response_data.message, 'Response');

        }
        else {
          this.toastr.error(response_data.message, 'Response');

        }

      },
      error => {
        this.spinner.hide();
        this.toastr.success('Error occurred', 'Response');

      });
} 

onCellApprovedVCPrepared(e) {
  if(e.rowType === "data" && e.column.dataField === "visabalance_quantity") {
    let vc_balance_quantity =e.data.visabalance_quantity;
      if(vc_balance_quantity == 0){
        e.cellElement.style.color = 'black';
        e.cellElement.style.backgroundColor = '#e06666';    
      }
      else if(vc_balance_quantity  > 0){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#54b02c';  
      
      }
      else if(vc_balance_quantity < 0){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF0000';  

      } else{
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#f44336';  
    
      }
  }
}

}
