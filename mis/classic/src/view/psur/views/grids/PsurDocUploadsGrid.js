Ext.define('Admin.view.productregistration.views.grids.PsurDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationDocUploadsGrid',
    xtype:'psurDocUploadsGrid',
    upload_tab:'psurDocUploadsGrid',
    table_name:'tra_psur_pbrer_applications',
    viewModel: {
        type: 'psurVm'
    }
});