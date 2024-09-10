/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.alteration.AltGvpApprovalsPanel', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagersGenericPanel',
    xtype: 'altgvpapprovalspanel',
    items: [
        {
            xtype: 'gvpalterationapprovalsgrid'
        }
    ]
});