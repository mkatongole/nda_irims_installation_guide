/**
 * Created by Kip on 4/2/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpProductsSelectionGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ProductSelectionCmnGrid',
    xtype: 'gvpproductsselectiongrid',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    listeners: {
        select: function (sel, record, index, eOpts) {
            var me = this
                grid = sel.view.grid
                selCount = grid.getSelectionModel().getCount()
            if (selCount > 0) {
                grid.down('button[name=add_selected]').setDisabled(false)
                
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=add_selected]').setDisabled(true);
            }
        }
    },
    tbar: [
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'gvp_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'man_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'reg_site_id'
        },'->',{
            xtype:'combo',
            emptyText:'Search Product Brand Name/Certificate Number',
            width: 250,
            margin:5
        },{
            xtype: 'textfield',
            name:'search_value',
            width: 250,
            emptyText:'Search Value',
            margin:5
    
        },{
            text:'Search Products',
            iconCls:'fa fa-search',
            handler: function(btn){
                var grid = btn.up('grid'),
                    store = grid.store;
                    store.load();
    
            }
        }
    ],
    
    bbar: [
        {
            xtype: 'pagingtoolbar',
            width: '60%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                    
                    search_value = grid.down('textfield[name=search_value]').getValue(),
                    gvp_site_id = grid.down('hiddenfield[name=gvp_site_id]').getValue();
                store.getProxy().extraParams = {
                    section_id: section_id,
                    man_site_id: gvp_site_id,
                    search_value:search_value
                }
            }
        },
        '->',
        {
            xtype: 'button',
            text: 'Add Selected',
            ui: 'soft-green',
            iconCls: 'x-fa fa-plus',
            name: 'add_selected',
            disabled: true,
            childXtype: 'gvpproductlineselectiongrid',
            winTitle: 'Product Line Details Selection',
            winWidth: '60%',
            handler: 'saveGvpProductDetails'//common view controller
        }
    ],
    columns: []
});