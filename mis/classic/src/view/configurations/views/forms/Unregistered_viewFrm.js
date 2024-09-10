Ext.define('Admin.view.configurations.views.forms.Unregistered_viewFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'unregistered_viewFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_unregistered_products',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'The product is Co-Pack',
        margin: '0 20 20 0',
        name: 'co_pack',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_confirmations'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Product FDC',
        margin: '0 20 20 0',
        name: 'single_fixed_dose',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_product_fdc'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Proprietary Name',
        margin: '0 20 20 0',
        name: 'proprietary_name',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Classification',
        margin: '0 20 20 0',
        name: 'classification',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'classification'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Product Strength',
        margin: '0 20 20 0',
        name: 'product_strength',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'SI Unit',
        margin: '0 20 20 0',
        name: 'si_unit_id',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_packaging_units'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Class Category',
        margin: '0 20 20 0',
        name: 'class_category',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_prodclass_categories'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Generic Name',
        margin: '0 20 20 0',
        name: 'common_name_id',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_common_names'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'ATC Code',
        margin: '0 20 20 0',
        name: 'atc_code_id',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_atc_codes'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'ATC Description',
        margin: '0 20 20 0',
        name: 'atc_desciption',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'Therapeutic Group',
        margin: '0 20 20 0',
        name: 'therapeutic_group',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_therapeutic_group'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Distribution Category Class',
        margin: '0 20 20 0',
        name: 'distribution_category',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_distribution_categories'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Route of Administration',
        margin: '0 20 20 0',
        name: 'route_of_administarion',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_route_of_administration'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_unregistered_products',
                    storeID: 'investigator_catStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                },
                {
                    text: 'Reset',
                    iconCls: 'x-fa fa-times',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});