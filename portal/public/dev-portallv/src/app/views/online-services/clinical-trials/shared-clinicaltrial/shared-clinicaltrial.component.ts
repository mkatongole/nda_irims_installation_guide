import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray ,Validators,AbstractControl, FormBuilder } from '@angular/forms';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';

import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';

import { WizardComponent } from 'ng2-archwizard';
import { Utilities } from 'src/app/services/common/utilities.service';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import DataSource from 'devextreme/data/data_source';
import { ApplicationDocumentsComponent } from '../../application-documents/application-documents.component';

@Component({
  selector: 'app-shared-clinicaltrial',
  templateUrl: './shared-clinicaltrial.component.html',
  styleUrls: ['./shared-clinicaltrial.component.css']
})
export class SharedClinicaltrialComponent implements OnInit {
  @ViewChild(ApplicationDocumentsComponent) documentComponent:ApplicationDocumentsComponent;
  @ViewChild(DxDataGridComponent)

  dataGrid: DxDataGridComponent;

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  documentMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        { text: "Update Document", action: 'update', icon: 'fa fa-upload', },
        { text: "Delete Document", action: 'delete', icon: 'fa fa-trash-o' },
        { text: "Preview Previous Versions", action: 'version', icon: 'fa fa-upload', },
      ]
    }
  ];
  appDocumentsUploadData: any = {};

  clinicaltrialGeneraldetailsfrm: FormGroup;
  clinicaltrialObjectiveGeneraldetailsfrm:FormGroup;
  clinicaltrialDescriptionGeneraldetailsfrm:FormGroup;
  clinicaltrialStudyGeneraldetailsfrm:FormGroup;
  clinicaltrialEndpointGeneraldetailsfrm:FormGroup;
  clinicaltrialGeneralExclusiondetailsfrm:FormGroup;
  clinicalTrialControl: FormControl;
  clinicaltrialMonitoringReportdetailsfrm:FormGroup;
  nonClinicaltrialPharmacologyfrm:FormGroup;
  nonClinicaltrialtoxicologyfrm:FormGroup;
  ClinicaltrialRenewalSummaryfrm:FormGroup;
  preSubmissionGeneraldetailsfrm:FormGroup;
  clinicaltrialReportingdetailsfrm:FormGroup;
  clinicaltrialSaeReportingdetailsfrm:FormGroup;
  clinicaltrialOtherReportingdetailsfrm:FormGroup;
  clinicaltrialConcomitantdetailsfrm:FormGroup;

  documentUploadfrm: FormGroup;

  app_resp: any;
  section_id: number = 3;
  module_id: number = 7;
  sub_module_id:number;
  application_id: number;
  application_code: number;
  tracking_no: string;
  loading: boolean;
  app_route: any;
  initWizardPanel:number = 0;
  zoneData: any;
  durationDescData: any;
  isSponsorInvestigatorSearchWinVisible: boolean = false;

  sponsorInvestigatorData: any;
  clinicaltrailIMPProdData: any;
  clinicaltrailHandlingProdData: any;
  sponsor_investigatortitle: any;
  checkifsponsor: any = false;
  checkifAllInvestigatorsponsor: any = false;
  sponsorInvestigatorFrm: FormGroup;
  studySiteFrm: FormGroup;
  clinicaltInvestigatorFrm: FormGroup;
  iMPProductDetailsFrm: FormGroup;
  issponsorInvestigatorAddWinVisible: boolean = false
  countries: any;
  regions: any;
  districts: any;
  application_details: any;
  process_title: '';
  status_name: string;
  status_id: number = 1;
  payingCurrencyData: any;
  
  fastTrackOptionsData: any;
  
  investigatorCategoryData: any;
  clinicalProductCategoryData: any;
  commonNameData: any;
  routeOfAdminData: any;
  dosagFormData: any;
  siUnitsData: any;
  marketlocationData: any;
  manufacturersData: any;
  clinicalStudySitesData:any;
  isClinicalSitesDetailsVisible: boolean = false;
  isStudySiteAddWinVisible: boolean = false;

  clinicalSitesDetailsData: any;
  studySitesData: any;
  isDocumentUploadPopupVisible: boolean = false;
  InvestigatorDetailsWinVisible: boolean = false;
  IMPProductDetailsWinVisible: boolean = false;
  documentsUploadData: any;
  documentsUploadRequirementData: any;
  document_previewurl: any;
  registeredProductsData:any;
  clinicaltrailComparatorPProdData:any;
  isDocumentPreviewDownloadwin: boolean = false;

  documentsVersionsUploadData: any;
  isDocumentVersionPreviewDownloadwin: boolean = false;
  variationCategoriesData:any;
  termscheckbox: boolean = false;
  terms_conditions:any;
  clinicaltrailVariationRequestsData:any;

  isRegisteredProductSearchWinVisible:boolean = false;
  isRegisteredProductsWinshow:boolean = false;
  isPreviewApplicationsDetails:boolean = false;
  initqueryresponsefrm:FormGroup;

  isInitalQueryResponseFrmVisible:boolean = false;
  applicationPreckingQueriesData:any;
  query_sectioncheck:string;
  is_readonly:boolean = false;
  clinicaltrailinvestigatorsData:any;
  reg_clinical_trial_id:number;
  sectionsData:any;
  doc_section_id:any;
  docsection_id: any;
  prodsection_id:number;
  ctrethicsCommitteesData:any;
   clinicalTrialRegistryData:any;
  onApplicationSubmissionFrm:FormGroup;

  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {


    this.application_details = this.appService.getApplicationDetail();


    if (!this.application_details) {
      //this.router.navigate(['./../online-services/clinical-trialsdashboard']);
     // return
    }
    else {

      this.process_title = this.application_details.process_title;
      this.application_id = this.application_details.application_id;
      this.tracking_no = this.application_details.tracking_no;

      this.status_name = this.application_details.status_name;
      this.status_id = this.application_details.application_status_id;
     
      this.application_code = this.application_details.application_code;
      this.doc_section_id = this.application_details.section_id+','+this.application_details.clinical_prodsection_id;
      this.sub_module_id = this.application_details.sub_module_id;
      this.reg_clinical_trial_id = this.application_details.reg_clinical_trial_id;
      
    }  
    this.clinicaltrialMonitoringReportdetailsfrm = new FormGroup({
        safety_monitoring_plan: new FormControl('', Validators.compose([Validators.required])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        system_used: new FormControl('', Validators.compose([Validators.required])),
        action_seriousadverse_event: new FormControl('', Validators.compose([Validators.required])),
        safety_monitoring_board: new FormControl('', Validators.compose([Validators.required])),
        interim_report_date: new FormControl('', Validators.compose([Validators.required])),
        data_management_process:new FormControl('', Validators.compose([Validators.required])),
        estimated_due_report_date: new FormControl('', Validators.compose([Validators.required])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required]))

       }); 

       this.nonClinicaltrialPharmacologyfrm = new FormGroup({
        primary_pharmacodynamics: new FormControl('', Validators.compose([Validators.required])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        secondary_pharmacodynamics: new FormControl('', Validators.compose([Validators.required])),
        pharmacodynamic_drug_interactions: new FormControl('', Validators.compose([Validators.required])),
        pharmacokinetics: new FormControl('', Validators.compose([Validators.required])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required]))

       });

       this.clinicaltrialConcomitantdetailsfrm = new FormGroup({
        concomitant_drugs: new FormControl('', Validators.compose([Validators.required])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        dateof_administration: new FormControl('', Validators.compose([Validators.required])),
        relevant_history: new FormControl('', Validators.compose([Validators.required])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required]))

       });

        this.nonClinicaltrialtoxicologyfrm = new FormGroup({
        primary_pharmacodynamics: new FormControl('', Validators.compose([Validators.required])),
        secondary_pharmacodynamics: new FormControl('', Validators.compose([Validators.required])),
        pharmacodynamic_drug_interactions: new FormControl('', Validators.compose([Validators.required])),
        pharmacokinetics: new FormControl('', Validators.compose([Validators.required])),
        toxicology: new FormControl('', Validators.compose([Validators.required])),
        First_in_human_trials: new FormControl('', Validators.compose([Validators.required])),
        glp_aspects: new FormControl('', Validators.compose([Validators.required])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required]))

       });   

        this.ClinicaltrialRenewalSummaryfrm = new FormGroup({
        date_of_approved_research: new FormControl('', Validators.compose([Validators.required])),
        date_of_approved_uncst: new FormControl('', Validators.compose([Validators.required])),
        date_of_approval: new FormControl('', Validators.compose([Validators.required])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required]))

       }); 
    this.clinicalTrialControl = new FormControl('', Validators.compose([]));
   //this.adverseReactionIds = new FormControl('', Validators.compose([]));

    this.clinicaltrialGeneralExclusiondetailsfrm = new FormGroup({
        is_clinicaltrialin_uganda: new FormControl('', Validators.compose([Validators.required])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        clinicalin_othercountries_sites: new FormControl('', Validators.compose([])),
        clinicalin_otheruganda_sites:new FormControl('', Validators.compose([])),
        prevclinicalin_othercountries_sites:new FormControl('', Validators.compose([])),
        is_clinicaltrialin_othercountry: new FormControl('', Validators.compose([Validators.required])),
        is_prevclinicaltrialin_othercountry: new FormControl('', Validators.compose([Validators.required])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required])),

       });

    this.clinicaltrialEndpointGeneraldetailsfrm = new FormGroup({
        application_code: new FormControl(this.application_code, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        participant_no:new FormControl('', Validators.compose([])),
        enrolled_worldwide_no:new FormControl('', Validators.compose([Validators.required])),
        enrolled_uganda_no:new FormControl('', Validators.compose([Validators.required])),
        sites_no:new FormControl('', Validators.compose([Validators.required])),
        intended_no:new FormControl('', Validators.compose([Validators.required])),
        study_start_date: new FormControl('', Validators.compose([Validators.required])),
        first_final_duration:new FormControl('', Validators.compose([Validators.required])),
        study_duration: new FormControl('', Validators.compose([Validators.required])),
        duration_desc: new FormControl('', Validators.compose([Validators.required])),
        screening_period:new FormControl('', Validators.compose([Validators.required])),
        screening_duration:new FormControl('', Validators.compose([])),
        follow_up_period:new FormControl('', Validators.compose([Validators.required])),
        follow_up_duration:new FormControl('', Validators.compose([Validators.required])),
        intervention_period:new FormControl('', Validators.compose([Validators.required])),
        intervention_duration:new FormControl('', Validators.compose([Validators.required])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required]))
        });

    this.clinicaltrialStudyGeneraldetailsfrm = new FormGroup({
        clearance_no: new FormControl('', Validators.compose([Validators.required])),
        ctrethics_committee_id: new FormControl('', Validators.compose([Validators.required])),
        uncst_no: new FormControl('', Validators.compose([])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        sub_module_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required])),

    });
    this.clinicaltrialObjectiveGeneraldetailsfrm = new FormGroup({
        clinicaltrial_description: new FormControl('', Validators.compose([Validators.required])),
        explorator_objective: new FormControl('', Validators.compose([Validators.required])),
        trial_design: new FormControl('', Validators.compose([Validators.required])),
        purpose_of_trial: new FormControl('', Validators.compose([Validators.required])),
        other_objective: new FormControl('', Validators.compose([])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        clinicaltrialsecondary_objective: new FormControl('', Validators.compose([Validators.required])),
        clinicaltrialprimary_objective: new FormControl('', Validators.compose([Validators.required])),
        tertiary_objectives: new FormControl('', Validators.compose([])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required]))

       });

    this.clinicaltrialDescriptionGeneraldetailsfrm = new FormGroup({
        primary_endpoints: new FormControl('', Validators.compose([Validators.required])),
        sample_size:new FormControl('', Validators.compose([Validators.required])),
        planned_analyses: new FormControl('', Validators.compose([Validators.required])),
        analysis_sets: new FormControl('', Validators.compose([Validators.required])),
        secondary_endpoints: new FormControl('', Validators.compose([Validators.required])),
        inclusion_criteria: new FormControl('', Validators.compose([Validators.required])),
        exclusion_criteria: new FormControl('', Validators.compose([Validators.required])),
        application_code: new FormControl(this.application_code, Validators.compose([])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        reg_clinical_trial_id: new FormControl('', Validators.compose([])),
        appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
        tertiary_endpoints:new FormControl('', Validators.compose([Validators.required]))
       });
    
    
    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      is_fast_track: new FormControl('', Validators.compose([])),
      submission_comments:new FormControl('', Validators.compose([]))
    });

     this.clinicaltrialReportingdetailsfrm = new FormGroup({
            application_code: new FormControl(this.application_code, Validators.compose([])),
            sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
            section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
            reg_clinical_trial_id: new FormControl('', Validators.compose([])),
            appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
            clinicalreport_type_id: new FormControl('', Validators.compose([Validators.required])),
            clinicalstudy_status_id: new FormControl('', Validators.compose([Validators.required])),
            reporting_start_date: new FormControl('', Validators.compose([Validators.required])),
            reporting_end_date: new FormControl('', Validators.compose([Validators.required])),
            screen_participants: new FormControl('', Validators.compose([Validators.required])),
            dateof_first_screening: new FormControl('', Validators.compose([Validators.required])),
            target_sample_size: new FormControl('', Validators.compose([Validators.required])),
            enrolled_participants: new FormControl('', Validators.compose([Validators.required])),
            dateof_first_enrollment: new FormControl('', Validators.compose([Validators.required])),
            number_of_dropouts: new FormControl('', Validators.compose([Validators.required])),
            number_lost_tofollow_ups: new FormControl('', Validators.compose([Validators.required])),            
            number_of_saes: new FormControl('', Validators.compose([])),
            events_of_medialimportance: new FormControl('', Validators.compose([Validators.required])),
            protocol_deviations: new FormControl('', Validators.compose([Validators.required])),
          });

         if (this.sub_module_id == 102){
            this.clinicaltrialSaeReportingdetailsfrm = new FormGroup({
            sourceofpsur_id: new FormControl('', Validators.compose([])),
            report_category_id: new FormControl('', Validators.compose([Validators.required])),
            report_type_id: new FormControl('', Validators.compose([Validators.required])),
            adr_reporter_category_id: new FormControl('', Validators.compose([Validators.required])),
            adr_type_id: new FormControl('', Validators.compose([])),
            sae_dictionary_id: new FormControl('', Validators.compose([Validators.required])),
            species: new FormControl('', Validators.compose([])),
            breed: new FormControl('', Validators.compose([])),
            animal_status_id: new FormControl('', Validators.compose([])),
            humanvet_contact_id: new FormControl('', Validators.compose([])),
            sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
            application_code: new FormControl(this.application_code, Validators.compose([])),
            appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
            section_id: new FormControl('', Validators.compose([Validators.required])),
            reg_clinical_trial_id: new FormControl('', Validators.compose([])),
            patient_name: new FormControl('', Validators.compose([])),
            study_arm: new FormControl('', Validators.compose([])),
            gender_id: new FormControl('', Validators.compose([])),
            device_operator_id: new FormControl('', Validators.compose([])),
            local_supplier: new FormControl('', Validators.compose([])),
            software_version: new FormControl('', Validators.compose([])),
            catalogue_number: new FormControl('', Validators.compose([])),
            serial_number: new FormControl('', Validators.compose([])),
            model_number: new FormControl('', Validators.compose([])),
            device_location_id: new FormControl('', Validators.compose([])),
            last_menstruation_date: new FormControl('', Validators.compose([])),
            is_pregnant: new FormControl('', Validators.compose([])),
            is_lactating: new FormControl('', Validators.compose([])),
            sae_narative: new FormControl('', Validators.compose([Validators.required])),
            sae_onset_date: new FormControl('', Validators.compose([Validators.required])),
            stop_date: new FormControl('', Validators.compose([Validators.required])),
            ongoing_id: new FormControl('', Validators.compose([Validators.required])),
            medra_term_id: new FormControl('', Validators.compose([Validators.required])),
            date_of_birth: new FormControl('', Validators.compose([Validators.required])),
            patient_age: new FormControl('', Validators.compose([Validators.required])),
            age_group_id: new FormControl('', Validators.compose([Validators.required])),
            patient_weight: new FormControl('', Validators.compose([Validators.required])),
            patient_height: new FormControl('', Validators.compose([Validators.required])),
            site_awareness_date: new FormControl('', Validators.compose([Validators.required])),
            bmi: new FormControl('', Validators.compose([Validators.required])) 
          });
    }else if(this.sub_module_id == 103){
            this.clinicaltrialOtherReportingdetailsfrm = new FormGroup({
            study_title: new FormControl('', Validators.compose([Validators.required])),
            protocol_no: new FormControl('', Validators.compose([Validators.required])),
            version_no: new FormControl('', Validators.compose([Validators.required])),
            date_of_protocol: new FormControl('', Validators.compose([Validators.required])),
            
            phase_id: new FormControl('', Validators.compose([])),
            brief_description:new FormControl('', Validators.compose([Validators.required])),
            zone_id: new FormControl('', Validators.compose([Validators.required])),
            sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
            application_code: new FormControl(this.application_code, Validators.compose([])),
            appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
            section_id: new FormControl('', Validators.compose([Validators.required])),
            reg_clinical_trial_id: new FormControl('', Validators.compose([Validators.required])),
            clinicalreport_type_id: new FormControl('', Validators.compose([])),
            clinicalstudy_status_id: new FormControl('', Validators.compose([])),
            study_site_id: new FormControl('', Validators.compose([])),
            reporting_start_date: new FormControl('', Validators.compose([Validators.required])),
            reporting_end_date: new FormControl('', Validators.compose([Validators.required])),
            screen_participants: new FormControl('', Validators.compose([])),
            dateof_first_screening: new FormControl('', Validators.compose([])),
            target_sample_size: new FormControl('', Validators.compose([])),
            enrolled_participants: new FormControl('', Validators.compose([])),
            dateof_first_enrollment: new FormControl('', Validators.compose([])),
            number_of_dropouts: new FormControl('', Validators.compose([])),
            number_lost_tofollow_ups: new FormControl('', Validators.compose([])),
            inclusion_criteria: new FormControl('', Validators.compose([])),
            exclusion_criteria: new FormControl('', Validators.compose([])),            
            number_of_saes: new FormControl('', Validators.compose([])),
            events_of_medialimportance: new FormControl('', Validators.compose([])),
            protocol_deviations: new FormControl('', Validators.compose([])),
            clincialtrialfunding_source_id: new FormControl('', Validators.compose([]))
            ,
              clincialtrialfields_type_id: new FormControl('', Validators.compose([])),
              clinicalin_othercountries_sites: new FormControl('', Validators.compose([])), 
            clinicalin_otheruganda_sites : new FormControl('', Validators.compose([])),
              is_clinicaltrialin_othercountry: new FormControl('', Validators.compose([])),
              is_clinicaltrialin_uganda:new FormControl('', Validators.compose([]))
            
          });
    }else if(this.sub_module_id == 69){
            this.preSubmissionGeneraldetailsfrm = new FormGroup({
              study_title: new FormControl('', Validators.compose([Validators.required])),
              zone_id: new FormControl('', Validators.compose([])),
              meeting_type_id: new FormControl('', Validators.compose([Validators.required])),
              brief_description: new FormControl('', Validators.compose([Validators.required])),
              meeting_time: new FormControl('', Validators.compose([Validators.required])),
              application_code: new FormControl(this.application_code, Validators.compose([])),
              sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
              appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
              section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
              reg_clinical_trial_id: new FormControl('', Validators.compose([])),
              clinical_prodsection_id: new FormControl('', Validators.compose([])),
              meeting_date: new FormControl('', Validators.compose([Validators.required])),
              meeting_invitation_details: new FormControl('', Validators.compose([]))

            });
             
    }else{
            this.clinicaltrialGeneraldetailsfrm = new FormGroup({
              study_title: new FormControl('', Validators.compose([Validators.required])),
              short_study_title: new FormControl('', Validators.compose([Validators.required])),
              other_study:new FormControl('', Validators.compose([])),
              clinicaltrial_identification_no: new FormControl('', Validators.compose([Validators.required])),
              clinicaltrial_registry_id: new FormControl('', Validators.compose([Validators.required])),
              publication_url: new FormControl('', Validators.compose([])),
              protocol_no: new FormControl('', Validators.compose([])),
              version_no: new FormControl('', Validators.compose([Validators.required])),
              date_of_protocol: new FormControl('', Validators.compose([Validators.required])),
              rec_no:new FormControl('', Validators.compose([])),
              other_registry: this.clinicalTrialControl,
              clinical_trial_sponsor: new FormControl('', Validators.compose([Validators.required])),
              principal_investigator: new FormControl('', Validators.compose([Validators.required])),
              investigator_id: new FormControl('', Validators.compose([Validators.required])),
             // paying_currency_id: new FormControl('', Validators.compose([Validators.required])),
              sponsor_id: new FormControl('', Validators.compose([Validators.required])),
              zone_id: new FormControl('', Validators.compose([])),
              duration_stimate:new FormControl('', Validators.compose([])),
              application_code: new FormControl(this.application_code, Validators.compose([])),           
              sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
              variation_type_id:new FormControl('', Validators.compose([])),
              appmodule_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
              section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
              reg_clinical_trial_id: new FormControl('', Validators.compose([])),
              clinical_prodsection_id: new FormControl('', Validators.compose([Validators.required])),
              phase_id: new FormControl('', Validators.compose([Validators.required])),
              clincialtrialfields_type_id: new FormControl('', Validators.compose([Validators.required])),
              primary_pharmacodynamics:this.clinicalTrialControl,
              secondary_pharmacodynamics:this.clinicalTrialControl,
              pharmacodynamic_drug_interactions:this.clinicalTrialControl,
              pharmacokinetics:this.clinicalTrialControl,
              toxicology:this.clinicalTrialControl,
              First_in_human_trials:this.clinicalTrialControl,
              glp_aspects:this.clinicalTrialControl,
              safety_pharmacology:this.clinicalTrialControl,
              sites_no:new FormControl('', Validators.compose([])),
              enrolled_uganda_no:new FormControl('', Validators.compose([]))
            });
             
             
    }

 

    if(this.sub_module_id == 10){
       this.is_readonly = false;
     }
     else{
      this.is_readonly = false;
       
     }
    this.documentUploadfrm = this.fb.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });
    this.initqueryresponsefrm = new FormGroup({
      queries_remarks: new FormControl('', Validators.compose([Validators.required])),
      response_txt: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      query_id: new FormControl('', Validators.compose([]))
    });
   
    
    this.onLoadZones();
    this.onLoaddurationDescData();
    this.onLoadCountries();
    this.onLoadpayingCurrencyData();
    this.onLoadfastTrackOptionsData();

    this.onLoadClinicalTrialOtherdetails();
    
    this.onLoadinvestigatorCategoryData();
    this.onLoadclinicaltrailComparatorProdData();
    this.onLoadclinicalProductCategoryData();
    this.onLoadclinicaltrailHandlingProdData();
    this.onLoadcommonNameData();
    this.onLoadrouteOfAdminData();
    this.onLoadsiUnitsData();
    this.onLoadDosagFormData();
    this.onLoadmarketlocationData();
    this.onLoadmanufacturersData();

    this.onLoadClinicalSiteDetails(this.application_id);
    this.onLoadclinicaltrailIMPProdData()
    this.onLoadclinicaltrailinvestigatorsData();
    this.onLoadSections();
    this.funcReloadQueriesDetails();
    this.OnloadclinicalTrialRegistryData() ;
    this.onLoadctrethicsCommitteesData();
    this.onLoadclinicalStudySitesData();
    this.onLoadGuidelines(this.sub_module_id);
      
  }   


  onLoadGuidelines(sub_module_id) {
    this.configService.onLoadAppSubmissionGuidelines(sub_module_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.terms_conditions = data.data;
        },
        error => {
          return false
        });
  }
  onAppQueryPreparing(e) {
    
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.funcReloadQueriesDetails.bind(this)
        }
      });

  }
  ngOnInit() {

  } 



   onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }  onLoadclinicaltrailComparatorProdData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_comparatorproducts', application_id: this.application_id }, 'getClinicaltrailIMPProdData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailComparatorPProdData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
    onLoadclinicaltrailHandlingProdData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinicaltrial_Producthandling', application_id: this.application_id }, 'getClinicaltrailIMPHandlingProdData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailHandlingProdData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }


  onLoadctrethicsCommitteesData() {
    var data = {
      table_name: 'par_ctrethics_committees',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ctrethicsCommitteesData = data;
        });
  } OnloadclinicalTrialRegistryData() {
    var data = {
      table_name: 'par_clinicaltrial_registries',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.clinicalTrialRegistryData = data;
        });
  }
  

  onLoadClinicalSiteDetails(application_id) {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'study_sites', application_id: application_id }, 'getClinicalTrialSites')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicalSitesDetailsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  
  onLoadclinicaltrailinvestigatorsData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_investigators', application_id: this.application_id }, 'getClinicaltrailinvestigatorsData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailinvestigatorsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }  
  onLoadclinicaltrailIMPProdData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_products', application_id: this.application_id }, 'getClinicaltrailIMPProdData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailIMPProdData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onLoadCountries() {

    var data = {
      table_name: 'par_countries',
      // id: 36
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.countries = data;
        },
        error => {
          return false;
        });
  }
  private prepareSave(): any {
    let input = new FormData();
    input.append('document_requirement_id', this.documentUploadfrm.get('document_requirement_id').value);
    input.append('file', this.documentUploadfrm.get('file').value);
    input.append('id', this.documentUploadfrm.get('id').value);
    input.append('node_ref', this.documentUploadfrm.get('node_ref').value);

    return input;
  }
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.documentUploadfrm.get('file').setValue(file);
    }
  }
  
 
 
  onLoadinvestigatorCategoryData() {
    var data = {
      table_name: 'clinical_investigator_cat'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.investigatorCategoryData = data;
        });

  }
  onLoadclinicalProductCategoryData() {
    var data = {
      table_name: 'par_clinical_product_categories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.clinicalProductCategoryData = data;
        });

  }
  onLoadcommonNameData() {
    var data = {
      table_name: 'par_common_names',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.commonNameData = new DataSource({
              paginate: true,
              pageSize: 200,
              store: {
                type: "array",
                  data: data,
                  key: "id"
              }
          });
        });

  }

  onLoadrouteOfAdminData() {
    var data = {
      table_name: 'par_route_of_administration',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.routeOfAdminData = data;
        });

  }

  onLoadsiUnitsData() {
    var data = {
      table_name: 'par_si_units',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.siUnitsData = data;
        });

  }

  onLoadDosagFormData() {
    var data = {
      table_name: 'par_dosage_forms',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.dosagFormData = data;
        });

  }

  onLoadpayingCurrencyData() {
    var data = {
      table_name: 'par_currencies',
      is_paying_currency: 1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.payingCurrencyData = data;
        });

  }
  onLoadfastTrackOptionsData() {
    var data = {
      table_name: 'par_fasttrack_options'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.fastTrackOptionsData = data;
        });

  }
  
  
  onLoadZones() {
    var data = {
      table_name: 'par_zones',
      is_hq:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.zoneData = data;
        });

  }
  onLoaddurationDescData() {
    var data = {
      table_name: 'par_timespan_defination',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.durationDescData = data;
        });

  }
  onLoadClinicalTrialOtherdetails() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_investigators', application_id: this.application_id }, 'getClinicalTrialSites')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicalSitesDetailsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });

  }

 
  
 

  funcAddIMPProductsDetails() {
    this.IMPProductDetailsWinVisible = true;
    this.iMPProductDetailsFrm.reset();
  }
  
 
  onLoadclinicaltrailVariationData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_application_variationsdata', application_code: this.application_code }, 'getClinicaltrailVariationsrequests')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailVariationRequestsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
 
  
 
  funcAddStudySiteDetails() {
    this.isStudySiteAddWinVisible = true;
  }
  onStudysitePreparing(e) {
    this.functDataGridToolbar(e, this.funcAddStudySiteDetails, this.sponsor_investigatortitle);
  }
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }

  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
 
  
  onLoadmarketlocationData() {

    var data = {
      table_name: 'par_product_types'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.marketlocationData = data;
        },
        error => {
          return false;
        });
  }
  onLoadmanufacturersData() {

    var data = {
      table_name: 'tra_manufacturers_information'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.manufacturersData = data;
        },
        error => {
          return false;
        });
  }


  onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.districts = data
        },
        error => {
          return false;
        });
  }
  onApplicationDocumentToolbar(e) {
    this.functDataGridToolbar(e, this.funAddApplicationUploadDetails, 'Upload Document');

  }
  funAddApplicationUploadDetails() {
    this.isDocumentUploadPopupVisible = true;

  }
  funcValidateClinicalDetails(table_name,nextStep) {
    this.funcValidateStepDetails('Add Clinical trial Sites to proceed', this.clinicalSitesDetailsData, nextStep);


  }
   //funcValidateOtherClinicalDetails(nextStep) {

   // this.funcValidateStepDetails('Add Other Clinical Trial Details', 'wb_clinical_trial_applications', nextStep);

  //}
  funcValidateClinicalInvestDetails(nextStep) {
   // this.funcValidateStepDetails('Add Clinical trial Investigators to proceed', this.clinicaltrailinvestigatorsData, nextStep);


  }
  funcValidateClinicalVariationDetails(nextStep) {
    this.funcValidateStepDetails('Add Clinical trial Variation Requests', this.clinicaltrailVariationRequestsData, nextStep);


  }
  funcValidateClinicalIMProdDetails(nextStep) {
    this.funcValidateStepDetails('Add Clinical trial IMP Products', this.clinicaltrailIMPProdData, nextStep);


  }
onLoadclinicalStudySitesData(){

  this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_investigators', reg_clinical_trial_id: this.reg_clinical_trial_id }, 'getclinicalStudySitesData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicalStudySitesData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
}

  funcValidateClinicalSiteDetails(table_name,nextStep,title,documentComponent) {
  
    this.utilityService.validateClinicalTrialOtherDetails(this.application_id,table_name)
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          
           this.wizard.model.navigationMode.goToStep(nextStep);
           if(nextStep ==8){

            documentComponent.onLoadAppDocRequirements();
            documentComponent.onLoadApplicationDocUploads();
           }
        }
        else{
          this.toastr.error(title, 'Response');
        }

        this.spinner.hide();
      });
      
  }

  funcValidateClinicalSaeDetails(table_name,nextStep,title,documentComponent) {
  
    this.utilityService.validateClinicalTrialSaeOtherDetails(this.application_id,table_name)
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          
           this.wizard.model.navigationMode.goToStep(nextStep);
           if(nextStep ==8){

            documentComponent.onLoadAppDocRequirements();
            documentComponent.onLoadApplicationDocUploads();
           }
        }
        else{
          this.toastr.error(title, 'Response');
        }

        this.spinner.hide();
      });
      
  }

    funcValidateClinicalSummaryDetails(table_name,nextStep,title,documentComponent) {
  
    this.utilityService.validateClinicalTrialDetails(this.application_id,table_name)
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          
           this.wizard.model.navigationMode.goToStep(nextStep);
           if(nextStep ==8){

            documentComponent.onLoadAppDocRequirements();
            documentComponent.onLoadApplicationDocUploads();
           }
        }
        else{
          this.toastr.error(title, 'Response');
        }

        this.spinner.hide();
      });
      
  }





  funcValidateDocumentsDetails(nextStep) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_clinical_trial_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
           this.wizard.model.navigationMode.goToStep(nextStep);
         
        }
        else{
          this.toastr.error(response_data.message, 'Response');
        }

        this.spinner.hide();
      });
  }
  funcValidateApplicationVariationDetails(nextStep) {
    this.utilityService.validateApplicationotherDetails(this.application_code,'wb_application_variationsdata')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          
        }
        else{
         
          this.toastr.error(response_data.message, 'Response');
        }
        this.wizard.model.navigationMode.goToStep(nextStep);
         
        this.spinner.hide();
      });

  }
  //funcValidateClinicalInvestDetails
  funcValidateStepDetails(title, dataStore, nextStep) {

    if (dataStore.length != 0 && dataStore.length) {
      this.wizard.model.navigationMode.goToStep(nextStep);
    }
    else {
      this.toastr.error(title, 'Alert');
    }
  }
   submissionsTermscheckbox(e) {
    
    this.termscheckbox = e.value;

  }
 
  onClinicalTrialApplicationPrint(){
    
    
  }
 
  funcValidateApplicationQueryresponse( nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code,'wb_clinical_trial_applications')
      .subscribe(
        response => {
        if (response.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
        } else {
          this.toastr.error(response.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.message, 'Alert');
        this.spinner.hide();
      });
  }
  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      return;
    }
   
    //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value, 'onSavePrecheckingqueryresponse')
      .subscribe(
        response => {
          this.app_resp = response.json();
          if (this.app_resp.success) {
            this.toastr.success(this.app_resp.message, 'Response');
            this.funcReloadQueriesDetails();
            
            this.initqueryresponsefrm.get('query_id').setValue(this.app_resp.record_id)
            
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  } funcInitQueryResponse(data) {
  
    
    this.isInitalQueryResponseFrmVisible = true;
  
    this.initqueryresponsefrm.patchValue(data.data);
   // this.query_sectioncheck = data.data.application_section;
    
  } funcReloadQueriesDetails(){

    this.funcgetPreckingQueriesData();
    
  }
  funcgetPreckingQueriesData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_clinical_trial_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.spinner.hide();
      });
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onCloseQueryResponseWin(){

    this.isInitalQueryResponseFrmVisible =false;
  }
}

