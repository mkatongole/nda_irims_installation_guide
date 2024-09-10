/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.model.gvpApplications.GvpApplicationsMdl', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id',     type: 'integer' },
        { name: 'name',      type: 'string' },
        { name: 'description',    type: 'string' }
    ]
});