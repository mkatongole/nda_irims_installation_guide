Ext.define('Admin.view.drugshopregistration.views.panels.PreInspectionDrugShopDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'preinspectiondrugshopdetailstabpnl',
    itemId: 'preinspectiondrugshopdetailstabpnl',
    listeners: {
        beforetabchange: function (tabPnl, newTab) {
            var id = tabPnl.down('hiddenfield[name=premise_id]').getValue();
            if (tabPnl.items.indexOf(newTab) > 0) {
                if (id < 1) {
                    toastr.warning('Save Premise main details first!!', 'Warning Response');
                    return false;
                }
            }
        }
    },
    items: [
        {
            title: 'Drug Shop Details',
            xtype: 'preinspectiondrugshopdetailsfrm'
        },
         {
            title: 'Other Details',
            xtype: 'predrugshopotherdetailstabPnl'
        },
        {
            xtype:'previewproductDocUploadsGrid',
            title: 'Application Uploaded Documents (All)'
        }
        
    ]
});