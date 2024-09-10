import { Component, OnInit } from '@angular/core';
import { SurgicalRegDashboardComponent } from '../surgical-reg-dashboard.component';

@Component({
  selector: 'app-preinspectionsurgical-dashboard',
  templateUrl: './preinspectionsurgical-dashboard.component.html',
  styleUrls: ['./preinspectionsurgical-dashboard.component.css']
})
export class PreinspectionsurgicalDashboardComponent extends SurgicalRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "Pre Inspection Applications Dashboard"
    this.sub_module_id = 119;

    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
