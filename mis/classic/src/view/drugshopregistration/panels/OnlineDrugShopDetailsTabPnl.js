Ext.define('Admin.view.drugshopregistration.views.panels.OnlineDrugShopDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinedrugshopdetailstabpnl',
    itemId: 'onlinedrugshopdetailstabpnl',
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
            xtype: 'drugshopdetailsfrm'
        },
         {
            title: 'Other Details',
            xtype: 'drugshopotherdetailstabPnl'
        }
        
    ]
});
