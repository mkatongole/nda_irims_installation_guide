Ext.define('Admin.view.RevenueManagement.views.grids.IssuedQuotesReportGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.issuedQuotesReportGrid',
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
                storeId: 'QuotationReportStr',
                proxy: {
                    url: 'revenuemanagement/getIssuedInvoicesList',
                    
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
            },//drugproductdocuploadsgrid
            items: ['->',{
                    xtype: 'textfield',
                    name: 'quote_number',
                    fieldLabel: 'Quote Number',
                    margin: '0 20 20 0',
                    emptyText: 'Enter Quote No.'
                },{
                    xtype: 'datefield',
                    name: 'date_from',
                    fieldLabel: 'Quote Date From',
                    emptyText: 'From',
                    margin: '0 20 20 0'
                },{
                    xtype: 'datefield',
                    name: 'date_to',
                    fieldLabel: 'Quote Date To',
                    emptyText: 'To',
                    margin: '0 20 20 0'
                },{
                    xtype: 'combo', 
                    anyMatch: true,
                    name: 'applicant_id',
                    allowBlank: true,
                    queryMode: 'local',
                    fieldLabel: 'Customer/Quote To',
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
                quote_number = pnl.down('textfield[name=quote_number]').getValue(),
                store = this.getStore();

            if(grid.up('advancedCustomerLedgerPnl')){
                    applicant_id = grid.up('advancedCustomerLedgerPnl').down('hiddenfield[name=CustomerId]').getValue();
            }
            
            store.removeAll();
            store.getProxy().extraParams = {
                applicant_id: applicant_id,
                date_to: date_to,
                date_from: date_from,
                is_quote: 1,
                quote_number: quote_number
            }
        }
    },{
        xtype: 'exportbtn'
    }],
    columns: [{
            xtype: 'rownumberer'
        },{
            xtype: 'gridcolumn',
            dataIndex: 'applicant',
            text: 'Customer Name',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'invoice_no',
            text: 'Quote Number',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            text: 'Fee Type',
            flex: 1,
            // width: 300,
            tdCls: 'wrap',
            dataIndex: 'fee_type',
        },{
            xtype: 'gridcolumn',
            text: 'Cost Element',
            // width: 300,
            flex: 1,
            tdCls: 'wrap',
            dataIndex: 'element',
         },{
            xtype: 'gridcolumn',
            text: 'Application Fee Type',
            flex: 1,
            // width: 200,
            tdCls: 'wrap',
            dataIndex: 'cost_type',
         },{
            xtype: 'gridcolumn',
            // width: 100,
            flex: 1,
            tdCls: 'wrap',
            text: 'Is Fast Track',
            dataIndex: 'is_fast_track',
            renderer: function (value, metaData) {
                if (value) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "True";
                }

                metaData.tdStyle = 'color:white;background-color:red';
                return "False";
            }
        },{
            xtype: 'gridcolumn',
            text: 'Cost',
            // width: 150,
            flex: 1,
            tdCls: 'wrap',
            dataIndex: 'cost'
        },{
            xtype: 'gridcolumn',
            // width: 150,
            flex: 1,
            tdCls: 'wrap',
            dataIndex: 'currency',
            text: 'Cost Currency',
        }, {
            text: 'Options',
            xtype: 'widgetcolumn',
            // width: 150,
            flex: 1,
            widget: {
                textAlign: 'left',
                xtype: 'button',
                iconCls: 'x-fa fa-print',
                ui: 'soft-blue',
                name:'print_quote',
                text: 'Preview Quote',
                report_type: 'quote',
                handler: 'printQuote'
            }
        }
      
    ]    
});
