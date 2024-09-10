
Ext.define('Admin.view.personnelmanagement.views.panels.DrugShopInchargesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugshopinchargespnl',
    title: 'Incharge Personnel',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'drugshopinchargespnl',
    items: [
        {
            xtype: 'drugshopinchargesgrid'
        }
    ]
});
