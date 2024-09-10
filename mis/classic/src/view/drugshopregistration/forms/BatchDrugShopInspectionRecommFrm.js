/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.BatchDrugShopInspectionRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'batchdrugdhopinspectiontecommfrm',
    layout: 'form',
    frame: true,
    scrollable:true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 1,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'selected_appcodes'
        },
        {
            xtype: 'hiddenfield',
            name: 'selected_appIds'
        },
        
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name'
        },
         {
            xtype: 'combo',
            name: 'chiefregional_inspector_recommendation_id',
            fieldLabel: "Chief Regional Inspector's Recommendation",
            queryMode: 'local',
            columnWidth: 1,
            forceSelection: true,
            allowBlank: false,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseinspection_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        
         {
            xtype: 'htmleditor',
            fieldLabel: 'Comment',
            columnWidth: 1,
            name: 'chiefregional_inspector_remarks',
            allowBlank: false
        }
     
    ],
    buttons: [
        {
            text: 'Save Recommendation',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            storeID: 'batchdrugshopshopinspetionstr',
            name:'btn_preminsprecommendation',
            //handler: 'doSaveBatchInspectionRecommendationDetails',
            action_url: 'premiseregistration/savePremiseBatchInspectionRecommendation',
            table_name: 'tra_premiseinspection_applications',
        },
        {
            xtype: 'button',
            text: 'Clear',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});