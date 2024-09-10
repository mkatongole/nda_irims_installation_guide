import { Component, OnInit } from '@angular/core';
import { SurgicalRegDashboardComponent } from '../surgical-reg-dashboard.component';

@Component({
  selector: 'app-newsurgicalinstrumnt-dashboard',
  templateUrl: './newsurgicalinstrumnt-dashboard.component.html',
  styleUrls: ['./newsurgicalinstrumnt-dashboard.component.css']
})
export class NewsurgicalinstrumntDashboardComponent extends SurgicalRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "New Surgical Applications Dashboard"
    this.sub_module_id = 120;

    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
