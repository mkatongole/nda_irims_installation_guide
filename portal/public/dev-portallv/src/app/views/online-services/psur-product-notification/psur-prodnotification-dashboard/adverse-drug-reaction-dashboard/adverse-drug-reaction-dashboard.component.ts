import { Component, OnInit } from '@angular/core';
import { AdverseReactionDashboardComponent } from 'src/app/views/online-services/psur-product-notification/psur-prodnotification-dashboard/adverse-reaction-dashboard/adverse-reaction-dashboard.component';

@Component({
  selector: 'app-adverse-drug-reaction-dashboard',
  templateUrl: './adverse-drug-reaction-dashboard.component.html',
  styleUrls: ['./adverse-drug-reaction-dashboard.component.css']
})
export class AdverseDrugReactionDashboardComponent extends AdverseReactionDashboardComponent implements OnInit {
 
 ngOnInit() {
    this.premises_dashboardtitle = "Adverse Drug Reaction (ADR/AEFI) Dashboard"
    this.sub_module_id = 77;

    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPSURApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadNotificationCounterDetails(this.sub_module_id);
   
  }
}