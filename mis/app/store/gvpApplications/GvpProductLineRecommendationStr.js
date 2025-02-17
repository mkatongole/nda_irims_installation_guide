/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.store.gvpApplications.GvpProductLineRecommendationStr', {
        extend: 'Ext.data.Store',
        alias: 'store.gvpproductlinerecommendationstr',
        storeId: 'gvpproductlinerecommendationstr',
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
                    model_name: 'GvpProductLineRecommendation'
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
