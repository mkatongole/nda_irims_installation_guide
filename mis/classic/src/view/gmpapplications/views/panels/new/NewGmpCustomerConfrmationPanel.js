Ext.define('Admin.view.gmpapplications.views.panels.new.NewGmpCustomerConfrmationPanel', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagersGenericPanel',
    xtype: 'newgmpcustomerconfirmationpanel',
    items: [
        {
            xtype: 'gmpcustomerconfirmationgrid'
        }
    ]
});