/**
 * Created by Kip on 5/20/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpTCMeetingScheduling', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpTCMeetingScheduling',
    xtype: 'newgvptcmeetingscheduling',
    items: [
        {
            xtype: 'newgvptcmeetingschedulingpanel'
        }
    ]
});