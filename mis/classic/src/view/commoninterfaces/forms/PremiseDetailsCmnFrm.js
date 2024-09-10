/**
 * Created by Softclans on 3/8/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.PremiseDetailsCmnFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisedetailscmnfrm',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
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
                hidden:true,
                name:'Phamacist_fieldset',
                itemId: 'Phamacist_fieldset',
                title: "Supervising Phamacist",
                collapsible: true,
                defaults: {
                    labelAlign: 'top',
                    allowBlank: false,
                    labelAlign: 'top',
                    margin: 5,
                    readOnly:true,
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
                        readOnly:true,
                        columnWidth: 1,
                        allowBlank: true,
                        fieldLabel: 'P.S.U Registration No'
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
        },
        {
    xtype:'fieldset',
    columnWidth: 1,
    name:'non_licensed_fieldset',
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
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'premise_tpin_no',
                    columnWidth: 0.9,
                    allowBlank: false,
                    readOnly:true,
                    fieldLabel: 'TIN No.',
                },
            
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_premise_non_licensed',
                    childXtype: 'importbusinessselectiongrid',
                    winTitle: 'Premises Selection List',
                    winWidth: '90%',
                    margin: '30 0 0 0'
                }
            ]
        },
    

            {
                xtype: 'textfield',
                fieldLabel: 'Name of Business',
                allowBlank:true,
                readOnly:true,
                name: 'premise_name',
            },

            {
                xtype: 'textfield',
                fieldLabel: 'Physical address of the Business or Institution',
                allowBlank:true,
                readOnly:true,
                name: 'premise_physical_address',
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Email',
                allowBlank:true,
                readOnly:true,
                name: 'premise_email',
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Company Registration Number',
                allowBlank:true,
                readOnly:true,
                name: 'premise_company_registration_no',
            }
        ]
    },
    ]
});