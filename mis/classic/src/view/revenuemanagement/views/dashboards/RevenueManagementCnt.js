Ext.define('Admin.view.RevenueManagement.views.dashboards.RevenueManagementCnt', {
    extend: 'Ext.Container',
    xtype: 'revenueManagementCnt',
    controller: 'revenuemanagementvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 16
        },
        {
            xtype: 'revenueManagementWrapperPnl',
            region: 'center'
        },
        {
            xtype: 'revenueManagementTb',
            region: 'south'
        }
    ]
});