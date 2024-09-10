/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.controller.PremiseRegistrationCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        'Admin.store.premiseRegistration.PremiseRegGridAbstractStore',
        'Admin.store.premiseRegistration.PremiseRegComboAbstractStore',
        'Admin.store.premiseRegistration.DrugsPremiseRegistrationStr',
        'Admin.store.premiseRegistration.CosmeticsPremiseRegistrationStr',
        'Admin.store.premiseRegistration.MedicinePremiseRegistrationStr',
        'Admin.store.premiseRegistration.OnlinePremRegistrationStr',
        'Admin.store.premiseRegistration.PremiseOtherDetailsOnlineStr',
        'Admin.store.premiseRegistration.PremisePersonnelDetailsOnlineStr',
        'Admin.store.premiseRegistration.TraPersonnelQualificationsStr',
        'Admin.store.premiseRegistration.PremisesInspectionDashGridStr',
        
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        },{
            ref: 'mansiteappmoredetailswizard',
            selector: '#mansiteappmoredetailswizard'
        },{
            ref: 'applicationgenerateinvoicespnl',
            selector: 'applicationgenerateinvoicespnl'
        }],

        control: {
           
            'drugspremregtb button[name=drugsPremiseRegHomeBtn]': {
                click: 'drugsPremiseRegHome' 
            },'veterinarypremisesregtb button[name=drugsPremiseRegHomeBtn]': {
                click: 'drugsPremiseRegHome' 
            },
            'newpremisereceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },

            'drugshopreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
             'drugshopreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },

            'siapremisereceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
             'siapremisereceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },



            'renewaldrugshopreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
             'renewaldrugshopreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },

             'renewalsiapremisereceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
             'renewalsiapremisereceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },


            'preinspectiondrugshopreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
             'preinspectiondrugshopreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },



            'preinspectionsiapremisereceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
             'preinspectionsiapremisereceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },




             '#premiseinspectionrecommfrm button[name=btn_addrecommendation]': {
                click: 'funcAddPremiseApplicationParamter'
            },

            '#drugshopinspectionfrm button[name=btn_addrecommendation]': {
                click: 'funcAddPremiseApplicationParamter'
            },


            'newpremisereceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },

            'preinpectionpremisereceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
            'preinpectionpremisereceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },

           
            'renewpremisereceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
            'renewpremisereceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },

            // 'drugshopdetailsfrm': {
            //     afterrender: 'drugsShopFrmDefination'
            // },


          
            'applicantselectiongrid': {
                itemdblclick: 'onApplicantSelectionListDblClick'
            },


            'premiseselectiongrid': {
                itemdblclick: 'onPremiseSelectionListDblClick'
            },


            'preinspectiondrugshopselectiongrid': {
                itemdblclick: 'onPreInspectionDrugShopSelectionListDblClick'
            },


             'preinspectionsiapremiseselectiongrid': {
                itemdblclick: 'onPreInspectionDrugShopSelectionListDblClick'
            },

            'newdrugshopselectiongrid': {
                itemdblclick: 'onNewDrugShopSelectionListDblClick'
            },

            'newsiapremiseselectiongrid': {
                itemdblclick: 'onNewDrugShopSelectionListDblClick'
            },

            'preinspectionpremiseselectiongrid': {
                itemdblclick: 'onPreInspectionPremiseSelectionListDblClick'
            },
           
            'appdocuploadsfrm button[name=upload_file_btn]': {
                click: 'uploadApplicationFile'
            },
            //CANCELLATION
            'cancelpremisereceivingwizard button[name=next_btn]': {
                click: 'onNextCardClickCancellation'
            },
            'cancelpremisereceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClickCancellation'
            },
            'cancelpremisereceivingwizard button[action=quickNav]': {
                click: 'quickNavigationCancellation'
            }, 
              'newpremisereceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'preinpectionpremisereceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },

              'renewpremisereceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'newpremisereceiving': {
                afterrender: 'prepareNewPremiseReceiving'
            },

            'preinpectionpremisereceivingwizard': {
                afterrender: 'prepareNewPremiseReceiving'
            },
            'newpremiseinvoicing': {
                afterrender: 'prepareNewPremiseInvoicing'
            },
            'newpremisepayments': {
                afterrender: 'prepareNewPremisePayments'
            },
            'newpremisemanagerinspection': {
                afterrender: 'prepareNewPremiseManagerInspection'
            },
            'newpremiseinspection': {
                afterrender: 'prepareNewPremiseInspection'
            },
            'newpremisemanagerevaluation': {
                afterrender: 'prepareNewPremiseManagerEvaluation'
            },
            'newpremiseevaluation': {
                afterrender: 'prepareNewPremiseEvaluation'
            },
            'newpremisescreening': {
                afterrender: 'prepareNewPremiseEvaluation'
            },
         
            'newpremisemanagerreview': {
                afterrender: 'prepareNewPremiseManagerReview'
            },
            'newpremiseapprovals': {
                afterrender: 'prepareNewPremiseMainApprovals'
            },
            'newsinglepremiseapproval': {
                afterrender: 'prepareSinglePremiseApproval'
            },
            'newpremisecommunication': {
                afterrender: 'prepareNewPremiseCommunications'
            },
            //RENEW
            'renewpremisereceiving': {
                afterrender: 'prepareRenewPremiseReceiving'
            },
            'renewpremiseinvoicing': {
                afterrender: 'prepareRenewalPremiseInvoicing'
            },
            'renewpremisepayments': {
                afterrender: 'prepareRenewalPremisePayments'
            },
            'renewpremisemanagerinspection': {
                afterrender: 'prepareNewPremiseManagerInspection'
            },
            'renewpremiseinspection': {
                afterrender: 'prepareRenewalPremiseInspection'
            },
            'renewpremisemanagerevaluation': {
                afterrender: 'prepareNewPremiseManagerEvaluation'
            },
            'renewpremiseevaluation': {
                afterrender: 'prepareRenewalPremiseEvaluation'
            },
            'renewpremisemanagerreview': {
                afterrender: 'prepareNewPremiseManagerReview'
            },
            'renewpremiseapprovals': {
                afterrender: 'prepareNewPremiseMainApprovals'
            },
            'renewpremisecommunication': {
                afterrender: 'prepareNewPremiseCommunications'
            },
            //ALTERATION
            'altpremisereceiving': {
                afterrender: 'prepareAlterationPremiseReceiving'
            },
            'altpremiseapprovals': {
                afterrender: 'prepareNewPremiseMainApprovals'
            },
            'altpremisecommunication': {
                afterrender: 'prepareNewPremiseCommunications'
            },
            //CANCELLATION
            'cancelpremisereceiving': {
                afterrender: 'prepareCancellationPremiseReceiving'
            },
            'cancelpremiseapprovals': {
                afterrender: 'prepareNewPremiseMainApprovals'
            },
            'cancelpremisecommunication': {
                afterrender: 'prepareNewPremiseCommunications'
            },
            //ONLINE
            'newpremiseonlinepreviewpnl': {
                afterrender: 'prepareNewPremiseOnlinePreview'
            },
            'cancelpremiseonlinepreviewpnl': {
                afterrender: 'prepareNewPremiseOnlinePreview'
            },
            'altpremiseonlinepreviewpnl': {
                afterrender: 'prepareNewPremiseOnlinePreview'
            },'renewalpremiseonlinepreviewpnl': {
                afterrender: 'prepareNewPremiseOnlinePreview'
            },
         
            //COMPARE DETAILS
            'premisecomparepanel': {
                afterrender: 'preparePremiseComparePreview'
            },
            //end
            //Submission NEW
            'newpremisereceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewReceivingApplicationSubmissionWin'
            },

            'preinpectionpremisereceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewReceivingApplicationSubmissionWin'
            },

          
            'managerinspectiongrid button[action=process_submission_btn]': {
                click: 'showManagerInspectionApplicationSubmissionWin'
            },
            'newpremiseinspectionpanel button[name=process_submission_btn]': {
                click: 'showInspectionApplicationSubmissionWin'
            },
            'newpremiseevaluationpanel button[name=process_submission_btn]': {
                click: 'showPremisesSreeningApplicationSubmissionWin'
            },
        
            'newsinglepremiseapprovalwizard button[name=process_submission_btn]': {
                click: 'showSingleApprovalsApplicationSubmissionWin'
            },
            'communicationsgrid button[action=process_submission_btn]': {
                click: 'showCommunicationsApplicationSubmissionWin'
            },
            'managerquerygrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'premisemanagerqueryresponsegrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            //Submission RENEWAL
            'renewpremisereceivingwizard button[name=process_submission_btn]': {
                click: 'showRenewalReceivingApplicationSubmissionWin'
            },
            'renewpremiseinspectionpanel button[name=process_submission_btn]': {
                click: 'showInspectionApplicationSubmissionWin'
            },
            'renewpremiseevaluationpanel button[name=process_submission_btn]': {
                click: 'showPremisesSreeningApplicationSubmissionWin'
            },
            'communicationsrenewalgrid button[action=process_submission_btn]': {
                click: 'showCommunicationsApplicationSubmissionWin'
            },
            //Submission ALTERATION
            'altpremisereceivingwizard button[name=process_submission_btn]': {
                click: 'showAlterationReceivingApplicationSubmissionWin'
            },
            //Submission CANCELLATION
            'cancelpremisereceivingwizard button[name=process_submission_btn]': {
                click: 'showCancellationReceivingApplicationSubmissionWin'
            },
            //
            'invoicingcostelementsgrid combo[name=fee_type_id]': {
                change: 'onInvoiceFeeTypeChange'
            },
          

            
            'applicationpaymentsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'approvaluploadeddocsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'approvalcommentsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'applicationpaymentsgrid button[name=remove_selected]': {
                click: 'removeApplicationPaymentDetails'
            },
            'managerreviewgrid': {
                previousUploadedDocs: 'showPreviousUploadedDocs'
            },
            'managerreviewrenewalgrid': {
                previousUploadedDocs: 'showPreviousUploadedDocs'
            },
           
            'premiseotherdetailsgrid': {
                refresh: 'addPremiseDependentGrids'
            },


            'premiseotherdetailsgrid': {
                refresh: 'addPremiseDependentGrids'
            },

            'premisedirectorsdetailsgrid button[name=add_personnel]': {
                click: 'showAddOtherDetailsPremiseForm'
            },

            'premiseinspectionrecommfrm button[name=new_room]': {
                click: 'showAddOtherDetailsPremiseForm'
            },

            'drugshopinspectionfrm button[name=new_room]': {
                click: 'showAddOtherDetailsPremiseForm'
            },


            'premisedirectorsdetailsgrid': {
                refresh: 'addPremiseDependentGrids'
            },
             'premisenearestpremisegrid': {
                refresh: 'addPremiseDependentGrids'
            },

            'premisenearestpremisegrid button[name=nearest_premise]': {
                click: 'showAddOtherDetailsPremiseForm'
            },

             'premiseinspectornearestpremisegrid': {
                refresh: 'addPremiseDependentGrids'
            },

            'premiseinspectornearestpremisegrid button[name=nearest_premise]': {
                click: 'showAddOtherDetailsPremiseForm'
            },

            'premiseotherdetailsgrid button[name=add_details]': {
                click: 'showAddPremiseOtherDetails'
            },
            'premisepersonneldetailsgrid': {
                refresh: 'addPremiseDependentGrids',//'addPremiseApplicantIDs'
                editPremisePersonnel: 'showEditPremisePersonnelDetails'
            },
            'premisepersonneldetailsgrid button[name=add_personnel]': {
                click: 'showAddPremisePersonnelDetails'
            },
            'newpremiseinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },
            'renewpremiseinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },
            'newpremisepaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },
            'renewpremisepaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },
            'newpremiseinspectionpanel form toolbar button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },
            'renewpremiseinspectionpanel form toolbar button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },
            'newpremiseevaluationpanel form toolbar button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },
            'renewpremiseevaluationpanel form toolbar button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },
           
            'newpremiseinspectionpanel button[name=premisesinspectiondocs_btn]': {
                click: 'showInspectionRecommendationDetails'
            },
            //SAVE


            'newpremisereceivingwizard button[name=save_btn]': {//new
                click: 'saveNewPremiseLicenseReceivingBaseDetails'
            },

            'newpremisereceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewLicenseReceivingApplicationSubmissionWin'
            },

            'preinpectionpremisereceivingwizard button[name=save_btn]': {//new
                click: 'savePremiseNewReceivingBaseDetails'
            },
            'renewpremisereceivingwizard button[name=save_btn]': {//renewal
                click: 'savePremiseRenewalReceivingBaseDetails'
            },
            'altpremisereceivingwizard button[name=save_btn]': {//alteration
                click: 'savePremiseAlterationReceivingBaseDetails'
            },
            'cancelpremisereceivingwizard button[name=save_btn]': {//cancellation
                click: 'savePremiseCancellationReceivingBaseDetails'
            },
            'premiseappmoredetailswizard button[name=updatepremisesapplications]': {//late updates...Inspection, Evaluation and Com with Applicants
                click: 'updatePremiseApplicationDetails'
            },
            'personnelbasicinfofrm button[action=link_personnel]': {
                click: 'showTraderPersonnel'
            },
            'premisepersonnelabstractfrm button[action=link_personnel]': {
                click: 'showTraderPersonnelSelectionGrid'
            },
            'premisecontactpersonfrm button[action=link_personnel]': {
                click: 'showTraderPersonnelSelectionGrid'
            },
          
            'newpremiseevaluationpanel toolbar menu menuitem[name=prev_uploads]': {
                click: 'showPreviousUploadedDocs'
            },
            'renewpremiseevaluationpanel toolbar menu menuitem[name=prev_uploads]': {
                click: 'showPreviousUploadedDocs'
            },
            'managerinspectiongrid button[name=save_btn]': {
                click: 'saveInspectionDetails'
            },
            'applicantdetailsfrm button[action=link_applicant]': {
                click: 'showApplicantSelectionList'
            },
            'premisedetailsfrm button[action=search_premise]': {
                click: 'showPremiseSelectionList'
            }, 


            'drugshopnearestpremiseFrm button[action=search_premise]': {
                click: 'showNearestPremiseSelectionList'
            },

            'drugshopnearestdrugshopFrm button[action=search_premise]': {
                click: 'showNearestDrugShopSelectionList'
            },

            'drugshopinspectornearestpremiseFrm button[action=search_premise]': {
                click: 'showInspectionNearestPremiseSelectionList'
            }, 

             'drugshopinspectornearestdrugshopFrm button[action=search_premise]': {
                click: 'showInspectionNearestDrugShopSelectionList'
            }, 

            'editpremiseappwizard button[action=search_premise]': {
                click: 'showPremiseSelectionList'
            },

            'drugshopreceivingwizard button[action=searchPreInspectionDrugShop]': {
                click: 'showPreInspectionDrugShopSelectionList'
            },


            'siapremisereceivingwizard button[action=searchPreInspectionDrugShop]': {
                click: 'showPreInspectionDrugShopSelectionList'
            },


            'renewaldrugshopreceivingwizard button[action=searchNewDrugShop]': {
                click: 'showNewDrugShopSelectionList'
            },
            'renewalsiapremisereceivingwizard button[action=searchNewDrugShop]': {
                click: 'showNewDrugShopSelectionList'
            },


            'newpremisereceivingwizard button[action=searchPreInspectionPremise]': {
                click: 'showPreInspectionDrugShopSelectionList'
            },


            'alterationsetupparamsgrid': {
                refresh: 'addApplicationModuleSetUpParams'
            },
            'alterationsetupformfieldsgrid combo[name=form_id_cmb]': {
                afterrender: 'refreshAlterationFormsCombo'
            },
            'alterationsetupformfieldsgrid button[name=effect_changes]': {
                click: 'syncAlterationAmendmentFormParts'
            },
            'alterationsetupparamsgrid button[name=effect_changes]': {
                click: 'syncAlterationAmendmentOtherParts'
            },
            'alterationsetupformfieldsgrid': {
                refresh: 'refreshAlterationFormFieldsGrid'
            },
            'premisedetailsfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },
            'premiseinspectionrecommfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },
            'drugshopinspectionfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },
            // 'localgmpinspectionfrm combo[name=country_id]': {
            //     afterrender: 'afterPremiseCountriesComboRender'
            // },
            'drugshopdetailsfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },
            'premiseinspectionreportfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },

            'drugshopinspectionreportfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },

               'drugshopinspectionreportfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },


            'drugshopnearestpremiseFrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },

             'preinspectiondrugshopdetailsfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },

            'preinspectionsiapremisedetailsfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },

            'siapremisedetailsfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },

            

            'drugshopapprovalsgrid combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesGridRender'
            },

            'drugshopcommunicationsgrid combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesGridRender'
            },

            'drugshopmanagerevaluationgrid combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesGridRender'
            },

            'predrugshopbatchchiefinspectiongrid combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesGridRender'
            },

            'preinspectionpremisedetailsfrm combo[name=country_id]': {
                afterrender: 'afterPremiseCountriesComboRender'
            },

            'traderpersonnelgrid': {
                itemdblclick: 'onTraderPersonnelItemdblclick'
            },
            'manufacturersselectiongrid': {
                itemdblclick: 'onManufacturerItemdblclick'
            },  'medicaldevicespremisesinspectiontb button[name=medicaldevicespremisesinspectionHomeBtn]': {
                click: 'premisesinspectionHomeBtn' 
            }, 'medicinespremisesinspectiontb button[name=medicinespremisesinspectionHomeBtn]': {
                click: 'premisesinspectionHomeBtn' 
            },'premisesinspectiondetailsfrm button[name=save_btn]': {
                click: 'savePremisesInspectionDetails'
            },'premisesinspectionschedulinggrid button[action=search_premise]': {
                click: 'showPremiseInspectionSelection'
            },'registeredpremiseselectiongrid button[name=addregpremisesbtn]': {
                click: 'linkRegisteredPremisestoInpection'
            },'inspectionpremiseselectiongrid button[name=addregpremisesbtn]': {
                click: 'linkRegisteredPremisestoInpection'
            },
            
            
            'premisesinspectiondashgrid': {
                refresh: 'refreshpremisesinspectiondashgrid'
            },
            'premisesinspectionschedulingpanel': {
                afterrender: 'preparepremisesinspectionschedulingpanel'
            },
            'premisesinspectionschedulinggrid': {
                refresh: 'refreshpremisesinspectionschedulinggrid'
            },
            'premisesinspectionschedulinggrid button[action=process_submission_btn]': {
                click: 'showPremisesInspectionApplicationSubmissionWin'
            },'premisesinspectionprocesspanel': {
                afterrender: 'preparePremisesInspectionProcesspanel'
            },
            'premisesinspectionprocessgrid': {
                refresh: 'refreshpremisesinspectionschedulinggrid'
            },
            'premisesinspectionprocessgrid button[action=process_submission_btn]': {
                click: 'showPremisesInspectionApplicationSubmissionWin'
            },
            'premisesinspectionreviewrecomgrid button[action=process_submission_btn]': {
                click: 'showApprovalInspectionApplicationSubmissionWin'
            },'premisesinspectionreviewrecomgrid': {
                refresh: 'refreshpremisesinspectionApprovalgrid'
            },'inspectedapprovedpremisesinspectiondashgrid': {
                refresh: 'refreshinspectedapprovedpremisesinspectiondashgrid'
            },
			
            
            //meeting stage
            'newPremiseTcMeetingpnl': {
                afterrender: 'preparePremiseManagerMeeting'
            },
            'premiseManagerMeetingGrid button[name=save_btn]': {
                click: 'saveTCMeetingDetails'
            },
            'premiseManagerMeetingGrid': {
                refresh: 'managerMeetingRefreshGrid',
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            },
            'newpremiseinspectionpanel button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },     
            'newPremiseTcReviewMeetingpnl': {
                afterrender: 'preparePremiseRecommReview'
            },
            'premisetcreviewreportinspectionreview': {
                afterrender: 'preparePremiseRecommReview'
            },
            
            'newPremiseTcapprovalReviewMeetingpnl': {
                afterrender: 'preparePremiseRecommApproval'
            },
            'premiseReviewTCMeetingGrid': {
                refresh: 'managerMeetingRefreshGrid',
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            },
            'premisetcreviewreportinspectionreviewgrid': {
                refresh: 'managerMeetingRefreshGrid',
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            },
            
            'premiseReviewTCMeetingApprovalGrid': {
                refresh: 'managerMeetingRefreshGrid',
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            }, 'premisesproductlinedetailsgrid button[name=add_line]': {
                click: 'showAddGmpProductLineDetails'
            },'premisesproductlinedetailsinspectiongrid button[name=add_line]': {
                click: 'showAddGmpProductLineDetails'
            },
            'drugshopreceivingwizard button[name=save_btn]': {//new
                click: 'saveNewLicenseReceivingBaseDetails'
            },
    

           'siapremisereceivingwizard button[name=save_btn]': {//new
                click: 'saveNewLicenseReceivingBaseDetails'
            },

            

             'renewaldrugshopreceivingwizard button[name=save_btn]': {//new
                click: 'saveNewLicenseReceivingBaseDetails'
            },
             'renewalsiapremisereceivingwizard button[name=save_btn]': {//new
                click: 'saveNewLicenseReceivingBaseDetails'
            },

             'preinspectiondrugshopreceivingwizard button[name=save_btn]': {//new
                click: 'saveDrugShopNewReceivingBaseDetails'
            },


             'preinspectiondrugshopreceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewReceivingDrugShopApplicationSubmissionWin'
            },

             'preinspectionsiapremisereceivingwizard button[name=save_btn]': {//new
                click: 'saveDrugShopNewReceivingBaseDetails'
            },


             'preinspectionsiapremisereceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewReceivingDrugShopApplicationSubmissionWin'
            },



            'drugshopreceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'drugshopreceivingwizard': {
                afterrender: 'prepareNewDrugShopReceiving'
            },


             'drugshopreceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewLicenseReceivingDrugShopApplicationSubmissionWin'
            },


            'siapremisereceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'siapremisereceivingwizard': {
                afterrender: 'prepareNewDrugShopReceiving'
            },


             'siapremisereceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewLicenseReceivingDrugShopApplicationSubmissionWin'
            },


            

            'renewaldrugshopreceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'renewaldrugshopreceivingwizard': {
                afterrender: 'prepareNewDrugShopReceiving'
            },


             'renewaldrugshopreceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewLicenseReceivingDrugShopApplicationSubmissionWin'
            },


            'renewalsiapremisereceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'renewalsiapremisereceivingwizard': {
                afterrender: 'prepareNewDrugShopReceiving'
            },


             'renewalsiapremisereceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewLicenseReceivingDrugShopApplicationSubmissionWin'
            },




            'preinspectiondrugshopreceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'preinspectiondrugshopreceivingwizard': {
                afterrender: 'preparePreInspectionDrugShopReceiving'
            },
             // 'preinspectiondrugshopreceivingwizard  button[name=process_submission_btn]': {
             //    click: 'showNewReceivingDrugShopApplicationSubmissionWin'
            // },


            'preinspectionsiapremisereceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'preinspectionsiapremisereceivingwizard': {
                afterrender: 'preparePreInspectionDrugShopReceiving'
            },


            'newdrugshoppaymentspnl form toolbar button[name=more_app_details]': {
                click: 'showDrugShopApplicationMoreDetails'
            },

            'newsiapremisepaymentspnl form toolbar button[name=more_app_details]': {
                click: 'showDrugShopApplicationMoreDetails'
            },


            'presiapremisepaymentspnl form toolbar button[name=more_app_details]': {
                click: 'showPreDrugShopApplicationMoreDetails'
            },


             'presiapremisepaymentspnl form toolbar button[name=more_app_details]': {
                click: 'showPreDrugShopApplicationMoreDetails'
            },


            
            'newdrugshopscreening': {
                afterrender: 'prepareNewDrugShopEvaluation'
            },
             'newdrugshopevaluationpanel button[name=process_submission_btn]': {
                click: 'showPremisesSreeningApplicationSubmissionWin'
            },

            'newdrugshopinspection': {
                afterrender: 'prepareDrugShopPremiseInspection'
            },

            'newsiapremiseinspection': {
                afterrender: 'prepareDrugShopPremiseInspection'
            },
            'newdrugshopregionalinspection': {
                afterrender: 'prepareDrugShopRegionalInspection'
            },

            'newsiapremiseregionalinspection': {
                afterrender: 'prepareDrugShopRegionalInspection'
            },


            'newdrugshopinspectordrugs': {
                afterrender: 'prepareDrugShopInspectorDrugs'
            },

            'presiapremiseinspection': {
                afterrender: 'preparePreDrugShopPremiseInspection'
            },

             'predrugshopinspection': {
                afterrender: 'preparePreDrugShopPremiseInspection'
            },
            'predrugshopregionalinspection': {
                afterrender: 'preparePreDrugShopRegionalInspection'
            },

            'predrugshopinspectordrugs': {
                afterrender: 'preparePreDrugShopInspectorDrugs'
            },

            'newpremiseregionalinspection': {
                afterrender: 'preparPremiseRegionalInspection'
            },

            'newpremiseregionalinspection': {
                afterrender: 'preparPremiseRegionalInspection'
            },


            'newdrugshopleadinspection': {
                afterrender: 'prepareDrugShopLeadInspection'
            },
             'newsiapremiseleadinspection': {
                afterrender: 'prepareDrugShopLeadInspection'
            },

            'predrugshopleadinspection': {
                afterrender: 'preparePreDrugShopLeadInspection'
            },


            'presiapremiseleadinspection': {
                afterrender: 'preparePreDrugShopLeadInspection'
            },
            

            'newpremiseleadinspection': {
                afterrender: 'preparePremiseLeadInspection'
            },

            'newdrugshopinspectionpanel button[name=process_submission_btn]': {
                click: 'showDrugShopInspectionApplicationSubmissionWin'
            },
            'predrugshopinspectionpanel button[name=process_submission_btn]': {
                click: 'showDrugShopInspectionApplicationSubmissionWin'
            },
            'newsiapremiseinspectionpanel button[name=process_submission_btn]': {
                click: 'showDrugShopInspectionApplicationSubmissionWin'
            },



            'prepresiapremiseinspectionpanel button[name=process_submission_btn]': {
                click: 'showDrugShopInspectionApplicationSubmissionWin'
            },


            'newdrugshopapprovals': {
                afterrender: 'prepareNewPremiseMainApprovals'
            },

            'drugshopcommunicationsgrid button[action=process_submission_btn]': {
                click: 'showCommunicationsApplicationSubmissionWin'
            },

            'drugshopotherlicensesdetailsgrid': {
                refresh: 'addDrugshopOnlineDependentGrids'
            },

            'drugshopdirectorsdetailsgrid': {
                refresh: 'addDrugshopOnlineDependentGrids'
            },

            'nearestpremisegrid': {
                refresh: 'addDrugshopOnlineDependentGrids'
            },


             'nearestpremisegrid button[name=nearest_premise]': {
                click: 'showAddOtherDetailsPremiseForm'
            },


            'nearestdrugshopgrid': {
                refresh: 'addDrugshopOnlineDependentGrids'
            },


             'nearestdrugshopgrid button[name=nearest_drugshop]': {
                click: 'showAddOtherDetailsPremiseForm'
            },


            'premiseinspectornearestdrugshopgrid': {
                refresh: 'addDrugshopOnlineDependentGrids'
            },


             'premiseinspectornearestdrugshopgrid button[name=nearest_drugshop]': {
                click: 'showAddOtherDetailsPremiseForm'
            },


             'drugshopdirectorsdetailsgrid button[name=add_personnel]': {
                click: 'showAddOtherDetailsPremiseForm'
            },

            'drugshopotherlicensesdetailsgrid button[name=other_licenses]': {
                click: 'showAddOtherDetailsPremiseForm'
            },

            'newpremiseinspectionpanel  toolbar menu menuitem[name=reject_recommendation]': {
                click: 'saveApprovalReviewRecommendationDetails'
            }, 'newpremiseinspectionpanel  toolbar menu menuitem[name=approve_recommendation]': {
                click: 'saveApprovalReviewRecommendationDetails'
            },



            'newdrugshoponlinepreviewpnl': {
                afterrender: 'prepareNewDrugShopOnlinePreview'
            },

            'predrugshoponlinepreviewpnl': {
                afterrender: 'preparePreDrugShopOnlinePreview'
            },

        }

    },

    /**
     * Called when the view is created
     */
    init: function () {

    },

    listen: {
        controller: {
            '*': {
                setPremiseRegGridsStore: 'setPremiseRegGridsStore',
                setPremiseRegCombosStore: 'setPremiseRegCombosStore',
                newPremiseRegistration: 'onNewPremiseRegApplication',
                funcActiveInspectionTabChanges:'funcActiveInspectionTabChanges',
                showNewPremiseInspectionSchedule:'showNewPremiseInspectionSchedule',
                applicationMoreDetails: 'showApplicationMoreDetailsGeneric',
                showPremisesInspectionDetailsWizard:'showPremisesInspectionDetailsWizard',
                redoPremiseOtherDetailsGrid: 'redoPremiseOtherDetailsGrid',
                redoPremisePersonnelDetailsGrid: 'redoPremisePersonnelDetailsGrid',
                previewPremisesOnlineApplication:'previewPremisesOnlineApplication',

                //drugshop 
                 newDrugShopRegistration: 'onNewDrugShopRegApplication',
                 showDrugShopApplicationMoreDetails: 'showDrugShopApplicationMoreDetails',
                 showDrugShopApplicationMoreDetailsGeneric: 'showDrugShopApplicationMoreDetailsGeneric',
                 showPreDrugShopApplicationMoreDetails: 'showPreDrugShopApplicationMoreDetails',

                 getBatchApplicationInspectionDetails: 'getBatchApplicationInspectionDetails',
                 getBatPremisechApplicationApprovalDetails: 'getBatPremisechApplicationApprovalDetails',

                 showDrugShopApplicationInpectionMoreDetailsGeneric: 'showDrugShopApplicationInpectionMoreDetailsGeneric',
                 showPreDrugShopApplicationInpectionMoreDetailsGeneric: 'showPreDrugShopApplicationInpectionMoreDetailsGeneric',

                 showPreDrugShopApplicationMoreDetailsGeneric: 'showPreDrugShopApplicationMoreDetailsGeneric'
            }
        }
    },  funcActiveInspectionTabChanges: function (tab) {

        var mainTabPnl = this.getMainTabPanel(),
            activeTab = mainTabPnl.getActiveTab();
            meeting_id = '';
        if (activeTab.down('premisesinspectiondetailsfrm').down('hiddenfield[name=id]')) {
            meeting_id = activeTab.down('premisesinspectiondetailsfrm').down('hiddenfield[name=id]').getValue();
            activeTab.down('preminspectionuploaddetailspnl').down('hiddenfield[name=reference_record_id]').setValue(meeting_id);
        } 
        if (meeting_id == '') {
            tab.setActiveTab(0);
            toastr.error('Save Inspection schedule details to proceed', 'Failure Response');
            return;
        }

    },

    funcAddPremiseApplicationParamter:function(btn){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
        var childXtype = btn.childXtype,
            table_name = btn.table_name,
            childXtype = Ext.widget(childXtype);
        funcShowCustomizableWindow('Parameter', '55%', childXtype, 'customizablewindow');
    },


    saveApprovalReviewRecommendationDetails:function(btn){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainStore = activeTab.down('grid').getStore(),
            form = btn.up('form'),
            recommendation_id = btn.recommendation_id,
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
           
            
            action_url = 'productregistration/savedocumentssubmissionrecommendation';
            if(recommendation_id ==1){

                title = "Do you want to Recommend the reviewed License Application?";
            }else if(recommendation_id ==3){

                title = "Do you want to Request for Re-Inspection for the reviewed License Application?";
            }
            else{
                title = "Do you want to Not Recommend the reviewed License Application?";

            }
            Ext.MessageBox.confirm('License Approval', title, function (button) {
                if (button === 'yes') {
                    Ext.getBody().mask('Saving Recommendation Application...');
                    Ext.Ajax.request({
                            url: action_url,
                            method: 'POST',
                            params: {
                                recommendation_id: recommendation_id,
                                application_code:application_code,
                                application_id:application_id,
                            },
                            headers: {
                                'Authorization': 'Bearer ' + access_token,
                                'X-CSRF-Token': token
                            },
                            success: function (response) {
                               
                                var resp = Ext.JSON.decode(response.responseText),
                                    message = resp.message,
                                    success = resp.success;
                                    if (success == true || success === true) {
                                        toastr.success(message, "Success Response");
                
                                    } else {
                                        toastr.error(message, 'Failure Response');
                                    }
                                Ext.getBody().unmask();
                            },
                            failure: function (response) {
                                
                                var resp = Ext.JSON.decode(response.responseText),
                                    message = resp.message;
                                toastr.error(message, 'Failure Response');
                                Ext.getBody().unmask();
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                Ext.getBody().unmask();
                                toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                                
                            }
                        });

                }
            })
    },


     drugsShopFrmDefination:function(frm){
        var me = this,
            mainTabPnl = frm.up('panel'),
            activeTab = mainTabPnl.up('panel');
            mainPnl = activeTab.up('panel');
            // console.log(mainTabPnl);
            // console.log(activeTab);
            sub_module_id = mainPnl.down('hiddenfield[name=sub_module_id]').getValue();
              
            if(sub_module_id ==97){
                frm.down('#director_fieldset').setVisible(false);
            
            }
            else{
                frm.down('#director_fieldset').setVisible(true);
              
            }

    },



    showAddGmpProductLineDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

            if(activeTab.down('premisedetailstabpnl')){
                premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue();
            }
            else{
                var win = btn.up('window'),
                    panel = win.down('premisedetailstabpnl'),
                premise_id = panel.down('hiddenfield[name=premise_id]').getValue();

            }
          
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            productLineStr = childObject.down('combo[name=product_line_id]').getStore(),
            productLineCategoryStr = childObject.down('combo[name=category_id]').getStore();
        childObject.down('hiddenfield[name=premise_id]').setValue(premise_id);
        productLineStr.removeAll();
        productLineStr.load({params: {section_id: section_id}});
        productLineCategoryStr.removeAll();
        productLineCategoryStr.load({params: {section_id: section_id}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

previewPremisesOnlineApplication: function (view, record) {
        var grid = view.grid,
            isRejection = grid.isRejection,
            isReadOnly = grid.isReadOnly,
            status_id = record.get('application_status_id'),
            status_type_id = record.get('status_type_id'),
            status_name = record.get('application_status'),
            tracking_no = record.get('tracking_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id');

            if(module_id==29 || module_id ===29 ){
                    var sub_module_id = record.get('sub_module_id'),
                    section_id = record.get('section_id'),
                    application_code = record.get('application_code'),
                    application_status_id = record.get('application_status_id'),
                    is_manager_query = record.get('is_manager_query'),
                    onlinePanelXtype,
                    wizardPnlXtype;

                if (sub_module_id == 97  || sub_module_id === 97 ) {//Pre Inspection
                    onlinePanelXtype = 'predrugshoponlinepreviewpnl';
                    wizardPnlXtype = 'predrugshoponlinepreviewwizard'
                } else if (sub_module_id == 4 || sub_module_id === 4) {//Withdrawal
                    onlinePanelXtype = 'cancelpremiseonlinepreviewpnl';
                    wizardPnlXtype = 'cancelpremiseonlinepreviewwizard'
                }else if(sub_module_id == 2) {//New, Renewal
                    onlinePanelXtype = 'renewalpremiseonlinepreviewpnl';
                    wizardPnlXtype = 'renewalpremiseonlinepreviewwizard'
                } else {
                    onlinePanelXtype = 'newdrugshoponlinepreviewpnl';
                    wizardPnlXtype = 'newdrugshoponlinepreviewwizard'
                }
                var onlinePanel = Ext.widget(onlinePanelXtype),
                    wizardPnl = onlinePanel.down(wizardPnlXtype),
                    docsGrid = onlinePanel.down('premregonlinedocuploadsgenericgrid'),
                    
                    premisePersonnelGrid = wizardPnl.down('drugshopdirectorsdetailsgrid');
                    nearestpremisegrid = wizardPnl.down('nearestpremisegrid');

                    nearestdrugshopgrid = wizardPnl.down('nearestdrugshopgrid');
                    drugshopotherlicensesdetailsgrid = wizardPnl.down('drugshopotherlicensesdetailsgrid');


                if (status_id == 23 && isRejection != 1) {
                    toastr.warning('Action not allowed for application in this status [' + status_name + '] ', 'Warning Response');
                    return false;
                }
                if (isRejection == 1) {
                    wizardPnl.down('button[name=prev_rejections]').setVisible(true);
                    wizardPnl.down('button[name=actions]').setVisible(true);
                    wizardPnl.down('button[name=submit_btn]').setVisible(false);
                    wizardPnl.down('button[name=query_btn]').setVisible(false);
                    wizardPnl.down('button[name=reject_btn]').setVisible(false);
                }

                if(sub_module_id==97 || sub_module_id==97){  
                    onlinePanel.down('preinspectiondrugshopdetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(1);  
                }else{
                    onlinePanel.down('drugshopdetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(1);  

                }
                /* if (is_manager_query == 1 || is_manager_query === 1) {
                     wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
                 }*/
                if (status_type_id == 2 || status_type_id === 2 || status_type_id == 3 || status_type_id === 3) {//pre checking and manager query response
                   // wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
                }
                docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
                docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
                docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
                docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
                onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
                onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
                onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
                onlinePanel.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
                onlinePanel.down('button[action=link_applicant]').setDisabled(true);
                //onlinePanel.down('drugshopdetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(1);
                onlinePanel.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
                onlinePanel.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(1);
                onlinePanel.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);

            
                
                if(onlinePanel.down('hiddenfield[name=is_manager_query]')){

                    onlinePanel.down('hiddenfield[name=is_manager_query]').setValue(is_manager_query);
                  
                }
                if(onlinePanel.down('hiddenfield[name=status_type_id]')){
                    onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
               
                }
                //premisePersonnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                premisePersonnelGrid.setIsWin(1);
                premisePersonnelGrid.setIsOnline(1);

                nearestpremisegrid.setIsWin(1);
                nearestpremisegrid.setIsOnline(1);

                nearestdrugshopgrid.setIsWin(1);
                nearestdrugshopgrid.setIsOnline(1);

                drugshopotherlicensesdetailsgrid.setIsWin(1);
                drugshopotherlicensesdetailsgrid.setIsOnline(1);

                //wizardPnl.down('premisecontactpersonfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                funcShowOnlineCustomizableWindow(tracking_no, '90%', onlinePanel, 'customizablewindow');

            }else{
            var sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            application_status_id = record.get('application_status_id'),
            is_manager_query = record.get('is_manager_query'),
            onlinePanelXtype,
            wizardPnlXtype;
        if (sub_module_id == 3 || sub_module_id === 3) {//Alteration
            onlinePanelXtype = 'altpremiseonlinepreviewpnl';
            wizardPnlXtype = 'altpremiseonlinepreviewwizard'
        } else if (sub_module_id == 4 || sub_module_id === 4) {//Withdrawal
            onlinePanelXtype = 'cancelpremiseonlinepreviewpnl';
            wizardPnlXtype = 'cancelpremiseonlinepreviewwizard'
        }else if(sub_module_id == 2) {//New, Renewal
            onlinePanelXtype = 'renewalpremiseonlinepreviewpnl';
            wizardPnlXtype = 'renewalpremiseonlinepreviewwizard'
        } else {//New, Renewal
            onlinePanelXtype = 'newpremiseonlinepreviewpnl';
            wizardPnlXtype = 'newpremiseonlinepreviewwizard'
        }
        var onlinePanel = Ext.widget(onlinePanelXtype),
            wizardPnl = onlinePanel.down(wizardPnlXtype),
            docsGrid = onlinePanel.down('premregonlinedocuploadsgenericgrid'),
            premisePersonnelGrid = wizardPnl.down('premisepersonneldetailsgrid'),
            premisedirectorsdetailsgrid = wizardPnl.down('premisedirectorsdetailsgrid'),
            premisenearestpremisegrid = wizardPnl.down('premisenearestpremisegrid');
        if (status_id == 23 && isRejection != 1) {
            toastr.warning('Action not allowed for application in this status [' + status_name + '] ', 'Warning Response');
            return false;
        }
        if (isRejection == 1) {
            wizardPnl.down('button[name=prev_rejections]').setVisible(true);
            wizardPnl.down('button[name=actions]').setVisible(true);
            wizardPnl.down('button[name=submit_btn]').setVisible(false);
            wizardPnl.down('button[name=query_btn]').setVisible(false);
            wizardPnl.down('button[name=reject_btn]').setVisible(false);
        }


        if(sub_module_id==89 || sub_module_id==89){
            onlinePanel.down('premisedetailsfrm').down('hiddenfield[name=isPreInspection]').setValue(1);
            onlinePanel.down('premisedetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(1);
            if(wizardPnl.down('premisedirectorsdetailsgrid')){
                wizardPnl.down('premisedirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('premisepersonneldetailsgrid')){
                wizardPnl.down('premisepersonneldetailsgrid').destroy();
            }

        }
     
        if (status_type_id == 2 || status_type_id === 2 || status_type_id == 3 || status_type_id === 3) {//pre checking and manager query response
           // wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
        }
        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        onlinePanel.down('premisedetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if(onlinePanel.down('hiddenfield[name=is_manager_query]')){

            onlinePanel.down('hiddenfield[name=is_manager_query]').setValue(is_manager_query);
          
        }
        if(onlinePanel.down('hiddenfield[name=status_type_id]')){
            onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
       
        }
        premisePersonnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisePersonnelGrid.setIsWin(1);
        premisePersonnelGrid.setIsOnline(1);

        premisedirectorsdetailsgrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisedirectorsdetailsgrid.setIsWin(1);
        premisedirectorsdetailsgrid.setIsOnline(1);

        premisenearestpremisegrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisenearestpremisegrid.setIsWin(1);
        premisenearestpremisegrid.setIsOnline(1);

        wizardPnl.down('premisecontactpersonfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        funcShowOnlineCustomizableWindow(tracking_no, '80%', onlinePanel, 'customizablewindow');
     }
    }, 

    refreshinspectedapprovedpremisesinspectiondashgrid: function (me) {
        
        var store = me.store,
            inspection_status_id = me.inspection_status_id,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            formValues = activeTab.down('form').getValues();
            //get the 
            Ext.apply(store.getProxy().extraParams, formValues);
    },
    linkRegisteredPremisestoInpection:function(btn){
        var grid = btn.up('grid'),
            win = grid.up('window'),
            store = grid.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            inspection_premsgrid = activeTab.down('premisesinspectionschedulinggrid'),
            inspection_premsgridstr = inspection_premsgrid.store,
            inspection_id = activeTab.down('hiddenfield[name=id]').getValue(),
            
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            params = [],
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    target: grid,
                    msg: 'Please wait...'
                }
            );
      
        Ext.each(selected_records, function (item) {
            var main_registered_id = item.data.main_registered_id,
                premise_id = item.data.premise_id,
               
                obj = {
                    main_registered_id: main_registered_id,
                    premise_id: premise_id
                };
            selected.push(obj);
        });
        mask.show();
        Ext.Ajax.request({
            url: 'premiseregistration/linkRegisteredPremisestoInpection',
            params: {
                selected: JSON.stringify(selected),
                section_id: section_id,
                sub_module_id: sub_module_id,
                workflow_stage_id:workflow_stage_id,
                process_id:process_id,
                inspection_id:inspection_id,
                module_id: module_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true) {
                    toastr.success(message, 'Success Response!!');
                    activeTab.down('hiddenfield[name=active_application_id]').setValue(resp.application_id),
                    inspection_premsgridstr.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });


},

    afterPremiseCountriesComboRender: function (cmbo) {
        var form = cmbo.up('form'),
            is_local = form.down('hiddenfield[name=is_local]').getValue(),
            store = cmbo.getStore(),
            filterObj = {is_local: is_local},
            filterStr = JSON.stringify(filterObj);
        store.removeAll();
        store.load({params: {filter: filterStr}});
    },

    afterPremiseCountriesGridRender: function (cmbo) {
        var form = cmbo.up('form'),
            store = cmbo.getStore(),
            filterObj = {is_local: 1},
            filterStr = JSON.stringify(filterObj);
        store.removeAll();
        store.load({params: {filter: filterStr}});
    },


    setPremiseRegGridsStore: function (me, options) {

        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.premiseRegistration.PremiseRegGridAbstractStore', config);

        me.setStore(store);
        toolbar.setStore(store);

        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setPremiseRegCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.premiseRegistration.PremiseRegComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    refreshAlterationFormsCombo: function (me) {
        var store = me.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
        store.removeAll();
        store.load({params: {module_id: module_id}});
    },

    addApplicationIdCodeParams: function (me) {
        var store = me.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        store.getProxy().extraParams = {
            application_id: application_id,
            application_code: application_code
        };
    },

    addApplicationBaseParams: function (me) {
        var store = me.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        store.getProxy().extraParams = {
            application_id: application_id,
            application_code: application_code,
            workflow_stage_id: workflow_stage_id
        };
    },

    addPremiseApplicantIDs: function (me) {
        var store = me.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue();
        store.getProxy().extraParams = {
            premise_id: premise_id,
            applicant_id: applicant_id
        };
    },

    addPremiseDependentGrids: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            isWin = grid.getIsWin(),
            isOnline = grid.getIsOnline(),
            isCompare = grid.getIsCompare(),
            is_temporal = grid.down('hiddenfield[name=is_temporal]').getValue(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicant_id = (activeTab.down('hiddenfield[name=applicant_id]')) ? activeTab.down('hiddenfield[name=applicant_id]').getValue() : null,
            premise_id;
        if (isWin == 1 || isWin === 1) {
            var win = grid.up('window');
            if (isCompare == 1 || isCompare === 1) {
                if (isOnline == 1 || isOnline === 1) {
                    premise_id = win.down('premiseportalcomparepreviewpnl').down('premisedetailsfrm').down('hiddenfield[name=premise_id]').getValue();
                } else {
                    premise_id = win.down('premisemiscomparepreviewpnl').down('premisedetailsfrm').down('hiddenfield[name=premise_id]').getValue();
                }
            } else {
                premise_id = win.down('premisedetailsfrm').down('hiddenfield[name=premise_id]').getValue();
            }
        } else {
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue();
        }
        store.getProxy().extraParams = {
            premise_id: premise_id,
            applicant_id: applicant_id,
            is_temporal: is_temporal,
            isOnline: isOnline
        };
    },


    addDrugshopOnlineDependentGrids: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            isWin = grid.getIsWin(),
            isOnline = grid.getIsOnline(),
            isCompare = grid.getIsCompare(),
            is_temporal = grid.down('hiddenfield[name=is_temporal]').getValue(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicant_id = (activeTab.down('hiddenfield[name=applicant_id]')) ? activeTab.down('hiddenfield[name=applicant_id]').getValue() : null,
            premise_id;
            
            premise_id = (activeTab.down('hiddenfield[name=premise_id]')) ? activeTab.down('hiddenfield[name=premise_id]').getValue() : '';
             
            //premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue();
            if(premise_id != ''){
                premise_id = premise_id;
            }
            if(Ext.ComponentQuery.query("#drugshopdetailsfrm")[0]){
                
                premise_id = Ext.ComponentQuery.query("#drugshopdetailsfrm")[0].down('hiddenfield[name=premise_id]').getValue();
            }
            if(Ext.ComponentQuery.query("#preinspectiondrugshopdetailsfrm")[0]){
                premise_id = Ext.ComponentQuery.query("#preinspectiondrugshopdetailsfrm")[0].down('hiddenfield[name=premise_id]').getValue();
            }

            if(Ext.ComponentQuery.query("#preinspectionsiapremisedetailsfrm")[0]){
                premise_id = Ext.ComponentQuery.query("#preinspectionsiapremisedetailsfrm")[0].down('hiddenfield[name=premise_id]').getValue();
            }

            if(Ext.ComponentQuery.query("#siapremisedetailsfrm")[0]){
                premise_id = Ext.ComponentQuery.query("#siapremisedetailsfrm")[0].down('hiddenfield[name=premise_id]').getValue();
            }
            
            
            store.getProxy().extraParams = {   
            premise_id: premise_id,
            applicant_id: applicant_id,
            is_temporal: is_temporal,
            isOnline: isOnline
        };
    },

     showAddOtherDetailsPremiseForm: function (btn) {
        var grid = btn.up('grid'),
        mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
        width = btn.winWidth,
        winTitle = btn.winTitle,
        childObject = Ext.widget(btn.childXtype);

        childObject.down('hiddenfield[name=premise_id]').setValue(premise_id);

        if(childObject.down('hiddenfield[name=main_premise_id]')){
              childObject.down('hiddenfield[name=main_premise_id]').setValue(premise_id);
        }
        funcShowCustomizableWindow(winTitle, width, childObject, 'customizablewindow');
    },


    addApplicationModuleSetUpParams: function (me) {
        var store = me.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        store.getProxy().extraParams = {
            application_id: application_id,
            application_code: application_code,
            module_id: module_id,
            sub_module_id: sub_module_id,
            section_id: section_id
        };
    },

    refreshAlterationFormFieldsGrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            form_id = grid.down('hiddenfield[name=form_id]').getValue(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        store.getProxy().extraParams = {
            application_id: application_id,
            application_code: application_code,
            form_id: form_id,
        };
    },
    refreshpremisesinspectiondashgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

            store.getProxy().extraParams = {
                section_id: section_id
            };
            
    },
    
    refreshpremisesinspectionschedulinggrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            inspection_id = activeTab.down('hiddenfield[name=id]').getValue();

            store.getProxy().extraParams = {
                inspection_id: inspection_id,
                workflow_stage_id:workflow_stage_id
            };
    },
    
    refreshpremisesinspectionApprovalgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

            store.getProxy().extraParams = {
                workflow_stage_id:workflow_stage_id
            };
    },
    refreshManagerReviewGrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            table_name = me.table_name,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            recommendation_id = grid.down('combo[name=recommendation_id]').getValue();
        store.getProxy().extraParams = {
            table_name: table_name,
            workflow_stage_id: workflow_stage_id,
            section_id: section_id,
            recommendation_id: recommendation_id
        };
    },

    getWorkflowDetails: function (module_id, section_id, application_type, is_initial) {
        var results = [];
        Ext.Ajax.request({
            method: 'GET',
            async: false,
            url: 'workflow/getWorkflowDetails',
            params: {
                module_id: module_id,
                section_id: section_id,
                sub_module_id: application_type,
                is_initial: is_initial
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success;
                if (success || success == true || success === true) {
                    results = resp.results;
                }
            }
        });
        return results;
    },

    onNewPremiseRegApplication: function (sub_module_id, wrapper_xtype) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(wrapper_xtype),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);
        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }

        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        // if(sub_module_id==89|| sub_module_id===89){
        //   var premiseTab=Ext.ComponentQuery.query('#premisedetailstabpnl')[0],
        //   premiseFrm=premiseTab.down('premisedetailsfrm');
        //   var preInspectionPremiseFrm=Ext.widget("preinspectionpremisedetailsfrm");
        //   premiseTab.remove(premiseFrm);
        //   premiseTab.add(preInspectionPremiseFrm);
        //   // premiseTab.update();
        //   // premiseTab.doLayout();
        // }
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.initialAppStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },


    showNewPremiseInspectionSchedule: function (sub_module_id, wrapper_xtype) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(wrapper_xtype),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);
        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.initialAppStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },
    
   

    prepareApplicationBaseDetails: function (tab, record) {
        var me = this,
            application_id = record.get('active_application_id'),
            process_name = record.get('process_name'),
            workflow_stage = record.get('workflow_stage'),
            application_status = record.get('application_status'),
            reference_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            application_status_id = record.get('application_status_id');
        tab.down('hiddenfield[name=active_application_id]').setValue(application_id);
        tab.down('hiddenfield[name=process_id]').setValue(process_id);
        tab.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        tab.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        tab.down('hiddenfield[name=module_id]').setValue(module_id);
        tab.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        tab.down('hiddenfield[name=section_id]').setValue(section_id);
        tab.down('displayfield[name=process_name]').setValue(process_name);
        tab.down('displayfield[name=workflow_stage]').setValue(workflow_stage);
        tab.down('displayfield[name=application_status]').setValue(application_status);
        tab.down('displayfield[name=reference_no]').setValue(reference_no);
    },

    prepareNewPremiseReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            contactPersonFrm = activeTab.down('premisecontactpersonfrm'),
            //app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            app_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            //activeTab.down('button[name=search_PreInspection_Premise]').setVisible(false);
            //applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            if(sub_module_id==1 || sub_module_id==1){
            premiseFrm.down('#Location_fieldset').items.each(function(item) {
                if (item.isFormField) { // Check if the item is a form field (e.g., textfield, combo, etc.)
                    item.setReadOnly(true);
                }
            });
            premiseFrm.down('#main_fieldset').query('field').forEach(function(item) {
                item.setConfig({
                    readOnly: true
                });

                // if (item.isValid()) {
                //     item.clearInvalid();
                // }
            });
          }  


        if(sub_module_id==89 || sub_module_id==89){
            premiseFrm.down('#director_fieldset').setVisible(false);
            premiseFrm.down('#Phamacist_fieldset').setVisible(false);
            premiseFrm.down('combo[name=had_offence]').allowBlank = true;
            premiseFrm.down('combo[name=had_cancelled_application]').allowBlank = true;
            premiseFrm.down('textfield[name=psu_no]').allowBlank = true;
            premiseFrm.down('textfield[name=supervising_name]').allowBlank = true;
            if(activeTab.down('premisedirectorsdetailsgrid')){
                activeTab.down('premisedirectorsdetailsgrid').destroy();
            }
            if(activeTab.down('premisepersonneldetailsgrid')){
                activeTab.down('premisepersonneldetailsgrid').destroy();
            }
            //premisedetailswintabpnl.add(2, {title: 'External Stores', xtype: 'inspectorslistgrid'});
           }


        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                section_id: section_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                workflow_stage: workflow_stage_id
            }
        });
        /* if (application_status_id == 4 || application_status_id === 4) {
             activeTab.down('button[name=queries_responses]').setVisible(true);
         }*/
        if (app_status_id == 8 || app_status_id === 8) {//manager raise query
            activeTab.down('button[name=manager_query]').setVisible(true);
        }
        if (app_status_id == 13 || app_status_id === 13) {//manager query response
            activeTab.down('button[name=manager_queryresp]').setVisible(true);
        }
        if (application_id) {
            //zone_fld.setReadOnly(true);
            //region_fld.setReadOnly(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);
                        }
                        // if (contactPersonDetails) {
                        //     var model1 = Ext.create('Ext.data.Model', contactPersonDetails);
                        //     contactPersonFrm.loadRecord(model1);
                        // }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    // prepareNewPremiseOnlinePreview: function (pnl) {
    //     var me = this,
    //         applicantFrm = pnl.down('applicantdetailsfrm'),
    //         premiseFrm = pnl.down('premisedetailsfrm'),
    //         contactPersonFrm = pnl.down('premisecontactpersonfrm'),
    //         superintendentFrm = pnl.down('premisesuperintendentfrm'),
    //         application_id = pnl.down('hiddenfield[name=active_application_id]').getValue(),
    //         module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
    //         sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
    //         section_id = pnl.down('hiddenfield[name=section_id]').getValue();
    //         mask = new Ext.LoadMask({
    //             target: pnl,
    //             msg: 'Please wait...'
    //         });
    //          mask.show();
    //     if(pnl.down('combo[name=applicable_checklist]')){
    //         var checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
    //         checklistTypesStr = checklistTypesGrid.getStore();
           
    //     checklistTypesStr.removeAll();
    //     checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});

    //     }
          
    //     if (application_id) {
    //         Ext.Ajax.request({
    //             method: 'GET',
    //             url: 'premiseregistration/prepareNewOnlineReceivingStage',
    //             params: {
    //                 application_id: application_id
    //             },
    //             headers: {
    //                 'Authorization': 'Bearer ' + access_token
    //             },
    //             success: function (response) {
    //                 mask.hide();
    //                 var resp = Ext.JSON.decode(response.responseText),
    //                     message = resp.message,
    //                     success = resp.success,
    //                     results = resp.results,
    //                     incharge_details = resp.incharge_details,
    //                     contactPersonDetails = resp.contactPersonDetails,
    //                     superintendentDetails = resp.superintendentDetails;
    //                 if (success == true || success === true) {
    //                     if (results) {
    //                         var model = Ext.create('Ext.data.Model', results);
    //                         var model1a = Ext.create('Ext.data.Model', incharge_details);
    //                         //pnl.down('combo[name=zone_id]').setValue(results.zone_id);
    //                         pnl.down('displayfield[name=application_status]').setValue(results.app_status);
    //                         pnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
    //                         pnl.down('displayfield[name=process_name]').setValue(results.process_name);
    //                         applicantFrm.loadRecord(model);
    //                         premiseFrm.loadRecord(model);

    //                     }

    //                     if (contactPersonDetails) {
    //                         var model1 = Ext.create('Ext.data.Model', contactPersonDetails);
    //                         contactPersonFrm.loadRecord(model1);
    //                     }
    //                     if (superintendentDetails) {
    //                         var model2 = Ext.create('Ext.data.Model', superintendentDetails);
    //                         superintendentFrm.loadRecord(model2);
    //                     }
    //                 } else {
    //                     toastr.error(message, 'Failure Response');
    //                 }
    //             },
    //             failure: function (response) {
    //                 mask.hide();
    //                 var resp = Ext.JSON.decode(response.responseText),
    //                     message = resp.message,
    //                     success = resp.success;
    //                 toastr.error(message, 'Failure Response');
    //             },
    //             error: function (jqXHR, textStatus, errorThrown) {
    //                 mask.hide();
    //                 toastr.error('Error: ' + errorThrown, 'Error Response');
    //             }
    //         });
    //     } else {
    //         mask.hide();
    //         //It's a new application
    //     }
    // },


    prepareNewDrugShopOnlinePreview: function (pnl) {
        var me = this,
            applicantFrm = pnl.down('applicantdetailsfrm'),
            premiseFrm = pnl.down('drugshopdetailsfrm'),
            // contactPersonFrm = pnl.down('premisecontactpersonfrm'),
            // superintendentFrm = pnl.down('premisesuperintendentfrm'),
            application_id = pnl.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue();
            mask = new Ext.LoadMask({
                target: pnl,
                msg: 'Please wait...'
            });
             mask.show();
        if(pnl.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore();
           
        checklistTypesStr.removeAll();
        checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});

        }
          
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewOnlineReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        incharge_details = resp.incharge_details,
                        contactPersonDetails = resp.contactPersonDetails,
                        superintendentDetails = resp.superintendentDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            var model1a = Ext.create('Ext.data.Model', incharge_details);
                            //pnl.down('combo[name=zone_id]').setValue(results.zone_id);
                            pnl.down('displayfield[name=application_status]').setValue(results.app_status);
                            pnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                            pnl.down('displayfield[name=process_name]').setValue(results.process_name);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);

                        }

                        // if (contactPersonDetails) {
                        //     var model1 = Ext.create('Ext.data.Model', contactPersonDetails);
                        //     contactPersonFrm.loadRecord(model1);
                        // }
                        // if (superintendentDetails) {
                        //     var model2 = Ext.create('Ext.data.Model', superintendentDetails);
                        //     superintendentFrm.loadRecord(model2);
                        // }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            mask.hide();
            //It's a new application
        }
    },


    preparePreDrugShopOnlinePreview: function (pnl) {
        var me = this,
            applicantFrm = pnl.down('applicantdetailsfrm'),
            premiseFrm = pnl.down('preinspectiondrugshopdetailsfrm'),
            // contactPersonFrm = pnl.down('premisecontactpersonfrm'),
            // superintendentFrm = pnl.down('premisesuperintendentfrm'),
            application_id = pnl.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue();
            mask = new Ext.LoadMask({
                target: pnl,
                msg: 'Please wait...'
            });
             mask.show();
        if(pnl.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore();
           
        checklistTypesStr.removeAll();
        checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});

        }
          
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewOnlineReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        incharge_details = resp.incharge_details,
                        contactPersonDetails = resp.contactPersonDetails,
                        superintendentDetails = resp.superintendentDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            var model1a = Ext.create('Ext.data.Model', incharge_details);
                            //pnl.down('combo[name=zone_id]').setValue(results.zone_id);
                            pnl.down('displayfield[name=application_status]').setValue(results.app_status);
                            pnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                            pnl.down('displayfield[name=process_name]').setValue(results.process_name);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);

                        }

                        // if (contactPersonDetails) {
                        //     var model1 = Ext.create('Ext.data.Model', contactPersonDetails);
                        //     contactPersonFrm.loadRecord(model1);
                        // }
                        // if (superintendentDetails) {
                        //     var model2 = Ext.create('Ext.data.Model', superintendentDetails);
                        //     superintendentFrm.loadRecord(model2);
                        // }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            mask.hide();
            //It's a new application
        }
    },

    prepareNewPremiseInvoicing: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                       
                        
                        applicant_details.setValue(results.applicant_details);
                        
                        if (module_id == 2 || module_id === 2) {
                            premise_details.setVisible(true);
                            premise_details.setValue(results.premise_details);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    prepareNewPremisePayments: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
           
            running_balance = activeTab.down('displayfield[name=running_balance]'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        
       
        activeTab.down('button[name=process_submission_btn]').setVisible(true);
        
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremisePaymentStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        balance = resp.balance,
                        invoice_amount = resp.invoice_amount,
                        results = resp.results,
                        txt;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        if (Math.abs(parseFloat(balance)) == parseFloat(invoice_amount) || Math.abs(parseFloat(balance)) === parseFloat(invoice_amount)) {
                            txt = ' (Not Paid)';
                        } else if (parseFloat(balance) > 0) {
                            txt = ' (Over-Paid)';
                        } else if (parseFloat(balance) < 0) {
                            txt = ' (Under-Paid)';
                        } else {
                            txt = ' (Cleared)';
                        }
                        applicant_details.setValue(results.applicant_details);

                      //  product_details.setValue(results.product_details);

                        running_balance.setValue(balance + txt);
                       
                        if (module_id == 1 || module_id === 1) {
                            product_details.setVisible(true);
                            product_details.setValue(results.product_details);
                        }

                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    
    preparePremisesInspectionProcesspanel: function () {
        
        this.prepareUniformPremisesInspectionPanel('premisesinspectionprocessgrid');

    },
    preparepremisesinspectionschedulingpanel: function () {
        
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            applicationsGrid = 'premisesinspectionschedulinggrid',
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down(applicationsGrid),
            upload_grid = activeTab.down('unstructureddocumentuploadsgrid'),
            inspectionDetailsFrm = activeTab.down('form'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            inspectorsGrid = activeTab.down('inspectioninspectorsgrid'),
            inspectorsStore = inspectorsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
       
            if (application_id) {
           
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseManagerInspectionStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            inspectionDetailsFrm.loadRecord(model);
                            activeTab.down('displayfield[name=reference_no]').setValue(results.inspection_reference_no);
                            
                            upload_grid.down('hiddenfield[name=reference_record_id]').setValue(results.id);
                        }
                        upload_grid.down('hiddenfield[name=document_type_id]').setValue(11);
                        upload_grid.down('hiddenfield[name=table_name]').setValue('tra_preminspection_uploaddocuments');
                        upload_grid.down('hiddenfield[name=reference_table_name]').setValue('tra_premise_inspection_details');
 applicationsStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
                        applicationsStore.load({params:{
                            inspection_id: results.id
                        }});
                        inspectorsStore.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            upload_grid.down('hiddenfield[name=document_type_id]').setValue(11);
            upload_grid.down('hiddenfield[name=table_name]').setValue('tra_preminspection_uploaddocuments');
            upload_grid.down('hiddenfield[name=reference_table_name]').setValue('tra_premise_inspection_details');
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    prepareNewPremiseManagerInspection: function () {

        this.prepareUniformPremisesInspectionPanel('managerinspectiongrid');
        
    },
    
    prepareUniformPremisesInspectionPanel:function(applicationsGrid){

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down(applicationsGrid),
            inspectionDetailsFrm = activeTab.down('form'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            inspectorsGrid = activeTab.down('inspectioninspectorsgrid'),
            inspectorsStore = inspectorsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
       //prepareNewPremiseInspection
            if (application_id) {
            applicationsStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseManagerInspectionStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            inspectionDetailsFrm.loadRecord(model);
                        }
                        applicationsStore.load();
                        inspectorsStore.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }

    },

    prepareNewPremiseInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('premiseappmoredetailswizard');
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            premiseFrm = wizardPnl.down('premisedetailsfrm'),
            premisenearestpremisegrid = wizardPnl.down('premisenearestpremisegrid'),
            premisedirectorsdetailsgrid = wizardPnl.down('premisedirectorsdetailsgrid'),
            premisepersonneldetailsgrid = wizardPnl.down('premisepersonneldetailsgrid'),
            premisedetailswintabpnl = wizardPnl.down('premisedetailswintabpnl'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            premisepersonneldetailsgrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            premisedirectorsdetailsgrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            premisenearestpremisegrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);

            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatepremisesapplications]').setVisible(false);
            }

           if(sub_module_id==89 || sub_module_id==89){
            premiseFrm.down('#director_fieldset').setVisible(false);
            premiseFrm.down('#Phamacist_fieldset').setVisible(false);
            if(wizardPnl.down('premisedirectorsdetailsgrid')){
                wizardPnl.down('premisedirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('premisepersonneldetailsgrid')){
                wizardPnl.down('premisepersonneldetailsgrid').destroy();
            }
            //premisedetailswintabpnl.add(2, {title: 'External Stores', xtype: 'inspectorslistgrid'});
           }

            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
             applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
            premiseFrm.query('field').forEach(function(field) {
                    field.setReadOnly(true);
              });
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
      
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications',

                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                             
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('premiseinspectionrecommfrm');
                            //inspection_frm.down('premisenearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.loadRecord(model4);
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);
                            
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', premiseDetails);
                            inspection_frm = activeTab.down('premiseinspectionrecommfrm');
                            //inspection_frm.down('premisenearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            if(sub_module_id==1 || sub_module_id==1){
                               // inspection_frm.down('textarea[name=premise_state]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_size]').setVisible(false);
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);

                                inspection_frm.down('htmleditor[name=storage_details]').setVisible(true);
                                inspection_frm.down('htmleditor[name=storage_available]').setVisible(true);
                                inspection_frm.down('htmleditor[name=cold_storage_facilities]').setVisible(true);
                             }
                            inspection_frm.loadRecord(model5);
                            
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


    preparPremiseRegionalInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('premiseappmoredetailswizard');
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            premiseFrm = wizardPnl.down('premisedetailsfrm'),
            premisenearestpremisegrid = wizardPnl.down('premisenearestpremisegrid'),
            premisedirectorsdetailsgrid = wizardPnl.down('premisedirectorsdetailsgrid'),
            premisepersonneldetailsgrid = wizardPnl.down('premisepersonneldetailsgrid'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
           // activeTab.down('button[name=preview_report_btn]').setHidden(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            premisepersonneldetailsgrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            premisedirectorsdetailsgrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            premisenearestpremisegrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatepremisesapplications]').setVisible(false);
            }

            if(sub_module_id==89 || sub_module_id==89){
              premiseFrm.down('#director_fieldset').setVisible(false);
              premiseFrm.down('#Phamacist_fieldset').setVisible(false);
            if(wizardPnl.down('premisedirectorsdetailsgrid')){
                wizardPnl.down('premisedirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('premisepersonneldetailsgrid')){
                wizardPnl.down('premisepersonneldetailsgrid').destroy();
            }
           }

            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
            premiseFrm.query('field').forEach(function(field) {
                    field.setReadOnly(true);
              });
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseRegionalEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('premiseinspectionrecommfrm');
                            inspection_frm.loadRecord(model4);
                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            //inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);

                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);


                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').validate();

                            //inspection_frm.down('combo[name=recommendation_id]').setFieldLabel('Regional Inspector Recommendation');
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);
                            
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = activeTab.down('premiseinspectionrecommfrm');
                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            ////inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').validate();
                           
                            //inspection_frm.down('combo[name=recommendation_id]').setFieldLabel('Regional Inspector Recommendation');
                            inspection_frm.loadRecord(model5);
                            
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


    preparePremiseLeadInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('premiseappmoredetailswizard');
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            premiseFrm = wizardPnl.down('premisedetailsfrm'),
            premisenearestpremisegrid = wizardPnl.down('premisenearestpremisegrid'),
            premisedirectorsdetailsgrid = wizardPnl.down('premisedirectorsdetailsgrid'),
            premisepersonneldetailsgrid = wizardPnl.down('premisepersonneldetailsgrid'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            //activeTab.down('button[name=preview_report_btn]').setHidden(false);
            //activeTab.down('button[name=regional_inspector_report_btn]').setHidden(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            premisepersonneldetailsgrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            premisedirectorsdetailsgrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            premisenearestpremisegrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);

            
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatepremisesapplications]').setVisible(false);
            }

            if(sub_module_id==89 || sub_module_id==89){
            premiseFrm.down('#director_fieldset').setVisible(false);
            premiseFrm.down('#Phamacist_fieldset').setVisible(false);
            if(wizardPnl.down('premisedirectorsdetailsgrid')){
                wizardPnl.down('premisedirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('premisepersonneldetailsgrid')){
                wizardPnl.down('premisepersonneldetailsgrid').destroy();
            }
           }

            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
            premiseFrm.query('field').forEach(function(field) {
                    field.setReadOnly(true);
              });
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseLeadEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('premiseinspectionrecommfrm');
                            inspection_frm.loadRecord(model4);
                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            //inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);

                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);


                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);
                           // inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                             inspection_frm.down('button[name=capture_location]').setVisible(false);
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();

        
                            
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = activeTab.down('premiseinspectionrecommfrm');
                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            //inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);

                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);

                             inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);


                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                             inspection_frm.down('button[name=capture_location]').setVisible(false);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();

                            inspection_frm.loadRecord(model5);

                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    
    prepareNewPremiseManagerEvaluation: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainGrid = activeTab.down('grid'),
            mainStore = mainGrid.getStore(),
            sm = mainGrid.getSelectionModel(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (application_id) {
            mainStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    
   
    prepareNewPremiseEvaluation: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('premiseappmoredetailswizard'),
            applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            premiseFrm = wizardPnl.down('premisedetailsfrm'),
           // contactFrm = wizardPnl.down('premisecontactpersonfrm'),
            personnelGrid = wizardPnl.down('premisepersonneldetailsgrid'),
            otherDetailsGrid = wizardPnl.down('premiseotherdetailswingrid'), 
            isReadOnly = 0,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
         //   applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]');
            //map details 
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);

            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=save_btn]').setVisible(false);
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            personnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            //otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            //contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            //end 
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                        if (module_id == 2 || module_id === 2) {
                          //  premise_details.setVisible(true);
                           // premise_details.setValue(results.premise_details);
                        }

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                        // if (contactDetails) {
                        //     var model3 = Ext.create('Ext.data.Model', contactDetails);
                        //     contactFrm.loadRecord(model3);
                        // }
                                               
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    /*
    prepareNewPremiseEvaluation: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            app_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]');
        if (app_status_id == 8 || app_status_id === 8) {//manager raise query
            activeTab.down('button[name=manager_query]').setVisible(true);
        }
        if (app_status_id == 13 || app_status_id === 13) {//manager query response
            activeTab.down('button[name=manager_queryresp]').setVisible(true);
        }
        if (application_id) {
            app_check_types_store.load({
                params: {
                    process_id: process_id,
                    workflow_stage: workflow_stage_id
                }
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        applicant_details.setValue(results.applicant_details);
                        if (module_id == 2 || module_id === 2) {
                            premise_details.setVisible(true);
                            premise_details.setValue(results.premise_details);
                        }


                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
*/
    

    prepareNewPremiseManagerReview: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainGrid = activeTab.down('grid'),
            mainStore = mainGrid.getStore(),
            sm = mainGrid.getSelectionModel(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (application_id) {
            mainStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareNewPremiseMainApprovals: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainGrid = activeTab.down('grid'),
            mainStore = mainGrid.getStore(),
            sm = mainGrid.getSelectionModel(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (application_id) {
            mainStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

   

    prepareSinglePremiseApproval: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            paymentsPanel = activeTab.down('approvalspaymentspnl'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            invoice_id_field = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no_field = paymentsPanel.down('displayfield[name=invoice_no]'),
            invoiceDetailsGrid = paymentsPanel.down('paymentinvoicingcostdetailsgrid'),
            paymentDetailsGrid = paymentsPanel.down('applicationpaymentsgrid'),
            invoiceDetailsStore = invoiceDetailsGrid.getStore(),
            paymentDetailsStore = paymentDetailsGrid.getStore(),
            preCheckingGrid = activeTab.down('premisescreeninggrid'),
            inspectionGrid = activeTab.down('foodpreminspectionchecklistgrid'),
            evaluationGrid = activeTab.down('foodpremevaluationchecklistgrid'),
            preCheckingChecklistsStore = preCheckingGrid.down('combo[name=applicable_checklist]').store,
            inspectionChecklistsStore = inspectionGrid.down('combo[name=applicable_checklist]').store,
            evaluationChecklistsStore = evaluationGrid.down('combo[name=applicable_checklist]').store,
            receiving_stage,
            inspection_stage,
            evaluation_stage,
            action_url;
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        preCheckingGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        inspectionGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        evaluationGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        activeTab.down('premisepersonneldetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        activeTab.down('premiseotherdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        //paymentsPanel.down('button[name=remove_selected]').setHidden(true);
        invoiceDetailsGrid.setHeight(255);
        paymentDetailsGrid.setHeight(255);
        if (sub_module_id == 1) {//New
            action_url = 'premiseregistration/prepareNewPremiseReceivingStage';
            if (section_id == 1) {//Food
                receiving_stage = 1;
                inspection_stage = 17;
                evaluation_stage = 9;
            } else if (section_id == 2) {//Drugs
                receiving_stage = 5;
                inspection_stage = 24;
                evaluation_stage = 26;
            } else if (section_id == 3) {//Cosmetics
                receiving_stage = 11;
                inspection_stage = 35;
                evaluation_stage = 37;
            } else if (section_id == 4) {//Medical Devices
                receiving_stage = 43;
                inspection_stage = 47;
                evaluation_stage = 49;
            }
        } else if (sub_module_id == 2) {//Renewal
            action_url = 'premiseregistration/prepareNewPremiseReceivingStage';//prepareRenewalPremiseReceivingStage';
            activeTab.down('premiseotherdetailsgrid').down('hiddenfield[name=is_temporal]').setValue(1);
            activeTab.down('premisepersonneldetailsgrid').down('hiddenfield[name=is_temporal]').setValue(1);
            if (section_id == 1) {//Food
                receiving_stage = 56;
                inspection_stage = 60;
                evaluation_stage = 62;
            } else if (section_id == 2) {//Drugs
                receiving_stage = 67;
                inspection_stage = 71;
                evaluation_stage = 73;
            } else if (section_id == 3) {//Cosmetics
                receiving_stage = 79;
                inspection_stage = 83;
                evaluation_stage = 85;
            } else if (section_id == 4) {//Medical Devices
                receiving_stage = 91;
                inspection_stage = 95;
                evaluation_stage = 97;
            }
        } else if (sub_module_id == 3) {//Alteration

        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: action_url,
                params: {
                    application_id: application_id,
                    application_code: application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        model = Ext.create('Ext.data.Model', results);
                    if (success == true || success === true) {
                        applicantFrm.loadRecord(model);
                        premiseFrm.loadRecord(model);
                        invoice_id_field.setValue(results.invoice_id);
                        invoice_no_field.setValue(results.invoice_no);
                        invoiceDetailsStore.load({params: {invoice_id: results.invoice_id}});
                        paymentDetailsStore.load();
                        preCheckingChecklistsStore.removeAll();
                        preCheckingChecklistsStore.load({
                            params: {
                                process_id: results.process_id,
                                workflow_stage: results.workflow_stage_id,
                                is_approval: 1,
                                target_stage: receiving_stage//for screening checklists at receiving stage
                            }
                        });
                        inspectionChecklistsStore.removeAll();
                        inspectionChecklistsStore.load({
                            params: {
                                process_id: results.process_id,
                                workflow_stage: results.workflow_stage_id,
                                is_approval: 1,
                                target_stage: inspection_stage//for inspection checklists
                            }
                        });
                        evaluationChecklistsStore.removeAll();
                        evaluationChecklistsStore.load({
                            params: {
                                process_id: results.process_id,
                                workflow_stage: results.workflow_stage_id,
                                is_approval: 1,
                                target_stage: evaluation_stage//for evaluation checklists
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareNewPremiseCommunications: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainGrid = activeTab.down('grid'),
            mainStore = mainGrid.getStore(),
            sm = mainGrid.getSelectionModel(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (application_id) {
            mainStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    //RENEW
    prepareRenewPremiseReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            contactPersonFrm = activeTab.down('premisecontactpersonfrm'),
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

          //loosened by Mulinge for Interim period
        // premiseFrm.getForm().getFields().each(function (field) {
        //     field.setReadOnly(true);
        // });


         premiseFrm.down('textarea[name=physical_address]').setValue(1);
        // contactPersonFrm.getForm().getFields().each(function (field) {
        //     field.setReadOnly(true);
        // });
        
        //activeTab.down('premiseotherdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);

       // activeTab.down('premisepersonneldetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);


        me.fireEvent('formAuth', process_id, 1, premiseFrm);
        me.fireEvent('otherPartsAuth', process_id, activeTab);
        //premiseFrm.down('textfield[name=premise_reg_no]').setVisible(true);
        premiseFrm.down('textfield[name=permit_no]').setVisible(true);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        app_check_types_store.removeAll();
        app_check_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            activeTab.down('button[name=save_btn]').setDisabled(true);
            //zone_fld.setReadOnly(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);
                        }
                        // if (contactPersonDetails) {
                        //     var model1 = Ext.create('Ext.data.Model', contactPersonDetails);
                        //     contactPersonFrm.loadRecord(model1);
                        // }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            premiseFrm.down('button[action=search_premise]').setDisabled(false);
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareRenewalPremiseInvoicing: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no = activeTab.down('displayfield[name=invoice_no]'),
            invoiceSummaryGrid = activeTab.down('invoicingcostdetailsgrid'),
            invoiceSummaryStore = invoiceSummaryGrid.getStore(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseInvoicingStage',//prepareRenewalPremiseInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        invoice_id.setValue(results.invoice_id);
                        invoice_no.setValue(results.invoice_no);
                        applicant_details.setValue(results.applicant_details);
                        invoiceSummaryStore.removeAll();
                        invoiceSummaryStore.load({
                            params: {
                                invoice_id: results.invoice_id
                            }
                        });
                        if (module_id == 2 || module_id === 2) {
                            premise_details.setVisible(true);
                            premise_details.setValue(results.premise_details);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareRenewalPremisePayments: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no = activeTab.down('displayfield[name=invoice_no]'),
            running_balance = activeTab.down('displayfield[name=running_balance]'),
            invoiceSummaryGrid = activeTab.down('paymentinvoicingcostdetailsgrid'),
            invoiceSummaryStore = invoiceSummaryGrid.getStore(),
            paymentsGrid = activeTab.down('applicationpaymentsgrid'),
            paymentsStore = paymentsGrid.getStore(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (application_id) {
            paymentsStore.removeAll();
            paymentsStore.load({
                params: {
                    application_id: application_id,
                    application_code: application_code
                }
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremisePaymentStage',//prepareRenewalPremisePaymentStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        balance = resp.balance,
                        invoice_amount = resp.invoice_amount,
                        results = resp.results,
                        txt;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        if (Math.abs(parseFloat(balance)) == parseFloat(invoice_amount) || Math.abs(parseFloat(balance)) === parseFloat(invoice_amount)) {
                            txt = ' (Not Paid)';
                        } else if (parseFloat(balance) > 0) {
                            txt = ' (Over-Paid)';
                        } else if (parseFloat(balance) < 0) {
                            txt = ' (Under-Paid)';
                        } else {
                            txt = ' (Cleared)';
                        }
                        invoice_id.setValue(results.invoice_id);
                        invoice_no.setValue(results.invoice_no);
                        applicant_details.setValue(results.applicant_details);
                        running_balance.setValue(balance + txt);
                        invoiceSummaryStore.removeAll();
                        invoiceSummaryStore.load({
                            params: {
                                invoice_id: results.invoice_id
                            }
                        });
                        if (module_id == 2 || module_id === 2) {
                            premise_details.setVisible(true);
                            premise_details.setValue(results.premise_details);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareRenewalPremiseInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]');
        if (application_id) {
            app_check_types_store.load({
                params: {
                    process_id: process_id,
                    workflow_stage: workflow_stage_id
                }
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseEvaluationStage',//prepareRenewalPremiseEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        applicant_details.setValue(results.applicant_details);
                        if (module_id == 2 || module_id === 2) {
                            premise_details.setVisible(true);
                            premise_details.setValue(results.premise_details);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareRenewalPremiseEvaluation: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]');
        if (application_id) {
            app_check_types_store.load({
                params: {
                    process_id: process_id,
                    workflow_stage: workflow_stage_id
                }
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseEvaluationStage',//prepareRenewalPremiseEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        applicant_details.setValue(results.applicant_details);
                        if (module_id == 2 || module_id === 2) {
                            premise_details.setVisible(true);
                            premise_details.setValue(results.premise_details);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    //ALTERATION
    prepareAlterationPremiseReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
       // premiseFrm.down('textfield[name=premise_reg_no]').setVisible(true);
        premiseFrm.down('textfield[name=permit_no]').setVisible(true);
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            //It's a new application
            premiseFrm.down('button[action=search_premise]').setDisabled(false);
            //activeTab.down('button[name=save_btn]').setText('Initialize Application');
            Ext.getBody().unmask();
        }
    },

    //CANCELLATION
    prepareCancellationPremiseReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            contactPersonFrm = activeTab.down('premisecontactpersonfrm'),
            premise_businessdetails = activeTab.down('premiseotherdetailsgrid'),
            premise_personneldetails = activeTab.down('premisepersonneldetailsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        premiseFrm.getForm().getFields().each(function (field) {
            field.setReadOnly(true);
        });
        premise_businessdetails.down('hiddenfield[name=isReadOnly]').setValue(1);
        premise_personneldetails.down('hiddenfield[name=isReadOnly]').setValue(1);
        //premiseFrm.down('textfield[name=premise_reg_no]').setVisible(true);
        premiseFrm.down('textfield[name=permit_no]').setVisible(true);
        premiseFrm.down('button[action=search_premise]').setDisabled(false);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);
                        }
                        if (contactPersonDetails) {
                            var model1 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactPersonFrm.loadRecord(model1);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            //It's a new application
            Ext.getBody().unmask();
        }
    },
    //COMPARE
    preparePremiseComparePreview: function (pnl) {
        var me = this,
            portalPnl = pnl.down('premiseportalcomparepreviewpnl'),
            misPnl = pnl.down('premisemiscomparepreviewpnl'),
            portalWizard = pnl.down('newpremiseonlinepreviewwizard'),
            misWizard = pnl.down('premiseappmoredetailswizard'),
            portalApplicantFrm = portalWizard.down('applicantdetailsfrm'),
            misApplicantFrm = misWizard.down('applicantdetailsfrm'),
            portalPremiseFrm = portalWizard.down('premisedetailsfrm'),
            misPremiseFrm = misWizard.down('premisedetailsfrm'),
            portalContactPersonFrm = portalWizard.down('premisecontactpersonfrm'),
            misContactPersonFrm = misWizard.down('premisecontactpersonfrm'),
            portal_application_id = portalPnl.down('hiddenfield[name=application_id]').getValue(),
            mis_application_id = misPnl.down('hiddenfield[name=application_id]').getValue(),
            mask = new Ext.LoadMask({
                target: pnl,
                msg: 'Please wait...'
            });
        mask.show();
        if (portal_application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/getPremiseCompareDetails',
                params: {
                    portal_application_id: portal_application_id,
                    mis_application_id: mis_application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        portalResults = resp.portalResults,
                        portalContactPersonDetails = resp.portalContactPersonDetails,
                        misResults = resp.misResults,
                        misContactPersonDetails = resp.misContactPersonDetails;
                    if (success == true || success === true) {
                        if (portalResults) {
                            var model = Ext.create('Ext.data.Model', portalResults);
                            portalApplicantFrm.loadRecord(model);
                            portalPremiseFrm.loadRecord(model);
                        }
                        if (portalContactPersonDetails) {
                            var model1 = Ext.create('Ext.data.Model', portalContactPersonDetails);
                            portalContactPersonFrm.loadRecord(model1);
                        }
                        if (misResults) {
                            var model2 = Ext.create('Ext.data.Model', misResults);
                            misApplicantFrm.loadRecord(model2);
                            misPremiseFrm.loadRecord(model2);
                        }
                        if (misContactPersonDetails) {
                            var model3 = Ext.create('Ext.data.Model', misContactPersonDetails);
                            misContactPersonFrm.loadRecord(model3);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            mask.hide();
            //It's a new application
        }
    },
    //End

  

    
    premisesinspectionHomeBtn: function (btn) {
        var me = this,
        dashwrapper = btn.dashwrapper,
        regdash = btn.regdash,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(dashwrapper);
        if (!dashboardWrapper.down(regdash)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: regdash});
        }
    },
    drugsPremiseRegHome: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('drugspremregdashwrapper');
        if (!dashboardWrapper.down('drugspremregdash')) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: 'drugspremregdash'});
        }
    },
    
    cosmeticsPremiseRegHome: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('cosmeticspremregdashwrapper');
        if (!dashboardWrapper.down('cosmeticspremregdash')) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: 'cosmeticspremregdash'});
        }
    },

    medDevicesPremiseRegHome: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('meddevicespremregdashwrapper');
        if (!dashboardWrapper.down('meddevicespremregdash')) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: 'meddevicespremregdash'});
        }
    },

    onApplicantSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

            if(activeTab.down('applicantdetailsfrm')){
               var applicantForm = activeTab.down('applicantdetailsfrm');

            }else{
                var pnl_wizard = me.getMansiteappmoredetailswizard();
                
                var applicantForm = pnl_wizard.down('applicantdetailsfrm');
            }


            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        applicantForm.loadRecord(record);
            if(activeTab.down('premisedetailsfrm')){
                record.id = 0;
                // console.log(record);
                var premisedetailsfrm = activeTab.down('premisedetailsfrm');
                //premisedetailsfrm.loadRecord(record);

            }
        //if its premises al set the premises details 
        //unsetting the id

        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

    

    onPremiseSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        
        var me = this,
            grid = view.grid,
            premise_id = record.get('premise_id'),
            is_nearest_premise = grid.down('hiddenfield[name=is_nearest_premise]').getValue(),
            is_inspection_nearest_premise = grid.down('hiddenfield[name=is_inspection_nearest_premise]').getValue(),
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            premiseForm,
            applicantForm,
            contactPersonFrm,
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();  
        if (module_id == 4 || module_id === 4) {
            var importexportpremisesfrm = activeTab.down('importexportpremisesfrm');
            importexportpremisesfrm.loadRecord(record);
        }else if(is_nearest_premise == 1 || is_nearest_premise === 1){
             var drugshopnearestpremiseFrm = Ext.ComponentQuery.query("#drugshopnearestpremisefrm")[0];
            drugshopnearestpremiseFrm.loadRecord(record);
        }else if(is_inspection_nearest_premise == 1 || is_inspection_nearest_premise === 1){
             var drugshopinspectornearestpremisefrm = Ext.ComponentQuery.query("#drugshopinspectornearestpremisefrm")[0];
            drugshopinspectornearestpremisefrm.loadRecord(record);
        } else {
            premiseForm = activeTab.down('premisedetailsfrm');
            applicantForm = activeTab.down('applicantdetailsfrm');
            // contactPersonFrm = activeTab.down('premisecontactpersonfrm');
             if (module_id == 3 || module_id === 3) {//GMP
                premiseForm.loadRecord(record);
            } else {
                premiseForm.loadRecord(record);
                applicantForm.loadRecord(record);
                activeTab.down('premisedirectorsdetailsgrid').getStore().load();
                activeTab.down('premisepersonneldetailsgrid').getStore().load();
                activeTab.down('premisenearestpremisegrid').getStore().load();
            }
        }
       
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },


     onPreInspectionDrugShopSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        
        var me = this,
            grid = view.grid,
            premise_id = record.get('premise_id'),
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            premiseForm,
            applicantForm,
            contactPersonFrm,
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
           if(activeTab.down('drugshopdetailsfrm')){
              premiseForm = activeTab.down('drugshopdetailsfrm');
            }
            if(activeTab.down('siapremisedetailsfrm')){
              premiseForm = activeTab.down('siapremisedetailsfrm');
            }
           
            premiseForm.down('hiddenfield[name=isReadOnly]').setValue(1);
            applicantForm = activeTab.down('applicantdetailsfrm');
            premiseForm.loadRecord(record);
            applicantForm.loadRecord(record);
             premiseForm.down('textfield[name=permit_no]').setHidden(false);
            activeTab.down('drugshopdirectorsdetailsgrid').getStore().load();
            activeTab.down('nearestpremisegrid').getStore().load();
            activeTab.down('drugshopotherlicensesdetailsgrid').getStore().load();
    
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },


     onNewDrugShopSelectionListDblClick: function (view, record, item, index, e, eOpts) {

         var me = this,
            grid = view.grid,
            premise_id = record.get('premise_id'),
            is_nearest_premise = grid.down('hiddenfield[name=is_nearest_premise]').getValue(),
            is_inspection_nearest_premise = grid.down('hiddenfield[name=is_inspection_nearest_premise]').getValue(),
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            premiseForm,
            applicantForm,
            contactPersonFrm,
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();  
        if (module_id == 4 || module_id === 4) {
            var importexportpremisesfrm = activeTab.down('importexportpremisesfrm');
            importexportpremisesfrm.loadRecord(record);
        }else if(is_nearest_premise == 1 || is_nearest_premise === 1){
             var drugshopnearestdrugshopfrm = Ext.ComponentQuery.query("#drugshopnearestdrugshopfrm")[0];
            drugshopnearestdrugshopfrm.loadRecord(record);
        }else if(is_inspection_nearest_premise == 1 || is_inspection_nearest_premise === 1){
             var drugshopinspectornearestdrugshopfrm = Ext.ComponentQuery.query("#drugshopinspectornearestdrugshopfrm")[0];
            drugshopinspectornearestdrugshopfrm.loadRecord(record);
        } else {
             if(activeTab.down('drugshopdetailsfrm')){
                 premiseForm = activeTab.down('drugshopdetailsfrm');
               }
               if(activeTab.down('siapremisedetailsfrm')){
                 premiseForm = activeTab.down('siapremisedetailsfrm');
               }
            applicantForm = activeTab.down('applicantdetailsfrm');
            // contactPersonFrm = activeTab.down('premisecontactpersonfrm');
             if (module_id == 3 || module_id === 3) {//GMP
                premiseForm.loadRecord(record);
            } else {
                premiseForm.loadRecord(record);
                applicantForm.loadRecord(record);
                premiseForm.down('textfield[name=permit_no]').setHidden(false);
                activeTab.down('button[name=search_drugshop]').setHidden(true);
                activeTab.down('drugshopdirectorsdetailsgrid').getStore().load();
                activeTab.down('nearestpremisegrid').getStore().load();
                activeTab.down('drugshopotherlicensesdetailsgrid').getStore().load();
            }
        }
       
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
      
    },


     onPreInspectionPremiseSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        
        var me = this,
            grid = view.grid,
            premise_id = record.get('premise_id'),
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            premiseForm,
            applicantForm,
            contactPersonFrm,
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        
            premiseForm = activeTab.down('premisedetailsfrm');
            premiseForm.down('hiddenfield[name=isReadOnly]').setValue(1);
            applicantForm = activeTab.down('applicantdetailsfrm');
            premiseForm.loadRecord(record);
            applicantForm.loadRecord(record);
            activeTab.down('premisedirectorsdetailsgrid').getStore().load();
            activeTab.down('premisepersonneldetailsgrid').getStore().load();
            activeTab.down('premisenearestpremisegrid').getStore().load();
    
          Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },





    getPremiseContactPersonDetails: function (premise_id, contactPersonFrm) {
        Ext.getBody().mask('Please wait...');
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getPremiseContactPersonDetails',
            params: {
                premise_id: premise_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    results = resp.results;
                if (success == true || success === true) {
                    if (results) {
                        var model = Ext.create('Ext.data.Model', results);
                        contactPersonFrm.loadRecord(model);
                    }
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    refreshAuditingChecklistItemsGrid: function (me) {
        var store = me.getStore(),
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            checklist_type = grid.down('combo[name=applicable_checklist]').getValue();
        store.getProxy().extraParams = {
            application_id: application_id,
            checklist_type: checklist_type
        };
    },

    uploadApplicationFile: function (btn) {
        var me = this,
            isWin = btn.isWin,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            uploads_store;
        if (isWin == 1 || isWin === 1) {
            uploads_store = Ext.getStore('foodpremdocuploadsstr');
        } else {
            uploads_store = activeTab.down('foodpremdocuploadsgrid').store
        }
        frm.submit({
            //clientValidation: false,
            url: 'premiseregistration/uploadApplicationFile',
            waitMsg: 'Uploading...',
            success: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message,
                    success = response.success;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    uploads_store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },
    //New
    showNewReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = this.validateNewPremiseReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            validateHasInvoice = validateHasInvoiceGeneration(application_code,sub_module_id);
            validateHasDocuments = validateHasUploadedDocumentsDetils(application_code, module_id,sub_module_id,section_id,0,workflow_stage_id,process_id);
            if(!hasQueries){
                if(!validateHasInvoice){
                    toastr.error('Response: Please generate Porforma Invoice Before submission of the License Application for payment Verification'); 
                    Ext.getBody().unmask();
                    return;
                }
                // if(!validateHasDocuments){
                //     toastr.error('Response: Please Upload the required documents to proceed.'); 
                //     Ext.getBody().unmask();
                //     return;
                // }
            }
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID, extraParams);//workflowsubmissionsfrm
        } else {
            Ext.getBody().unmask();
        }
    },

    showNewLicenseReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = this.validateNewPremiseReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            validateHasInvoice = validateHasInvoiceGeneration(application_code,sub_module_id);
            validateHasDocuments = validateHasUploadedDocumentsDetils(application_code, module_id,sub_module_id,section_id,0,workflow_stage_id,process_id);
            if(!hasQueries){
                if(!validateHasInvoice){
                    toastr.error('Response: Please generate Porforma Invoice Before submission of the License Application for payment Verification'); 
                    Ext.getBody().unmask();
                    return;
                }
                // if(!validateHasDocuments){
                //     toastr.error('Response: Please Upload the required documents to proceed.'); 
                //     Ext.getBody().unmask();
                //     return;
                // }
            }
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID, extraParams);//workflowsubmissionsfrm
        } else {
            Ext.getBody().unmask();
        }
    },
    validateNewPremiseReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseFrm = activeTab.down('premisedetailsfrm'),
         //   screeningGrid = activeTab.down('productscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!premiseFrm.isValid()) {
            toastr.warning('Please Enter All the required Premise Details!!', 'Warning Response');
            return false;
        }
        this.savePremiseNewReceivingBaseDetails(btn);
      /*  if (screeningGrid.getStore().getModifiedRecords().length > 0) {
            toastr.warning('There are unsaved screening data!!', 'Warning Response');
            return false;
        }
        */
        return true;
    },


    validateNewPremiseLicenseReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseFrm = activeTab.down('premisedetailsfrm'),

         //   screeningGrid = activeTab.down('productscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!premiseFrm.isValid()) {
            toastr.warning('Please Enter All the required Premise Details!!', 'Warning Response');
            return false;
        }
        this.saveNewPremiseLicenseReceivingBaseDetails(btn);
      /*  if (screeningGrid.getStore().getModifiedRecords().length > 0) {
            toastr.warning('There are unsaved screening data!!', 'Warning Response');
            return false;
        }
        */
        return true;
    },



    //Renewal
    showRenewalReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validatePremiseRenewalReceivingSubmission(btn),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            if(!hasQueries){
                if(!validateHasInvoice){
                    toastr.error('Response: Please generate Porforma Invoice Before submission of the License Application for payment Verification'); 
                    Ext.getBody().unmask();
                    return;
                }
                if(!validateHasDocuments){
                    toastr.error('Response: Please Upload the required documents to proceed.'); 
                    Ext.getBody().unmask();
                    return;
                }
            }
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validatePremiseRenewalReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            screeningGrid = activeTab.down('productscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!premiseFrm.isValid()) {
            toastr.warning('Please Enter All the required Premise Details!!', 'Warning Response');
            return false;
        }
        this.savePremiseRenewalReceivingBaseDetails(btn);
        if (screeningGrid.getStore().getModifiedRecords().length > 0) {
            toastr.warning('There are unsaved screening data!!', 'Warning Response');
            return false;
        }
        return true;
    },

    //Alteration
    showAlterationReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validatePremiseAlterationReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validatePremiseAlterationReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!premiseFrm.isValid()) {
            toastr.warning('Please Enter All the required Premise Details!!', 'Warning Response');
            return false;
        }
        this.savePremiseAlterationReceivingBaseDetails(btn);
        return true;
    },

    //Alteration
    showCancellationReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validatePremiseCancellationReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validatePremiseCancellationReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!premiseFrm.isValid()) {
            toastr.warning('Please Enter All the required Premise Details!!', 'Warning Response');
            return false;
        }
        this.savePremiseCancellationReceivingBaseDetails(btn);
        return true;
    },

    //Common/Reused
    showInvoicingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validatePremiseInvoicingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validatePremiseInvoicingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoiceDetailsGrid = activeTab.down('invoicingcostdetailsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!invoice_id) {
            toastr.warning('Please Save Invoice Details!!', 'Warning Response');
            return false;
        }
        if (invoiceDetailsGrid.getStore().data.length < 1) {
            toastr.warning('No Cost Elements Selected For Invoicing!!', 'Warning Response');
            return false;
        } else {
            this.saveNewPremiseInvoicingDetails(btn);
        }
        return true;
    },

    showPaymentApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validatePremisePaymentSubmission(),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validatePremisePaymentSubmission: function () {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            paymentDetailsGrid = activeTab.down('applicationpaymentsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            balance_str = activeTab.down('displayfield[name=running_balance]').getValue(),
            balance = balance_str.split("(")[0],
            bal_txt = balance.replace('-', ''),
            bal = balance.replace(',', '');
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (paymentDetailsGrid.getStore().getTotalCount() < 1) {
            toastr.warning('No Payment Details Captured!!', 'Warning Response');
            return false;
        }
        if (parseFloat(bal) < 0) {
            toastr.warning('The Application cannot be submitted until the applicant clears a balance of ' + bal_txt + '(Tsh)!!', 'Warning Response');
            return false;
        }
        return true;
    },
    showApprovalInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
             storeID = getApplicationStore(module_id, section_id,sub_module_id),
            table_name = getApplicationTable(module_id);

            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, storeID, '', '', 'selected');
            
    },

    validateManagerInspectionApplicationSubmission: function (btn) {
        var valid = true,
            saveInfo = this.saveInspectionDetails(btn);
        if (saveInfo == false || saveInfo === false) {
            valid = false;
        }
        return valid;
    },
    showPremisesInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            inspectorsGrid = activeTab.down('inspectioninspectorsgrid'),
            inspectorsStore = inspectorsGrid.getStore(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            storeID = getApplicationStore(module_id, section_id,sub_module_id),
            table_name = getApplicationTable(module_id),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
            leadInspectorDetails = inspectorsStore.findRecord('role_id', 1);
          //  alert(application_id)
        if (!leadInspectorDetails) {
            Ext.getBody().unmask();
            toastr.warning('No lead inspector found!!', 'Warning Response');
            return false;
        }
        var lead_inspector_id = leadInspectorDetails.get('inspector_id'),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id,
            }];
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, storeID, extraParams, '', 'selected');
    },
    showManagerInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            inspectorsGrid = activeTab.down('inspectioninspectorsgrid'),
            inspectorsStore = inspectorsGrid.getStore(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateManagerInspectionApplicationSubmission(btn),
            storeID = getApplicationStore(module_id, section_id,sub_module_id),
            table_name = getApplicationTable(module_id),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
            leadInspectorDetails = inspectorsStore.findRecord('role_id', 1);

        if (!leadInspectorDetails) {
            Ext.getBody().unmask();
            toastr.warning('No lead inspector found!!', 'Warning Response');
            return false;
        }
        
        var lead_inspector_id = leadInspectorDetails.get('inspector_id'),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id,
            }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, storeID, extraParams, '', 'selected');
        } else {
            Ext.getBody().unmask();
        }
    },

    validateManagerInspectionApplicationSubmission: function (btn) {
        var valid = true,
            saveInfo = this.saveInspectionDetails(btn);
        if (saveInfo == false || saveInfo === false) {
            valid = false;
        }
        return valid;
    },

    showInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            report_type_id = activeTab.down('hiddenfield[name=report_type_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = true,
            //storeID = getApplicationStore(module_id, section_id),
            storeID = btn.storeID,
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
        if(btn.isInspectionSubmit == 1){
                grid = activeTab.down('premiseinspectionscreeninggrid')
                store = grid.getStore();
                 for (var i = 0; i < store.data.items.length; i++) {
                    var record = store.data.items[i];

                    if (record.dirty) {
                        // toastr.warning('Please save inspection details!!', 'Warning Response');
                        // Ext.getBody().unmask();
                        // return false;
                    }
          }

        }

         if(hasQueries){
            Ext.getBody().unmask();
             toastr.error('Please Note the application has Open Query. Kindly use query process to submit the application!!', 'Warning Response');
            return false;
        }

        checklist_category_id = 3;
            if(activeTab.down('combo[name=applicable_checklist]') ){
                checklist_category_id = activeTab.down('combo[name=applicable_checklist]').getValue();
            }
           
            hasEvalUploadChecklist = checkApplicationChecklistUploadDetails(application_code, module_id,sub_module_id,section_id,checklist_category_id,workflow_stage_id);
            if(!hasEvalUploadChecklist){
                // toastr.warning('Fill in the Evaluation checklist details(for checklist based inspection) to proceed!!', 'Warning Response');
                // Ext.getBody().unmask();
                // return false;
               
            }

        var  validate_insprecom = validateInspectionReportSubmisson(application_code,report_type_id);
            if(!validate_insprecom){
                Ext.getBody().unmask();
                toastr.error('Please enter the Recommendation to proceed', 'Error Response');
                return false;
            }
        var workflowaction_type_id = 1;

        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            storeID = btn.storeID,
            action_url = btn.action_url,
            store = Ext.getStore(storeID),
            intrayStore = Ext.getStore('intraystr'),
            outtrayStore = Ext.getStore('outtraystr'),
            onlineapplicationdashboardgridstr= Ext.getStore('onlineapplicationdashboardgridstr');

            
            
        Ext.Ajax.request({
            url: 'workflow/getApplicationNextStageActionDetails',
            method: 'POST',
            params: {
                application_code:application_code,
                application_id:application_id,
                workflow_stage_id:workflow_stage_id,
                workflowaction_type_id:workflowaction_type_id,
                table_name : 'tra_premises_applications',
                module_id:module_id,
                sub_module_id:sub_module_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
               
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                    if (success == true || success === true) {
                        var results = resp.results,
                            curr_stage_id = results.stage_id,
                            action = results.action_id, 
                            next_stage = results.nextstage_id;
                          
                            
                        Ext.MessageBox.confirm('License Recommendation', 'Do you want to submit the Recommended Permit Application?', function (button) {
                            if (button === 'yes') {
                                Ext.getBody().mask('Submitting Application wait...');
                                Ext.Ajax.request({
                                    url: 'workflow/handleApplicationSubmission',
                                    method: 'POST',
                                    params: {
                                        application_code:application_code,
                                        application_id:application_id,
                                        process_id:process_id,
                                        workflowaction_type_id:workflowaction_type_id,
                                        table_name : 'tra_premises_applications',
                                        module_id:module_id,
                                        sub_module_id:sub_module_id,
                                        section_id:section_id,
                                        curr_stage_id:curr_stage_id,
                                        workflowaction_type_id:workflowaction_type_id,
                                        next_stage:next_stage,
                                        action:action
                                    },
                                    headers: {
                                        'Authorization': 'Bearer ' + access_token,
                                        'X-CSRF-Token': token
                                    },
                                    success: function (response) {
                                       
                                        var resp = Ext.JSON.decode(response.responseText),
                                            message = resp.message,
                                            success = resp.success;
                                            if (success == true || success === true) {
                                                toastr.success(message, "Success Response");
                                                //store.load();
                                                intrayStore.load();
                                                outtrayStore.load();
                                                externaluserintraystr = Ext.getStore('externaluserintraystr');
                                                externaluserintraystr.load();
                                                
                                                onlineapplicationdashboardgridstr.load();
                                                //win.close();
                                                closeActiveWindow() ;
                                                mainTabPanel.remove(activeTab);
                                                
                                            } Ext.getBody().unmask();
                                    },
                                    failure: function (response) {
                                                
                                                var resp = Ext.JSON.decode(response.responseText),
                                                    message = resp.message;
                                                toastr.error(message, 'Failure Response');
                                                Ext.getBody().unmask();
                                    }
                                });
                            }
                        })
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                Ext.getBody().unmask();
            },
            failure: function (response) {
                
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
                Ext.getBody().unmask();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                
            }
        });
    },

    showDrugShopInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            report_type_id = activeTab.down('hiddenfield[name=report_type_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
         
        if(btn.isInspectionSubmit == 1){
                grid = activeTab.down('drugshopinspectiongrid')
                store = grid.getStore();
                 for (var i = 0; i < store.data.items.length; i++) {
                    var record = store.data.items[i];

                    if (record.dirty) {
                        toastr.warning('Please save inspection details!!', 'Warning Response');
                        Ext.getBody().unmask();
                        return false;
                    }
          }

        }

        checklist_category_id = 3;
            if(activeTab.down('combo[name=applicable_checklist]') ){
                checklist_category_id = activeTab.down('combo[name=applicable_checklist]').getValue();
            }
           
            hasEvalUploadChecklist = checkApplicationChecklistUploadDetails(application_code, module_id,sub_module_id,section_id,checklist_category_id,workflow_stage_id);
            if(!hasEvalUploadChecklist){
                toastr.warning('Fill in the Evaluation checklist details(for checklist based inspection) to proceed!!', 'Warning Response');
                Ext.getBody().unmask();
                return false;
               
            }


         var  validate_insprecom = validateInspectionReportSubmisson(application_code,report_type_id);
            if(!validate_insprecom){
                Ext.getBody().unmask();
                toastr.error('Please Enter the Recommendation to proceed', 'Error Response');
                return false;
            }
        var isPopupSubmission = validateIsPopupSubmission(workflow_stage_id);

        if(!isPopupSubmission){
                this.directWorkflowSubmission(mainTabPanel,activeTab,table_name,application_code,application_id,workflow_stage_id,process_id,module_id,sub_module_id,section_id);
            }else{
               showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
            }
         
    },


    showEvaluationApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            hasRespondedUnclosedQueries = checkApplicationRespondedUnclosedQueries(application_code, module_id),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
        if (hasRespondedUnclosedQueries > 0) {
            Ext.getBody().unmask();
            toastr.warning('Please close responded queries to proceed!!', 'Warning Response');
            return false;
        }
        if (valid == true || valid === true) {
            showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsstrictrecommfrm', winWidth, storeID, 2, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },
    showPremisesSreeningApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            hasRespondedUnclosedQueries = checkApplicationRespondedUnclosedQueries(application_code, module_id),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
        if (hasRespondedUnclosedQueries > 0) {
            Ext.getBody().unmask();
            toastr.warning('Please close responded queries to proceed!!', 'Warning Response');
            return false;
        }
        var  validate_documentrecom = validateDocumentsSubmissonRecRecommendation(application_code);
        if(!hasQueries){
            if(!validate_documentrecom){
                Ext.getBody().unmask();
                toastr.warning('Please Enter The Application Documents Submission recommendation!!', 'Warning Response');
                return false;
            }
          }
        if (valid == true || valid === true) {
            showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsstrictrecommfrm', winWidth, storeID, 2, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },
    showAuditingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    showSingleApprovalsApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    showCommunicationsApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    showManagerQueryApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagerqueryfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    onInvoiceFeeTypeChange: function (cmbo, newVal) {
        var mainTabPanel = this.getMainTabPanel(),
            grid = cmbo.up('grid'),
            costCategoriesStore = grid.down('combo[name=cost_category_id]').getStore(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filter = {
                section_id: section_id,
                fee_type_id: newVal
            };
        filter = JSON.stringify(filter);
        costCategoriesStore.removeAll();
        costCategoriesStore.load({params: {filter: filter}});
        //costCategoriesStore.load({params: {section_id: section_id, fee_type_id: newVal}});
    },

    removeApplicationPaymentDetails: function (btn) {
        Ext.getBody().mask('Please wait...');
        var grid = btn.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            panel = activeTab.down('foodnewpaymentspnl'),
            running_balance = panel.down('displayfield[name=running_balance]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue(),
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            store = grid.getStore(),
            selected = [];
        Ext.each(records, function (record) {
            var id = record.get('id');
            if (id) {
                //var obj = {id: id};
                selected.push(id);
            }
        });
        Ext.MessageBox.confirm('Confirm', 'Are you sure to remove selected payment details?', function (button) {
            if (button === 'yes') {
                Ext.Ajax.request({
                    url: 'premiseregistration/removeApplicationPaymentDetails',
                    jsonData: selected,
                    params: {
                        application_id: application_id,
                        application_code: application_code,
                        invoice_id: invoice_id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message,
                            balance = resp.balance,
                            invoice_amount = resp.invoice_amount,
                            txt;
                        if (success == true || success === true) {
                            if (Math.abs(parseFloat(balance)) == parseFloat(invoice_amount) || Math.abs(parseFloat(balance)) === parseFloat(invoice_amount)) {
                                txt = ' (Not Paid)';
                            } else if (parseFloat(balance) > 0) {
                                txt = ' (Over-Paid)';
                            } else if (parseFloat(balance) < 0) {
                                txt = ' (Under-Paid)';
                            } else {
                                txt = ' (Cleared)';
                            }
                            running_balance.setValue(balance + txt);
                            store.load();
                            toastr.success(message, 'Success Response');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    saveApplicationAuditingChecklistDetails: function (btn) {
        btn.setLoading(true);
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            screeningGrid = activeTab.down('foodpremauditingcheckgrid'),
            checklist_type = screeningGrid.down('combo[name=applicable_checklist]').getValue(),
            store = screeningGrid.getStore(),
            params = [];
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items [i],
                checklist_item_id = record.get('id'),
                pass_status = record.get('pass_status'),
                comment = record.get('comment'),
                item_resp_id = record.get('item_resp_id'),
                auditor_comment = record.get('auditor_comment');
            var obj = {
                application_id: application_id,
                item_resp_id: item_resp_id,
                created_by: user_id,
                checklist_item_id: checklist_item_id,
                pass_status: pass_status,
                comment: comment,
                auditor_comment: auditor_comment
            };
            if (record.dirty) {
                params.push(obj);
            }
        }
        if (params.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
        params = JSON.stringify(params);
        Ext.Ajax.request({
            url: 'premiseregistration/saveNewAuditingChecklistDetails',
            params: {
                screening_details: params
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    store.load();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    showApplicationEvaluationTemplate: function (btn) {
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        child.down('hiddenfield[name=application_id]').setValue(application_id);
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        Ext.Ajax.request({
            url: 'premiseregistration/getApplicationEvaluationTemplate',
            method: 'GET',
            params: {
                application_id: application_id,
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    results = resp.results;
                if (success == true || success === true) {
                    if (results) {
                        child.down('hiddenfield[name=id]').setValue(results.id);
                        child.down('htmleditor[name=template]').setValue(results.template);
                    }
                    funcShowCustomizableWindow(winTitle, '', child, 'customizablewindow');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    getApplicationApprovalDetails: function (btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            table_name = btn.table_name,
            form = Ext.widget('approvalrecommendationfrm'),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        Ext.Ajax.request({
            method: 'GET',
            url: 'getApplicationApprovalDetails',
            params: {
                application_id: application_id,
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    results = resp.results,
                    model = Ext.create('Ext.data.Model', results);
                if (success == true || success === true) {
                    form.loadRecord(model);
                    form.down('hiddenfield[name=application_id]').setValue(application_id);
                    form.down('hiddenfield[name=application_code]').setValue(application_code);
                    form.down('hiddenfield[name=process_id]').setValue(process_id);
                    form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    funcShowOnlineCustomizableWindow('Recommendation', '50%', form, 'customizablewindow');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    saveOnlineApplicationDetails: function (bttn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            action_btn = activeTab.down('button[name=action]'),
            save_btn = activeTab.down('button[name=save_btn]'),
            submit_btn = activeTab.down('button[name=process_submission_btn]');
        Ext.MessageBox.confirm('Confirm', 'Are you sure to accept this application?', function (button) {
            if (button === 'yes') {
                Ext.MessageBox.show({
                    title: 'Remarks',
                    msg: 'Remarks/Coments:',
                    width: 320,
                    buttons: Ext.MessageBox.OKCANCEL,
                    multiline: true,
                    scope: this,
                    // fn: this.deactivateSystemUser(btn, me),
                    animateTarget: bttn,
                    fn: function (btn, text) {
                        var comment = text;
                        if (btn === 'ok') {
                            Ext.getBody().mask('Please wait...');
                            if (comment == '' || comment === '') {
                                Ext.getBody().unmask();
                                toastr.warning('Please Enter Remark!!', 'Warning Response');
                                return;
                            }
                            Ext.Ajax.request({
                                url: 'premiseregistration/saveOnlineApplicationDetails',
                                params: {
                                    application_id: application_id,
                                    comment: comment
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + access_token,
                                    'X-CSRF-Token': token
                                },
                                success: function (response) {
                                    Ext.getBody().unmask();
                                    var resp = Ext.JSON.decode(response.responseText),
                                        success = resp.success,
                                        message = resp.message,
                                        details = resp.details;
                                    if (success == true || success === true) {
                                        toastr.success(message, 'Success Response');
                                        me.fireEvent('rePrepareAppBaseDetails', details);
                                        action_btn.setVisible(false);
                                        save_btn.setVisible(true);
                                        submit_btn.setVisible(true);
                                    } else {
                                        toastr.error(message, 'Failure Response');
                                    }
                                },
                                failure: function (response) {
                                    Ext.getBody().unmask();
                                    var resp = Ext.JSON.decode(response.responseText),
                                        message = resp.message;
                                    toastr.error(message, 'Failure Response');
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    Ext.getBody().unmask();
                                    toastr.error('Error: ' + errorThrown, 'Error Response');
                                }
                            });
                        }
                    }
                });
            }
        });
    },

    rejectOnlineApplicationDetails: function (bttn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            store = Ext.getStore('onlinepremregistrationstr');
        Ext.MessageBox.confirm('Confirm', 'Are you sure to reject this application?', function (button) {
            if (button === 'yes') {
                Ext.MessageBox.show({
                    title: 'Remarks',
                    msg: 'Remarks/Coments:',
                    width: 320,
                    buttons: Ext.MessageBox.OKCANCEL,
                    multiline: true,
                    scope: this,
                    // fn: this.deactivateSystemUser(btn, me),
                    animateTarget: bttn,
                    fn: function (btn, text) {
                        var comment = text;
                        if (btn === 'ok') {
                            Ext.getBody().mask('Please wait...');
                            if (comment == '' || comment === '') {
                                Ext.getBody().unmask();
                                toastr.warning('Please Enter Remark!!', 'Warning Response');
                                return;
                            }
                            Ext.Ajax.request({
                                url: 'premiseregistration/rejectOnlineApplicationDetails',
                                params: {
                                    application_id: application_id,
                                    comment: comment
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + access_token,
                                    'X-CSRF-Token': token
                                },
                                success: function (response) {
                                    Ext.getBody().unmask();
                                    var resp = Ext.JSON.decode(response.responseText),
                                        success = resp.success,
                                        message = resp.message,
                                        details = resp.details;
                                    if (success == true || success === true) {
                                        toastr.success(message, 'Success Response');
                                        mainTabPanel.remove(activeTab);
                                        store.load();
                                    } else {
                                        toastr.error(message, 'Failure Response');
                                    }
                                },
                                failure: function (response) {
                                    Ext.getBody().unmask();
                                    var resp = Ext.JSON.decode(response.responseText),
                                        message = resp.message;
                                    toastr.error(message, 'Failure Response');
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    Ext.getBody().unmask();
                                    toastr.error('Error: ' + errorThrown, 'Error Response');
                                }
                            });
                        }
                    }
                });
            }
        });
    },

    showAddPremiseOtherDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            business_type_id = activeTab.down('combo[name=business_type_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            title = btn.winTitle,
            form = Ext.widget('premiseotherdetailsfrm'),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            filters = {section_id: section_id},
            filter = JSON.stringify(filters),
            busTypesStr = form.down('combo[name=business_type_id]').getStore();
        if (!application_id) {
            toastr.warning('Please save application first!!', 'Warning Response');
            return false;
        }
        if (!business_type_id) {
            toastr.warning('Please select business type first!!', 'Warning Response');
            return false;
        }
        form.down('hiddenfield[name=premise_id]').setValue(premise_id);
        form.down('combo[name=business_type_id]').setValue(business_type_id);
        busTypesStr.removeAll();
        busTypesStr.load({params: {filter: filter}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, '35%', form, 'customizablewindow');
    },

    showAddPremisePersonnelDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = btn.up('grid'),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            positionsStore = Ext.getStore('personnelpositionsstr');
        childObject.down('button[name=save_btn]').storeID = btn.storeID;
        childObject.down('button[name=save_btn]').action_url = btn.action_url;
        childObject.down('hiddenfield[name=premise_id]').setValue(premise_id);
        if (!application_id) {
            toastr.warning('Please save application first!!', 'Warning Response');
            return false;
        }
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        positionsStore.removeAll();
        positionsStore.load();
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    savePremiseNewReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue();
            premiseDetailsForm = activeTab.down('premisedetailsfrm');
        

            var premiseDetailsFrm = premiseDetailsForm.getForm();
           
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (premiseDetailsFrm.isValid()) {
            // if (!contactPersonFrm.isValid()) {
            //     toastr.warning('Please provide details of contact person!!', 'Warning Response');
            //     return false;
            // }
            premiseDetailsFrm.submit({
                url: 'premiseregistration/saveNewReceivingBaseDetails',
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id
                   // applicant_contact_person: applicant_contact_person,
                    // contact_person_id: contact_person_id,
                    // contact_person_startdate: contact_person_startdate,
                    // contact_person_enddate: contact_person_enddate
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        application_code = resp.application_code,
                        premise_id = resp.premise_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            premiseDetailsForm.down('hiddenfield[name=premise_id]').setValue(premise_id);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },


    saveNewPremiseLicenseReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            wizardPnl = btn.up('panel'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_id = wizardPnl.down('combo[name=zone_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue();
            premiseDetailsForm = activeTab.down('premisedetailsfrm');
            if (premiseDetailsForm) {
             premiseDetailsForm = activeTab.down('premisedetailsfrm');   
            }else{
            premiseDetailsForm =  activeTab.down('premisesinspectiondetailsfrm');   
            }
            premiseDetailsFrm = premiseDetailsForm.getForm();
            
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }

        //  if (!zone_id) {
        //     toastr.warning('Please select  Processing zone!!', 'Warning Response');
        //     return false;
        // }
        if (premiseDetailsFrm.isValid()) {
         
            premiseDetailsFrm.submit({
                url: 'premiseregistration/saveNewLicenseReceivingBaseDetails',
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id:zone_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        ref_no= resp.ref_no,
                        application_code = resp.application_code,
                        premise_id = resp.premise_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            premiseDetailsForm.down('hiddenfield[name=premise_id]').setValue(premise_id);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                            activeTab.down('button[name=search_PreInspection_Premise]').setVisible(false);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },


    savePremiseRenewalReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseDetailsForm = activeTab.down('premisedetailsfrm'),
            premiseDetailsFrm = premiseDetailsForm.getForm();
        if (premiseDetailsFrm.isValid()) {
            if (!applicant_id) {
                toastr.warning('Please select applicant!!', 'Warning Response');
                return false;
            }
            premiseDetailsFrm.submit({
                url: 'premiseregistration/saveRenewalAlterationReceivingBaseDetails',
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        application_code = resp.application_code,
                        premise_id = resp.premise_id,
                        temporal_premise_id = resp.temporal_premise_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            btn.setDisabled(true);
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            premiseDetailsForm.down('hiddenfield[name=premise_id]').setValue(premise_id);
                            premiseDetailsForm.down('hiddenfield[name=temporal_premise_id]').setValue(temporal_premise_id);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            premiseDetailsForm.down('button[action=search_premise]').setDisabled(true);
                            //zone_fld.setReadOnly(true);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },

    savePremiseAlterationReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseDetailsForm = activeTab.down('premisedetailsfrm'),
            premise_id = premiseDetailsForm.down('hiddenfield[name=premise_id]').getValue(),
            premiseDetailsFrm = premiseDetailsForm.getForm();
        if (!premise_id) {
            toastr.warning('Please select premise to alter!!', 'Warning Response');
            return false;
        }
        if (premiseDetailsFrm.isValid()) {
            if (!applicant_id) {
                toastr.warning('Please select applicant!!', 'Warning Response');
                return false;
            }
            premiseDetailsFrm.submit({
                url: 'premiseregistration/saveRenewalAlterationReceivingBaseDetails',
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        application_code = resp.application_code,
                        premise_id = resp.premise_id,
                        temporal_premise_id = resp.temporal_premise_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            premiseDetailsForm.down('hiddenfield[name=premise_id]').setValue(premise_id);
                            premiseDetailsForm.down('hiddenfield[name=temporal_premise_id]').setValue(temporal_premise_id);
                            premiseDetailsForm.down('button[action=search_premise]').setDisabled(true);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            btn.setText('Save Premise Main Details');
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },

    savePremiseCancellationReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseDetailsForm = activeTab.down('premisedetailsfrm'),
            premiseDetailsFrm = premiseDetailsForm.getForm();
        if (premiseDetailsFrm.isValid()) {
            if (!applicant_id) {
                toastr.warning('Please select applicant!!', 'Warning Response');
                return false;
            }
            premiseDetailsFrm.submit({
                url: 'premiseregistration/saveRenewalAlterationReceivingBaseDetails',
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        application_code = resp.application_code,
                        premise_id = resp.premise_id,
                        temporal_premise_id = resp.temporal_premise_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            //zone_fld.setReadOnly(true);
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            premiseDetailsForm.down('hiddenfield[name=premise_id]').setValue(premise_id);
                            premiseDetailsForm.down('hiddenfield[name=temporal_premise_id]').setValue(temporal_premise_id);
                            premiseDetailsForm.down('button[action=search_premise]').setDisabled(true);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            btn.setText('Save Premise Main Details');
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },

    updatePremiseApplicationDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            wizardPnl = btn.up('panel'),
            process_id = wizardPnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = wizardPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = wizardPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = wizardPnl.down('hiddenfield[name=section_id]').getValue(),
            zone_id = wizardPnl.down('combo[name=zone_id]').getValue(),
            workflow_stage_id = wizardPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = wizardPnl.down('hiddenfield[name=application_id]').getValue(),
            applicantDetailsForm = wizardPnl.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseDetailsForm = wizardPnl.down('premisedetailsfrm'),
            premiseDetailsFrm = premiseDetailsForm.getForm(),
            action_url = 'premiseregistration/saveRenewalAlterationReceivingBaseDetails';
        if (sub_module_id == 1 || sub_module_id === 1) {
            action_url = 'premiseregistration/saveNewReceivingBaseDetails';
        }
       /* if (!zone_id) {
            toastr.warning('Please select zone!!', 'Warning Response');
            return false;
        }
        */
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (premiseDetailsFrm.isValid()) {
            premiseDetailsFrm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },

    showApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        this.showApplicationMoreDetailsGeneric(application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
    },
   
    showApplicationMoreDetailsGeneric: function (application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this,
        wizardPnl = Ext.widget('premiseappmoredetailswizard'),
        applicantFrm = wizardPnl.down('applicantdetailsfrm'),
        premiseFrm = wizardPnl.down('premisedetailsfrm'),
        // contactFrm = wizardPnl.down('premisecontactpersonfrm'),
        personnelGrid = wizardPnl.down('premisepersonneldetailsgrid'),
        premisedirectorsdetailsgrid = wizardPnl.down('premisedirectorsdetailsgrid'),
        premisenearestpremisegrid = wizardPnl.down('premisenearestpremisegrid'),
        premisepersonneldetailsgrid = wizardPnl.down('premisepersonneldetailsgrid'),
        otherDetailsGrid = wizardPnl.down('premiseotherdetailswingrid');
        wizardPnl.setHeight(500);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
           // wizardPnl.down('button[name=save_btn]').setVisible(false);
        }
        wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
        wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
        personnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisedirectorsdetailsgrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisenearestpremisegrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisepersonneldetailsgrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
       
        //otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if(sub_module_id==89 || sub_module_id==89){
          premiseFrm.down('hiddenfield[name=isPreInspection]').setValue(1);
           if(wizardPnl.down('premisedirectorsdetailsgrid')){
                wizardPnl.down('premisedirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('premisepersonneldetailsgrid')){
                wizardPnl.down('premisepersonneldetailsgrid').destroy();
            }
        }

        premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premiseFrm.query('field').forEach(function(field) {
                    field.setReadOnly(true);
        });
        //contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisedirectorsdetailsgrid.setIsWin(1);
        premisenearestpremisegrid.setIsWin(1);
        personnelGrid.setIsWin(1);
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getPremApplicationMoreDetails',
            params: {
                application_id: application_id,
                premise_id: premise_id,
                applicant_id: applicant_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    applicantDetails = resp.applicant_details,
                    premiseDetails = resp.premise_details,
                    contactDetails = resp.contact_details;
                if (success == true || success === true) {
                    if (applicantDetails) {
                        var model1 = Ext.create('Ext.data.Model', applicantDetails);
                        applicantFrm.loadRecord(model1);
                    }
                    if (premiseDetails) {
                        var model2 = Ext.create('Ext.data.Model', premiseDetails);
                        premiseFrm.loadRecord(model2);
                    }
                   
                    funcShowOnlineCustomizableWindow('Preview Premises Details'+ref_no, '85%', wizardPnl, 'customizablewindow');
                    if (sub_module_id == 2 || sub_module_id === 2) {
                        if (isReadOnly < 1) {
                            
                            //personnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
                           // otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
                            me.fireEvent('formAuth', process_id, 1, premiseFrm);
                            me.fireEvent('otherPartsAuth', process_id, wizardPnl);
                        }
                    }
                    //add new panels 
                    //add the queries and documents and then set the details 
                    wizardPnl.add({xtype:'applicationqueriesgrid',title: 'Request for Additional Information(Queries)'});
                    queries_panel = wizardPnl.down('applicationqueriesgrid');
                    queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                    queries_panel.down('hiddenfield[name=module_id]').setValue(module_id);
                    queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);
                    
                   // documents_grid = Ext.widget('previewproductDocUploadsGrid');
                   //wizardPnl.add({xtype:'previewproductDocUploadsGrid',title: 'Application Uploaded Documents (All)'});


                    documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
                    documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
                    documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
                    documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
                    documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);

                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },
    showPremisesInspectionDetailsWizard:function (application_id, app_inspection_id, premise_id,applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
        var me = this,
                wizardPnl = Ext.widget('premisesinspectionprocesswizard');

            wizardPnl.setHeight(500);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            premisesinspectionrecommendationfrm = wizardPnl.down('premisesinspectionrecommendationfrm').getForm();
            legalityofstockprdfrm = wizardPnl.down('legalityofstockprdfrm').getForm();
            
           // app_check_types_store = wizardPnl.down('combo[name=applicable_checklist]').store;

            if (application_id) {
              /*  app_check_types_store.load({
                    params: {
                        process_id: process_id,
                        workflow_stage: workflow_stage_id
                    }
                });
                */
                if(wizardPnl.down('legalityofstockprdgrid')){
                    wizardPnl.down('legalityofstockprdgrid').down('hiddenfield[name=application_id]').setValue(application_id);
                }
                
                Ext.Ajax.request({
                    method: 'GET',
                    url: 'premiseregistration/getPremisesInspectionRecommendationDetails',
                    params: {
                        app_inspection_id: app_inspection_id,
                        premise_id: premise_id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message,
                            results = resp.results;
                        if (success == true || success === true) {
                            var model1 = Ext.create('Ext.data.Model', results);
                              
                            premisesinspectionrecommendationfrm.loadRecord(model1);
                            legalityofstockprdfrm.loadRecord(model1);
                            
                            funcShowCustomizableWindow(ref_no, '85%', wizardPnl, 'customizablewindow'); 
                            
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
                
            }
            Ext.getBody().unmask();
    },
    deleteApplicationInvoice: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoice_id_fld = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no = activeTab.down('displayfield[name=invoice_no]'),
            summaryStore = activeTab.down('invoicingcostdetailsgrid').getStore(),
            invoice_id = invoice_id_fld.getValue();
        if (!invoice_id) {
            toastr.warning('Nothing to delete, invoice details not saved yet!!', 'Warning Response');
            return false;
        }
        Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this invoice?', function (button) {
            if (button === 'yes') {
                Ext.getBody().mask('Please wait...');
                Ext.Ajax.request({
                    url: 'premiseregistration/deleteApplicationInvoice',
                    params: {
                        invoice_id: invoice_id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success == true || success === true) {
                            invoice_id_fld.setValue('');
                            invoice_no.setValue('****');
                            summaryStore.load();
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    showTraderPersonnel: function (btn) {
        var form = btn.up('form'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            tabPnl = form.up('tabpanel'),
            window = tabPnl.up('window'),
            childItem = Ext.widget(btn.childXtype);
        childItem.down('hiddenfield[name=trader_id]').setValue(applicant_id);
        tabPnl.hide();
        window.add(childItem);
    },

    showTraderPersonnelSelectionGrid: function (btn) {
        var form = btn.up('form'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            width = btn.winWidth,
            moreDetails = form.getMoreDetails(),
            personnel_type = form.down('hiddenfield[name=personnel_type]').getValue(),
            childItem = Ext.widget(btn.childXtype);
        childItem.setMoreDetails(moreDetails);
        childItem.down('hiddenfield[name=trader_id]').setValue(applicant_id);
        childItem.down('hiddenfield[name=personnel_type]').setValue(personnel_type);
        funcShowCustomizableWindow('Personnel', width, childItem, 'customizablewindow');
    },

    onTraderPersonnelItemdblclick: function (view, record) {
        var grid = view.grid,
            win = grid.up('window'),
            moreDetails = grid.getMoreDetails(),
            personnel_type = grid.down('hiddenfield[name=personnel_type]').getValue();
            var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            basicFrm;
            console.log(personnel_type);
        win.close();
        if (moreDetails == 1 || moreDetails === 1) {
            this.setContactPersonDetailsOnMoreDetailsWin(record);
        }
        if (personnel_type == 'contact_person'){
            basicFrm = activeTab.down('premisecontactpersonfrm');
            basicFrm.loadRecord(record);
        }else if (personnel_type == 'billing_person') {
            basicFrm = activeTab.down('billingdetailsfrm');
            basicFrm.loadRecord(record);
        }else if(personnel_type == 'gvp_billing_person'){
            basicFrm = activeTab.down('gvpbillingdetailsfrm');
            basicFrm.loadRecord(record);
        }else if (personnel_type == 'contract_manufacturing_person') {
            manSiteForm_dupli = Ext.ComponentQuery.query("#contractmanufacturingfrm")[0];
            basicFrm = activeTab.down('contractmanufacturingfrm');

            //Incase the duplicate exists we will use it instead
            if(manSiteForm_dupli){
                basicFrm = manSiteForm_dupli
            }
            basicFrm.loadRecord(record)
            basicFrm.down('hiddenfield[name=contract_person_id]').setValue(record.get('contact_person_id'));
            basicFrm.down('textfield[name=contract_personnel_name]').setValue(record.get('contact_name'));
            basicFrm.down('textfield[name=contract_telephone_no]').setValue(record.get('contact_telephone_no'));
            basicFrm.down('textfield[name=contract_email_address]').setValue(record.get('contact_email_address'));
        }
        else if (personnel_type == 'import_billing_person') {
            basicFrm = activeTab.down('importexportdetailsfrm');
            basicFrm.down('hiddenfield[name=contact_person_id]').setValue(record.get('contact_person_id'));
            basicFrm.down('textfield[name=billing_person]').setValue(record.get('contact_name'));
         
        }

         else {
            var anotherWin = Ext.WindowManager.getActive();
            if (anotherWin) {
                var form = anotherWin.down('form');
                form.loadRecord(record);
            }
        }
    },

    setContactPersonDetailsOnMoreDetailsWin: function (record) {
        var anotherWin = Ext.WindowManager.getActive();
        if (anotherWin) {
            var form = anotherWin.down('premisecontactpersonfrm');
            form.loadRecord(record);
        }
    },

    onManufacturerItemdblclick: function (view, record) {
        var grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            manufacturerFrm = activeTab.down('manufacturerdetailsfrm');
        manufacturerFrm.loadRecord(record);
        win.close();
    },

    showPreviousUploadedDocs: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            target_stage = btn.target_stage,
            static_stage = getPremiseRegModuleStaticStage(sub_module_id, section_id, target_stage);
        this.fireEvent('showPrevUploadedDocsWin', btn, section_id, module_id, sub_module_id, static_stage, application_code);
    },
    savePremisesInspectionDetails:function(btn){
            
        var mainTabPanel = this.getMainTabPanel(),
                activeTab = mainTabPanel.getActiveTab(),
                section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

                form = activeTab.down('form'),
                toaster = btn.toaster,
                frm = form.getForm();

            if (frm.isValid()) {
                
                frm.submit({
                    url: 'premiseregistration/savePremiseScheduleInspectionDetails',
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    params:{
                        section_id:section_id
                    },
                    waitMsg: 'Please wait...',
                    success: function (fm, action) {
                        var response = Ext.decode(action.response.responseText),
                            success = response.success,
                            message = response.message;
                          
                        if (success == true || success === true) {
                            record_id = response.record_id;
                            inspection_reference_no = response.inspection_reference_no;
                            form.down('hiddenfield[name=id]').setValue(record_id);
                            activeTab.down('displayfield[name=reference_no]').setValue(inspection_reference_no);
                                            
                            upload_grid = activeTab.down('unstructureddocumentuploadsgrid');
                            upload_grid.down('hiddenfield[name=reference_record_id]').setValue(record_id);
                                toastr.success(message, "Success Response");
                            
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (fm, action) {
                        var resp = action.result;
                        toastr.error(resp.message, 'Failure Response');
                    }
                });
            } else {
                toastr.warning('Fill all required fields!!', 'Warning Response');
                return false;
            }


    },

    saveInspectionDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            toaster = btn.toaster,
            frm = form.getForm(),
            applicationsGrid = btn.up('grid'),//activeTab.down('clinicaltrialmanagermeetinggrid'),
            sm = applicationsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            selected = [];

            
        Ext.each(selected_records, function (item) {
            application_code = item.data.application_code;
            premise_id = item.data.premise_id;
            
            obj = {
                application_code: application_code,
                premise_id: premise_id
            };
             selected.push(obj);
        });
        if (frm.isValid()) {
            if (!sm.hasSelection()) {
                toastr.warning('Please select at least one application!!', 'Warning Response');
                return false;
            }
            frm.submit({
                url: 'premiseregistration/savePremiseInspectionDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_code: application_code,
                    selected: JSON.stringify(selected),
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        form.down('hiddenfield[name=id]').setValue(record_id);
                        //applicationsStore.load();
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            return false;
        }
    },

    printInvoice: function (btn) {
        var report_type = btn.report_type,
            action_url = base_url + '/premiseregistration/getManagersReports?report_type=' + report_type,
            valid = this.validatePremiseInvoicingSubmission(btn);
        if (valid == true || valid === true) {
            print_report(action_url);
        }
    },

    showApplicantSelectionList: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);
            if (btn.applicantType == 'local') {
                childObject.applicantType = btn.applicantType;
            } else {
                childObject.applicantType = 'nonlocal';
            }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showPreInspectionDrugShopSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            childObject = Ext.widget(childXtype);
          funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showNewDrugShopSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            childObject = Ext.widget(childXtype);
          funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },



    showNearestDrugShopSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gmp_type_id = 0;

        var childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=gmp_type_id]').setValue(gmp_type_id);
        childObject.down('hiddenfield[name=is_nearest_premise]').setValue(1);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=premise_id]').setValue(premise_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },


    showPremiseSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gmp_type_id = 0;
        // if (module_id == 3 || module_id === 3) {//GMP
        //     if (sub_module_id == 5 || sub_module_id === 5) {//New
        //         gmp_type_id = activeTab.down('hiddenfield[name=gmp_type_id]').getValue();
        //     }
        //     if (sub_module_id == 6 || sub_module_id === 6) {//Renewal
        //         childXtype = 'mansitesselectiongrid';
        //     }
        // }

        var childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=gmp_type_id]').setValue(gmp_type_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },



    showNearestPremiseSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gmp_type_id = 0;

        var childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=gmp_type_id]').setValue(gmp_type_id);
        childObject.down('hiddenfield[name=is_nearest_premise]').setValue(1);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=premise_id]').setValue(premise_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },


    showInspectionNearestPremiseSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gmp_type_id = 0;

        var childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=gmp_type_id]').setValue(gmp_type_id);
        childObject.down('hiddenfield[name=is_inspection_nearest_premise]').setValue(1);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=premise_id]').setValue(premise_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },


     showInspectionNearestDrugShopSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gmp_type_id = 0;

        var childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=gmp_type_id]').setValue(gmp_type_id);
        childObject.down('hiddenfield[name=is_inspection_nearest_premise]').setValue(1);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=premise_id]').setValue(premise_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },



    showPremiseInspectionSelection:function(btn){
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            
            id = activeTab.down('hiddenfield[name=id]').getValue();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

        if(id != ''){
            var childObject = Ext.widget(childXtype);
            childObject.down('hiddenfield[name=section_id]').setValue(section_id);
            funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
        }
        else{

            toastr.warning('Please save Premises Inspection Details before Premises Selection!!', 'Warning Response');
        }
        

    },

    syncAlterationAmendmentFormParts: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = btn.up('grid'),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            form_id = grid.down('hiddenfield[name=form_id]').getValue(),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    target: grid,
                    msg: 'Please wait...'
                }
            );
        if (!application_id) {
            toastr.warning('Please initialize the application first!!', 'Warning Response');
            return false;
        }
        Ext.each(selected_records, function (item) {
            selected.push(item.data.id);
        });
        Ext.MessageBox.confirm('Confirm', 'You wont be able to deselect the synced records, are you sure to continue?', function (button) {
            if (button === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: 'premiseregistration/syncAlterationAmendmentFormParts',
                    params: {
                        selected: JSON.stringify(selected),
                        application_id: application_id,
                        application_code: application_code,
                        form_id: form_id
                    },
                    headers: {
                        'X-CSRF-Token': token,
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            toastr.success(message, 'Success Response!!');
                            grid.getStore().load();
                            me.fireEvent('altFormAuth', application_id, application_code, premiseFrm);
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mask.hide();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    syncAlterationAmendmentOtherParts: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = btn.up('grid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    target: grid,
                    msg: 'Please wait...'
                }
            );
        if (!application_id) {
            toastr.warning('Please initialize the application first!!', 'Warning Response');
            return false;
        }
        Ext.each(selected_records, function (item) {
            selected.push(item.data.id);
        });
        Ext.MessageBox.confirm('Confirm', 'You wont be able to deselect the synced records, are you sure to continue?', function (button) {
            if (button === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: 'premiseregistration/syncAlterationAmendmentOtherParts',
                    params: {
                        selected: JSON.stringify(selected),
                        application_id: application_id,
                        application_code: application_code
                    },
                    headers: {
                        'X-CSRF-Token': token,
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            toastr.success(message, 'Success Response!!');
                            grid.getStore().load();
                            me.alterationOtherPartsAuthentication(application_id, application_code);
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mask.hide();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    alterationOtherPartsAuthentication: function (application_id, application_code) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            premise_otherdetails = activeTab.down('premiseotherdetailsgrid'),
            premise_personneldetails = activeTab.down('premisepersonneldetailsgrid');
        Ext.Ajax.request({
            method: 'GET',
            url: 'workflow/getAlterationOtherPartsAuth',
            params: {
                application_id: application_id,
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results,
                    field;
                if (success == true || success === true) {
                    Ext.each(results, function (item) {
                        if (item.part_id == 2 || item.part_id === 2) {
                            premise_personneldetails.down('hiddenfield[name=isReadOnly]').setValue(0);
                            me.redoPremisePersonnelDetailsGrid(premise_personneldetails);
                        } else if (item.part_id == 3 || item.part_id === 3) {
                            premise_otherdetails.down('hiddenfield[name=isReadOnly]').setValue(0);
                            me.redoPremiseOtherDetailsGrid(premise_otherdetails);
                        } else {
                            premise_otherdetails.down('hiddenfield[name=isReadOnly]').setValue(1);
                            premise_personneldetails.down('hiddenfield[name=isReadOnly]').setValue(1);
                        }
                    });
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    redoPremiseOtherDetailsGrid: function (grid) {
        var isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            add_btn = grid.down('button[name=add_details]'),
            widgetCol = grid.columns[grid.columns.length - 1];
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            add_btn.setVisible(false);
            widgetCol.setHidden(true);
            widgetCol.widget.menu.items = [];
        } else {
            add_btn.setVisible(true);
            widgetCol.setHidden(false);
            widgetCol.widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                action: 'edit',
                childXtype: 'premiseotherdetailsfrm',
                winTitle: 'Premise Other Details',
                winWidth: '35%',
                handler: 'showEditPremiseRegParamWinFrm',
                stores: '[]'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                table_name: 'tra_premises_otherdetails',
                storeID: 'premiseotherdetailsstr',
                action_url: 'premiseregistration/deletePremiseRegRecord',
                action: 'actual_delete',
                handler: 'doDeletePremiseRegWidgetParam',
                hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
            }
            ];
        }
    },

    redoPremisePersonnelDetailsGrid: function (grid) {
        var isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            add_btn = grid.down('button[name=add_personnel]'),
            widgetCol = grid.columns[grid.columns.length - 1];
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            add_btn.setVisible(false);
            grid.columns[grid.columns.length - 1].widget.menu.items = [
                {
                    text: 'Personnel Details',
                    iconCls: 'x-fa fa-user',
                    winTitle: 'Premise Personnel Details',
                    childXtype: 'personneldetailstabpnl',
                    winWidth: '60%',
                    handler: 'showEditPremisePersonnelDetails',
                    stores: '[]'
                }];
        } else {
            add_btn.setVisible(true);
            widgetCol.widget.menu.items = [{
                text: 'Personnel Details',
                iconCls: 'x-fa fa-user',
                winTitle: 'Premise Personnel Details',
                childXtype: 'personneldetailstabpnl',
                winWidth: '60%',
                handler: 'showEditPremisePersonnelDetails',
                stores: '[]'
            }, {
                text: 'Remove',
                iconCls: 'x-fa fa-remove',
                table_name: 'tra_premises_personnel',
                storeID: 'premisepersonneldetailsstr',
                action_url: 'premiseregistration/deletePremiseRegRecord',
                action: 'actual_delete',
                handler: 'doDeletePremiseRegWidgetParam',
                hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
            }
            ];
        }
    },

    showEditPremisePersonnelDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            record = btn.getWidgetRecord(),
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            childItem = Ext.widget(item.childXtype),
            positionsStore = Ext.getStore('personnelpositionsstr'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (sub_module_id == 2 || sub_module_id === 2) {
            if (!application_id) {
                toastr.warning('Please save application first!!', 'Warning Response');
                return false;
            }
        }
        positionsStore.removeAll();
        positionsStore.load();
        childItem.loadRecord(record);
        childItem.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        childItem.down('button[name=save_btn]').storeID = item.storeID;
        childItem.down('button[name=save_btn]').action_url = item.action_url;
        funcShowCustomizableWindow(winTitle, winWidth, childItem, 'customizablewindow');
    },

    //CANCELLATION
    onPrevCardClickCancellation: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('cancelpremisereceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateCancellation(btn, wizardPnl, 'prev');
    },

    onNextCardClickCancellation: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('cancelpremisereceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateCancellation(btn, wizardPnl, 'next');
    },
    onPrevCardClick: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizard_pnl = btn.wizard_pnl,
            wizardPnl = activeTab.down(wizard_pnl);
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClick: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizard_pnl = btn.wizard_pnl,
            wizardPnl = activeTab.down(wizard_pnl);
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
    navigate: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 1 && (direction == 'next' || direction === 'next')) {
            if (!application_id) {
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            //wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            //wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 3) {
             wizardPanel.down('button[name=process_submission_btn]').setVisible(true);
            // wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            // wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },
    navigateCancellation: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 1 && (direction == 'next' || direction === 'next')) {
            if (!application_id) {
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            //wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            //wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 3) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigationCancellation: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('cancelpremisereceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 1) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            //wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 3) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    
    quickNavigation: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizard_pnl = btn.wizard_pnl,
            wizardPnl = activeTab.down(wizard_pnl),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 1) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            //wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
         if (step == 3) {
            wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
           
            wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
            wizardPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },


    showInspectionRecommendationDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype);
            Ext.getBody().mask('Please wait...');
            childObject.setHeight(450);
            if (arrayLength > 0) {
                me.fireEvent('refreshStores', storeArray);
            }
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/getInspectionDetails',
                params: {
                    application_id: application_id,
                    application_code: application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        success = resp.success,
                        message = resp.message,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                                inspection_frm = childObject.down('#premiseinspectionrecommfrm');
                                inspection_frm.loadRecord(model);
                        }
                        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
                        //add the Documetn Upload Options
                        var docTypesStr = childObject.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
    },preparePremiseManagerMeeting: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('premiseManagerMeetingGrid');
        this.preparePremiseMeetingDetailsGeneric(activeTab, applicationsGrid, 0);
    },
    preparePremiseMeetingDetailsGeneric: function (activeTab, applicationsGrid, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            meetingDetailsFrm = activeTab.down('form'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            participantsGrid = activeTab.down('premiseTcMeetingParticipantsGrid'),
            participantsStore = participantsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
        participantsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            meetingDetailsFrm.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
        }
        this.redoTcMeetingParticipantsGrid(participantsGrid);
        if (application_id) {
            applicationsStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/preparePremiseRegMeetingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premise_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            meetingDetailsFrm.loadRecord(model);
                        }
                        applicationsStore.load();
                        participantsStore.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    redoTcMeetingParticipantsGrid: function (grid) {
        var isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            add_btn = grid.down('button[name=add_participant]'),
            widgetCol = grid.columns[grid.columns.length - 1];
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            add_btn.setVisible(false);
            widgetCol.setHidden(true);
            widgetCol.widget.menu.items = [];
        } else {
            add_btn.setVisible(true);
            widgetCol.setHidden(false);
            widgetCol.widget.menu.items = [
                {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tc_meeting_participants',
                    storeID: 'premiseTcMeetingParticipantsStr',
                    action_url: 'premiseregistration/onDeletePremiseOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteProductRegWidgetParam',
                    
                }
            ];
        }
    },
     //save meeting details 
    saveTCMeetingDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            toaster = btn.toaster,
            frm = form.getForm(),
            applicationsGrid = activeTab.down('premiseManagerMeetingGrid'),
            sm = applicationsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicationsStore = activeTab.down('premiseManagerMeetingGrid').getStore(),
            selected = [];
        Ext.each(selected_records, function (item) {
            selected.push(item.data.application_code);
        });
        if (frm.isValid()) {
            if (!sm.hasSelection()) {
                toastr.warning('Please select at least one application!!', 'Warning Response');
                return false;
            }
            frm.submit({
                url: 'premiseregistration/saveTCMeetingDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_code: application_code,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    selected: JSON.stringify(selected),
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        form.down('hiddenfield[name=id]').setValue(record_id);
                        applicationsStore.load();
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            return false;
        }
    },
    managerMeetingRefreshGrid: function (me) {
        var store = me.store,
            table_name = me.table_name,
            strict_mode = me.strict_mode,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            meeting_id = activeTab.down('form').down('hiddenfield[name=id]').getValue();
            decision_id = 0;
            if(activeTab.down('combo[name=decision_id]')){
               var decision_id = activeTab.down('combo[name=decision_id]').getValue();

            }
            store.getProxy().extraParams = {
                table_name: table_name,
                workflow_stage_id: workflow_stage_id,
                meeting_id: meeting_id,
                decision_id:decision_id,
                strict_mode: strict_mode
            };
    },
    beforeManagerMeetingAppsGridDeselect: function (sel, record, index, eOpts) {
        var grid = sel.view.grid,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code1 = record.get('application_code'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (application_code1 == application_code) {
            /* toastr.warning('Action not allowed on this application!!', 'Warning Response');
             return false;*/
        }
    },
   
    preparePremiseRecommReview: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('premiseReviewTCMeetingGrid');
        this.preparePremiseMeetingDetailsGeneric(activeTab, applicationsGrid, 1);
    },
    preparePremiseRecommApproval: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('premiseReviewTCMeetingApprovalGrid');
        this.preparePremiseMeetingDetailsGeneric(activeTab, applicationsGrid, 1);
    },

    //New DrugShop
    onNewDrugShopRegApplication: function (sub_module_id, wrapper_xtype) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(wrapper_xtype),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id ='',
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);
        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }

        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
       
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.initialAppStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },

    saveDrugShopNewReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            wizardPnl = btn.up('panel'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_id = wizardPnl.down('combo[name=zone_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue();

            if(module_id==33 ||module_id===33){
                premiseDetailsForm = activeTab.down('siapremisedetailsfrm');
                if (premiseDetailsForm) {
                 premiseDetailsForm = activeTab.down('siapremisedetailsfrm');   
                }else{
                premiseDetailsForm =  activeTab.down('preinspectionsiapremisedetailsfrm');   
                }

            }else{
                premiseDetailsForm = activeTab.down('drugshopdetailsfrm');
                if (premiseDetailsForm) {
                 premiseDetailsForm = activeTab.down('drugshopdetailsfrm');   
                }else{
                premiseDetailsForm =  activeTab.down('preinspectiondrugshopdetailsfrm');   
                }
            }
            premiseDetailsFrm = premiseDetailsForm.getForm();
            
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }

        //  if (!zone_id) {
        //     toastr.warning('Please select  Processing zone!!', 'Warning Response');
        //     return false;
        // }
        if (premiseDetailsFrm.isValid()) {
         
            premiseDetailsFrm.submit({
                url: 'premiseregistration/saveNewReceivingBaseDetails',
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id:zone_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        application_code = resp.application_code,
                        premise_id = resp.premise_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            premiseDetailsForm.down('hiddenfield[name=premise_id]').setValue(premise_id);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },



     saveNewLicenseReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            wizardPnl = btn.up('panel'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_id = wizardPnl.down('combo[name=zone_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue();
            if (activeTab.down('drugshopdetailsfrm')) {
             premiseDetailsForm = activeTab.down('drugshopdetailsfrm');   
            }
            if (activeTab.down('preinspectiondrugshopdetailsfrm')) {
            premiseDetailsForm =  activeTab.down('preinspectiondrugshopdetailsfrm');   
            }

            if (activeTab.down('siapremisedetailsfrm')) {
            premiseDetailsForm =  activeTab.down('siapremisedetailsfrm');   
            }

            if (activeTab.down('preinspectionsiapremisedetailsfrm')) {
            premiseDetailsForm =  activeTab.down('preinspectionsiapremisedetailsfrm');   
            }

            premiseDetailsFrm = premiseDetailsForm.getForm();
            
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }

        //  if (!zone_id) {
        //     toastr.warning('Please select  Processing zone!!', 'Warning Response');
        //     return false;
        // }
        if (premiseDetailsFrm.isValid()) {
         
            premiseDetailsFrm.submit({
                url: 'premiseregistration/saveNewLicenseReceivingBaseDetails',
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id:zone_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        ref_no= resp.ref_no,
                        application_code = resp.application_code,
                        premise_id = resp.premise_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            premiseDetailsForm.down('hiddenfield[name=premise_id]').setValue(premise_id);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                            if(activeTab.down('button[name=search_PreInspection_Premise]')){
                             activeTab.down('button[name=search_PreInspection_Premise]').setVisible(false);   
                            }

                            if(activeTab.down('button[name=search_drugshop]')){
                             activeTab.down('button[name=search_drugshop]').setVisible(false);   
                            }
                            

                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },



    prepareNewDrugShopReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm');
            if (activeTab.down('drugshopdetailsfrm')) {
             premiseFrm = activeTab.down('drugshopdetailsfrm');  
            }

            if (activeTab.down('preinspectiondrugshopdetailsfrm')) {
            premiseFrm =  activeTab.down('preinspectiondrugshopdetailsfrm');   
            }

            if (activeTab.down('siapremisedetailsfrm')) {
            premiseFrm =  activeTab.down('siapremisedetailsfrm');   
            }

            if (activeTab.down('preinspectionsiapremisedetailsfrm')) {
            premiseFrm =  activeTab.down('preinspectionsiapremisedetailsfrm');   
            }
            var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            app_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            //applicantFrm.down('button[action=link_applicant]').setDisabled(true);  

           //activeTab.down('button[name=search_PreInspection_Premise]').setVisible(false);

            if(sub_module_id==96 || sub_module_id==96){
              premiseFrm.down('#location_fieldset').items.each(function(item) {
                if (item.isFormField) { // Check if the item is a form field (e.g., textfield, combo, etc.)
                    item.setReadOnly(true);
                }
            });
              premiseFrm.down('textfield[name=latitude]').setReadOnly(true);
              premiseFrm.down('textfield[name=longitude]').setReadOnly(true);
              premiseFrm.down('button[name=capture_location]').setVisible(false);
              
          }

         
        if (app_status_id == 8 || app_status_id === 8) {//manager raise query
            activeTab.down('button[name=manager_query]').setVisible(true);
        }
        if (app_status_id == 13 || app_status_id === 13) {//manager query response
            activeTab.down('button[name=manager_queryresp]').setVisible(true);
        }
        if (application_id) {
            //zone_fld.setReadOnly(true);
            //region_fld.setReadOnly(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewLicensePremiseReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);
                        }
                        
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


    preparePreInspectionDrugShopReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            app_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            

            if(module_id==33 || module_id===33){
               premiseFrm = activeTab.down('preinspectionsiapremisedetailsfrm'); 
           }else{
             premiseFrm = activeTab.down('preinspectiondrugshopdetailsfrm');
           }
           premiseFrm.down('hiddenfield[name=is_local]').setValue(1);
       /*
        app_check_types_store.removeAll();
        app_check_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        */

        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                section_id: section_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                workflow_stage: workflow_stage_id
            }
        });
        /* if (application_status_id == 4 || application_status_id === 4) {
             activeTab.down('button[name=queries_responses]').setVisible(true);
         }*/
        if (app_status_id == 8 || app_status_id === 8) {//manager raise query
            activeTab.down('button[name=manager_query]').setVisible(true);
        }
        if (app_status_id == 13 || app_status_id === 13) {//manager query response
            activeTab.down('button[name=manager_queryresp]').setVisible(true);
        }
        if (application_id) {
            //zone_fld.setReadOnly(true);
            //region_fld.setReadOnly(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);
                        }
                        
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


     //New
    showNewReceivingDrugShopApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = this.validateNewDrugShopReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
            var isPopupSubmission = validateIsPopupSubmission(workflow_stage_id);
        if (valid == true || valid === true) {
             if(!isPopupSubmission){
                this.directWorkflowSubmission(mainTabPanel,activeTab,table_name,application_code,application_id,workflow_stage_id,process_id,module_id,sub_module_id,section_id);
            }else{
               showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID, extraParams);//workflowsubmissionsfrm
            }
        } else {
            Ext.getBody().unmask();
        }
    },


     showNewLicenseReceivingDrugShopApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = this.validateNewLicenseDrugShopReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            validateHasInvoice = validateHasInvoiceGeneration(application_code,sub_module_id);
            validateHasDocuments = validateHasUploadedDocumentsDetils(application_code, module_id,sub_module_id,section_id,0,workflow_stage_id,process_id);
            if(!hasQueries){
                if(!validateHasInvoice){
                    toastr.error('Response: Please generate Porforma Invoice Before submission of the License Application for payment Verification'); 
                    Ext.getBody().unmask();
                    return;
                }
                // if(!validateHasDocuments){
                //     toastr.error('Response: Please Upload the required documents to proceed.'); 
                //     Ext.getBody().unmask();
                //     return;
                // }
            }
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];

             var isPopupSubmission = validateIsPopupSubmission(workflow_stage_id);


        if (valid == true || valid === true) {

             if(!isPopupSubmission){
                this.directWorkflowSubmission(mainTabPanel,activeTab,table_name,application_code,application_id,workflow_stage_id,process_id,module_id,sub_module_id,section_id);
            }else{
               showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID, extraParams);//workflowsubmissionsfrm
            }
            
        } else {
            Ext.getBody().unmask();
        }
    },
    directWorkflowSubmission: function (mainTabPanel,activeTab,table_name,application_code,application_id,workflow_stage_id,process_id,module_id,sub_module_id,section_id) {
         var workflowaction_type_id = 1, 
            intrayStore = Ext.getStore('intraystr'),
            outtrayStore = Ext.getStore('outtraystr'),
            onlineapplicationdashboardgridstr= Ext.getStore('onlineapplicationdashboardgridstr');  
          Ext.Ajax.request({
            url: 'workflow/getApplicationNextStageActionDetails',
            method: 'POST',
            params: {
                application_code:application_code,
                application_id:application_id,
                workflow_stage_id:workflow_stage_id,
                workflowaction_type_id:workflowaction_type_id,
                table_name : table_name,
                module_id:module_id,
                sub_module_id:sub_module_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
               
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                    if (success == true || success === true) {
                        var results = resp.results,
                            curr_stage_id = results.stage_id,
                            action = results.action_id, 
                            next_stage = results.nextstage_id;
                          
                         Ext.getBody().unmask();  
                        Ext.MessageBox.confirm('Application Submission', 'Do you want to submit selected Application(s)?', function (button) {
                            if (button === 'yes') {
                                Ext.getBody().mask('Submitting Application wait...');
                                Ext.Ajax.request({
                                    url: 'workflow/handleApplicationSubmission',
                                    method: 'POST',
                                    params: {
                                        application_code:application_code,
                                        application_id:application_id,
                                        process_id:process_id,
                                        workflowaction_type_id:workflowaction_type_id,
                                        table_name:table_name,
                                        module_id:module_id,
                                        sub_module_id:sub_module_id,
                                        section_id:section_id,
                                        curr_stage_id:curr_stage_id,
                                        workflowaction_type_id:workflowaction_type_id,
                                        next_stage:next_stage,
                                        action:action
                                    },
                                    headers: {
                                        'Authorization': 'Bearer ' + access_token,
                                        'X-CSRF-Token': token
                                    },
                                    success: function (response) {
                                       
                                        var resp = Ext.JSON.decode(response.responseText),
                                            message = resp.message,
                                            success = resp.success;
                                            if (success == true || success === true) {
                                                toastr.success(message, "Success Response");
                                                //store.load();
                                                intrayStore.load();
                                                outtrayStore.load();
                                                externaluserintraystr = Ext.getStore('externaluserintraystr');
                                                externaluserintraystr.load();
                                                //onlineapplicationdashboardgridstr.load();
                                                //win.close();
                                                closeActiveWindow() ;
                                                mainTabPanel.remove(activeTab);
                                                
                                            } Ext.getBody().unmask();
                                    },
                                    failure: function (response) {
                                                
                                                var resp = Ext.JSON.decode(response.responseText),
                                                    message = resp.message;
                                                toastr.error(message, 'Failure Response');
                                                Ext.getBody().unmask();
                                    }
                                });
                            }
                        })
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                Ext.getBody().unmask();
            },
            failure: function (response) {
                
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
                Ext.getBody().unmask();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                
            }
        });
    },

    validateNewDrugShopReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseFrm = activeTab.down('drugshopdetailsfrm');
            if(module_id==33 ||module_id===33){
                premiseFrm = activeTab.down('siapremisedetailsfrm');
                if (premiseFrm) {
                 premiseFrm = activeTab.down('siapremisedetailsfrm');   
                }else{
                premiseFrm =  activeTab.down('preinspectionsiapremisedetailsfrm');   
                }

            }else{
                premiseFrm = activeTab.down('drugshopdetailsfrm');
                if (premiseFrm) {
                 premiseFrm = activeTab.down('drugshopdetailsfrm');   
                }else{
                premiseFrm =  activeTab.down('preinspectiondrugshopdetailsfrm');   
                }
            }
         //   screeningGrid = activeTab.down('productscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!premiseFrm.isValid()) {
            toastr.warning('Please Enter All the required Premise Details!!', 'Warning Response');
            return false;
        }
        this.saveDrugShopNewReceivingBaseDetails(btn);
      /*  if (screeningGrid.getStore().getModifiedRecords().length > 0) {
            toastr.warning('There are unsaved screening data!!', 'Warning Response');
            return false;
        }
        */
        return true;
    },


    validateNewLicenseDrugShopReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue();
           
            if (activeTab.down('drugshopdetailsfrm')) {
             premiseFrm = activeTab.down('drugshopdetailsfrm');  
            }

            if (activeTab.down('preinspectiondrugshopdetailsfrm')) {
            premiseFrm =  activeTab.down('preinspectiondrugshopdetailsfrm');   
            }

            if (activeTab.down('siapremisedetailsfrm')) {
            premiseFrm =  activeTab.down('siapremisedetailsfrm');   
            }

            if (activeTab.down('preinspectionsiapremisedetailsfrm')) {
            premiseFrm =  activeTab.down('preinspectionsiapremisedetailsfrm');   
            }
         //   screeningGrid = activeTab.down('productscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!premiseFrm.isValid()) {
            toastr.warning('Please Enter All the required Premise Details!!', 'Warning Response');
            return false;
        }
        this.saveNewLicenseReceivingBaseDetails(btn);
      /*  if (screeningGrid.getStore().getModifiedRecords().length > 0) {
            toastr.warning('There are unsaved screening data!!', 'Warning Response');
            return false;
        }
        */
        return true;
    },

     showPreDrugShopApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        this.showPreDrugShopApplicationMoreDetailsGeneric(application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
    },
   
    showPreDrugShopApplicationMoreDetailsGeneric: function (application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        // console.log('wwwww');
        var me = this;

           if(module_id==33 || module_id===33){
            var wizardPnl = Ext.widget('presiapremiseappmoredetailswizard'),
            premiseFrm = wizardPnl.down('preinspectionsiapremisedetailsfrm');
           }else{
            var wizardPnl = Ext.widget('predrugshopappmoredetailswizard'),
            premiseFrm = wizardPnl.down('preinspectiondrugshopdetailsfrm');
           }
     
            var applicantFrm = wizardPnl.down('applicantdetailsfrm');
            
            //contactFrm = wizardPnl.down('premisecontactpersonfrm'),
           // personnelGrid = wizardPnl.down('premisepersonneldetailsgrid'),
           //otherDetailsGrid = wizardPnl.down('premiseotherdetailswingrid');
        wizardPnl.setHeight(500);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
           // wizardPnl.down('button[name=save_btn]').setVisible(false);
        }
        wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
        wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
        //personnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        //otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
             if(wizardPnl.down('drugshopdirectorsdetailsgrid')){
                wizardPnl.down('drugshopdirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('drugshopotherlicensesdetailsgrid')){
                wizardPnl.down('drugshopotherlicensesdetailsgrid').destroy();
            }
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }

        //personnelGrid.setIsWin(1);
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getPremApplicationMoreDetails',
            params: {
                application_id: application_id,
                premise_id: premise_id,
                applicant_id: applicant_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    applicantDetails = resp.applicant_details,
                    premiseDetails = resp.premise_details;
                    //contactDetails = resp.contact_details;
                if (success == true || success === true) {
                    if (applicantDetails) {
                        var model1 = Ext.create('Ext.data.Model', applicantDetails);
                        applicantFrm.loadRecord(model1);
                    }
                    if (premiseDetails) {
                        var model2 = Ext.create('Ext.data.Model', premiseDetails);
                        premiseFrm.loadRecord(model2);
                    }
                    
                    funcShowOnlineCustomizableWindow('Preview Premise Details'+ref_no, '95%', wizardPnl, 'customizablewindow');
                   
                    //add new panels 
                    //add the queries and documents and then set the details 
                    wizardPnl.add({xtype:'applicationqueriesgrid',title: 'Request for Additional Information(Queries)'});
                    queries_panel = wizardPnl.down('applicationqueriesgrid');
                    queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                    queries_panel.down('hiddenfield[name=module_id]').setValue(module_id);
                    queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);
                    
                   // documents_grid = Ext.widget('previewproductDocUploadsGrid');
                  // wizardPnl.add({xtype:'previewproductDocUploadsGrid',title: 'Application Uploaded Documents (All)'});

                    documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
                    documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
                    documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
                    documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
                    documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);

                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },




    showDrugShopApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        this.showDrugShopApplicationMoreDetailsGeneric(application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
    },
   
    showDrugShopApplicationMoreDetailsGeneric: function (application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this;

           if(module_id==33 || module_id===33){
            var wizardPnl = Ext.widget('siapremiseappmoredetailswizard'),
            premiseFrm = wizardPnl.down('siapremisedetailsfrm');
           }else{
            var wizardPnl = Ext.widget('drugshopappmoredetailswizard'),
            premiseFrm = wizardPnl.down('drugshopdetailsfrm');
           }
     
            var applicantFrm = wizardPnl.down('applicantdetailsfrm');
            //contactFrm = wizardPnl.down('premisecontactpersonfrm'),
           // personnelGrid = wizardPnl.down('premisepersonneldetailsgrid'),
           //otherDetailsGrid = wizardPnl.down('premiseotherdetailswingrid');
        wizardPnl.setHeight(500);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
           // wizardPnl.down('button[name=save_btn]').setVisible(false);
        }
        wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
        wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
        //personnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        //otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);

        //personnelGrid.setIsWin(1);
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getPremApplicationMoreDetails',
            params: {
                application_id: application_id,
                premise_id: premise_id,
                applicant_id: applicant_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    applicantDetails = resp.applicant_details,
                    premiseDetails = resp.premise_details;
                    //contactDetails = resp.contact_details;
                if (success == true || success === true) {
                    if (applicantDetails) {
                        var model1 = Ext.create('Ext.data.Model', applicantDetails);
                        applicantFrm.loadRecord(model1);
                    }
                    if (premiseDetails) {
                        var model2 = Ext.create('Ext.data.Model', premiseDetails);
                        premiseFrm.loadRecord(model2);
                    }
                    
                    funcShowOnlineCustomizableWindow('Preview Premises Details'+ref_no, '95%', wizardPnl, 'customizablewindow');
                   
                    //add new panels 
                    //add the queries and documents and then set the details 
                    wizardPnl.add({xtype:'applicationqueriesgrid',title: 'Request for Additional Information(Queries)'});
                    queries_panel = wizardPnl.down('applicationqueriesgrid');
                    queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                    queries_panel.down('hiddenfield[name=module_id]').setValue(module_id);
                    queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);
                    
                   // documents_grid = Ext.widget('previewproductDocUploadsGrid');
                  // wizardPnl.add({xtype:'previewproductDocUploadsGrid',title: 'Application Uploaded Documents (All)'});

                    documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
                    documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
                    documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
                    documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
                    documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);

                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    prepareNewDrugShopEvaluation: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('drugshopappmoredetailswizard'),
            applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            premiseFrm = wizardPnl.down('drugshopdetailsfrm');
            // contactFrm = wizardPnl.down('premisecontactpersonfrm'),
            // personnelGrid = wizardPnl.down('premisepersonneldetailsgrid'),
            // otherDetailsGrid = wizardPnl.down('premiseotherdetailswingrid'); 
            isReadOnly = 0;
            var process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            //otherDetailsFrm = activeTab.down('form'),
         //   applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
           // premise_details = otherDetailsFrm.down('displayfield[name=premise_details]');
            //map details 
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=save_btn]').setVisible(false);
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
           // personnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            //otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            //contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            //end 
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                        if (module_id == 2 || module_id === 2) {
                          //  premise_details.setVisible(true);
                           // premise_details.setValue(results.premise_details);
                        }

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                        // if (contactDetails) {
                        //     var model3 = Ext.create('Ext.data.Model', contactDetails);
                        //     contactFrm.loadRecord(model3);
                        // }
                                               
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

       prepareDrugShopPremiseInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            if(module_id==33 || module_id===33){
               var wizardPnl = activeTab.down('siapremiseappmoredetailswizard'),
               premiseFrm = wizardPnl.down('siapremisedetailsfrm');
            }else{
              var wizardPnl = activeTab.down('drugshopappmoredetailswizard'),
              premiseFrm = wizardPnl.down('drugshopdetailsfrm');
            }
            
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }

           // if(sub_module_id==97 || sub_module_id==97){
           //  premiseFrm.down('#director_fieldset').setVisible(false);
           // }

            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 

          
            
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications',

                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;

                    ;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {

                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                             
                        }
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);
                            if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }
                    
                           //inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                           //inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', premiseDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                             if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }

                           // inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                           // inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.loadRecord(model5);
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


    prepareDrugShopInspectorDrugs: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            if(module_id==33 || module_id===33){
               var wizardPnl = activeTab.down('siapremiseappmoredetailswizard'),
               premiseFrm = wizardPnl.down('siapremisedetailsfrm');
            }else{
              var wizardPnl = activeTab.down('drugshopappmoredetailswizard'),
              premiseFrm = wizardPnl.down('drugshopdetailsfrm');
            }
            
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
           // activeTab.down('button[name=preview_report_btn]').setHidden(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            wizardPnl.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }

            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 

             console.log(sub_module_id);
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseDistrictEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;

                         console.log(inspectionDetails);
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);
                              if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                console.log(sub_module_id);
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }
                            
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                             inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                           //inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').validate();
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                              if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                console.log(sub_module_id);
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }





                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            //inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').validate();
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                            // activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);
                            inspection_frm.loadRecord(model5);
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareDrugShopRegionalInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            if(module_id==33 || module_id===33){
               var wizardPnl = activeTab.down('siapremiseappmoredetailswizard'),
               premiseFrm = wizardPnl.down('siapremisedetailsfrm');
            }else{
              var wizardPnl = activeTab.down('drugshopappmoredetailswizard'),
              premiseFrm = wizardPnl.down('drugshopdetailsfrm');
            }
            
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
           // activeTab.down('button[name=preview_report_btn]').setHidden(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            wizardPnl.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }

            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 

             console.log(sub_module_id);
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseRegionalEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;

                         console.log(inspectionDetails);
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);
                              if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                console.log(sub_module_id);
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }
                            
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                             inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                             inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                           //inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').validate();
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                              if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                console.log(sub_module_id);
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }





                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            //inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').validate();
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                            // activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);
                            inspection_frm.loadRecord(model5);
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


    prepareDrugShopLeadInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            if(module_id==33 || module_id===33){
               var wizardPnl = activeTab.down('siapremiseappmoredetailswizard'),
               premiseFrm = wizardPnl.down('siapremisedetailsfrm');
            }else{
              var wizardPnl = activeTab.down('drugshopappmoredetailswizard'),
              premiseFrm = wizardPnl.down('drugshopdetailsfrm');
            }
            
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            //activeTab.down('button[name=preview_report_btn]').setHidden(false);
            //activeTab.down('button[name=regional_inspector_report_btn]').setHidden(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            wizardPnl.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }


            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseLeadEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);
                            if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                        
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }

                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);

                             inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);

                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                            //inspection_frm.down('combo[name=recommendation_id]').setFieldLabel('Chief Regional Inspector Recommendation');
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                              if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                console.log(sub_module_id);
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }

                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                              inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);

                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);


                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);

                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                            //inspection_frm.down('combo[name=recommendation_id]').setFieldLabel('Chief Regional Inspector Recommendation');
                            inspection_frm.loadRecord(model5);
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


    preparePreDrugShopPremiseInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            if(module_id==33 || module_id===33){
               var wizardPnl = activeTab.down('presiapremiseappmoredetailswizard'),
               premiseFrm = wizardPnl.down('preinspectionsiapremisedetailsfrm');
            }else{
              var wizardPnl = activeTab.down('predrugshopappmoredetailswizard'),
              premiseFrm = wizardPnl.down('preinspectiondrugshopdetailsfrm');
            }
            
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            wizardPnl.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }

            if(wizardPnl.down('drugshopdirectorsdetailsgrid')){
                wizardPnl.down('drugshopdirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('drugshopotherlicensesdetailsgrid')){
                wizardPnl.down('drugshopotherlicensesdetailsgrid').destroy();
            }

            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications',

                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {

                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                             
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);
                               if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                               }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
            
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }
                             if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                            //inspection_frm.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            //inspection_frm.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);

                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', premiseDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model5);
                            if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }

                             if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }                            //inspection_frm.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                           // inspection_frm.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


    preparePreDrugShopRegionalInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('predrugshopappmoredetailswizard');
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            if(module_id==33 || module_id===33){
               var wizardPnl = activeTab.down('presiapremiseappmoredetailswizard'),
               premiseFrm = wizardPnl.down('preinspectionsiapremisedetailsfrm');
            }else{
              var wizardPnl = activeTab.down('predrugshopappmoredetailswizard'),
              premiseFrm = wizardPnl.down('preinspectiondrugshopdetailsfrm');
            }
            
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
           // activeTab.down('button[name=preview_report_btn]').setHidden(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);

            wizardPnl.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }
             if(wizardPnl.down('drugshopdirectorsdetailsgrid')){
                wizardPnl.down('drugshopdirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('drugshopotherlicensesdetailsgrid')){
                wizardPnl.down('drugshopotherlicensesdetailsgrid').destroy();
            }


            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseRegionalEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);
                            if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }


                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').validate();
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);

                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);


                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);

                            inspection_frm.down('button[name=capture_location]').setVisible(false);


                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                              if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                console.log(sub_module_id);
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }


                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                           // inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').validate();

                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);
                            inspection_frm.loadRecord(model5);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                           
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


    preparePreDrugShopInspectorDrugs: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('predrugshopappmoredetailswizard');
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            if(module_id==33 || module_id===33){
               var wizardPnl = activeTab.down('presiapremiseappmoredetailswizard'),
               premiseFrm = wizardPnl.down('preinspectionsiapremisedetailsfrm');
            }else{
              var wizardPnl = activeTab.down('predrugshopappmoredetailswizard'),
              premiseFrm = wizardPnl.down('preinspectiondrugshopdetailsfrm');
            }
            
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
           // activeTab.down('button[name=preview_report_btn]').setHidden(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);

            wizardPnl.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }
             if(wizardPnl.down('drugshopdirectorsdetailsgrid')){
                wizardPnl.down('drugshopdirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('drugshopotherlicensesdetailsgrid')){
                wizardPnl.down('drugshopotherlicensesdetailsgrid').destroy();
            }


            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseDistrictEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);
                            if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }


                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').validate();
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);

                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);

                            inspection_frm.down('button[name=capture_location]').setVisible(false);


                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                              if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                console.log(sub_module_id);
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }


                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                           // inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').validate();
                            inspection_frm.loadRecord(model5);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                           
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },


    getBatchApplicationInspectionDetails:function(btn){
        //Ext.getBody().mask('Please wait...');
        var me = this,
            grid = btn.up('grid'),
            table_name = btn.table_name,
            approval_frm = btn.approval_frm,
            form = Ext.widget(approval_frm),
            storeArray = eval(btn.stores),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(), 
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(), 
            arrayLength = storeArray.length,
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected= [],
            selected_appIds= [];


             Ext.each(selected_records, function (item) {
                selected.push(item.data.application_code);
                selected_appIds.push(item.data.active_application_id);
            });

        form.setController('premiseregistrationvctr');
        // if (arrayLength > 0) {
        //     me.fireEvent('refreshStores', storeArray);
        // }
        var selected = JSON.stringify(selected);
        var selected_appIds = JSON.stringify(selected_appIds);
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        form.down('hiddenfield[name=process_id]').setValue(process_id);
        form.down('hiddenfield[name=selected_appIds]').setValue(selected_appIds);
        form.down('hiddenfield[name=selected_appcodes]').setValue(selected);
        form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        funcShowCustomizableWindow('Recommendation', '50%', form, 'customizablewindow');
    },



    getBatPremisechApplicationApprovalDetails:function(btn){
        //Ext.getBody().mask('Please wait...');
        var me = this,
            grid = btn.up('grid'),
            table_name = btn.table_name,
            approval_frm = btn.approval_frm,
            form = Ext.widget(approval_frm),
            storeArray = eval(btn.stores),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(), 
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(), 
            arrayLength = storeArray.length,
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected= [],
            selected_appIds= [];


             Ext.each(selected_records, function (item) {
                selected.push(item.data.application_code);
                selected_appIds.push(item.data.active_application_id);
            });

        form.setController('premiseregistrationvctr');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        var selected = JSON.stringify(selected);
        var selected_appIds = JSON.stringify(selected_appIds);
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        form.down('hiddenfield[name=process_id]').setValue(process_id);
        form.down('hiddenfield[name=selected_appIds]').setValue(selected_appIds);
        form.down('hiddenfield[name=selected_appcodes]').setValue(selected);
        form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        funcShowCustomizableWindow('Recommendation', '40%', form, 'customizablewindow');
    },




    showPreDrugShopApplicationInpectionMoreDetailsGeneric: function (application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
         Ext.getBody().mask('Please wait...');
           var me = this,
            wizardPnl = Ext.widget('predrugshopainspectionppmoredetailswizard'),
            applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            premiseFrm = wizardPnl.down('preinspectiondrugshopdetailsfrm'),
            isReadOnly = 1;
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=active_application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=active_application_code]').setValue(application_code);

            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            wizardPnl.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
             if(wizardPnl.down('drugshopdirectorsdetailsgrid')){
                wizardPnl.down('drugshopdirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('drugshopotherlicensesdetailsgrid')){
                wizardPnl.down('drugshopotherlicensesdetailsgrid').destroy();
            }
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }

        
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseLeadEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        wizardPnl.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        wizardPnl.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }

                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = wizardPnl.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);
                              if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }
                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);


                            inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);


                            //inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_preminsprecommendation]').setVisible(false);
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(false);
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                            inspection_frm.down('button[name=capture_location]').setVisible(false);

                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = wizardPnl.down('drugshopinspectionfrm');
                            if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }


                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);

                             inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);

                           // inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                           // inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();
                            inspection_frm.loadRecord(model5);
                            inspection_frm.down('button[name=btn_preminsprecommendation]').setVisible(false);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                            


                        wizardPnl.add(5, {title: 'Request for Additional Information(Queries)', xtype: 'applicationqueriesgrid'});
                        queries_panel = wizardPnl.down('applicationqueriesgrid');
                        queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                        queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                        queries_panel.down('hiddenfield[name=module_id]').setValue(module_id);
                        queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                        queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);

                       
                        funcShowOnlineCustomizableWindow('Preview Drug Shop Details'+ref_no, '95%', wizardPnl, 'customizablewindow');
                        
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                   }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },



     showDrugShopApplicationInpectionMoreDetailsGeneric: function (application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
         Ext.getBody().mask('Please wait...');
           var me = this,
            wizardPnl = Ext.widget('drugshopainspectionppmoredetailswizard'),
            applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            premiseFrm = wizardPnl.down('drugshopdetailsfrm'),
            isReadOnly = 1;
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=active_application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=active_application_code]').setValue(application_code);

            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            wizardPnl.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }

            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseLeadEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        wizardPnl.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        wizardPnl.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = wizardPnl.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);

                            if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }

                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                             }
                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);

                             inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_preminsprecommendation]').setVisible(false);
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(false);
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = wizardPnl.down('drugshopinspectionfrm');
                              if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }
                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);

                             inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);
                           // inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            inspection_frm.down('textarea[name=state_of_walls]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_roof]').setReadOnly(true);
                            inspection_frm.down('textarea[name=state_of_floor]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_nature]').setReadOnly(true);
                           // inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();
                            inspection_frm.loadRecord(model5);
                            inspection_frm.down('button[name=btn_preminsprecommendation]').setVisible(false);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                        }
                        wizardPnl.add(5, {title: 'Request for Additional Information(Queries)', xtype: 'applicationqueriesgrid'});
                        queries_panel = wizardPnl.down('applicationqueriesgrid');
                        queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                        queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                        queries_panel.down('hiddenfield[name=module_id]').setValue(module_id);
                        queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                        queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);

                       
                        funcShowOnlineCustomizableWindow('Preview Drug Shop Details'+ref_no, '95%', wizardPnl, 'customizablewindow');
                     
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },



    preparePreDrugShopLeadInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            if(module_id==33 || module_id===33){
               var wizardPnl = activeTab.down('presiapremiseappmoredetailswizard'),
               premiseFrm = wizardPnl.down('preinspectionsiapremisedetailsfrm');
            }else{
              var wizardPnl = activeTab.down('predrugshopappmoredetailswizard'),
              premiseFrm = wizardPnl.down('preinspectiondrugshopdetailsfrm');
            }
            
            var applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            isReadOnly = 1,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            //activeTab.down('button[name=preview_report_btn]').setHidden(false);
            //activeTab.down('button[name=regional_inspector_report_btn]').setHidden(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            applicantFrm.down('button[action=link_applicant]').setDisabled(true);
            wizardPnl.down('nearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('nearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopdirectorsdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            wizardPnl.down('drugshopotherlicensesdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                wizardPnl.down('button[name=updatedrugshopapplications]').setVisible(false);
            }
             if(wizardPnl.down('drugshopdirectorsdetailsgrid')){
                wizardPnl.down('drugshopdirectorsdetailsgrid').destroy();
            }
            if(wizardPnl.down('drugshopotherlicensesdetailsgrid')){
                wizardPnl.down('drugshopotherlicensesdetailsgrid').destroy();
            }

            if(activeTab.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = activeTab.down('combo[name=applicable_checklist]'),
              checklistTypesStr = checklistTypesGrid.getStore();
              checklistTypesStr.removeAll();
              checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
            }
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            wizardPnl.down('combo[name=application_region_id]').setReadOnly(true);
            
            premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
           // contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            
            documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
            documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
            documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
            documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
            documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
            //end 
            
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseLeadEvaluationStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_premises_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        applicantDetails = resp.applicant_details,
                        premiseDetails = resp.premise_details,
                        inspectionDetails = resp.inspection_details;
                        previousinspectionDetails = resp.previous_inspection_details;
                        //contactDetails = resp.contact_details;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                       

                        if (applicantDetails) {
                            var model1 = Ext.create('Ext.data.Model', applicantDetails);
                            applicantFrm.loadRecord(model1);
                        }
                        if (premiseDetails) {
                            var model2 = Ext.create('Ext.data.Model', premiseDetails);
                            premiseFrm.loadRecord(model2);
                        }
                       
                        if(inspectionDetails){
                            var model4 = Ext.create('Ext.data.Model', inspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            inspection_frm.loadRecord(model4);
                            if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                console.log(sub_module_id);
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }
                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                         
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);

                             inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);
                            //inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                        

                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();
                             //activeTab.down('button[name=btn_print_inspection_report]').setVisible(false);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                        }

                        if(!inspectionDetails){
                            var model5 = Ext.create('Ext.data.Model', previousinspectionDetails);
                            inspection_frm = activeTab.down('drugshopinspectionfrm');
                            if(module_id==33 || module_id===33){
                                if(inspection_frm.down('fieldcontainer[name=nearest_drugshop]')){
                                   inspection_frm.down('fieldcontainer[name=nearest_drugshop]').setVisible(false);
                                }
                             }
                              if(sub_module_id==96 ||sub_module_id===96 || sub_module_id==110 || sub_module_id===110 ||sub_module_id==120 ||sub_module_id===120 || sub_module_id==121 || sub_module_id===121){
                                console.log(sub_module_id);
                                inspection_frm.down('textarea[name=state_of_walls]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_walls]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_roof]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_roof]').setVisible(false);
                                inspection_frm.down('textarea[name=state_of_floor]').allowBlank = true;
                                inspection_frm.down('textarea[name=state_of_floor]').setVisible(false);
                                inspection_frm.down('textarea[name=premise_nature]').allowBlank = true;
                                inspection_frm.down('textarea[name=premise_nature]').setVisible(false);
                                inspection_frm.down('fieldcontainer[name=new_room]').setVisible(false);

                                inspection_frm.down('textfield[name=premise_latitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_latitude]').setVisible(false);
                                inspection_frm.down('textfield[name=premise_longitude]').allowBlank = true;
                                inspection_frm.down('textfield[name=premise_longitude]').setVisible(false);

                                inspection_frm.down('textarea[name=proposed_changes]').allowBlank = true;
                                inspection_frm.down('textarea[name=proposed_changes]').setVisible(false);
                                inspection_frm.down('button[name=capture_location]').setVisible(false);
                             }

                            inspection_frm.down('fieldset[name=regional_inspector]').setVisible(true);
                            inspection_frm.down('fieldset[name=inspector_drugs]').setVisible(true);
                            inspection_frm.down('combo[name=recommendation_id]').setReadOnly(true);
                            inspection_frm.down('combo[name=inspection_type_id]').setReadOnly(true);
                            inspection_frm.down('datefield[name=actual_start_date]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=remarks]').setReadOnly(true);
                            inspection_frm.down('fieldset[name=chiefregional_inspector]').setVisible(true);
                            inspection_frm.down('combo[name=regional_inspector_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=regional_inspector_remarks]').setReadOnly(true);


                             inspection_frm.down('combo[name=inspector_drugs_recommendation_id]').setReadOnly(true);
                            inspection_frm.down('htmleditor[name=Inspector_drugs_remarks]').setReadOnly(true);
                           // inspection_frm.down('textarea[name=system_in_use_descption]').setReadOnly(true);
                            inspection_frm.down('combo[name=recomendation_reason_id]').setReadOnly(true);
                            inspection_frm.down('button[name=btn_addrecommendation]').setDisabled(true);
                            //inspection_frm.down('textarea[name=premise_state]').setReadOnly(true);
                            inspection_frm.down('textarea[name=premise_size]').setReadOnly(true);
                            inspection_frm.down('textarea[name=proposed_changes]').setReadOnly(true);
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').allowBlank = false;
                            inspection_frm.down('combo[name=chiefregional_inspector_recommendation_id]').validate();
                            inspection_frm.loadRecord(model5);
                            inspection_frm.down('premiseinspectornearestpremisegrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('premiseinspectornearestdrugshopgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
                            inspection_frm.down('button[name=new_room]').setVisible(false);
                            inspection_frm.down('widgetcolumn[name=room_actions]').setVisible(false);
                            inspection_frm.down('button[name=capture_location]').setVisible(false);
                        }

                       
                        
                        var docTypesStr = activeTab.down('combo[name=applicable_documents]').getStore();
                        docTypesStr.removeAll();
                        docTypesStr.load({
                            params: {
                                section_id: section_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                workflow_stage: workflow_stage_id
                            }
                        });
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },




    previewDrugShopsOnlineApplication: function (view, record) {
        var grid = view.grid,
            isRejection = grid.isRejection,
            isReadOnly = grid.isReadOnly,
            status_id = record.get('application_status_id'),
            status_type_id = record.get('status_type_id'),
            status_name = record.get('application_status'),
            tracking_no = record.get('tracking_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            application_status_id = record.get('application_status_id'),
            is_manager_query = record.get('is_manager_query'),
            onlinePanelXtype,
            wizardPnlXtype;
        if (sub_module_id == 3 || sub_module_id === 3) {//Alteration
            onlinePanelXtype = 'altpremiseonlinepreviewpnl';
            wizardPnlXtype = 'altpremiseonlinepreviewwizard'
        } else if (sub_module_id == 4 || sub_module_id === 4) {//Withdrawal
            onlinePanelXtype = 'cancelpremiseonlinepreviewpnl';
            wizardPnlXtype = 'cancelpremiseonlinepreviewwizard'
        }else if(sub_module_id == 2) {//New, Renewal
            onlinePanelXtype = 'renewalpremiseonlinepreviewpnl';
            wizardPnlXtype = 'renewalpremiseonlinepreviewwizard'
        } else {//New, Renewal
            onlinePanelXtype = 'predrugshoponlinepreviewpnl'; 
            wizardPnlXtype = 'newdrugshoponlinepreviewwizard'
        }
        var onlinePanel = Ext.widget(onlinePanelXtype),
            wizardPnl = onlinePanel.down(wizardPnlXtype),
            docsGrid = onlinePanel.down('premregonlinedocuploadsgenericgrid'),
            premisePersonnelGrid = wizardPnl.down('premisepersonneldetailsgrid');

        if (status_id == 23 && isRejection != 1) {
            toastr.warning('Action not allowed for application in this status [' + status_name + '] ', 'Warning Response');
            return false;
        }
        if (isRejection == 1) {
            wizardPnl.down('button[name=prev_rejections]').setVisible(true);
            wizardPnl.down('button[name=actions]').setVisible(true);
            wizardPnl.down('button[name=submit_btn]').setVisible(false);
            wizardPnl.down('button[name=query_btn]').setVisible(false);
            wizardPnl.down('button[name=reject_btn]').setVisible(false);
        }

        if(sub_module_id==97 || sub_module_id===97){

         if(wizardPnl.down('drugshopdirectorsdetailsgrid')){
                wizardPnl.down('drugshopdirectorsdetailsgrid').destroy();
            }
         if(wizardPnl.down('drugshopotherlicensesdetailsgrid')){
                wizardPnl.down('drugshopotherlicensesdetailsgrid').destroy();
            }

        }

        /* if (is_manager_query == 1 || is_manager_query === 1) {
             wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
         }*/
        if (status_type_id == 2 || status_type_id === 2 || status_type_id == 3 || status_type_id === 3) {//pre checking and manager query response
           // wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
        }
        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        onlinePanel.down('premisedetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if(onlinePanel.down('hiddenfield[name=is_manager_query]')){

            onlinePanel.down('hiddenfield[name=is_manager_query]').setValue(is_manager_query);
          
        }
        if(onlinePanel.down('hiddenfield[name=status_type_id]')){
            onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
       
        }
        premisePersonnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisePersonnelGrid.setIsWin(1);
        premisePersonnelGrid.setIsOnline(1);
        //wizardPnl.down('premisecontactpersonfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        funcShowCustomizableWindow(tracking_no, '80%', onlinePanel, 'customizablewindow');
    },


     prepareNewPremiseOnlinePreview: function (pnl) {
        var me = this,
            applicantFrm = pnl.down('applicantdetailsfrm'),
            premiseFrm = pnl.down('premisedetailsfrm'),
            //contactPersonFrm = pnl.down('premisecontactpersonfrm'),
            //superintendentFrm = pnl.down('premisesuperintendentfrm'),
            application_id = pnl.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue();
            mask = new Ext.LoadMask({
                target: pnl,
                msg: 'Please wait...'
            });
             mask.show();
        if(pnl.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore();
           
        checklistTypesStr.removeAll();
        checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});

        }
          
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewOnlineReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        contactPersonDetails = resp.contactPersonDetails,
                        superintendentDetails = resp.superintendentDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            //pnl.down('combo[name=zone_id]').setValue(results.zone_id);
                            pnl.down('displayfield[name=application_status]').setValue(results.app_status);
                            pnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                            pnl.down('displayfield[name=process_name]').setValue(results.process_name);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);
                        }

                        // if (contactPersonDetails) {
                        //     var model1 = Ext.create('Ext.data.Model', contactPersonDetails);
                        //     contactPersonFrm.loadRecord(model1);
                        // }
                        // if (superintendentDetails) {
                        //     var model2 = Ext.create('Ext.data.Model', superintendentDetails);
                        //     superintendentFrm.loadRecord(model2);
                        // }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            mask.hide();
            //It's a new application
        }
    },


});