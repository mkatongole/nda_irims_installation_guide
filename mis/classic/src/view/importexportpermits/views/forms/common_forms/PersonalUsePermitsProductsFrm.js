

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.PersonalUsePermitsProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'personalusepermitsproductsfrm',
    itemId: 'personalusepermitsproductsfrm',
    scrollable:true,
    autoscroll:true,
    layout: {
        type: 'column',
        columns: 1
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 1,
        labelAlign: 'top',
        allowBlank: true
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_permits_products'
    },{
        xtype: 'hidden',
        name: '_token',
        value: token
    },{
            xtype: 'combo',
            fieldLabel: 'Product  Category',
            name: 'product_category_id',
            forceSelection: true,
            queryMode: 'local',
            allowBlank:false,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                           url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_importexport_product_category'
                            }
                        }
                    },
                    isLoad: false
                },
                afterrender: function (cmbo) {
                         var store = cmbo.getStore(),
                         filterObj = {is_personal_id: 1},
                         filterStr = JSON.stringify(filterObj);
                         store.removeAll();
                         store.load({params: {filters: filterStr}});
                }
            }

        },{
            xtype: 'combo',
            fieldLabel: 'Classification',
            name: 'classification_id',
            forceSelection: true,
            allowBlank:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_classifications'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, 
        {
            xtype: 'combo',
            fieldLabel: 'Product Class Category',
            name: 'prodclass_category_id',
            forceSelection: true,
            queryMode: 'local',
            allowBlank:true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
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
            fieldLabel: 'Product Type',
            name: 'product_type_id',
            forceSelection: true,
            allowBlank:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {  
                                table_name: 'par_product_type'
                            }
                        }
                    },
                    isLoad: true
                }
            }

        },{
        xtype: 'textfield',
        name: 'permitbrand_name',
        fieldLabel: 'Brand Name/Devices Name',
    },{
        xtype: 'combo',
        fieldLabel: 'Generic/Common Name',
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'common_name_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_common_names',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
                xtype:'fieldcontainer',
                fieldLabel: 'Strength',
                columnWidth: 1,
                //hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[{
                        xtype: 'textfield',
                        fieldLabel: 'Strength',
                        hideLabel: true,
                        allowBlank:true,
                        name: 'product_strength',
                        //emptyText: 'e.g., 125| 30',
                        allowBlank: true,
                        listeners: {
                            render: function (field) {
                                Ext.create('Ext.tip.ToolTip', {
                                    target: field.getEl(),
                                    html: 'e.g., 125| 30',
                                    trackMouse: true
                                });
                            }
                        }
                    },

                {
                        xtype: 'combo',
                        fieldLabel: 'SI Units',
                        hideLabel:true,
                        allowBlank: true,
                        valueField: 'id',
                        displayField: 'name',
                        forceSelection: true,
                        name: 'si_unit_id',
                        queryMode: 'local',
                        listeners: {
                            beforerender: {
                                fn: 'setConfigCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                        url: 'configurations/getNonrefParameter',
                                        extraParams: {
                                            table_name: 'par_si_units',
                                            has_filter: 0
                                        }
                                    }
                                },
                                isLoad: true
                            }
                        }
                    }

                 ]
            }, {
            xtype: 'combo',
            fieldLabel: ' ATC Code',
            name: 'atc_code_id',
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'atc_code',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'par_atccodesstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_atc_codes'
                            }
                        }
                    },
                    isLoad: true
                },select: function (cmbo, record) {
                        var form = cmbo.up('form'),
                            description = record.get('atc_code_description');
                        form.down('textfield[name=atc_desciption]').setValue(description);
                    }
            }
        },
        {
            xtype:'textfield',
            name:'atc_desciption',
            fieldLabel:'ATC Description',
            allowBlank: true,
            readOnly: true
        },

        {
            xtype: 'combo',
            fieldLabel: ' GMDN Code',
            name: 'gmdn_code',
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'gmdn_code',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'par_atccodesstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_gmdn_codes'
                            }
                        }
                    },
                    isLoad: true
                },select: function (cmbo, record) {
                        var form = cmbo.up('form'),
                            description = record.get('gmdn_code_description');
                        form.down('textfield[name=gmdn_descriptor]').setValue(description);
                    }
            }
        },
        {
            xtype:'textfield',
            name:'gmdn_descriptor',
            fieldLabel:'GMDN Descriptor',
            allowBlank: true,
            readOnly: true
        },

          {
            xtype: 'combo',
            fieldLabel: 'Therapeutic Group',
            name: 'therapeutic_group',
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                  fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_therapeutic_group'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo',
            fieldLabel: 'Dosage Form',
            name: 'dosage_form_id',
            store: 'dosageformstr',
            forceSelection: true,
            allowBlank:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_dosage_forms'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'tagfield',
            fieldLabel: 'Route of Administration',
            name: 'route_of_administration_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Route of Administration',
            growMax: 100,
            columnWidth: 0.99,
            multiSelect: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_route_of_administration'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo',
            fieldLabel: 'Distribution Category',
            name: 'distribution_category_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: true,
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_distribution_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo',
            name: 'manufacturer_id',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            fieldLabel: 'Manufacturer',
            valueField: 'manufacturer_id',
            displayField: 'manufacturer_name',
            allowBlank: true,
            listeners: {
                 beforerender: {
                        fn: 'setConfigCombosStore',
                         config: {
                             pageSize: 1000,
                             storeId: 'manufacturersConfigStr',
                             proxy: {
                                url: 'productregistration/onLoadManufacturersDetails'
                            }
                        },
                        isLoad: true
                    }
                }
        }, 
        {
        xtype: 'numberfield',
        name: 'quantity',

        allowBlank: true,
        fieldLabel: 'Quantity',
    },{
        xtype: 'numberfield',
        name: 'unit_price',

        allowBlank: true,
        fieldLabel: 'Unit Price',
    },{
        xtype: 'combo',
        fieldLabel: ' Currency',
        valueField: 'id',
        displayField: 'name',

        allowBlank: true,
        forceSelection: true,
        name: 'currency_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_currencies',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textfield',
        name: 'no_of_packs_tertiary',
        allowBlank: true,
        fieldLabel: 'Number of Tertiary Packs',
    },{
        xtype: 'textfield',
        name: 'no_of_packs_secondary',
        allowBlank: true,
        fieldLabel: 'Number of Secondary Packs per Tertiary pack',
    },{
        xtype: 'textfield',
        name: 'no_of_packs',
        allowBlank: true,
        fieldLabel: 'Number of Primary Packs per secondary pack',
    },{
        xtype: 'textfield',
        name: 'no_of_units',
        allowBlank: true,
        fieldLabel: 'Number of Units Per Primary Packs',
    },{
        xtype: 'combo', anyMatch: true,
        fieldLabel: 'Type of Primary Pack',
        name: 'container_type_id',
        allowBlank:true,
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                    config: {
                    pageSize: 1000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                            table_name: 'par_containers'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype:'textarea',
        name:'batch_numbers',
        fieldLabel:'Batch Number',
        allowBlank: true

    }],
    buttons:[{
        text:'Save Permit Product Details',
        iconCls: 'fa fa-save',
        margin: 5,
        store:'personalusepermitsproductsgridstr',
        action_url: 'importexportpermits/onSavePersonalUsePermitProductsDetails',
        action:'btn_savepermitproducts'
    },{
        text:'Close',
        iconCls: 'fa fa-window-close',
        handler:function(btn){
                var win = btn.up('window');

                    win.close();

        }
    }]
});