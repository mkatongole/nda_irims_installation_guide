Ext.define('Admin.view.pv.views.grids.PvReactionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'pvvctr',
    xtype: 'pvreactionGrid',
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
        childXtype: 'pvreactioFrm',
        winTitle: 'Reaction',
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
    export_title: 'PV Reaction',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            this.up('grid').fireEvent('refresh', this, 'tra_pv_reaction');
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
                storeId: 'pvreactiostr',
                proxy: {
                    url: 'pv/onLoadReaction',
                    extraParams:{
                        is_config: 1,
                        table_name: 'tra_pv_reaction'
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
        dataIndex: 'reaction_event_medra',
        text: 'Reaction /Event(MedDRA)',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reaction_event',
        text: 'Reaction Event',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'datecolumn',
        dataIndex: 'onset_date',
        format: 'Y-m-d',
        text: 'onset Date',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'onset_time',
        text: 'Onset Time',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'datecolumn',
        dataIndex: 'end_date',
        format: 'Y-m-d',
        text: 'End Date',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'end_time',
        text: 'End Time',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'outcomes',
        text: 'Outcome',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'aefi_category',
        text: 'AEFI Category',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'widgetcolumn',
        name:'view_sites',
        width: 160,
        widget:{
            xtype: 'button',
            text: 'View all Details',
            childXtype: 'pvreactioFrm',
            winTitle: 'Reaction',
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
                    childXtype: 'pvreactioFrm',
                    winTitle: 'Reaction',
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
                    table_name: 'tra_pv_reaction',
                    storeID: 'pvreactiostr',
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
