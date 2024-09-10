import { Component, Input,ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-drugshop-nearestlocation',
  templateUrl: './drugshop-nearestlocation.component.html',
  styleUrls: ['./drugshop-nearestlocation.component.css']
})
export class DrugshopNearestlocationComponent implements OnInit {
    @ViewChild(DxDataGridComponent)
  dataGrid: DxDataGridComponent;
  @Input() countries: any;
  @Input() regions: any;
  @Input() districts: any;
  @Input() is_readonly: boolean;
  @Input() isLocationPopupVisible: boolean;
  @Input() premisesStoreslocationFrm: FormGroup;
  country_id:number;
  subCountyData:any;
  auto:any;
  countyData:any;
  registeredPremisesData:any;
  filesToUpload: Array<File> = []; 
  region_id:number;
  district_id:number;
  county_id:number;
  
  @Input() premise_id: number;
  drugshopStoreLocationDetailsData:any;
  isStoreLocationPopupVisible:boolean=false;
  premises_resp:any;
  loading:any;
  constructor(public config: ConfigurationsService,public modalServ: ModalDialogService,public viewRef: ViewContainerRef,public appService: PremisesApplicationsService,public toastr: ToastrService) { }

  ngOnInit() {
    this.onLoadDrugShopStoreLocationDetails();

  }
  
  onLoadDrugShopStoreLocationDetails(){
    this.appService.onLoadDrugShopStoreLocationDetails(this.premise_id)
      .subscribe(
        data => {
          this.drugshopStoreLocationDetailsData = data;
        },
        error => {
          return false
        });
  } 
   onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.premisesStoreslocationFrm.get('file').setValue(file);
    }
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

    this.premisesStoreslocationFrm.patchValue(data.data);

    this.isStoreLocationPopupVisible = true;
   
  }
  funcDeleteLocationDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'wb_drugshop_storelocation';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Drug Shop Store Location');

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
                    
                      this.onLoadDrugShopStoreLocationDetails();

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

  onDrugShopStoreLocationToolbar(e,is_readonly) {

    this.functDataGridToolbar(e, this.funAddPremisesStreLocationDetails, 'Drug shop Nearest Location',is_readonly);

  }

 funAddPremisesStreLocationDetails() {
  
    this.premisesStoreslocationFrm.reset();

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
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }  
  refreshDataGrid() {
      this.dataGrid.instance.refresh();
    }
    private prepareSaveSketchtDoc(): any {

      let input = { ...this.premisesStoreslocationFrm.value }; // Create a copy of the object
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
  
  onSaveDrugShopStoreLocationDetails() {
    if (this.premisesStoreslocationFrm.invalid) {
      return;
    }
    const uploadData = this.prepareSaveSketchtDoc();
    this.appService.onSaveDrugShopStoreLocationDetails(this.premisesStoreslocationFrm.value, this.premise_id,uploadData)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.isStoreLocationPopupVisible = false;
            this.onLoadDrugShopStoreLocationDetails();
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  } 

    onSearchNearestDrugShopLocationDetails() {  
    this.appService.onLoadNearestDrugShops(this.premise_id)
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

    this.premisesStoreslocationFrm.patchValue(data.data);
    this.isLocationPopupVisible= false;         
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }


}