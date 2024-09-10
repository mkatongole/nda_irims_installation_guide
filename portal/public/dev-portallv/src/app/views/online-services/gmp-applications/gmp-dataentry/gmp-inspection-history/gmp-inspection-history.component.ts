import { Component, OnInit,OnDestroy, ViewChild, ViewContainerRef, Inject, Input,ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter  } from '@angular/core';
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
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';

import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-gmp-inspection-history',
  templateUrl: './gmp-inspection-history.component.html',
  styleUrls: ['./gmp-inspection-history.component.css']
})
export class GmpInspectionHistoryComponent implements OnInit{
  
  @Input() inspectionHistorydetailsfrm: FormGroup;
  @Input() assessmentProcedureData: any;
  @Input() sectionsData: any;
  @Input() manufacturingSiteLocationSet: any = true;
  @Input() countries: any;
  @Input() gmpLocationData: any;
  @Input() regions: any;
  @Input() districts: any;
  @Input() businessTypesData: any;
  @Input() inspectionTypesData:any;
  @Input() zoneData: any;
  @Input() confirmDataParam: any;

  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() man_site_id: number;
  @Input() ltr_id: number;
  @Input() manufacturing_site_id: number;
  @Input() premise_id: number;
  @Input() registered_id: number;

  @Input() isReadOnlyTraderasContact: boolean;
  @Input() is_readonly: boolean;
  
  @Input() isPersonnelPopupVisible: boolean;
  @Input() isBillingPersonnelPopupVisible: boolean;
  @Input() gmpControl:FormControl;
  @Input() personnel_informationData: any;
  @Input() billingpersonnel_informationData: any;

  @Input() isaddNewPremisesPersonnelDetails: boolean;
  @Input() isaddNewBillingPremisesPersonnelDetails: boolean;

  @Input() newPremisesPersonnelDetailsFrm: FormGroup;
  
  @Input()  traderAccountsDetailsData:any = {};
  @Input() ispremisesSearchWinVisible: boolean;
  @Input() isManufacturerPopupVisible: boolean;
  @Input() isManufacturerSitePopupVisible:boolean;
  @Input() registered_premisesData: any;
  @Input() manufacturersSiteData: any = {};

  @Input() fastTrackOptionsData: any;
  
  @Input() payingCurrencyData: any;
  @Input() gmp_type_id: number;
  @Input() section_id: number;
  
  
  manufacturersData:any = {};
  isproductManufacturerModalShow:boolean=false;
  @Output() businessTypeEvent = new EventEmitter();
  mistrader_id:number;
  region_id:number;
  country_id:number;
  personnel_type_id:number;
  auto:any;
  businessTypeDetailsData:any;
  business_type_id:number;
  intermediate_complete_id:number;
  is_local_agent:boolean;
  trader_title:string;
  isgmpapplicationSearchWinVisible:boolean=false;
  isonContractGiverManufacturer:boolean = false;
  isonInspectedByWho:boolean = false;
  isReadOnlySite:boolean=false;
  devicesTypeData:any;
  isReadOnlyTraderasContactPerson:boolean;
  isReadOnlyTraderasBillingPerson:boolean;
  isAddNewManufacturingSite:boolean = false;
  manufacturerFrm:FormGroup;
  isReadOnlyTraderasLtr:boolean = false;
  is_local:number;
  sectionData:any;
  trader_aslocalagent:number;
  registered_gmpApplicationData:any;
  isRegistrantDetailsWinshow:boolean= false;
  isonInterCompleteManufacturer:boolean = false;
  is_domestic:boolean = false;
  inspectionAtivitiesData:any;
  gmpAssessmentCountriesDta:any;
  assessment_procedure_id:number;
  hasCountriesSelection:boolean;

  constructor(public modalServ: ModalDialogService, public premService:PremisesApplicationsService,public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 

    let user_details = this.authService.getUserDetails();
    
    this.is_local = user_details.is_local;
    if (this.is_local == 1) {
      this.isReadOnlyTraderasLtr = true;
    }
    if(this.gmp_type_id == 2){
      this.is_domestic = true;
    }else{
      this.is_domestic = false;
    }
    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      telephone: new FormControl('', Validators.compose([Validators.required])),
      mansite_name: new FormControl('', Validators.compose([])),
      mansitecountry_id: new FormControl('', Validators.compose([])),
      mansiteregion_id: new FormControl('', Validators.compose([])),
      mansiteemail_address: new FormControl('', Validators.compose([])),
      mansitepostal_address: new FormControl('', Validators.compose([])),
      mansitetelephone_no: new FormControl('', Validators.compose([])),
      mansitephysical_address: new FormControl('', Validators.compose([])),
      contact_person: new FormControl('', Validators.compose([])),
      manufacturer_id: new FormControl('', Validators.compose([])),
      
    });

  }
  onAssessmentCboSelect($event) {
    
    if($event.selectedItem.id){
      this.assessment_procedure_id = $event.selectedItem.id;

      if(this.assessment_procedure_id == 2 || this.assessment_procedure_id == 5){
          this.hasCountriesSelection = false;
          this.onLoadCountriesLists(this.assessment_procedure_id) 

      }else{
        this.hasCountriesSelection = false;
        this.inspectionHistorydetailsfrm.get('gmpassessment_countries_ids').setValue("");
      }
    }
  }
  captureLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.inspectionHistorydetailsfrm.patchValue({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
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
  onLoadCountriesLists(gmp_assessment_id) {

    var data = {
      table_name: 'par_gmpassessmentprocedure_countries',
      gmp_assessment_id: gmp_assessment_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.gmpAssessmentCountriesDta = data;
        },
        error => {
          return false
        });
  }
  ngOnInit() {
    this.onLoaddevicesTypeData(this.section_id);
    //this.onLoadSections();
    if(this.sub_module_id == 5){
      this.manufacturingSiteLocationSet = true;
   
      }
    else{
      this.manufacturingSiteLocationSet = false;
    }    
    this.onLoadmanufacturingInspectionActivities();

  }
  onCoutryCboSelect($event) {
    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }

  onLoaddevicesTypeData(section_id) {
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
  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
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
  onBusinesTypeCboSelect($event) {
    
    this.business_type_id = $event.value;
    this.onBusinessTypesDetailsLoad(this.business_type_id);
    this.businessTypeEvent.emit(this.business_type_id);


  }

  onInspectionInterCompleteSelect($event) {

  if($event.value == 2 ){
      this.isonInterCompleteManufacturer = true;
  }
  else{
    this.isonInterCompleteManufacturer = false;
  }
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
   onPersonnelSearchDetails(personnel_type_id) {
    this.personnel_type_id = personnel_type_id;
    this.appService.onLoadPersonnelInformations()
    .subscribe(
      data_response => {
        this.personnel_informationData = data_response.data;
        
           this.isPersonnelPopupVisible = true;
      },
      error => {
        return false
      });

  }
   onBillingPersonnelSearchDetails(personnel_type_id) {
    this.personnel_type_id = personnel_type_id;
    this.appService.onLoadPersonnelInformations()
    .subscribe(
      data_response => {
        this.billingpersonnel_informationData = data_response.data;
        
           this.isBillingPersonnelPopupVisible = true;
      },
      error => {
        return false
      });

  }  
  onSearchManufacturingSiteDetails() {
    this.isManufacturerSitePopupVisible = true;
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
  onAddManufacturingSite(){
      this.isAddNewManufacturingSite = true;
  }
onManDetailPreparing(e) {
  if (this.gmp_type_id == 1) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'add',
        text: 'New Manufacturing Site',
        type: 'default',
        onClick: this.onAddManufacturingSite.bind(this),
      },
    });
  }
}
  funcSearchRegistrantDetails(is_local_agent) {
   
        this.isRegistrantDetailsWinshow = true;
        if (is_local_agent == 1) {
          this.is_local_agent = is_local_agent;
          this.trader_title = 'Local Representative';
        }
        else {
          this.is_local_agent = is_local_agent;
          this.trader_title = 'Product Registrant';
        }
        let me = this;
        this.traderAccountsDetailsData.store = new CustomStore({
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
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,is_local_agent:is_local_agent }
              };
              return me.httpClient.get(AppSettings.base_url + 'productregistration/getTraderInformationDetails',this.configData)
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
    
      //this.traderAccountsDetailsData.load();
/*
    this.appService.getGMPDataDetails({ is_local_agent: is_local_agent }, 'productregistration/getTraderInformationDetails')
      .subscribe(
        data => {
          if (data.success) {
            if (is_local_agent == 1) {
              

            }
            else {
              this.is_local_agent = is_local_agent;
              this.trader_title = 'Product Registrant';
            }

            this.traderAccountsDetailsData = data.data;
            this.modalService.getModal('traderAccountsDetailsModal').open();
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
        */
  }
  //isManufacturerPopupVisible
 
  onTraderasContactpersnChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyTraderasContactPerson = true;

    }else{
      this.isReadOnlyTraderasContactPerson = false;
    }
    

  }
    onTraderasBillingpersnChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyTraderasBillingPerson = true;

    }else{
      this.isReadOnlyTraderasBillingPerson = false;
    }
    

  }

 onContractGiverManufacturer($event) {

  if($event.value == 2){
      this.isonContractGiverManufacturer = true;
      this.gmpControl.setValidators([Validators.required]);
      this.gmpControl.updateValueAndValidity();
  }
  else{
    this.isonContractGiverManufacturer = false;
    this.gmpControl.clearValidators();
    this.gmpControl.updateValueAndValidity();

  }
} 
onInspectedByWho($event) {

  if($event.value == 1){
      this.isonInspectedByWho = true;
      this.gmpControl.setValidators([Validators.required]);
      this.gmpControl.updateValueAndValidity();
  }
  else{
    this.isonInspectedByWho = false;
    this.gmpControl.clearValidators();
    this.gmpControl.updateValueAndValidity();

  }
} 
  
  funcSelectPremisePersonnel(data) {
    if(this.personnel_type_id == 1){
      this.inspectionHistorydetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name})
    }
   
    
    this.isPersonnelPopupVisible = false;
    
  }

  funcSelectBillingPremisePersonnel(data) {
    if(this.personnel_type_id == 1){
      this.inspectionHistorydetailsfrm.patchValue({ billing_person_id: data.data.id, billing_person: data.data.name})
    }
   
    
    this.isBillingPersonnelPopupVisible = false;
    
  }
  onSectionsCboSelect($event) {
    this.onBusinessTypesLoad($event.value)
  }
 
    onBusinessTypesLoad(section_id) {

    var data = {
      table_name: 'par_business_types',
      section_id: section_id,
      is_manufacturer:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypesData = data;
        },
        error => {
          return false
        });
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
      
                  this.inspectionHistorydetailsfrm.patchValue({ contact_person_id: app_resp.record_id, contact_person: name})
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

        onSaveNewBillingPremisesPersonnelDetails() {
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
      
                  this.inspectionHistorydetailsfrm.patchValue({ billing_person_id: app_resp.record_id, billing_person: name})
                }
               
                this.isaddNewBillingPremisesPersonnelDetails = false;
                this.isBillingPersonnelPopupVisible = false;
              } else {
                this.toastr.error(app_resp.message, 'Alert');
              }
              this.spinner.hide();
            },
            error => {
              this.toastr.error('Error Occurred', 'Alert');
            });
      }

      onRegisteredGMPSearch() {
        //load the Premises Details 
        this.appService.getGMPDataDetails({ mistrader_id:this.mistrader_id}, 'gmpinspection/getTradersRegisteredGMPApplications')
        .subscribe(
          data => {
            if (data.success) {
            this.ispremisesSearchWinVisible= true;
              this.registered_gmpApplicationData = data.data;
            }
            else {
              this.toastr.success(data.message, 'Alert');
            }
          },
          error => {
            return false
          });
      }




      onRegisteredPremisesSearch() {
          
          //load the Premises Details 
          this.premService.onLoadRegisteredPremises({})
            .subscribe(
              data_response => {
              this.ispremisesSearchWinVisible= true;
                this.registered_gmpApplicationData = data_response.data;
              },
              error => {
                return false
              });
      }


       onDomesticPremisesSearch() {
      if(this.manufacturing_site_id < 1){
          this.toastr.error('Gmp Application has already been saved.', 'Alert');
          return;
          
      }
      else{
        this.appService.getGMPDataDetails({ mistrader_id:this.mistrader_id, section_id: this.section_id }, 'gmpinspection/getTradersRegisteredPremises')
        .subscribe(
          data => {
            if (data.success) {
              
              this.ispremisesSearchWinVisible= true;
              this.registered_premisesData = data.data;

            }
            else {
              this.toastr.success(data.message, 'Alert');
            }
          },
          error => {
            return false
          });
      }
    
  }
      funcSelectTraderDetails(data) {
        let record = data.data;
        
          this.inspectionHistorydetailsfrm.get('local_agent_name').setValue(record.trader_name);
          this.inspectionHistorydetailsfrm.get('local_agent_id').setValue(record.id);
          this.isRegistrantDetailsWinshow = false;
      }
      funcSelectPremiseDetails(data){
        this.inspectionHistorydetailsfrm.patchValue(data.data);
         this.ispremisesSearchWinVisible= false;
         this.isgmpapplicationSearchWinVisible = false;
         
  }    
  funcSelectManData(data){
    this.manufacturerFrm.patchValue(data.data);
    this.manufacturerFrm.patchValue({manufacturer_id:data.data.id});
    this.isproductManufacturerModalShow = false;
  }
  funcSelectManufacturer(data) {
    if (this.gmp_type_id == 2) {
      let resp_data = data.data;
      this.inspectionHistorydetailsfrm.patchValue({manufacturer_name:resp_data.manufacturer_name,man_site_id:resp_data.man_site_id});
      this.inspectionHistorydetailsfrm.patchValue({section_id:this.section_id,gmp_type_id:2});
    }
    else {
      this.gmp_type_id = 1
      this.inspectionHistorydetailsfrm.patchValue(data.data);
      
      this.inspectionHistorydetailsfrm.patchValue({section_id:this.section_id,gmp_type_id:1});
    }
     
    this.isManufacturerPopupVisible = false;
  }

  funcSelectManufacturerSite(data) {
    if (this.gmp_type_id == 2) {
      let resp_data = data.data;
      this.inspectionHistorydetailsfrm.get('manufacturer_site_name').setValue(resp_data.manufacturer_name);
      this.inspectionHistorydetailsfrm.get('site_country_id').setValue(resp_data.country_id);
      this.inspectionHistorydetailsfrm.get('site_physical_address').setValue(resp_data.physical_address);
    }
    else {
      this.gmp_type_id = 1
      this.inspectionHistorydetailsfrm.get('manufacturer_site_name').setValue(data.data.manufacturer_name);
      this.inspectionHistorydetailsfrm.get('site_country_id').setValue(data.data.country_id);
      this.inspectionHistorydetailsfrm.get('site_physical_address').setValue(data.data.physical_address);
    }
     
    this.isManufacturerSitePopupVisible = false;
  }



  onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, 'Add New Personnel',is_readonly);
  }

    onBillingPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewBillingPremisesPersonnelDetails, 'Add New Billing Personnel',is_readonly);
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
  

  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
  }

   funAddNewBillingPremisesPersonnelDetails() {
    this.isaddNewBillingPremisesPersonnelDetails = true;
  }

  onAddManufacturerDetails() {
    this.spinner.show();
    let manufacturer_name = this.manufacturerFrm.get('name').value;
    this.utilityService.onsaveApplicationUniformDetails('',  this.manufacturerFrm.value,'saveManufacturerSiteFulldetails')
      .subscribe(
        response => {
          let resp = response.json();
          //the details 
          if (resp.success) {
            //  the record 
            this.inspectionHistorydetailsfrm.patchValue(resp.record);
      
             this.inspectionHistorydetailsfrm.patchValue({section_id:this.section_id,gmp_type_id:1});

            this.isAddNewManufacturingSite = false;
            this.isManufacturerPopupVisible = false;
            this.toastr.success(resp.message, 'Response');
  
          } else {
            this.toastr.error(resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
        
  }
 
  onSearchManufacturer() {
this.isproductManufacturerModalShow= true;
  let me = this;
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
}
