/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpInspectionScheduling', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpInspectionScheduling',
    xtype: 'renewgvpinspectionscheduling',
    items: [
        {
            xtype: 'renewgvpinspectionschedulingpanel'
        }
    ]
});