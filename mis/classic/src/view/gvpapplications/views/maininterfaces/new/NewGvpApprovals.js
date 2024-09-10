/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpApprovals', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpApprovals',
    xtype: 'newgvpapprovals',
    items: [
        {
            xtype: 'newgvpapprovalspanel'
        }
    ]
});