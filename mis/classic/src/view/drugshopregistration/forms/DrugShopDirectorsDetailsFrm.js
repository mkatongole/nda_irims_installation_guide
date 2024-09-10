
Ext.define('Admin.view.drugshopregistration.views.forms.DrugShopDirectorsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugshopdirectorsdetailsfrm',
    controller: 'premiseregistrationvctr',
    layout: {
        type: 'column'
    },
    viewModel: {
        type: 'premiseregistrationvm'
    },
    bodyPadding: 5,
    defaults: {
        margin: 4,
        allowBlank: false,
        columnWidth: 0.33,
        labelAlign: 'top'
    },
     listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                //form.down('button[action=link_personnel]').setDisabled(true);
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.query('.button').forEach(function (c) {
                    c.setDisabled(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
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
            name: 'premise_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_premises_proprietors'
        },
        {
            xtype: 'hiddenfield',
            name: 'trader_id'
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Full Names',
            items: [
                {
                    xtype: 'textfield',
                    name: 'directorfull_names',
                    columnWidth: 0.9,
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    columnWidth: 0.1,
                    tooltip: 'Link Director',
                    disabled:true,
                    name:'link_personnel',
                    //handler:'showPersonnelSelectionGrid',
                    childXtype: 'traderpersonnelgrid',
                    winWidth: '70%'
                }
            ]
        },{
            xtype: 'textfield',
            name: 'director_telephone_no',
            fieldLabel: 'Telephone No'
        }, {
            xtype: 'textfield',
            name: 'director_email_address',
            fieldLabel: 'Email Address',
          }, {
                xtype: 'combo',
                name: 'qualification_id',
                fieldLabel: 'Qualification',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: true,
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
           }, {
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'country_id',
                //store: 'countriesstr',
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
            },
            {
                xtype: 'combo',
                fieldLabel: 'Region',
                name: 'region_id',
                //store: 'regionsstr',
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
                        districtStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                //store: 'districtsstr',
                allowBlank:true,
                hidden:true,
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
                                url: 'parameters/district'
                            }
                        },
                        isLoad: false
                    }
                    
                }
            },
        {
            xtype: 'textfield',
            name: 'director_postal_address',
            hidden:true,
            allowBlank:true,
            fieldLabel: 'Shares',
        }, 
        {
            xtype: 'textfield',
            name: 'director_postal_address',
            hidden:true,
            allowBlank:true,
            fieldLabel: 'Postal Address',
        },
          
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            name: 'save_btn',
            storeID: 'drugshopdirectorsdetailsstr',
            action_url: 'configurations/saveConfigCommonData',
            handler: 'savePremisePersonnelLinkageDetails'
        }
    ]
});
    



