

import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedPremisesregistrationclassComponent } from '../../shared-premisesregistrationclass/shared-premisesregistrationclass.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';

@Component({
  selector: 'app-premises-generaldetails',
  templateUrl: './premises-generaldetails.component.html',
  styleUrls: ['./premises-generaldetails.component.css']
})
export class PremisesGeneraldetailsComponent  implements OnInit, OnDestroy {

  @Input() premisesGeneraldetailsfrm: FormGroup;
  @Input() sectionsData: any;
  @Input() premisesTypeData: any;
  @Input() countries: any;
  @Input() regions: any;
  @Input() districts: any;
  @Input() businessTypesData: any;
  @Input() businessScaleData: any;
  @Input() businessCategoryData: any;
  @Input() zoneData: any;
  @Input() isConvicted:boolean;
  @Input() isCancelled:boolean;
  @Input() confirmDataParam: any;
  @Input() sub_module_id: number;
  @Input() status_id:number;

  @Input() module_id: number;
  @Input() application_code: number;
  @Input() tra_premise_id: number;
  @Input() registered_id: number;
  @Input() premPersonnelDetailsData: any;
  @Input() supervisingDetailsData: any = {};

  @Input() isReadOnlyTraderasContact: boolean;
   @Input() is_readonly: boolean;
  @Input() payingCurrencyData: boolean;
  @Input() fastTrackOptionsData: boolean;
  @Input() isSupervisorPopupVisible: boolean;
  @Input() premise_id: number;
  @Input() classificationData: any;

  region_id:number;
  country_id:number;
  county_id:number;
  personnel_type_id:number;
  personnel_informationData:any;
  isPersonnelPopupVisible:boolean;
  section_id:number;
  businessTypeDetailsData:any;
  applicantTypesData:any;
  countyData:any;
  qualificationsData:any;
  subCountyData:any;
  business_type_id:number;
  premise_type_id:number;
  isaddNewPremisesPersonnelDetails:boolean=false;
  is_made_readOnly:boolean=false;
  is_made_relocation:boolean=false;
  isDisabledVehicleReg:boolean;
  @Output() businessTypeEvent = new EventEmitter();
  
  @Input() newPremisesPersonnelDetailsFrm: FormGroup;
  app_resp:any;
  businesstypeCategoriesData:any;
  premiseClassData:any;
  isSectionHidden:boolean=false;
  is_other_classification:boolean=false;
  sectorsData:any;
  district_id:number;
  businessDetailsData:any;
  premisesTypesData:any;
  cellsData:any;
  perishData:any;
  villageData:any;
  psuNo:any;
  company_registration_no:any;
  sector_id:number;
  sub_county_id:number;
  parish_id:number;
  private destroy$ = new Subject<void>();
  private isFetchingData = false;
  registeringOrganisationData:any;
  has_otherregisteringorganisation:boolean= false
  constructor(public cdr: ChangeDetectorRef,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {


  }

  ngOnInit() {
   // this.onBusinessTypesLoad(this.section_id);
    this.onregisteringOrganisationDataLod();
    this.onLoadclassificationData();
    this.onLoadSections();
    this.onLoadapplicantTypesLoad();
    this.onLoadBusinessTypesLoad();
    this.onLoadQualificationDetails();
    this.onLoadBusinessDetails();
    this.onLoadPremiseTypesLoad();

  if(this.sub_module_id == 1 || this.sub_module_id == 2 || this.sub_module_id == 3 ){
      this.is_made_readOnly = true;
  }else if(this.sub_module_id == 108 || this.sub_module_id == 109){
    this.is_made_readOnly = true;
    this.is_made_relocation = true;

  }else{
    this.is_made_readOnly = false;
    this.is_made_relocation = false;

  }

    if(!this.application_code){
      if(this.sub_module_id == 108){
          this.premisesGeneraldetailsfrm.get('country_id').setValue(37);
          this.premisesGeneraldetailsfrm.get('business_type_id').setValue(3);

      }
      this.premisesGeneraldetailsfrm.get('country_id').setValue(37);

    }        
    this.setupSearchByPsuNoHandler();
    this.setupSearchByCompanyRegNoHandler();
    
  }  

  private setupSearchByPsuNoHandler(): void {
    this.premisesGeneraldetailsfrm
      .get('psu_no')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((psuNo) => {
        if (!this.isFetchingData) {
          this.isFetchingData = true;
          this.searchByPsuNo(psuNo);
        }
      });
  } 
  private setupSearchByCompanyRegNoHandler(): void {
    this.premisesGeneraldetailsfrm
      .get('company_registration_no')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((company_registration_no) => {
        if (!this.isFetchingData) {
          this.isFetchingData = true;
          this.searchByCompanyRegNo(company_registration_no);
        }
      });
  } 





captureLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
   if(this.sub_module_id === 109) {
          const proposed_latitude = position.coords.latitude;
          const proposed_longitude = position.coords.longitude;
          this.premisesGeneraldetailsfrm.patchValue({ proposed_latitude, proposed_longitude });
        }else{
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.premisesGeneraldetailsfrm.patchValue({ latitude, longitude });

        }
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

   searchByPsuNo(psuNo){
    this.appService.onLoadApplicantPharmacist(psuNo).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          const dataItem = response.data[0];
          this.premisesGeneraldetailsfrm.get('full_names').setValue(dataItem.name);
          this.premisesGeneraldetailsfrm.get('pharmacist_email').setValue(dataItem.email);
          this.premisesGeneraldetailsfrm.get('psu_date').setValue(dataItem.psu_date);
          this.premisesGeneraldetailsfrm.get('pharmacist_telephone').setValue(dataItem.telephone);
          this.premisesGeneraldetailsfrm.get('pharmacist_qualification').setValue(dataItem.qualification_id);
          this.premisesGeneraldetailsfrm.get('pharmacist_country_id').setValue(dataItem.country_id);
          this.premisesGeneraldetailsfrm.get('pharmacist_region_id').setValue(dataItem.region_id);
          this.premisesGeneraldetailsfrm.get('pharmacist_district_id').setValue(dataItem.district_id);
          this.premisesGeneraldetailsfrm.get('pharmacist_id').setValue(dataItem.id);


        } else {
          
          this.toastr.error('No data found for the given PSU No');
        }

        this.isFetchingData = false;
      },
      (error) => {
        this.isFetchingData = false;
      }
    );
  } 
searchByCompanyRegNo(company_registration_no) {
  this.appService.onLoadCompanyDetails(company_registration_no).subscribe(
    (response: any) => {
      if (response.success && response.results.length > 0) {
        const dataItem = response.results[0];
        this.premisesGeneraldetailsfrm.get('premises_name').setValue(dataItem.name);
        this.premisesGeneraldetailsfrm.get('reg_date').setValue(dataItem.registration_date);
        this.premisesGeneraldetailsfrm.get('company_reg_id').setValue(dataItem.id);
      } else {
        this.toastr.error('No data found for the given Business Registration No.');
      }

      this.isFetchingData = false;
    },
    (error) => {
      console.error('Error fetching company details:', error);
      this.toastr.error('An error occurred while fetching company details. Please try again.');
      this.isFetchingData = false;
    }
  );
}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadDistricts(this.country_id);

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
   onLoadSections() {
    var data = {
      table_name: 'par_premise_class',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.premiseClassData = data;
        });
  }
onLoadRegions(district_id) {
  this.config.onLoadRegionsData(district_id)
    .subscribe(
      data => {
        if (data.success) {
          this.regions = data.data;
        } else {
        }
      },
      error => {
        console.error('HTTP request failed:', error);
        return false;
      });
}
// onLoadCounty(district_id) {
//   this.config.onLoadCountyData(district_id)
//     .subscribe(
//       data => {
//         if (data.success) {
//           this.countyData = data.data;
//         } else {
//         }
//       },
//       error => {
//         console.error('HTTP request failed:', error);
//         return false;
//       });
// }
onLoadCounty(district_id) {
    var data = {
      table_name: 'par_county',
      district_id: district_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.countyData = data
        },
        error => {
          return false;
        });
}


  oCountyCboSelect($event) {
   if ($event.selectedItem) {
    this.county_id = $event.selectedItem.id;
    this.onLoadSubCounty(this.county_id);
    }
  }
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
  onLoadSubCounty(county_id) {
    var data = {
      table_name: 'par_sub_county',
      county_id: county_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.subCountyData = data
        },
        error => {
          return false;
        });
  }

  onBusinesTypeCboSelect($event) {
    
    this.business_type_id = $event.value;
    this.onBusinessTypesDetailsLoad(this.business_type_id);
   this.businessTypeEvent.emit(this.business_type_id);


  }

  
  onREgOrganisationCboSelect($event) {
    
    let is_other_config = $event.selectedItem.is_other_config;
    if(is_other_config ==1){
      this.has_otherregisteringorganisation = true;

    }
    else{

      this.has_otherregisteringorganisation = false;

    }
   

  }
  onCategoriesDataCboSelect($event) {
    
    this.business_type_id = $event.value;
    
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
  
  onLoadDistricts(country_id) {
    var data = {
      table_name: 'par_premise_districts',
      country_id: country_id
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
  onLoadSectors(district_id) {
    var data = {
      table_name: 'par_sectors',
      district_id: district_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.sectorsData = data
        },
        error => {
          return false;
        });
  }
  onLoadCells(sector_id) {
    var data = {
      table_name: 'par_cells',
      sector_id: sector_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.cellsData = data
        },
        error => {
          return false;
        });
  }
  

  // onRegionsCboSelect($event) {
  //   this.region_id = $event.selectedItem.id;

  //   //this.onLoadCounty(this.region_id);

  // }
 
  onLoadclassificationData() {
    var data = {
      table_name: 'par_classifications',
     // section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
        });
  }
  
  oDistrictsCboSelect($event) {
    this.district_id = $event.selectedItem.id;

    this.onLoadCounty(this.district_id);
    this.onLoadRegions(this.district_id);

  }
  onLoadParishes(sub_county_id) {
    var data = {
      table_name: 'par_parishes',
      sub_county_id: sub_county_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.perishData = data
        },
        error => {
          return false;
        });
  }

    onSubCountyCboSelect($event) {
    this.sub_county_id = $event.selectedItem.id;

    this.onLoadParishes(this.sub_county_id);

  }

  onLoadVillages(parish_id) {
    var data = {
      table_name: 'par_villages',
      parish_id: parish_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.villageData = data
        },
        error => {
          return false;
        });
  }
    onParishesCboSelect($event) {
    this.parish_id = $event.selectedItem.id;

    this.onLoadVillages(this.parish_id);
}
  
  onTraderasContactpersnChange($event) {
    
    if($event.selectedItem.id == 1){
        this.isReadOnlyTraderasContact = true;

    }else{
      this.isReadOnlyTraderasContact = false;
    }
    

  }  
   onOtherClassificationChange($event) {
    if($event.value == 3){
        this.is_other_classification = true;

    }else{
      this.is_other_classification = false;
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

  }onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, 'Add Personnel',is_readonly);
  }
  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
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
  onPremisesTypeSelect($event){

    if($event.value == 1){

      this.isDisabledVehicleReg = true;
    }
    else{
      this.isDisabledVehicleReg = false;

    }
  }
    onApplicantCancelledChange($event) {
    if($event.selectedItem.id == 1){
        this.isCancelled = true;

    }else{
      this.isCancelled = false;
    }
    

  }  
   onApplicantConvictionChange($event) {
    
    if($event.selectedItem.id == 1){
        this.isConvicted = true;

    }else{
      this.isConvicted = false;
    }
    

  }
    onLoadPremisesPersonnelDetails() {

    this.appService.onLoadPremisesPersonnelDetails(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premPersonnelDetailsData = data.data;
        },
        error => {
          return false
        });
  }
    onLoadPremiseTypesLoad() {

    var data = {
      table_name: 'par_premises_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.premisesTypesData = data;
        },
        error => {
          return false
        });
  }
  onLoadBusinessTypesLoad() {

    var data = {
      table_name: 'par_business_types',
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
    onLoadBusinessDetails() {

    var data = {
      table_name: 'par_business_types',
     // premise_type_id: premise_type_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessDetailsData = data;
        },
        error => {
          return false
        });
  }



   funcSelectSupervisingDetails(data){
    this.premisesGeneraldetailsfrm.patchValue(data.data);
      this.isSupervisorPopupVisible= false;         
  }

   onSearchSupervisingDetails() {
      this.appService.onLoadPremisesPersonnelDetails({})
        .subscribe(
          data_response => {
            this.isSupervisorPopupVisible = true;
            this.supervisingDetailsData = data_response.data;
          },
          error => {
            return false
      


       });
  }
  OnLoadBusinesstypeCategories(section_id) {

    var data = {
      table_name: 'par_businesstype_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businesstypeCategoriesData = data;
        },
        error => {
          return false
        });
  }
  onregisteringOrganisationDataLod() {

    var data = {
      table_name: 'par_registering_organisations'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.registeringOrganisationData = data;
        },
        error => {
          return false
        });
  }
  
  funcSelectPremisePersonnel(data) {
      this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name})
    
       this.isPersonnelPopupVisible = false;
    
  } onSaveNewPremisesPersonnelDetails() {
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
              this.app_resp = response.json();
              //the details 
              if (this.app_resp.success) {
                
                  this.toastr.success(this.app_resp.message, 'Response');
      
                  this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: this.app_resp.record_id, contact_person: name})
                
                this.isaddNewPremisesPersonnelDetails = false;
  this.isPersonnelPopupVisible = false;
              } else {
                this.toastr.error(this.app_resp.message, 'Alert');
              }
              this.spinner.hide();
            },
            error => {
              this.toastr.error('Error Occurred', 'Alert');
            });
      } funcpopWidth(percentage_width) {
        return window.innerWidth * percentage_width/100;
      }
}
