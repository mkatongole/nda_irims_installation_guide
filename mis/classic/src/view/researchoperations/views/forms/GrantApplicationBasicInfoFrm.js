Ext.define('Admin.view.research_operations.views.forms.GrantApplicationBasicInfoFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.grantapplicationbasicinfofrm',
    itemId: 'grantapplicationbasicinfofrm',
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
                    fieldLabel: 'Organization Name',
                    name: 'name',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email Address of Contact Person',
                    name: 'email',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Website',
                    name: 'website',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Grant Name',
                    name: 'grant_name',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Grant Description',
                    name: 'grant_description',
                    columnWidth: 1,
                    margin: '0 20 0 0',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Grant Reference Number',
                    name: 'grant_reference_no',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Amount of Funding Requested/Granted',
                    name: 'funding_amount',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Project Title',
                    name: 'project_title',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    allowBlank: true
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Project Objectives',
                    name: 'project_objectives',
                    columnWidth: 1,
                    margin: '0 20 0 0',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Projected Start Date',
                    name: 'start_date',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    allowBlank: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Projected End Date',
                    name: 'end_date',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    allowBlank: true
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Status of Grant',
                    displayField: 'name',
                    columnWidth: 0.5,
                    margin: '0 20 0 0',
                    name: 'status_id',
                    valueField: 'id',       
                    forceSelection: true,
                    allowBlank: true,
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url: 'researchoperations/getGrantStatusParams',
                                }
                            },
                            isLoad: true
                        }
                    }
                }, 
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Follow-Up Actions',
                    name: 'follow_up_actions',
                    columnWidth: 1,
                    margin: '0 20 0 0',
                    allowBlank: true
                }
            ]
        }
    ]
});
