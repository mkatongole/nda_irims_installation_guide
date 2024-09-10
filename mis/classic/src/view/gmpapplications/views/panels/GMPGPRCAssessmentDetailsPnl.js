
Ext.define('Admin.view.clinicaltrial.views.panels.GMPGPRCAssessmentDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpgprcassessmentDetailsPnl',
    controller: 'gmpapplicationsvctr',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'gmpapplicationsvm'
    },
    listeners: {
        tabchange: 'funcActiveOtherInformationTab'
    },
    items: [
        {
            
        xtype: 'tabpanel',
        itemId:'detailspanel',
        //title: 'GMP Online Assessment',
        autoScroll: true,
        items:[{
                    xtype: 'GMPOnlineAssessmentfrm',
                    title:'General Information',
                    type_id: 1,
                    is_inspection: 0,
                    is_gprc: 1,
                    is_preview: 0,

                },{
                    title: 'Brief Report of the Inspection activities',
                    region: 'center',
                    xtype: 'tabpanel',
                    items:[{
                        xtype: 'GMPOnlineAssessmentfrm',
                        title:'Brief Report of the Inspection activities(a)',
                        type_id: 2,
                        is_inspection: 0,
                        is_gprc: 1,
                        is_preview: 0

                    },{
                        xtype: 'productlinedetailsinspectiongrid',
                        title:'Brief Report of the Inspection activities(b)'
                        }
                    ]
                },
                {
                    xtype: 'noncomplianceobservationsgrid',
                    title:'Summary of non-conformances'
                }, {
                    xtype: 'GMPOnlineAssessmentfrm',
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
        name: 'manufacturing_site_id'
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