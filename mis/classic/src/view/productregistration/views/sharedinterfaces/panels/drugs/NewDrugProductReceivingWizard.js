
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.NewDrugProductReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newdrugproductreceivingwizard',
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
            height: 50,
            defaults: {
                labelAlign: 'top',
                margin: '-12 3 0 3',
                labelStyle: "color:#595959;font-size:11px"
            },//drugproductdocuploadsgrid
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '11px'
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
                        'font-size': '11px'
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
                        'font-size': '11px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                },{
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '11px'
                    }
                },  {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '11px'
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
                    name: 'status_type_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'is_manager_query'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'tabpanel',
            //layout: 'fit',

            defaults: {
                margin: 2
            },
            items: [{
                xtype: 'productapplicantdetailsfrm',
                title: 'Applicant Details'
            },
            {
                xtype: 'productlocalapplicantdetailsfrm',
                title: 'Local Technical Representative'
            }]
        },
        {
            xtype: 'drugsProductsDetailsPnl'

        },{
            xtype: 'tabpanel',
            items: [{
                xtype: 'productqualityassessmentDocUploadsGrid',
                title: 'Quality Summary Report Submission'
            },{
                xtype: 'productbioequivalencetrialinformationDocUploadsGrid',
                title: 'Bioequivalence Trial Information'
            }]
        }, {
            xtype: 'tabpanel',
            items: [{
                xtype: 'productDocUploadsGrid',
                title: 'Product Application Documents Submission'
            }]
        },
        {
            xtype: 'appinvoicepaymentspanel'
           
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
                    pressed: true,iconAlign: 'top',
                    text: 'Applicant & Local Technical Representative Details',
                    action: 'quickNav',
                    wizard:'newdrugproductreceivingwizard',
                    handler: 'quickNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Products Details',
                    action: 'quickNav', iconAlign: 'top',
                    wizard:'newdrugproductreceivingwizard',
                    handler: 'quickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-check',
                    enableToggle: true,
                    text: 'Quality Summary Report',
                    action: 'quickNav', iconAlign: 'top',
                    wizard:'newdrugproductreceivingwizard',
                    handler: 'quickNavigation'
                }, {
                    step: 3,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Product Application Documents Submission',
                    action: 'quickNav', iconAlign: 'top',
                    wizard:'newdrugproductreceivingwizard',
                    handler: 'quickNavigation'
                },{
                    step: 4,
                    iconCls: 'fa fa-money-bill-wave',
                    enableToggle: true,
                    text: 'Invoice & Payment Details',
                    action: 'quickNav',iconAlign: 'top',
                    wizard: 'newdrugproductreceivingwizard',
                    handler: 'quickNavigation',
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
                    wizard:'newdrugproductreceivingwizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: true,
                    action_url: 'saveNewProductReceivingBaseDetails',
                    wizard: 'newdrugproductreceivingwizard',
                    handler: 'saveProductReceivingBaseDetails'
                },{
                    text: ' Pre-Checking Recommendation',
                    ui: 'soft-red',
                    iconCls: 'fa fa-save', 
                    hidden:true,
                    disabled: true, 
                    name: 'prechecking_recommendation',
                    
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
                    wizard:'newdrugproductreceivingwizard',
                    handler: 'onNextCardClick'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    hidden: true,
                    storeID: 'productregistrationstr',
                    table_name: 'tra_product_applications',
                    winWidth: '50%',
                    wizard:'newdrugproductreceivingwizard',
                    handler: 'showReceivingApplicationSubmissionWin'
                }
            ]
        };
        me.callParent(arguments);
    }
});
