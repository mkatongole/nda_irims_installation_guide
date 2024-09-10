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
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent extends SharedProductregistrationclassComponent{
 
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
  isNomenclatureDetailsWinshow:boolean=false;
  isStructureDetailsWinshow:boolean=false;
  isGeneralPropertiesWinshow:boolean=false;
  isapimanSiteDetailsModalShow:boolean= false;
  siUnitsData:any;
  specificationData:any;
  reasonForInclusionData:any;
  containerMaterialData:any;
  containerData:any;
  generalPropertiesData:any;
  manufacturingRoleDataSource: any;
  manufacturingRoleData:any;
  countries: any;
  regions: any;
  districts: any;
  country_id:number;
  region_id:number;
  ingredientTypeData:any;
  containerTypeData:any;
  tbisReadOnly:boolean;

  nomenclatureDetailsFrm:FormGroup;
  structureDetailsFrm:FormGroup;
  generalPropertiesDetailsFrm:FormGroup;
  nomenclatureData:any;
  structureData:any;
  manufacturersData:any = {};
  manufacturer_type_id: number;
  manufacturer_id:number;
  addproductInclusionModal:boolean= false;
  isSampleDetailsWinshow:boolean=false;

 ngOnInit() { this.onLoadconfirmDataParmAll();
    
    this.onLoadSampleSubmissionData();
    this.onLoadActivePharmaceuticalData();

    this.nomenclatureDetailsFrm = new FormGroup({
      international_non_proprietary_name: new FormControl('', Validators.compose([Validators.required])),
      compendial_name: new FormControl('', Validators.compose([Validators.required])),
      chemical_name: new FormControl('', Validators.compose([Validators.required])),
      laboratory_code: new FormControl('', Validators.compose([])),
      other_non_proprietary_name: new FormControl('', Validators.compose([Validators.required])),
      registry_no: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });



    this.structureDetailsFrm = new FormGroup({      
      structure: new FormControl('', Validators.compose([Validators.required])),
      molecular_formular: new FormControl('', Validators.compose([Validators.required])),
      relative_molecular_mass: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });


    this.generalPropertiesDetailsFrm = new FormGroup({
      physical_description: new FormControl('', Validators.compose([Validators.required])),
      solubilities: new FormControl('', Validators.compose([Validators.required])),
      polymorphic_form: new FormControl('', Validators.compose([])),
      potential_isomerism: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      other_property: new FormControl('', Validators.compose([])),
    });


    this.autoLoadProductsOtherDetails(this.product_id);
    this.autoLoadedParameters(this.section_id);
    this.onLoadCountries();
  } 
  autoLoadProductsOtherDetails(product_id) {
    this.OnLoadGeneralProperties(product_id);
    this.OnLoadNomenclature(product_id);
    this.OnLoadStructure(product_id);

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
  onSaveReasonForInclusion(){
    this.addIngredientsdetailsfrm.get('tablename').setValue('par_inclusions_reasons')
    this.addIngredientsdetailsfrm.get('section_id').setValue(this.section_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addIngredientsdetailsfrm.value, 'onsaveProductConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onLoadreasonForInclusionData(this.section_id);
         
          this.addproductInclusionModal = false;
          this.productIngredientsdetailsfrm.get('inclusion_reason_id').setValue(this.product_resp.record_id)
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

  autoLoadedParameters(section_id) {
   
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



  onNomenclaturePreparing(e) {
    this.functDataGridToolbar(e, this.funcAddNomenclature, 'Nomenclature');
  }

  onStructurePreparing(e) {
    this.functDataGridToolbar(e, this.funcAddStructure, 'Structure');
  }

  funcAddNomenclature() {
    
    this.isNomenclatureDetailsWinshow = true;
    this.nomenclatureDetailsFrm.reset();

  }

   funcAddStructure() {
    
    this.isStructureDetailsWinshow = true;
    this.structureDetailsFrm.reset();

  }

  onGeneralPropertiesPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddGeneralProperties, 'General Properties');
  }
  funcAddGeneralProperties() {
    
    this.isGeneralPropertiesWinshow = true;
    this.generalPropertiesDetailsFrm.reset();

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
                  if (reload_type == 'general_properties') {
                    this.OnLoadGeneralProperties(appproduct_id);

                  }
                  else if (reload_type == 'nomenclature') {
                    this.OnLoadNomenclature(appproduct_id);

                  } else if (reload_type == 'structure') {
                    this.OnLoadStructure(appproduct_id);

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


OnLoadGeneralProperties(product_id) {
    var data = {
      table_name: 'tra_general_properties',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.generalPropertiesData = data.data;
        });
  }


OnLoadNomenclature(product_id) {
    var data = {
      table_name: 'tra_nomenclature_structure',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.nomenclatureData = data.data;
        });
  }

OnLoadStructure(product_id) {
    var data = {
      table_name: 'tra_structure',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.structureData = data.data;
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
onSaveNomenclatureDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_nomenclature_structure', this.nomenclatureDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadNomenclature(appproduct_id);
         
          this.isNomenclatureDetailsWinshow = false;
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
onSaveStructureDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_structure', this.structureDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadStructure(appproduct_id);
         
          this.isStructureDetailsWinshow = false;
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




onSaveActiveGeneralPropertiesDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_general_properties', this.generalPropertiesDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadGeneralProperties(appproduct_id);
         
          this.isGeneralPropertiesWinshow = false;
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


onManufacturingSitePreparing(e) {
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
