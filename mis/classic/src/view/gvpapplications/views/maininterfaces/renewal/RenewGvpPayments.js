/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpPayments', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpPayments',
    xtype: 'renewgvppayments',
    items: [
        {
            xtype: 'renewgvppaymentspanel'
        }
    ]
});