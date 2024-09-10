Ext.define('Admin.view.pv.views.panels.PvStudyDetailsPnl', {
    extend: 'Ext.panel.Panel',
    controller: 'pvvctr',
    xtype: 'pvstudydetailspnl',
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],
    items: [
       {
    xtype: 'gridpanel',
    itemId: 'pvstudydetailsgrid',
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
                storeId: 'pvstudydetailsgridstr',
                proxy: {
                    url: 'pv/getStudyDetails',
                },
            },
            isLoad: true,
        },
    },

    columns: [
        {
            xtype: 'gridcolumn',
            width: 40,
            hidden: true,
            dataIndex: 'id',
            text: '#'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'study_registration_number',
            text: 'Study registration number',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'study_country',
            text: 'Study registration country',
            flex: 1
        },
        {
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
                storeID: 'pvstudydetailsgridstr',
                table_name: 'tra_pv_study_details'
            }
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            this.up('gridpanel').fireEvent('refresh', this, 'tra_pv_test_procedures');
        }
    }],

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
                            xtype: 'textfield',
                            width:'45%',
                             hideLabel: true,
                            emptyText: 'Study registration number',
                            fieldLabel: 'Study registration number',
                            name: 'study_registration_number',
                            allowBlank: true,
                        },
                        {  
                            xtype: 'combo', anyMatch: true,
                            fieldLabel: 'Study registration country',
                            name: 'country_id',
                            width:'45%',
                             emptyText: 'Study registration country',
                             hideLabel: true,
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
                                                table_name: 'par_countries'
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
                            storeID: 'pvstudydetailsgridstr',
                            width:'10%',
                            table_name: 'tra_pv_study_details',
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
