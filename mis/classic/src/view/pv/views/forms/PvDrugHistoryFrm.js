Ext.define('Admin.view.pv.views.forms.PvDrugHistoryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvdrughistoryFrm',
    itemId: 'pvdrughistoryfrm',
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
            value: 'tra_pv_drug_history',
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
            title: 'Drug History',
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
                    xtype: 'htmleditor',
                    fieldLabel:'Previous Medication',
                    name: 'previous_medication',
                    grow: true, 
                    columnWidth: 1,
                    growMax: 200, 
                    allowBlank: false,
         },

        {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'main_fieldset',
            title: 'WHODrug',
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
                    xtype:'fieldcontainer',
                    fieldLabel: 'Previous Medication(WHODrug)',
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
                                xtype: 'combo', anyMatch: true,
                                fieldLabel: 'Who Drug Level',
                                name: 'whodrug_level_id',
                                columnWidth: 0.5,
                                allowBlank:false,
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
                                                    table_name: 'par_pv_whodrug_levels'
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
                        columnWidth: 0.5,
                        defaults: {
                            labelAlign: 'top'
                        },
                        fieldLabel: 'Name',
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'previous_medication_whodrug',
                                readOnly: true,
                                allowBlank:false,
                                columnWidth: 0.9
                            },
                        
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-search',
                                columnWidth: 0.1,
                                tooltip: 'Search WHODrug',
                                handler: 'showWHODugSelectionList',
                                winTitle: 'LTR Selection List',
                                winWidth: '90%'
                            }
                        ]
                    }
                    ]
                } 
                ]
            },
          {
                xtype:'fieldcontainer',
                fieldLabel: 'Indication MedDRA',
                columnWidth: 0.5,
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
                            name: 'indication_meddra_level_id',
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
                                    indicationMedraStore = form.down('combo[name=indication_meddra]').getStore(),
                                    filterObj = {meddra_level_id: newVal},
                                    filterStr = JSON.stringify(filterObj);
                                indicationMedraStore.removeAll();
                                indicationMedraStore.load({params: {filter: filterStr}});
                            }
                          
                        }
                     },
                  {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'Indication',
                            name: 'indication_meddra',
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
                                        pageSize: 100,
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
                xtype:'fieldcontainer',
                fieldLabel: 'Reaction MedDRA',
                columnWidth: 0.5,
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
                            name: 'reaction_meddra_level_id',
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
                                    reactionMedraStore = form.down('combo[name=reaction_meddra]').getStore(),
                                    filterObj = {meddra_level_id: newVal},
                                    filterStr = JSON.stringify(filterObj);
                                reactionMedraStore.removeAll();
                                reactionMedraStore.load({params: {filter: filterStr}});
                            }
                          
                        }
                     },
                  {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'Reaction',
                            name: 'reaction_meddra',
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
                                        pageSize: 100,
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
            xtype: 'datefield',
            fieldLabel: 'Start date',
            format: 'Y-m-d',
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'start_date',
            maxValue: new Date()
        },{
            xtype: 'datefield',
            fieldLabel: 'End date',
            format: 'Y-m-d',
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'end_date'
        }
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
                    table_name: 'tra_pv_drug_history',
                    storeID: 'pvDrugHistoryStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});