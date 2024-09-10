
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.PreSIAPremiseManagerEvaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'presiapremisemanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'presiapremisemanagerevaluationgrid'
        }
    ]
});