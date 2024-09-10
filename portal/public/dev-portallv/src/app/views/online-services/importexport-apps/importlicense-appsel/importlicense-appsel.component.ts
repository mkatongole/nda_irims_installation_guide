import { Component, OnInit, ViewChild } from '@angular/core';


import { ImportLicensevisashareclassComponent } from '../import-licensevisashareclass/import-licensevisashareclass.component';
@Component({
  selector: 'app-importlicense-appsel',
  templateUrl: './importlicense-appsel.component.html',
  styleUrls: ['./importlicense-appsel.component.css']
})
export class ImportLicenseappselComponent extends ImportLicensevisashareclassComponent implements OnInit {

  ngOnInit() {
    this. onLoadApplicationType();
  }
  onLoadApplicationType() {
    var data = {
      table_name: 'sub_modules',
      permit_type_id: 3,
      module_id: 4
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeData = data;
        });
  }

}
