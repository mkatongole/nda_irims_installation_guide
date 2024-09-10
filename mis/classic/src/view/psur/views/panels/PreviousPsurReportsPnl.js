Ext.define('Admin.view.psur.views.panels.PreviousPsurReportsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'previousPsurReportsPnl',
    controller: 'psurVctr',
    viewModel: 'psurVm',
    layout: 'fit',
    
    items: [
        {
            xtype: 'previousPsurReportsGrid'
        },{
                    xtype: 'hiddenfield',
                    name: 'product_id'
            },{
                xtype: 'hiddenfield',
                name: 'active_application_code'
               },
    ]
});