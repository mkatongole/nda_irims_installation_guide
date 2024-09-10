Ext.define('Admin.view.RevenueManagement.views.dashboards.RevenueRefundCnt', {
    extend: 'Ext.Container',
    xtype: 'revenueRefundCnt',
    controller: 'revenuemanagementvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 16
        },
        {
            xtype: 'revenueRefundWrapperPnl',
            region: 'center'
        },
        {
            xtype: 'revenueRefundTb',
            region: 'south'
        }
    ]
});