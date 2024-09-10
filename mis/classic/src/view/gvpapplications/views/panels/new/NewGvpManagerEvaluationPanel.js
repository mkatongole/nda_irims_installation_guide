/**
 * Created by Kip on 5/24/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.alteration.NewGvpManagerEvaluationPanel', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagersGenericPanel',
    xtype: 'newgvpmanagerevaluationpanel',
    items: [
        {
            xtype: 'gvpaltmanagerevaluationgrid'
        }
    ]
});