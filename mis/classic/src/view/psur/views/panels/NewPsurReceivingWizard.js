Ext.define('Admin.view.psur.views.panels.NewPsurReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newpsurreceivingwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    itemId: 'wizardpnl',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',
     dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            // hidden: true,
            ui: 'footer',
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },//drugproductdocuploadsgrid
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
                },{
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },  {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
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
                }, {
                    xtype: 'hiddenfield',
                    name: 'prodclass_category_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'invoice_id'
                }
            ]
        }
    ],
      items: [{
            xtype: 'psurreportsdetailspnl'
        },
        {
            xtype: 'psurDocUploadsGrid'
        },
        {
            xtype: 'productscreeninggrid'
        }
    ],
   initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },

             items: [ {
                    step: 0,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,iconAlign:'top',
                    text: 'REPORT DETAILS',
                    wizard:'newpsurreceivingwizard',
                    handler: 'quickNavigation',
                    action: 'quickNav'
                },{
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,iconAlign:'top',
                    text: 'REPORT DOCUMENT UPLOADS',
                    wizard:'newpsurreceivingwizard',
                    handler: 'quickNavigation',
                    action: 'quickNav'
                },{
                    step: 2,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,iconAlign:'top',
                    text: 'PRE-CHECKING',
                    wizard:'newpsurreceivingwizard',
                    handler: 'quickNavigation',
                    action: 'quickNav'
                }
            ]

        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [

                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard:'newpsurreceivingwizard',
                    handler: 'onPrevCardClick'
                }, {
                    xtype: 'transitionsbtn'
                },
                
                '->',
                {
                    text: 'Save Report Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    action_url: 'saveNewPsurReceivingBaseDetails',
                    wizard: 'newpsurreceivingwizard',
                    handler: 'savePsurReceivingBaseDetails'
                },
                {
                    text: 'Submit Report',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'psurapplicationstr',
                    table_name: 'tra_psur_pbrer_applications',
                    winWidth: '50%',
                    wizard:'newpsurreceivingwizard'
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
                    },wizard:'newpsurreceivingwizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
