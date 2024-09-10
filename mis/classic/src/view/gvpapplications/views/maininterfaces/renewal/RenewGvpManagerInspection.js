/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpManagerInspection', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpManagerInspection',
    xtype: 'renewgvpmanagerinspection',
    items: [
        {
            xtype: 'renewgvpmanagerinspectionpanel'
        }
    ]
});