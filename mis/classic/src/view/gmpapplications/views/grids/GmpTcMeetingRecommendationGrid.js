
/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpTcMeetingRecommendationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gmptcmeetingrecommendationgrid',
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'gmpmeetingreviewrecomgridstr',
                proxy: {
                    url: 'gmpapplications/getTCMeetingSchedulingReviewApplications'
                }
            },
            isLoad: true
        }, select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('decision_id');
            if (recommendation_id > 0) {
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
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
   
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }, {
        xtype: 'combo',
        fieldLabel: 'GMP Type',
        valueField: 'id',
        name: 'gmp_type_id',
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
                fn: 'setGmpApplicationCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'GmpType'
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
                    table_name: 'tra_gmp_applications',
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
                    table_name: 'tra_gmp_applications',
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
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    gridXtype:'gmptcmeetingrecommendationgrid',//gmpmeetingschedulinggrid
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Manufacturing Site',
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
        dataIndex: 'gmp_type_txt',
        text: 'GMP Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'Inspector Recommendation',
        hidden:true,
        flex: 1
    },{
        text: 'Inspection Type',
        dataIndex: 'inspection_type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tc_recomm',
        text: 'GPRC Review Recommendation',
        flex: 1
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
                    text: 'GPRC Review Recommendation',
                    iconCls: 'x-fa fa-retweet',
                    handler: 'showAddGmpTCRecommendationDetails',
                    childXtype: 'productlinedetailstcrecommgrid',
                    winTitle: 'GPRC Review Recommendation',
                    winWidth: '80%',
                    storeID: 'productlinetcdetailsstr',
                },{
                    text: 'Overall GPRC Review Recommendation',
                    iconCls: 'x-fa fa-retweet',
                    handler: 'showTcRecommendation',
                    childXtype: 'gmptcrecommendationFrm',
                    winTitle: 'GPRC Review Recommendation',
                    winWidth: '40%',
                    stores: '["tcrecommendationdecisionsstr"]'
                  },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showGmpApplicationMoreDetails'
                    },{
                        text: 'View  Online Assessment Tool',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        name:'assementreport',
                        winTitle: 'Online Assessment Tool Details',
                        handler: 'showGMPGPRCAssessmentToolDetails'
                    },{
                        text: 'Inspection Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                        name:'checklist',
                        hidden:true,
                        isnotDoc:1,
                        handler: 'showApplicationChecklists'
                    },{
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
                    },{
                        xtype: 'button',
                        text: 'Return Back Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-green',
                        hidden:true,
                        storeID: 'gmpmeetingreviewrecomgridstr',
                        table_name: 'tra_gmp_applications',
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
            },
            onWidgetAttach: function (col, widget, rec) {
            var grid =widget.up('grid'),
                sub_module_id = rec.get('sub_module_id');
            if (sub_module_id === 117 || sub_module_id == 117) {
                widget.down('menu menuitem[name=checklist]').setVisible(true);
                widget.down('menu menuitem[name=assementreport]').setVisible(false);
            } else{
                widget.down('menu menuitem[name=assementreport]').setVisible(true);
                widget.down('menu menuitem[name=checklist]').setVisible(false);
            }
        }
    }],
});
