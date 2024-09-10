
/**
 * Created by Wainaina on 5/6/2024.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpManagerInspectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gvpapplicationsvctr',
    xtype: 'gvpmanagerinspectiongrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    appDetailsReadOnly: 1,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
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
        },{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
     }
    ],
    tbar: [{
        xtype: 'button',
        text: 'Update/Save Inspection Dates',
        iconCls: 'x-fa fa-plus',
        name:'update_dates',
        handler:'saveInspectionDates',
        ui: 'soft-green',
        winWidth: '35%',
        stores: '[]'
    }, {
        xtype: 'tbspacer'
    }, {
        xtype: 'combo',
        fieldLabel: 'GVP Type',
        valueField: 'id',
        name: 'gvp_type_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 300,
        labelWidth: 70,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setGvpApplicationCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'GvpType'
                        }
                    }
                },
                isLoad: true
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
                    table_name: 'tra_gvp_applications',
                    managerInspection: 1,
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
                    //disabled: true,
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setGvpApplicationGridsStore',
            config: {
                pageSize: 10000,
                groupField: 'inspection_id',
                proxy: {
                    url: 'gvpapplications/getManagerInspectionApplications'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1,
        hidden: true,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gvp_site',
        text: 'Gvp Site',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        hidden: true,
        text: 'Date Received',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gvp_type_txt',
        text: 'GVP Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',
        tdCls: 'wrap-text',
        flex: 1
        },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        tdCls: 'wrap-text',
        flex: 1
        },
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
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
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
                items: [
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showGvpApplicationMoreDetails'
                    },{
                        text: 'View  Online Assessment Tool',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        hidden:true,
                        winTitle: 'Online Assessment Tool Details',
                        handler: 'showGVPAssessmentToolDetails'
                    }, {
                        text: 'Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '80%',
                        isReadOnly: 1,
                        document_type_id: '',
                        handler: 'showPreviousUploadedDocs'
                    },
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',
                        hidden: true,
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        }
    }]
});
