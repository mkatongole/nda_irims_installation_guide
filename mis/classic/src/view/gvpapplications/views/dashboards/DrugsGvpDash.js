/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.DrugsGvpDash', {
    extend: 'Ext.Container',
    xtype: 'drugsgvpdash',
    layout:'border',
    items: [
        {
            xtype: 'drugsgvpgrid',
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