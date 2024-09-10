/**
 * Created by Kip on 5/21/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.cancellation.CancelGvpApprovalsPanel', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagersGenericPanel',
    xtype: 'cancelgvpapprovalspanel',
    items: [
        {
            xtype: 'gvpcancellationapprovalsgrid'
        }
    ]
});