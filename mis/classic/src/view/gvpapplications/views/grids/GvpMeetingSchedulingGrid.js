/**
 * Created by Kip on 5/13/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpMeetingSchedulingGrid', {
    extend: 'Admin.view.gvpapplications.views.grids.GvpManagersAbstractGrid',
    xtype: 'gvpmeetingschedulinggrid',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
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
    tbar: [{
        xtype: 'exportbtn'
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
                    width: '30%',
                    table_name: 'tra_gvp_applications',
                    doRefresh: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    },
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->', {
                    xtype: 'button',
                    text: 'Print Meeting Details',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    hidden: true,
                    table_name: 'tra_gvp_applications',
                    handler: 'exportMeetingDetails',
                    toaster: 1
                }, {
                    xtype: 'button',
                    text: 'Upload Meeting Documents',
                    iconCls: 'x-fa fa-upload',
                    ui: 'soft-purple',
                    name: 'save_btn',
                    reference_table_name: 'tc_meeting_details',
                    table_name: 'tc_meeting_uploaddocuments',
                    handler: 'funcUploadTCMeetingtechnicalDocuments',
                    document_type_id: 4,
                    childXtype:'unstructureddocumentuploadsgrid',
                    winTitle: 'Technical Meeting Documents Upload',
                    winWidth: '80%',
                    toaster: 0
                },
                {
                    xtype: 'button',
                    text: 'Save Meeting Details',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    name: 'save_btn',
                    table_name: 'tra_gvp_applications',
                    toaster: 1
                },
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    gridXtype:'gvpmeetingschedulinggrid',//
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'gvpmeetingschedulinggridstr',
                proxy: {
                    url: 'gvpapplications/getTCMeetingSchedulingApplications'
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
                    if (record.data.meeting_id) {
                        sm.select(rowIndex, true);
                    }
                });
            });
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
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
            text: 'Inspection Type',
            dataIndex: 'inspection_type',
            flex: 1
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
                            text: 'Preview Details',
                            iconCls: 'x-fa fa-bars',
                            appDetailsReadOnly: 1,
                            handler: 'showGvpApplicationMoreDetails'
                        },{
                            text: 'View  Online Assessment Tool',
                            iconCls: 'x-fa fa-bars',
                            appDetailsReadOnly: 1,
                            winTitle: 'Online Assessment Tool Details',
                            handler: 'showGVPAssessmentToolDetails'
                         },{
                            text: 'Application Documents',
                            iconCls: 'x-fa fa-file',
                            tooltip: 'Application Documents',
                            action: 'edit',
                            childXtype: '',
                            winTitle: 'Application Documents',
                            winWidth: '80%',
                            isReadOnly: 0,
                            document_type_id: '',
                            handler: 'showPreviousUploadedDocs'
                        },{
                            xtype: 'button',
                            text: 'Return Back Application(s)',
                            iconCls: 'x-fa fa-check',
                            ui: 'soft-green',
                            hidden:true,
                            storeID: 'gvpmeetingschedulinggridstr',
                            table_name: 'tra_gvp_applications',
                            action: 'process_returnsubmission_btn',
                            winWidth: '50%',
                            toaster: 0
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