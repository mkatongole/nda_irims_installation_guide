
Ext.define('Admin.view.drugshopregistration.views.panels.PreSIAPremiseOtherDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'presiapremiseotherdetailstabPnl',
    margin: 3,
    items: [
       
        
        {
            title: 'Nearest Surgical Instrument & Appliances',
            xtype: 'nearestpremisegrid'
        },
        {
            title: 'Nearest DrugShop',
            hidden:true,
            xtype: 'nearestdrugshopgrid'
        },
        {
            title: 'Director(s)',
            itemId:'drugshopdirectorsdetailsgrid',
            hidden:true,
            xtype: 'drugshopdirectorsdetailsgrid'
        },
         {
            title: 'Other License(S)',
            hidden:true,
            xtype: 'drugshopotherlicensesdetailsgrid'
        }

    ]
});

