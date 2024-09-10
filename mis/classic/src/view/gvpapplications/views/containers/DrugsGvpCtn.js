/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.containers.DrugsGvpCtn', {
    extend: 'Ext.Container',
    xtype: 'drugsgvpctn',
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
            value: 1
        },
        {
            xtype: 'drugsgvpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'drugsgvptb',
            region: 'south'
        }
    ]
});