Ext.define('Admin.view.Enforcement.views.grids.RevenueDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationDocUploadsGrid',
    xtype:'revenueDocUploadsGrid',
    upload_tab:'revenueDocUploadsGrid',
    table_name:'tra_revenue_details',
    viewModel: {
        type: 'revenueManagementVm'
    }
});