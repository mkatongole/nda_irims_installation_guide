import { Component, OnInit } from '@angular/core';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/SharedImportexportclassComponent';

@Component({
  selector: 'app-import-licenseapp',
  templateUrl: './import-licenseapp.component.html',
  styleUrls: ['./import-licenseapp.component.css']
})
export class ImportLicenseappComponent extends SharedImportexportclassComponent implements OnInit {

  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/importlicense-dashboard']);
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
  let paying_currency_details =$event.selectedItem;
  console.log(paying_currency_details);
    if(paying_currency_details){
      const paying_currency_id = paying_currency_details.id;
      this.appService.updateCurrency(this.application_id, paying_currency_id, this.tracking_no, 'importexportapp/updateImportExportApplication')
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
