Ext.define('Admin.view.RevenueManagement.views.panels.AdvancedCustomerApplicationReceivingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'advancedCustomerApplicationReceivingPnl',
    controller: 'revenuemanagementvctr',
    viewModel: 'revenueManagementVm',
    layout: 'fit',
    
    items: [
        {
            xtype: 'advancedApplicationReceivingPnl'
        }
    ]
});