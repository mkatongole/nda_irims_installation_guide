import { Component, OnInit, OnDestroy, ViewContainerRef, Pipe, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
//external classes
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
//import { PremisesApplicationsService } from '../../../services/premises-applications/premises-applications.service';
import { AppSettings } from 'src/app/app-settings';
import { DxDataGridComponent, DxScrollViewModule } from 'devextreme-angular';
import { AccountManagementService } from 'src/app/services/account_management/account-management.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxSmartModalService } from 'ngx-smart-modal';
@Pipe({name: 'safeHtml'})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(DxScrollViewModule)

  siteKey:any = AppSettings.siteKey;
  mis_url:string = AppSettings.mis_url;
  isLoggedIn: any ;
  signInFrm: FormGroup;
  submitted = false;
  loading = false;
  message:string;
  success:boolean;
  is_accountype:boolean=false;
  isDocumentPreviewDownloadwin:boolean;
  
  document_previewurl:any;
//the user details
  trader_no:number;
  company_name:string;
  email_address:string;
  countries: any;
  data:any;
  regions: any;
  districts: any;
  app_route:any;
  country_id:number;
  region_id:number;
  servicesDataset:any
  qualificationsData:any;
  singleServicesDataset:any;
  isPreviewsingleServicesDataset:boolean;
  groupArr:any;
  array:any;
  showCustomerAcctountCreation:boolean;
  account_resp:any;
  traderApplicationInformationDta:any;
  createAccountFrm:FormGroup;
  forgotPasswordFrm:FormGroup;
  response:any;
  psuNo:any;
  private destroy$ = new Subject<void>();
  private isFetchingData = false;
  accountTypesData:any;
  constructor(private configService:ConfigurationsService,private spinner:SpinnerVisibilityService, private router: Router, private formBuilder: FormBuilder, private authService: AuthService,public toastr: ToastrService,private accountManagementService: AccountManagementService,public modalDialogue: ModalDialogService,public viewRef: ViewContainerRef,public modalService: NgxSmartModalService) {
    //this.isLoggedIn = 1;

    this.createAccountFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      traderaccount_type_id: new FormControl('', Validators.compose([Validators.required])),
      tin_no: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      physical_address: new FormControl('', Validators.compose([])),
      contact_person: new FormControl('', Validators.compose([])),
      contact_person_email: new FormControl('', Validators.compose([])),
      psu_no: new FormControl('', Validators.compose([])),
      psu_date: new FormControl('', Validators.compose([])),
      pharmacist_telephone: new FormControl('', Validators.compose([])),
      pharmacist_email: new FormControl('', Validators.compose([])),
      pharmacist_qualification: new FormControl('', Validators.compose([])),
      pharmacist_country_id: new FormControl('', Validators.compose([])),
      pharmacist_region_id: new FormControl('', Validators.compose([])),
      pharmacist_code: new FormControl('', Validators.compose([])),
      pharmacist_district_id: new FormControl('', Validators.compose([]))
    });
    this.forgotPasswordFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required])),
      identification_no: new FormControl('', Validators.compose([Validators.required])),
    });
    this.spinner.hide();
    this.onLoadAccountTypesData();
    this.onLoadCountries();
    this.onLoadQualificationDetails();
    //this.updateValidators();
    this.setupSearchByPsuNoHandler();


  }onLoadAccountTypesData() {

    var data = {
      table_name: 'par_traderaccount_types'
    };
    this.configService.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.accountTypesData = data;
        },
        error => {
          return false;
        });
  }
  handleReset(){

  }onEmailValueChange($event){
    this.email_address = $event.value;
  }
  handleExpire(){
    
  }
  handleLoad(){
    
  }
  handleSuccess($event){
    
  }
  funcPreviewGuidelines(data){
      let module_id = data.module_id;
      this.onLoadsingleServicesDataset(module_id)
      this.isPreviewsingleServicesDataset = true;
  } 
  funcDownloadPreviewGuidelines(data){

      let module_id = data.module_id;
      let servicedocuments = data.servicedocuments;
    
      if(servicedocuments == '' || servicedocuments == null){
        this.toastr.error('The Service Guidelines not found, access the service guidelines from the organisation website.', 'Alert!');
        return;
      }
      this.document_previewurl  = this.configService.getSafeUrl(this.mis_url+'resources/uploads/'+data.servicedocuments);
      this.isDocumentPreviewDownloadwin = true;

  }
  onServiceGridPreparing(e){
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Online Services',
      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  } refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  ngOnInit() {
    this.signInFrm = this.formBuilder.group({
      trader_no: ['', Validators.required],
      user_password: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]]
    // recaptcha: ['', Validators.required]
    });     
  
    
    if(localStorage.length >0){
      this.isLoggedIn = localStorage.getItem('isLoggedIn');
      let userDetails = JSON.parse(localStorage.getItem('user'));
      this.trader_no = userDetails.trader_no;
      this.company_name = userDetails.company_name;
      this.email_address = userDetails.email_address;
    }
    this.onLoadServicesDataset('');
    this.spinner.hide();


  }
  // convenience getter for easy access to form fields
  get f() { return this.signInFrm.controls; }
  funcOnlineServices(){
    
    this.router.navigate(['/online-dashboard']);
    
  }
  funcLogOut(){
   
    this.authService.logout();
    
  }
  onSignOnKeyPress(event){

      if(event.key === 'Enter'){
       
          this.onSignIn();
      }
      
  }onSignIn() {
    const formData = new FormData();

    const invalid = [];
    const controls = this.signInFrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.signInFrm.invalid) {
      return;
    }
   
    this.loading = true;
    this.spinner.show();
   
    this.authService.login((this.f.trader_no.value), btoa(this.f.email_address.value), btoa(this.f.user_password.value))
      //.pipe(first())
      .subscribe(
          response => {
          let auth_response = response.json();
          this.message = auth_response.message;
          this.success = auth_response.success;
          if(this.success){
            let access_token =auth_response.access_token;
            let isLoggedIn =auth_response.isLoggedIn;
            if(access_token != '' && isLoggedIn){
                localStorage.setItem('isLoggedIn', auth_response.isLoggedIn);
                localStorage.setItem('user',JSON.stringify(auth_response));
                this.toastr.info(this.message, 'Success!');
                this.isLoggedIn = auth_response.isLoggedIn;
                this.router.navigate(['/online-dashboard']);
                // location.reload();
                 this.spinner.hide();
            }else{
              this.toastr.error('In Valid User Login and System Access, kindly relogin with the correct credentails to proceed or Contact the system Admin', 'Alert!');
            }
             this.spinner.hide();

          }
          else{
           
             this.toastr.error(this.message, 'Alert!');
          }
          this.spinner.hide();
        });
    //this.router.navigate(['/online-dashboard']);
  }
  funcPublicNavigation(router_link){
    
    this.app_route = ['./public/' + router_link];
    this.router.navigate(this.app_route);

  }

  funcCreateCustomerAccount(){
      this.showCustomerAcctountCreation = true;

  }

  //load the services data 
  onLoadServicesDataset(module_id){
    this.configService.onLoadServicesDataset(module_id)
   .subscribe(
     data => {
      this.servicesDataset = data;
       

     },
     error => {
       console.log('No Results');
     });
}  
onLoadQualificationDetails() {
    var data = {
      table_name: 'par_personnel_qualifications',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.qualificationsData = data;
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
   onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }    
  oDistrictsCboSelect($event) {
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
onLoadsingleServicesDataset(module_id){
  this.spinner.show();
  this.configService.onLoadServicesDataset(module_id)
    .subscribe(
      data => {
          this.spinner.hide();
          this.singleServicesDataset = data;
      },
      error => {
        this.spinner.hide();
        console.log('No Results');
      });
}
funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width/100;
}
  onValidateAccountEmail($event){
    
    this.spinner.show();
    this.accountManagementService.onValidateAccountEmail(this.email_address,'onValidateAccountEmail')
        //.pipe(first())
        .subscribe(
          response => {
              this.account_resp = response;
              //the details 
              if(this.account_resp.success){
                this.traderApplicationInformationDta = this.account_resp.data;

               //reload the data
              }else{
                //recover password 
                this.funcPassWordRecoveryOption(this.account_resp.message,this.email_address,this.account_resp.identification_no);
                this.createAccountFrm.reset();
              }
              
             this.spinner.hide();
          },
          error => {
            this.loading = false;
          });
}
funcPassWordRecoveryOption(message,email_address,identification_no){
  this.forgotPasswordFrm.get('email_address').setValue(email_address);
  this.forgotPasswordFrm.get('identification_no').setValue(identification_no);
  this.modalDialogue.openDialog(this.viewRef, {
    title: message,
    childComponent: '',
    settings: {
      closeButtonClass: 'fa fa-close'
    },
    actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
        this.spinner.show();
        this.authService.onFuncRecoverPasswordRequest(this.forgotPasswordFrm.value)
        .subscribe(
          data => {

            this.response = data.json();
            if (this.response.success) {
              this.toastr.success(this.response.message, 'Response');
              this.app_route = ['./'];
  
              this.router.navigate(this.app_route);
              
            } else {
              this.toastr.error(this.response.message, 'Alert');
            }
            this.spinner.hide();
          },
          error => {
              
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
// updateValidators(){
//     const emailControl = this.createAccountFrm.get('email_address');

//     if (this.is_accountype) {
//       emailControl.setValidators(null);
//     } else {

//       emailControl.setValidators([Validators.required, Validators.email]);
//     }

//     emailControl.updateValueAndValidity();
//   }
   onAccountTypeChange($event) {
    if($event.value == 9){
        this.is_accountype = true;
   //     this.updateValidators();

    }else{
      this.is_accountype = false;
    }
  } 
   private setupSearchByPsuNoHandler(){
    this.createAccountFrm
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
    this.accountManagementService.onLoadApplicantPharmacist(psuNo).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          const dataItem = response.data[0];
          this.createAccountFrm.get('name').setValue(dataItem.name);
          this.createAccountFrm.get('email_address').setValue(dataItem.email);
          this.createAccountFrm.get('psu_date').setValue(dataItem.psu_date);
          this.createAccountFrm.get('pharmacist_telephone').setValue(dataItem.telephone);
          this.createAccountFrm.get('pharmacist_qualification').setValue(dataItem.qualification_id);
          this.createAccountFrm.get('pharmacist_country_id').setValue(dataItem.country_id);
          this.createAccountFrm.get('pharmacist_region_id').setValue(dataItem.region_id);
          this.createAccountFrm.get('pharmacist_district_id').setValue(dataItem.district_id);


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
onCreateAccount() {
  const formData = new FormData();

  const invalid = [];
  const controls = this.createAccountFrm.controls;
  for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
          return;
      }
  }
  
  if (this.createAccountFrm.invalid) {
    return;
  }
  this.spinner.show();
  const uploadData = '';
  

  this.loading = true;
  this.accountManagementService.onCreateAccount(this.createAccountFrm.value,uploadData,'onAccountRegistration')
    //.pipe(first())
    .subscribe(
      response => {
          this.account_resp = response.json();
          //the details 
          if(this.account_resp.success){ 
            this.trader_no = this.account_resp.trader_no;
            this.message = this.account_resp.message;
            this.toastr.success(this.message, 'Response');
            this.modalService.getModal('createAccountModal').open();
          
          }else{
            this.message = this.account_resp.message;
            this.toastr.error(this.message, 'Alert');
          }
          this.spinner.hide();
      },
      error => {
        this.loading = false;
      });
}oncloseRegistrationMdl(){
  this.modalService.getModal('createAccountModal').close();
  
}
}
