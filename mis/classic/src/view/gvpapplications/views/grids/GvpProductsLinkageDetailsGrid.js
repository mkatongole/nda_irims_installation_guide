/**
 * Created by Kip on 4/2/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpProductsLinkageDetailsGrid', {
    extend: 'Admin.view.gvpapplications.views.grids.GvpProductsLinkageDetailsAbstractGrid',
    controller: 'gvpapplicationsvctr',
    xtype: 'gvpproductslinkagedetailsgrid',
    autoScroll: true,
    autoHeight: true,
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
    plugins: [{
        ptype: 'gridexporter'
    }, 

],
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'button',
        text: 'Add Product',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        action: 'search_product',
        winTitle: 'Product Selection',
        childXtype: 'gvpproductsselectiongrid',
        storeID: 'gvpproductslinkagedetailsstr',
        winWidth: '80%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    },{
        xtype: 'tbspacer',
        width: 20
    },

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
            mainTabPanel = grid.up('#contentPanel'),
            activeTab = mainTabPanel.getActiveTab(),
            site_id = activeTab.down('gvpsitedetailstabpnl').down('hiddenfield[name=gvp_site_id]').getValue();
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
                    url: 'gvpapplications/getGvpProductInfoLinkage'
                }
            },
            isLoad: false
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[action=search_product]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [
                    {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        table_name: 'tra_product_gvpinspectiondetails',
                        storeID: 'gvpproductslinkagedetailsstr',
                        action_url: 'gvpapplications/deleteGvpApplicationRecord',
                        action: 'actual_delete',
                        handler: 'doDeleteGvpApplicationWidgetParam',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }
                ];
            }
        }
    },
    columns: [{
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
                items: []
            }
        }
    }
    ]
});
