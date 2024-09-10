
Ext.define('Admin.view.data_migration.views.panels.DrugShopMigratedDatasetsRpt', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugshopmigrateddatasetsrpt',
    layout: 'fit',
    region: 'center',
    module_id: 29,
    controller: 'applicationdatmigrationvctr',
    title: 'Drug Shop Applications Data Migrations',
    margin: 2,
    table_name: 'tra_drugshopapps_datamigration',
    listeners:{
        beforerender: 'renderDataMigrationsReportsPanelConfig'
    }
});