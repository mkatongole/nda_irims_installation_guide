Ext.define('Admin.view.research_operations.views.sharedinterfaces.NewResearchMaterialWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newresearchmaterialwizard',
    xtype: 'newresearchmaterialwizard',
	controller: 'researchoperationsvctr',
	viewModel:'researchoperationsvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    bodyPadding: 5,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 55,
            defaults: {
                labelAlign: 'right',
                labelStyle: "color:#595959",
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
                    name: 'workflow_stage_id',
                    value: 1465,
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
                    name: 'internal_research_id'
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
            xtype: 'panel',
            defaults: {
                margin: 3
            }, autoScroll: true,
            items: [{
                xtype: 'researchapplicantdetailsfrm',
                collapsible: true,
                hidden:true,
                title: 'APPLICANT DETAILS'
            },{
                xtype: 'researchappdetailsfrm',
                autoScroll: true,
                collapsible: false,
                title: 'Research Details'
            },
            ]
        },
       
		
		{
            xtype: 'tabpanel',
            items: [{
                xtype: 'researchdocuploadsgenericgrid',//'productDocUploadsGrid',
                title: 'Document Upload'
            }]
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
                    pressed: true, max_step: 1,
                    text: 'Internal Research Details',
                    action: 'quickNav',
                    wizard:'newresearchmaterialwizard',
                    handler: 'quickNavigationn'
                },
               
				{
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    iconAlign: 'top', max_step: 1,
                    text: 'Upload Documents',
                    action: 'quickNav',
                    wizard:'newresearchmaterialwizard',
                    handler: 'quickNavigationn'
                }, 
				
				
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
                    }, max_step: 1,
				    wizard:'newresearchmaterialwizard',
                    handler: 'onPrevCardClickk'
                },
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    action_url: 'researchoperations/saveIRMDApplicationDetails',
                    wizardpnl: 'newresearchmaterialwizard',
					action:'save_application_details'
                   // handler: 'saveApplicantPromotionMaterialsDetails'
                }, 
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'researchoperationapplicationstr',
                    table_name: 'tra_researchoperations_applications',
                    winWidth: '50%',
                    hidden: true,
					action:'submit_application'
                },
                // {
                //     xtype: 'button',
                //     text: 'Submit Application(s)',
                //     iconCls: 'x-fa fa-check',
                //     ui: 'soft-purple',
                //     name: 'submit_selected',
                //     disabled: true,
                //     gridXtype:'gmpmeetingschedulinggrid',//
                //     action: 'process_submission_btnn',
                //     winWidth: '50%'
                // },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    }, max_step: 1,
					wizard:'newresearchmaterialwizard',
                    handler: 'onNextCardClickk'
                }
            ]
        };
        me.callParent(arguments);
    }
});


