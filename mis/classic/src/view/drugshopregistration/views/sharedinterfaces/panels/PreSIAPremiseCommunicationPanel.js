
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.PreSIAPremiseCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'presiapremisecommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'presiapremisecommunicationsgrid'
        }
    ]
});