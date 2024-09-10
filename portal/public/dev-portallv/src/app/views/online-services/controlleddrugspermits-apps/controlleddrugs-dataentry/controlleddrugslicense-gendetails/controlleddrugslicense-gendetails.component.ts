import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import CustomStore from 'devextreme/data/custom_store';
import { WizardComponent } from 'ng2-archwizard';
import { Utilities } from 'src/app/services/common/utilities.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-controlleddrugslicense-gendetails',
  templateUrl: './controlleddrugslicense-gendetails.component.html',
  styleUrls: ['./controlleddrugslicense-gendetails.component.css']
})
export class ControlleddrugslicenseGendetailsComponent implements OnInit {
  @Input() applicationGeneraldetailsfrm: FormGroup;

  @Input() sectionsData: any;
  @Input() applicationTypeData: any; 
  @Input() applicationCategoryData: any; 
  @Input() sub_module_id: any; 
  @Input() applicationTypeCategoryData: any; 
  @Input() permitReasonData: any; 
  @Input() portOfEntryExitData: any; 
  @Input() payingCurrencyData: any; 
  @Input() is_registered:number;
  @Input() newPremisesPersonnelDetailsFrm: FormGroup;
  @Input() currencyData: any;
  @Input() consigneeOptionsData: any; 
  @Input() consignee_options_check: any; 
  @Input() zoneData: any; 
  @Input() registrationLevelData: any;
  @Input() product_classification_id: any;
  @Input() businessTypeData:any;
  @Input() module_id: any; 
  @Input() importExportPermitTypesData: any; 
  @Input() application_code: any; 
  @Input() ispremisesSearchWinVisible: any; 
  @Input() is_registered_premise : boolean;
  @Input() registered_premisesData: any; 
  @Input() has_registered_premises:number;
  @Input() issenderreceiverSearchWinVisible: any; 
  @Input() consignee_sendertitle: any; 
  @Input() issenderreceiverAddWinVisible: any; 
  @Input() permitReceiverSenderFrm: FormGroup; 
  @Input() countries: any; 
  @Input() regions: any; 
  @Input() districts: any; 
  @Input() is_clinical: boolean;
  @Input() is_grant: boolean;
  @Input() is_govement: boolean;
  @Input() is_importation: boolean =false;
  @Input() LicencedproductRangeData: any;
  @Input() section_id: number; 
  @Input() importexport_permittype_id: number; 
  @Input() importation_reason_id:number;
  @Input() importationReasonData:any;
  @Input() productImportationCategoryData:any;
  @Input() product_category_id:number;  
  @Input() deviceTypeData: any; 
  @Input() modeOfTransportData:any;
  proforma_currency_id:number;
  @Input() licence_type_id:number;
  @Input()  business_type_id:number;
  @Input() licenceTypeData: any; 
  @Input() vcApplicationTypeData: any;
  @Input() productClassData:any;
  @Input() premiseClassData:any;
  @Input() isProductCategoryId: number;
  @Input() port_id:number;
  @Input() permitProductsCategoryData: any; 
  @Input() isclinicalTrialSearchWinVisible:boolean;
  @Input() registered_clinicalTrialData:any={};
  @Input() manufacturersSiteData: any = {};

  @Output() onProformaInvoiceEvent = new EventEmitter();
  confirmDataParam:any;
  has_registred_outlet:boolean= false;
  device_type_visible:boolean= false;
  import_typecategory_visible:boolean= false;
  is_not_registered_premise:boolean= false;
  isReadOnlyTraderasContactPerson:boolean= false;
  isReadOnlyTraderasConsigneePerson:boolean= false;
  is_domestic_gmp:boolean= false;
  is_not_domestic_gmp:boolean= false;
  isPersonnelPopupVisible:boolean= false;
  is_technical_declaration:boolean= false;
  is_exportation:boolean= false;
  isReadOnlyDonation:boolean= false;
  consignee_options_id:number;
  mode_oftransport_id:number;
  senderReceiverData:any ={};
  checkifsenderreceiver:boolean;
  isconsigneeSearchWinVisible:boolean;
  consigneeReceiverData:any ={};
  dataGrid: DxDataGridComponent;
  app_resp:any;
  applicationData:any;
  mistrader_id:number;
  registered_gmpApplicationData:any;
  premiseTypeData:any;
  personnel_informationData:any;
  qualificationsData:any;
  showreason_fornonregister_outlet:boolean= false;
  isLocalGMPSearchWinVisible: boolean =false;
  is_readOnly: boolean =false;
  is_licensepermit: boolean =false;
  show_visalicensedetails: boolean =false;
  importexport_product_range_id:number;
  vc_application_type_id:number;
  hasotherpermit_reason:boolean= false;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  constructor(public utilityService:Utilities,public gmpService: GmpApplicationServicesService, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
  

  }
  ngOnInit(){
    this.onLoadCountries();
    this.onLoadconfirmDataParm() ;
    this.onLoadApplicationType();
    this.onLoadPremiseTypeDataChange();
    this.onLoadbusinessTypeData();
    this.onLoadLicenceType();
    this.onLoadvcApplicationData();
    this.onLoadportOfEntryExitData(this.mode_oftransport_id);
    //this.onLoadImportReasons(this.business_type_id, this.licence_type_id);
    this.onLoadQualificationDetails();
   // this.onLoadImportRegistrationLevelData();
    if(this.section_id == 4){
      this.device_type_visible = true;
    }else if(this.sub_module_id == 60){
      this.is_licensepermit = false;
      this.show_visalicensedetails = true; 
      this.is_readOnly = true
      
      
    }else if(this.sub_module_id == 115){
      this.is_technical_declaration = false; 
      this.applicationGeneraldetailsfrm.get('sub_module_id').setValue(this.sub_module_id); 

      
    }
   
  }
  
  onPermitReasonDataSelect($event) {
    
    if($event.selectedItem.id){
      let is_other_config = $event.selectedItem.is_other_config;

      if(is_other_config == 1){
        this.hasotherpermit_reason = true;
       // this.applicationGeneraldetailsfrm.get('otherpermit_reason').setValidators([Validators.required]);
      }else{
        this.hasotherpermit_reason = false;
       // this.applicationGeneraldetailsfrm.get('otherpermit_reason').setValidators([]);
      }
    }
  }


  funcSelectManufacturerSite(data) {
      let resp_data = data.data;
      this.applicationGeneraldetailsfrm.get('manufacturing_site_name').setValue(resp_data.manufacturing_site_name);
      this.applicationGeneraldetailsfrm.get('manufacturing_site_id').setValue(resp_data.manufacturing_site_id);
      this.applicationGeneraldetailsfrm.get('pharmacist_id').setValue(resp_data.pharmacist_id);
      this.applicationGeneraldetailsfrm.get('psu_date').setValue(resp_data.psu_date);
      this.applicationGeneraldetailsfrm.get('psu_no').setValue(resp_data.psu_no);
      this.applicationGeneraldetailsfrm.get('pharmacist_telephone').setValue(resp_data.pharmacist_telephone);
      this.applicationGeneraldetailsfrm.get('pharmacist_email').setValue(resp_data.pharmacist_email);
      this.applicationGeneraldetailsfrm.get('pharmacist_qualification').setValue(resp_data.pharmacist_qualification);
      this.applicationGeneraldetailsfrm.get('pharmacist_country_id').setValue(resp_data.pharmacist_country_id);
      this.applicationGeneraldetailsfrm.get('pharmacist_district_id').setValue(resp_data.pharmacist_district_id);
      this.applicationGeneraldetailsfrm.get('pharmacist_region_id').setValue(resp_data.pharmacist_region_id);
      this.isLocalGMPSearchWinVisible = false;

  }

  onRegisteredGMPSearch() {
    this.isLocalGMPSearchWinVisible = true;
    this.gmpService.getGMPDataDetails({ mistrader_id:this.mistrader_id},'importexportapp/getTradersRegisteredGMPApplications')
    .subscribe(
      data => {
        if (data.success) {
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
  onLoadImportReasons(business_type_id, licence_type_id) {
     this.appService.onLoadImportationReasonsDetails(business_type_id, licence_type_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.importationReasonData = data.data;
        },
        error => {
          return false;
        });
  } 

  onSelectBusinessType($event) {
    this.business_type_id = $event.selectedItem.id;
    if(this.business_type_id == 5){
      this.is_domestic_gmp = true;
      this.is_not_domestic_gmp= false;
      this.applicationGeneraldetailsfrm.get('manufacturer_name').setValidators([Validators.required]); 
      this.applicationGeneraldetailsfrm.get('manufacturing_site_id').setValidators([Validators.required]); 


    }else{
      this.is_domestic_gmp = false;
      this.is_not_domestic_gmp=true;
    }
    this.onLoadLicenceProductRangeData(this.business_type_id, this.licence_type_id, this.product_classification_id);
    this.onLoadImportReasons(this.business_type_id, this.licence_type_id);

  }

  onSelectLicenceType($event) {
    const licence_type_id = $event.selectedItem.id;
    this.licence_type_id = licence_type_id;
    this.onLoadImportReasons(this.business_type_id, this.licence_type_id);
    this.onLoadLicenceProductRangeData(this.business_type_id, this.licence_type_id, this.product_classification_id);
    if( this.licence_type_id == 3 ||  this.licence_type_id == 4){
      this.is_importation = true;
      this.is_exportation= false
    }else{
      this.is_importation = false;
      this.is_exportation= true

    }


  }

onSelectImportationReasons($event){
    this.importation_reason_id = $event.selectedItem.id;
    if (this.importation_reason_id == 7) {
      this.is_clinical = true;
      this.isReadOnlyDonation = false;
      this.is_grant = false;
    } else if(this.importation_reason_id == 10){
      this.is_grant = true;
      this.is_clinical = false;
     this.isReadOnlyDonation = false;

    }else if(this.importation_reason_id == 9){
      this.isReadOnlyDonation = true;
      this.applicationGeneraldetailsfrm.get('proforma_currency_id').setValue(1);
    }
    else{
      this.is_clinical = false;
      this.is_grant = false
      this.isReadOnlyDonation = false;

    }

}


    onSelectProductClassification($event) {
    this.product_classification_id = $event.selectedItem.id;
    this.onLoadLicenceProductRangeData(this.business_type_id, this.licence_type_id, this.product_classification_id);
    if(this.sub_module_id == 61){
      const licence_type_id = 5; 
      const business_type_id = 5; 
      this.onLoadLicenceProductRangeData(business_type_id, licence_type_id, this.product_classification_id);

    }

  }
    onLoadLicenceProductRangeData(business_type_id , licence_type_id, product_classification_id) {
    this.configService.onLoadProductRangeDetails(business_type_id, licence_type_id, product_classification_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.LicencedproductRangeData = data.data;
        },
        error => {
          return false;
        });
  }
onLoadImportCategoryData(importexport_product_range_id: number[]) {
    if (!importexport_product_range_id || importexport_product_range_id.length === 0) {
      return;
    }

    this.appService.onLoaProductImportRangeDetails(importexport_product_range_id)
      .subscribe(
        data => {
          if (data && data.data) {
            this.productImportationCategoryData = data.data;
          } else {
            console.error('No data received');
          }
        },
        error => {
          console.error('Error loading product import range details', error);
        }
      );
  }

  onSelectProduct(selectedItems: any): void {
    if (Array.isArray(selectedItems.addedItems)) {
        const selectedIds = selectedItems.addedItems.map(item => item.id);
        this.onLoadImportCategoryData(selectedIds);
        this.importexport_product_range_id = selectedIds;
    } 
}


  onProformaInvoiceCurrencyChange($event) {
    this.proforma_currency_id = $event.value;
    this.onProformaInvoiceEvent.emit(this.proforma_currency_id);
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onsearchSenderreceiver() {
    this.consignee_sendertitle = 'Supplier Details';
    this.checkifsenderreceiver = true;
    
        this.issenderreceiverSearchWinVisible = true;

        let me = this;
        this.senderReceiverData.store = new CustomStore({
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
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,table_name:'tra_permitsenderreceiver_data'}
              };
              return me.httpClient.get(AppSettings.base_url + 'importexportapp/getSenderreceiversDetails',this.configData)
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

  onSelectPremiseType($event){
    if ($event.selectedItem.id == 1) {
      this.is_registered_premise = true;
      this.is_not_registered_premise = false;
      this.applicationGeneraldetailsfrm.get('tpin_no').setValidators([]);
      this.applicationGeneraldetailsfrm.get('name').setValidators([]);
      this.applicationGeneraldetailsfrm.get('physical_address').setValidators([]);
      this.applicationGeneraldetailsfrm.get('email').setValidators([]);

        } 
    else{
      this.is_registered_premise = false;
      this.is_not_registered_premise = true;
      this.applicationGeneraldetailsfrm.get('tpin_no').setValidators([Validators.required]);
      this.applicationGeneraldetailsfrm.get('name').setValidators([Validators.required]);
      this.applicationGeneraldetailsfrm.get('physical_address').setValidators([Validators.required]);
      this.applicationGeneraldetailsfrm.get('email').setValidators([]);

    }
    
  }
  onLoadImportRegistrationLevelData() {
    var data = {
      table_name: 'par_import_registration_level',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.registrationLevelData = data;
        });
  }
  onLoadQualificationDetails() {
    var data = {
      table_name: 'par_personnel_qualifications',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.qualificationsData = data;
        });
  }


  onLoadportOfEntryExitData(mode_oftransport_id) {
        this.configService.onLoaPortOfEntryDetails(mode_oftransport_id,this.sub_module_id)
          //.pipe(first())
          .subscribe(
            data => {
              this.portOfEntryExitData = data.data;
            },
            error => {
              return false;
            });

      }
  onShipmentSelect($event) {
    this.mode_oftransport_id = $event.selectedItem.id;

    this.onLoadportOfEntryExitData(this.mode_oftransport_id);

  }
  onApplicantConsigneeChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyTraderasConsigneePerson = true;
      this.applicationGeneraldetailsfrm.get('consignee_name').setValidators([]);


    }else{
      this.isReadOnlyTraderasConsigneePerson = false;
      this.applicationGeneraldetailsfrm.get('consignee_name').setValidators([Validators.required]);

    }
    
  }

    onTraderasContactpersnChange($event) {
    if($event.value == 1){
        this.isReadOnlyTraderasContactPerson = true;
      this.applicationGeneraldetailsfrm.get('contact_person').setValidators([]);


    }else{
      this.isReadOnlyTraderasContactPerson = false;
      this.applicationGeneraldetailsfrm.get('contact_person').setValidators([Validators.required]);

    }
    

  }
  onLoadvcApplicationData() {
    var data = {
      table_name: 'par_vc_application_type',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.vcApplicationTypeData = data;
        });
  }
  onLoadPremiseTypeDataChange() {
    var data = {
      table_name: 'par_business_types',
      is_non_licenced: 1
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.premiseTypeData = data;
        });
  }
 


   onLoadLicenceType() {
    var data = {
      table_name: 'par_licence_type',
   
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.licenceTypeData = data;
        });
  }
    onLoadApplicationType() {
    var data = {
      table_name: 'par_importexport_application_type',
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationData = data;
        });
  }

  onRegisteredPremisesSearch() {

    this.premappService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.ispremisesSearchWinVisible = true;
          this.registered_premisesData = data_response.data;
        },
        error => {
          return false
        });
  }
  nullFunc() {

  }
  onPremisesPerGridToolbar(e) {
    //this.functDataGridToolbar(e, this.nullFunc, '');
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
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
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  
  funcSelectReceiverSender(data) {
    if (this.checkifsenderreceiver) {
      this.applicationGeneraldetailsfrm.get('sender_receiver_id').setValue(data.data.id);
      this.applicationGeneraldetailsfrm.get('sender_receiver').setValue(data.data.name);
    } else {
      this.applicationGeneraldetailsfrm.get('consignee_id').setValue(data.data.id);
      this.applicationGeneraldetailsfrm.get('consignee_name').setValue(data.data.name);
    }
    this.issenderreceiverSearchWinVisible = false;
    this.isconsigneeSearchWinVisible = false;
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

    this.onLoadDistricts($event.selectedItem.id);

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
          this.regions = data;
        },
        error => {
          return false
        });
  }

  onCoutryCboSelect($event) {

    this.onLoadRegions($event.selectedItem.id);
    this.onLoadDistricts($event.selectedItem.id);

  }
  onLoadCountries() {

    var data = {
      table_name: 'par_countries',
      // id: 36
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
    onLoadbusinessTypeData() {
    var data = {
      table_name: 'par_business_types',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypeData = data;
        });
  }
    onPersonnelSearchDetails() {
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
    funcSelectPremisePersonnel(data) {
      this.applicationGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name})
    this.isPersonnelPopupVisible = false;
    
  }
  onsearchConsignee() {
    
    this.consignee_sendertitle = 'Consignee Details';
    this.checkifsenderreceiver = false;

    this.isconsigneeSearchWinVisible = true;
        let me = this;
        this.consigneeReceiverData.store = new CustomStore({
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
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,table_name:'tra_consignee_data'}
              };
              return me.httpClient.get(AppSettings.base_url + 'importexportapp/getSenderreceiversDetails',this.configData)
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


  onsavePermitReceiverSender() {
    this.spinner.show();
    let table_name;
    if (this.checkifsenderreceiver) {
      table_name = 'tra_permitsenderreceiver_data';
    } else {
      table_name = 'tra_consignee_data';
    }
    let name = this.permitReceiverSenderFrm.get('name').value;
    this.appService.onAddPermitReceiverSender(table_name, this.permitReceiverSenderFrm.value)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.issenderreceiverAddWinVisible = false;

            this.updateConsigneeReceiver(this.app_resp.record_id, name)
            this.toastr.success(this.app_resp.message, 'Response');

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  updateConsigneeReceiver(id, name) {
    if (this.checkifsenderreceiver) {
      this.applicationGeneraldetailsfrm.get('sender_receiver_id').setValue(id);
      this.applicationGeneraldetailsfrm.get('sender_receiver').setValue(name);
    } else {
      this.applicationGeneraldetailsfrm.get('consignee_id').setValue(id);
      this.applicationGeneraldetailsfrm.get('consignee_name').setValue(name);
    }
  }
  onsenderreceivePreparing(e) {
    this.functDataGridToolbar(e, this.funcsenderreceivedetails, 'Add Information');
  }
  funcsenderreceivedetails() {
    this.issenderreceiverSearchWinVisible = false;
    this.issenderreceiverAddWinVisible = true;
    this.permitReceiverSenderFrm.reset();
  }
  
  funcSelectPremiseDetails(data) {
    //check if there any pending detail
    let status_id = data.data.validity_status_id;
    
      this.applicationGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
      this.applicationGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
      this.ispremisesSearchWinVisible = false;
   /* }
    else {
      this.toastr.error('The selected premises has an inactive Validity Status. Current Status :' + data.data.status_name + '. Instatiate a premises renewal or contact Authority for further guidelines.', 'Alert');
    }
*/
  }
  
  onhaveRegOutletsChange($event) {
    let has_registered_outlets = $event.selectedItem.id;
    if (has_registered_outlets == 1) {
      this.has_registred_outlet = true;
      this.showreason_fornonregister_outlet = false;
       this.applicationGeneraldetailsfrm.get('premises_name').setValidators([Validators.required]);
      this.applicationGeneraldetailsfrm.get('premise_id').setValidators([Validators.required]);
     
    }
    else {
        this.applicationGeneraldetailsfrm.get('premises_name').setValidators([Validators.required]);
        this.applicationGeneraldetailsfrm.get('premise_id').setValidators([Validators.required]);

        this.has_registred_outlet = true;
        this.showreason_fornonregister_outlet = true;

        alert('Submission of the information of the Registered/Licensed premises in Mandatory on importation of Controlled Drugs, if your application has been submitted kindly select the Non-License premises and give reasons.');
     
    }

 
  }onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
        });
  }
  
}
