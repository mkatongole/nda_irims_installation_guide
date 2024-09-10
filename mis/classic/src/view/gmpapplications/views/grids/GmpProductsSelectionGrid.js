/**
 * Created by Kip on 4/2/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpProductsSelectionGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ProductSelectionCmnGrid',
    xtype: 'gmpproductsselectiongrid',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    listeners: {
        select: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=add_selected]').setDisabled(false);
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
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'man_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'reg_site_id'
        },'->'
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
                    section_id = grid.down('hiddenfield[name=section_id]').getValue()
                    manufacturing_site_id = grid.down('hiddenfield[name=manufacturing_site_id]').getValue()
                store.getProxy().extraParams = {
                    section_id: section_id,
                    man_site_id: manufacturing_site_id,
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
            childXtype: 'gmpproductlineselectiongrid',
            winTitle: 'Product Line Details Selection',
            winWidth: '60%',
            handler: 'addGmpProductLinkageDetails'//common view controller
        }
    ],
    columns: []
});