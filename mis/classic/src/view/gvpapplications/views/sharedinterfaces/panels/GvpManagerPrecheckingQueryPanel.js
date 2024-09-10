/**
 * Created by Kip on 7/2/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagerPrecheckingQueryPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gvpmanagerprecheckingquerypanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gvpmanagerprecheckingquerygrid'
        }
    ]
});