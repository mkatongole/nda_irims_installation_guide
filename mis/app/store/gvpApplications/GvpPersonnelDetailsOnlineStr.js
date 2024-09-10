/**
 * Created by Kip on 1/9/2019.
 */
Ext.define('Admin.store.gvpApplications.GvpPersonnelDetailsOnlineStr', {
        extend: 'Ext.data.Store',
        storeId: 'gvppersonneldetailsonlinestr',
        alias: 'store.gvppersonneldetailsonlinestr',
        requires: [
            'Admin.model.gvpApplications.GvpApplicationsMdl'
        ],
        model: 'Admin.model.gvpApplications.GvpApplicationsMdl',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: 'gvpapplications/getOnlineAppGvpPersonnelDetails',
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
