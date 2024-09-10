/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.research_operations.views.forms.ResearchInnovationTcRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'researchinnovationtcrecommendationfrm',
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
            name: 'meeting_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'thematic_id',
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_researchinnovation_tc_recommendations'
        },
        {
            xtype: 'hiddenfield',
            name: 'ritc_recommendation_id'
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
            grow: true, 
            growMax: 200, 
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
            ui: 'soft-purple', 
            is_winclosaable: true,
            handler: 'doCreateTcRecommendationParamWin',
            action_url:'researchoperations/saveResearchInnovationTcRecommendationData',
            table_name:'tra_researchinnovation_tc_recommendations',
            storeID:'clinicaltrialrecommreviewstr'
        }
    ]
});