/**
 * Created by Kip on 1/9/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.OnlineGvpPaymentWinTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinegvppaymentwintabpnl',
    items: [
        {
          xtype: 'gvponlinescreeninggrid',
          title: 'Pre Checking'
        },{
          xtype: 'onlineappinvoicepaymentspanel',
         title: 'Invoice & Payment Details '
        }
    ]
});