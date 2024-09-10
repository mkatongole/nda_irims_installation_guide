import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from 'src/app/services/account_management/account-management.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader'
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';


@Component({
  selector: 'app-pharmacistsaccount-user',
  templateUrl: './pharmacistsaccount-user.component.html',
  styleUrls: ['./pharmacistsaccount-user.component.css']
})
export class PharmacistsaccountUserComponent implements OnInit {
 dtaPharmacistaccountUsers:any={};
  PharmacistsUsersAccountFrm:FormGroup;
  password:string;
  confirm_password:string;
  account_resp:any;
  countries:any;
  regions:any;
  districts:any;
  region_id:number;
  country_id:number;
  addPharmacistUsersAccountFrmWin:boolean = false;
  message:string;
  constructor(public appService:AccountManagementService,public toastr: ToastrService,public spinner: SpinnerVisibilityService,public configService: ConfigurationsService) { 
    this.PharmacistsUsersAccountFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required])),
      psu_reg_no: new FormControl('', Validators.compose([Validators.required])),
      full_name: new FormControl('', Validators.compose([Validators.required])),     
      psu_reg_date: new FormControl('', Validators.compose([Validators.required])), 
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      _token:new FormControl('',Validators.compose([]))
    });
  }

  ngOnInit() {
    this.onLoadTraderAccountUsers();
    this.onLoadCountries();
  }
  onPharmacistToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Pharmacist',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcAddPharmacistAccountUser.bind(this)

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
  funcAddPharmacistAccountUser(){
    this.PharmacistsUsersAccountFrm.reset();
    this.addPharmacistUsersAccountFrmWin = true;
  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  refreshDataGrid() {
    this.onLoadTraderAccountUsers();
  }
  onLoadTraderAccountUsers() {

    this.appService.onLoadTraderAccountUsers()
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtaPharmacistaccountUsers =  resp_data.data;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
        });
  }
  onSavepharmacistUsersAccountDetails(){
    
    if (this.PharmacistsUsersAccountFrm.invalid) {
      return;
    }
    
    this.appService.onCreateUserAccount(this.PharmacistsUsersAccountFrm.value,'onPharmacisAccountUsersRegistration')
      //.pipe(first())
      .subscribe(
        response => {
            this.account_resp = response.json();
            //the details 
            if(this.account_resp.success){
              this.onLoadTraderAccountUsers() 
              this.toastr.success(this.message, 'Response');
              this.addPharmacistUsersAccountFrmWin = false;
            }else{
              this.message = this.account_resp.message;
              this.toastr.error(this.message, 'Alert');
            }
            this.spinner.hide();
        },
        error => {
          
        });
  }  
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
    onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }
  onLoadCountries() {

    var data = {
      table_name: 'par_countries'
    };
    this.configService.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.countries = data;
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
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.regions = data;
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
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.districts = data
        },
        error => {
          return false;
        });
  }
  funcUpdateTraderUserAccountDetails(data){
    
    this.addPharmacistUsersAccountFrmWin = true;
    this.PharmacistsUsersAccountFrm.patchValue(data.data);
    this.PharmacistsUsersAccountFrm.controls['password'].setValue('');
    this.PharmacistsUsersAccountFrm.controls['confirm_password'].setValue('');
    
  }
}

