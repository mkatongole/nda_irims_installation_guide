/**
 * Created by Kip on 1/9/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.OnlineGmpPaymentWinTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinegmppaymentwintabpnl',
    items: [
        {
          xtype: 'gmponlinescreeninggrid',
          title: 'Pre Checking'
        },{
          xtype: 'onlineappinvoicepaymentspanel',
         title: 'Invoice & Payment Details '
        }
    ]
});