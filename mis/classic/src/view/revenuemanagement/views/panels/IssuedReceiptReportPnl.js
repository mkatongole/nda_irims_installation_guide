Ext.define('Admin.view.RevenueManagement.views.panels.IssuedReceiptReportPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'issuedReceiptReportPnl',
    height: Ext.Element.getViewportHeight() - 118,
    controller: 'revenuemanagementvctr',
    scrollable: true,
    // width: '100%',
    layout: 'fit',
    items: [
        {
            xtype: 'issuedReceiptReportGrid'
        }
    ]
});