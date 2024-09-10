import { Injectable } from '@angular/core';
import { AppSettings } from '../../app-settings';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';  
  

@Injectable({
  providedIn: 'root'
})

export class ConfigurationsService {
  config: any;
  data:any;
  key:string= 'kPJks1MrdXE03n8H';
  trader_id: number;
  mistrader_id: number;
  clickedMenuItem: any;
 public apiKey  = 'YAl5bDPBSInOxhvYq_XQVVQfRTn0zfYjIZWs36GSLfuwi0Yio4U5NiH1gPn9oLTuP';
  private bingMapsBaseUrl = 'https://dev.virtualearth.net/REST/v1/';

 

  constructor(private sanitizer:DomSanitizer , private authService: AuthService,private httpClient: HttpClient, private http: Http) { }
  onLoadNavigation(navigation_type_id: number) {

    let user = this.authService.getUserDetails();
      
    if(user){
      this.trader_id = user.trader_id;
      this.mistrader_id = user.mistrader_id;
      this.data = {
        is_local:user.is_local,
        navigation_type_id: navigation_type_id,
        trader_id: this.trader_id
      };
    }
    else{
      this.data = {
        navigation_type_id: navigation_type_id,
        trader_id: this.trader_id
      };
    }
    
    this.config = {
      params:  this.data,
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getNavigationItems', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));

  }
  getLocations(query: string): Observable<any> {
    const url = `${this.bingMapsBaseUrl}Locations?q=${query}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  onLoadClickedMenuItem(menuItem: any) {
    this.clickedMenuItem = menuItem;
  }

  getClickedMenuItem() {
    return this.clickedMenuItem;
  }
  onLoadServicesDataset(module_id) {
    
    this.config = {
      params:  {module_id:module_id},
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getOrganisationServices', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));

  }  
onLoadImportExportAppSubmissionGuidelines(sub_module_id, licence_type_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { sub_module_id: sub_module_id, licence_type_id: licence_type_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'importexportapp/getImportExportAppSubmissionGuidelines', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }  
  onLoaPortOfEntryDetails(mode_oftransport_id,sub_module_id){
      var headers = new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + this.authService.getAccessToken(),
      });
      this.config = {
        params: {mode_oftransport_id, sub_module_id: sub_module_id},
        headers: headers
      };
      return this.httpClient.get(AppSettings.base_url + 'configurations/getPortOfEntry', this.config)
        .pipe(map(data => {
          return <any>data;
        }));
    }

  onLoadProductRangeDetails(business_type_id, licence_type_id, product_classification_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: {business_type_id:business_type_id, licence_type_id:licence_type_id, product_classification_id:product_classification_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getProductRange', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
 onLoadVerificationPercentageData(bubu_nonbubu_id, is_registered_id, product_category_id, importation_reason_id, business_type_id, licence_type_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: {bubu_nonbubu_id:bubu_nonbubu_id, is_registered_id:is_registered_id, product_category_id:product_category_id, importation_reason_id:importation_reason_id, business_type_id:business_type_id, licence_type_id:licence_type_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getVerificationData', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  

    onLoadOnlineServicesDataset(menuId) {
    
    this.config = {
      params:  {menuId:menuId},
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getOrganisationOnlineServices', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));

  } 
  onLoadRegionsData(district_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { district_id: district_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getRegionsDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadCountyData(district_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { district_id: district_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getCountyDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  getSafeUrl(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  getProhibitedProducts(): Observable<any> {
    this.config = {
      headers: { 'Accept': 'application/json' }
    };

    this.config = {
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getProhibitedProducts', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadContactdetails(){
    this.config = {
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getContactdetails', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  onLoadAppSubmissionGuidelines(sub_module_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { sub_module_id: sub_module_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getAppSubmissionGuidelines', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadConfigurationData(data) {
    data.table_name = btoa(data.table_name);
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    
    return this.httpClient.get(AppSettings.base_url + 'configurations/getCommonMisParams', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  
  getProductsQualitySummaryDetails(data) {
    data.table_name = btoa(data.table_name);
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getProductsQualitySummaryDetails', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
// getProductsQualitySummaryDetails(data) {
//     data.table_name = btoa(data.table_name);
//    this.config = {
//     params: data,
//     headers: { 'Accept': 'application/json' }
//   };

//   return this.httpClient.get(AppSettings.base_url + 'configurations/getProductsQualitySummaryDetails', this.config)
//     .pipe(
//       map((response: any) => {
//         // Assuming that your data is present in 'response.data'
//         return response.data || [];
//       }));
// }

  onLoadAsynchConfigurationData(data) {
    
    data.table_name = btoa(data.table_name);
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    
    return this.httpClient.get(AppSettings.base_url + 'configurations/getCommonMisParams', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  funcEncryptData(value){
    var key = CryptoJS.enc.Utf8.parse(this.key);
    var iv = CryptoJS.enc.Utf8.parse(this.key);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
      mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding
    });
   
    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get( value){
    var key = CryptoJS.enc.Utf8.parse(this.key);
    var iv = CryptoJS.enc.Utf8.parse(this.key);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

 onLoadVerificationDataDetails(business_type_id , licence_type_id, importation_reason_id, product_category_id, is_registered, product_origin_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: {business_type_id:business_type_id , licence_type_id:licence_type_id, importation_reason_id:importation_reason_id, product_category_id:product_category_id, is_registered:is_registered, product_origin_id:product_origin_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getVerificationData', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  
  onLoadPortalConfigurationData(data) {

    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getPortalCommonMisParams', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  
  onApplicationProcessGuidelines(data) {

    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getonApplicationProcessGuidelines', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  getAccessToken() {
    let userDetails = JSON.parse(localStorage.getItem('user'));
    return userDetails.access_token;
  }
  getSectionUniformApplicationProces(sub_module_id, status_id, section_id= null,prodclass_category_id= null,appsubmissions_type_id= null) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });
    this.config = {
      params: { status_id: status_id, sub_module_id: sub_module_id,section_id:section_id,prodclass_category_id:prodclass_category_id,appsubmissions_type_id:appsubmissions_type_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getUniformSectionApplicationProcess', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  
  getSectionUniformApplicationProcesWithValidation(sub_module_id, status_id, section_id= null,prodclass_category_id= null,reg_id=null,reg_iddefination=null,appsubmissions_type_id=null) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });
    this.config = {
      params: { status_id: status_id, sub_module_id: sub_module_id,section_id:section_id,prodclass_category_id:prodclass_category_id,reg_id:reg_id,reg_iddefination:reg_iddefination,appsubmissions_type_id:appsubmissions_type_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getSectionUniformApplicationProcesWithValidation', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  onLoadCountries() {
   
    var data = {
      table_name: 'par_countries',
    };
    this.onLoadConfigurationData(data)
    //.pipe(first())
    .subscribe(
      data => {
        return data;
      },
      error => {
        return false;
      });
  }
  onLoadRegions(country_id) {
    
     var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.onLoadConfigurationData(data)
    //.pipe(first())
    .subscribe(
      data => {
        return data;
      },
      error => {
        return false
      });
  }
  onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.onLoadConfigurationData(data)
    //.pipe(first())
    .subscribe(
      data => {
        return data
      },
      error => {
        return false;
      });
  }
  getApplicationProces(section_id, sub_module_id) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });
    this.config = {
      params: { section_id: section_id, sub_module_id: sub_module_id },
      headers: headers
    };

    return this.httpClient.get(AppSettings.base_url + 'configurations/getApplicationProcess', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }



  // returnReportIframe(documentUrl){
  //   let iframe = '<iframe class="w-100 h-100" style="height:550px !important" src="'+documentUrl+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
  //   return iframe;
    
  // }
    returnReportIframe(report_url){
    let iframe = '<iframe class="w-100 h-100" style="height:650px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
    return iframe;
    
  }
  
  returnFixedHeightReportIframe(report_url,height){
    let iframe = '<iframe class="w-100 h-100" style="height:"'+height+'" !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
    return iframe;
    
  }
  returnReportIframeFill(report_url){
    let iframe = '<iframe class="col-lg-12 row" style="height:750px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
    return iframe;
    
  }
}
