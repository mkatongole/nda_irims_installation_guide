Ext.define('Admin.view.psur.views.panels.NewPsurReceivingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'newPsurReceivingPnl',
    controller: 'psurVctr',
    viewModel: 'psurVm',
    layout: 'fit',
    
    items: [
        {
            xtype: 'newpsurreceivingwizard'
        },{
                    xtype: 'hiddenfield',
                    name: 'product_id'
            },
    ]
});