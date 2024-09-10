/**
 * Created by Kip on 5/24/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.alteration.AltGvpManagerEvaluationPanel', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagersGenericPanel',
    xtype: 'altgvpmanagerevaluationpanel',
    items: [
        {
            xtype: 'gvpaltmanagerevaluationgrid'
        }
    ]
});