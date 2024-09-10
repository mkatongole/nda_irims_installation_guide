
import { Component, Input,OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDialogService } from 'ngx-modal-dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-premise-change-pharmacists',
  templateUrl: './premise-change-pharmacists.component.html',
  styleUrls: ['./premise-change-pharmacists.component.css']
})
export class PremiseChangePharmacistsComponent implements OnInit{
  @Input() countries: any;
  @Input() regions: any;
  @Input() districts: any;
  @Input() sub_module_id: number;
  @Input() is_readonly: boolean;
  @Input() isLocationPopupVisible: boolean;
  @Input() supervisingPharmacistsdetailsfrm: FormGroup;
  country_id:number;
  subCountyData:any;
  countyData:any;
  qualificationsData:any;
  registeredPremisesData:any;
  filesToUpload: Array<File> = []; 
  region_id:number;
  district_id:number;
  county_id:number;
  auto:any;

  @Input() premise_id: number;
  premisesStoreLocationDetailsData:any;
  isStoreLocationPopupVisible:boolean=false;
  premises_resp:any;
  loading:any;

  private destroy$ = new Subject<void>();
  private isFetchingData = false;
  constructor(public config: ConfigurationsService,public modalServ: ModalDialogService,public viewRef: ViewContainerRef,public appService: PremisesApplicationsService,public toastr: ToastrService) {
  }

  ngOnInit() {
    this.onLoadPremisesStoreLocationDetails();
    this.onLoadQualificationDetails();


    this.setupSearchByPsuNoHandler();

  }

    private setupSearchByPsuNoHandler(): void {
    this.supervisingPharmacistsdetailsfrm
      .get('psu_no')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((psuNo) => {
        if (!this.isFetchingData) {
          this.isFetchingData = true;
          this.searchByPsuNo(psuNo);
        }
      });
  } 
  searchByPsuNo(psuNo){
    this.appService.onLoadApplicantPharmacist(psuNo).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          const dataItem = response.data[0];
          this.supervisingPharmacistsdetailsfrm.get('full_names').setValue(dataItem.name);
          this.supervisingPharmacistsdetailsfrm.get('pharmacist_email').setValue(dataItem.email);
          this.supervisingPharmacistsdetailsfrm.get('psu_date').setValue(dataItem.psu_date);
          this.supervisingPharmacistsdetailsfrm.get('pharmacist_telephone').setValue(dataItem.telephone);
          this.supervisingPharmacistsdetailsfrm.get('pharmacist_qualification').setValue(dataItem.qualification_id);
          this.supervisingPharmacistsdetailsfrm.get('pharmacist_country_id').setValue(dataItem.country_id);
          this.supervisingPharmacistsdetailsfrm.get('pharmacist_region_id').setValue(dataItem.region_id);
          this.supervisingPharmacistsdetailsfrm.get('pharmacist_district_id').setValue(dataItem.district_id);
          this.supervisingPharmacistsdetailsfrm.get('pharmacist_id').setValue(dataItem.id);
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
  onLoadPremisesStoreLocationDetails(){
    this.appService.onLoadPremisesStoreLocationDetails(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premisesStoreLocationDetailsData = data;
        },
        error => {
          return false
        });
  } 
   onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.supervisingPharmacistsdetailsfrm.get('file').setValue(file);
    }
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
  onLoadCounty(region_id) {
    var data = {
      table_name: 'par_county',
      region_id: region_id
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
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  
}

  
  onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadCounty(this.region_id);

  }
 oDistrictsCboSelect($event) {
    this.district_id = $event.selectedItem.id;

    this.onLoadRegions(this.district_id);

  }

   oCountyCboSelect($event) {
    this.county_id = $event.selectedItem.id;

    this.onLoadSubCounty(this.county_id);

  }

  funcEditLocationDetails(data) {

    this.supervisingPharmacistsdetailsfrm.patchValue(data.data);

    this.isStoreLocationPopupVisible = true;
   
  }
  funcDeleteLocationDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'wb_premises_storelocation';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Premises Store Location');

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
                    
                      this.onLoadPremisesStoreLocationDetails();

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

  onPremisesStoreLocationToolbar(e,is_readonly) {

    this.functDataGridToolbar(e, this.funAddPremisesStreLocationDetails, 'Premises Nearest Location',is_readonly);

  }
 funAddPremisesStreLocationDetails() {
  
    this.supervisingPharmacistsdetailsfrm.reset();

    this.isStoreLocationPopupVisible = true;

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
    private prepareSaveSketchtDoc(): any {

      let input = { ...this.supervisingPharmacistsdetailsfrm.value }; // Create a copy of the object
      const files: Array<File> = this.filesToUpload;
      for (let i = 0; i < files.length; i++) {
      input['file'] = files[i]; // Add the file to the object
      input['filename'] = files[i]['name']; // Add the filename to the object
      }

      return input;




    // let input = this.premisesStoreslocationFrm.value;
    // const files: Array<File> = this.filesToUpload;
    // for(let i =0; i < files.length; i++){
    //     input.append("file", files[i], files[i]['name']);
    // }
    // return input;
  }
  onSavePremisesStoreLocationDetails() {
    if (this.supervisingPharmacistsdetailsfrm.invalid) {
      return;
    }
    const uploadData = this.prepareSaveSketchtDoc();
    this.appService.onSavePremisesStoreLocationDetails(this.supervisingPharmacistsdetailsfrm.value, this.premise_id,uploadData)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.isStoreLocationPopupVisible = false;
            this.onLoadPremisesStoreLocationDetails();
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }  
    onSearchNearestLocationDetails() {  
    this.appService.onLoadNearestPremises(this.premise_id)
        .subscribe(
          data_response => {
            this.isLocationPopupVisible = true;
            this.registeredPremisesData = data_response.data;
          },
          error => {
            return false
      


       });
  } 
  funcSelectLocationDetails(data){ 

    this.supervisingPharmacistsdetailsfrm.patchValue(data.data);
    this.isLocationPopupVisible= false;         
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }

}
