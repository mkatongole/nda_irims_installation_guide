Ext.define('Admin.view.configurations.views.panels.PharmacistPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pharmacistpnl',
    title: 'Pharmacist',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'pharmacistgrid'
        }
    ]
});
