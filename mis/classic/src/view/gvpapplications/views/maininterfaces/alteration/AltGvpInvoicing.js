/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.alteration.AltGvpInvoicing', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpInvoicing',
    xtype: 'altgvpinvoicing',
    items: [
        {
            xtype: 'altgvpinvoicingpanel'
        }
    ]
});
