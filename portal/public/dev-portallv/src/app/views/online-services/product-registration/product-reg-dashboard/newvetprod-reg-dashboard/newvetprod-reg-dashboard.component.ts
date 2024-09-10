import { Component, OnInit } from '@angular/core';
import { ProductRegDashboardComponent } from '../product-reg-dashboard.component';
@Component({
  selector: 'app-newvetprod-reg-dashboard',
  templateUrl: './newvetprod-reg-dashboard.component.html',
  styleUrls: ['./newvetprod-reg-dashboard.component.css']
})
export class NewvetprodRegDashboardComponent extends ProductRegDashboardComponent implements OnInit {
  ngOnInit() {
    
    this.appprocess_title = "New Product Applications";
    this.sub_module_id = 7;
   // this.regulated_producttype_id= 3;
   // this.section_id = 3
    this.onLoadProductAppType(this.sub_module_id);
    //this.onLoadSections(this.regulated_producttype_id);
    //this.onLoadprodClassCategoriesData(this.section_id);
    this.onLoadProductApplciations({sub_module_id: this.sub_module_id,section_id:this.section_id});
    this.onLoadProductsCounterDetails(this.sub_module_id);
  }
}

