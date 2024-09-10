/**
 * Created by Kip on 1/12/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpInspectionScheduleSelectionGrid', {
    extend: 'Admin.view.commoninterfaces.grids.InspectionSchedulesAbstractGrid',
    xtype: 'gvpinspectionscheduleselectiongrid',
    controller: 'gvpapplicationsvctr',
    frame: true,
    height: 555,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE',
        allowDeselect: true
    },
    tbar: [
        {
            xtype: 'button',
            text: 'Add Schedule',
            handler: 'showGvpInspectionScheduleDetails',
            iconCls: 'x-fa fa-plus',
            winTitle: 'GVP Inspection Schedule',
            winWidth: '85%',
            ui: 'soft-green',
            childXtype: 'gvpinspectionschedulingfrmpanel'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'is_manager'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    width: '70%',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    doRefresh: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    },
                    beforeLoad: function () {
                        var store = this.getStore(),
                            grid = this.up('grid'),
                            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
                            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                            is_manager = grid.down('hiddenfield[name=is_manager]').getValue();
                        store.getProxy().extraParams = {
                            application_id: application_id,
                            application_code: application_code,
                            section_id: section_id,
                            is_manager: is_manager
                        };
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Sync Request',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'sync_btn',
                    storeID: 'gvpinspectionschedulingphysicalgridstr',
                    hidden: true,
                    disabled: true,
                    winWidth: '50%'
                }
            ]
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setGvpApplicationGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'inspectionscheduleselectionstr',
                proxy: {
                    url: 'gvpapplications/getGvpScheduleTeamDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.assigned_id) {
                        sm.select(rowIndex, true);
                    }
                });
            });
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=sync_btn]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=sync_btn]').setDisabled(true);
            }
        }
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'travel_date',
            text: 'Travel Date',
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            hidden: true
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'return_date',
            text: 'Return Date',
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            hidden: true
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
                        handler: 'showEditGvpInspectionScheduleDetails',
                        childXtype: 'gvpinspectionschedulingfrmpanel',
                        winTitle: 'GVP Inspection Schedule',
                        winWidth: '65%',
                    },{
                        text: 'Update Inspection Details',
                        hidden: true,
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        handler: 'showGvpInspectionDetailsUpdateFrm',
                        childXtype: 'inspectiondetailsupdatefrm',
                        winTitle: 'Actual Inspection Details',
                        winWidth: '30%'
                    }
                    ]
                }
            }
        }
    ]
});