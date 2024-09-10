/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gvpcommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gvpcommunicationsgrid'
        }
    ]
});