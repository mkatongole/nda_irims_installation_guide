/**
 * Created by Kip on 2/6/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.OnlineImpProductIngredientsGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ImpProductIngredientsAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'onlineimpproductingredientsgrid',
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
    tbar: [
        {
            xtype: 'tbspacer',
            width: '30%'
        },
        {
            xtype: 'displayfield',
            value: 'Product Ingredients',
            fieldStyle: {
                'color': 'green'
            }
        }
    ],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Clinical trial applications',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                pnl = grid.up('panel'),
                product_id = pnl.down('form').down('hiddenfield[name=id]').getValue(),
                store = this.getStore();
            store.getProxy().extraParams = {
                product_id: product_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'onlineimpproductingredientsstr',
                proxy: {
                    url: 'clinicaltrial/getOnlineImpProductIngredients'
                }
            },
            isLoad: true
        }
    },
    columns: []
});
