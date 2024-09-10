/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.PreClinicalTrialManagerMeetingGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.PreClinicalTrialManagersAbstractGrid',
    xtype: 'preclinicaltrialmanagermeetinggrid',
    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialManagerApplicationsGeneric'
                }
            },
            isLoad: false
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
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'button',
        hidden:true,
        text: 'Print Meeting Details',
        iconCls: 'x-fa fa-print',
        ui: 'soft-green',
        handler: 'printMeetingDetails'
    },],
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
                    table_name: 'tra_clinical_trial_applications',
                    width: '40%',
                    strict_mode: 0,
                    doRefresh: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    },
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                // {
                //     xtype: 'button',
                //     text: 'Upload Meeting Documents',
                //     iconCls: 'x-fa fa-upload',
                //     ui: 'soft-purple',
                //     name: 'save_btn',
                //     hidden:true,
                //     reference_table_name: 'tc_meeting_details',
                //     table_name: 'tc_meeting_uploaddocuments',
                //     handler: 'funcUploadTCMeetingtechnicalDocuments',
                //     document_type_id: 4,
                //     childXtype:'unstructureddocumentuploadsgrid',
                //     winTitle: 'Technical Meeting Documents Upload',
                //     winWidth: '80%',
                //     toaster: 0
                // },
                {
                    xtype: 'button',
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    hidden:true,
                    name: 'save_btn',
                    table_name: 'tra_clinical_trial_applications',
                    toaster: 1
                },
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    disabled: true,
                    gridXtype:'clinicaltrialmanagermeetinggrid',
                    name: 'submit_selected',
                    table_name: 'tra_clinical_trial_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%',
                    toaster: 0
                }
            ]
        }
    ],
    columns: [ {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    },{
        xtype: 'widgetcolumn',
        width: 150,
        widget: {
            width: 150,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-red',
            text: 'Recommendation & Closure Documents',
            iconCls: 'x-fa fa-retweet',
            handler: 'showTcRecommendation',
            childXtype: 'clinicaltrialtcrecommendationpnl',
            winTitle: 'Committee Recommendation',
            winWidth: '70%',
            stores: '["tcrecommendationdecisionsstr"]'
        }
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
                items: [ {
                    text: 'Assessment',
                    iconCls: 'x-fa fa-sliders',
                    menu: {
                        xtype: 'menu',
                        items: [
                            
                            {
                                text: 'Assesement Report',
                                iconCls: 'x-fa fa-file',
                                childXtype: 'presubmissionevaluationfrm',
                                winTitle: 'Assessment Report',
                                winWidth: '65%',
                                handler: 'showAssesmentReportReviewWindow',
                                report_type_id: 1
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'applicationprevcommentsgrid',
                                winTitle: 'Assessment Comments',
                                comment_type_id: 4,
                                winWidth: '60%',
                                name: 'prev_comments',
                                handler: 'showApplicationComments',
                                stores: '[]'
                            }
                        ]
                    }
                },
                {
                    text: '2nd Assessment ',
                    hidden: true,
                    iconCls: 'x-fa fa-sliders',
                    menu: {
                        xtype: 'menu',
                        items: [
                            
                            {
                                text: 'Uploads',
                                iconCls: 'x-fa fa-upload',
                                childXtype: 'clinicaltrialprevdocuploadsgenericgrid',
                                winTitle: 'Auditing uploaded Documents',
                                winWidth: '80%',
                                handler: 'showPreviousUploadedDocs',
                                target_stage: 'auditing'
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'applicationprevcommentsgrid',
                                winTitle: 'Auditing Comments',
                                winWidth: '60%',
                                name: 'prev_comments',
                                handler: 'showApplicationComments',
                                comment_type_id: 3,
                                stores: '[]'
                            }
                        ]
                    }
                },
                   
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showPreSubmissionApplicationMoreDetails'
                    },{
                        xtype: 'button',
                        text: 'Return Back Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-green',
                        storeID: 'productManagerMeetingStr',
                        table_name: 'tra_clinical_trial_applications',
                        action: 'process_returnsubmission_btn',
                        winWidth: '50%',
                        toaster: 0
                    },{
                        text: 'View Screening Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                        hidden:true,
                        handler: 'showApplicationChecklists'
                    }
                ]
            }
        }
    }]
});