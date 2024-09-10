Ext.define('Admin.store.frontOffice.safetyreporting.SpreadSheetSrMedicalHistoryStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetsrmedicalhistorystr',
    storeId: 'spreadsheetsrmedicalhistorystr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getSrMedicalHistory',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    },
 
});
