/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.containers.PreMedDevicesGvpCtn', {
    extend: 'Ext.Container',
    xtype: 'premeddevicesgvpctn',
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
            xtype: 'premeddevicesgvpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'premeddevicesgvptb',
            region: 'south'
        }
    ]
});