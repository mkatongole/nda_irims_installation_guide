

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.EditImportExportDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'editimportexportdetailsfrm',
    itemId: 'permitsdetailsfrm',
    layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.33,
        labelAlign: 'top',
        allowBlank: true
        //readOnly: true
       
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
    },{
        xtype: 'combo',
        fieldLabel: 'Application Process',
        readOnly: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule',
                            module_id: 4
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'NDA Application Type',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        readOnly: true,
        allowBlank: true,
        name: 'has_registered_premises',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_importexport_application_type',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Business Type',
        name: 'business_type_id',
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
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_business_types'
                        }
                    }
                },
                isLoad: false
            },
            change: function(cmbo, newVal) {
                var form = cmbo.up('form'),
                has_registered_premises_id = form.down('combo[name=has_registered_premises]').getValue(),
                licenseTypeStore = form.down('combo[name=licence_type_id]').getStore(),
                licence_type_id = form.down('combo[name=licence_type_id]').getValue(),
                product_classification_id = form.down('combo[name=product_classification_id]').getValue();
                var filterObj = { "t2.business_type_id": newVal },
                filterStr = JSON.stringify(filterObj);
                licenseTypeStore.removeAll();
                licenseTypeStore.load({ params: { filters: filterStr } });

                // Check if both licence_type_id and product_classification_id have values
                 if (licence_type_id && product_classification_id) {
                    var rangeStore = form.down('combo[name=importexport_product_range_id]').getStore(),
                    product_classification_id = form.down('combo[name=product_classification_id]').getValue();
                    rangeStore.removeAll();
                    rangeStore.load({ params: { business_type_id: newVal, licence_type_id: licence_type_id, product_classification_id: product_classification_id } });

                }
                if(has_registered_premises_id!=2){
                    if (newVal == 5 || newVal === 5) {
                        form.down('fieldcontainer[name=gmp_search]').setVisible(true);
                        form.down('fieldcontainer[name=premise_search]').setVisible(false);
                        form.down('textfield[name=premises_name]').allowBlank = true;
                        form.down('textfield[name=manufacturing_site_name]').allowBlank = false;
                        form.down('textfield[name=manufacturing_site_name]').validate();
                    } else {
                        form.down('fieldcontainer[name=gmp_search]').setVisible(false);
                        form.down('fieldcontainer[name=premise_search]').setVisible(true);
                        form.down('textfield[name=premises_name]').allowBlank = false;
                        form.down('textfield[name=manufacturing_site_name]').allowBlank = true;
                        form.down('textfield[name=premises_name]').validate();
                    }
                }
            }
        }
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        name: 'premise_search',
        defaults: {
            labelAlign: 'top'
        },
        items: [{
            xtype: 'textfield',
            name: 'premises_name',
            columnWidth: 0.9,
            readOnly: true,
            allowBlank: false,
            fieldLabel: 'Premises Name',
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-search',
            //disabled: true,
            columnWidth: 0.1,
            tooltip: 'Search',
            action: 'search_premise',
            childXtype: 'registeredpremisesdetailsgrid',
            winTitle: 'Premises Selection List',
            winWidth: '90%',
            margin: '30 0 0 0',
            // bind: {
            //     disabled: '{isReadOnly}'
            // }
        }]
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        hidden: true,
        name: 'gmp_search',
        defaults: {
            labelAlign: 'top'
        },
        items: [{
            xtype: 'textfield',
            name: 'manufacturing_site_name',
            columnWidth: 0.9,
            allowBlank: true,
            readOnly: true,
            fieldLabel: 'Manufacturing Site Name',
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-search',
           // disabled: true,
            columnWidth: 0.1,
            tooltip: 'Search',
            action: 'search_site',
            handler: 'funcSearchManufacturer',
            childXtype: 'registeredgmpsitesdetailsgrid',
            winTitle: 'Manufacturer Selection List',
            winWidth: '90%',
            margin: '30 0 0 0',
            // bind: {
            //     disabled: '{isReadOnly}'
            // }
        }]
    }, {
        xtype: 'combo',
        fieldLabel: 'Licence Type',
        name: 'licence_type_id',
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
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_licence_type'
                        }
                    }
                },
                isLoad: true
            },
            change: function(cmbo, newVal) {
                var form = cmbo.up('form'),
                    rangeStore = form.down('combo[name=importexport_product_range_id]').getStore(),
                    business_type_id = form.down('combo[name=business_type_id]').getValue(),
                    product_classification_id = form.down('combo[name=product_classification_id]').getValue();
                rangeStore.removeAll();
                rangeStore.load({ params: { business_type_id: business_type_id, licence_type_id: newVal, product_classification_id: product_classification_id } });
            }
        },
        // bind: {
        //     readOnly: '{isReadOnly}'
        // },
    }, {
        xtype: 'combo',
        fieldLabel: 'Product Classification',
        name: 'product_classification_id',
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
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_premise_class'
                        }
                    }
                },
                isLoad: true
            },
            change: function(cmbo, newVal) {
                var form = cmbo.up('form'),
                rangeStore = form.down('combo[name=importexport_product_range_id]').getStore(),
                business_type_id = form.down('combo[name=business_type_id]').getValue(),
                licence_type_id = form.down('combo[name=licence_type_id]').getValue();
                rangeStore.removeAll();
                rangeStore.load({ params: { business_type_id: business_type_id, licence_type_id: licence_type_id, product_classification_id: newVal } });
            }
        },
        // bind: {
        //     readOnly: '{isReadOnly}'
        // },
    },{
    xtype: 'tagfield',
    fieldLabel: 'Product Classification',
    name: 'importexport_product_range_id',
    allowBlank: false,
    columnWidth: 1,
    forceSelection: true,
    filterPickList: true,
    encodeSubmitValue: true,
    growMax: 100,
    queryMode: 'local',
    valueField: 'id',
    displayField: 'name',
    listeners: {
        beforerender: {
            fn: 'setParamCombosStore',
            config: {
                pageSize: 100,
                proxy: {
                    url: 'commonparam/getProductRange',
                    extraParams: {
                        table_name: 'par_importexport_product_range'
                    }
                }
            },
            isLoad: true
        },
          afterrender: function(tagfield) {
            var store = tagfield.getStore();
            store.on('load', function() {
                var form = tagfield.up('form');
                if(form){
                var loadedData = form.getRecord();
                if (loadedData) {
                    var fieldValue = loadedData.get('importexport_product_range_id');
                    if (fieldValue) {
                        tagfield.setValue(fieldValue);
                    }
                }
               }
            });
        }
    }
}]
});