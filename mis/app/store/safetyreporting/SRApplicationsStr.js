Ext.define('Admin.store.frontOffice.safetyreporting.SRApplicationsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.srsapplicationsstr',
    storeId: 'srsapplicationsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'openoffice/getSrSpreadsheets',
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
