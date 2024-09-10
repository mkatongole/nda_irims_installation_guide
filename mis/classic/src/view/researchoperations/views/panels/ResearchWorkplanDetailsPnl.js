/**
 * Created by Jeff on 5/06/2024.
 */
Ext.define('Admin.view.research_operations.views.panels.ResearchWorkplanDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'researchworkplandetailspnl',
    controller: 'researchoperationsvctr',
    layout: {
        type: 'border',
    },
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Research Workplan Uploads (Required Documents)',
            region: 'center',
            layout: 'fit',
            items: [
                {
                    xtype: 'gmpappdocuploadsgenericgrid'
                }
            ]
        },
        {
            title: 'Other Details',
            region: 'south',
            width: 200,
            collapsed: true,
            collapsible: true,
            titleCollapse: true,
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 5,
                    layout: 'column',
                    defaults: {
                        margin: 2,
                        labelAlign: 'top',
                        columnWidth: 0.5
                    },
                    fieldDefaults: {
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold'
                        }
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Research Title',
                            name: 'applicant_details'
                        },
                        {
                            xtype: 'toolbar',
                            ui: 'footer',
                            columnWidth: 1,
                            items:[
                                {
                                    text: 'More Details',
                                    iconCls: 'fa fa-eye',
                                    name: 'more_app_details',
                                    isReadOnly: 0,
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            ui: 'footer',
            region: 'south',
            height: 45,
            split: false,
            items: [
                {
                    xtype: 'transitionsbtn'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    table_name: 'tra_internalresearch_details',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ]
});