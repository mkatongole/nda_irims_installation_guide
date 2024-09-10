import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { PremisesApplicationsService } from '../../../../services/premises-applications/premises-applications.service';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { SharedDrugshopsregistrationclassComponent } from '../shared-drugshopsregistrationclass/shared-drugshopsregistrationclass.component';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
@Component({
  selector: 'app-preview-drugshop-information',
  templateUrl: './preview-drugshop-information.component.html',
  styleUrls: ['./preview-drugshop-information.component.css']
})
export class PreviewDrugshopInformationComponent extends SharedDrugshopsregistrationclassComponent implements OnInit {

   premisesrenGeneraldetailsfrm: FormGroup;
  app_routing:any;
  

  ngOnInit() {
    this.premisesapp_details = this.appService.getPremisesApplicationDetail();

    if (!this.premisesapp_details) {
      this.router.navigate(['./../online-services/newdrugshopreg-dashboard']);
      return;
    }
    else {
      this.sub_module_id = this.premisesapp_details.sub_module_id;
      this.process_title = this.premisesapp_details.process_title;
      this.section_id = this.premisesapp_details.section_id;
      this.premise_id = this.premisesapp_details.premise_id;

      this.tracking_no = this.premisesapp_details.tracking_no;
      this.country_id = this.premisesapp_details.country_id;
      this.region_id = this.premisesapp_details.region_id;

      this.status_name = this.premisesapp_details.status_name;
      this.status_id = this.premisesapp_details.status_id;
      this.module_id = this.premisesapp_details.module_id;

    }
    
    if(this.status_id < 1 || !this.status_id){
      this.status_name = "New"
      this.status_id = 1;
    }
    
  }
   onProductDashboard() {
    if(this.sub_module_id == 96){
        this.router.navigate(['./../online-services/newdrugshopreg-dashboard']);

    }else if(this.sub_module_id == 97){
      this.router.navigate(['./../online-services/pre-inspection-dashboard']);

    }
   
  }
}

