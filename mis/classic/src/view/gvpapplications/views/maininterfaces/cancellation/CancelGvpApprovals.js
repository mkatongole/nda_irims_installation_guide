/**
 * Created by Kip on 5/21/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.cancellation.CancelGvpApprovals', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpApprovals',
    xtype: 'cancelgvpapproval',
    items: [
        {
            xtype: 'cancelgvpapprovalspanel'
        }
    ]
});