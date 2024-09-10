/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.drugs.DrugsProductPackagingGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'drugsProductPackagingGrid',
    itemId: 'productPackagingDetails',
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
        childXtype: 'productpackagingtabpnl',
        winTitle: 'Product Packaging Details',
        winWidth: '90%',
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
    export_title: 'Drugs Packaging',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('drugsProductPackagingGrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'summary',
        dock: 'bottom',
        style: 'width: 100%;'
    }],
     features:[
        {
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: '{[values.rows[0].data.generic_atc_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
     ],
    
    columnLines: true,
    columns: [{
        // text:'',
        // itemId: 'packsize',
        // flex: 1,
        // align: 'center',
        // columns: [{
        //     xtype: 'gridcolumn',
        //     dataIndex: 'packaging_category',
        //     text: 'Pack Category',
        //     flex: 1
        // }, {
        //     xtype: 'gridcolumn',
        //     dataIndex: 'container_type',
        //     text: 'Packaging Type',
        //     flex: 1
        // }, {
        //     xtype: 'gridcolumn',
        //     dataIndex: 'container_name',
        //     text: 'Pack Type',
        //     flex: 1
        // }, {
        //     xtype: 'gridcolumn',
        //     dataIndex: 'container_material',
        //     text: 'Pack Material',
        //     flex: 1
        // },{
        //     xtype: 'gridcolumn',
        //     dataIndex: 'diluent',
        //     text: 'Diluent',
        //     flex: 1
        // },  {
        //     xtype: 'gridcolumn',
        //     dataIndex: 'no_of_units',
        //     text: 'No Of Units',
        //     flex: 1,
        //     summaryType: function (records, values) {
        //       var packSizeColumn = Ext.ComponentQuery.query("#packsize")[0];
        //         if (records.length > 0) {
        //             let firstRecord = records[0];
        //             console.log(firstRecord);
        //             packSizeColumn.setText(firstRecord.get('pack_size'));
        //             return'';
                    
        //         }
        //         packSizeColumn.setText('');
        //         return'';
                
        //     }
        // }, {
        //     xtype: 'gridcolumn',
        //     dataIndex: 'no_of_packs',
        //     text: 'Quantity/Volume Per',
        //     flex: 1
        // }, {
        //     xtype: 'gridcolumn',
        //     dataIndex: 'si_unit',
        //     text: 'Unit of Quantity/Volume',
        //     flex: 1
        // }, 
        //{
            xtype: 'gridcolumn',
            dataIndex: 'pack_size',
            text: 'Pack Size',
            flex: 1,
            align: 'center' 
        },{
        xtype: 'widgetcolumn',
        name:'view_sites',
        width: 160,
        widget:{
            xtype: 'button',
            text: 'View all Details',
            childXtype: 'productpackagingtabpnl',
            winTitle: 'Product Packaging',
            winWidth: '90%',
            ui: 'soft-green',
            iconCls: 'fa fa-eye',
            handler: 'viewProductPackagingdetailWinFrm'
            }
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
                        childXtype: 'productpackagingtabpnl',
                        winTitle: 'Product Packaging',
                        winWidth: '90%',
                        handler: 'showEditProductPackagingdetailWinFrm',
                        stores: '[]'
                    }, {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tra_product_packaging',
                        storeID: 'drugproductPackagingdetailsstr',
                        action_url: 'productregistration/onDeleteProductOtherDetails',
                        action: 'actual_delete',
                        handler: 'doDeleteProductOtherdetails'
                    }]
                }
            }
        // }]
    }]
});

