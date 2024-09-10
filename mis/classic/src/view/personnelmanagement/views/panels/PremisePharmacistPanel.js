
Ext.define('Admin.view.personnelmanagement.views.panels.PremisePharmacistPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisepharmacistpanel',
    title: 'Pharmacists',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'premisepharmacistpanel',
    items: [
        {
            xtype: 'premisepharmacistgrid'
        }
    ]
});
