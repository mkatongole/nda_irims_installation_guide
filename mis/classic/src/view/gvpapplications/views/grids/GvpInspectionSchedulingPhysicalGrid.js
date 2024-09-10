/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpInspectionSchedulingPhysicalGrid', {
    extend: 'Admin.view.gvpapplications.views.grids.GvpManagersAbstractGrid',
    xtype: 'gvpinspectionschedulingphysicalgrid',
    selModel: {
        selType: 'checkboxmodel'
    },
     plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        editing: true
    }],
    features:[
        {
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: '{[values.rows[0].data.inspection_details]} [{rows.length}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],

    tbar: [{
        xtype: 'button',
        text: 'Assign Schedule',
        ui: 'soft-green',
        disabled: true,
        name: 'assign_schedule',
        childXtype: 'gvpinspectionscheduleselectiongrid',
        winTitle: 'Inspection Schedules',
        winWidth: '85%',
        is_assign: 1
    },{
        xtype: 'button',
        text: 'Update/Save Inspection Dates',
        iconCls: 'x-fa fa-plus',
        name:'update_dates',
        hidden:true,
        handler:'saveInspectionDates',
        ui: 'soft-green',
        winWidth: '35%',
        stores: '[]'
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: false,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_gvp_applications',
                    inspection_type_id: 1,
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    action: 'process_submission_btn',
                    winWidth: '50%',
                    gvp_inspection_type: 1,
                    gridXtype: 'gvpinspectionschedulingphysicalgrid'
                }
            ]
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setGvpApplicationGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'gvpinspectionschedulingphysicalgridstr',
                groupField: 'inspection_id',
                proxy: {
                    url: 'gvpapplications/getGvpInspectionSchedulingApplications'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
                grid.down('button[name=assign_schedule]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
                grid.down('button[name=assign_schedule]').setDisabled(true);
            }
        }
    },
    columns:[
        {
        xtype: 'gridcolumn',
        dataIndex: 'start_date', 
        tdCls: 'wrap-text',
        text: 'Start Date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        flex:1,
        editor: {
            xtype: 'datefield',
            format: 'd/m/Y' 
        },
        renderer: function (val) {
            if (val === '') { 
                val = 'Start Date';
            }
            return val;
        }
      },
      {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_days', 
        tdCls: 'wrap-text',
        text: 'No of Inspection Days',
        flex:1,
        editor: {
            xtype: 'textareafield'
        },
        renderer: function (val) {
            if (val === '') { 
                val = 'No of Inspection Days';
            }
            return val;
         }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'end_date',
            text: 'End Date',
            tdCls: 'wrap-text',
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        } 
    ]
});