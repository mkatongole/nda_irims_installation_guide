import { Component, OnInit } from '@angular/core';
import { DrugshopRegDashboardComponent } from '../drugshop-reg-dashboard.component';

@Component({
  selector: 'app-variationdrugshop-dashboard',
  templateUrl: './variationdrugshop-dashboard.component.html',
  styleUrls: ['./variationdrugshop-dashboard.component.css']
})
export class VariationdrugshopDashboardComponent extends DrugshopRegDashboardComponent implements OnInit {

   ngOnInit() {
    this.premises_dashboardtitle = "Variation Licensed Seller Requests Dashboard"
    this.sub_module_id = 111;
   this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}