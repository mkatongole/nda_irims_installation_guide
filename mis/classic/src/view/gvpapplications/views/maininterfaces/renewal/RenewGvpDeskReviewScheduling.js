/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpDeskReviewScheduling', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpDeskReviewScheduling',
    xtype: 'renewgvpdeskreviewscheduling',
    items: [
        {
            xtype: 'renewgvpdeskreviewschedulingpanel'
        }
    ]
});
