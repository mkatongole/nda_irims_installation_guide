import { Component,  Input, ViewContainerRef, ViewChild } from '@angular/core';
import { SharedProductregistrationclassComponent } from '../../../shared-productregistrationclass/shared-productregistrationclass.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from "devextreme/data/array_store";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent extends SharedProductregistrationclassComponent{
 
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @Input() application_code: number;
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() product_id: number;
 // @Input() drugsSummaryData:any;
  @Input() isReadOnly: boolean;
 // @Input() summaryProductDetailsFrm:FormGroup;
  summaryProductDetailsFrm:FormGroup;
  drugsSummaryData:any;
   addproductIngredientsModal:boolean = false;
   addIngredientsdetailsfrm:FormGroup;
   product_resp:any;
   packagingUnitsData:any;
   ingredientsData:any;
   container_type_id:number;
   sampleSubmissionData:any;
   ActivePharmaceuticalData:any;
   isproductManufacturerModalShow: boolean = false;
  isnewmanufacturerModalShow:boolean=false;
  isnewmanufactureringSiteDetailsModalShow: boolean = false;
  isproductmanSiteDetailsModalShow: boolean = false;
  isgmpinspectionModalShow:boolean = false;
  isgmpAddinspectionModalShow:boolean = false;
  
  addRegionDetailsWin: boolean;
  addRegionDetailsFrm:FormGroup;
  auto:any;
  addDistrictsDetailsWin: boolean = false;
  addDistrictsDetailsFrm:FormGroup;

  isManufactureNameDetailsWinshow:boolean=false;
  isManufactureProcessDetailsWinshow:boolean=false;
  isControlMaterialsWinshow:boolean=false;
  isControlCriticalWinshow:boolean= false;
  isProcessValidationWinshow:boolean=false;
  isManProcessDevWinshow:boolean=false;

  siUnitsData:any;
  specificationData:any;
  reasonForInclusionData:any;
  containerMaterialData:any;
  containerData:any;
  generalPropertiesData:any;
  manufacturingRoleDataSource: any;
  manufacturingRoleData:any;
  ManufacturerProcessData:any;
  countries: any;
  regions: any;
  districts: any;
  country_id:number;
  region_id:number;
  ingredientTypeData:any;
  containerTypeData:any;
  tbisReadOnly:boolean;


  nameManufacturerData:any;
  controlMaterialsData:any;
  criticalControlData:any;
  processData:any;
  manprocessData:any;

  manufacturingNameDetailsFrm:FormGroup;
  manufacturingProcessDetailsFrm:FormGroup;
  controlMaterialsDetailsFrm:FormGroup;
  criticalControlDetailsFrm:FormGroup;
  processValidationDetailsFrm:FormGroup;
  manprocessDevDetailsFrm:FormGroup;

  nomenclatureData:any;
  manufacturersData:any = {};
  manufacturer_type_id: number;
  manufacturer_id:number;
  addproductInclusionModal:boolean= false;
  isSampleDetailsWinshow:boolean=false;

 ngOnInit() { this.onLoadconfirmDataParmAll();
    
    this.onLoadSampleSubmissionData();
    this.onLoadActivePharmaceuticalData();

    this.manufacturingNameDetailsFrm = new FormGroup({
      manufacturer: new FormControl('', Validators.compose([Validators.required])),
      responsibility: new FormControl('', Validators.compose([Validators.required])),
      cep_number: new FormControl('', Validators.compose([Validators.required])),
      description_process: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.manufacturingProcessDetailsFrm = new FormGroup({
      processes_step_justification: new FormControl('', Validators.compose([Validators.required])),
      manufacturering_process: new FormControl('', Validators.compose([Validators.required])),
      alternative_process_use: new FormControl('', Validators.compose([Validators.required])),
      description_process: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.controlMaterialsDetailsFrm = new FormGroup({
      summary_quality_control: new FormControl('', Validators.compose([Validators.required])),
      starting_material: new FormControl('', Validators.compose([Validators.required])),
      test_method: new FormControl('', Validators.compose([Validators.required])),
      acceptance_criteria: new FormControl('', Validators.compose([Validators.required])),
      manufacturing_site_address: new FormControl('', Validators.compose([Validators.required])),
      lette_of_attestation: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });  

 
    this.criticalControlDetailsFrm = new FormGroup({
      starting_material: new FormControl('', Validators.compose([Validators.required])),
      test_method: new FormControl('', Validators.compose([Validators.required])),
      acceptance_criteria: new FormControl('', Validators.compose([Validators.required])),
      summary_performed: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
     
    });   
    this.processValidationDetailsFrm = new FormGroup({
      process_validation: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });
      this.manprocessDevDetailsFrm = new FormGroup({
      manufacturing_process_development: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });

    this.autoLoadProductsOtherDetails(this.product_id);
    this.autoLoadedParameters(this.section_id);
    this.onLoadCountries();
  } 
  autoLoadProductsOtherDetails(product_id) {
    this.OnLoadManufacturingName(product_id);
    this.OnLoadManufacturingProcess(product_id);
    this.OnLoadControlMaterials(product_id);
    this.OnLoadCriticalControls(product_id);
    this.OnLoadProcessValidation(product_id);
    this.OnLoadManProcessDev(product_id);
    this.OnLoadapiManufacturersData(product_id)

  }onIngredientsSelectionChange($event) {
    if($event.selectedItem){
      let ingredient_name =$event.selectedItem;

    }
    
  }  
  adjustTextAreaHeight(event: any): void {
  const textarea = event.target;
  textarea.style.overflow = 'hidden'; // Hide any overflow content
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
}
  oncontainerTypeDataSelection($event){

      this.container_type_id = $event.value ;
  
  } 
  onManufacturingSiteHasInspection($event){
    if($event.value ==1){
      this.has_beeninspected = true;
    }
    else{
      this.has_beeninspected = false;

    }
} 

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onAddNewIngredientDetails(){
    this.addIngredientsdetailsfrm.reset();
    this.addproductIngredientsModal = true;

  }
  onAddNewReasonInclusion(){
    this.addIngredientsdetailsfrm.reset();
    this.addproductInclusionModal = true;

  }



  autoLoadedParameters(section_id) {
   
    this.onLoadpackagingUnitsData(section_id);
    this.onLoadCountries();
 
  }
  onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
 
  onLoadCountries(is_local = 0) {
    let data = {
      table_name: 'par_countries',
      // id: 36
    };
    if(is_local == 1){
      let data = {
        table_name: 'par_countries',
        is_local: 1
      };
    }
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.countries = data;
        },
        error => {
          return false;
        });
  }
  onLoadRegions(country_id) {

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

  onNameManufacturerPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerName, 'Manufacturers(s) Name');
  }

  onManufacturingProcessPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerProcess, 'Manufacturering Process');
  }
  funcAddManufacturerName() {
    this.OnLoadapiManufacturersData(this.product_id);
    this.isManufactureNameDetailsWinshow = true;
    this.manufacturingNameDetailsFrm.reset();


  if (this.apiManufacturersData && this.apiManufacturersData.length > 0) {
  const concatenatedManufacturerValues = [];
  this.apiManufacturersData.forEach((data, index) => {
    const concatenatedManufacturerValue = `${index + 1}. ${data.manufacturer}\n`;
    concatenatedManufacturerValues.push(concatenatedManufacturerValue);
  });

  this.manufacturingNameDetailsFrm.get('manufacturer').patchValue(concatenatedManufacturerValues);
}

  }
  funcAddManufacturerProcess() {
    
    this.isManufactureProcessDetailsWinshow = true;
    this.manufacturingProcessDetailsFrm.reset();

  }


  onControlMaterialsPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddControlMaterials, 'Control of Materials');
  }
  funcAddControlMaterials() {
    
    this.isControlMaterialsWinshow = true;
    this.controlMaterialsDetailsFrm.reset();

  }
  onCriticalControlPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddCriticalControls, 'Controls Critical Steps and Intermediates ');
  }

  onProcessValidationPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddProcessValidation, 'Process Validation ');
  }
  onManProcessDevPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManProcessDev, 'Manufacturering Process Development ');
  }
  funcAddCriticalControls() {
    
    this.isControlCriticalWinshow = true;
    this.criticalControlDetailsFrm.reset();

  }
  funcAddProcessValidation() {
    
    this.isProcessValidationWinshow = true;
    this.processValidationDetailsFrm.reset();

  }
  funcAddManProcessDev() {
    
    this.isManProcessDevWinshow = true;
    this.manprocessDevDetailsFrm.reset();

  }

  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        disabled: this.tbisReadOnly,
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
    this.dataGrid.instance.refresh();
  }
  onProdPackagingPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddProductPackagingDetails, 'Product Packaging');
  }  funcAddProductPackagingDetails() {
    this.modalService.getModal('productPackagingModal').open();
    this.productPackagingdetailsfrm.reset();

  } onManufacturerPreparing(e) {
    this.tbisReadOnly = false;
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  } funcAddManufacturerSite() {
    this.product_origin_id = this.productGeneraldetailsfrm.get('product_origin_id').value;
    this.isnewmanufacturerModalShow = true;
    this.isproductManufacturerModalShow = true;
    this.manufacturerFrm.reset();
    
  } onProdManufacturingPreparing(e) {
    this.tbisReadOnly = false;
    this.functDataGridToolbar(e, this.funcAddProductManufacturerDetails, 'Product Manufacturers');

  } funcAddProductManufacturerDetails(){
    //the details 
    this.isproductmanSiteDetailsModalShow = true;
    this.onGetProductManufacturerDetails();
    this.productmanufacturingSiteFrm.reset();


}onGetProductManufacturerDetails() {

  let me = this;
  this.manufacturer_type_id = 1;
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
}onProdApiManufacturingPreparing(e) {
  this.tbisReadOnly = false;
  this.functDataGridToolbar(e, this.funcAddAPIManufacturerDetails, 'Product API Manufacturers');
}funcAddAPIManufacturerDetails(){
  this.isapimanSiteDetailsModalShow = true;
  this.productapimanufacturingSiteFrm.reset();

} onProdInspectionDetailsPreparing(e) {
  this.tbisReadOnly = false;
  this.functDataGridToolbar(e, this.funcAddProdGmpInspectionDetails, 'GMP Inspection Details');
}  funcAddProdGmpInspectionDetails() {
   
  this.isgmpinspectionModalShow = true;
  this.loadAddProdGmpInspectionDetails();
}loadAddProdGmpInspectionDetails() {
  let me = this;
  this.tradergmpInspectionData.store = new CustomStore({
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
          params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,product_id:me.product_id, application_code:me.application_code}
        };
        return me.httpClient.get(AppSettings.base_url + 'productregistration/getGmpInspectionsdetails',this.configData)
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

this.tradergmpInspectionData.store.load();

} 

 funcEditIngredientsDetails(data) {
  this.productIngredientsdetailsfrm.patchValue(data.data);
  this.productIngredientsModal = true;
}
funcEditPackagingDetails(data) {
  this.productPackagingdetailsfrm.patchValue(data.data);
  this.modalService.getModal('productPackagingModal').open();
}funcDeleteIngredientsDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_product_ingredients';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_ingredients', 'Product Ingredients');

}funcDeleteSampleDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_sample_information';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_samples', 'Product Samples Details');
}
funcDeleteActiveDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_active_information';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_active_substances', 'Product Active Details');
}


funcDeleteManufacturingDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_product_manufacturers';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_manufacturer', 'Product Manufacturer');

}
funcDeleteGMPManufacturingDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_product_gmpinspectiondetails';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'gmp_inspection', 'Product GMP Inspection Manufacturer');

}


funcDeletePackDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_product_packaging';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_packaging', 'Product Packaging');

}
funcDeleteDetailhelper(record_id, appproduct_id, table_name, reload_type, title) {
  this.modalDialogue.openDialog(this.viewRef, {
    title: 'Are You sure You want to delete ' + title + '?',
    childComponent: '',
    settings: {
      closeButtonClass: 'fa fa-close'
    },
    actionButtons: [
      {
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
        this.spinner.show();
          this.appService.onDeleteProductsDetails(record_id, table_name, appproduct_id, title)
            //.pipe(first())
            .subscribe(
              data_response => {
                let resp = data_response.json();

                if (resp.success) {
                  if (reload_type == 'control_materials') {
                    this.OnLoadControlMaterials(appproduct_id);

                  }
                  else if (reload_type == 'manufacturing_name') {
                    this.OnLoadManufacturingName(appproduct_id);

                  } else if (reload_type == 'critical_control') {
                    this.OnLoadCriticalControls(appproduct_id);

                  }else if (reload_type == 'process_validation') {
                    this.OnLoadProcessValidation(appproduct_id);

                  }else if (reload_type == 'manufacturing_process') {
                    this.OnLoadManufacturingProcess(appproduct_id);

                  }else if (reload_type == 'man_process_dev') {
                    this.OnLoadManProcessDev(appproduct_id);
                  }
                  this.spinner.hide();
                  this.toastr.success(resp.message, 'Response');
                }
                else {
                  this.toastr.error(resp.message, 'Alert');
                }
              },
              error => {
                return false
              });
          resolve();
        })
      },
      {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {

          resolve();

        })
      }
    ]
  });
} 

OnLoadManufacturingName(product_id) {
    var data = {
      table_name: 'tra_manufacturer',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.nameManufacturerData = data.data;
        });
  }

OnLoadManufacturingProcess(product_id) {
    var data = {
      table_name: 'tra_manufacturer_process',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.ManufacturerProcessData = data.data;
        });
  }
OnLoadControlMaterials(product_id) {
    var data = {
      table_name: 'tra_control_materials',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.controlMaterialsData = data.data;
        });
  }
OnLoadProcessValidation(product_id) {
    var data = {
      table_name: 'tra_process_validation',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.processData = data.data;
        });
  }
  OnLoadManProcessDev(product_id) {
    var data = {
      table_name: 'tra_man_process_development',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.manprocessData = data.data;
        });
  }
  OnLoadCriticalControls(product_id) {
    var data = {
      table_name: 'tra_critical_control',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.criticalControlData = data.data;
        });
  }



onSearchProductManufacturer() {
  //the details 
  this.product_origin_id = this.productGeneraldetailsfrm.get('product_origin_id').value;
  if(this.product_origin_id == 1){
      
  }
  this.isproductManufacturerModalShow = true;
  this.onGetProductManufacturerDetails();


}

onSearchProductManufacturerSite() {
  //the details 
  let manufacturer_id  = this.productmanufacturingSiteFrm.get('manufacturer_id').value;
  if(manufacturer_id >0){
    this.manufacturer_type_id = 1
    this.isproductManufactureringSiteModalShow = true;
    
    this.funcAddManufactureringDetails();
  }
  else{
    this.toastr.error('Select manufacturer details 1st before the Manufacturing Site', 'Alert');
  }
  
}
onSearchProductManufacturingSite() {
  this.isproductManufacturerModalShow = true;
  this.isproductmanSiteDetailsModalShow = false;
}
onSearchAPIManufacturer() {
  this.isproductManufacturerModalShow = true;
  this.onGetProductManufacturerDetails();
  this.manufacturer_type_id = 2;
}

funcAddManufactureringDetails() {

      let me = this;
      this.manufacturer_type_id = 1;
      
    var manufacturer_id = me.productmanufacturingSiteFrm.get('manufacturer_id').value;
   
    this.appService.getProductsOtherDetails({ manufacturer_id:manufacturer_id }, 'getManufacturingSiteInformation')
    .subscribe(
      data => {
        if (data.success) {
          this.manufacturersSiteData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }

      },
      error => {
        return false
      });

}
onSaveManufacturingDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_manufacturer', this.manufacturingNameDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadManufacturingName(appproduct_id);
         
          this.isManufactureNameDetailsWinshow = false;
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

onSaveManufacturingProcessDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_manufacturer_process', this.manufacturingProcessDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadManufacturingProcess(appproduct_id);
         
          this.isManufactureProcessDetailsWinshow = false;
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



onSaveControlMaterialsDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_control_materials', this.controlMaterialsDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadControlMaterials(appproduct_id);
         
          this.isControlMaterialsWinshow = false;
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

onSaveCriticalControlDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_critical_control', this.criticalControlDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadCriticalControls(appproduct_id);
         
          this.isControlCriticalWinshow = false;
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

onSaveProcessValidationDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_process_validation', this.processValidationDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadProcessValidation(appproduct_id);
         
          this.isProcessValidationWinshow = false;
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

onSaveManProcessDev() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_man_process_development', this.manprocessDevDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadManProcessDev(appproduct_id);
         
          this.isManProcessDevWinshow = false;
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



funcSelectManufacturer(data) {
  if (this.manufacturer_type_id == 1) {
    this.manufacturer_id = data.data.manufacturer_id;
    this.productmanufacturingSiteFrm.patchValue(data.data);
    this.isproductmanSiteDetailsModalShow = true;
  }
  else {
    this.productapimanufacturingSiteFrm.patchValue(data.data);
    this.isapimanSiteDetailsModalShow = true;

  }
  this.isproductManufacturerModalShow = false;
}//productgmpInspectionData
funcSelectManufacturingSite(data) {

  this.productmanufacturingSiteFrm.patchValue(data.data);
    this.isproductmanSiteDetailsModalShow = true;
  this.isproductManufactureringSiteModalShow = false;
}
onLoadgmpProductLineData(manufacturing_site_id) {

  this.appService.getProductsOtherDetails({ manufacturing_site_id: manufacturing_site_id }, 'getgmpProductLineDatadetails')
    //.pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.gmpProductLineData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }

      },
      error => {
        return false
      });
}

onsaveAPIManufacturingSite() {
  this.spinner.show();
  let manufacturer_id = this.productapimanufacturingSiteFrm.get('manufacturer_id').value;
  let active_ingredient_id = this.productapimanufacturingSiteFrm.get('active_ingredient_id').value;
  this.appService.onSaveProductOtherDetails('wb_product_manufacturers', { manufacturer_id: manufacturer_id, active_ingredient_id: active_ingredient_id, product_id: this.product_id, manufacturer_type_id: this.manufacturer_type_id }, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadapiManufacturersData(this.product_id);
          this.isproductmanSiteDetailsModalShow = false;
          this.isapimanSiteDetailsModalShow = false;
          this.toastr.success(this.product_resp.message, 'Response');
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
      });
}onManufacturingSitePreparing(e) {
  this.tbisReadOnly = false;
  this.functDataGridToolbar(e, this.funcAddManufactureringSite, 'Manufacturering Site');
}
funcAddManufactureringSite() {
  let product_origin_id = this.product_origin_id;
  this.product_origin_id = this.productGeneraldetailsfrm.get('product_origin_id').value;
  this.isnewmanufactureringSiteDetailsModalShow = true;
    this.isproductManufacturerModalShow = false;

   this.manufacturingSiteFrm.reset();

   let manufacturer_id = this.productmanufacturingSiteFrm.get('manufacturer_id').value;
   this.manufacturingSiteFrm.get('manufacturer_id').setValue(manufacturer_id);

   if(this.product_origin_id == 2){

      this.onLoadCountries(1);
}
}OnAddNewManufacturerReionDetails(){
  let country_id = this.manufacturerFrm.get('country_id').value;
  this.addRegionDetailsFrm.reset();
  if(country_id >0){
    this.addRegionDetailsFrm.get('country_id').setValue(country_id);
   
    this.addRegionDetailsWin = true;
  }
  else{
    this.toastr.error('Select Country before you add a new Region', 'Alert');
  }

}

OnAddNewManufactureDistrictDetails(){
  let region_id = this.manufacturerFrm.get('region_id').value;
  
  this.addDistrictsDetailsFrm.reset();
  if(region_id >0){
    this.addDistrictsDetailsFrm.get('region_id').setValue(region_id);
   
    this.addDistrictsDetailsWin = true;
  }
  else{
    this.toastr.error('Select Region before you add a new District', 'Alert');
  }

}
OnAddNewSiteDistrictDetails(){
  let region_id = this.manufacturingSiteFrm.get('region_id').value;
  
  this.addDistrictsDetailsFrm.reset();
  if(region_id>0){
    this.addDistrictsDetailsFrm.get('region_id').setValue(region_id);
   
    this.addDistrictsDetailsWin = true;
  }
  else{
    this.toastr.error('Select Region before you add a new District', 'Alert');
  }

}
OnAddNewSiteReionDetails(){
  let country_id = this.manufacturingSiteFrm.get('country_id').value;
  
  this.addRegionDetailsFrm.reset();
  if(country_id >0){
    this.addRegionDetailsFrm.get('country_id').setValue(country_id);
   
    this.addRegionDetailsWin = true;
  }
  else{
    this.toastr.error('Select Country before you add a new REgion', 'Alert');
  }

}
onSaveRegiondetails(){
  this.spinner.show();
  this.addRegionDetailsFrm.get('tablename').setValue('par_regions');
  this.utilityService.onsaveApplicationUniformDetails('', this.addRegionDetailsFrm.value, 'onSaveUniformConfigData')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadRegions(this.country_id);
       
        this.addRegionDetailsWin = false;
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
onSaveaddDistrictDetails(){
  this.spinner.show();
  this.addDistrictsDetailsFrm.get('tablename').setValue('par_districts');
  this.utilityService.onsaveApplicationUniformDetails('', this.addDistrictsDetailsFrm.value, 'onSaveUniformConfigData')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadDistricts(this.region_id);
       
        this.addDistrictsDetailsWin = false;
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
onAddManufacturerDetails() {
  this.spinner.show();
  let manufacturer_name = this.manufacturerFrm.get('name').value;
  this.appService.onAddManufacturingSite('tra_manufacturers_information',  this.manufacturerFrm.value)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.isnewmanufacturerModalShow = false;
          this.isproductManufacturerModalShow = false;
  
          let manufacturer_id =this.product_resp.record_id;
          //load Manufactureing Sites 
          if (this.manufacturer_type_id == 1) {
            this.isproductmanSiteDetailsModalShow = true;
            this.productmanufacturingSiteFrm.get('manufacturer_id').setValue(manufacturer_id)
            this.productmanufacturingSiteFrm.get('manufacturer_name').setValue(manufacturer_name)
           

          }
          else {
            
            this.isapimanSiteDetailsModalShow = true;
            this.productapimanufacturingSiteFrm.get('manufacturer_id').setValue(manufacturer_id)
            this.productapimanufacturingSiteFrm.get('name').setValue(manufacturer_name)
          
          }

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


onSearchInspectedManufacturingSites(){
 
  this.isgmpinspectionModalShow = true;
  this.loadAddProdGmpInspectionDetails();

}
funcSelectGmpInspection(data) {
  //gmp_site_id
  let gmp_data = data.data;

  this.prodgmpAddinspectionFrm.patchValue(data.data);
  this.isgmpAddinspectionModalShow = true;
  let manufacturing_site_id = data.data.manufacturing_site_id;

  this.productmanufacturingSiteFrm.get('inspected_site_name').setValue(gmp_data.inspected_site_name);
  this.productmanufacturingSiteFrm.get('reg_site_id').setValue(gmp_data.reg_site_id);
  this.productmanufacturingSiteFrm.get('gmp_application_code').setValue(gmp_data.gmp_application_code);
 
  this.onLoadgmpProductLineData(manufacturing_site_id);

}
}
