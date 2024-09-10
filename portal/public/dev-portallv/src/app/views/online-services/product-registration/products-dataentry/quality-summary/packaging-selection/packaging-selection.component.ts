import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, Inject, Input } from '@angular/core';
import { SharedProductregistrationclassComponent } from '../../../shared-productregistrationclass/shared-productregistrationclass.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
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
  selector: 'app-packaging-selection',
  templateUrl: './packaging-selection.component.html',
  styleUrls: ['./packaging-selection.component.css']
})
export class PackagingSelectionComponent extends SharedProductregistrationclassComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
@ViewChild(ArchwizardModule)

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  initWizardPanel:number = 0;

  @Input() application_code: number;
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() drugscommonNamesData:number;
  @Input() product_type_id:number;
  @Input() product_id: number;
  @Input() isReadOnly:boolean;
  drugsPackagingData:any;
  containerTypeData:any;
  diluentsProductPackagingData:any;
  primaryPackagingdetailsfrm: FormGroup;
  secondaryPackagingdetailsfrm:FormGroup;
  productTertiarydetailsfrm:FormGroup;
  otherPackagingdetailsfrm:FormGroup;
  shippersPackagingdetailsfrm:FormGroup;
  diluentPackagingdetailsfrm:FormGroup;
  productPackagingModal:boolean= false;
  productpackagingDiluentsModal:boolean= false;
  is_container_type_vial:boolean = false;
  is_not_container_type_vial:boolean = false;
  packaging_readOnly:boolean = false;
  is_readOnly:boolean = false;
  containerMaterialData:any;
  diluentData:any;
  containerData:any;
  siUnitsData:any;
  packagingUnitsData:any;
  product_resp:any;
  has_quantity:number;
  primary_id:number;

  ngOnInit() {

    this.primaryPackagingdetailsfrm = new FormGroup({
      active_common_name_id:new FormControl(Validators.compose([])),
      container_id: new FormControl('', Validators.compose([Validators.required])),
      container_material_id: new FormControl('', Validators.compose([Validators.required])),
      no_of_units: new FormControl('', Validators.compose([])),
      no_of_packs: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      si_unit_id: new FormControl('', Validators.compose([])),
      description_of_packaging: new FormControl('', Validators.compose([Validators.required]))

    });
  this.secondaryPackagingdetailsfrm = new FormGroup({
      secondary_container_id: new FormControl('', Validators.compose([Validators.required])),
      secondary_container_material_id: new FormControl('', Validators.compose([Validators.required])),
      secondary_no_of_units: new FormControl('', Validators.compose([])),
      secondary_no_of_packs: new FormControl('', Validators.compose([])),
      secondary_si_unit_id: new FormControl('', Validators.compose([])),
      secondary_description: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });
    this.productTertiarydetailsfrm = new FormGroup({
      tertiary_container_id: new FormControl('', Validators.compose([Validators.required])),
      tertiary_container_material_id: new FormControl('', Validators.compose([Validators.required])),
      tertiary_no_of_units: new FormControl('', Validators.compose([])),
      tertiary_no_of_packs: new FormControl('', Validators.compose([])),
      tertiary_si_unit_id: new FormControl('', Validators.compose([])),
      tertiary_description: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });

    this.otherPackagingdetailsfrm = new FormGroup({
      other_container_id: new FormControl('', Validators.compose([Validators.required])),
      other_container_material_id: new FormControl('', Validators.compose([Validators.required])),
      other_no_of_units: new FormControl('', Validators.compose([])),
      other_no_of_packs: new FormControl('', Validators.compose([])),
      other_si_unit_id: new FormControl('', Validators.compose([])),
      other_description: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });
    this.shippersPackagingdetailsfrm = new FormGroup({
      shipper_container_id: new FormControl('', Validators.compose([Validators.required])),
      shipper_container_material_id: new FormControl('', Validators.compose([Validators.required])),
      shipper_no_of_units: new FormControl('', Validators.compose([])),
      shipper_no_of_packs: new FormControl('', Validators.compose([])),
      shipper_si_unit_id: new FormControl('', Validators.compose([])),
      shipper_description: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });
    this.diluentPackagingdetailsfrm = new FormGroup({
      container_id: new FormControl('', Validators.compose([Validators.required])),
      container_material_id: new FormControl('', Validators.compose([Validators.required])),
      diluent_id: new FormControl('', Validators.compose([Validators.required])),
      secondary_no_of_units: new FormControl('', Validators.compose([Validators.required])),
      no_of_units: new FormControl('', Validators.compose([])),
      no_of_packs: new FormControl('', Validators.compose([])),
      si_unit_id: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      pack_id: new FormControl('', Validators.compose([])),
    });


    this.onLoadSiUnits(this.section_id);
    this.onLoadpackagingUnitsData(this.section_id);
    this.onLoadcontainerMaterialData(this.section_id)
    this.onLoadcontainerData(this.section_id);
    this.onLoadcontainerTypeDataData(this.section_id)
    this.OnLoadProductsPackagingMaterials(this.product_id);
    this.OnLoadProductsPackagingDiluents(this.product_id);
    this.OnLoadProductsCommonName(this.product_id);
    this.onLoaddiluentsData();

  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  onProdPackagingPreparing(e) {
    this.is_readOnly= true;
    this.functDataGridToolbar(e, this.funcAddProductPackagingDetails, 'Product Packaging');
  } 

  funcAddProductPackagingDetails() {
    this.productPackagingModal= true;
    this.primaryPackagingdetailsfrm.reset();
    this.secondaryPackagingdetailsfrm.reset();
    this.productTertiarydetailsfrm.reset();
    this.otherPackagingdetailsfrm.reset();
    this.shippersPackagingdetailsfrm.reset();
    this.diluentPackagingdetailsfrm.reset();
    this.wizard.model.navigationMode.goToStep(0);
    this.packaging_readOnly = false;
    this.is_readOnly= true;


  } 

  onProdDiluentsPackagingPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddDiluentsPackagingDetails, 'Diluents Details');
  }  
  funcAddDiluentsPackagingDetails() {
    this.diluentPackagingdetailsfrm.reset();
    this.productpackagingDiluentsModal= true;
    this.onLoaddiluentsData();

  }

funViewDetails(data) {
    this.primaryPackagingdetailsfrm.patchValue(data.data);
    this.secondaryPackagingdetailsfrm.patchValue(data.data);
    this.productTertiarydetailsfrm.patchValue(data.data);
    this.otherPackagingdetailsfrm.patchValue(data.data);
    this.shippersPackagingdetailsfrm.patchValue(data.data);
    this.productPackagingModal= true;
    this.packaging_readOnly = true;
    this.is_readOnly= false;


  }


  adjustTextAreaHeight(event: any): void {
  const textarea = event.target;
  textarea.style.overflow = 'hidden'; // Hide any overflow content
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
} 

  onLoadcontainerMaterialData(section_id) {
    var data = {
      table_name: 'par_containers_materials'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerMaterialData = data;
        });
  }  
 onLoaddiluentsData() {
    var data = {
      table_name: 'par_diluents'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.diluentData = data;
        });
  }  


  onLoadcontainerTypeDataData(section_id) {
    var data = {
      table_name: 'par_containers_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerTypeData = data;
        });
  }onLoadpackagingUnitsData(section_id) {
    var data = {
      table_name: 'par_packaging_units',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.packagingUnitsData = data;
        });
  }

OnLoadProductsCommonName(product_id) {

  this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsCommonName')
    //.pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.drugscommonNamesData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }

      },
      error => {
        return false
      });
}

  OnLoadProductsPackagingMaterials(product_id) {

  this.appService.getProductsOtherDetails({ product_id: product_id }, 'getproductPackagingDetails')
    //.pipe(first())
    .subscribe(
      data => {
        this.drugsPackagingData = data.data;
      },
      error => {
        return false
      });
}  

  OnLoadProductsPackagingDiluents(product_id) {
    const pack_id = this.primary_id
  this.appService.getProductsOtherDetails({ product_id: product_id,pack_id:pack_id}, 'getDiluentPackagingDetails')
    //.pipe(first())
    .subscribe(
      data => {
        this.diluentsProductPackagingData = data.data;
      },
      error => {
        return false
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
        //disabled: this.tbisReadOnly,
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
funcEditPackagingDetails(data) {
  this.primaryPackagingdetailsfrm.patchValue(data.data);
  this.productPackagingModal = true;
  this.packaging_readOnly = false;
  this.is_readOnly= true;
}funcDeletePackDetails(data) {
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
                  
                    this.OnLoadProductsPackagingMaterials(appproduct_id);
                  
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
 onLoadSiUnits(section_id) {
    var data = {
      table_name: 'si_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.siUnitsData = data;
        });
  }

onLoadcontainerData(section_id) {
    var data = {
      table_name: 'par_containers'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerData = data;
        });
    }
onSaveProductPackaging() {
    const invalid = [];
    const controls = this.primaryPackagingdetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.primaryPackagingdetailsfrm.invalid) {
      return;
    }

  this.appService.onSaveProductOtherDetails('wb_product_packaging', this.primaryPackagingdetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        if (this.product_resp.success) {
          this.toastr.success(this.product_resp.message, 'Response');
          const primary_id =this.product_resp.data.record_id;
          this.primary_id =primary_id;
          this.secondaryPackagingdetailsfrm.get('id').patchValue(this.primary_id);
          this.productTertiarydetailsfrm.get('id').patchValue(this.primary_id);
          this.otherPackagingdetailsfrm.get('id').patchValue(this.primary_id);
          this.shippersPackagingdetailsfrm.get('id').patchValue(this.primary_id);
          this.wizard.model.navigationMode.goToStep(1);
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
 
      });
}

   onContainerTypeDetails($event) {
      this.has_quantity = $event.selectedItem.has_quantity;
      if (this.has_quantity == 1) {
          this.is_container_type_vial = true;
          this.is_not_container_type_vial = false;
          this.primaryPackagingdetailsfrm.get('no_of_units').clearValidators();
          this.primaryPackagingdetailsfrm.get('no_of_units').updateValueAndValidity();
          this.primaryPackagingdetailsfrm.get('no_of_packs').setValidators(Validators.required);
          this.primaryPackagingdetailsfrm.get('no_of_packs').updateValueAndValidity();
          this.primaryPackagingdetailsfrm.get('si_unit_id').setValidators(Validators.required);
          this.primaryPackagingdetailsfrm.get('si_unit_id').updateValueAndValidity();
      } else {
          this.is_container_type_vial = false;
          this.is_not_container_type_vial = true;
          this.primaryPackagingdetailsfrm.get('no_of_packs').clearValidators();
          this.primaryPackagingdetailsfrm.get('no_of_packs').updateValueAndValidity();
          this.primaryPackagingdetailsfrm.get('si_unit_id').clearValidators();
          this.primaryPackagingdetailsfrm.get('si_unit_id').updateValueAndValidity();
          this.primaryPackagingdetailsfrm.get('no_of_units').setValidators(Validators.required);
          this.primaryPackagingdetailsfrm.get('no_of_units').updateValueAndValidity();
          this.primaryPackagingdetailsfrm.get('no_of_units').setValue(1);
      }


}
   onSecondaryContainerTypeDetails($event) {
      this.has_quantity = $event.selectedItem.has_quantity;
      if (this.has_quantity == 1) {
          this.is_container_type_vial = true;
          this.is_not_container_type_vial = false;
          this.secondaryPackagingdetailsfrm.get('secondary_no_of_units').clearValidators();
          this.secondaryPackagingdetailsfrm.get('secondary_no_of_units').updateValueAndValidity();
          this.secondaryPackagingdetailsfrm.get('secondary_no_of_packs').setValidators(Validators.required);
          this.secondaryPackagingdetailsfrm.get('secondary_no_of_packs').updateValueAndValidity();
          this.secondaryPackagingdetailsfrm.get('secondary_si_unit_id').setValidators(Validators.required);
          this.secondaryPackagingdetailsfrm.get('secondary_si_unit_id').updateValueAndValidity();
      } else {
          this.is_container_type_vial = false;
          this.is_not_container_type_vial = true;

          this.secondaryPackagingdetailsfrm.get('secondary_no_of_packs').clearValidators();
          this.secondaryPackagingdetailsfrm.get('secondary_no_of_packs').updateValueAndValidity();
          this.secondaryPackagingdetailsfrm.get('secondary_si_unit_id').clearValidators();
          this.secondaryPackagingdetailsfrm.get('secondary_si_unit_id').updateValueAndValidity();
          this.secondaryPackagingdetailsfrm.get('secondary_no_of_units').setValidators(Validators.required);
          this.secondaryPackagingdetailsfrm.get('secondary_no_of_units').updateValueAndValidity();
          this.secondaryPackagingdetailsfrm.get('secondary_no_of_units').setValue(1);
      }


}

   onTertiaryContainerTypeDetails($event) {
      this.has_quantity = $event.selectedItem.has_quantity;
      if (this.has_quantity == 1) {
          this.is_container_type_vial = true;
          this.is_not_container_type_vial = false;
          this.productTertiarydetailsfrm.get('tertiary_no_of_units').clearValidators();
          this.productTertiarydetailsfrm.get('tertiary_no_of_units').updateValueAndValidity();
          this.productTertiarydetailsfrm.get('tertiary_no_of_packs').setValidators(Validators.required);
          this.productTertiarydetailsfrm.get('tertiary_no_of_packs').updateValueAndValidity();
          this.productTertiarydetailsfrm.get('tertiary_si_unit_id').setValidators(Validators.required);
          this.productTertiarydetailsfrm.get('tertiary_si_unit_id').updateValueAndValidity();
      } else {
          this.is_container_type_vial = false;
          this.is_not_container_type_vial = true;
          this.productTertiarydetailsfrm.get('tertiary_no_of_packs').clearValidators();
          this.productTertiarydetailsfrm.get('tertiary_no_of_packs').updateValueAndValidity();
          this.productTertiarydetailsfrm.get('tertiary_si_unit_id').clearValidators();
          this.productTertiarydetailsfrm.get('tertiary_si_unit_id').updateValueAndValidity();
          this.productTertiarydetailsfrm.get('tertiary_no_of_units').setValidators(Validators.required);
          this.productTertiarydetailsfrm.get('tertiary_no_of_units').updateValueAndValidity();
          this.productTertiarydetailsfrm.get('tertiary_no_of_units').setValue(1);
      }


}

   onShippersContainerTypeDetails($event) {
      this.has_quantity = $event.selectedItem.has_quantity;
      if (this.has_quantity == 1) {
          this.is_container_type_vial = true;
          this.is_not_container_type_vial = false;

          this.shippersPackagingdetailsfrm.get('shipper_no_of_units').clearValidators();
          this.shippersPackagingdetailsfrm.get('shipper_no_of_units').updateValueAndValidity();
          this.shippersPackagingdetailsfrm.get('shipper_no_of_packs').setValidators(Validators.required);
          this.shippersPackagingdetailsfrm.get('shipper_no_of_packs').updateValueAndValidity();
          this.shippersPackagingdetailsfrm.get('shipper_si_unit_id').setValidators(Validators.required);
          this.shippersPackagingdetailsfrm.get('shipper_si_unit_id').updateValueAndValidity();
      } else {
          this.is_container_type_vial = false;
          this.is_not_container_type_vial = true;

          this.shippersPackagingdetailsfrm.get('shipper_no_of_packs').clearValidators();
          this.shippersPackagingdetailsfrm.get('shipper_no_of_packs').updateValueAndValidity();
          this.shippersPackagingdetailsfrm.get('shipper_si_unit_id').clearValidators();
          this.shippersPackagingdetailsfrm.get('shipper_si_unit_id').updateValueAndValidity();
          this.shippersPackagingdetailsfrm.get('shipper_no_of_units').setValidators(Validators.required);
          this.shippersPackagingdetailsfrm.get('shipper_no_of_units').updateValueAndValidity();
          this.shippersPackagingdetailsfrm.get('shipper_no_of_units').setValue(1);
      }


}



   onOtherContainerTypeDetails($event) {
      this.has_quantity = $event.selectedItem.has_quantity;
      if (this.has_quantity == 1) {
          this.is_container_type_vial = true;
          this.is_not_container_type_vial = false;

          this.otherPackagingdetailsfrm.get('other_no_of_packs').setValidators(Validators.required);
          this.otherPackagingdetailsfrm.get('other_no_of_packs').updateValueAndValidity();
          this.otherPackagingdetailsfrm.get('other_si_unit_id').setValidators(Validators.required);
          this.otherPackagingdetailsfrm.get('other_si_unit_id').updateValueAndValidity();
          this.otherPackagingdetailsfrm.get('other_no_of_units').clearValidators();
          this.otherPackagingdetailsfrm.get('other_no_of_units').updateValueAndValidity();
      } else {
          this.is_container_type_vial = false;
          this.is_not_container_type_vial = true;

          this.otherPackagingdetailsfrm.get('other_no_of_packs').clearValidators();
          this.otherPackagingdetailsfrm.get('other_no_of_packs').updateValueAndValidity();
          this.otherPackagingdetailsfrm.get('other_si_unit_id').clearValidators();
          this.otherPackagingdetailsfrm.get('other_si_unit_id').updateValueAndValidity();
          this.otherPackagingdetailsfrm.get('other_no_of_units').setValidators(Validators.required);
          this.otherPackagingdetailsfrm.get('other_no_of_units').updateValueAndValidity();
          this.otherPackagingdetailsfrm.get('other_no_of_units').setValue(1);
      }


}

   onDiluentsContainerTypeDetails($event) {
      this.has_quantity = $event.selectedItem.has_quantity;
      if (this.has_quantity == 1) {
          this.is_container_type_vial = true;
          this.is_not_container_type_vial = false;

          this.diluentPackagingdetailsfrm.get('no_of_packs').setValidators(Validators.required);
          this.diluentPackagingdetailsfrm.get('no_of_packs').updateValueAndValidity();
          this.diluentPackagingdetailsfrm.get('si_unit_id').setValidators(Validators.required);
          this.diluentPackagingdetailsfrm.get('si_unit_id').updateValueAndValidity();
          this.diluentPackagingdetailsfrm.get('no_of_units').clearValidators();
          this.diluentPackagingdetailsfrm.get('no_of_units').updateValueAndValidity();
      } else {
          this.is_container_type_vial = false;
          this.is_not_container_type_vial = true;

          this.diluentPackagingdetailsfrm.get('no_of_packs').clearValidators();
          this.diluentPackagingdetailsfrm.get('no_of_packs').updateValueAndValidity();
          this.diluentPackagingdetailsfrm.get('si_unit_id').clearValidators();
          this.diluentPackagingdetailsfrm.get('si_unit_id').updateValueAndValidity();
          this.diluentPackagingdetailsfrm.get('no_of_units').setValidators(Validators.required);
          this.diluentPackagingdetailsfrm.get('no_of_units').updateValueAndValidity();
          this.diluentPackagingdetailsfrm.get('no_of_units').setValue(1);
      }

}

onSaveSecondaryPackaging() {
     const invalid = [];
    const controls = this.secondaryPackagingdetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.secondaryPackagingdetailsfrm.invalid) {
      return;
    }

  this.appService.onSaveProductOtherDetails('wb_product_packaging', this.secondaryPackagingdetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.toastr.success(this.product_resp.message, 'Response');
          this.OnLoadProductsPackagingMaterials(this.product_id);
          this.wizard.model.navigationMode.goToStep(2);
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
 
      });
}
onSaveTertiaryPackaging() {
  this.spinner.show();
  this.appService.onSaveProductOtherDetails('wb_product_packaging', this.productTertiarydetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.toastr.success(this.product_resp.message, 'Response');
          this.OnLoadProductsPackagingMaterials(this.product_id);
          this.wizard.model.navigationMode.goToStep(3);
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
 
      });
}
onSaveOtherPackaging() {
  this.spinner.show();
  this.appService.onSaveProductOtherDetails('wb_product_packaging', this.otherPackagingdetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.toastr.success(this.product_resp.message, 'Response');
          this.OnLoadProductsPackagingMaterials(this.product_id);
          this.wizard.model.navigationMode.goToStep(4);

        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
 
      });
}
onSaveShippersPackaging() {
  this.spinner.show();
  this.appService.onSaveProductOtherDetails('wb_product_packaging', this.shippersPackagingdetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.toastr.success(this.product_resp.message, 'Response');
          this.OnLoadProductsPackagingMaterials(this.product_id);
          this.wizard.model.navigationMode.goToStep(5);

        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
 
      });
}
onSaveDiluentPackaging() {
    const primary_id =this.primary_id;
    this.diluentPackagingdetailsfrm.get('pack_id').patchValue(primary_id);
  this.appService.onSaveProductOtherDetails('wb_product_diluent_packaging', this.diluentPackagingdetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.toastr.success(this.product_resp.message, 'Response');
          this.OnLoadProductsPackagingMaterials(this.product_id);
          this.OnLoadProductsPackagingDiluents(this.product_id);
          this.productpackagingDiluentsModal= false;
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
 
      });
}
}
