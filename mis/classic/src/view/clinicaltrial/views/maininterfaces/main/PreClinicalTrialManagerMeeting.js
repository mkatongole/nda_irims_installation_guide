/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.PreClinicalTrialManagerMeeting', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.PreClinicalTrialManagerMeeting',
    xtype: 'preclinicaltrialmanagermeeting',

    items: [
        {
            xtype: 'preclinicaltrialmanagermeetingpanel'
        }
    ]
});