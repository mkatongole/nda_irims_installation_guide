/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpManagerInspection', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpManagerInspection',
    xtype: 'newgvpmanagerinspection',
    items: [
        {
            xtype: 'newgvpmanagerinspectionpanel'
        }
    ]
});