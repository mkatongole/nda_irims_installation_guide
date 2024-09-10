import { Component, OnInit } from '@angular/core';
import { PremisesRegDashboardComponent } from '../premises-reg-dashboard.component';
@Component({
  selector: 'app-annexstore-dashboard',
  templateUrl: './annexstore-dashboard.component.html',
  styleUrls: ['./annexstore-dashboard.component.css']
})
export class AnnexstoreDashboardComponent extends PremisesRegDashboardComponent implements OnInit {
 
  ngOnInit() {
    this.premises_dashboardtitle = "External Store Application Dashboard"
    this.sub_module_id = 108;
    this.onLoadPremisesAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
