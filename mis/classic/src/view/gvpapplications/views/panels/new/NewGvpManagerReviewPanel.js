Ext.define('Admin.view.gvpapplications.views.panels.new.NewGvpManagerReviewPanel', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagersGenericPanel',
    xtype: 'newgvpmanagerreviewpanel',
    items: [
        {
            xtype: 'gvpnewmanagerreviewgrid'
        }
    ]
});