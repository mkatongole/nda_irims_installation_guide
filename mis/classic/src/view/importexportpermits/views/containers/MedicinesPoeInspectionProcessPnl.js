/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.MedicinesPoeInspectionProcessPnl', {
    extend: 'Ext.Container',
    xtype: 'medicinespoeinspectionprocesspnl',
    controller: 'importexportpermitsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 4
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
        },
        {
            xtype: 'poeinspectionprocessdashwrapper',
            region: 'center'
        },
        {
            xtype: 'poeinspectionprocesstb',
            region: 'south'
        }
    ]
});

