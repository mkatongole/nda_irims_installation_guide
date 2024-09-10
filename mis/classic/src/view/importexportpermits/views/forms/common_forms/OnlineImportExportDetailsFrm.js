

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.onlineimportexportdetailsfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineimportexportdetailsfrm',
    itemId: 'importexportdetailsfrm',
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
        allowBlank: false,
        
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
    }, {
        xtype:'fieldset',
        columnWidth: 1,
        itemId: 'main_fieldset',
        name: 'main_fieldset',
        title: 'Licence Details',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            columnWidth: 0.33
        },
        layout: 'column',
        items:[  { 
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
    },
    {
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
                importReasonStore = form.down('combo[name=importation_reason_id]').getStore(),
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
               if (licence_type_id) {
                  importReasonStore.removeAll();
                  importReasonStore.load({ params: { business_type_id: newVal, licence_type_id: licence_type_id} });
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
    },  {
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
           // disabled: true,
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
                importReasonStore = form.down('combo[name=importation_reason_id]').getStore(),
                rangeStore = form.down('combo[name=importexport_product_range_id]').getStore(),
                business_type_id = form.down('combo[name=business_type_id]').getValue(),
                product_classification_id = form.down('combo[name=product_classification_id]').getValue();
                rangeStore.removeAll();
                rangeStore.load({ params: { business_type_id: business_type_id, licence_type_id: newVal, product_classification_id: product_classification_id } });
                importReasonStore.removeAll();
                importReasonStore.load({ params: { business_type_id: business_type_id, licence_type_id: newVal} });
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
        }, change: function(tagfield, newValue, oldValue) {
            var form = tagfield.up('form');
            if (form) {
                var productCategoryCombo = form.down('combo[name=product_category_id]');
                if (productCategoryCombo) {
                    var productCategoryStore = productCategoryCombo.getStore();
                    var params = [];
                    Ext.each(newValue, function(value, index) {
                        params.push(value);
                    });
                    productCategoryStore.removeAll();
                    productCategoryStore.load({params: {importexport_product_range_id: JSON.stringify(params)}});
            }
            }
        }
    }
   }
   ]
   },
   {
        xtype:'fieldset',
        columnWidth: 1,
        itemId: 'vc_fieldset',
        name: 'vc_fieldset',
        title: 'VC Details',
        hidden:true,
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            columnWidth: 0.33
        },
        layout: 'column',
        items:[  { 
        xtype: 'combo',
        fieldLabel: 'VC Application Type',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'vc_application_type_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_vc_application_type',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },

   {
        xtype: 'combo',
        fieldLabel: 'Registration Level',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'is_registered',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_import_registration_level',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },

    {
        xtype: 'combo',
        fieldLabel: 'Importation/export Reason',
        name: 'importation_reason_id',
        forceSelection: true,
        allowBlank:false,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'importexportpermits/getImportationReasons'
                        
                    }
                },
                isLoad: true,
            },afterrender: function(combo) {
            var store = combo.getStore();
            store.on('load', function() {
                var form = combo.up('form');
                if(form){
                var loadedData = form.getRecord();
                if (loadedData) {
                    var fieldValue = loadedData.get('importation_reason_id');
                    if (fieldValue) {
                        combo.setValue(fieldValue);
                    }
                }
               }
            });
        },
            
        },
    }, {
        xtype: 'combo',
        fieldLabel: 'Product Category',
        name: 'product_category_id',
        forceSelection: true,
        allowBlank:false,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'importexportpermits/getImportProductRange'
                    
                    }
                },
                isLoad: false,
            }
        },
    },{
        xtype: 'textfield',
        allowBlank:false,
        name: 'proforma_invoice_no',
        fieldLabel: 'Invoice No',
    }, 
    {
        xtype: 'textfield',
        name: 'importer_licence_number',
        allowBlank:true,
        fieldLabel: 'Licence Number',
    }, 
    {
        xtype: 'datefield',
        name: 'proforma_invoice_date',
        format:'Y-m-d',
        allowBlank:false,
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Date of Proforma Invoice',
    }, {
        xtype: 'combo',
        fieldLabel: 'Applicant same consignee?',
        labelWidth: 80,
        allowBlank:false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'applicant_as_consignee',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_confirmations',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },
            change: function(cbo, value){
                    var form = cbo.up('form'),
                    consignee_name_container = form.down('fieldcontainer[name=consignee_name]'),
                    consignee_name = form.down('textfield[name=consignee_name]'),
                    link_consignee = form.down('button[name=link_consignee]');
                    if(value == 1){
                        consignee_name_container.setVisible(false);
                        consignee_name.setVisible(false);
                        link_consignee.setVisible(false)

                    }
                    else{
                        consignee_name_container.setVisible(true);
                        consignee_name.setVisible(true);
                        link_consignee.setVisible(true);
                    }


            }
        }
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        name: 'consignee_name',
        hidden: true,
        fieldLabel: 'Consignee Name',
        items: [
            {
                xtype: 'textfield',
                name: 'consignee_name',
                hidden: true,
                allowBlank: true,
                columnWidth: 0.9
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-link',
                columnWidth: 0.1,
                tooltip: 'Link Consignee',
                name: 'link_consignee',  
                hidden: true,
                handler: 'showConsigneeDetails'
            },{
                xtype: 'hiddenfield',
                allowBlank: true,
                name:'consignee_id'
            }
        ]
     }]
   },{
        xtype:'fieldset',
        columnWidth: 1,
        hidden:true,
        itemId: 'port_fieldset',
        name: 'port_fieldset',
        title: 'Details of Port of Entry',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            columnWidth: 0.33
        },
        layout: 'column',
        items:[  {  
        xtype: 'combo',
        fieldLabel: 'Supplier/Destination Country',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'entry_country_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_countries',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Shipment Mode',
        valueField: 'id',
        allowBlank:false,
        displayField: 'name',
        forceSelection: true,
        name: 'mode_oftransport_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_modesof_transport',
                                has_filter: 0
                            }
                }
            },
           isLoad: true
          },
            change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                    portStore = form.down('combo[name=port_id]').getStore(),
                    filterObj = {mode_oftransport_id: newVal},
                    filterStr = JSON.stringify(filterObj);
                    portStore.removeAll();
                    portStore.load({params: {filters: filterStr}});
            }
          }
      },{
        xtype: 'combo',
        fieldLabel: 'Port Of Entry/Exit',
        valueField: 'id',
        allowBlank:false,
        displayField: 'name',
        forceSelection: true,
        name: 'port_id',
        queryMode: 'local',
        listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getPortOfEntry',
                            extraParams: {
                                table_name: 'par_ports_information',
                                has_filter: 0
                            }
                        }
                    },
                isLoad: false
            }
        }
    }]
   },{
        xtype:'fieldset',
        columnWidth: 1,
        hidden:true,
        itemId: 'billing_person',
        name:'billing_person',
        title: 'Billing Recipient Address',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            columnWidth: 0.33
        },
        layout: 'column',
        items:[  {
                    xtype: 'hiddenfield',
                    name: 'contact_person_id'
                },
                 {
                    xtype: 'combo',
                    store: 'confirmationstr',
                    name: 'applicant_contact_person',
                    fieldLabel: 'Is Applicant The Billing Recipient',
                    valueField: 'id',
                    allowBlank:false,
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                   // value: 2,
                    listeners: { 
                        afterrender: function (cmbo) {
                            var newVal = cmbo.getValue();
                            if (newVal === null || newVal === '') {
                                cmbo.setValue(2);
                            } else {
                                cmbo.setValue(newVal);
                             }
                          },
                        change: function(cmbo,newVal){
                            var form=cmbo.up('form'),
                                fieldSet=form.down('fieldset[name=billing_person]');
                            if(newVal==1||newVal===1){
                                // Ext.each(fieldSet.query('field'), function(field) {
                                //     //field.reset();
                                //     field.setReadOnly(true);
                                // });
                                fieldSet.down('button[action=link_personnel]').setDisabled(true);
                            }else{
                                // Ext.each(fieldSet.query('field'), function(field) {
                                //     field.setReadOnly(false);
                                // });
                                fieldSet.down('button[action=link_personnel]').setDisabled(false);
                            }
                        }
                    }
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Billing Recipient',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'billing_person',
                            columnWidth: 0.9,
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-link',
                            columnWidth: 0.1,
                            tooltip: 'Link Personnel',
                            action: 'link_personnel',
                            childXtype: 'traderpersonnelgrid',
                            winWidth: '70%'
                        }
                    ]
     }]
   }
   ]
});
