/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.GepgBillPaymentsPostingGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'gepgbillpaymentspostinggrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display', enableTextSelection: true,
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
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    tbar:['->',{
        fieldLabel: 'Payment From',
        xtype:'datefield',
        labelAlign: 'right',
        width: '300',
        name: 'paid_fromdate'
    },{
        fieldLabel: 'Payment to',
        xtype:'datefield',
        labelAlign: 'right',
        width: '300',
        name: 'paid_todate'
    },{
        text: 'Filter Bills',
        iconCls:'-x-fa fa-search',
        margin: 5,ui:'soft-green',
        handler: 'funcFIlterBillsPaymentsDetails'
    },{
        text: 'Filter Bills',
        iconCls:'-x-fa fa-search',
        margin: 5,
        ui:'soft-red',
        handler: 'funcClearPayentFIlterBillsDetails'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                
                storeId: 'gepgbillinvoicepostinggridstr',
                pageSize: 200, remoteFilter: true,
                totalProperty:'totals',
                groupField:'module_name',
                proxy: {
                    url: 'revenuemanagement/getGepgbillPaymentspostingdetails',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: true
        }, afterrender: function(grid){
            var store = grid.getStore();
                store.removeAll();
                store.load();
        }
    }, features: [
        {
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: 'Module: {[values.rows[0].data.module_name]}, Sub-Module: {[values.rows[0].data.sub_modulename]}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'sub_modulename',
        text: 'Sub-Module Name',
        tdCls:'wrap-text',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        tdCls:'wrap-text',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        width:200,
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
        dataIndex: 'receipt_no',
        text: 'Receipt No',
        tdCls:'wrap-text',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        tdCls:'wrap-text',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'payment_received_by_name',
        text: 'Payment Received By',
        tdCls:'wrap-text',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'trans_date',
        text: 'Payment Date',
        width:100,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'iremboInvoiceNumber',
        tdCls:'wrap-text',
        text: 'Bank Invoice Reference Number',
        tdCls:'wrap-text',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'paymentStatus',
        tdCls:'wrap-text',
        text: 'Bank Payment Status',
        tdCls:'wrap-text',
        width: 200,
         renderer: function (value, metaData,record) {
            var paymentStatus = record.get('paymentStatus')
            if (paymentStatus == 'PAID') {
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return value;
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'payment_ref_no',
        text: 'Payment Reference No',
        tdCls:'wrap-text',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amount',align:'right',
        style: 'text-align:left',
        text: 'Invoice Amount',
        tdCls:'wrap-text',
        width: 120,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',align:'right',
        style: 'text-align:left',
        text: 'Currency Name',
        tdCls:'wrap-text',
        width: 80,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amounttshs',align:'right',
        style: 'text-align:left',
        text: 'Invoice Amount',
        tdCls:'wrap-text',
        width: 120,
    },   {
        xtype: 'gridcolumn',
        dataIndex: 'exchange_rate',align:'right',
        style: 'text-align:left',
        text: 'Exchange Rate',
        tdCls:'wrap-text',
        width: 100
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'amount_paid',
        align:'right',
        style: 'text-align:left',
        text: ' Amount Paid',
        tdCls:'wrap-text',
        width: 120,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',align:'right',
        style: 'text-align:left',
        text: 'Currency Name',
        width:80
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'amount_paidtshs',align:'right',
        style: 'text-align:left',
        text: 'Amount Paid(Converted)',
        width:120
    },{
        xtype: 'gridcolumn',
        dataIndex: 'balance',align:'right',
        style: 'text-align:left',
        text: 'Balance',
        width:120
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
                    text: 'Print Payments',
                    iconCls: 'x-fa fa-print',
                    handler: 'funcPrintApplicationREceipts'
                },{
                    text: 'Print Invoice',
                    iconCls: 'x-fa fa-print',
                    handler: 'funcPrintApplicationInvoice'
                }]
            }
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.up('grid').fireEvent('refresh', this);
        }
    },{
            text:'Export Payment Statement',
            iconCls:'-x-fa fa-print',
            handler: 'funcExportPaymentsStatement'
    },{
            text:'Print Payment Statement',
            iconCls:'-x-fa fa-print',
            handler: 'funcGeneratePaymentsStatement'
    }]
});
