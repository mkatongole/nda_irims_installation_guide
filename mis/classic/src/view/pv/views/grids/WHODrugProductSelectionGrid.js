Ext.define('Admin.view.pv.views.grids.WHODrugProductSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'pvvctr',
    xtype: 'whodrugproductSelectionGrid',
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
                grid = this.up('grid'),
                whodrug_level_id = grid.down('hiddenfield[name=whodrug_level_id]').getValue();
                store.getProxy().extraParams = {
                whodrug_level_id: whodrug_level_id,
            };
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
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: false,
                proxy: {
                    url: 'integration/whoDrugDownloadApi',
                    reader: {
                        type: 'json',
                        totalProperty: 'totalCount',
                        rootProperty: 'results'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'drugName',
        text: 'Drug Name',
        width:100,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'drugCode',
        text: 'Drug Code ',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'medicinalProductID',
        text: 'Medicina lProductID',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'isGeneric',
        text: 'Is Generic',
        flex: 1,
        hidden:true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'isPreferred',
        text: 'Is Preferred',
        hidden:true,
        flex: 1
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'countryOfSales',
        text: 'Country Of Sales',
        flex: 1,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'activeIngredients',
        text: 'Active Ingredients',
        flex: 2,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'atc_code',
        text: 'Active ATC Code',
        flex: 1,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'atc_text',
        text: 'ATC Text',
        flex: 1,
        tdCls: 'wrap',
        filter: {
           xtype: 'textfield',
           mode: 'local'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'atc_official_flag',
        text: 'ATC Official Flag',
        flex: 1,
        hidden:true
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'maHolder_name',
        text: 'MAHolder Name',
        flex: 2,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield',
            mode: 'local'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'maHolder_medicinalProductID',
        text: 'MAHolder MedicinalProductID',
        flex: 1
    }]
});
