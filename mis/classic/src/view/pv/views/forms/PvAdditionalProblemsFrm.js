Ext.define('Admin.view.pv.views.forms.PvAdditionalProblemsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvadditionalproblemsfrm',
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
            value: 'tra_additional_problems',
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
            title: 'Additional Problems',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 1,
            },
            layout: 'column',
           items:[    {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'Related Problem',
                            hideLabel: true,
                            columnWidth: 1,
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
                    table_name: 'tra_additional_problems',
                    storeID: 'pvadditionalproblemsgridstr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});