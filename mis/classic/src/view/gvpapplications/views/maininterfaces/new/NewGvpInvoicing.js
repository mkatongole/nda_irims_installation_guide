/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpInvoicing', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpInvoicing',
    xtype: 'newgvpinvoicing',
    items: [
        {
            xtype: 'newgvpinvoicingpanel'
        }
    ]
});
