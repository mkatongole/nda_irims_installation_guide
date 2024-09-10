/**
 * Created by Kip on 3/8/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.SampleCollectionSiteFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'samplecollectionsitefrm',
    layout: {
        type: 'column'
    },
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false,
        bind: {
            disabled: '{isReadOnly}'
        }
    },
    itemId: 'samplecollectionsitefrmId',
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'premise_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'main_registered_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'temporal_premise_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    columnWidth: 0.9,
                    allowBlank: false,
                    fieldLabel: 'Name'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                   // disabled: true,
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_premise',
                    childXtype: 'pmscollectionsiteselectiongrid',
                    winTitle: 'Premises Selection List',
                    winWidth: '90%',
                    margin: '30 0 0 0'
                }
            ]
        },
        {
            xtype: 'textfield',
            name: 'premise_reg_no',
            fieldLabel: 'Registration No',
            hidden: true,
            disabled: true
        },
        {
            xtype: 'textfield',
            name: 'permit_no',
            fieldLabel: 'Permit No',
            hidden: true,
            disabled: true
        },
        {
            xtype: 'textfield',
            name: 'gmp_cert_no',
            fieldLabel: 'GMP Certificate No',
            hidden: true,
            disabled: true
        },
        {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                //store: 'regionsstr',
                readOnly:false,
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setSurveillanceCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_premise_districts'
                                }
                               }
                            },
                                isLoad: false
                    },
                    afterrender: function (cmbo) {
                         var grid = cmbo.up('grid'),
                         store = cmbo.getStore(),
                         filterObj = {country_id: 37},
                         filterStr = JSON.stringify(filterObj);
                         store.removeAll();
                         store.load({params: {filters: filterStr}});
                      },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        regionStore = form.down('combo[name=region_id]').getStore(),
                        filterObj = {district_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        regionStore.removeAll();
                        regionStore.load({params: {filters: filterStr}});
                        
                    }
                },
                triggers: {
                    clear: {
                        type: 'clear',
                        hideWhenEmpty: true,
                        hideWhenMouseOut: false,
                        clearOnEscape: true
                    }
                }
            },

             {
                xtype: 'combo',
                fieldLabel: 'Region',
                name: 'region_id',
                //store: 'regionsstr',
                readOnly:false,
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setSurveillanceCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_premise_regions'
                                }
                               }
                            },
                         isLoad: false
                    }
                },
                triggers: {
                    clear: {
                        type: 'clear',
                        hideWhenEmpty: true,
                        hideWhenMouseOut: false,
                        clearOnEscape: true
                    }
                }
         },
        {
            xtype: 'textfield',
            fieldLabel: 'Street',
            name: 'street',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Telephone',
            name: 'telephone'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax',
            name: 'fax',
            hidden: true,
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            allowBlank: true,
            name: 'email'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Website',
            name: 'website',
              hidden: true,
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            name: 'physical_address'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Postal Address',
            hidden:true,
            allowBlank: true,
            name: 'postal_address'
        },

        {
                xtype: 'combo',
                name: 'business_type_id',
                fieldLabel: 'Premise Type',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: true,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                 beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_business_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
           },
        // {
        //     xtype: 'combo',
        //     fieldLabel: 'Business Scale',
        //     name: 'business_scale_id',
        //     store: 'businessscalesstr',
        //     valueField: 'id',
        //     hidden: true,
        //     displayField: 'name',
        //     allowBlank: true,
        //     queryMode: 'local',
        //     forceSelection: true,
        //     listeners:{
        //         afterrender: function(){
        //             var store=this.getStore();
        //             store.removeAll();
        //             store.load();
        //         }
        //     }
        // },
        {
            xtype: 'textfield',
            fieldLabel: 'Longitude',
            name: 'longitude',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Latitude',
            name: 'latitude',
            allowBlank: true
        },{
            xtype:'hiddenfield',
            name:'sample_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
    ]
});