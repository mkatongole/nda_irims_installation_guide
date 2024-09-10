import { Component, OnInit } from '@angular/core';
import { DrugshopRegDashboardComponent } from '../drugshop-reg-dashboard.component';
@Component({
  selector: 'app-renewaldrugshop-dashboard',
  templateUrl: './renewaldrugshop-dashboard.component.html',
  styleUrls: ['./renewaldrugshop-dashboard.component.css']
})
export class RenewaldrugshopDashboardComponent  extends DrugshopRegDashboardComponent implements OnInit {

  ngOnInit() {
    this.premises_dashboardtitle = "Renewal Licensed Seller Application Dashboard"
    this.sub_module_id = 110;
    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
