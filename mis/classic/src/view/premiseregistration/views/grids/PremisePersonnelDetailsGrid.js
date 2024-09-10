/**
 * Created by Kip on 11/7/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisePersonnelDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premisepersonneldetailsgrid',
    itemId:'premisepersonneldetailsgrid',
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
        xtype: 'hiddenfield',
        name: 'is_temporal',
        value: 0
    }, {
        xtype: 'button',
        text: 'Add Personnel',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_personnel',
        winTitle: 'Premise Personnel Details',
        childXtype: 'premisesuperintendentfrm',
        winWidth: '65%',
        storeID: 'premisepersonneldetailsstr',
        action_url: 'premiseregistration/savePremisePersonnelLinkageDetails',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Premise Personnel Details',
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
                storeId: 'premisepersonneldetailsstr',
                proxy: {
                    url: 'premiseregistration/getPremisePersonnelDetails'
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
                    text: 'Personnel Details',
                    iconCls: 'x-fa fa-user',
                    winTitle: 'Premise Personnel Details',
                    childXtype: 'premisesuperintendentfrm',
                    winWidth: '65%',
                    handler: 'showEditPremisePersonnelDetails',
                    storeID: 'premisepersonneldetailsstr',
                    action_url: 'premiseregistration/savePremisePersonnelLinkageDetails',
                    stores: '[]'
                }, {
                    text: 'Remove',
                    iconCls: 'x-fa fa-remove',
                    table_name: 'tra_premises_personnel',
                    storeID: 'premisepersonneldetailsstr',
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
        dataIndex: 'personnel_name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        text: 'Telephone No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        text: 'Postal Address',
        hidden:true,
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'position',
        text: 'Position',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'registration_no',
        hidden:true,
        text: 'Registration No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'study_field',
        text: 'Field of Study',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'qualification',
        text: 'Qualification',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'institution',
        text: 'Institution',
        flex: 1
    }, {
        dataIndex: 'professional_board',
        xtype: 'gridcolumn',
        hidden:true,
        text: 'Professional Board'  
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
