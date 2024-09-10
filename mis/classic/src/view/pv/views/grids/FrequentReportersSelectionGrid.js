Ext.define('Admin.view.pv.views.grids.FrequentReportersSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'pvvctr',
    xtype: 'frequentreportersselectiongrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
    width: '100%',
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
    tbar: [
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color': 'green'
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'whodrug_level_id'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid');
            }       
    }],

    plugins: [{
        ptype: 'filterfield'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 1000,
                storeId: 'pvfrequentreportersStr',
                proxy: {
                    url: 'pv/onLoadFrequentReporters',
                    extraParams:{
                        is_config: 1,
                        table_name: 'tra_pv_personnel'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reporter_as',
        text: 'Reporter As',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'qualification',
        text: 'Reporter Qualification',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'title',
        text: 'Title',
        flex: 1,
        tdCls: 'wrap-text'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'first_name',
        text: 'Given name',
        width:100,
        tdCls: 'wrap-text',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'last_name',
        text: 'Family name',
        flex: 1,
        tdCls: 'wrap-text',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'organization_category',
        text: 'Reporter/OrganizationCategory',
        flex: 1,
        tdCls: 'wrap-text'
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'organisation_details',
        text: 'Faclity/MAH/LTR/Other Entity Name',
        flex: 2,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Street address',
        flex: 1,
        tdCls: 'wrap-text',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'city',
        text: 'City',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region',
        text: 'Region',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'district',
        text: 'District',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        text: 'Telephone No',
        flex: 1,
        tdCls: 'wrap-text',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email address',
        flex: 1,
        tdCls: 'wrap-text',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    }]
});
