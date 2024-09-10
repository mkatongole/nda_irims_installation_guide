Ext.define('Admin.view.pv.views.panels.NewPvEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'newPvevaluation',
    controller: 'pvvctr',
    viewModel: 'pvvm',
    layout: 'fit',
    
    items: [
        {
            xtype: 'evaluationPvReceivingWizard'
        }
    ]
});