
Ext.define('Admin.store.gvpApplications.GvpProductLineDetailsStr', {
    extend: 'Ext.data.Store',
    storeId: 'gvpproductlinedetailsstr',
    alias: 'store.gvpproductlinedetailsstr',
    autoLoad: false,
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            totalProperty: 'total',
            messageProperty: 'msg'
        }
    },
    listeners: {
        load: function (store, records, success, operation) {
            var reader = store.getProxy().getReader(),
                response = operation.getResponse(),
                successID = reader.getResponseData(response).success,
                message = reader.getResponseData(response).message;
            if (!success || (successID == false || successID === false)) {
                toastr.warning(message, 'Warning Response');
            }
        }
    }
});