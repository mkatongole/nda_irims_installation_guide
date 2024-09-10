
Ext.define('Admin.view.research_operations.views.grids.IRMeetingSchedulingGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'researchoperationsvctr',
    xtype: 'irmeetingschedulinggrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var review_recommendation_id = record.get('review_recommendation_id');
            if (review_recommendation_id > 0) {
                return 'valid-row';
            } else {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_internalresearch_details',
                    beforeLoad: function(){
                        var grid = this.up('grid'),
                            panel = grid.up('panel'),
                            pnl= panel.up('panel'),
                            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
                            application_code = pnl.down('hiddenfield[name=active_application_code]').getValue(),
                            workflow_stage_id = pnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
                            store = this.getStore();
                        store.removeAll();
                        store.getProxy().extraParams = {
                            application_code: application_code,
                            module_id: module_id,
                            workflow_stage_id: workflow_stage_id,
                            table_name: this.table_name
                        }
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Save Meeting Details',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    name: 'save_button',
                    table_name: 'tra_researchinnovation_meeting_details',
                    toaster: 1,
                    action: 'save_me',
                },
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    storeID: 'researchoperationapplicationstr',
                    table_name: 'tra_internalresearch_details',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [
        {
            ftype: 'searching',
            mode: 'local',
            minChars: 2
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
               storeId: 'promotionmaterialsmanagerreviewgridStr',
                proxy: {
                    url: 'researchoperations/getManagerApplicationsGeneric'
                }
            },
            isLoad: true
        },select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
         beforeselect: function (sel, record, index, eOpts) {
            var recommendation_record_id = record.get('recommendation_record_id');
            if (recommendation_record_id > 0) {
                return true;
            } else {
                return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'tracking_no',
            text: 'Tracking Number',
            flex: 1,
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'aim_research',
            text: 'Aim',
            flex: 1,
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'research_purpose',
            text: 'Research Purpose',
            flex: 1,
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            text: 'Submitted by',
            dataIndex: 'Submitted by',
            flex: 1,
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            text: 'Application Status',
            dataIndex: 'application_status',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_received',
            hidden: true,
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
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
                    items: [
                        {
                        text: 'Preview Application Details',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Preview Record',
                        action: 'edit',
                        childXtype: 'researchappdetailsdisplay',
                        winTitle: 'Research Operations Information',
                        winWidth: '70%',
                        isReadOnly: 1,
                        handler: 'showInternalResearchApplicationMoreDetailsOnDblClick'
                        } 
                    ]
                }
            }
        }
    ]
});
