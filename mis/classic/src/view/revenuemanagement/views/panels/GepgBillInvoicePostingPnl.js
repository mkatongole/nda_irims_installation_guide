
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.GepgBillInvoicePostingPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'gepgbillinvoicepostingpnl',
    layout: 'fit', viewModel: 'commoninterfacesVm',
    items: [
        {
            xtype: 'gepgbillpaymentspostinggrid',
            title: 'Payments Remittances'
        },{
            xtype: 'postpaymentbillpostinggrid',
            hidden:true,
            title: 'Post Payment Requests'
        },{
            xtype: 'gepgbillinvoicepostinggrid',
            title: 'Bills/Invoicing'
        },{
            xtype: 'gepgbillinvoicecancellationgrid',
            title: 'Bills/Invoicing Cancellation and Restoration'
        }
    ]
});