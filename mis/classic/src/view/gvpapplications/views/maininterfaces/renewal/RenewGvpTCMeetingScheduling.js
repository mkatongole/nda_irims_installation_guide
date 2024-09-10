/**
 * Created by Kip on 5/20/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpTCMeetingScheduling', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpTCMeetingScheduling',
    xtype: 'renewgvptcmeetingscheduling',
    items: [
        {
            xtype: 'renewgvptcmeetingschedulingpanel'
        }
    ]
});