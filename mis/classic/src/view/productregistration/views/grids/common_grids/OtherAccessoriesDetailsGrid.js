
Ext.define('Admin.view.productregistration.views.grids.common_grids.OtherAccessoriesDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'otheraccesoriesDetailsGrid',
    itemId: 'otheraccesoriesDetailsGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 450,
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
    listeners:{
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'combinationdetailsstr',
                proxy: {
                   url: 'productregistration/onLoadOtherAccessoriesDetails',
                }
            },
            isLoad: true
        }
    },

    
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'productotheraccesoriesdetailsFrm',
        winTitle: 'Accessories/appliances/Equipments used in Combination',
        winWidth: '60%',
        handler: 'showAddProductOtherdetailsWinFrm',
        stores: '[]'
    },  {
        xtype: 'exportbtn'
    }],
    plugins: [{
        ptype: 'filterfield'
    },
        {
            ptype: 'gridexporter'
        }
    ], 
    export_title: 'Accessories/appliances/Equipments used in Combination',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('otheraccesoriesDetailsGrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
   
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Accessories/appliances/Equipments',
        flex: 1,
        // ,
        // flex: 1,filter: {
        //     xtype: 'textfield'
        // }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Description',
        flex: 1,
    }, {
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
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'productotheraccesoriesdetailsFrm',
                    winTitle: 'Accessories/appliances/Equipments used in Combination',
                    winWidth: '40%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }]
            }
        }
    }]
});
