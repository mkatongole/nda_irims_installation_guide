/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.toolbars.SIAPremiseRegTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'siapremiseregtb',
    ui: 'footer',
    defaults: {
        //arrowAlign: 'bottom',
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
            name: 'drugsPremiseRegHomeBtn'
        },
        {
            text: 'New Application',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                     {
                        text: 'Pre Inspection Surgical Instument & Appliances Registration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewDrugShopRegistration',
                        wrapper_xtype: 'siapremiseregdashwrapper',
                        app_type: 119
                    },
                    '-',
                    {
                        text: 'New Surgical Instument & Appliances Registration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewDrugShopRegistration',
                        wrapper_xtype: 'siapremiseregdashwrapper',
                        app_type: 120
                    },
                    '-',
                    {
                        text: 'Surgical Instument & Appliances Renewal',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewDrugShopRegistration',
                        wrapper_xtype: 'siapremiseregdashwrapper',
                        app_type: 121
                    },
                    '-',
                    {
                        text: 'Surgical Instument & AppliancesVariation',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewDrugShopRegistration',
                        wrapper_xtype: 'siapremiseregdashwrapper',
                        app_type: 122
                    },
                    '-',
                    {
                        text: 'Drug Shop  Withdrawal (Closure of the business activities)',
                        iconCls: 'x-fa fa-check',
                        hidden:true,
                        handler: 'showNewDrugShopRegistration',
                        wrapper_xtype: 'siapremiseregdashwrapper',
                        app_type: 4
                    },
                    '-',
                    {
                        text: 'Drug Shop  Application Data Clean-Up',
                        iconCls: 'x-fa fa-check',
                        hidden:true,
                        handler: 'showDataCleanUpWindow',
                        wrapper: 'siapremiseregdashwrapper',
                        childXtype: 'editpremiseapp',
                        app_type: 4
                    }
                ]
            }
        },{
            text: 'Application Data Clean-Up',
            iconCls: 'x-fa fa-check',
            childXtype: 'editpremiseappwizard',
            wrapper: 'siapremiseregdashwrapper',
            handler: 'showDataCleanUpWindow',
        },'-',
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu: {
                xtype: 'menu',
                items: [
               
                    {
                        text: 'New Surgical Instument & Appliances  Registration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'siapremiseregdashwrapper',
                        app_type: 119
                    },
                    {
                        text: 'Surgical Instument & Appliances  Renewal',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'siapremiseregdashwrapper',
                        app_type: 120
                    },
                    {
                        text: 'Surgical Instument & Appliances  Alteration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'siapremiseregdashwrapper',
                        app_type: 121
                    },
                    {
                        text: 'Surgical Instument & Appliances Withdrawal',
                        iconCls: 'x-fa fa-check',
                        hidden:true,
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'siapremiseregdashwrapper',
                        app_type: 4
                    }
                ]
            }
        }
    ]
});