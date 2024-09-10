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
  selector: 'app-vet-dashboard',
  templateUrl: './vet-dashboard.component.html',
  styleUrls: ['./vet-dashboard.component.css']
})
@NgModule({
  imports: [
    DxDataGridModule,
    DxTemplateModule
  ],
  declarations: [],
  bootstrap: []
})
export class VetDashboardComponent extends SharedDashboardclassComponent implements OnInit {

  constructor(public viewRef: ViewContainerRef, public modalServ: ModalDialogService, public spinner: SpinnerVisibilityService, public toastr: ToastrService, public router: Router, public configService: ConfigurationsService, public appService: GmpApplicationServicesService,public utilityService:Utilities) { 

    super(viewRef, modalServ, spinner, toastr, router, configService,  appService, utilityService)
    this.sectionSelection ='2';
    this.sectionsdata ='2';
  }

  ngOnInit() {
    this.onLoadSections();
    this.reloadGMPApplications({});
        this.onLoadPremisesCounterDetails(this.sub_module_id,this.gmp_type_id);

  }
  onClickSubModuleAppSelection(sub_module_id,sub_module_name){

    if(sub_module_id == 5){
      this.app_route = ['./online-services/vet-applications-selection'];
      this.router.navigate(this.app_route);
    }else{
      this.gmpapp_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
      this.appService.setGmpApplicationDetail(this.gmpapp_details);
      this.app_route = ['./online-services/registered-gmpselection'];
      this.router.navigate(this.app_route);
    }
  }
 
}