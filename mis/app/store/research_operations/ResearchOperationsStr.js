/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.store.research_operations.ResearchOperationsStr', {
    extend: 'Ext.data.Store',
    storeId: 'researchoperationsstr',
    alias: 'store.researchoperationsstr',
    requires: [
        'Admin.model.research_operations.ResearchOperationsMdl'
    ],
    model: 'Admin.model.research_operations.ResearchOperationsMdl',
    autoLoad: false,
    grouper: {
        groupFn: function (item) {
            return item.get('process_id') + item.get('workflow_stage_id');
        }
    },
    proxy: {
        type: 'ajax',
        url: 'researchoperations/getResearchOperationsApplications',
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
