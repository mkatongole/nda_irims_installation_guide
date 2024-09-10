/**
 * Created by Kip on 5/8/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.ContractManufacturingTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'contractmanufacturingtabPnl',
    margin: 3,
    items: [
        {
            title: 'Contract Manufacturing Activity Details',
            xtype: 'contractmanufacturingfrm',
            scrollable: true
        }
    ]
});