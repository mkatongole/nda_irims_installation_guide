Ext.define('Admin.view.RevenueManagement.views.panels.CustomerLedgerContPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'customerLedgerContPnl',
    controller: 'revenuemanagementvctr',
    // scrollable: true,
    // width: '100%',
    layout: 'fit',
    items: [
        {
            xtype: 'financeCustomerListGrid'
        }
    ]
});