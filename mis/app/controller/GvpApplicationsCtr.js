/**
 * Created by Kip on 12/14/2018.
 */
Ext.define('Admin.controller.GvpApplicationsCtr', {
    extend: 'Ext.app.Controller',

    stores: [
        'Admin.store.gvpApplications.GvpAppGridAbstractStore',
        'Admin.store.gvpApplications.GvpAppComboAbstractStore',
        'Admin.store.gvpApplications.FoodGvpApplicationsStr',
        'Admin.store.gvpApplications.DrugsGvpApplicationsStr',
        'Admin.store.gvpApplications.CosmeticsGvpApplicationsStr',
        'Admin.store.gvpApplications.MedDevicesGvpApplicationsStr',
        'Admin.store.gvpApplications.GvpProductLinesStr',
        'Admin.store.gvpApplications.GvpProductLineCategoriesStr',
        'Admin.store.gvpApplications.GvpProductLineDescriptionsStr',
        'Admin.store.gvpApplications.GvpProductLineRecommendationStr',
        'Admin.store.gvpApplications.GvpProductLineStatusStr',
        'Admin.store.gvpApplications.GvpPersonnelDetailsOnlineStr',
        'Admin.store.gvpApplications.GvpOtherDetailsOnlineStr',
        'Admin.store.gvpApplications.OnlineProductLineDetailsStr',
        'Admin.store.BetaLactamSstr',
        'Admin.store.GvpProductTypeStr'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        },{
            ref: 'gvpltrfrm',
            selector: 'gvpltrfrm'
            
        },{
            ref: 'gvpsiteappmoredetailswizard',
            selector: '#gvpsiteappmoredetailswizard'
        }],
        control: {
            //NEW
            'newgvpreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
            'gvpcontractmanufacturingfrm button[name=save_btn]': {
                click: 'saveContractManufacturerDetails'
            },
            'newgvpreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },
            'newgvpreceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            //RENEW
            'renewgvpreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClickRenewal'
            },
            'renewgvpreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClickRenewal'
            },
            'renewgvpreceivingwizard button[action=quickNav]': {
                click: 'quickNavigationRenewal'
            },
            //CANCELLATION
            'cancelgvpreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClickCancellation'
            },
            'cancelgvpreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClickCancellation'
            },
            'cancelgvpreceivingwizard button[action=quickNav]': {
                click: 'quickNavigationCancellation'
            },
            //ALTERATION
            'altgvpreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClickAlteration'
            },
            'altgvpreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClickAlteration'
            },
            'altgvpreceivingwizard button[action=quickNav]': {
                click: 'quickNavigationAlteration'
            },
            'GVPOnlineAssessmentfrm button[name=save_assessement_btn]': {
                click: 'saveGVPOnlineAssessmentdetails'
            },

            'gvpcontractmanufactureractivitygrid button[action=add]':{
                click: 'showGVPContractManufacturerApplicationWin',
            },
            'gvpsitedetailstabpnl': {
                beforetabchange: 'beforeManSiteTabChange'
            },
            //todo: Prepare main interfaces
            //SHARED

            'gvpinvoicing': {
                afterrender: 'prepareNewGvpInvoicing'
            },
            'gvppayments': {
                afterrender: 'prepareNewGvpPayments'
            },
            'newgvppaymentspanel': {
                afterrender: 'prepareNewGvpPayments'
            },
            'newgvppayments': {
                afterrender: 'prepareNewGvpPayments'
            },
            'newgvpinspectionscheduling': {
                afterrender: "prepareNewGvpInspectionCategorization"
            },
            'gvpsmfuploads': {
                afterrender: 'prepareNewGvpSmfUploads'
            },
            'gvpdeskreviewuploads': {
                afterrender: 'prepareNewGvpSmfUploads'
            },
            'altgvpevaluation': {
                afterrender: 'prepareNewGvpSmfUploads'
            },
            'gvpdeskreviewscheduling': {
                afterrender: 'prepareNewGvpDeskReviewScheduling'
            },
            'gvpmanagerinspection': {
                afterrender: 'prepareNewGvpManagerInspection'
            },
            'newgvpprovisionalinspection': {
                afterrender: 'prepareNewProvisionalGvpInspection'
            },
            'gvpinspection': {
                afterrender: 'prepareNewGvpInspection'
            },
            'gvpscreeningpanel': {
                afterrender: 'prepareNewGvpScreening'
            },
            
            'gvpdeskreviewprocess': {
                afterrender: 'prepareNewGvpInspection'
            },
            'gvptcmeetingscheduling': {
                afterrender: 'prepareNewGvpTCMeetingScheduling'
            },
            'gvptcmeetingrecommendation': {
                afterrender: 'prepareNewGvpTCRecommendation'
            },

            'gvpgprcmeetingrecommendation': {
                afterrender: 'prepareNewGvpGPRCRecommendation'
            },


            'gvpdeskreviewmanagerrecommendation': {
                afterrender: 'prepareNewGvpGPRCRecommendation'
            },


            'gvpapprovals': {
                afterrender: 'prepareNewGvpMainApprovals'
            },
            'newgvpconditionalapprovals': {
                afterrender: 'prepareNewGvpMainApprovals'
            },
            
            'singlegvpapproval': {
                afterrender: 'prepareNewGvpSingleApproval'
            },


            'singledeskreviewgvpapproval': {
                afterrender: 'prepareNewGvpSingleApproval'
            },


            //NEW
            'newgvpreceiving': {
                afterrender: 'prepareNewGvpReceiving'
            },
            //RENEWAL
            'renewgvpreceiving': {
                afterrender: 'prepareRenewGvpReceiving'
            },
            //CANCELLATION
            'cancelgvpreceiving': {
                afterrender: 'prepareCancellationGvpReceiving'
            },
            //ALTERATION
            'altgvpreceiving': {
                afterrender: 'prepareCancellationGvpReceiving'
            },
            //ONLINE
            'newgvponlinepreviewpnl': {
                afterrender: 'prepareNewGvpOnlinePreview'
            },
            'cancelgvponlinepreviewpnl': {
                afterrender: 'prepareNewGvpOnlinePreview'
            },
            'altgvponlinepreviewpnl': {
                afterrender: 'prepareNewGvpOnlinePreview'
            },
            //COMPARE DETAILS
            'gvpcomparepanel': {
                afterrender: 'prepareGvpComparePreview'
            },
            //end
            'newgvpreceivingwizard button[name=save_btn]': {//new
                click: 'saveGvpNewReceivingBaseDetails'
            },
            'renewgvpreceivingwizard button[name=save_btn]': {//renewal
                click: 'saveGvpRenewalReceivingBaseDetails'
            },
            'cancelgvpreceivingwizard button[name=save_btn]': {//withdrawal
                click: 'saveGvpRenewalReceivingBaseDetails'
            },
            'altgvpreceivingwizard button[name=save_btn]': {//alteration
                click: 'saveGvpRenewalReceivingBaseDetails'
            },
            'foodgvptb button[name=foodGvpHomeBtn]': {
                click: 'gvpApplicationsHome'
            },
            'drugsgvptb button[name=drugsGvpHomeBtn]': {
                click: 'gvpApplicationsHome'
            },
            'cosmeticsgvptb button[name=cosmeticsGvpHomeBtn]': {
                click: 'gvpApplicationsHome'
            },
            'meddevicesgvptb button[name=meddevicesGvpHomeBtn]': {
                click: 'gvpApplicationsHome'
            },
            'foodgvpgrid': {
                refresh: 'refreshGvpApplicationsMainGrids'
            },
            'drugsgvpgrid': {
                refresh: 'refreshGvpApplicationsMainGrids'
            },
            'cosmeticsgvpgrid': {
                refresh: 'refreshGvpApplicationsMainGrids'
            },
            'meddevicesgvpgrid': {
                refresh: 'refreshGvpApplicationsMainGrids'
            }, 'searchinspectionschedulesgrid': {
                refresh: 'refreshsearchinspectionschedulesgrid'
            },
            'gvpcontractmanufactureractivitygrid': {
                refresh: 'refreshgvpcontractmanufactureractivitygrid'
            },
            // 'gvpspreadsheetview': {
            //     refresh: 'refreshgvpspreadsheetview'
            // },
            'gvpnewmanagerreviewgrid': {
                refresh: 'refreshManagerReviewGrid'
            },
            'gvpinspectionreportsreviewgrid': {
                refresh: 'refreshManagerReviewGrid'
            },



            
            'gvpltrfrm button[action=link_ltr]': {
                click: 'showLTRSelectionList'
            },

           'gvpltrselectiongrid': {
                itemdblclick: 'onLTRselectionListDblClick'
            },

            'gvpinspectionscheduleteamfrm button[action=search_inspectionteam]': {
                click: 'showSearch_inspectionteam'
            },
            'ltrselectiongrid': {
                itemdblclick: 'onLTRSelectionListDblClick'
            },
            'searchinspectionschedulesgrid': {
                itemdblclick: 'onsearchinspectionschedulesgridDblClick'
            },
            'gvpmansitepersonneldetailsgrid button[action=add_personnel]': {
                click: 'showAddSitePersonnelDetails'
            },
            'gvpmansitepersonneldetailswingrid button[action=add_personnel_win]': {
                click: 'showAddSitePersonnelDetailsWin'
            },
            'gvpmansiteotherdetailsgrid button[action=add_details]': {
                click: 'showAddSiteOtherDetails'
            },
            'gvpmansiteotherdetailsgrid button[action=add_details_win]': {
                click: 'showAddSiteOtherDetailsWin'
            },
            
            'gvpproductlinedetailsinspectiongrid button[name=add_line]': {
                click: 'showAddGvpProductLineDetails'
            },

            'gvpproductLineDetailsaddgrid button[name=add_line]': {
                click: 'showAddProductLine'
            },


            'gvpmdproductLineDetailsaddgrid button[name=add_line]': {
                click: 'showAddProductLine'
            },


            'gvpmansiteblockdetailsgrid button[name=add_block]': {
                click: 'showAddGvpBlockWinFrm'
            },

            '#localgvpinspectionfrm button[name=btn_addrecommendation]': {
                click: 'funcAddPremiseApplicationParamter'
            },

            'localgvpinspectionfrm button[name=new_room]': {
                click: 'showAddOtherDetailsPremiseForm'
            },

            'gvpnoncomplianceobservationsgrid button[name=add_observation]': {
                click: 'showAddGvpNonComplianceDetails'
            },

            'gvpnoncomplianceobservationswingrid button[name=add_observation]': {
                click: 'showAddGvpNonComplianceDetails'
            },

            
            'gvpinspectionpanel button[name=non_compliance]': {
                click: 'showAddGvpNonComplianceDetails'
            },


            'newsinglegvpapprovalpanel button[name=non_compliance]': {
                click: 'showAddGvpNonComplianceDetails'
            },


            'newsingledeskreviewgvpapprovalpanel button[name=non_compliance]': {
                click: 'showAddGvpNonComplianceDetails'
            },

             'gvpgprcmeetingrecommendationpanel button[name=non_compliance]': {
                click: 'showAddGvpNonComplianceDetails'
            },
            
            'gvpdeskreviewmanagerrecommendationpanel button[name=non_compliance]': {
                click: 'showAddGvpNonComplianceDetails'
            },

            //Submission SHARED
            'gvpsmfuploadspanel button[name=process_submission_btn]': {
                click: 'showSmfUploadsApplicationSubmissionWin'
            },
            'gvpdeskreviewuploadspanel button[name=process_submission_btn]': {
                click: 'showSmfUploadsApplicationSubmissionWin'
            },
            'gvpinspectionschedulingphysicalgrid button[action=process_submission_btn]': {
                click: 'showInspectionSchedulingApplicationSubmissionWin'
            },
            'gvpinspectionschedulingdeskreviewgrid button[action=process_submission_btn]': {
                click: 'showInspectionSchedulingApplicationSubmissionWin'
            },
            'gvpdeskreviewschedulinggrid button[action=process_submission_btn]': {
                click: 'showGvpDeskReviewSchedulingApplicationSubmissionWin'
            },
            'gvpmanagerinspectiongrid button[action=process_submission_btn]': {
                click: 'showManagerInspectionApplicationSubmissionWin'
            },
            'gvpinspectionpanel button[name=process_submission_btn]': {
                click: 'showInspectionApplicationSubmissionWin'
            },
            'gvpscreeningpanel button[name=process_submission_btn]': {
                click: 'showScreeningApplicationSubmissionWin'
            },
            
             'gvpdeskreviewprocesspanel button[name=process_submission_btn]': {
                click: 'showDeskReviewInspectionApplicationSubmissionWin'
            },


            'gvpprovisionalinspectionpanel button[name=process_submission_btn]': {
                click: 'showInspectionApplicationSubmissionWin'
            },
            
            'gvpmeetingschedulinggrid button[action=process_submission_btn]': {
                click: 'showTCMeetingSchedulingApplicationSubmissionWin'
            },
            'gvptcmeetingrecommendationgrid button[action=process_submission_btn]': {
                click: 'showTCMeetingReviewgApplicationSubmissionWin'
            },
            'gvpgprcmeetingrecommendationpanel button[name=process_submission_btn]': {
                click: 'showTCMeetingRecommendationApplicationSubmissionWin'
            },

             'gvpdeskreviewmanagerrecommendationpanel button[name=process_submission_btn]': {
                click: 'showTCMeetingRecommendationApplicationSubmissionWin'
            },


            
            'singlegvpapprovalpanel button[name=process_submission_btn]': {
                click: 'showSingleApprovalApplicationSubmissionWin'
            },

            'singledeskreviewgvpapprovalpanel button[name=process_submission_btn]': {
                click: 'showSingleApprovalApplicationSubmissionWin'
            },

            'gvpmanagerquerygrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'gvpmanagerprecheckingquerygrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'gvpmanagerqueryresponsegrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'gvpcommunicationsgrid button[action=process_submission_btn]': {
                click: 'showCommunicationsApplicationSubmissionWin'
            },
            //Submission NEW
            'newgvpreceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewReceivingApplicationSubmissionWin'
            },
            //Submission RENEW
            'renewgvpreceivingwizard button[name=process_submission_btn]': {
                click: 'showRenewReceivingApplicationSubmissionWin'
            },
            //Submission CANCELLATION
            'cancelgvpreceivingwizard button[name=process_submission_btn]': {
                click: 'showRenewReceivingApplicationSubmissionWin'
            },
            'gvpbillingdetailsfrm button[action=link_personnel]': {
                click: 'showTraderPersonnelSelectionGrid'
            },

             'contractmanufacturingfrm button[action=link_personnel]': {
                click: 'showContractPersonnelSelectionGrid'
            },


            
            //Submission ALTERATION
            'altgvpreceivingwizard button[name=process_submission_btn]': {
                click: 'showRenewReceivingApplicationSubmissionWin'
            },
            //end
            'newgvpinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'newgvppaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'gvpsmfuploadspanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'gvpdeskreviewuploadspanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'gvpdeskreviewprocesspanel button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },

             'gvpdeskreviewmanagerrecommendationpanel button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },


            'gvpscreeningpanel button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },

            'gvpinspectionpanel button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            
            'gvpdeskreviewmanagerrecommendationpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            
            'gvpdeskreviewprocesspanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'gvptcmeetingrecommendationpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'gvpgprcmeetingrecommendationpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },

            'gvpdeskreviewmangerrecommendationpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },


            'singlegvpapprovalpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },




             'singledeskreviewgvpapprovalpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },

            'renewgvpinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },

             'gvpdeskreviewmangerrecommendationpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },


            'altgvpinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'renewgvppaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'altgvppaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'gvpevaluationpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },
            'gvpprovisionalinspectionpanel form toolbar button[name=more_app_details]': {
                click: 'showGvpApplicationMoreDetails'
            },         
            'gvpsiteappmoredetailswizard button[name=save_btn]': {//late updates...Inspection and Com with Applicants
                click: 'updateGvpApplicationDetails'
            },
            'gvpsiteappmoredetailsaltwizard button[name=save_btn]': {//late updates...Inspection and Com with Applicants
                click: 'updateGvpApplicationDetails'
            },
            'newgvpinspectionpanel button[name=inspection_schedule]': {
                click: 'showGvpInspectionSchedulesBtn'
            },
            'renewgvpinspectionpanel button[name=inspection_schedule]': {
                click: 'showGvpInspectionSchedulesBtn'
            },
            'gvpproductslinkagedetailsgrid button[action=search_product]': {
                click: 'showProductsSelectionList'
            },
            'gvpproductslinkagedetailswingrid button[action=search_product]': {
                click: 'showProductsSelectionListWin'
            },
            'gvpsitedetailsfrm button[action=search_site]': {
                click: 'showGvpSitesSelectionList'
            },
            'gvpcontractmanufacturingfrm button[name=search_site]': {
                click: 'showContractManufacturingSitesSelectionList'
            },
            'gvpsitedetailsfrm button[name=search_site]': {
                click: 'showGvpSitesSelectionList'
            },
            'gvpsitesselectiongrid': {
                itemdblclick: 'onManufacturingSiteSelectionListDblClick'
            },
            'gvpinspectionschedulingphysicalgrid button[name=inspection_schedule]': {
                click: 'showGvpInspectionSchedules'
            },
            'gvpinspectionschedulingphysicalgrid button[name=assign_schedule]': {
                click: 'showGvpInspectionSchedules'
            },
            'gvpinspectionscheduleselectiongrid button[name=sync_btn]': {
                click: 'addGvpApplicationIntoInspectionSchedule'
            },
            'gvpmeetingschedulinggrid button[name=save_btn]': {
                click: 'saveTCMeetingDetails'
            },
            'newsinglegvpapprovalpanel button[name=show_recommendation]': {
                click: 'getApplicationApprovalDetails'
            },

            'newsingledeskreviewgvpapprovalpanel button[name=show_recommendation]': {
                click: 'getApplicationApprovalDetails'
            },


            'gvpdeskreviewschedulinggrid button[name=save_btn]': {
                click: 'saveDeskReviewScheduleDetails'
            },
            'newgvpdeskreviewschedulingpanel button[name=add_btn]': {
                click: 'showAddInspectionOtherDetails'
            },
            'gvpmanagerinspectionpanel button[name=add_btn]': {
                click: 'showAddInspectionOtherDetails'
            },
            'newgvpdeskreviewprocesspanel button[name=prev_uploads]': {
                click: 'showPreviousUploadedDocs'
            },
            'gvpproductlineabstractgrid button[name=prev_productline_details]': {
                click: 'showPrevProductLineDetails'
            },
            'applicationwithdrawalreasonsgrid button[name=add_reason]': {
                click: 'showAddGvpWithdrawalReason'


            },

             'productlinedetailsgrid button[name=add_line]': {
                click: 'showAddGvpProductLineDetails'
            },

            'productlinedetailsgrid button[name=update_line]': {
                click: 'saveGvpproductlinedetails'
            },

              'mdproductlinedetailsgrid button[name=add_line]': {
                click: 'showAddGvpProductLineDetails'
            },

            'mdproductlinedetailsgrid button[name=update_line]': {
                click: 'saveGvpproductlinedetails'
            },


            'gvpproductlinedetailsinspectiongrid button[name=update_line]': {
                click: 'saveGvpproductlinedetails'
            },

            'mdproductLineDetailsaddgrid button[name=update_line]': {
                click: 'saveGvpproductlinedetails'
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
                setGvpApplicationGridsStore: 'setGvpApplicationGridsStore',
                setGvpApplicationCombosStore: 'setGvpApplicationCombosStore',
                newGvpApplication: 'onNewGvpApplication',
                gvpApplicationMoreDetails: 'showGvpApplicationMoreDetailsGeneric',
                redoManSiteOtherDetailsGrid: 'redoManSiteOtherDetailsGrid',
                redoGvpManSitePersonnelDetailsGrid: 'redoGvpManSitePersonnelDetailsGrid',
                previewGvpOnlineApplication:'previewGvpOnlineApplication',
                loadGVPAssessmentFrm:'loadGVPAssessmentFrm',
                setGvpGridsStore: 'setGvpGridsStore'
            }
        }
    },


    setGvpGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.gvpApplications.GvpProductLineDetailsStr', config);
        me.setStore(store);
        toolbar.setStore(store);
		
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    refreshgvpcontractmanufactureractivitygrid: function (me) {
        var store = me.getStore()
            mainTabPanel = this.getMainTabPanel()
            activeTab = mainTabPanel.getActiveTab()
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue()
        store.getProxy().extraParams = {
            application_code: application_code,
        };

    },
    refreshgvpspreadsheetview: function(me){
            var store = me.getStore(),
             range = this.down('combo[name=Range]').getValue();
             var grid=this.up('grid'),
              assessment_type_id=grid.down('combo[name=assessment_type_id]').getValue(),
              gvp_type_id=grid.down('combo[name=gvp_type_id]').getValue(),
              device_type_id=grid.down('combo[name=device_type_id]').getValue(),
              business_type_id=grid.down('combo[name=business_type_id]').getValue(),
              registration_status=grid.down('combo[name=registration_status]').getValue(),
              validity_status=grid.down('combo[name=validity_status]').getValue(),
              application_status=grid.down('combo[name=application_status]').getValue(),
              approval_recommendation=grid.down('combo[name=approval_recommendation]').getValue(),
              zone_id=grid.down('combo[name=zone_id]').getValue();

             
       //acquire original filters
       var filter = {'t1.section_id':gvp_sectionid,'t1.sub_module_id':gvp_sub_module};
       var   filters = JSON.stringify(filter);

      //pass to store
        store.getProxy().extraParams = {
            pageSize:range,
            assessment_type: assessment_type_id,
            gvp_type: gvp_type_id,
            business_type_id: business_type_id,
            device_type_id:device_type_id,
            issueplace:zone_id,
            registration_status:registration_status,
            validity_status: validity_status,
            application_status: application_status,
            approval_recommendation: approval_recommendation,
            filters: filters
        };
    },

    refreshManagerReviewGrid: function (me) {
        var store = me.getStore()
            mainTabPanel = this.getMainTabPanel()
            activeTab = mainTabPanel.getActiveTab()
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue()
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue()
        store.getProxy().extraParams = {
            application_code: application_code,
            workflow_stage_id: workflow_stage_id,
        };
    },
    

    saveContractManufacturerDetails: function(btn){
        var mainTabPanel = this.getMainTabPanel()
            activeTab = mainTabPanel.getActiveTab()
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            form = btn.up('form');


        if(form.isValid){
            form.submit({
                url: btn.action_url,
                waitMsg: 'Loading...',
                headers:{
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token,
                },
                params: {
                    application_code: application_code
                },
                success: function(frm, action) {
                    var response = action.result
                        console.log(response)
                        success = response.success 
                        message = response.message

                    if(success == true || success === true){
                        toastr.success(message, 'Success Response')
                        closeActiveWindow()
                        
                    }else{
                        toastr.error(message, 'Failure Response')
                        closeActiveWindow()
                    }
                },
                failure: function(form, action){
                    var response = Ext.decode(action.response.responseText);
                    toastr.error(response.message, 'Failure Response')
                }
            })
        }else{
            toastr.error('Please fill all the required fields', 'Validation Error');
        }


    },


    saveGVPOnlineAssessmentdetails:function(btn){
        var form = btn.up('form'),
        win = form.up('window'),
        frm = form.getForm(),
        storeID = btn.storeID,
        store = Ext.getStore(storeID);
        var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
        active_application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (frm.isValid()) {
            frm.submit({
                url: 'gvpapplications/saveGVPOnlineAssessmentdetails',
                waitMsg: 'Please wait...',
                params:{
                    sub_module_id :sub_module_id,
                   active_application_code:active_application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }

    },
    saveGvpproductlinedetails:function(btn){
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = btn.up('grid');


            if(grid.up('window')){
                win = grid.up('window');
                application_code = win.down('hiddenfield[name=application_code]').getValue(),
                gvp_site_id = grid.down('hiddenfield[name=gvp_site_id]').getValue();

            }else{
                gvp_site_id = grid.down('hiddenfield[name=gvp_site_id]').getValue();
                application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
                

            }

            var productLineGrid = btn.up('grid'),
            productlinedetailsstr = Ext.getStore('productlinetr'),
            store = Ext.getStore('productlinetr'),
        product_lines = [];
        record='';
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items [i],
                product_line_category = record.get('product_line_category'),
                 product_line_name = record.get('product_line_name'),
                 product_line_namecheck = record.get('product_line_namecheck'),
                 gvp_site_id = record.get('gvp_site_id'),
                 manufacturingsite_block_no = record.get('manufacturingsite_block_no'),
                 no_ofproduction_lines = record.get('no_ofproduction_lines'),
                 non_betalactam = record.get('non_betalactam'),
                 gvpproduct_type_id = record.get('gvpproduct_type_id'),
                 product_line_description = record.get('product_line_description'),
                 beta_lactam_id = record.get('beta_lactam_id'),
                 product_line_id = record.get('product_line_id'),
                 gvp_product_categories_id = record.get('gvp_product_categories_id'),
                 prodline_inspectionstatus_id = record.get('prodline_inspectionstatus_id'),
                 inspection_confirmation_id = record.get('inspection_confirmation_id'),
                 no_inspection_justification = record.get('no_inspection_justification'),
                 

                 id = record.get('id');

            var obj = {
                id: id,
                product_line_category: product_line_category,
                application_code: application_code,
                product_line_namecheck: product_line_namecheck,
                gvp_site_id: gvp_site_id,
                created_by: user_id,
                manufacturingsite_block_no: manufacturingsite_block_no,
                no_ofproduction_lines: no_ofproduction_lines,
                non_betalactam: non_betalactam,
                gvpproduct_type_id:gvpproduct_type_id,
                product_line_description:product_line_description,
                beta_lactam_id: beta_lactam_id,
                product_line_id: product_line_id,
                gvp_product_categories_id: gvp_product_categories_id,
                prodline_inspectionstatus_id:prodline_inspectionstatus_id,
                inspection_confirmation_id:inspection_confirmation_id,
                no_inspection_justification:no_inspection_justification
            };
            if (record.dirty) {
                product_lines.push(obj);
            }
        }

         if (!gvp_site_id) {
                gvp_site_id = record.get('gvp_site_id');
             }
            
             if (!gvp_site_id) {
                btn.setLoading(false);
                toastr.warning('Missing Manufacturing Site Details!!', 'Warning Response');
                return false;
        }
        if (product_lines.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
        product_lines = JSON.stringify(product_lines);
        Ext.Ajax.request({
            url: 'gvpapplications/saveGvpproductlinedetails',
            params: {
                application_code: application_code,
                gvp_site_id: gvp_site_id,
                product_lines: product_lines
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
                    productlinedetailsstr.load();

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


    loadGVPAssessmentFrm: function(frm, type_id,is_inspection,is_gprc,is_preview){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

            if(is_inspection==1 || is_inspection===1){
               var is_comment_readOnly=0,
                   is_review_readOnly=1;

            }else if(is_gprc==1 || is_gprc===1){
                 var is_comment_readOnly=1,
                 is_review_readOnly=0;

            }else{
                var is_comment_readOnly=1,
                is_review_readOnly=1;
            }


            if(is_preview==1 || is_preview===1){
                frm.down('button[name=save_assessement_btn]').setHidden(true);
            }

        Ext.getBody().mask('Please wait...');
          Ext.Ajax.request({
                url: 'configurations/getGVPInspectionForm',
                method: 'GET',
                params: {
                    type_id: type_id, 
                    application_code: application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText),
                        success = resp.success,
                        message = resp.message,
                        assessment_categories = resp.assessment_categories;

                    if (success == true || success === true) {
                        var counter = 0;
                        for (var i = assessment_categories.length - 1; i >= 0; i--) {
                           
                            //default field display
                            var mainCont = field = Ext.create('Ext.form.FieldContainer',{
                                            layout: 'column',
                                            collapsible: true,
                                            columnWidth: 1,
                                            frame: true,
                                            bodyPadding: 1,
                                            items: [{
                                                xtype: 'displayfield',
                                                value: assessment_categories[i]['name'],
                                                columnWidth:1,
                                                fieldLabel:'Category',
                                                width: '40%',
                                                fieldStyle: {
                                                        'color':'green',
                                                        'font-weight': 'bold'
                                                    }
                                            }]
                                        });
                            
                            frm.insert(0, mainCont);
                            //sub items per fieldset
                            for (var j = assessment_categories[i]['sub_categories'].length - 1; j >= 0; j--) {
                                var held = assessment_categories[i]['sub_categories'];
                
                                //get Items if Available
                                for (var k = held[j]['items'].length - 1; k >= 0; k--) {
                                    var holder = held[j]['items'];
                                    if(holder[k]['is_checklist'] == 1){
                                        var field = Ext.create('Ext.form.FieldContainer',{
                                            layout: 'column',
                                            anchor: '100%',
                                            columnWidth: 1,
                                            items: [{
                                                xtype: 'displayfield',
                                                name: holder[k]['id']+'-displayitem',
                                                value: holder[k]['name'],
                                                columnWidth: 0.60
                                            },{
                                                xtype: 'combo',
                                                anyMatch: true,
                                                fieldLabel: 'Check',
                                                labelAlign: 'left',
                                                name: holder[k]['id']+'-itemcheck',
                                                value: holder[k]['item_value'],
                                                valueField: 'id',
                                                readOnly :is_comment_readOnly,
                                                displayField: 'name',
                                                forceSelection: true,
                                                allowBlank: true,
                                                columnWidth: 0.3,
                                                queryMode: 'local',
                                                store: 'confirmationstr'
                                            }]
                                        });
                                    }else{

                                        var field = Ext.create('Ext.form.FieldContainer',{
                                            layout: 'column',
                                            items: [{
                                                xtype: 'displayfield',
                                                name: holder[k]['id']+'-displayitem',
                                                value: holder[k]['name'],
                                                columnWidth: 1
                                            },{
                                                xtype: 'htmleditor',
                                                anyMatch: true,
                                                value: holder[k]['item_value'],
                                                labelAlign: 'top',
                                                readOnly :is_comment_readOnly,
                                                fieldLabel: '<span style="font-size: 8px; color: blue;">NOTE: If this field is disabled, click the edit option on the right side of this field to enable it</span>',
                                                //isReadOnly:false,
                                                disabled: false,
                                                name: holder[k]['id']+'-item',
                                                allowBlank: false,
                                               columnWidth: 1
                                            }]
                                        });
                                    }


                                    var FieldSet = Ext.create('Ext.form.FieldSet',{
                                        name: held[j]['id'],
                                        title:  held[j]['name'],
                                        collapsible: true,
                                        columnWidth: 1,
                                        items: [{
                                            xtype: 'htmleditor',
                                            name: held[j]['id']+'-workspace',
                                            value: held[j]['workspace_value'],
                                            fieldLabel: 'Workspace',
                                            anchor: '100%',
                                            //columnWidth: 1,
                                            hidden:true,
                                            height:180,
                                            labelAlign: 'top'
                                        },

                                        {
                                            xtype: 'textarea',
                                            grow: true, 
                                            growMax: 200, 
                                            name: held[j]['id']+'-comment',
                                            value: held[j]['comment_value'],
                                            fieldLabel: "GPRC's Comment",
                                            allowBlank: true,
                                            columnWidth: 1,
                                            // Set the anchor to '100%' for full width
                                            anchor: '100%',
                                           // hidden:true,
                                           // height:180,
                                            readOnly :is_review_readOnly,
                                            labelAlign: 'top'
                                        }]
                                    });
                                    //add to form
                                    FieldSet.insert(0, field);
                                }
                                mainCont.insert(1,FieldSet);
                            }

                        }
                    }

                Ext.getBody().unmask();
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


     funcAddPremiseApplicationParamter:function(btn){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
        var childXtype = btn.childXtype,
            table_name = btn.table_name,
            childXtype = Ext.widget(childXtype);
        funcShowCustomizableWindow('Parameter', '55%', childXtype, 'customizablewindow');
    },



    showAddOtherDetailsPremiseForm: function (btn) {
        var grid = btn.up('grid'),
        mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        premise_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue(),
        width = btn.winWidth,
        winTitle = btn.winTitle,
        childObject = Ext.widget(btn.childXtype);

        childObject.down('hiddenfield[name=premise_id]').setValue(premise_id);
        funcShowCustomizableWindow(winTitle, width, childObject, 'customizablewindow');
    },





    previewGvpOnlineApplication: function (view, record) {
        console.log(record);
        var grid = view.grid,
            isReadOnly = grid.isReadOnly,
            tracking_no = record.get('tracking_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            site_id = record.get('gvp_site_id'),
            status_type_id = record.get('status_type_id'),
            gvp_type_id = record.get('gvp_type_id'),
            device_type_id = record.get('device_type_id'),
            assessment_type_id = record.get('assessment_type_id'),
            onlinePanelXtype,
            wizardPnlXtype;
        if (sub_module_id == 39 || sub_module_id === 39) {//Withdrawal
            onlinePanelXtype = 'cancelgvponlinepreviewpnl';
            wizardPnlXtype = 'cancelgvponlinepreviewwizard'
        } else if (sub_module_id == 40 || sub_module_id === 40) {//Alteration
            onlinePanelXtype = 'altgvponlinepreviewpnl';
            wizardPnlXtype = 'altgvponlinepreviewwizard'
        } else {//New, Renewal
            onlinePanelXtype = 'newgvponlinepreviewpnl';
            wizardPnlXtype = 'newgvponlinepreviewwizard'
        }
        var onlinePanel = Ext.widget(onlinePanelXtype),
            wizardPnl = onlinePanel.down(wizardPnlXtype),
            
            personnelDetailsGrid = wizardPnl.down('gvpmansitepersonneldetailsgrid'),
            siteBlockDetailsGrid = wizardPnl.down('mansiteblockdetailswingrid'),
            siteOtherDetailsGrid = wizardPnl.down('mansiteotherdetailswingrid'),
            productLineDetailsGrid = wizardPnl.down('onlineproductlinedetailsgrid'),
            productLineDetailsStr = productLineDetailsGrid.getStore(),
            docsGrid = onlinePanel.down('gvpapponlinedocuploadsgenericgrid'),
            siteDetailsFrm = onlinePanel.down('gvpsitedetailsfrm'),
            gvpltrfrm = onlinePanel.down('gvpltrfrm'),
            contactFrm = onlinePanel.down('premisecontactpersonfrm');

        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        siteDetailsFrm.down('button[name=search_site]').setDisabled(true);
        siteDetailsFrm.down('button[action=search_site]').setDisabled(true);
        siteDetailsFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        gvpltrfrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        onlinePanel.down('combo[name=gvp_type_id]').setValue(gvp_type_id);
        onlinePanel.down('combo[name=assessment_type_id]').setValue(assessment_type_id);
        onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {

        }
     

        if (section_id != 2) {
            // productlinedetailsgrid.columns[4].setHidden(true);
            // productlinedetailsgrid.columns[5].setHidden(true);
            // productlinedetailsgrid.columns[6].setHidden(true);
            // productlinedetailsgrid.columns[7].setHidden(true);
        }
        if (status_type_id == 2 || status_type_id === 2 || status_type_id == 3 || status_type_id === 3) {//pre checking and manager query response
            wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
        }
        personnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        siteBlockDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        siteOtherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        personnelDetailsGrid.setIsOnline(1);
        siteBlockDetailsGrid.setIsOnline(1);
        siteOtherDetailsGrid.setIsOnline(1);
       
        funcShowOnlineCustomizableWindow(tracking_no, '98%', onlinePanel, 'customizablewindow');
    },

    setGvpApplicationGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.gvpApplications.GvpAppGridAbstractStore', config);
            me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setGvpApplicationCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.gvpApplications.GvpAppComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    refreshsearchinspectionschedulesgrid:function(me){
        var store = me.store,
        grid = me.up('grid'),
        mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        store.getProxy().extraParams = {
            section_id: section_id
        };
    },
    refreshGvpApplicationsMainGrids: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = (activeTab.down('hiddenfield[name=module_id]')) ? activeTab.down('hiddenfield[name=module_id]').getValue() : null,
            section_id = (activeTab.down('hiddenfield[name=section_id]')) ? activeTab.down('hiddenfield[name=section_id]').getValue() : null,
            sub_module_id = (grid.down('combo[name=sub_module_id]')) ? grid.down('combo[name=sub_module_id]').getValue() : null,
            workflow_stage_id = (grid.down('combo[name=workflow_stage_id]')) ? grid.down('combo[name=workflow_stage_id]').getValue() : null,
            gvp_type_id = (grid.down('combo[name=gvp_type_id]')) ? grid.down('combo[name=gvp_type_id]').getValue() : null;
        store.getProxy().extraParams = {
            module_id: module_id,
            section_id: section_id,
            sub_module_id: sub_module_id,
            workflow_stage_id: workflow_stage_id,
            gvp_type_id: gvp_type_id
        };
    },

    onNewGvpApplication: function (sub_module_id, wrapper_xtype, gvp_type_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(wrapper_xtype),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id),
            gvp_type_txt,
            is_local; //for loading of countries
            // console.log(activeTab,module_id,section_id,workflow_details);
        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        if (gvp_type_id == 1 || gvp_type_id === 1) {
            gvp_type_txt = 'Oversea GVP';
            is_local = 0;
        }
        if (gvp_type_id == 2 || gvp_type_id === 2) {
            gvp_type_txt = 'Domestic GVP';
            is_local = 1;
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

        workflowContainer.down('hiddenfield[name=gvp_type_id]').setValue(gvp_type_id);
        workflowContainer.down('displayfield[name=gvp_type_txt]').setValue(gvp_type_txt);

        //workflowContainer.down('hiddenfield[name=is_local]').setValue(is_local);
        dashboardWrapper.add(workflowContainer);
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },

    //NEW
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
            max_step = button.max_step,
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
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === max_step) {
            
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigation: function (btn) {
        var step = btn.step
            max_step = btn.max_step
            wizard_pnl = btn.wizard_pnl
            mainTabPanel = this.getMainTabPanel()
            activeTab = mainTabPanel.getActiveTab()
            wizardPnl = activeTab.down(wizard_pnl)
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue()
            progress = wizardPnl.down('#progress_tbar')
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
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == max_step) {
       
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

    //RENEWAL
    onPrevCardClickRenewal: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('renewgvpreceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateRenewal(btn, wizardPnl, 'prev');
    },

    onNextCardClickRenewal: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('renewgvpreceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateRenewal(btn, wizardPnl, 'next');
    },

    navigateRenewal: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 3 && (direction == 'next' || direction === 'next')) {
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
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 4) {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },

    quickNavigationRenewal: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('renewgvpreceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 3) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 4) {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
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

    //CANCELLATION
    onPrevCardClickCancellation: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('cancelgvpreceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateCancellation(btn, wizardPnl, 'prev');
    },

    onNextCardClickCancellation: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('cancelgvpreceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateCancellation(btn, wizardPnl, 'next');
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
        if (nextStep > 3 && (direction == 'next' || direction === 'next')) {
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
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 4) {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },

    quickNavigationCancellation: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('cancelgvpreceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 3) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 4) {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
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

    //ALTERATION
    onPrevCardClickAlteration: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('altgvpreceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateAlteration(btn, wizardPnl, 'prev');
    },

    onNextCardClickAlteration: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('altgvpreceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateAlteration(btn, wizardPnl, 'next');
    },

    navigateAlteration: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 3 && (direction == 'next' || direction === 'next')) {
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
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 4) {
            //wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            //wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },

    quickNavigationAlteration: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('altgvpreceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 3) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 4) {
            //wizardPnl.down('button[name=save_screening_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            //wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
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

    gvpApplicationsHome: function (btn) {
        var me = this,
            dash_wrapper = btn.dash_wrapper,
            dashboard = btn.dashboard,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(dash_wrapper);
        if (!dashboardWrapper.down(dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: dashboard});
        }
    },

    prepareNewGvpOnlinePreview: function (pnl) {
        var me = this,
            applicantFrm = pnl.down('applicantdetailsfrm');

            var siteFrm = pnl.down('gvpsitedetailsfrm'),
            productLineDetailsGrid = pnl.down('onlineproductlinedetailsgrid'),
            productLineDetailsStr = productLineDetailsGrid.getStore(),
            gvpltrfrm = pnl.down('gvpltrfrm'),
            contactPersonFrm = pnl.down('premisecontactpersonfrm'),
            gvpProductLinkage = pnl.down('gvpproductslinkagedetailsonlinegrid'),
            gvpProductLinkageStore = gvpProductLinkage.getStore(),
            application_id = pnl.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue();
            
            mask = new Ext.LoadMask({
                target: pnl,
                msg: 'Please wait...'
            });
             
        mask.show();
      
        if(sub_module_id != 39 && sub_module_id != 40){
            checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore(),
            checklistTypesStr.removeAll();
    
            checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
        }
        
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpOnlineReceivingStage',
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
                        ltrDetails = resp.ltrDetails,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            //pnl.down('combo[name=zone_id]').setValue(results.zone_id);
                            pnl.down('displayfield[name=application_status]').setValue(results.app_status);
                            pnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                            pnl.down('displayfield[name=process_name]').setValue(results.process_name);

                            pnl.down('combo[name=gvp_type_id]').setValue(results.gvp_type_id);
                            pnl.down('combo[name=device_type_id]').setValue(results.device_type_id);
                            pnl.down('combo[name=assessment_type_id]').setValue(results.assessment_type_id);

                            applicantFrm.loadRecord(model);
                            siteFrm.loadRecord(model);
                            gvpProductLinkageStore.load();

                            productLineDetailsStr.removeAll();
                            productLineDetailsStr.load({params: {site_id: results.gvp_site_id}});
                        }
                        if (ltrDetails) {
                            var model2 = Ext.create('Ext.data.Model', ltrDetails);
                            gvpltrfrm.loadRecord(model2);
                        }
                        if (contactPersonDetails) {//kip here
                            var model3 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactPersonFrm.loadRecord(model3);
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
    prepareNewGvpInspectionCategorization: function(){
        Ext.getBody().mask('Please wait...')
        var me = this
            mainTabPanel = me.getMainTabPanel()
            activeTab = mainTabPanel.getActiveTab()
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue()
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue()
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue()

    },


    //NEW
    prepareNewGvpReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            manufacturingSiteFrm = activeTab.down('gvpsitedetailsfrm'),
            wizardPanel = activeTab.down('newgvpreceivingwizard'),
            gvpltrfrm = activeTab.down('gvpltrfrm'),
            contactPersonFrm = activeTab.down('premisecontactpersonfrm'),
            billingPersonFrm = activeTab.down('gvpbillingdetailsfrm'),
            contractManufacturingFrm = activeTab.down('contractmanufacturingfrm'),
            gvpproducts_store = activeTab.down('gvpproductslinkagedetailsgrid').getStore(),
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            gvp_type_id_fld = activeTab.down('hiddenfield[name=gvp_type_id]'),
            gvp_type_txt_fld = activeTab.down('displayfield[name=gvp_type_txt]'),
            assessmentType_fld = activeTab.down('combo[name=assessment_type_id]'),
            gvpType_fld = activeTab.down('combo[name=gvp_type_id]');

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

        if (section_id==5 || section_id===5) {
          if(wizardPanel.down('productlinedetailsgrid')){
                wizardPanel.down('productlinedetailsgrid').destroy();
            }
            wizardPanel.add(2, { xtype: 'mdproductlinedetailsgrid'});
            var mdproductLinesGrid = wizardPanel.down('mdproductlinedetailsgrid'),
            mdproductline_store = mdproductLinesGrid.getStore();
        }
       
        if (section_id != 2) {
            // productLinesGrid.columns[4].setHidden(true);
            // productLinesGrid.columns[5].setHidden(true);
            // productLinesGrid.columns[6].setHidden(true);
            // productLinesGrid.columns[7].setHidden(true);
        }
        if (application_id) {
            gvpType_fld.setReadOnly(false);
            manufacturingSiteFrm.down('button[action=search_site]').setDisabled(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        contactPersonDetails = resp.contactPersonDetails,
                        billingPersonDetails = resp.billingPersonDetails,
                        contractmanufacturingDetails = resp.contractmanufacturingDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            assessmentType_fld.setValue(results.assessment_type_id);
                            gvpType_fld.setValue(results.gvp_type_id);

                            gvp_type_id_fld.setValue(results.gvp_type_id);
                            gvp_type_txt_fld.setValue(results.gvp_type_txt);
                            applicantFrm.loadRecord(model);
                            manufacturingSiteFrm.loadRecord(model);
                            activeTab.down('displayfield[name=reference_no]').setValue(results.tracking_no);
                        }
                        if (ltrResults) {
                            var ltr_model = Ext.create('Ext.data.Model', ltrResults);
                            gvpltrfrm.loadRecord(ltr_model);
                        }
                        if (contactPersonDetails) {
                            var model3 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactPersonFrm.loadRecord(model3);
                        }


                        if (billingPersonDetails) {
                            var model4 = Ext.create('Ext.data.Model', billingPersonDetails);
                            billingPersonFrm.loadRecord(model4);
                        }

                        if (contractmanufacturingDetails) {
                            var model5 = Ext.create('Ext.data.Model', contractmanufacturingDetails);
                            contractManufacturingFrm.loadRecord(model5);
                        }

                        // productline_store.removeAll();
                        // productline_store.load();
                        gvpproducts_store.removeAll();
                        gvpproducts_store.load();
                        if (results) {
                            // mdproductline_store=mdproductLinesGrid.getStore();
                            // if(mdproductline_store){
                            //     mdproductline_store.getProxy().extraParams={
                            //     gvp_site_id: results.gvp_site_id
                            //     };
                            //     if (mdproductline_store) {
                            //             mdproductline_store.removeAll();
                            //             mdproductline_store.load();
                            //     }
                            // }
                            if (results.gvp_type_id == 2 || results.gvp_type_id === 2) {//domestic
                                manufacturingSiteFrm.getForm().getFields().each(function (field) {
                                    // field.setReadOnly(true);
                                });
                                //manufacturingSiteFrm.down('textfield[name=premise_reg_no]').setVisible(true);
                                //premiseFrm.down('button[action=search_premise]').setDisabled(false);
                            }
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
            var gvp_type_id = gvp_type_id_fld.getValue();
            if (gvp_type_id == 2 || gvp_type_id === 2) {//domestic
                manufacturingSiteFrm.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                //manufacturingSiteFrm.down('textfield[name=premise_reg_no]').setVisible(true);
                //premiseFrm.down('textfield[name=permit_no]').setVisible(true);
                manufacturingSiteFrm.down('button[action=search_premise]').setDisabled(false);
                if (section_id ==5) {
                    activeTab.down('combo[name=device_type_id]').setVisible(true);
                    activeTab.down('combo[name=device_type_id]').setReadOnly(false);
                }
            }
            Ext.getBody().unmask();
        }
    },

    prepareNewGvpInvoicing: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            gvp_type_id_fld = activeTab.down('hiddenfield[name=gvp_type_id]');
            console.log(gvp_type_id_fld);
            gvp_type_txt_fld = activeTab.down('displayfield[name=gvp_type_txt]');
            premise_details.setFieldLabel('Name of Manufacturing facility');
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
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
                        //var module_id = results.module_id;
                        gvp_type_id_fld.setValue(results.gvp_type_id);
                        gvp_type_txt_fld.setValue(results.gvp_type_txt);
                        activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.gvp_site_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        applicant_details.setValue(results.applicant_details);
                       
                        //if (module_id == 2 || module_id === 2) {
                        premise_details.setVisible(true);
                        premise_details.setValue(results.premise_details);
                        //}
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
    
    prepareNewGvpPayments: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            running_balance = activeTab.down('displayfield[name=running_balance]'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]')
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue()
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue()
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue()
            paymentsPnl = activeTab.down('paymentVerificationPnl')
            newpaymentspnl = activeTab.down('newgvppaymentspanel')
            newpaymentspnl.down('hiddenfield[name=active_application_id]').setValue(application_id)
            newpaymentspnl.down('hiddenfield[name=active_application_code]').setValue(application_code)
            newpaymentspnl.down('hiddenfield[name=module_id]').setValue(module_id)
        
       
        activeTab.down('button[name=process_submission_btn]').setVisible(true)
        
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpPaymentStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
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
                        activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.gvp_site_id);
                        activeTab.down('hiddenfield[name=gvp_type_id]').setValue(results.gvp_type_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);

                        // paymentsPnl.down('displayfield[name=process_name]').setVisible(false);
                        // paymentsPnl.down('displayfield[name=workflow_stage]').setVisible(false);
                        // paymentsPnl.down('displayfield[name=application_status]').setVisible(false);
                        // paymentsPnl.down('displayfield[name=tracking_no]').setVisible(false);
                        // paymentsPnl.down('displayfield[name=reference_no]').setVisible(false);
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

                        //product_details.setValue(results.product_details);

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

    

    prepareNewGvpSmfUploads: function () {
        Ext.getBody().mask('Please wait...')
        var me = this
            mainTabPanel = me.getMainTabPanel()
            activeTab = mainTabPanel.getActiveTab()
            otherDetailsFrm = activeTab.down('form')
            console.log(otherDetailsFrm)
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        premise_details.setFieldLabel('Name of GVP Site');
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpSmfUploadsStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
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
                        premise_details.setVisible(true);
                        if (results) {
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.gvp_site_id);
                            applicant_details.setValue(results.applicant_details);
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

    prepareNewGvpDeskReviewScheduling: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('gvpdeskreviewschedulinggrid'),
            inspectionDetailsFrm = activeTab.down('form'),
            inspection_id = inspectionDetailsFrm.down('hiddenfield[name=id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            inspectorsGrid = activeTab.down('grid[name=inspectorsGrid]'),
            inspectorsStore = inspectorsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
        if (application_id) {
            if (!inspection_id) {
                applicationsStore.on('load', function (store, records, options) {
                    var record = store.getById(application_id),
                        rowIndex = store.indexOf(record);
                    sm.select(rowIndex, true);
                });
            }
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpManagerInspectionStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
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

    prepareNewGvpManagerInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('gvpmanagerinspectiongrid'),
            inspectionDetailsFrm = activeTab.down('form'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            inspectorsGrid = activeTab.down('grid[name=inspectorsGrid]'),
            inspectorsStore = inspectorsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
        if (application_id) {
            /*  applicationsStore.on('load', function (store, records, options) {
                  var record = store.getById(application_id),
                      rowIndex = store.indexOf(record);
                  sm.select(rowIndex, true);
              });*/
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpManagerInspectionStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
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
    prepareNewProvisionalGvpInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productLine_store = activeTab.down('gvpproductlinedetailsinspectiongrid').store,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id= activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = activeTab.down('displayfield[name=applicant_details]'),
            premise_details = activeTab.down('displayfield[name=premise_details]'),
            gvp_type_id_fld = activeTab.down('hiddenfield[name=gvp_type_id]'),
            gvp_type_txt_fld = activeTab.down('displayfield[name=gvp_type_txt]');
        premise_details.setFieldLabel('Name of Manufacturing facility');
        app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore();
        app_check_types_store.removeAll();
        app_check_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });


        if (sub_module_id == 6) {
            activeTab.down('button[name=prev_productline_details]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpChecklistsStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
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
                            gvp_type_id_fld.setValue(results.gvp_type_id);
                            gvp_type_txt_fld.setValue(results.gvp_type_txt);
                            activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            applicant_details.setValue(results.applicant_details);
                            //premise_details.setVisible(true);
                            //premise_details.setValue(results.premise_details);
                            productLine_store.removeAll();
                            productLine_store.load({
                                params: {
                                    site_id: results.premise_id
                                }
                            });
                            //observations_store.removeAll();
                            /*observations_store.load({
                                params: {
                                    site_id: results.premise_id
                                }
                            });*/
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
    prepareNewGvpScreening: function () {
        
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            childXtype = 'gvpsiteappmoredetailswizard',
            wizardPnl = activeTab.down('gvpsiteappmoredetailswizard'),
            applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            siteFrm = wizardPnl.down('gvpsitedetailsfrm'),
            contactPersonFrm = wizardPnl.down('premisecontactpersonfrm'),
            gvpltrfrm = wizardPnl.down('gvpltrfrm'),
            otherDetailsGrid = wizardPnl.down('mansiteotherdetailswingrid'),
            productLinesGrid = wizardPnl.down('productlinedetailsgrid'),
            gvpProductDetailsGrid = wizardPnl.down('gvpproductslinkagedetailswingrid'),
            blocksGrid = wizardPnl.down('mansiteblockdetailswingrid'),
            assessmentType_fld = wizardPnl.down('combo[name=assessment_type_id]'),
            gvpType_fld = wizardPnl.down('combo[name=gvp_type_id]'),
            deviceType_fld = wizardPnl.down('combo[name=device_type_id]'),
            siteReadOnly = 0,
            personnelTabPnl = wizardPnl.down('gvpmansitepersonneltabpnl'),
            personnelDetailsGrid = Ext.widget('mansitepersonneldetailswingrid', {
                title: 'Other Personnel'
            });
            var application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(), section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = activeTab.down('displayfield[name=applicant_details]'),
            premise_details = activeTab.down('displayfield[name=premise_details]'),
            gvp_type_id_fld = activeTab.down('hiddenfield[name=gvp_type_id]'),
            gvp_type_txt_fld = activeTab.down('displayfield[name=gvp_type_txt]');
           // premise_details.setFieldLabel('Name of Manufacturing facility');




            //edit preview details 
            contactPersonFrm.setMoreDetails(1);
            // personnelTabPnl.remove(personnelTabPnl.items.getAt(1));
            // personnelTabPnl.add(personnelDetailsGrid);
            
            applicantFrm.down('button[action=link_applicant]').setDisabled(false);
            siteFrm.down('button[action=search_site]').setDisabled(false);
            siteFrm.down('button[name=search_site]').setDisabled(false);
            gvpltrfrm.down('button[action=link_ltr]').setDisabled(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=application_code]').setValue(application_code);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
           
            wizardPnl.down('combo[name=zone_id]').setReadOnly(false);

            //end 
            if (sub_module_id == 6) {
                activeTab.down('button[name=prev_productline_details]').setVisible(true);
            }
            if (application_code) {
                Ext.Ajax.request({
                    method: 'GET',
                    url: 'gvpapplications/prepareNewGvpChecklistsStage',
                    params: {
                        application_id: application_id,
                        application_code: application_code,
                        table_name: 'tra_gvp_applications'
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
                            siteDetails = resp.site_details,
                            ltrDetails = resp.ltr_details,
                            contactPersonDetails = resp.contact_details;
                        if (success == true || success === true) {
                            if (results) {
                                gvp_type_id_fld.setValue(results.gvp_type_id);
                                gvp_type_txt_fld.setValue(results.gvp_type_txt);
                                activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                                activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.premise_id);
                                activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                                //applicant_details.setValue(results.applicant_details);
                              //  premise_details.setVisible(true);
                             //   premise_details.setValue(results.premise_details);
                                wizardPnl.down('hiddenfield[name=gvp_type_id]').setValue(results.gvp_type_id);
                            }
                            if (applicantDetails) {
                                var model1 = Ext.create('Ext.data.Model', applicantDetails);
                                applicantFrm.loadRecord(model1);
                            }
                            if (siteDetails) {
                                assessmentType_fld.setValue(siteDetails.assessment_type_id);
                                gvpType_fld.setValue(siteDetails.gvp_type_id);
                                deviceType_fld.setValue(siteDetails.device_type_id);
                                var model2 = Ext.create('Ext.data.Model', siteDetails);
                                siteFrm.loadRecord(model2);
                            }
                            if (ltrDetails) {
                                var model3 = Ext.create('Ext.data.Model', ltrDetails);
                                gvpltrfrm.loadRecord(model3);
                            }
                            if (contactPersonDetails) {
                                var model4 = Ext.create('Ext.data.Model', contactPersonDetails);
                                contactPersonFrm.loadRecord(model4);
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
    prepareNewGvpInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab()
            console.log(activeTab)
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'), // wizzardFrm
                    
            productlinedetailsgrid = activeTab.down('gvpproductlinedetailsinspectiongrid'),
            applicant_details = Ext.ComponentQuery.query('displayfield[name=applicant_details]')[0];

            inspectorsGrid = Ext.ComponentQuery.query('grid[name=inspectorsGrid]')[0];

            var inspectionscaparequestsgrid = activeTab.down('inspectionscaparequestsgrid'),
            inspectorsGridStore = inspectorsGrid.getStore(),
            inspectiondetailsupdatefrm = activeTab.down('gvpinspectiondetailsupdatefrm')
            console.log(inspectiondetailsupdatefrm)
            gvp_type_id_fld = activeTab.down('hiddenfield[name=gvp_type_id]')
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            gvp_type_txt_fld = activeTab.down('displayfield[name=gvp_type_txt]');


           
      
        if (sub_module_id == 6) {
            activeTab.down('button[name=prev_productline_details]').setVisible(true);
        }
        inspectionscaparequestsgrid.down('hiddenfield[name=section_id]').setValue(section_id);
        inspectionscaparequestsgrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        inspectionscaparequestsgrid.down('hiddenfield[name=module_id]').setValue(module_id);
        inspectionscaparequestsgrid.down('hiddenfield[name=application_code]').setValue(application_code);

        inspectionscaparequestsgrid.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);

        inspectiondetailsupdatefrm.down('hiddenfield[name=application_code]').setValue(application_code);

        if (section_id != 2) {
            // productlinedetailsgrid.columns[4].setHidden(true);
            // productlinedetailsgrid.columns[5].setHidden(true);
            // productlinedetailsgrid.columns[6].setHidden(true);
            // productlinedetailsgrid.columns[7].setHidden(true);
        }
        
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpChecklistsStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        inspection_details = resp.inspection_details,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            gvp_type_id_fld.setValue(results.gvp_type_id);
                            gvp_type_txt_fld.setValue(results.gvp_type_txt);
                            activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.gvp_site_id);
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            //  console.log(results.section_id);
                            // if (results.section_id==5 || results.section_id===5) {
                            //   if(activeTab.down('gvpproductlinedetailsinspectiongrid')){
                            //         activeTab.down('gvpproductlinedetailsinspectiongrid').destroy();
                            //     }
                            //    // var wizardPanel = Ext.ComponentQuery.query("#inspectionreport")[0];
                            //      var wizardPanel = Ext.ComponentQuery.query('tabpanel[name=inspectionreportTabPanel]')[0];
                            //     console.log(wizardPanel);
                            //     wizardPanel.add(1, { xtype: 'mdproductlinedetailsinspectiongrid'});
                            //     var mdproductLinesGrid = wizardPanel.down('mdproductlinedetailsinspectiongrid'),
                            //     mdproductline_store = mdproductLinesGrid.getStore();
                            // }

                             // mdproductline_store=mdproductLinesGrid.getStore();
                             //    if(mdproductline_store){
                             //        mdproductline_store.getProxy().extraParams={
                             //        gvp_site_id: results.gvp_site_id
                             //        };
                             //        if (mdproductline_store) {
                             //                mdproductline_store.removeAll();
                             //                mdproductline_store.load();
                             //        }
                             //    }

                            applicant_details.setValue(results.applicant_details);
                            if(activeTab.down('gvpinspectiondetailsupdatefrm')){
                                if(inspection_details){
                                    var inspection_details = Ext.create('Ext.data.Model', inspection_details);
                       
                                    var inspectiondetailsupdatefrm = activeTab.down('gvpinspectiondetailsupdatefrm');
                                    inspectiondetailsupdatefrm.loadRecord(inspection_details);

                                    console.log(inspectorsGrid);
                                     inspectorsGridStore.load();
        
                                }
                               
                            }
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
            //It's a new application section_id
        }
    },

    prepareNewGvpTCMeetingScheduling: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('gvpmeetingschedulinggrid');
        this.prepareGvpTCMeetingSchedulingGeneric(activeTab, applicationsGrid, 0);
    },

    prepareGvpTCMeetingSchedulingGeneric: function (activeTab, applicationsGrid, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            meetingDetailsFrm = activeTab.down('form'),
            meeting_id = meetingDetailsFrm.down('hiddenfield[name=id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            participantsGrid = activeTab.down('tcmeetingparticipantsgrid'),
            participantsStore = participantsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
        participantsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            meetingDetailsFrm.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
        }
        //this.redoTcMeetingParticipantsGrid(participantsGrid);
        if (application_id) {
            if (!meeting_id) {
                applicationsStore.on('load', function (store, records, options) {
                    var record = store.getById(application_id),
                        rowIndex = store.indexOf(record);
                    sm.select(rowIndex, true);
                });
            }
            Ext.Ajax.request({
                method: 'GET',
                url: 'prepareApplicationTCMeetingSchedulingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
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
    prepareNewGvpTCRecommendation: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('gvptcmeetingrecommendationgrid');
        this.prepareGvpTCMeetingSchedulingGeneric(activeTab, applicationsGrid, 0);
    },
    prepareNewGvpGPRCRecommendation: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productLine_store = activeTab.down('productlinedetailgprcrecommgrid').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = activeTab.down('displayfield[name=applicant_details]'),
           // site_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            gvp_type_id_fld = activeTab.down('hiddenfield[name=gvp_type_id]'),
            gvp_type_txt_fld = activeTab.down('displayfield[name=gvp_type_txt]');
            console.log(applicant_details);
        //site_details.setFieldLabel('Name of Manufacturing facility');
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (sub_module_id == 6) {
            activeTab.down('button[name=prev_productline_details]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpChecklistsStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
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
                            gvp_type_id_fld.setValue(results.gvp_type_id);
                            gvp_type_txt_fld.setValue(results.gvp_type_txt);
                            activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            applicant_details.setValue(results.applicant_details);
                            //site_details.setVisible(true);
                           // site_details.setValue(results.premise_details);
                            productLine_store.removeAll();
                            productLine_store.getProxy().setExtraParams({
                               site_id: results.premise_id
                            });
                            productLine_store.load();
                        
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

    prepareNewGvpMainApprovals: function () {
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

    prepareNewGvpSingleApproval: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productLine_store = activeTab.down('gvpproductlinedetailsdgrecommgrid').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = activeTab.down('displayfield[name=applicant_details]'),
            //site_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            gvp_type_id_fld = activeTab.down('hiddenfield[name=gvp_type_id]'),
            gvp_type_txt_fld = activeTab.down('displayfield[name=gvp_type_txt]');
        //site_details.setFieldLabel('Name of Manufacturing facility');
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (sub_module_id == 6) {
            activeTab.down('button[name=prev_productline_details]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpChecklistsStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gvp_applications'
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
                            gvp_type_id_fld.setValue(results.gvp_type_id);
                            gvp_type_txt_fld.setValue(results.gvp_type_txt);
                            activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.gvp_site_id);
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            applicant_details.setValue(results.applicant_details);
                            //site_details.setVisible(true);
                           // site_details.setValue(results.premise_details);
                            productLine_store.removeAll();
                            productLine_store.removeAll();
                            productLine_store.getProxy().setExtraParams({
                               site_id: results.premise_id
                            });
                            
                            productLine_store.load();                        }
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

    //RENEW
    prepareRenewGvpReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            siteFrm = activeTab.down('gvpsitedetailsfrm'),
            gvpltrfrm = activeTab.down('gvpltrfrm'),
            contactFrm = activeTab.down('premisecontactpersonfrm'),
            gvpproducts_store = activeTab.down('gvpproductslinkagedetailsgrid').getStore(),
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            gvp_type_id_fld = activeTab.down('hiddenfield[name=gvp_type_id]'),
            gvp_type_txt_fld = activeTab.down('displayfield[name=gvp_type_txt]'),
            assessmentType_fld = activeTab.down('combo[name=assessment_type_id]'),
            gvpType_fld = activeTab.down('combo[name=gvp_type_id]'),
            deviceType_fld = activeTab.down('combo[name=device_type_id]'),
            productlinedetailsgrid = activeTab.down('productlinedetailsgrid'),
            productline_store = productlinedetailsgrid.getStore(),
            gvpProductsGrid = activeTab.down('gvpproductslinkagedetailsgrid');
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore();
        app_check_types_store.removeAll();
        app_check_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });


        // siteFrm.getForm().getFields().each(function (field) {
        //     field.setReadOnly(true);
        // });



        siteFrm.down('textfield[name=gvp_cert_no]').setVisible(true);
       // activeTab.down('mansiteotherdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        //activeTab.down('gvpmansitepersonneldetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        //activeTab.down('mansiteblockdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        //contactFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
       // gvpltrfrm.down('hiddenfield[name=isReadOnly]').setValue(1);
       // productlinedetailsgrid.down('button[name=add_line]').setVisible(false);
       // productlinedetailsgrid.columns[productlinedetailsgrid.columns.length - 1].setHidden(true);
       // gvpProductsGrid.down('button[action=search_product]').setVisible(false);
       // gvpProductsGrid.columns[gvpProductsGrid.columns.length - 1].setHidden(true);

        me.fireEvent('gvpOtherPartsAuth', process_id, activeTab);
        //me.fireEvent('formAuth', process_id, 1, premiseFrm);
       // siteFrm.down('button[action=search_site]').setDisabled(false);
       // applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        
        if (section_id != 2) {
            // productlinedetailsgrid.columns[4].setHidden(true);
            // productlinedetailsgrid.columns[5].setHidden(true);
            // productlinedetailsgrid.columns[6].setHidden(true);
            // productlinedetailsgrid.columns[7].setHidden(true);
        }
        if (application_id) {
            siteFrm.down('button[name=search_site]').setDisabled(true);
            siteFrm.down('button[action=search_site]').setDisabled(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            assessmentType_fld.setValue(results.assessment_type_id);
                            gvpType_fld.setValue(results.gvp_type_id);
                            deviceType_fld.setValue(results.device_type_id);
                            gvp_type_id_fld.setValue(results.gvp_type_id);
                            gvp_type_txt_fld.setValue(results.gvp_type_txt);
                            applicantFrm.loadRecord(model);
                            siteFrm.loadRecord(model);
                            activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.gvp_site_id);
                        }
                        if (ltrResults) {
                            var ltr_model = Ext.create('Ext.data.Model', ltrResults);
                            gvpltrfrm.loadRecord(ltr_model);
                        }
                        if (contactPersonDetails) {
                            var model3 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactFrm.loadRecord(model3);
                        }
                        productline_store.removeAll();
                        productline_store.load();
                        gvpproducts_store.removeAll();
                        gvpproducts_store.load();
                        if (results) {
                            if (results.gvp_type_id == 2 || results.gvp_type_id === 2) {//domestic

                                // siteFrm.getForm().getFields().each(function (field) {
                                //     field.setReadOnly(true);
                                // });


                            } else {
                                me.fireEvent('formAuth', process_id, 1, siteFrm);
                            }
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
            var gvp_type_id = gvp_type_id_fld.getValue();
            if (gvp_type_id == 2 || gvp_type_id === 2) {//domestic
                // siteFrm.getForm().getFields().each(function (field) {
                //     field.setReadOnly(true);
                // });
                siteFrm.down('textfield[name=premise_reg_no]').setVisible(true);
                //premiseFrm.down('textfield[name=permit_no]').setVisible(true);
                siteFrm.down('button[action=search_premise]').setDisabled(false);
            }
            Ext.getBody().unmask();
        }
    },

    //CANCELLATION
    prepareCancellationGvpReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            siteFrm = activeTab.down('gvpsitedetailsfrm'),
            gvpltrfrm = activeTab.down('gvpltrfrm'),
            contactFrm = activeTab.down('premisecontactpersonfrm'),
            gvpproducts_store = activeTab.down('gvpproductslinkagedetailsgrid').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            gvp_type_id_fld = activeTab.down('hiddenfield[name=gvp_type_id]'),
            gvp_type_txt_fld = activeTab.down('displayfield[name=gvp_type_txt]'),
            assessmentType_fld = activeTab.down('combo[name=assessment_type_id]'),
            gvpType_fld = activeTab.down('combo[name=gvp_type_id]'),
            deviceType_fld = activeTab.down('combo[name=device_type_id]'),
            productlinedetailsgrid = activeTab.down('productlinedetailsgrid'),
            productline_store = productlinedetailsgrid.getStore(),
            gvpProductsGrid = activeTab.down('gvpproductslinkagedetailsgrid');
        siteFrm.getForm().getFields().each(function (field) {
            field.setReadOnly(true);
        });
        siteFrm.down('textfield[name=gvp_cert_no]').setVisible(true);
        activeTab.down('mansiteotherdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        activeTab.down('gvpmansitepersonneldetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        activeTab.down('mansiteblockdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        contactFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
        gvpltrfrm.down('hiddenfield[name=isReadOnly]').setValue(1);
        productlinedetailsgrid.down('button[name=add_line]').setVisible(false);
        productlinedetailsgrid.columns[productlinedetailsgrid.columns.length - 1].setHidden(true);
        gvpProductsGrid.down('button[action=search_product]').setVisible(false);
        gvpProductsGrid.columns[gvpProductsGrid.columns.length - 1].setHidden(true);

        me.fireEvent('gvpOtherPartsAuth', process_id, activeTab);
        //me.fireEvent('formAuth', process_id, 1, premiseFrm);
        siteFrm.down('button[action=search_site]').setDisabled(false);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        
        if (section_id != 2) {
            productlinedetailsgrid.columns[4].setHidden(true);
            productlinedetailsgrid.columns[5].setHidden(true);
            productlinedetailsgrid.columns[6].setHidden(true);
            productlinedetailsgrid.columns[7].setHidden(true);
        }
        if (application_id) {
            siteFrm.down('button[name=search_site]').setDisabled(true);
            siteFrm.down('button[action=search_site]').setDisabled(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            assessmentType_fld.setValue(results.assessment_type_id);
                            gvpType_fld.setValue(results.gvp_type_id);
                            deviceType_fld.setValue(results.device_type_id);
                            gvp_type_id_fld.setValue(results.gvp_type_id);
                            gvp_type_txt_fld.setValue(results.gvp_type_txt);
                            applicantFrm.loadRecord(model);
                            siteFrm.loadRecord(model);
                            activeTab.down('hiddenfield[name=gvp_site_id]').setValue(results.gvp_site_id);
                        }
                        if (ltrResults) {
                            var ltr_model = Ext.create('Ext.data.Model', ltrResults);
                            gvpltrfrm.loadRecord(ltr_model);
                        }
                        if (contactPersonDetails) {
                            var model3 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactFrm.loadRecord(model3);
                        }
                        productline_store.removeAll();
                        productline_store.load();
                        gvpproducts_store.removeAll();
                        gvpproducts_store.load();
                        if (results) {
                            if (results.gvp_type_id == 2 || results.gvp_type_id === 2) {//domestic
                                siteFrm.getForm().getFields().each(function (field) {
                                    field.setReadOnly(true);
                                });
                            } else {
                                me.fireEvent('formAuth', process_id, 1, siteFrm);
                            }
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
            var gvp_type_id = gvp_type_id_fld.getValue();
            if (gvp_type_id == 2 || gvp_type_id === 2) {//domestic
                siteFrm.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                siteFrm.down('textfield[name=premise_reg_no]').setVisible(true);
                //premiseFrm.down('textfield[name=permit_no]').setVisible(true);
                siteFrm.down('button[action=search_premise]').setDisabled(false);
            }
            Ext.getBody().unmask();
        }
    },

    //COMPARE
    prepareGvpComparePreview: function (pnl) {
        var me = this,
            portalPnl = pnl.down('gvpportalcomparepreviewpnl'),
            misPnl = pnl.down('gvpmiscomparepreviewpnl'),
            portalWizard = portalPnl.down('panel[name=wizardPanel]'),
            misWizard = misPnl.down('panel[name=wizardPanel]'),
            portalApplicantFrm = portalWizard.down('applicantdetailsfrm'),
            misApplicantFrm = misWizard.down('applicantdetailsfrm'),
            portalSiteFrm = portalWizard.down('gvpsitedetailsfrm'),
            misSiteFrm = misWizard.down('gvpsitedetailsfrm'),
            portalContactPersonFrm = portalWizard.down('premisecontactpersonfrm'),
            misContactPersonFrm = misWizard.down('premisecontactpersonfrm'),
            portalGvpltrfrm = portalWizard.down('gvpltrfrm'),
            misGvpltrfrm = misWizard.down('gvpltrfrm'),

            portalProductLineGrid = portalWizard.down('onlineproductlinedetailsgrid'),
            misProductLineGrid = misWizard.down('productlinedetailswingrid'),
            portalProductsGrid = portalWizard.down('gvpproductslinkagedetailsonlinegrid'),
            misProductsGrid = misWizard.down('gvpproductslinkagedetailswingrid'),

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
                url: 'gvpapplications/getGvpCompareDetails',//kip here
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
                        portalLtrDetails = resp.portalLtrDetails,
                        misResults = resp.misResults,
                        misContactPersonDetails = resp.misContactPersonDetails,
                        misLtrDetails = resp.misLtrDetails;
                    if (success == true || success === true) {
                        if (portalResults) {
                            var model = Ext.create('Ext.data.Model', portalResults);
                            portalApplicantFrm.loadRecord(model);
                            portalSiteFrm.loadRecord(model);
                            portalPnl.down('combo[name=gvp_type_id]').setValue(portalResults.gvp_type_id);
                            portalPnl.down('combo[name=device_type_id]').setValue(portalResults.device_type_id);
                            portalPnl.down('combo[name=assessment_type_id]').setValue(portalResults.assessment_type_id);
                        }
                        if (portalContactPersonDetails) {
                            var model1 = Ext.create('Ext.data.Model', portalContactPersonDetails);
                            portalContactPersonFrm.loadRecord(model1);
                        }
                        if (portalLtrDetails) {
                            var model2 = Ext.create('Ext.data.Model', portalLtrDetails);
                            portalGvpltrfrm.loadRecord(model2);
                        }
                        if (misResults) {
                            var model3 = Ext.create('Ext.data.Model', misResults);
                            misApplicantFrm.loadRecord(model3);
                            misSiteFrm.loadRecord(model3);
                            misPnl.down('combo[name=gvp_type_id]').setValue(misResults.gvp_type_id);
                            misPnl.down('combo[name=device_type_id]').setValue(misResults.device_type_id);
                            misPnl.down('combo[name=assessment_type_id]').setValue(misResults.assessment_type_id);
                        }
                        if (misContactPersonDetails) {
                            var model4 = Ext.create('Ext.data.Model', misContactPersonDetails);
                            misContactPersonFrm.loadRecord(model4);
                        }
                        if (misLtrDetails) {
                            var model5 = Ext.create('Ext.data.Model', misLtrDetails);
                            misGvpltrfrm.loadRecord(model5);
                        }
                        portalProductLineGrid.getStore().load();
                        misProductLineGrid.getStore().load();
                        portalProductsGrid.getStore().load();
                        misProductsGrid.getStore().load();
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

    beforeManSiteTabChange: function (tabPnl, newTab) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
        if (sub_module_id == 5) {//NEW
            if (tabPnl.items.indexOf(newTab) > 4) {
                if (!application_id) {
                    toastr.warning('Save Application details first!!', 'Warning Response');
                    return false;
                }
            }
        } else {

        }
    },

    saveGvpNewReceivingBaseDetails: function (btn) {
        var me = this, 
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gvp_type_fld = activeTab.down('combo[name=gvp_type_id]'),
            assessment_type_fld = activeTab.down('combo[name=assessment_type_id]'),
            gvp_type_id = gvp_type_fld.getValue(),
            assessment_type_id = assessment_type_fld.getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            ltrForm = activeTab.down('gvpltrfrm'),
            billingForm = activeTab.down('gvpbillingdetailsfrm'),
            contactPersonForm = activeTab.down('premisecontactpersonfrm'),
            applicant_contact_person = contactPersonForm.down('combo[name=applicant_contact_person]').getValue(),
            contact_person_id = contactPersonForm.down('hiddenfield[name=id]').getValue(),
            contact_person_startdate = contactPersonForm.down('datefield[name=start_date]').getValue(),
            contact_person_enddate = contactPersonForm.down('datefield[name=end_date]').getValue(),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            ltr_id = ltrForm.down('hiddenfield[name=ltr_id]').getValue(),
            applicant_as_ltr = ltrForm.down('combo[name=applicant_as_ltr]').getValue(),
            applicant_as_billingperson = billingForm.down('combo[name=applicant_as_billingperson]').getValue(),
            billing_person_id = billingForm.down('hiddenfield[name=id]').getValue(),
            manSiteDetailsForm = activeTab.down('gvpsitedetailsfrm'),
            gvpsitedetailsfrm = manSiteDetailsForm.getForm(),
            action_url = 'gvpapplications/saveNewGvpReceivingBaseDetails';
            gvpSharedInterface = activeTab.down('gvpreceiving');
            console.log(applicant_as_ltr, ltr_id);
        if (!assessment_type_id) {
            toastr.warning('Please select asessessment type!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (applicantDetailsForm.isValid()) {
            if (!applicant_as_ltr) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            } else if (applicant_as_ltr == 2 && !ltr_id) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            }
            if (!applicant_as_billingperson) {
                toastr.warning('Please select Billing Address!!', 'Warning Response');
                return false;
            } else if (applicant_as_billingperson == 2 && !billing_person_id) {
                toastr.warning('Please select Billing Address!!', 'Warning Response');
                return false;
            }
     
            gvpsitedetailsfrm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    ltr_id: ltr_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    gvp_type_id: gvp_type_id,
                    assessment_type_id: assessment_type_id,
                    applicant_as_ltr: applicant_as_ltr,
                    applicant_as_billingperson: applicant_as_billingperson,
                    applicant_contact_person: applicant_contact_person,
                    contact_person_id: contact_person_id,
                    contact_person_startdate: contact_person_startdate,
                    contact_person_enddate: contact_person_enddate,
                    applicant_as_billingperson: applicant_as_billingperson,
                    billing_person_id: billing_person_id,
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result
                        message = resp.message
                        success = resp.success
                        record_id = resp.record_id
                        tracking_no = resp.tracking_no
                        application_code = resp.application_code
                        site_id = resp.gvp_site_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            activeTab.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
                            manSiteDetailsForm.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
                            manSiteDetailsForm.down('button[action=search_site]').setDisabled(true);
                            gvp_type_fld.setReadOnly(true);
                            gvpSharedInterface.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            gvpSharedInterface.down('displayfield[name=reference_no]').setValue(tracking_no);
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

    saveGvpRenewalReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            gvp_type_id = activeTab.down('combo[name=gvp_type_id]').getValue(),
            device_type_fld = activeTab.down('combo[name=device_type_id]'),
            assessment_type_fld = activeTab.down('combo[name=assessment_type_id]'),
            device_type_id = device_type_fld.getValue(),
            assessment_type_id = assessment_type_fld.getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            ltrForm = activeTab.down('gvpltrfrm'),
            billingForm = activeTab.down('gvpbillingdetailsfrm'),
            contractManufactureForm = activeTab.down('contractmanufacturingfrm'),
            contactPersonForm = activeTab.down('premisecontactpersonfrm'),
            applicant_contact_person = contactPersonForm.down('combo[name=applicant_contact_person]').getValue(),
            contact_person_id = contactPersonForm.down('hiddenfield[name=id]').getValue(),
            contact_person_startdate = contactPersonForm.down('datefield[name=start_date]').getValue(),
            contact_person_enddate = contactPersonForm.down('datefield[name=end_date]').getValue(),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            ltr_id = ltrForm.down('hiddenfield[name=ltr_id]').getValue(),
            applicant_as_ltr = ltrForm.down('combo[name=applicant_as_ltr]').getValue(),

            applicant_as_billingperson = billingForm.down('combo[name=applicant_as_billingperson]').getValue(),
            billing_person_id = billingForm.down('hiddenfield[name=id]').getValue(),

            
            gvp_site_id = contractManufactureForm.down('hiddenfield[name=gvp_site_id]').getValue(),
            contract_manufacturing_id = contractManufactureForm.down('combo[name=contract_manufacturing_id]').getValue(),
            contract_manufacturer_name = contractManufactureForm.down('textfield[name=contract_manufacturer_name]').getValue(),
            contract_physical_address = contractManufactureForm.down('textfield[name=contract_physical_address]').getValue(),
            contract_country_id = contractManufactureForm.down('combo[name=contract_country_id]').getValue(),
            contract_region_id = contractManufactureForm.down('combo[name=contract_region_id]').getValue(),
            contract_personnel_name = contractManufactureForm.down('textfield[name=contract_personnel_name]').getValue(),
            contract_telephone_no = contractManufactureForm.down('textfield[name=contract_telephone_no]').getValue(),
            inspected_activity_id = contractManufactureForm.down('combo[name=inspected_activity_id]').getValue(),
            contract_email_address = contractManufactureForm.down('textfield[name=contract_email_address]').getValue(),
            productLineDetailsStore = activeTab.down('productlinedetailsgrid').getStore(),
            manSiteDetailsForm = activeTab.down('gvpsitedetailsfrm'),
            gvpsitedetailsfrm = manSiteDetailsForm.getForm(),
            action_url = 'gvpapplications/saveRenewalGvpReceivingBaseDetails';
        if (!gvp_type_id) {
            toastr.warning('Please select GVP type!!', 'Warning Response');
            return false;
        }
        if (!assessment_type_id) {
            toastr.warning('Please select assessment type!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (gvpsitedetailsfrm.isValid()) {
            if (!applicant_as_ltr) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            } else if (applicant_as_ltr == 2 && !ltr_id) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            }
             if (!applicant_as_billingperson) {
                toastr.warning('Please select Billing Address!!', 'Warning Response');
                return false;
            } else if (applicant_as_billingperson == 2 && !billing_person_id) {
                toastr.warning('Please select Billing Address!!', 'Warning Response');
                return false;
            }
             if (!contract_manufacturing_id) {
                toastr.warning('Please select Contract Manufacturing Acitivity!!', 'Warning Response');
                return false;
            }
            //  else if(contract_manufacturing_id == 1 || contract_manufacturing_id == 2 && !gvp_site_id) {
            //     toastr.warning('Please note application can not be received until all manufacturing parties have applied for an inspection!!', 'Warning Response');
            //     return false;
            // }



            gvpsitedetailsfrm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    ltr_id: ltr_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    gvp_type_id: gvp_type_id,
                    assessment_type_id: assessment_type_id,
                    device_type_id: device_type_id,
                    applicant_as_ltr: applicant_as_ltr,
                    applicant_contact_person: applicant_contact_person,
                    contact_person_id: contact_person_id,
                    contact_person_startdate: contact_person_startdate,
                    contact_person_enddate: contact_person_enddate,

                    applicant_as_billingperson: applicant_as_billingperson,
                    billing_person_id: billing_person_id,
                    contract_manufacturing_id: contract_manufacturing_id,
                    contract_manufacturer_name: contract_manufacturer_name,
                    contract_physical_address: contract_physical_address,
                    contract_country_id: contract_country_id,
                    contract_region_id: contract_region_id,
                    contract_personnel_name: contract_personnel_name,
                    contract_telephone_no: contract_telephone_no,
                    contract_email_address: contract_email_address,
                    inspected_activity_id: inspected_activity_id
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
                        gvp_site_id = resp.gvp_site_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            activeTab.down('hiddenfield[name=gvp_site_id]').setValue(gvp_site_id);
                            manSiteDetailsForm.down('hiddenfield[name=gvp_site_id]').setValue(gvp_site_id);
                            manSiteDetailsForm.down('button[name=search_site]').setDisabled(true);
                            manSiteDetailsForm.down('button[action=search_site]').setDisabled(true);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            productLineDetailsStore.load();
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

    updateGvpApplicationDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            wizardPnl = btn.up('panel'),
            process_id = wizardPnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = wizardPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = wizardPnl.down('hiddenfield[name=sub_module_id]').getValue(),

            gvp_type_id = wizardPnl.down('combo[name=gvp_type_id]').getValue(),
            device_type_fld = wizardPnl.down('combo[name=device_type_id]'),
            assessment_type_fld = wizardPnl.down('combo[name=assessment_type_id]'),
            device_type_id = device_type_fld.getValue(),
            assessment_type_id = assessment_type_fld.getValue(),

            section_id = wizardPnl.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = wizardPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = wizardPnl.down('hiddenfield[name=application_id]').getValue(),

            contactPersonForm = wizardPnl.down('premisecontactpersonfrm'),
            applicant_contact_person = contactPersonForm.down('combo[name=applicant_contact_person]').getValue(),
            contact_person_id = contactPersonForm.down('hiddenfield[name=id]').getValue(),
            contact_person_startdate = contactPersonForm.down('datefield[name=start_date]').getValue(),
            contact_person_enddate = contactPersonForm.down('datefield[name=end_date]').getValue(),

            applicantDetailsForm = wizardPnl.down('applicantdetailsfrm'),
            ltrForm = wizardPnl.down('gvpltrfrm'),
            billingForm = wizardPnl.down('gvpbillingdetailsfrm'),
            contractManufactureForm = wizardPnl.down('contractmanufacturingfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            ltr_id = ltrForm.down('hiddenfield[name=ltr_id]').getValue(),
            applicant_as_ltr = ltrForm.down('combo[name=applicant_as_ltr]').getValue(),
            applicant_as_billingperson = billingForm.down('combo[name=applicant_as_billingperson]').getValue(),
            billing_person_id = billingForm.down('hiddenfield[name=id]').getValue(),
            contract_manufacturing_id = contractManufactureForm.down('combo[name=contract_manufacturing_id]').getValue(),
            contract_manufacturer_name = contractManufactureForm.down('textfield[name=contract_manufacturer_name]').getValue(),
            contract_physical_address = contractManufactureForm.down('textfield[name=contract_physical_address]').getValue(),
            contract_country_id = contractManufactureForm.down('combo[name=contract_country_id]').getValue(),
            contract_region_id = contractManufactureForm.down('combo[name=contract_region_id]').getValue(),
            contract_personnel_name = contractManufactureForm.down('textfield[name=contract_personnel_name]').getValue(),
            contract_telephone_no = contractManufactureForm.down('textfield[name=contract_telephone_no]').getValue(),
            inspected_activity_id = contractManufactureForm.down('combo[name=inspected_activity_id]').getValue(),
            contract_email_address = contractManufactureForm.down('textfield[name=contract_email_address]').getValue(),
            siteDetailsForm = wizardPnl.down('gvpsitedetailsfrm'),
            siteDetailsFrm = siteDetailsForm.getForm(),
            action_url = 'gvpapplications/saveRenewalGvpReceivingBaseDetails';
        if (sub_module_id == 5 || sub_module_id === 5) {
            action_url = 'gvpapplications/saveNewGvpReceivingBaseDetails';
        }
        if (!gvp_type_id) {
            toastr.warning('Please select GVP type!!', 'Warning Response');
            return false;
        }
        if (!assessment_type_id) {
            toastr.warning('Please select assessment type!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (siteDetailsFrm.isValid()) {
            if (!applicant_as_ltr) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            } else if (applicant_as_ltr == 2 && !ltr_id) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            }
             if (!applicant_as_billingperson) {
                toastr.warning('Please select Billing Address!!', 'Warning Response');
                return false;
            } else if (applicant_as_billingperson == 2 && !billing_person_id) {
                toastr.warning('Please select Billing Address!!', 'Warning Response');
                return false;
            }
             if (!contract_manufacturing_id) {
                toastr.warning('Please select Contract Manufacturing Acitivity!!', 'Warning Response');
                return false;
             } 
            //else if (contract_manufacturing_id == 1 || contract_manufacturing_id == 2 && !gvp_site_id) {
            //     toastr.warning('Please note application can not be received until all manufacturing parties have applied for an inspection!!', 'Warning Response');
            //     man_site_id
            // }
            siteDetailsFrm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    ltr_id: ltr_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    gvp_type_id: gvp_type_id,
                    assessment_type_id: assessment_type_id,
                    device_type_id: device_type_id,
                    applicant_as_ltr: applicant_as_ltr,
                    applicant_contact_person: applicant_contact_person,
                    contact_person_id: contact_person_id,
                    contact_person_startdate: contact_person_startdate,
                    contact_person_enddate: contact_person_enddate,


                    applicant_as_billingperson: applicant_as_billingperson,
                    billing_person_id: billing_person_id,
                    contract_manufacturing_id: contract_manufacturing_id,
                    contract_manufacturer_name: contract_manufacturer_name,
                    contract_physical_address: contract_physical_address,
                    contract_country_id: contract_country_id,
                    contract_region_id: contract_region_id,
                    contract_personnel_name: contract_personnel_name,
                    contract_telephone_no: contract_telephone_no,
                    contract_email_address: contract_email_address,
                    inspected_activity_id: inspected_activity_id
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

     showLTRSelectionList: function (btn) {
        var grid = Ext.widget('gvpltrselectiongrid');
        funcShowOnlineCustomizableWindow('LTR Selection List', '90%', grid, 'customizablewindow');
    },
    showSearch_inspectionteam: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            childObject = Ext.widget(childXtype);
           // childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },


    onsearchinspectionschedulesgridDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            gvpinspectionscheduleteamfrm = activeTab.down('gvpinspectionscheduleteamfrm'),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        gvpinspectionscheduleteamfrm.loadRecord(record);
            
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },
    onLTRSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantForm = this.getGvpltrfrm(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        applicantForm.loadRecord(record);
            
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

    showAddSitePersonnelDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            site_id = activeTab.down('gvpsitedetailsfrm').down('hiddenfield[name=gvp_site_id]').getValue(),
            trader_id = activeTab.down('applicantdetailsfrm').down('hiddenfield[name=applicant_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            positionsStore = Ext.getStore('personnelpositionsstr');
        childObject.down('button[name=save_btn]').storeID = btn.storeID;
        childObject.down('button[name=save_btn]').action_url = btn.action_url;
        activeTab.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=trader_id]').setValue(trader_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
        positionsStore.removeAll();
        positionsStore.load();
    },

    showAddSitePersonnelDetailsWin: function (btn) {
        var me = this,
            win = btn.up('window'),
            site_id = win.down('gvpsitedetailsfrm').down('hiddenfield[name=gvp_site_id]').getValue(),
            trader_id = win.down('applicantdetailsfrm').down('hiddenfield[name=applicant_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            positionsStore = Ext.getStore('personnelpositionsstr');
        childObject.down('button[name=save_btn]').storeID = btn.storeID;
        childObject.down('button[name=save_btn]').action_url = btn.action_url;
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=trader_id]').setValue(trader_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
        positionsStore.removeAll();
        positionsStore.load();
    },

    showAddSiteOtherDetails: function (btn) {
        var me = this,
            is_manufacturer = btn.isManufacturer,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue(),
            business_type_id = activeTab.down('combo[name=business_type_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            busTypesStr = childObject.down('combo[name=business_type_id]').getStore(),
            filterObj = {section_id: section_id},
            filterStr = JSON.stringify(filterObj);
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        childObject.down('combo[name=business_type_id]').setValue(business_type_id);
        busTypesStr.removeAll();
        busTypesStr.load({params: {filters: filterStr}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showAddSiteOtherDetailsWin: function (btn) {
        var me = this,
            win = btn.up('window'),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            site_id = win.down('hiddenfield[name=gvp_site_id]').getValue(),
            business_type_id = win.down('combo[name=business_type_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            busTypesStr = childObject.down('combo[name=business_type_id]').getStore(),
            filterObj = {section_id: section_id},
            filterStr = JSON.stringify(filterObj);
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        childObject.down('combo[name=business_type_id]').setValue(business_type_id);
        busTypesStr.removeAll();
        busTypesStr.load({params: {filters: filterStr}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showAddGvpProductLineDetails: function (btn) {
        var me = this,
            grid=btn.up('grid');
        
           
           // if(grid.up('window')){
           //          var win = grid.up('window');
           //          site_id = win.down('gvpsitedetailstabpnl').down('hiddenfield[name=gvp_site_id]').getValue(),
           //          section_id = win.down('hiddenfield[name=section_id]').getValue();
           //          application_code = win.down('hiddenfield[name=active_application_code]').getValue();

           //      }
           //      else{

                    var mainTabPanel = grid.up('#contentPanel'),
                    activeTab = mainTabPanel.getActiveTab(),
                    site_id = activeTab.down('gvpsitedetailstabpnl').down('hiddenfield[name=gvp_site_id]').getValue(),
                    section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
                    application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

               // }
               
       
            if (!site_id) {
                toastr.warning('Please save siteDetails first!!', 'Warning Response');
                return;
            }

            var childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = '80%',
            tabPnl = Ext.widget(childXtype),
            form = tabPnl.down('form'),
            grid = tabPnl.down('grid');
          
            storeArray = eval(btn.stores);

            // if (section_id != 2 && section_id != 7) {
            //     childObject.columns[4].setHidden(true);
            //     childObject.columns[5].setHidden(true);
            //     childObject.columns[6].setHidden(true);
            //     childObject.columns[7].setHidden(true);
            // }
           form.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
            // childObject.down('hiddenfield[name=section_id]').setValue(section_id);
            // childObject.down('hiddenfield[name=application_code]').setValue(application_code);
            grid.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
          
            funcShowOnlineCustomizableWindow(title, winWidth, tabPnl, 'customizablewindow');
    },

     showAddProductLine: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            grid=btn.up('grid'),
            block_id = grid.down('hiddenfield[name=block_id]').getValue(),
            special_category_id = grid.down('hiddenfield[name=special_category_id]').getValue(),
            inspection_category_id = grid.down('hiddenfield[name=inspection_category_id]').getValue(),
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
            childObject.down('hiddenfield[name=manufacturingsite_block_id]').setValue(block_id);
            childObject.down('hiddenfield[name=inspection_category_id]').setValue(inspection_category_id);
     
        if(activeTab.down('newgvpreceivingwizard')){
            if(childObject.down('combo[name=prodline_inspectionstatus_id]')){
                childObject.down('combo[name=prodline_inspectionstatus_id]').setVisible(false);
            }
        }
        
    
        if(inspection_category_id==3 ||inspection_category_id===3){
           childObject.down('hiddenfield[name=isSpecialCategory]').setValue(1);
           childObject.down('hiddenfield[name=special_category_id]').setValue(special_category_id);
        }

        if(section_id==5 ||section_id===5){
            childObject.down('combo[name=group_family_id]').setVisible(true);
            childObject.down('combo[name=sterile_id]').setVisible(true);
            childObject.down('combo[name=invasive_id]').setVisible(true);
            childObject.down('combo[name=active_id]').setVisible(true);
            childObject.down('combo[name=medicated_id]').setVisible(true);

            childObject.down('combo[name=product_line_id]').setVisible(false);
            childObject.down('combo[name=category_id]').setVisible(false);

            childObject.down('combo[name=product_line_id]').allowBlank =true;
            childObject.down('combo[name=category_id]').allowBlank = true;
        }

        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },
     showAddGvpBlockWinFrm: function (btn) {

        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
             site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue(),
            arrayLength = storeArray.length;
        child.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
    },


    showAddGvpProductLine: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            productLineStr = childObject.down('combo[name=product_line_id]').getStore(),
            productLineCategoryStr = childObject.down('combo[name=category_id]').getStore();
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        //switch recommendation combo
        if(activeTab.down('newgvpreceivingwizard')){
            if(childObject.down('combo[name=prodline_inspectionstatus_id]')){
                childObject.down('combo[name=prodline_inspectionstatus_id]').setVisible(false);
            }
        }
        productLineStr.removeAll();
        productLineStr.load({params: {section_id: section_id}});
        productLineCategoryStr.removeAll();
        productLineCategoryStr.load({params: {section_id: section_id}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },





    showAddGvpNonComplianceDetails1: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        childObject.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showAddGvpNonComplianceDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        // childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        // childObject.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        // childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showPrevProductLineDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue();
        this.showAddGvpWinsWithSiteID(btn, site_id);
    },

    showAddGvpWinsWithSiteID: function (btn, site_id) {
        var me = this,
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    //New
    showNewReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = this.validateNewGvpReceivingSubmission(btn),
            table_name = btn.table_name,
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, extraParams);
            
        } else {
            Ext.getBody().unmask();
        }
    },

    validateNewGvpReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            manufacturingSiteFrm = activeTab.down('gvpsitedetailsfrm'),
            screeningGrid = activeTab.down('gvpscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!manufacturingSiteFrm.isValid()) {
            toastr.warning('Please Enter All the required Premise Details!!', 'Warning Response');
            return false;
        }
        this.saveGvpNewReceivingBaseDetails(btn);
        
        return true;
    }
    ,

    showSmfUploadsApplicationSubmissionWin: function (btn) {
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
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth);
        } else {
            Ext.getBody().unmask();
        }
    }
    ,

    showInspectionSchedulingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            gvp_inspection_type = btn.gvp_inspection_type,
            gridXtype = btn.gridXtype,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'gvpinspection_type_id',
                value: gvp_inspection_type
            }],
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            if(btn.up('grid')){
              grid = btn.up('grid'); 
            }else{
             grid = btn.up('panel').down('grid');
            }
            if(grid){
            var sm = grid.getSelectionModel(),
            selected_records = sm.getSelection();
            var selected_appcodes = [];
        
            Ext.each(selected_records, function (record) {
                var application_code = record.get('application_code');
                if (application_code) {
                    selected_appcodes.push(application_code);
                }
            });

             if (selected_appcodes.length===0 || selected_appcodes.length==0) {
                Ext.getBody().unmask();
                toastr.error('Please ensure you have selected application(s) to proceed!!', 'Warning Response');
                return false;
            }
           }
        
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, extraParams, gridXtype);
        } else {
            Ext.getBody().unmask();
        }
    },

    showGvpDeskReviewSchedulingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            inspectorsGrid = activeTab.down('grid[name=inspectorsGrid]'),
            inspectorsStore = inspectorsGrid.getStore(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateDeskReviewSchedulingApplicationSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
            leadInspectorDetails = inspectorsStore.findRecord('role_id', 1),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id
            }];
        if (!leadInspectorDetails) {
            Ext.getBody().unmask();
            toastr.warning('No lead inspector found!!', 'Warning Response');
            return false;
        }
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, extraParams, 'gvpdeskreviewschedulinggrid', 'selected');
        } else {
            Ext.getBody().unmask();
        }
    },

    validateDeskReviewSchedulingApplicationSubmission: function (btn) {
        var valid = true,
            saveInfo = this.saveDeskReviewScheduleDetails(btn);
        if (saveInfo == false || saveInfo === false) {
            valid = false;
        }
        return valid;
    },

    showManagerInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            inspectorsGrid = activeTab.down('grid[name=inspectorsGrid]'),
            inspectorsStore = inspectorsGrid.getStore(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
            leadInspectorDetails = inspectorsStore.findRecord('role_id', 1),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id
            }];

            if(btn.up('grid')){
              grid = btn.up('grid'); 
            }else{
             grid = btn.up('panel').down('grid');
            }
            if(grid){
            var sm = grid.getSelectionModel(),
            selected_records = sm.getSelection();
            var selected_appcodes = [];
        
            Ext.each(selected_records, function (record) {
                var application_code = record.get('application_code');
                if (application_code) {
                    selected_appcodes.push(application_code);
                }
            });

             if (selected_appcodes.length===0 || selected_appcodes.length==0) {
                Ext.getBody().unmask();
                toastr.error('Please ensure you have selected application(s) to proceed!!', 'Warning Response');
                return false;
            }
           }
        if (!leadInspectorDetails) {
            Ext.getBody().unmask();
            toastr.warning('No lead inspector found!!', 'Warning Response');
            return false;
        }
        if (valid == true || valid === true) {

            Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/checkGvpInspectionScheduleDates',
                params: {
                    application_code: application_code,
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        success = resp.success
        
                    if (!success) {
                        toastr.warning('Please save Inspection Schedule dates before submitting!!', 'Warning Response');
                        Ext.getBody().unmask();
                        return false;
                    }
        
                    showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, extraParams, 'gvpmanagerinspectiongrid', 'all');
                },
                failure: function () {
                    Ext.getBody().unmask();
                    toastr.error('Failed to get Inspection Schedule date details.', 'Error');
                }
            });
            
        } else {
            Ext.getBody().unmask();
        }
    },
    
    showInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id, 2),
            hasRespondedUnclosedQueries = checkApplicationRespondedUnclosedQueries(application_code, module_id),
            valid = true,
            workflowaction_type_id = 1, 
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);

            // var inspection_frm = activeTab.down('inspectiondetailsupdatefrm');
            // insp_frm = inspection_frm.getForm();
            //     if(inspection_frm.isValid()){
            //         gvpinspection_recommendation_id = inspection_frm.down('combo[name=gvpinspection_recommendation_id]').getValue();
            //     }
            //     else{
            //         Ext.getBody().unmask();
            //         toastr.warning('Please fill and save in the GVP Inspection Details before submission!!', 'Validation Check');
            //         return false;

            //     }
            // if(gvpinspection_recommendation_id == 1 ){
            //         var workflowaction_type_id = 31;

            // }
            // else if (gvpinspection_recommendation_id == 2 ){
            //     var workflowaction_type_id = 29;

            // }else{
            //     var workflowaction_type_id = 27;
            // }

            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            },{
                field_type: 'hiddenfield',
                field_name: 'workflowaction_type_id',
                value: workflowaction_type_id
            }];

        if (hasRespondedUnclosedQueries > 0) {
            Ext.getBody().unmask();
            toastr.warning('Please close responded queries to proceed!!', 'Warning Response');
            return false;
        }
        if(hasQueries ==2){
            toastr.warning('Enter the query Items for the open query to proceed with the query submission!!', 'Warning Response');
            Ext.getBody().unmask();
            return false;
           
        }
        if (valid == true || valid === true) {
            showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsstrictrecommfrm', winWidth, storeID, 1, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },

    showDeskReviewInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id, 2),
            hasRespondedUnclosedQueries = checkApplicationRespondedUnclosedQueries(application_code, module_id),
            comment_type_id = activeTab.down('button[name=comments_btn]').comment_type_id,
            workflowaction_type_id = 1,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            },{
                field_type: 'hiddenfield',
                field_name: 'workflowaction_type_id',
                value: workflowaction_type_id
            }];
    
        // Perform initial checks before the AJAX request
        if (hasRespondedUnclosedQueries > 0) {
            Ext.getBody().unmask();
            toastr.warning('Please close responded queries to proceed!!', 'Warning Response');
            return false;
        }
        if (hasQueries == 2) {
            toastr.warning('Enter the query Items for the open query to proceed with the query submission!!', 'Warning Response');
            Ext.getBody().unmask();
            return false;
        }
    
    
        Ext.Ajax.request({
            method: 'GET',
            url: 'getApplicationComments',
            params: {
                application_id: application_id,
                application_code: application_code,
                comment_type_id: comment_type_id, 
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
    
                if (results.length < 1) {
                    toastr.warning('Please add comments before submitting!!', 'Warning Response');
                    Ext.getBody().unmask();
                    return false;
                }
    
                // If valid, proceed with showing the recommendation window
                showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsstrictrecommfrm', winWidth, storeID, 1, extraParams);
            },
            failure: function () {
                Ext.getBody().unmask();
                toastr.error('Failed to get application comments.', 'Error');
            }
        });
    },
    

    showScreeningApplicationSubmissionWin : function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id, 2),

            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
            
        if (valid == true || valid === true) {
          
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, extraParams,'','',workflow_stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },

    showTCMeetingSchedulingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateTCMeetingSchedulingApplicationSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth);
        } else {
            Ext.getBody().unmask();
        }
    },
    showTCMeetingReviewgApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
    
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth);
       
    },
    validateTCMeetingSchedulingApplicationSubmission: function (btn) {
        var valid = true,
            saveInfo = this.saveTCMeetingDetails(btn);
        if (saveInfo == false || saveInfo === false) {
            valid = false;
        }
        return valid;
    },

    showTCMeetingRecommendationApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel()
            winWidth = btn.winWidth
            activeTab = mainTabPanel.getActiveTab()
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue()
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue()
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue()
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue()
            tabpanel = activeTab.down('gvpdeskreviewmanagerrecommendationpanel')
            if(tabpanel){
                comment_type_id = tabpanel.down('button[name=comments_btn]').comment_type_id
            }else{
                comment_type_id = activeTab.down('button[name=comments_btn]').comment_type_id
            }
            
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);

            Ext.Ajax.request({
                method: 'GET',
                url: 'getApplicationComments',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    comment_type_id: comment_type_id, 
                },
                headers: {
                    'Authorization': 'Bearer'+ access_token
                },
                success: function (response) {
                    Ext.getBody().unmask()
                    var resp = Ext.JSON.decode(response.responseText)
                        results = resp.results
                        if (results.length < 1) {
                            toastr.warning('Please add comments before submitting!!', 'Warning Response')
                            Ext.getBody().unmask()
                            return false
                        }

                showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID)
            },
            failure: function () {
                Ext.getBody().unmask();
                toastr.error('Failed to get application comments.', 'Error');
            }
    });
    },

    showGVPContractManufacturerApplicationWin: function (btn){
        var mainTabPanel = this.getMainTabPanel()
            activeTab = mainTabPanel.getActiveTab()
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue()
            console.log(application_code)
            if(application_code){
                winTitle = btn.winTitle
                winWidth = btn.winWidth
                childXtype = btn.childXtype
                childObject = Ext.widget(childXtype)
                funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow')
            }else{
                toastr.warning('Save application details first', 'Warning Response')
            }      
    },

    showSingleApprovalApplicationSubmissionWin: function (btn) {
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
            //storeID = 'gvpapprovalsstr',//getApplicationStore(module_id, section_id),//static
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth);
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
            grid = activeTab.down('grid'),
            sel = grid.getSelectionModel().getSelection(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            gvp_inspection_type = sel[0].get('inspection_type_id'),
            inspection_id = sel[0].get('inspection_id'),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'gvpinspection_type_id',
                value: gvp_inspection_type
            }, {
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id
            }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagerqueryfrm', winWidth, extraParams);
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
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth);
        } else {
            Ext.getBody().unmask();
        }
    },

    //Renew
    showRenewReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateRenewGvpReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth);
        } else {
            Ext.getBody().unmask();
        }
    },

    validateRenewGvpReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            siteFrm = activeTab.down('gvpsitedetailsfrm'),
            screeningGrid = activeTab.down('gvpscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!siteFrm.isValid()) {
            toastr.warning('Please Enter All the required Name of Manufacturing facility!!', 'Warning Response');
            return false;
        }
        this.saveGvpRenewalReceivingBaseDetails(btn);
        if (sub_module_id == 6 || sub_module_id === 6) {//renewal
            if (screeningGrid.getStore().getModifiedRecords().length > 0) {
                Ext.getBody().unmask();
                toastr.warning('There are unsaved screening data!!', 'Warning Response');
                return false;
            }
        }
        return true;
    },

    showGvpApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly
            mainTabPanel = this.getMainTabPanel()
            activeTab = mainTabPanel.getActiveTab()
            console.log(activeTab);
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gvp_type_id = activeTab.down('hiddenfield[name=gvp_type_id]').getValue(),
            gvp_site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue();
        this.showGvpApplicationMoreDetailsGeneric(application_id, application_code, site_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, gvp_type_id, gvp_site_id);
    },

    showGvpApplicationMoreDetailsGeneric: function (application_id, application_code, site_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, gvp_type_id, gvp_site_id) {
        Ext.getBody().mask('Please wait...')
        var childXtype = 'gvpsiteappmoredetailswizard'
        if (sub_module_id == 40 || sub_module_id === 40) {
            childXtype = 'gvpsiteappmoredetailsaltwizard'
        }
        var me = this,
            //wizardPnl = Ext.create('Ext.tab.Panel', {layout: 'fit',items:[{xtype: childXtype, title: 'GVP Application Details '}]})
            wizardPnl = Ext.widget(childXtype),
            applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            siteFrm = wizardPnl.down('gvpsitedetailsfrm'),
            contactPersonFrm = wizardPnl.down('premisecontactpersonfrm')
            ltrFrm = wizardPnl.down('gvpltrfrm')
            billingPersonFrm = wizardPnl.down('gvpbillingdetailsfrm')
            // otherDetailsGrid = wizardPnl.down('mansiteotherdetailswingrid')
            // productLinesGrid = wizardPnl.down('productlinedetailsgrid'),
            //wizardPanel = childXtype.down('productlinedetailsgrid'),
            gvpContractManufacturersgrid = wizardPnl.down('gvpcontractmanufactureractivitygrid'),
            gvpProductDetailsGrid = wizardPnl.down('gvpproductslinkagedetailswingrid'),
            blocksGrid = wizardPnl.down('mansiteblockdetailswingrid'),
            assessmentType_fld = wizardPnl.down('combo[name=assessment_type_id]'),
            gvpType_fld = wizardPnl.down('combo[name=gvp_type_id]'),
            deviceType_fld = wizardPnl.down('combo[name=device_type_id]'),
            siteReadOnly = 0,
            personnelTabPnl = wizardPnl.down('mansitepersonneltabpnl'),
            personnelDetailsGrid = Ext.widget('mansitepersonneldetailswingrid', {
                title: 'Other Personnel'
            });
        if (gvp_type_id == 2 || gvp_type_id === 2) {
            siteReadOnly = 0;
        }
        contactPersonFrm.setMoreDetails(1);
        //personnelTabPnl.remove(personnelTabPnl.items.getAt(1));
        //personnelTabPnl.add(personnelDetailsGrid);
        wizardPnl.setHeight(550);
        applicantFrm.down('button[action=link_applicant]').setDisabled(false);
        siteFrm.down('button[action=search_site]').setDisabled(false);
        ltrFrm.down('button[action=link_ltr]').setDisabled(false);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=application_code]').setValue(application_code);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        wizardPnl.down('hiddenfield[name=gvp_type_id]').setValue(gvp_type_id);
        wizardPnl.down('hiddenfield[name=gvp_site_id]').setValue(gvp_site_id);
        wizardPnl.down('combo[name=zone_id]').setReadOnly(false);
       
        if ((siteReadOnly) && (siteReadOnly == 1 || siteReadOnly === 1)) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        }
        //personnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        // blocksGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        // otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        //productLineDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        gvpProductDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        
        siteFrm.down('hiddenfield[name=isReadOnly]').setValue(siteReadOnly);

        if (section_id==5 || section_id===5) {
          if(wizardPnl.down('productlinedetailsgrid')){
                wizardPnl.down('productlinedetailsgrid').destroy();
            }
            var wizardPanel = Ext.ComponentQuery.query("#gvpsiteappmoredetailswizard")[0];
            wizardPanel.add(2, { xtype: 'mdproductlinedetailsgrid'});
            var mdproductLinesGrid = wizardPanel.down('mdproductlinedetailsgrid');
        }
        if (section_id != 2) {
            if(wizardPnl.down('productlinedetailsgrid')){
                // productLinesGrid.columns[4].setHidden(true);
                // productLinesGrid.columns[5].setHidden(true);
                // productLinesGrid.columns[6].setHidden(true);
                // productLinesGrid.columns[7].setHidden(true);

            }
            else if(wizardPnl.down('gvpproductslinkagedetailswingrid')){
                productLinesGrid = wizardPnl.down('gvpproductslinkagedetailswingrid');
                // productLinesGrid.columns[4].setHidden(true);
                // productLinesGrid.columns[5].setHidden(true);
                // productLinesGrid.columns[6].setHidden(true);
                // productLinesGrid.columns[7].setHidden(true);
            }
          
        }
        if (sub_module_id == 40 || sub_module_id === 40) {
            wizardPnl.down('gvpvariationrequestsgrid').down('hiddenfield[name=isReadOnly]').setValue(siteReadOnly);
        }
        Ext.Ajax.request({
            method: 'GET',
            url: 'gvpapplications/getGvpApplicationMoreDetails',
            params: {
                application_id: application_id,
                site_id: site_id,
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
                    siteDetails = resp.site_details,
                    ltrDetails = resp.ltrDetails,
                    InspectionDetails = resp.inspection_details,
                    contactPersonDetails = resp.contactPersonDetails;
                    billingPersonDetails = resp.billingPersonDetails;
                if (success == true || success === true) {
                    wizardPnl.down('button[name=save_btn]').setVisible(false);
                    if (applicantDetails) {
                        var model1 = Ext.create('Ext.data.Model', applicantDetails);
                        applicantFrm.loadRecord(model1);
                    }
                    if (siteDetails) {
                        assessmentType_fld.setValue(siteDetails.assessment_type_id);
                        gvpType_fld.setValue(siteDetails.gvp_type_id);
                        deviceType_fld.setValue(siteDetails.device_type_id);
                        var model2 = Ext.create('Ext.data.Model', siteDetails);
                        siteFrm.loadRecord(model2);
                    }
                    if (ltrDetails) {
                        var model3 = Ext.create('Ext.data.Model', ltrDetails);
                        ltrFrm.loadRecord(model3);
                    }
                    if (contactPersonDetails) {
                        var model4 = Ext.create('Ext.data.Model', contactPersonDetails);
                        contactPersonFrm.loadRecord(model4);
                    }
                    if(billingPersonDetails){
                        var model5 = Ext.create('Ext.data.Model', billingPersonDetails);
                        billingPersonFrm.loadRecord(model5);
                    }
                    funcShowOnlineCustomizableWindow('Preview GVP Inspection Application'+application_code, '85%', wizardPnl, 'customizablewindow');
                    if (sub_module_id == 6 || sub_module_id === 6) {
                        if (isReadOnly < 1) {
                            siteFrm.getForm().getFields().each(function (field) {
                                field.setReadOnly(true);
                            });
                            // personnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
                            // otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(0);
                            me.fireEvent('formAuth', process_id, 1, siteFrm);
                            me.fireEvent('gvpOtherPartsAuth', process_id, wizardPnl);
                        }
                    }

                    wizardPnl.add({xtype:'applicationqueriesgrid',title: 'Request for Additional Information(Queries)'});
                    queries_panel = wizardPnl.down('applicationqueriesgrid');
                    queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                    queries_panel.down('hiddenfield[name=module_id]').setValue(module_id);
                    queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);
              
                   wizardPnl.add({xtype:'previewproductDocUploadsGrid',title: 'Application Uploaded Documents (All)'});

                    // productLinesGrid.getStore().load();
                    gvpProductDetailsGrid.getStore().load();
                    cmdStore = gvpContractManufacturersgrid.getStore().load();

                    // mdproductline_store=mdproductLinesGrid.getStore();
                    // if(mdproductline_store){
                    //     mdproductline_store.getProxy().extraParams={
                    //     manufacturing_site_id: siteDetails.manufacturing_site_id
                    //     };
                    //     if (mdproductline_store) {
                    //             mdproductline_store.removeAll();
                    //             mdproductline_store.load();
                    //     }
                    // }
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

    getLtrDetails: function (ltr_id, ltrForm) {
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getApplicantsList',
            params: {
                applicant_id: ltr_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results[0],
                    model = Ext.create('Ext.data.Model', results);
                if (success == true || success === true) {
                    ltrForm.loadRecord(model);
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

    redoManSiteOtherDetailsGrid: function (grid) {
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

    redoGvpManSitePersonnelDetailsGrid: function (grid) {
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

    showGvpInspectionSchedulesBtn: function (btn) {
        var childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('button[name=submit_selected]').setVisible(false);
        childObject.columns[childObject.columns.length - 1].setHidden(false);
        childObject.columns[childObject.columns.length - 2].setHidden(false);
        childObject.columns[childObject.columns.length - 3].setHidden(false);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showProductsSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            storeID = btn.storeID,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            site_id = activeTab.down('gvpsitedetailsfrm').down('hiddenfield[name=gvp_site_id]').getValue(),
            childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        childObject.down('button[name=add_selected]').storeID = storeID;
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showProductsSelectionListWin: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            storeID = btn.storeID,
            win = btn.up('window'),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            site_id = win.down('gvpsitedetailsfrm').down('hiddenfield[name=gvp_site_id]').getValue(),
            reg_site_id = win.down('gvpsitedetailsfrm').down('hiddenfield[name=registered_manufacturing_site_id]').getValue(),
            man_site_id = win.down('hiddenfield[name=man_site_id]').getValue(),
            childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=man_site_id]').setValue(man_site_id);
        childObject.down('hiddenfield[name=reg_site_id]').setValue(reg_site_id);
        childObject.down('button[name=add_selected]').storeID = storeID;
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    addGvpProductLinkageDetails1: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            gvp_site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue(),
            store = Ext.getStore(btn.storeID),
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: grid
                }
            );
        mask.show();
        Ext.each(records, function (record) {
            var product_id = record.get('product_id');
            if (product_id) {
                selected.push(product_id);
            }
        });
        Ext.Ajax.request({
            url: 'gvpapplications/saveGvpProductInfoLinkage',
            jsonData: selected,
            params: {
                gvp_site_id: gvp_site_id
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
                if (success == true || success === true) {
                    store.load();
                    win.close();
                    toastr.success(message, 'Success Response');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    addGvpProductLinkageDetails: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            gvp_site_id = activeTab.down('hiddenfield[name=gvp_site_id]').getValue();
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(gvp_site_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showGvpSitesSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gvp_type_id = 0;
        if (module_id == 3 || module_id === 3) {//GVP
            if (sub_module_id == 5 || sub_module_id === 5) {//New
                childXtype = 'mansitesselectiongrid';
                gvp_type_id = activeTab.down('hiddenfield[name=gvp_type_id]').getValue();
            } else {
                childXtype = 'gvpsitesselectiongrid';
            }
        }

        var childObject = Ext.widget(childXtype);
        childObject.addListener('itemdblclick', 'onManSiteSelectionListDblClick', this);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },


    showContractManufacturingSitesSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gvp_type_id = 0;
        if (module_id == 3 || module_id === 3) {
            if (sub_module_id == 5 || sub_module_id === 5) {
                childXtype = 'gvpsitesselectiongrid';
                gvp_type_id = activeTab.down('hiddenfield[name=gvp_type_id]').getValue();
            } else {
                childXtype = 'gvpsitesselectiongrid';
            }
            /* if (sub_module_id == 6 || sub_module_id === 6 || sub_module_id == 39 || sub_module_id === 39) {//Renewal,Cancellation
                 childXtype = 'gvpsitesselectiongrid';
             }*/
        }

        var childObject = Ext.widget(childXtype);
        childObject.addListener('itemdblclick', 'onContractManSiteSelectionListDblClick', this);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=gvp_type_id]').setValue(gvp_type_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
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
        childItem.down('hiddenfield[name=personnel_type]').setValue('gvp_billing_person');
        funcShowOnlineCustomizableWindow('Personnel', width, childItem, 'customizablewindow');
    },



    showContractPersonnelSelectionGrid: function (btn) {
        var form = btn.up('form'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            width = btn.winWidth,
            moreDetails = form.getMoreDetails(),
           // personnel_type = form.down('hiddenfield[name=personnel_type]').getValue(),
            childItem = Ext.widget(btn.childXtype);
        childItem.setMoreDetails(moreDetails);
        childItem.down('hiddenfield[name=trader_id]').setValue(applicant_id);
        childItem.down('hiddenfield[name=personnel_type]').setValue('contract_manufacturing_person');
        funcShowOnlineCustomizableWindow('Personnel', width, childItem, 'customizablewindow');
    },





    onManSiteSelectionListDblClick: function (view, record, item, index, e, eOpts) {//New applications
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
            if(activeTab.down('gvpsitedetailsfrm')){
               var manSiteForm = activeTab.down('gvpsitedetailsfrm');

            }else{
                var pnl_wizard = me.getGvpsiteappmoredetailswizard();

                manSiteForm = pnl_wizard.down('gvpsitedetailsfrm');
            }
        
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        manSiteForm.loadRecord(record);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },


     onContractManSiteSelectionListDblClick: function (view, record, item, index, e, eOpts) {//New applications
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            manSiteForm = Ext.ComponentQuery.query('#gvpcontractmanufacturingfrm')[0];
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();

        //manSiteForm.loadRecord(record);
        manSiteForm.down('hiddenfield[name=man_site_id]').setValue(record.get('id'));
        manSiteForm.down('textfield[name=contract_manufacturer_name]').setValue(record.get('name'));
        manSiteForm.down('textfield[name=contract_physical_address]').setValue(record.get('physical_address'));
        manSiteForm.down('combo[name=contract_country_id]').setValue(record.get('country_id'));
        manSiteForm.down('combo[name=contract_region_id]').setValue(record.get('region_id'));

        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

    onManufacturingSiteSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this
            grid = view.grid
            win = grid.up('window')
            mainTabPanel = me.getMainTabPanel()
            activeTab = mainTabPanel.getActiveTab()
            gvp_site_id = record.get('id')
            gvpSiteForm = activeTab.down('gvpsitedetailsfrm')            
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            })
        mask.show()
        gvpSiteForm.loadRecord(record)
        activeTab.down('hiddenfield[name=gvp_site_id]').setValue(gvp_site_id)
        
        Ext.Function.defer(function () {
            mask.hide()
            win.close()
        }, 200)
    },

    showGvpInspectionSchedules: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype)
            console.log(childObject)
            winTitle = btn.winTitle,
            is_assign = btn.is_assign,
            winWidth = btn.winWidth;
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        if (is_assign == 1) {
            childObject.down('button[name=sync_btn]').setVisible(true);
        }
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    addGvpApplicationIntoInspectionSchedule: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            apps_grid = activeTab.down('gvpinspectionschedulingphysicalgrid'),
            apps_sm = apps_grid.getSelectionModel(),
            app_records = apps_sm.getSelection(),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            grid = btn.up('grid'),
            win = grid.up('window'),
            sm = grid.getSelectionModel(),
            record = sm.getSelection(),
            inspection_id = record[0].get('id'),
            selected = [],
            //application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            //application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: win
                }
            );
        mask.show();
        Ext.each(app_records, function (app_record) {
            var application_code = app_record.get('application_code');
            if (application_code) {
                selected.push(application_code);
            }
        });
        Ext.Ajax.request({
            url: 'gvpapplications/addGvpApplicationIntoInspectionSchedule',
            jsonData: selected,
            params: {
                inspection_id: inspection_id
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
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    store.removeAll();
                    store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    saveTCMeetingDetails: function (btn) {
        this.fireEvent('saveTCMeetingDetails', btn);
    },

    getApplicationApprovalDetails: function (btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            table_name = btn.table_name,
            form = Ext.widget('gvpapprovalrecommendationfrm'),
            // storeArray = eval(btn.stores),
            // arrayLength = storeArray.length,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            if(btn.is_update){
                is_update=btn.is_update;
            }else{
                is_update='';
            }
        // if (arrayLength > 0) {
        //     me.fireEvent('refreshStores', storeArray);
        // }
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
                    form.down('hiddenfield[name=is_update]').setValue(is_update);
                    form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    funcShowOnlineCustomizableWindow('Recommendation', '60%', form, 'customizablewindow');
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


    onLTRselectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        
        var applicantForm = activeTab.down('gvpltrfrm');
        applicantForm.loadRecord(record);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
        
    },

    saveDeskReviewScheduleDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            toaster = btn.toaster,
            frm = form.getForm(),
            applicationsGrid = btn.up('grid'),
            sm = applicationsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
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
                url: 'gvpapplications/saveGvpDeskReviewScheduleDetails',
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

    showAddInspectionOtherDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            grid = btn.up('grid'),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue();
        if (!inspection_id) {
            toastr.warning('Please save inspection team details first!!', 'Warning Response');
            return;
        }
        childObject.down('hiddenfield[name=inspection_id]').setValue(inspection_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
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
            static_stage = getGvpModuleStaticStage(sub_module_id, section_id, target_stage);
        this.fireEvent('showPrevUploadedDocsWin', btn, section_id, module_id, sub_module_id, static_stage, application_code);
    },


    showAddGvpWithdrawalReason: function (btn) {
        var me = this,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            title = btn.winTitle,
            childObject = Ext.widget(btn.childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        if (!application_id) {
            toastr.warning('Please save application first!!', 'Warning Response');
            return false;
        }
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    }

});