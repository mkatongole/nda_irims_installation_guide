/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpInspection', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpInspection',
    xtype: 'newgvpinspection',
    items: [
        {
            xtype: 'newgvpinspectionpanel'
        }
    ]
});