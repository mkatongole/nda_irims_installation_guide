/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpDeskReviewProcess', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpDeskReviewProcess',
    xtype: 'newgvpdeskreviewprocess',
    items: [
        {
            xtype: 'newgvpdeskreviewprocesspanel'
        }
    ]
});
