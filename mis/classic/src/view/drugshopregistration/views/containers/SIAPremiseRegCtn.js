
Ext.define('Admin.view.drugshopregistration.views.containers.SIAPremiseRegCtn', {
    extend: 'Ext.Container',
    xtype: 'siapremiseregctn',
    controller: 'premiseregistrationvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 33
        },
        // {
        //     xtype: 'hiddenfield',
        //     name: 'section_id',
        //     value: 1
        // },
        {
            xtype: 'siapremiseregdashwrapper',
            region: 'center'
        },
        {
            xtype: 'siapremiseregtb',
            region: 'south'
        }
    ]
});