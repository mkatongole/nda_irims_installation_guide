import { Component, OnInit } from '@angular/core';
import { PsurProdnotificationDashboardComponent } from '../psur-prodnotification-dashboard.component';
@Component({
  selector: 'app-psur-productnotification-dashboard',
  templateUrl: './psur-productnotification-dashboard.component.html',
  styleUrls: ['./psur-productnotification-dashboard.component.css']
})
export class PsurProductnotificationDashboardComponent extends PsurProdnotificationDashboardComponent implements OnInit {
 
 ngOnInit() {
    this.premises_dashboardtitle = "Product Notification Application Dashboard"
    this.sub_module_id = 116;

    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPSURApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadNotificationCounterDetails(this.sub_module_id);
   
  }

}
