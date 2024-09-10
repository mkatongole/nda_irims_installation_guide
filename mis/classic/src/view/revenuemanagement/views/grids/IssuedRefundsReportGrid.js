Ext.define('Admin.view.RevenueManagement.views.grids.IssuedRefundsReportGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.issuedRefundsReportGrid',
    controller: 'revenuemanagementvctr',
    padding: '2 0 2 0',
    //bodyPadding: 3,
    autoScroll: true,
    // colorScheme: 'soft-blue',
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 100,
                storeId: 'InvoiceReportStr',
                proxy: {
                    url: 'revenuemanagement/getApprovedRefundsList',
                    
                }
            },
            isLoad: true
        },
    },
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
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
            },//drugproductdocuploadsgrid
            items: ['->',{
                    xtype: 'textfield',
                    name: 'invoice_number',
                    fieldLabel: 'Invoice Number',
                    margin: '0 20 20 0',
                    emptyText: 'Enter Invoice No.'
                },{
                    xtype: 'datefield',
                    name: 'date_from',
                    fieldLabel: 'Invoice Date From',
                    emptyText: 'From',
                    margin: '0 20 20 0'
                },{
                    xtype: 'datefield',
                    name: 'date_to',
                    fieldLabel: 'Invoice Date To',
                    emptyText: 'To',
                    margin: '0 20 20 0'
                },{
                    xtype: 'combo', 
                    anyMatch: true,
                    name: 'applicant_id',
                    allowBlank: true,
                    queryMode: 'local',
                    fieldLabel: 'Customer/Invoice To',
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
                applicant_id = grid.down('combo[name=applicant_id]').getValue(),
                date_to = grid.down('datefield[name=date_to]').getValue(),
                date_from = grid.down('datefield[name=date_from]').getValue(),
                invoice_number = grid.down('textfield[name=invoice_number]').getValue(),
                store = this.getStore();
            if(grid.up('advancedCustomerLedgerPnl')){
                    applicant_id = grid.up('advancedCustomerLedgerPnl').down('hiddenfield[name=CustomerId]').getValue();
            }
            store.removeAll();
            store.getProxy().extraParams = {
                applicant_id: applicant_id,
                date_to: date_to,
                date_from: date_from,
                invoice_number: invoice_number
            }
        }
    },{
        xtype: 'exportbtn'
    }],
    columns: [{
        xtype: 'rownumberer',
        text: 'S/N'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant',
        text: 'Customer Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice Number(s)',
        flex: 1
    },{
        xtype: 'datecolumn',
        dataIndex: 'date_of_refund',
        text: 'Refund Approval Date',
        format: 'Y-m-d',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'total_element_amount',
        text: 'Total Refund',
        flex: 1,
        summaryType: 'sum',
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return '<b>' + val + '</b>';
        }
    },{
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_done',
        text: 'Status',
        width: 150,
        tdCls: 'wrap',
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Cleared";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Pending";
        }
    }
    , {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'button',
            iconCls: 'x-fa fa-print',
            ui: 'soft-blue',
            name:'refund_letter',
            text: 'Print Letter',
            report_type: 'refund_letter',
            handler: 'printInvoice'
        }
    }
      
    ]    
});
