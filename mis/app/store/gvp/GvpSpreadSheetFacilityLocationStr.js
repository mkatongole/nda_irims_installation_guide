Ext.define('Admin.store.frontOffice.gvp.GvpSpreadSheetFacilityLocationStr', {
    extend: 'Ext.data.Store',
    alias: 'store.gvpspreadsheetfacilitylocationstr',
    storeId: 'gvpspreadsheetfacilitylocationstr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromTable?table_name=par_gvplocation_details',
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
