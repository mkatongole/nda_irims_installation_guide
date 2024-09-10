Ext.define('Admin.view.pv.views.forms.PvTestFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvtestFrm',
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
            value: 'tra_pv_test_procedures',
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
            title: 'Tests and procedures',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[
            {
            xtype: 'datefield',
            fieldLabel: 'Test date',
            format: 'Y-m-d',
            columnWidth: 1,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'test_date',
            maxValue: new Date()
        },
        
           {
                xtype:'fieldcontainer',
                fieldLabel: 'Test Name(MedDRA)',
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
                    name: 'test_name_meddra_level_id',
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
                            testNameStore = form.down('combo[name=test_name_medra]').getStore(),
                            filterObj = {meddra_level_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        testNameStore.removeAll();
                        testNameStore.load({params: {filter: filterStr}});
                    }
                  
                 }
               },
             {
                    xtype: 'combo',
                    anyMatch: true,
                    fieldLabel: 'Test Name',
                    name: 'test_name_medra',
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

        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Test Name(MedDRA)',
        //     name: 'test_name_medra',
        //     allowBlank: true,
        // },
        {
            xtype: 'textfield',
            fieldLabel: 'Test Name',
            name: 'test_name',
            allowBlank: true,
        },        {
                xtype:'fieldcontainer',
                fieldLabel: 'Test result',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.33,
                    labelAlign: 'top'
                },
                items:[{
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: ' ',
                    name: 'test_logic_id',
                    forceSelection: true,
                    hideLabel: true,
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
                                        table_name: 'par_adr_test_result_signs'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                 },{
                        xtype: 'numberfield',
                        hideLabel: true,
                        fieldLabel: ' ',
                        name: 'no_of_tests',
                        allowBlank: true
                    },
                    {
                        xtype: 'combo',
                        name: 'test_si_unit_id',
                        fieldLabel: " ",
                        queryMode: 'local',
                        hideLabel: true,
                        forceSelection: true,
                        allowBlank: true,
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                            beforerender: {
                                fn: 'setCompStore',
                                config: {
                                    pageSize: 100,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_si_units'
                                        }
                                    }
                                },
                                isLoad: true
                            }
                        }
                 }
                ]
            } ,

        // 
       
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Test result (code)',
            name: 'test_result_code_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: true,
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_test_code'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

         {
                xtype:'fieldcontainer',
                fieldLabel: 'Normal low value',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.33,
                    labelAlign: 'top'
                },
                items:[{
                        xtype: 'numberfield',
                        hideLabel: true,
                        fieldLabel: ' ',
                        name: 'normal_low_value',
                        allowBlank: true
                    },
                    {
                        xtype: 'combo',
                        name: 'lowvalue_si_unit_id',
                        fieldLabel: " ",
                        queryMode: 'local',
                        hideLabel: true,
                        forceSelection: true,
                        allowBlank: true,
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                            beforerender: {
                                fn: 'setCompStore',
                                config: {
                                    pageSize: 100,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_si_units'
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
                xtype:'fieldcontainer',
                fieldLabel: 'Normal high value',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.33,
                    labelAlign: 'top'
                },
                items:[{
                        xtype: 'numberfield',
                        hideLabel: true,
                        fieldLabel: ' ',
                        name: 'normal_high_value',
                        allowBlank: true
                    },
                    {
                        xtype: 'combo',
                        name: 'highvalue_si_unit_id',
                        fieldLabel: " ",
                        queryMode: 'local',
                        hideLabel: true,
                        forceSelection: true,
                        allowBlank: true,
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                            beforerender: {
                                fn: 'setCompStore',
                                config: {
                                    pageSize: 100,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_si_units'
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
            xtype: 'htmleditor',
            fieldLabel: 'Result',
            columnWidth: 1,
            allowBlank: true,
            name: 'result',
        },
       

        {
            xtype: 'htmleditor',
            fieldLabel: 'Comments by initial reporter',
            columnWidth: 1,
            name: 'remarks',
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
                    table_name: 'tra_pv_test_procedures',
                    storeID: 'pvTestStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});