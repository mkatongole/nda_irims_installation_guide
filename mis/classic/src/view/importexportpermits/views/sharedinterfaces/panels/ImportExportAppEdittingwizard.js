
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportAppEdittingwizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.importexportedittingswizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    viewModel: {
        type: 'importexportpermitsvm'
    },
    reference: 'wizardpnl',
    itemId: 'importexportedittingswizardId',
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
                labelAlign: 'right',
                labelStyle: "color:#595959",
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                hidden: true,
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                    xtype: 'tbspacer',
                    //width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    hidden: true,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'tbspacer',
                    //width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    hidden: true,
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'tbspacer',
                    //width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    hidden: true,
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
                    hidden: true,
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
                },{
                    xtype: 'hiddenfield',
                    name: 'registration_status'
                },{
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'License Details',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'reference_no',
                            hidden: false,
                            readOnly: true,
                            columnWidth: 0.9
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            hidden: false,
                            text: 'Search',
                            tooltip: 'Select Application',
                            name: 'select_applications',
                            childXtype: 'allimportexportappgrid',
                            winTitle:'Import/Export Applications',
                            winWidth:'90%',
                            handler: 'showIEApplicationsSelectionList'
                        }
                    ]
                }]
        }
    ],
    items: [
 
        {
            xtype: 'editimportexportdetailspnl',//onlinefoodproductsdetailspnl
        }, 
     
        {
            xtype: 'importexportdocuploadsgrid',
           // title: 'Application Documents '
        },

        {
            xtype: 'extensionimportexportapppnl',
            //title: 'Import/Export License Extention'
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
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    pressed: true,
                    text: 'Import/Export License Details',
                    action: 'quickNav', 
                    wizard: 'importexportedittingswizard',
                    handler: 'quickNavigation'
                }, {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Import/Export License Documents Submission',
                    action: 'quickNav', 
                    wizard: 'importexportedittingswizard',
                    handler: 'quickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-product-hunt',
                    enableToggle: true,
                    text: 'Import/Export License Extension',
                    action: 'quickNav', 
                    wizard: 'importexportedittingswizard',
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
                    max_step:2,
                    disabled:true,
                    name:'previous_btn',
                    iconCls: 'fa fa-arrow-left',
                    wizard:'importexportedittingswizard',
                    handler: 'onPrevCardClick'
                },{
                    text: 'Preview & Reprint Approval Document',
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
                                name: 'print_importexportpermit',
                            }
                        ]
                    }
                },
                {
                    text: 'Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    wizard: 'importexportedittingswizard',
                    handler: 'saveImporExportPermitReceivingEditDetails'
                },
                {
                    text: 'Save Extension Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_extension_btn',
                    disabled: false,
                    wizard: 'importexportedittingswizard',
                    handler: 'saveImporExportAppExtensionEditDetails'
                },
                {
                    text: "Next",
                    ui: "soft-purple",
                    reference: "nextbutton",
                    iconCls: "fa fa-arrow-right",
                    iconAlign: "right",
                    max_step: 2,
                    name:'next_btn',
                    wizard: "importexportedittingswizard",
                    handler: "onNextCardClick",
                }
            ]
        };
        me.callParent(arguments);
    }
});
