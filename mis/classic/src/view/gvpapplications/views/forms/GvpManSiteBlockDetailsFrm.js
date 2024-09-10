/**
 * Created by Kip on 5/7/2019.
 */
Ext.define('Admin.view.gvpapplications.views.forms.GvpManSiteBlockDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gvpmansiteblockdetailsfrm',
    itemId:'gvpmansiteblockdetailsfrm',
    controller: 'gvpapplicationsvctr',
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
                    fn: 'setGvpApplicationCombosStore',
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
                    fn: 'setGvpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gvpproduct_types'
                            }
                        }
                    },
                    isLoad: false
                }
            }
        },

        // {
        //     xtype: 'combo',
        //     fieldLabel: 'Inpection Manufacturing Activities',
        //     name: 'inspection_activities_id',
        //     forceSelection: true,
        //     queryMode: 'local',
        //     displayField: 'name',
        //     valueField: 'id',
        //     listeners: {
        //         beforerender: {
        //             fn: 'setGvpApplicationCombosStore',
        //             config: {
        //                 pageSize: 10000,
        //                 proxy: {
        //                     url: 'commonparam/getCommonParamFromTable',
        //                     extraParams: {
        //                         table_name: 'par_gvpinspection_activities'
        //                     }
        //                 }
        //             },
        //             isLoad: true
        //         },

        //          change: function(combo, newVal, oldValue, eopts) {
        //                 if(newVal == 2){
        //                     var form = combo.up('form'),
        //                     approved = form.down('combo[name=nda_approved_id]');
        //                     approved.setHidden(false);
        //                     approved.allowBlank = false;
        //                     approved.validate();

        //                     site_permit = form.down('fieldcontainer[name=site_permit]');
        //                     site_permit.setHidden(true);

        //                     site_name = form.down('fieldcontainer[name=site_name]');
        //                     site_name.setHidden(true);
                        

        //                     search_site_name = form.down('button[name=search_site_name]');
        //                     search_site_name.setHidden(false);
        //                     search_site_name.setDisabled(true);

        //                     permit_no = form.down('textfield[name=permit_no]');
        //                     permit_no.setHidden(true);
        //                     permit_no.setReadOnly(true);
        //                     permit_no.allowBlank = true;
        //                     permit_no.validate();


        //                     country_id = form.down('combo[name=country_id]');
        //                     country_id.setHidden(true);
        //                     country_id.setReadOnly(true);
        //                     country_id.allowBlank = true;
        //                     country_id.validate();

        //                     physical_address = form.down('textfield[name=physical_address]');
        //                     physical_address.setHidden(true);
        //                     physical_address.setReadOnly(true);
        //                     physical_address.allowBlank = true;
        //                     physical_address.validate();

        //                 }else if(newVal == 3){
        //                     var form = combo.up('form'),
        //                     approved = form.down('combo[name=nda_approved_id]');
        //                     approved.setHidden(true);
        //                     approved.allowBlank = false;

        //                     permit_no = form.down('textfield[name=permit_no]');
        //                     permit_no.setHidden(true);
        //                     permit_no.setReadOnly(true);
        //                     permit_no.allowBlank = true;
        //                     permit_no.validate();
                

        //                     site_name = form.down('fieldcontainer[name=site_name]');
        //                     site_name.setHidden(false);


        //                     site_permit = form.down('fieldcontainer[name=site_permit]');
        //                     site_permit.setHidden(true);
                        

        //                     search_site_name = form.down('button[name=search_site_name]');
        //                     search_site_name.setHidden(false);
        //                     search_site_name.setDisabled(true);
                            
                    

        //                     country_id = form.down('combo[name=country_id]');
        //                     country_id.setHidden(false);
        //                     country_id.setReadOnly(false);
        //                     country_id.allowBlank = false;
        //                     country_id.validate();

        //                     physical_address = form.down('textfield[name=physical_address]');
        //                     physical_address.setHidden(false);
        //                     physical_address.setReadOnly(false);
        //                     physical_address.allowBlank = false;
        //                     physical_address.validate();



        //                 }else{
        //                     var form = combo.up('form'),
        //                     approved = form.down('combo[name=nda_approved_id]');
        //                     approved.setVisible(false);
        //                     approved.allowBlank = true;
        //                     approved.validate();

        //                     site_name = form.down('fieldcontainer[name=site_name]');
        //                     site_name.setHidden(true);
                        

        //                     search_site_name = form.down('button[name=search_site_name]');
        //                     search_site_name.setHidden(false);
        //                     search_site_name.setDisabled(true);


        //                     permit_no = form.down('textfield[name=permit_no]');
        //                     permit_no.setHidden(true);
        //                     permit_no.setReadOnly(true);
        //                     permit_no.allowBlank = true;
        //                     permit_no.validate();


                            
        //                     site_name2 = form.down('textfield[name=site_name]');
        //                     site_name2.setHidden(true);
        //                     site_name2.setReadOnly(true);
        //                     site_name2.allowBlank = true;
        //                     site_name2.validate();

        //                     country_id = form.down('combo[name=country_id]');
        //                     country_id.setHidden(true);
        //                     country_id.setReadOnly(true);
        //                     country_id.allowBlank = true;
        //                     country_id.validate();

        //                     physical_address = form.down('textfield[name=physical_address]');
        //                     physical_address.setHidden(true);
        //                     physical_address.setReadOnly(true);
        //                     physical_address.allowBlank = true;
        //                     physical_address.validate();
        //                 }
                        
        //             }
                   
        //         }
        //     },{
        //         xtype: 'combo',
        //         fieldLabel: 'Are the Other Site Approved by NDA',
        //         name: 'nda_approved_id',
        //         columnWidth: 1,
        //         allowBlank: false,
        //         hidden:true,
        //         valueField: 'id',
        //         displayField: 'name',
        //         forceSelection: true,
        //         queryMode: 'local',
        //         emptyText: 'Select',
        //         listeners: {
        //             beforerender: {
        //                 fn: 'setConfigCombosStore',
        //                 config: {
        //                     pageSize: 1000,
        //                     proxy: {
        //                         url: 'commonparam/getCommonParamFromTable',
        //                         extraParams: {
        //                             table_name: 'par_confirmations'
        //                         }
        //                     }
        //                 },
        //                 isLoad: true
        //             },
        //             change: function(combo, newVal, oldValue, eopts) {
        //                 if(newVal == 1){
        //                     var form = combo.up('form'),
        //                     site_permit = form.down('fieldcontainer[name=site_permit]');
        //                     site_permit.setVisible(true);
        //                     form.down('button[name=search_site]').setDisabled(false);
        //                     site_permit.allowBlank = false;
        //                     //site_permit.validate();


        //                     site_name = form.down('fieldcontainer[name=site_name]');
        //                     site_name.setHidden(false);
        //                     //site_name.validate();

        //                     search_site_name = form.down('button[name=search_site_name]');
        //                     search_site_name.setVisible(true);
        //                     search_site_name.setDisabled(true);
        //                     //search_site_name.validate();

        //                     country_id = form.down('combo[name=country_id]');
        //                     country_id.setHidden(false);
        //                     country_id.setReadOnly(false);
        //                     country_id.allowBlank = false;
        //                     country_id.validate();

        //                     physical_address = form.down('textfield[name=physical_address]');
        //                     physical_address.setHidden(false);
        //                     physical_address.setReadOnly(false);
        //                     physical_address.allowBlank = false;
        //                     physical_address.validate();

        //                 }else{
        //                     var form = combo.up('form'),
        //                     site_permit = form.down('fieldcontainer[name=site_permit]');
        //                     site_permit.setVisible(false);
        //                     site_permit.allowBlank = true;
        //                     //site_permit.validate();

        //                     site_permit = form.down('fieldcontainer[name=site_permit]');
        //                     site_permit.setHidden(true);

        //                     site_name = form.down('fieldcontainer[name=site_name]');
        //                     site_name.setHidden(false);
                        

        //                     search_site_name = form.down('button[name=search_site_name]');
        //                     search_site_name.setHidden(false);
        //                     search_site_name.setDisabled(true);

        //                     permit_no = form.down('textfield[name=permit_no]');
        //                     permit_no.setHidden(true);
        //                     permit_no.setReadOnly(true);
        //                     permit_no.allowBlank = true;
        //                     permit_no.validate();
                            
                    

        //                     country_id = form.down('combo[name=country_id]');
        //                     country_id.setHidden(false);
        //                     country_id.setReadOnly(true);
        //                     country_id.allowBlank = true;
        //                     country_id.validate();

        //                     physical_address = form.down('textfield[name=physical_address]');
        //                     physical_address.setHidden(false);
        //                     physical_address.setReadOnly(false);
        //                     physical_address.allowBlank = true;
        //                     physical_address.validate();
        //                 }
                        
        //             }
                   
        //         }
        //      },
        //       {
        //             xtype: 'fieldcontainer',
        //             layout: 'column',
        //             defaults: {
        //                 labelAlign: 'top'
        //             },
        //             name:'site_permit',
        //             hidden:true,
        //             fieldLabel: 'Permit No',
        //             items: [
        //                 {
        //                     xtype: 'textfield',
        //                     name: 'permit_no',
        //                     columnWidth: 0.9
        //                 },
        //                 {
        //                     xtype: 'button',
        //                     iconCls: 'x-fa fa-search',
        //                     columnWidth: 0.1,
        //                     tooltip: 'Search',
        //                     name: 'search_site',
        //                     childXtype: 'gvpsitesselectiongrid',
        //                     winTitle: 'Manufacturing Sites Selection List',
        //                     winWidth: '90%',
        //                     stores: '[]'
        //                 }
        //             ]
        //         },
        //      {
        //             xtype: 'fieldcontainer',
        //             layout: 'column',
        //             defaults: {
        //                 labelAlign: 'top'
        //             },
        //             name:'site_name',
        //             hidden:true,
        //             fieldLabel: 'Site name',
        //             items: [
        //                 {
        //                     xtype: 'textfield',
        //                     name: 'site_name',
        //                     columnWidth: 0.9
        //                 },
        //                 {
        //                     xtype: 'button',
        //                     iconCls: 'x-fa fa-search',
        //                     columnWidth: 0.1,
        //                     tooltip: 'Search',
        //                     name: 'search_site_name',
        //                     childXtype: 'gvpsitesselectiongrid',
        //                     winTitle: 'Manufacturing Sites Selection List',
        //                     winWidth: '90%',
        //                     stores: '[]'
        //                 }
        //             ]
        //         },
        //      {
        //             xtype: 'combo',
        //             fieldLabel: 'Country',
        //             name: 'country_id',
        //             allowBlank:true,
        //             hidden:true,
        //             forceSelection: true,
        //             queryMode: 'local',
        //             valueField: 'id',
        //             displayField: 'name',
        //             listeners: {
        //                 beforerender: {
        //                     fn: 'setParamCombosStore',
        //                     config: {
        //                         pageSize: 10000,
        //                         proxy: {
        //                             url: 'parameters/country'
        //                         }
        //                     },
        //                     isLoad: true
        //                 }
        //             }
        // },{
        //     xtype: 'textfield',
        //     name: 'physical_address',
        //     hidden:true,
        //     fieldLabel: 'Physical Address of Site',
        //     readOnly: true
        // }, 
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
            action_url: 'gvpapplications/saveGvpApplicationCommonData',
            table_name: 'tra_manufacturing_sites_blocks',
            storeID: 'productlinedetailsstr',
            store2ID: 'mansiteblockdetailsstr',
            handler: 'saveMainSiteBlock'
        }
    ]
});