
Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.ControlDrugsLicEvaluation.ControlDrugsLicencedDirectorApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'controlleddrugslicenceddirectorapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'controldrugslicenceddirectorapprovalpnl'
}]
});
