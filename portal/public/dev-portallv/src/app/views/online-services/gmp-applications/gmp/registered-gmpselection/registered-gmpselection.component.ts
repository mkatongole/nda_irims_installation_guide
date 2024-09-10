import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import CustomStore from 'devextreme/data/custom_store';

import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-gmpselection',
  templateUrl: './registered-gmpselection.component.html',
  styleUrls: ['./registered-gmpselection.component.css']
})
export class RegisteredGmpselectionComponent implements OnInit {

  section_id:number;
  sub_module_id:number;
  gmp_type_id:number;
  processData:any;
  title:string;
  router_link:string;
  module_id:number =3;
  app_route:any;
  gmpapp_details:any;
  process_title:string;
  status_name:string;
  status_id:number;
  mistrader_id:number;
  registered_gmpApplicationData:any={};
 constructor(private config:ConfigurationsService, public httpClient: HttpClient,private spinner:SpinnerVisibilityService,private appService:GmpApplicationServicesService, public router: Router,public toastr: ToastrService,public authService: AuthService) { }

 ngOnInit() {

  let user_details = this.authService.getUserDetails();
  this.mistrader_id =  user_details.mistrader_id;
  
  this.gmpapp_details = this.appService.getGmpApplicationDetail();

  if (!this.gmpapp_details) {
    this.router.navigate(['./online-services/local-gmpapplications-dashboard']);
    return;
  }
  else {
    this.sub_module_id = this.gmpapp_details.sub_module_id;
    this.gmp_type_id = this.gmpapp_details.gmp_type_id;
    this.module_id = this.gmpapp_details.module_id;
    this.process_title = this.gmpapp_details.process_title;
   
    this.status_name = this.gmpapp_details.status_name;
    this.status_id = this.gmpapp_details.status_id;
  }

  this.onRegisteredGMPSearch();

}
funSelectRegisteredGMPsApp(data){
  let gmpdata = data.data;
   console.log(gmpdata);
  delete gmpdata.premise_id;
  delete gmpdata.module_id;
  delete gmpdata.sub_module_id;
  delete gmpdata.application_status_id;

  delete gmpdata.status_id;
   this.section_id = gmpdata.section_id;
   this.sub_module_id =  this.sub_module_id;

        this.config.getSectionUniformApplicationProces(this.sub_module_id, 1)
          .subscribe(
            data => {
              this.processData = data;
              this.spinner.hide();
              if (this.processData.success) {
                
                this.title = this.processData[0].name;
                this.router_link = this.processData[0].router_link;
                gmpdata.module_id = this.module_id;
                gmpdata.process_title = this.title;
                gmpdata.sub_module_id = this.sub_module_id;
                gmpdata.section_id = this.section_id;
                gmpdata.status_id = 1;
                gmpdata.status_name = 'New';
                this.appService.setGmpApplicationDetail(gmpdata);

                this.app_route = ['./online-services/' + this.router_link];

                this.router.navigate(this.app_route);

              }
              else {
                this.toastr.error(this.processData.message, 'Alert!');

              }
            });
        return false;
 }
 // onRegisteredGMPSearch() {
 //    //load the Premises Details 
 //    this.appService.getGMPDataDetails({ mistrader_id:this.mistrader_id,gmp_type_id:this.gmp_type_id}, 'gmpinspection/getTradersRegisteredGMPApplications')
 //    .subscribe(
 //      data => {
 //        if (data.success) {
 //          this.registered_gmpApplicationData = data.data;
 //        }
 //        else {
 //          this.toastr.success(data.message, 'Alert');
 //        }
 //      },
 //      error => {
 //        return false
 //      });
 //  }
onRegisteredGMPSearch() {
    let me = this;
    this.registered_gmpApplicationData.store = new CustomStore({
        load: function (loadOptions: any) {
            var params = '?';
            params += 'skip=' + loadOptions.skip;
            params += '&take=' + loadOptions.take;

            // Add additional parameters
            params += '&mistrader_id=' + me.mistrader_id;
            params += '&gmp_type_id=' + me.gmp_type_id;

            var headers = new HttpHeaders({
                "Accept": "application/json",
                "Authorization": "Bearer " + me.authService.getAccessToken(),
            });

            this.configData = {
                headers: headers,
                params: {
                    skip: loadOptions.skip,
                    take: loadOptions.take,
                    searchValue: loadOptions.filter,
                    mistrader_id: me.mistrader_id, // Additional parameters
                    gmp_type_id: me.gmp_type_id    // Additional parameters
                }
            };

            return me.httpClient.get(AppSettings.base_url + 'gmpinspection/getTradersRegisteredGMPApplications', this.configData)
                .toPromise()
                .then((data: any) => {
                    return {
                        data: data.data,
                        totalCount: data.totalCount
                    }
                })
                .catch(error => { throw 'Data Loading Error' });
        }
    });
}


}
