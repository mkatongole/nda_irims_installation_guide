/**
 * Created by Kip on 5/21/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.PrevProductLineDetailsGrid', {
    extend: 'Admin.view.gvpapplications.views.grids.GvpProductLineAbstractGrid',
    xtype: 'prevproductlinedetailsgrid',
    controller: 'gvpapplicationsvctr',
    height: 400,
    frame: true,
    tbar: [{
        xtype: 'hiddenfield',
        name: 'manufacturing_site_id'
    }, {
        xtype: 'exportbtn'
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
                site_id = grid.down('hiddenfield[name=manufacturing_site_id]').getValue();
            store.getProxy().extraParams = {
                site_id: site_id
            };
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setGvpApplicationGridsStore',
            config: {
                pageSize: 1000,
                groupField:'product_line_category',
                storeId: 'prevproductlinedetailsstr',
                proxy: {
                    url: 'gvpapplications/getPreviousProductLineDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'Inspection Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tc_recommendation',
        text: 'TC Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dg_recommendation',
        text: 'DG Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_line_status',
        text: 'Status',
        flex: 1
    }
    ]
});