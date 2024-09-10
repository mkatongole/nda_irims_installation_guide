/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpDeskReviewProcess', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpDeskReviewProcess',
    xtype: 'renewgvpdeskreviewprocess',
    items: [
        {
            xtype: 'renewgvpdeskreviewprocesspanel'
        }
    ]
});
