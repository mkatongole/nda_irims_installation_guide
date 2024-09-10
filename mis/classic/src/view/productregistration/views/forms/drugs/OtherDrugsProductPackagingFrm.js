
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.OtherDrugsProductPackagingFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'otherdrugsProductPackagingFrm',
    
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
        name: 'other_container_id',
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
                               form.down('textfield[name=other_no_of_packs]').setVisible(true);
                               form.down('combo[name=other_si_unit_id]').setVisible(true);
                               form.down('combo[name=other_si_unit_id]').allowBlank = false;
                               form.down('combo[name=other_si_unit_id]').validate();
                               form.down('textfield[name=other_no_of_packs]').allowBlank = false;
                               form.down('textfield[name=other_no_of_packs]').validate();
                               form.down('textfield[name=other_no_of_units]').setValue(1);
                               form.down('textfield[name=other_no_of_units]').setVisible(false);
                        }else{
                            form.down('textfield[name=other_no_of_packs]').setVisible(false);
                            form.down('combo[name=other_si_unit_id]').setVisible(false);
                            form.down('textfield[name=other_no_of_packs]').allowBlank = true;
                            form.down('combo[name=other_si_unit_id]').allowBlank = true;
                            //form.down('textfield[name=other_no_of_units]').setValue('');
                             form.down('textfield[name=other_no_of_units]').setVisible(true);
                    }
            }
        }
    },
    {
        xtype: 'combo',
        name: 'other_container_material_id',
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
        xtype: 'textfield',
        fieldLabel: 'No of Units in Pack',
        name: 'other_no_of_units',
        columnWidth: 1,
        allowBlank: false
    },


    {
                xtype:'fieldcontainer',
                columnWidth: 1,
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
                        name: 'other_no_of_packs',
                        hidden:true,
                        allowBlank: true
                    },
                    {
                        xtype: 'combo',
                        name: 'other_si_unit_id',
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
            name: 'other_description',
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
                handler: 'saveproductPackagingdetails'
            }
        ]
    }
    ]
});