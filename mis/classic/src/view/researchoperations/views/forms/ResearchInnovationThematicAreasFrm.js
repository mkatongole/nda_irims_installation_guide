
Ext.define('Admin.view.research_operations.views.forms.ResearchInnovationThematicAreasFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.researchinnovationthematicareasfrm',
    itemId: 'researchinnovationthematicareasfrm',
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
            ]
        }
    ]
});

