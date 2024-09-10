
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductApprovalTCMeetingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productApprovalTCMeetingGrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'productApprovalTCMeetingStr',
                proxy: {
                    url: 'productregistration/getProductApprovalApplications'//getClinicalTrialManagerMeetingApplications
                }
            },
            isLoad: false
        }, select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
                
                //grid.down('button[name=batch_tc_recommendation]').setDisabled(false);
                grid.down('button[name=batch_approval_recommendation]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
               // return true;
            } else {
             //   return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
                //grid.down('button[name=batch_tc_recommendation]').setDisabled(true);
                grid.down('button[name=batch_approval_recommendation]').setDisabled(true);
            }
        }
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
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
    tbar: [{
            text:'Batch Approval Recommendation',
            name:'batch_approval_recommendation',
            disabled: true,
            table_name: 'tra_product_applications',
            stores: '["productApprovalDecisionsStr"]',
            handler:'getBatchApplicationApprovalDetails',
            approval_frm: 'batchproductapprovalrecommfrm',
            iconCls: 'x-fa fa-chevron-circle-up',
            margin: 5
        
  },'->',{
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
    features:[{
        ftype: 'searching',
        minChars:2,
        mode:'local'
    }],
    columns: [{
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 90,
            textAlign: 'left',
            xtype: 'button',
            itemId: 'prints',
            ui: 'soft-green',
            text: 'Print License/Letter',
            iconCls: 'x-fa fa-certificate',
            handler: 'generateProductRegCertificate',
            bind: {
                disabled: '{record.recommendation_id <= 0 || record.recommendation_id === null}'
                //disabled: '{record.decision_id !== 1}'
            }
        }
    },{
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
        hidden:true,
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
        text: 'CNF Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dg_recommendation',
        text: 'Approval Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        width: 110
    },{
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        text: 'Expiry Date',
        width: 120
    },{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-red',
            vwcontroller: 'productregistrationvctr',
            text: 'Approval Recommendation',
            approval_frm: 'productApprovalRecommFrm',
            iconCls: 'x-fa fa-chevron-circle-up',
            handler: 'getApplicationApprovalDetails',
            stores: '[]',
            table_name: 'tra_product_applications'
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
                items: [
                    {
                        text: 'Approval Recommendation',
                        iconCls: 'x-fa fa-chevron-circle-up',
                        approval_frm: 'productApprovalRecommFrm',
                        handler: 'getApplicationApprovalDetails',
                        vwcontroller: 'productregistrationvctr',
                        stores: '[]',
                        hidden:true,
                        table_name: 'tra_product_applications'
                    },{
                        text: 'CNF Review Recommendation',
                        iconCls: 'x-fa fa-retweet',
                        handler: 'showTcRecommendation',
                        childXtype: 'productTcRecommendationFrm',
                        winTitle: 'CNF Recommendation',
                        winWidth: '30%',
                        isReadOnly: true,
                        hidden: true,
                        stores: '["tcrecommendationdecisionsstr"]'
                    }, {
                        text: 'Preview Product Regitration Certificate',
                        iconCls: 'x-fa fa-certificate',
                        handler: '',
                        hidden:true,
                        name: 'certificate',
                        backend_function: 'generateProductRegCertificate',
                        handler: 'generateProductRegCertificate'
                    },  {
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
                        text: 'Preview Application Queries',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Preview Record',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Preview Application Queries',
                        winWidth: '90%',
                        isReadOnly: 1,
                        handler: 'previewproductApplicationQueries'
                    },{
                        text: 'Print Application Details',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Print Record',
                        action: 'edit',
                        childXtype: '',
                        hidden: true,
                        winTitle: 'Product Information',
                        winWidth: '90%',
                        handler: 'printpreviewProductInformation'
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
                    }, {
                        xtype: 'button',
                        text: 'Return Back Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-green',
                        storeID: 'productApprovalTCMeetingStr',
                        table_name: 'tra_product_applications',
                        action: 'process_returnsubmission_btn',
                        winWidth: '50%',
                        toaster: 0
                    }
                ]
            }
        }
    }]
});