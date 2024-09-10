/**
 * Created by Jeff on 4/22/2024.
 */
Ext.define('Admin.view.research_operations.views.grids.ResearchOperationsGrid', {
        extend: 'Ext.grid.Panel',
        controller: 'researchoperationsvctr',
        xtype: 'researchoperationsgrid',
        itemId: 'researchoperationsgrid',
        cls: 'dashboard-todo-list',
        autoScroll: true,
        autoHeight: true,
        width: '100%',
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
            xtype: 'exportbtn'
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Sub Module',
            labelWidth: 80,
            width: 320,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'sub_module_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_sub_modules',
                                filters: JSON.stringify({module_id: 21})
                            }
                        }
                    },
                    isLoad: true
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Workflow Stage',
            valueField: 'id',
            name: 'workflow_stage_id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            width: 320,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'workflow/getProcessWorkflowStages'
                        }
                    },
                    isLoad: false
                },
                change: 'reloadParentGridOnChange'
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        }],
        plugins: [
            {
                ptype: 'gridexporter'
            }
        ],
        export_title: 'Research Operations Applications',
    
        listeners: {
            beforerender: {
                fn: 'setGridStore',
                config: {
                    pageSize: 1000,
                    autoLoad: false,
                    defaultRootId: 'root',
                    enablePaging: true, 
                    storeId: 'researchoperationsstr',
                    grouper: {
                        groupFn: function (item) {
                            return item.get('process_id') + item.get('workflow_stage_id');
                        }
                    },
                    proxy: {
                        url: 'researchoperations/getResearchOperationsApplications'
                    }
                },
                isLoad: true
            },
            itemdblclick: 'onResearchOperationApplication'
        },
        features: [{
            ftype: 'searching',
            minChars: 2,
            mode: 'local'
        }, {
            ftype: 'grouping',
            startCollapsed: true,
           groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]}, Stage: {[values.rows[0].data.workflow_stage]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
           
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'tracking_no',
            text: 'Tracking Number',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'reference_no',
            text: 'Ref Number',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'process_name',
            text: 'Process',
            flex: 1,
        }, {
            xtype: 'gridcolumn',
            text: 'From',
            dataIndex: 'from_user',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'To',
            dataIndex: 'to_user',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'workflow_stage',
            text: 'Workflow Stage',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'application_status',
            text: 'Report Status',
            flex: 1,
            tdCls: 'wrap'
        }, {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_received',
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
        }],

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
    });