/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.GvpSiteAppMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gvpsiteappmoredetailswizard',
    controller: 'gvpapplicationsvctr',
    viewModel: 'gvpapplicationsvm',
    itemId: 'gvpsiteappmoredetailswizard',
    padding: '2 0 2 0',
    name: 'wizardPanel',
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
                        change: function (cmbo, newVal) {
                            var pnl = cmbo.up('gvpsiteappmoredetailswizard'),
                                ltr_selection = pnl.down('combo[name=applicant_as_ltr]');
                                licence_no = pnl.down('textfield[name=licence_no]');
                               // gvp_activities = pnl.down('combo[name=gvp_type_id]');
                                // county_id = pnl.down('combo[name=county_id]');
                                // sub_county_id = pnl.down('combo[name=sub_county_id]');
                                // parish_id = pnl.down('combo[name=parish_id]');
                                // village_id = pnl.down('combo[name=village_id]');
                                // region_id = pnl.down('combo[name=region_id]');
                                // country_id = pnl.down('combo[name=country_id]');
                                // var countryStore = country_id.getStore(),
                                // filterObj = {is_local: 1},
                                // filterStr = JSON.stringify(filterObj);
                            if (newVal == 2 || newVal === 2) {//local
                                ltr_selection.setValue(2);
                                ltr_selection.setReadOnly(true);
                              //  gvp_activities.setVisible(false);
                                //gvp_activities.allowBlank = true;
                                // licence_no.allowBlank = true;
                                // county_id.setVisible(true);
                                // licence_no.setVisible(false);
                                // county_id.allowBlank = false;
                                // county_id.validate();
                                // sub_county_id.setVisible(true);
                                // parish_id.setVisible(true);
                                // village_id.setVisible(true);
                                // region_id.allowBlank = false;
                                // region_id.validate();
                                // countryStore.removeAll();
                                // countryStore.load({params: {filter: filterStr}});

                            }else{
                                ltr_selection.setValue(2);
                                ltr_selection.setReadOnly(true);
                                //gvp_activities.setVisible(true);
                                //gvp_activities.allowBlank = false;
                               // gvp_activities.validate();
                                // county_id.setVisible(false);
                                // county_id.allowBlank = true;
                                // sub_county_id.setVisible(false);
                                // parish_id.setVisible(false);
                                // village_id.setVisible(false);
                                // region_id.allowBlank = true;
                                // countryStore.removeAll();
                                // countryStore.load();
                            }
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Device Type',
                    name: 'device_type_id',
                    forceSelection: true,
                    allowBlank: true,
                    hidden: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_device_types'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Gvp Assessment Type',
                    labelWidth: 120,
                    width: 400,
                    name: 'assessment_type_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
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
            xtype: 'gvpsitedetailswintabpnl'
        },
        {
            xtype: 'gvpproductslinkagedetailswingrid'
        },
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'gvp_type_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'gvp_site_id'
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
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'GVP SITE DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-cubes',
                    enableToggle: true,
                    text: 'PRODUCT DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetails'
                },
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            name: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    handler: 'onPrevCardClickMoreDetails'
                },
                '->',
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1,
                    disabled: true
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
                    handler: 'onNextCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
