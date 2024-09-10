/**
 * Created by Kip on 11/21/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.OnlinePremiseDetailsWinTabPnl', {
    extend: 'Admin.view.premiseregistration.views.panels.PremiseDetailsTabPnl',
    xtype: 'onlinepremisedetailswintabpnl',
    items: [
        {
            title: 'Premises Details',
            xtype: 'premisedetailsfrm'
        },
        {
            title: 'Directors Details',
            xtype: 'premisedirectorsdetailsgrid'
        },
        {
            title: 'Staff Details',
            xtype: 'premisepersonneldetailsgrid'//'premisepersonneldetailsgrid'
        },
         {
            title: 'Particulars of Nearest Pharmancy',
            xtype: 'premisenearestpremisegrid'
        },
        {
            title: 'Personnel Details',
            hidden:true,
            xtype: 'premisepersonneltabpnl'//'premisepersonneldetailsonlinegrid'
        },
        {
            title: 'Business Details',
            hidden:true,
            xtype: 'premiseotherdetailsonlinegrid'
        }
    ]
});