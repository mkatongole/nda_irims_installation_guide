Ext.define('Admin.view.drugshopregistration.views.panels.SIAPremiseDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'siapremisedetailstabpnl',
    itemId: 'siapremisedetailstabpnl',
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
            title: 'Premise Details',
            xtype: 'siapremisedetailsfrm'
        },
         {
            title: 'Other Details',
            xtype: 'siapremiseotherdetailstabPnl'
        },
        {
            xtype:'previewproductDocUploadsGrid',
            title: 'Application Uploaded Documents (All)'
        }
        
    ]
});