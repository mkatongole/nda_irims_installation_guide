import { Component, OnInit } from '@angular/core';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/SharedImportexportclassComponent';

@Component({
  selector: 'app-importexportlic-ammendrequest',
  templateUrl: './importexportlic-ammendrequest.component.html',
  styleUrls: ['./importexportlic-ammendrequest.component.css']
})
export class ImportexportlicAmmendrequestComponent extends SharedImportexportclassComponent implements OnInit {

  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/declaration-dashboard']);
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
