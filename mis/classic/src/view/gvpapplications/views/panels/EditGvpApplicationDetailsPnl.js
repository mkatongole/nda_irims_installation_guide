Ext.define('Admin.view.gvpapplications.views.panels.EditGvpApplicationDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'editgvpapplicationdetails',
    controller: 'gvpapplicationsvctr',
    viewModel: 'gvpapplicationsvm',
    layout: 'fit',
    items:[{
        xtype:'editgvpapplicationwizard',
        viewModel: 'gvpapplicationsvm',
    }]
});