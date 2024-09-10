
Ext.define('Admin.view.pv.views.forms.PvPersonnelFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvpersonnelFrm',
    itemId: 'pvpersonnelfrm',
    controller: 'pvvctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        allowBlank: true,
        labelAlign: 'top'
    },
    scrollable: true,
    autoScroll: true,
    items: [{
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: 'table_name',
            value: 'tra_pv_personnel',
            allowBlank: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'pv_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'facility_id'
        },
         {
            xtype: 'hiddenfield',
            name: 'ltr_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'main_fieldset',
            title: 'Reporter information',
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
                    columnWidth: 0.33,
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: '(Search from Frequent Reporters) Reporter As',
                    items: [{
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            name: 'search_reporter',
                            tooltip: 'Search Reporter',
                            childXtype:'frequentreportersselectiongrid',
                            handler: 'showAddConfigParamWinFrm',
                            winTitle: 'Frequent Reporters Selection List',
                            winWidth: '90%'
                        },
                        {
                            xtype: 'combo',
                            anyMatch: true,
                            name: 'adr_reporter_type_id',
                            forceSelection: true,
                            queryMode: 'local',
                            valueField: 'id',
                            columnWidth: 0.9,
                            displayField: 'name',
                            listeners: {
                                beforerender: {
                                    fn: 'setCompStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            extraParams: {
                                                table_name: 'par_adr_reporter_types'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            }
                        }
                    ]
         } ,

       
         {
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'Reporter Professional Qualification',
                    name: 'qualification_id',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setCompStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        table_name: 'par_pv_reporter_qualifications'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
         },
          {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Title',
            name: 'title_id',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_titles'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Is Primary Reporter',
            name: 'is_primary_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                        beforerender: {
                            fn: 'setCompStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        table_name: 'par_confirmations'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'Given/First Name',
            name: 'first_name',
            allowBlank: true,
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Family/Last Name',
            name: 'last_name',
            allowBlank: true,
        },{
            xtype: 'textfield',
            fieldLabel: 'Physical address',
            name: 'physical_address',
            allowBlank: true,
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Telephone',
            name: 'telephone_no',
            allowBlank: true,
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email address',
            name: 'email_address',
            allowBlank: true,
          },

         {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'City',
            name: 'city_id',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_cities'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
            {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                readOnly:false,
                allowBlank:false,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setCompStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_premise_districts'
                                }
                               }
                            },
                                isLoad: true
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
                allowBlank:false,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setCompStore',
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
        }, {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Reporter/Organization Category',
            name: 'reporter_category_id',
            forceSelection: true,
           // readOnly: true,
            allowBlank:false,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_reporter_categories'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                        facility_name_filedset = form.down('fieldcontainer[name=facility_name]'),
                        facility_name = form.down('textfield[name=facility_name]'),
                        facility_authority_id = form.down('combo[name=facility_authority_id]'),
                        facility_level_id = form.down('combo[name=facility_level_id]'),
                        facility_ownership_id = form.down('combo[name=facility_ownership_id]'),
                        facility_hsd_id = form.down('combo[name=facility_hsd_id]'),
                        organisation = form.down('textfield[name=organisation]'),

                        ltr_name_filedset = form.down('fieldcontainer[name=ltr_name]'),
                        ltr_name = form.down('textfield[name=ltr_name]'),
                        link_permit_no = form.down('textfield[name=link_permit_no]'),
                        link_physical_address = form.down('textfield[name=link_physical_address]'),
                        link_telephone = form.down('textfield[name=link_telephone]');
                        

                    if(newVal == 1){
                        facility_name_filedset.setVisible(true);
                        facility_authority_id.setVisible(true);
                        facility_level_id.setVisible(true);
                        facility_ownership_id.setVisible(true);
                        facility_hsd_id.setVisible(true);
                        organisation.setVisible(false);
                        facility_name.allowBlank = false;
                        facility_name.validate();
                        organisation.allowBlank = true;
                        ltr_name_filedset.setVisible(false);
                        ltr_name.setVisible(false);
                        link_permit_no.setVisible(false);
                        link_physical_address.setVisible(false);
                        link_telephone.setVisible(false);
                        ltr_name.allowBlank = true;

                    }else if(newVal == 2){
                        facility_name_filedset.setVisible(false);
                        facility_authority_id.setVisible(false);
                        facility_level_id.setVisible(false);
                        facility_ownership_id.setVisible(false);
                        facility_hsd_id.setVisible(false);
                        organisation.setVisible(false);
                        facility_name.allowBlank = true;
                        organisation.allowBlank = true;

                        ltr_name_filedset.setVisible(true);
                        ltr_name.setVisible(true);
                        link_permit_no.setVisible(true);
                        link_physical_address.setVisible(true);
                        link_telephone.setVisible(true);
                        ltr_name.allowBlank = false;
                        ltr_name.validate();

                        
                    }else if(newVal == 3){
                        facility_name_filedset.setVisible(false);
                        facility_authority_id.setVisible(false);
                        facility_level_id.setVisible(false);
                        facility_ownership_id.setVisible(false);
                        facility_hsd_id.setVisible(false);
                        organisation.setVisible(true);
                        facility_name.allowBlank = true;
                        organisation.allowBlank = false;
                        organisation.validate();
                        ltr_name_filedset.setVisible(false);
                        ltr_name.setVisible(false);
                        link_permit_no.setVisible(false);
                        link_physical_address.setVisible(false);
                        link_telephone.setVisible(false);
                        ltr_name.allowBlank = true;
                    }else{
                        facility_name_filedset.setVisible(true);
                        facility_authority_id.setVisible(true);
                        facility_level_id.setVisible(true);
                        facility_ownership_id.setVisible(true);
                        facility_hsd_id.setVisible(false);
                        organisation.setVisible(false);
                        facility_name.allowBlank = false;
                        facility_name.validate()
                        organisation.allowBlank = true;
                        ltr_name_filedset.setVisible(false);
                        ltr_name.setVisible(false);
                        link_permit_no.setVisible(false);
                        link_physical_address.setVisible(false);
                        link_telephone.setVisible(false);
                        ltr_name.allowBlank = true;

                    }
                }
            }
        },{
            xtype: 'fieldcontainer',
            layout: 'column',
            hidden:true,
            name: 'facility_name',
            columnWidth: 0.33,
            defaults: {
                labelAlign: 'top',
                columnWidth: 0.33,
            },
            fieldLabel: 'Faclity Name',
            items: [
                {
                    xtype: 'textfield',
                    name: 'facility_name',
                    readOnly: true,
                    defaults: {
                       style: 'margin-right:0px'
                    },
                    allowBlank:false,
                    columnWidth: 0.9
                },
                    
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    defaults: {
                       style: 'margin-left:0px'
                    },
                    tooltip: 'Search Faclity',
                    handler: 'showFacilitySelectionList',
                    winTitle: 'Facility Selection List',
                    winWidth: '90%'
                }
            ]
            },{
            xtype: 'combo', 
            anyMatch: true,
            readOnly: true,
            fieldLabel: 'Facility Authority',
            name: 'facility_authority_id',
            hidden:true,
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_pv_facilityauthority'
                            }
                        }
                    },
                    isLoad: true
                }
             }
          },
          {
            xtype: 'combo', 
            anyMatch: true,
            fieldLabel: 'Facility Level',
            name: 'facility_level_id',
            hidden:true,
            readOnly: true,
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_facility_levels'
                            }
                        }
                    },
                    isLoad: true
                }
             }
          },
            {
            xtype: 'combo', 
            anyMatch: true,
            fieldLabel: 'Facility Ownership',
            name: 'facility_ownership_id',
            hidden:true,
            readOnly: true,
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_facility_ownership'
                            }
                        }
                    },
                    isLoad: true
                }
             }
          },
            {
            xtype: 'combo', 
            anyMatch: true,
            fieldLabel: 'Facility HSD',
            name: 'facility_hsd_id',
            readOnly: true,
            forceSelection: true,
            hidden:true,
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_facility_hsd'
                            }
                        }
                    },
                    isLoad: true
                }
             }
          },
          {
            xtype: 'textfield',
            fieldLabel: 'Entity Name',
            name: 'organisation',
            hidden:true,
            allowBlank: true,
          },{
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    hidden:true,
                    columnWidth: 0.33,
                    defaults: {
                        labelAlign: 'top',
                        columnWidth: 0.33,
                    },
                    name: 'ltr_name',
                    fieldLabel: 'Premise Name',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'ltr_name',
                            readOnly: true,
                            allowBlank: true,
                            columnWidth: 0.9
                        },
                    
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search LTR',
                            handler: 'showLTRSelectionList',
                            winTitle: 'LTR Selection List',
                            winWidth: '90%'
                        }
                    ]
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Premise No',
                    readOnly: true,
                    hidden:true,
                    allowBlank: true,
                    name: 'link_permit_no'
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Premise Physical Address',
                    readOnly: true,
                    hidden:true,
                    allowBlank: true,
                    name: 'link_physical_address'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    hidden:true,
                    allowBlank: true,
                    fieldLabel: 'Premise Telephone',
                    name: 'link_telephone'
                },
         ]
        }
  
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_pv_personnel',
                    storeID: 'pvreceiverStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});