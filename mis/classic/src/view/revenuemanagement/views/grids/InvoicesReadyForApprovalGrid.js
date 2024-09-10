Ext.define('Admin.view.RevenueManagement.grids.InvoicesReadyForApprovalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'invoicesReadyForApprovalGrid',
    cls: 'dashboard-todo-list',
    controller: 'revenuemanagementvctr',
    autoScroll: true,
    itemId: 'invoicesReadyForApprovalGrid',
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
                this.up('invoicesReadyForApprovalGrid').fireEvent('refresh', this);
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
                storeId: 'refundInvoicesApprovalStr',
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
            xtype: 'gridcolumn',
            dataIndex:'approval_decision_id',
            text: 'Approval status',
            flex: 1,
            renderer: function (value, metaData) {
                if (value == 1) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "Approved";
                }else if(value == 2){
                    metaData.tdStyle = 'color:white;background-color:red';
                    return "Not Approved";
                }else{
                    metaData.tdStyle = 'color:white;background-color:gray';
                    return "Pending";
                }         
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex:'refund_id',
            text: 'Refund status',
            flex: 1,
            renderer: function (value, metaData) {
                if (value == 1) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "Refunded";
                }else if(value == 2){
                    metaData.tdStyle = 'color:white;background-color:red';
                    return "Not Refunded";
                }else{
                    metaData.tdStyle = 'color:white;background-color:gray';
                    return "Refund Pending";
                }         
            }
        },
        {
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
                    items: [
                        {
                            textAlign: 'left',
                            xtype: 'button',
                            iconCls: 'x-fa fa-print',
                            ui: 'soft-blue',
                            name:'print_quote',
                            text: 'Preview Invoice',
                            report_type: 'quote',
                            handler: 'printQuote',
                        },
                        {
                            text: 'Approve',
                            iconCls: 'fa fa-clipboard-check',
                            ui: 'soft-blue',
                            handler: 'showInvoiceRefundApprovalFrm',
                            stores: '[]',
                            table_name: 'tra_revenue_details',
                            winWidth: '70%',
                            tooltip: 'Decision',
                            action: 'edit',
                            childXtype: 'revenueRefundApprovalFrm',
                            winTitle: 'Approval Desicion',
      
                        },
                    ]
                }
            }
        }],
});
