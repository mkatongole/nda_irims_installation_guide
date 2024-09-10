import { Component, OnInit } from '@angular/core';
import { SurgicalRegDashboardComponent } from '../surgical-reg-dashboard.component';

@Component({
  selector: 'app-surgicalrelocation-dashboard',
  templateUrl: './surgicalrelocation-dashboard.component.html',
  styleUrls: ['./surgicalrelocation-dashboard.component.css']
})
export class SurgicalrelocationDashboardComponent extends SurgicalRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "Relocation of Surgical Instruments Dashboard"
    this.sub_module_id = 122;

    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
