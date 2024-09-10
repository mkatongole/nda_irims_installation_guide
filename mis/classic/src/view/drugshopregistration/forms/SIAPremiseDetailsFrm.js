
Ext.define('Admin.view.drugshopregistration.views.forms.SIAPremiseDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'siapremisedetailsfrm',
    itemId: 'siapremisedetailsfrm',
    scrollable: true,
    layout: {
        type: 'column'
    },
    //autoScroll: true,
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
    },{
        xtype: 'hiddenfield',
        name: 'business_type_id',
        value: 4
    },
    {
        xtype: 'hiddenfield',
        name: 'premise_id'
    },

     {
        xtype: 'hiddenfield',
        name: 'premise_ref_no'
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
            itemId: 'main_fieldset',
            title: 'Details',
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
            items:[  {
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
                        columnWidth: 0.1,
                        //disabled:true,
                        handler: 'doSearchBussiness',
                        tooltip: 'Search',
                        margin: '30 0 0 0'
                    }
                ]
            },



             
             {
                xtype: 'textfield',
                name: 'name',
                readOnly:false,
                fieldLabel: 'Name of the Business',
                allowBlank: false
            },  
            {
            xtype: 'datefield',
            name: 'registration_date',
            fieldLabel: 'Business Registration Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            readOnly:false,
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
                    xtype: 'textfield',
                    name: 'other_classification',
                    columnWidth: 1,
                    fieldLabel: 'Other Classifications',
                    allowBlank:true,
                    hidden: true
                },
                 {
                    xtype: 'textfield',
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
                    xtype: 'textfield',
                    name: 'permit_no',
                    columnWidth: 1,
                    fieldLabel: 'Premise No/ Pre Inspection Approval No',
                    allowBlank:true,
                    readOnly:true,
                    hidden: true,
                    listeners: {
                       afterrender: function (textfield) {
                        // Check if the textfield has a value
                            var value = textfield.getValue();

                            // If the value is not empty or null, set hidden to false
                            if (value) {
                                textfield.setHidden(false);
                             }
                    },
                    change: function (textfield, newValue, oldValue) {
                        // Check if the textfield has a value
                        if (newValue && !textfield.isHidden()) {
                            textfield.setVisible(true);
                        } else if (!newValue && textfield.isHidden()) {
                            textfield.setVisible(false);
                    }
                 }
                }

            }
           

            ]
          },
          {
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
                                cancelling_reason = form.down('htmleditor[name=cancelling_reason]');
                            cancelling_reason.setVisible(true);
                            cancelling_reason.allowBlank = false;
                            cancelling_reason.validate();
                        }else{
                            var form = combo.up('form'),
                                cancelling_reason = form.down('htmleditor[name=cancelling_reason]');
                            cancelling_reason.setVisible(false);
                            cancelling_reason.allowBlank = true;
                            cancelling_reason.validate();
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
            },

             {
                xtype: 'combo',
                fieldLabel: 'Does the applicant work in any other health institution (Private or Public) ?',
                name: 'is_workinotherinstitutions',
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
                                working_inotherinstitutions = form.down('htmleditor[name=working_inotherinstitutions]');
                            working_inotherinstitutions.setVisible(true);
                            working_inotherinstitutions.allowBlank = false;
                            working_inotherinstitutions.validate();
                        }else{
                            var form = combo.up('form'),
                                working_inotherinstitutions = form.down('htmleditor[name=working_inotherinstitutions]');
                            working_inotherinstitutions.setVisible(false);
                            working_inotherinstitutions.allowBlank = true;
                            working_inotherinstitutions.validate();
                        }
                        
                    }
                   
                }
            },
            {
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 2,
                name: 'working_inotherinstitutions',
                hidden: true,
                allowBlank: true
            }]
        },
          {
                xtype:'fieldset',
                columnWidth: 1,
                title: "Details of Full time Technician",
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

                   // {
                   //      xtype: 'combo',
                   //      fieldLabel: 'Is applicant same as the full time Incharge?',
                   //      name: 'has_incharge',
                   //      columnWidth: 1,
                   //      allowBlank: false,
                   //      valueField: 'id',
                   //      displayField: 'name',
                   //      forceSelection: true,
                   //      queryMode: 'local',
                   //      emptyText: 'Select',
                   //      listeners: {
                   //          beforerender: {
                   //              fn: 'setConfigCombosStore',
                   //              config: {
                   //                  pageSize: 1000,
                   //                  proxy: {
                   //                      url: 'commonparam/getCommonParamFromTable',
                   //                      extraParams: {
                   //                          table_name: 'par_confirmations'
                   //                      }
                   //                  }
                   //              },
                   //              isLoad: true
                   //          },
                   //          change: function(combo, newVal, oldValue, eopts) {
                   //              if(newVal == 1){
                   //                  var form = combo.up('form'),
                   //                  nin_container= form.down('fieldcontainer[name=nin_container]');
                   //                  nin_no = form.down('textfield[name=nin_no]');
                   //                  nin_container.setVisible(false);
                   //                  nin_no.allowBlank = true;
                   //                  nin_no.validate();
                   //                  incharge_name= form.down('textfield[name=incharge_name]');
                   //                  incharge_name.setVisible(false);
                   //                  incharge_qualification_id= form.down('combo[name=incharge_qualification_id]');
                   //                  incharge_qualification_id.setVisible(false);
                   //                  incharge_telephone_no= form.down('textfield[name=incharge_telephone_no]');
                   //                  incharge_telephone_no.setVisible(false);
                   //                  incharge_email_address= form.down('textfield[name=incharge_email_address]');
                   //                  incharge_email_address.setVisible(false);
                   //                  incharge_country_id= form.down('combo[name=incharge_country_id]');
                   //                  incharge_country_id.setVisible(false);
                   //                  incharge_district_id= form.down('combo[name=incharge_district_id]');
                   //                  incharge_district_id.setVisible(false);
                   //                  incharge_region_id= form.down('combo[name=incharge_region_id]');
                   //                  incharge_region_id.setVisible(false);
                   //              }else{
                   //                  var form = combo.up('form'),
                   //                  nin_container= form.down('fieldcontainer[name=nin_container]');
                   //                  nin_no = form.down('textfield[name=nin_no]');
                   //                  nin_container.setVisible(true);
                   //                  nin_no.allowBlank = false;
                   //                  nin_no.validate();
                   //                  incharge_name= form.down('textfield[name=incharge_name]');
                   //                  incharge_name.setVisible(true);
                   //                  incharge_qualification_id= form.down('combo[name=incharge_qualification_id]');
                   //                  incharge_qualification_id.setVisible(true);
                   //                  incharge_telephone_no= form.down('textfield[name=incharge_telephone_no]');
                   //                  incharge_telephone_no.setVisible(true);
                   //                  incharge_email_address= form.down('textfield[name=incharge_email_address]');
                   //                  incharge_email_address.setVisible(true);
                   //                  incharge_country_id= form.down('combo[name=incharge_country_id]');
                   //                  incharge_country_id.setVisible(true);
                   //                  incharge_district_id= form.down('combo[name=incharge_district_id]');
                   //                  incharge_district_id.setVisible(true);
                   //                  incharge_region_id= form.down('combo[name=incharge_region_id]');
                   //                  incharge_region_id.setVisible(true);
                   //              }
                                
                   //          }
                           
                   //      }
                   //  },

            {
                xtype: 'fieldcontainer',
                layout: 'column',
                //hidden:true,
                name:'nin_container',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'nin_no',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'NIN'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        // disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        childXtype: 'premiseinchargeselectiongrid',
                        winTitle: 'Incharge',
                        winWidth: '90%',
                        handlerFn: 'loadSelectedPremiseIncharge',
                        handler: 'showPremiseInchargeSelectionGrid',
                        margin: '30 0 0 0'
                    }
                ]
            }, 

             {
                xtype: 'textfield',
                name: 'incharge_name',
                allowBlank:true,
                 //hidden:true,
                fieldLabel: 'Full Names',
                readOnly: true
            },

             {
                xtype: 'combo',
                name: 'incharge_qualification_id',
                fieldLabel: 'Level of Education',
                forceSelection: true,
                //hidden:true,
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
                name: 'incharge_telephone_no',
                allowBlank:true,
                //hidden:true,
                fieldLabel: 'Telephone No',
                readOnly: true
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
                xtype: 'textfield',
                name: 'incharge_telephone_no3',
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
                name: 'incharge_email_address',
                allowBlank:true,
                //hidden:true,
                fieldLabel: 'Email Address',
                readOnly: true
              },
              {
                xtype: 'textfield',
                name: 'incharge_email_address2',
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
                name: 'incharge_email_address3',
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
                name: 'incharge_country_id',
                allowBlank:true,
                //hidden:true,
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
                            districtStore = form.down('combo[name=incharge_district_id]').getStore(),
                            filterObj = {country_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filters: filterStr}});
                    }
                   
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'incharge_district_id',
                allowBlank:true,
                //hidden:true,
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
                            regionStore = form.down('combo[name=incharge_region_id]').getStore(),
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
                name: 'incharge_region_id',
                //store: 'regionsstr',
                allowBlank:true,
                //hidden:true,
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
            itemId: 'location_fieldset',
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
                xtype: 'textfield',
                columnWidth: 1,
                name: 'street',
                 allowBlank:false,
                fieldLabel: 'Street/Road'
            },

            {
                xtype: 'textarea',
                fieldLabel: 'Physical Address',
                columnWidth: 1,
                 allowBlank:false,
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

     }
    ]
});