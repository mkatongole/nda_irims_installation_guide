/**
 * Created by Kip on 6/7/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.MedDevicesGvpDismissedAppsDash', {
    extend: 'Ext.Container',
    xtype: 'meddevicesgvpdismissedappsdash',
    layout: 'border',
    items: [
        {
            xtype: 'gvpdismissedappsgrid',
            region: 'center',
            title: 'Dismissed Applications',
            margin: 2,
            section: 5
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});