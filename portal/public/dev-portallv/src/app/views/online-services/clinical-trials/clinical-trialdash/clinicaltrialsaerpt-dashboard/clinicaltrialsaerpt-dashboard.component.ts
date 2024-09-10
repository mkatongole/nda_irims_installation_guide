import { Component, OnInit } from '@angular/core';
import { ClinicalTrialdashComponent } from '../clinical-trialdash.component';
@Component({
  selector: 'app-clinicaltrialsaerpt-dashboard',
  templateUrl: './clinicaltrialsaerpt-dashboard.component.html',
  styleUrls: ['./clinicaltrialsaerpt-dashboard.component.css']
})
export class ClinicaltrialsaerptDashboardComponent extends ClinicalTrialdashComponent implements OnInit {

  
  ngOnInit() {
    this.application_title = 'Clinical Trial SAE Report';
    this.sub_module_id = 102;
    this.reloadClinicalApplications({sub_module_id: this.sub_module_id});
    this.onLoadApplicationstatuses();
    this.onLoadclincialtrialappType(this.sub_module_id);
    this.onLoadProductsCounterDetails();
  }

}
