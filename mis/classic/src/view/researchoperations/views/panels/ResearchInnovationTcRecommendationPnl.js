/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.research_operations.views.panels.ResearchInnovationTcRecommendationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'researchinnovationtcrecommendationpnl',
    layout:'fit',
    items:[{
        title: 'Peer Review Recommendations',
        xtype: 'researchinnovationtcrecommendationfrm'
    },{
        title: 'Final Recommendation Reports',
        xtype: 'productEvaluationUploadsGrid'
    }]
});