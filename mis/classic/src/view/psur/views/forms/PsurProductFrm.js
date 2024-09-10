
Ext.define('Admin.view.pv.views.forms.PsurProductFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'psurformFrm',
    itemId: 'psurformfrm',
    controller: 'psurVctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        allowBlank: true,
        labelAlign: 'top'
    },
    scrollable: true,
    autoScroll: true,
    items: [{
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: 'table_name',
            value: 'tra_product_notification_details',
            allowBlank: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'psur_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Report Products Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[{
                xtype: 'combo',
                fieldLabel: 'Is Registered',
                name: 'is_registered_product',
                forceSelection: true,
                allowBlank: false,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setCompStore',
                        config: {
                            pageSize: 10000,
                            storeId: 'ctrclassificationsStr',
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change:function(combo,value){
                        link_registered_product_btn=combo.up('form').down('button[name=link_registered_product]');
                        if(value==1)
                        {
                            link_registered_product_btn.setDisabled(false);
                        }
                        else{

                            link_registered_product_btn.setDisabled(true);
                        }


                    }
                }
            },{
                xtype: 'fieldcontainer',
                layout: 'column', 
               
                defaults: {
                    labelAlign: 'top',
                   
                },
                fieldLabel: 'Registration No',
                items:[{
                        xtype: 'textfield',
                        columnWidth: 0.9,
                        readOnly: true,
                        name: 'product_registration_no',allowBlank: true,
                        bind:{
                            readOnly: '{isReadOnly}'
                        }
                    },{
                        bind:{disabled:'readOnly'},
                        xtype: 'button',
                        iconCls: 'x-fa fa-link',
                        columnWidth: 0.1,
                        tooltip: 'Link Applicant',
                        name: 'link_registered_product',
                        disabled:true,
                        handler: 'showRegistererdProductSelectionList',
                        
                    }
                ]
            },{
                xtype: 'textfield',
                fieldLabel: 'Trade/Brand/Device Name',
                name: 'brand_name',
                bind:{
                    readOnly: '{isReadOnly}'
                }
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
                        fn: 'setCompStore',
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
                xtype: 'combo',
                fieldLabel: 'Classification',
                name: 'classification_id',
                forceSelection: true,
                allowBlank:true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    afterrender: {
                        fn: 'setCompStore',
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
                    afterrender: {
                        fn: 'setCompStore',
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
                    afterrender: {
                        fn: 'setCompStore',
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

            },
             {
                xtype: 'combo',
                fieldLabel: 'Dosage Form',
                forceSelection: true,
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',allowBlank: true,
                name: 'dosage_form_id',
                listeners:{
                    beforerender: {
                        fn: 'setCompStore',
                        config: {
                            pageSize: 1000,
                            storeId: 'ctrdosageformstr',
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_dosage_forms'
                                }
                            }
                        },
                        isLoad: true
                    },
                }
            },

            {
                xtype:'fieldcontainer',
                fieldLabel: 'Strength',
                columnWidth: 0.33,
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
                                fn: 'setCompStore',
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
            },
             {
            xtype: 'combo',
            fieldLabel: ' ATC Code',
            name: 'atc_code_id',
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'atc_code',
            listeners: {
                afterrender: {
                    fn: 'setCompStore',
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
                afterrender: {
                    fn: 'setCompStore',
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
                afterrender: {
                  fn: 'setCompStore',
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
        },{
            xtype: 'tagfield',
            fieldLabel: 'Route of Administration',
            name: 'route_of_administration_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            //emptyText: 'Route of Administration',
            growMax: 100,
            columnWidth: 0.33,
            multiSelect: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setCompStore',
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
                afterrender: {
                    fn: 'setCompStore',
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
                xtype: 'textfield',
                fieldLabel:'Marketing Authorisation Holder',
                allowBlank: true,
                name: 'marketing_authorisation_holder',
                bind:{
                    readOnly: '{isReadOnly}',
                }
            }, {
                xtype: 'textfield',
                fieldLabel:'Marketing Authorisation Address',
                 allowBlank: true,
                name: 'marketing_authorisation_address',
                bind:{
                    readOnly: '{isReadOnly}',
                }
            }, {
                xtype: 'textfield',
                fieldLabel:'Local Technical Representative Address',
                 allowBlank: true,
                name: 'local_technical_representative',
                bind:{
                    readOnly: '{isReadOnly}',
                }
            }, {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                fieldLabel: 'Manufacturer',
                items: [
                    {
                        xtype: 'combo',
                        name: 'manufacturer_id',
                        forceSelection: true,
                        queryMode: 'local',
                        anyMatch: true,
                        valueField: 'manufacturer_id',
                        displayField: 'manufacturer_name',
                        columnWidth: 0.9,
                        listeners: {
                            beforerender: {
                                fn: 'setCompStore',
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
                        xtype: 'button',
                        iconCls: 'x-fa fa-plus',
                        columnWidth: 0.1,
                        disabled:true,
                        tooltip: 'add manufacturer',
                        childXtype: 'manufacturerConfigFrm',
                        stores: 'manufacturersConfigStr',
                        winTitle: 'Manufacturer Selection List',
                        winWidth: '70%',
                        handler: 'showAddConfigParamWinFrm'
                    }
                ]
            }]
       
        }
  
    ],
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
                    table_name: 'tra_product_notification_details',
                    storeID: 'psurproductStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePsurWin'
                }
            ]
        }
    ]
});