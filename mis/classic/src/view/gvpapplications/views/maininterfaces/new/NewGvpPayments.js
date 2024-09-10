/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpPayments', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpPayments',
    xtype: 'newgvppayments',
    items: [
        {
            xtype: 'newgvppaymentspanel'
        }
    ]
});