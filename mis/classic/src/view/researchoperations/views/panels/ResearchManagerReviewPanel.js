Ext.define('Admin.view.research_operations.views.panels.ResearchManagerReviewPanel', {
    extend: 'Admin.view.research_operations.views.sharedinterfaces.ResearchInnovationReceiving',
    title: 'Pending Applications',
    xtype: 'researchmanagerreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'researchmanagerreviewgrid'
        },
    ]
});