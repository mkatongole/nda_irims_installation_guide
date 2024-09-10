Ext.define('Admin.store.frontOffice.gvp.SpreadSheetGvpApplicationColumnsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgvpapplicationcolumnsstr',
    storeId: 'spreadsheetgvpapplicationcolumnsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'openoffice/getGvpSpreadSheet',
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
