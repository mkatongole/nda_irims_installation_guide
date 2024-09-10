
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportExportLicencedDirectorApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'importexportlicenceddirectorapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'importexportlicenceddirectorapprovalpnl'
}]
});
