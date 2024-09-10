/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.drugs.DiluentProductPackagingGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'diluentProductPackagingGrid',
    itemId: 'diluentProductPackagingGrid',
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
        xtype:'hiddenfield',
        name: 'pack_id'

    },{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'diluentsProductPackagingFrm',
        winTitle: 'Product Packaging Details',
        winWidth: '60%',
        handler: 'showAddProductOtherdetailsWinFrm',
        stores: '[]',
        bind: {
            hidden: '{isReadOnly}'  // negated
        }

    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Diluents Packaging Details',

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('diluentProductPackagingGrid').fireEvent('refresh', this);
        }
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
                pageSize: 1000,
                storeId: 'diluentProductPackagingGridstr',
                proxy: {
                     url: 'productregistration/onLoaddiluentPackagingDetails'
                }
            },
            isLoad: true
        }
    },
  
    columns: [ {
            xtype: 'gridcolumn',
            dataIndex: 'container_name',
            text: 'Pack Type',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'container_material',
            text: 'Pack Material',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'diluent',
            text: 'Diluent',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'secondary_no_of_units',
            text: 'Secondary No Of Units',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'no_of_units',
            text: 'No Of Units',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'no_of_packs',
            text: 'Quantity/Volume Per',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'si_unit',
            text: 'Unit of Quantity/Volume',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'description',
            text: 'Pack Description',
            flex: 1
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
                        childXtype: 'diluentsProductPackagingFrm',
                        winTitle: 'Product Packaging',
                        winWidth: '60%',
                        handler: 'showEditProductOtherdetailWinFrm',
                        stores: '[]'
                    }, {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tra_product_diluent_packaging',
                        storeID: 'diluentProductPackagingGridstr',
                        action_url: 'productregistration/onDeleteProductOtherDetails',
                        action: 'actual_delete',
                        handler: 'doDeleteProductOtherdetails'
                    }]
                }
            }
    }]
});

