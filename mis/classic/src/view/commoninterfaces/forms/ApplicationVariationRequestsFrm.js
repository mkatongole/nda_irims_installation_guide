/**
 * Created by Softclans on 5/23/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationVariationRequestsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationvariationrequestsfrm',
    controller: 'commoninterfacesVctr',
    layout: 'column',
    scrollable: true,
    bodyPadding: 5,
    frame: true,
    defaults: {
        columnWidth: 1,
        labelAlign: 'top',
        margin: 3
    },
    items: [
        {
            xtype: 'hidden',
            name: 'id'
        },
        {
            xtype: 'hidden',
            name: 'application_code'
        },
        {
            xtype: 'hidden',
            name: 'module_id'
        },
        {
            xtype: 'hidden',
            name: 'section_id'
        },
        {
            xtype: 'hidden',
            name: 'table_name',
            value: 'tra_application_variationsdata'
        },
        {
            xtype: 'hidden',
            name: '_token',
            value: token
        },
        {
            xtype: 'hidden',
            name: 'unset_data',
            value: 'module_id,section_id'
        },

      //   {
      //       xtype: 'combo',
      //       fieldLabel: 'Variation Categories',
      //      // margin: '0 20 20 0',
      //       //columnWidth: 0.99,
      //       name: 'variation_category_id',
      //       valueField: 'id',
      //       labelAlign: 'top',
      //       displayField: 'name',
      //       forceSelection: true,
      //       allowBlank: true,
      //       queryMode: 'local',
      //       listeners: {
      //           beforerender: {
      //               fn: 'setConfigCombosStore',
      //               config: {
      //                   pageSize: 1000,
      //                   storeId:'variationcategoriesdetailsstr', 
      //                   proxy: {
      //                       url: 'commonparam/getCommonParamFromTable',
      //                       extraParams:{
      //                           table_name: 'par_variation_categories'
      //                       }
      //                   }
      //               },
      //               isLoad: true
      //           },  change: function (cmbo, newVal) {
      //               var form = cmbo.up('form'),
      //               variation_subcategorystr = form.down('combo[name=variation_subcategory_id]').getStore();
      //               variation_subcategorystr.removeAll();
      //               filters=JSON.stringify({variation_category_id: newVal});
    
      //               variation_subcategorystr.removeAll();
      //               variation_subcategorystr.load({ params: { filters: filters} });
                    
      //           }
      //       }
      //   },{
      //       xtype: 'combo',
      //       fieldLabel: 'Variation Sub-Categories',
      //       //margin: '0 20 20 0',
      //       name: 'variation_subcategory_id',
      //       valueField: 'id',
      //       //columnWidth: 0.99,
      //       displayField: 'name',
      //       forceSelection: true,
      //       allowBlank: true,
      //       labelAlign: 'top',
      //       queryMode: 'local',
      //       listeners: {
      //           beforerender: {
      //               fn: 'setConfigCombosStore',
      //               config: {
      //                   pageSize: 1000,
                        
      //                   storeId:'variationsubcategoriesstr', 
      //                   proxy: {
      //                       url: 'commonparam/getCommonParamFromTable',
      //                       extraParams:{
      //                           table_name: 'par_variation_subcategories'
      //                       }
      //                   }
      //               },
      //               isLoad: false
      //           }, change: function (cmbo, newVal) {
      //               var form = cmbo.up('form'),
      //               variation_descriptionstr = form.down('combo[name=variation_description_id]').getStore();
      //               variation_descriptionstr.removeAll();
    
      //               filters=JSON.stringify({variation_subcategory_id: newVal});
    
      //               variation_descriptionstr.load({ params: { filters: filters} });
    
      //           }
      //       }
      //   }, {
      //       xtype: 'combo',
      //       fieldLabel: 'Variation Description',
      //       //margin: '0 20 20 0',
      //       //columnWidth: 0.99,
      //       name: 'variation_description_id',
      //       valueField: 'id',
      //       displayField: 'name',
      //       forceSelection: true,
      //       allowBlank: true,
      //       labelAlign: 'top',
      //       queryMode: 'local',
      //       listeners: {
      //           beforerender: {
      //               fn: 'setConfigCombosStore',
      //               config: {
      //                   pageSize: 1000,
      //                   storeId:'variationdescriptiondetailsstr', 
      //                   proxy: {
      //                       url: 'commonparam/getCommonParamFromTable',
      //                       extraParams:{
      //                           table_name: 'par_variation_description'
      //                       }
      //                   }
      //               },
      //               isLoad: false
      //           }, change: function (cmbo, newVal) {
      //               var form = cmbo.up('form'),
      //               variation_subdescriptionstr = form.down('combo[name=variation_subdescription_id]').getStore();
      //               variation_subdescriptionstr.removeAll();
    
      //               filters=JSON.stringify({variation_description_id: newVal});
      //               variation_subdescriptionstr.load({ params: { filters: filters} });

      //               var variation_description_id=form.down('combo[name=variation_description_id]').getValue(),
      //               variation_subcategory_id=form.down('combo[name=variation_subcategory_id]').getValue(),
      //               variation_category_id=form.down('combo[name=variation_category_id]').getValue(),
      //               variation_reportingtypestr = form.down('combo[name=variation_reportingtype_id]').getStore();
      //               variation_reportingtypestr.removeAll();
    
      //               filters=JSON.stringify({variation_subcategory_id: variation_subcategory_id,
      //                   variation_category_id: variation_category_id,variation_description_id: newVal});
    
      //               variation_reportingtypestr.load({ params: { filters: filters} });

      //           }
      //       }
      //   },

      //   {
      //       xtype: 'combo',
      //       fieldLabel: 'Variation Sub-Description',
      //       //margin: '0 20 20 0',
      //       //columnWidth: 0.99,
      //       name: 'variation_subdescription_id',
      //       valueField: 'id',
      //       displayField: 'name',
      //       forceSelection: true,
      //       allowBlank: true,
      //       labelAlign: 'top',
      //       queryMode: 'local',
      //       listeners: {
      //           beforerender: {
      //               fn: 'setConfigCombosStore',
      //               config: {
      //                   pageSize: 1000,
      //                   storeId:'variationsubdescriptiondetailsstr', 
      //                   proxy: {
      //                       url: 'commonparam/getCommonParamFromTable',
      //                       extraParams:{
      //                           table_name: 'par_variation_subdescription'
      //                       }
      //                   }
      //               },
      //               isLoad: false
      //           }, change: function (cmbo, newVal) {
      //               var form = cmbo.up('form'),
      //               variation_description_id=form.down('combo[name=variation_description_id]').getValue(),
      //               variation_subcategory_id=form.down('combo[name=variation_subcategory_id]').getValue(),
      //               variation_category_id=form.down('combo[name=variation_category_id]').getValue(),
      //               variation_reportingtypestr = form.down('combo[name=variation_reportingtype_id]').getStore();
      //               variation_reportingtypestr.removeAll();
    
      //               filters=JSON.stringify({variation_subdescription_id: newVal,variation_subcategory_id: variation_subcategory_id,
      //                   variation_category_id: variation_category_id,variation_description_id: variation_description_id});
    
      //               variation_reportingtypestr.load({ params: { filters: filters} });
      //            }
      //       }
      //   },{
      //   xtype: 'combo',
      //   fieldLabel: 'Variation Category/Type',
      //   name: 'variation_reportingtype_id',
      //   valueField: 'id',
      //   displayField: 'name',
      //   forceSelection: true,
      //   allowBlank: true,
      //   queryMode: 'local',
      //   listeners: {
      //       beforerender: {
      //           fn: 'setConfigCombosStore',
      //           config: {
      //               pageSize: 1000,
      //               proxy: {
      //                   url: 'commonparam/getCommonParamFromTable',
      //                   extraParams:{
      //                       table_name: 'par_variation_reportingtypes'
      //                   }
      //               }
      //           },
      //           isLoad: false
      //       }
      //   }
      // },
       
        {
            xtype: 'combo',
            fieldLabel: 'Variation Category',
            name: 'variation_category_id',
            allowBlank: true,
            queryMode: 'local',
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_variations_categories'
                            }
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var store = this.getStore(),
                        form = this.up('form'),
                        module_id = form.down('hiddenfield[name=module_id]').getValue(),
                        section_id = form.down('hiddenfield[name=section_id]').getValue(),
                        filterObj = {module_id: module_id, section_id: section_id},
                        filterStr = JSON.stringify(filterObj);
                    store.removeAll();
                    store.load({params: {filters: filterStr}});
                },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        store = cmbo.getStore(),
                        record = store.getById(newVal),
                        variation_type = form.down('combo[name=variation_type_id]');
                    if (record) {
                        variation_type.setValue(record.get('variation_type_id'));
                    }
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Variation Type',
            name: 'variation_type_id',
            queryMode: 'local',
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_typeof_variations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textarea',
            name: 'present_details',
            allowBlank: true,
            grow: true, 
            growMax: 200, 
            fieldLabel: 'Present Details'
        }, {
            xtype: 'textarea',
            name: 'proposed_variation',
            grow: true, 
            growMax: 200, 
            fieldLabel: 'Proposed Variation/AMENDMENT',
            allowBlank: false
        }, {
            xtype: 'textarea',
            name: 'variation_background_information',
            fieldLabel: 'REASONS FOR AMENDMENT/Variation Background Information'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            formBind: true,
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            handler: 'doCreateCommonParamWin',
            action_url: 'api/saveCommonData',
            table_name: 'tra_application_variationsdata',
            storeID: 'variationrequestsabstractstr',
        }
    ]
});