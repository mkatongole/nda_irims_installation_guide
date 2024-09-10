Ext.define('Admin.store.frontOffice.SpreadSheetApplicationBusinessTypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetapplicationbusinesstypesstr',
    storeId: 'spreadsheetapplicationbusinesstypesstr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromTable?table_name=par_business_types',
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
