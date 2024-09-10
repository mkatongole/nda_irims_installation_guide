/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.store.gvpApplications.FoodGvpApplicationsStr', {
        extend: 'Ext.data.Store',
        storeId: 'foodgvpapplicationsstr',
        alias: 'store.foodgvpapplicationsstr',
        requires: [
            'Admin.model.gvpApplications.GvpApplicationsMdl'
        ],
        model: 'Admin.model.gvpApplications.GvpApplicationsMdl',
        autoLoad: false,
        grouper: {
            groupFn: function (item) {
                return item.get('process_id') + item.get('workflow_stage_id');
            }
        },
        proxy: {
            type: 'ajax',
            url: 'gvpapplications/getGvpApplications',
            headers: {
                'Authorization':'Bearer '+access_token
            },
            reader: {
                type: 'json',
                idProperty: 'id',
                rootProperty: 'results',
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
