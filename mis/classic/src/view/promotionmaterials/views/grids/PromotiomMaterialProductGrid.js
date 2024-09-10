Ext.define('Admin.view.view.promotionmaterials.views.grids.PromotiomMaterialProductGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'promotiommaterialproductgrid',
	tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
		
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_details',
        handler: 'showPromotionMaterialProductForm',
        winTitle: 'Product Particulars',
        childXtype: 'promotionmaterialproductparticularsform',
        winWidth: '35%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    features:[
        {
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: '{[values.rows[0].data.promotion_material_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('promotiommaterialproductgrid').fireEvent('refresh', this); 
        },
        afterrender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        }
    }],

    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'promotiommaterialproductgridstr',
                proxy: {
                     url: 'promotionmaterials/getPromotionMaterialsProductParticular',
                },grouper: {
                    groupFn: function (item) {
                        return item.get('promotion_material_name');
                    }
                },
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        text: 'Brand Name(Product Name)',
        dataIndex: 'brand_name',
        flex: 1
    },  
	{
        xtype: 'gridcolumn',
        text: 'Promotion Material',
        dataIndex: 'promotion_material_name',
        flex: 1
    },
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
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'View Task',
                    action: 'edit',
                    handler: 'editPromotionMaterialProductForm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_promotion_prod_particulars',
                    storeID: 'promotiommaterialproductgridstr',
                    action_url: 'promotionmaterials/genericDeleteRecord',
                    action: 'actual_delete',
                    handler: 'deleteRecord',
				
                }
                ]
            }
        }
    }
	]
});