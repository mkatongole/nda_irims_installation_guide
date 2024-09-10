/**
 * Created by Kip on 1/9/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.OnlineManSiteDetailsWinTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinemansitedetailswintabpnl',
    items: [
        {
            title: 'Site Details',
            xtype: 'mansitedetailsfrm'
        },
        {
            title: 'Local Technical Rep',
            xtype: 'ltrfrm'
        },
         {
            title: 'Contract Manufacturing Activity Details',
            autoScroll:true,
            xtype: 'contractmanufacturingtabPnl'//'mansitepersonneldetailsgrid'
        },
        {
            title: 'Manufacturing Site Personnel',
            xtype: 'mansitepersonneltabpnl'//'mansitepersonneldetailsonlinegrid'
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