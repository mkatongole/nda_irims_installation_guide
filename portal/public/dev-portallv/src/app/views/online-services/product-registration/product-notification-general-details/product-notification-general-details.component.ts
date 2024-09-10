import { Component,  Input, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { SharedProductregistrationclassComponent } from '../shared-productregistrationclass/shared-productregistrationclass.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';

import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
@Component({
  selector: 'app-product-notification-general-details',
  templateUrl: './product-notification-general-details.component.html',
  styleUrls: ['./product-notification-general-details.component.css']
})
export class ProductNotificationGeneralDetailsComponent extends SharedProductregistrationclassComponent {
  @Input() productNotificationGeneraldetailsfrm: FormGroup;
  @Input() ReportSourceData: any;
  @Input() ReportTypeData: any;
  @Input() sub_module_id: number;
  @Input() application_code: number;
  @Input() isReadOnly: boolean;
  country_id:number;
  trader_name: string;
  registrant_option_id:number;
  trader_id:number;
  trader_title:string;
  
  ngOnInit() {
    let user_details = this.authService.getUserDetails();
    this.country_id = user_details.country_id;
    this.trader_id = user_details.trader_id;
    this.trader_name = user_details.company_name;

    this.onLoadReportSourceSafetyData();
    this.onLoadReportingTypeData();

  } 
  onLoadReportSourceSafetyData() {
    var data = {
      table_name: 'par_sourcesofsafety_alerts'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ReportSourceData = data;
        });
  }

   onLoadReportingTypeData() {
    var data = {
      table_name: 'par_psur_type',
     
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ReportTypeData = data;
        });

  }

}
