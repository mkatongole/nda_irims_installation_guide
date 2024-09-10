import { Component, OnInit } from '@angular/core';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/SharedImportexportclassComponent';

@Component({
  selector: 'app-import-licenseapplication',
  templateUrl: './import-licenseapplication.component.html',
  styleUrls: ['./import-licenseapplication.component.css']
})
export class ImportLicenseapplictionComponent extends SharedImportexportclassComponent implements OnInit {

  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/importlicenseapplication-dashboard']);
       return
     }
  }
 funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onCloseQueryMode(){

    this.isInitalQueryResponseFrmVisible = false;
  }
}
