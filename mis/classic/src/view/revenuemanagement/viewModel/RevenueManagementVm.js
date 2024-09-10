Ext.define('Admin.view.RevenuManagement.viewModel.RevenueManagementVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.revenueManagementVm',
    itemId: 'revenueManagementVm',
    data: {
        atBeginning: true,
        atEnd: false,
        isReadOnly: false,
        prechecking_querytitle:'',
        model: {},
        hideDeleteButton: true
    },
    formulas: {
        isReadOnlyField: function (get) {
              return get('isReadOnly');
        }
    }
});