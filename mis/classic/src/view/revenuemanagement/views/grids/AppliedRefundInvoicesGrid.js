Ext.define('Admin.view.RevenueManagement.grids.AppliedRefundInvoicesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'appliedRefundInvoicesGrid',
    cls: 'dashboard-todo-list',
    controller: 'revenuemanagementvctr',
    autoScroll: true,
    itemId: 'appliedRefundInvoicesGrid',
    height: Ext.Element.getViewportHeight() - 118,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No Invoices Found',
        getRowClass: function (record, rowIndex, rowParams, store) {
        }
    },
    
    bbar: [
        {
            xtype:'hiddenfield',
            name:'applicant_id'  
      },
        {
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
                this.up('appliedRefundInvoicesGrid').fireEvent('refresh', this);
        }
      
    },
],

    selModel:{
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 100,
                storeId: 'refundInvoicesStr',
                proxy: {
                    url: 'revenuemanagement/getAppliedRefundInvoices',
                    //url: 'revenuemanagement/getCustomerInvoices',
                    
                }
            },
            isLoad: true
        },
        select: function(sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
         }
    },
    columns: [{
            xtype: 'gridcolumn',
            text: 'INVOICE NO',
            tdCls: 'wrap',
            dataIndex: 'invoice_no',
            flex: 1
        },{
            xtype: 'gridcolumn',
            text: 'TOTAL ELEMENT AMOUNT',
            tdCls: 'wrap',
            dataIndex: 'total_element_amount',
            flex: 1
         },
         {
            xtype: 'gridcolumn',
            text: 'MODULE',
            tdCls: 'wrap',
            dataIndex: 'module',
            flex: 1
         },
         {
            xtype: 'gridcolumn',
            tdCls: 'wrap',
            text: 'DATE OF INVOICING',
            dataIndex: 'date_of_invoicing',
            flex: 1

        },{
            xtype: 'gridcolumn',
            text: 'INVOICE TYPE',
            tdCls: 'wrap',
            dataIndex: 'invoice_type',
            flex: 1
        },{
            xtype: 'gridcolumn',
            tdCls: 'wrap',
            dataIndex: 'currency',
            text: 'COST CURRENCY',
            flex: 1
        },
        {
            text: 'OPTIONS',
            xtype: 'widgetcolumn',
            widget: {
                textAlign: 'left',
                xtype: 'button',
                iconCls: 'x-fa fa-print',
                ui: 'soft-blue',
                name:'print_quote',
                text: 'Preview Quote',
                report_type: 'quote',
                handler: 'printQuote',
                //disabled: true,
            }
        }],
});
