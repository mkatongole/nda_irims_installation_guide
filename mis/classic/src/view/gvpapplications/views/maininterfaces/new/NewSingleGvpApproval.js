/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewSingleGvpApproval', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.SingleGvpApproval',
    xtype: 'newsinglegvpapproval',
    items: [
        {
            xtype: 'newsinglegvpapprovalpanel'
        }
    ]
});