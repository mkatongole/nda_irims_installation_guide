/**
 * Created by Kip on 4/25/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ContractManufacturingFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'contractmanufacturingfrm',
    controller: 'gmpapplicationsvctr',
    itemId: 'contractmanufacturingfrm',

    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 4,
        allowBlank: false,
        columnWidth: 0.33,
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this
            man_site_id = form.down('hiddenfield[name=manufacturing_site_id]').getValue()
            isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue()
            if(man_site_id){
                Ext.Ajax.request({
                    url: 'gmpapplications/getIndexGmpContractManufacturerDetails',
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    params:{
                        man_site_id: man_site_id,
                    },
                    success: function(response){
                        var result = Ext.decode(response.responseText)
                        model = Ext.create('Ext.data.Model', result)
                        form.getForm().loadRecord(model)
                    },

                    failure: function (form, action) {
                        toastr.error('Failed to retrieve data!', 'Failure Response');
                    }

                })
            }
                
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.down('button[action=link_personnel]').setDisabled(true);
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    config:{
        moreDetails: 0
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_gmp_contractmanufacturing_sites'
        },
        {
            xtype: 'hiddenfield',
            name: 'trader_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'contract_person_id'
        },
        {
            xtype:'hiddenfield',
            name:'cmd_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'combo',
            name: 'contract_manufacturing_id',
            fieldLabel: 'Is the site a contract Manufacturer or Has it Contracted another facility for some activities',
            valueField: 'id',
            columnWidth: 1,
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            //value: 1,
            listeners: {
                 beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_manufacturing_contractdetails'
                                }
                            }
                        },
                        isLoad: true
                    },
                    afterrender: function (cmbo) {
                        var newVal = cmbo.getValue();
                        if (newVal === null || newVal === '') {
                            cmbo.setValue(1);
                            } else {
                                cmbo.setValue(newVal);
                            }
                        },
                        change: function(cmbo,newVal){
                    var form=cmbo.up('form'),
                        fieldSet=form.down('fieldset[name=details_fieldset]');
                    if(newVal==1||newVal===1 || newVal==2||newVal===2){
                        Ext.each(fieldSet.query('field'), function(field) {
                            fieldSet.setVisible(true);
                            field.setReadOnly(true);
                        });
                        fieldSet.down('button[name=search_site]').setDisabled(false);
                    }else{
                        Ext.each(fieldSet.query('field'), function(field) {
                            fieldSet.setVisible(false);
                        });
                        //fieldSet.down('button[name=search_site]').setDisabled(true);
                    }
                }
            }
        },
        {
            xtype: 'fieldset',
            title: 'Contract Manufacturing Activity Details',
            collapsible: false,
            name:'details_fieldset',
            columnWidth: 1,
            layout: 'column',
            style: 'background:white',
            defaults: {
                columnWidth: 0.33,
                margin: 4,
                labelAlign: 'top'
            },
            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name of Site',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'contract_manufacturer_name',
                            columnWidth: 0.9,
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            name: 'search_site',
                            childXtype: 'mansitesselectiongrid',
                            winTitle: 'Manufacturing Sites Selection List',
                            winWidth: '90%',
                            stores: '[]'
                        }
                    ]
                },{
                    xtype: 'textfield',
                    name: 'contract_physical_address',
                    fieldLabel: 'Physical Address of Site',
                    readOnly: true
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    name: 'contract_country_id',
                    allowBlank:true,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/country'
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Region',
                    name: 'contract_region_id',
                    //store: 'regionsstr',
                    allowBlank:true,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/region'
                                }
                            },
                            isLoad: true
                        }
                    }
                },  {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name of Contact Person',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'contract_personnel_name',
                            columnWidth: 0.9,
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-link',
                            columnWidth: 0.1,
                            tooltip: 'Link Personnel',
                            action: 'link_personnel',
                            childXtype: 'traderpersonnelgrid',
                            winWidth: '70%'
                        }
                    ]
                },{
                    xtype: 'textfield',
                    name: 'contract_telephone_no',
                    fieldLabel: 'Telephone No of Contact Person',
                    readOnly: true
                },
                 {
                    xtype: 'textfield',
                    name: 'contract_email_address',
                    fieldLabel: 'Contact Person Email Address'
                }
                
          ]
        },

        {
            xtype: 'fieldset',
            title: 'Manufacturing Activity Details',
            collapsible: false,
            columnWidth: 1,
            layout: 'column',
            style: 'background:white',
            defaults: {
                columnWidth: 0.33,
                margin: 4,
                labelAlign: 'top'
            },
            items:[
                {
                    xtype: 'combo',
                    name: 'inspected_activity_id',
                    fieldLabel: 'Manufacturing Activity Details to be inspected.',
                    valueField: 'id',
                    columnWidth: 1,
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    //value: 2,
                    listeners: {
                             beforerender: {
                                    fn: 'setConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            url: 'commonparam/getCommonParamFromTable',
                                            extraParams: {
                                                table_name: 'par_manufacturing_activities'
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
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_gvp_contractmanufacturing_sites',
                    name: 'save_btn',
                    ui: 'soft-purple',
                    action_url: 'gmpapplications/saveGmpSitesContractManufacturers',
                },
                {
                    text: 'Reset',
                    iconCls: 'x-fa fa-times',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        console.log(btn.up('form'));
                        btn.up('form').getForm().reset();
                    }
                },
                
            ]
        }
    ]
});