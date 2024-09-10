/**
 * Created by Kip on 12/14/2018.
 */
Ext.define('Admin.view.gvpapplicationsinspections.viewmodels.GvpApplicationsVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gvpapplicationsvm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'GvpInspectionsVm',
            autoLoad: true
        }
        */
    },

    data: {
        atBeginning: true,
        atEnd: false
    }

});