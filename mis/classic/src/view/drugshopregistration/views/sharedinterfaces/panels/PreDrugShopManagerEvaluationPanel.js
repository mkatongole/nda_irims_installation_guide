
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.PreDrugShopManagerEvaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'predrugshopmanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'predrugshopmanagerevaluationgrid'
        }
    ]
});