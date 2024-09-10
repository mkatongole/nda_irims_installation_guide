/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpApprovalForDeskReview', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpApprovalForDeskReview',
    xtype: 'newgvpapprovalfordeskreview',
    items: [
        {
            xtype: 'newgvpapprovalfordeskreviewpanel'
        }
    ]
});