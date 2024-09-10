Ext.define('Admin.view.premiseregistration.views.panels.PreInspectionPremiseDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'preinspectionpremisedetailstabpnl',
    itemId: 'preinspectionpremisedetailstabpnl',
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
            title: 'Premises Details',
            xtype: 'premisedetailsfrm'
        },
        {
            title: 'Directors Details',
            xtype: 'premisedirectorsdetailsgrid'
        },
        {
            title: 'Staff Details',
            xtype: 'premisepersonneldetailsgrid'//'premisepersonneldetailsgrid'
        },
         {
            title: 'Particulars of Nearest Pharmancy',
            xtype: 'premisenearestpremisegrid'
        },

        {
            title: 'Premises Main Activities/Product Information',
            hidden: true,
            xtype: 'premiseotherdetailsgrid'
        },
        {
            title: 'Manufacturing Site Product Lines(for Manufacturers Only)',
            hidden: true,
            xtype: 'premisesproductlinedetailsgrid'
        }

        
    ]
});