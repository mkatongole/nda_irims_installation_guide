import { Component, OnInit, ViewChild, NgModule, ViewContainerRef } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import {
  DxDataGridModule,
  DxDataGridComponent,
  DxTemplateModule
} from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { SharedDashboardclassComponent } from '../../shared-dashboardclass/shared-dashboardclass.component';

@Component({
  selector: 'app-gmp-renewal-reg-dashboard',
  templateUrl: './gmp-renewal-reg-dashboard.component.html',
  styleUrls: ['./gmp-renewal-reg-dashboard.component.css']
})
export class GmpRenewalRegDashboardComponent extends SharedDashboardclassComponent implements OnInit {


  ngOnInit() {
    this.onLoadSections();
    this.sub_module_id = 6;
    this.reloadGMPApplications({});
    this.onLoadGmpAppType(this.sub_module_id);
    this.onLoadPremisesCounterDetails(this.sub_module_id,this.gmp_type_id);

  }
  onClickSubModuleAppSelection(sub_module_id,sub_module_name){

   
      this.gmpapp_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
      this.appService.setGmpApplicationDetail(this.gmpapp_details);
      this.app_route = ['./online-services/registered-gmpselection'];
      this.router.navigate(this.app_route);
    
  }
   onCellPrepared(e) {
      this.utilityService.onCellPrepared(e);
  }
 
}
