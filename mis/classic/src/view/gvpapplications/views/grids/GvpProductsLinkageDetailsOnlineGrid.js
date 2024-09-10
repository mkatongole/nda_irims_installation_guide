/**
 * Created by Kip on 4/9/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpProductsLinkageDetailsOnlineGrid', {
    extend: 'Admin.view.gvpapplications.views.grids.GvpProductsLinkageDetailsAbstractGrid',
    controller: 'gvpapplicationsvctr',
    xtype: 'gvpproductslinkagedetailsonlinegrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    config: {
        isCompare: 0
    },
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
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<p>' +
            '<b>Product Line:</b> {product_line_name} <br>' +
            '<b>Product Line Category:</b> {product_line_category}<br> ' +
            '<b>Product Line Description:</b> {product_line_description}<br> ' +
            '<b>Block:</b> {block} ' +
            '</p>'
        )
    }],
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'exportbtn'
    },{
        xtype: 'tbspacer',
        width: 20
    },{
        xtype: 'displayfield',
        value: 'Expand to view product line details',
        fieldStyle: {
            'color':'green'
        }
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
                isCompare = grid.getIsCompare(),
                win = grid.up('window'),
                site_id;
            if (isCompare == 1 || isCompare === 1) {
                site_id = win.down('gvpportalcomparepreviewpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
            } else {
                site_id = win.down('hiddenfield[name=manufacturing_site_id]').getValue();
            }
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
                storeId: 'gvpproductslinkagedetailsstr',
                proxy: {
                    url: 'gvpapplications/getGvpProductInfoLinkageOnline'
                }
            },
            isLoad: false
        },
    },
    columns: []
});
