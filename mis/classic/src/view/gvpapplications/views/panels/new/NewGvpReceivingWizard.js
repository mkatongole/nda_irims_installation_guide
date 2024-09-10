/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gvpapplications.views.panels.new.NewGvpReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newgvpreceivingwizard',
    controller: 'gvpapplicationsvctr',
    viewModel: 'gvpapplicationsvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    flex: 1,
    autoScroll: true,
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
                columnWidth: 0.25,
                margin: 5,
                labelAlign: 'top'
            },
            bodyPadding: 5,
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'GVP Type',
                    labelWidth: 120,
                    width: 400,
                    name: 'gvp_type_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    labelStyle: 'font-weight:bold',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_gvplocation_details'
                                    }
                                }
                            },
                            isLoad: true
                        },
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Assessment Type',
                    labelWidth: 120,
                    width: 400,
                    name: 'assessment_type_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    labelStyle: 'font-weight:bold',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_gvp_assessment_types'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'gvpapplicationapplicantpnl'
        },
        {
            xtype: 'gvpsitedetailstabpnl'
        },
        {
            xtype: 'gvpproductslinkagedetailsgrid'
        },
        {
            xtype: 'gvpappdocuploadsgenericgrid'
        },
        {
            xtype: 'productscreeninggrid'
        },
        {
            xtype: 'appinvoicepaymentspanel'
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
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    max_step: 5,iconAlign: 'top',
                    text: 'Applicant details',wizard_pnl : 'newgvpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true, max_step: 5,iconAlign: 'top',
                    text: 'Gvp Site Details', wizard_pnl : 'newgvpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-cubes',
                    enableToggle: true, max_step: 5,iconAlign: 'top',
                    text: 'Product Registration Details',wizard_pnl : 'newgvpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-upload',
                    enableToggle: true, max_step: 5,iconAlign: 'top',
                    text: 'Documents Upload',wizard_pnl : 'newgvpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true, max_step: 5,iconAlign: 'top',
                    text: 'Prechecking',wizard_pnl : 'newgvpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-money-bill-wave',
                    enableToggle: true,iconAlign:'top',
                    text: 'Invoice & Payment Details',max_step: 5,
                    wizard_pnl : 'newgvpreceivingwizard',
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
                    },wizard_pnl : 'newgvpreceivingwizard',max_step: 6,
                    name: 'prev_btn'
                },
                {
                    xtype: 'transitionsbtn'
                },
                {
                    xtype: 'applicationdismissalbtn'
                },
                {
                    text: 'Queries/Responses',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-gavel',
                    name: 'queries_responses',
                    hidden: true
                },
                '->',
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1
                },
               
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_gvp_applications',
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
                    },wizard_pnl : 'newgvpreceivingwizard',max_step: 6,
                    name: 'next_btn'
                }
            ]
        };
        me.callParent(arguments);
    }
});
