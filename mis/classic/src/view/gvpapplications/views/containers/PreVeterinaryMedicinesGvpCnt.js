/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.containers.PreVeterinaryMedicinesGvpCnt', {
    extend: 'Ext.Container',
    xtype: 'preveterinarymedicinesgvpcnt',
    controller: 'gvpapplicationsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 35
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'predrugsgvpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'preveterinarymedicinesgvptb',
            region: 'south'
        }
    ]
});