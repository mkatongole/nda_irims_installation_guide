/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.ProductManagerEvalAuditReviewGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'productmanagerevalauditreviewgrid',
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
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    tbar: [
        {
            xtype: 'displayfield',
           // value: 'Double click to view more details!!',
            fieldStyle: {
                'color': 'green'
            }
        },
       //   {
       //  xtype: 'exportbtn'
       // },
    //    {
    //     xtype: 'button',
    //     text: 'Update/Save',
    //     iconCls: 'x-fa fa-plus',
    //     name:'update_report',
    //     handler:'saveCausalityAssessmentReport',
    //     ui: 'soft-green',
    //     winWidth: '35%',
    //     stores: '[]'
    // },
    {
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
        dataIndex: 'file_no',
        text: 'File No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'fpp_manufacturer',
        text: 'FPP Manufacturer',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_name',
        text: 'Product Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'generic_atc_name',
        text: 'Generic ATC Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'strength',
        text: 'Strength',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dosage Form',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pack_size',
        text: 'Pack Size',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'License Holder',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_of_origin',
        text: 'Manufacturing Country',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ltr_name',
        text: 'LTR',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_class',
        text: 'Class',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'shelf_life',
        text: 'Shelf Life',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'distrubution_category',
        text: 'Distribution Category',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'atc_code',
        text: 'ATC Code',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'api_manufacturer',
        text: 'API Manufacturer',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'visual_description',
        text: 'Visual Description',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'storage_condition',
        text: 'Storage Condition',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'indication',
        text: 'Indication',
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
                    text: 'Preview/Update Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Product Information',
                    winWidth: '90%',
                    isReadOnly: 0,
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
