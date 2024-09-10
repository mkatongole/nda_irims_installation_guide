/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.alteration.AltGvpApprovals', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpApprovals',
    xtype: 'altgvpapprovals',
    items: [
        {
            xtype: 'altgvpapprovalspanel'
        }
    ]
});