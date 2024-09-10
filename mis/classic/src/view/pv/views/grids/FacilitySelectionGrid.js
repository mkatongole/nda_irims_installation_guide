Ext.define('Admin.view.pv.views.grids.FacilitySelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'pvvctr',
    xtype: 'facilitySelectionGrid',
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
            name: 'region_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'district_id'
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
                region_id = grid.down('hiddenfield[name=region_id]').getValue();
                district_id = grid.down('hiddenfield[name=district_id]').getValue();
                store.getProxy().extraParams = {
                region_id: region_id,
                district_id: district_id
            };
        }
    }],

    plugins: [{
        ptype: 'filterfield'
    }],
    // features: [{
    //     ftype: 'searching',
    //     minChars: 2,
    //     mode: 'local'
    // }],


    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: true,
                proxy: {
                    url: 'pv/getFacilityList',
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
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'facility_name',
        text: 'Facility Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'facility_level',
        text: 'Facility Level',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'facility_ownership',
        text: 'Facility Ownership',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'facility_authority',
        text: 'Facility Authority',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'facility_hsd',
        text: 'Facility HSD',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'facility_region',
        text: 'Region',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'facility_district',
        text: 'District',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }]
});
