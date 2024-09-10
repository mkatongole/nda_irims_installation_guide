/**
 * Created by Kip on 5/8/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.GvpManSitePersonnelTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'gvpmansitepersonneltabpnl',
    margin: 3,
    items: [
        {
            title: 'Billing Recipient Details',
            xtype: 'gvpbillingdetailsfrm',
            scrollable: true
        },
        {
            title: 'Application Contact Person',
            xtype: 'premisecontactpersonfrm',
            scrollable: true
        },
        {
            title: 'Other Personnel',
            xtype: 'gvpmansitepersonneldetailsgrid',
            hidden: true
        }
    ]
});