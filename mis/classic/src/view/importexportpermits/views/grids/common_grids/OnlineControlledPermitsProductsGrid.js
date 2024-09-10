/**
 * Created by Softclans on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.OnlineControlledPermitsProductsGrid', {
    extend: 'Admin.view.importexportpermits.views.grids.common_grids.abstract.ControlledPermitsProductsAbstractGrid',
    controller: 'importexportpermitsvctr',
    xtype: 'onlinecontrolledpermitsproductsgrid',
    itemId: 'onlinecontrolledpermitsproductsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var isregulated_product = record.get('isregulated_product');
            if (isregulated_product == 0 || isregulated_product === 0) {
               //return 'invalid-row';
            }
            
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Permit Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'importexportpermitsproductsfrm',
        winTitle: 'Add Permit Products Details',
        winWidth: '40%',
        hidden:true,
        handler: 'showAddProductOtherdetailsWinFrm',
        stores: '[]'
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
    export_title: 'Impor/Export Permits Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('onlinecontrolledpermitsproductsgrid').fireEvent('refresh', this);//
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
    listeners: {
        beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'onlinecontrolledpermitsproductsgridstr',
               groupField:'sub_module',
                proxy: {
                    url: 'importexportpermits/getOnlineControlDrugsImpermitsproductsDetails'
                }
            },
            isLoad: true
        },
     afterrender: function(grid) {
                grid.columns.forEach(function (column) {
                if (column.dataIndex === 'permitprod_recommendation') {
                    column.setHidden(true);
                } 
                if (column.dataIndex === 'permitprod_recommendation_remarks') {
                    column.setHidden(true);
                } 
               
            });
        }
    },
    columns: [{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        hidden:true,
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
                    childXtype: 'importexportpermitsproductsfrm',
                    winTitle: 'Import/Export Permit Products details',
                    winWidth: '90%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_product_ingredients',
                    storeID: 'foodproductingredientsstr', 
                    disabled: '{disableNameField}',
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteProductOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
