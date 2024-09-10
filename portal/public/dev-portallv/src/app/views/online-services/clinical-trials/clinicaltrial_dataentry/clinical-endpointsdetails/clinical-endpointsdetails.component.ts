import { Component, OnInit, Input, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Utilities } from 'src/app/services/common/utilities.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-clinical-endpointsdetails',
  templateUrl: './clinical-endpointsdetails.component.html',
  styleUrls: ['./clinical-endpointsdetails.component.css']
})
export class ClinicalEndpointsdetailsComponent implements OnInit {

  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() section_id: number;
  @Input() reg_clinical_trial_id: number;
  @Input() is_readonly: boolean;
  @Input() durationDescData: any;
  @Input() clinicaltrialEndpointGeneraldetailsfrm: FormGroup;

  confirmationData:any;
  app_resp:any;

  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {

    
  }
  ngOnInit() {
    this.clinicaltrialEndpointGeneraldetailsfrm.get('sites_no').valueChanges.subscribe(() => {
      this.calculateTotalParticipants();
    });

    this.clinicaltrialEndpointGeneraldetailsfrm.get('intended_no').valueChanges.subscribe(() => {
      this.calculateTotalParticipants();
    });

  } 

  calculateTotalParticipants() {
    const enrolledWorldwideNo = this.clinicaltrialEndpointGeneraldetailsfrm.get('sites_no').value || 0;
    const enrolledUgandaNo = this.clinicaltrialEndpointGeneraldetailsfrm.get('intended_no').value || 0;

    const totalParticipants = enrolledWorldwideNo * enrolledUgandaNo;

    this.clinicaltrialEndpointGeneraldetailsfrm.get('enrolled_uganda_no').setValue(totalParticipants);
  }
  refreshDataGrid() {
   // this.dataGrid.instance.refresh();
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
}
