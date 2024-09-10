
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.DrugsProductPackagingFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugsProductPackagingFrm',
    
    layout: {
        type: 'vbox'
    },
    scrollable: true,
    bodyPadding: 5,
    controller: 'productregistrationvctr',
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
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_product_packaging'
    },{
        xtype: 'combo',
        name: 'packaging_category_id',
        allowBlank: false,
        queryMode: 'local',
        fieldLabel: 'Pack Category',
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
                            table_name: 'par_container_categories'
                        }
                    }
                },
                isLoad: true
            },change: function(combo, newVal, oldValue, eopts) {
                        var form = combo.up('form');      
                        if (newVal==2) {
                               form.down('combo[name=diluent_id]').setVisible(true);
                               form.down('combo[name=diluent_id]').allowBlank = false;
                               form.down('combo[name=diluent_id]').validate();

                              var  containerTypeStore = form.down('combo[name=container_type_id]').getStore(),
                                filterObj = {id: 1},
                                filterStr = JSON.stringify(filterObj);
                                containerTypeStore.removeAll();
                                containerTypeStore.load({params: {filters: filterStr}});
                        }else{
                             form.down('combo[name=diluent_id]').setVisible(false);
                             form.down('combo[name=diluent_id]').allowBlank = true;
                             var  containerTypeStore = form.down('combo[name=container_type_id]').getStore();
                             containerTypeStore.removeAll();
                             containerTypeStore.load();
                        }
            }
        }
    },

    {
        xtype: 'combo',
        name: 'container_type_id',
        allowBlank: false,
        fieldLabel: 'Packaging Type',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_containers_types'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        name: 'container_id',
        allowBlank: false,
        fieldLabel: 'Pack Type',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_containers'
                        }
                    }
                },
                isLoad: true
            },change: function(combo, newVal, oldValue, eopts) {
                         var form = combo.up('form');
                         var record = combo.getSelection(); // Get the selected record from the combo box
                         if (record && record.get('has_quantity') === 1) { 
                               form.down('textfield[name=no_of_packs]').setVisible(true);
                               form.down('combo[name=si_unit_id]').setVisible(true);
                               form.down('combo[name=si_unit_id]').allowBlank = false;
                               form.down('combo[name=si_unit_id]').validate();
                               form.down('textfield[name=no_of_packs]').allowBlank = false;
                               form.down('textfield[name=no_of_packs]').validate();
                               form.down('textfield[name=no_of_units]').setValue(1);
                               form.down('textfield[name=no_of_units]').setReadOnly(true);
                        }else{
                            form.down('textfield[name=no_of_packs]').setVisible(false);
                            form.down('combo[name=si_unit_id]').setVisible(false);
                            form.down('textfield[name=no_of_packs]').allowBlank = true;
                            form.down('combo[name=si_unit_id]').allowBlank = true;
                            form.down('textfield[name=no_of_units]').setValue('');
                            form.down('textfield[name=no_of_units]').setReadOnly(false);
                    }
            }
        }
    },
    {
        xtype: 'combo',
        name: 'container_material_id',
        allowBlank: true,
        queryMode: 'local',
        fieldLabel: 'Pack Material',
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
                            table_name: 'par_containers_materials'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, 


     {
        xtype: 'combo',
        name: 'diluent_id',
        allowBlank: true,
        hidden:true,
        queryMode: 'local',
        fieldLabel: 'Diluent',
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
                            table_name: 'par_diluents'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, 

   {
        xtype: 'textfield',
        fieldLabel: 'No of Units in Pack',
        name: 'no_of_units',
        columnWidth: 1,
        allowBlank: false
    },


    {
                xtype:'fieldcontainer',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Quantity/Volume Per',
                        name: 'no_of_packs',
                        hidden:true,
                        allowBlank: true
                    },
                    {
                        xtype: 'combo',
                        name: 'si_unit_id',
                        fieldLabel: "Unit of Quantity/Volume",
                        queryMode: 'local',
                        forceSelection: true,
                        allowBlank: true,
                        hidden:true,
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 100,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'si_units'
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
            xtype: 'textarea',
            grow: true, 
            growMax: 200,
            allowBlank:true, 
            fieldLabel: 'Pack Description',
            name: 'description',
            columnWidth: 1
        },

    ],

    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Packaging Details',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_product_packaging',
                storeID: 'drugproductPackagingdetailsstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});