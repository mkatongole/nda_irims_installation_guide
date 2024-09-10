
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductManuctureringFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productManuctureringFrm',
    itemId: 'productManuctureringFrm',
    scrollable:true,
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
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
        name: 'manufacturer_id'
    }, 
    {
        xtype: 'hiddenfield',
        value: 1,
        name: 'manufacturer_type_id'
    },{
        xtype: 'hiddenfield',
        name: 'man_site_id' 
    },{
        xtype: 'hiddenfield',
        name: 'reg_site_id' 
    },{
        xtype: 'hiddenfield',
        name: 'gmp_application_code' 
    },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_product_manufacturers'
    },{
            xtype: 'combo',
            name: 'active_common_name_id',
            allowBlank: true,
            hidden:true,
            fieldLabel: 'Generic ATC Name',
            queryMode: 'local',
            valueField: 'common_name_id',
            displayField: 'generic_name',
            listeners: {
                    afterrender: {
                        fn: 'setConfigCombosProductfilterStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'productregistration/onLoadCopackedProductDetails'
                            }
                        },
                        isLoad: true
                    }
                }
        },   {
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            width: '70%',margin: 5,
            labelAlign: 'right',
            fieldLabel: 'Manufacturer',
            name: 'manufacturer_name',
            readOnly: true
        }, {
            text: 'Search Manufacturer',
            iconCls: 'fa fa-search',
            xtype: 'button',
            margin: 5,
            ui: 'soft-purple',
            handler: 'funcSearchProductManufacturer',
            ui: 'soft-green',
            childXtype: 'manufacturingDetailsGrid',
            winTitle: 'Manufacturer Information',
            winWidth: '90%',
            stores: '["manufacturingDetailsStr"]'
        }]
    }, {
        xtype: 'container',
        layout: 'hbox',
        hidden:true,
        items: [{
            xtype: 'textfield',
            width: '70%',margin: 5,
            labelAlign: 'right',
            fieldLabel: 'Manufacturing Site',
            name: 'manufacturing_site',
            readOnly: true
        }, {
            text: 'Search Manufacturing Site',
            iconCls: 'fa fa-search',
            xtype: 'button',
            margin: 5,
            ui: 'soft-purple',
            handler: 'funcSearchProductManufacturerSite',
            ui: 'soft-green',
            childXtype: 'manufacturingSiteDetailsGrid',
            winTitle: 'Manufacturing Site Information',
            winWidth: '90%',
            stores: '["manufacturingSiteDetailsStr"]'
        }]
    },{
        xtype: 'textfield',
        name: 'physical_address',
        disabled: true, allowBlank: true,
        fieldLabel: 'Manufacturer Physical Address',
        readOnly: true
    }, {
        xtype: 'combo',
        name: 'manufacturer_role_id',
        allowBlank: false,
        fieldLabel: 'Manufacturing Scope',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_manufacturing_roles'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textarea',
        allowBlank:true,
        name: 'manufacturing_activities',
        fieldLabel: 'Other Manufacturering Activities',
        
    }, {
        xtype: 'combo',
        name: 'has_beeninspected',
        allowBlank: false,
        fieldLabel: 'Has the Manufacturing Site been Inspected/Submitted Request for Inspection to the NDA',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_confirmations'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldValue, eopts) {
                    if(newVal == 1){
                        var form = combo.up('form'),
                            gmp_productline_id = form.down('combo[name=gmp_productline_id]'),
                            manufacturer_id = form.down('hiddenfield[name=manufacturer_id]').getValue(),
                            gmp_productlineStore = form.down('combo[name=gmp_productline_id]').getStore();
                            gmp_productline_id.setVisible(true);
                            gmp_productline_id.allowBlank = false;
                            gmp_productline_id.validate();

                            if (!manufacturer_id) {
                                toastr.error('Select Manuafacturer First to proceed.', 'Failure Response');
                                return;
                            }

                            // var filterObj = {manufacturing_site_id: manufacturer_id},
                            // filterStr = JSON.stringify(filterObj);
                            gmp_productlineStore.removeAll();
                            gmp_productlineStore.load({params: {manufacturing_site_id: manufacturer_id}});


                    }else{
                         var form = combo.up('form'),
                            gmp_productline_id = form.down('combo[name=gmp_productline_id]');
                            gmp_productline_id.setVisible(false);
                            gmp_productline_id.allowBlank = true;
                            gmp_productline_id.validate();
                    }
                        
            }
        }
    }, {
        xtype: 'container',
        hidden:true,
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            width: '70%',margin: 5,
            labelAlign: 'right',
            allowBlank: true,
            fieldLabel: 'Manufacturing Site',
            name: 'inspected_site_name',
            readOnly: true
        },{
            text: 'Search Manufacturer',
            iconCls: 'fa fa-search',
            xtype: 'button',
            margin: 5,
            handler: 'funcSearchGMPManufatcureingSite',
            ui: 'soft-green',
            childXtype: 'gmpInspectionDetailsGrid',
            winTitle: 'GMP Inspection Details',
            winWidth: '90%',
            stores: '["manufacturingDetailsStr"]'
        }]
    },{
        xtype: 'combo',
        name: 'gmp_productline_id',
        allowBlank: true,
        hidden:true,
        fieldLabel: 'GMP product Line',
        queryMode: 'local',
        valueField: 'gmp_productline_id',
        displayField: 'gmpproduct_line',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosProductfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'productregistration/getGMPproductLinesDetails'
                    }
                },
                isLoad: false
            }
        }
    }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Manufacturer',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_product_manufacturers',
                storeID: 'productManuctureringStr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});