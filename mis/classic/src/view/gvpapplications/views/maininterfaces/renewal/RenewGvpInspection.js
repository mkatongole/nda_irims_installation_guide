/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpInspection', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpInspection',
    xtype: 'renewgvpinspection',
    items: [
        {
            xtype: 'renewgvpinspectionpanel'
        }
    ]
});