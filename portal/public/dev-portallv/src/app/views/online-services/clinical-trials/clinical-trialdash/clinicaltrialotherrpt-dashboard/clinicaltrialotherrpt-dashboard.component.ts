import { Component, OnInit } from '@angular/core';
import { ClinicalTrialdashComponent } from '../clinical-trialdash.component';
@Component({
  selector: 'app-clinicaltrialotherrpt-dashboard',
  templateUrl: './clinicaltrialotherrpt-dashboard.component.html',
  styleUrls: ['./clinicaltrialotherrpt-dashboard.component.css']
})
export class ClinicaltrialotherrptDashboardComponent extends ClinicalTrialdashComponent implements OnInit {

 
  ngOnInit() {
    this.application_title = 'Clinical Trial Other Report';
    this.sub_module_id = 103;
    this.reloadClinicalApplications({sub_module_id: this.sub_module_id});
    this.onLoadApplicationstatuses();
    this.onLoadclincialtrialappType(this.sub_module_id);
    this.onLoadProductsCounterDetails();
  }

}

