/**
 * Created by Kip on 5/13/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpTCMeetingRecommendation', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpTCMeetingRecommendation',
    xtype: 'renewgvptcmeetingrecommendation',
    items: [
        {
            xtype: 'renewgvptcmeetingrecommendationpanel'
        }
    ]
});