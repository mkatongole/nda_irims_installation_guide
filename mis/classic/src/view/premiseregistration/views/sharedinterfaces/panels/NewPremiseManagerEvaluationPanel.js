
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewPremiseManagerEvaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newpremisemanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'managerevaluationgrid'
        }
    ]
});