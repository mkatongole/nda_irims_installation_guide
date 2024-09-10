import { Component, OnInit } from '@angular/core';
import { SurgicalRegDashboardComponent } from '../surgical-reg-dashboard.component';

@Component({
  selector: 'app-renewalsurgical-dashboard',
  templateUrl: './renewalsurgical-dashboard.component.html',
  styleUrls: ['./renewalsurgical-dashboard.component.css']
})
export class RenewalsurgicalDashboardComponent extends SurgicalRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "Renewal of Surgical Instruments Dashboard"
    this.sub_module_id = 121;

    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
