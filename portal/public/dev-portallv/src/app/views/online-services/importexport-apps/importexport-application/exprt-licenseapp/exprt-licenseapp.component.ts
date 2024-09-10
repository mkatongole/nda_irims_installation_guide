import { Component, OnInit } from '@angular/core';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/SharedImportexportclassComponent';

@Component({
  selector: 'app-exprt-licenseapp',
  templateUrl: './exprt-licenseapp.component.html',
  styleUrls: ['./exprt-licenseapp.component.css']
})
export class ExprtLicenseappComponent extends SharedImportexportclassComponent implements OnInit {

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

  onPayingCurrencyCboSelect($event) {
  let paying_currency_details =$event.selectedItem.id;
    if(paying_currency_details){
      const paying_currency_id = paying_currency_details;
      this.paying_currency_id =paying_currency_id;
      this.appService.updateCurrency(this.application_id,this.tracking_no,this.paying_currency_id, 'importexportapp/updateImportExportApplication')
        .subscribe(
          response => {
            this.app_resp = response.json();
            //the details 
            this.spinner.hide();
            if (this.app_resp.success) {
              this.application_id = this.app_resp.application_id;
              this.toastr.success(this.app_resp.message, 'Response');
            } else {
              this.toastr.error(this.app_resp.message, 'Alert');
            }
          },
          error => {
            this.loading = false;
          });

  }
}

}
