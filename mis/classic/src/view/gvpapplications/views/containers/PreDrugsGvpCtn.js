
Ext.define('Admin.view.gvpapplications.views.containers.PreDrugsGvpCtn', {
    extend: 'Ext.Container',
    xtype: 'predrugsgvpctn',
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
            xtype: 'predrugsgvpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'predrugsgvptb',
            region: 'south'
        }
    ]
});