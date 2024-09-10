Ext.define('Admin.view.RevenueManagement.views.panels.ApprovedRefundsReport', {
    extend: 'Ext.panel.Panel',
    xtype: 'approvedRefunds',
    height: Ext.Element.getViewportHeight() - 118,
    controller: 'revenuemanagementvctr',
    scrollable: true,
    // width: '100%',
    layout: 'fit',
    items: [
        {
            xtype: 'issuedRefundsReportGrid'
        }
    ]
});