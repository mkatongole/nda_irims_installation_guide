/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpDeskReviewSchedulingPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gvpdeskreviewschedulingpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Inspection Details',
            region: 'north',
            height: 105,
            xtype: 'gvpdeskreviewschedulefrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'gvpdeskreviewschedulinggrid'
        },
        {
            title: 'Inspectors',
            region: 'west',
            width: 400,
            collapsible: true,
            titleCollapse: true,
            layout: 'fit',
            items:[
                {
                    xtype: 'grid',
                    name: 'inspectorsGrid',
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            ui: 'soft-green',
                            name: 'add_btn',
                            iconCls: 'x-fa fa-plus',
                            childXtype: 'gvpinspectorsfrm',
                            winTitle: 'Inspector Details',
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
                                    inspection_id = grid.up('newgvpdeskreviewschedulingpanel').down('form').down('hiddenfield[name=id]').getValue();
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
                            isLoad: false
                        }
                    },
                    columns: [
                        {
                            text: 'Inspector',
                            flex: 1,
                            dataIndex: 'inspector_name'
                        },
                        {
                            text: 'Role',
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
                                        text: 'Edit',
                                        iconCls: 'x-fa fa-edit',
                                        tooltip: 'Edit Record',
                                        action: 'edit',
                                        handler: 'showEditGvpApplicationWinFrm',
                                        childXtype: 'gvpinspectorsfrm',
                                        winTitle: 'Inspector Details',
                                        winWidth: '30%',
                                        stores: '[]'
                                    },{
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