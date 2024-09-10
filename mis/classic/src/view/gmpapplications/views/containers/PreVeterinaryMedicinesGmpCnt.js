/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.containers.PreVeterinaryMedicinesGmpCnt', {
    extend: 'Ext.Container',
    xtype: 'preveterinarymedicinesgmpcnt',
    controller: 'gmpapplicationsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 3
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'predrugsgmpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'preveterinarymedicinesgmptb',
            region: 'south'
        }
    ]
});