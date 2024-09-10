import { Component, OnInit, Input, EventEmitter, Output, ViewContainerRef, ChangeDetectionStrategy,ChangeDetectorRef, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Utilities } from 'src/app/services/common/utilities.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AppSettings } from 'src/app/app-settings';
declare var Resumable: any;
@Component({
  selector: 'app-application-quality-summary-documents',
  templateUrl: './application-quality-summary-documents.component.html',
  styleUrls: ['./application-quality-summary-documents.component.css']
})
export class ApplicationQualitySummaryDocumentsComponent implements OnInit {
  @ViewChild("fileSelectionUpload") fileSelectionUpload: ElementRef;
  @Input() application_code: number;
  @Input() status_id: number;
  isDocumentUploadProgressVisible:boolean=false;
  @Input() sub_module_id: number;
  @Input() section_id: any;
  @Input() module_id: number;
  @Input() business_type_id: number;
  @Input() premise_type_id: number;
  
  @Input() document_type_id:number;
  @Input() permit_product_id: number;
  @Input() customer_account_id: number;
  
  @Input() preview_allonlinedocuploads: any;

  
  @Input() query_ref_id: number;
  @Input() prodclass_category_id: number;
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
  is_quality_summary:number=1;

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
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService, public dmsService: DocumentManagementService, public utilityService: Utilities,private cd: ChangeDetectorRef) { }
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
          business_type_id:this.business_type_id,
          permit_product_id:this.permit_product_id,
          node_ref:node_ref,
          customer_account_id:this.customer_account_id,
          description:description
      };
        this.file_uploder.opts.query = extra_params;
      this.isDocumentUploadProgressVisible = true;
    //  this.progress_value = 20;
      this.file_uploder.upload();
      
    //const uploadData = this.prepareSave();
    
    /*
    this.dmsService.uploadApplicationDMSDocument(uploadData, this.module_id, this.sub_module_id, this.section_id,  this.application_code, '','uploadApplicationDMSDocument')
      //.pipe(first())
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response.json();
           console.log(response_data);
          if (response_data.success) {
            this.isDocumentUploadPopupVisible = false;
            this.onLoadApplicationDocUploads();

            this.toastr.success(response_data.message, 'Response');
          }
          else {

            this.toastr.error(response_data.message, 'Response');

          }

        },
        error => {
          this.toastr.success('Error occurred', 'Response');

        });
        */
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
            business_type_id:'',
            description:'',
            customer_account_id:'',
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
  // onLoadAppDocRequirements() {

  //   this.dmsService.onLoadQualitySummaryDocRequirements(this.application_code, this.section_id, this.sub_module_id, this.document_type_id,this.status_id, this.query_ref_id,this.prodclass_category_id,this.business_type_id,this.permit_product_id)
  //     //.pipe(first())
  //     .subscribe(
  //       data => {
  //         if (data.success) {
  //           this.appDocumentsUploadRequirement = data.data;
  //         }
  //         else {
  //           this.toastr.error(data.message, 'Alert');
  //         }

  //       },
  //       error => {
  //         return false
  //       });
  // }
  onLoadAppDocRequirements() {
   

    this.dmsService.onLoadQualitySummaryDocRequirements(this.application_code, this.section_id, this.is_quality_summary,this.sub_module_id, this.document_type_id,this.status_id, this.query_ref_id,this.prodclass_category_id,this.business_type_id,this.permit_product_id)
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

    this.functDataGridToolbar(e);

  } functDataGridToolbar(e) {
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
    let action_params = { document_type_id: this.document_type_id,is_quality_summary:this.is_quality_summary, application_code: this.application_code, section_id: this.section_id, sub_module_id: this.sub_module_id,status_id:this.status_id,query_ref_id:this.query_ref_id,prodclass_category_id:this.prodclass_category_id,business_type_id:this.business_type_id,permit_product_id:this.permit_product_id ,customer_account_id:this.customer_account_id};
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
