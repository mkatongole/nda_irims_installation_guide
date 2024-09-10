Ext.define('Admin.view.promotionmaterials.views.sharedinterfaces.WithdrawalPromotionMaterialWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.withdrawalpromotionmaterialwizard',
	controller: 'promotionmaterialviewcontroller',
	viewModel:'promotionmaterialsviewmodel',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
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
            height: 35,
            defaults: {
                labelAlign: 'right',
                labelStyle: "color:#595959"
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
                    xtype: 'tbspacer',
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
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }, 
				{
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },
				
				{
                    xtype: 'displayfield',
                    name: 'ref_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },
				 {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
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
                },
				{
					xtype: 'hiddenfield',
					name: 'is_portal',
					value:0
				},
				{
					xtype: 'hiddenfield',
					name: 'is_read_only',
					value:0
				}
				]
        }
    ],
    items: [
        {
            xtype: 'tabpanel',
            layout: 'fit',
            dockedItems: [{
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'top',
                    margin: 3,
                    items: [{

                            xtype: 'button',
                            iconCls: 'x-fa fa-link',
                            childXtype: 'registeredpromotionaadvertappgrid',
                            text:'Search Promotional & adv Application Details',
                            winTitle: 'Registered Applications',
                            winWidth: '70%',
                            ui:'soft-green',
                            handlerFn: 'loadSelectedProduct',
                            handler: 'showregisteredApplicationDetailsSearch'
                        },{
                            xtype:'tbfill'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 2
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Zone',
                            labelWidth: 50,
                            width: 400,
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
                        }
                    ]
                }
            ],
            defaults: {
                margin: 3
            },
            items: [{
                xtype: 'promotionalapplicantdetailsfrm',
                title: 'APPLICANT DETAILS'
            },{
                xtype: 'promotionalappdetailsfrm',
                title: 'Application Details'
            },{
                xtype: 'promLocalapplicantdetailsfrm',
                title: 'LOCAL TECHNICAL REPRESENTATIVE DETAILS'
            }]
        },
        {
            xtype: 'promotiommaterialproductgrid',
            title: 'Product Particulars',
            listeners: {
                beforerender: {
                    fn: 'setCustomPromotionMaterialGridsStore',
                    config: {
                       
                        storeId:'promotionmaterialproductparticularstr',
                        proxy: {
                            url: 'promotionmaterials/getPromotionMaterialsProductParticular'
                        }
                    },
                    isLoad: true
                },
            },
        },
		{
            xtype: 'tabpanel',
            items: [{
                xtype: 'promotionmaterialsdocuploadsgenericgrid',//'productDocUploadsGrid',
                title: 'Document Upload'
            }]
        }, {
            xtype: 'productwithdrawalreasonsgrid'
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
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    iconAlign: 'top',
                    pressed: true,
                    text: 'Applicantion Details',
                    max_step: 3,
                    action: 'quickNav',wizard:'withdrawalpromotionmaterialwizard',
                    handler: 'quickNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    iconAlign: 'top',
                    max_step: 3,
                    text: 'Products Particulars',
                    action: 'quickNav',wizard:'withdrawalpromotionmaterialwizard',
                    handler: 'quickNavigation'
                },
				{
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    iconAlign: 'top',
                    max_step: 3,
                    text: 'Upload Documents',
                    action: 'quickNav',wizard:'withdrawalpromotionmaterialwizard',
                    handler: 'quickNavigation'
                }, 
				{
                    step: 3,
                    iconCls: 'fa fa-edit',
                    enableToggle: true,
                    iconAlign: 'top',
                    max_step: 3,
                    text: "Promotion Materials' Withdrawal reasons",
                    action: 'quickNav',wizard:'withdrawalpromotionmaterialwizard',
                    handler: 'quickNavigation'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
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
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    max_step: 3,
				    wizard:'withdrawalpromotionmaterialwizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save', action_url: 'promotionmaterials/savePromotionalApplicationRenewalsDetails',
                   
                    name: 'save_btn',
                    wizardpnl: 'withdrawalpromotionmaterialwizard',
					action:'save_applicant_details'
                   // handler: 'saveApplicantPromotionMaterialsDetails'
                },
				
				
				 {
                    text: 'Save Screening Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    //handler: 'saveApplicationScreeningDetails',
                    hidden: true
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'promotionmaterialapplicationstr',
                    table_name: 'tra_promotion_adverts_applications',
                    winWidth: '50%',
					action:'submit_application'
                    //handler: 'showReceivingApplicationSubmissionWin'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    max_step: 3,
					wizard:'withdrawalpromotionmaterialwizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
