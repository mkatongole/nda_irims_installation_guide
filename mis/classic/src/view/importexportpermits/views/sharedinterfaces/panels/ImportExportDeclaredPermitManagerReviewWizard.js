/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportDeclaredPermitManagerReviewWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.importexportdeclaredpermitmanagerreviewwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    viewModel: {
        type: 'importexportpermitsvm'
    },
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
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
                    'font-size': '12px',  'margin-top': '-2px'
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
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
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
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Reference No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
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
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }]
        }
    ],
    items: [
        {
            xtype: 'declaredimportexportdetailspnl',//onlinefoodproductsdetailspnl
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'top',
                    margin: 3,
                    items: [
                        {
                            xtype: 'tbseparator',
                            width: 2
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Zone',
                            labelWidth: 50,
                            width: 400,
                             hidden:true,
                            name: 'zone_id',
                            valueField: 'id',
                            displayField: 'name',
                            queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            extraParams: {
                                                model_name: 'Zone'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            },
                            labelStyle: 'font-weight:bold'
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Prechecking Recommendation',
                            labelWidth: 108,
                            width: 315,
                            hidden:true,
                            name: 'prechecking_recommendation_id',
                            valueField: 'id',
                            displayField: 'name',readOnly: true,
                            queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            url: 'configurations/getNonrefParameter',
                                            extraParams: {
                                                table_name: 'par_evaluation_recommendations'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            },
                            labelStyle: 'font-weight:bold'
                            
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Review Recommendation',
                            labelWidth: 250,
                            width: 500,
                            name: 'review_recommendation_id',
                            valueField: 'id',
                            displayField: 'name',readOnly: true,
                            queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            url: 'configurations/getNonrefParameter',
                                            extraParams: {
                                                table_name: 'par_permits_reviewrecommendations'
                                            }
                                        }
                                    },
                                     isLoad: true
                                    }
                                },
                                labelStyle: 'font-weight:bold'
                            },{
                                xtype: 'combo',
                                fieldLabel: 'Approval recommendation',
                                labelWidth: 320,
                                width: 700,
                                name: 'approval_recommendation_id',
                                valueField: 'id',
                                displayField: 'name',
                                hidden: true,
                                queryMode: 'local',
                                forceSelection: true,
                                readOnly: true,
                                listeners: {
                                    beforerender: {
                                        fn: 'setOrgConfigCombosStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                url: 'configurations/getNonrefParameter',
                                                extraParams: {
                                                    table_name: 'par_permits_reviewrecommendations'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                },
                                labelStyle: 'font-weight:bold'
                            }
                        ]
                    }
            ],
        },{
            xtype: 'importexportapplicantdetailsfrm',
            title: 'APPLICANT DETAILS'
        }, {
            xtype: 'declaredimportexportdocuploadsgrid',
            title: 'Documents Submission'
        },{
            xtype: 'importexportscreeninggrid',
            title: 'Checklist'
    },
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        }
    ],
    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            style: {
                "background-color": "#90c258"
            },
            bodyStyle: {
                "background-color": "#90c258"
            },
            layout: {
                pack: 'center'
            },
            items: [{
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Application Details',
                    action: 'quickNav', 
                    wizard: 'importexportdeclaredpermitmanagerreviewwizard',
                    handler: 'quickNavigation'
                },{
                    step: 1,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'Applicant',
                    action: 'quickNav',
                    wizard: 'importexportdeclaredpermitmanagerreviewwizard',
                    handler: 'quickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Application Documents Submission',
                    action: 'quickNav', 
                    wizard: 'importexportdeclaredpermitmanagerreviewwizard',
                    handler: 'quickNavigation'
                }, {
                    step: 3,
                    iconCls: 'fa fa-product-hunt',
                    enableToggle: true,
                    text: 'Checklist',
                    action: 'quickNav', 
                    wizard: 'importexportdeclaredpermitmanagerreviewwizard',
                    handler: 'quickNavigation'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [ {
                    xtype: 'transitionsbtn',
                },
                {
                    text: 'Back to List',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'back_to_list',
                    hidden: true
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    hidden: true,
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard:'importexportdeclaredpermitmanagerreviewwizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save/Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    hidden:true,
                    action_url: 'saveImportPermittReceivingBaseDetails',
                    wizard: 'importexportdeclaredpermitmanagerreviewwizard',
                    handler: 'saveImporExportPermitReceivingBaseDetails'
                },{
                    text: 'Save Screening Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                   // disabled:true,
                    //hidden: true
                },
                {
                    text: 'Preview Approval Document',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-sliders',
                    menu: {
                        xtype: 'menu',
                        items: [{
                                ui: 'soft-red',
                                iconCls: 'fa fa-print',
                                text: 'Preview Approval Document',
                                is_preview : true,
                                name: 'preview_importexportpermit',
                            },{
                                ui: 'soft-green',
                                iconCls: 'fa fa-print',
                                text: 'Print Approval Document',
                                is_preview : false,
                                hidden:true,
                                name: 'print_importexportpermit',
                            }
                        ]
                    }
                }, {
                        text: 'Review & Approval Recommendation',
                        ui: 'soft-purple',
                        iconCls: 'fa fa-check',
                        ui: 'soft-purple',
                        iconCls: 'fa fa-sliders',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'Reject Application',
                                    iconCls: 'x-fa fa-bars',
                                    decision_id: 3,
                                    winWidth: '90%', ui: 'soft-red',
                                    name: 'reject_recommendation',
                                    stores: '[]'
                                },{
                                    text: 'Approve Application',
                                    iconCls: 'x-fa fa-bars', decision_id: 1,
                                    winWidth: '90%',ui: 'soft-green',
                                    name: 'approve_recommendation',
                                    stores: '[]'
                                }
                            ]
                        }
                }, {
                    text: 'Submit Query to Single Window',
                    ui: 'soft-red',
                    hidden:true,
                    iconCls: 'fa fa-check',
                    name: 'process_tradersubmission_btn',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%',
                    
                },{
                    text: 'Return Back ',
                    ui: 'soft-purple',
                    hidden:true,
                    iconCls: 'fa fa-check',
                    name: 'returnback_submission_btn',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%',
                    
                },
                {
                    text: ' Close & Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%',
                    
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    hidden: true,
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'importexportdeclaredpermitmanagerreviewwizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
