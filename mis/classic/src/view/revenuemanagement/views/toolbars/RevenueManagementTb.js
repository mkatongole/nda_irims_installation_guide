Ext.define('Admin.view.RevenueManagement.views.toolbars.RevenueManagementTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'revenueManagementTb',
    ui: 'footer',
    defaults: {
        ui: 'soft-blue',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            sec_dashboard:'revenueManagementDashPnl',
            name: 'AdvancedCustomerHomeBtn'
        },
        {
            text: 'New Application',
            iconCls: 'x-fa fa-plus',
            handler: 'showNewApplication',
            app_type: 98
        }
    ]
});