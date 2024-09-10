Ext.define('Admin.view.psur.views.dashboards.PsurPnl', {
    extend: 'Ext.Container',
    xtype: 'psurCtn',
    controller: 'psurVctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 32
        },
        {
            xtype: 'psurDashWrapperPnl',
            region: 'center'
        },
        {
            xtype: 'psurTb',
            region: 'south'
        }
    ]
});