
Ext.define('Admin.view.research_operations.views.panels.ResearchInnovationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'researchinnovationpnl',
    title: 'Research Innovation',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'researchinnovationpnl',
    
    items: [
        {
            xtype: 'researchinnovationgrid'
        }
    ]
});
