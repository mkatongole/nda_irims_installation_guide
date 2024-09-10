/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpProductLineDetailsDGRecommGrid', {
    extend: 'Admin.view.gvpapplications.views.grids.GvpProductLineAbstractGrid',
    xtype: 'gvpproductlinedetailsdgrecommgrid',

    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'exportbtn'
    }, {
        xtype: 'button',
        text: 'Add Product Line',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_line',
        winTitle: 'GVP Product Line Details',
        childXtype: 'gvpproductlinedetailsfrm',
        winWidth: '35%',
        stores: '[]',
        hidden: true
    },{
        xtype: 'button',
        text: 'Previous Recommendation',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'prev_productline_details',
        winTitle: 'Previous GVP Product Line Details',
        childXtype: 'prevproductlinedetailsgrid',
        winWidth: '80%',
        stores: '[]'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store=this.getStore(),
                grid=this.up('grid'),
                mainTabPanel = grid.up('#contentPanel'),
                activeTab = mainTabPanel.getActiveTab(),
                site_id=activeTab.down('hiddenfield[name=gvp_site_id]').getValue();
            store.getProxy().extraParams={
                site_id: site_id
            };
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productlinedetailsstr',
                proxy: {
                    url: 'gvpapplications/getGvpInspectionLineDetails'
                }
            },
            isLoad: false
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'Inspection Recommendation',
        flex: 1,
        //hidden: true
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tc_recommendation',
        text: 'Review Recommendation',
        flex: 1,
        //hidden: true
    },{
        xtype: 'gridcolumn',
        dataIndex: 'dg_recommendation',
        text: 'Approval Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_line_status',
        hidden: true,
        text: 'Status',
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
                    text: 'Recommendation',
                    iconCls: 'x-fa fa-arrows',
                    stores: '[]',
                    handler: 'showEditGvpInspectionLineDetails',
                    winTitle: 'GVP Product Line Details',
                    childXtype: 'gvpproductlinerecommendationfrm',
                    winWidth: '35%',
                    is_recommendation:1,
                    recommendation_type:3
                },{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    stores: '[]',
                    handler: 'showEditGvpInspectionLineDetails',
                    winTitle: 'GVP Product Line Details',
                    childXtype: 'gvpproductlinedetailsfrm',
                    winWidth: '35%',
                    hidden: true
                }, {
                    text: 'Delete',
                    hidden:true,
                    iconCls: 'x-fa fa-trash',
                    table_name: 'gvp_product_details',
                    storeID: 'productlinedetailsstr',
                    action_url: 'gvpapplications/deleteGvpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGvpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }
    ]
});