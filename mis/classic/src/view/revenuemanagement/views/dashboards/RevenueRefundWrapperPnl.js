Ext.define('Admin.view.RevenueManagement.views.dashboards.RevenueRefundWrapperPnl', {
    extend: 'Ext.Container',
    xtype: 'revenueRefundWrapperPnl',
	itemId:'revenueRefundWrapperPnl',
    layout: 'fit',
    items: [
        {
            xtype: 'revenueRefundDashPnl'
        }
    ]
});