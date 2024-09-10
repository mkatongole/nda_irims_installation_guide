/**
 * Created by Kip on 12/19/2018.
 */
Ext.define('Admin.store.gvpApplications.GvpProductLinesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.gvpproductlinesstr',
    storeId: 'gvpproductlinesstr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'gvpapplications/getGvpCommonParams',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    },
    listeners: {
        beforeload: function (store, op) {
            op.setParams(Ext.apply(op.getParams() || {}, {
                model_name: 'GvpProductLine'
            }));
        },
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
