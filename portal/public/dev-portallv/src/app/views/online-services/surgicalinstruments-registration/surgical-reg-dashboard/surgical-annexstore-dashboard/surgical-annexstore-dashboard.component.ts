import { Component, OnInit } from '@angular/core';
import { SurgicalRegDashboardComponent } from '../surgical-reg-dashboard.component';

@Component({
  selector: 'app-surgical-annexstore-dashboard',
  templateUrl: './surgical-annexstore-dashboard.component.html',
  styleUrls: ['./surgical-annexstore-dashboard.component.css']
})
export class SurgicalAnnexstoreDashboardComponent extends SurgicalRegDashboardComponent implements OnInit {
 
  ngOnInit() {
    this.premises_dashboardtitle = "Surgical Instruments and Appliances External Store Application Dashboard"
    this.sub_module_id = 127;
    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
