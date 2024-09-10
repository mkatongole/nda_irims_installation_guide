/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.alteration.AltGvpManagerReviewPanel', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagersGenericPanel',
    xtype: 'altgvpmanagerreviewpanel',
    items: [
        {
            xtype: 'gvpaltmanagerreviewgrid'
        }
    ]
});