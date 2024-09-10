/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpDeskReviewScheduling', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpDeskReviewScheduling',
    xtype: 'newgvpdeskreviewscheduling',
    items: [
        {
            xtype: 'newgvpdeskreviewschedulingpanel'
        }
    ]
});
