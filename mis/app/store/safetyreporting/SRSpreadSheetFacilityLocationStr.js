Ext.define('Admin.store.frontOffice.safetyreporting.SRSpreadSheetFacilityLocationStr', {
    extend: 'Ext.data.Store',
    alias: 'store.srspreadsheetfacilitylocationstr',
    storeId: 'srspreadsheetfacilitylocationstr',
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
