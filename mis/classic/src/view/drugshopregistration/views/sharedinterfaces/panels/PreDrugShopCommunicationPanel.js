
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.PreDrugShopCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'predrugshopcommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'predrugshopcommunicationsgrid'
        }
    ]
});