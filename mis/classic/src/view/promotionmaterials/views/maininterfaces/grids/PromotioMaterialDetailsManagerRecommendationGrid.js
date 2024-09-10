Ext.define('Admin.view.view.promotionmaterials.views.grids.PromotioMaterialDetailsManagerRecommendationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'promotionmaterialdetailmanagerrecommendationgrid',
   
	tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        hidden:true,
        name: 'add_details',
        handler: 'showPromotionMaterialDetailsForm',
        winTitle: 'Promotion Material Details',
        childXtype: 'promotionmaterialdetailsform',
        winWidth: '50%',
        stores: '[]'
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
                    this.up('promotionmaterialdetailmanagerrecommendationgrid').fireEvent('refresh', this);
        }
			
	}],

    listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'promotionmaterialdetailmanagerrecommendationgridstr',
                    proxy: {
                        url: 'promotionmaterials/getPromotionMaterialsDetails',
                    }
                },
                isLoad: true
            }
    },
    
    columns: [ 
	{
        xtype: 'gridcolumn',
        text: 'Promotion Material',
        dataIndex: 'promotion_material_name',
        flex: 1
    },
    {
        xtype: 'gridcolumn',
        text: 'Language',
        dataIndex: 'promotion_material_language',
        flex: 1
    }, 
    {
        xtype: 'gridcolumn',
        text: '1st Assessor Recommendation',
        dataIndex: 'assessor_recommendation',
        flex: 1
    },   
	{
        xtype: 'gridcolumn',
        text: '1st Assessor Comments',
        dataIndex: 'assessor_comments',
        flex: 1,
        tdCls: 'wrap-text'
    },

    {
        xtype: 'gridcolumn',
        text: '2st Assessor Recommendation',
        dataIndex: 'auditors_recommendation',
        flex: 1
    },   
    {
        xtype: 'gridcolumn',
        text: '2st Assessor Comments',
        dataIndex: 'auditors_comments',
        flex: 1,
        tdCls: 'wrap-text'
    },
    {
        xtype: 'gridcolumn',
        text: 'Manager Recommendation',
        dataIndex: 'manager_recommendation',
        flex: 1
    },   
    {
        xtype: 'gridcolumn',
        text: 'Manager Comments',
        dataIndex: 'manager_comments',
        flex: 2,
        tdCls: 'wrap'
    },{
        xtype: 'widgetcolumn',
        name:'view_sites',
        width: 160,
        widget:{
            xtype: 'button',
            text: 'View Comments',
            winTitle: 'Promotion Material Recommendation Window',
            childXtype: 'promotionmaterialmanagerrecommendationdetailsform',
            itemId:'view_sites',
            winWidth: '70%',
            ui: 'soft-green',
            iconCls: 'fa fa-eye',
            handler: 'viewPromotionMaterialDetails'
            }
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
                    text: 'Add Recommendation',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Add Recommendation',
                    action: 'edit',
                    winTitle: 'Promotion Material Recommendation Window',
                    childXtype: 'promotionmaterialmanagerrecommendationdetailsform',
                    winWidth: '50%',
                    handler: 'editPromotionMaterialDetails',
                    stores: '[]'
					
                }, 
                {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    hidden:true,
                    table_name: 'tra_promotion_materials_details',
                    storeID: 'promotionmaterialdetailmanagerrecommendationgridstr',
                    action_url: 'promotionmaterials/genericDeleteRecord',
                    action: 'actual_delete',
                    handler: 'deleteRecord'
					
                }
                ]
            }
        }
    }
	
	
	]
});