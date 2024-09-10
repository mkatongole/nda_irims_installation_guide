/**
 * Created by Kip on 11/9/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.forms.DrugShopInspectorNearestDrugShopFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugshopinspectornearestdrugshopFrm',
    itemId: 'drugshopinspectornearestdrugshopfrm',
    scrollable:'true',
    controller: 'premiseregistrationvctr',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 4,
        allowBlank: false,
        columnWidth: 0.5,
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.query('.button').forEach(function (c) {
                    c.setHidden(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },{
            xtype: 'hiddenfield',
            name: 'premise_id'
        },{
            xtype: 'hiddenfield',
            name: 'main_premise_id'
        },{
        xtype: 'hiddenfield',
        name: 'is_local',
        value: 1
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_inspectordrugshop_storelocation'
        },
        {
            xtype: 'hiddenfield',
            name: 'country_id',
            value: 37
        },
        //  {
        //     xtype: 'textfield',
        //     name: 'name', 
        //      fieldLabel: 'Drug Shop Name',
        // },
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
                    readOnly:true,
                    allowBlank: false,
                    fieldLabel: 'Drug Shop Name'
            },
             {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    disabled: false,
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_premise',
                    childXtype: 'newdrugshopselectiongrid',
                    winTitle: 'Premises Selection List',
                    winWidth: '90%',
                    margin: '30 0 0 0'
                 }
            ]
         },
        {
            xtype: 'textfield',
            name: 'premise_no', 
            allowBlank:true,
            fieldLabel: 'Premise No',
        },

         {
            xtype: 'textfield',
            name: 'distance',
             columnWidth: 1, 
             fieldLabel: 'Distance(Km)',
        },
        
        {
            xtype: 'textarea',
            name: 'physical_address',
            columnWidth: 1,
            fieldLabel: 'Physical Address'
        },
         {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                layout: {
                    type: 'column',
                },
                defaults: {
                    columnWidth: 0.49,
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Latitude',
                        emptyText: '0. or -0.',
                        name: 'latitude',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        name: 'longitude',
                        emptyText: '3  ',
                        allowBlank: false
                    },
                    {
                        xtype: 'button',
                        columnWidth: 1,
                        name: 'capture_location',
                        margin: '10 0 0 0',
                        iconCls: 'fa fa-location-arrow',
                        iconAlign: 'right',
                        text: 'Capture Location',
                        handler: function () {
                            var me = this;
                            if ("geolocation" in navigator) {
                                navigator.geolocation.getCurrentPosition(
                                    function (position) {
                                        var latitude = position.coords.latitude;
                                        var longitude = position.coords.longitude;
                                        // Populate the textfields
                                        me.up('form').getForm().setValues({
                                            'latitude': latitude,
                                            'longitude': longitude
                                        });
                                    },
                                    function (error) {
                                        Ext.Msg.alert("Geolocation Error", error.message);
                                    }
                                );
                            } else {
                                 Ext.Msg.alert("Geolocation Error", "Geolocation not available");
                                
                            }
                        }
                    }
                ]
            },
               
            {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                //store: 'regionsstr',
                readOnly:false,
                allowBlank:false,
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
                                         table_name: 'par_premise_districts'
                                }
                               }
                            },
                                isLoad: false
                    },
                    afterrender: function (cmbo) {
                         var form = cmbo.up('form'),
                         store = cmbo.getStore(),
                         filterObj = {country_id: 37},
                         filterStr = JSON.stringify(filterObj);
                         store.removeAll();
                         store.load({params: {filters: filterStr}});
                      },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        regionStore = form.down('combo[name=region_id]').getStore(),
                        countyStore = form.down('combo[name=county_id]').getStore(),
                        filterObj = {district_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        regionStore.removeAll();
                        regionStore.load({params: {filters: filterStr}});
                        countyStore.removeAll();
                        countyStore.load({params: {filters: filterStr}});
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
                allowBlank:false,
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
                xtype: 'combo',
                fieldLabel: 'County/Division',
                name: 'county_id',
                readOnly:false,
                allowBlank:false,
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
                                         table_name: 'par_county'
                                }
                               }
                            },
                         isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        subCountyStore = form.down('combo[name=sub_county_id]').getStore(),
                        filterObj = {county_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        subCountyStore.removeAll();
                        subCountyStore.load({params: {filters: filterStr}});
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
                fieldLabel: 'Sub County',
                name: 'sub_county_id',
                readOnly:false,
                allowBlank:true,
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
                                         table_name: 'par_sub_county'
                                }
                               }
                            },
                         isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        parishStore = form.down('combo[name=parish_id]').getStore(),
                        filterObj = {sub_county_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        parishStore.removeAll();
                        parishStore.load({params: {filters: filterStr}});
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
                fieldLabel: 'Parish',
                name: 'parish_id',
                readOnly:false,
                allowBlank:true,
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
                                         table_name: 'par_parishes'
                                }
                               }
                            },
                         isLoad: false
                    },
                     change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        villageStore = form.down('combo[name=village_id]').getStore(),
                        filterObj = {parish_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        villageStore.removeAll();
                        villageStore.load({params: {filters: filterStr}});
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
                fieldLabel: 'Village',
                name: 'village_id',
                readOnly:false,
                allowBlank:true,
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
                                         table_name: 'par_villages'
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
    
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_inspectordrugshop_storelocation',
            storeID: 'nearestinspectordrugshopstr',
            action_url: 'premiseregistration/onSaveDrugShopInspectoreStoreLocationDetails',
            handler: 'doCreatePremiseRegParamWin'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            name: 'reset_btn',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});