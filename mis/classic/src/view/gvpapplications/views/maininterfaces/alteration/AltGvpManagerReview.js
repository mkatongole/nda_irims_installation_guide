/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.alteration.AltGvpManagerReview', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpManagerReview',
    xtype: 'altgvpmanagerreview',
    items: [
        {
            xtype: 'altgvpmanagerreviewpanel'
        }
    ]
});