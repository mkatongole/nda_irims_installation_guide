
Ext.define('Admin.view.research_operations.views.forms.ResearchInnovationBasicFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.researchinnovationbasicfrm',
    itemId: 'researchinnovationbasicfrm',
    bodyPadding: 8,
    controller: 'researchoperationsvctr',
    autoScroll: true,
    items: [
        {
            xtype: 'container',
            layout: 'column',
            defaults: {
                labelAlign: 'top',
                labelStyle: {
                    'font-weight': 'bold'
                },
                allowBlank: true
            },
            fieldDefaults: {
                xtype: 'textfield',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                }
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'id',
                    columnWidth: 0.25,
                    margin: '0 20 20 0',
                    name: 'id'
                }, {
                    xtype: 'textfield',
                    value: token,
                    name: '_token',
                    hidden: true
                }, {
                    xtype: 'hiddenfield',
                    margin: '0 20 20 0',
                    name: 'table_name',
                    value: 'tra_grants',
                    allowBlank: true
                },

            {
                xtype: 'textfield',
                fieldLabel: 'Meeting Title',
                name: 'name',
                columnWidth: 0.25,
                margin: '0 20 0 0',
                allowBlank: false,
            },
            {
                xtype: 'textareafield',
                fieldLabel: 'Description',
                name: 'grant_name',
                columnWidth: 0.25,
                margin: '0 20 0 0',
                allowBlank: false,

                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Scheduled Date',
                    name: 'grant_description',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    allowBlank: false,
                    format: 'd-m-Y',


                },
                {
                    xtype: 'timefield',
                    fieldLabel: 'Start Time',
                    name: 'grant_period_from',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    allowBlank: false,
                    format: 'H:i',

                },
                {
                    xtype: 'timefield',
                    fieldLabel: 'End Time',
                    name: 'grant_period_to',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    allowBlank: false,
                    format: 'H:i',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Location',
                    name: 'grant_location',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    allowBlank: false,
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Status',
                    displayField: 'name',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'status_id',
                    defaultValue: 1,
                    valueField: 'id',       
                    forceSelection: true,
                    allowBlank: true,
                    hidden: true,
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url: 'researchoperations/getMeetingStatusParams',
                                }
                            },
                            isLoad: true
                        }
                    }
                }, 

                {
                    xtype: 'combo',
                    fieldLabel: 'Meeting Type',
                    displayField: 'name',
                    valueField: 'id',
                    name:'meeting_type_id',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'type_id',
                    listeners: {
                        beforerender:{
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize:5,
                                proxy: {
                                    url:'researchoperations/getMeetingTypeParams',
                                }
                            },
                        }
                    }
            },

            {
                xtype: 'htmleditor',
                fieldLabel: 'Additional Notes',
                name: 'grant_description',
                columnWidth: 0.5,
                margin: '0 20 0 0',
                allowBlank: false,
            },
            {
                xtype: 'jsuiteseditor',
                // other configs
            }
            
        
            ]
        }
    ]
});

