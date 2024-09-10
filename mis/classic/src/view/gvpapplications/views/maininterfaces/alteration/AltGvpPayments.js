/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.alteration.AltGvpPayments', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpPayments',
    xtype: 'altgvppayments',
    items: [
        {
            xtype: 'altgvppaymentspanel'
        }
    ]
});