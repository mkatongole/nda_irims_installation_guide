/**
 * Created by Kip on 12/14/2018.
 */
Ext.define('Admin.view.gvpapplications.viewcontrollers.GvpApplicationsVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gvpapplicationsvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
    singlecategorizeGvpApplications:function(item){
		var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('id');
		
		var grid = btn.up('grid'),
            containerPnl = grid.up('newgvpinspectionschedulingpanel'),
            store1 = containerPnl.down('gvpinspectionschedulingphysicalgrid').getStore(),
            store2 = containerPnl.down('gvpinspectionschedulingdeskreviewgrid').getStore(),
            inspection_type_id = item.inspection_type_id,
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: grid
                }
            );
        Ext.MessageBox.show({
            title: 'Reason',
            msg: 'Remarks/Comments:',
            width: 320,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: true,
            scope: this,
            animateTarget: button,
            fn: function (btn, text) {
                var remarks = text;
                if (btn === 'ok') {
                    if (remarks == '' || remarks === '') {
                        toastr.warning('Please Enter Remark!!', 'Warning Response');
                        return;
                    }
                    mask.show();
                    selected.push(application_id);
                    Ext.Ajax.request({
                        url: 'gvpapplications/updateGvpApplicationsInspectionType',
                        jsonData: selected,
                        params: {
                            inspection_type_id: inspection_type_id,
                            remark: remarks
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
                                sm.deselectAll();
                                grid.store.load();
                                store1.load();
                                store2.load();
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
                }
            }
        });
		
	},

    loadGVPAssessmentFrm: function(frm){
        this.fireEvent('loadGVPAssessmentFrm', frm, frm.type_id, frm.is_inspection,frm.is_gprc,frm.is_preview);
    },

    setCompStore: function (obj, options) {
        this.fireEvent('setCompStore', obj, options);
    },

    showGVPPharmacistSelectionGrid: function (btn) {
        var width = btn.winWidth,
        winTitle=btn.winTitle,
        handlerFn=btn.handlerFn,
        childItem = Ext.widget(btn.childXtype);
        childItem.addListener('itemdblclick', handlerFn, this);
        funcShowOnlineCustomizableWindow(winTitle, width, childItem, 'customizablewindow');
    },

    showLTRSelectionList: function (btn) {
        var grid = Ext.widget('gvpltrselectiongrid');
        funcShowOnlineCustomizableWindow('LTR Selection List', '90%', grid, 'customizablewindow');
    },


    loadSelectedGVPPharmacist: function (view, record) {
        var grid = view.grid,
            win = grid.up('window'),
            form = Ext.ComponentQuery.query('#gvpsitedetailsfrm')[0];
            form.down('textfield[name=psu_no]').setValue(record.get('psu_no'));
            form.down('datefield[name=supervising_registration_date]').setValue(record.get('supervising_registration_date'));
            form.down('textfield[name=supervising_name]').setValue(record.get('supervising_name'));
            form.down('combo[name=supervising_qualification_id]').setValue(record.get('supervising_qualification_id'));
            form.down('textfield[name=supervising_telephone_no]').setValue(record.get('supervising_telephone_no'));
            form.down('textfield[name=supervising_telephone_no2]').setValue(record.get('supervising_telephone_no2'));
            form.down('textfield[name=supervising_telephone_no3]').setValue(record.get('supervising_telephone_no3'));
            form.down('textfield[name=supervising_email_address]').setValue(record.get('supervising_email_address'));
            form.down('textfield[name=supervising_email_address2]').setValue(record.get('supervising_email_address2'));
            form.down('textfield[name=supervising_email_address3]').setValue(record.get('supervising_email_address3'));
            form.down('combo[name=supervising_country_id]').setValue(record.get('supervising_country_id'));
            form.down('combo[name=supervising_region_id]').setValue(record.get('supervising_region_id'));
            form.down('combo[name=supervising_district_id]').setValue(record.get('supervising_district_id'));
            win.close();
         

    },


    showGVPGPRCAssessmentToolDetails: function(btn) {
        var button = btn.up('button'),
           record = button.getWidgetRecord(),
           application_code = record.get('application_code');
           gvp_site_id = record.get('gvp_site_id');
           panel = Ext.widget('gvpgprcassessmentDetailsPnl');
           GVPOnlineAssessmentfrm =panel.down('GVPOnlineAssessmentfrm');
           noncomplianceobservationsgrid = panel.down('gvpnoncomplianceobservationsgrid');
        //    gvpproductlinedetailsinspectiongrid = panel.down('gvpproductlinedetailsinspectiongrid');
           //panel.down('GVPOnlineAssessmentfrm').down('button[name=save_assessement_btn]').setHidden(true);
           //GVPOnlineAssessmentfrm.down('button[name=save_assessement_btn]').setHidden(true);

            if(noncomplianceobservationsgrid){
                var add_observation = noncomplianceobservationsgrid.down('button[name=add_observation]'),
                widgetCol = noncomplianceobservationsgrid.columns[noncomplianceobservationsgrid.columns.length - 1];
         
                add_observation.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
             }

            //  if(gvpproductlinedetailsinspectiongrid){

            //     var update_line = gvpproductlinedetailsinspectiongrid.down('button[itemId=update_line]');
            //     widgetCol = gvpproductlinedetailsinspectiongrid.columns[gvpproductlinedetailsinspectiongrid.columns.length - 1];
         
            //     if (update_line) {
            //         update_line.setVisible(false);
            //     }
            //     widgetCol.setHidden(true);
            //     widgetCol.widget.menu.items = [];
          
            //  }

           panel.down('hiddenfield[name=application_code]').setValue(application_code);
           panel.down('hiddenfield[name=gvp_site_id]').setValue(gvp_site_id);
           
           funcShowOnlineCustomizableWindow(btn.winTitle, '90%', panel, 'customizablewindow');
    },

    showGVPAssessmentToolDetails: function(btn) {
        var button = btn.up('button')
           record = button.getWidgetRecord()
           application_code = record.get('application_code')
           gvp_site_id = record.get('gvp_site_id');
           panel = Ext.widget('gvpassessmentDetailsPnl');
           GVPOnlineAssessmentfrm =panel.down('GVPOnlineAssessmentfrm');
           noncomplianceobservationsgrid = panel.down('gvpnoncomplianceobservationsgrid');
           console.log(noncomplianceobservationsgrid);

           //gvpproductlinedetailsinspectiongrid = panel.down('gvpproductlinedetailsinspectiongrid');
           //panel.down('GVPOnlineAssessmentfrm').down('button[name=save_assessement_btn]').setHidden(true);
           //GVPOnlineAssessmentfrm.down('button[name=save_assessement_btn]').setHidden(true);

            if(noncomplianceobservationsgrid){
                var add_observation = noncomplianceobservationsgrid.down('button[name=add_observation]'),
                widgetCol = noncomplianceobservationsgrid.columns[noncomplianceobservationsgrid.columns.length - 1];
         
                add_observation.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
             }

            //  if(gvpproductlinedetailsinspectiongrid){

            //     var update_line = gvpproductlinedetailsinspectiongrid.down('button[itemId=update_line]');
            //     widgetCol = gvpproductlinedetailsinspectiongrid.columns[gvpproductlinedetailsinspectiongrid.columns.length - 1];
         
            //     if (update_line) {
            //         update_line.setVisible(false);
            //     }
            //     widgetCol.setHidden(true);
            //     widgetCol.widget.menu.items = [];
          
            //  }

           panel.down('hiddenfield[name=application_code]').setValue(application_code);
           panel.down('hiddenfield[name=gvp_site_id]').setValue(gvp_site_id);
           
           funcShowOnlineCustomizableWindow(btn.winTitle, '90%', panel, 'customizablewindow');
    },
    categorizeGvpApplications: function (button) {
        var grid = button.up('grid'),
            containerPnl = grid.up('newgvpinspectionschedulingpanel'),
            store1 = containerPnl.down('gvpinspectionschedulingphysicalgrid').getStore(),
            store2 = containerPnl.down('gvpinspectionschedulingdeskreviewgrid').getStore(),
            inspection_type_id = button.inspection_type_id,
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: grid
                }
            );
        Ext.MessageBox.show({
            title: 'Reason',
            msg: 'Remarks/Comments:',
            width: 320,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: true,
            scope: this,
            animateTarget: button,
            fn: function (btn, text) {
                var remarks = text;
                if (btn === 'ok') {
                    if (remarks == '' || remarks === '') {
                        toastr.warning('Please Enter Remark!!', 'Warning Response');
                        return;
                    }
                    mask.show();
                    Ext.each(records, function (record) {
                        var application_id = record.get('id');
                        if (application_id) {
                            selected.push(application_id);
                        }
                    });
                    Ext.Ajax.request({
                        url: 'gvpapplications/updateGvpApplicationsInspectionType',
                        jsonData: selected,
                        params: {
                            inspection_type_id: inspection_type_id,
                            remark: remarks
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
                                sm.deselectAll();
                                grid.store.load();
                                store1.load();
                                store2.load();
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
                }
            }
        });
    },

addInspectionType: function (button) {
    var grid = button.up('grid'),
        record = button.getWidgetRecord(),
        store1 = grid.getStore(),
        mask = new Ext.LoadMask({
            msg: 'Please wait...',
            target: grid // Specify the target grid for the mask
        });

    // Create a store for the inspection types grid
    var inspectionStore = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        proxy: {
            type: 'ajax',
            url: 'gvpapplications/getInspectionTypes',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        },
        autoLoad: true
    });

    // Create the inspection types grid
    var inspectionGrid = Ext.create('Ext.grid.Panel', {
        store: inspectionStore,
        columns: [
            { text: 'ID', dataIndex: 'id', flex: 1 },
            { text: 'Name', dataIndex: 'name', flex: 2 }
        ],
        listeners: {
            itemclick: function (grid, record) {
                var selectedInspectionId = record.get('id');
                var application_id = record.get('id');

                mask.show();

                Ext.Ajax.request({
                    url: 'gvpapplications/updateGvpApplicationsInspectionType',
                    params: {
                        application_id: application_id,
                        inspection_category_id: selectedInspectionId
                    },
                    success: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success == true || success === true) {
                            grid.destroy(); // Destroy the grid
                            Ext.MessageBox.hide(); // Hide the MessageBox
                            grid.store.load();
                            store1.load();
                            toastr.success(message, 'Success');
                        } else {
                            toastr.error(message, 'Failure');
                        }
                    },
                    failure: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mask.hide();
                        toastr.error('Error: ' + errorThrown, 'Error');
                    }
                });
            }
        }
    });

    // Create a panel to hold the grid
    var panel = Ext.create('Ext.panel.Panel', {
        items: [inspectionGrid],
        layout: 'fit'
    });

    Ext.MessageBox.show({
        title: 'Select Inspection Type',
        width: 400,
        height: 300,
        buttons: Ext.MessageBox.OKCANCEL,
        multiline: true,
        scope: this,
        animateTarget: button,
        items: [panel], // Add the panel containing the grid
        fn: function (btn) {
            if (btn === 'ok') {
                // Handle OK button click if needed
            }
        }
    });
}
,


    setGvpApplicationGridsStore: function (obj, options) {
        this.fireEvent('setGvpApplicationGridsStore', obj, options);
    },
    
    setGvpApplicationCombosStore: function (obj, options) {
        this.fireEvent('setGvpApplicationCombosStore', obj, options);
    },
    setGmpApplicationCombosStore: function (obj, options) {
        this.fireEvent('setGvpApplicationCombosStore', obj, options);
    },

    setPremiseRegGridsStore: function (obj, options) {
        this.fireEvent('setPremiseRegGridsStore', obj, options);
    },

    setPremiseRegCombosStore: function (obj, options) {
        this.fireEvent('setPremiseRegCombosStore', obj, options);
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },

    setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },

    setUserCombosStore: function (obj, options) {
        this.fireEvent('setUserCombosStore', obj, options);
    },

    setAdminGridsStore: function (obj, options) {
        this.fireEvent('setAdminGridsStore', obj, options);
    },

    setWorkflowGridsStore: function (obj, options) {
        this.fireEvent('setWorkflowGridsStore', obj, options);
    },
    downloadPreviousDocupload: function (item) {
        var record = item.getWidgetRecord(),
            reference_no = record.get('reference_no'),
            id = record.get('id'),
            section = record.get('section');
            var redirect =  'https://imis.tmda.go.tz/mis/index.php/reports/uploadedEvaluationReportDrugs?id=' + id + '&section=' + section + '&reference_no=' + reference_no;
           
            print_report(redirect);
    },
    setConfigCombosStoreWithSectionFilter: function (obj, options) {
        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },

    showGvpApplicationWorkflow: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('showApplicationWorkflow', application_type, wrapper_xtype);
    },

    showNewGvpApplication: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype,
            gvp_type = btn.gvp_type;
        this.fireEvent('newGvpApplication', application_type, wrapper_xtype, gvp_type);
    },

    onViewGvpApplication: function (view, record) {
        this.fireEvent('viewApplicationDetails', record);
    },

    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },

    showAddGvpParamWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
    },



   
    showContractManufacturerSplitButton: function(item, record,) {
        var me = this
            btn = item.up('button')
            record = btn.getWidgetRecord()
            cm_id = record.id
            gvp_site_id = record.data.man_site_id
            
            cmtabpnl = Ext.widget("gvpcontractmanufacturingfrm")
            cmtabpnl.down('hiddenfield[name=cmd_id]').setValue(cm_id)
            cmtabpnl.down('hiddenfield[name=gvp_site_id]').setValue(gvp_site_id)
            cmtabpnl.loadRecord(record)

            funcShowOnlineCustomizableWindow('Edit Contracted Gvp Site', '60%', cmtabpnl, 'customizablewindow');
            
    },

    showAddManufacturerWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            storeID = btn.storeID,
            arrayLength = storeArray.length;
        child.down('button[action=btn_savedetails]').storeID = storeID;
        child.setIsWin(1);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
    },

    showAddGvpBlockWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            grid = btn.up('grid'),
            mainTabPanel = grid.up('#contentPanel'),
            activeTab = mainTabPanel.getActiveTab(),
            site_id = activeTab.down('mansitedetailstabpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
            arrayLength = storeArray.length;
        child.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
    },

    doCreateGvpApplicationParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {
                    model: table,
                    '_token': token,
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
                        if(store){
                        store.removeAll();
                        store.load();  
                        }
                        if(btn.store2ID){
                          var store2ID = btn.store2ID,
                          store2 = Ext.getStore(store2ID);
                          if(store2){
                          store2.removeAll();
                          store2.load();
                          }
                        }
                        var store3= Ext.getStore('productlinetcdetailsstr');
                         if(store3){
                            store3.removeAll();
                            store3.load();
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

    saveMainSiteBlock: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            tabPanel=form.up('panel'),
            inspection_category_id=form.down('combo[name=inspection_category_id]').getValue(),
            special_category_id=form.down('combo[name=special_category_id]').getValue(),
            activeTab = tabPanel.getActiveTab(),
            nextTab = activeTab.nextSibling(),
            frm = form.getForm();

            if(tabPanel.down('mdproductLineDetailsaddgrid')){
                var productLineDetailsaddgrid=tabPanel.down('mdproductLineDetailsaddgrid'); 
             }else{
               var productLineDetailsaddgrid=tabPanel.down('productLineDetailsaddgrid');
             }
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        block_id = response.record_id;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        productLineDetailsaddgrid.down('hiddenfield[name=block_id]').setValue(block_id);
                        productLineDetailsaddgrid.down('hiddenfield[name=inspection_category_id]').setValue(inspection_category_id);

                        if(inspection_category_id==3 || inspection_category_id===3){
                         productLineDetailsaddgrid.down('hiddenfield[name=special_category_id]').setValue(special_category_id);
                        }
                        store = productLineDetailsaddgrid.getStore();
                        store.removeAll();
                        store.load();
                        if (nextTab) {
                            tabPanel.setActiveTab(nextTab);
                            btn.setHidden(true);
                            store = productLineDetailsaddgrid.getStore();
                            store.removeAll();
                            store.load();  
                          }
                        if(btn.store2ID){
                          var store2ID = btn.store2ID,
                          store2 = Ext.getStore(store2ID);
                          store2.removeAll();
                          store2.load();
                        }

                        //win.close();
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



    showEditGvpApplicationWinFrm: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },


    showEditProductLineDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            mainGrid=btn.up('grid'),
            record = btn.getWidgetRecord(),
            site_id=record.get('manufacturing_site_id'),
            childXtype = item.childXtype,
            title = item.winTitle,
            winWidth = '80%',
            tabPnl = Ext.widget(childXtype),
            form = tabPnl.down('form'),
            grid = tabPnl.down('grid');
          
            storeArray = eval(item.stores);

            if (!site_id) {
                toastr.warning('Please ensure Site Details are loaded first!!', 'Warning Response');
                return;
            }
        
           form.loadRecord(record);
            grid.down('hiddenfield[name=manufacturing_site_id]').setValue(record.get('manufacturing_site_id'));
            grid.down('hiddenfield[name=block_id]').setValue(record.get('id'));
            grid.down('hiddenfield[name=inspection_category_id]').setValue(record.get('inspection_category_id'));
            grid.down('hiddenfield[name=special_category_id]').setValue(record.get('special_category_id'));
          
            funcShowOnlineCustomizableWindow(title, winWidth, tabPnl, 'customizablewindow');
    },

    doDeleteGvpApplicationWidgetParam: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    },

    showEditManufacturingSiteWinFrm: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.down('button[name=save_btn]').storeID = item.storeID;
        form.down('button[name=save_btn]').action_url = item.action_url;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },

    editGvpProductLinkageInfo: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            site_id = record.get('gvp_site_id'),
            product_id = record.get('product_id'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            childObject = Ext.widget(childXtype),
            sm = childObject.getSelectionModel();
        childObject.down('hiddenfield[name=gvp_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=product_id]').setValue(product_id);
        childObject.down('button[name=save_details_one]').setVisible(true);
        childObject.down('button[name=save_details]').setVisible(false);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
        childObject.getStore().load();
        childObject.getStore().on('load', function (store, records, options) {
            var record = store.getById(line_id),
                rowIndex = store.indexOf(record);
            sm.select(rowIndex, true);
        });
    },
    showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    },saveSampleSubmissionRemarks:function(btn){

        this.fireEvent('saveSampleSubmissionRemarks', btn);
        

    },
    showEditNonComplianceWinFrm: function (item) {//kip here
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            mainTabPanel = grid.up('#contentPanel'),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filterObj = {module_id: module_id, sub_module_id: sub_module_id},
            filterStr = JSON.stringify(filterObj);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },

    saveEditGvpProductLinkageDetails: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            win = grid.up('window'),
            manufacturing_site_id = grid.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            reg_site_id = grid.down('hiddenfield[name=reg_site_id]').getValue(),
            product_id = grid.down('hiddenfield[name=product_id]').getValue(),
            reg_product_id = grid.down('hiddenfield[name=reg_product_id]').getValue(),
            sm = grid.getSelectionModel(),
            record = sm.getSelection(),
            line_id = record[0].get('id'),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        Ext.Ajax.request({
            url: 'gvpapplications/updateGvpProductInfoLinkage',
            params: {
                inspection_line_id: line_id,
                manufacturing_site_id: manufacturing_site_id,
                reg_site_id: reg_site_id,
                product_id: product_id,
                reg_product_id: reg_product_id
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
                    Ext.getStore('gvpproductslinkagedetailsstr').removeAll();
                    Ext.getStore('gvpproductslinkagedetailsstr').load();
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

    showEditSiteOtherDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            /*grid = btn.up('grid'),
            mainTabPanel = grid.up('#contentPanel'),
            activeTab = mainTabPanel.getActiveTab(),*/
            section_id = record.get('section_id'),//activeTab.down('hiddenfield[name=section_id]').getValue(),
            childXtype = item.childXtype,
            title = item.winTitle,
            winWidth = item.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            filter = "section_id:" + section_id,
            busTypesStr = childObject.down('combo[name=business_type_id]').getStore();
        busTypesStr.removeAll();
        busTypesStr.load({params: {filter: filter}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        childObject.loadRecord(record);
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },
    showPreviewGvpLineProductsDetails:function(item){
        var me = this,
            btn = item.up('button'),
            childXtype = item.childXtype,
            record = btn.getWidgetRecord(),
            childObject = Ext.widget(childXtype),
            title = item.winTitle,
            winWidth = item.winWidth,
            gvp_productline_id = record.get('gvp_productline_id');
            childObject.down('hiddenfield[name=gvp_productline_id]').setValue(gvp_productline_id);
            childObject.setHeight(400);
            funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },showAddTcMeetingParticipants: function (btn) {
        this.fireEvent('showAddTcMeetingParticipants', btn);
       
    },setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
    },
    showEditGvpInspectionLineDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            is_recommendation = item.is_recommendation,
            recommendation_type = item.recommendation_type,
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            // mainTabPanel = grid.up('#contentPanel'),
            // activeTab = mainTabPanel.getActiveTab(),
            section_id =  record.get('section_id'),
            childXtype = item.childXtype,
            title = item.winTitle,
            winWidth = item.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            productLineStr = childObject.down('combo[name=product_line_id]').getStore(),
            productLineCategoryStr = childObject.down('combo[name=category_id]').getStore();
           // console.log(recommendation_type);
        if ((is_recommendation) && is_recommendation == 1) {
            var productLineStatusStr = childObject.down('combo[name=prodline_inspectionstatus_id]').getStore(),
                productLineRecommendationStr = childObject.down('combo[name=product_line_status_id]').getStore();
            productLineStatusStr.removeAll();
            productLineStatusStr.load();
            productLineRecommendationStr.removeAll();
            productLineRecommendationStr.load();
            if (recommendation_type == 1 || recommendation_type === 1) {//Inspection
                childObject.down('combo[name=prodline_tcmeetingstatus_id]').setVisible(false);
                childObject.down('combo[name=prodline_tcmeetingstatus_id]').setDisabled(true);
                childObject.down('combo[name=prodline_dgstatus_id]').setVisible(false);
                childObject.down('combo[name=prodline_dgstatus_id]').setDisabled(true);
            } else if (recommendation_type == 2 || recommendation_type === 2) {//TC
                childObject.down('combo[name=prodline_dgstatus_id]').setVisible(false);
                childObject.down('combo[name=prodline_dgstatus_id]').setDisabled(true);
                childObject.down('combo[name=product_line_id]').setReadOnly(true);
                childObject.down('combo[name=dosage_form_id]').setReadOnly(true);
                childObject.down('combo[name=category_id]').setReadOnly(true);
                childObject.down('combo[name=manufacturing_activity_id]').setReadOnly(true);
                childObject.down('textarea[name=prodline_description]').setReadOnly(true);
                childObject.down('combo[name=prodline_inspectionstatus_id]').setReadOnly(true);


            } else if (recommendation_type == 3 || recommendation_type === 3) {//DG
                childObject.down('combo[name=product_line_id]').setReadOnly(true);
                childObject.down('combo[name=dosage_form_id]').setReadOnly(true);
                childObject.down('combo[name=category_id]').setReadOnly(true);
                childObject.down('combo[name=manufacturing_activity_id]').setReadOnly(true);
                childObject.down('textarea[name=prodline_description]').setReadOnly(true);
                childObject.down('combo[name=prodline_inspectionstatus_id]').setReadOnly(true);
                childObject.down('combo[name=prodline_tcmeetingstatus_id]').setReadOnly(true);

            }
            }else{
                childObject.down('combo[name=prodline_inspectionstatus_id]').setVisible(false);  
            }
        productLineStr.removeAll();
        productLineStr.load({params: {section_id: section_id}});
        productLineCategoryStr.removeAll();
        productLineCategoryStr.load({params: {section_id: section_id}});
       
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        //console.log(record);
        childObject.loadRecord(record);
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },
    //gvp_productline_id
    funcUploadTCMeetingtechnicalDocuments:function(btn){
        
        this.fireEvent('funcUploadTCMeetingtechnicalDocuments', btn);
        
    },
    showEditGvpInspectionLineDetailsFromWin: function (item) {
        var me = this,
            btn = item.up('button'),
            is_recommendation = item.is_recommendation,
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            wizardPnl = grid.up('panel'),
            section_id = wizardPnl.down('hiddenfield[name=section_id]').getValue(),
            childXtype = item.childXtype,
            title = item.winTitle,
            winWidth = item.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            productLineStr = childObject.down('combo[name=product_line_id]').getStore(),
            productLineCategoryStr = childObject.down('combo[name=category_id]').getStore();
        if ((is_recommendation) && is_recommendation == 1) {
            var productLineStatusStr = childObject.down('combo[name=prodline_status_id]').getStore(),
                productLineRecommendationStr = childObject.down('combo[name=prod_recommendation_id]').getStore();
            productLineStatusStr.removeAll();
            productLineStatusStr.load();
            productLineRecommendationStr.removeAll();
            productLineRecommendationStr.load();
        }
        productLineStr.removeAll();
        productLineStr.load({params: {section_id: section_id}});
        productLineCategoryStr.removeAll();
        productLineCategoryStr.load({params: {section_id: section_id}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        childObject.loadRecord(record);
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },
    getConditionalApplicationApprovalDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_update = item.is_update,
            isWithdrawal = item.isWithdrawal,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            table_name = item.table_name,
            form = Ext.widget('gvpconditionalapprovalrecommendationfrm'),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.setController('gvpapplicationsvctr');
        if ((isWithdrawal) && (isWithdrawal == 1 || isWithdrawal === 1)) {
            form.down('combo[name=decision_id]').setStore('approvaldecisionsstr');
            form.down('textfield[name=permit_no]').setVisible(false);
            form.down('datefield[name=expiry_date]').setVisible(false);
            form.down('datefield[name=expiry_date]').allowBlank = true;
            form.down('datefield[name=expiry_date]').validate();
            form.down('datefield[name=approval_date]').setVisible(false);
            form.down('datefield[name=approval_date]').allowBlank = true;
            form.down('datefield[name=approval_date]').validate();
            form.down('combo[name=decision_id]').getStore().load();
        }
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        if (is_update > 0) {
            form.down('combo[name=decision_id]').setReadOnly(true);
            form.down('datefield[name=approval_date]').setReadOnly(true);
            form.down('datefield[name=expiry_date]').setReadOnly(true);
            form.down('textarea[name=comment]').setReadOnly(true);
            form.down('button[name=save_recommendation]').setText('Update Recommendation');
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
                    funcShowOnlineCustomizableWindow('Conditional Approval', '40%', form, 'customizablewindow');
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

   
    getApplicationApprovalDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_update = item.is_update,
            isWithdrawal = item.isWithdrawal,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            table_name = item.table_name,
            form = Ext.widget('gvpapprovalrecommendationfrm'),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.setController('gvpapplicationsvctr');
        if ((isWithdrawal) && (isWithdrawal == 1 || isWithdrawal === 1)) {
            form.down('combo[name=decision_id]').setStore('approvaldecisionsstr');
            form.down('textfield[name=permit_no]').setVisible(false);
            form.down('datefield[name=expiry_date]').setVisible(false);
            form.down('datefield[name=expiry_date]').allowBlank = true;
            form.down('datefield[name=expiry_date]').validate();
            form.down('datefield[name=approval_date]').setVisible(false);
            form.down('datefield[name=approval_date]').allowBlank = true;
            form.down('datefield[name=approval_date]').validate();
            form.down('combo[name=decision_id]').getStore().load();
        }
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        if (is_update > 0) {
            form.down('combo[name=decision_id]').setReadOnly(true);
            form.down('datefield[name=approval_date]').setReadOnly(true);
            form.down('datefield[name=expiry_date]').setReadOnly(true);
            form.down('textarea[name=comment]').setReadOnly(true);
            form.down('hiddenfield[name=is_update]').setValue(is_update);
            form.down('button[name=save_recommendation]').setText('Update Recommendation');
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
                    funcShowOnlineCustomizableWindow('Recommendation', '40%', form, 'customizablewindow');
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

    //Application more details Wizard starts
    //NEW
    onPrevCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateMoreDetails(btn, wizardPnl, 'prev');
    },

    onNextCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateMoreDetails(btn, wizardPnl, 'next');
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
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex === 3) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigationMoreDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
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
        //activeIndex = wizardPnl.items.indexOf(activeItem);

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
    onPrevCardClickMoreDetailsAlt: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateMoreDetailsAlt(btn, wizardPnl, 'prev');
    },

    onNextCardClickMoreDetailsAlt: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateMoreDetailsAlt(btn, wizardPnl, 'next');
    },

    navigateMoreDetailsAlt: function (button, wizardPanel, direction) {
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
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
        }
        // beginning disables previous
        if (activeIndex === 0) {
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex === 5) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigationMoreDetailsAlt: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
        } else {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
        }
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step == 5) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();
        //activeIndex = wizardPnl.items.indexOf(activeItem);

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
    //Application more details Wizard ends

    //Online Receiving Wizard starts
    //New,Renewal
    onPrevCardClickOnline: function (btn) {
        var wizardPnl = btn.up('newgvponlinepreviewwizard'),
            motherPnl = wizardPnl.up('newgvponlinepreviewpnl');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateOnline(btn, wizardPnl, 'prev');
    },

    onNextCardClickOnline: function (btn) {
        var wizardPnl = btn.up('newgvponlinepreviewwizard'),
            motherPnl = wizardPnl.up('newgvponlinepreviewpnl');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateOnline(btn, wizardPnl, 'next');
    },

    navigateOnline: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('newgvponlinepreviewpnl'),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            win = button.up('window'),
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
            nextStep = wizardPanel.items.indexOf(layout.getNext());

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
        if (activeIndex === 5) {
            wizardPanel.down('button[name=save_screening_btn]').setDisabled(false);
            wizardPanel.down('button[name=receive_invoicebtn]').setVisible(false);
            wizardPanel.down('button[name=print_invoice]').setVisible(false);
            model.set('atEnd', true);
            if(status_type_id == 1 || status_type_id == 2){
                wizardPanel.down('button[name=receive_invoicebtn]').setVisible(true);
                wizardPanel.down('button[name=print_invoice]').setVisible(true);
            }
            else{
                wizardPanel.down('button[name=receive_invoicebtn]').setVisible(false);
                wizardPanel.down('button[name=print_invoice]').setVisible(false);
            }
        } else {
            wizardPanel.down('button[name=save_screening_btn]').setDisabled(true);
            wizardPanel.down('button[name=receive_invoicebtn]').setVisible(true);
            wizardPanel.down('button[name=print_invoice]').setVisible(false);
            model.set('atEnd', false);
        }
        
    },

    quickNavigationOnline: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel[name=wizardPanel]'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]'),
            
            status_type_id = motherPnl.down('hiddenfield[name=status_type_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', true);
        } else {
            //wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', false);
        }
        if (step === 5) {
            wizardPnl.down('button[name=save_screening_btn]').setDisabled(false);
            wizardPnl.down('button[name=receive_invoicebtn]').setVisible(false);
            wizardPnl.down('button[name=print_invoice]').setVisible(false);
            motherPnl.getViewModel().set('atEnd', true);
            if(status_type_id == 1 || status_type_id == 2){
                wizardPnl.down('button[name=receive_invoicebtn]').setVisible(true);
                wizardPnl.down('button[name=print_invoice]').setVisible(true);
            }
            else{
                wizardPnl.down('button[name=receive_invoicebtn]').setVisible(true);
                wizardPnl.down('button[name=print_invoice]').setVisible(true);
            }
        } else {
            wizardPnl.down('button[name=save_screening_btn]').setDisabled(true);
            wizardPnl.down('button[name=receive_invoicebtn]').setVisible(true);
            wizardPnl.down('button[name=print_invoice]').setVisible(false);
            motherPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();
        //activeIndex = wizardPnl.items.indexOf(activeItem);

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
    //Withdrawal, Alteration
    onPrevCardClickOnlineCancelAlt: function (btn) {
        var wizardPnl = btn.up('panel[name=wizardPanel]'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateOnlineCancelAlt(btn, wizardPnl, 'prev');
    },

    onNextCardClickOnlineCancelAlt: function (btn) {
        var wizardPnl = btn.up('panel[name=wizardPanel]'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateOnlineCancelAlt(btn, wizardPnl, 'next');
    },

    navigateOnlineCancelAlt: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel[name=motherPanel]'),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());

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
        if (activeIndex === 5) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigationOnlineCancelAlt: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel[name=wizardPanel]'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', true);
        } else {
            //wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', false);
        }
        if (step === 5) {
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            motherPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();
        //activeIndex = wizardPnl.items.indexOf(activeItem);

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
    //Online Receiving Wizard ends
    showTcRecommendation: function (item) {
        this.fireEvent('showTcRecommendationUploads', item);
    },
    showGvpApplicationMoreDetailsOnDblClick: function (view, record) {
        Ext.getBody().mask('Please wait...');
        var ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            application_code = record.get('application_code'),
            applicant_id = record.get('applicant_id'),
            site_id = record.get('manufacturing_site_id'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            gvp_type_id = record.get('gvp_type_id'),
            isReadOnly = 0;// view.grid.appDetailsReadOnly;
        this.fireEvent('gvpApplicationMoreDetails', application_id, application_code, site_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, gvp_type_id);
    },

    showGvpApplicationMoreDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            application_code = record.get('application_code'),
            applicant_id = record.get('applicant_id'),
            site_id = record.get('gvp_site_id'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            gvp_type_id = record.get('gvp_type_id'),
            isReadOnly = item.appDetailsReadOnly;
        this.fireEvent('gvpApplicationMoreDetails', application_id, application_code, site_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, gvp_type_id);
    },

    compareGvpApplicationDetails: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            portal_application_id = record.get('portal_id'),
            mis_application_id = record.get('id'),
            application_code = record.get('application_code'),
            ref_no = record.get('reference_no'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            portalChildXtype = 'newgvponlinepreviewwizard',
            misChildXtype = 'gvpsiteappmoredetailswizard';
        if (sub_module_id == 40 || sub_module_id === 40) {
            portalChildXtype = 'altgvponlinepreviewwizard';
            misChildXtype = 'gvpsiteappmoredetailsaltwizard';
        } else if (sub_module_id == 39 || sub_module_id === 39) {
            portalChildXtype = 'cancelgvponlinepreviewwizard';
        }
        var comparePanel = Ext.widget('gvpcomparepanel'),
            portalPanel = comparePanel.down('gvpportalcomparepreviewpnl'),
            misPanel = comparePanel.down('gvpmiscomparepreviewpnl'),
            portalChildObject = Ext.widget(portalChildXtype),
            misChildObject = Ext.widget(misChildXtype);
        portalPanel.add(portalChildObject);
        misPanel.add(misChildObject);
        var portalWizard = portalPanel.down('panel[name=wizardPanel]'),
            misWizard = misPanel.down('panel[name=wizardPanel]'),
            portalPersonnelGrid = portalWizard.down('gvpmansitepersonneldetailsgrid'),
            misPersonnelGrid = misWizard.down('gvpmansitepersonneldetailsgrid'),
            portalBlocksGrid = portalWizard.down('mansiteblockdetailswingrid'),
            misBlocksGrid = misWizard.down('mansiteblockdetailswingrid'),
            portalBusinessGrid = portalWizard.down('mansiteotherdetailswingrid'),
            misBusinessGrid = misWizard.down('mansiteotherdetailswingrid'),
            portalProductLineGrid = portalWizard.down('onlineproductlinedetailsgrid'),
            misProductLineGrid = misWizard.down('productlinedetailswingrid'),
            portalProductsGrid = portalWizard.down('gvpproductslinkagedetailsonlinegrid'),
            misProductsGrid = misWizard.down('gvpproductslinkagedetailswingrid');


        portalPersonnelGrid.setIsWin(1);
        portalPersonnelGrid.setIsCompare(1);
        portalPersonnelGrid.setIsOnline(1);
        portalBlocksGrid.setIsCompare(1);
        portalBlocksGrid.setIsOnline(1);
        misBlocksGrid.setIsCompare(1);
        portalBusinessGrid.setIsCompare(1);
        portalBusinessGrid.setIsOnline(1);
        misBusinessGrid.setIsCompare(1);
        portalProductsGrid.setIsCompare(1);
        portalPanel.down('hiddenfield[name=application_id]').setValue(portal_application_id);
        portalPanel.down('hiddenfield[name=application_code]').setValue(application_code);
        misPanel.down('hiddenfield[name=application_id]').setValue(mis_application_id);
        misPanel.down('hiddenfield[name=application_code]').setValue(application_code);
        portalPanel.down('applicantdetailsfrm').down('button[action=link_applicant]').setDisabled(true);
        misPanel.down('applicantdetailsfrm').down('button[action=link_applicant]').setDisabled(true);
        portalPanel.down('gvpsitedetailsfrm').down('button[name=search_site]').setHidden(true);
        portalPanel.down('gvpsitedetailsfrm').down('button[action=search_site]').setHidden(true);
        misPanel.down('gvpsitedetailsfrm').down('button[name=search_site]').setHidden(true);
        misPanel.down('gvpsitedetailsfrm').down('button[action=search_site]').setHidden(true);
        portalPersonnelGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        misPersonnelGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        portalBlocksGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        misBlocksGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        portalBusinessGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        misBusinessGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        portalProductLineGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        misProductLineGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        portalProductsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        misProductsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        portalWizard.down('button[step=' + (portalWizard.items.length - 1) + ']').setHidden(true);
        portalWizard.down('*[name=navigation-toolbar]').setHidden(true);
        misWizard.down('*[name=navigation-toolbar]').setHidden(true);
        Ext.each(portalPanel.query('field'), function (field) {
            field.setReadOnly(true);
        });
        Ext.each(misPanel.query('field'), function (field) {
            field.setReadOnly(true);
        });
        if (section_id == 4 || section_id === 4) {
            portalPanel.down('combo[name=device_type_id]').setVisible(true);
            misPanel.down('combo[name=device_type_id]').setVisible(true);
        }
        funcShowOnlineCustomizableWindow(ref_no + ' Compare Details', '99%', comparePanel, 'customizablewindow');
    },

    acceptPortalAmendedDetails: function (button) {
        Ext.MessageBox.confirm('Confirm', 'This will override MIS details with PORTAL details, Continue?', function (btn) {
            if (btn === 'yes') {
                alert('changes effected');
            }
        });
    },

    showApplicationQueries: function (item) {
        this.fireEvent('showApplicationQueries', item);
    },

    showApplicationChecklists: function (item) {
        this.fireEvent('showApplicationChecklists', item);
    },

    previewOnlineApplication: function (view, record) {
        var grid = view.grid,
            isReadOnly = grid.isReadOnly,
            tracking_no = record.get('tracking_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            site_id = record.get('manufacturing_site_id'),
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
            productLineDetailsGrid = wizardPnl.down('onlineproductlinedetailsgrid'),
            personnelDetailsGrid = wizardPnl.down('gvpmansitepersonneldetailsgrid'),
            siteBlockDetailsGrid = wizardPnl.down('mansiteblockdetailswingrid'),
            siteOtherDetailsGrid = wizardPnl.down('mansiteotherdetailswingrid'),
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
        if (section_id == 4 || section_id === 4) {
            onlinePanel.down('combo[name=device_type_id]').setValue(device_type_id);
            wizardPnl.down('button[name=line_details]').setText('DEVICE TYPE DETAILS');
            wizardPnl.down('combo[name=device_type_id]').setVisible(true);
            productLineDetailsGrid.columns[0].setText('Device Type');
            productLineDetailsGrid.columns[1].setText('Device Type Category');
            productLineDetailsGrid.columns[2].setText('Device Type Description');
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
        productLineDetailsStr.removeAll();
        productLineDetailsStr.load({params: {site_id: site_id}});
        funcShowOnlineCustomizableWindow(tracking_no, '80%', onlinePanel, 'customizablewindow');
    },


    showAddGvpTCRecommendationDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            storeID = item.storeID,
            store = Ext.getStore(storeID),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            childObject = Ext.widget(childXtype);
        if(store){
            store.removeAll();
            store.load();  
        }
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(record.get('manufacturing_site_id'));
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    receiveOnlineApplicationDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var storeID = item.storeID,
            winWidth = item.winWidth,
            bttn = item.up('button'),
            record = bttn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            tracking_no = record.get('reference_no'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            is_manager_query = record.get('is_manager_query');
        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, is_manager_query);
    },

    queryOnlineApplication: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            ref_no = record.get('reference_no'),
            application_status = record.get('application_status_id'),
            queriesGrid = Ext.widget('onlinequeriesgrid');
        queriesGrid.down('hiddenfield[name=application_id]').setValue(application_id);
        queriesGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        queriesGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        if (application_status == 17 || application_status === 17) {
            queriesGrid.down('button[action=add_query]').setVisible(false);
            queriesGrid.down('button[action=submit_app]').setVisible(false);
            queriesGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        }
        funcShowOnlineCustomizableWindow(ref_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
    },

    queryOnlineApplicationFrmBtn: function (btn) {
        var win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            application_status = win.down('hiddenfield[name=application_status_id]').getValue(),
            queriesGrid = Ext.widget('onlinequeriesgrid');
        queriesGrid.down('hiddenfield[name=application_id]').setValue(application_id);
        queriesGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        queriesGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        if (application_status == 17 || application_status === 17) {
            queriesGrid.down('button[action=add_query]').setVisible(false);
            queriesGrid.down('button[action=submit_app]').setVisible(false);
            queriesGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        }
        funcShowOnlineCustomizableWindow(tracking_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
    },

    submitRejectedOnlineApplication: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            action_url = 'submitRejectedOnlineApplication',
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            table_name = 'wb_gvp_applications';
        grid.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
    },

    submitRejectedOnlineApplicationFrmBtn: function (btn) {
        var action_url = 'submitRejectedOnlineApplication',
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            table_name = 'wb_premises_applications';
        btn.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
    },

    showAddInspectionSchedule: function (item) {
        var grid = item.up('grid'),
            homePnl = grid.up('panel'),
            addPnl = Ext.widget('gvpschedulingcontainer'),
            mainTabPnl = homePnl.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        addPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        grid.hide();
        homePnl.add(addPnl);
    },

    showEditInspectionSchedule: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            section_name = record.get('section_name'),
            grid = btn.up('grid'),
            homePnl = grid.up('panel'),
            addPnl = Ext.widget('gvpschedulingcontainer');
        addPnl.down('form').loadRecord(record);
        grid.hide();
        homePnl.add(addPnl);
    },
    saveWinInspectionTeamDetails:function(btn){
        var me = this,
        url = btn.action_url,
        table = btn.table_name,
        form = btn.up('form'),
        win = form.up('window'),
        store = Ext.getStore('inspectionscheduleselectionstr')
        frm = form.getForm();
    if (frm.isValid()) {
        frm.submit({
            url: url,
            params: {model: table, table_name: table},
            waitMsg: 'Please wait...',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    success = response.success,
                    message = response.message;
                if (success == true || success === true) {
                    toastr.success(message, "Success Response");
                    win.close();
                    store.load();
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
    saveInspectionTeamDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table, table_name: table},
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        form.down('hiddenfield[name=id]').setValue(response.record_id);
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

    showAddInspectionOtherDetails: function (btn) {
        var childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            grid = btn.up('grid'),
            mainTabPnl = btn.up('#contentPanel');
            if(mainTabPnl){
                  var activeTab = mainTabPnl.getActiveTab(),
                   inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue();
                 }else{
                  var  win = grid.up('window'),
                  inspection_id = win.down('gvpaddscheduleteamfrm').down('hiddenfield[name=id]').getValue();
                 }

        if (!inspection_id) {
            toastr.warning('Please save inspection team details first!!', 'Warning Response');
            return;
        }
        childObject.down('hiddenfield[name=inspection_id]').setValue(inspection_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddGvpApplicationsForInspections: function (btn) {
        var childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            grid = btn.up('grid'),
            inspection_id = grid.up('gvpschedulingcontainer').down('form').down('hiddenfield[name=id]').getValue(),
            section_id = grid.up('gvpschedulingcontainer').down('form').down('hiddenfield[name=section_id]').getValue();
        if (!inspection_id) {
            toastr.warning('Please save inspection team details first!!', 'Warning Response');
            return;
        }
        childObject.down('hiddenfield[name=inspection_id]').setValue(inspection_id);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    addGvpApplicationsIntoInspectionSchedule: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            //store = grid.getStore(),
            //storeData = store.getData().items,
            inspection_id = grid.down('hiddenfield[name=inspection_id]').getValue(),
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            details = [],
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: win
                }
            );
        mask.show();

        Ext.each(records, function (record) {
            var application_id = record.get('active_application_id'),
                application_code = record.get('application_code'),
                obj = {
                    inspection_id: inspection_id,
                    application_id: application_id,
                    application_code: application_code,
                    created_by: user_id
                };
            details.push(obj);
        });

        Ext.Ajax.request({
            url: 'gvpapplications/addGvpApplicationsIntoInspectionSchedule',
            jsonData: details,
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
                    win.close();
                    Ext.getStore('assignedgvpinspectionsstr').load();
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

    showGvpInspectionScheduleDetails: function (btn) {
        var grid = btn.up('grid'),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showEditGvpInspectionScheduleDetails: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            childObject = Ext.widget(childXtype),
            form = childObject.down('form'),
            winTitle = item.winTitle,
            winWidth = item.winWidth;
        form.loadRecord(record);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddGvpProductLineDetailsFromWin: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            pnl = grid.up('panel'),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue(),
            site_id = pnl.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            productLineStr = childObject.down('combo[name=product_line_id]').getStore(),
            productLineCategoryStr = childObject.down('combo[name=category_id]').getStore();
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        productLineStr.removeAll();
        productLineStr.load({params: {section_id: section_id}});
        productLineCategoryStr.removeAll();
        productLineCategoryStr.load({params: {section_id: section_id}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowOnlineCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showGvpInspectionDetailsUpdateFrm: function (item) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype);
        form.loadRecord(record);
        form.down('hiddenfield[name=id]').setValue(record.get('assigned_id'));
        funcShowOnlineCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },

    printGvpCertificate: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            section_id = record.get('section_id');
        this.fireEvent('generateGvpCertificate', application_code, section_id);
    },
 

    doPrintGvpApproval: function (btn) {
        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
          this.fireEvent('generateGvpCertificate', application_code, section_id);
    },

    doPrintInspectionReport: function (btn) {
        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
          this.fireEvent('generateGvpInspectionReport', application_code, section_id);
    },



    printColumnGvpCertificate: function (item) {
        var record = item.getWidgetRecord(),
            application_code = record.get('application_code'),
            section_id = record.get('section_id');
        this.fireEvent('generateGvpCertificate', application_code, section_id);
    },



    printGvpApprovalLetter: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            section_id = record.get('section_id');
        this.fireEvent('generateGvpApprovalLetter', application_code, section_id);
    },
    printColumnGvpApprovalLetter: function (item) {
        var record = item.getWidgetRecord(),
            
        application_code = record.get('application_code'),
            section_id = record.get('section_id');
        this.fireEvent('generateGvpApprovalLetter', application_code, section_id);
    },
    printPremiseCertificate: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            premise_id = record.get('premise_id');
        this.fireEvent('generatePremiseCert', premise_id);
    },

    printPremisePermit: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            premise_id = record.get('premise_id');
        this.fireEvent('generatePremisePermit', premise_id);
    },

    categorizeGvpApplications: function (button) {
        var grid = button.up('grid'),
            containerPnl = grid.up('newgvpinspectionschedulingpanel'),
            store1 = containerPnl.down('gvpinspectionschedulingphysicalgrid').getStore(),
            store2 = containerPnl.down('gvpinspectionschedulingdeskreviewgrid').getStore(),
            inspection_type_id = button.inspection_type_id,
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: grid
                }
            );
        Ext.MessageBox.show({
            title: 'Reason',
            msg: 'Remarks/Comments:',
            width: 320,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: true,
            scope: this,
            animateTarget: button,
            fn: function (btn, text) {
                var remarks = text;
                if (btn === 'ok') {
                    if (remarks == '' || remarks === '') {
                        toastr.warning('Please Enter Remark!!', 'Warning Response');
                        return;
                    }
                    mask.show();
                    Ext.each(records, function (record) {
                        var application_id = record.get('id');
                        if (application_id) {
                            selected.push(application_id);
                        }
                    });
                    Ext.Ajax.request({
                        url: 'gvpapplications/updateGvpApplicationsInspectionType',
                        jsonData: selected,
                        params: {
                            inspection_type_id: inspection_type_id,
                            remark: remarks
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
                                sm.deselectAll();
                                grid.store.load();
                                store1.load();
                                store2.load();
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
                }
            }
        });
    },

    onViewApprovalApplicationDetails: function (item) {
        var btn = item.up('button'),
            interfaceXtype = item.interfaceXtype,
            record = btn.getWidgetRecord();
        this.fireEvent('viewApplicationMoreDetails', record, interfaceXtype);
    },

    showPreviousUploadedDocs: function (item) {
        this.fireEvent('showPreviousUploadedDocs', item);
        /*
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            module_id = record.get('module_id'),
            application_code = record.get('application_code'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            static_stage = getGvpModuleStaticStage(sub_module_id, section_id, item.target_stage);
        this.fireEvent('showPrevUploadedDocsWin', item, section_id, module_id, sub_module_id, static_stage, application_code);
        */
    },
    editpreviewProductInformation: function (item) {
        this.fireEvent('editpreviewGvpProductInformation', item);
    },
    showApplicationDismissalForm: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            workflow_stage_id = record.get('workflow_stage_id');
        this.fireEvent('showApplicationDismissalFormGeneric', ref_no, application_id, application_code, module_id, sub_module_id, section_id, workflow_stage_id);
    },
    showGeneralAppAppQueries:function(btn){
        this.fireEvent('showGeneralAppAppQueries', btn);

    },
    showAddGvpUnstructuredQueriesWin: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            reference_no = containerPnl.down('displayfield[name=reference_no]').getValue(),
            tracking_no = containerPnl.down('displayfield[name=tracking_no]').getValue(),
            app_status_id = containerPnl.down('hiddenfield[name=application_status_id]').getValue(),
            respCol = child.getColumnManager().getHeaderByDataIndex('last_response'),
            managerQryCol = child.getColumnManager().getHeaderByDataIndex('manager_query_comment'),
            managerQryRespCol = child.getColumnManager().getHeaderByDataIndex('manager_queryresp_comment');
        if (app_status_id == 8 || app_status_id === 8) {//manager raise query
            //child.down('hiddenfield[name=is_manager_query]').setValue(1);
            if (managerQryCol) {
                managerQryCol.setHidden(false);
            }
        }
        if (app_status_id == 13 || app_status_id === 13) {//manager query response
            //child.down('hiddenfield[name=is_manager_query_response]').setValue(1);
            if (managerQryRespCol) {
                managerQryRespCol.setHidden(false);
            }
            if (respCol) {
                respCol.setHidden(false);
            }
        }
        child.setHeight(600);
        funcShowOnlineCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        child.down('hiddenfield[name=section_id]').setValue(section_id);
        child.down('hiddenfield[name=module_id]').setValue(module_id);
        child.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        child.down('displayfield[name=tracking_no]').setValue(tracking_no);
        child.down('displayfield[name=reference_no]').setValue(reference_no);
    }, showAddGvpUnstructuredQueriesWin: function (btn) {
  
        var me = this,
        childXtype = btn.childXtype,
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        isWin = btn.isWin,
        child = Ext.widget(childXtype),
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),
        application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
        module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
        sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
        section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
        workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
        reference_no = containerPnl.down('displayfield[name=reference_no]').getValue(),
        tracking_no = containerPnl.down('displayfield[name=tracking_no]').getValue();
        
        child.setHeight(600);
    
        funcShowOnlineCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
    
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        child.down('hiddenfield[name=section_id]').setValue(section_id);
        child.down('hiddenfield[name=module_id]').setValue(module_id);
        //child.down('hiddenfield[name=product_id]').setValue(product_id);
        child.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        
        child.down('displayfield[name=tracking_no]').setValue(tracking_no);
        child.down('displayfield[name=reference_no]').setValue(reference_no);


    },
    showTcRecommendation: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            childObject = Ext.widget(childXtype);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=id]').setValue(record.get('recomm_id'));
        childObject.down('combo[name=decision_id]').setValue(record.get('decision_id'));
        childObject.down('textarea[name=comments]').setValue(record.get('comments'));
        funcShowOnlineCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
     showDataCleanUpWindow: function(btn) {
        var container = Ext.ComponentQuery.query("#contentPanel")[0],
             activeTab = container.getActiveTab(), 
             wrapper = activeTab.down(btn.wrapper),
             child = Ext.widget(btn.childXtype);
        wrapper.removeAll();
        wrapper.add(child);
    },
    showGvpApplicationsSelectionList: function(btn) {
       var grid = Ext.widget(btn.childXtype),
           winTitle = btn.winTitle,
           winWidth = btn.winWidth;
       funcShowOnlineCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
    },
    loadGvpApplication: function(view, record) {
        var wrapper = Ext.ComponentQuery.query("#editgvpapplicationwizardId")[0],
            grid = Ext.ComponentQuery.query("#allgvpappgridId")[0],
            win = grid.up('window');
        wrapper.down('combo[name=gvp_type_id]').setValue(record.get('gvp_type_id'));
        wrapper.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        wrapper.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('workflow_stage_id'));
        wrapper.down('hiddenfield[name=active_application_id]').setValue(record.get('active_application_id'));
        wrapper.down('hiddenfield[name=active_application_code]').setValue(record.get('active_application_code'));
        wrapper.down('hiddenfield[name=application_status_id]').setValue(record.get('application_status_id'));
        wrapper.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
        wrapper.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
        wrapper.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
        wrapper.down('hiddenfield[name=gvp_type_id]').setValue(record.get('gvp_type_id'));
        wrapper.down('combo[name=device_type_id]').setValue(record.get('device_type_id'));
        wrapper.down('combo[name=assessment_type_id]').setValue(record.get('assessment_type_id'));
        wrapper.down('textfield[name=reference_no]').setValue(record.get('reference_no'));
       var gvpapplicationapplicantpnl = wrapper.down('gvpapplicationapplicantpnl'),
        applicantfrm = gvpapplicationapplicantpnl.down('form'),
        man_pnl = wrapper.down('mansitedetailstabpnl'),
        applicantFrm = wrapper.down('applicantdetailsfrm'),
        manufacturingSiteFrm = wrapper.down('gvpsitedetailsfrm'),
        gvpltrfrm = wrapper.down('gvpltrfrm'),
        contactPersonFrm = wrapper.down('premisecontactpersonfrm');
       //load other
       Ext.Ajax.request({
                method: 'GET',
                url: 'gvpapplications/prepareNewGvpReceivingStage',
                params: {
                    application_id: record.get('active_application_id')
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
                            
                            applicantFrm.loadRecord(model);
                            manufacturingSiteFrm.loadRecord(model);
                        }
                        if (ltrResults) {
                            var ltr_model = Ext.create('Ext.data.Model', ltrResults);
                            gvpltrfrm.loadRecord(ltr_model);
                        }
                        if (contactPersonDetails) {
                            var model3 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactPersonFrm.loadRecord(model3);
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
      
        Ext.Ajax.request({
                    url: "tradermanagement/getApplicantsList",
                    method: 'GET',
                    params: {
                        applicant_id: record.get('applicant_id'),
                        start: 0,
                        limit: 1000
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
                            var model = Ext.create('Ext.data.Model', resp.results[0]);
                               
                           applicantfrm.loadRecord(model);
                        } else {
                            toastr.error(message, 'Failure Response');
                            
                        }
                    },
                    failure: function (response) {
                        
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      
                        toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                       
                    }
                });
         // Ext.Ajax.request({
         //            url: "gvpapplications/getManSitesList",
         //            method: 'GET',
         //            params: {
         //                manufacturer_id: record.get('manufacturer_id'),
         //                start: 0,
         //                limit: 1000
         //            },
         //            headers: {
         //                'Authorization': 'Bearer ' + access_token,
         //                'X-CSRF-Token': token
         //            },
         //            success: function (response) {
                       
         //                var resp = Ext.JSON.decode(response.responseText),
         //                    message = resp.message,
         //                    success = resp.success;
         //                if (success == true || success === true) {
         //                    var model = Ext.create('Ext.data.Model', resp.results[0]);
                               
         //                   mansite_form.loadRecord(model);
         //                   manSiteForm.loadRecord(model);
         //                    applicantForm.loadRecord(model);
         //                    ltrForm.loadRecord(model);
         //                    contactPersonForm.loadRecord(model);
         //                } else {
         //                    toastr.error(message, 'Failure Response');
                            
         //                }
         //            },
         //            failure: function (response) {
                        
         //                var resp = Ext.JSON.decode(response.responseText),
         //                    message = resp.message;
         //                toastr.error(message, 'Failure Response');
                        
         //            },
         //            error: function (jqXHR, textStatus, errorThrown) {
                      
         //                toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                       
         //            }
         //        });
      
       win.close();
    },
    saveGvpEditAppBaseDetails: function (btn) {
        var me = this,
            toaster = 1,
            activeTab = Ext.ComponentQuery.query("#editgvpapplicationwizardId")[0],
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gvp_type_fld = activeTab.down('combo[name=gvp_type_id]'),
            device_type_fld = activeTab.down('combo[name=device_type_id]'),
            assessment_type_fld = activeTab.down('combo[name=assessment_type_id]'),
            gvp_type_id = gvp_type_fld.getValue(),
            device_type_id = device_type_fld.getValue(),
            assessment_type_id = assessment_type_fld.getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            ltrForm = activeTab.down('gvpltrfrm'),
            contactPersonForm = activeTab.down('premisecontactpersonfrm'),
            applicant_contact_person = contactPersonForm.down('combo[name=applicant_contact_person]').getValue(),
            contact_person_id = contactPersonForm.down('hiddenfield[name=id]').getValue(),
            contact_person_startdate = contactPersonForm.down('datefield[name=start_date]').getValue(),
            contact_person_enddate = contactPersonForm.down('datefield[name=end_date]').getValue(),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            ltr_id = ltrForm.down('hiddenfield[name=ltr_id]').getValue(),
            applicant_as_ltr = ltrForm.down('combo[name=applicant_as_ltr]').getValue(),
            manSiteDetailsForm = activeTab.down('gvpsitedetailsfrm'),
            gvpsitedetailsfrm = manSiteDetailsForm.getForm(),
            action_url = 'gvpapplications/saveGvpEditAppBaseDetails';
        if (!assessment_type_id) {
            toastr.warning('Please select asessessment type!!', 'Warning Response');
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
                    contact_person_enddate: contact_person_enddate
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
                        site_id = resp.manufacturing_site_id,
                        reg_site_id = resp.registered_manufacturing_site_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
                            activeTab.down('hiddenfield[name=registered_manufacturing_site_id]').setValue(reg_site_id);
                            manSiteDetailsForm.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
                            manSiteDetailsForm.down('button[action=search_site]').setDisabled(true);
                            manSiteDetailsForm.down('button[name=search_site]').setDisabled(true);
                            gvp_type_fld.setReadOnly(true);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                       // closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                   // closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },downloadPreviousDocupload: function (item) {
        var record = item.getWidgetRecord(),
            reference_no = record.get('reference_no'),
            id = record.get('id'),
            section = record.get('section_id');
            var redirect =  'http://197.149.177.186/mis/index.php/reports/uploadedEvaluationReportDrugs?id=' + id + '&section=' + section + '&reference_no=' + reference_no;
           
            print_report(redirect);
    },

    saveInspectionDates:function(btn){
        var  grid = btn.up('grid'),
        gvpinspectionschedulingphysicalgrid = btn.up('grid'),
        gvpinspectionschedulingphysicalgridstr = gvpinspectionschedulingphysicalgrid.getStore(),
        store = gvpinspectionschedulingphysicalgrid.getStore(),
        inspection_sections = []; 
        if(grid.up('newgvpmanagerinspectionpanel').down('form').down('hiddenfield[name=id]')){
           inspection_id = grid.up('newgvpmanagerinspectionpanel').down('form').down('hiddenfield[name=id]').getValue();   
        }else{
            inspection_id='';
        }
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items [i],
                 start_date = record.get('start_date'),
                 inspection_days = record.get('inspection_days'),
                 inspection_category_id = record.get('inspection_category_id'),
                 gvp_site_id = record.get('gvp_site_id'),
                 application_code = record.get('application_code'),
                 assigned_inspection_id = record.get('assigned_inspection_id'),
                 id = record.get('id');
                 
                if (!assigned_inspection_id && !inspection_id) {
                    btn.setLoading(false);
                    toastr.warning('Please Add Inpection Schedule First!!', 'Warning Response');
                    return false;
                } 
                 if (!start_date) {
                    btn.setLoading(false);
                    toastr.warning('Please Enter Inspection Start Date!!', 'Warning Response');
                    return false;
                } 

                if (!inspection_days) {
                    btn.setLoading(false);
                    toastr.warning('Please Enter No of Inspection Days!!', 'Warning Response');
                    return false;
                }

                // if (!inspection_category_id) {
                //     btn.setLoading(false);
                //     toastr.warning('Please Select Inspection Type!!', 'Warning Response');
                //     return false;
                // }     

            var obj = {
                id: id,
                inspection_days: inspection_days,
                inspection_category_id: inspection_category_id,
                start_date: start_date,
                created_by: user_id,
                gvp_site_id: gvp_site_id,
                application_code: application_code,
                inspection_id: inspection_id
            };
            if (record.dirty) {
                inspection_sections.push(obj);
            }
        }
        if (inspection_sections.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
        inspection_sections = JSON.stringify(inspection_sections);
        Ext.MessageBox.confirm('Inspection Scheduling', 'Do you want to Schedule selected Application(s)? Note:Ensure all Holidays are Pre Configured!', function (button) {
        if (button === 'yes') {
          Ext.Ajax.request({
            url: 'gvpapplications/saveInspectionDates',
            params: {
                inspection_sections: inspection_sections
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
                    gvpinspectionschedulingphysicalgridstr.load();

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
        }
      })
    },
});