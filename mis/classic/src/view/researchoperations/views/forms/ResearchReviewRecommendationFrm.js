
/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.research_operations.views.forms.ResearchReviewRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'researchReviewRecommendationFrm',
    controller: 'researchoperationsvctr',
    frame: true,
    bodyPadding: 5,
    layout: 'form',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'mg_recommendations'
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Recommendation',
            name: 'decision_id',
            store: 'tcrecommendationdecisionsstr',
            allowBlank: false
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Summary of the Final Recommendation',
            name: 'comments',
            allowBlank: true
        }
    ],
    buttons: [
        {
            xtype: 'button',
            formBind: true,
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            is_winclosaable: true,
            ui: 'soft-purple',
            name: 'save_tcrecommendation',
            handler: 'doCreatePromotionRegParamWin',
            action_url: 'researchoperations/saveResearchOperationCommentData',
            closefrm: 'researchReviewRecommendationFrm',
            table_name: 'tra_evaluation_recommendations',
            storeID: 'promotionmaterialsmanagerreviewgridStr'
        }
    ]
});