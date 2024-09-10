
Ext.define('Admin.view.drugshopregistration.views.dashboards.MainDrugshopRegDashboard', {
    extend: 'Ext.Container',
    xtype: 'maindrugshopregdashboard',
    layout: 'responsivecolumn',
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    listeners: {
        beforerender: 'getCaseDashboardData'
    },
    defaults: {
        xtype: 'panel',
        iconCls: 'x-fa fa-dollar',
        headerPosition: 'bottom',
        cls: 'quick-graph-panel shadow',
        height: 100,
        layout: 'fit',
        userCls: 'custom-big-25 small-100',
    },
    items: [        
        {
            xtype: 'panel',
            layout: 'column',
            id: 'dates_panel',
            header: false,
            preventHeader: true,
            userCls: 'big-100 small-100',
            headerPosition: '',
            height: '5%',
            items: [               
                {
                    xtype: 'datefield',
                    name: 'rec_date_from',
                    emptyText: 'Receiving Date From',
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d',
                    maxValue: new Date(),
                    columnWidth: 0.5,
                    margin: '5 8 0 0',
                    triggers: {
                        clear: {
                            type: 'clear',
                            hideWhenEmpty: true,
                            hideWhenMouseOut: false,
                            clearOnEscape: true//clear with ESC key
                        }
                    },
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                },
                {
                    xtype: 'datefield',
                    name: 'rec_date_to',
                    emptyText: 'Receiving Date To',
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d',
                    maxValue: new Date(),
                    margin: '5 8 0 0',
                    columnWidth: 0.5,
                    listeners: {
                        change: 'filterCaseDashboardData'
                    },
                    triggers: {
                        clear: {
                            type: 'clear',
                            hideWhenEmpty: true,
                            hideWhenMouseOut: false,
                            clearOnEscape: true//clear with ESC key
                        }
                    },
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                }
            ]
        },
        {
            title: 'Reported Cases',
            tools: [{
                type: 'maximize',
                tooltip: 'Maximize',
                id: 'reported_cases_id',
                case_status_id: '',
                title_name: 'Reported Cases',
                handler: function () {
                    this.fireEvent("showCaseDashReport", this.case_status_id, this.title_name);
                }
            }],
            defaults: {
                margin: '25 8',
                labelCls: 'label_css',
                fieldCls: 'labelvalue_css',
                labelAlign: 'left',
                style: 'line-height: 1',
                labelWidth: 250,
            },
            items: [{
                xtype: 'displayfield',
                cls: 'widget-name-text',
                fieldLabel: 'Reported Cases:',
                name: 'reported_cases',
                value: 0,
                labelAlign: 'top',
                fieldStyle: {
                    'font-size':'20px !important',
                    'text-align':'center !important'
                },
                labelStyle: 'font-size:14px !important; line-height:14px !important'
            }]
        },
        {
            title: 'Ongoing Cases',
            tools: [{
                type: 'maximize',
                tooltip: 'Maximize',
                id: 'ongoing_cases_id',
                case_status_id: 1,
                title_name: 'Ongoing  Cases',
                handler: function () {
                    this.fireEvent("showCaseDashReport", this.case_status_id, this.title_name);
                }
            }],
            defaults: {
                margin: '25 8',
                //style: "font-size:18px;",
                labelCls: 'label_css',
                fieldCls: 'labelvalue_css',
                labelAlign: 'left',
                style: 'line-height: 1',
                labelWidth: 250,
            },
            items: [
                {
                    xtype: 'displayfield',
                    cls: 'widget-name-text',
                    fieldLabel: 'Ongoing Cases:',
                    name: 'ongoing_cases',
                    value: 0,
                    labelAlign: 'top',
                    fieldStyle: {
                        'font-size':'20px !important',
                        'text-align':'center !important'
                    },
                    labelStyle: 'font-size:14px !important; line-height:14px !important'
                }
            ]
        },
        {
            // title: 'Appealed Cases',
            title: 'Re-Opened Cases:',
            tools: [{
                type: 'maximize',
                tooltip: 'Maximize',
                id: 'appealedCasesID',
                case_status_id: 3,
                // title_name: 'Appealed  Cases',
                title_name: 'Re-Opened Cases:',
                handler: function () {
                    this.fireEvent("showCaseDashReport", this.case_status_id, this.title_name);
                }
            }],
            defaults: {
                margin: '25 8',
                //style: "font-size:18px;",
                labelCls: 'label_css',
                fieldCls: 'labelvalue_css',
                labelAlign: 'left',
                style: 'line-height: 1',
                labelWidth: 250,
            },
            items: [
                {
                    xtype: 'displayfield',
                    cls: 'widget-name-text',
                    // fieldLabel: 'Appealed Cases:',
                    fieldLabel: 'Re-Opened Cases:',
                    name: 'appealed_cases',
                    value: 0,
                    labelAlign: 'top',
                    fieldStyle: {
                        'font-size':'20px !important',
                        'text-align':'center !important'
                    },
                    labelStyle: 'font-size:14px !important; line-height:14px !important'
                }
            ]
        },
        {
            title: 'Closed Cases',
            tools: [{
                type: 'maximize',
                tooltip: 'Maximize',
                id: 'closedCasesID',
                case_status_id: 2,
                title_name: 'Closed Cases',
                handler: function () {
                    this.fireEvent("showCaseDashReport", this.case_status_id, this.title_name);
                }
            }],
            defaults: {
                margin: '25 8',
                //style: "font-size:18px;",
                labelCls: 'label_css',
                fieldCls: 'labelvalue_css',
                labelAlign: 'left',
                style: 'line-height: 1',
                labelWidth: 250,
            },
            items: [
                {
                    xtype: 'displayfield',
                    cls: 'widget-name-text',
                    fieldLabel: 'Closed Cases:',
                    name: 'closed_cases',
                    value: 0,
                    labelAlign: 'top',
                    fieldStyle: {
                        'font-size':'20px !important',
                        'text-align':'center !important'
                    },
                    labelStyle: 'font-size:14px !important; line-height:14px !important'
                }
            ]
        },
        {
            xtype: 'tabpanel',
            //layout: 'fit',
            header: false,
            id: 'tabpanel',
            preventHeader: true,
            userCls: 'big-100 small-100',
            headerPosition: '',
            height: Ext.Element.getViewportHeight() - 223,
            items: [
                {
                    title: 'Workflow Stages',
                    xtype: 'drugshopperworkflowstagegraphpnl'
                }
                //,
                // {
                //     title: 'Application Statuses',
                //     xtype: 'drugshopsperstatusgraphpnl'
                // }
            ]
        }
    ]
});
