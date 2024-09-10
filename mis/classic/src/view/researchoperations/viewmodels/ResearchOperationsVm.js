
Ext.define('Admin.view.research_operations.viewmodels.ResearchOperationsVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.researchoperationsvm',
    xtype: 'researchoperationsvm',
    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'UserManagementVm',
            autoLoad: true
        }
        */
    },

    data: {
        atBeginning: true,
        atEnd: false,
        name: '',
        email: ''
    }
    

});