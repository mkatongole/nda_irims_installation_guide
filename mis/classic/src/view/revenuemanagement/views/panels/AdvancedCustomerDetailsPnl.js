Ext.define('Admin.view.RevenueManagement.views.panels.AdvancedCustomerDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'advancedCustomerDetailsPnl',
    controller: 'revenuemanagementvctr',
    autoScroll: true,
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'revenueManagementVm'
    },
    listeners: {
        tabchange: 'funcActiveOtherInformationTab'
    },
    items: [
        {
        xtype: 'tabpanel',
       itemId:'detailspanel',
        title: 'Advanced Customer  Details',
        autoScroll: true,
        items:[
            {
             xtype: 'customerFrm',
             title: 'Customer Details',
             autoScroll: true,
            },
           ]
        },
 
    {
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
        xtype: 'hiddenfield',
        name: 'prodclass_category_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    },
    {
        xtype: 'hiddenfield',
        name: 'process_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'enforcement_id'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'active_application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'active_application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'application_status_id'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'status_type_id'
    }, {
        xtype: 'hiddenfield',
        name: 'report_type_id'
    }, {
        xtype: 'hiddenfield',
        name: 'reported_by_id'
    }]
});