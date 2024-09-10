Ext.define('Admin.view.pv.viewcontrollers.PvVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pvvctr',

    /**
     * Called when the view is created
     */
   
	// 
    setGridStore: function (obj, options) {
        this.fireEvent('setGridStore', obj, options);
    },
    setDynamicTreeGridStore: function (obj, options) {
        this.fireEvent('setDynamicTreeGridStore', obj, options);
    },

    setCompStore: function (obj, options) {
        this.fireEvent('setCompStore', obj, options);
    },
     setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    }
    ,setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
    },

    showNewPv: function (btn) {
        var application_type = btn.app_type,
            me = this;
            me.fireEvent('onNewPvApplication', application_type, btn, 0);
    },

    showRCMemberRecommendationLogsWin:function(btn) {
        var button = btn.up('button'),
            grid = button.up('grid'),
            panel = grid.up('panel'),
            meeting_id = panel.down('hiddenfield[name=id]').getValue(),
            grid = Ext.widget('rcRecommendationLogGrid'),
            record = button.getWidgetRecord(),
            application_code = record.get('application_code'),
            stage_category_id = record.get('stage_category_id'),
            module_id = record.get('module_id');
      
       
        grid.down('hiddenfield[name=application_code]').setValue(application_code);
        grid.down('hiddenfield[name=stage_category_id]').setValue(stage_category_id);
        grid.down('hiddenfield[name=module_id]').setValue(module_id);
        grid.down('hiddenfield[name=meeting_id]').setValue(meeting_id);
        
        funcShowCustomizableWindow('RC Recommendations', '60%', grid, 'customizablewindow', btn);
        
    },
	showAddConfigParamWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype);

        funcShowOnlineCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    },

    showWHODugSelectionList: function (btn) {

        var grid = Ext.widget('whodrugproductSelectionGrid');
        if(btn.up('pvSuspectedDrugFrm')){
           whodrug_level_id = btn.up('pvSuspectedDrugFrm').down('combo[name=whodrug_level_id]').getValue();  
        }

        if(btn.up('pvdrughistoryFrm')){
           whodrug_level_id = btn.up('pvdrughistoryFrm').down('combo[name=whodrug_level_id]').getValue();  
        }
       
        if(whodrug_level_id){
          grid.down('hiddenfield[name=whodrug_level_id]').setValue(whodrug_level_id);
          funcShowOnlineCustomizableWindow('WHODrug Product Search', '90%', grid, 'customizablewindow');
       }else{
         toastr.error('Kindly Select WHODrug Level first', 'Warning Response');
         return false; 

       }
    },


     showLTRSelectionList: function (btn) {
        var grid = Ext.widget('pvltrselectiongrid');
        if(btn.up('pvpersonnelFrm')){
           district_id = btn.up('pvpersonnelFrm').down('combo[name=district_id]').getValue();  
        }

        if(btn.up('pvpersonnelFrm')){
           region_id = btn.up('pvpersonnelFrm').down('combo[name=region_id]').getValue();  
        }
       
        if(district_id){
          grid.down('hiddenfield[name=district_id]').setValue(district_id);
       }else{
         toastr.error('Kindly Select District first', 'Warning Response');
         return false; 

       }
        if(region_id){
          grid.down('hiddenfield[name=region_id]').setValue(region_id);
       }else{
         toastr.error('Kindly Select Region first', 'Warning Response');
         return false; 
        }
        funcShowOnlineCustomizableWindow('LTR Selection List', '90%', grid, 'customizablewindow');
    },


    showFacilitySelectionList: function (btn) {

        var grid = Ext.widget('facilitySelectionGrid');
        if(btn.up('pvpersonnelFrm')){
           district_id = btn.up('pvpersonnelFrm').down('combo[name=district_id]').getValue();  
        }

        if(btn.up('pvpersonnelFrm')){
           region_id = btn.up('pvpersonnelFrm').down('combo[name=region_id]').getValue();  
        }
       
        if(district_id){
          grid.down('hiddenfield[name=district_id]').setValue(district_id);
       }else{
         toastr.error('Kindly Select District first', 'Warning Response');
         return false; 

       }
        if(region_id){
          grid.down('hiddenfield[name=region_id]').setValue(region_id);
       }else{
         toastr.error('Kindly Select Region first', 'Warning Response');
         return false; 

       }
        funcShowOnlineCustomizableWindow('Facility Search', '90%', grid, 'customizablewindow');
    },

    func_setStore: function(me,options){
        var config = options.config,
              isLoad = options.isLoad,
              store = Ext.create('Admin.store.common.CommonGridAbstractStore', config);
           me.setStore(store); 
          if (isLoad === true || isLoad == true) {
              store.removeAll();
              store.load();
          }
      }, 
    onViewMirApplication: function (grid, record) {
        this.fireEvent('viewApplicationDetails', record);

    },
    funcActiveOtherPvInformationTab: function (tab) {

        this.fireEvent('funcActiveOtherPvInformationTab', tab);

    },
    showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    },
    onNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
    onPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
            
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');

    },

     viewAssesmentDetails:function(btn) {
           var me = this,
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            childObject = Ext.widget(btn.childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            childObject.down('hiddenfield[name=reaction_id]').setValue(record.get('id'));
            childObject.down('combo[name=giagnosis_medra_id]').setValue(record.get('giagnosis_medra_id'));
            childObject.down('combo[name=diagnosis_meddra_level_id]').setValue(record.get('diagnosis_meddra_level_id'));
            funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },


    updateAEFICategory: function(btn){
        btn.setLoading(true);
        var grid = btn.up('grid'),
            mainTabPnl = Ext.ComponentQuery.query("#contentPanel")[0],
            activeTab = mainTabPnl.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            store = grid.getStore(),
            selected = [];
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items [i],
                aefi_category_id = record.get('aefi_category_id'),
                reaction_id = record.get('id');
            var obj = {
                aefi_category_id: aefi_category_id,
                reaction_id: reaction_id
            };
            if (record.dirty) {
                selected.push(obj);
            }
        }
        if (selected.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
           grid.mask('Updating AEFI Category....');
           Ext.Ajax.request({
                url: 'pv/updateAEFICategory',
                method: 'POST',
                params: {
                    selected: JSON.stringify(selected),
                    application_code: application_code,
                    _token: token
                },
                success: function (response) {
                    btn.setLoading(false);
                    grid.unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        success = resp.success;
                        if (success == true || success === true) {
                            store.load();
                            toastr.success(resp.message, 'Success');
                        } else {
                            grid.unmask();
                            toastr.error(resp.message, 'Failure Response');
                        }
                },
                failure: function (response) {
                    grid.unmask();
                    btn.setLoading(false);
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    grid.unmask();
                    btn.setLoading(false);
                    toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
                }
            });
    },

    saveCausalityAssessmentReport:function(btn){
        var  grid = btn.up('grid'),

            mainTabPnl = Ext.ComponentQuery.query("#contentPanel")[0],
            activeTab = mainTabPnl.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
               
            casualityevaluationgrid = btn.up('grid'),
            causalityevaluationgridstr = Ext.getStore('causalityevaluationgridstr'),
            pvsuspecteddrugassessmentstr = Ext.getStore('pvsuspecteddrugassessmentstr'),

        store = casualityevaluationgrid.getStore(),
        report_questions = []; 
        var hasEmptyScore = false;

        if(casualityevaluationgrid.down('hiddenfield[name=reaction_id]')){
            reaction_id = casualityevaluationgrid.down('hiddenfield[name=reaction_id]').getValue();   
        }
        if(casualityevaluationgrid.down('combo[name=diagnosis_meddra_level_id]')){
            diagnosis_meddra_level_id = casualityevaluationgrid.down('combo[name=diagnosis_meddra_level_id]').getValue();   
        }
        if(casualityevaluationgrid.down('combo[name=giagnosis_medra_id]')){
            giagnosis_medra_id = casualityevaluationgrid.down('combo[name=giagnosis_medra_id]').getValue();   
        }
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items [i],
                 question_id = record.get('question_id'),
                 report = record.get('report'),
                 comment = record.get('comment'),
                 reviewer_comment = record.get('reviewer_comment'),
                 score_id = record.get('score_id'),
                 id = record.get('id');


          if (!score_id) {
            hasEmptyScore = true;
           }

            var obj = {
                id: id,
                reaction_id: reaction_id,
                question_id: question_id,
                comment: comment === null ? '' : comment, // If comment is null, set it to empty string
                reviewer_comment: reviewer_comment === null ? '' : reviewer_comment, // If comment is null, set it to empty string
                application_code: application_code,
                score_id: score_id,
                created_by: user_id
            };
            if (record.dirty) {
                report_questions.push(obj);
            }
        }
         if (!giagnosis_medra_id) {
            btn.setLoading(false);
            toastr.warning('Diagnosis Medra term missing!!', 'Warning Response');
            return false;
        }

        if (report_questions.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }

        if (hasEmptyScore) {
            btn.setLoading(false);
            toastr.warning('Some records have causality checklist not filled!', 'Warning');
            return false;
        }
        report_questions = JSON.stringify(report_questions);
        Ext.Ajax.request({
            url: 'pv/saveAssessmentReportdetails',
            params: {
                application_code: application_code,
                report_questions: report_questions,
                diagnosis_meddra_level_id: diagnosis_meddra_level_id,
                giagnosis_medra_id: giagnosis_medra_id
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
                    pvsuspecteddrugassessmentstr.load();
                    causalityevaluationgridstr.load();

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


    saveWHOCausalityAssessmentReport:function(btn){
        var  grid = btn.up('grid'),

            mainTabPnl = Ext.ComponentQuery.query("#contentPanel")[0],
            activeTab = mainTabPnl.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
               
            casualityevaluationgrid = btn.up('grid'),
            causalityevaluationgridstr = Ext.getStore('whocausalityevaluationgridstr'),
            pvsuspecteddrugassessmentstr = Ext.getStore('pvsuspecteddrugassessmentstr'),

        store = casualityevaluationgrid.getStore(),
        report_questions = []; 
        var hasEmptyScore = false;

        if(casualityevaluationgrid.down('hiddenfield[name=reaction_id]')){
            reaction_id = casualityevaluationgrid.down('hiddenfield[name=reaction_id]').getValue();   
        }
        if(casualityevaluationgrid.down('combo[name=diagnosis_meddra_level_id]')){
            diagnosis_meddra_level_id = casualityevaluationgrid.down('combo[name=diagnosis_meddra_level_id]').getValue();   
        }
        if(casualityevaluationgrid.down('combo[name=giagnosis_medra_id]')){
            giagnosis_medra_id = casualityevaluationgrid.down('combo[name=giagnosis_medra_id]').getValue();   
        }
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items [i],
                 question_id = record.get('question_id'),
                 report = record.get('report'),
                 comment = record.get('comment'),
                 reviewer_comment = record.get('reviewer_comment'),
                 score_id = record.get('score_id'),
                 id = record.get('id');


          if (!score_id) {
            hasEmptyScore = true;
           }

            var obj = {
                id: id,
                reaction_id: reaction_id,
                question_id: question_id,
                comment: comment === null ? '' : comment, // If comment is null, set it to empty string
                reviewer_comment: reviewer_comment === null ? '' : reviewer_comment, // If comment is null, set it to empty string
                application_code: application_code,
                score_id: score_id,
                created_by: user_id
            };
            if (record.dirty) {
                report_questions.push(obj);
            }
        }
        if (report_questions.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
         if (!giagnosis_medra_id) {
            btn.setLoading(false);
            toastr.warning('Diagnosis Medra term missing!!', 'Warning Response');
            return false;
        }

        if (hasEmptyScore) {
            btn.setLoading(false);
            toastr.warning('Some records have causality checklist not filled!', 'Warning');
            return false;
        }
        report_questions = JSON.stringify(report_questions);
        Ext.Ajax.request({
            url: 'pv/saveWHOAssessmentReportdetails',
            params: {
                application_code: application_code,
                report_questions: report_questions,
                diagnosis_meddra_level_id: diagnosis_meddra_level_id,
                giagnosis_medra_id: giagnosis_medra_id
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
                    pvsuspecteddrugassessmentstr.load();
                    causalityevaluationgridstr.load();

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



    navigate: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
            activeItem = layout.getActiveItem();
            activeIndex = wizardPanel.items.indexOf(activeItem);
            if(direction == 'next'){
                activeIndex++;
            }else{
                activeIndex--;
            }

             if(activeIndex > 0 && direction == 'next'){
               if(application_id){
                    //fgdg
                }else{
                    toastr.warning('Please save application details first!!', 'Warning Response');
                    return false;
                }
              }
            
            if(activeIndex > 1 && direction == 'next'){
                if(application_id){
                    //fgdg
                }else{
                    toastr.warning('Please save patient details first!!', 'Warning Response');
                    return false;
                }
            }
            layout[direction]();
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
                wizardPanel.down('button[name=save_btn]').setDisabled(false);
                model.set('atBeginning', true);
            } else {
                wizardPanel.down('button[name=save_btn]').setDisabled(true);
                model.set('atBeginning', false);
            }

            // wizardPanel.down('button[name=save_btn]').setVisible(true);

            if (activeIndex === 4) {
                model.set('atEnd', true);
                wizardPanel.down('button[name=save_btn]').setDisabled(true);
                
            }else{
                model.set('atEnd', false);
            }
       
    },
    quickNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        if (step > 0) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', false);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }

        if (step === 3) {
            motherPnl.getViewModel().set('atEnd', true);
            // wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
            // motherPnl.getViewModel().set('atEnd', true);

        }
        else {
            motherPnl.getViewModel().set('atEnd', false);
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
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    savePvReceivingBaseDetails: function(btn){
        var wizard = btn.wizardpnl,
            wizardPnl = btn.up(wizard),
            action_url = btn.action_url,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
            // prodclass_category_id = containerPnl.down('hiddenfield[name=prodclass_category_id]').getValue(),
            // assessment_procedure_id = containerPnl.down('combo[name=assessment_procedure_id]').getValue(),
            // assessmentprocedure_type_id = containerPnl.down('combo[name=assessmentprocedure_type_id]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            // branch_id = containerPnl.down('combo[name=branch_id]').getValue(),
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            checkapplication_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),

            applicantDetailsForm = containerPnl.down('productapplicantdetailsfrm'),
            //applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            DetailsForm = containerPnl.down('#DetailsFrm'),
            DetailsFrm = DetailsForm.getForm();

        // if (!applicant_id) {
        //     //toastr.warning('Please select Reporter!!', 'Warning Response');
        //     //return false;
        // }

        if (DetailsFrm.isValid()) {
            DetailsFrm.submit({
                url: 'pv/'+action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    //applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    '_token': token
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        active_application_id = resp.active_application_id,
                        active_application_code = resp.active_application_code,
                        pv_id = resp.pv_id,
                        ref_no = resp.ref_no;
                        tracking_no = resp.tracking_no;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        if(containerPnl.down('hiddenfield[name=pv_id]')){
                            containerPnl.down('hiddenfield[name=pv_id]').setValue(pv_id);
                        }
                        if (checkapplication_id == '') {
                            containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                            containerPnl.down('hiddenfield[name=active_application_code]').setValue(active_application_code);
                            
                            containerPnl.down('displayfield[name=reference_no]').setValue(ref_no);
                            containerPnl.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            containerPnl.down('hiddenfield[name=pv_id]').setValue(pv_id);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result;
                   
                        message = resp.message;
                        console.log(message);
                    toastr.error(message, "Failure Response");
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
        }
    },
    showApplicantSelectionList: function (btn) {
        var grid = Ext.widget('productapplicantselectiongrid');
        if (btn.applicantType == 'local') {
            grid.applicantType = btn.applicantType;
        } else {
            grid.applicantType = 'nonlocal';
        }
        funcShowOnlineCustomizableWindow('Applicant Selection List', '90%', grid, 'customizablewindow');
    },
    showUploadEvaluationDocuments: function (item) {
        this.fireEvent('showUploadEvaluationDocuments', item);
    },
    showApplicationMoreDetails: function (btn) {
        this.fireEvent('showPvApplicationMoreDetails', btn);
    },
    showSelectedApplicationMoreDetails: function(btn) {
        // showApplicationMoreDetails
         var button = btn.up('button'),
            grid = button.up('grid'),
            container = grid.up('panel'),
            record = button.getWidgetRecord(),
            application_code = record.get('application_code'),
            pv_id = record.get('pv_id');
        container.down('hiddenfield[name=active_application_code]').setValue(application_code);
        container.down('hiddenfield[name=pv_id]').setValue(pv_id);
        this.fireEvent('showPvApplicationMoreDetails', btn);
    },
    showApplicationUploadedDocument: function(btn) {
        // showPvApplicationMoreDetails
         this.fireEvent('showPreviousUploadedDocs', btn);
    },
     onFindingsNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
        wizardPnl.getViewModel().set('atBeginning', false);
        this.Findingsnavigate(btn, wizardPnl, 'next');
    },
    onFindingsPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
        wizardPnl.getViewModel().set('atEnd', false);
        this.Findingsnavigate(btn, wizardPnl, 'prev');

    },

    Findingsnavigate: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            application_id = wizardPanel.down('hiddenfield[name=id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
            activeItem = layout.getActiveItem();
            activeIndex = wizardPanel.items.indexOf(activeItem);
            if(direction == 'next'){
                activeIndex++;
            }else{
                activeIndex--;
            }
            
            if(activeIndex > 0 && direction == 'next'){
                if(application_id){
                    //fgdg
                }else{
                    toastr.warning('Please save patient details first!!', 'Warning Response');
                    return false;
                }
            }
            layout[direction]();
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
                model.set('atBeginning', true);
            } else {
                model.set('atBeginning', false);
            }

            // wizardPanel.down('button[name=save_btn]').setVisible(true);

            if (activeIndex === 2) {
                model.set('atEnd', true);
                
            }else{
                model.set('atEnd', false);
            }
       
    },
    quickFindingsNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            application_id = wizardPnl.down('hiddenfield[name=id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        if (step > 0) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save patient details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        }
        else if (step === 2) {
            wizardPnl.getViewModel().set('atEnd', true);
        }
        else {
            wizardPnl.getViewModel().set('atEnd', false);
            wizardPnl.getViewModel().set('atBeginning', false);
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
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },

     funcUploadTCMeetingtechnicalDocuments:function(btn){
        
        this.fireEvent('funcUploadTCMeetingtechnicalDocuments', btn);
        
    },
    
    viewApplicationRecommendationLogs:function(btn) {
        this.fireEvent('viewApplicationRecommendationLogs', btn);
    },
    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },
    showEditPvWinFrm: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype);
      
        form.loadRecord(record);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
       
    },

    showApplicationComments: function(btn) {
        // showApplicationMoreDetails
        var button = btn.up('button'),
        grid = button.up('grid'),
        container = grid.up('panel'),
        record = button.getWidgetRecord(),
        application_code = record.get('application_code'),
        application_id = record.get('active_application_id');
        this.fireEvent('showApplicationCommentsWin', btn, application_id, application_code);
    },


    viewPvWinFrm:function(btn) {
           var me = this,
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            activeTab = grid.up('panel'),
            childObject = Ext.widget(btn.childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            childObject.loadRecord(record);
            if(childObject.down('hiddenfield[name=isReadOnly]')){
               childObject.down('hiddenfield[name=isReadOnly]').setValue(1); 
            }
            
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddPvWinFrm: function (btn) {
        var me = this,
            mainTabPnl = Ext.ComponentQuery.query("#contentPanel")[0],
            activeTab = mainTabPnl.getActiveTab(),
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            pv_id = activeTab.down('hiddenfield[name=pv_id]').getValue(),
            adr_type = activeTab.down('combo[name=adr_type_id]'),
            report_category_id = activeTab.down('combo[name=report_category_id]');

            if(btn.up('grid')){
               is_other_drugs_used = btn.up('grid').is_other_drugs_used;//1 when called from other drug used grid
            }

        if(is_other_drugs_used){
            child.down('hiddenfield[name=is_other_drugs_used]').setValue(is_other_drugs_used);
        }
       //pass parameters
       if(child.down('hiddenfield[name=application_code]')){
            child.down('hiddenfield[name=application_code]').setValue(application_code);
       }
       if(child.down('hiddenfield[name=pv_id]')){
            child.down('hiddenfield[name=pv_id]').setValue(pv_id);
       }
       if(child.down('combo[name=adr_type_id]') && adr_type ) {
            child.down('combo[name=adr_type_id]').setValue(adr_type.getValue());
       }
       if(child.down('combo[name=report_category_id]') && report_category_id ) {
            child.down('combo[name=report_category_id]').setValue(report_category_id.getValue());
       }
       
        funcShowOnlineCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    },


     doCreateRelatedProblem: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            container_xtype = btn.up('container'),
            adr_related_problems_id = container_xtype.down('combo[name=adr_related_problems_id]').getValue(),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);
            var pvIdField = Ext.ComponentQuery.query('hiddenfield[name=pv_id]')[0];
            if (pvIdField) {
              var pv_id = pvIdField.getValue();
            }else{
               toastr.error('Kindly save Application Details first', 'Warning Response');
               return false; 
            }
            if(adr_related_problems_id){
            Ext.Ajax.request({
                params: {
                    id:'',
                    _token: token,
                    pv_id:pv_id,
                    adr_related_problems_id:adr_related_problems_id,
                    table_name:table
                },
                method: 'POST',
                url: url, 
                headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
               }, 
                success: function (response) {
                    var response = Ext.JSON.decode(response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        container_xtype.down('textfield[name=adr_related_problems_id]').setValue('');
                        store.removeAll();
                         store.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                 error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }else{
            toastr.error('Please ensure you have added the Additional drug-related problem you want to Save', 'Warning Response');
        }
    },

    doDeleteRelatedProblem: function (btn) {
            var record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = btn.storeID,
            table_name = btn.table_name,
            url = btn.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    },
    doCreatePvWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form_xtype = btn.up('form'),
            win = form_xtype.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);

        //for variations calls add flag
        var is_variation = form_xtype.is_variation
        var frm = form_xtype.getForm();
            
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {
                    table_name: table,
                    //is_variation: is_variation,
                    _token: token
                },
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        
                        if(form_xtype.xtype == 'pvSuspectedDrugFrm'){
                            callerTab = Ext.ComponentQuery.query("#pvDetailsPnlId")[0];
                            if(callerTab){
                                grid = callerTab.getActiveTab();
                                pvSuspectedDrugStr = Ext.getStore('pvSuspectedDrugStr');
                                // if(grid.getStore()){
                                //     grid.getStore().reload();
                                // }
                                pvSuspectedDrugStr.removeAll();
                                pvSuspectedDrugStr.load();
                            }
                        }
                        else{
                            store.removeAll();
                            store.load();
                        }
                        win.close();
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

    doCreatePvPatientDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            mainTabPnl = Ext.ComponentQuery.query("#contentPanel")[0],
            activeTab = mainTabPnl.getActiveTab(),
            pv_id = activeTab.down('hiddenfield[name=pv_id]').getValue(),
            table = btn.table_name,
            form_xtype = btn.up('form'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);

        //for variations calls add flag
        var is_variation = form_xtype.is_variation
        var frm = form_xtype.getForm();
            
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {
                    table_name: table,
                    id:pv_id,
                    _token: token
                },
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
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

    doDeleteConfigWidgetParam: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    },
    funcActiveOtherPvInformationTab: function ( tabPanel, newCard, oldCard, eOpts )  {
        this.fireEvent('funcActiveOtherPvInformationTab', tabPanel);
    },
    notifyReporter: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            final_recommendation = record.get('final_recommendation'),
            response_id = record.get('response_id'),
            response = record.get('response'),
            subject = record.get('subject'),
            form = Ext.widget(item.childXtype),
            store = btn.up('grid').getStore();

        //form reponse 
        if(response){
            responseFld = form.down('htmleditor[name=response]');
            responseFld.setValue(response);
            responseFld.setReadOnly(true);

            subjectfld = form.down('textfield[name=subject]');
            subjectfld.setValue(subject);
            subjectfld.setReadOnly(true);

            form.down('hiddenfield[name=id]').setValue(response_id);
            form.down('button[action=send]').text = 'Already Shared';
            form.down('button[action=send]').handler = '';
            form.down('button[action=send]').ui = 'gray';
        }else{
            form.down('htmleditor[name=response]').setValue(final_recommendation);
        }
        form.down('hiddenfield[name=application_code]').setValue(application_code);

        funcShowOnlineCustomizableWindow('Share Notification', '60%', form, 'customizablewindow', item);
    }, 

    getBatnotifyReporter:function(btn){
           var me = this,
            grid = btn.up('grid'),
            form = Ext.widget(btn.childXtype),
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected= [],
            selected_appIds= [];
            if (selected_records.length===0 || selected_records.length==0) {
                toastr.error('Please ensure you have report(s) to proceed!!', 'Warning Response');
                 return false;
            }

            Ext.each(selected_records, function (item) {
                selected.push(item.data.application_code);
                selected_appIds.push(item.data.active_application_id);
            });

        // Assuming selected_records is an array of records
            try {
                Ext.each(selected_records, function (item) {
                        var response = item.data.response;
                        if (response) {
                            Ext.getBody().unmask();
                            toastr.error('Notification Already send for some selected Reports. Kindly ensure no notification already send for selected Reports!!', 'Warning Response');
                            throw 'BreakLoopException'; // Throw an exception to break out of the loop
                        }
                });
            }catch (e) {
                if (e === 'BreakLoopException') {
                    return false; 
                } else {
                    throw e;
                }
            }

        
        var selected = JSON.stringify(selected);
        var selected_appIds = JSON.stringify(selected_appIds);
        form.down('hiddenfield[name=selected_appIds]').setValue(selected_appIds);
        form.down('hiddenfield[name=selected_appcodes]').setValue(selected);

        funcShowOnlineCustomizableWindow('Share Notification', '60%', form, 'customizablewindow', btn);
    },

    batchpublishReport: function(btn){
            var me = this,
            grid = btn.up('grid'),
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected= [],
            selected_appIds= [];
            if (selected_records.length===0 || selected_records.length==0) {
                toastr.error('Please ensure you have report(s) to proceed!!', 'Warning Response');
                 return false;
            }

            Ext.each(selected_records, function (item) {
                selected.push(item.data.application_code);
                selected_appIds.push(item.data.active_application_id);
            });

             // Assuming selected_records is an array of records
            try {
                Ext.each(selected_records, function (item) {
                        var is_published = item.data.is_published;
                        if (is_published === 1 || is_published == 1) {
                            Ext.getBody().unmask();
                            toastr.error('Some of the reports selected are already published. Kindly ensure no selected report which is already published!!', 'Warning Response');
                            throw 'BreakLoopException'; // Throw an exception to break out of the loop
                        }
                });
            }catch (e) {
                if (e === 'BreakLoopException') {
                    return false; 
                } else {
                    throw e;
                }
            }

         Ext.MessageBox.confirm('Confirm', 'Are you sure the report(s) are ready for publishing ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Publishing Report...');
                Ext.Ajax.request({
                    url: 'pv/publishReport',
                    params: {
                        selected: JSON.stringify(selected),
                        _token: token
                    },
                    headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'Accept': 'application/json'
                        },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText);
                        toastr.success(resp.message, 'Success Response');
                        store.removeAll();
                        store.load();
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                toastr.warning('Operation has been cancelled', 'Cancelled');
            }
        });
    },
    publishReport: function(item){
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            store = btn.up('grid').getStore();

         Ext.MessageBox.confirm('Confirm', 'Are you sure the report is ready for publishing ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Publishing Report...');
                Ext.Ajax.request({
                    url: 'pv/publishReport',
                    params: {
                        application_code: application_code,
                        _token: token
                    },
                    headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'Accept': 'application/json'
                        },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText);
                        toastr.success(resp.message, 'Success Response');
                        store.removeAll();
                        store.load();
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                toastr.warning('Operation has been cancelled', 'Cancelled');
            }
        });
    },
    showRecommendationWin:function(btn) {
        var button = btn.up('button'),
            grid = button.up('grid'),
            form = Ext.widget('recommendationfrm'),
            frm = form.getForm(),
            record = button.getWidgetRecord(),
            application_code = record.get('application_code'),
            stage_category_id = record.get('stage_category_id'),
            module_id = record.get('module_id');
      
        form.loadRecord(record);
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        form.down('hiddenfield[name=stage_category_id]').setValue(stage_category_id);
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        
        funcShowOnlineCustomizableWindow('Recommendation Form', '50%', form, 'customizablewindow', btn);
        
    },
    exportADR: function(btn){
        var grid = btn.up('grid'),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            store = grid.getStore(),
            selected= [];
        
        if (!sm.hasSelection()) {
            toastr.warning('Please select at least one report!!', 'Warning Response');
            return false;
        }
            Ext.each(selected_records, function (item) {
                selected.push(item.data.application_code);
            }); 
            Ext.getBody().mask('Generating xml file...Please wait...');             
            Ext.Ajax.request({
                url: 'integration/generateUploadableE2BFile',
                method: 'GET',
                headers: {
                     'Authorization':'Bearer '+access_token
                         },
                params : {
                     'selected': JSON.stringify(selected)
                     },
                              
              success: function (response, textStatus, request) {
                    Ext.getBody().unmask();
                    var t = JSON.parse(response.responseText);
                    if (t.status == 'sucesss' || t.status === 'success' ) {
                    var a = document.createElement("a");
                    a.href = t.file; 
                    a.download = t.name;
                    document.body.appendChild(a);
                    a.click();       
                    a.remove();
                    store.removeAll();
                    store.load();
                    toastr.success(t.message, 'Success Response');

                    } else {
                toastr.error(t.message, 'Warning Response');
                }
              
                },
                failure: function(conn, response, options, eOpts) {
                    Ext.getBody().unmask();
                    Ext.Msg.alert('Error', 'please try again');
                }
               });
    },
    showExcelImportFrm: function(btn){
        this.fireEvent('showExcelImportFrm', btn);
    },
    showPvRegisterMoreDetails: function(btn) {
        // showPvApplicationMoreDetails
         var button = btn.up('button'),
            grid = button.up('grid'),
            container = grid.up('panel'),
            record = button.getWidgetRecord(),
            application_code = record.get('application_code'),
            pv_id = record.get('pv_id'),
            active_application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            ref_no = record.get('tracking_no');
       container.down('hiddenfield[name=active_application_code]').setValue(application_code);
       container.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
       container.down('hiddenfield[name=pv_id]').setValue(pv_id);
       container.down('hiddenfield[name=module_id]').setValue(module_id);
       container.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
       container.down('hiddenfield[name=section_id]').setValue(section_id);
       container.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
       this.fireEvent('showPvRegisterMoreDetails', btn,application_code,ref_no);
    },
});