
Ext.define('Admin.view.research_operations.viewcontrollers.ResearchOperationsVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.researchoperationsvctr',
   
    init: function () {

    }, 

    setUserGridsStore: function (obj, options) {
        this.fireEvent('setUserGridsStore', obj, options);
    },

    setUserCombosStore: function (obj, options) {
        this.fireEvent('setUserCombosStore', obj, options);
    },
     setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
    setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },
    setResearchOperationsCombosStore: function (obj, options) {
        this.fireEvent('setResearchOperationsCombosStore', obj, options);
    },
    showAddTcMeetingParticipants: function (btn) {
        this.fireEvent('showAddTcMeetingParticipants', btn);
       
    },
    showResearchInnovationThematicRecommendation: function (btn) {
        this.fireEvent('showRIThematicRecommendationUploads', btn);
    },
    setGridStore: function (obj, options) {
        this.fireEvent('setGridStore', obj, options);
    },
    setCompStore: function (obj, options) {
        this.fireEvent('setCompStore', obj, options);
    },
    setCustomPromotionMaterialGridsStore: function (obj, options) {
        this.fireEvent('setCustomPromotionMaterialGridsStore', obj, options);
    },
    custStoreConfig: function (obj, options) {
        this.fireEvent('custStoreConfig', obj, options);
    },

    getApplicationApprovalDetails: function (btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_update = btn.is_update,
            isAlt = btn.isAlt,
            //btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            recommendation_id = record.get('recommendation_id'),
            table_name = btn.table_name,
            form = Ext.widget('researchapprovalrecommendationfrm'),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        form.setController('premiseregistrationvctr');
        if ((isAlt) && (isAlt == 1 || isAlt === 1)) {
            form.down('textfield[name=permit_no]').setVisible(false);
            form.down('datefield[name=expiry_date]').setVisible(false);
            form.down('datefield[name=expiry_date]').allowBlank = true;
            form.down('datefield[name=expiry_date]').validate();
            form.down('datefield[name=approval_date]').setVisible(false);
            form.down('datefield[name=approval_date]').allowBlank = true;
            form.down('datefield[name=approval_date]').validate();
        }
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        if (is_update > 0) {
            form.down('combo[name=decision_id]').setReadOnly(true);
            form.down('datefield[name=approval_date]').setReadOnly(true);
          
            form.down('textarea[name=comment]').setReadOnly(true);
            form.down('button[name=save_recommendation]').setText('Update Recommendation');
        }
        form.down('datefield[name=expiry_date]').setReadOnly(true);
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        Ext.Ajax.request({
            method: 'GET',
            url: 'common/getApplicationApprovalDetails',
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
                    form.down('hiddenfield[name=recommendation_id]').setValue(recommendation_id);
                    funcShowOnlineCustomizableWindow('Approval Recommendation', '40%', form, 'customizablewindow');
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
    onResearchOperationApplication: function (view, record) {
        var is_locked = record.get('is_locked');
        if (is_locked == 1 || is_locked === 1) {
            toastr.warning('This application is locked and cannot be accessed from here, use In-Tray to access the application!!', 'Warning Response');
            return false;
        }
        this.fireEvent('viewApplicationDetails', record);
    },

    onSelectionChangeAdvertseimentsTypes:function(cbo, value){
        var form = cbo.up('form');
            if(value == 2){
               var isVisible = true;
                
               form.down('combo[name=meeting_types_id]').setVisible(true);

            }else{
                var isVisible = false;
                
                form.down('tagfield[name=meeting_types_id]').setVisible(false);
            }
            
            form.down('timefield[name=exhibition_start_time]').setVisible(isVisible);
            form.down('timefield[name=exhibition_end_time]').setVisible(isVisible);
            form.down('textfield[name=aim_research]').setVisible(isVisible);
            form.down('textfield[name=research_purpose]').setVisible(isVisible);
            form.down('textfield[name=project_lead]').setVisible(isVisible);
            form.down('numberfield[name=project_duration]').setVisible(isVisible);
            form.down('textarea[name=research_objectives]').setVisible(isVisible);
            form.down('textarea[name=research_id]').setVisible(isVisible);
            form.down('textfield[name=other_advert_materials]').setVisible(isVisible);
            form.down('textarea[name=other_promotion_meetingtype]').setVisible(isVisible);
            form.down('textfield[name=venue_of_exhibition]').setVisible(isVisible);
            form.down('textarea[name=description_language]').setVisible(isVisible);

    },
    onCustomNextCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateCustomMoreDetails(btn, wizardPnl, 'next');
    },

    navigateCustomMoreDetails: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
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
        if (activeIndex === 1) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },
    onCustomPrevCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateMoreDetails(btn, wizardPnl, 'prev');
    },

    navigateMoreDetails: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
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
        if (activeIndex === 3) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    setSurveillanceCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.surveillance.SurveillanceComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    
    showNewResearchOperationsApplication: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('newResearchOperationsApplication', application_type, wrapper_xtype);
    },
    
    showPreviousComments: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code');
        this.fireEvent('showApplicationCommentsWin', item, application_id, application_code);
    },
    
    showTcRecommendation: function (item) {
        this.fireEvent('showTcRecommendationUploads', item);
    },
    showInternalResearchApplicationMoreDetailsOnDblClick: function (item) {
        var btn = item.up('button'),
         record = btn.getWidgetRecord();
        this.fireEvent('customShowApplicationMoreDetailsGenericWin', record);
    },

    doCreatePromotionRegParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            ///closefrm = btn.closefrm,
            form = btn.up('form'),
            panel = form.up('panel'),
            win = panel.up('window'),
            storeID = btn.storeID,
            is_winclosaable  = btn.is_winclosaable,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: { model: table },
                waitMsg: 'Please wait...',
                
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
                        store.removeAll();
                        store.load();
                        if(is_winclosaable == 1){
                                //form.down('hiddenfield[name=id]').setValue(response.record_id);
                            closeActiveWindow();    
                        }
                        else{
                            win.close();

                        }
                       
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

    showEditGrantApplications: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            profile_url = record.get('saved_name'),
            personnel_id = record.get('id'),
            status = record.get('status_id'),
            panel = grid.up('panel'),
            userContainerPnl = Ext.widget('grantapplicationwizardfrm'),
            // userWizardPnl = Ext.widget('grantapplicationdetailsfrm');
           

        //basicFrm = userWizardPnl.down('grantapplicationbasicinfofrm'),
          //  basicFrm = Ext.ComponentQuery.query('#grantapplicationbasicinfofrm')[0]; 
            basicFrm = userContainerPnl.down('grantapplicationbasicinfofrm');
            
           basicFrm = basicFrm.getForm();
        
            document_type_id=33,
            reference_table_name='tra_grants',
            table_name='personnel_management_uploaddocuments';
            childXtype = userContainerPnl.down('unstructureddocumentuploadsgrid');

           

            childXtype.down('hiddenfield[name=document_type_id]').setValue(document_type_id);
            childXtype.down('hiddenfield[name=table_name]').setValue(table_name);
            childXtype.down('hiddenfield[name=reference_table_name]').setValue(reference_table_name);
            userContainerPnl.down('hiddenfield[name=active_personnel_id]').setValue(personnel_id);
            userContainerPnl.down('button[action=delete]').setVisible(true);
            
            

            if(status===1 || status===2){
            userContainerPnl.down('button[action=deactivate]').setVisible(true);
            }else{
             userContainerPnl.down('button[action=activate]').setVisible(true);
            }

        grid.hide();
        panel.add(userContainerPnl);
        basicFrm.loadRecord(record);
    },



    showEditGrantApplicationsSplitButton: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            status = record.get('status_id'),
            grid = btn.up('grid'),
            panel = grid.up('panel'),
            detailsForm = Ext.widget('grantapplicationwizardfrm'),
            basicFrm= detailsForm.down('grantapplicationbasicinfofrm');
            detailsForm.down('button[action=delete]').setVisible(true);
        

        if(status===1 || status===2){
            detailsForm.down('button[action=deactivate]').setVisible(true);
        }else{
            detailsForm.down('button[action=activate]').setVisible(true);
        }
    

        
        grid.hide();
        panel.add(detailsForm);
        basicFrm.loadRecord(record);

        
    },

    showEditThematicDetailsSplitButton: function(item, record,) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            thematic_id = record.id;

            
            addagendatabpnl = Ext.widget("addagendatabpnl");
            addagendatabpnl.down('hiddenfield[name=thematic_id]').setValue(thematic_id);
            addagendatabpnl.down('button[action=save_thematic_areas]').setVisible(false);
            addagendatabpnl.down('button[action=edit_thematic_areas]').setVisible(true);
            addagendatabpnl.loadRecord(record);
    
            funcShowOnlineCustomizableWindow('Edit Thematic Area', '60%', addagendatabpnl, 'customizablewindow');
            
    },
    
    showSimpleAddAgendaTabPnl: function(btn) {
        var me = this,
            panelWidget = btn.childXtype,
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            form = Ext.widget(formWidget)

    },


    showSimpleGrantApplicationGridForm: function (btn) {
        var me = this,
            formWidget = btn.form,
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            form = Ext.widget(formWidget),
            document_type_id = 33,
            reference_table_name = 'tra_grants',
            childXtype = Ext.widget("unstructureddocumentuploadsgrid");
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            
        childXtype.down('hiddenfield[name=document_type_id]').setValue(document_type_id);
        childXtype.down('hiddenfield[name=reference_table_name]').setValue(reference_table_name);
        
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        
        grid.hide();
        parentPanel.add(form);
    },

    addScheduledMeetings: function(btn){
        var me = this,
            form = btn.form,
            grid = btn.up('grid'),
            panel = grid.up('panel');
            grid.hide();
            panel.add(form);
    },
    

    researchBackToDashboardFromActive: function (btn) {
        var currentPnl = btn.up('grantapplicationwizardfrm'),
        containerPnl = btn.up('grantapplicationreceivingmaininterface'),
        grid = containerPnl.down('grantapplicationgrid');

        containerPnl.remove(currentPnl);
        grid.store.removeAll();
        grid.store.load();
        grid.show();
    },


    onPrevCardClick: function (btn) {
        var wizardPnl = btn.up('grantapplicationwizardfrm'),
            motherPnl = wizardPnl.up('grantapplicationaddnewpnl');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    

    quickNavigation: function (btn) {
        var step = btn.step,
            formPnl = btn.up('grantapplicationwizardfrm'),
            motherPnl = Ext.widget('grantapplicationaddnewpnl');
            basicFrm = formPnl.down('grantapplicationbasicinfofrm'),
            childXtype = formPnl.down('unstructureddocumentuploadsgrid'),
            record_id = basicFrm.down('hiddenfield[name=id]').getValue(),
            progress = formPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
            

        if (step > 0) {
            var thisItem = progressItems[step];
            if(record_id != ''){
                childXtype.down('hiddenfield[name=reference_record_id]').setValue(record_id);
                store = childXtype.getStore();
                store.removeAll();
                store.load();  
            }
            else{
                toastr.warning('Please save Grant Basic Details first!', 'Warning Response');
                return false;
            }

        }

        if (step == 1) {
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            motherPnl.getViewModel().set('atEnd', false);
        }
        if (step == 0) {
            motherPnl.getViewModel().set('atBeginning', true);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }

        formPnl.getLayout().setActiveItem(step);
        var layout = formPnl.getLayout(),
            model = motherPnl.getViewModel(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem(),
            activeIndex = formPnl.items.indexOf(activeItem);

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

    onNextCardClick: function (btn) {
        var wizardPnl = btn.up('grantapplicationwizardfrm'),
            motherPnl = wizardPnl.up('grantapplicationpnl'),
            basicFrm = wizardPnl.down('grantapplicationbasicinfofrm'),
            childXtype = wizardPnl.down('unstructureddocumentuploadsgrid'),
            record_id = basicFrm.down('hiddenfield[name=id]').getValue();

         if(record_id != ''){
                childXtype.down('hiddenfield[name=reference_record_id]').setValue(record_id);
                store = childXtype.getStore();
                store.removeAll();
                store.load(); 
            }
            else{
                toastr.warning('Please save Grant Basic Details first!!', 'Warning Response');
                return false;
            }
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },

    saveGrantApplicationInformation: function (btn) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var me = this,
                progressPanel = btn.up('grantapplicationwizardfrm'),
                containerPanel = progressPanel.up('grantapplicationpnl'),
                inchargepnl = progressPanel.up('grantapplicationaddnewpnl'),
                // dashboardContainer = containerPanel.up('#drugshopincharges'),
                grid = containerPanel.down('grid'),
                form = progressPanel.down('grantapplicationbasicinfofrm'),
                // saved_name = form.down('hiddenfield[name=saved_name]').getValue(),
                frm = form.getForm();
               
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
                            containerPanel.remove(inchargepnl, true);
                            grid.store.load();
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
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },


    deactivateGrant: function (button) {
        var me = this,
            wizardFrmPnl = button.up('grantapplicationwizardfrm'),
            containerPanel1 = wizardFrmPnl.up('grantapplicationaddnewpnl'),
            containerPanel2 = containerPanel1.up('panel'),
            basicFrm = wizardFrmPnl.down('grantapplicationbasicinfofrm'),
            grid = containerPanel2.down('grid'),
            id = basicFrm.down('hiddenfield[name=id]').getValue(),
            email = basicFrm.down('textfield[name=email]').getValue(),
            table_name = 'tra_premise_incharge_personnel',
            storeID = 'premiseinchargeStr',
            action_url = 'personnelmanagement/deactivatePersonnel',
            store = Ext.getStore(storeID);
        Ext.MessageBox.show({
            title: 'Reason',
            msg: 'Please enter the reason for deactivating this Personnel:',
            width: 320,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: true,
            scope: this,
            animateTarget: button,
            fn: function (btn, text) {
                var reason = text;
                if (btn === 'ok') {
                    if (reason == '' || reason === '') {
                        toastr.warning('Please Enter Reason!!', 'Warning Response');
                        return;
                    }
                    Ext.getBody().mask('Deactivating Personnel...');
                    Ext.Ajax.request({
                        url: action_url,
                        params: {
                            table_name: table_name,
                            reason: reason,
                            email: email,
                            id: id,
                            _token: token
                        },
                        success: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText);
                            toastr.success(resp.message, 'Success Response');
                            store.removeAll();
                            store.load();
                            containerPanel2.remove(containerPanel1, true);
                            grid.show();
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Ext.getBody().unmask();
                            toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                        }
                    });
                }
            }
        });
    },

    deleteGrant: function (button) {
        var me = this,
            wizardFrmPnl = button.up('grantapplicationwizardfrm'),
            panel = wizardFrmPnl.up('grantapplicationpnl'),
            basicFrm = wizardFrmPnl.down('grantapplicationbasicinfofrm'),
            grid = Ext.widget('grantapplicationgrid')
            id = basicFrm.down('hiddenfield[name=id]').getValue(),
            table_name = 'tra_grants',
            storeID = 'premiseinchargeStr',
            action_url = 'researchoperations/deleteGrantApplication',
            store = Ext.getStore(storeID);


        Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this Grant Application ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Deleting Grant Application...');
                Ext.Ajax.request({
                    url: action_url,
                    params: {
                        table_name: table_name,
                        id: id,
                        _token: token
                    },
                    success: function (response) {

                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText);
                        
                        grid.store.load();
                        panel.remove(wizardFrmPnl, true);
                        panel.add(grid);
                        grid.show();
                        toastr.success(resp.message, 'Success Response');
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                
            }
        });
    },



     activateGrant: function (button) {
        var me = this,
            wizardFrmPnl = button.up('grantapplicationwizardfrm'),
            containerPanel1 = wizardFrmPnl.up('grantapplicationaddnewpnl'),
            containerPanel2 = containerPanel1.up('panel'),
            basicFrm = wizardFrmPnl.down('grantapplicationbasicinfofrm'),
            grid = containerPanel2.down('grid'),
            id = basicFrm.down('hiddenfield[name=id]').getValue(),
            table_name = 'tra_premise_incharge_personnel',
            storeID = 'premiseinchargeStr',
            action_url = 'personnelmanagement/activatePersonelRecord',
            store = Ext.getStore(storeID);

        Ext.MessageBox.confirm('Confirm', 'Are you sure to activate this Personnel ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Activating user...');
                Ext.Ajax.request({
                    url: action_url,
                    params: {
                        table_name: table_name,
                        id: id,
                        _token: token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText);
                        toastr.success(resp.message, 'Success Response');
                        store.removeAll();
                        store.load();
                        containerPanel2.remove(containerPanel1, true);
                        grid.show();
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error updating data: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
            }
        });
    },

    showSimpleAddMeetingGrid: function(btn){
        var me = this,
            containerPanel1 = btn.up('grid'),
            containerPanel2 = containerPanel1.up('panel'),
            formWidget = btn.form;
            form = Ext.widget(formWidget),
            containerPanel1.hide();
            containerPanel2.add(form);

           console.log(`Jeff is ${form}`);

    },

    doCreateTcRecommendationParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            pnl = form.up('panel'),
            win = pnl.up('window'),
            storeID = btn.storeID,
            frm = form.getForm(),
            store;
            console.log(win);
        if (storeID) {
            store = Ext.getStore(storeID);
        }
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {
                model: table,
                _token:token
                },
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (forrm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    form.down('hiddenfield[name=id]').setValue(response.record_id);
                    console.log(form.down('hiddenfield[name=id]').getValue());
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
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
    onPrevCardClickk: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
			motherPnl = wizardPnl;
            //motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClickk: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
			motherPnl = wizardPnl;
           // motherPnl = wizardPnl.up('panel');
		   
		 motherPnl.getViewModel().set('atBeginning', true);  
		var application_id =motherPnl.down('hiddenfield[name=active_application_id]').getValue();
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items; 

             if (!application_id) {
               // thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }else{
				this.navigate(btn, wizardPnl, 'next');
			}
       
		       
        
    },

    navigate: function (button, wizardPanel, direction) {
		
		
		var layout = wizardPanel.getLayout(),
        
            max_step = button.max_step,
            progress = this.lookupReference('progress'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
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
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', true);

        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);

            model.set('atBeginning', false);
        }
		
        if (activeIndex === max_step) {
            model.set('atBeginning', false);
            wizardPanel.down('button[name=process_submission_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);
            
            model.set('atBeginning', false);
            model.set('atEnd', false);
        }

    },
    quickNavigationn: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            max_step = btn.max_step,
			motherPnl = wizardPnl,
            application_id =motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
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
		    wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', false);
        }
		

        if (step === max_step) {
          
		    wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
            motherPnl.getViewModel().set('atEnd', true);

        } else {
		    wizardPnl.down('button[name=save_btn]').setVisible(true);
           
		    wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
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
	
	    setConfigCombosSectionfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },





});