import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef, Input } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedPremisesregistrationclassComponent } from '../../shared-premisesregistrationclass/shared-premisesregistrationclass.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
@Component({
  selector: 'app-annex-store',
  templateUrl: './annex-store.component.html',
  styleUrls: ['./annex-store.component.css']
})
export class AnnexStoreComponent implements OnInit {
  @Input() premisesExternalStoreDetailsfrm: FormGroup;
  @Input() countries: any;
  @Input() districts: any;
  @Input() regions: any;
  @Input() countyData: any;
  @Input() subCountyData: any;
  @Input() is_readonly: boolean;
  @Input() premExternalStoreData:any;
  @Input() premise_id: number;
  @Input() isExternalPopupVisible:boolean=false;
  @Input() isaddNewPremisesExternalStore:boolean;
  district_id:number;
  region_id:number;
  country_id:number;
  county_id:number;
  sub_county_id:number;
  parish_id:number;
  app_resp:any;
  auto:any;
  premises_resp:any;
  perishData:any;
  villageData:any;
  loading:boolean;
 constructor(public cdr: ChangeDetectorRef,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities,public httpClient: HttpClient) {

  }
  ngOnInit() {
    this.onLoadPremisesExternalStore();
  }

  captureLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.premisesExternalStoreDetailsfrm.patchValue({ latitude, longitude });

      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}
  funcEditExternalStoreDetails(data) {

    this.premisesExternalStoreDetailsfrm.patchValue(data.data);
    this.isExternalPopupVisible = true;
  }      

onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadDistricts(this.country_id);

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
        return false;
      });
} 
  oDistrictsCboSelect($event) {
    this.district_id = $event.selectedItem.id;

    this.onLoadCounty(this.district_id);
    this.onLoadRegions(this.district_id);

  }

  oCountyCboSelect($event) {
   if ($event.selectedItem) {
    this.county_id = $event.selectedItem.id;
    this.onLoadSubCounty(this.county_id);
    }
  }
   
   onSubCountyCboSelect($event) {
    this.sub_county_id = $event.selectedItem.id;

    this.onLoadParishes(this.sub_county_id);

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

  onParishesCboSelect($event) {
    this.parish_id = $event.selectedItem.id;

    this.onLoadVillages(this.parish_id);
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


   onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    //this.onLoadCounty(this.region_id);

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
  onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesExternalStore, '',is_readonly);
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  
  onLoadPremisesExternalStore() {

    this.appService.onLoadPremisesExternalStore(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premExternalStoreData = data.data;
        },
        error => {
          return false
        });
  }
  funcDeleteExternalStoreDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'wb_premises_externalstore';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'external_store', 'Premises External Store');

  }
  funcDeleteDetailhelper(record_id, apppremises_id, table_name, reload_type, title) {
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
            this.appService.onDeletePremisesDetails(record_id, table_name, apppremises_id, 'Premises Other Details')
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    
                      this.onLoadPremisesExternalStore();

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
  onPremisesExternalToolbar(e,is_readonly) {

    this.functDataGridToolbar(e, this.funAddNewPremisesExternalStore, 'Add External Store',is_readonly);

  }
 funAddNewPremisesExternalStore() {
  
    this.premisesExternalStoreDetailsfrm.reset();

    this.isExternalPopupVisible = true;

  }




  functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        disabled: is_readonly,
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
         // onClick: this.refreshDataGrid.bind(this)
        }
      });
  } 
 
  onSavePremisesExternalStore() {
    if (this.premisesExternalStoreDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSavePremisesExternalStore(this.premisesExternalStoreDetailsfrm.value, this.premise_id)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.isExternalPopupVisible = false;
            this.onLoadPremisesExternalStore();

          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
}
