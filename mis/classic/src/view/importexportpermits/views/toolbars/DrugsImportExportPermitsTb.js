/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.toolbars.DrugsImportExportPermitsTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'drugsimportexportpermitstb',
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
            sec_dashboard: 'drugsimportexportpermitsappsWrapper',
            name: 'disposalpermitstbRegHomeBtn'
        },
        {
            text: 'Initiate Import/Export  Applications',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Import License Applications',
                        iconCls: 'x-fa fa-sitemap',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'Licenced Applications',
                                    iconCls: 'x-fa fa-check',
                                    handler: 'onInitiateImportExportApplication',
                                    app_type: 81,
                                    has_registered_premises: 1
                                },
                                '-',
                                {
                                    text: 'Non-Licenced Applications',
                                    iconCls: 'x-fa fa-check',
                                    handler: 'onInitiateImportExportApplication',
                                    app_type: 81,
                                    has_registered_premises: 2
                                }
                            ]
                        }
                    },
                    {
                        text: 'VC Application',
                        iconCls: 'x-fa fa-sitemap',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'Import Application',
                                    iconCls: 'x-fa fa-sitemap',
                                    menu: {
                                        xtype: 'menu',
                                        items: [
                                            {
                                                text: 'Registered Product',
                                                iconCls: 'x-fa fa-check',
                                                handler: 'onInitiateImportExportApplication',
                                                app_type: 12,
                                                vc_application_type_id: 1,
                                                is_registered_products: 1
                                            },
                                            '-',
                                            {
                                                text: 'Unregistered Products',
                                                iconCls: 'x-fa fa-check',
                                                handler: 'onInitiateImportExportApplication',
                                                app_type: 12,
                                                vc_application_type_id: 1,
                                                is_registered_products: 2
                                            }
                                        ]
                                    }
                                },
                                '-',
                                {
                                    text: 'Export Application',
                                    iconCls: 'x-fa fa-sitemap',
                                    menu: {
                                        xtype: 'menu',
                                        items: [
                                            {
                                                text: 'Registered Product',
                                                iconCls: 'x-fa fa-check',
                                                handler: 'onInitiateImportExportApplication',
                                                app_type: 12,
                                                vc_application_type_id: 2,
                                                is_registered_products: 1
                                            },
                                            '-',
                                            {
                                                text: 'Unregistered Products',
                                                iconCls: 'x-fa fa-check',
                                                handler: 'onInitiateImportExportApplication',
                                                app_type: 12,
                                                vc_application_type_id: 2,
                                                is_registered_products: 2
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
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
            hidden:true,
            iconCls: 'x-fa fa-sitemap',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Licence Applications',
                        iconCls: 'x-fa fa-check',
                        handler: 'showImportExportPermitRegWorkflow',
                        app_type: 81
                    },
                    '-',
                    {
                        text: 'VC Applications',
                        iconCls: 'x-fa fa-check',
                        handler: 'showImportExportPermitRegWorkflow',
                        app_type: 12
                    }
                ]
            }
        }
    ]
});
