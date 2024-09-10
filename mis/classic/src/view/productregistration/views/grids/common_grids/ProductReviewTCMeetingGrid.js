
/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductReviewTCMeetingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productReviewTCMeetingGrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'productReviewTCMeetingStr',
                proxy: {
                    url: 'productregistration/getProductTcReviewMeetingApplications'//getClinicalTrialManagerMeetingApplications
                }
            },
            isLoad: false
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
            xtype:'button',
            ui: 'soft-green',
            text: 'Export List',
            iconCls: 'x-fa fa-cloud-upload', 
            handler: 'exportCNFProductList'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print List',
            iconCls: 'x-fa fa-print',
            handler: 'printCNFProductList'
            
            
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand_Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        hidden:true,
        text: 'Common Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        hidden:true,
        dataIndex: 'evaluator_recommendation',
        text: 'Assessment Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        hidden:true,
        dataIndex: 'auditor_recommendation',
        text: 'Quality Review Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tc_recomm',
        text: 'CNF Review Recommendation',
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
                items: [{
                    text: 'CNF Recommendation',
                    iconCls: 'x-fa fa-retweet',
                    handler: 'showTcRecommendation',
                    childXtype: 'producttcrecommendationpnl',
                    winTitle: 'CNF  Review Recommendation',
                    winWidth: '70%',
                    stores: '["tcrecommendationdecisionsstr"]'
                }, {
                    text: 'Preview Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Product Information',
                    winWidth: '90%',
                    isReadOnly: 1,
                    handler: 'editpreviewProductInformation'
                }, {
                    text: 'Assessment Report',
                    iconCls: 'x-fa fa-exchange',
                    menu: {
                        xtype: 'menu',
                        items: [{
                                text: 'Quality Overall Summary Dossier',
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Quality Overall Summary Dossier',
                                action: 'edit',
                                childXtype: 'productqualityevaluationDocUploadsGrid',
                                winTitle: 'Quality Overall Summary Dossier',
                                winWidth: '90%',
                                isReadOnly: 1,
                                document_type_id: '',
                                handler: 'showQualitySumaryDocs'
                            }, {
                                text: 'Bioequivalence Trial Information',
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Bioequivalence Trial Information',
                                action: 'edit',
                                childXtype: 'productbioequivalencetrialevaluationDocUploadsGrid',
                                winTitle: 'Bioequivalence Trial Information',
                                winWidth: '90%',
                                isReadOnly: 1,
                                document_type_id: '',
                                handler: 'showQualitySumaryDocs'
                            },
                            {
                                text: '1st Assessment Reports/Upload',
                                iconCls: 'x-fa fa-file',
                                tooltip: '1st Assessment Reports/Upload',
                                winTitle: '1st Assessment Reports/Upload',
                                document_type_id: 8,
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Application Documents',
                                winWidth: '90%',
                                isReadOnly: 1,
                                handler: 'funcPrevEvaluationReportUpload'
                            },
                            {
                                text: 'Comments/Recommendation',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'evaluationcommentspnl',
                                winTitle: '1st Assessment Comments',
                                winWidth: '90%',
                                handler: 'showApplicationCommentsGeneric',
                                childXtype: 'applicationprevcommentsgrid',
                                winWidth: '60%',
                                comment_type_id: 2,
                                stores: '[]',
                                isWin: 1
                            }
                        ]
                    }
                }, {
                    text: 'Quality Review Report',
                    iconCls: 'x-fa fa-exchange',
                    menu: {
                        xtype: 'menu',
                        items: [{
                                text: 'Quality Overall Summary Dossier',
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Quality Overall Summary Dossier',
                                action: 'edit',
                                childXtype: 'productqualityreviewDocUploadsGrid',
                                winTitle: 'Quality Overall Summary Dossier',
                                winWidth: '90%',
                                isReadOnly: 1,
                                document_type_id: '',
                                handler: 'showQualitySumaryDocs'
                            }, {
                                text: 'Bioequivalence Trial Information',
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Bioequivalence Trial Information',
                                action: 'edit',
                                childXtype: 'productbioequivalencetrialreviewDocUploadsGrid',
                                winTitle: 'Bioequivalence Trial Information',
                                winWidth: '90%',
                                isReadOnly: 1,
                                document_type_id: '',
                                handler: 'showQualitySumaryDocs'
                            },
                            {
                                text: 'Quality Review  Reports/Upload',
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Audit Reports/Upload',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Audit report',
                                winWidth: '90%',
                                isReadOnly: 1,
                                document_type_id: 9,
                                winTitle: 'Audit Reports/Upload',
                                handler: 'funcPrevAuditReportUpload'
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'evaluationcommentspnl',
                                winTitle: 'Quality Review Final Recommendation',
                                winWidth: '90%',
                                isReadOnly: 1,
                                handler: 'showApplicationCommentsGeneric',
                                childXtype: 'applicationprevcommentsgrid',
                                winWidth: '60%',
                                comment_type_id: 3,
                                stores: '[]',
                                isWin: 1
                            }
                        ]
                    }
                },{
                    text: 'Preview Application Queries',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Preview Application Queries',
                    winWidth: '90%',
                    isReadOnly: 1,
                    handler: 'previewproductApplicationQueries'
                },, {
                    text: 'Print Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Print Record',
                    action: 'edit',
                    childXtype: '',
                    hidden: true,
                    winTitle: 'Product Information',
                    winWidth: '90%',
                    handler: 'printpreviewProductInformation'
                }, {
                    text: 'Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Application Documents',
                    winWidth: '90%',
                    isReadOnly: 1,
                    handler: 'funcPrevGridApplicationDocuments'
                },{
                    text: 'Quality Overall Summary Dossier',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Quality Overall Summary Dossier',
                    action: 'edit',
                    childXtype: 'productqualityassessmentDocUploadsGrid',
                    winTitle: 'Quality Overall Summary Dossier',
                    winWidth: '90%',
                    isReadOnly: 1,
                    document_type_id: '',
                    handler: 'showQualitySumaryDocs'
                }, {
                    text: 'Bioequivalence Trial Information',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Bioequivalence Trial Information',
                    action: 'edit',
                    childXtype: 'productbioequivalencetrialinformationDocUploadsGrid',
                    winTitle: 'Bioequivalence Trial Information',
                    winWidth: '90%',
                    isReadOnly: 1,
                    document_type_id: '',
                    handler: 'showQualitySumaryDocs'
                }
                ]
            }
        }
    }]
});