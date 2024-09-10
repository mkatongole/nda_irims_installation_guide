Ext.define('Admin.view.research_operations.views.panels.ResearchApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'researchapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'researchapprovalsgrid'//'approvalsgrid'
        }
    ]
});