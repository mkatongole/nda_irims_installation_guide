/**
 */
Ext.define('Admin.view.RevenueManagement.views.grids.FinanceCustomerListGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'financeCustomerListGrid',
    autoScroll: true,
    controller: 'revenueManagementVctr',
    width: '100%',
    tbar:[
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to view Customer Ledger',
            fieldStyle: {
                'color':'green'
            }
        }],

    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
    }],
    listeners: {
         beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 200,
                remoteFilter: true,
                storeId: 'financeCustomerListGridStr',
                proxy: {
                    url: 'tradermanagement/getApplicantsList'
                }
            },
            isLoad: true
        },
        itemdblclick: 'loadCustomerStatement'
    },
 
    columns: [{
        xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'identification_no',
        text: 'Customer No',
        tdCls:'wrap-text',
        flex:1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Name',
        flex:1,
        tdCls:'wrap-text',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'contact_person',
        text: 'Contact Person',tdCls:'wrap-text',
        flex:1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'app_physical_address',
        text: 'Physical Address',tdCls:'wrap-text',
        flex:1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_postal_address',
        text: 'Postal Address',
        flex:1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tin_no',
        text: 'TIN',hidden: true,
        flex:1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_telephone',
        text: 'Telephone',
        hidden: true,
        flex:1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_email',
        text: 'Email',tdCls:'wrap-text',
        flex:1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',tdCls:'wrap-text',
        flex:1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'District',
        flex:1
    }]
});
