
Ext.define('Admin.view.research_operations.views.dashboards.GrantApplication.js', {
    extend: 'Ext.container.Container',
    xtype: 'grantapplication',
    itemId:'grantapplication',
    layout: 'responsivecolumn',
    controller: 'researchoperationsvctr',
    viewModel: 'researchoperationsvm',
    items: [
        {
            xtype: 'grantapplicationpnl'
        }
    ]
});
