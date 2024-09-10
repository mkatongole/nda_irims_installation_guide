/**
 * Created by Kip on 5/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ManSiteBlockDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'mansiteblockdetailsfrm',
    itemId:'mansiteblockdetailsfrm',
    controller: 'gmpapplicationsvctr',
    layout: {
        type: 'column'
    },
    frame: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_manufacturing_sites_blocks'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'combo',
            fieldLabel: 'Inpection Manufacturing Category',
            name: 'inspection_category_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_manufacturinginspection_category'
                            }
                        }
                    },
                    isLoad: true
                },
                  change: function(combo, newVal, oldValue, eopts) {
                     var form = combo.up('form'),
                     category_id = form.down('combo[name=special_category_id]');
                     general_manufacturing_activity_id = form.down('combo[name=general_manufacturing_activity_id]');
                     var filter_main = {'inspection_category_id':newVal};
                    var filters_main = JSON.stringify(filter_main);
                    general_manufacturing_activity_str = general_manufacturing_activity_id.getStore();
                    general_manufacturing_activity_str.removeAll();
                    general_manufacturing_activity_str.load({params:{filters:filters_main}});

                   if(newVal == 3){
                    var filter = {'inspection_category_id':newVal};
                    var filters = JSON.stringify(filter);
                    product_category_str = category_id.getStore();
                    product_category_str.removeAll();
                    product_category_str.load({params:{filters:filters}});
                    category_id.setHidden(false);
                    category_id.allowBlank = false;
                    category_id.validate();
                   }else{
                    category_id.setHidden(true);
                    category_id.allowBlank = true;

                  }
               }
           }
        }, 
        {
            xtype: 'combo',
            fieldLabel: 'General Manufacturing Activity Type',
            name: 'general_manufacturing_activity_id',
            forceSelection: true,
            allowBlank:true,
            hidden:true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_general_manufacturing_activity'
                            }
                        }
                    },
                    isLoad: false
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Product Line Category',
            name: 'special_category_id',
            forceSelection: true,
            allowBlank:true,
            hidden:true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gmpproduct_types'
                            }
                        }
                    },
                    isLoad: false
                }
            }
        },
       
        {
            xtype: 'textfield',
            fieldLabel: 'Block Name/Identity',
            name: 'name'
        },
        
    ],
    buttons: [
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            formBind: true,
            action_url: 'gmpapplications/saveGmpApplicationCommonData',
            table_name: 'tra_manufacturing_sites_blocks',
            storeID: 'productlinedetailsstr',
            store2ID: 'mansiteblockdetailsstr',
            handler: 'saveMainSiteBlock'
        }
    ]
});