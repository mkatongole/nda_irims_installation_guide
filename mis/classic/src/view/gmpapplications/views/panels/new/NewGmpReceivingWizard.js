/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.panels.new.NewGmpReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newgmpreceivingwizard',
    viewModel: 'gmpapplicationsvm',
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
                    fieldLabel: 'GMP Type',
                    labelWidth: 120,
                    width: 400,
                    name: 'gmp_type_id',
                    valueField: 'id',
                    //readOnly:true,
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
                                        table_name: 'par_gmplocation_details'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmbo, newVal) {
                            var pnl = cmbo.up('newgmpreceivingwizard'),
                                mainPnl=pnl.up('newgmpreceiving'),
                                sub_module_id = mainPnl.down('hiddenfield[name=sub_module_id]').getValue(),
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

                                assessment_type_id.setValue(1);
                                assessment_type_id.setReadOnly(true);
                               
                                // psu_no.allowBlank = false;
                                // psu_no.validate();
                                productlinedetailsgrid.columns.find(col => col.dataIndex === 'general_manufacturing_activity_type').setHidden(false);
                         
                               // if(sub_module_id!=117){
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
            xtype: 'mansitedetailstabpnl'//'mansitedetailspanel'
        },
        {
            xtype: 'productlinedetailsgrid'
        },
        {
            xtype: 'gmpproductslinkagedetailsgrid'
        },
        {
            xtype: 'gmpappdocuploadsgenericgrid'
        },
        {
            xtype: 'productscreeninggrid'
        },{
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
                    max_step: 6,iconAlign: 'top',
                    text: '<span style="font-size: 9px;"><b>Applicant details</b></span>', 
                    //text: 'Applicant details',
                    wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true, max_step: 6,iconAlign: 'top',
                    text: '<span style="font-size: 9px;"><b>Manufacturing Site Details</b></span>',
                    //text: 'Manufacturing Site Details',
                    wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,iconAlign: 'top',
                    name: 'line_details', max_step: 6,
                    text: '<span style="font-size: 9px;"><b>Manufacturing Activity(s) Details</b></span>',
                   // text: 'Manufacturing Activity(s) Details',
                    wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-cubes',
                    enableToggle: true, max_step: 6,iconAlign: 'top',
                    text: '<span style="font-size: 9px;"><b>Product Registration Details</b></span>',
                    //text: 'Product Registration Details',
                    wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-upload',
                    enableToggle: true, max_step: 6,iconAlign: 'top',
                    text: '<span style="font-size: 9px;"><b>Documents Upload</b></span>',
                    //text: 'Documents Upload',
                    wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true, max_step: 6,iconAlign: 'top',
                    text: '<span style="font-size: 9px;"><b>Prechecking</b></span>',
                   // text: 'Prechecking',
                    wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                
                {
                    step: 6,
                    iconCls: 'fa fa-money-bill-wave',
                    enableToggle: true,iconAlign:'top',
                    text: '<span style="font-size: 9px;"><b>Invoice & Payment Details</b></span>',
                    //text: 'Invoice & Payment Details',
                    max_step: 6,
                    wizard_pnl : 'newgmpreceivingwizard',
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
                    },wizard_pnl : 'newgmpreceivingwizard',max_step: 6,
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
                    table_name: 'tra_gmp_applications',
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
                    },wizard_pnl : 'newgmpreceivingwizard',max_step: 6,
                    name: 'next_btn'
                }
            ]
        };
        me.callParent(arguments);
    }
});
