/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremiseInspectionDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'premiseinspectiondetailstabpnl',
    controller: 'premiseregistrationvctr',
    margin: 3,
    items: [
        {
            title: 'Inspection Checklist',
            xtype: 'premiseinspectionreportgrid'
        },
        {
            title: 'Inspection Report',
            xtype: 'premiseinspectionreportfrm'
        }
        
    ]
});