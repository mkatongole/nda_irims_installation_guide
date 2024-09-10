/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.toolbars.PreMedDevicesGmpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'premeddevicesgmptb',
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
            name: 'meddevicesGmpHomeBtn',
            dash_wrapper: 'premeddevicesgmpdashwrapper',
            dashboard: 'premeddevicesgmpdash'
        },
        {
            text: 'GMP Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Pre Inspection Surgical Instrument & Appliances GMP',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
                        app_type: 117
                       /* menu:{
                            xtype: 'menu',
                            items:[
                                {
                                    text: 'Oversea GMP',
                                    iconCls: 'x-fa fa-check',
                                    handler:'showNewGmpApplication',
                                    wrapper_xtype: 'meddevicesgmpdashwrapper',
                                    app_type: 5,
                                    gmp_type: 1
                                },
                                {
                                    text: 'Domestic GMP',
                                    iconCls: 'x-fa fa-check',
                                    handler:'showNewGmpApplication',
                                    wrapper_xtype: 'meddevicesgmpdashwrapper',
                                    app_type: 5,
                                    gmp_type: 2
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
                        text: 'New Pre Inspection Surgical Instrument & Appliances GMP',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
                        app_type: 117
                    }
                ]
            }
        }
    ]
});