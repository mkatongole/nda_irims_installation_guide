/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.drugs.CopackedProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'copackedproductsgrid',
    itemId: 'copackedproductsgrid',
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
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'copackedproductsfrm',
        winTitle: 'Co-packed Products Details',
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
        name: 'isReadOnly',
        bind: {
            value: '{isReadOnly}'  // negated
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],

    export_title: 'Co-packed Products Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('copackedproductsgrid').fireEvent('refresh', this);
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
                    storeId: 'copackedproductsgridstr',
                    proxy: {
                        url: 'productregistration/onLoadCopackedProductDetails',
                    }
                },
                isLoad: true
            }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'generic_name',
        text: 'Generic Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'atc_code',
        text: 'ATC Code',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'atc_code_description',
        text: 'ATC Code Descriptor',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'therapeutic_group_name',
        text: 'Therapeutic Group',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dosage Form',
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
                   /*  bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    */
                    childXtype: 'copackedproductsfrm',
                    winTitle: 'Co-packed Products Details',
                    winWidth: '60%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_copacked_products',
                  /*  bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    */
                    storeID: 'copackedproductsgridstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteProductOtherdetails'
                }]
            }
        }
    }]
});
