/**
 * Created by Kip on 1/17/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ImpProductshandlingGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ImpProductHandlingsAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'impProductshandlinggrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    table_name: 'tra_clinicaltrial_producthandling',
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
            xtype: 'button',
            text: 'Add Details',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            hidden:true,
            name: 'add_impproduct',
            table_name: 'tra_clinicaltrial_producthandling',
            winTitle: 'Details of Handling Trial Medicines',
            winWidth: '90%',
            childXtype: 'comparatorproductspnl'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
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
            this.up('grid').fireEvent('refresh', this);
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
                storeId: 'impProductshandlinggridstr',
                proxy: {
                    url: 'clinicaltrial/getProductHandling'
                }
            },
            isLoad: true
        }
    },
    columns: [{
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
                    text: 'Edit/Details',
                    iconCls: 'x-fa fa-edit',
                    handler: 'showImpProductDetails',
                    winTitle: 'Comparator Product',
                    winWidth: '90%',
                    hidden:true,
                    table_name: 'tra_clinicaltrial_producthandling',
                    childXtype: 'clinicalcomparatorproductsfrm'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    hidden:true,
                    table_name: 'tra_clinicaltrial_producthandling',
                    storeID: 'impProductshandlinggridstr',
                    action_url: 'clinicaltrial/deleteClinicalTrialRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteClinicalTrialWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
