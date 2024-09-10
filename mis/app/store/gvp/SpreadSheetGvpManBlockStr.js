Ext.define('Admin.store.frontOffice.gvp.SpreadSheetGvpManBlockStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgvpmanblockstr',
    storeId: 'spreadsheetgvpmanblockstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getgvpmanblock',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message',
            totalProperty: 'totalResults'
        }
    }

});
