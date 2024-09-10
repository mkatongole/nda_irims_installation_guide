
import { Component, OnInit, ViewChild,NgModule, ViewContainerRef, ElementRef, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent, DxScrollViewComponent, DxTabPanelModule, DxSelectBoxModule,DxFormModule } from 'devextreme-angular';

import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedGmpapplicationclassComponent } from '../../shared-gmpapplicationclass/shared-gmpapplicationclass.component';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AuthService } from 'src/app/services/auth.service';
import CustomStore from 'devextreme/data/custom_store';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-intended-surgicalmanufacturing',
  templateUrl: './intended-surgicalmanufacturing.component.html',
  styleUrls: ['./intended-surgicalmanufacturing.component.css']
})
@NgModule({
  imports: [
    DxSelectBoxModule,
    DxFormModule,
    DxTabPanelModule
  ],
  declarations: [],
  bootstrap: []
})
export class IntendedSurgicalmanufacturingComponent implements OnInit {
@ViewChild(DxDataGridComponent, ArchwizardModule)
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  initWizardPanel:number = 0;
  @Input() gmpManufacturingBlocksDataRows: any;
  @Input() gmpProductLineDataRows: any;
  @Input() gmpProductLineData:any;
  @Input() gmpSurgicalProductLineDataRows:any;
  @Input() gmpproductDetailsInformationData: any;
  @Input() businessTypeDetailsData: any;
  @Input() gmpSurgicalmanufatcuringSiteBlocksfrm: FormGroup;
  @Input() prodgmpAddinspectionFrm: FormGroup;
  @Input() prodSurgicalgmpAddinspectionFrm: FormGroup;
  @Input() manufacturersSiteData: any = {};
  @Input() isManufatcuringSiteBlocks: boolean;
  @Input() isManufatcuringSiteProductLine:boolean;
  @Input() isManufatcuringSiteBlock:boolean;
  @Input() isManufacturerPopupVisible: boolean;
  @Input() isRegisteredGmPopupVisible:boolean;
  @Input() is_readonly: boolean;
  @Input() product_lineData: any;
  @Input() product_lineSurgicalData:any;
  @Input() productlineCategoryData: any;
  @Input() productlineDescriptionData: any;
  @Input() gmp_type_id: number;
  @Input() isProductLinePopupVisible: any;
  @Input() isManufacturingSiteProductsDetails: boolean;
  @Input() manSiteRegisteredProductsData: any;
  @Input() isgmpAddProductsModalShow: boolean;
  @Input() manufacturingSiteLocationSet: any = true;
  @Input() gmpProductLineDetailsfrm: FormGroup;
  @Input() gmpSurgicalProductLineDetailsfrm:FormGroup;
  @Input() gmpapplicationGeneraldetailsfrm: FormGroup;
  @Input() manufacturing_site_id: number;
  @Input() sub_module_id: number;
  @Input() customData: any;
  @Input() section_id: number;
  title:string = 'Product Line';
  confirmDataParam:any;
  gmdnCodeData:any={};
  inspectionCategoryData:any;
  inspectionAtivitiesData:any;
  manufacturingActivitiesData:any;
  betaLactamData:any;
  countries:any;
  registeredPremisesData:any;
  gmpproductTypeData:any;
  classificationData:any;
  sterileTypeData:any;
  generalMnaufacturingData:any;
  invasiveTypeData:any;
  activeTypeData:any;
  medicatedTypeData:any;
  gmpSurgicalProductLineData:any;
 // gmdnCodeData:any;
  isonApprovedByNDA:boolean = false;
  gmdnCodeWinshow:boolean = false;
  isReadOnlySite:boolean=false;
  isonContractGiverManufacturer:boolean = false;
  events: Array<string> = [];  
  columns: any[] = [];
  gmpAddProductLineDataRows:any;
  blockname: string = '';
  block_id:number;
  inspection_category_id:number;
  total_value: number;
  gmp_id:number;
  totalSum: number = 0;
constructor(public modalServ: ModalDialogService,  public premService:PremisesApplicationsService,public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 


  }
  ngOnInit() {
    if(this.section_id == 4){

        this.title = 'Medical Devices ';
    }     
    if(this.sub_module_id == 5){
      this.manufacturingSiteLocationSet = true;
    }
    else{
      this.manufacturingSiteLocationSet = false;
    }    
    //this.onRegisteredPremisesSearch();
    this.onLoadgmpManufacturingBlocksData(this.manufacturing_site_id);
    this.onLoadbetaLactamData();
    this.onLoadCountries();
    this.onLoadconfirmDataParm();
    this.onLoadmanufacturingInspectionCategory();
    this.onLoadmanufacturingInspectionActivities();
    this.onLoadSterile();
    this.onLoadInvasive();
    this.onLoadActive();
    this.onLoadMedicated();
    this.onLoadClassifications();
    //this.onLoadGmdnCode();
    this.gmpSurgicalmanufatcuringSiteBlocksfrm.get('inspection_category_id').valueChanges.subscribe((inspection_category_id) => {
    this.onLoadgmpproductTypeData(inspection_category_id);
    this.onLoadmanufacturingActivities(inspection_category_id);
    this.onLoadgeneramanufacturinActivity(inspection_category_id);

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
    onProductLineChange(event) {
    console.log('Selected value:', event.value);
    // Handle value change if necessary
  }
 funcSelectgmdn(data) {
      let resp_data = data.data;
      this.prodSurgicalgmpAddinspectionFrm.get('gmdn_code_id').setValue(resp_data.id);
      this.prodSurgicalgmpAddinspectionFrm.get('gmdn_code_description').setValue(resp_data.name);
      this.prodSurgicalgmpAddinspectionFrm.get('gmdn_code').setValue(resp_data.code);
      this.gmdnCodeWinshow = false;

  }
  onGMPBlocksProductsLineToolbar(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funAddGMPblocks, 'Manufacturing Site Block and Product Line',is_readonly);

  }

  onProductsLineToolbar(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funAddGmpProductLine, 'Product Line',is_readonly);

  }

  funAddGMPproductLineDetails() {
    //reset the form  
    this.onLoadgmpAddProductLineDataRows(this.manufacturing_site_id) ;
    
    this.isProductLinePopupVisible = true;

  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  funAddGmpProductLine() {
    this.isManufatcuringSiteProductLine = true;
    this.gmpSurgicalProductLineDetailsfrm.reset();

  } 


  funAddGmpBlock() {
    this.isManufatcuringSiteBlock = true;
    //reset the form  
    this.gmpSurgicalmanufatcuringSiteBlocksfrm.reset();

  } 
    funAddGMPblocks() {
    this.isManufatcuringSiteBlocks = true;
    //reset the form  
    this.gmpSurgicalmanufatcuringSiteBlocksfrm.reset();
    this.gmpSurgicalProductLineDetailsfrm.reset()
    this.wizard.model.navigationMode.goToStep(0);

  }   
  funcEditManSiteBlockDetails(data){
    this.gmpSurgicalmanufatcuringSiteBlocksfrm.patchValue(data.data);
    this.isManufatcuringSiteBlocks = true;
    this.wizard.model.navigationMode.goToStep(0);
   

  } 
funcEditProductLineDetails(data) {
  this.gmpSurgicalProductLineDetailsfrm.patchValue(data.data);
  this.isManufatcuringSiteProductLine = true;
  this.onLoadgmpProductLineData(this.manufacturing_site_id, data.data.manufacturing_site_block_id);
}


  funcDeleteManSiteBlockDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let manufacturing_site_id = data.data.manufacturing_site_id;
    let table_name = 'tra_manufacturing_sites_blocks';
    this.funcDeleteDetailMishelper(record_id, manufacturing_site_id, table_name, 'site_block', 'Manufacturing Blocks');

  } 
 
  onLoadgmpManufacturingBlocksData(manufacturing_site_id) {
   // alert(manufacturing_site_id)
    this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id }, 'gmpinspection/getGmpManufacturingBlocksDetails')
    .subscribe(
      data => {
        if (data.success) {
          this.gmpManufacturingBlocksDataRows = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }  

onLoadgeneramanufacturinActivity(inspection_category_id) {
  var data = {
    table_name: 'par_general_manufacturing_activity',
  inspection_category_id:inspection_category_id

  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.generalMnaufacturingData = data;
      });
}


  onPremisesProductsLineToolbar(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funAddGMPproductLineDetails, 'Product Line Details ',is_readonly);

  } 
  onLoadCountries() {

    var data = {
      table_name: 'par_countries'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.countries = data;
        },
        error => {
          return false;
        });
  }

  funcDeleteProductLineDetails(data) {
    let record_id = data.data.record_id;
    let manufacturing_site_id = data.data.manufacturing_site_id;
    let table_name = 'gmp_productline_details';
    this.funcDeleteDetailMishelper(record_id, manufacturing_site_id, table_name, 'product_line', 'Manufacturing Product Line');

  }
   onManufacturingSiteProductsToolbar(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funcAddSurgicalManufacturingSiteProducts, 'Manufacturing Site Products Details',is_readonly);

  }


  funcAddSurgicalManufacturingSiteProducts() {
    this.isgmpAddProductsModalShow = true;
    this.prodSurgicalgmpAddinspectionFrm.reset();
    this.onLoadgmpSurgicalProductLineData(this.manufacturing_site_id);

  } 

  funcAddManufacturingSiteProducts() {
    //get the man_site_id 
    let man_site_id = this.gmpapplicationGeneraldetailsfrm.get('man_site_id').value;
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
              params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,man_site_id:man_site_id ,section_id:me.section_id}
            };
            return me.httpClient.get(AppSettings.base_url + 'gmpinspection/getManufacturingSiteRegisteredProductsData',this.configData)
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
    
    //reset the form  

  }
  
  funcDeleteGMPProductLineDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let manufacturing_site_id = data.data.manufacturing_site_id;
    let table_name = 'wb_product_gmpinspectiondetails';
    this.funcDeleteDetailhelper(record_id, manufacturing_site_id, table_name, 'gmpproducts', 'Manufacturing Product Line');

  }
funcDeleteDetailMishelper(record_id, manufacturing_site_id, table_name, reload_type, title) {
    this.modalServ.openDialog(this.viewRef, {
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
            this.appService.onDeleteMisTablePermitdetails(record_id, table_name, manufacturing_site_id, title)
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    if(reload_type == 'product_line'){
                    const gmp_id = this.gmp_id;
                      this.onLoadgmpProductLineData(this.manufacturing_site_id,this.block_id);
                      this.onLoadgmpSurgicalProductLineDataRows(manufacturing_site_id);
                    }
                    else if(reload_type == 'site_block'){
                      this.onLoadgmpManufacturingBlocksData(manufacturing_site_id) ;
                      this.onLoadgmpSurgicalProductLineDataRows(manufacturing_site_id);
                    } else if(reload_type == 'gmpproducts'){
                      this.onLoadgmpproductDetailsInformationData(manufacturing_site_id) 
                    }
                    
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



  funcDeleteDetailhelper(record_id, manufacturing_site_id, table_name, reload_type, title) {
    this.modalServ.openDialog(this.viewRef, {
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
            this.appService.onDeleteGMPDetails(record_id, table_name, manufacturing_site_id, title)
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    if(reload_type == 'product_line'){
                      this.onLoadgmpSurgicalProductLineDataRows(manufacturing_site_id) 
                      this.onLoadgmpAddProductLineDataRows(manufacturing_site_id);
                    }
                    else if(reload_type == 'site_block'){
                      this.onLoadgmpManufacturingBlocksData(manufacturing_site_id) 
                    } else if(reload_type == 'gmpproducts'){
                      this.onLoadgmpproductDetailsInformationData(manufacturing_site_id) 
                    }
                    
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
   onSavemanufatcuringSiteBlocks() {
      this.blockname = this.gmpSurgicalmanufatcuringSiteBlocksfrm.controls['name'].value;
    this.appService.onSavemanufatcuringSiteBlocks(this.manufacturing_site_id, this.gmpSurgicalmanufatcuringSiteBlocksfrm.value)
      .subscribe(
        response => {
          let gmp_resp = response.json();
          if (gmp_resp.success) {
            this.toastr.success(gmp_resp.message, 'Response');
            this.onLoadgmpManufacturingBlocksData(this.manufacturing_site_id);
            this.onLoadgmpProductLineData(this.manufacturing_site_id, gmp_resp.id);
            const block_id = gmp_resp.id;
            this.block_id = block_id;
            const gmp_id = gmp_resp.special_category_id;
            this.gmp_id = gmp_id;
            this.wizard.model.navigationMode.goToStep(1);
            this.isManufatcuringSiteBlock = false;

          } else {
            this.toastr.error(gmp_resp.message, 'Alert');
          }
        },
        error => {
          //this.loading = false;
        });
  }
  onSaveGmpProductlineDetails(change=null) {
    const block_id =this.block_id;
    this.gmpSurgicalProductLineDetailsfrm.get('manufacturingsite_block_id').patchValue(block_id);
    this.appService.onSaveGmpProductLineDetails(this.manufacturing_site_id, this.gmpSurgicalProductLineDetailsfrm.value)
      .subscribe(
        response => {
          let gmp_resp = response.json();
          if (gmp_resp.success) {
            this.toastr.success(gmp_resp.message, 'Response');
            this.isManufatcuringSiteProductLine = false;
            this.onLoadgmpManufacturingBlocksData(this.manufacturing_site_id);
            this.onLoadgmpSurgicalProductLineDataRows(this.manufacturing_site_id);
            this.onLoadgmpProductLineData(this.manufacturing_site_id,this.block_id);

          } else {
            this.toastr.error(gmp_resp.message, 'Alert');
          }
        },
        error => {
      //    this.loading = false;
        });
  }  

  onLoadgmpproductDetailsInformationData(manufacturing_site_id) {

    this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id }, 'gmpinspection/getgmpSurgicalproductDetailsInformationData')
    .subscribe(
      data => {
        if (data.success) {
          this.gmpproductDetailsInformationData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
    
}

onLoadgmpAddProductLineDataRows(manufacturing_site_id) {

  this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id,section_id:this.section_id}, 'gmpinspection/getAddGmpProductLinedetails')
  .subscribe(
    data => {
      if (data.success) {
        this.gmpAddProductLineDataRows = data.data;
      }
      else {
        this.toastr.success(data.message, 'Alert');
      }
    },
    error => {
      return false
    });
  
}


funcProduEditProductLineDetails(e){
  let params = new HttpParams();alert();
  for (let key in e.newData) {
      params = params.set(key, e.newData[key]);
  }
  console.log(params)

}

funcProduDeleteProductLineDetails(e){alert();
  let params = new HttpParams();
  for (let key in e.newData) {
      params = params.set(key, e.newData[key]);
  } console.log(params)
}
funcProduSavingProductLineDetails(e: any){
 
    let changed_data = e.changes[0];
console.log(changed_data)
      e.cancel = true;
      e.promise = this.onSaveGmpProductlineDetails(e.changes[0]);
   
} 

onLoadgmpProductLineData(manufacturing_site_id, block_id) {
  this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id, block_id: block_id }, 'gmpinspection/getGmpProductLineSurgicaldetailsDt')
    .subscribe(
      data => {
        if (data.success) {
          this.gmpProductLineData = data.data;
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        // Handle error
      });
}

onLoadgmpSurgicalProductLineDataRows(manufacturing_site_id) {
  this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id, section_id: this.section_id }, 'gmpinspection/getGmpProductLineSurgicaldetails')
    .subscribe(
      data => {
        if (data.success) {
        this.gmpSurgicalProductLineDataRows = data.data;
          this.toastr.success(data.message);
        }
      },
      error => {
        return false;
      });
}

onLoadgmpSurgicalProductLineData(manufacturing_site_id) {
  this.appService.getGMPDataDetails({ manufacturing_site_id: manufacturing_site_id, section_id: this.section_id }, 'gmpinspection/getgmpSurgicalLineDetails')
    .subscribe(
      data => {
        if (data.success) {
        this.gmpSurgicalProductLineData = data.data;
        console.log(this.gmpSurgicalProductLineData);
          this.toastr.success(data.message);
        }
      },
      error => {
        return false;
      });
}

updateTotalSum() {
  this.totalSum = this.gmpSurgicalProductLineDataRows.reduce((sum, row) => sum + row.total_value, 0);

}
  functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        disabled:is_readonly,
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
  }  refreshDataGrid() {
    //this.dataGrid.instance.refresh();
  }
  funcSelectProductDetails(data){
    let productdata = data.data;
    this.prodSurgicalgmpAddinspectionFrm.patchValue({applicant_name:productdata.applicant_name, brand_name:productdata.brand_name, reference_no:productdata.reference_no,product_id:productdata.product_id,reg_product_id:productdata.reg_product_id });
    this.isManufacturingSiteProductsDetails = false;

  }onSaveprodgmpAddinspection(){

    this.spinner.show();
   this.appService.onSaveGmpOtherDetails('wb_product_gmpinspectiondetails', this.prodSurgicalgmpAddinspectionFrm.value, this.manufacturing_site_id)
     .subscribe(
       response => {
         let gmp_resp = response.json();
         //the details 
         if (gmp_resp.success) {
           this.isgmpAddProductsModalShow = false;
           this.isManufacturingSiteProductsDetails = false;
           this.onLoadgmpproductDetailsInformationData(this.manufacturing_site_id)
           this.toastr.success(gmp_resp.message, 'Response');
         } else {
           this.toastr.error(gmp_resp.message, 'Alert');
         }
         this.spinner.hide();
       },
       error => {
         this.toastr.error('Error Occurred', 'Alert');
       });
 }
   onRegisteredPremisesSearch() {
    this.isRegisteredGmPopupVisible = true;

    this.premService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.registeredPremisesData = data_response.data;
        },
        error => {
          return false
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

onLoadbetaLactamData() {
  var data = {
    table_name: 'par_beta_lactams',
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.betaLactamData = data;
      });
} 
onLoadmanufacturingActivities(inspection_category_id) {
  var data = {
    table_name: 'par_manufacturing_activities',
    inspection_category_id:inspection_category_id
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.manufacturingActivitiesData = data;
      });
} 
 onContractGiverManufacturer($event) {

  if($event.value == 2){
      this.isonContractGiverManufacturer = true;
  }
  else{
    this.isonContractGiverManufacturer = false;
    this.isonApprovedByNDA = false;

  }
} 
  onApprovedByNDA($event) {

  if($event.value == 1){
      this.isonApprovedByNDA = true;
      this.isReadOnlySite =true;
  }
  else{
    this.isonApprovedByNDA = false;
      this.isReadOnlySite =false;

  }
}  
onLoadgmpproductTypeData(inspection_category_id){

  var data = {
    table_name: 'par_gmpproduct_types',
    inspection_category_id:inspection_category_id
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.gmpproductTypeData = data;
      });
} 
onLoadmanufacturingInspectionCategory() {
  var data = {
    table_name: 'par_manufacturinginspection_category',
    is_surgical:1
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.inspectionCategoryData = data;
      });
}

  onLoadClassifications() {
      var data = {
    table_name: 'par_medicaldevices_classification',
    };
    
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
        });
  } 
 onLoadSterile() {
  var data = {
    table_name: 'par_sterility',
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.sterileTypeData = data;
      });
} 

//  onLoadGmdnCode() {
//   var data = {
//     table_name: 'par_gmdn_categories',
//   };

//   this.config.onLoadConfigurationData(data)
//     .subscribe(
//       data => {
//         this.gmdnCodeData = data;
//       });
// } 

onGMDNCodeSelect($event) {
  let gmdncode_details =$event.selectedItem;
 
 this.gmpSurgicalProductLineDetailsfrm.get('gmdn_code_id').setValue(gmdncode_details.id);
 this.gmpSurgicalProductLineDetailsfrm.get('gmdn_code_description').setValue(gmdncode_details.description);
}

 onLoadInvasive() {
  var data = {
    table_name: 'par_invasivity',
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.invasiveTypeData = data;
      });
} 


 onLoadActive() {
  var data = {
    table_name: 'par_activitity',
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.activeTypeData = data;
      });
} 


 onLoadMedicated() {
  var data = {
    table_name: 'par_medics',
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.medicatedTypeData = data;
      });
} 


onLoadmanufacturingInspectionActivities() {
  var data = {
    table_name: 'par_manufacturinginspection_activities',
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.inspectionAtivitiesData = data;
      });
}    
funcSelectManufacturer(data) {
    if (this.gmp_type_id == 2) {
      let resp_data = data.data;
      this.gmpSurgicalmanufatcuringSiteBlocksfrm.patchValue({manufacturer_name:resp_data.manufacturer_name,man_site_id:resp_data.man_site_id});
      this.gmpSurgicalmanufatcuringSiteBlocksfrm.patchValue({section_id:this.section_id,gmp_type_id:2});
    }
    else {
      this.gmp_type_id = 1
      this.gmpSurgicalmanufatcuringSiteBlocksfrm.patchValue(data.data);
      
      this.gmpSurgicalmanufatcuringSiteBlocksfrm.patchValue({section_id:this.section_id,gmp_type_id:1});
     
    }
     
    this.isManufacturerPopupVisible = false;
  }   
  onSearchManufacturingSite() {
    this.isManufacturerPopupVisible = true;
    let me = this;
    this.manufacturersSiteData.store = new CustomStore({
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
            return me.httpClient.get(AppSettings.base_url + 'gmpinspection/getManufacturingSiteInformation',this.configData)
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


onCellProductLinePrepared(e) {
    
  if(e.rowType === "data" && e.column.dataField === "product_line_namecheck") {
    let product_line_namecheck =e.data.product_line_namecheck;

     
      if(product_line_namecheck ==1){
        e.cellElement.style.color = 'black';
        e.cellElement.style.backgroundColor = '#64B0F2';    
      }
      else{
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#fff';  
      
      }

    }
  }
}
