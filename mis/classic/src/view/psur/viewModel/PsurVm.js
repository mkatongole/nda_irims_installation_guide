Ext.define('Admin.view.psur.viewmodels.PsurVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.psurVm',
    itemId: 'psurvm',
    data: {
        atBeginning: true,
        atEnd: false,
        isReadOnly: false,
        prechecking_querytitle:'',
        model: {},
        hideDeleteButton: true,
        application_category_name: 'Product Category'
    },
    formulas: {
        isReadOnlyField: function (get) {
              return get('isReadOnly');
        }
    }
});