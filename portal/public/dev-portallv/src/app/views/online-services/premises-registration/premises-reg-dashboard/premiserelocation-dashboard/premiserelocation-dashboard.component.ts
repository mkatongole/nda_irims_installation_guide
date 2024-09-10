import { Component, OnInit } from '@angular/core';
import { PremisesRegDashboardComponent } from '../premises-reg-dashboard.component';
@Component({
  selector: 'app-premiserelocation-dashboard',
  templateUrl: './premiserelocation-dashboard.component.html',
  styleUrls: ['./premiserelocation-dashboard.component.css']
})
export class PremiserelocationDashboardComponent extends PremisesRegDashboardComponent implements OnInit {

  ngOnInit() {
    this.premises_dashboardtitle = "Premise Relocation Application Dashboard"
    this.sub_module_id = 109;
    this.onLoadPremisesAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
