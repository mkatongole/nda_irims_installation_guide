import { Component, OnInit } from '@angular/core';
import { ProductRegDashboardComponent } from '../product-reg-dashboard.component';

@Component({
  selector: 'app-newsurgical-reg-dashboard',
  templateUrl: './newsurgical-reg-dashboard.component.html',
  styleUrls: ['./newsurgical-reg-dashboard.component.css']
})
export class NewsurgicalRegDashboardComponent extends ProductRegDashboardComponent implements OnInit {

  ngOnInit() {
    
    this.appprocess_title = "New Product Applications";
    this.sub_module_id = 7;
   // this.section_id = 2
    this.onLoadProductAppType(this.sub_module_id);
    //this.onLoadSections(this.regulated_producttype_id);
    //this.onLoadprodClassCategoriesData(this.section_id);
    this.onLoadProductApplciations({sub_module_id: this.sub_module_id});
    this.onLoadProductsCounterDetails(this.sub_module_id);

  }

}
