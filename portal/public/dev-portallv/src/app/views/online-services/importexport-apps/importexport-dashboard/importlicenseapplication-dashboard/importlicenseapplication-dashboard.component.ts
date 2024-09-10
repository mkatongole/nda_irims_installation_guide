import { Component, OnInit } from '@angular/core';
import { ImportexportDashboardComponent } from '../importexport-dashboard.component';

@Component({
  selector: 'app-importlicenseapplication-dashboard',
  templateUrl: './importlicenseapplication-dashboard.component.html',
  styleUrls: ['./importlicenseapplication-dashboard.component.css']
})
export class ImportlicenseApplicationDashboardComponent extends ImportexportDashboardComponent implements OnInit  {

  // ngOnInit() {
  //   this.premises_dashboardtitle = "Pre Inspection Applications Dashboard"
  //   this.sub_module_id = 89;
  //   this.onLoadPremisesAppType(this.sub_module_id);
  //   this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
  //   this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  // }
  

  ngOnInit() {
    this.application_title = 'Import Export License Application Dashboard'; 
    this.sub_module_id = '81';
    this.onLoadProductAppType(this.sub_module_id);
    this.reloadPermitApplicationsApplications({'sub_module_id':this.sub_module_id});

     
    this. onLoadApplicationCounterDetails(this.sub_module_id);
   
  }

  
//   ngOnInit() {
//    this.sub_module_id = '81' || '112' || '113' || '114';
//     this.reloadPermitApplicationsApplications({'sub_module_id':this.sub_module_id});
//     this.onLoadProductAppType(this.sub_module_id);
//     this. onLoadApplicationCounterDetails(this.sub_module_id);
//     this.FilterDetailsFrm.get('sub_module_id').setValue(this.sub_module_id);
// this.application_title = 'Import Export License Application Dashboard';  
//   }

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
  
//     },{
//       location: 'before',
//       widget: 'dxButton',
//       options: {
//         text: 'Intiate License Application',
//         tooltip: 'Initialisation of License Application.',
//         type: 'default',
//         icon: 'fa fa-pencil-square-o',
//         onClick: this.funcRequestforImportLicenseApplication.bind(this)
//       }
//     },{
//         location: 'after',
//         widget: 'dxButton',
//         options: {
//           icon: 'refresh',
//           onClick: this.refreshDataGrid.bind(this)
//         }
//       });
//   }
  

}
