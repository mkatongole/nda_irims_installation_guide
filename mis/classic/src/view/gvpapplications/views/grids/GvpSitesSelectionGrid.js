/**
 * Created by Kip on 1/7/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpSitesSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gvpapplicationsvctr',
    xtype: 'gvpsitesselectiongrid',
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
            width: 5
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'gvp_type_id'
        },
        {
            xtype: 'tbspacer',
            width: 20
        },
        '-',
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color': 'green'
            }
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
                section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                gvp_type_id = grid.down('hiddenfield[name=gvp_type_id]').getValue();
            store.getProxy().extraParams = {
                section_id: section_id,
                gvp_type_id: gvp_type_id
            };
        }
    }],
    plugins: [{
        ptype: 'filterfield'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: true,
                proxy: {
                    url: 'gvpapplications/getManufacturingSitesList'
                }
            },
            isLoad: true
        }
    },
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Gvp Site Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'premise_reg_no',
        text: 'Registration No',
        hidden: true,
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        hidden: true,
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gvp_type_txt',
        text: 'GVP Type',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email',
        flex: 1
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'country',
        text: 'Country',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region',
        text: 'Region',
        flex: 1
    }]
});
