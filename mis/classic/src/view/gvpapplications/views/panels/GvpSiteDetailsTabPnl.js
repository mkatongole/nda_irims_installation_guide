/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gvpapplications.views.panels.GvpSiteDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'gvpsitedetailstabpnl',
    items: [
        {
            title: 'Gvp Site Details',
            autoScroll:true,
            xtype: 'gvpsitedetailsfrm'
        },
        {
            title: 'Local Technical Representative',
            autoScroll:true,
            xtype: 'gvpltrfrm'
        },
        {
            title: 'Personnel Details',
            autoScroll:true,
            xtype: 'gvpmansitepersonneltabpnl'
        },
        {
            title: `Contracted Gvp Site's Activity Details`,
            autoScroll:true,
            xtype: 'gvpcontractmanufactureractivitygrid',
        },
    ]
});