/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.GvpVeterinaryMedicinesDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'gvpveterinarymedicinesdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'drugsgvpdash'
        }
    ]
});