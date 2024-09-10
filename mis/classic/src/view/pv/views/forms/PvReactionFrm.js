Ext.define('Admin.view.pv.views.forms.PvReactionFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvreactioFrm',
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
            value: 'tra_pv_reaction',
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
            name: '_token',
            value: token
        },
        {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'main_fieldset',
            title: 'Reaction',
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
                xtype:'fieldcontainer',
                fieldLabel: 'Reaction /Event(MedDRA)',
                columnWidth: 1,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[
                      {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'MedDRA Level',
                            name: 'reaction_event_meddra_level_id',
                            forceSelection: true,
                            columnWidth: 0.5,
                            allowBlank:false,
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'name',
                            listeners: {
                                beforerender: {
                                    fn: 'setCompStore',
                                    config: {
                                        pageSize: 10000,
                                        proxy: {
                                            extraParams: {
                                                table_name: 'par_pv_medra_levels'
                                            }
                                        }
                                    },
                                    isLoad: true
                                },
                             change: function (cmbo, newVal) {
                                var form = cmbo.up('form'),
                                    reactionEventStore = form.down('combo[name=reaction_event_medra]').getStore(),
                                    filterObj = {meddra_level_id: newVal},
                                    filterStr = JSON.stringify(filterObj);
                                reactionEventStore.removeAll();
                                reactionEventStore.load({params: {filter: filterStr}});
                            }
                          
                        }
                     },
                  {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'Reaction /Event',
                            name: 'reaction_event_medra',
                            forceSelection: true,
                            columnWidth: 0.5,
                            allowBlank:false,
                            queryMode: 'local',
                            valueField: 'name',
                            displayField: 'name',
                             listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 10000,
                                        proxy: {
                                        url: 'configurations/getMedDRAtearm'
                                       }
                                    },
                                    isLoad: false
                                }
                         }
                   }
                ]
            } ,
        {
            xtype: 'textarea',
            fieldLabel:'Reaction / event as reported by initial reporter',
            name: 'reaction_event',
            grow: true, 
            columnWidth: 1,
            growMax: 200, 
            allowBlank: false,
        },  {
                xtype:'fieldcontainer',
                fieldLabel: 'Onset date',
                columnWidth: 0.5,
                hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[ {
                        xtype: 'datefield',
                        fieldLabel: 'Onset date',
                        format: 'Y-m-d',
                        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                        name: 'onset_date',
                        maxValue: new Date()
                    },
                    {
                        xtype: 'timefield',
                        fieldLabel:'Time',
                        labelAlign: 'top',
                        name: 'onset_time',
                        format: 'H:i',
                        columnWidth: 0.4,
                        altFormats:'H:i',
                        increment: 1,
                        // minValue: '08:00', 
                        // maxValue: '17:00',
                
                    }]
                },{
                xtype:'fieldcontainer',
                fieldLabel: 'End date ',
                columnWidth: 0.5,
                hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[ {
                        xtype: 'datefield',
                        fieldLabel: 'End date ',
                        format: 'Y-m-d',
                        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                        name: 'end_date',
                        maxValue: new Date()
                    },
                    {
                        xtype: 'timefield',
                        fieldLabel:'Time',
                        labelAlign: 'top',
                        name: 'end_time',
                        format: 'H:i',
                        columnWidth: 0.4,
                        altFormats:'H:i',
                        increment: 1,
                        // minValue: '08:00', 
                        // maxValue: '17:00',
                
                    }]
                },  {
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'Outcome',
                    name: 'adr_outcome_id',
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
                                        table_name: 'par_adr_outcomes'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },  {
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'Medical confirmation by healthcare professional',
                    name: 'confirmation_by_healthcare_id',
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
                }, {
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'Serious',
                    name: 'is_serious_id',
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
                        },
                     change: function(combo, newVal, oldVal, eopts){
                       var form = combo.up('form'),
                        seriousness_id = form.down('tagfield[name=seriousness_id]');

                    if(newVal == 2){
                        seriousness_id.setReadOnly(true);
                        seriousness_id.allowBlank = true;
                      
                    }else{
                         seriousness_id.setReadOnly(false);
                         seriousness_id.allowBlank = false;
                         seriousness_id.validate();
                    }
                }
              }
                
            },{
            xtype: 'tagfield',
            fieldLabel: 'Seriousness',
            columnWidth: 1,
            name: 'seriousness_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Seriousness',
            growMax: 100,
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
                                        table_name: 'par_adr_seriousness'
                                    }
                                }
                            },
                    isLoad: true
                     }
                    }
                },
            {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'main_fieldset',
            title: 'Vaccine information',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield'
            },
            layout: 'column',
            items:[
              {
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'AEFI category',
                    name: 'aefi_category_id',
                    columnWidth: 1,
                    readOnly:true,
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
                                        table_name: 'par_aefi_categories'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                ]
              }
            ]
            } ,
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
                    table_name: 'tra_pv_reaction',
                    storeID: 'pvreactiostr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});