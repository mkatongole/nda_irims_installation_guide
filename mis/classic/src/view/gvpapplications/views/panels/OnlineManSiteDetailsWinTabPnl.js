/**
 * Created by Kip on 1/9/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.OnlineManSiteDetailsWinTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinemansitedetailswintabpnl',
    items: [
        {
            title: 'Site Details',
            xtype: 'mansitedetailsfrm'
        },
        {
            title: 'Local Technical Rep',
            xtype: 'gvpltrfrm'
        },
         {
            title: 'Contract Manufacturing Activity Details',
            autoScroll:true,
            xtype: 'contractmanufacturingtabPnl'//'gvpmansitepersonneldetailsgrid'
        },
        {
            title: 'Manufacturing Site Personnel',
            xtype: 'gvpmansitepersonneltabpnl'//'mansitepersonneldetailsonlinegrid'
        },
        {
            title: 'Manufacturing Site Blocks',
            hidden:true,
            xtype: 'mansiteblockdetailswingrid'
        },
        {
            title: 'Business Details',
             hidden:true,
            xtype: 'mansiteotherdetailswingrid'//'mansiteotherdetailsonlinegrid'
        }
    ]
});