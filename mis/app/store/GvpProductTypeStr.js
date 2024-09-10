/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.store.GvpProductTypeStr', {
    extend: 'Ext.data.Store',
    storeId: 'gvpproducttypestr',
    requires: [
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',
    autoLoad: true,
    sorters: {
        property: 'flag',
        direction: 'desc'
    },
    proxy: {
        type: 'ajax',
		url: 'configurations/getNonrefParameter',
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'msg'
        },
		extraParams:{
                        table_name: 'par_gvpproduct_types'
        }
    }
});

