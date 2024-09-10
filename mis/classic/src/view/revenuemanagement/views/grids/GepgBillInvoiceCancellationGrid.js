/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.GepgBillInvoiceCancellationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'gepgbillinvoicecancellationgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        enableTextSelection: true,
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    tbar:['->',{
        fieldLabel: 'Invoice From',
        xtype:'datefield',
        labelAlign: 'right',
        width: '300',
        name: 'invoice_from'
    },{
        fieldLabel: 'Invoice From',
        xtype:'datefield',
        labelAlign: 'right',
        width: '300',
        name: 'invoice_to'
    },{
        text: 'Filter Bills',
        iconCls:'x-fa fa-search',
        margin: 5, ui:'soft-green',
        handler: 'funcFIlterBillsDetails'
    },{
        text: 'Clear Filter',
        iconCls:'x-fa fa-search',
        margin: 5,
        ui:'soft-red',
        handler: 'funcClearFIlterBillsDetails'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 200, remoteFilter: true,
                storeId: 'gepgbillinvoicecancellationgridstr',
               
                totalProperty:'totals',
                proxy: {
                    url: 'revenuemanagement/getbillinvoiceCancellationdetails',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: true
        },afterrender: function(grid){
            var store = grid.getStore();
            store.removeAll();
            store.load();
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
       width: 200,
        tdCls:'wrap-text',
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        width: 200,
        tdCls:'wrap-text',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice No',
        tdCls:'wrap-text',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        tdCls:'wrap-text',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_of_invoicing',
        tdCls:'wrap-text',
        text: 'Date of Invoicing',
        width: 200
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'iremboInvoiceNumber',
        text: 'iREMBO Submission Status',
        width: 200,
        renderer: function (value, metaData,record) {
            if (value != '') {
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
            if(value == ''){
                value = 'Submission Status Not Set';
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return value;
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'iremboInvoiceNumber',
        tdCls:'wrap-text',
        text: 'iREMBO Invoice Number',
        width: 200,
        filter: {
            xtype: 'textfield'
        },
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'paymentStatus',
        tdCls:'wrap-text',
        text: 'iREMBO Payment Status',
        width: 200,
         renderer: function (value, metaData,record) {
            var paymentStatus = record.get('paymentStatus'),
                receipt_id =  record.get('receipt_id');

            if (paymentStatus == 'PAID') {
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
            else{
                if(receipt_id >0){
                    metaData.tdStyle = 'color:white;background-color:green';
                    return 'Payment Made';
                }else{
                    metaData.tdStyle = 'color:white;background-color:red';
                    return 'Not Paid';
                }
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'exchange_rate',align:'right',
        style: 'text-align:left',
        text: 'Exchange Rate',
        flex:0.5
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amount',align:'right',
        style: 'text-align:left',
        text: 'Invoice Amount',
        flex:0.5
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',align:'right',
        style: 'text-align:left',
        text: 'Currency Name',
        flex:0.5
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amounttshs',align:'right',
        style: 'text-align:left',
        text: 'Invoice Amount(Converted)',
        flex:0.5
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Restore Cancelled Bills',
                    iconCls: 'x-fa fa-print',
                    handler: 'funcREstoreBillingInvoice'
                }]
            }
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.up('grid').fireEvent('refresh', this);
        }
    }]
});
