/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.model.research_operations.ResearchOperationsMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});