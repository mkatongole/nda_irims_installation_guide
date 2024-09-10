/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.containers.VeterinaryMedicinesGvpCtn', {
    extend: 'Ext.Container',
    xtype: 'veterinarymedicinesgvpctn',
    controller: 'gvpapplicationsvctr',
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
            xtype: 'drugsgvpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'veterinarymedicinesgvptb',
            region: 'south'
        }
    ]
});