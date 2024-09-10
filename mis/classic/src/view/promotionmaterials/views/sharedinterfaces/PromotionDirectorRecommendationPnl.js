/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.promotionmaterials.views.sharedinterfaces.PromotionDirectorRecommendationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'promotiondirectorrecommendationpnl',
    layout:'fit',
    items:[{
        title: 'Director Recommendations',
        xtype: 'promotiondirectorRecommendationFrm'
    },{
        title: 'Promotion Product Information Final Recommendation Reports',
        xtype: 'productEvaluationUploadsGrid'
    }]
});