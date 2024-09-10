
Ext.define('Admin.view.productregistration.views.forms.medicaldevices.MedicalDevicesProductsOtherInformationFrm', {
    extend: 'Ext.tab.Panel',
    xtype: 'medicaldevicesProductsOtherInformationFrm',
    // layout: {
    //     // layout-specific configs go here
    //     type: 'fit'
    // },
    defaults:{
        margin: 3
    },
    items: [  {
        xtype: 'productManuctureringGrid',
        title: 'Product Manufacturing Details',
        
    },
    {
        xtype: 'drugsProductPackagingGrid',
        title: 'Product Packaging details',
        autoScroll:true,
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'drugproductPackagingdetailsstr',
                    proxy: {
                        url: 'productregistration/onLoadproductPackagingDetails',
                    }
                },
                isLoad: true
            }
        },
    },
    {
        xtype: 'otheraccesoriesDetailsGrid',
        title: 'Accessories/appliances/Equipments used in Combination'
        
    },

    

    //  {
    //     xtype: 'productGmpInspectionDetailsGrid',
    //     title: 'GMP Inspection Details',
    //     listeners: {
    //         beforerender: {
    //             fn: 'setConfigGridsStore',
    //             config: {
    //                 pageSize: 1000,
    //                 storeId: 'gmpInspectionApplicationsDetailsStr',
    //                 proxy: {
    //                     url: 'productregistration/onLoadproductGmpInspectionDetailsStr',
                        
    //                 }
    //             },
    //             isLoad: true
    //         }
    //     }
    // },{
    //     xtype: 'productGmpInspectionDetailsGrid',
    //     title: 'GMP Inspection Details'
        
    // },{
    //     xtype: 'inspectioninothercountriesGrid',
    //     title: 'GMP Inspection In Other Countries'
        
    // },{
    //     xtype: 'productreginothercountriesGrid',
    //     title: 'Registration In Other Countries '
        
    // },{
    //     xtype: 'conductedproductclinicaltrialGrid',
    //     title: 'Undertaken Clinical Trials'
        
    // },

    {
        xtype: 'productImagesUploadsGrid',
        title: 'Product Images'
    }]
});