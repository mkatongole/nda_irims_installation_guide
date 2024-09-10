/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gvpapplications.views.forms.GvpSiteDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gvpsitedetailsfrm',
    itemId:'gvpsitedetailsfrm',
    controller: 'gvpapplicationsvctr',
    scrollable: true,
    layout: {
        type: 'column',
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
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
            name: 'gvp_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'business_type_id',
            value:1
        },
        {
            xtype: 'combo',
            fieldLabel: 'GVP Activities',
            name: 'gvp_activities_id',
            columnWidth: 1,
            allowBlank: false,
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
                                table_name: 'par_gvpinspection_activities'
                            }
                        }
                    },
                    isLoad: true
                },

            }
        },

        {
            xtype: 'fieldset',
            title: 'Gvp Site Details',
            style: 'background:white',
            collapsible: false,
            layout: {
                type: 'column'
            },
            bodyPadding: 5,
            defaults: {
                columnWidth: 0.33,
                margin: 5,
                labelAlign: 'top'
            },
            items:[
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
                            fieldLabel: 'Gvp Site Name'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            action: 'search_site',
                            childXtype: 'gvpsitesselectiongrid',
                            winTitle: 'Gvp Sites Selection List',
                            winWidth: '90%',
                            margin: '30 0 0 0'
                        }
                    ]
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    name: 'country_id',
                    allowBlank: false,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    readOnly: true,
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/country'
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmbo, newVal) {
                            var form = cmbo.up('form'),
                                regionStore = form.down('combo[name=region_id]').getStore(),
                                filterObj = {country_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                            regionStore.removeAll();
                            regionStore.load({params: {filters: filterStr}});
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Region',
                    name: 'region_id',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'region',
                    readOnly: true,
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/region'
                                }
                            },
                            isLoad: false
                        },
                        change: function (cmbo, newVal) {
                            var form = cmbo.up('form'),
                                districtStore = form.down('combo[name=district_id]').getStore(),
                                filterObj = {region_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                            districtStore.removeAll();
                            districtStore.load({params: {filters: filterStr}});
                        }
                    }
                },
                
                {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                readOnly:false,
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                readOnly: true,
                listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_districts'
                                }
                               }
                            },
                                isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        countyStore = form.down('combo[name=county_id]').getStore(),
                        filterObj = {district_id: newVal},
                        filterStr = JSON.stringify(filterObj);
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
                    xtype: 'textfield',
                    fieldLabel: 'Telephone Details',
                    name: 'telephone_no',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email Details',
                    name: 'email_address',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Website',
                    name: 'website',
                    readOnly: true,
                },
                {
                    xtype: 'textarea',
                    grow: true, 
                    growMax: 200, 
                    fieldLabel: 'Physical Address',
                    name: 'physical_address',
                    columnWidth: 1,
                    readOnly: true,
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
                        name: 'latitude',
                        allowBlank: true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        name: 'longitude',
                        allowBlank: true
                    },
                    {
                        xtype: 'button',
                        columnWidth: 0.3,
                        name:'capture_location',
                        margin:'10 0 0 0',
                        iconCls: 'fa fa-location-arrow',
                        iconAlign: 'right', 
                        text: 'Capture Location',
                        handler: function () {
                        
                            if ("geolocation" in navigator) {
                                navigator.geolocation.getCurrentPosition(
                                    function (position) {
                                        var latitude = position.coords.latitude;
                                        var longitude = position.coords.longitude;
                                        // Populate the textfields
                                        Ext.ComponentQuery.query('textfield[name=latitude]')[0].setValue(latitude);
                                        Ext.ComponentQuery.query('textfield[name=longitude]')[0].setValue(longitude);
                                    },
                                    function (error) {
                                        Ext.Msg.alert("Geolocation Error", error);
                                    }
                                );
                            } else {
                                 Ext.Msg.alert("Geolocation Error", "Geolocation not available");
                                
                            }
                        }
                    }
                ]
            }
            ]
        },
       
    ]
});