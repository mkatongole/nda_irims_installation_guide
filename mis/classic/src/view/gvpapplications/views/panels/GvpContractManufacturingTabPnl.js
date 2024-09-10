/**
 * Created by Kip on 5/8/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.GvpContractManufacturingTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'gvpcontractmanufacturingtabpnl',
    margin: 3,
    items: [
        {
            title: 'Gvp Contract Manufacturing Activity Details',
            xtype: 'gvpcontractmanufactureractivitygrid',
            scrollable: true
        }
    ]
});