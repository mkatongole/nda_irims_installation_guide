Ext.define('Admin.view.RevenueManagement.views.grids.IssuedReceiptReportGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.issuedReceiptReportGrid',
    controller: 'revenuemanagementvctr',
    padding: '2 0 2 0',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    colorScheme: 'soft-blue',
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 100,
                storeId: 'ReceiptsReportStr',
                proxy: {
                    url: 'revenuemanagement/getApplicationPaymentDetails',
                    
                }
            },
            isLoad: true
        },
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            // hidden: true,
            ui: 'footer',
            height: 75,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },//drugproductdocuploadsgrid invoice_no
            items: ['->',{
                    xtype: 'textfield',
                    name: 'invoice_no',
                    fieldLabel: 'Invoice Number',
                    margin: '0 20 20 0',
                    emptyText: 'Enter Invoice No.'
                },{
                    xtype: 'textfield',
                    name: 'receipt_number',
                    fieldLabel: 'Receipt Number',
                    margin: '0 20 20 0',
                    emptyText: 'Enter Receipt No.'
                },{
                    xtype: 'datefield',
                    name: 'date_from',
                    fieldLabel: 'Payment Date From',
                    emptyText: 'From',
                    margin: '0 20 20 0'
                },{
                    xtype: 'datefield',
                    name: 'date_to',
                    fieldLabel: 'Payment Date To',
                    emptyText: 'To',
                    margin: '0 20 20 0'
                },{
                    xtype: 'combo', 
                    anyMatch: true,
                    name: 'applicant_id',
                    allowBlank: true,
                    queryMode: 'local',
                    fieldLabel: 'Customer/Payment By',
                    valueField: 'id',
                    displayField: 'name',
                    margin: '0 20 20 0',
                    listeners: {
                        afterrender: {
                            fn: 'setCompStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getCustomerList'
                                }
                            },
                            isLoad: true
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Filter',
                    iconCls: 'fa fa-search',
                    ui: 'soft-blue',
                    handler: 'RefreshGridFilters'
                }
            ]
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            var grid = this.up('grid'),
                pnl = grid.up('panel'),
                applicant_id = pnl.down('combo[name=applicant_id]').getValue(),
                date_to = pnl.down('datefield[name=date_to]').getValue(),
                date_from = pnl.down('datefield[name=date_from]').getValue(),
                receipt_number = pnl.down('textfield[name=receipt_number]').getValue(),
                invoice_no = pnl.down('textfield[name=invoice_no]').getValue(),
                store = this.getStore();

            if(grid.up('advancedCustomerLedgerPnl')){
                    applicant_id = grid.up('advancedCustomerLedgerPnl').down('hiddenfield[name=CustomerId]').getValue();
            }

            store.removeAll();
            store.getProxy().extraParams = {
                applicant_id: applicant_id,
                date_to: date_to,
                date_from: date_from,
                is_report: 1,
                invoice_no: invoice_no,
                receipt_number: receipt_number
            }
        }
    },{
        xtype: 'exportbtn'
    }],
    columns: [{
            xtype: 'rownumberer',
        },{
            xtype: 'gridcolumn',
            dataIndex: 'drawer',
            text: 'Drawer',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'invoice_no',
            text: 'Invoice Number',
            flex: 1,
        },{
            xtype: 'datecolumn',
            dataIndex: 'trans_date',
            text: 'Transaction Date',
            format: 'd/m/Y',
            flex: 1,
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'payment_mode',
            text: 'Payment Mode',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'receipt_no',
            text: 'Receipt No',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'amount_paid',
            text: 'Amount',
            flex: 1,
            renderer: function (val) {
                return Ext.util.Format.number(val, '0,000.00');
            },
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'currency',
            text: 'Currency',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'exchange_rate',
            text: 'Exchange Rate(Current)',
            flex: 1,
            renderer: function (val) {
                return Ext.util.Format.number(val, '0,000.00');
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'equivalent_paid',
            text: 'Equivalent(Paying Currency)',
            flex: 1,
            renderer: function (val, meta) {
                meta.tdStyle = 'color:#005985';
                return Ext.util.Format.number(val, '0,000.00');
            }
        },{
            text: 'Options',
            xtype: 'widgetcolumn',
            width: 150,
            widget: {
                width: 150,
                textAlign: 'left',
                xtype: 'button',
                iconCls: 'x-fa fa-print',
                ui: 'soft-blue',
                text: 'Print Receipt',
                report_type: 'Receipt',
                handler: 'printColumnReceipt'
            }
        }
      
    ]    
});
