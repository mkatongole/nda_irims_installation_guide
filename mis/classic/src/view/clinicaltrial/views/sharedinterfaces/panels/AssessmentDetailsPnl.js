Ext.define('Admin.view.clinicaltrial.views.panels.AssessmentDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'assessmentDetailsPnl',
    controller: 'clinicaltrialvctr',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'clinicaltrialvm'
    },
    listeners: {
        tabchange: 'funcActiveOtherInformationTab'
    },
    items: [
        {
            
        xtype: 'tabpanel',
       itemId:'detailspanel',
        title: 'Clinical Trial Online Assessment',
        autoScroll: true,
        items:[{
                    xtype: 'ClinicalTrialOnlineAssessmentfrm',
                    title:'Clinical Assessment',
                    type_id: 1,

                },{
                    xtype: 'ClinicalTrialOnlineAssessmentfrm',
                    title:'Non - Clinical Assessment',
                    type_id: 4,
                },
                {
                    xtype: 'ClinicalTrialOnlineAssessmentfrm',
                    title:'Quality Assessment',
                    type_id: 2,
                }, {
                    xtype: 'ClinicalTrialOnlineAssessmentfrm',
                    title:'Statistical Assessment',
                    type_id: 3,
                }]
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
    }, 
    {
        xtype: 'hiddenfield',
        name: 'joint_operation_id'
    }, 
    {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'active_application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
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