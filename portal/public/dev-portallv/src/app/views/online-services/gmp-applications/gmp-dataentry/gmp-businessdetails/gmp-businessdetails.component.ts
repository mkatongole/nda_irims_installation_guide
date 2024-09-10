
import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedGmpapplicationclassComponent } from '../../shared-gmpapplicationclass/shared-gmpapplicationclass.component';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-gmp-businessdetails',
  templateUrl: './gmp-businessdetails.component.html',
  styleUrls: ['./gmp-businessdetails.component.css']
})
export class GmpBusinessdetailsComponent implements OnInit {
  
  @Input() premisesOtherDetailsRows: any;
  @Input() contractManufacturingRows: any;
  @Input() isBusinessTypePopupVisible: boolean;
  @Input() isContractManufacturingPopupVisible:boolean;
  @Input() isaddNewPremisesPersonnelDetails: boolean;
  @Input() businessTypesData: any;
  @Input() confirmDataParam: any;
  @Input() ContractManufacturingData:any;
  @Input() businessTypeDetailsData: any;
  @Input() gmpOtherDetailsfrm: FormGroup;
  @Input() contractManufacturingDetailsfrm: FormGroup;
  @Input() newPremisesPersonnelDetailsFrm: FormGroup;
  @Input() isPersonnelPopupVisible: boolean;
 @Input() premisesPersonnelDetailsfrm: FormGroup;
  @Input() regions: any;
  @Input() manufacturersSiteData: any = {};
  @Input() districts: any;
  @Input() personnel_informationData: any;
  @Input() countries:any;
  @Input() sub_module_id: number;
  @Input() manufacturingSiteLocationSet: any = true;
  @Input() is_readonly: boolean;
  @Input() business_type_id: number;
  @Input() contract_manufacturing_id:number;
  @Input() personnel_type_id: number;
  @Input() manufacturing_site_id: number;
  @Input() isManufacturerPopupVisible: boolean;
  @Input() gmpapplicationGeneraldetailsfrm: FormGroup;
  @Input() gmp_type_id: number;
  @Input() section_id: number;
  @Input() personnel_id: number;
  addBusinessTypeDetailsfrm:FormGroup;
  addBusinessTypeDetailsMdl: boolean=false;
  isonContractGiverManufacturer:boolean = false;
  isContractGiverManufacturer:boolean = false;
  isUncontractAcceptorWin:boolean = false;
  gmp_resp:any;
  manufacturingActivityData:any;
  gmpappTypeData:any;
  product_resp:any;
  region_id:number;
  country_id:number;
    app_route: any;

  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 
     
  }
  ngOnInit() {

    if(this.sub_module_id == 5){
      this.manufacturingSiteLocationSet = true;
    }
    else{
      this.manufacturingSiteLocationSet = false;
    }
    this.addBusinessTypeDetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      business_type_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))
    
    });
    this.onContractManufacturingDetailsLoad();
    this.onLoadCountries();
    this.onLoadGmpAppType(this.sub_module_id);
    this.onLoadManufacturingActivity();
  }  
  onLoadGmpAppType(sub_module_id) {
    
    var data = {
      table_name: 'sub_modules',
      sub_module_id:sub_module_id,
      module_id: 3
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.gmpappTypeData =  data;
        });
  }
  onSaveProductTypeDetails(){
    this.addBusinessTypeDetailsfrm.get('tablename').setValue('par_business_type_details')
    this.addBusinessTypeDetailsfrm.get('business_type_id').setValue(this.business_type_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addBusinessTypeDetailsfrm.value, 'onSaveUniformConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onBusinessTypesDetailsLoad(this.business_type_id);
         
          this.addBusinessTypeDetailsMdl = false;
          this.gmpOtherDetailsfrm.get('business_type_detail_id').setValue(this.product_resp.record_id)
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
      let resp_data = data.data;
    if (this.gmp_type_id == 2) {
      this.contractManufacturingDetailsfrm.patchValue({manufacturer_name:resp_data.manufacturer_name,man_site_id:resp_data.man_site_id});
      this.contractManufacturingDetailsfrm.patchValue({section_id:this.section_id,gmp_type_id:2});
    }
    else {
      this.gmp_type_id = 1
      this.contractManufacturingDetailsfrm.patchValue({
        manufacturer_name:resp_data.manufacturer_name,
        man_site_id:resp_data.man_site_id,
        country_id:resp_data.country_id,
        region_id:resp_data.region_id,
        physical_address:resp_data.physical_address,

      });
      
      this.contractManufacturingDetailsfrm.patchValue({section_id:this.section_id,gmp_type_id:1});
     
    }
     
    this.isManufacturerPopupVisible = false;
  }  
  onAddBusinessTypeDetails(){
    this.addBusinessTypeDetailsfrm.reset();
    this.addBusinessTypeDetailsMdl = true;
  
  }
   funcEditPremisesDetails(data) {
    this.gmpOtherDetailsfrm.patchValue(data.data)

    this.isBusinessTypePopupVisible = true;
  } 
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onPersonnelSearchDetails(personnel_type_id) {

      this.appService.onLoadPersonnelInformations()
        .subscribe(
          data_response => {
            this.personnel_informationData = data_response.data;
            this.personnel_type_id = personnel_type_id;
            this.isPersonnelPopupVisible = true;
            
          },
          error => {
            return false
          });
    

  } 
    onGMPDashboard() {
    if(this.sub_module_id == 117){
      this.app_route = ['./online-services/gmp-preinspection-dashboard'];

    }
    else if(this.sub_module_id == 5){
      this.app_route = ['./online-services/gmpapplications-dashboard'];

    }else if(this.sub_module_id == 6){
      this.app_route = ['./online-services/renewalgmpapplications-dashboard'];
    }
    else{
       this.app_route = ['./online-services/gmpapplications-dashboard'];

    }
    
    this.router.navigate(this.app_route);
  }  
   funcSelectPremisePersonnel(data) {
    if(this.personnel_type_id == 1){
      this.contractManufacturingDetailsfrm.patchValue({ personnel_id: data.data.id, contact_person: data.data.name,email: data.data.email,telephone_no: data.data.telephone_no})
    }
    else{
      this.contractManufacturingDetailsfrm.patchValue({ personnel_id: data.data.id, name: data.data.name, email_address: data.data.email_address, telephone_no: data.data.telephone_no, postal_address: data.data.postal_address })
      //reload the qualifications and documents
      this.personnel_id = data.data.id;
    }
    
    
    this.isPersonnelPopupVisible = false;
    
  }

   funcEditContractManDetails(data) {
    this.contractManufacturingDetailsfrm.patchValue(data.data)

    this.isContractManufacturingPopupVisible = true;
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
  }onPremisesBusinesDetailsToolbar(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funAddPremisesOtherDetails, 'Business Type Details',is_readonly);

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
  onLoadManufacturingActivity() {

    var data = {
      table_name: 'par_manufacturing_activities'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.manufacturingActivityData = data;
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
    onCoutryCboSelect($event) {
    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

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

   onRegionsCboSelect($event) {
    if($event.selectedItem.id){
      this.region_id = $event.selectedItem.id;

      this.onLoadDistricts(this.region_id);
    }
   

  }
  onContractManufacturingToolbar(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funAddContractManufacturingDetails, 'Contract Manufacturing Details',is_readonly);

  }
  
  funAddPremisesOtherDetails() {
    this.isBusinessTypePopupVisible = true;
    //reset the form 
    this.gmpOtherDetailsfrm.reset();
    this.gmpOtherDetailsfrm.get('business_type_id').setValue(this.business_type_id);
    this.onBusinessTypesDetailsLoad(this.business_type_id)
  }
   funAddContractManufacturingDetails() {
    this.isContractManufacturingPopupVisible = true;
    //reset the form 
    this.contractManufacturingDetailsfrm.reset();
  }
  
  onBusinessTypesDetailsLoad(business_type_id) {

    var data = {
      table_name: 'par_business_type_details',
      business_type_id: business_type_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data);
          this.businessTypeDetailsData = data;
        },
        error => {
          return false
        });
  }
  ContractGiverManufacturer($event) {

  if($event.value == 1 || $event.value == 2 ){
      this.isContractGiverManufacturer = true;

  }
  else{
    this.isContractGiverManufacturer = false;


  }
}
  onContractGiverManufacturer($event) {

  if($event.value == 1){
      this.isonContractGiverManufacturer = true;
  }
  else{
    this.isonContractGiverManufacturer = false;
    this.isUncontractAcceptorWin = true;

  }
}   

    onContractManufacturingDetailsLoad() {
    var data = {
      table_name: 'par_manufacturing_contractdetails',
      
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ContractManufacturingData = data;
        },
        error => {
          return false
        });
  }  

  onSaveGmpOtherDetails() {
    if (this.gmpOtherDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSaveGmpOtherDetails('wb_mansite_otherdetails', this.gmpOtherDetailsfrm.value,this.manufacturing_site_id)
      .subscribe(
        response => {
          this.gmp_resp = response.json();
          if (this.gmp_resp.success) {
            this.toastr.success(this.gmp_resp.message, 'Response');
            this.isContractManufacturingPopupVisible = false;
            this.onLoadPremisesOtherDetails(this.manufacturing_site_id);
          } else {
            this.toastr.error(this.gmp_resp.message, 'Alert');
          }
        },
        error => {
         // this.loading = false;
        });
  }
   //reload the premsies Other Details 
   onLoadPremisesOtherDetails(manufacturing_site_id) {

    this.appService.onLoadGmpOtherDetails(manufacturing_site_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.premisesOtherDetailsRows = data;
        },
        error => {
          return false
        });
  } 

  onLoadContractDetails(manufacturing_site_id) {
    this.appService.onLoadContractDetails(manufacturing_site_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.contractManufacturingRows = data.data;
        },
        error => {
          return false
        });
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
  
   onSaveGmpContractDetails() {
    if (this.contractManufacturingDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSaveGmpContractDetails('wb_contractmanufacturing_details', this.contractManufacturingDetailsfrm.value,this.manufacturing_site_id)
      .subscribe(
        response => {
          this.gmp_resp = response.json();
          if (this.gmp_resp.success) {
            this.toastr.success(this.gmp_resp.message, 'Response');
            this.isContractManufacturingPopupVisible = false;
            this.onLoadContractDetails(this.manufacturing_site_id);
          } else {
            this.toastr.error(this.gmp_resp.message, 'Alert');
          }
        },
        error => {
         // this.loading = false;
        });
  }

  funcDeletePremisesBusinessDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let manufacturing_site_id = data.data.manufacturing_site_id;
    let table_name = 'wb_mansite_otherdetails';
  
    this.modalServ.openDialog(this.viewRef, {
      title: 'Are You sure You want to delete Business Details?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [
        {
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
            this.appService.onDeleteGMPDetails(record_id, table_name, manufacturing_site_id, 'Business Details')
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();
                 
                  if (resp.success) {
                    this.onLoadPremisesOtherDetails(manufacturing_site_id);

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

    funcDeleteContractManufacturingDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let manufacturing_site_id = data.data.manufacturing_site_id;
    let table_name = 'wb_contractmanufacturing_details';
  
    this.modalServ.openDialog(this.viewRef, {
      title: 'Are You sure You want to delete Contract Manufacturing Details?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [
        {
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
            this.appService.onDeleteGMPDetails(record_id, table_name, manufacturing_site_id, 'Contract Manufacturing Details')
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();
                 
                  if (resp.success) {
                    this.onLoadContractDetails(manufacturing_site_id);

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
   onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, 'Add Personnel',is_readonly);
  }
    funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
  } 
   onSaveNewPremisesPersonnelDetails() {
    //    this.spinner.show();
        let table_name;
        table_name = 'tra_personnel_information';
        let name = this.newPremisesPersonnelDetailsFrm.get('name').value;
        let email_address = this.newPremisesPersonnelDetailsFrm.get('email_address').value;
        let telephone_no = this.newPremisesPersonnelDetailsFrm.get('telephone_no').value;
        let postal_address = this.newPremisesPersonnelDetailsFrm.get('postal_address').value;

        this.utilityService.onAddPersonnDetails(table_name, this.newPremisesPersonnelDetailsFrm.value)
          .subscribe(
            response => {
              let app_resp = response.json();
              //the details 
              if (app_resp.success) {
                if(this.personnel_type_id == 1){
                
                  this.toastr.success(app_resp.message, 'Response');
      
                  this.gmpapplicationGeneraldetailsfrm.patchValue({ contact_person_id: app_resp.record_id, contact_person: name})
                }
                else{
                  this.premisesPersonnelDetailsfrm.patchValue({ personnel_id: app_resp.record_id, name: name, email_address: email_address, telephone_no: telephone_no, postal_address: postal_address })
                }
                this.isaddNewPremisesPersonnelDetails = false;
                this.isPersonnelPopupVisible = false;
              } else {
                this.toastr.error(app_resp.message, 'Alert');
              }
              this.spinner.hide();
            },
            error => {
              this.toastr.error('Error Occurred', 'Alert');
            });
      }
}
