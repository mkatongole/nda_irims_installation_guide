
Ext.define('Admin.view.drugshopregistration.views.panels.PreDrugShopInspectionAppMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.predrugshopainspectionppmoredetailswizard',
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
        name: 'applicant_id'
    },
    {
        xtype: 'hiddenfield',
         name: 'active_application_id'
    }, {
        xtype: 'hiddenfield',
         name: 'active_application_code'
    },
    {
        xtype: 'hiddenfield',
        name: 'module_id'
    },{
        xtype: 'hiddenfield',
        name: 'premise_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'section_id'
    }],

 items: [
        {
            region: 'center',
            layout: 'fit',
            xtype:'tabpanel',
               items: [{
                title: 'Application Details & Documents Uploads',
                xtype:'predrugshopappmoredetailswizard'
                },
                {
                   xtype: 'drugshopinspectiongrid',
                   title: 'Inspection Checklist'
               },{
                    xtype: 'drugshopinspectionfrm',
                    itemId: 'drugshopinspectionfrm',
                    title:'Inspection Report'
               }],
        }],
    bbar:[{
        text: 'Update Application Details',
        ui: 'soft-purple',
        hidden:true,
        iconCls: 'fa fa-save',
        name: 'updatedrugshopapplications',
        toaster: 1
    }]

});
