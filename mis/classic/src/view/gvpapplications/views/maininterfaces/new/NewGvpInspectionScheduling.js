/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpInspectionScheduling', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpInspectionScheduling',
    xtype: 'newgvpinspectionscheduling',
    items: [
        {
            xtype: 'newgvpinspectionschedulingpanel'
        }
    ]
});