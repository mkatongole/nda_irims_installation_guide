Ext.define('Admin.view.gvpapplications.views.panels.new.NewGvpCustomerConfrmationPanel', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpReceiving',
    xtype: 'newgvpcustomerconfirmationpanel',
    items: [
        {
            xtype: 'gvpcustomerconfirmationgrid'
        }
    ]
});