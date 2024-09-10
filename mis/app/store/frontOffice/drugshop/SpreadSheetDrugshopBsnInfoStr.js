Ext.define('Admin.store.frontOffice.drugshop.SpreadSheetDrugshopBsnInfoStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetdrugshopbsninfostr',
    storeId: 'spreadsheetdrugshopbsninfostr',
    autoLoad: false,
    defaultRootId: 'root',
   
    proxy: {
        type: 'ajax',
        url: 'openoffice/getPremisebsnInfo',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    }
});



