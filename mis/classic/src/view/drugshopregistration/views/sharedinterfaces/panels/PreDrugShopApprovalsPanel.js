
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.PreDrugShopApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'predrugshopapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'predrugshopapprovalsgrid'
        }
    ]
});