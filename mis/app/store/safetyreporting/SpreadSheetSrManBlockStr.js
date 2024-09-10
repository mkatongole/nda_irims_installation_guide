Ext.define('Admin.store.frontOffice.safetyreporting.SpreadSheetSrManBlockStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetsrmanblockstr',
    storeId: 'spreadsheetsrmanblockstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getsrmanblock',
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
