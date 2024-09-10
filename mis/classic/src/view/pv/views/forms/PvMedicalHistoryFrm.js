Ext.define('Admin.view.pv.views.forms.PvMedicalHistoryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvmedicalhistoryFrm',
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
            value: 'tra_pv_medical_history',
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
            title: 'Medical history',
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
                fieldLabel: 'Relevant History(MedDRA)',
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
                            name: 'relevant_history_meddra_level_id',
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
                                    relavantHistoryStore = form.down('combo[name=relevant_history]').getStore(),
                                    filterObj = {meddra_level_id: newVal},
                                    filterStr = JSON.stringify(filterObj);
                                relavantHistoryStore.removeAll();
                                relavantHistoryStore.load({params: {filter: filterStr}});
                            }
                          
                        }
                     },
                  {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'Relevant History',
                            name: 'relevant_history',
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
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'Continuing',
                    name: 'continueing_id',
                     columnWidth: 0.5,
                     allowBlank:true,
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
                    xtype: 'combo',
                     anyMatch: true,
                    fieldLabel: 'Family history',
                    name: 'is_family_history_id',
                    forceSelection: true,
                    columnWidth: 0.5,
                    allowBlank:true,
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
            xtype: 'datefield',
            fieldLabel: 'Start date',
            format: 'Y-m-d',
            allowBlank:true,
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'start_date',
            maxValue: new Date()
        },{
            xtype: 'datefield',
            fieldLabel: 'End date',
            format: 'Y-m-d',
            allowBlank:true,
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'end_date'
        },
         {
            xtype: 'htmleditor',
            fieldLabel:'Medical comments',
            name: 'remark',
            grow: true, 
            columnWidth: 1,
            growMax: 200, 
            allowBlank:true,
         },{
            xtype: 'htmleditor',
            fieldLabel:'Relevant medical history',
            name: 'relevant_medical_history',
            grow: true, 
            columnWidth: 1,
            growMax: 200, 
            allowBlank:true,
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
                    table_name: 'tra_pv_medical_history',
                    storeID: 'pvMedicalHistoryStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});