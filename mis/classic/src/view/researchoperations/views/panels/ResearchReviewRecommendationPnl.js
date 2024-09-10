/**
 * Created by Ann on 10/04/2024.
 */
Ext.define('Admin.view.research_operations.views.panels.ResearchReviewRecommendationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'researchreviewrecommendationpnl',
    layout:'fit',
    items:[{
        title: 'Review Recommendations',
        xtype: 'researchReviewRecommendationFrm'
    },{
        title: 'Internal Research Final Recommendation Reports',
        xtype: 'productEvaluationUploadsGrid'
    }]
});