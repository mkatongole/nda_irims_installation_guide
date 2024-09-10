
Ext.define('Admin.view.clinicaltrial.views.panels.GVPGPRCAssessmentDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gvpgprcassessmentDetailsPnl',
    controller: 'gvpapplicationsvctr',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'gvpapplicationsvm'
    },
    listeners: {
        tabchange: 'funcActiveOtherInformationTab'
    },
    items: [
        {
            
        xtype: 'tabpanel',
        itemId:'detailspanel',
        //title: 'GVP Online Assessment',
        autoScroll: true,
        items:[{
                    xtype: 'GVPOnlineAssessmentfrm',
                    title:'General Information',
                    type_id: 1,
                    is_inspection: 0,
                    is_gprc: 1,
                    is_preview: 0,

                },
                {
                    xtype: 'GVPOnlineAssessmentfrm',
                    title:'Brief Report of the Inspection activities',
                    type_id: 2,
                    is_inspection: 0,
                    is_gprc: 1,
                    is_preview: 0
                },           
                {
                    xtype: 'gvpnoncomplianceobservationsgrid',
                    title:'Summary of non-conformances'
                }, {
                    xtype: 'GVPOnlineAssessmentfrm',
                    title:'Recommendations',
                    type_id: 4,
                    is_inspection: 0,
                    is_gprc: 1,
                    is_preview: 0
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
        name: 'gvp_site_id'
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