Ext.define('Admin.store.frontOffice.drugshop.SpreadSheetDrugshopPersonnelInfoStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetdrugshoppersonnelinfostr',
    storeId: 'spreadsheetdrugshoppersonnelinfostr',
    autoLoad: false,
    defaultRootId: 'root',
     
    proxy: {
        type: 'ajax',
        url: 'openoffice/getPremisePersonnelInfo',
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
