import { Injectable } from '@angular/core';


import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../app-settings';
import { map } from 'rxjs/operators';


import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImportexportService {
  trader_id: number;
  mistrader_id: number;
  email_address: string;
  config: any;
  application_details: any;
  private adverseReactionIds: number[] = [];
  constructor(private authService: AuthService, private myRoute: Router, private http: Http, private httpClient: HttpClient) {
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.email_address = user.email_address;

  }
  onSavePermitApplication(application_id, permitData, tracking_no,action_url,uploadData ='') {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    if(uploadData != ''){
      
    }
    return this.http.post(AppSettings.base_url +action_url, permitData, { params: { application_id: application_id, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

  updateCurrency(application_id, permitData,paying_currency_id,action_url,uploadData ='') {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    if(uploadData != ''){
      
    }
    return this.http.post(AppSettings.base_url +action_url, permitData, { params: { application_id: application_id,paying_currency_id:paying_currency_id, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }


  onLoadCustomeDeclaration(TrackingNumber) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    this.config = {
      headers: headers,
      params: { TrackingNumber: TrackingNumber }
    };

    return this.httpClient.get(AppSettings.base_url + 'importexportapp/getDeclarationDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadImportationReasonsDetails(business_type_id, licence_type_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: {business_type_id:business_type_id, licence_type_id:licence_type_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'importexportapp/getImportationReasons', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

   setAdverseReactionIds(ids: number[]): void {
    this.adverseReactionIds = ids;
  }

  getAdverseReactionIds(): number[] {
    return this.adverseReactionIds;
  }
  onSaveRenPermitApplication(application_id, permitData, tracking_no,action_url,uploadData ='') {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    if(uploadData != ''){
      
    }
    return this.http.post(AppSettings.base_url +action_url, permitData, { params: { application_id: application_id, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onsavePermitProductdetails(application_code, permitData, tracking_no,action_url) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'importexportapp/'+action_url, permitData, { params: { application_code: application_code, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));

  }
 onSaveDeclarationPermitApplication(application_id,port_id, permitData, tracking_no,action_url,uploadData ='') {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    if(uploadData != ''){
      
    }
    return this.http.post(AppSettings.base_url +action_url, permitData, { params: { application_id: application_id, tracking_no: tracking_no,port_id:port_id, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
 

  onLoaProductImportRangeDetails(importexport_product_range_id: number[]) {
      if (!importexport_product_range_id || importexport_product_range_id.length === 0) {
          return null;
      }

      const params = {};
      importexport_product_range_id.forEach((id, index) => {
          params[`importexport_product_range_id[${index}]`] = id;
      });

      const headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + this.authService.getAccessToken(),
      });

      const config = {
          params: params,
          headers: headers
      };

      return this.httpClient.get(AppSettings.base_url + 'importexportapp/getImportProductRange', config)
          .pipe(map(data => {
              return <any>data;
          }));
  }




    onLoadApplicantIncharge(TinNo) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    this.config = {
      headers: headers,
      params: { TinNo: TinNo }
    };

    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getBusinessDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }

   onLoadPersonnelInformations() {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    this.config = {
      headers: headers,
      params: { mistrader_id: this.mistrader_id }
    };

    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPersonnelInformations', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  
  onLoadApplicationCounterDetails(table_name) {
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: user.trader_id, table_name:table_name },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'importexportapp/getApplicationCounterDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  
  onPermitApplicationLoading(action_url,filter_params){

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    filter_params.trader_id = this.trader_id;
    filter_params.mistrader_id = this.mistrader_id;
    
    this.config = {
      params: filter_params,
      headers: headers
    };

    return this.httpClient.get(AppSettings.base_url + action_url, this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }
  
  onPermitApplicationArchive(application_id, tracking_no) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'importexportapp/onPermitApplicationArchive', '', { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'application_id': application_id, 'tracking_no': tracking_no }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onfuncValidatePermitDetails(application_code,validation_title,table_name){

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    //trader_id:  
    
    this.config = {
      params: {application_code:application_code,validation_title:validation_title,table_name:table_name},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/onfuncValidatePermitDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  getClinicalTrialOtherdetails(data,path){

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    //trader_id:  
    data.trader_id = this.trader_id;
    data.mistrader_id = this.mistrader_id;
    this.config = {
      params: data,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'clinicaltrials/'+path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  getPermitsOtherDetails(data,path){

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    //trader_id:  
    data.trader_id = this.trader_id;
    data.mistrader_id = this.mistrader_id;
    
    this.config = {
      params: data,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'importexportapp/'+path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  onAddPermitReceiverSender(table_name,data){//tra_permitsenderreceiver_data
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'importexportapp/onAddUniformApplicantDataset', data, { params: { 'trader_id': this.trader_id,'traderemail_address': this.email_address,table_name:table_name }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onAddNewProductinformation(productData,action_url){//tra_permitsenderreceiver_data
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'importexportapp/'+action_url, productData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onDeleteClinialREgistryDetails(record_id,table_name,application_id,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'clinicaltrials/onDeleteClinicalRegistryDetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,record_id:record_id,application_id:application_id,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  onDeletePermitProductsDetails(record_id,table_name,application_code,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'importexportapp/onDeletePermitdetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,record_id:record_id,application_code:application_code,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onDeleteMisTablePermitdetails(record_id,table_name,application_code,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'clinicaltrials/onDeleteMisTablePermitdetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,record_id:record_id,application_code:application_code,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
onDeleteOtherdetails(record_id,table_name,application_code,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'importexportapp/onDeleteOtherdetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,record_id:record_id,application_code:application_code,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
onLoadControlledSubstance(ControlledSubstance) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    this.config = {
      headers: headers,
      params: { ControlledSubstance: ControlledSubstance }
    };

    return this.httpClient.get(AppSettings.base_url + 'importexportapp/getControlledSubstance', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }

  onDeletePermitUploadedProductsDetails(table_name,application_code,title){

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'importexportapp/onDeletePermitUploadedProductsDetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,application_code:application_code,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));


  }
  
  onSynchronisedUploadedProducts(table_name,application_code,title){

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'importexportapp/onSynchronisedUploadedProducts', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,application_code:application_code,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));


  }
  onsaveBatchProductdetails(application_code, permitData,tracking_no,batch_product_id,action_url) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'importexportapp/'+action_url, permitData, { params: { application_code: application_code, tracking_no: tracking_no,batch_product_id:batch_product_id, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));

  }
  
  onSaveClinicalStudySite(study_site_data,table_name, application_id){//tra_permitsenderreceiver_data
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'clinicaltrials/onSaveClinicalStudySite', study_site_data, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address,table_name:table_name,application_id:application_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onsaveClinicaltrialOtherDetails(application_id, permitData,action_url) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'clinicaltrials/'+action_url, permitData, { params: { application_id: application_id,  'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

  onsaveClinicaltrialAppCodeOtherDetails(application_code, permitData,action_url) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'clinicaltrials/'+action_url, permitData, { params: { application_code: application_code,  'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
}
