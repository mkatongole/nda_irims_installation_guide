Ext.define('Admin.view.research_operations.views.grids.ResearchDocUploadsGenericGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationDocUploadsGrid',
    xtype: 'researchdocuploadsgenericgrid',
    table_name: 'tra_researchoperations_applications',
	controller: 'researchoperationsvctr',
	viewModel:'researchoperationsvm',
    
});

