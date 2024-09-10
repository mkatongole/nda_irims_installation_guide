Ext.define('Admin.view.pv.views.panels.PVDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'pvdetailstabpnl',
    itemId: 'pvdetailstabpnl',
    items: [
        {
            xtype: 'pvDetailsPnl',
            title: 'Report Information'
        },{
            xtype: 'pvOtherDetailsPnl',
            title: 'Report Details'
         }
         , {
            xtype: 'pvSuspectedassessmentDrugGrid',
            title: 'Causality Assessment'
        }
    ]
});``