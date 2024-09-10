Ext.define('Admin.view.parameters.RevenueAccounts', {
    extend: 'Ext.panel.Panel',
    xtype: 'revenueaccounts',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'revenueaccountsgrid',
        }
    ]
});