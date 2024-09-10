
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.NewSIAPremiseCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newsiapremisecommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'siapremisecommunicationsgrid'
        }
    ]
});