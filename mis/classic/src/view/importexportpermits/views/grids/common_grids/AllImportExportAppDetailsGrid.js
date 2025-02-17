
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.AllImportExportAppDetailsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'allimportexportappgrid',
    controller: 'importexportpermitsvctr',
    height: Ext.Element.getViewportHeight() - 118,
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'allImportExportAppstr',
                remoteFilter: true,
                enablePaging: true,
                proxy: {
                    url: 'importexportpermits/getAllImportExportAppsDetails'//getProductApprovalApplications
                }
            },
            isLoad: true
        },
        itemdblclick: 'loadSelectedApplication'
    },
    plugins: [{
            ptype: 'filterfield'
        }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                section_id = grid.down('hiddenfield[name=section_id]').getValue();

            store.getProxy().extraParams = {
                section_id: section_id
            };
        }
    }],
    //  features: [{
    //     ftype: 'searching',
    //     mode: 'local',
    //     minChars: 2
    // }],
    tbar: [{
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color':'green',
                'font-style':'italic'
            }
        },
    {
        xtype: 'hiddenfield',
        name: 'section_id'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        text: 'Business Name',
        dataIndex: 'premises_name',
        flex: 1,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'business_type',
        text: 'Business Type',
        tdCls: 'wrap-text',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'License No',
        flex: 1,
         filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date_formated',
        text: 'Expiry Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1 
    }]
});