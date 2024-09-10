
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.PreSIAPremiseApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'presiapremiseapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'presiapremiseapprovalsgrid'
        }
    ]
});