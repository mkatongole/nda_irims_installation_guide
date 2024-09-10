/**
 * Created by Kip on 12/18/2018.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ProductLineDetailsAddGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ProductLineAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'productLineDetailsaddgrid',


cls: 'dashboard-todo-list',
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
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype:'hiddenfield',
        name: 'manufacturing_site_id'

    },{
        xtype:'hiddenfield',
        name: 'block_id'

    },
    {
        xtype:'hiddenfield',
        name: 'inspection_category_id'
    },
    {
        xtype:'hiddenfield',
        name: 'special_category_id'

    },{
        xtype: 'button',
        text: 'Add Product Line',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-blue',
        name: 'add_line',
        winTitle: 'GMP Product Line Details',
        childXtype: 'productlinedetailsfrm',
        winWidth: '50%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
    }],
    export_title: 'Product line Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                // mainTabPanel = grid.up('#contentPanel'),
                // activeTab = mainTabPanel.getActiveTab(),
            site_id = grid.down('hiddenfield[name=manufacturing_site_id]').getValue(),
             block_id = grid.down('hiddenfield[name=block_id]').getValue();
            store.getProxy().extraParams = {
                site_id: site_id,
                block_id:block_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],

    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productlinedetailsstr',
                proxy: {
                    url: 'gmpapplications/getGmpInspectionLineDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_line]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [z];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    stores: '[]',
                    handler: 'showEditGmpInspectionLineDetails',
                    winTitle: 'GMP Product Line Details',
                    childXtype: 'productlinedetailsfrm',
                    winWidth: '50%'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'gmp_productline_details',
                    storeID: 'productlinedetailsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    //hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }];
            }
        }
    },
    columns: [
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
                    items: []
                }
            }
        }]
});

