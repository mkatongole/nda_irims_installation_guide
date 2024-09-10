Ext.define('Admin.store.frontOffice.gvp.SpreadSheetGvpManLineStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgvpmanlinestr',
    storeId: 'spreadsheetgvpmanlinestr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getGvpManLine',
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
