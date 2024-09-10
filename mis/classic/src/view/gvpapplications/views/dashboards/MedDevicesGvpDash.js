/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.MedDevicesGvpDash', {
    extend: 'Ext.Container',
    xtype: 'meddevicesgvpdash',
    layout:'border',
    items: [
        {
            xtype: 'meddevicesgvpgrid',
            region: 'center',
            title: 'Active Tasks',
            margin:2
        },{
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});