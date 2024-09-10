Ext.define('Admin.controller.PvCtr', {
    extend: 'Ext.app.Controller',
    stores: [],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }
        ],
        control: {
            'pvtb button[name=pvHomeBtn]': {
                click: 'pvHome'
            },
            'pvgrid': {
                refresh: 'refreshPvMainGrids'
            },
            'psurproductgrid': {
                refresh: 'refreshGridsWithAppDetails'
            },
            'pvtestGrid': {
                refresh: 'refreshGridsWithAppDetails'
            },

            'pvstudyinformationtGrid': {
                refresh: 'refreshGridsWithAppDetails'
            },
             'pvstudydetailsGrid': {
                refresh: 'refreshGridsWithAppDetails'
            },
             'pvSuspectedassessmentDrugGrid': {
                refresh: 'refreshGridsWithAppDetails'
            },
             'pvmedicalhistoryGrid': {
                refresh: 'refreshGridsWithAppDetails'
            },

            'casualityevaluationgrid': {
                refresh: 'refreshGridsWithAppDetails'
            },

            'whocasualityevaluationgrid': {
                refresh: 'refreshGridsWithAppDetails'
            },
            
            
            'pvdrughistoryGrid': {
                refresh: 'refreshGridsWithAppDetails'
            },
            'pvpersonnelGrid': {
                refresh: 'refreshGridsWithAppDetails'
            },

            'pvindicationgrid': {
                refresh: 'refreshGridsWithAppDetails'
            },
            'pvadditionalproblemsgrid': {
                refresh: 'refreshGridsWithAppDetails'
            },

             'pvsenderGrid': {
                refresh: 'refreshGridsWithAppDetails'
            },

            'pvpersonnelFrm combo[name=country_id]': {
                afterrender: 'afterPVCountriesComboRender'
            },


             'pvreactionGrid': {
                refresh: 'refreshGridsWithAppDetails'
            },

            'newPvReceivingWizard': {
                afterrender: 'preparePvReceiving'
            },
            'newPvReceivingWizard button[name=process_submission_btn]': {
                click: 'showReceivingApplicationSubmissionWin'
            },

             'evaluationPvReceivingWizard': {
                afterrender: 'preparePvReceiving'
            },
            'evaluationPvReceivingWizard button[name=process_submission_btn]': {
                click: 'showReceivingApplicationSubmissionWin'
            },

            'facilitySelectionGrid': {
                itemdblclick: 'onFacilitySelectionListDblClick'
            },

            'pvltrselectiongrid': {
                itemdblclick: 'onLTtrSelectionListDblClick'
            },


            //meeting panel 
            'pvReviewPeerSchedulingPnl': {
                afterrender: 'preparePvManagerMeeting'
            },
            'pvReviewRcSchedulingPnl': {
                afterrender: 'preparePvManagerMeeting'
            },
            'pvReviewPeerMeetingPnl': {
                afterrender: 'preparePvManagerMeeting'
            },
            'pvReviewRcMeetingPnl': {
                afterrender: 'preparePvManagerMeeting'
            },
            'pvPeerMeetingApplicationListGrid button[name=save_btn]': {
                click: 'saveTCMeetingDetails'
            },

             'whodrugproductSelectionGrid': {
                itemdblclick: 'onWHODrugselectionListDblClick'
            },

            'frequentreportersselectiongrid': {
                itemdblclick: 'onFrequentReporterSelectionListDblClick'
            },

            'pvRcMeetingApplicationListGrid button[name=save_btn]': {
                click: 'saveTCMeetingDetails'
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
                onNewPvApplication: 'onNewPvApplication',
                funcActiveOtherPvInformationTab: 'funcActiveOtherPvInformationTab',
                showPvApplicationMoreDetails: 'showPvApplicationMoreDetails',
                showPvRegisterMoreDetails: 'showPvRegisterMoreDetails'
                // showDynamicSelectionList: 'showDynamicSelectionList',
                // LoadCallerForm: 'LoadCallerForm',
                // viewApplicationRecommendationLogs: 'viewApplicationRecommendationLogs',
                // onReProductRegApplication: 'onReProductRegApplication',
                // doSaveResearchFindings: 'doSaveResearchFindings'
            }
        }
    },
    onNewPvApplication: function (sub_module_id, btn, section_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_dataammendment_request = btn.is_dataammendment_request,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#pvDashWrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id, is_dataammendment_request);

        if (!workflow_details || workflow_details.length === 0) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=prodclass_category_id]').setValue(workflow_details.prodclass_category_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
        //reload Stores 
        //console.log(section_id);
        var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: workflow_details.processId,
                workflow_stage: workflow_details.initialStageId
            }
        });
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);

    },
     pvHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#pvDashWrapper');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: sec_dashboard});
        }
    },



     onWHODrugselectionListDblClick: function (view, record, item, index, e, eOpts) {
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
        
        //var drugForm = activeTab.down('pvSuspectedDrugFrm');
        drugForm = Ext.ComponentQuery.query("#pvsuspectedgrugfrm")[0];

        drugHistoryForm = Ext.ComponentQuery.query("#pvdrughistoryfrm")[0];

       if(drugForm){
          drugForm.down('textfield[name=who_drug_name]').setValue(record.get('drugName'));
          if(record.get('maHolder_name')){
            drugForm.down('textfield[name=mah_holder]').setValue(record.get('maHolder_name'));
          }
          
        }

        if(drugHistoryForm){
          drugHistoryForm.down('textfield[name=previous_medication_whodrug]').setValue(record.get('drugName'));
          
        }
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
        
    },

      onFrequentReporterSelectionListDblClick: function (view, record, item, index, e, eOpts) {
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
        
        pvpersonnelFrm = Ext.ComponentQuery.query("#pvpersonnelfrm")[0];
        pvpersonnelFrm.loadRecord(record);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
        
    },

    onFacilitySelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            pvpersonnelFrm = Ext.ComponentQuery.query("#pvpersonnelfrm")[0];
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        if(pvpersonnelFrm){
            pvpersonnelFrm.down('hiddenfield[name=facility_id]').setValue(record.get('facility_id'))
            pvpersonnelFrm.down('textfield[name=facility_name]').setValue(record.get('facility_name'))
            pvpersonnelFrm.down('combo[name=facility_authority_id]').setValue(record.get('facility_authority_id'))
            pvpersonnelFrm.down('combo[name=facility_level_id]').setValue(record.get('facility_level_id'))
            pvpersonnelFrm.down('combo[name=facility_ownership_id]').setValue(record.get('facility_ownership_id'))
            pvpersonnelFrm.down('combo[name=facility_hsd_id]').setValue(record.get('facility_hsd_id'))

        }  
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

     onLTtrSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            pvpersonnelFrm = Ext.ComponentQuery.query("#pvpersonnelfrm")[0];
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        if(pvpersonnelFrm){
            //pvpersonnelFrm.loadRecord(record);
            pvpersonnelFrm.down('hiddenfield[name=ltr_id]').setValue(record.get('ltr_id'))
            pvpersonnelFrm.down('textfield[name=ltr_name]').setValue(record.get('ltr_name'))
            pvpersonnelFrm.down('textfield[name=link_permit_no]').setValue(record.get('link_permit_no'))
            pvpersonnelFrm.down('textfield[name=link_physical_address]').setValue(record.get('link_physical_address'))
            pvpersonnelFrm.down('textfield[name=link_telephone]').setValue(record.get('link_telephone'))
        }  
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

        afterPVCountriesComboRender: function (cmbo) {
        var form = cmbo.up('form'),
            store = cmbo.getStore(),
            filterObj = {is_local:1},
            filterStr = JSON.stringify(filterObj);
        store.removeAll();
        },
        

     showPvRegisterMoreDetails: function (btn,application_code,ref_no) {
        var isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
          
        this.showPvApplicationMoreDetailsGeneric(application_code,'pvmoredetailswizard',isReadOnly,ref_no);
    },


     showPvApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
             tracking_no=activeTab.down('displayfield[name=tracking_no]');
            if(!ref_no && !tracking_no){
                ref_no = activeTab.down('displayfield[name=tracking_no]').getValue();
            }
      this.showPvApplicationMoreDetailsGeneric(application_code,'pvmoredetailswizard',isReadOnly,ref_no);
    },


    refreshPvMainGrids: function (me) {

        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = (activeTab.down('hiddenfield[name=section_id]')) ? grid.down('combo[name=section_id]').getValue() : null,
            sub_module_id = (grid.down('combo[name=sub_module_id]')) ? grid.down('combo[name=sub_module_id]').getValue() : null,
            workflow_stage_id = (grid.down('combo[name=workflow_stage_id]')) ? grid.down('combo[name=workflow_stage_id]').getValue() : null;

            store.getProxy().extraParams = {
                module_id: module_id,
                sub_module_id: sub_module_id,
                section_id: section_id,
                workflow_stage_id: workflow_stage_id
            };

    },
    refreshGridsWithAppDetails: function (me) {

        var store = me.store,
            grid = me.up('grid'),
            reaction_id='',
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            is_other_drugs_used = grid.is_other_drugs_used;

            if(grid.down('hiddenfield[name=reaction_id]')){
              reaction_id = grid.down('hiddenfield[name=reaction_id]').getValue();   
            }
           

            store.getProxy().extraParams = {
                module_id: module_id,
                sub_module_id: sub_module_id,
                section_id: section_id,
                workflow_stage_id: workflow_stage_id,
                application_code: application_code,
                is_other_drugs_used: is_other_drugs_used,
                reaction_id: reaction_id
            };

    },

    preparePvReceiving: function (me) {
        // this.updateVisibilityAccess(me);
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            pvpatientFrm = activeTab.down('pvpatientFrm'),
            pvSuspectedassessmentDrugGrid = activeTab.down('pvSuspectedassessmentDrugGrid'),
            // localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            detailsFrm = activeTab.down('pvDetailsFrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

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
            Ext.Ajax.request({
                method: 'GET',
                url: 'pv/prepareNewPvReceivingStage',
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
                        // ltrResults = resp.ltrDetails,
                        model = Ext.create('Ext.data.Model', results);
                        // ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {
                        detailsFrm.loadRecord(model);
                        pvpatientFrm.loadRecord(model);
                        // localagentFrm.loadRecord(ltr_model);
                        activeTab.down('hiddenfield[name=invoice_id]').setValue(results.invoice_id);
                        if(results.report_category_id==3){
                              var add_btn = pvSuspectedassessmentDrugGrid.down('button[name=update_report]'),
                                whoWidgetCol = pvSuspectedassessmentDrugGrid.columns[pvSuspectedassessmentDrugGrid.columns.length - 2];
                                naranjoWidgetCol = pvSuspectedassessmentDrugGrid.columns[pvSuspectedassessmentDrugGrid.columns.length - 3];
                                outComeWidgetCol = pvSuspectedassessmentDrugGrid.columns[pvSuspectedassessmentDrugGrid.columns.length - 4];
                                eafiCategoryWidgetCol = pvSuspectedassessmentDrugGrid.columns[pvSuspectedassessmentDrugGrid.columns.length - 5];
                                add_btn.setVisible(true);
                                whoWidgetCol.setHidden(true);
                                outComeWidgetCol.setHidden(true);
                                naranjoWidgetCol.setHidden(true);
                                eafiCategoryWidgetCol.setHidden(false);
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
    showReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            is_dataammendment_request =0,
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            storeID = 'intraystr';
            if(activeTab.down('hiddenfield[name=is_dataammendment_request]')){
                is_dataammendment_request = activeTab.down('hiddenfield[name=is_dataammendment_request]').getValue();
            }


        valid = this.validateNewPvReceivingSubmission();
        if (valid) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID,'','','',workflow_stage_id,is_dataammendment_request);
          
        } else {
            Ext.getBody().unmask();
            // toastr.warning('Please Enter All the required Request Details!!', 'Warning Response');
            return;
        }
    },


     showPvApplicationMoreDetailsGeneric: function (application_code,details_panel,isReadOnly,ref_no) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            
            tracking_no=activeTab.down('displayfield[name=tracking_no]');
            if(!ref_no && !tracking_no){
                ref_no = activeTab.down('displayfield[name=tracking_no]').getValue();
            }
            is_dataammendment_request =0;
       
        var me = this,
            details_panel = Ext.widget(details_panel);

        // details_panel.down('hiddenfield[name=section_id]').setValue(section_id);
        details_panel.height = Ext.Element.getViewportHeight() - 118;

        Ext.Ajax.request({
            method: 'GET',
            url: 'pv/getPvApplicationMoreDetails',
            params: {
                application_code: application_code,
                _token:token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    // applicantDetails = resp.applicant_details,
                    pv_details = resp.pv_details;
                if (success == true || success === true) {
                    pvpatientFrm = details_panel.down('pvpatientFrm');
                    detailsFrm = details_panel.down('pvDetailsFrm');
                    pvSuspectedassessmentDrugGrid = details_panel.down('pvSuspectedassessmentDrugGrid');
                 
                    funcShowOnlineCustomizableWindow(ref_no, '85%', details_panel, 'customizablewindow');
                    if (pv_details) {
                        var model2 = Ext.create('Ext.data.Model', pv_details);
                        pvpatientFrm.loadRecord(model2);
                        detailsFrm.loadRecord(model2);
                        details_panel.getViewModel().set('model', model2);

                        if(pv_details.report_category_id==3){
                              var add_btn = pvSuspectedassessmentDrugGrid.down('button[name=update_report]'),
                                whoWidgetCol = pvSuspectedassessmentDrugGrid.columns[pvSuspectedassessmentDrugGrid.columns.length - 2];
                                naranjoWidgetCol = pvSuspectedassessmentDrugGrid.columns[pvSuspectedassessmentDrugGrid.columns.length - 3];
                                outComeWidgetCol = pvSuspectedassessmentDrugGrid.columns[pvSuspectedassessmentDrugGrid.columns.length - 4];
                                eafiCategoryWidgetCol = pvSuspectedassessmentDrugGrid.columns[pvSuspectedassessmentDrugGrid.columns.length - 5];
                                add_btn.setVisible(true);
                                whoWidgetCol.setHidden(true);
                                outComeWidgetCol.setHidden(true);
                                naranjoWidgetCol.setHidden(true);
                                eafiCategoryWidgetCol.setHidden(false);
                        }

                    }

                    if (isReadOnly == 1) {

                        details_panel.getViewModel().set('isReadOnly', true);

                    } else {
                        details_panel.getViewModel().set('isReadOnly', false);

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

    validateNewPvReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

            // pvreactionGrid = activeTab.down('pvreactionGrid'),
            // pvreporterGridStr = activeTab.down('pvpersonnelGrid').getStore(),
            // pvSuspectedDrugGridStr = activeTab.down('pvSuspectedDrugGrid').getStore(),

            productsDetailsFrm = activeTab.down('#DetailsFrm'),
            pvpatientFrm = activeTab.down('pvpatientFrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();

         

        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }

        if (!productsDetailsFrm.isValid()) {
            toastr.warning('Please Enter All the required Required Report Details!!', 'Warning Response');
            return false;
        }

        if (!pvpatientFrm.isValid()) {
            toastr.warning('Please Enter All the required Required Patient Details!!', 'Warning Response');
            return false;
        }

        var  validate_appdetails = validateApplicationDetails(application_code,module_id);
        if(!validate_appdetails){
                return false;
        }

        return true;
    }, 
    funcActiveOtherPvInformationTab: function (tab) {

        var mainTabPnl = this.getMainTabPanel(),
            activeTab = mainTabPnl.getActiveTab(),
            active_application_code = '';
        if(tab.down('hiddenfield[name=active_application_code]')){
            active_application_code = tab.down('hiddenfield[name=active_application_code]').getValue();
            if(activeTab.down('hiddenfield[name=active_application_code]')){
                activeTab.down('hiddenfield[name=active_application_code]').setValue(active_application_code);
            }
        }
        if (activeTab.down('hiddenfield[name=active_application_code]') && active_application_code == '') {
            active_application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        }
        if (active_application_code == '') {
            tab.setActiveTab(0);
            toastr.error('Save Report Information details to proceed', 'Failure Response');
            return false;
        }
    },
    preparePvManagerMeeting: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('#application_list');
        this.preparePvMeetingDetailsGeneric(activeTab, applicationsGrid, 0);
    },
    preparePvMeetingDetailsGeneric: function (activeTab, applicationsGrid, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            meetingDetailsFrm = activeTab.down('form'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            participantsGrid = activeTab.down('tcmeetingparticipantsgrid'),
            participantsStore = participantsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            sm = applicationsGrid.getSelectionModel();
        participantsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            meetingDetailsFrm.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
        }
        // this.redoTcMeetingParticipantsGrid(participantsGrid);
        if (application_id) {
            applicationsStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'common/prepareRegMeetingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    workflow_stage_id: workflow_stage_id,
                    table_name: 'tra_pv_applications'
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
    //save meeting details 
    saveTCMeetingDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('meetingdetailsfrm'),
            toaster = btn.toaster,
            frm = form.getForm(),
            applicationsGrid = activeTab.down('#application_list'),
            sm = applicationsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            selected = [];
        Ext.each(selected_records, function (item) {
            selected.push(item.data.application_code);
        });
        if (frm.isValid()) {
            if (!sm.hasSelection()) {
                toastr.warning('Please select at least one report!!', 'Warning Response');
                return false;
            }
            frm.submit({
                url: 'common/saveTCMeetingDetails',
                params: {
                    application_code: application_code,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    workflow_stage_id: workflow_stage_id,
                    section_id: section_id,
                    _token: token,
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
});