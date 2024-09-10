Ext.define('Admin.view.RevenueManagement.views.panels.IssuedInvoiceReportPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'issuedInvoiceReportPnl',
    height: Ext.Element.getViewportHeight() - 118,
    controller: 'revenuemanagementvctr',
    scrollable: true,
    // width: '100%',
    layout: 'fit',
    items: [
        {
            xtype: 'issuedInvoiceReportGrid'
        }
    ]
});