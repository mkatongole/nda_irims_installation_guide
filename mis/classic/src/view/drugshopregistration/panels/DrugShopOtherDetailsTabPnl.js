
Ext.define('Admin.view.drugshopregistration.views.panels.DrugShopOtherDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'drugshopotherdetailstabPnl',
    margin: 3,
    items: [
       
        {
            title: 'Director(s)',
            itemId:'drugshopdirectorsdetailsgrid',
            xtype: 'drugshopdirectorsdetailsgrid'
        },
        {
            title: 'Nearest Pharmacies',
            xtype: 'nearestpremisegrid'
        },
        {
            title: 'Nearest DrugShop',
            xtype: 'nearestdrugshopgrid'
        },
         {
            title: 'Other License(S)',
            xtype: 'drugshopotherlicensesdetailsgrid'
        }

    ]
});

