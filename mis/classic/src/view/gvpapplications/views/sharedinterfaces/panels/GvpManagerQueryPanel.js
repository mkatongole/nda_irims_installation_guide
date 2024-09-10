/**
 * Created by Kip on 1/7/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagerQueryPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gvpmanagerquerypanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gvpmanagerquerygrid'
        }
    ]
});