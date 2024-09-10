Ext.define('Admin.view.revenuemanagement.viewcontrollers.RevenueManagementVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.revenuemanagementvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
	
	setGridStore: function (obj, options) {
        this.fireEvent('setGridStore', obj, options);
    },
     setCompStore: function (obj, options) {
        this.fireEvent('setCompStore', obj, options);
    },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setCompStore', obj, options);
    },
    setDynamicTreeGridStore: function (obj, options) {
        this.fireEvent('setDynamicTreeGridStore', obj, options);
    },
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },
     showNewApplication: function (btn) {
        var application_type = btn.app_type,
            me = this;
            me.fireEvent('showNewApplication', application_type, btn, 8);
            //
    },
    showNewRefundApplication: function (btn) {
        var application_type = btn.app_type,
            me = this;
            me.fireEvent('showNewRefundApplication', application_type, btn, 8);
            //
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
     funcClearRetentionReportFilters:function(btn){
    var grid = btn.up('grid'),
        store = grid.store;
    
        grid.down('combo[name=retention_yearfrom]').setValue('');
        grid.down('combo[name=retention_yearto]').setValue('');
        grid.down('combo[name=section_id]').setValue('');
        grid.down('combo[name=retention_status_id]').setValue('');

        store.removeAll();
},
    funcSaveBatchInvoiceDetails:function(btn){
        var mainTabPnl = btn.up('#contentPanel'),
             containerPnl = mainTabPnl.getActiveTab(),
             form = containerPnl.down('form'),
             grid = containerPnl.down('grid'),
             gridStore = grid.getStore(),
             url = btn.action_url,
             batchinvoice_type_id = btn.batchinvoice_type_id,
             batch_invoice_id = form.down('hiddenfield[name=batch_invoice_id]').getValue();
             frm = form.getForm();
             var data = [];

             gridStore.each(function(rec){
                data.push(rec.get('invoice_id'));
            });
        if(data.length == 0){
            toastr.error('Invoice Details have not been added, add to proceed...', 'Failure Response');
            return;
        }
        if(batch_invoice_id >0){
            toastr.error('Batch Invoice has already been Saved, request for cancellation incase of any ammendment.', 'Failure Response');
            return;
        }
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: { invoice_records: JSON.stringify(data),batchinvoice_type_id:batchinvoice_type_id},
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
                        form.down('numberfield[name=batch_invoice_no]').setValue(response.batch_invoice_no);
                        form.down('hiddenfield[name=batch_invoice_id]').setValue(response.batch_invoice_id);
                        form.down('numberfield[name=total_amount]').setValue(response.total_amount);
                        
                        store.removeAll();
                        store.load();
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
        else{
            toastr.error('Fill in all the frm details', 'Failure Response');
        }

    },
    doCreateProductRegParamWin: function (btn) {
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
                params: { model: table },
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
                        store.removeAll();
                        store.load();
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
    //receive online 
    setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
    },funcPrintApplicationInvoice:function(item){
            var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('application_id'),
            module_id = record.get('module_id'),
            invoice_id = record.get('invoice_id');
        var action_url = 'reports/generateApplicationInvoice?application_id=' + application_id + '&&module_id=' + module_id + '&&invoice_id=' + invoice_id;
        print_report(action_url);
    },
    funcPrintBatchPaymentStatement:function(item){
        var me = this,
            record = item.getWidgetRecord(),
            batch_appinvoice_id = record.get('batch_appinvoice_id'),
            
            batch_control_number = record.get('batch_control_number'),
            invoice_id = record.get('id'),
            invoice_no = record.get('invoice_no');
            if(batch_control_number <1 ){
                toastr.error('Payment Control Number, Not receipt for payment processing..', 'Failure Response');
                return;
            }
        var action_url = 'reports/generateBatchPaymentsStatement?invoice_no=' + invoice_no + '&invoice_id=' + invoice_id+"&batch_appinvoice_id="+batch_appinvoice_id+'&batch_control_number='+batch_control_number;;

        print_report(action_url);
    },
    funcPrintInvoiceStatement:function(item){

       var me = this,
            record = item.getWidgetRecord(),
            invoice_id = record.get('id'),
            invoice_no = record.get('invoice_no');
        var action_url = 'reports/generateBatchInvoiceStatement?invoice_no=' + invoice_no + '&&invoice_id=' + invoice_id;
        print_report(action_url);
    },funcPrintGridRetentionBatchInvoiceStatement:function(item){

        var me = this,
            record = item.getWidgetRecord(),
            invoice_id = record.get('id'),
            invoice_no = record.get('invoice_no');
        var action_url = 'reports/generateRetentionBatchInvoiceStatement?invoice_no=' + invoice_no + '&&invoice_id=' + invoice_id;
        print_report(action_url);
    },
    funcPrintGridRetentionBatchPaymentStatement:function(item){

       var me = this,
            record = item.getWidgetRecord(),
            invoice_id = record.get('id'),
            batch_appinvoice_id = record.get('batch_appinvoice_id'),
            batch_control_number = record.get('batch_control_number'),
            invoice_no = record.get('invoice_no');
            if(batch_control_number <1){
                toastr.error('Payment Control Number, Not receipt for payment processing..', 'Failure Response');
                return;
            }
        var action_url = 'reports/generateRetentionBatchPaymentsStatement?invoice_no=' + invoice_no + '&invoice_id=' + invoice_id+'&batch_appinvoice_id=' + batch_appinvoice_id+'&batch_control_number='+batch_control_number;
        print_report(action_url);
    },
    
    funcPrintBatchInvoiceStatement:function(btn){

        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            invoice_id =containerPnl.down('hiddenfield[name=batch_invoice_id]').getValue(),
            invoice_no =containerPnl.down('numberfield[name=batch_invoice_no]').getValue();
            if(invoice_id >0){
                var action_url = 'reports/generateBatchInvoiceStatement?invoice_no=' + invoice_no + '&&invoice_id=' + invoice_id;
                print_report(action_url);
            }
            else{
                toastr.error('Batch invoice not saved, save to proceed.', 'Failure Response');
                return;
            }
       
    },
    funcPrintRetentionBatchInvoiceStatement:function(btn){

        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            invoice_id =containerPnl.down('hiddenfield[name=batch_invoice_id]').getValue(),
            invoice_no =containerPnl.down('numberfield[name=batch_invoice_no]').getValue();
            if(invoice_id >0){
                var action_url = 'reports/generateRetentionBatchInvoiceStatement?invoice_no=' + invoice_no + '&&invoice_id=' + invoice_id;
                print_report(action_url);
            }
            else{
                toastr.error('Batch invoice not saved, save to proceed.', 'Failure Response');
                return;
            }
       
    },
    funcPrintApplicationREceipts:function(item){
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('application_id'),
            module_id = record.get('module_id'),
            payment_id = record.get('payment_id');

        var action_url = 'reports/generateApplicationReceipt?payment_id=' + payment_id + '&&module_id=' + module_id + '&&application_id=' + application_id;
        print_report(action_url);

    },
    funcFIlterBillsDetails:function(btn){
            var grid = btn.up('grid'),
                store = grid.store,
            invoice_from  = grid.down('datefield[name=invoice_from]').getValue();
            invoice_to = grid.down('datefield[name=invoice_to]').getValue();

          
            store.getProxy().extraParams = {
                invoice_to: invoice_to,
                invoice_from: invoice_from
            };
            store.load();

    },funcFIlterBillsPaymentsDetails:function(btn){
        var grid = btn.up('grid'),
            store = grid.store,
            paid_todate  = grid.down('datefield[name=paid_todate]').getValue();
            paid_fromdate = grid.down('datefield[name=paid_fromdate]').getValue();

        store.getProxy().extraParams = {
            paid_todate: paid_todate,
            paid_fromdate: paid_fromdate
        };
        store.load();
},

funcClearFIlterBillsDetails:function(btn){
    var grid = btn.up('grid'),
        store = grid.store;

    grid.down('datefield[name=invoice_from]').setValue('');
    grid.down('datefield[name=invoice_to]').setValue('');

  
    store.load();

},
   funcClearPayentFIlterBillsDetails:function(btn){
    var grid = btn.up('grid'),
        store = grid.store;
        
    grid.down('datefield[name=paid_todate]').setValue('');
    grid.down('datefield[name=paid_fromdate]').setValue('');
    
    store.load();

},
funcClearRetentionPayentFIlterBillsDetails:function(btn){
    var grid = btn.up('grid'),
        store = grid.store;
        
    grid.down('datefield[name=trans_datefrom]').setValue('');
    grid.down('datefield[name=trans_dateto]').setValue('');
    
    grid.down('datefield[name=retention_yearfrom]').setValue('');
    grid.down('datefield[name=retention_yearto]').setValue('');
    
    store.load();

},

funcFIlterRetentionInvoicesDetails:function(btn){
    var grid = btn.up('grid'),
        store = grid.store;
     store.load();

},
funcFIlterRetentionPaymentsDetails:function(btn){
    var grid = btn.up('grid'),
        store = grid.store;
     store.load();

},
funcClearRetentionLinkDetails:function(btn){
    var grid = btn.up('grid'),
        store = grid.store;
    
        grid.down('textfield[name=company_name]').setValue('');
        grid.down('combo[name=retention_yearfrom]').setValue('');
        grid.down('combo[name=retention_yearto]').setValue('');
        grid.down('combo[name=section_id]').setValue('');
        grid.down('combo[name=retention_status_id]').setValue('');

        store.removeAll();
},
funcClearPayentFIlterBillsDetails:function(btn){
    var grid = btn.up('grid'),
        store = grid.store;
    
        grid.down('textfield[name=company_name]').setValue('');
        grid.down('combo[name=retention_yearfrom]').setValue('');
        grid.down('combo[name=retention_yearto]').setValue('');
        grid.down('combo[name=section_id]').setValue('');
        grid.down('combo[name=retention_status_id]').setValue('');

        store.removeAll();
},funcsearchtraderDetailswin:function(btn){
    var me = this,
        grid = btn.up('grid'),
        childXtype = btn.childXtype,
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        childObject;
    childObject = Ext.widget(childXtype);
    funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
},
funcClearretentionapplicantsselection:function(btn){
    var grid = btn.up('grid'),
        store = grid.store;
        store.removeAll();
},
getSelectedTradersDetails:function(btn){
    var mainTabPnl = btn.up('#contentPanel'),
    containerPnl = mainTabPnl.getActiveTab(),
         applicantselection = containerPnl.down('grid[name=retentionapplicantsselectiongrd]');
        store = applicantselection.store,
        applicant_id = '';
        rawData = store.getRange();
        rawData.forEach(function(record) {
            applicant_id = record.get('applicant_id');
        })
        return applicant_id;
},
funcReturnRetentionIds:function(containerPnl){
    retention_ids = '';
    grid= containerPnl.down('retentionchargesinvoicesgrid');
    sm = grid.getSelectionModel(),
    selected_records = sm.getSelection();

    selected_records.forEach(function(record) {
        retention_id = record.data.retention_id,
         retention_ids = retention_ids+','+retention_id
    })
    return retention_ids;

},
funcPrintRetentionInvoiceStatement:function(btn){
    var mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),
        retention_ids = this.funcReturnRetentionIds(containerPnl);
        applicant_id = this.getSelectedTradersDetails(btn);
        grid= containerPnl.down('retentionchargesinvoicesgrid');
        sm = grid.getSelectionModel(),
        selected_records = sm.getSelection();
        console.log(selected_records);
        if(selected_records.length == 0){
            toastr.error('Not retention Invoice Selected, Select and proceed..', 'Alert');
            return;
        }
        
        var action_url = 'reports/generateSelectedRetentionInvoiceStatement?retention_ids=' + retention_ids+'&applicant_id='+applicant_id;
        print_report(action_url);
},
funcPrintRetentionPaymentsStatement:function(btn){

    this.fireEvent('funcPrintRetentionPaymentsStatement', btn);
},
onInvoiceCancellationRequest: function (btn) {
    var application_type = btn.app_type,
         dashwrapper = btn.dashwrapper;
    this.fireEvent('onPaymentProcessRequest', application_type,dashwrapper);
},onPaymentCancellationRequest: function (btn) {
    var application_type = btn.app_type,
         dashwrapper = btn.dashwrapper;
    this.fireEvent('onPaymentProcessRequest', application_type,dashwrapper);
}, 
onInvoiceBatchAppRequest: function (btn) {
    var application_type = btn.app_type,
         dashwrapper = btn.dashwrapper;
    this.fireEvent('onPaymentProcessRequest', application_type,dashwrapper);
}, 
setUserCombosStore: function (obj, options) {
    this.fireEvent('setUserCombosStore', obj, options);
},

funcAppInvoiceDetailstoBatch: function (btn) {
    mainTabPnl = btn.up('#contentPanel'),
        
    containerPnl = mainTabPnl.getActiveTab();
    batch_invoice_id = containerPnl.down('hiddenfield[name=batch_invoice_id]').getValue();
    if(batch_invoice_id >0){
        toastr.error('The Batch Invoice Details Have already been saved, Generate Batch Invoice Statement to proceed!!', 'Failure Response');
        return;
    }
    var me = this,
        childXtype = btn.childXtype,
        winTitle=btn.winTitle,
        winWidth=btn.winWidth,
        child = Ext.widget(childXtype),
        storeArray = eval(btn.stores),
        arrayLength = storeArray.length;
    if (arrayLength > 0) {
        me.fireEvent('refreshStores', storeArray);
    }
    childXtype.height= 550;
    funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
   
}, 
funcUnlinkBatchInvoice: function (item) {
   var btn = item.up('button'),
        record = btn.getWidgetRecord(),
        record_id = record.get('invoice_id');
        grid = item.up('grid'),
        batch_invoicestore = grid.getStore();
        batch_invoicestore.remove(batch_invoicestore.findRecord('invoice_id',record_id, 0, false, true, true));//
},
funcUnlinkInvoiceDetailsfromBatch: function (btn) {
    var grid = btn.up('grid'),
        batch_invoicestore = grid.getStore(),
        sm = grid.getSelectionModel(),
        selected_records = sm.getSelection();
        Ext.each(selected_records, function (dataset) {
            var record_id = dataset.data.invoice_id;
            batch_invoicestore.remove(batch_invoicestore.findRecord('invoice_id',record_id, 0, false, true, true));
        });
        
},


onAdhocInvoiceApplicationsRequest: function (btn) {
    var application_type = btn.app_type,
         dashwrapper = btn.dashwrapper;
    this.fireEvent('onPaymentProcessRequest', application_type,dashwrapper);
}, 

onPaymentWaiverRequestRequest: function (btn) {
    var application_type = btn.app_type,
         dashwrapper = btn.dashwrapper;
    this.fireEvent('onPaymentProcessRequest', application_type,dashwrapper);
}, 
funcSearchInvoiceDetails: function (btn,portal_id) {
    var me = this,
        childXtype = btn.childXtype,
        winTitle=btn.winTitle,
        winWidth=btn.winWidth,
        child = Ext.widget(childXtype);
        child.setHeight(450);
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
},
funcSearchReveImportPermitDetails: function (btn,portal_id) {
    var me = this,
        childXtype = btn.childXtype,
        winTitle=btn.winTitle,
        winWidth=btn.winWidth,
        child = Ext.widget(childXtype);
        child.setHeight(450);
        mainTabPnl = btn.up('#contentPanel'),
        
        containerPnl = mainTabPnl.getActiveTab();
        active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
        if(active_application_code != ''){
            
            toastr.error('Application has already Been Saved, submit to proceed!!', 'Failure Response');
            return;
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
},


onViewApplicationDetails: function (grid, record) {

    this.fireEvent('onRevCancellationlViewApDetails', record);

},
onAdhocViewApplicationDetails: function (grid, record) {

    this.fireEvent('onAdhocViewApplicationDetails', record);

},

funcApproveCancellationRequest:function(btn){
    var mainTabPnl = btn.up('#contentPanel'),
            storeId = btn.storeId,
            action_url = btn.action_url,
            confirm_title= btn.confirm_title,
            store = Ext.getStore(storeId);
            intrayStore = Ext.getStore('intraystr'),
            containerPnl = mainTabPnl.getActiveTab(),
            cancellation_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();

    Ext.MessageBox.confirm(confirm_title, 'Are you sure to perform this action ?', function (btn) {
        if (btn === 'yes') {
            Ext.getBody().mask(confirm_title+'...');

            Ext.Ajax.request({
                url: action_url,
                method: 'POST',
                params: {
                    cancellation_id: cancellation_id,
                    application_code: active_application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    if (success == true || success === true) {
                        toastr.success(message, 'Success Response');
                        
                        
                        mainTabPnl.remove(containerPnl);
                        store.removeAll();
                        store.load();
                        intrayStore.load();
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
                    toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            //
        }
    });  
},
funcOnChangeCreditNoteCurrency:function(cbo,value){
        var form = cbo.up('form'),
            credit_note_amount = form.down('numberfield[name=credit_note_amount]').getValue();
        if(value < 1){
            return;
        }
        if(credit_note_amount == 0){
            toastr.error('Fill in the Credit Note Amount, before currency selection', 'Error Response');
            cbo.setValue('')
            return;
        }
        if(credit_note_amount < 0){
            toastr.error('The Invoice amount has been cleared, confirm the invoice and payment details!!', 'Error Response');
            cbo.setValue('')
            return;

        }
    Ext.getBody().mask('Fetching the Currency Exchange Rate...');
    Ext.Ajax.request({
        url: 'revenuemanagement/funcOnFetchCurrencyExchangeRate',
        method: 'POST',
        params: {
            currency_id: value
        },
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'X-CSRF-Token': token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success == true || success === true) {
                var exchange_rate = resp.exchange_rate;
                form.down('numberfield[name=total_amount]').setValue(credit_note_amount/exchange_rate);

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
            toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
        }
    });


}, setRegGridsStore: function (obj, options) {
    this.fireEvent('setPremiseRegGridsStore', obj, options);
},
funcOnInspectionAtOwnerTabchange:function(tabPanel, newCard, oldCard){
    var mainTabPnl = tabPanel.up('#contentPanel'),
         containerPnl = mainTabPnl.getActiveTab(),
         active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();

         if(newCard.itemId == 'invoicing_panel' && active_application_code == ''){

            tabPanel.setActiveTab(oldCard);
            toastr.error('Save Application Before you Proceed!!' , 'Error Response');
            return;
         }

},
saveInspectionAtOwnersPremises:function(btn){
    var mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),
        permitapplication_code = containerPnl.down('hiddenfield[name=permitapplication_code]').getValue(),
        sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
        module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
        section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
        applicant_id = containerPnl.down('hiddenfield[name=applicant_id]').getValue();
        active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
        process_id = containerPnl.down('hiddenfield[name=process_id]').getValue();
        workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue();
        reference_no = containerPnl.down('displayfield[name=reference_no]').getValue();
        tracking_no= containerPnl.down('displayfield[name=tracking_no]').getValue();
        active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
        zone_id = containerPnl.down('combo[name=zone_id]').getValue();

        
    if(permitapplication_code == ''){
        toastr.error('Search Permit Application Before you Proceed!!' , 'Error Response');
        return;
    }
    if(zone_id == ''){
        toastr.error('Select Zone Details Before you Proceed!!' , 'Error Response');
        return;
    }
    Ext.MessageBox.confirm('Do you want to save application', 'Save Application', function (btn) {
        if (btn === 'yes') {
            Ext.getBody().mask('Do you want to save application');

            Ext.Ajax.request({
                url: 'revenuemanagement/saveInspectionAtOwnersPremises',
                method: 'POST',
                params: {
                    permitapplication_code: permitapplication_code,
                    sub_module_id: sub_module_id,
                    module_id: module_id,
                    section_id: section_id,
                    applicant_id: applicant_id,
                    application_code:active_application_code,
                    process_id:process_id,
                    workflow_stage_id:workflow_stage_id,
                    reference_no:reference_no,
                    zone_id:zone_id,
                    tracking_no:tracking_no,
                    active_application_id:active_application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    if (success == true || success === true) {

                        toastr.success(message, 'Success Response');
                        containerPnl.down('hiddenfield[name=active_application_code]').setValue(resp.application_code);
                        containerPnl.down('displayfield[name=tracking_no]').setValue(resp.tracking_no);
                        containerPnl.down('hiddenfield[name=active_application_id]').setValue(resp.active_application_id);
                        
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
                    toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            //
        }
    }); 


},
initiateAdhocInvoicing: function(grid, record) {
    var applicant_id = record.get('applicant_id'),
        applicant_name = record.get('applicant_name'),
        wizard = Ext.widget('adhocinvoiceapplicationtabpnl'),
        winTitle = "Adhoc invoice for: "+applicant_name;
    //set values
    wizard.down('hiddenfield[name=applicant_id]').setValue(applicant_id);
    funcShowCustomizableWindow(winTitle, "70%", wizard, 'customizablewindow');
},
showApplicantSelectionList: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
saveadhocInvoiceOtherDetails: function(btn) {
     var panel = btn.up('panel'),
         applicantdetailsfrm = panel.down('applicantdetailsfrm'),
         applicant_id = applicantdetailsfrm.down('hiddenfield[name=applicant_id]').getValue(),
         adhocinvoiceotherdetailsFrm = panel.down('adhocinvoiceotherdetailsFrm'),
         frm = adhocinvoiceotherdetailsFrm.getForm(),
         process_id = panel.down('hiddenfield[name=process_id]').getValue(),
         workflow_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(),
         active_application_id = panel.down('hiddenfield[name=active_application_id]').getValue(),
         application_status_id = panel.down('hiddenfield[name=application_status_id]').getValue(),
         sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
         module_id = panel.down('hiddenfield[name=module_id]').getValue(),
         section_id = panel.down('hiddenfield[name=section_id]').getValue(),
         application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
         product_id = panel.down('hiddenfield[name=product_id]').getValue(),
         adhocapp_type_id = panel.down('combo[name=adhocapp_type_id]').getValue(),
         application_description = panel.down('textarea[name=application_description]').getValue(),
         store = Ext.getStore('adhocinvoicingprocessdashgridstr');
     if(!applicant_id){
         toastr.warning('Please select an applicant first!!', 'Warning Response');
            return false;
     }
     if (frm.isValid()) {
            frm.submit({
                url: "revenuemanagement/saveAdhocApplicationInvoiceDetails",
                params: { 
                    applicant_id: applicant_id,
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    application_code: application_code,
                    application_status_id: application_status_id,
                    sub_module_id: sub_module_id,
                    module_id: module_id,
                    adhocapp_type_id:adhocapp_type_id,
                    application_description:application_description,
                    section_id: section_id
                },
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
                        panel.down('hiddenfield[name=active_application_id]').setValue(response.active_application_id);
                        panel.down('hiddenfield[name=application_status_id]').setValue(response.application_status_id);
                        panel.down('displayfield[name=tracking_no]').setValue(response.tracking_no);
                        panel.down('hiddenfield[name=active_application_code]').setValue(response.application_code);
     
                        store.removeAll();
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
        else{
            toastr.error('Fill in all the form details', 'Failure Response');
        }
  },
  receiveAndInvoiceOnlineApplicationDetailsFrmBtn: function (btn) {
       var panel = btn.up('panel'),
         applicantdetailsfrm = panel.down('applicantdetailsfrm'),
         applicant_id = applicantdetailsfrm.down('hiddenfield[name=applicant_id]').getValue(),
         adhocinvoiceotherdetailsFrm = panel.down('adhocinvoiceotherdetailsFrm'),
         process_id = panel.down('hiddenfield[name=process_id]').getValue(),
         frm = adhocinvoiceotherdetailsFrm.getForm();
         if(!applicant_id){
                 toastr.warning('Please select an applicant !!', 'Warning Response');
                    return false;
            }
         if(!frm.isValid()){
             toastr.warning('Please provide all required details !!', 'Warning Response');
                    return false;
            }
            Ext.getBody().mask('Please wait...');
            var storeID = btn.storeID,
                winWidth = btn.winWidth,
                win = btn.up('panel'),
                application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
                application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
                tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
                module_id = win.down('hiddenfield[name=module_id]').getValue(),
                sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
                section_id = win.down('hiddenfield[name=section_id]').getValue(),
                status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
                application_status_id = win.down('hiddenfield[name=application_status_id]').getValue(),
                hasQueries = checkApplicationRaisedQueries(application_code, module_id),
               
                table_name = getApplicationTable(module_id),

                extraParams = [
                    {
                        field_type: 'hiddenfield',
                        field_name: 'table_name',
                        value: table_name
                    }, {
                        field_type: 'hiddenfield',
                        field_name: 'application_code',
                        value: application_code
                    }, {
                        field_type: 'hiddenfield',
                        field_name: 'application_status_id',
                        value: application_status_id
                    }
                ];
                invoiceIsGenerated = checkGeneratedInvoiceDetails(application_code, module_id,sub_module_id,section_id);
                if(invoiceIsGenerated){
                        toastr.warning('Invoice has already been generated, print and submit!!', 'Warning Response');
                        Ext.getBody().unmask();
                        return false;

                }
                if(win.down('combo[name=applicable_checklist]')){
                    checklist_category_id = win.down('combo[name=applicable_checklist]').getValue();
                    hasValidatedChecklist = checkOnlineApplicationChecklistDetails(application_code, module_id,sub_module_id,section_id,checklist_category_id);
                    if(!hasValidatedChecklist){
                        toastr.warning('Fill in all the checklist details to proceed!!', 'Warning Response');
                        Ext.getBody().unmask();
                        return false;
    
                    }

                }
                
                if(!hasQueries){
                    this.showreceiveAndInvoiceAdhocApplicationDetails(process_id,application_id, application_code, module_id, sub_module_id, section_id, 'onlineapplicationreceiceinvoicefrm', winWidth, storeID, tracking_no, status_type_id, extraParams, hasQueries);
                }
                else{
                    toastr.warning('The Application has a pending query, close the query or submit to the Manager(Query Process) !!', 'Warning Response');
                    Ext.getBody().unmask();
                    return false;

                }
            
    },
    showreceiveAndInvoiceAdhocApplicationDetails:function(process_id,application_id, application_code, module_id, sub_module_id, section_id, form_xtype, win_width, storeID, tracking_no, status_type_id, extraParams, hasQueries) {
    var form = Ext.widget(form_xtype);
    
    form.down('hiddenfield[name=application_id]').setValue(application_id);
    
    form.down('hiddenfield[name=process_id]').setValue(process_id);
    //added
    form.down('hiddenfield[name=module_id]').setValue(module_id);
    form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
    form.down('hiddenfield[name=section_id]').setValue(section_id);

    //form.down('hiddenfield[name=curr_stage_id]').setValue(results.results);

    //remove readonly
    form.down('combo[name=currency_id]').setReadOnly(false);
    form.down('combo[name=paying_currency_id]').setReadOnly(false);
    form.down('numberfield[name=cost]').setReadOnly(false);

    if (extraParams) {
        Ext.each(extraParams, function (extraParam) {
            if (form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']')) {
                form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']').setValue(extraParam.value);
            }
        });
    }
   funcShowCustomizableWindow("Invoice", "40%", form, 'customizablewindow');
   Ext.getBody().unmask();
},
    printInvoice: function (btn) {
        var me = this,
            win = btn.up('panel'),

            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            invoice_id = '',
            module_id = win.down('hiddenfield[name=module_id]').getValue();

       var action_url = 'reports/generateApplicationInvoice?application_id=' + application_id + '&&module_id=' + module_id + '&&invoice_id=' + invoice_id+ '&&application_code=' + application_code;
       print_report(action_url);
    },


    
  showReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var activeTab = btn.up('panel'),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            invoiceIsGenerated = checkGeneratedInvoiceDetails(application_code, module_id,sub_module_id,section_id);
            
        if (invoiceIsGenerated) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        }
        else {
            Ext.getBody().unmask();
            toastr.warning('Please Enter All the required Details!!', 'Warning Response');
            return;
        }
    },
    backHome: function(btn){
        var wrapper = Ext.ComponentQuery.query(btn.dashwrapper)[0],
            child = Ext.widget(btn.sec_dashboard);
         wrapper.removeAll();
         wrapper.add(child);
    },
    funcClearRetentionReportFilters:function(btn){
        var grid = btn.up('grid'),
            store = grid.store;
        
            grid.down('combo[name=retention_yearfrom]').setValue('');
            grid.down('combo[name=retention_yearto]').setValue('');
            grid.down('combo[name=section_id]').setValue('');
            grid.down('combo[name=retention_status_id]').setValue('');

            store.removeAll();
    },
    print_retention_report:function(btn) {
        var grid = btn.up('grid'),
            filterfield = grid.getPlugin('filterfield');
        var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
        filter_array = Ext.JSON.encode(filter_array);
        var action_url = "retentionmanagement/exportRevenueReportsData?filename=RetentionReport&function=getRetentionReport"+"&filter="+encodeURIComponent(filter_array);
            print_report(action_url);
    },
    // printInvoice: function (btn) {
    //     var me = this,
    //         win = btn.up('panel'),
    //         panel = win.up('panel'),
    //         record = btn.getWidgetRecord(),
    //         invoice_no = record.get('invoice_no');
    //     if(panel.down('hiddenfield[name=active_application_code]')){
    //         var application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
    //             application_id = panel.down('hiddenfield[name=active_application_id]').getValue(),
    //             invoice_id = '',
    //             module_id = panel.down('hiddenfield[name=module_id]').getValue();
    //     }else{
    //         var panel = win.up('#contentPanel'),
    //             application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
    //             application_id = panel.down('hiddenfield[name=active_application_id]').getValue(),
    //             invoice_id = '',
    //             module_id = panel.down('hiddenfield[name=module_id]').getValue();
    //     }


    //    // var action_url = report_server_url+'invoice?invoice_no=' + invoice_no;
    //    // print_report(action_url);
    //    previewCorrespondence(application_code, module_id, 'invoice', JSON.stringify({invoice_no:invoice_no}));
    // },

      printColumnReceipt: function (item) {
        var record = item.getWidgetRecord(),
            receipt_no = record.get('receipt_no');
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id');
        
        previewCorrespondence(application_code, module_id, 'receipt',JSON.stringify({receipt_no:receipt_no,section_id:section_id,sub_module_id:sub_module_id}));
    },

    showAddConfigParamWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype);

        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    },
    onViewMirApplication: function (grid, record) {
        this.fireEvent('viewApplicationDetails', record);

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
            motherPnl = wizardPnl.up('panel');
            console.log(motherPnl);
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
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
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
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
    newquickNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
            //console.log(motherPnl);
            application_id = wizardPnl.down('hiddenfield[name=active_application_id]').getValue(),
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
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }

        if (step === 3) {
            wizardPnl.getViewModel().set('atEnd', true);
            // wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
            // motherPnl.getViewModel().set('atEnd', true);

        }
        else {
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
    onPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
            
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');

    },
    jointquickNavigation: function (btn) {
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
                toastr.warning('Please Save Plan details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', true);
        }else {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', false);
        }

        if (step === 3) {
            motherPnl.getViewModel().set('atEnd', true);
        }else {
            wizardPnl.down('button[name=save_btn]').setText('Save Application Details');
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

    showUploadEvaluationDocuments: function (item) {
        this.fireEvent('showUploadEvaluationDocuments', item);
    },
    showApplicationMoreDetails: function (btn) {
        this.fireEvent('showApplicationMoreDetails', btn);
    },
    showSelectedApplicationMoreDetails: function(btn) {
         var button = btn.up('button'),
            grid = button.up('grid'),
            container = grid.up('panel'),
            record = button.getWidgetRecord(),
            application_code = record.get('application_code');
        container.down('hiddenfield[name=active_application_code]').setValue(application_code);
        this.fireEvent('showApplicationMoreDetails', btn);
    },
    showApplicationUploadedDocument: function(btn) {
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
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
       
    },


    showApplicantSelectionList: function (btn) {
        var grid = Ext.widget('advancedCustomerApplicantSelectionGrid');
        if (btn.applicantType == 'local') {
            grid.applicantType = btn.applicantType;
        } else {
            grid.applicantType = 'nonlocal';
        }
        funcShowCustomizableWindow('Applicant Selection List', '90%', grid, 'customizablewindow');
    },
    showCustomerSelectionList: function (btn) {
        var grid = Ext.widget('customerSelectionGrid');
        if (btn.applicantType == 'local') {
            grid.applicantType = btn.applicantType;
        } else {
            grid.applicantType = 'nonlocal';
        }
        funcShowCustomizableWindow('Applicant Selection List', '90%', grid, 'customizablewindow');
    },
    // getCustomerApplicationApprovalDetails: function (item) {

    //     this.fireEvent('getCustomerApplicationApprovalDetails', item);
    // },

    showCustomerApplicationApprovalDetails: function(btn) {
        var button = btn.up('button'),
           grid = button.up('grid'),
           form = Ext.widget(btn.childXtype),
           frm = form.getForm(),
           record = button.getWidgetRecord(),
           application_code = record.get('application_code'),
           module_id = record.get('module_id');
           applicant_id = record.get('applicant_id');
           sub_module_id = record.get('sub_module_id');
            //form.loadRecord(record);
            //approval_id
            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.down('hiddenfield[name=module_id]').setValue(module_id);
            form.down('hiddenfield[name=applicant_id]').setValue(applicant_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
          if(approval_decision_id = record.get('approval_decision_id')){
            form.down('combo[name=approval_decision_id]').setValue(approval_decision_id);
          }
          else{

          }
          if(approval_id = record.get('approval_id')){
            form.down('hiddenfield[name=id]').setValue(approval_id);
          }
          else{

          }
       funcShowCustomizableWindow('Approval form', '50%', form, 'customizablewindow',btn);
   },

   saveAdvancedCustomerApprovaldetails: function (btn) {
    var me = this,
        url = btn.action_url,
        table = btn.table_name,
        form = btn.up('form'),
        win = form.up('window'),
        storeID = btn.storeID,
        store = Ext.getStore(storeID),
        frm = form.getForm();
        id= form.down('hiddenfield[name=id]');
    if (frm.isValid()) {
        frm.submit({
            url: url,
            waitMsg: 'Please wait...',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (form, action) {
                var response = Ext.decode(action.response.responseText),
                    success = response.success,
                    message = response.message;
                    record_id = response.record_id
                    console.log(record_id);
                if (success == true || success === true) {
                    store.removeAll();
                    store.load();
                    //id.setValue(record_id);
                   // form.down('hiddenfield[name=id]').setValue(record_id)
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

onViewAdvancedCustomerApplication: function (grid, record) {
    this.fireEvent('viewApplicationDetails', record);
},
printQuote: function (btn) {
    var me = this,
        win = btn.up('panel'),
        record = btn.getWidgetRecord(),
        application_code = record.get('application_code'),
        module_id = record.get('module_id'),
        // section_id = record.get('section_id'),
        // sub_module_id = record.get('sub_module_id'),
        invoice_no = record.get('invoice_no');
      
   previewCorrespondence(application_code, module_id, 'salesQuote', JSON.stringify({invoice_no:invoice_no}));
},

showAdvancedCustomerRegister: function(btn) {
    var button = btn.up('button'),
        record = button.getWidgetRecord(),
        application_code = record.get('application_code');
        panel = Ext.widget('advancedCustomerRegisterGrid');
       funcShowCustomizableWindow(btn.winTitle, '70%', panel, 'customizablewindow');
},
showAdvancedCustomerRegisterMoreDetails: function(btn) {
    var button = btn.up('button'),
       grid = button.up('grid'),
       record = button.getWidgetRecord(),
       application_code = record.get('application_code');
       module_id = record.get('module_id');
       sub_module_id = record.get('sub_module_id');
       section_id = record.get('section_id');
       ref_no = record.get('tracking_no');
       grid.down('hiddenfield[name=active_application_code]').setValue(application_code);
   this.fireEvent('showAdvancedCustomerRegisterMoreDetails',btn,application_code,module_id,sub_module_id,section_id,ref_no);
},
showAppliedRefundInvoices: function(btn) {
    var button = btn.up('button'),
        grid = button.up('grid'),
        record = button.getWidgetRecord(),
        container = grid.up('panel'),
        application_code = record.get('application_code');
        container.down('hiddenfield[name=active_application_code]').setValue(application_code);
        panel = Ext.widget('appliedRefundInvoicesGrid');
       funcShowCustomizableWindow(btn.winTitle, '70%', panel, 'customizablewindow');
},
showInvoicesApprovalWin: function(btn) {
    var button = btn.up('button'),
        record = button.getWidgetRecord(),
        application_code = record.get('application_code');
        child=btn.childXtype;
        panel = Ext.widget(child);
       funcShowCustomizableWindow(btn.winTitle, '70%', panel, 'customizablewindow');
},
showInvoiceRefundApprovalFrm: function(btn) {
    var button = btn.up('button'),
       grid = button.up('grid'),
       form = Ext.widget(btn.childXtype),
       frm = form.getForm(),
       record = button.getWidgetRecord(),
       application_code = record.get('application_code'),
       module_id = record.get('module_id');
       applicant_id = record.get('applicant_id');
       sub_module_id = record.get('sub_module_id');
       invoice_no = record.get('invoice_no');
        //form.loadRecord(record);
        //approval_id
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=applicant_id]').setValue(applicant_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=invoice_no]').setValue(invoice_no);
      if(approval_decision_id = record.get('approval_decision_id')){
        form.down('combo[name=approval_decision_id]').setValue(approval_decision_id);
      }
      else{

      }
      if(approval_id = record.get('approval_id')){
        form.down('hiddenfield[name=id]').setValue(approval_id);
      }
      else{

      }
   funcShowCustomizableWindow('Approval form', '50%', form, 'customizablewindow',btn);
},
onZoomUndo: function(btn) {
        var pnl = btn.up('panel'),
            chart = pnl.down('cartesian'),
            interaction = chart && Ext.ComponentQuery.query('interaction', chart)[0],
            undoButton = interaction && interaction.getUndoButton(),
            handler = undoButton && undoButton.handler;

        if (handler) {
            handler();
        }
    },
onSeriesRender: function(sprite, config, rendererData, index) {
        var store = rendererData.store,
            storeItems = store.getData().items,
            currentRecord = storeItems[index],
            previousRecord = (index > 0 ? storeItems[index - 1] : currentRecord),
            current = currentRecord && currentRecord.data.g1,
            previous = previousRecord && previousRecord.data.g1,
            isUp = current >= previous,
            changes = {};

        switch (config.type) {
            case 'marker':
                changes.strokeStyle = (isUp ? 'cornflowerblue' : 'tomato');
                changes.fillStyle = (isUp ? 'aliceblue' : 'lightpink');
                break;
            case 'line':
                changes.strokeStyle = (isUp ? 'cornflowerblue' : 'tomato');
                changes.fillStyle = (isUp ? 'rgba(100, 149, 237, 0.4)' : 'rgba(255, 99, 71, 0.4)');
                break;
        }

        return changes;
    },

    onAxisRangeChange: function(axis, range) {
        var max;

        if (!range) {
            return;
        }

        // expand the range slightly to make sure markers aren't clipped
        max = range[1];

        if (max >= 1000) {
            range[1] = max - max % 100 + 100;
        }
        else if (max >= 500) {
            range[1] = max - max % 50 + 50;
        }
        else {
            range[1] = max - max % 20 + 20;
        }
    },

    onRefresh: function() {
        var pnl = btn.up('panel'),
            chart = pnl.down('cartesian'),
            store = chart.getStore();

        store.refreshData();
    },
loadCustomerDetailsForm: function (form){
    var pnl = form.up('panel'),
        CustomerId = pnl.down('hiddenfield[name=CustomerId]').getValue();

     Ext.Ajax.request({
            url: 'tradermanagement/getApplicantsList',
            method: 'GET',
            params: {
                applicant_id: CustomerId,
                _token: token
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    results = resp.results,
                    success = resp.success;
                if (success == true || success === true) {
                    // toastr.success(message, 'Success Response');
                    if(results[0]){
                        model = Ext.create('Ext.data.Model', results[0]);
                        form.loadRecord(model);
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
                toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
            }
        });
    },
    RefreshGridFilters: function(btn){
        btn.up('grid').getStore().reload();
    },
    // printInvoice: function (btn) {
    //     var me = this,
    //         win = btn.up('panel'),
    //         panel = win.up('panel'),
    //         record = btn.getWidgetRecord(),
    //         invoice_no = record.get('invoice_no');
    //     if(panel.down('hiddenfield[name=active_application_code]')){
    //         var application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
    //             application_id = panel.down('hiddenfield[name=active_application_id]').getValue(),
    //             invoice_id = '',
    //             module_id = panel.down('hiddenfield[name=module_id]').getValue();
    //     }else{
    //         var panel = win.up('#contentPanel'),
    //             application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
    //             application_id = panel.down('hiddenfield[name=active_application_id]').getValue(),
    //             invoice_id = '',
    //             module_id = panel.down('hiddenfield[name=module_id]').getValue();
    //     }


    //    // var action_url = report_server_url+'invoice?invoice_no=' + invoice_no;
    //    // print_report(action_url);
    //    previewCorrespondence(application_code, module_id, 'invoice', JSON.stringify({invoice_no:invoice_no}));
    // },
    loadCustomerStatement: function(view, record, item, index, e, eOpts){
        var grid = view.grid,
            pnl = grid.up('panel'),
            ledger = Ext.widget('advancedCustomerLedgerPnl');
        console.log(record.get('applicant_id'));
        ledger.down('hiddenfield[name=CustomerId]').setValue(record.get('applicant_id'));
        pnl.removeAll();
        pnl.add(ledger);
    },
    backTOCustomerList: function(btn){
        var pnl = btn.up('panel').up('customerLedgerContPnl'),
            ledger = Ext.widget('financeCustomerListGrid');

        pnl.removeAll();
        pnl.add(ledger);
    },





    onDownload: function() {
        var chart;

        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');

            return;
        }

        chart = this.lookup('chart');

        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'Redwood City Climate Data Chart'
            });
        }
        else {
            chart.preview();
        }
    },

    onReloadData: function(btn) {
        var pnl = btn.up('panel'),
            chart = pnl.down('cartesian'),
            advancedCustomerLedgerPnl = pnl.up('advancedCustomerLedgerPnl'),
            date_from = pnl.down('datefield[name=date_from]').getValue(),
            date_to = pnl.down('datefield[name=date_to]').getValue(), applicant_id;
        if(advancedCustomerLedgerPnl.down('hiddenfield[name=CustomerId]')){
            applicant_id = advancedCustomerLedgerPnl.down('hiddenfield[name=CustomerId]').getValue();
        }
        chart.getStore().reload({params:{date_to: date_to, date_from: date_from, applicant_id: applicant_id}});
        this.fireEvent('getRevenueTotal', pnl);
    },
    onEditTipRender: function(tooltip, item, target, e) {
        tooltip.setHtml('Average: ' + target.yValue.toFixed(1));
    },
});