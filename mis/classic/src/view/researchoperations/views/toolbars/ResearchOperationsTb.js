/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.research_operations.views.toolbars.ResearchOperationsTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'researchoperationstb',
    ui: 'footer',
    defaults: {
        ui: 'soft-green',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            name: 'drugsSurveillanceHomeBtn',
            dash_wrapper: 'drugssurveillancedashwrapper',
            dashboard: 'drugssurveillancedashwrapper'
        },
        {
            text: 'Research Operation Initialisation',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'Grant Application',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'researchoperationsdashwrapper',
                        handler:'showNewResearchOperationsApplication',
                        app_type: 131
                    },
                    {
                        xtype: 'tbspacer',
                        width: 150
                    },
                    {
                        text: 'Research & Innovation',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'researchoperationsdashwrapper',
                        handler:'showNewResearchOperationsApplication',
                        app_type: 130
                    },
                    {
                        text: 'New Application ',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewResearchOperationsApplication', 
                        section_id:'',
                        wrapper_xtype:'researchoperationsdashwrapper', 
                        app_type: 132
                    },
                ]
            }
        },
        '->',
        
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'Structured Surveillance',
                        iconCls: 'x-fa fa-check',
                        handler:'showPmsApplicationWorkflow',
                        wrapper_xtype: 'drugssurveillancedashwrapper',
                        app_type: 38
                    },
                    {
                        text: 'Non-Structured Surveillance',
                        iconCls: 'x-fa fa-check',
                        handler:'showPmsApplicationWorkflow',
                        wrapper_xtype: 'drugssurveillancedashwrapper',
                        app_type: 37
                    }
                ]
            }
        }
    ]
});