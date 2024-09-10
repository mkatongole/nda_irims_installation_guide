
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.DrugsProductsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugsProductsDetailsFrm',
    itemId: 'productsDetailsFrm',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: true,
       
    }, autoScroll: true,
   
    items: [
        {
            xtype: 'hiddenfield',
            name: 'product_id'
        },{
            xtype: 'hiddenfield', 
            allowBlank: true,
            name: 'reg_product_id'
        },  {
            xtype: 'hiddenfield',
            value: 'tra_product_information',
            name: 'table_name'
        },
        // {
        //     xtype:'fieldset',
        //     columnWidth: 1,
        //     title: 'Variation Request Initialization',
        //     collapsible: true,
        //     defaults: {
        //         labelAlign: 'top',
        //         allowBlank: true,
        //         labelAlign: 'top',
        //         margin: 5,
        //         columnWidth: 0.33,
        // },
        // layout: 'column',
        // items:[{
        //     xtype: 'combo',
        //     fieldLabel: 'Variation Categories',
        //     columnWidth: 1,
        //     name: 'variation_category_id',
        //     valueField: 'id',
        //     labelAlign: 'top',
        //     displayField: 'name',
        //     forceSelection: true,
        //     allowBlank: true,
        //     queryMode: 'local',
        //     listeners: {
        //         beforerender: {
        //             fn: 'setConfigCombosStore',
        //             config: {
        //                 pageSize: 1000,
        //                 storeId:'variationcategoriesdetailsstr', 
        //                 proxy: {
        //                     url: 'commonparam/getCommonParamFromTable',
        //                     extraParams:{
        //                         table_name: 'par_variation_categories'
        //                     }
        //                 }
        //             },
        //             isLoad: true
        //         },  change: function (cmbo, newVal) {
        //             var form = cmbo.up('form'),
        //             variation_subcategorystr = form.down('combo[name=variation_subcategory_id]').getStore();
        //             variation_subcategorystr.removeAll();
        //             filters=JSON.stringify({variation_category_id: newVal});
    
        //             variation_subcategorystr.removeAll();
        //             variation_subcategorystr.load({ params: { filters: filters} });
                    
        //         }
        //     }
        //     },{
        //         xtype: 'combo',
        //         columnWidth: 1,
        //         fieldLabel: 'Variation Sub-Categories',
        //         name: 'variation_subcategory_id',
        //         valueField: 'id',
        //         displayField: 'name',
        //         forceSelection: true,
        //         allowBlank: true,
        //         labelAlign: 'top',
        //         queryMode: 'local',
        //         listeners: {
        //             beforerender: {
        //                 fn: 'setConfigCombosStore',
        //                 config: {
        //                     pageSize: 1000,
                            
        //                     storeId:'variationsubcategoriesstr', 
        //                     proxy: {
        //                         url: 'commonparam/getCommonParamFromTable',
        //                         extraParams:{
        //                             table_name: 'par_variation_subcategories'
        //                         }
        //                     }
        //                 },
        //                 isLoad: false
        //             }, change: function (cmbo, newVal) {
        //                 var form = cmbo.up('form'),
        //                 variation_descriptionstr = form.down('combo[name=variation_description_id]').getStore();
        //                 variation_descriptionstr.removeAll();
        
        //                 filters=JSON.stringify({variation_subcategory_id: newVal});
        
        //                 variation_descriptionstr.load({ params: { filters: filters} });
        
        //             }
        //         }
        //     }, {
        //         xtype: 'combo',
        //         columnWidth: 1,
        //         fieldLabel: 'Variation Description',
        //         name: 'variation_description_id',
        //         valueField: 'id',
        //         displayField: 'name',
        //         forceSelection: true,
        //         allowBlank: true,
        //         labelAlign: 'top',
        //         queryMode: 'local',
        //         listeners: {
        //             beforerender: {
        //                 fn: 'setConfigCombosStore',
        //                 config: {
        //                     pageSize: 1000,
        //                     storeId:'variationdescriptiondetailsstr', 
        //                     proxy: {
        //                         url: 'commonparam/getCommonParamFromTable',
        //                         extraParams:{
        //                             table_name: 'par_variation_description'
        //                         }
        //                     }
        //                 },
        //                 isLoad: false
        //             }, change: function (cmbo, newVal) {
        //                 var form = cmbo.up('form'),
        //                 variation_subdescriptionstr = form.down('combo[name=variation_subdescription_id]').getStore();
        //                 variation_subdescriptionstr.removeAll();
        
        //                 filters=JSON.stringify({variation_description_id: newVal});
        //                 variation_subdescriptionstr.load({ params: { filters: filters} });

        //                 var variation_description_id=form.down('combo[name=variation_description_id]').getValue(),
        //                 variation_subcategory_id=form.down('combo[name=variation_subcategory_id]').getValue(),
        //                 variation_category_id=form.down('combo[name=variation_category_id]').getValue(),
        //                 variation_reportingtypestr = form.down('combo[name=variation_reportingtype_id]').getStore();
        //                 variation_reportingtypestr.removeAll();
        
        //                 filters=JSON.stringify({variation_subcategory_id: variation_subcategory_id,
        //                     variation_category_id: variation_category_id,variation_description_id: newVal});
        
        //                 variation_reportingtypestr.load({ params: { filters: filters} });

        //             }
        //         }
        //     },

        //     {
        //         xtype: 'combo',
        //         columnWidth: 1,
        //         fieldLabel: 'Variation Sub-Description',
        //         name: 'variation_subdescription_id',
        //         valueField: 'id',
        //         displayField: 'name',
        //         forceSelection: true,
        //         allowBlank: true,
        //         labelAlign: 'top',
        //         queryMode: 'local',
        //         listeners: {
        //             beforerender: {
        //                 fn: 'setConfigCombosStore',
        //                 config: {
        //                     pageSize: 1000,
        //                     storeId:'variationsubdescriptiondetailsstr', 
        //                     proxy: {
        //                         url: 'commonparam/getCommonParamFromTable',
        //                         extraParams:{
        //                             table_name: 'par_variation_subdescription'
        //                         }
        //                     }
        //                 },
        //                 isLoad: false
        //             }, change: function (cmbo, newVal) {
        //                 var form = cmbo.up('form'),
        //                 variation_description_id=form.down('combo[name=variation_description_id]').getValue(),
        //                 variation_subcategory_id=form.down('combo[name=variation_subcategory_id]').getValue(),
        //                 variation_category_id=form.down('combo[name=variation_category_id]').getValue(),
        //                 variation_reportingtypestr = form.down('combo[name=variation_reportingtype_id]').getStore();
        //                 variation_reportingtypestr.removeAll();
        
        //                 filters=JSON.stringify({variation_subdescription_id: newVal,variation_subcategory_id: variation_subcategory_id,
        //                     variation_category_id: variation_category_id,variation_description_id: variation_description_id});
        
        //                 variation_reportingtypestr.load({ params: { filters: filters} });
        //              }
        //         }
        //     },{
        //     xtype: 'combo',
        //     columnWidth: 1,
        //     fieldLabel: 'Variation Category/Type',
        //     name: 'variation_reportingtype_id',
        //     valueField: 'id',
        //     displayField: 'name',
        //     forceSelection: true,
        //     allowBlank: true,
        //     queryMode: 'local',
        //     listeners: {
        //         beforerender: {
        //             fn: 'setConfigCombosStore',
        //             config: {
        //                 pageSize: 1000,
        //                 proxy: {
        //                     url: 'commonparam/getCommonParamFromTable',
        //                     extraParams:{
        //                         table_name: 'par_variation_reportingtypes'
        //                     }
        //                 }
        //             },
        //             isLoad: false
        //         }
        //     }
        //    }]
        //  },
         {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Product Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: true,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[{
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, 
            {
            xtype: 'combo',
            fieldLabel: 'Assessment Procedure',
            name: 'assessmentprocedure_type_id',
            forceSelection: true,
            queryMode: 'local',
            allowBlank:true,
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
                                table_name: 'par_assessmentprocedure_types'
                         }
                    }
                },
                isLoad: true
                }
            }, bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            },
            {
            xtype: 'combo',
            fieldLabel: 'Certification Status',
            name: 'assessment_procedure_id',
            forceSelection: true,
            queryMode: 'local',
            allowBlank:true,
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
                                table_name: 'par_assessment_procedures'
                         }
                    }
                },
                isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
          } ,
                
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
                    fn: 'setConfigCombosSectionfilterStore',
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        },{
            xtype: 'textfield',
            name: 'brand_name',
            allowBlank:true,
            fieldLabel: 'Proprietary Name', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
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
                        form.down('textfield[name=atc_code_description]').setValue(description);
                    }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype:'textfield',
            name:'atc_code_description',
            fieldLabel:'ATC Description',
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'tagfield',
            fieldLabel: 'Route of Administration',
            name: 'route_of_administration_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            //emptyText: 'Route of Administration',
            growMax: 100,
            columnWidth: 0.99,
            multiSelect: true,
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
                                table_name: 'par_route_of_administration'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

        {
            xtype: 'textfield',
            name: 'use_period',
            hidden:true,
            allowBlank:true,
            fieldLabel: 'How long has this medicine been in use'

        },  
        {
            xtype: 'combo',
            fieldLabel: 'Part of the Plant or Preparation',
            name: 'plant_part_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank:true,
            hidden:true,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_plantspart_type'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, 
        {
            xtype: 'combo',
            fieldLabel: 'Proposed storage condition(°C)',
            name: 'storage_condition',
            forceSelection: true,
            allowBlank:true,
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
                                table_name: 'par_storage_conditions'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Proposed storage conditions after first opening(°C)',
            name: 'storage_conditionafter_opening',
            forceSelection: true,
            allowBlank:true,
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
                                table_name: 'par_storage_conditions'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

      
        {
            xtype: 'numberfield',
            fieldLabel: 'Proposed Shelf Life(Months)',
            name: 'shelf_life', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Proposed shelf life (after first opening container days)',
            allowBlank:true,
            name: 'shelf_lifeafter_opening', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

         {
            xtype: 'numberfield',
            fieldLabel: 'Proposed shelf life (after reconstitution or dilution days)',
            allowBlank:true,
            name: 'shelf_lifeafter_dilution', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

         {
            xtype: 'combo',
            fieldLabel: 'Product Origin',
            name: 'product_origin_id',
            forceSelection: true,
            columnWidth: 0.99,
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
                                table_name: 'par_product_origins'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        }, 

        {
            xtype: 'tagfield',
            fieldLabel: 'Product Manufacturing Country',
            name: 'manufacturing_country_id',
            allowBlank: true,
            columnWidth: 0.99,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            //emptyText: 'Product Manufacturing Country',
            growMax: 100,
            multiSelect: true,
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
                                table_name: 'par_countries'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

        {
            xtype: 'textarea',
            name: 'intended_use', 
            columnWidth: 0.99,
            hidden:true,
            allowBlank: true,
            fieldLabel: 'Indication for use as given on the pack/literature/Manufacturers instructions)', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype: 'textarea',
            name: 'instructions_of_use', 
            columnWidth: 0.99,
            allowBlank: true,
            hidden:true,
            fieldLabel: 'Instructions of use / administration', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

        {
            xtype: 'textarea',
            name: 'adverse_effects', 
            columnWidth: 0.99,
            allowBlank: true,
            hidden:true,
            fieldLabel: 'Major side/Adverse effects', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

        {
            xtype: 'textarea',
            name: 'indication', 
            columnWidth: 0.99,
            allowBlank: true,
            fieldLabel: 'Indication', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype: 'textarea',
            name: 'physical_description',
            allowBlank: true,
            columnWidth: 0.99,
            fieldLabel: 'Visual description', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        
        ]
      }
    ]
});