/**
 * Created by Jeff on 09/02/2024.
 */
Ext.define('Admin.view.research_operations.views.dashboards.ResearchOperationsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'researchoperationsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'researchoperationsdash'
        }
    ]
});