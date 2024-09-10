Ext.define('Admin.store.frontOffice.safetyreporting.SpreadSheetSrManLineStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetsrmanlinestr',
    storeId: 'spreadsheetsrmanlinestr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getSrManLine',
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
