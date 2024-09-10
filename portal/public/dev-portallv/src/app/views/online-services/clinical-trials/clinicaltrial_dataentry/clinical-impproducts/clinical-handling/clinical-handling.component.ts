import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxScrollViewModule } from 'devextreme-angular';
import { ClinicalImpproductsComponent } from '../clinical-impproducts.component';
@Component({
  selector: 'app-clinical-handling',
  templateUrl: './clinical-handling.component.html',
  styleUrls: ['./clinical-handling.component.css']
})
export class ClinicalHandlingComponent extends ClinicalImpproductsComponent implements OnInit {

  @Input() iMPHandlingProductDetailsFrm:FormGroup;
  @Input() application_id: any;
  @Input() countries: any;
  @Input() clinicalProductCategoryData: any;
  @Input() commonNameData: any;
  @Input() dosagFormData: any;
  @Input() routeOfAdminData: any;
  @Input() siUnitsData: any;
  @Input() marketlocationData: any;
  @Input() manufacturersData: any;
  auto:any;
  clinicalProductGenericData:any;
  containerTypeData:any;
  containerData:any;
  containerMaterialData:any;
  sponsorInvestigatorFrm:FormGroup;
  sponsor_investigatortitle:string;
  checkifsponsor:boolean = false;
  checkifMonitor:boolean = false;
  checkifAllInvestigatorsponsor:boolean = false;
  sponsorInvestigatorData:any;
  clinicaltrailinvestigatorsData:any;
  clinicaltrailMonitorsData:any; 
  isSponsorInvestigatorSearchWinVisible:boolean = false;
  issponsorInvestigatorAddWinVisible:boolean = false;
  ngOnInit() {
    this.iMPHandlingProductDetailsFrm = new FormGroup({
      common_name_id: new FormControl('', Validators.compose([Validators.required])),
      shipping_delivery_distribution: new FormControl('', Validators.compose([Validators.required])),
      storage_requirements_arrangements: new FormControl('', Validators.compose([Validators.required])),
      si_unit_id: new FormControl('', Validators.compose([Validators.required])),
      dispensing_trial_medicines: new FormControl('', Validators.compose([Validators.required])),
      investigator_name: new FormControl('', Validators.compose([Validators.required])),
      registration_no: new FormControl('', Validators.compose([])),
      investigator_id:new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      registration_date: new FormControl('', Validators.compose([])),
      container_type_id: new FormControl('', Validators.compose([Validators.required])),
      container_id: new FormControl('', Validators.compose([Validators.required])),
      registered_product_id: new FormControl('', Validators.compose([])),
      container_material_id: new FormControl('', Validators.compose([Validators.required])),
      no_of_units: new FormControl('', Validators.compose([Validators.required])),
      no_of_packs: new FormControl('', Validators.compose([Validators.required])),
    });

    this.sponsorInvestigatorFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([]))
    });

    this.onLoadclinicaltrailIMPProdData();
    this.funcOnReloadIMPProducts();
    this.onLoadcontainerTypeDataData();
    this.onLoadcontainerData();
    this.onLoadcontainerMaterialData();
    this.onLoadclinicaltrailinvestigatorsData();
    this.onLoadclinicaltrailMonitorsData();

  }
  adjustTextAreaHeight(event: any): void {
  const textarea = event.target;
  textarea.style.overflow = 'hidden'; // Hide any overflow content
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
  }
  onLoadcontainerTypeDataData() {
    var data = {
      table_name: 'par_containers_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerTypeData = data;
        });
  }
  onLoadcontainerData() {
    var data = {
      table_name: 'par_containers'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerData = data;
        });
  }
  onLoadcontainerMaterialData() {
    var data = {
      table_name: 'par_containers_materials'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerMaterialData = data;
        });
  } 
   onLoadclinicaltrailinvestigatorsData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_investigators', application_id: this.application_id }, 'getClinicaltrailinvestigatorsData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailinvestigatorsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }  
   onLoadclinicaltrailMonitorsData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_monitors', application_id: this.application_id }, 'getClinicaltrailMonitorssData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailMonitorsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onLoadclinicaltrailIMPProdData() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_products', application_id: this.application_id }, 'getClinicaltrailIMPProdData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicalProductGenericData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  } 
  onSponsorInvestigatorPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSponsorInvestigatoretails, this.sponsor_investigatortitle);
  }
  funcAddSponsorInvestigatoretails() {

    this.isSponsorInvestigatorSearchWinVisible = false;
    this.issponsorInvestigatorAddWinVisible = true;
    this.sponsorInvestigatorFrm.reset();

  }  
  funcSelectSponsorInvestigator(data) {
    
    if(this.checkifMonitor == true){
      this.appService.onsaveClinicaltrialOtherDetails(this.application_id, {monitor_id:data.data.id}, 'onsaveclinicaltMonitorDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isSponsorInvestigatorSearchWinVisible = false;
            //reload
            this.onLoadclinicaltrailMonitorsData();
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
    else{
      this.iMPHandlingProductDetailsFrm.get('investigator_id').setValue(data.data.id);
      this.iMPHandlingProductDetailsFrm.get('investigator_name').setValue(data.data.name);
    
       this.isSponsorInvestigatorSearchWinVisible = false;
    }
     
  }  
  updateConsigneeReceiver(id, name) {
      this.iMPHandlingProductDetailsFrm.get('investigator_id').setValue(id);
      this.iMPHandlingProductDetailsFrm.get('investigator_name').setValue(name);
    
  }
  onsaveSponsorInvestigator() {
    this.spinner.show();
    let table_name;
    table_name = 'clinical_trial_personnel';

    let name = this.sponsorInvestigatorFrm.get('name').value;
    this.appService.onAddPermitReceiverSender(table_name, this.sponsorInvestigatorFrm.value)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.issponsorInvestigatorAddWinVisible = false;
            this.updateConsigneeReceiver(this.app_resp.record_id, name);
            
          } else {
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  onsaveiMPHandlingProductDetailsDetails() {
    this.spinner.show();
    let table_name;
    table_name = 'wb_clinicaltrial_Producthandling';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.iMPHandlingProductDetailsFrm.value, 'saveiMPHandlingProductDetailsDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.IMPHandlingProductDetailsWinVisible = false;
            //reload
            this.onLoadclinicaltrailIMPProdData();
            this.onLoadclinicaltrailHandlingProdData();

            this.toastr.success(this.app_resp.message, 'Response');
            this.spinner.hide();
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }  
 onClinicalTrialAllinvestigators() {
    this.sponsor_investigatortitle = 'Clinical trial Study Staff';
    this.checkifMonitor = false;
    this.checkifAllInvestigatorsponsor = true;
    this.checkifsponsor = false;
    this.appService.getPermitsOtherDetails({ table_name: 'clinical_trial_personnel' }, 'getSenderreceiversDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.sponsorInvestigatorData = data.data;
            this.isSponsorInvestigatorSearchWinVisible = true;
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
