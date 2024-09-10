Ext.define('Admin.store.frontOffice.safetyreporting.SpreadSheetAdrTypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetadrtypesstr',
    storeId: 'spreadsheetadrtypesstr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromTable?table_name=par_adr_types',
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
   listeners: {
                     load: function (store, operation, eOpts) {
                        var all={name: 'All',id:' '};
                       store.insert(0, all);
                     }
                 }
});
