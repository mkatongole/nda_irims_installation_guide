/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.panels.DrugShopInspectionDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'drugshopinspectiondetailstabpnl',
    controller: 'premiseregistrationvctr',
    margin: 3,
    items: [
        {
            title: 'Inspection Checklist',
            xtype: 'drugshopinspectionreportgrid'
        },
        {
            title: 'Inspection Report',
            xtype: 'drugshopinspectionreportfrm'
        }
        
    ]
});