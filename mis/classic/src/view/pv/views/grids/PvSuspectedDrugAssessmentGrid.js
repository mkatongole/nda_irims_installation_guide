Ext.define('Admin.view.pv.views.grids.PvSuspectedDrugAssessmentGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'pvvctr',
    xtype: 'pvSuspectedassessmentDrugGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
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
    tbar: [ {
        xtype: 'button',
        text: 'AEFI Category',
        iconCls: 'x-fa fa-plus',
        hidden:true,
        name:'update_report',
        handler:'updateAEFICategory',
        ui: 'soft-green',
        winWidth: '35%',
        stores: '[]'
    }],
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        editing: true
    }
    ],
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
                storeId: 'pvsuspecteddrugassessmentstr',
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
        xtype: 'gridcolumn',
        dataIndex: 'suspected_drug',
        text: 'Suspected Drug(WHODrug)',
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
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'aefi_category_id',
        hidden:true,
        text: 'AEFI Category',
        width: 100,
        editor: {
                    xtype: 'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setCompStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        table_name: 'par_aefi_categories'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = record.get('aefi_category');
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                }
                
        },

    {
        xtype: 'gridcolumn',
        dataIndex: 'causality_outcomes',
        text: 'Causality Outcome',
        tdCls: 'wrap',
        flex: 1,
      
    },{
        xtype: 'widgetcolumn',
        width: 140,
        widget:{
        xtype: 'button',
        text: 'Naranjo Assessment',
        childXtype: 'casualityevaluationgrid',
        winTitle: 'Naranjo Causality Assessment',
        winWidth: '70%',
        ui: 'soft-green',
        iconCls: 'fa fa-eye',
        handler: 'viewAssesmentDetails'
        }
        },
        {
        xtype: 'widgetcolumn',
        width: 140,
        widget:{
        xtype: 'button',
        text: 'WHO Assessment',
        childXtype: 'whocasualityevaluationgrid',
        winTitle: 'WHO Causality Assessment',
        winWidth: '70%',
        ui: 'soft-purple',
        iconCls: 'fa fa-eye',
        handler: 'viewAssesmentDetails'
        }
        },
        {
        text: 'Options',
        hidden:true,
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
                    childXtype: 'pvSuspectedDrugFrm',
                    winTitle: 'Suspected Medicine/Vaccine/Device',
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
                    table_name: 'tra_pv_suspected_drugs',
                    storeID: 'pvSuspectedDrugStr',
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
