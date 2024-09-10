Ext.define('Admin.view.RevenueManagement.grids.RefundInvoicesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'refundInvoicesGrid',
    cls: 'dashboard-todo-list',
    controller: 'revenuemanagementvctr',
    autoScroll: true,
    itemId: 'refund_invoicesGrid',
    // autoHeight: true,
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
        // beforeLoad: function(){
        //         this.up('refundInvoicesGrid').fireEvent('refresh', this);
        // }
          beforeLoad: function () {
            var grid = this.up('refundInvoicesGrid'),
                store = grid.store;
                applicant_id = grid.down('hiddenfield[name=applicant_id]').getValue();
                    store.getProxy().extraParams = {
                        applicant_id: applicant_id,
                    };
        }
    },'->',{
        xtype: 'button',
        text: 'Save Invoivces',
        iconCls: 'fa fa-save',
        ui: 'soft-blue',
        name: 'save_details',
        //table_name: 'tra_enforcement_applications',
        toaster: 1
    }
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
                    //url: 'revenuemanagement/getNewInvoiceQuotation',
                    url: 'revenuemanagement/getCustomerInvoices',
                    
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
