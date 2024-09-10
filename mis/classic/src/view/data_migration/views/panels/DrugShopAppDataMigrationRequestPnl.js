
Ext.define('Admin.view.data_migration.views.panels.DrugShopAppDataMigrationRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugshopappdatamigrationrequestpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'drugshopappdatamigrationrequestgrid',
            region: 'center',
            module_id: 29,
            title: 'Drug Shop Applications Data Migration Requests',
            margin: 2
        }
    ]
});