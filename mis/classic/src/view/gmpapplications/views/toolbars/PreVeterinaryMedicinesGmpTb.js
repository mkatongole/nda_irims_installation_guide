
Ext.define('Admin.view.gmpapplications.views.toolbars.PreVeterinaryMedicinesGmpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'preveterinarymedicinesgmptb',
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
            name: 'drugsGmpHomeBtn',
            dash_wrapper: 'predrugsgmpdashwrapper',
            dashboard: 'predrugsgmpdash'
        },
        {
            text: 'GMP Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Pre-Inspection GMP',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'predrugsgmpdashwrapper',
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
                        text: 'New Pre-Inspection GMP',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'drugsgmpdashwrapper',
                        app_type: 117
                    }
                ]
            }
        }
    ]
});