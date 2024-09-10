/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.SingleGmpApprovalPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'singlegmpapprovalpanel',
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
                   itemId:'mainispectiontabpanel',
                   items: [{
                            xtype: 'gmpappdocuploadsgenericgrid',
                            title: 'Inspection Documents'
                           },
                            {
                            title: 'GMP Inspection Report',
                            region: 'center',
                            itemId:'inspectionreportTabPanel',
                            name: 'inspectionreportTabPanel',
                            itemId:'inspectionreportTabPanel',
                            xtype: 'tabpanel',
                            items:[{
                                xtype: 'GMPOnlineAssessmentfrm',
                                title:'General Information',
                                type_id: 1,
                                is_inspection: 0,
                                is_gprc: 0,
                                is_preview: 1,
                            },
                            // {
                            //     xtype: 'productlinedetailsinspectiongrid',
                            //     title:'Brief Report of the Inspection activities',
                            //     type_id: 2,

                            // },
                            {
                                title: 'Brief Report of the Inspection activities',
                                region: 'center',
                                xtype: 'tabpanel',
                                items:[{
                                    xtype: 'GMPOnlineAssessmentfrm',
                                     title:'Brief Report of the Inspection activities(a)',
                                    type_id: 2,
                                    is_inspection: 0,
                                    is_gprc: 0,
                                    is_preview: 1,

                                },{
                                    xtype: 'productlinedetailsinspectiongrid',
                                    title:'Brief Report of the Inspection activities(b)',
                                    type_id: 2,
                                    is_inspection: 0,
                                    is_gprc: 0,
                                    is_preview: 1,

                                }
                            ]
                            },
                            //  {
                            //     title: 'Summary of non-conformances',
                            //     region: 'center',
                            //     xtype: 'tabpanel',
                            //     items:[{
                            //         xtype: 'noncomplianceobservationsgrid',
                            //         title:'Summary of non-conformances',
                            //         type_id: 3,

                            //     }
                            // ]
                            // },

                            {
                               xtype: 'noncomplianceobservationsgrid',
                               title:'Summary of non-conformances'
                            },


                              {
                                xtype: 'GMPOnlineAssessmentfrm',
                                title:'Recommendations',
                                type_id: 4,
                                is_inspection: 0,
                                is_gprc: 0,
                                is_preview: 1,
                                }]
                        },
                        {
                            xtype: 'localgmpinspectionfrm',
                            hidden:true,
                            itemId: 'localgmpinspectionfrm',
                            title:'GMP Online Assessment'
                       }, {
                            xtype: 'productscreeninggrid',
                            hidden:true,
                            title: 'Inspection Checklist'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Product Line Details(Approval Recommendation)',
            region: 'west',
            width: 600,
            collapsed: false,
            collapsible: true,
            titleCollapse: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'productlinedetailsdgrecommgrid'
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
                    iconCls: 'fa fa-thumbs-down',
                    name: 'non_compliance',
                    childXtype: 'noncomplianceobservationswingrid',
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
                    stores: '["gmpapprovaldecisionsstr"]',
                    table_name: 'tra_gmp_applications',
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
                                handler: 'doPrintGmpApproval'                            },
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