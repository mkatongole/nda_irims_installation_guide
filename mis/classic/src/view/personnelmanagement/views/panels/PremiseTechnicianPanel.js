
Ext.define('Admin.view.personnelmanagement.views.panels.PremiseTechnicianPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisetechnicianpanel',
    title: 'Pharmacists',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'premisetechnicianpanel',
    items: [
        {
            xtype: 'premisepharmacistgrid'
        }
    ]
});
