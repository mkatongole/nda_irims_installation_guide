Ext.define('Admin.view.pv.views.grids.PvDrugHistoryGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'pvvctr',
    xtype: 'pvdrughistoryGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-blue',
        childXtype: 'pvdrughistoryFrm',
        winTitle: 'Drug history',
        winWidth: '80%',
        bind: {
            hidden: '{isReadOnly}'
        },
        handler: 'showAddPvWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'PV Drug history',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            this.up('grid').fireEvent('refresh', this, 'tra_pv_drug_history');
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 1000,
                storeId: 'pvDrugHistoryStr',
                proxy: {
                    url: 'pv/onLoadDrugHistory',
                    extraParams:{
                        is_config: 1,
                        table_name: 'tra_pv_drug_history'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'previous_medication',
        text: 'Previous Medication',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'previous_medication_whodrug',
        text: 'Previous Medication(WHODrug)',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'indication_meddra',
        text: 'Indication MedDRA',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reaction_meddra',
        text: 'Reaction MedDRA',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'datecolumn',
        dataIndex: 'start_date',
        format: 'Y-m-d',
        text: 'Start Date',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'datecolumn',
        dataIndex: 'end_date',
        text: 'End Date',
        format: 'Y-m-d',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'widgetcolumn',
        name:'view_sites',
        width: 160,
        widget:{
            xtype: 'button',
            text: 'View all Details',
            childXtype: 'pvdrughistoryFrm',
            winTitle: 'Drug history',
            winWidth: '70%',
            ui: 'soft-green',
            iconCls: 'fa fa-eye',
            handler: 'viewPvWinFrm'
            }
        },{
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit',
                    action: 'edit',
                    childXtype: 'pvdrughistoryFrm',
                    winTitle: 'Drug history',
                    winWidth: '80%',
                    handler: 'showEditPvWinFrm',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_pv_drug_history',
                    storeID: 'pvDrugHistoryStr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    // bind: {
                    //     disabled: '{hideDeleteButton}'
                    // },
                    handler: 'doDeleteConfigWidgetParam'
                }
                ]
            }
        }
    }]
});
