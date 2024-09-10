/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.MedDevicesGvpDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'meddevicesgvpdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'meddevicesgvpdash'
        }
    ]
});