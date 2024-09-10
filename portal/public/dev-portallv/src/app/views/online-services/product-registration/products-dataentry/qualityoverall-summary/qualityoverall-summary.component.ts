import { Component,  Input, ViewContainerRef, ViewChild } from '@angular/core';
import { SharedProductregistrationclassComponent } from '../../shared-productregistrationclass/shared-productregistrationclass.component';
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
  selector: 'app-qualityoverall-summary',
  templateUrl: './qualityoverall-summary.component.html',
  styleUrls: ['./qualityoverall-summary.component.css']
})
export class QualityoverallSummaryComponent extends SharedProductregistrationclassComponent{
@ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

 @Input() initqualitysummaryresponsefrm: FormGroup;
  @Input() sub_module_id: number;
  @Input() drugApiData:any;
  @Input() drugsManufactureData:any;
  @Input() charactManufactureData:any;
  @Input() referenceStandardData:any;
  @Input() controlApiData:any;
  @Input() drugsGeneralData:any;
  @Input() product_id: number;
  @Input() section_id:number;
  @Input() application_code:number;
  @Input() overallQualitySummaryModal: boolean;
  @Input() isReadOnly: boolean;
  tbisReadOnly:boolean;


 
  ngOnInit() {    
    this.autoLoadProductsOtherDetails(this.product_id);

  }
  autoLoadProductsOtherDetails(product_id) {
    this.OnLoadQualitySummaryReport();

  }
 onQulitySummaryActivePreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddDrugsApi, 'Drug Substances');
  }
    funcAddDrugsApi() {
    
    this.overallQualitySummaryModal = true;
    this.initqualitysummaryresponsefrm.reset();

  }
    onDrugGeneralQualityPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddDrugGeneralQualityDetails, 'General Informations');
    
  } 
  onDrugManfacturerQualityPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddDrugManufacturesDetails, 'Manufacturers');
  }
    onManfacturerQualityPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddCharactManufacturesDetails, 'Characterisation Manufacturers');
  }
   onControlApiQualityPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddControlApiDetails, 'API Specifications');
  }
    onReferenceStandardsPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddReferenceStandardsDetails, 'Reference Standards');
  }
  
   funcAddDrugGeneralQualityDetails() {
    
    this.overallQualitySummaryModal = true;
    this.initqualitysummaryresponsefrm.reset();

  }
  funcAddDrugManufacturesDetails() {
    
    this.overallQualitySummaryModal = true;
    this.initqualitysummaryresponsefrm.reset();

  }
    funcAddCharactManufacturesDetails() {
    
    this.overallQualitySummaryModal = true;
    this.initqualitysummaryresponsefrm.reset();

  }
  funcAddControlApiDetails() {
    
    this.overallQualitySummaryModal = true;
    this.initqualitysummaryresponsefrm.reset();

  }
  funcAddReferenceStandardsDetails() {
    
    this.overallQualitySummaryModal = true;
    this.initqualitysummaryresponsefrm.reset();

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

OnLoadQualitySummaryReport() {

  this.appService.getProductsOtherDetails('', 'getQualitySummaryReport')
    //.pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.drugApiData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }

      },
      error => {
        return false
      });
}
 funcEditQulityDetails(data) {
  this.initqualitysummaryresponsefrm.patchValue(data.data);
  this.overallQualitySummaryModal = true;
}
onSaveQualitySummaryresponse() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductOtherDetails('wb_quality_overrallsummary_template', this.initqualitysummaryresponsefrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadQualitySummaryReport();
         
          this.overallQualitySummaryModal = false;
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

}
