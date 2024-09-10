/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpApprovalForDeskReview', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpApprovalForDeskReview',
    xtype: 'renewgvpapprovalfordeskreview',
    items: [
        {
            xtype: 'renewgvpapprovalfordeskreviewpanel'
        }
    ]
});