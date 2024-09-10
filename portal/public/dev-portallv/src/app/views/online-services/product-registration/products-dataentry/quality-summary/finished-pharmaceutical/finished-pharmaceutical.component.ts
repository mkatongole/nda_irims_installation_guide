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
  selector: 'app-finished-pharmaceutical',
  templateUrl: './finished-pharmaceutical.component.html',
  styleUrls: ['./finished-pharmaceutical.component.css']
})
export class FinishedPharmaceuticalComponent extends SharedProductregistrationclassComponent{
 
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

  isDescriptionCompositionWinshow:boolean=false;
  isActivePharmaceuticalWinshow:boolean=false;
  isExcipientWinshow:boolean=false;
  isFormulationWinshow:boolean=false;
  isOveragesWinshow:boolean=false;
  isPhysicochemicalWinshow:boolean=false;
  isProcessDevWinshow:boolean=false;
  isContainerClosureWinshow:boolean=false;
  isMicrobiologicalWinshow:boolean=false;
  isCompatibilityWinshow:boolean=false;

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


  compositionFppData:any;
  activeAPIData:any;
  excipientData:any;
  formulationData:any;
  overagesData:any;
  physicochemicalData:any;
  processDevData:any;
  containerClosureData:any;
  microbiologicalData:any;
  compatibilityData:any;

  descriptionCompositionDetailsFrm:FormGroup;
  activePharmaceuticalDetailsFrm:FormGroup;
  excipientDetailsFrm:FormGroup;
  formulationDevelopmentDetailsFrm:FormGroup;
  overagesDetailsFrm:FormGroup;
  physicochemicalDetailsFrm:FormGroup;
  processDevelopmentDetailsFrm:FormGroup;
  containerClosureDetailsFrm:FormGroup;
  microbiologicalAttributtesDetailsFrm:FormGroup;
  compatibilityDetailsFrm:FormGroup;


  nomenclatureData:any;
  manufacturersData:any = {};
  manufacturer_type_id: number;
  manufacturer_id:number;
  addproductInclusionModal:boolean= false;
  isSampleDetailsWinshow:boolean=false;

 ngOnInit() { this.onLoadconfirmDataParmAll();
    
    this.onLoadSampleSubmissionData();
    this.onLoadActivePharmaceuticalData();

    this.descriptionCompositionDetailsFrm = new FormGroup({
      description_fpp: new FormControl('', Validators.compose([Validators.required])),
      composition_fpp: new FormControl('', Validators.compose([Validators.required])),
      composition_mixtures: new FormControl('', Validators.compose([Validators.required])),
      composition_all_components: new FormControl('', Validators.compose([Validators.required])),
      accompanying_reconstitution: new FormControl('', Validators.compose([Validators.required])),
      container_closure_fpp: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });

    this.activePharmaceuticalDetailsFrm = new FormGroup({
      discussion: new FormControl('', Validators.compose([Validators.required])),
      key_physicochemical_characteristics: new FormControl('', Validators.compose([Validators.required])),
      for_fixed_dose_combinations: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });

    this.excipientDetailsFrm = new FormGroup({
      discussion: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });


    
    this.formulationDevelopmentDetailsFrm = new FormGroup({
      summary_development_fpp: new FormControl('', Validators.compose([Validators.required])),
      biowaiver: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });

    this.overagesDetailsFrm = new FormGroup({
      information_on_primary: new FormControl('', Validators.compose([Validators.required])),
      overagge_summary: new FormControl('', Validators.compose([Validators.required])),
      summary_of_formulation: new FormControl('', Validators.compose([Validators.required])),
      information_on_correlation: new FormControl('', Validators.compose([Validators.required])),
      justification_for_scoring: new FormControl('', Validators.compose([Validators.required])),
      justification_overages: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });
    this.physicochemicalDetailsFrm = new FormGroup({
      parameters_relevant_performance: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });
  this.processDevelopmentDetailsFrm = new FormGroup({
      development_of_manufacturing: new FormControl('', Validators.compose([Validators.required])),
      diffrerence_manufacturing_process: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });
   this.containerClosureDetailsFrm = new FormGroup({
      suitability_container_closure: new FormControl('', Validators.compose([Validators.required])),
      summary_study_results: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });

    this.microbiologicalAttributtesDetailsFrm = new FormGroup({
      discussion_microbiological_attributes: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });
  this.compatibilityDetailsFrm = new FormGroup({
      discussion_compatibility_fpp: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
      
    });
 

    this.autoLoadProductsOtherDetails(this.product_id);
    this.autoLoadedParameters(this.section_id);
    this.onLoadCountries();
  } 
  autoLoadProductsOtherDetails(product_id) {
    this.OnLoadDescriptionComposition(product_id);
    this.OnLoadActiveIngredient(product_id);
    this.OnLoadExcipients(product_id);
    this.OnLoadFormulation(product_id);
    this.OnLoadOverage(product_id);
    this.OnLoadPhysicochemical(product_id);
    this.OnLoadProcessDevelopment(product_id);    
    this.OnLoadContainer(product_id);    
    this.OnLoadMicrobiological(product_id);    
    this.OnLoadCompatibility(product_id);

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



  onLoadingredientsData125(section_id) {
    var data = {
      table_name: 'par_ingredients_details',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ingredientsData = data;
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
  onCompositionPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddCompositionDescription, 'Description and Composition');
  }
  funcAddCompositionDescription() {

    this.isDescriptionCompositionWinshow = true;
    this.descriptionCompositionDetailsFrm.reset();

  }
  ActivePharmIngredient(e) {
    this.functDataGridToolbar(e, this.funcAddActivePharmaceutical, 'Active Pharmaceutical Ingredient');
  }

  onExcipientPrepairing(e) {
    this.functDataGridToolbar(e, this.funcAddExcipient, 'Excipients');
  }
  funcAddActivePharmaceutical() {
    
    this.isActivePharmaceuticalWinshow = true;
    this.activePharmaceuticalDetailsFrm.reset();

  }
  funcAddExcipient() {
    
    this.isExcipientWinshow = true;
    this.excipientDetailsFrm.reset();

  }




  onFormulationPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddFormulation, 'Formulation');
  }
  funcAddFormulation() {
    
    this.isFormulationWinshow = true;
    this.formulationDevelopmentDetailsFrm.reset();

  }
  onOveragesPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddOverages, 'Overages');
  }

  onPhysicochemicalPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddPhysicochemical, 'Physicochemical and Biological Properties');
  }  
  onProcessDevPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddProcessDev, 'Process Development');
  }
  onContainerClosurePreparing(e) {
    this.functDataGridToolbar(e, this.funcAddContainerClosure, 'Container Closure System');
  }
  onMicrobiologicalPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddMicrobiological, 'Microbiological Attributes');
  }
  onCompatibilityPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddCompatitbility, 'Compatibility');
  }

  funcAddOverages() {
    this.isOveragesWinshow = true;
    this.overagesDetailsFrm.reset();

  }
  funcAddPhysicochemical() {
    this.isPhysicochemicalWinshow = true;
    this.physicochemicalDetailsFrm.reset();

  }

  funcAddProcessDev() {
    this.isProcessDevWinshow = true;
    this.processDevelopmentDetailsFrm.reset();

  }

  funcAddContainerClosure() {
    this.isContainerClosureWinshow = true;
    this.containerClosureDetailsFrm.reset();

  }
  funcAddMicrobiological() {
    this.isMicrobiologicalWinshow = true;
    this.microbiologicalAttributtesDetailsFrm.reset();

  }
  funcAddCompatitbility() {
    this.isCompatibilityWinshow = true;
    this.compatibilityDetailsFrm.reset();

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
                  if (reload_type == 'description_composition') {
                    this.OnLoadDescriptionComposition(appproduct_id);

                  }else if (reload_type == 'active_ingredients') {
                    this.OnLoadActiveIngredient(appproduct_id);

                  }else if (reload_type == 'excipients') {
                    this.OnLoadExcipients(appproduct_id);

                  }else if (reload_type == 'formulation') {
                    this.OnLoadFormulation(appproduct_id);

                  }else if (reload_type == 'overage') {
                    this.OnLoadOverage(appproduct_id);

                  }else if (reload_type == 'physicochemical') {
                    this.OnLoadPhysicochemical(appproduct_id);

                  }else if (reload_type == 'process_dev') {
                    this.OnLoadProcessDevelopment(appproduct_id);

                  }else if (reload_type == 'container_closure') {
                    this.OnLoadContainer(appproduct_id);

                  }else if (reload_type == 'microbiological_attributes') {
                    this.OnLoadMicrobiological(appproduct_id);

                  }else if (reload_type == 'compatibility') {
                    this.OnLoadCompatibility(appproduct_id);

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

  this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsGeneralProperties')
    //.pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.generalPropertiesData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }

      },
      error => {
        return false
      });
}

OnLoadDescriptionComposition(product_id) {
    var data = {
      table_name: 'tra_description_composition',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.compositionFppData = data.data;
        });
  }

OnLoadActiveIngredient(product_id) {
    var data = {
      table_name: 'tra_active_pharmaceuticals',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.activeAPIData = data.data;
        });
  }

OnLoadExcipients(product_id) {
    var data = {
      table_name: 'tra_excipients',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.excipientData = data.data;
        });
  }

OnLoadFormulation(product_id) {
    var data = {
      table_name: 'tra_dossier_formulation',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.formulationData = data.data;
        });
  }

OnLoadOverage(product_id) {
    var data = {
      table_name: 'tra_dossier_overage',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.overagesData = data.data;
        });
  }

OnLoadPhysicochemical(product_id) {
    var data = {
      table_name: 'tra_physiochemical_properties',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.physicochemicalData = data.data;
        });
  }
OnLoadProcessDevelopment(product_id) {
    var data = {
      table_name: 'tra_manprocess_development',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.processDevData = data.data;
        });
  }
OnLoadContainer(product_id) {
    var data = {
      table_name: 'tra_containers_close',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.containerClosureData = data.data;
        });
  }

OnLoadMicrobiological(product_id) {
    var data = {
      table_name: 'tra_microbiological_attributtes',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.microbiologicalData = data.data;
        });
  }


OnLoadCompatibility(product_id) {
    var data = {
      table_name: 'tra_compatibility',
      product_id: product_id
    };
    this.config.getProductsQualitySummaryDetails(data)
      .subscribe(
        data => {
          this.compatibilityData = data.data;
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
onSaveDescriptionCompositionDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_description_composition', this.descriptionCompositionDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadDescriptionComposition(appproduct_id);
         
          this.isDescriptionCompositionWinshow = false;
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
onSaveActivePharmaceuticalDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_active_pharmaceuticals', this.activePharmaceuticalDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadActiveIngredient(appproduct_id);
         
          this.isActivePharmaceuticalWinshow = false;
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

onSaveExcipientsDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_excipients', this.excipientDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadExcipients(appproduct_id);
         
          this.isExcipientWinshow = false;
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


onSaveFormulationDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_dossier_formulation', this.formulationDevelopmentDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadFormulation(appproduct_id);
         
          this.isFormulationWinshow = false;
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


onSavePhysicochemicalDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_physiochemical_properties', this.physicochemicalDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadPhysicochemical(appproduct_id);
         
          this.isPhysicochemicalWinshow = false;
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

onSaveProcessDevelopmentDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_manprocess_development', this.processDevelopmentDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadProcessDevelopment(appproduct_id);
         
          this.isProcessDevWinshow = false;
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
onSaveContainerCloseDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_containers_close', this.containerClosureDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadContainer(appproduct_id);
         
          this.isContainerClosureWinshow = false;
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
onSaveMicrobiologicalDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_microbiological_attributtes', this.microbiologicalAttributtesDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadMicrobiological(appproduct_id);
         
          this.isMicrobiologicalWinshow = false;
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
onSaveCompatibilityDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_compatibility', this.compatibilityDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadCompatibility(appproduct_id);
         
          this.isCompatibilityWinshow = false;
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
  

onSaveOveragesDetails() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductQualitySummaryDetails('tra_dossier_overage', this.overagesDetailsFrm.value, this.product_id,this.application_code)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadOverage(appproduct_id);
          this.isOveragesWinshow = false;
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
