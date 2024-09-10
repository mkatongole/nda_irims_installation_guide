/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpApprovals', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpApprovals',
    xtype: 'renewgvpapprovals',
    items: [
        {
            xtype: 'renewgvpapprovalspanel'
        }
    ]
});