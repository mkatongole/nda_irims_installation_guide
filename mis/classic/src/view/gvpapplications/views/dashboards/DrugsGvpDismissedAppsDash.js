/**
 * Created by Kip on 6/7/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.DrugsGvpDismissedAppsDash', {
    extend: 'Ext.Container',
    xtype: 'drugsgvpdismissedappsdash',
    layout: 'border',
    items: [
        {
            xtype: 'gvpdismissedappsgrid',
            region: 'center',
            title: 'Dismissed Applications',
            margin: 2,
            section: 1
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});