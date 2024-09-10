/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.MedicalDevicesProductsDetailsPanel', {
    extend: 'Admin.view.productregistration.views.sharedinterfaces.panels.medicaldevices.MedicalDevicesProductsDetailsPnl',
    xtype: 'medicaldevicesproductsdetailspanel',
    itemId: 'product_detailspanel',
    controller: 'productregistrationvctr',
    // layout: {
    //     type: 'fit'
    // },
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'productregistrationvm'
    },
    height: 550,
    bbar:['->',{
        text: 'Update Product Application Details',
        ui: 'soft-purple',
        iconCls: 'fa fa-save',
        name: 'save_btn',
        action_url: 'productregistration/onSaveProductinformation',
        handler: 'saveProductInformation'
    }]
});