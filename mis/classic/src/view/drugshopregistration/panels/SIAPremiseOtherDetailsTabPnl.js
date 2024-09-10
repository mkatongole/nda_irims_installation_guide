
Ext.define('Admin.view.drugshopregistration.views.panels.SIAPremiseOtherDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'siapremiseotherdetailstabPnl',
    margin: 3,
    items: [
       
        {
            title: 'Director(s)',
            itemId:'drugshopdirectorsdetailsgrid',
            xtype: 'drugshopdirectorsdetailsgrid'
        },
        {
            title: 'Nearest Premises',
            xtype: 'nearestpremisegrid'
        },
        {
            title: 'Nearest DrugShop',
            hidden:true,
            xtype: 'nearestdrugshopgrid'
        },
         {
            title: 'Other License(s)',
            xtype: 'drugshopotherlicensesdetailsgrid'
        }

    ]
});

