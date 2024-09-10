/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.ProductManagerAuditingGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'productmanagerauditinggrid',
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
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                //grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    tbar: [
        {
            xtype: 'displayfield',
           // value: 'Double click to view more details!!',
            fieldStyle: {
                'color': 'green'
            }
        }
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
                    table_name: 'tra_product_applications',
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
                    storeID: 'foodproductregistrationstr',
                    table_name: 'tra_product_applications',
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
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'productregistration/getManagerAuditingApplications'
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
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        },
        // itemdblclick: 'showProductApplicationMoreDetails'
    },
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
        dataIndex: 'product_name',
        text: 'Product Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        hidden:true,
        text: 'Common Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Class Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_added',
        text: 'Date Received',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submitted_by',
        text: 'Submitted By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submitted_on',
        text: 'Submitted On',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'evaluator_recommendation',
        hidden:true,
        text: 'Assessment Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'auditor_recommendation',
        hidden:true,
        text: 'Quality Review Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'laboratory_analysis_recommendation',
        text: 'Laboratory Analysis Recommendation',
        hidden:true,
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
                    text: 'Review Report',
                    hidden:true,
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
                    text: 'Print Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Print Record',
                    action: 'edit',
                    hidden: true,
                    childXtype: '',
                    winTitle: 'Product Information',
                    winWidth: '90%',
                    handler: 'printpreviewProductInformation'
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
                }, {
                    text: 'All Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Application Documents',
                    winWidth: '90%',
                    isReadOnly: 1,
                    document_type_id: '',
                    handler: 'showPreviousUploadedDocs'
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
                }]
            }
        }
    }]
});
