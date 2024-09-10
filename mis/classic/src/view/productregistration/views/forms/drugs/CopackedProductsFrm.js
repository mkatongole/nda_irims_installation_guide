Ext.define('Admin.view.productregistration.views.forms.drugs.CopackedProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'copackedproductsfrm',
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    scrollable: true,
    height: 600,
    defaults: {
        margin: 5,
        labelAlign: 'top',
        width: '100%',
        allowBlank: false,
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'id',
            allowBlank: true
        },
        {
            xtype: 'hiddenfield',
            name: 'product_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_copacked_products'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Generic ATC Name',
            name: 'common_name_id',
            allowBlank: false,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'atc_code_description',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'genericatcnamestr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_atc_codes'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(cmbo, newVal) {
                    var form = cmbo.up('form'),
                        atccodeStore = form.down('combo[name=atc_code_id]').getStore(),
                        filterObj = {
                            id: newVal
                        },
                        filterStr = JSON.stringify(filterObj);
                    atccodeStore.removeAll();
                    atccodeStore.load({
                        params: {
                            filters: filterStr
                        }
                    });
                }
            },
            bind: {
                readOnly: '{isReadOnly}' // negated
            }
        },
        {
            xtype: 'combo',
            fieldLabel: ' ATC Code',
            name: 'atc_code_id',
            allowBlank: false,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'atc_code',
            listeners: {
                afterrender: {
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
                },
                select: function(cmbo, record) {
                    var form = cmbo.up('form'),
                        description = record.get('atc_code_description');
                    form.down('textfield[name=atc_code_description]').setValue(description);
                }
            },
            bind: {
                readOnly: '{isReadOnly}' // negated
            }
        },
        {
            xtype: 'textfield',
            name: 'atc_code_description',
            fieldLabel: 'ATC Description',
            allowBlank: true,
            readOnly: true
        },
        {
            xtype: 'combo',
            fieldLabel: 'Therapeutic Group',
            name: 'therapeutic_group',
            allowBlank: false,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
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
            },
            bind: {
                readOnly: '{isReadOnly}' // negated
            }
        },

        {
            xtype: 'combo',
            fieldLabel: 'Dosage Form',
            name: 'dosage_form_id',
            store: 'dosageformstr',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
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
            },
            bind: {
                readOnly: '{isReadOnly}' // negated
            }
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Product Details',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_copacked_products',
                storeID: 'copackedproductsgridstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }]
});
