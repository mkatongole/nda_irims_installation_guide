/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.ManSiteAppMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mansiteappmoredetailswizard',
    controller: 'gmpapplicationsvctr',
    viewModel: 'gmpapplicationsvm',
    itemId: 'mansiteappmoredetailswizard',
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
                    fieldLabel: 'GMP Type',
                    labelWidth: 120,
                    width: 400,
                    name: 'gmp_type_id',
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
                                        table_name: 'par_gmplocation_details'
                                    }
                                }
                            },
                            isLoad: true
                        },
                         change: function (cmbo, newVal) {
                            var pnl = cmbo.up('mansiteappmoredetailswizard'),
                                sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
                                assessment_type_id = pnl.down('combo[name=assessment_type_id]'),
                                productlinedetailsgrid = pnl.down('productlinedetailsgrid');
                                ltr_selection = pnl.down('combo[name=applicant_as_ltr]');
                                phamacist_fieldset = pnl.down('fieldset[name=phamacist_fieldset]');
                                psu_no = pnl.down('textfield[name=psu_no]');
                                licence_no = pnl.down('textfield[name=licence_no]');
                                inspection_activities = pnl.down('combo[name=inspection_activities_id]');
                                county_id = pnl.down('combo[name=county_id]');
                                sub_county_id = pnl.down('combo[name=sub_county_id]');
                                sub_county_id = pnl.down('combo[name=sub_county_id]');
                                parish_id = pnl.down('combo[name=parish_id]');
                                village_id = pnl.down('combo[name=village_id]');
                                region_id = pnl.down('combo[name=region_id]');
                                country_id = pnl.down('combo[name=country_id]');
                                local_gmp_license_type_id = pnl.down('combo[name=local_gmp_license_type_id]');
                                var countryStore = country_id.getStore(),
                                filterObj = {is_local: 1},

                                filterStr = JSON.stringify(filterObj);
                            if (newVal == 2 || newVal === 2) {//local
                                // ltr_selection.setValue(2);
                                // ltr_selection.setReadOnly(true);
                                phamacist_fieldset.setVisible(true);
                                inspection_activities.setVisible(false);
                                inspection_activities.allowBlank = true;
                                // psu_no.allowBlank = false;
                                // psu_no.validate();
                                assessment_type_id.setValue(1);
                                assessment_type_id.setReadOnly(true);
                                productlinedetailsgrid.columns.find(col => col.dataIndex === 'general_manufacturing_activity_type').setHidden(false);
                         
                                //if(sub_module_id!=117){
                                 local_gmp_license_type_id.setVisible(true);
                                 local_gmp_license_type_id.allowBlank = false;
                                 local_gmp_license_type_id.validate();
                                 //county_id.setVisible(true);
                               
                                //}
                                if(sub_module_id==117 ||sub_module_id===117){
                                   psu_no.allowBlank = true;
                                   // assessment_type_id.setValue(1);
                                   // assessment_type_id.setReadOnly(true);
                                   licence_no.allowBlank = true;
                                   licence_no.setVisible(false);
                                }else{
                                   psu_no.allowBlank = false;
                                   psu_no.validate();
                                   licence_no.setVisible(true);
                                }


                                // county_id.allowBlank = false;
                                // county_id.validate();
                                // sub_county_id.setVisible(true);
                                // parish_id.setVisible(true);
                                // village_id.setVisible(true);
                                region_id.allowBlank = false;
                                region_id.validate();
                                // countryStore.removeAll();
                                // countryStore.load({params: {filter: filterStr}});

                            }else{
                                ltr_selection.setValue(2);
                                ltr_selection.setReadOnly(true);
                                phamacist_fieldset.setVisible(false);
                                inspection_activities.setVisible(true);
                                inspection_activities.allowBlank = false;
                                inspection_activities.validate();
                                psu_no.allowBlank = true;
                                licence_no.setVisible(true);
                                local_gmp_license_type_id.setVisible(false);
                                local_gmp_license_type_id.allowBlank = true;
                                productlinedetailsgrid.columns.find(col => col.dataIndex === 'general_manufacturing_activity_type').setHidden(true);
                                // county_id.setVisible(false);
                                // county_id.allowBlank = true;
                                // sub_county_id.setVisible(false);
                                // parish_id.setVisible(false);
                                // village_id.setVisible(false);
                                region_id.allowBlank = true;
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
                    fieldLabel: 'Assessment Type',
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
                                        table_name: 'par_gmp_assessment_types'
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
            xtype: 'applicationapplicantpnl'
        },
        {
            xtype: 'mansitedetailswintabpnl'
        },
        {
            xtype: 'productlinedetailsgrid'
        },
        {
            xtype: 'gmpproductslinkagedetailswingrid'
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
            name: 'gmp_type_id'
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
                    text: 'MANUFACTURING SITE DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: 'MANUFACTURING ACTIVITY(S) DETAILS',
                    action: 'quickNav',
                    name: 'line_details',
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 3,
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
