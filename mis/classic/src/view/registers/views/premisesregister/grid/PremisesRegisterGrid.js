Ext.define('Admin.view.registers.views.premisesregister.grid.PremisesRegisterGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registerctr',
    xtype: 'premisesregistergrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
    deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 25,
                storeId: 'premiseregistergridstr', remoteFilter:true,
                proxy: {
                    url: 'registers/getPremiseRegister',
                      reader: {
                         type: 'json',
                         rootProperty: 'results',
                         totalProperty: 'totalResults'
                        }
                    }
            },
            isLoad: true
                      }
        },
         plugins: [{
            ptype: 'filterfield'
        }],
    columns: [{
        text: 'Business Type',
        sortable: false,
        width: 150,
        dataIndex: 'business_type',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference No',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        name: 'certificate_no',
        text: 'Premise Number',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        name: 'name',
        text: 'Premise Name',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        name: 'physical_address',
        text: 'Premise Physical Address',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },{
    xtype: 'gridcolumn',
    dataIndex: 'region_name',
    name: 'region_name',
    text: 'Premise Region',
    width: 200, 
    filter: {
        xtype: 'combobox',
        queryMode: 'local',
        displayField: 'name',
        valueField: 'name',
        name: 'id',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_premise_regions'
                        }
                    }
                },
                isLoad: true
            },
                change: function(combo, newValue, oldValue) {
                    var grid = combo.up('grid');  
                    var store = grid.getStore();
                    store.clearFilter(); // Clear existing filters
                    if (newValue) {
                        store.addFilter({
                            property: 'region_name',
                            value: newValue,
                            exactMatch: true // Ensure an exact match
                        });
                    }
                }       
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email',
        name: 'email',
        hidden:true,
        text: 'Premise Email',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'Trader',
        name: 'Trader',
        text: 'Trader',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderPhysicalA',
        name: 'TraderPhysicalA',
        text: 'Trader Physical Address',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderEmail',
        name: 'TraderEmail',
        text: 'Trader Email',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderCountry',
        name: 'TraderCountry',
        text: 'Trader Country',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'datecolumn',
        dataIndex: 'CertIssueDate',
        name: 'CertIssueDate',
         format: 'Y-m-d',
        text: 'Certificate Issue Date',
        width: 250, 
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    }, {
        xtype: 'datecolumn',
        dataIndex: 'CertExpiryDate',
        name: 'CertExpiryDate',
         format: 'Y-m-d',
        text: 'Certificate Expiry Date',
        width: 250,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    },
      {
        xtype: 'gridcolumn',
        dataIndex: 'registration_status',
        name: 'registration_status',
        text: 'Registration Status',
        width: 250, 
       filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'registration_status',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_registration_statuses'
                                    }
                                }
                            },
                           isLoad: true
                        },
                                   
                        change: function(combo, newValue, oldValue) {
                            var grid = combo.up('grid');  
                            var store = grid.getStore();
                            store.clearFilter(); // Clear existing filters
                            if (newValue) {
                                store.addFilter({
                                property: 'registration_status',
                                value: newValue,
                                exactMatch: true // Ensure an exact match
                                });
                            }
                        } 
                 }                
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'validity_status',
        name: 'validity_status',
        text: 'validity Status',
        width: 250,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    name: 'validity_status',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_validity_statuses'
                                    }
                                }
                            },
                           isLoad: true
                        },
                                   
                     
                        change: function(combo, newValue, oldValue) {
                            var grid = combo.up('grid');  
                            var store = grid.getStore();
                            store.clearFilter(); // Clear existing filters
                            if (newValue) {
                                store.addFilter({
                                property: 'validity_status',
                                value: newValue,
                                exactMatch: true // Ensure an exact match
                                });
                            }
                        } 
                 }                
            }
     }, 
    
    ],
         bbar: [


         {
                          xtype: 'pagingtoolbar',
                          width: '100%',
                          displayInfo: true,
                          displayMsg: 'Showing {0} - {1} out of {2}',
                          emptyMsg: 'No Records',


                          //filter
                            beforeLoad: function () {
                                      var store = this.getStore(),
                                      range = this.down('combo[name=Range]').getValue();
                                       var store=this.getStore();
                                       var grid=this.up('grid'),
                                        panel = grid.up('panel'),
                                        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
                                        product_classification_id=panel.down('combo[name=product_classification_id]').getValue(),
                                        business_type_details=panel.down('combo[name=business_type_details]').getValue();  
                                        approved_from = panel.down('datefield[name=approved_from]').getValue(),
                                        approved_to = panel.down('datefield[name=approved_to]').getValue();

                                        module_id=panel.down('hiddenfield[name=module_id]').getValue();
                                        

                                  
                                  store.getProxy().extraParams = {
                                      limit:range,
                                      sub_module_id:sub_module_id,
                                      product_classification_id:product_classification_id,
                                      module_id: module_id,
                                      business_type_details: business_type_details,
                                      approved_from: approved_from,
                                      approved_to: approved_to
                                     
                                            };
                                           
                                    },



                              items:[{
                                   xtype: 'combobox',
                                   forceSelection: true,
                                   fieldLabel: 'Range',
                                   displayField: 'size',
                                   valueField: 'size',
                                   name: 'Range',
                                   queryMode: 'local',
                                   value: 25,
                                   listeners:{
                                      afterrender: {//getConfigParamFromTable
                                               fn: 'setConfigCombosStore',
                                              config: {
                                                  proxy: {
                                                      url: 'commonparam/getCommonParamFromTable',
                                                      extraParams: {
                                                          table_name: 'par_page_sizes'
                                                      }
                                                  }
                                              },
                                              isLoad: true
                                          },
                                      select: 'setPageSize'
                                     }
                              }]                  
                      }
                      ]
    
});
