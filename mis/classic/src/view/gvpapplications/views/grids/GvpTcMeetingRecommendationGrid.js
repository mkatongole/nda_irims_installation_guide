
/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpTcMeetingRecommendationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gvptcmeetingrecommendationgrid',
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'gvpmeetingreviewrecomgridstr',
                proxy: {
                    url: 'gvpapplications/getTCMeetingSchedulingReviewApplications'
                }
            },
            isLoad: true
        }, 
        select: function (sel, record, index, eOpts) {
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
    },
    {
        xtype: 'displayfield',
        name: 'warning_txt',
        value: 'You cannot select an application without providing an overall recommendation!!',
        renderer: function(value) {
            return '<span style="color: red; font-size: 10px;font-weight: bold; white-space: normal;">' + value + '</span>';
        }
    },

],
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
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    gridXtype:'gvptcmeetingrecommendationgrid',
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
        dataIndex: 'gvp_site_name',
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'Inspector Recommendation',
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
                    handler: 'showAddGvpTCRecommendationDetails',
                    childXtype: 'productlinedetailstcrecommgrid',
                    winTitle: 'GPRC Review Recommendation',
                    winWidth: '80%',
                    hidden: true,
                    storeID: 'productlinetcdetailsstr',
                },{
                    text: 'Overall GPRC Review Recommendation',
                    iconCls: 'x-fa fa-retweet',
                    handler: 'showTcRecommendation',
                    childXtype: 'gvptcrecommendationFrm',
                    winTitle: 'GPRC Review Recommendation',
                    winWidth: '40%',
                    stores: '["tcrecommendationdecisionsstr"]'
                  },
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
                        handler: 'showGVPGPRCAssessmentToolDetails'
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
                        storeID: 'gvpmeetingreviewrecomgridstr',
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