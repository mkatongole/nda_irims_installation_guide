
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.NewSIAPremisepprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newsiapremiseapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'siapremiseapprovalsgrid'
        }
    ]
});