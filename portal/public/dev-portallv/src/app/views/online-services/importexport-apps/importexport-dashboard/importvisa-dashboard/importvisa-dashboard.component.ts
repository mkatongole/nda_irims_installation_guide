import { Component, OnInit } from '@angular/core';
import { ImportexportDashboardComponent } from '../importexport-dashboard.component';

@Component({
  selector: 'app-importvisa-dashboard',
  templateUrl: './importvisa-dashboard.component.html',
  styleUrls: ['./importvisa-dashboard.component.css']
})
export class ImportvisaDashboardComponent extends ImportexportDashboardComponent implements OnInit  {

  
  ngOnInit() {
    this.application_title = 'Verification Application Dashboard'; 
    this.sub_module_id = '12';
    this.onLoadProductAppType(this.sub_module_id);
    this.reloadPermitApplicationsApplications({'sub_module_id':this.sub_module_id});

     
    this. onLoadApplicationCounterDetails(this.sub_module_id);
   
  }
   onImportappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  refreshDataGrid() {
      this.reloadPermitApplicationsApplications({sub_module_id:this.sub_module_id});   
  }
}


