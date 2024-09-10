/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpInvoicing', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpInvoicing',
    xtype: 'renewgvpinvoicing',
    items: [
        {
            xtype: 'renewgvpinvoicingpanel'
        }
    ]
});
