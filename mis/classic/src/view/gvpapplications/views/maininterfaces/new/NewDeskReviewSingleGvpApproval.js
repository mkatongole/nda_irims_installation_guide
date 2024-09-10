/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewDeskReviewSingleGvpApproval', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.SingleGvpApproval',
    xtype: 'newdeskreviewsinglegvpapproval',
    items: [
        {
            xtype: 'newsingledeskreviewgvpapprovalpanel'
        }
    ]
});