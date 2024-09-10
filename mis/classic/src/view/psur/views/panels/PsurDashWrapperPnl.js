Ext.define('Admin.view.psur.views.panels.PsurDashWrapperPnl', {
    extend: 'Ext.Container',
    xtype: 'psurDashWrapperPnl',
	itemId:'psurDashWrapperPnl',
    layout: 'fit',
    items: [
        {
            xtype: 'psurDashPnl'
        }
    ]
});