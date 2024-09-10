/**
 * Created by Jeff on 09/02/2024.
 */
Ext.define('Admin.view.research_operations.views.dashboards.ResearchOperationsDash', {
    extend: 'Ext.Container',
    xtype: 'researchoperationsdash',
    layout:'border',
    items: [
        {
            xtype: 'researchoperationsgrid',
            region: 'center',
            title: 'Active Research Operations',
            margin:2
        }

    ]
});