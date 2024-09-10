Ext.define('Admin.view.view.promotionmaterials.views.grids.PromotioMaterialDetailsAssessorRecommendationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'promotionmaterialdetailAssesorrecommendationgrid',
   
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
                    this.up('promotionmaterialdetailAssesorrecommendationgrid').fireEvent('refresh', this);
        }
			
	}],

    listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'promotionmaterialdetailAssesorrecommendationgridstr',
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
        flex: 1
    },
    {
        xtype: 'widgetcolumn',
        name:'view_sites',
        width: 160,
        widget:{
            xtype: 'button',
            text: 'View Comments',
            winTitle: 'Promotion Material Recommendation Window',
            childXtype: 'promotionmaterialassessorrecommendationdetailsform',
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
                    childXtype: 'promotionmaterialassessorrecommendationdetailsform',
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
                    storeID: 'promotionmaterialdetailAssesorrecommendationgridstr',
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