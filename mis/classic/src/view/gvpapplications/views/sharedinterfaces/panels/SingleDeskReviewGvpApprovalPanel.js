/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.SingleDeskReviewGvpApprovalPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'singledeskreviewgvpapprovalpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            //title: 'Document Uploads & Inspection Checklist',
            region: 'center',
            layout: 'fit',
            items: [
                    {
                        xtype:'tabpanel',
                           layout: 'fit',
                           items: [{
                            xtype: 'gvpappdocuploadsgenericgrid',
                            title: 'Gvp Inspection Report'
                        }, {
                            xtype: 'gvpproductlinedetailsinspectiongrid',
                            hidden:true,
                            title: 'Gvp Site Product Line Details Recommendations',
                        },
                        {
                        title: 'Inspection Checklists',
                        layout: 'fit',
                        items: [
                                {
                                    xtype: 'productscreeninggrid'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'Product Details(Approval Recommendation)',
            region: 'west',
            width: 600,
            collapsed: false,
            collapsible: true,
            titleCollapse: true,
            hidden: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'gvpproductlinedetailsdgrecommgrid'
                }
            ]
        },
       


        {
            title: 'Other Details',
            region: 'south',
            height: 200,
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
                            fieldLabel: 'Applicant Details',
                            name: 'applicant_details'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Product Details',
                            name: 'product_details',
                            hidden: true
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Premise Details',
                            name: 'premise_details',
                            hidden: true
                        },
                        {
                            xtype: 'toolbar',
                            ui: 'footer',
                            columnWidth: 1,
                            items: [
                                {
                                    text: 'More Details',
                                    iconCls: 'fa fa-bars',
                                    name: 'more_app_details',
                                    isReadOnly: 0,
                                    is_temporal: 0
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
                {
                    text: 'Non-Compliance Observations',
                    ui: 'soft-purple',
                    hidden:true,
                    iconCls: 'fa fa-thumbs-down',
                    name: 'non_compliance',
                    childXtype: 'gvpnoncomplianceobservationswingrid',
                    winTitle: 'DETAILS OF NON-COMPLIANCE OBSERVATIONS',
                    winWidth: '70%',
                    stores: '[]'
                },
                {
                    text: 'Manager Overrall recommendation',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-weixin',
                    childXtype: 'applicationcommentspnl',
                    winTitle: 'Approval Comments',
                    winWidth: '60%',
                    name: 'comments_btn',
                    isReadOnly:1,
                    comment_type_id:5,
                    stores: '[]'
                },
                '->',
                {
                    text: 'Overall Recommendation',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-chevron-circle-up',
                    // stores: '["gvpapprovaldecisionsstr"]',
                    table_name: 'tra_gvp_applications',
                    name: 'show_recommendation'
                },
                {
                    text: 'Print Approvals',
                    ui: 'soft-green',
                    name:'btn_print_inspection_report',
                    iconCls: 'fa fa-bars',
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                                text: 'Print Approvals',
                                iconCls: 'x-fa fa-print',
                                ui: 'soft-green',
                                peview:0,
                                handler: 'doPrintGvpApproval'                            },
                             {
                                text: 'Print Inspection Report',
                                iconCls: 'x-fa fa-print',
                                ui: 'soft-green',
                                handler: 'doPrintInspectionReport'
                            },
                        ]
                    }
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ]
});