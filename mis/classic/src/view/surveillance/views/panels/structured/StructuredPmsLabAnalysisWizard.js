/**
 * Created by Kip on 3/16/2019.
 */
/*Ext.define('Admin.view.surveillance.views.panels.structured.StructuredPmsLabAnalysisWizard', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.panels.PmsLabAnalysisWizard',
    xtype: 'structuredpmslabanalysiswizard'
});*/

Ext.define('Admin.view.surveillance.views.panels.structured.StructuredPmsLabAnalysisWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.structuredpmslabanalysiswizard',
    viewModel: 'surveillancevm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    flex: 1,
    scrollable: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    dockedItems: [
        {
            name: 'applicationdetailsform',
            dock: 'top',
            frame: true,
            width: '100%',
            layout: 'column',
            defaults: {
                columnWidth: 0.5,
                margin: 5,
                labelAlign: 'top'
            },
            bodyPadding: 5,
            items:[
                {
                    xtype: 'combo',
                    fieldLabel: 'Zone',
                    labelWidth: 50,
                    width: 400,
                    name: 'zone_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: false,
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
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Directorate',
                    labelWidth: 85,
                    width: 400,
                    allowBlank: false,
                    name: 'directorate_id',
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
                                        model_name: 'Directorate'
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

    items: [
        {
            xtype: 'analysissampledetailsgrid'
        },
        {
            xtype: 'surveillancedocuploadsgenericgrid'
        },
        {
            xtype: 'samplecollectionsitefrm'
        },
        {
            xtype: 'applicationpmsplandetailsfrm'//'applicationpmsdetailspnl'
        },{
			xtype:'hiddenfield',
			name:'analysis_type_id',
			value:4
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
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    pressed: true,
                    text: 'SAMPLE/PRODUCT DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationCmn'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav',
                    handler: 'quickNavigationCmn'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'SAMPLE COLLECTION SITE',
                    action: 'quickNav',
                    handler: 'quickNavigationCmn'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-list',
                    enableToggle: true,
                    text: 'PROGRAM DETAILS/PMS PLAN',
                    action: 'quickNav',
                    handler: 'quickNavigationCmn'
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
                    name: 'prev_btn',
                    handler: 'onPrevCardClickCmn'
                },
                {
                    xtype: 'transitionsbtn'
                },
                {
                    xtype: 'button',
                    ui: 'soft-purple',
                    text: 'Initiate Group Sample Analysis',
                    iconCls: 'fa fa-arrow-left',
                    name: 'groupsampleanalysis',
                    //handler: 'funcgroupsampleanalysis'
                },
                '->',
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1,
                    hidden: true
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    winWidth: '50%'
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
                    name: 'next_btn',
                    handler: 'onNextCardClickCmn'
                }
            ]
        };
        me.callParent(arguments);
    }
});
