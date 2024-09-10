/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.GvpSiteDetailsWinTabPnl', {
    extend: 'Admin.view.gvpapplications.views.panels.GvpSiteDetailsTabPnl',
    xtype: 'gvpsitedetailswintabpnl',
    items: [
        {
            title: 'Main Details',
            xtype: 'gvpsitedetailsfrm'
        },
        {
            title: 'Local Technical Rep',
            xtype: 'gvpltrfrm'
        },
        {
            title: 'Personnel Details',
            xtype: 'gvpmansitepersonneltabpnl'
        },
        {
            title: 'Gvp Contracted Site details',
            xtype: 'gvpcontractmanufactureractivitygrid'
        }
    ]
});