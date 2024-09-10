/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.containers.MedDevicesGvpCtn', {
    extend: 'Ext.Container',
    xtype: 'meddevicesgvpctn',
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
            value: 5
        },
        {
            xtype: 'meddevicesgvpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'meddevicesgvptb',
            region: 'south'
        }
    ]
});