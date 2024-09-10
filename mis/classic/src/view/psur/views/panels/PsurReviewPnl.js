Ext.define('Admin.view.psur.views.panels.PsurReviewPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'psurreviewPnl',
    controller: 'psurVctr',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'Report Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },{
                    xtype: 'hiddenfield',
                    name: 'process_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'workflow_stage_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'product_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'applicant_id'
                }
            ]
        }
    ],
    items: [
                {
                  //  title: 'Report & Evaluation Uploads',
                    region: 'center',
                    xtype:'tabpanel', 
                    autoScroll: true,
                    items: [
                       {
                    title: 'Report Details',
                    xtype: 'psurreportsdetailspnl'
                },
                {
                    title: 'Report Documents',
                    xtype: 'psurDocUploadsGrid'
                },
                {
                    title: 'Checklist',
                    xtype: 'productscreeninggrid'
                },
                {
                    title: ' Assessment',
                    xtype: 'psurEvaluationFrm'
                },{
                title: 'Assessment Report Uploads',
                itemId:'evaluation_panel',
                layout:'fit', margin:5,
                items:[{
                    xtype: 'psurAssessmentUploadsGrid'
                 }]
                },
                ]
        },
        {
            xtype: 'toolbar',
            ui: 'footer',
            region: 'south',
            height: 45,
            split: false,
            defaults: {
                margin: 5
            },
            items: [{
                xtype: 'transitionsbtn'
            },
            {
                text: 'Previous Reports',
                iconCls: 'fa fa-medkit',
                tooltip: 'Application Documents',
                childXtype: 'previousPsurReportsPnl',
                winTitle: 'Previous PSUR/PBRER Reports',
                winWidth: '80%',
                hidden:true,
                handler: 'previewPreviousPsurDetails'
            },
            {
                text: 'Report Documents',
                iconCls: 'fa fa-file-download',
                tooltip: 'Application Documents',
                action: 'edit',
                childXtype: '',
                winTitle: 'Report Documents',
                winWidth: '60%',
                isReadOnly: 1,
                ui: 'soft-purple',
                document_type_id: '',
                handler: 'showPreviousNonGridPanelUploadedDocs'
            },
            {
                    text: 'Overall Recommendations',
                    ui: 'soft-purple', 
                    iconCls: 'fa fa-clipboard-check',
                    childXtype: 'applicationcommentspnl',
                    winTitle: ' Assessment',
                    winWidth: '60%',
                    name:'prev_comments',
                    comment_type_id: 2,
                    stores: '[]'
            },'->',{
                text: 'Submit Report',
                ui: 'soft-purple',
                iconCls: 'fa fa-check',
                name: 'process_submission_btn',
                storeID: 'psurapplicationstr',
                table_name: 'tra_psur_pbrer_applications',
                winWidth: '50%'
            }]
        }
    ]
});