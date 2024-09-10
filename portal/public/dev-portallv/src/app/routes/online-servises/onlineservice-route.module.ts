import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../../views/online-services/app-layout/app-layout.component';
import { AppdashboardComponent } from '../../views/online-services/appdashboard/appdashboard.component';
import { ProductRegDashboardComponent } from '../../views/online-services/product-registration/product-reg-dashboard/product-reg-dashboard.component';

//gurds
import { AuthGuard } from '../../guards/auth.guard';
//import { NewDrugProductApplicationComponent } from '../../views/online-services/product-registration/new-product-registration/new-drugproduct-application/new-drugproduct-application.component';
import { PreviewPremisesInformationComponent } from '../../views/online-services/premises-registration/preview-premises-information/preview-premises-information.component';
import { PreviewDrugshopInformationComponent } from '../../views/online-services/drugshop-registration/preview-drugshop-information/preview-drugshop-information.component';

import { PremiserelocationRegistrationComponent } from '../../views/online-services/premises-registration/premiserelocation-registration/premiserelocation-registration.component';
import { NewPremisesRegistrationComponent } from '../../views/online-services/premises-registration/new-premises-registration/new-premises-registration.component';
import { AnnexstoreRegistrationComponent } from '../../views/online-services/premises-registration/annexstore-registration/annexstore-registration.component';
import { NewDrugshopsRegistrationComponent } from '../../views/online-services/drugshop-registration/new-drugshops-registration/new-drugshops-registration.component';
import { NewSurgicalRegistrationComponent } from '../../views/online-services/surgicalinstruments-registration/new-surgical-registration/new-surgical-registration.component';
import { PreinspectionsurgicalRegistrationComponent } from '../../views/online-services/surgicalinstruments-registration/preinspectionsurgical-registration/preinspectionsurgical-registration.component';
import { PsurProdnotificationRequestComponent } from 'src/app/views/online-services/psur-product-notification/psur-prodnotification-request/psur-prodnotification-request.component';
import { PsurProductnotificationDashboardComponent } from 'src/app/views/online-services/psur-product-notification/psur-prodnotification-dashboard/psur-productnotification-dashboard/psur-productnotification-dashboard.component';
import { AdverseDrugReactionDashboardComponent } from 'src/app/views/online-services/psur-product-notification/psur-prodnotification-dashboard/adverse-drug-reaction-dashboard/adverse-drug-reaction-dashboard.component';
import { AdverseDrugReactionRequestComponent } from 'src/app/views/online-services/psur-product-notification/adverse-drug-reaction-request/adverse-drug-reaction-request.component';


import { NewdrugshopDashboardComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-reg-dashboard/newdrugshop-dashboard/newdrugshop-dashboard.component';
import { PreinspectionDashboardComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-reg-dashboard/preinspection-dashboard/preinspection-dashboard.component';
import { PreinspectionsurgicalDashboardComponent } from 'src/app/views/online-services/surgicalinstruments-registration/surgical-reg-dashboard/preinspectionsurgical-dashboard/preinspectionsurgical-dashboard.component';
import { NewsurgicalinstrumntDashboardComponent } from 'src/app/views/online-services/surgicalinstruments-registration/surgical-reg-dashboard/newsurgicalinstrumnt-dashboard/newsurgicalinstrumnt-dashboard.component';
import { RenewalsurgicalDashboardComponent } from '../../views/online-services/surgicalinstruments-registration/surgical-reg-dashboard/renewalsurgical-dashboard/renewalsurgical-dashboard.component';
import { SurgicalrelocationDashboardComponent } from '../../views/online-services/surgicalinstruments-registration/surgical-reg-dashboard/surgicalrelocation-dashboard/surgicalrelocation-dashboard.component';
import { SurgicalAnnexstoreDashboardComponent } from '../../views/online-services/surgicalinstruments-registration/surgical-reg-dashboard/surgical-annexstore-dashboard/surgical-annexstore-dashboard.component';
import { ImportExportApprovedappDeclarationComponent } from 'src/app/views/online-services/importexport-apps/importexport-approvedappdeclaration/importexport-approvedappdeclaration.component';
import { ImportexportApprovedappVCComponent } from 'src/app/views/online-services/importexport-apps/importexport-approvedappvc/importexport-approvedappvc.component';
import { ApplicationSelectionComponent } from '../../views/online-services/product-registration/application-selection/application-selection.component';

import { PremapplSelectionComponent } from '../../views/online-services/premises-registration/premappl-selection/premappl-selection.component';
import { RenewalBusinessPermitComponent } from '../../views/online-services/premises-registration/renewal-business-permit/renewal-business-permit.component';
import { RenewalDrugshopPermitComponent } from '../../views/online-services/drugshop-registration/renewal-drugshop-permit/renewal-drugshop-permit.component';

import { TraderProfileComponent } from '../../views/online-services/trader-profile/trader-profile.component';
import { NotificationsComponent } from '../../views/online-services/notifications/notifications.component';
import { ArchivedPremisesComponent } from 'src/app/views/online-services/premises-registration/archived-premises/archived-premises.component';
import { ArchivedProductsappsComponent } from 'src/app/views/online-services/product-registration/archived-productsapps/archived-productsapps.component';
import { InitiateNewproductApplicationComponent } from 'src/app/views/online-services/product-registration/new-product-registration/initiate-newproduct-application/initiate-newproduct-application.component';

import { PremisesAlterationComponent } from 'src/app/views/online-services/premises-registration/premises-alteration/premises-alteration.component';
import { DrugshopVariationComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-variation/drugshop-variation.component';

import { PremisesRegPreviewComponent } from 'src/app/views/online-services/premises-registration/premises-reg-preview/premises-reg-preview.component';
import { DrugshopRegPreviewComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-reg-preview/drugshop-reg-preview.component';
import { ProductnotificationDashboardComponent } from 'src/app/views/online-services/product-notification/productnotification-dashboard/productnotification-dashboard.component';

import { ProductnotificationSelComponent } from 'src/app/views/online-services/product-notification/productnotification-sel/productnotification-sel.component';
import { ClinicalTrialdashComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/clinical-trialdash.component';
import { ImportlicenseApplicationDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/importlicenseapplication-dashboard/importlicenseapplication-dashboard.component';
import { ImportexportDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/importexport-dashboard.component';
import { ImportexportSelComponent } from 'src/app/views/online-services/importexport-apps/importexport-sel/importexport-sel.component';
import { ImportexportApplicationComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/importexport-application.component';
import { NewclinicalTrialComponent } from 'src/app/views/online-services/clinical-trials/newclinical-trial/newclinical-trial.component';
import { ClinicalTrialammendmentComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialammendment/clinical-trialammendment.component';
import { PromotionalAdvertdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/promotional-advertdash.component';
import { PromotionalAdvertselComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertsel/promotional-advertsel.component';
import { PromotionalAdvertarchiveComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertarchive/promotional-advertarchive.component';
import { PromotionalAdvertappComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertapp/promotional-advertapp.component';
import { TradefairpermitAppComponent } from 'src/app/views/online-services/promotional-advert/tradefairpermit-app/tradefairpermit-app.component';
import {InitiateProductWithdrawalComponent} from 'src/app/views/online-services/product-registration/product-withdrawal/initiate-product-withdrawal/initiate-product-withdrawal.component';
import { SampledocumentsSubmissionsComponent } from 'src/app/views/online-services/product-registration/sampledocuments-submissions/sampledocuments-submissions.component';
import {InitiateProductAlterationComponent} from 'src/app/views/online-services/product-registration/product-alteration/initiate-product-alteration/initiate-product-alteration.component';
import {InitiateRenewalproductApplicationComponent} from 'src/app/views/online-services/product-registration/renewal-product-registration/initiate-renewalproduct-application/initiate-renewalproduct-application.component';
import { ProductRegistrationselectionComponent } from 'src/app/views/online-services/product-registration/product-registrationselection/product-registrationselection.component';
import { RegisteredDrugshopappsComponent } from 'src/app/views/online-services/drugshop-registration/registered-drugshopapps/registered-drugshopapps.component';
import { DrugshopsRegistrationselectionComponent } from 'src/app/views/online-services/drugshop-registration/drugshops-registrationselection/drugshops-registrationselection.component';
import { PsurProdnotificationGeneraldetailsComponent } from 'src/app/views/online-services/psur-product-notification/psur-prodnotification-dataentry/psur-prodnotification-generaldetails/psur-prodnotification-generaldetails.component';

import { RegisteredProductappsComponent } from 'src/app/views/online-services/product-registration/registered-productapps/registered-productapps.component';
import { RegisteredPremisesappsComponent } from 'src/app/views/online-services/premises-registration/registered-premisesapps/registered-premisesapps.component';
import { PremisesRegistrationselectionComponent } from 'src/app/views/online-services/premises-registration/premises-registrationselection/premises-registrationselection.component';
import { PremisesWithdrawalComponent } from 'src/app/views/online-services/premises-registration/premises-withdrawal/premises-withdrawal.component';
import { RegisteredGmpapplicationsComponent } from 'src/app/views/online-services/gmp-applications/gmp/registered-gmpapplications/registered-gmpapplications.component';
import { RegisteredGmpselectionComponent } from 'src/app/views/online-services/gmp-applications/gmp/registered-gmpselection/registered-gmpselection.component';
import { GmpRegDashboardComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-reg-dashboard/gmp-reg-dashboard.component';
import { PreinspectionRegDashboardComponent } from 'src/app/views/online-services/gmp-applications/gmp/preinspection-reg-dashboard/preinspection-reg-dashboard.component';
import { LocalgmpRegDashboardComponent } from 'src/app/views/online-services/gmp-applications/gmp/localgmp-reg-dashboard/localgmp-reg-dashboard.component';
import { GmpRenewalRegDashboardComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-renewal-reg-dashboard/gmp-renewal-reg-dashboard.component';


import { VetDashboardComponent } from 'src/app/views/online-services/gmp-applications/vet-gmp/vet-dashboard/vet-dashboard.component';

import { NewVetgmpApplicationComponent } from 'src/app/views/online-services/gmp-applications/vet-gmp/new-vetgmp-application/new-vetgmp-application.component';
import { PreinspectionGmpApplicationComponent } from 'src/app/views/online-services/gmp-applications/gmp/preinspection-gmp-application/preinspection-gmp-application.component';

import { NewGmpApplicationComponent } from 'src/app/views/online-services/gmp-applications/gmp/new-gmp-application/new-gmp-application.component';
import { LocalGmpApplicationComponent } from 'src/app/views/online-services/gmp-applications/gmp/local-gmp-application/local-gmp-application.component';
import { RenewalGmpApplicationComponent } from 'src/app/views/online-services/gmp-applications/gmp/renewal-gmp-application/renewal-gmp-application.component';
import { GmpApplicationsSelectionComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-applications-selection/gmp-applications-selection.component';
import { GmpPreinspectionSelectionComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-preinspection-selection/gmp-preinspection-selection.component';

import { VetAppSelectionComponent } from 'src/app/views/online-services/gmp-applications/vet-gmp/vet-app-selection/vet-app-selection.component';

import { GmpAppPreviewComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-app-preview/gmp-app-preview.component';
import { GmpWithdrawalappsrequestComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-withdrawalappsrequest/gmp-withdrawalappsrequest.component';
import { RegisteredManufacturingpremisesComponent } from 'src/app/views/online-services/gmp-applications/gmp/registered-manufacturingpremises/registered-manufacturingpremises.component';
import { GmpDocumentSubmissionComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-document-submission/gmp-document-submission.component';
import { GmpApplicationsAmendementsComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-applications-amendements/gmp-applications-amendements.component';

import { MedicaldevicesNotificationsComponent } from 'src/app/views/online-services/product-notification/medicaldevices-notifications/medicaldevices-notifications.component';
import { QualityAuditDashboardComponent } from 'src/app/views/online-services/gmp-applications/quality-audit/quality-audit-dashboard/quality-audit-dashboard.component';
import { NewQualityauditApplicationComponent } from 'src/app/views/online-services/gmp-applications/quality-audit/new-qualityaudit-application/new-qualityaudit-application.component';
import { QualityauditAppSelectionComponent } from 'src/app/views/online-services/gmp-applications/quality-audit/qualityaudit-app-selection/qualityaudit-app-selection.component';
import { TraderaccountUsersComponent } from 'src/app/views/online-services/traderaccount-users/traderaccount-users.component';
import { PharmacistsaccountUserComponent } from '../../views/online-services/premises-registration/pharmacistsaccount-user/pharmacistsaccount-user.component';
import { RetentionPaymentsComponent } from 'src/app/views/online-services/productretention/retention-payments/retention-payments.component';
import { RetentionChargesComponent } from 'src/app/views/online-services/productretention/retention-charges/retention-charges.component';
import { DisposalAppdashboardComponent } from 'src/app/views/online-services/disposal-apps/disposal-appdashboard/disposal-appdashboard.component';
import {ControlleddrugspermitsDashboardComponent} from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugspermits-dashboard/controlleddrugspermits-dashboard.component';
import { ControldrugsLicenseAppComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controldrugs-license-app/controldrugs-license-app.component';
import { ControldrugsImportpermitAppComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controldrugs-importpermit-app/controldrugs-importpermit-app.component';

import { DisposalPermitrequestsComponent } from 'src/app/views/online-services/disposal-apps/disposal-permitrequests/disposal-permitrequests.component';
import { BloodestablishementDashboardComponent } from 'src/app/views/online-services/blood-products/bloodestablishement/bloodestablishement-dashboard/bloodestablishement-dashboard.component';
import { BloodestablishmentApplicationsrequestComponent } from 'src/app/views/online-services/blood-products/bloodestablishement/bloodestablishment-applicationsrequest/bloodestablishment-applicationsrequest.component';
import { ProductlocalRepresentationComponent } from 'src/app/views/online-services/product-registration/productlocal-representation/productlocal-representation.component';
import { ClinicaltrialProgressreportingComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial-progressreporting/clinicaltrial-progressreporting.component';

import { ClinicaltrialSaereportingComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial-saereporting/clinicaltrial-saereporting.component';
import { ClinicaltrialOtherreportingComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial-otherreporting/clinicaltrial-otherreporting.component';
import { AppsubmissionDashboardComponent } from 'src/app/views/online-services/appsubmission-dashboard/appsubmission-dashboard.component';
import { ApplicationPaymentsComponent } from 'src/app/views/online-services/application-payments/application-payments.component';
import { AppsynchronisationRequestComponent } from 'src/app/views/online-services/appsynchronisation-request/appsynchronisation-request.component';
import { ImportexportApprovedappselComponent } from 'src/app/views/online-services/importexport-apps/importexport-approvedappsel/importexport-approvedappsel.component';
import { ProdretentionDashboardComponent } from 'src/app/views/online-services/productretention/product-retentionrequest/prodretention-dashboard/prodretention-dashboard.component';
import { ProdretentionRequestsappComponent } from 'src/app/views/online-services/productretention/product-retentionrequest/prodretention-requestsapp/prodretention-requestsapp.component';
import { ImportLicensesappselectionComponent } from 'src/app/views/online-services/importexport-apps/import-licensesappselection/import-licensesappselection.component';
import { ExportLicenseappselComponent } from 'src/app/views/online-services/importexport-apps/export-licenseappsel/export-licenseappsel.component';
import { ImportgeneralicenseDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/importgeneralicense-dashboard/importgeneralicense-dashboard.component';
import { ImportLicenseappselComponent } from 'src/app/views/online-services/importexport-apps/importlicense-appsel/importlicense-appsel.component';

import { ImportvisaDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/importvisa-dashboard/importvisa-dashboard.component';
import { ImportlicenseDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/importlicense-dashboard/importlicense-dashboard.component';
import { ExportlicenseDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/exportlicense-dashboard/exportlicense-dashboard.component';
import { InspectionbookingDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/inspectionbooking-dashboard/inspectionbooking-dashboard.component';
import { OfficialcertificateDashboardComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugspermits-dashboard/officialcertificate-dashboard/officialcertificate-dashboard.component';
import { ControldrugsInspectionbkdashComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugspermits-dashboard/controldrugs-inspectionbkdash/controldrugs-inspectionbkdash.component';
import { ControldrugsImplicensedashComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugspermits-dashboard/controldrugs-implicensedash/controldrugs-implicensedash.component';
import { NewpremisesDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/newpremises-dashboard/newpremises-dashboard.component';
import { AnnexstoreDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/annexstore-dashboard/annexstore-dashboard.component';
import { PremiserelocationDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/premiserelocation-dashboard/premiserelocation-dashboard.component';
import { RenewalpremisesDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/renewalpremises-dashboard/renewalpremises-dashboard.component';
import { RenewaldrugshopDashboardComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-reg-dashboard/renewaldrugshop-dashboard/renewaldrugshop-dashboard.component';
import { VariationdrugshopDashboardComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-reg-dashboard/variationdrugshop-dashboard/variationdrugshop-dashboard.component';
import { VariationpremisesDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/variationpremises-dashboard/variationpremises-dashboard.component';
import { WithdrawalpremisesDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/withdrawalpremises-dashboard/withdrawalpremises-dashboard.component';
import { InvoiceApppreviewComponent } from 'src/app/views/online-services/invoice-appgeneration/invoice-apppreview/invoice-apppreview.component';
import { InspectionBookingComponent } from 'src/app/views/online-services/importexport-apps/inspection-booking/inspection-booking.component';
import { NewprodRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/newprod-reg-dashboard/newprod-reg-dashboard.component';

import { NewvetprodRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/newvetprod-reg-dashboard/newvetprod-reg-dashboard.component';
import { NewsurgicalRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/newsurgical-reg-dashboard/newsurgical-reg-dashboard.component';
import { RenewalprodRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/renewalprod-reg-dashboard/renewalprod-reg-dashboard.component';
import { VariationprodRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/variationprod-reg-dashboard/variationprod-reg-dashboard.component';
import { WithdrawalprodRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/withdrawalprod-reg-dashboard/withdrawalprod-reg-dashboard.component';
import { ProductNotificationsDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/product-notifications-dashboard/product-notifications-dashboard.component';
import { ImportLicenseapplictionComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/import-licenseapplication/import-licenseapplication.component';

import { ImportVisaappComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/import-visaapp/import-visaapp.component';
import { ExprtLicenseappComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/exprt-licenseapp/exprt-licenseapp.component';
import { ImportLicenseappComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/import-licenseapp/import-licenseapp.component';
import { ImpexportamendDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/impexportamend-dashboard/impexportamend-dashboard.component';
import { ImportexportlicAmmendrequestComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/importexportlic-ammendrequest/importexportlic-ammendrequest.component';
import { OnceyearauthorisationDashboardComponent } from 'src/app/views/online-services/personalisedimport-apps/personnalisedimport-dashboard/onceyearauthorisation-dashboard/onceyearauthorisation-dashboard.component';
import { PersonalimportappDashboardComponent } from 'src/app/views/online-services/personalisedimport-apps/personnalisedimport-dashboard/personalimportapp-dashboard/personalimportapp-dashboard.component';
import { PersonnalisedimportApplicationComponent } from 'src/app/views/online-services/personalisedimport-apps/personnalisedimport-application/personnalisedimport-application.component';
import { OneyearauthorisationApplicationComponent } from 'src/app/views/online-services/personalisedimport-apps/oneyearauthorisation-application/oneyearauthorisation-application.component';
import { GcpinspectionsDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/gcpinspections-dashboard/gcpinspections-dashboard.component';
import { ClinicaltrialsaerptDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/clinicaltrialsaerpt-dashboard/clinicaltrialsaerpt-dashboard.component';
import { ClinicaltrialotherrptDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/clinicaltrialotherrpt-dashboard/clinicaltrialotherrpt-dashboard.component';

import { ClinicaltrialprogressrptDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/clinicaltrialprogressrpt-dashboard/clinicaltrialprogressrpt-dashboard.component';
import { RenewalclinicaltrialDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/renewalclinicaltrial-dashboard/renewalclinicaltrial-dashboard.component';
import { NewclinicaltrialDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/newclinicaltrial-dashboard/newclinicaltrial-dashboard.component';
import { ClinicaltriavariationsDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/clinicaltriavariations-dashboard/clinicaltriavariations-dashboard.component';
import { RegisteredClinicaltrialComponent } from 'src/app/views/online-services/clinical-trials/registered-clinicaltrial/registered-clinicaltrial.component';

import { NewpromotionalAdvertdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/newpromotional-advertdash/newpromotional-advertdash.component';
import { RenewalpromotionalAdvertdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/renewalpromotional-advertdash/renewalpromotional-advertdash.component';
import { AmendmentpromotionalAdvertdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/amendmentpromotional-advertdash/amendmentpromotional-advertdash.component';
import { ApprovedpromotionalAdvertsComponent } from 'src/app/views/online-services/promotional-advert/approvedpromotional-adverts/approvedpromotional-adverts.component';
import { AmendmentapppromotionalAdvertsComponent } from 'src/app/views/online-services/promotional-advert/amendmentapppromotional-adverts/amendmentapppromotional-adverts.component';
import { RenewalapppromotionalAdvertsComponent } from 'src/app/views/online-services/promotional-advert/renewalapppromotional-adverts/renewalapppromotional-adverts.component';
import { PreclinicaltrialDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/preclinicaltrial-dashboard/preclinicaltrial-dashboard.component';
import { RegisteredClinicaltrialSelectionComponent } from 'src/app/views/online-services/clinical-trials/registered-clinicaltrial-selection/registered-clinicaltrial-selection.component';
import { PreclinicaltrialSubmissionappComponent } from 'src/app/views/online-services/clinical-trials/preclinicaltrial-submissionapp/preclinicaltrial-submissionapp.component';
import { RenewalclinicaltrialApplicationComponent } from 'src/app/views/online-services/clinical-trials/renewalclinicaltrial-application/renewalclinicaltrial-application.component';
import { PremsiteapprovalDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/premsiteapproval-dashboard/premsiteapproval-dashboard.component';
import { PremsiteapprovalApplicationComponent } from 'src/app/views/online-services/premises-registration/premsiteapproval-application/premsiteapproval-application.component';
import { PreinspectionApplicationComponent } from 'src/app/views/online-services/drugshop-registration/preinspection-application/preinspection-application.component';


import { InitiateNewbatchApplicationComponent } from 'src/app/views/online-services/product-registration/new-product-registration/initiate-newbatch-application/initiate-newbatch-application.component';
import { ProdListingDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/prod-listing-dashboard/prod-listing-dashboard.component';
import { InitiateNewproductListingComponent } from 'src/app/views/online-services/product-registration/new-product-registration/initiate-newproduct-listing/initiate-newproduct-listing.component';
import { NewexhibitionTradefairdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/newexhibition-tradefairdash/newexhibition-tradefairdash.component';
import { ExtensionexhibitionTradefairdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/extensionexhibition-tradefairdash/extensionexhibition-tradefairdash.component';
import { PrepremsapplSelectionComponent } from '../../views/online-services/premises-registration/prepremsappl-selection/prepremsappl-selection.component';
import { PredrugshopAppselectionComponent } from '../../views/online-services/drugshop-registration/predrugshop-appselection/predrugshop-appselection.component';

const appRoutes: Routes = [
	{
		path: 'online-services',
		component: AppLayoutComponent,
		canActivate: [AuthGuard],
		children: [{
			path: '',
			redirectTo: 'app-dashboard', pathMatch: 'full'
		}, {
			path: 'app-dashboard',
			component: AppdashboardComponent
		},{
			path: 'appsubmission-dashboard',
			component: AppsubmissionDashboardComponent
		},{
			path: 'app-dashboard',
			component: AppdashboardComponent
		},{
			path: 'productreg-dashboard',
			component: ProductRegDashboardComponent 
		},{
			path: 'newprodreg-dashboard',
			component: NewprodRegDashboardComponent
		},{
			path: 'newsurgicalprodreg-dashboard',
			component: NewsurgicalRegDashboardComponent
		},{
			path: 'newvetprodreg-dashboard',
			component: NewvetprodRegDashboardComponent
		},{
			path: 'prodrenewalreg-dashboard',
			component: RenewalprodRegDashboardComponent
		},{
			path: 'prodvariationreg-dashboard',
			component: VariationprodRegDashboardComponent
		},{
			path: 'prodwithdrawalreg-dashboard',
			component: WithdrawalprodRegDashboardComponent
		},{
			path: 'prodnotificationreg-dashboard',
			component: ProductNotificationsDashboardComponent
		},{
			path: 'productapplication-sel',
			component: ApplicationSelectionComponent
		},{
			path: 'new-product-application',
			component: InitiateNewproductApplicationComponent,
		},{
			path: 'new-groupedproduct-application',
			component: InitiateNewbatchApplicationComponent,
		},{
			path: 'newprodlisting-dashboard',
			component: ProdListingDashboardComponent,
		},{
			path: 'new-listingproduct-application',
			component: InitiateNewproductListingComponent,
		},
		{
			path: 'archived_products-applications',  
			component: ArchivedProductsappsComponent
		},{//
			path: 'newpremisesreg-dashboard',
			component: NewpremisesDashboardComponent 
		},{//
			path: 'newpremiseregannex-dashboard',
			component: AnnexstoreDashboardComponent
		},{//
			path: 'premiserelocationreg-dashboard',
			component: PremiserelocationDashboardComponent
		},{//
			path: 'newdrugshopreg-dashboard',
			component: NewdrugshopDashboardComponent
		},{//
			path: 'pre-inspection-dashboard',
			component: PreinspectionDashboardComponent 
		},{//
			path: 'pre-inspection-surgical-dashboard',
			component: PreinspectionsurgicalDashboardComponent  
		},{//
			path: 'newsurgicalreg-dashboard',
			component: NewsurgicalinstrumntDashboardComponent  
		},{//
			path: 'surgicalrenewal-dashboard',
			component: RenewalsurgicalDashboardComponent 
		},{//
			path: 'surgicalrelocation-dashboard',
			component: SurgicalrelocationDashboardComponent
		},{//
			path: 'surgicalannex-dashboard',
			component: SurgicalAnnexstoreDashboardComponent
		},{//
			path: 'premisesrenewal-dashboard',
			component: RenewalpremisesDashboardComponent
		},{//
			path: 'drugshop-renewal-dashboard',
			component: RenewaldrugshopDashboardComponent
		}, {//
			path: 'premisesvariation-dashboard',
			component: VariationpremisesDashboardComponent
		},  {//
			path: 'drugshopvariation-dashboard',
			component: VariationdrugshopDashboardComponent
		},{//
			path: 'premisesregclosure-dashboard',
			component: WithdrawalpremisesDashboardComponent
		},{//
			path: 'preinspection-dashboard',
			component: PremsiteapprovalDashboardComponent 
		},{//
			path: 'preinspection-application',
			component: PremsiteapprovalApplicationComponent
		},{//
			path: 'drugshopspreinspection-application',
			component: PreinspectionApplicationComponent
		},

		{//
			path: 'premisesapplication-sel',
			component: PremapplSelectionComponent
		},{//
			path: 'prepremisesapplication-sel',
			component: PrepremsapplSelectionComponent
		},{//
			path: 'predrugshopapplication-sel',
			component: PredrugshopAppselectionComponent
		},{
			path: 'controlleddrugs-importpermit-application',
			component: ControldrugsImportpermitAppComponent
		},{
			path: 'controlleddrugs-license-application',
			component: ControldrugsLicenseAppComponent    
		},{
			path: 'new-premises-applications',
			component: NewPremisesRegistrationComponent
		},{
			path: 'preview-application',
			component: PreviewPremisesInformationComponent
		},{
			path: 'preview-drugshop-application',
			component: PreviewDrugshopInformationComponent
		},{
			path: 'annexstore-premises-applications',
			component: AnnexstoreRegistrationComponent
		},{
			path: 'premisesrelocation-applications',
			component: PremiserelocationRegistrationComponent 
		},{
			path: 'new-drugshop-applications',
			component: NewDrugshopsRegistrationComponent  
		},{
			path: 'new-surgical-applications',
			component: NewSurgicalRegistrationComponent
		},{
			path: 'preinspection-surgical-applications',
			component: PreinspectionsurgicalRegistrationComponent
		},{
			path: 'importexport-approvedappsel',
			component: ImportexportApprovedappselComponent
		},{
			path: 'importexportlic-ammendrequest',
			component: ImportexportlicAmmendrequestComponent
		},{
			path: 'importexport-approvedappvc',
			component: ImportexportApprovedappVCComponent
		},
		{
			path: 'importexport-approveddeclaration',
			component: ImportExportApprovedappDeclarationComponent
		},{
			path: 'renewal-business-permit',
			component: RenewalBusinessPermitComponent
		}, {
			path: 'renewal-drugshop-permit',
			component: RenewalDrugshopPermitComponent 
		},{
			path: 'premises-alteration-request',
			component: PremisesAlterationComponent 
		},{
			path: 'drugshop-variation-request',
			component: DrugshopVariationComponent 
		},  {
			path: 'premises-reg-preview',
			component: PremisesRegPreviewComponent
		}, {
			path: 'premises-reg-preview',
			component: DrugshopRegPreviewComponent
		},  {
			path: 'archived_premises-applications',
			component: ArchivedPremisesComponent
		}, {
			path: 'trader-profile',
			component: TraderProfileComponent
		}, {
			path: 'notifications-panel',
			component: NotificationsComponent   
		}, {
			path: 'gmpapplications-dashboard',
			component: GmpRegDashboardComponent
		},  {
			path: 'renewalgmpapplications-dashboard',
			component: GmpRenewalRegDashboardComponent
		},{
			path: 'local-gmpapplications-dashboard',
			component: LocalgmpRegDashboardComponent
		},{
			path: 'gmp-preinspection-dashboard',
			component: PreinspectionRegDashboardComponent
		}, {
			path: 'vetgmpapplications-dashboard',
			component: VetDashboardComponent  
		}, {
			path: 'new-gmp-applications',
			component: NewGmpApplicationComponent
		}, {
			path: 'local-gmp-applications',
			component: LocalGmpApplicationComponent
		}, {
			path: 'preinspection-gmp-applications',
			component: PreinspectionGmpApplicationComponent
		},{
			path: 'new-gmp-applications',
			component: NewVetgmpApplicationComponent
		}, {
			path: 'renewal-gmp-applications',
			component: RenewalGmpApplicationComponent 
		}, {
			path: 'gmp-applications-selection',
			component: GmpApplicationsSelectionComponent
		}, {
			path: 'gmp-preinspection-selection',
			component: GmpPreinspectionSelectionComponent
		},{
			path: 'vet-applications-selection',
			component: VetAppSelectionComponent
		}, {
			path: 'gmp-applications-preview',
			component: GmpAppPreviewComponent
		}, {
			path: 'productnotifications-dashboard',
			component: ProductnotificationDashboardComponent,
		}, {
			path: 'productnotifications-sel',
			component: ProductnotificationSelComponent,
		}, {
			path: 'clinical-trialsdashboard',
			component: ClinicalTrialdashComponent,
		}, {
			path: 'presubmissionclinical-trialsdashboard',
			component: PreclinicaltrialDashboardComponent,
		},
		
		{
			path: 'newclinical-trialsdashboard',
			component: NewclinicaltrialDashboardComponent,
		}, {
			path: 'renewalclinical-trialsdashboard',
			component: RenewalclinicaltrialDashboardComponent,
		}, {
			path: 'clinicalprogressrtp-sdashboard',
			component: ClinicaltrialprogressrptDashboardComponent,
		},  {
			path: 'gcpinspection-dashboard',
			component: GcpinspectionsDashboardComponent,
		}, {
			path: 'clinicaltrialvariations-dashboard',
			component: ClinicaltriavariationsDashboardComponent,
		}, 
		
		{
			path: 'importexport-dashboard',
			component: ImportexportDashboardComponent
		},{
			path: 'importvc-dashboard',
			component: ImportvisaDashboardComponent
		},{
			path: 'importlicenseapplication-dashboard',
			component: ImportlicenseApplicationDashboardComponent
		},{
			path: 'importlicense-dashboard',
			component: ImportvisaDashboardComponent
		},{
			path: 'generalimportlicense-dashboard',
			component: ImportgeneralicenseDashboardComponent
		},{
			path: 'exportlicense-dashboard',
			component: ExportlicenseDashboardComponent
		},{
			path: 'inspectionbookin-dashboard',
			component: InspectionbookingDashboardComponent
		},{
			path: 'controlleddrugscertificate-dashboard',
			component: OfficialcertificateDashboardComponent
		},{
			path: 'controlleddrugsimplicense-dashboard',
			component: ControldrugsImplicensedashComponent
		},{
			path: 'controlleddrugsinspection-dashboard',
			component: ControldrugsInspectionbkdashComponent
		},
			
		{
			path: 'importexportapp-sel',
			component: ImportexportSelComponent
		},{
			path: 'import-licensesappselection',
			component: ImportLicensesappselectionComponent
		},{
			path: 'importlicenses-appselection',
			component: ImportLicenseappselComponent
		},{
			path: 'export-licensesappselection',
			component: ExportLicenseappselComponent
		},{
      path: 'importexport-application',
      component: ImportexportApplicationComponent
    },{
      path: 'importexportvc-application',
      component: ImportVisaappComponent
    },{
		path: 'import-license-application',
		component: ImportLicenseapplictionComponent
	  },{
      path: 'exportlicense-application',
      component: ExprtLicenseappComponent
    },{
      path: 'importlicense-application',
      component: ImportLicenseappComponent
    },{
			path: 'declaration-dashboard',
			component: ImpexportamendDashboardComponent
		},{
			path: 'controldrugspermits-dashboard',
			component: ControlleddrugspermitsDashboardComponent
		}, {
			path: 'clinical-trialsdashboard',
			component: ClinicalTrialdashComponent,
		},{
			path: 'preclinical-trialsubsdashboard',
			component: PreclinicaltrialDashboardComponent,
		},
		{
			path: 'newclinical-trialsdashboard',
			component: NewclinicaltrialDashboardComponent,
		},{
			path: 'renewalclinical-trialsdashboard',
			component: RenewalclinicaltrialDashboardComponent,
		},{
			path: 'clinicaltrial-variationdashboard',
			component: ClinicaltriavariationsDashboardComponent,
		},{
			path: 'clinicaltrial-progressrptdashboard',
			component: ClinicaltrialprogressrptDashboardComponent,
		},{
			path: 'clinicaltrial-saerptdashboard',
			component: ClinicaltrialsaerptDashboardComponent,
		},{
			path: 'clinicaltrial-otherrptdashboard',
			component: ClinicaltrialotherrptDashboardComponent,
		},{
			path: 'clinicaltrial-gcpinspectiondashboard',
			component: GcpinspectionsDashboardComponent,
		},
		{
			path: 'newclinical-trials',
			component: NewclinicalTrialComponent,
		}, {
			path: 'preclinical-trialssubmissions',
			component: PreclinicaltrialSubmissionappComponent,
		},  {
			path: 'renewalclinical-trialssubmissions',
			component: RenewalclinicaltrialApplicationComponent,
		}, {
			path: 'clinical-trialsammendment',
			component: ClinicalTrialammendmentComponent,
		}, {
			path: 'promotional-advertdash',
			component: PromotionalAdvertdashComponent,
		}, {
			path: 'newpromotional-advertdash',
			component: NewpromotionalAdvertdashComponent,
		},  {
			path: 'renewalpromotional-advertdash',
			component: RenewalpromotionalAdvertdashComponent,
		}, {
			path: 'amendpromotional-advertdash',
			component: AmendmentpromotionalAdvertdashComponent,
		},{
			path: 'newexhibition-tradefairdash',
			component: NewexhibitionTradefairdashComponent,
		},{
			path: 'extensionexhibition-tradefairdash',
			component: ExtensionexhibitionTradefairdashComponent,
		},{
			path: 'promotional-advertsel',
			component: PromotionalAdvertselComponent,
		}, {
			path: 'promotional-advertarchive',
			component: PromotionalAdvertarchiveComponent,
		}, {
			path: 'promotionalmaterials-application',
			component: PromotionalAdvertappComponent,
		}, {
			path: 'approvedpromotionaladvertisements',
			component: ApprovedpromotionalAdvertsComponent,
		}, {
			path: 'promotionalmaterials-renewal',
			component: RenewalapppromotionalAdvertsComponent,
		}, {
			path: 'promotionalmaterials-amendment',
			component: AmendmentapppromotionalAdvertsComponent,
		},	
		{
			path: 'tradefairpermit-application',
			component: TradefairpermitAppComponent 
		},{
			path: 'drugproduct-notification',
			component: InitiateRenewalproductApplicationComponent   
		},{
			path: 'drug-product-notification',
			component: PsurProdnotificationRequestComponent   
		},{
			path: 'adverse-drug-reation-application',
			component: AdverseDrugReactionRequestComponent   
		},{
			path: '',
			component: InitiateProductAlterationComponent
		}, 
		{
			path: 'withdrawal-product-application',
			component: InitiateProductWithdrawalComponent
		},  {
			path: 'product-sampledocument-submission',
			component: SampledocumentsSubmissionsComponent
		}, {
			path: 'registered-product-selection',
			component: ProductRegistrationselectionComponent
		}, {
			path: 'registered-products',
			component: RegisteredProductappsComponent  
		}, {                                                 
			path: 'registered-premises',
			component: RegisteredPremisesappsComponent
		},{                                                 
			path: 'registered-drugshop',
			component:RegisteredDrugshopappsComponent
		},{
			path: 'registered-premises-selection',
			component: PremisesRegistrationselectionComponent
		},{
			path: 'registered-application-selection',
			component: DrugshopsRegistrationselectionComponent
		},{
			path: 'premises-withdrawal',
			component: PremisesWithdrawalComponent
		},{
			path: 'registered-gmpapplications',
			component: RegisteredGmpapplicationsComponent
		},{
			path: 'registered-gmpselection',
			component: RegisteredGmpselectionComponent
		},{
			path: 'gmpapplication-withdrawal',
			component: GmpWithdrawalappsrequestComponent
		},{
			path: 'registeredmanufacturing_premises',
			component: RegisteredManufacturingpremisesComponent
		},{
			path: 'gmp-documents-submissions',
			component: GmpDocumentSubmissionComponent
		},{
			path: 'gmpapplication-amendement',
			component: GmpApplicationsAmendementsComponent
		},{
			path: 'registered-clinicaltrialselection',
			component: RegisteredClinicaltrialSelectionComponent
		},{
			path: 'registered-clinicaltrialapplications',
			component: RegisteredClinicaltrialComponent
		},{
			path: 'newmedicaldevices-notification',
			component: MedicaldevicesNotificationsComponent
		},{
			path: 'medicalqualityaudits-dashboard',
			component: QualityAuditDashboardComponent
		},{
			path: 'archived_gmp-applications',
			component: QualityAuditDashboardComponent
		},{
			path: 'qualityaudit-app-selection',
			component: QualityauditAppSelectionComponent
		},{
			path: 'new-qualityaudit-applications',
			component: NewQualityauditApplicationComponent
		},{
			path: 'registered-qualityauditselection',
			component: RegisteredGmpselectionComponent 
		},{
			path: 'traderaccount-users',
			component: TraderaccountUsersComponent  
		},{
			path: 'pharmacist-dashboard',
			component: PharmacistsaccountUserComponent  
		},{
			path: 'product-nofication-dashboard',
			component: PsurProductnotificationDashboardComponent
		},{
			path: 'adverse-drug-reaction-dashboard',
			component: AdverseDrugReactionDashboardComponent
		},{
			path: 'product-retention-charges',
			component: RetentionChargesComponent
		},{
			path: 'product-retention-payments',
			component: RetentionPaymentsComponent
		},{ //disposal module
			path: 'disposal-applicationsdashboard',
			component: DisposalAppdashboardComponent
		},{ //disposal module
			path: 'disposal-applicationsrequest',
			component: DisposalPermitrequestsComponent
		},{ //disposal module
			path: 'bloodestablishement-dashboard',
			component: BloodestablishementDashboardComponent
		},{ //disposal module
			path: 'bloodestablishment-applicationsrequest',
			component: BloodestablishmentApplicationsrequestComponent
		},{ //disposal module
			path: 'productreg-localreprentative',
			component: ProductlocalRepresentationComponent 
		},{ //disposal module
			path: 'clinicaltrial-progressreporting',
			component: ClinicaltrialProgressreportingComponent
		},{ 
			path: 'clinicaltrial-saereporting',
			component: ClinicaltrialSaereportingComponent
		},{ 
			path: 'clinicaltrial-otherreporting',
			component: ClinicaltrialOtherreportingComponent
		},{ 
			path: 'application-payments',
			component: ApplicationPaymentsComponent
		},{ //disposal module
			path: 'application-invoices',
			component: InvoiceApppreviewComponent
		},{ //disposal module
			path: 'inspection-booking',
			component: InspectionBookingComponent
		},{ //disposal module
			path: 'appsyncrhonisationrequest',
			component: AppsynchronisationRequestComponent
		},{ //disposal module
      path: 'product-retention-dashboard',
      component: ProdretentionDashboardComponent
    },{ //disposal module
      path: 'oneyearauthorisation-dashboard',
      component: OnceyearauthorisationDashboardComponent
    },{ //disposal module
      path: 'personnalisedimport-dashboard',
      component: PersonalimportappDashboardComponent
    },{ //disposal module
      path: 'oneyearauthorisation-application',
      component: OneyearauthorisationApplicationComponent
    },{ //disposal module
      path: 'personnalisedimport-application',
      component: PersonnalisedimportApplicationComponent
    }],
	}
];
@NgModule({
	imports: [CommonModule, RouterModule.forRoot(appRoutes, { useHash: true })],
	declarations: []
})
export class OnlineserviceRouteModule { }
