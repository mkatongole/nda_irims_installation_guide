
Ext.define('Admin.view.gmpapplications.views.containers.PreDrugsGmpCtn', {
    extend: 'Ext.Container',
    xtype: 'predrugsgmpctn',
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
            value: 1
        },
        {
            xtype: 'predrugsgmpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'predrugsgmptb',
            region: 'south'
        }
    ]
});