/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ManSiteDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'mansitedetailsfrm',
    itemId:'mansitedetailsfrm',
    scrollable: true,
    layout: {
        type: 'column'
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
            name: 'man_site_id'//par
        },
        {
            xtype: 'hiddenfield',
            name: 'business_type_id',
            value:1
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'//tra
        },
        {
            xtype: 'hiddenfield',
            name: 'registered_manufacturing_site_id'//registered
        },
        {
            xtype: 'fieldset',
            title: 'Manufacturer Details',
            style: 'background:white',
            collapsible: false,
            hidden: true,
            layout: {
                type: 'column'
            },
            bodyPadding: 5,
            defaults: {
                columnWidth: 0.33,
                margin: 5,
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'manufacturer_name',
                            columnWidth: 0.9,
                            allowBlank: true,
                            fieldLabel: 'Manufacturer (Corporate) Name'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            name: 'search_site',
                            childXtype: 'mansitesselectiongrid',
                            winTitle: 'Manufacturing Sites Selection List',
                            winWidth: '90%',
                            margin: '30 0 0 0',
                            stores: '[]'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'manufacturer_email_address',
                    fieldLabel: 'Manufacturer Email'
                },
                {
                    xtype: 'textfield',
                    name: 'manufacturer_physical_address',
                    fieldLabel: 'Corporate Address'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    name: 'manufacturer_country_id',
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
                            regionStore.load({params: {filter: filterStr}});
                        }
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Manufacturing Site Details',
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
                            fieldLabel: 'Manufacturing Site Name'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            //disabled: true,
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            action: 'search_site',
                            childXtype: 'manufacturingsitesselectiongrid',
                            winTitle: 'Manufacturing Sites Selection List',
                            winWidth: '90%',
                            margin: '30 0 0 0'
                        }
                    ]
                }, {
                    xtype: 'textfield',
                    name: 'premise_reg_no',
                    fieldLabel: 'Registration No',
                    hidden: true,
                    allowBlank: true,
                    disabled: true
                },
                {
                    xtype: 'textfield',
                    name: 'permit_no',
                    fieldLabel: 'Permit No',
                    allowBlank: true,
                    hidden: true,
                    disabled: true
                },
                {
                    xtype: 'textfield',
                    name: 'gmp_cert_no',
                    fieldLabel: 'GMP Certificate No',
                    hidden: true,
                    allowBlank: true,
                    disabled: true
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
                    //store: 'regionsstr',
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
                                                 table_name: 'par_regions'
                                        }
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
                //store: 'regionsstr',
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
                xtype: 'combo',
                fieldLabel: 'County/Division',
                name: 'county_id',
                hidden:true,
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
                hidden:true,
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
                hidden:true,
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
                hidden:true,
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

                {
                    xtype: 'textfield',
                    fieldLabel: 'Street',
                    name: 'street',  hidden: true,
                    allowBlank: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Telephone Details',
                    name: 'telephone'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Fax',
                    name: 'fax',  hidden: true,
                    allowBlank: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email Details',
                    name: 'email'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Website',
                    name: 'website',
                    hidden:true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'licence_no',
                    fieldLabel: 'License No',
                    allowBlank: true
                },
                {
                    xtype: 'textarea',
                    grow: true, 
                    growMax: 200, 
                    fieldLabel: 'Physical Address',
                    name: 'physical_address',
                    columnWidth: 1
                },

                {
                    xtype: 'textfield',
                    allowBlank: true,
                    hidden:true,
                    fieldLabel: 'Postal Address',
                    name: 'postal_address'
                },
              
                {
                    xtype: 'combo',
                    fieldLabel: 'Inpection Manufacturing Activities',
                    name: 'inspection_activities_id',
                    columnWidth: 1,
                    allowBlank: false,
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
                                        table_name: 'par_manufacturinginspection_activities'
                                    }
                                }
                            },
                            isLoad: true
                        },change: function(combo, newVal, oldValue, eopts) {
                             var form = combo.up('form'),
                             intermediate_manufacturing_activity_id = form.down('combo[name=intermediate_manufacturing_activity_id]');
                           if(newVal == 2){
                                manufacturing_activity_str = intermediate_manufacturing_activity_id.getStore();
                                manufacturing_activity_str.removeAll();
                                manufacturing_activity_str.load();
                                intermediate_manufacturing_activity_id.setHidden(false);
                                intermediate_manufacturing_activity_id.allowBlank = false;
                                intermediate_manufacturing_activity_id.validate();
                           }else if(newVal == 3){
                                manufacturing_activity_str = intermediate_manufacturing_activity_id.getStore();
                                manufacturing_activity_str.removeAll();
                                manufacturing_activity_str.load();
                                intermediate_manufacturing_activity_id.setHidden(false);
                                intermediate_manufacturing_activity_id.allowBlank = false;
                                intermediate_manufacturing_activity_id.validate();
                           }else{
                            intermediate_manufacturing_activity_id.setHidden(true);
                            intermediate_manufacturing_activity_id.allowBlank = true;

                          }
                       }
                    }
                },

                {
                    xtype: 'combo',
                    fieldLabel: 'Manufacturing Activity(s)',
                    name: 'intermediate_manufacturing_activity_id',
                    forceSelection: true,
                    allowBlank:true,
                    hidden:true,
                    columnWidth: 1,
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
                                        table_name: 'par_site_manufacturing_activities'
                                    }
                                }
                            },
                            isLoad: false
                        }
                    }
                },

                {
                    xtype: 'combo',
                    fieldLabel: 'License Type Application',
                    name: 'local_gmp_license_type_id',
                    forceSelection: true,
                    allowBlank:true,
                    hidden:true,
                    columnWidth: 1,
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
                                        table_name: 'par_local_gmplicense_application'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
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
        {
                xtype:'fieldset',
                columnWidth: 1,
                hidden:true,
                name: 'phamacist_fieldset',
                itemId: 'Phamacist_fieldset',
                title: "Supervising Phamacist",
                collapsible: true,
                defaults: {
                    labelAlign: 'top',
                    allowBlank: false,
                    labelAlign: 'top',
                    margin: 5,
                    xtype: 'textfield',
                    allowBlank: false,
                    columnWidth: 0.33,
                },
                layout: 'column',
                  items:[ {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'psu_no',
                        columnWidth: 0.9,
                        allowBlank:true,
                        fieldLabel: 'P.S.U Registration No'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        // disabled: true,
                        columnWidth: 0.1,
                       // action:'search_premise',
                        tooltip: 'Search',
                        childXtype: 'premisepharmacistselectiongrid',
                        winTitle: 'Premise Pharmacist',
                        winWidth: '90%',
                        handlerFn: 'loadSelectedGMPPharmacist',
                        handler: 'showGMPPharmacistSelectionGrid',
                        margin: '30 0 0 0'
                    }
                ]
            }, 

             {
                xtype: 'textfield',
                name: 'supervising_name',
                allowBlank:true,
                fieldLabel: 'Full Names',
                readOnly: true
            },
            {
            xtype: 'datefield',
            name: 'supervising_registration_date',
            fieldLabel: 'P.S.U Registration No',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            hidden:true,
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
           },
           

             {
                xtype: 'combo',
                name: 'supervising_qualification_id',
                fieldLabel: 'Qualification',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: true,
                readOnly: true,
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
                                    table_name: 'par_personnel_qualifications'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
               },

            {
                xtype: 'textfield',
                name: 'supervising_telephone_no',
                allowBlank:true,
                fieldLabel: 'Telephone No',
                readOnly: true
            },
             {
                xtype: 'textfield',
                name: 'supervising_telephone_no2',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Telephone No 2',
                readOnly: true,
                listeners: {
                  afterrender: function (textfield) {
                        // Check if the textfield has a value
                        var value = textfield.getValue();

                        // If the value is not empty or null, set hidden to false
                        if (value) {
                            textfield.setHidden(false);
                         }
                    }
                }

            },
           {
                xtype: 'textfield',
                name: 'supervising_telephone_no3',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Telephone No 3',
                readOnly: true,
                listeners: {
                  afterrender: function (textfield) {
                        // Check if the textfield has a value
                        var value = textfield.getValue();

                        // If the value is not empty or null, set hidden to false
                        if (value) {
                            textfield.setHidden(false);
                         }
                    }
                }

            },

             {
                xtype: 'textfield',
                name: 'supervising_email_address',
                allowBlank:true,
                fieldLabel: 'Email Address',
                readOnly: true
              },
              {
                xtype: 'textfield',
                name: 'supervising_email_address2',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Email Address 2',
                readOnly: true,
                listeners: {
                  afterrender: function (textfield) {
                        // Check if the textfield has a value
                        var value = textfield.getValue();

                        // If the value is not empty or null, set hidden to false
                        if (value) {
                            textfield.setHidden(false);
                         }
                    }
                }

            },
              {
                xtype: 'textfield',
                name: 'supervising_email_address3',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Email Address 3',
                readOnly: true,
                listeners: {
                  afterrender: function (textfield) {
                        // Check if the textfield has a value
                        var value = textfield.getValue();

                        // If the value is not empty or null, set hidden to false
                        if (value) {
                            textfield.setHidden(false);
                         }
                    }
                }

              },
               {
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'supervising_country_id',
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
                                url: 'parameters/country'
                            }
                        },
                        isLoad: true
                    },change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=supervising_district_id]').getStore(),
                            filterObj = {region_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                            districtStore.removeAll();
                            districtStore.load({params: {filter: filterStr}});
                    }
                    
                }
            },{
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'supervising_district_id',
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
                                         table_name: 'par_premise_districts'
                                }
                               }
                        },
                        isLoad: false
                    },change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            regionStore = form.down('combo[name=supervising_region_id]').getStore(),
                            filterObj = {country_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        regionStore.removeAll();
                        regionStore.load({params: {filter: filterStr}});
                    }
                  
                }
              },
            {
                xtype: 'combo',
                fieldLabel: 'Region',
                name: 'supervising_region_id',
                //store: 'regionsstr',
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
                                         table_name: 'par_premise_regions'
                                }
                               }
                            },
                        isLoad: false
                    }
                }
            }
            
         ]
      }
    ]
});