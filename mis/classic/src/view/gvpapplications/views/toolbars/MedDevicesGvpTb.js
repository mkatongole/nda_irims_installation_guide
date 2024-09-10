
Ext.define('Admin.view.gvpapplications.views.toolbars.MedDevicesGvpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'meddevicesgvptb',
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
            dash_wrapper: 'meddevicesgvpdashwrapper',
            dashboard: 'meddevicesgvpdash'
        },
        {
            text: 'GVP Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Surgical Instrument & Appliances GVP',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGvpApplication',
                        wrapper_xtype: 'meddevicesgvpdashwrapper',
                        app_type: 133
                    },
                    '-',
                    {
                        text: 'Surgical Instrument & Appliances GVP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGvpApplication',
                        wrapper_xtype: 'meddevicesgvpdashwrapper',
                        app_type: 134
                    },
                    '-',
                    {
                        text: 'Surgical Instrument & Appliances GVP Widthrawal',
                        iconCls: 'x-fa fa-check',
                        hidden:true,
                        handler:'showNewGvpApplication',
                        wrapper_xtype: 'meddevicesgvpdashwrapper',
                        app_type: 129
                    },
                    '-',
                    {
                        text: 'Surgical Instrument & Appliances GVP Variation',
                        iconCls: 'x-fa fa-check',
                         hidden:true,
                        handler:'showNewGvpApplication',
                        wrapper_xtype: 'meddevicesgvpdashwrapper',
                        app_type: 130
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
                        text: 'New Surgical Instrument & Appliances GVP',
                        iconCls: 'x-fa fa-check',
                        handler:'showGvpApplicationWorkflow',
                        wrapper_xtype: 'meddevicesgvpdashwrapper',
                        app_type: 5
                    },
                    {
                        text: 'Surgical Instrument & Appliances GVP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGvpApplicationWorkflow',
                        wrapper_xtype: 'meddevicesgvpdashwrapper',
                        app_type: 6
                    },
                ]
            }
        }
    ]
});