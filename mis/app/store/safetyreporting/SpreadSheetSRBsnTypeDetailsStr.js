Ext.define('Admin.store.frontOffice.safetyreporting.SpreadSheetSrBsnTypeDetailsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetsrbsntypedetailsstr',
    storeId: 'spreadsheetsrbsntypedetailsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getSrBsnDetails',
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
