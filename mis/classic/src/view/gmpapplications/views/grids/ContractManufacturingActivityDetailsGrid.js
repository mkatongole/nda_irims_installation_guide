/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ContractManufacturingActivityDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'contractmanufacturingactivitydetailsgrid',
    cls: 'dashboard-todo-list',
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
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'button',
        text: 'Add Personnel',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_personnel',
        action: 'add_personnel',
        winTitle: 'Manufacturing Site Personnel Details',
        childXtype: 'premisesuperintendentfrm',
        winWidth: '65%',
        storeID: 'mansitepersonneldetailsstr',
        action_url: 'gmpapplications/saveManSitePersonnelLinkageDetails',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Site Personnel Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                isOnline = grid.getIsOnline(),
                isCompare = grid.getIsCompare(),
                site_id;
            if (isOnline == 1 || isOnline === 1) {
                if (isCompare == 1 || isCompare === 1) {
                    site_id = grid.up('window').down('gmpportalcomparepreviewpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
                } else {
                    site_id = grid.up('window').down('hiddenfield[name=manufacturing_site_id]').getValue();
                }
            } else {
                if (isCompare == 1 || isCompare === 1) {
                    site_id = grid.up('window').down('gmpmiscomparepreviewpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
                } else {
                    site_id = grid.up('mansitedetailstabpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
                }
            }
            store.getProxy().extraParams = {
                manufacturing_site_id: site_id,
                isOnline: isOnline
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
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'mansitepersonneldetailsstr',
                proxy: {
                    url: 'gmpapplications/getSitePersonnelDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_personnel]'),
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
                    winTitle: 'Manufacturing Site Personnel Details',
                    childXtype: 'premisesuperintendentfrm',
                    winWidth: '65%',
                    stores: '["personnelpositionsstr"]',
                    storeID: 'mansitepersonneldetailsstr',
                    action_url: 'gmpapplications/saveManSitePersonnelLinkageDetails',
                    handler: 'showEditManufacturingSiteWinFrm'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'tra_manufacturing_sites_personnel',
                    storeID: 'mansitepersonneldetailsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ];
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Name of Site',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country',
        text: 'Country',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region',
        text: 'Region',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'contact_person',
        text: 'Contact Person Name ',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        text: 'Contact Person Telephone No ',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Contact Person Email address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturing_activity',
        text: 'Manufacturing Activity Details to be Inspected',
        flex: 1
    },  {
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
        }
    }]
});
