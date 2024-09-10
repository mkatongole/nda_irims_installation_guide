/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.dashboards.SIAPremiseRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'siapremiseregdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'siapremiseregdash'
        }
    ]
});