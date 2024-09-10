
Ext.define('Admin.view.drugshopregistration.views.dashboards.SIAPremiseRegDash', {
    extend: 'Ext.Container',
    xtype: 'siapremiseregdash',
    layout:'border',
    items: [
        {
            xtype: 'siapremisereggrid',
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