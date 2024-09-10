Ext.define('Admin.view.promotionmaterials.views.forms.PromotionMaterialProductParticularsForm', {
    extend: 'Ext.form.Panel',
    xtype: 'promotionmaterialproductparticularsform',
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
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Type of Advertisements Material',
            //growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setPromParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'promotionmaterials/getPromotionMaterialsDetails'
                        }
                    },
                    isLoad: true
                }
            }
        },

		
		{
            xtype: 'fieldcontainer',
			readOnly:true,
            layout: 'column',
            columnWidth: 1, 
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Registered No',
            items: [
                {
                    xtype: 'textfield',
                    name: 'registration_no',
                    readOnly: true,
                    columnWidth: 0.9
                },
                {
					//bind:{disabled:'readOnly'},
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    columnWidth: 0.1,
                    tooltip: 'Link Applicant',
                    name: 'link_registered_product',
				    //disabled:false,
				    handler: 'showRegistererdProductSelectionList',
					
                }
            ]
        },
	
		{
			readOnly:true,
			xtype:'textfield',
            columnWidth: 1, 
            allowBlank:false,
			name:'brand_name',
			fieldLabel:'Brand Name(Product Name)'
		}
    ],
    buttons: [
        {
			//bind:{disabled:'readOnly'},
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_promotion_prod_particulars',
            storeID: 'promotiommaterialproductgridstr',
            action_url: 'promotionmaterials/insertUpdateProductParticulars',
			action:'save_product_particulars'
			//bind:{disabled:'readOnly'}
			

        },
		{
			//bind:{disabled:'readOnly'},
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