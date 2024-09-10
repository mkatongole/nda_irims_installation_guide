
Ext.define('Admin.view.persponnelmanagement.views.dashboards.DrugshopIncharges', {
    extend: 'Ext.container.Container',
    xtype: 'drugshopincharges',
    itemId:'drugshopincharges',
    layout: 'responsivecolumn',
    controller: 'personelmanagementvctr',
    viewModel: 'personnelmanagementvm',
    items: [
        {
            xtype: 'drugshopinchargespnl'
        }
    ]
});
