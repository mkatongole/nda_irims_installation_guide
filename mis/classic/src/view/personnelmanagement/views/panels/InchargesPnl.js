
Ext.define('Admin.view.personnelmanagement.views.panels.InchargesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inchargepnl',
    layout: 'fit',
    viewModel: 'personnelmanagementvm',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 35,
            layout: 'fit',
            items: [{
                xtype: 'displayfield',
                labelAlign: 'right',
                bind: {
                    value: '{name} ({email})'
                },
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '17px',
                    'text-align': 'center'
                }
            }
            ]
        }
    ],
    items: [
        {
            xtype: 'inchargewizardfrm'
        }
    ]
});