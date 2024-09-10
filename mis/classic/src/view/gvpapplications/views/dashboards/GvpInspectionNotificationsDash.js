/**
 * Created by Kip on 5/22/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.GvpInspectionNotificationsDash', {
    extend: 'Ext.Container',
    xtype: 'gvpinspectionnotificationsdash',
    layout:'border',
    items: [
        {
            xtype: 'gvpnotificationsgrid',
            region: 'center',
            title: 'Active Notifications',
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