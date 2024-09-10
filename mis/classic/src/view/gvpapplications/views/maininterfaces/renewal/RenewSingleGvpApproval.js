/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewSingleGvpApproval', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.SingleGvpApproval',
    xtype: 'renewsinglegvpapproval',
    items: [
        {
            xtype: 'renewsinglegvpapprovalpanel'
        }
    ]
});