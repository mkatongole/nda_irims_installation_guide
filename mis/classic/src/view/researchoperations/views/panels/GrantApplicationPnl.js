
Ext.define('Admin.view.research_operations.views.panels.GrantApplicationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'grantapplicationpnl',
    title: 'Grant Application',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'grantapplicationpnl',
    items: [
        {
            xtype: 'grantapplicationbasicinfofrm'
        },
        {
            title: 'Grant Objectives',
        }
    ]
});
