
import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy  ,Inject, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';

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
import { SharedDrugshopsregistrationclassComponent } from '../../shared-drugshopsregistrationclass/shared-drugshopsregistrationclass.component';

import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';

@Component({
  selector: 'app-drugshop-generaldetails',
  templateUrl: './drugshop-generaldetails.component.html',
  styleUrls: ['./drugshop-generaldetails.component.css']
})
export class DrugshopGeneraldetailsComponent implements OnInit, OnDestroy  {
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
  @Input() confirmDataParam: any;
  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() tra_premise_id: number;
  @Input() registered_id: number;
  @Input() premPersonnelDetailsData: any;
  @Input() supervisingDetailsData: any = {};
  @Input() isReadOnlyTraderasContact: boolean;
  @Input() isConvicted:boolean;
  @Input() isFullTimeIncharge:boolean;
  @Input() isCancelled:boolean;
  @Input() isHealth:boolean;
  @Input() is_readonly: boolean;
  @Input() payingCurrencyData: boolean;
  @Input() fastTrackOptionsData: boolean;
  @Input() isSupervisorPopupVisible: boolean;
  @Input() premise_id: number;
  @Input() classificationData: any;
  region_id:number;
  country_id:number;
  personnel_type_id:number;
  personnel_informationData:any;
  isPersonnelPopupVisible:boolean;
  section_id:number;
  businessTypeDetailsData:any;
  applicantTypesData:any;
  qualificationsData:any;
  telephoneData:any;
  longitude:any;
  latitude:any;
  business_type_id:number;
  business_category_id:number;
  isaddNewPremisesPersonnelDetails:boolean=false;
  isDisabledVehicleReg:boolean;
  @Output() businessTypeEvent = new EventEmitter();
  
  @Input() newPremisesPersonnelDetailsFrm: FormGroup;
  app_resp:any;
  businesstypeCategoriesData:any;
  premiseClassData:any;
  isSectionHidden:boolean=false;
  is_other_classification:boolean=false;
  FullTimeIncharge:boolean=false;
  isHasModelChange:boolean = false;
  addTelephoneModal:boolean = false;
  addTelephonefrm:FormGroup;
  countyData:any;
  perishData:any;
  applicantData:any;
  villageData:any;
  district_id:number;
  applicant_type_id:number;
  subCountyData:any;
  nimNo:any; 
  county_id:number;
  sub_county_id:number;
  parish_id:number;
  trader_id:number;
  private destroy$ = new Subject<void>();
  private isFetchingData = false;
  is_made_readOnly:boolean = false;
  isButtonDisabled:boolean = false;
  registeringOrganisationData:any;
   mapVisible:boolean = false;
  is_renewal:boolean = false;
  mapCenter = { lat: 0, lng: 0 }; // Initial map center
  mapZoom = 11; // Initial zoom level
  markers: any[] = [];
  readonlyFields: string[] = []; 
  has_otherregisteringorganisation:boolean= false
  constructor(public cdr: ChangeDetectorRef,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {

  }
get apiKey(): string {
    return this.configService.apiKey;
  }

  ngOnInit() {

    this.onregisteringOrganisationDataLod();
    this.onLoadclassificationData();
    this.onLoadSections();
    this.onLoadBusinessTypesLoad();
    this.onLoadapplicantTypesLoad();
    this.onLoadQualificationDetails();
    this.onLoadApplicantDetails();

    if(!this.application_code){
      //  this.premisesGeneraldetailsfrm.get('zone_id').setValue(2);
        this.premisesGeneraldetailsfrm.get('country_id').setValue(37);
        this.premisesGeneraldetailsfrm.get('business_type_id').setValue(7);

    }
      this.addTelephonefrm = new FormGroup({
      telephone: new FormControl('', Validators.compose([Validators.required])),
      trader_id: new FormControl('', Validators.compose([Validators.required])),

    });

if(this.sub_module_id == 96 || this.sub_module_id == 110 || this.sub_module_id == 111){
    this.is_made_readOnly = true;

}
      this.setupSearchByNimNoHandler();
      this.setupSearchByCompanyRegNoHandler();

  } 
   private setupSearchByNimNoHandler(): void {
    this.premisesGeneraldetailsfrm
      .get('nin_no')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((nimNo) => {
        if (!this.isFetchingData) {
          this.isFetchingData = true;
          this.searchByNimNo(nimNo);
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


  openMap() {
    this.mapVisible = true;
  }


// onMapClick(event: any): void {
//     // Replace 'YOUR_QUERY_HERE' with the actual query parameter you want to use
//     const query = 'LocationName'; // For example, searching for a location by name
    
//     // Use the service function to get locations
//     this.configService.getLocations(query).subscribe((data) => {
//       // Handle the data returned from the service
//       console.log(data);
//     });
// }
 onMapClick(event:any) {
   const latitude = event.location.lat;
     const longitude = event.location.lng;

     this.premisesGeneraldetailsfrm.patchValue({ latitude, longitude });
    this.mapVisible = false;
   }
  captureLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.premisesGeneraldetailsfrm.patchValue({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

    searchByNimNo(nimNo){
    this.appService.onLoadApplicantIncharge(nimNo).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          const dataItem = response.data[0];

          this.premisesGeneraldetailsfrm.get('fullname').setValue(dataItem.name);
          this.premisesGeneraldetailsfrm.get('incharge_email').setValue(dataItem.email);
          this.premisesGeneraldetailsfrm.get('incharge_telephone').setValue(dataItem.telephone);
          this.premisesGeneraldetailsfrm.get('incharge_qualification').setValue(dataItem.qualification_id);
          this.premisesGeneraldetailsfrm.get('incharge_country_id').setValue(dataItem.country_id);
          this.premisesGeneraldetailsfrm.get('incharge_region_id').setValue(dataItem.region_id);
          this.premisesGeneraldetailsfrm.get('incharge_district_id').setValue(dataItem.district_id);
          this.premisesGeneraldetailsfrm.get('incharge_id').setValue(dataItem.id);

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

  searchByCompanyRegNo(company_registration_no) {
  this.appService.onLoadCompanyDetails(company_registration_no).subscribe(
    (response: any) => {
      if (response.success && response.results.length > 0) {
        const dataItem = response.results[0];
        this.premisesGeneraldetailsfrm.get('premises_name').setValue(dataItem.name);
        this.premisesGeneraldetailsfrm.get('registration_date').setValue(dataItem.registration_date);
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


  onLoadApplicantDetails() {
    this.appService.onLoadApplicantInchargeDetails()
    .subscribe(
      data_response => {
        this.applicantData = data_response.data;
        
      },
      error => {
        return false
      });

  }

   onLoadSections() {
    var data = {
      table_name: 'par_premise_class',
      is_online:2
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


   oCountyCboSelect($event) {
    this.county_id = $event.selectedItem.id;

    this.onLoadSubCounty(this.county_id);

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

  
  // onRegionsCboSelect($event) {
  //   this.region_id = $event.selectedItem.id;

  //  // this.onLoadCounty(this.region_id);

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

    this.onLoadRegions(this.district_id);
    this.onLoadCounty(this.district_id);

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


  onPremisesPerGridToolbar(e,is_readonly) {
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
  // onSectionsCboSelect($event) {
  //   this.onBusinessTypesLoad($event.value)
  //  // this. OnLoadBusinesstypeCategories($event.value);

  // }
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
   onApplicantConvictionChange($event) {
    
    if($event.selectedItem.id == 1){
        this.isConvicted = true;

    }else{
      this.isConvicted = false;
    }
    

  }


    onApplicantFullTimeIncharge($event) {
    
    if($event.selectedItem.id == 1){
        this.isFullTimeIncharge = false;
        this.FullTimeIncharge= true;
        this.appService.onLoadApplicantInchargeDetails().subscribe(
          (response: any) => {
            if (response && Array.isArray(response.data) && response.data.length > 0) {
              const dataItem = response.data[0];
              console.log(dataItem);
              this.premisesGeneraldetailsfrm.get('nin_no').setValue(dataItem.nin_no);
              this.premisesGeneraldetailsfrm.get('fullname').setValue(dataItem.name);
              this.premisesGeneraldetailsfrm.get('incharge_email').setValue(dataItem.email);
              this.premisesGeneraldetailsfrm.get('incharge_telephone').setValue(dataItem.telephone);
              this.premisesGeneraldetailsfrm.get('incharge_qualification').setValue(dataItem.qualification_id);
              this.premisesGeneraldetailsfrm.get('incharge_country_id').setValue(dataItem.country_id);
              this.premisesGeneraldetailsfrm.get('incharge_region_id').setValue(dataItem.region_id);
              this.premisesGeneraldetailsfrm.get('incharge_district_id').setValue(dataItem.district_id);
              this.premisesGeneraldetailsfrm.get('incharge_id').setValue(dataItem.id);

            } else {
              
              this.toastr.error('No Data found with the Applicant Email Address');
            }

            this.isFetchingData = false;
          },
          (error) => {
            this.isFetchingData = false;
          }
        );

    }else{
      this.isFullTimeIncharge = true;
      this.FullTimeIncharge= false;

    }
    

  }
  onHasModelChange($event) {

  if($event.value == 1){
      this.isHasModelChange = false;
  }
  else{
    this.isHasModelChange = true;
  }
}
    onApplicantCancelledChange($event) {
    if($event.selectedItem.id == 1){
        this.isCancelled = true;

    }else{
      this.isCancelled = false;
    }
    

  }
  onApplicanthealthChange($event) {
    if($event.selectedItem.id == 1){
        this.isHealth = true;

    }else{
      this.isHealth = false;
    }
    

  }


  onOtherClassificationChange($event) {
    if($event.value == 3){
        this.is_other_classification = true;

    }else{
      this.is_other_classification = false;
    }
    

  }
  onLoadBusinessTypesLoad() {
    this.appService.onLoadBusinessTypesLoad()
      .subscribe(
        data_response => {
          this.businessTypesData = data_response.data;
        },
        error => {
          return false
        });

  }

  // onLoadBusinessTypesLoad(business_type_id) {
  //   var data = {
  //     table_name: 'par_business_types',
  //   };
  //   this.config.onLoadConfigurationData(data)
  //     .subscribe(
  //       data => {
  //         this.businessTypesData = data;
  //       },
  //       error => {
  //         return false
  //       });
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

