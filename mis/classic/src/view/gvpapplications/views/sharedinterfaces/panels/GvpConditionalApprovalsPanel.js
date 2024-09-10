/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpConditionalApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gvpconditionalapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gvpconditionalapprovalsgrid'
        }
    ]
});