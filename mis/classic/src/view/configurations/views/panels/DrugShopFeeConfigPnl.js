Ext.define('Admin.view.configurations.views.panels.DrugShopFeeConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugshopfeeconfigpnl',
    title: 'Licensing Fee Configurations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'drugshopfeeconfiggrid'
        }
    ],

});
