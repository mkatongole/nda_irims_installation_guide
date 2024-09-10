/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.containers.PreMedDevicesGmpCtn', {
    extend: 'Ext.Container',
    xtype: 'premeddevicesgmpctn',
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
            value: 5
        },
        {
            xtype: 'premeddevicesgmpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'premeddevicesgmptb',
            region: 'south'
        }
    ]
});