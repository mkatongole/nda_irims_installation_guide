/**
 * Created by Kip on 6/29/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagerQueryResponsePnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gvpmanagerqueryresponsepnl',
    layout: 'fit',
    items: [
        {
            xtype: 'gvpmanagerqueryresponsegrid'
        }
    ]
});