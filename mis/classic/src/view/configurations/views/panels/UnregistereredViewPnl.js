Ext.define('Admin.view.configurations.views.panels.UnregistereredViewPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'unregistered_view',
    title: 'Unregistered Products',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'unregistered_viewGrid'
        }
    ]
});
