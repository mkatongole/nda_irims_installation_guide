Ext.define('Admin.store.frontOffice.gvp.SpreadSheetGvpProductsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgvpproductsstr',
    storeId: 'spreadsheetgvpproductsstr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getGvpSiteProducts',
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
