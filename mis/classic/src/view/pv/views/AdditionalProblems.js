Ext.define('Admin.view.dashboard.AdditionalProblems', {
    extend: 'Ext.panel.Panel',
    controller: 'pvvctr',
    xtype: 'additionalproblems',
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],
     listeners: {
        afterrender: function (panel) {
            var pvIdField = Ext.ComponentQuery.query('hiddenfield[name=pv_id]')[0];
            if (pvIdField) {
                var pv_id = pvIdField.getValue();
                var gridStore = panel.down('gridpanel').getStore();
                gridStore.getProxy().extraParams = {pv_id:pv_id};
                console.log('sasa');
                gridStore.load();
            }
        }
    },
    items: [
        {
            xtype: 'gridpanel',
            header: false,
            hideHeaders: true,
            scrollable: {
                x: false,
                y: false
            },
            listeners: {
                beforerender: {
                    fn: 'func_setStore',
                    config: {
                        pageSize: 1000,
                        storeId: 'additionalproblemsgridstr',
                        proxy: {
                            url: 'pv/getRelatedProblems',
                        },
                    },
                    isLoad: true,
                },
            },
            columns: [
               {
                    xtype: 'gridcolumn',
                    width: 40,
                    hidden:true,
                    dataIndex: 'id',
                    text: '#'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'related_problem',
                    text: 'Additional drug-related problem',
                    flex: 1
                },{
                    xtype: 'widgetcolumn',
                    width: 40,
                    widget: {
                        width: 40,
                        textAlign: 'left',
                        xtype: 'button',
                        ui: 'soft-red',
                        action_url: 'configurations/deleteConfigRecord', 
                        iconCls: 'x-fa fa-trash',
                        handler: 'doDeleteRelatedProblem',
                        storeID: 'additionalproblemsgridstr',
                        table_name: 'tra_additional_problems'
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    dock: 'bottom',
                    padding: '10 0 10 0',
                    items: [

                    {
                xtype: 'fieldcontainer',
                width:'100%',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                        {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'Related Problem',
                            hideLabel: true,
                            width:'90%',
                            name: 'adr_related_problems_id',
                            forceSelection: true,
                            queryMode: 'local',
                            valueField: 'id',
                            allowBlank: false,
                            labelAlign: 'top',
                            displayField: 'name',
                            listeners: {
                                    beforerender: {
                                        fn: 'setCompStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                extraParams: {
                                                    table_name: 'par_adr_related_problems'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                }
                            },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-plus',
                            action_url: 'configurations/saveConfigCommonData',
                            storeID: 'additionalproblemsgridstr',
                            width:'10%',
                            table_name: 'tra_additional_problems',
                            handler: 'doCreateRelatedProblem'
                            //margin: '30 0 0 0'
                        }
                       ]
                      }
                         
                    ]
                }
            ]
        }
    ]
});
