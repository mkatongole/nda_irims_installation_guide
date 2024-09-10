/**
 * Created by Kip on 11/10/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremiseAppMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.premiseappmoredetailswizard',
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout:'fit',
    flex: 1,autoScroll: true, 
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',
    tbar:[{
        xtype: 'hiddenfield',
        name: 'process_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'application_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'module_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'section_id'
    }],
    items: [{
            xtype: 'premisedetailswintabpnl',
            title:'Premises Details',
            layout:'fit'
        },
        {
            xtype: 'applicationapplicantpnl',
            collapsible: true, 
            collapsed: true,
            hidden:true,
            title:'Premises Applicant Details'
        }
    ],
    bbar:[{
        text: 'Update Application Details',
        ui: 'soft-purple',
        hidden:true,
        iconCls: 'fa fa-save',
        name: 'updatepremisesapplications',
        toaster: 1
    }]

});
