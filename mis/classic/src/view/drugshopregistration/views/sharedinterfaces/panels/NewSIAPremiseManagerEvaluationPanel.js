
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.NewSIAPremiseManagerEvaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newsiapremisemanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'siapremisemanagerevaluationgrid'
        }
    ]
});