/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.toolbars.PreDrugsGvpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'predrugsgvptb',
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
            name: 'drugsGvpHomeBtn',
            dash_wrapper: 'predrugsgvpdashwrapper',
            dashboard: 'predrugsgvpdash'
        },
        {
            text: 'GVP Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New  Pre-Inspection GVP',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGvpApplication',
                        wrapper_xtype: 'predrugsgvpdashwrapper',
                        app_type: 117
                    }
                ]
            }
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Pre-Inspection GVP',
                        iconCls: 'x-fa fa-check',
                        handler:'showGvpApplicationWorkflow',
                        wrapper_xtype: 'predrugsgvpdashwrapper',
                        app_type: 117
                    }
                ]
            }
        }
    ]
});