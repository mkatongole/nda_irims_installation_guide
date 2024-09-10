/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gvpapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gvpapprovalsgrid'
        }
    ]
});