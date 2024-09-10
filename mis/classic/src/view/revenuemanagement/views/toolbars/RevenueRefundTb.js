Ext.define('Admin.view.RevenueManagement.views.toolbars.RevenueRefundTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'revenueRefundTb',
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
            sec_dashboard:'revenueRefundDashPnl',
            name: 'refundHomeBtn'
        },
        {
            text: 'New Application',
            iconCls: 'x-fa fa-plus',
            handler: 'showNewRefundApplication',
            app_type: 99
        }
    ]
});