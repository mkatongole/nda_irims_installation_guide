
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.PreDrugShopBatchChiefInspectionPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'predrugshopbatchchiefinspectionpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'predrugshopbatchchiefinspectiongrid'
        }
    ]
});