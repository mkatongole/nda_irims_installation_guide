Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromotionAdvertsScreeningDocPanel', {
    extend: 'Ext.panel.Panel',
	record:1,
    xtype: 'promotionadvertsscreeningdocpanel',
    controller: 'promotionmaterialviewcontroller',
    viewModel:'promotionmaterialsviewmodel',
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
            height: 65,
             defaults: {
                labelAlign: 'top',
                margin: '0 5 0 0',
                labelStyle: "color:#595959;font-size:9px"
            },

            items: [{
                    xtype: 'displayfield',
                    name: 'process_name',
                    fieldLabel: 'Process',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '9px'
                    }
                }, {
                    xtype: 'tbspacer',
                    //flex: 1
                     width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '9px'
                    }
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '9px'
                    }
                }
                , 
                // {
                //     xtype: 'tbspacer',
                //     width: 20
                // }, 
                '->',  
                 {
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '9px'
                    }
                },{
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '9px'
                    }
                }, {
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
           xtype:'tabpanel',
           layout:'fit',
           region: 'center',
           //title:'Promotional and Advertisements Screening and details', 
        //    items:[{
        //             title:'Preview Promotional and Advertisements Details',
        //             xtype:'promtionadvertspreviewdetailswizard'
        //     },{
        //         title: 'Screening Checklist',
        //         itemId:'evaluation_panel',
        //         layout:'fit', margin:5,  
        //         xtype: 'productscreeninggrid'
        //    },{
        //         title: 'Asssesment Uploads',
        //         layout: 'fit',
        //         hidden:true,
        //         xtype: 'promotionmaterialsdocuploadsgenericgrid'
        //     },]
        // },
         items:[ {
            xtype: 'panel',
            title: 'Application Details',
            defaults: {
                margin: 3
            }, autoScroll: true,
            items: [{
                xtype: 'promotionalapplicantdetailsfrm',
                collapsible: true,
                title: 'APPLICANT DETAILS'
            },{
                xtype: 'promotionalappdetailsfrm',
                autoScroll: true,
                collapsible: true,
                title: 'Promotional Application Details'
            }
            ,
            {
                xtype: 'promLocalapplicantdetailsfrm',collapsible: true,
                hidden:true,
                title: 'LOCAL TECHNICAL REPRESENTATIVE DETAILS'
            }
            ]
        },{
                title: 'Promotion Material & Product Details',
                 xtype: 'promotionsotherinformationpnl'
           },{
                title: 'Screening Checklist',
                itemId:'evaluation_panel',
                layout:'fit', margin:5,  
                xtype: 'productscreeninggrid'
           },{
                title: 'Asssesment Uploads',
                layout: 'fit',
                hidden:true,
                xtype: 'promotionmaterialsdocuploadsgenericgrid'
            },]
        },
        // {
        //     title: 'Other Details',
        //     region: 'east',
        //     width: 400,
        //     collapsed: true,
        //     collapsible: true,
        //     titleCollapse: true,
        //     items: [
        //         {
        //             xtype: 'form',
        //             bodyPadding: 5,
        //             defaults: {
        //                 margin: 2,
        //                 labelAlign: 'top'
        //             },
        //             fieldDefaults: {
        //                 fieldStyle: {
        //                     'color': 'green',
        //                     'font-weight': 'bold'
        //                 }
        //             },
        //             items: [
        //                 {
        //                     xtype: 'displayfield',
        //                     fieldLabel: 'Applicant Details',
        //                     name: 'applicant_details'
        //                 },
        //                 {
        //                     xtype: 'displayfield',
        //                     fieldLabel: 'Product Details',
        //                     name: 'product_details'
        //                 }
        //             ]
        //         }
        //     ]
        // },
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
                text: 'Preview Applications Documents(uploads)',
                iconCls: 'x-fa fa-file',
                tooltip: 'Application Documents',
                action: 'edit',
                childXtype: '',
                winTitle: 'Application Documents',
                winWidth: '60%',
                isReadOnly: 1,
                document_type_id: '',
                handler: 'showPreviousNonGridPanelUploadedDocs'
        },
            {
                    text: 'Dossier Documents Submission Recommendation',
                    ui: 'soft-green',
                    iconCls: 'fa fa-check',
                    table_name: 'tra_promotion_adverts_applications',
                    winWidth: '50%',
                    childXtype:'documentssubmissionrecommendationfrm',
                    winTitle:'Documents Submission Recommendation',
                    winWidth: '60%',
                    handler: 'saveScreeningSubmissionRemarks'
                }, 
            '->', {
                text: 'Submit Application',
                ui: 'soft-purple',
                iconCls: 'fa fa-check',
                name: 'process_submission_btn',
                storeID: 'promotionmaterialapplicationstr',
                table_name: 'tra_promotion_adverts_applications',
                winWidth: '50%'
            }
            ]
        }
    ]
});