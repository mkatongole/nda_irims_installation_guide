Ext.define('Admin.view.RevenueManagement.views.dashboards.RevenueManagementWrapperPnl', {
    extend: 'Ext.Container',
    xtype: 'revenueManagementWrapperPnl',
	itemId:'revenueManagementWrapperPnl',
    layout: 'fit',
    items: [
        {
            xtype: 'revenueManagementDashPnl'
        }
    ]
});