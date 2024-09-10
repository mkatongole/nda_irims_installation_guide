Ext.define('Admin.view.promotionmaterials.views.forms.PromotionMaterialAssosorRecommendationDetailsForm', {
    extend: 'Ext.form.Panel',
    xtype: 'promotionmaterialassessorrecommendationdetailsform',
    controller: 'promotionmaterialviewcontroller',
	frame: true,
    autoScroll: true,
    scrollable:true,
    layout: {
        type: 'column',
        columns: 2
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        labelAlign: 'top',
        columnWidth:0.5
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_promotion_materials_details'
        },
       
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
   
		 {
            xtype: 'combo',
            fieldLabel: 'Type of Advertisements Material',
            //columnWidth: 0.99,
            columnWidth: 1,  
            name: 'promotions_material_id',
            allowBlank: false,
            readOnly:true, 
            forceSelection: true,
            // filterPickList: true,
            // encodeSubmitValue: true,
            emptyText: 'Type of Advertisements Material',
            //growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                   // fn: 'setPromParamCombosStore',
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_promotion_material_items'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            Others = form.down('textfield[name=other_advert_materials]');
                        if (newVal == 10 || newVal === 10) {
                            Others.setVisible(true);
                            Others.allowBlank = false;
                            Others.validate();
                        } else {
                            Others.reset();
                            Others.setVisible(false);
                            Others.allowBlank = true;
                            Others.validate();
                        }
                }
            }
        },{
                xtype:'textarea',
                grow: true, 
                growMax: 200,
                readOnly:true,  
                name: 'other_advert_materials',
                fieldLabel: 'Specify the Advertisement Material',
                columnWidth: 1,  
                hidden: true,
                allowBlank: true
        },


        {
            xtype: 'combo',
            fieldLabel: 'Language of Publication or Advert',
            //columnWidth: 0.99,
            columnWidth: 1, 
            readOnly:true, 
            name: 'language_id',
            allowBlank: false,
            forceSelection: true,
            // filterPickList: true,
            // encodeSubmitValue: true,
            emptyText: 'Language of Publication or Advert',
            //growMax: 100,
            queryMode: 'local',
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
                                table_name: 'par_promotion_material_language'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                        // var form = cmbo.up('form'),
                        //     Others = form.down('textfield[name=other_advert_language]');
                        // if (newVal == 2 || newVal === 2) {
                        //     Others.setVisible(true);
                        //     Others.allowBlank = false;
                        //     Others.validate();
                        // } else {
                        //     Others.reset();
                        //     Others.setVisible(false);
                        //     Others.allowBlank = true;
                        //     Others.validate();
                        // }
                }
            }
        },{
                xtype:'textarea',
                grow: true, 
                growMax: 200, 
                hidden:true,
                name: 'other_advert_language',
                fieldLabel: 'Specify Other Language of Publication or Advert',
                columnWidth: 1,  
                allowBlank: true
        },{
            xtype: 'combo',
            fieldLabel: 'Recommendation',
            //columnWidth: 0.99,
            columnWidth: 1,  
            name: 'assessors_recommendation_id',
            allowBlank: false,
            forceSelection: true,
            queryMode: 'local',
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
                                table_name: 'par_promotion_decision'
                            }
                        }
                    },
                    isLoad: true
                },
            }
        }, {
			xtype:'textarea',
			name:'assessor_comments',
            grow: true, 
            columnWidth: 1, 
            growMax: 600, 
			//colSpan:3,
			fieldLabel:'Comments'
		}
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_promotion_materials_details',
            storeID: 'promotionmaterialdetailAssesorrecommendationgridstr',
            action_url: 'promotionmaterials/insertUpdateProductParticulars',
            action: 'save_promotion_materials_other_details'
        }
    ]
});