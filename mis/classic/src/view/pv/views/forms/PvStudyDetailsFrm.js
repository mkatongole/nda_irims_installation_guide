Ext.define('Admin.view.pv.views.forms.PvStudyDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvstudydetailsFrm',
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
            value: 'tra_pv_study_details',
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
            title: 'Study Details',
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
           items:[  {
                            xtype: 'textfield',
                             columnWidth: 1,
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
                             columnWidth: 1,
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
                    table_name: 'tra_pv_study_details',
                    storeID: 'pvstudydetailsgridstr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});