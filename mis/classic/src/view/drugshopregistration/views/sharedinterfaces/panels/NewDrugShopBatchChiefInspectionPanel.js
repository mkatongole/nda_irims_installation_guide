
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.NewDrugShopBatchChiefInspectionPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newdrugshopbatchchiefinspectionpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'drugshopbatchchiefinspectiongrid'
        }
    ]
});