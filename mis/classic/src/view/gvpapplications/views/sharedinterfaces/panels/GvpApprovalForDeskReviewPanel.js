/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpApprovalForDeskReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gvpapprovalfordeskreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gvpapprovalfordeskreviewgrid'
        }
    ]
});