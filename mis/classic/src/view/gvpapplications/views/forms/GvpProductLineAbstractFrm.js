

Ext.define('Admin.view.gvpapplications.views.forms.GvpProductLineAbstractFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gvpproductlineabstractfrm',
    itemId:'gvpproductlineabstractfrm',
    controller: 'gvpapplicationsvctr',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'gvp_productline_details'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Dosage Form Line',
            name: 'product_line_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGvpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'gvp_product_lines'
                            }
                        }
                    },
                    isLoad: true
                },
                  change: function(combo, newVal, oldValue, eopts) {
                     var form = combo.up('form'),
                     dosage_form_id = form.down('tagfield[name=dosage_form_id]')
                    var filter = {'product_line_id':newVal};
                    var filters = JSON.stringify(filter);
                    dosage_form_str = dosage_form_id.getStore();
                    dosage_form_str.removeAll();
                    dosage_form_str.load({params:{filters:filters}});
    
                   
                }
              }
           },


           {
            xtype: 'tagfield',
             fieldLabel: 'Dosage Form',
            name: 'dosage_form_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Select Dosage Form',
            growMax: 100,
            multiSelect: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_gvpproduct_dosages_forms'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },


        {
            xtype: 'combo',
            fieldLabel: 'Product Line Category',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            name: 'category_id',
            allowBlank: false,
            listeners: {
                 beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_gvpproduct_types'
                        }
                       }
                    },
                    isLoad: false
                }
            }
        }, 



        {
            xtype: 'combo',
            fieldLabel: 'Medical Device Group/Family Name',
            name: 'group_family_id',
            hidden:true,
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGvpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_medical_device_family'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo',
            fieldLabel: 'Sterile/Non-sterile',
            name: 'sterile_id',
            hidden:true,
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGvpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_sterility'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },


        {
            xtype: 'combo',
            fieldLabel: 'Invasive/Non- Invasive device',
            name: 'invasive_id',
            hidden:true,
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGvpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_invasivity'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo',
            fieldLabel: 'Active or Inactive',
            name: 'active_id',
            hidden:true,
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGvpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_activitity'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo',
            fieldLabel: 'Medicated or Non-Medicated',
            name: 'medicated_id',
            hidden:true,
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGvpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_medics'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },



        {
            xtype: 'textarea',
            fieldLabel: 'Dosage Form Description',
            allowBlank: true,
            name: 'prodline_description',
          
        },

         {
            xtype: 'combo',
            fieldLabel: 'Manufacturing Activities',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            name: 'manufacturing_activity_id',
            allowBlank: false,
            listeners: {
                 beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_manufacturing_activities'
                        }
                       }
                    },
                    isLoad: false
                }
            }
        }, 

        {
            xtype: 'combo', 
            anyMatch: true,
            fieldLabel: 'Inspection Recommendation',
            name: 'prodline_inspectionstatus_id',
            store: 'gvpproductlinestatusstr',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-blue',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'gvp_product_details',
            storeID: 'productlinedetailsstr',
            store2ID: 'mansiteblockdetailsstr',
            action_url: 'gvpapplications/saveGvpInspectionLineDetails',
            handler: 'doCreateGvpApplicationParamWin'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-blue',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]

});
