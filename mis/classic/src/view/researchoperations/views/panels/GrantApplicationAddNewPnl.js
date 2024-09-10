
Ext.define('Admin.view.research_operations.views.panels.GrantApplicationAddNewPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'grantapplicationaddnewpnl',
    itemId: 'grantapplicationaddnewpnl',
    title: 'Grant Application Add new Panel',
    userCls: 'big-100 small-100',
    viewModel: 'researchoperationsvm',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
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
            xtype: 'grantapplicationwizardfrm'
        }
    ]
});
