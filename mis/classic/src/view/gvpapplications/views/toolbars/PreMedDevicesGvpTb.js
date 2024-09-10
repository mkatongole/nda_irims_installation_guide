/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.toolbars.PreMedDevicesGvpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'premeddevicesgvptb',
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
            name: 'meddevicesGvpHomeBtn',
            dash_wrapper: 'premeddevicesgvpdashwrapper',
            dashboard: 'premeddevicesgvpdash'
        },
        {
            text: 'GVP Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Pre Inspection Surgical Instrument & Appliances GVP',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGvpApplication',
                        wrapper_xtype: 'meddevicesgvpdashwrapper',
                        app_type: 117
                       /* menu:{
                            xtype: 'menu',
                            items:[
                                {
                                    text: 'Oversea GVP',
                                    iconCls: 'x-fa fa-check',
                                    handler:'showNewGvpApplication',
                                    wrapper_xtype: 'meddevicesgvpdashwrapper',
                                    app_type: 5,
                                    gvp_type: 1
                                },
                                {
                                    text: 'Domestic GVP',
                                    iconCls: 'x-fa fa-check',
                                    handler:'showNewGvpApplication',
                                    wrapper_xtype: 'meddevicesgvpdashwrapper',
                                    app_type: 5,
                                    gvp_type: 2
                                }
                            ]
                        }*/
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
                        text: 'New Pre Inspection Surgical Instrument & Appliances GVP',
                        iconCls: 'x-fa fa-check',
                        handler:'showGvpApplicationWorkflow',
                        wrapper_xtype: 'meddevicesgvpdashwrapper',
                        app_type: 117
                    }
                ]
            }
        }
    ]
});