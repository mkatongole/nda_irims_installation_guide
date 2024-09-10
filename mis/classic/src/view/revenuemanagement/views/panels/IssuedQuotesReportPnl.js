Ext.define('Admin.view.RevenueManagement.views.panels.IssuedQuotesReportPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'issuedQuotesReportPnl',
    height: Ext.Element.getViewportHeight() - 118,
    controller: 'revenuemanagementvctr',
    scrollable: true,
    // width: '100%',
    layout: 'fit',
    items: [
        {
            xtype: 'issuedQuotesReportGrid'
        }
    ]
});