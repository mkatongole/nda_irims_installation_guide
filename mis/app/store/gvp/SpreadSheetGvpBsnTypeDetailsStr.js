Ext.define('Admin.store.frontOffice.gvp.SpreadSheetGvpBsnTypeDetailsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgvpbsntypedetailsstr',
    storeId: 'spreadsheetgvpbsntypedetailsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getGvpBsnDetails',
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
