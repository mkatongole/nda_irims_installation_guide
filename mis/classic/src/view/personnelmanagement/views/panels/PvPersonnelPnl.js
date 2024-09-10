
Ext.define('Admin.view.personnelmanagement.views.panels.PvPersonnelPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pvpersonnelpnl',
    title: 'Pharmacovigilance Personnel',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'pvpersonnelpnl',
    items: [
        {
            xtype: 'pvpersonnelgrid'
        }
    ]
});
