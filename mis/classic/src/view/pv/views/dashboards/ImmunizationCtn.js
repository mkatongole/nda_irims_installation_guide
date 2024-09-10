Ext.define('Admin.view.pv.views.dashboards.ImmunizationCtn', {
    extend: 'Ext.Container',
    xtype: 'immunizationCtn',
    controller: 'pvvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 24
        },
        {
            xtype: 'pvDashWrapper',
            region: 'center'
        },
        {
            xtype: 'immunizationtb',
            region: 'south'
        }
    ]
});