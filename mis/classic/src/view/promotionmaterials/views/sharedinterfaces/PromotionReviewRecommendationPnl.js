/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.promotionmaterials.views.sharedinterfaces.PromotionReviewRecommendationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'promotionreviewrecommendationpnl',
    layout:'fit',
    items:[{
        title: 'Review Recommendations',
        xtype: 'promotionReviewRecommendationFrm'
    },{
        title: 'Promotion Product Information Final Recommendation Reports',
        xtype: 'productEvaluationUploadsGrid'
    }]
});