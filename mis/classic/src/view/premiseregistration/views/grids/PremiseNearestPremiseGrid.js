
Ext.define('Admin.view.drugshopregistration.views.grids.PremiseNearestPremiseGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premisenearestpremisegrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    config: {
        isWin: 0,
        isOnline: 0,
        isCompare: 0
    },
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Nearest Premise',
        iconCls: 'x-fa fa-plus',
        name: 'nearest_premise',
        ui: 'soft-green',
        childXtype: 'drugshopnearestpremiseFrm',
        winWidth: '60%',
        winTitle:'Nearest Premise'
    }, {
        xtype: 'hiddenfield',
        name: 'premise_id'
    },{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'hiddenfield',
        name: 'is_temporal',
        value: 0
    }, {
        xtype: 'exportbtn'
    }],

    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Nearest Premises Details',
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
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'nearestpremisestr',
                proxy: {
                    url: 'premiseregistration/getPremisesStoreLocationDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=nearest_premise]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    handler: 'showEditPremiseRegParamWinFrm',
                    winWidth: '40%',
                    stores: '[]',
                    childXtype: 'drugshopnearestpremiseFrm',
                    winTitle: 'Nearest DrugShop'
                },
                {
                    text: 'Remove',
                    iconCls: 'x-fa fa-remove',
                    table_name: 'tra_premises_storelocation',
                    storeID: 'nearestpremisestr',
                    action_url: 'premiseregistration/deletePremiseRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseOtherDetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ];
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'street',
        text: 'Street/Road',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'distance',
        text: 'Distance(Km)',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'District',
        flex: 1
    },{
        xtype: 'gridcolumn',
         hidden:true,
        dataIndex: 'county_name',
        text: 'County/Division',
        flex: 1
    },{
        xtype: 'gridcolumn',
         hidden:true,
        dataIndex: 'sub_county_name',
        text: 'Sub County',
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
                items: []
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var temporal = rec.get('is_temporal'),
                grid = widget.up('grid'),
                is_temporal = grid.down('hiddenfield[name=is_temporal]').getValue();
            if ((temporal === 0 || temporal == 0) && (is_temporal == 1 || is_temporal === 1)) {
                if (widget.down('menu menuitem[action=actual_delete]')) {
                    widget.down('menu menuitem[action=actual_delete]').setDisabled(true);
                }
            } else {
                if (widget.down('menu menuitem[action=actual_delete]')) {
                    widget.down('menu menuitem[action=actual_delete]').setDisabled(false);
                }
            }
        }
    }]
});
