
Ext.define('Admin.view.premiseregistration.views.forms.PremiseDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisedetailsfrm',
    itemId:'premisedetailsfrm',
    title: 'thid',
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

                isRelocation = form.down('hiddenfield[name=isRelocation]').getValue();

            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }

            if ((isPreInspection) && (isPreInspection == 1 || isPreInspection === 1)) {
                console.log(isPreInspection);
                form.down('#director_fieldset').setVisible(false);
                form.down('#Phamacist_fieldset').setVisible(false); 
            }

            if ((isRelocation) && (isRelocation == 1 || isRelocation === 1)) {
                form.down('#relocation_fieldset').setVisible(false);
                form.down('combo[name=proposed_country_id]').allowBlank = false;
                form.down('combo[name=proposed_country_id]').validte();
                form.down('combo[name=proposed_district_id]').allowBlank = false;
                form.down('combo[name=proposed_district_id]').validate();
                form.down('combo[name=proposed_region_id]').allowBlank = false;
                form.down('combo[name=proposed_region_id]').validate();
                form.down('combo[name=proposed_county_id]').allowBlank = true;
                //form.down('combo[name=proposed_county_id]').validate();
                form.down('combo[name=proposed_sub_county_id]').allowBlank = true;
                //form.down('combo[name=proposed_sub_county_id]').validate();
                form.down('textfield[name=proposed_village]').allowBlank = false;
                form.down('textfield[name=proposed_village]').validate();
                form.down('textfield[name=proposed_street]').allowBlank = false;
                form.down('textfield[name=proposed_street]').validate();
                form.down('textarea[name=proposed_physical_address]').allowBlank = false;
                form.down('textarea[name=proposed_physical_address]').validate();
                form.down('textfield[name=proposed_latitude]').allowBlank = false;
                form.down('textfield[name=proposed_latitude]').validate();
                form.down('textfield[name=proposed_longitude]').allowBlank = false;
                form.down('textfield[name=proposed_longitude]').validate();
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
        name: 'isRelocation'
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
        name: 'isPreInspection'
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
    },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Premises Details',
            itemId: 'main_fieldset',
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
                fieldLabel: 'Premise Type',
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
                },
                afterrender: function(combo) {
                    combo.getStore().filterBy(function(record) {
                        return [1, 2, 3].indexOf(record.get('id')) !== -1;
                    });
                }
            }
           },
       

          {
                xtype: 'combo',
                name: 'applicant_type_id',
                fieldLabel: 'Application  made for?',
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
                                table_name: 'par_premiseapplications_types'
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
                            name: 'company_registration_no',   
                            columnWidth: 0.9,
                            allowBlank: true,
                            fieldLabel: 'Business/Company Registration No'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            disabled: true,
                            columnWidth: 0.1,
                            //handler: 'doSearchBussiness',
                            tooltip: 'Search',
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
                        name: 'name',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'Premise Name'
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
                xtype: 'datefield',
                name: 'registration_date',
                fieldLabel: 'Business Registration Date',
                submitFormat: 'Y-m-d',
                format: 'd/m/Y',
               // readOnly:true,
                //format: 'Y-m-d H:i:s', // Use the correct format here
                allowBlank: true,
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                maxValue: new Date() 
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
                            allowBlank: true,
                            fieldLabel: 'Tin No'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            disabled: true,
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            disabled:true,
                            action: 'search_tinno',
                            childXtype: 'tinnoeselectiongrid',
                            winTitle: 'Tin No Selection List',
                            winWidth: '90%',
                            margin: '30 0 0 0'
                        }
                    ]
                },
            
               {
                xtype: 'combo',
                fieldLabel: 'Product Classification',
                name: 'product_classification_id',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                allowBlank:false,
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
                },

                {
                    xtype: 'textfield',
                    name: 'incharge_telephone_no2',
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
                    xtype: 'textarea',
                    name: 'premise_reg_no',
                    columnWidth: 1,
                    fieldLabel: 'Permit Reg No',
                    allowBlank:true,
                    hidden: true,
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
                    xtype: 'textarea',
                    name: 'permit_no',
                    columnWidth: 1,
                    fieldLabel: 'Premise No/ Pre Inspection Approval NO',
                    allowBlank:true,
                    hidden: true,
                    listeners: {
                       afterrender: function (textfield) {
                            var value = textfield.getValue();
                            if (value) {
                                textfield.setHidden(false);
                             }
                    }
                }

              }
           
            ]
          },
        {
                xtype:'fieldset',
                columnWidth: 1,
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
                        allowBlank: false,
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
            }, {
                xtype:'fieldset',
                columnWidth: 1,
                itemId: 'director_fieldset',
                title: "Declarations",
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
                fieldLabel: 'Has the applicant,any partner or director been convicted within the past three years, within or outside Uganda, of any offence involving drug?',
                name: 'had_offence',
                columnWidth: 1,
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                emptyText: 'Select',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=offence]');
                            offence.setVisible(true);
                            offence.allowBlank = false;
                            offence.validate();
                        }else{
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=offence]');
                            offence.setVisible(false);
                            offence.allowBlank = true;
                            offence.validate();
                        }
                        
                    }
                   
                }
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 1,
                name: 'offence',
                hidden: true,
                allowBlank: true
            },
             {
                xtype: 'combo',
                fieldLabel: 'Has any previous application by the applicants any partner or director,for a license to operate any type of pharmaceutical business been refused or cancelled?',
                name: 'had_cancelled_application',
                columnWidth: 1,
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                emptyText: 'Select',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=cancelling_reason]');
                            offence.setVisible(true);
                            offence.allowBlank = false;
                            offence.validate();
                        }else{
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=cancelling_reason]');
                            offence.setVisible(false);
                            offence.allowBlank = true;
                            offence.validate();
                        }
                        
                    }
                   
                }
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 1,
                name: 'cancelling_reason',
                hidden: true,
                allowBlank: true
            }]
        },
        {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'Location_fieldset',
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
                fieldLabel: 'district',
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

           // {
           //      xtype: 'textfield',
           //      fieldLabel: 'village',
           //      allowBlank:true,
           //      readOnly:true,
           //      name: 'village'
           //  },
           {
                xtype: 'textarea',
                name: 'street',
                columnWidth: 1,
                allowBlank:false,
                fieldLabel: 'Street/Road'
            },

            {
                xtype: 'textarea',
                fieldLabel: 'Physical Address',
                allowBlank:false,
               // readOnly:true,
                columnWidth: 1,
                name: 'physical_address'
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
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        name: 'longitude',
                        allowBlank: false
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
            itemId: 'relocation_fieldset',
            title: 'Proposed New Location of Premises',
            hidden:true,
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
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
                name: 'proposed_country_id',
                allowBlank: true,
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
                name: 'proposed_district_id',
                //store: 'regionsstr',
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
                name: 'proposed_region_id',
                //store: 'regionsstr',
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
                name: 'proposed_county_id',
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
                name: 'proposed_sub_county_id',
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
                name: 'proposed_village'
            },{
                xtype: 'textarea',
                name: 'proposed_street',
                columnWidth: 1,
                allowBlank: true,
                fieldLabel: 'Street/Road'
            },

            {
                xtype: 'textarea',
                fieldLabel: 'Physical Address',
                allowBlank: true,
                columnWidth: 1,
                name: 'proposed_physical_address'
            },
            {
                xtype:'fieldcontainer',
                columnWidth: 1,
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
                        name: 'proposed_latitude',
                         allowBlank: true
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        name: 'proposed_longitude',
                         allowBlank: true
                    }
                ]
            } 
           ]

     }
    ]
});