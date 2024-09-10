Ext.define('Admin.view.RevenueManagement.views.panels.AdvancedCustomerRegisterPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'advancedCustomerRegisterPnl',
    controller: 'revenuemanagementvctr',
    viewModel: 'revenueManagementVm',
    layout: 'fit',
    
    items: [
        {
            xtype: 'advancedCustomerRegisterGrid'
        }
    ]
});