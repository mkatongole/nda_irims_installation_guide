Ext.define('Admin.view.configurations.views.forms.Gmpfeeconfigfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gmpfeeconfigfrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    height: Ext.Element.getViewportHeight() - 118,
    layout: 'column',
    itemId: 'gmpfeeconfigfrm',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        columnWidth: 1,
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin:5,
        name: 'table_name',
        value: 'tra_appmodules_feesconfigurations',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin:5,
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin:5,
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'module',
        margin:5,
        value: 3,
        name: 'module_id',
        allowBlank: true
    },{
        xtype: 'fieldset',
        title: 'Application Details',
        collapsible: true,
        layout: 'column',
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            columnWidth: 0.5,
        },
        items: [,{
            xtype: 'combo',
            fieldLabel: 'Sub Module',
            margin:5,
            name: 'sub_module_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'sub_modules',
                                filters: JSON.stringify({'module_id':3})
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Sections',
            margin:5,
            name: 'section_id',
            valueField: 'id',
            allowBlank:true,
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_sections'
                            }
                        }
                    },
                    isLoad: true
                },
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Countries Regions',
            margin:5,
            name: 'gmpcountries_region_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gmpcountries_regions'
                            }
                        }
                    },
                    isLoad: true
                },
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'GMP Type(Optional)',
            margin:5,
            allowBlank: true,
            name: 'gmp_type_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
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
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'GMP Inspection Type(Optional)',
            margin:5,
            hidden:true,
            allowBlank: true,
            name: 'inspection_type_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gmp_inspection_types'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: "SME's Option Selection",
            margin:5,
            hidden:true,
            name: 'smes_option_id',
            valueField: 'id',
            displayField: 'name',
            allowBlank: true,
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gmpsmes_options'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },
          {
                    xtype: 'combo',
                    fieldLabel: 'Licence Type(Local GMP)',
                    name: 'local_gmp_license_type_id',
                    forceSelection: true,
                    allowBlank:true,
                    columnWidth: 1,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_local_gmplicense_application'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },

         {
                    xtype: 'combo',
                    fieldLabel: 'Inpection Manufacturing Activities(Foreign GMP)',
                    name: 'inspection_activities_id',
                    columnWidth: 1,
                    allowBlank: true,
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_manufacturinginspection_activities'
                                    }
                                }
                            },
                            isLoad: true
                        },change: function(combo, newVal, oldValue, eopts) {
                             var form = combo.up('form'),
                             intermediate_manufacturing_activity_id = form.down('combo[name=intermediate_manufacturing_activity_id]');
                           if(newVal == 2){
                                manufacturing_activity_str = intermediate_manufacturing_activity_id.getStore();
                                manufacturing_activity_str.removeAll();
                                manufacturing_activity_str.load();
                                intermediate_manufacturing_activity_id.setHidden(false);
                                intermediate_manufacturing_activity_id.allowBlank = false;
                                intermediate_manufacturing_activity_id.validate();
                           }else if(newVal == 3){
                                manufacturing_activity_str = intermediate_manufacturing_activity_id.getStore();
                                manufacturing_activity_str.removeAll();
                                manufacturing_activity_str.load();
                                intermediate_manufacturing_activity_id.setHidden(false);
                                intermediate_manufacturing_activity_id.allowBlank = false;
                                intermediate_manufacturing_activity_id.validate();
                           }
                           else{
                            intermediate_manufacturing_activity_id.setHidden(true);
                            intermediate_manufacturing_activity_id.allowBlank = true;
                          

                          }
                       }
                    }
                },

                {
                    xtype: 'combo',
                    fieldLabel: 'Manufacturing Activity(s)',
                    name: 'intermediate_manufacturing_activity_id',
                    forceSelection: true,
                    allowBlank:true,
                    hidden:true,
                    columnWidth: 1,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_site_manufacturing_activities'
                                    }
                                }
                            },
                            isLoad: false
                        }
                    }
                },

           {
            xtype: 'combo',
            fieldLabel: 'Fee Type',
            margin:5,
            name: 'application_feetype_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_applicationfee_types'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'checkbox',
            inputValue: 1,
            fieldLabel: 'Is Enabled',
            margin:5,
            name: 'is_enabled',
            allowBlank: true
        },{
            xtype: 'combobox',
            fieldLabel: 'Elements Costs ',
            forceSelection: true,
            allowBlank: false,
            margin:5, columnWidth: 1,
            name: 'element_costs_id',
            store:'elementscoststr',
            queryMode: 'local',
            displayField: 'element_desc',
            valueField: 'id',
            editable : true,
            forceSelection : true,
            mode : 'local',
            triggerAction : 'all',
            mode : 'local',
            triggerAction : 'all',
           caseSensitive:false,
             minChars:0,
              anyMatch: true,
           
            listeners:{
                 afterrender: function(cbo){
                        var cbo = cbo.getStore();
                        cbo.removeAll();
                        cbo.load();
                 },
                 select: function(combo, records){
                      var frm = combo.up('form');
                      frmelementcosts = frm.down('form[name=frmelementcosts]');
                      frmelementcosts.loadRecord(records);
                }
             }
        }]
    },,{
        xtype: 'frmelementcosts',
        name:'frmelementcosts'
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            layout: 'vbox',
            items:['->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_appmodules_feesconfigurations',
                    storeID: 'gmpfeeconfigstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveModuleFeeConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});