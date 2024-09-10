
Ext.define('Admin.view.premiseregistration.views.forms.PreInspectionPremiseDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'preinspectionpremisedetailsfrm',
    alias: "widget.preinspectionpremisedetailsfrm",
    itemId: 'preinspectionpremisedetailsfrm',
    scrollable: true,
    layout: {
        type: 'column'
    },
    autoScroll: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();

                isPreInspection = form.down('hiddenfield[name=isPreInspection]').getValue();

            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }

            if ((isPreInspection) && (isPreInspection == 1 || isPreInspection === 1)) {
                form.down('#director_fieldset').setVisible(false);
            }
        }
    },
    items: [ {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },
     {
        xtype: 'hiddenfield',
        name: 'isPreInspection'
    },
    {
        xtype: 'hiddenfield',
        name: 'is_local',
        value: 1
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
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Premises Details',
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
            items:[
            {
                xtype: 'combo',
                name: 'business_type_id',
                fieldLabel: 'Business Type',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: false,
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
                    isLoad: true
                }
            }
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
                        fieldLabel: 'Name of the Premise'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        action: 'search_premise',
                        childXtype: 'premiseselectiongrid',
                        winTitle: 'Premises Selection List',
                        winWidth: '90%',
                        margin: '30 0 0 0'
                    }
                ]
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
                        name: 'tpin_no',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'Tin No'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        disabled:true,
                       // action: 'search_tinno',
                        childXtype: 'tinnoeselectiongrid',
                        winTitle: 'Tin No Selection List',
                        winWidth: '90%',
                        margin: '30 0 0 0'
                    }
                ]
            },  
            {
            xtype: 'datefield',
            name: 'registration_date',
            fieldLabel: 'Business Registration Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            hidden:true,
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
           },
           
            
               {
                xtype: 'combo',
                fieldLabel: 'Product Classification',
                name: 'prodpremise_classification_id',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                allowBlank: false,
                forceSelection: true,
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_premise_class'
                                }
                            }
                        },
                        isLoad: true
                    },
                        change: function(cmbo,newVal){
                            var form=cmbo.up('form'),
                            other_classification=form.down('textfield[name=other_classification]');
                            if(newVal==3||newVal===3){
                                var is_visible = true;
                            }else{
                                var is_visible = false;
                            }
                            other_classification.setVisible(is_visible);
                        }
                    }
                },
                 {
                    xtype: 'textarea',
                    name: 'other_classification',
                    columnWidth: 1,
                    fieldLabel: 'Other Classifications',
                    allowBlank:true,
                    hidden: true
                }
           

            ]
          },
        {
                xtype:'fieldset',
                columnWidth: 1,
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
                  items:[

            //    {
            //     xtype: 'combo',
            //     fieldLabel: 'NIN',
            //     name: 'incharge_nin_no',
            //     triggerAction:'all',
            //     typeAhead:true,
            //     mode:'remote',
            //     minChars:4,
            //     forceSelection:true,
            //     hideTrigger:true,
            //     listeners: {
            //         beforerender: {
            //             fn: 'setParamCombosStore',
            //             config: {
            //                 pageSize: 100,
            //                 proxy: {
            //                     url: 'premiseregistration/getPremiseIncharge'
            //                 }
            //             },
            //             isLoad: true
            //         },
            //         select: function(combo, record) {
            //             console.log(record);
            //           const form = combo.up('form'); // Assuming the TextField is part of a form
            //           form.getForm().setValues({
            //             'incharge_nin_no': record.get('incharge_nin_no'),
            //             'incharge_name': record.get('incharge_name')
            //             // Add more fields as needed based on your database record structure
            //           });
            //         }
            //     }
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
                        name: 'psu_no',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'P.S.U Registration No'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        // disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        childXtype: 'premisepharmacistselectiongrid',
                        winTitle: 'Premise Pharmacist',
                        winWidth: '90%',
                        handlerFn: 'loadSelectedPremisePharmacist',
                        handler: 'showPremisePharmacistSelectionGrid',
                        margin: '30 0 0 0'
                    }
                ]
            }, 

             {
                xtype: 'textfield',
                name: 'supervising_name',
                allowBlank:false,
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
                name: 'supervisingemail_address',
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
            },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Location Details',
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
            items:[{
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'country_id',
                //store: 'countriesstr',
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
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=district_id]').getStore(),
                            filterObj = {country_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filters: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'DISTRICT',
                name: 'district_id',
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
                                         table_name: 'par_premise_districts'
                                }
                               }
                            },
                                isLoad: false
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
                fieldLabel: 'REGION',
                name: 'region_id',
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
                allowBlank: true,
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
                                url: 'parameters/county'
                            }
                        },
                        isLoad: true
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=sub_county_id]').getStore(),
                            filterObj = {region_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Sub County',
                name: 'sub_county_id',
                allowBlank: true,
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
                                url: 'parameters/subcounty'
                            }
                        },
                        isLoad: true
                    }
                  
                }
            }, 
           {
                xtype: 'textfield',
                fieldLabel: 'village',
                allowBlank:true,
                name: 'village'
            },{
                xtype: 'textfield',
                name: 'street',
                allowBlank:false,
                fieldLabel: 'Street/Road'
            },
             {
                xtype: 'textfield',
                name: 'email',
                hidden:true,
                allowBlank:true,
                fieldLabel: 'Email Address'
            },
            {
                xtype: 'textfield',
                name: 'telephone',
                hidden:true,
                allowBlank:true,
                fieldLabel: 'Telephone No'
                
            },

            {
                xtype: 'textarea',
                fieldLabel: 'Physical Address',
                 allowBlank:false,
                columnWidth: 1,
                name: 'physical_address'
            },
            {
                xtype:'fieldcontainer',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.49,
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Latitude',
                        name: 'latitude',
                         allowBlank:false
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        name: 'longitude',
                         allowBlank:false
                    }
                ]
            } 
           ]

     }
    ]
});