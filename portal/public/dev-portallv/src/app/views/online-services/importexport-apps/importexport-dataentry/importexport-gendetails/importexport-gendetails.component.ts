
import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { takeUntil } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

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
import { SharedImportexportclassComponent } from '../../shared-importexportclass/SharedImportexportclassComponent';

@Component({
  selector: 'app-importexport-gendetails',
  templateUrl: './importexport-gendetails.component.html',
  styleUrls: ['./importexport-gendetails.component.css']
})
export class ImportexportGendetailsComponent implements OnInit {
  @Input() applicationGeneraldetailsfrm: FormGroup;
  @Input() manufacturerFrm: FormGroup;
  @Input() newPremisesPersonnelDetailsFrm: FormGroup;
  @Input() sectionsData: any;
  @Input() businessTypeData: any;
  @Input() applicationCategoryData: any; 
  @Input() sub_module_id: any; 
  @Input() is_sub_module:any;
  @Input() premiseClassData:any;
  @Input() applicationTypeCategoryData: any; 
  @Input() permitReasonData: any; 
  @Input() portOfEntryExitData: any; 
  @Input() payingCurrencyData: any;  
  @Input() modeOfTransportData: any; 
  @Input() selectedPremiseId: any;
  @Input() productTypeData:any;
  @Input() premiseTypeData: any; 
  @Input() is_registered_premise : boolean = false;
  @Input() is_clinical: boolean = false;
  @Input() is_grant: boolean = false;
  @Input() is_govement: boolean = false;
  @Input() is_importation: boolean =false;
  @Input() licenceTypeData: any;
  @Input() productClassData: any;
  @Input() isProductCategoryId: number;
  
  @Input() currencyData: any;
  @Input() consigneeOptionsData: any; 
  @Input() consignee_options_check: any; 
  @Input() zoneData: any; 
  @Input() module_id: any; 
  @Input() licence_type_id:any;
  @Input() importation_reason_id:any;
  @Input() product_category_id:any;
  @Input() business_type_id:any;
  @Input() importationReasonData: any;
  @Input() vcApplicationTypeData: any;
  @Input() registrationLevelData: any;
  @Input() productImportationCategoryData: any;
  @Input() applicationTypeData: any; 
  @Input() LicencedproductRangeData: any;
  @Input() application_code: any; 
  @Input() ispremisesSearchWinVisible: any; 
  @Input() isclinicalTrialSearchWinVisible: any;
  @Input() product_classification_id: any;
  @Input() product_type_id: any;
  @Input() importexport_product_range_id: number[];
  @Input() isManufacturerPopupVisible: boolean;
  @Input() port_id:number;
  @Input() has_registered_premises:number;
  @Input() registered_premisesData:any ={};
  @Input() registered_clinicalTrialData:any={};
  @Input() issenderreceiverSearchWinVisible: any; 
  @Input() consignee_sendertitle: any; 
  @Input() issenderreceiverAddWinVisible: any; 
  @Input() permitReceiverSenderFrm: FormGroup; 
  @Input() countries: any; 
  @Input() regions: any;
  @Input() districts: any; 
  @Input() section_id: number; 
  @Input() deviceTypeData: any; 
  @Input() permitProductsCategoryData: any; 
  @Input() manufacturersSiteData: any = {};

  mode_oftransport_id:number;
  proforma_currency_id:number;
  @Output() onProformaInvoiceEvent = new EventEmitter();
  device_type_visible:boolean= false;
  import_typecategory_visible:boolean= false;
  is_domestic_gmp:boolean= false;
  is_not_domestic_gmp:boolean= false;
  isproductManufacturerModalShow:boolean=false;
  isclearingAgentSearchWinVisible:boolean=false;
  isclearingAgentAddWinVisible:boolean=false;
  consignee_options_id:number;
  mistrader_id:number;
  senderReceiverData:any ={};
  checkifsenderreceiver:boolean;
  isPersonnelPopupVisible:boolean;
  isReadOnlyTraderasBillingPerson: boolean;
  isReadOnlyTraderasContactPerson: boolean;
  isReadOnlyTraderasConsigneePerson:boolean=false;
  isconsigneeSearchWinVisible:boolean;
  isaddNewBillingPremisesPersonnelDetails: boolean;
  permitClearingAgentFrm:FormGroup;
  consigneeReceiverData:any ={};
  clearingAentData:any ={};
  dataGrid: DxDataGridComponent;
  app_resp:any;
  shipmentCategoryData:any;
  transportDocumentData:any;
  isReadOnly:boolean;
  traderAccountsDetailsData:any = {};
  is_local_agent:boolean;
  trader_title:string;
  personnel_informationData: any;
  productClassificationData:any;
  qualificationsData: any;
  isRegistrantDetailsWinshow:boolean=false;
  is_other_classification:boolean=false;
  hide_visalicensedetails:boolean = false;
  show_visalicensedetails:boolean;
  is_not_registered_premise:boolean = false;
  is_readOnly:boolean = false;
  invoice_title:string;
  personnel_type_id: number;
  has_registred_outlet:boolean= false;
  has_registered_outlets:boolean= false;
  showreason_fornonregister_outlet:boolean= false;
  is_technical_declaration:boolean= false;
  isReadOnlyDonation:boolean= false;
  confirmDataParam:any;
  portOfEntryData:any
  productappTypeDta:any;
  applicantTypesData:any;
  governmentGrantDate:any;
  registered_gmpApplicationData:any;
  isAddNewManufacturingSite:boolean = false;
  is_licensepermit: boolean =false;
  isLocalGMPSearchWinVisible: boolean =false;
  consignor_title:string = 'Consignor(Importer/Receiver)';
  eligibleImportersData:any;
  eligibleImportersDocTypes:any;
  filesToUpload: Array<File> = [];  
  showsupporting_document:boolean;
  has_submittedpremisesapp:boolean;
  private isFetchingData = false;

  private destroy$ = new Subject<void>();
  processData:any;
  title:string;
  router_link:string;
  premisesapp_details:any;
  app_route:any;
  today: Date;
  maxDate:any;

  premise_title:string = 'Premises(Licensed Outlet(s))';
  constructor(public utilityService:Utilities,public gmpService: GmpApplicationServicesService, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient, private premService: PremisesApplicationsService) {

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

   this.permitClearingAgentFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      validity_period: new FormControl('', Validators.compose([])),
      tin_no: new FormControl('', Validators.compose([]))
    });


    this.newPremisesPersonnelDetailsFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([]))
    });


// console.log(this.licence_type_id, this.business_type_id);
  }



  // export class YourComponent {
  //   maxDate: Date;
  
  //   constructor() {
  //     // Calculate the max date as today's date plus 3 months
  //     const currentDate = new Date();
  //     currentDate.setMonth(currentDate.getMonth() + 3);
  //     this.maxDate = currentDate;
  ngOnInit(){
    this.maxDate = new Date();
    this.today= new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
    if(this.sub_module_id == 78 || this.sub_module_id == 81){
          this.is_licensepermit = true; 
          this.invoice_title = "Commercial Invoice";
    }else if(this.sub_module_id == 12){
      this.is_licensepermit = false;
      this.show_visalicensedetails = true; 
      this.is_readOnly = true
      
      
    }else if(this.sub_module_id == 82){
      this.is_licensepermit = true; 
      this.invoice_title = "Commercial Invoice";
      this.hide_visalicensedetails = true;
      this.has_registred_outlet =false;
      this.showreason_fornonregister_outlet=false;
      
    }else if(this.sub_module_id == 115){
      this.is_technical_declaration = false; 
      this.applicationGeneraldetailsfrm.get('sub_module_id').setValue(this.sub_module_id); 

      
    }else{
      this.is_licensepermit = false;
      this.invoice_title = "Proforma Invoice";
    }
    this.onLoadCountries();
    this.onLoadapplicantTypesLoad();
    this.onLoadQualificationDetails();
    this.onLoadPremiseTypeDataChange();
    this.onLoadbusinessTypeData();
    this.onLoadEligibleImportersData(this.section_id);
    this.onLoadportOfEntryExitData(this.mode_oftransport_id);

    this.onLoadProductAppType();
    this.onLoadclarationportofentry(this.mode_oftransport_id);
    this.onLoadeligibleImportersDocTypes();
    this.onLoadImportExportNonRegProductClassifiction();
    this.onLoadGovernmentGrants();
    this.onLoadShipmentCategory();
    this.onLoadTransportDocumentData();
   // this.onLoadImportReasons(this.business_type_id, this.licence_type_id);
    this.onLoadconfirmDataParm() ;
    if(this.section_id == 4){
      this.device_type_visible = true;
    }
    this.import_typecategory_visible = false;
    if(this.sub_module_id == 13 || this.sub_module_id == 15){
       // this.import_typecategory_visible = true;
    }

    if(this.sub_module_id == 78 || this.sub_module_id ==82 || this.sub_module_id == 12){

      this.consignor_title = 'Consignor(Importer)';

    }
    else{

      this.consignor_title = 'Consignor(Receiver)';
      
    }

    this.setupSearchByTinNoHandler();
  }
  private setupSearchByTinNoHandler(): void {
    this.applicationGeneraldetailsfrm
      .get('tpin_no')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((TinNo) => {
        if (!this.isFetchingData) {
          this.isFetchingData = true;
          this.searchByTinNo(TinNo);
        }
      });
  } 
    searchByTinNo(TinNo){
    this.appService.onLoadApplicantIncharge(TinNo).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          const dataItem = response.data[0];
           this.applicationGeneraldetailsfrm.get('premise_id').setValue(dataItem.id);
           this.applicationGeneraldetailsfrm.get('name').setValue(dataItem.name);
           this.applicationGeneraldetailsfrm.get('physical_address').setValue(dataItem.physical_address);
           this.applicationGeneraldetailsfrm.get('email').setValue(dataItem.email);
           this.applicationGeneraldetailsfrm.get('company_registration_no').setValue(dataItem.company_registration_no);


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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onApplicationCategorySelection($event){
    let permit_category_id = $event.selectedItem.id;
    this.onLoadpermitProductsCategoryData(permit_category_id);

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
                
                  this.toastr.success(app_resp.message, 'Response');
      
                  this.applicationGeneraldetailsfrm.patchValue({ billing_person_id: app_resp.record_id, billing_person: name})
               
                this.isaddNewBillingPremisesPersonnelDetails = false;
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

  // onLoadImportReasons(business_type_id, licence_type_id) {
  //    this.configService.onLoadImportationReasonsDetails(business_type_id, licence_type_id)
  //     //.pipe(first())
  //     .subscribe(
  //       data => {
  //         this.importationReasonData = data.data;
  //       },
  //       error => {
  //         return false;
  //       });
  // }

  onSelectBusinessType($event) {
    this.business_type_id = $event.selectedItem.id;
    if(this.business_type_id == 5){
      this.is_domestic_gmp = true;
      this.is_not_domestic_gmp= false;
      this.applicationGeneraldetailsfrm.get('manufacturer_name').setValidators([Validators.required]); 
      this.applicationGeneraldetailsfrm.get('manufacturing_site_id').setValidators([Validators.required]); 


    }else if((this.business_type_id == 1 || this.business_type_id == 2 || this.business_type_id == 4)&& this.sub_module_id==81){
      this.is_domestic_gmp = false;
      this.is_not_domestic_gmp=true;
      this.applicationGeneraldetailsfrm.get('premises_name').setValidators([Validators.required]); 
      this.applicationGeneraldetailsfrm.get('premise_id').setValidators([Validators.required]);
      this.onRegisteredPremisesSearch(this.business_type_id);

    }else{
      this.is_domestic_gmp = false;
      this.is_not_domestic_gmp=true;
    }

  }

  onLoadImportExportNonRegProductClassifiction() {
    var data = {
      table_name: 'par_premise_class',
      importexport_product_classification:1
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productClassificationData = data;
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

  onShipmentSelect($event) {
    this.mode_oftransport_id = $event.selectedItem.id;

    this.onLoadportOfEntryExitData(this.mode_oftransport_id);
    this.onLoadclarationportofentry(this.mode_oftransport_id);


  }

   onLoadclarationportofentry(mode_oftransport_id) {
      this.configService.onLoaPortOfEntryDetails(mode_oftransport_id,this.sub_module_id)
          //.pipe(first())
          .subscribe(
            data => {
              this.portOfEntryData = data.data;
            },
            error => {
              return false;
            });

      }


  onLoadGovernmentGrants() {
    
    var data = {
      table_name: 'par_government_grants'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.governmentGrantDate =  data;
        });
  }
  onLoadShipmentCategory() {
    
    var data = {
      table_name: 'par_importshipment_category'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.shipmentCategoryData =  data;
        });
  }
  onLoadTransportDocumentData() {
    
    var data = {
      table_name: 'par_importtransport_documents'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.transportDocumentData =  data;
        });
  }


  onLoadProductAppType() {
    
    var data = {
      table_name: 'par_vc_application_type',
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.productappTypeDta =  data;
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
  // onApplicationDataSelect($event) {
    
  //   if($event.selectedItem.id == 2){
  //     this.is_personnel_medicines = true;
  //     this.applicationGeneraldetailsfrm.get('has_medical_prescription').setValidators([Validators.required]);

  //   }else{
  //     this.is_personnel_medicines = false;
  //     this.applicationGeneraldetailsfrm.get('has_medical_prescription').setValidators([]);

  //   }
  // }





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

  // onSelectBusinessType($event){

  //   if ($event.value == 12 || 14) {
  //       this.is_govement = true;

  //       } 
  //   else{
  //     this.is_govement = false;

  //   }
    
  // }

  onSelectVcType($event){

    if ($event.value == 2) {
          this.is_importation = true;
        } 
    else{
      this.is_importation = false;
    }
    
  }

  onBillingPerGridToolbar(e) {
    this.functDataGridToolbar(e, this.funAddNewBillingPremisesPersonnelDetails, 'Add Billing Person');
  }
  funAddNewBillingPremisesPersonnelDetails() {
    this.isaddNewBillingPremisesPersonnelDetails = true;
  }

  funcSelectPremisePersonnel(data) {
      this.applicationGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name})
    this.isPersonnelPopupVisible = false;
    
  }
  //  onBillingPersonnelSearchDetails(personnel_type_id) {
  //   this.personnel_type_id = personnel_type_id;
  //   this.appService.onLoadPersonnelInformations()
  //   .subscribe(
  //     data_response => {
  //       this.billingpersonnel_informationData = data_response.data;
        
  //          this.isBillingPersonnelPopupVisible = true;
  //     },
  //     error => {
  //       return false
  //     });

  // }

  funcSelectManData(data){
    this.manufacturerFrm.patchValue(data.data);
    this.manufacturerFrm.patchValue({manufacturer_id:data.data.id});
    this.isproductManufacturerModalShow = false;
  }
  onLoadpermitProductsCategoryData(permit_category_id) {

    var data = {
      table_name: 'par_permitsproduct_categories',
      permit_category_id:permit_category_id,
      section_id:this.section_id
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.permitProductsCategoryData = data;
        });

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
  onApplicantConsigneeChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyTraderasConsigneePerson = true;
      this.applicationGeneraldetailsfrm.get('consignee_name').setValidators([]);


    }else{
      this.isReadOnlyTraderasConsigneePerson = false;
      this.applicationGeneraldetailsfrm.get('consignee_name').setValidators([Validators.required]);

    }
    

  }


  onLoadeligibleImportersDocTypes() {

    var data = {
      table_name: 'par_eligible_importersdoctypes'
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.eligibleImportersDocTypes = data;
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

    // onLoadSections(sub_module_id:any) {
  //   var data = {
  //     table_name: 'par_importexport_productcategory',
  //     is_import_export: sub_module_id,
  //   };
  //   this.config.onLoadConfigurationData(data)
  //     .subscribe(
  //       data => {
  //         this.sectionsData = data;
  //       });
  // }
// Use the correct property
    


 //
 // onAssessmentCboSelect($event) {
    
 //    if($event.selectedItem.id){
 //      this.assessment_procedure_id = $event.selectedItem.id;

 //      if(this.assessment_procedure_id == 2 || this.assessment_procedure_id == 5){
 //          this.hasCountriesSelection = false;
 //          this.onLoadCountriesLists(this.assessment_procedure_id) 

 //      }else{
 //        this.hasCountriesSelection = false;
 //        this.gmpapplicationGeneraldetailsfrm.get('gmpassessment_countries_ids').setValue("");
 //      }
 //    }
 //  }

  onOtherClassificationChange($event) {
    if($event.value == 3){
        this.is_other_classification = true;

    }else{
      this.is_other_classification = false;
    }
    

  }
  
  onconsigneeOptionsChange($event) {
    this.consignee_options_id = $event.selectedItem.id;
    if (this.consignee_options_id == 1) {
      this.consignee_options_check = true;
    }
    else {
      this.consignee_options_check = false;
    }

  }
  onhaveSubmittedutlets4Inspection($event){
    let has_submitted_outlets = $event.selectedItem.id;
    
    if (has_submitted_outlets == 1) {
       this.has_registred_outlet = true;
       this.showreason_fornonregister_outlet = false;
       this.applicationGeneraldetailsfrm.get('premises_name').setValidators([]);
        this.applicationGeneraldetailsfrm.get('premise_id').setValidators([]);
     

    }
    else{
      this.modalServ.openDialog(this.viewRef, {
        title: 'Do you want to initiate application for Premises Inspection & Registration Request? Note: the permit application will be allowed upon acceptance of your Premises Application by the Authority?',
        childComponent: '',
        settings: {
          closeButtonClass: 'fa fa-close'
        },
        actionButtons: [{
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
            this.spinner.show();
            this.onPremisesAppSelection();
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

  }
  onPremisesAppSelection() {

    this.spinner.show();
    this.section_id = this.section_id;
    this.sub_module_id = 1;

    this.config.getSectionUniformApplicationProces(this.sub_module_id, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;

            this.premisesapp_details = {module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id };
            this.premService.setPremisesApplicationDetail(this.premisesapp_details);

            this.app_route = ['./online-services/' + this.router_link];

            this.router.navigate(this.app_route);

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }


        });
    return false;
  }
  onhaveRegOutletsChange($event) {
    let has_registered_outlets = $event.selectedItem.id;
    
    if (has_registered_outlets == 1) {
      this.has_registred_outlet = true;
      this.showsupporting_document = false;
      this.showreason_fornonregister_outlet = false;
      this.has_submittedpremisesapp = false;
       this.applicationGeneraldetailsfrm.get('premises_name').setValidators([]);
        this.applicationGeneraldetailsfrm.get('premise_id').setValidators([]);
     
       this.applicationGeneraldetailsfrm.get('eligible_importerscategory_id').setValidators([]);
       this.applicationGeneraldetailsfrm.get('eligible_importersdoctype_id').setValidators([]);
      
    }
    else {
     
        this.applicationGeneraldetailsfrm.get('premises_name').setValidators([]);
        this.applicationGeneraldetailsfrm.get('premise_id').setValidators([]);

        this.applicationGeneraldetailsfrm.get('eligible_importerscategory_id').setValidators([]);
        this.applicationGeneraldetailsfrm.get('eligible_importersdoctype_id').setValidators([]);

        this.has_registred_outlet = false;
        this.showreason_fornonregister_outlet = true;


    }
 
  }

  onChangeImporterCategory($event) {
    let is_non_eligibleimporter = $event.selectedItem.is_non_eligibleimporter;
    if(is_non_eligibleimporter ==1){
      this.has_registred_outlet = true;
      this.showsupporting_document = false;
      
      this.has_submittedpremisesapp = true;
      this.applicationGeneraldetailsfrm.get('premises_name').setValidators([]);
      this.applicationGeneraldetailsfrm.get('premise_id').setValidators([]);
      this.toastr.error('The selected Importer Category is required to submit Premises Application before the Import Process.','Warning -Requirement');

    }else{

      this.has_submittedpremisesapp = false;
      this.showsupporting_document = true;
      this.has_registred_outlet = false;
      this.applicationGeneraldetailsfrm.get('premises_name').setValidators([]);
      this.applicationGeneraldetailsfrm.get('premise_id').setValidators([]);
   
    }
    
  }
  // let non_eligibleimporter = $event.selectedItem.non_eligibleimporter;
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

  
  //  funcSearchRegistrantDetails(is_local_agent) {

  //   //  this.spinner.show();

  //       this.isRegistrantDetailsWinshow = true;
  //       if (is_local_agent == 1) {
  //         this.is_local_agent = is_local_agent;
  //         this.trader_title = 'Local Representative';
  //       }
  //       else {
  //         this.is_local_agent = is_local_agent;
  //         this.trader_title = 'Product Registrant';
  //       }
  //       let me = this;
  //       this.traderAccountsDetailsData.store = new CustomStore({
  //         load: function (loadOptions: any) {
  //             var params = '?';
  //             params += 'skip=' + loadOptions.skip;
  //             params += '&take=' + loadOptions.take;//searchValue
  //             var headers = new HttpHeaders({
  //               "Accept": "application/json",
  //               "Authorization": "Bearer " + me.authService.getAccessToken(),
  //             });
            
  //             this.configData = {
  //               headers: headers,
  //               params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,is_local_agent:is_local_agent }
  //             };
  //             return me.httpClient.get(AppSettings.base_url + 'productregistration/getTraderInformationDetails',this.configData)
  //                 .toPromise()
  //                 .then((data: any) => {
  //                     return {
  //                         data: data.data,
  //                         totalCount: data.totalCount
  //                     }
  //                 })
  //                 .catch(error => { throw 'Data Loading Error' });

  //         }
  //     });
    
  //    // this.traderAccountsDetailsData.load();

  // }
  // funcSelectTraderDetails(data) {
  //   let record = data.data;
  //   this.applicationGeneraldetailsfrm.get('local_agent_name').setValue(record.local_agent_name);
  //   this.applicationGeneraldetailsfrm.get('local_agent_id').setValue(record.local_agent_id);
    
  //   this.isRegistrantDetailsWinshow = false;
  // }
  
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


  onSelectProductClassification($event) {
    this.product_classification_id = $event.selectedItem.id;

      this.onLoadLicenceProductRangeData(this.business_type_id, this.licence_type_id, this.product_classification_id);

  }


//}
  // onSelectLicenceType($event) {
  //   this.licence_type_id = $event.selectedItem.id;
  //   this.onLoadProductRangeData(this.business_type_id, this.licence_type_id, this.product_classification_id);
  //   this.onLoadImportReasons(this.business_type_id, this.licence_type_id);
  // }
  // onSelectBusinessType($event) {
  //   this.business_type_id = $event.selectedItem.id;
  //   this.onLoadLicenceProductRangeData(this.business_type_id , this.licence_type_id, this.product_classification_id)
  //   //this.onLoadImportReasons(this.business_type_id, this.licence_type_id);
  // }
  
  onLoadapplicantTypesLoad() {
    var data = {
      table_name: 'par_premiseapplications_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicantTypesData = data;
        },
        error => {
          return false
        });
  }
  

  onLoadEligibleImportersData(section_id) {
    var data = {
      table_name: 'par_eligible_importerscategories',
      section_id: this.section_id
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.eligibleImportersData = data;
        });
  }
  
  
  onProformaInvoiceCurrencyChange($event) {
    this.proforma_currency_id = $event.value;
    this.onProformaInvoiceEvent.emit(this.proforma_currency_id);
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onsearchSenderreceiver() {
    this.consignee_sendertitle = this.consignor_title;
    this.checkifsenderreceiver = true;
    
        this.issenderreceiverSearchWinVisible = true;

        let me = this;
        this.senderReceiverData.store = new CustomStore({
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

  onsearchClearingAgent() {
        this.isclearingAgentSearchWinVisible = true;
        let me = this;
        this.clearingAentData.store = new CustomStore({
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
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,table_name:'tra_importclearingagent_data'}
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


  onRegisteredPremisesSearch1() {

    this.premappService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.ispremisesSearchWinVisible = true;
          this.registered_premisesData = data_response.data;
        },
        error => {
          return false
        });
  }//23000

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

  onRegisteredPremisesSearch(business_type_id) {
    this.ispremisesSearchWinVisible = true;
    let me = this;
    this.registered_premisesData.store = new CustomStore({
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
            params: { 
                skip: loadOptions.skip, 
                take: loadOptions.take, 
                searchValue: loadOptions.filter, 
                table_name: 'tra_premises_applications', 
                business_type_id:business_type_id 
            }
        };

          return me.httpClient.get(AppSettings.base_url + 'importexportapp/getTradersRegisteredPremises',this.configData)
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




  onRegisteredClinicalTrialSearch() {
      this.isclinicalTrialSearchWinVisible = true;
    let me = this;
    this.registered_clinicalTrialData.store = new CustomStore({
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
              params: {skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,table_name:'tra_premises_applications'}
          };

          return me.httpClient.get(AppSettings.base_url + 'premisesregistration/getTradersRegisteredPremises',this.configData)
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
  
  funcSelectPremiseDetails(data) {
    //check if there any pending detail
    let status_id = data.data.validity_status_id;
    let has_registered_outlets = this.applicationGeneraldetailsfrm.get('has_registered_outlets').value;

   // if (status_id == 2 || has_registered_outlets == 2) {
      this.applicationGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
      this.applicationGeneraldetailsfrm.get('pharmacist_id').setValue(data.data.id);
      this.applicationGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
      this.applicationGeneraldetailsfrm.get('full_names').setValue(data.data.full_names);
      this.applicationGeneraldetailsfrm.get('product_classification_id').setValue(data.data.product_classification_id);
      this.applicationGeneraldetailsfrm.get('business_type_id').setValue(data.data.business_type_id); 
      this.applicationGeneraldetailsfrm.get('psu_date').setValue(data.data.psu_date);
      this.applicationGeneraldetailsfrm.get('psu_no').setValue(data.data.psu_no);
      this.applicationGeneraldetailsfrm.get('pharmacist_telephone').setValue(data.data.pharmacist_telephone);
      this.applicationGeneraldetailsfrm.get('pharmacist_email').setValue(data.data.pharmacist_email);
      this.applicationGeneraldetailsfrm.get('pharmacist_qualification').setValue(data.data.pharmacist_qualification);
      this.applicationGeneraldetailsfrm.get('pharmacist_country_id').setValue(data.data.pharmacist_country_id);
      this.applicationGeneraldetailsfrm.get('pharmacist_district_id').setValue(data.data.pharmacist_district_id);
      this.applicationGeneraldetailsfrm.get('pharmacist_region_id').setValue(data.data.pharmacist_region_id);
      this.ispremisesSearchWinVisible = false;
    /*
    }
    else {
      this.toastr.error('The selected premises has an inactive Validity Status. Current Status :' + data.data.status_name + '. Instatiate a premises renewal or contact Authority for further guidelines.', 'Alert');
    }

    */
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
  
   funcSelectClearingAgent(data) {
    this.applicationGeneraldetailsfrm.get('clearing_agent_id').setValue(data.data.id);
    this.applicationGeneraldetailsfrm.get('agent_name').setValue(data.data.name);
    this.isclearingAgentSearchWinVisible = false;

  }

  onTraderasBillingpersnChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyTraderasBillingPerson = true;

    }else{
      this.isReadOnlyTraderasBillingPerson = false;
    }
    

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

    this.onLoadDistricts($event.selectedItem.id);
    this.onLoadRegions($event.selectedItem.id);

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


  onsaveimportClearingAgent() {
    this.spinner.show();
    let table_name;
      table_name = 'tra_importclearingagent_data';

    let name = this.permitClearingAgentFrm.get('name').value;
    this.appService.onAddPermitReceiverSender(table_name, this.permitClearingAgentFrm.value)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isclearingAgentAddWinVisible = false;
            this.isclearingAgentSearchWinVisible = false;
            this.updateClearingAgent(this.app_resp.record_id, name)
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

  updateClearingAgent(id, name) {
      this.applicationGeneraldetailsfrm.get('clearing_agent_id').setValue(id);
      this.applicationGeneraldetailsfrm.get('agent_name').setValue(name);

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

  onClearingAgentPreparing(e) {
    this.functDataGridToolbar(e, this.funcclearingAgentdetails, 'Add Information');
  }
  funcclearingAgentdetails() {
    this.isclearingAgentAddWinVisible = true;
    this.permitClearingAgentFrm.reset();

  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  
}

onCellRegisteredPremisesPrepared(e) {
  if(e.rowType === "data" && e.column.dataField === "validity_status") {
    let application_status_id =e.data.validity_status_id;
      if(application_status_id ==1){
        e.cellElement.style.color = 'black';
        e.cellElement.style.backgroundColor = '#ff0000';    
      }
      else if(application_status_id == 2){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#3df14f';  
      
      }
      else if(application_status_id == 3){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#c90076';  

      } else{
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#f44336';  
    
      }
  }
}



}
