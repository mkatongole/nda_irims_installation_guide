Ext.define('Admin.controller.ResearchOperationsCtr', {
    extend: 'Ext.app.Controller',

    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }, {
            ref: 'pirsampledetailstabpanel',//onPmsPlanSelectionListDblClick
            selector: '#pirsampledetailstabpanel'
        }, {
            ref: 'samplecollectionsitefrm',//onPmsPlanSelectionListDblClick
            selector: 'samplecollectionsitefrm'
        }],

        control: {
            'researchinnovationthematicgrid button[action=add]': {
                click: 'showAddSampleWindow'
            },
            'researchinnovationmeetingschedulingpnl button[name=save_btn]': {
                click: 'saveStructuredPmsReceivingBaseDetails'
            },
            'researchinnovationmeetingschedulingpnl button[name=save_button]': {
                click: 'saveMeetingDetails'
            },
            'addagendatabpnl button[name=save_thematic_areas]': {
                click: 'addThematicArea'
            },
            'addagendatabpnl button[name=edit_thematic_areas]': {
                click: 'updateThematicArea'
            },
            'researchinnovationthematicgrid button[action=process_submission_btnn]': {
                click: 'saveResearchInnovationApplicationSubmissionWin'
            },
            'researchevaluationdocpanel button[name=process_submission_btn]': {
                click: 'saveResearchInnovationApplicationSubmissionWin'
            },
            'researchmanagerreviewgrid button[action=process_submission_btn]':{
                click: 'saveResearchInnovationApplicationSubmissionWin'
            },
            'irmeetingschedulinggrid button[action=process_submission_btn]':{ 
                click: 'saveResearchInnovationApplicationSubmissionWin'
            },
            'researchevaluationdocpanel button[name=prev_comments]': {
                click: 'showCommentsWin'
            },
            'researchapprovalsgrid button[action=process_submission_btn]': {
                click: 'saveResearchInnovationApplicationSubmissionWin'
            },
            'researchworkplandetailspnl form toolbar button[name=more_app_details]':{
                click: 'customShowIRMoreAppDetails',
            },
            'researchinnovationthematicgrid': {
                refresh: 'refreshThematicDetailsGrid',   
            },
            'researchinnovationmeetingschedulingpnl': {
                afterrender: 'prepareNewRIMeetingReceiving'
            },
            'researchinnovationreviewmeetingrecommendationpnl': {
                afterrender: 'prepareNewRIMeetingRecommendation'
            },
            'newresearchmaterialwizard':{
                afterrender: 'prepareNewInternalResearchReceiving'
            },
            'researchdetailspnl': {
                afterrender: 'prepareNewInternalResearchReceiving'
            },
            'researchReviewRecommendationFrm': {
                afterrender: 'prepareManagerRecommendationForm'
            },
            'irmeetingschedulingpnl':{
                afterrender: 'prepareIRMeetingSchedulePanel',
            },
            'tcmeetingparticipantsgrid': {
                refresh: 'refreshTcMeetingParticipantsGrid'
            },
            'grantapplicationwizardfrm button[action=save-grant]': {
                click:  'saveGrantApplicationInformation'
            },
            'newresearchmaterialwizard button[action=save_application_details]':{
                click:'saveApplicantInternalResearchDetails' 
            },
            'newresearchmaterialwizard button[action=submit_application]':{
                click:'showNewReceivingApplicationSubmissionWin'  
            },
            'researchapprovalrecommendationfrm button[name=save_recommendation]': {
                click: 'saveIRApplicationApprovalDetails'
            },
            'irmeetingschedulingpnl button[action=save_me]': {
                click: 'saveIRMeetingDetails'
            },
            'irmeetingschedulingpnl button[action=process_submission_btn]':{
                click:'showNewReceivingApplicationSubmissionWin'  
            },
            'researchworkplandetailspnl button[action=process_submission_btn]': {
                click: 'showNewReceivingApplicationSubmissionWin' 
            }
           
        }  
    },

    init: function () {

    },
  
    listen: {
        controller: {
            '*': {
                newResearchOperationsApplication: 'onNewResearchOperationsApplication',
                setResearchOperationsCombosStore: 'setResearchOperationsCombosStore',
                showRIThematicRecommendationUploads: 'showRIThematicRecommendationUploads',
                customShowApplicationMoreDetailsGenericWin: 'customShowApplicationMoreDetailsGenericWin',
                custStoreConfig:'custStoreConfig',
            }
        }
    },
    



    addThematicArea: function(btn){

        var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        table_name = btn.table_name,
        pnl = activeTab.down('researchinnovationmeetingschedulingpnl')
        grid = pnl.down('researchinnovationthematicgrid'),
        meeting_id = activeTab.down('hiddenfield[name=meeting_id]').getValue(),
        form = btn.up('form'),
        frm = form.getForm(),
        win = form.up('window'),
        action_url = 'researchoperations/saveThematicArea';


    if (frm.isValid()) {
        frm.submit({
            url: action_url,
            params: {  
                table_name: table_name,
                meeting_id: parseFloat(meeting_id),
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            waitMsg: 'Please wait...',
            success: function (frm, action) {
                Ext.getBody().unmask();
                var resp = action.result,
                    success = resp.success,
                    message = resp.message;
                    record_id = resp.record_id;
                    
                if (success == true || success === true) {
                    toastr.success(message, "Success Response");
                    win.close();
                    grid.getStore().reload();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (fm, action) {
                var resp = action.result;
                toastr.error(resp.message, 'Failure Response');
            }
        });
    }
    },

    updateThematicArea: function (btn){
        var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        table_name = 'tra_thematic_areas',
        meeting_id = activeTab.down('hiddenfield[name=meeting_id]').getValue(),
        form = btn.up('form'),
        frm = form.getForm(),
        //thematic_id = form.down('hiddenfield[name=thematic_id]').getValue(),

        win = form.up('window'),
        action_url = 'researchoperations/updateThematicArea';

        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                params: {  
                    table_name: table_name,
                    meeting_id: parseFloat(meeting_id),
                
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                waitMsg: 'Please wait...',
                success: function (frm, action) {
                    Ext.getBody().unmask();
                    var resp = action.result,
                        success = resp.success,
                        message = resp.message;
                        record_id = resp.record_id;
                        
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }

    },

    refreshThematicDetailsGrid: function (me) {
         var store = me.store,
             mainTabPanel = this.getMainTabPanel(),
             activeTab = mainTabPanel.getActiveTab(),
             application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();

         store.getProxy('researchoperations/getMeetingThematicDetails').extraParams = {
             application_id: parseFloat(application_id),
             table_name: 'tra_thematic_areas',
         };
     },

    refreshTcMeetingParticipantsGrid: function (me) {
        var store = me.store,
             mainTabPanel = this.getMainTabPanel(),
             activeTab = mainTabPanel.getActiveTab(),
             application_id = activeTab.down('hiddenfield[name=meeting_id]').getValue();

         store.getProxy('researchoperations/getResearchOperationsMeetingParticipants').extraParams = {
             application_id: parseFloat(application_id),
             table_name: 'tc_meeting_participants'
         };
    },
    onNewResearchOperationsApplication: function (sub_module_id, wrapper_xtype) {

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
        // console.log(workflowContainer);
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

    setResearchOperationsCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.surveillance.SurveillanceComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    showAddSampleWindow: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            meeting_id = activeTab.down('hiddenfield[name=meeting_id]').getValue(),
            childObject = Ext.widget(childXtype);
            if (!meeting_id) {
                toastr.warning('Please save meeting details first!', 'Warning Response');
                return false;
            }
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showCommentsWin: function (item) {
        var me = this
            mainTabPnl = me.getMainTabPanel(),
            containerPnl = mainTabPnl.getActiveTab();
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            pnl = Ext.widget(childXtype);
            // console.log(childXtype, internal_research_id);
            pnl.down('hiddenfield[name=application_id]').setValue(active_application_id);
            pnl.down('hiddenfield[name=application_code]').setValue(active_application_code);
            pnl.down('hiddenfield[name=comment_type_id]').setValue(item.comment_type_id);

            
        funcShowCustomizableWindow(winTitle, winWidth, pnl, 'customizablewindow');
    
    },

    saveResearchInnovationApplicationSubmissionWin: function (btn) {

        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),

            valid = true,
            storeID = 'researchinnovationstr',
            table_name = 'tra_researchoperations_applications';

            if (valid == true || valid === true) {
               showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
            } else {
                Ext.getBody().unmask();
         }
    },

    saveInternalResearchApplicationSubmissionWin: function (btn) {

        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),

            valid = true,
            storeID = 'researchinnovationstr',
            table_name = 'tra_internalresearch_details';

            if (valid == true || valid === true) {
               showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
            } else {
                Ext.getBody().unmask();
         }
    },


    saveMeetingDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            meeting_details_form = activeTab.down('meetingdetailsfrm').getForm(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            meeting_id = activeTab.down('hiddenfield[name=meeting_id]').getValue();


        if(meeting_details_form.isValid()) {
            meeting_details_form.submit({
                url: 'researchoperations/saveNewReceivingBaseDetails',
                waitMsg: 'Please wait...',
                async: false,
                params: {
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    process_id: process_id,
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
                        ref_no = resp.reference_no,
                        application_code = resp.application_code,
                        meeting_id = resp.meeting_id;
                    if (success == true || success === true) {
                        
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                            activeTab.down('hiddenfield[name=meeting_id]').setValue(meeting_id);
                            activeTab.down('hiddenfield[name=id]').setValue(meeting_id);

                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
            })
        }
    },

    saveIRMeetingDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            meeting_details_form = activeTab.down('meetingdetailsfrm').getForm(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            meeting_id = activeTab.down('hiddenfield[name=meeting_id]').getValue();


        if(meeting_details_form.isValid()) {
            meeting_details_form.submit({
                url: 'researchoperations/saveNewReceivingBaseDetails',
                waitMsg: 'Please wait...',
                async: false,
                params: {
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    process_id: process_id,
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
                        ref_no = resp.reference_no,
                        application_code = resp.application_code,
                        meeting_id = resp.meeting_id;
                    if (success == true || success === true) {
                        
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                            activeTab.down('hiddenfield[name=meeting_id]').setValue(meeting_id);
                            activeTab.down('hiddenfield[name=id]').setValue(meeting_id);
                            activeTab.down('button[name=submit_selected]').setDisabled(false);

                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
            })
        }
    },


    saveStructuredPmsReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            directorate_fld = activeTab.down('combo[name=directorate_id]'),
            district_id = activeTab.down('combo[name=district_id]').getValue(),
            region_id = activeTab.down('combo[name=directorate_id]').getValue(),
            sampling_site_id = activeTab.down('combo[name=sampling_site_id]').getValue(),
            program_id = activeTab.down('hiddenfield[name=program_id]').getValue(),
            program_implementation_id = activeTab.down('hiddenfield[name=program_implementation_id]').getValue(),
            
    
            zone_id = zone_fld.getValue(),
            directorate_id = directorate_fld.getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            collectionSiteForm = activeTab.down('samplecollectionsitefrm'),
            collectionSiteFrm = collectionSiteForm.getForm();
        if (!zone_id) {
            toastr.warning('Please select zone!!', 'Warning Response');
            return false;
        }
        if (!directorate_id) {
            toastr.warning('Please select directorate!!', 'Warning Response');
            return false;
        }
       
        if (collectionSiteFrm.isValid()) {
            collectionSiteFrm.submit({
                url: 'surveillance/saveNewReceivingBaseDetails',
                waitMsg: 'Please wait...',
                async: false,
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id,
                    directorate_id: directorate_id,
                    district_id:district_id,
                    region_id:region_id,
                    sampling_site_id:sampling_site_id,
                    program_id:program_id,
                    program_implementation_id:program_implementation_id
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
                        ref_no = resp.reference_no,
                        application_code = resp.application_code,
                        sample_site_id = resp.sample_site_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            zone_fld.setReadOnly(true);
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            collectionSiteForm.down('hiddenfield[name=sample_site_id]').setValue(sample_site_id);
                            activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
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
            toastr.warning('Please fill all the required fields(Sample Collection Site)!!', 'Warning Response');
            return false;
        }
    },

    prepareNewRIMeetingReceiving: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
        this.prepareResearchOperationsMeeting(activeTab, 0);
    },

    prepareNewRIMeetingRecommendation: function () {
    var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab();
        thematicGrid = activeTab.down('researchinnovationthematicgrid');
        widgetCol = thematicGrid.columns[thematicGrid.columns.length - 2];
        widgetCol.setHidden(false);
        this.prepareResearchOperationsMeeting(activeTab, 1);
    },
    
    prepareResearchOperationsMeeting: function(activeTab, isReadOnly){
        var me = this,
            meetingDetailsFrm = activeTab.down('meetingdetailsfrm'),
            participantsGrid = activeTab.down('tcmeetingparticipantsgrid'),
            participantsStore = participantsGrid.getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            participantsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
           if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            meetingDetailsFrm.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
         }

            Ext.Ajax.request({
                method: 'GET',
                url: 'researchoperations/getResearchOperationsMeetingDetails',
                params: {
                    application_id: application_id,
                    table_name: 'tra_researchoperations_applications'
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
                            var meeting_id = results.id;
                            meetingDetailsFrm.loadRecord(model);
                            participantsStore.load();
                            activeTab.down('hiddenfield[name=meeting_id]').setValue(meeting_id);

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
    },

    prepareIRMeetingSchedulePanel: function(){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            meetingDetailsFrm = activeTab.down('meetingdetailsfrm'),
            participantsGrid = activeTab.down('tcmeetingparticipantsgrid'),
            participantsStore = participantsGrid.getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();

            Ext.Ajax.request({
                method: 'GET',
                url: 'researchoperations/getResearchOperationsMeetingDetails',
                params: {
                    application_id: application_id,
                    table_name: 'tra_researchoperations_applications'
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
                            var meeting_id = results.id;
                            meetingDetailsFrm.loadRecord(model);
                            participantsStore.load();
                            activeTab.down('hiddenfield[name=meeting_id]').setValue(meeting_id);
                            activeTab.down('hiddenfield[name=id]').setValue(meeting_id);

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
    },

    prepareManagerRecommendationForm: function(item){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            recommendationFrm = item.getForm(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            console.log(recommendationFrm);

            Ext.Ajax.request({
                method: 'GET',
                url: 'researchoperations/getManagerRecommendationData',
                params: {
                    application_code: application_code,
                    table_name: 'mg_recommendations',
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
                            var recommendation_id = results.id;
                            recommendationFrm.loadRecord(model);
                            item.down('hiddenfield[name=id]').setValue(recommendation_id);
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
            })

    },

    showRIThematicRecommendationUploads: function (btn) {

        var me = this,
         
            record = btn.getWidgetRecord(),
            thematic_id = record.get('id'),
            childXtype = btn.childXtype,
            meeting_id = record.get('meeting_id'),
           
            isReadOnly = btn.isReadOnly,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            childObject = Ext.widget(childXtype),
            tc_reviewform = childObject.down('form'),
            application_upload = childObject.down('productEvaluationUploadsGrid');
            console.log(record);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        tc_reviewform.down('hiddenfield[name=thematic_id]').setValue(thematic_id);
        tc_reviewform.down('hiddenfield[name=meeting_id]').setValue(meeting_id);
        tc_reviewform.down('combo[name=decision_id]').setValue(record.get('decision_id'));
        tc_reviewform.down('textarea[name=comments]').setValue(record.get('comments'));
        if(isReadOnly){
            tc_reviewform.down('button[name=save_tcrecommendation]').setVisible(false);
            tc_reviewform.down('combo[name=decision_id]').setReadOnly(true);
            tc_reviewform.down('textarea[name=comments]').setReadOnly(true);
            
        }

        Ext.Ajax.request({
            method: 'GET',
            url: 'researchoperations/getRITcRecommendationData',
            params: {
                thematic_id: thematic_id,
                table_name: 'tra_researchinnovation_tc_recommendations'
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
                        toastr.success(message, "Success Response");
                        var model = Ext.create('Ext.data.Model', results);
                        tc_reviewform.loadRecord(model);
                        tc_reviewform.down('hiddenfield[name=ritc_recommendation_id]').setValue(results.id);
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

        application_upload.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        application_upload.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
        application_upload.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
        application_upload.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
        application_upload.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('workflow_stage_id'));
        application_upload.down('hiddenfield[name=application_code]').setValue(record.get('application_code'));
        application_upload.down('hiddenfield[name=prodclass_category_id]').setValue(record.get('prodclass_category_id'));
        childObject.setHeight(400);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
        
    },

    prepareRITcRecommendationFrm: function(){
        var me = this,
            // grid = btn.down('grid'),
            // form = btn.childXtype,
            thematic_id = tcRecommendationsFrm.down('hiddenfield[name=thematic_id]').setValue();
            console.log(tcRecommendationsFrm, thematic_id);
           

            Ext.Ajax.request({
                method: 'GET',
                url: 'researchoperations/getRITcRecommendationData',
                params: {
                    thematic_id: thematic_id,
                    table_name: 'tra_researchinnovation_tc_recommendations'
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
                            var meeting_id = results.id;
                            tcRecommendationsFrm.loadRecord(model);
                            activeTab.down('hiddenfield[name=thematic_id]').setValue(thematic_id);

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

    },


    saveGrantApplicationInformation: function (btn) {
            var me = this,
                mainTabPanel = me.getMainTabPanel(),
                activeTab = mainTabPanel.getActiveTab(),
                grantForm = activeTab.down('grantapplicationbasicinfofrm'),
                grantGrid = activeTab.down('grantapplicationgrid'),
                frm = grantForm.getForm();
              
            if (frm.isValid()) {
                frm.submit({
                    url: 'researchoperations/saveUpdateGrantApplication',
                    params: {
                        _token: token
                    },
                    waitMsg: 'Please wait...',
                    success: function (fm, action) {
                        var response = Ext.decode(action.response.responseText),
                            message = response.message,
                            success = response.success;
                        if (success == true || success === true) {
                            /*dashboardContainer*/
                            grantGrid.store.load();
                            // grid2 = Ext.widget("unstructureddocumentuploadsgrid")
                            grid.show();
                            toastr.success(message, 'Success Response');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (form, action) {
                        var response = Ext.decode(action.response.responseText),
                            message = response.message,
                            success = response.success;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                toastr.warning('Invalid form submission, please fill all the required details!!', 'Warning Response');
                return false;
            }
    },

    // Ann

    saveApplicantInternalResearchDetails: function (btn) {
        var wizard = btn.wizardpnl,
             wizardPnl = btn.up(wizard),
            action_url = btn.action_url,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
             
            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            checkapplication_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            researchappdetailsfrm = containerPnl.down('researchappdetailsfrm'),
            
            // researchdocuploadsgenericgrid = containerPnl.down('researchdocuploadsgenericgrid'),
            // promotiommaterialproductgrid= containerPnl.down('promotiommaterialproductgrid'),

            promotionapplicantdetailsfrm = containerPnl.down('researchapplicantdetailsfrm'),
            applicant_id = promotionapplicantdetailsfrm.down('hiddenfield[name=applicant_id]').getValue();
            localapplicantdetailsfrm = containerPnl.down('localapplicantdetailsfrm')
            //local_agent_id = localapplicantdetailsfrm.down('hiddenfield[name=applicant_id]').getValue();
            
        if (!applicant_id) {
            //toastr.warning('Please select applicant!!', 'Warning Response');
            //return false;
        }
        // if (!local_agent_id) {
        //     //toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
        //     //return false;
        // }
     
        if (researchappdetailsfrm.isValid()) {
            researchappdetailsfrm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: 1,
                    '_token': token
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        active_application_id = resp.record_id,
                        application_code=resp.application_code,
                        process_id=resp.process_id,
                        tracking_no = resp.tracking_no,
                        internal_research_id = resp.irmd_id;
                        
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        if (checkapplication_id == '') {
                            containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                            containerPnl.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            containerPnl.down('hiddenfield[name=process_id]').setValue(process_id);
                            containerPnl.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            containerPnl.down('displayfield[name=internal_research_id]').setValue(internal_research_id);
                            // researchdocuploadsgenericgrid.load();
                            // promotiommaterialproductgrid.load();
                            
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
        }
    },

    showNewReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateInternalResearchReceivingSubmission(btn),
            product_type = activeTab.down('product_type_id'),
            storeID = 'researchoperationapplicationstr',
            table_name ='tra_researchoperations_applications';//getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },
    validateInternalResearchReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('researchapplicantdetailsfrm'),
            // applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            promotiommaterialproductgrid = activeTab.down('promotiommaterialproductgrid'),
        
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        // if (!applicant_id) {
        //     toastr.warning('Please Select Applicant!!', 'Warning Response');
        //     return false;
        // }
    
        return true;
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
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            //workflowsubmissionsfrm
             showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsstrictrecommfrm', winWidth, storeID, 2);
        } else {
            Ext.getBody().unmask();
        }
    },
    prepareNewInternalResearchReceiving: function(){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            internalResearchFrm = activeTab.down('researchappdetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();

            Ext.Ajax.request({
                method: 'GET',
                url: 'researchoperations/getResearchOperationsInternalResearch',
                params:{
                    application_id: application_id,
                    table_name: 'tra_internalresearch_details'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText);
                        if(resp.success === true) {
                            var model = Ext.create('Ext.data.Model', resp.results);
                            console.log(resp.results);
                            var internal_research_id = resp.results.irmd_id;
                            internalResearchFrm.loadRecord(model);
                            activeTab.down('hiddenfield[name=internal_research_id]').setValue(internal_research_id);
                            toastr.success(resp.message, 'Data retrieved successfully');
                        }else{
                            toastr.error('Error', resp.message);
                        }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText);
                    toastr.error('Error', resp.message);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                },
            })


    },

    customShowIRMoreAppDetails: function() {
        Ext.getBody().mask('Please wait...');
        var me =  this,
        mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        activeTab = activeTab.up('panel'),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
        application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),

        childXtype = 'researchmoredetailswizard',
        activeTab = Ext.create('Ext.tab.Panel', {layout: 'fit',items:[{xtype: childXtype, title: 'Internal Research Report '}]}),
        wizardPnl = activeTab;
        wizard_pnl = activeTab.down('researchmoredetailswizard'),
        detailsfrm = activeTab.down('#researchappdetailsfrm'),
        viewModel = wizard_pnl.getViewModel();
        activeTab.setHeight(500);

        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'researchoperations/getResearchOperationsInternalResearch',
                params: {
                    application_id: application_id,
                    table_name: 'tra_internalresearch_details'
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

                        detailsfrm.loadRecord(model);
                        viewModel.set({readOnly:true});
                        viewModel.set({isReadOnly:true});
                    
                        funcShowOnlineCustomizableWindow('Preview Research', '85%', wizardPnl, 'customizablewindow');
                        
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
        }
    },

    customShowApplicationMoreDetailsGenericWin: function (record,show_portal_btns) {
        Ext.getBody().mask('Please wait...');
        var me = this;
           
        var me = this, mainTabPanel = this.getMainTabPanel(),
            childXtype = 'researchmoredetailswizard',
            activeTab = Ext.create('Ext.tab.Panel', {layout: 'fit',items:[{xtype: childXtype, title: 'Internal Research Report '}]}),
          
            wizardPnl = activeTab;
            var wizard_pnl = activeTab.down('researchmoredetailswizard'),
            products_detailsfrm = activeTab.down('#researchappdetailsfrm'),
       
            application_id = record.get('active_application_id'),
            application_code= record.get('application_code'),
            section_id= record.get('section_id'),
            viewModel = wizard_pnl.getViewModel();
             wizardPnl.setHeight(500);
        filter = {section_id: section_id};
       
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'researchoperations/getResearchOperationsInternalResearch',
                params: {
                    application_id: application_id,
                    table_name: 'tra_internalresearch_details'
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

                        products_detailsfrm.loadRecord(model);

                       
                        wizardPnl.down('displayfield[name=application_status]').setValue(record.get('application_status'));
                        wizardPnl.down('displayfield[name=tracking_no]').setValue(record.get('tracking_no'));
                        
                        wizardPnl.down('hiddenfield[name=active_application_id]').setValue(record.get('active_application_id'));
                        wizardPnl.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
                        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('workflow_stage_id'));
                        wizardPnl.down('hiddenfield[name=application_id]').setValue(record.get('application_id'));
                        wizardPnl.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
                        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
                        wizardPnl.down('hiddenfield[name=application_status_id]').setValue(record.get('application_status_id'));
                        wizardPnl.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
                        
                        viewModel.set({readOnly:true});
                        viewModel.set({isReadOnly:true});
                        
                        wizardPnl.add({xtype:'applicationqueriesgrid',title: 'Request for Additional Information(Queries)'});
                        queries_panel = wizardPnl.down('applicationqueriesgrid');
                        queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('workflow_stage_id'));
                        queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                        queries_panel.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
                        queries_panel.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
                        queries_panel.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
                        
                        wizardPnl.add({xtype:'previewproductDocUploadsGrid',title: 'Application Uploaded Documents (All)'});


                        documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
                        documents_grid.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
                        documents_grid.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
                        documents_grid.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
                        documents_grid.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
                        documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);

                        funcShowOnlineCustomizableWindow(record.get('tracking_no'), '85%', wizardPnl, 'customizablewindow');
                        
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
        }
        
        
     
    },

    
    custStoreConfig:function(me, options){
        

        
        var config = options.config,
         workflow_stage_id=me.up('panel').up('panel').down('hiddenfield[name=workflow_stage_id]').getValue(),
         section_id=me.up('panel').up('panel').down('hiddenfield[name=section_id]').getValue(),
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.premiseRegistration.PremiseRegGridAbstractStore', config);
            
        
        me.setStore(store);
        
        toolbar.setStore(store);
        
    
        
        if (isLoad === true || isLoad == true) {
            
            store.removeAll();
            store.load({
                params: {
                    table_name:'tra_researchoperations_applications',
                    workflow_stage_id: workflow_stage_id,
                }
            });
          
        } 
    },

    saveIRApplicationApprovalDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = btn.up('form'),
            frm = form.getForm(),
            action_url = 'saveApplicationApprovalDetails',
            win = form.up('window');
            table_name = btn.table_name;
            console.log(table_name);
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        // mainStore.load();
                        toastr.success(message, "Success Response");
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },


   






});