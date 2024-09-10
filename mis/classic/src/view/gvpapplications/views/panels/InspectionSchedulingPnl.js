/**
 * Created by Kip on 1/11/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.InspectionSchedulingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inspectionschedulingpnl',
    title: 'Inspection Schedules',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'inspectionschedulesgrid'
        }
    ]
});
/*
Ext.define('Admin.view.gvpapplications.views.panels.InspectionSchedulingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inspectionschedulingpnl',
    controller: 'gvpapplicationsvctr',
    title: 'Inspection Schedules',
    height: 555,
    items: [
        {
            xtype: 'gvpscheduleteamfrm'
        },
        {
            title: 'Inspectors',
            flex: 1,
            margin: 2,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    height: 200,
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            ui: 'soft-green',
                            iconCls: 'x-fa fa-plus',
                            handler: 'showAddInspectionOtherDetails',
                            childXtype: 'gvpinspectorsfrm',
                            winTitle: 'Inspector',
                            winWidth: '30%'
                        }
                    ],
                    bbar: [
                        {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            beforeLoad: function () {
                                var store = this.store,
                                    grid = this.up('grid'),
                                    inspection_id = grid.up('panel').up('panel').down('form').down('hiddenfield[name=id]').getValue();
                                store.getProxy().extraParams = {
                                    inspection_id: inspection_id
                                };
                            }
                        }
                    ],
                    listeners: {
                        beforerender: {
                            fn: 'setGvpApplicationGridsStore',
                            config: {
                                pageSize: 10000,
                                storeId: 'gvpinspectorsstr',
                                proxy: {
                                    url: 'gvpapplications/getGvpScheduleInspectors'
                                }
                            },
                            isLoad: true
                        }
                    },
                    columns: [
                        {
                            text: 'Inspector',
                            flex: 1,
                            dataIndex: 'inspector_name'
                        },
                        {
                            text: 'Inspector',
                            flex: 1,
                            dataIndex: 'inspector_role'
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
                                    items: [{
                                        text: 'Delete',
                                        iconCls: 'x-fa fa-trash',
                                        tooltip: 'Delete Record',
                                        table_name: 'gvp_inspectorsdetails',
                                        storeID: 'gvpinspectorsstr',
                                        action_url: 'gvpapplications/deleteGvpApplicationRecord',
                                        action: 'actual_delete',
                                        handler: 'doDeleteGvpApplicationWidgetParam',
                                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                                    }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
*/