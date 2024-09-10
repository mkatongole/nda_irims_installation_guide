
Ext.define('Admin.view.research_operations.views.dashboards.ResearchInnovation.js', {
    extend: 'Ext.container.Container',
    xtype: 'researchinnovation',
    itemId:'researchinnovation',
    layout: 'responsivecolumn',
    controller: 'researchoperationsvctr',
    viewModel: 'researchoperationsvm',
    items: [
        {
            xtype: 'researchinnovationpnl'
        }
    ]
});
