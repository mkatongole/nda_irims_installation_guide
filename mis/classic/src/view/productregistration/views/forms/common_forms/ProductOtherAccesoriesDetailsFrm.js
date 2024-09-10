
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.ProductOtherAccesoriesDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productotheraccesoriesdetailsFrm',
    itemId: 'productotheraccesoriesdetailsFrm',
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'top',
        width: '100%',
        allowBlank: false,
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },
    {
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_product_other_accessories'
    },  {
        xtype: 'textfield',
        name: 'name', 
        fieldLabel: 'Accessory/appliance/Equipment used in Combination'
    }, {
        xtype: 'textarea',
        name: 'description', 
        fieldLabel: 'Description'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_product_other_accessories',
                storeID: 'combinationdetailsstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});             
