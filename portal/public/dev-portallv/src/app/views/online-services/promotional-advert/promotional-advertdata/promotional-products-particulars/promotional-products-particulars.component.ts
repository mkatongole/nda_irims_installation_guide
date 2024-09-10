import { Component, OnInit, Input, EventEmitter, Output, ViewContainerRef, ChangeDetectionStrategy,ChangeDetectorRef, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedpromotionalAdvertComponent } from '../../sharedpromotional-advert/sharedpromotional-advert.component';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
declare var Resumable: any;

@Component({
  selector: 'app-promotional-products-particulars',
  templateUrl: './promotional-products-particulars.component.html',
  styleUrls: ['./promotional-products-particulars.component.css']
})
export class PromotionalProductsParticularsComponent  extends SharedpromotionalAdvertComponent {
  @ViewChild("fileSelectionUpload") fileSelectionUpload: ElementRef;
  isDocumentUploadProgressVisible:boolean=false;
  preview_allonlinedocuploads: any;

  @Input() promotionalProductparticularsfrm: FormGroup;
  @Input() promProductParticularsData: any;
  @Input() isRegisteredProductsWinshow: boolean;
  @Input() registeredProductsData: any;
  
  @Input() application_code: number;
  @Input() application_id: number;
  @Input() section_id: number;
  document_type_id:number;
  addproductGenericNamesFrm:FormGroup;
  addproductGenericNamesModal:boolean;
  manufacturersData: any ={};
  promotionalMaterialsData:any;
  languageData:any;
  isManufacturerSitePopupVisible:boolean;
  isnewmanufacturerModalShow:boolean;
  manufacturerFrm:FormGroup;
  isproductManufacturerModalShow:boolean;
  is_other_language:boolean = false;
  is_other_advert_materials:boolean =false;


  appDocumentsUploadData: any;
  is_uploadinitiated:boolean = false;
  appDocumentsUploadRequirement:any;
  filesToUpload: Array<File> = [];
  
  inProgress = false;
  seconds = 10;
  maxValue = 100;
  progress_value: number;
  minValue = 0;
  intervalId: number;

  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  documentMenuItems = [
    {
      text: "Action(s)",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        //{ text: "Update Document", action: 'update', icon: 'fa fa-upload', },
        { text: "Delete Document", action: 'delete', icon: 'fa fa-trash-o' },
       // { text: "Preview Previous Versions", action: 'version', icon: 'fa fa-upload', },
      ]
    }
  ];
  documentVersionMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'versiondownload', icon: 'fa fa-download' }
      ]
    }
  ];
  dataGrid: DxDataGridComponent;
  isDocumentUploadPopupVisible: boolean = false;

  document_previewurl: any;

  isDocumentPreviewDownloadwin: boolean = false;
  loading: boolean = false;
  appDocumentUploadfrm:FormGroup;
  premDocumentsVersionsUploadData: any;
  isDocumentVersionPreviewDownloadwin: boolean = false;
  file_uploder:any;
  assets_url:any;
  ngOnInit() {

    this.assets_url = AppSettings.assets_url;

    this.appDocumentUploadfrm = this.formBuilder.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });

    this.onLoadApplicationDocUploads();
    this.onLoadAppDocRequirements();
    this.injectScript(this.assets_url+'/assets/js/resumable.js')
        .then(() => { console.log('Script loaded!'); this.setupResumable(); })
        .catch(error => { console.log(error); });

    this.addproductGenericNamesFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      therapeutic_code: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))
    }); 
    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required]))

    });
    this.onLoadrouteOfAdministration();
    this.onLoaddosageForms();
    this.onLoadproductCategory(this.section_id);
    this.onLoadClassifications(this.section_id);
    this.onLoadSections();
    this.onLoadapppromMaterialsDetailData();
    this.onLoadPromotionalMaterialsLanguage();
  }
  onAddNewCommonNameDetails(){

    this.addproductGenericNamesFrm.reset();
    this.addproductGenericNamesModal = true;

  }
  funcSearchManufacturingSite() {

    this.isManufacturerSitePopupVisible = true;
    var me = this;
   
  this.manufacturersData.store = new CustomStore({
    load: function (loadOptions: any) {
      console.log(loadOptions)
        var params = '?';
        params += 'skip=' + loadOptions.skip;
        params += '&take=' + loadOptions.take;//searchValue
        var headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });
      
        this.configData = {
          headers: headers,
          params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter }
        };
        return me.httpClient.get(AppSettings.base_url + 'productregistration/getManufacturersInformation',this.configData)
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



  onProductParticularsPreparing(e,is_readonly=false) {
    this.functDataGridToolbar(e, this.funcAddProductParticulars, 'Promotional Materials Particulars',is_readonly);

  }

  funcAddProductParticulars(){
      this.onLoadapppromMaterialsDetailData();
      this.promotionalProductparticularsfrm.reset();
      this.isPromotionalProductparticularswinadd = true;

  }

  funcSelectManufacturer(data) {
    let data_resp = data.data;
    this.promotionalProductparticularsfrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id});
     
    this.isManufacturerSitePopupVisible = false;

  } onManufacturerPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  }
  funcAddManufacturerSite() {
    this.isnewmanufacturerModalShow = true;
    this.manufacturerFrm.reset();
  }
    


  //   onLoadPromotionalMaterialsDetails() {
  //   var data = {
  //     table_name: 'par_promotion_material_items'
  //   };
  //   this.config.onLoadConfigurationData(data)
  //     .subscribe(
  //       data => {
  //         this.promotionalMaterialsDta = data;
  //       });
  // }




onGenericNameSelected(event) {
  const selectedGenericNameId = event.value;
  if (selectedGenericNameId) {
    const selectedMaterial = this.promotionalMaterialsData.find(material => material.id === selectedGenericNameId);
    console.log(selectedMaterial);
    if (selectedMaterial) {
      this.promotionalProductparticularsfrm.get('promotions_material_id').setValue(selectedGenericNameId);
      this.promotionalProductparticularsfrm.get('language_id').setValue(selectedMaterial.language_id);
    }
  }
}


  onLoadapppromMaterialsDetailData() {

    this.appService.getPromotionalAppOtherDetails({application_id:this.application_id}, 'promotionadverts/getApppromMaterialsDetailData')
      //.pipe(first())
      .subscribe(
        data => {
          this.promotionalMaterialsData = data.data;
          this
        },
        error => {
          return false
        });
  }
  onLoadPromotionalMaterialsLanguage() {
    var data = {
      table_name: 'par_promotion_material_language'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.languageData = data;
        });
  }
  onAddManufacturerDetails() {
    this.spinner.show();
    let manufacturer_name = this.manufacturerFrm.get('name').value;
    this.appProdService.onAddManufacturingSite('tra_manufacturers_information',  this.manufacturerFrm.value)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.isnewmanufacturerModalShow = false;
            this.isproductManufacturerModalShow = false;
            let manufacturer_id =this.product_resp.record_id;
            //load Manufactureing Sites 
            this.promotionalProductparticularsfrm.patchValue({manufacturer_name:manufacturer_name,manufacturer_id:manufacturer_id});
     
           this.isManufacturerSitePopupVisible = false;
  
            this.toastr.success(this.product_resp.message, 'Response');
  
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  OnSelectAdvertMaterial($event){
      if( $event.selectedItem.id == 3){
        this.is_other_advert_materials = true;
    }
    else{
      this.is_other_advert_materials = false;
    }
  }
  OnSelectLanguage($event){
      if( $event.selectedItem.id == 2){
        this.is_other_language = true;
    }
    else{
      this.is_other_language = false;
    }
  }

  format(value) {
    return `Uploading: ${value * 100}%`;
  }
  onaplicationDocumentUpload() {

    let node_ref = this.appDocumentUploadfrm.get('node_ref').value,
        document_requirement_id = this.appDocumentUploadfrm.get('document_requirement_id').value,
        id = this.appDocumentUploadfrm.get('id').value,
        description = this.appDocumentUploadfrm.get('description').value;
        let extra_params = {
          module_id: this.module_id,
          id: id,
          sub_module_id: this.sub_module_id,
          section_id: this.section_id,
          application_code:this.application_code,
          document_requirement_id:document_requirement_id,
          node_ref:node_ref,
          description:description
      };
        this.file_uploder.opts.query = extra_params;
      this.isDocumentUploadProgressVisible = true;
      this.file_uploder.upload();
      

  } 
  
  setupResumable() {
   let me = this;
    let resumable = new Resumable({
        target: AppSettings.base_url +'documentmanagement/resumableuploadApplicationDocumentFile',
        query:{
            module_id: '',
            id: '',
            application_id: '',
            sub_module_id: '',
            section_id: '',
            application_code:'',
            document_requirement_id:'',
            description:'',
            node_ref:''
        } ,
       fileType: ['zip','pdf','png', 'jpg', 'jpeg', 'doc','docx', 'rar', 'mp4','mkv','xlsx', 'xlsm','xls','XLSB'],
        chunkSize: 10*10024, // default is 1*1024*1024, this should be less than your maximum limit in php.ini
        headers: {
          "Authorization": 'Bearer ' + this.authService.getAccessToken(),
            'Accept' : 'application/json'
        },
        testChunks: false,
        throttleProgressCallbacks: 1,
    });
    resumable.on('fileAdded', function(file, event){

      me.appDocumentUploadfrm.get('file').setValue(file.relativePath)
        me.file_uploder = resumable;
     
    });
   
    resumable.on('fileProgress', function(file){
     
      let value = Math.floor(file.progress() * 100);

      me.progress_value =   value;
     
      
    });

    resumable.on('fileSuccess', function(file){
      
      me.toastr.info('Upload Completed', 'Response');
      me.closeUploadWIns();
      this.isDocumentUploadProgressVisible = false;
    });
    resumable.on('fileError', function(file, message){
      console.debug('fileError', file, message);
      this.isDocumentUploadProgressVisible = false;
    });
   
    resumable.on('fileRetry', function(file){
      
      let value = Math.floor(file.progress() * 100);
      
      me.progress_value =   value;
     
    });
   
    resumable.on('uploadStart', function(){
      console.debug('uploadStart');
    });
    resumable.on('complete', function(){
      me.closeUploadWIns();
    });
    resumable.on('progress', function(){
      console.debug('progress');
    });
    resumable.on('error', function(message, file){
      let value = Math.floor(file.progress() * 100);
      me.progress_value =   value;
      me.toastr.error('Upload Failed, Kinldy try Again', 'Alert');
      me.closeUploadWIns();
    });
    resumable.on('pause', function(){
      console.debug('pause');
    });
    resumable.on('cancel', function(){
      console.debug('cancel');
    });
   
    me.file_uploder =resumable;
  }
  closeUploadWIns(){
    this.isDocumentUploadProgressVisible = false;
    this.isDocumentUploadPopupVisible = false;
    this.onLoadApplicationDocUploads();

  }
  injectScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.addEventListener('load', resolve);
      script.addEventListener('error', () => reject('Error loading script.'));
      script.addEventListener('abort', () => reject('Script loading aborted.'));
      document.head.appendChild(script);
    });
  }
  updateProgress(value,progressBar) {
    progressBar.setValue(value*0.01);
    progressBar.updateText(value+' %');          
  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes.section_id.currentValue)
    this.onLoadAppDocRequirements();
    this.onLoadApplicationDocUploads();
    
   }
  onLoadAppDocRequirements() {
   
    this.dmsService.onLoadDocRequirement(this.application_code, this.section_id, this.sub_module_id, this.document_type_id,this.status_id)
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.appDocumentsUploadRequirement = data.data;
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }

  refresh() {
    this.cd.detectChanges();
  }
  onApplicationDocumentToolbar(e) {

    this.functDataGridToolbars(e);

  } functDataGridToolbars(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
          icon: 'refresh',
          onClick: this.onLoadApplicationDocUploads.bind(this)
        }
      });
  } funAddApplicationUploadDetails(data) {

    let document_requirement_id = data.data.document_requirement_id;
   
    this.appDocumentUploadfrm.get('document_requirement_id').setValue(document_requirement_id);
    this.appDocumentUploadfrm.get('file').setValue('');
    this.appDocumentUploadfrm.get('description').setValue('');

    this.isDocumentUploadPopupVisible = true;
   
  }
  onDocumentUploadPopupVisible(){
    
      if(!this.is_uploadinitiated){
        this.file_uploder.assignBrowse(document.getElementById('fileSelection'));
        this.is_uploadinitiated = true;
      }
  }
 
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

  appDocumentsActionColClick(e, data) {

    if (data.node_ref != '') {

      var action_btn = e.itemData;
      if (action_btn.action === 'download') {
        this.funcDocmentPreviewedit(data.data);
      }
      else if (action_btn.action == 'update') {
        this.funcDocumentUpdateDetails(data.data);
      }
      else if (action_btn.action == 'delete') {
        this.funcDocumentDeleteDetails(data.data);
      }
      else if (action_btn.action == 'version') {
        this.funcDocmentPreviewDocumentVerison(data.data);
      }
      else if (action_btn.action == 'versiondownload') {
        this.funcDocmentPreviewedit(data.data);
      }

    }
    else {

      this.toastr.success('Document yet to be uploaded', 'Response');

    }

  }

  funcDocmentPreviewedit(data) {
    this.spinner.show();
    if(data.node_ref == ''){
      this.toastr.success('Upload Document for you to download', 'Response');
      return;
    }
    this.dmsService.getApplicationDocumentDownloadurl(this.application_code, data.node_ref, data.id)
      .subscribe(
        response => {

          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

            this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);

            this.isDocumentPreviewDownloadwin = true;

          }
          else {

            this.toastr.success(response_data.message, 'Response');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onLoadApplicationDocUploads() {
    let action_params = { document_type_id: this.document_type_id, application_code: this.application_code, section_id: this.section_id, sub_module_id: this.sub_module_id,status_id:this.status_id};
    this.dmsService.onLoadApplicationDocploads(action_params,'getApplicationDocploads')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.appDocumentsUploadData = data.data;
            
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }

  private prepareSave(): any {
    let input = new FormData();
    const files: Array<File> = this.filesToUpload;
    input.append('document_requirement_id', this.appDocumentUploadfrm.get('document_requirement_id').value);
   // input.append('file', this.appDocumentUploadfrm.get('file').value);
    for(let i =0; i < files.length; i++){
        input.append("files[]", files[i], files[i]['name']);
    }
    input.append('id', this.appDocumentUploadfrm.get('id').value);
    input.append('node_ref', this.appDocumentUploadfrm.get('node_ref').value);

    return input;
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.appDocumentUploadfrm.get('file').setValue(file);
    }
  }
  fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
      //this.product.photo = fileInput.target.files[0]['name'];
  }
  
 
  funcDocumentUpdateDetails(data) {
    this.appDocumentUploadfrm.patchValue(data);
    //load the personnel qualifiations 

    this.isDocumentUploadPopupVisible = true;

  } funcDocumentDeleteDetails(app_data) {
    let file_name = app_data.file_name;
    let initial_file_name = app_data.initial_file_name;
    let node_ref = app_data.node_ref;
    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want deleted the selected file with ' + file_name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          //this.spinner.show();
          this.dmsService.onApplicationDocumentDelete(this.application_code, node_ref, record_id,'onApplicationDocumentDelete')
            .subscribe(
              response => {

                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {

                  this.onLoadApplicationDocUploads();

                  this.toastr.success(response_data.message, 'Response');
                }
                else {

                  this.toastr.success(response_data.message, 'Response');

                }

              },
              error => {
                this.loading = false;
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });

  }
  funcDocmentPreviewDocumentVerison(data) {
    this.spinner.show();
    this.dmsService.getApplicationDocumentPreviousVersions(this.application_code, data.node_ref)
      .subscribe(
        response => {

          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

            this.premDocumentsVersionsUploadData = response_data.data;

            this.isDocumentVersionPreviewDownloadwin = true;

          }
          else {

            this.toastr.error(response_data.message, 'Response');

          }

        },
        error => {
          this.loading = false;
        });

  }
  
  onCellPrepared(e) {
    
    if(e.rowType === "data" && e.column.dataField === "is_mandatory") {
      let is_mandatory =e.data.is_mandatory;

        if(is_mandatory =='Mandatory'){
          e.cellElement.style.color = 'black';
          e.cellElement.style.backgroundColor = 'red';    
        }else{
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = 'green';
        }
          
    }
}
}
