/**
 * Created by Softclans on 12/30/2018.
 */
 Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpInspectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpinspectionpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },  
    items: [{
           // title: 'Manufacturing Site Inspection Process',
            region: 'center',
            xtype:'tabpanel',
            itemId:'mainispectiontabpanel',
            layout: 'fit',
            items: [
                {
                    xtype: 'gmpappdocuploadsgenericgrid',
                    title: 'Inspection Documents'
                },
                 {
                    title: 'GMP Inspection Report',
                    region: 'center',
                    name: 'inspectionreportTabPanel',
                    itemId:'inspectionreportTabPanel',
                    xtype: 'tabpanel',
                    items:[{
                        xtype: 'GMPOnlineAssessmentfrm',
                        title:'General Information',
                        type_id: 1,
                        is_inspection: 1,
                        is_gprc: 0,
                        is_preview: 0,
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
                            is_inspection: 1,
                            is_gprc: 0,
                            is_preview: 0,

                        },{
                            xtype: 'productlinedetailsinspectiongrid',
                            title:'Brief Report of the Inspection activities(b)',
                            type_id: 2,
                            is_inspection: 1,
                            is_gprc: 0,
                            is_preview: 0,

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

                    // {
                    //     xtype: 'noncomplianceobservationsgrid',
                    //     title:'Summary of non-conformances',
                    //     type_id: 3,
                    // },
                     {
                        xtype: 'GMPOnlineAssessmentfrm',
                        title:'Recommendations',
                        type_id: 4,
                        is_inspection: 1,
                        is_gprc: 0,
                        is_preview: 0,
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
                },
               {
                   xtype:'tabpanel',
                   hidden:true,
                   title: 'Product Line Details Recommendations',
                   layout: 'fit',
                   items: [
                          {
                            xtype: 'productlinedetailsinspectiongrid',
                            title: 'Manufacturing Site Product Line Details Recommendations',
                        },
                        {
                            xtype: 'noncomplianceobservationsgrid',
                            title: 'Non-Compliance Observations'
                        },
                         {
                            xtype: 'productscreeninggrid',
                            title: 'Inspection Checklist'
                        }
                    ]
                },

                {
                   
                    xtype:'panel',
                    title: 'Inspection Details',
                    layout: 'border',
                    items:[{
                         xtype: 'inspectiondetailsupdatefrm',
                         itemId:'gmpaddscheduleteamfrmId',
                         region:'center',
                         scrollable:true,
                         //title: 'Inspection Details'
                    },{
                        title: 'Inspectors',
                        region: 'east',
                        width: 400,
                        collapsible: true,
                        collapsed: true,
                        titleCollapse: true,
                        layout: 'fit',
                        items:[
                            {
                                xtype: 'grid',
                                name: 'inspectorsGrid',
                                tbar: [
                                    {
                                        xtype: 'button',
                                        text: 'Add',
                                        ui: 'soft-green',
                                        iconCls: 'x-fa fa-plus',
                                        handler: 'showAddInspectionOtherDetails',
                                        childXtype: 'gmpinspectorsfrm',
                                        winTitle: 'Inspector Details',
                                        name: 'add_btn',
                                        winWidth: '30%'
                                    }
                                ],
                                bbar: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        displayInfo: true,
                                        beforeLoad: function () {
                                            var store = this.store,
                                                grid = this.up('grid'),
                                                inspection_id = grid.up('gmpinspectionpanel').down('inspectiondetailsupdatefrm').down('hiddenfield[name=id]').getValue();
                                                //inspection_id = grid.up('gmpinspectionpanel').down('form').down('hiddenfield[name=id]').getValue();
                                            store.getProxy().extraParams = {
                                                inspection_id: inspection_id
                                            };
                                        }
                                    }
                                ],
                                listeners: {
                                    beforerender: {
                                        fn: 'setGmpApplicationGridsStore',
                                        config: {
                                            pageSize: 10000,
                                            storeId: 'gmpinspectorsstr',
                                            proxy: {
                                                url: 'gmpapplications/getGmpScheduleInspectors'
                                            }
                                        },
                                        isLoad: true
                                    }
                                },
                                columns: [
                                    {
                                        text: 'Inspector',
                                        flex: 1,
                                        dataIndex: 'inspector_name'
                                    },
                                    {
                                        text: 'Role',
                                        flex: 1,
                                        dataIndex: 'inspector_role'
                                    },
                                    {
                                        text: 'Options',
                                        xtype: 'widgetcolumn',
                                        width: 90,
                                        widget: {
                                            width: 75,
                                            textAlign: 'left',
                                            xtype: 'splitbutton',
                                            iconCls: 'x-fa fa-th-list',
                                            ui: 'gray',
                                            menu: {
                                                xtype: 'menu',
                                                items: [{
                                                    text: 'Edit',
                                                    iconCls: 'x-fa fa-edit',
                                                    tooltip: 'Edit Record',
                                                    action: 'edit',
                                                    handler: 'showEditGmpApplicationWinFrm',
                                                    childXtype: 'gmpinspectorsfrm',
                                                    winTitle: 'Inspector Details',
                                                    winWidth: '30%',
                                                    stores: '[]'
                                                },{
                                                    text: 'Delete',
                                                    iconCls: 'x-fa fa-trash',
                                                    tooltip: 'Delete Record',
                                                    table_name: 'gmp_inspectorsdetails',
                                                    storeID: 'gmpinspectorsstr',
                                                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                                                    action: 'actual_delete',
                                                    handler: 'doDeleteGmpApplicationWidgetParam',
                                                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                                                }
                                                ]
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }]
                }, {
                    xtype: 'inspectionscaparequestsgrid',
                    hidden:true,
                    title: 'CAPA Submission and Responses'
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
                    itemId:'wizzardFrm',
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
                }, {
                    text: 'Preview Application Documents Documents',
                    iconCls: 'x-fa fa-download',
                    childXtype: 'gmpappprevdocuploadsgenericgrid',
                    winTitle: 'Application Documents',
                    winWidth: '80%',
                    isReadOnly: 1,
                    document_type_id: '',
                    handler: 'showPreviousNonGridPanelUploadedDocs',
                    ui: 'soft-purple',
                    stores: '[]',
                    target_stage: 'deskreviewrequireduploads'
                },

                {
                    text: 'Non-Compliance Observations',
                    ui: 'soft-purple',
                    hidden:true,
                    iconCls: 'fa fa-thumbs-down',
                    name: 'non_compliance',
                    childXtype: 'noncomplianceobservationsgrid',
                    winTitle: 'DETAILS OF NON-COMPLIANCE OBSERVATIONS',
                    winWidth: '70%',
                    stores: '[]'
                },


               
                {
                    text: 'Documents/Reports',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    childXtype: 'gmpappdocuploadsgenericgrid',
                    winTitle: 'Inspection Documents',
                    winWidth: '80%',
                    name: 'docs_btn',
                    hidden: true,
                    stores: '[]',
                    isWin: 1
                },{
                    text: 'Preview Details',
                    iconCls: 'fa fa-bars',
                    name: 'more_app_details',
                    isReadOnly: 1,
                    is_temporal: 0
                },{
                    xtype: 'button',
                    text: "Raise/View Query(Request for Information)",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-red',
                    hidden: true,
                    name: 'raise_checklist_query',
                    handler:'showGeneralAppAppQueries'
                },
               
                {
                    text: 'Inspection Details',
                    hidden: true,
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    childXtype: 'inspectiondetailstabpnl',
                    winTitle: 'Inspection Details',
                    winWidth: '60%',
                    name: 'inspection_details',
                    stores: '[]'
                },
                {
                    text: 'Inspection Schedule',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    hidden: true,
                    childXtype: 'inspectionscheduleselectiongrid',
                    winTitle: 'Inspection Schedules',
                    winWidth: '65%',
                    name: 'inspection_schedule',
                    stores: '[]'
                },
                '->',
                {
                    text: 'Save Inspection Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    hidden: true
                },  {
                    
                    text: 'CAPA Submission and Responses(Details of Non-Compliance Observations)',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-weixin',
                    hidden: true,
                    name: 'btn_raisequery',
                    childXtype: 'inspectionscaparequestsgrid',
                    winTitle: 'Manufacturing Site CAPA Submission and Responses',
                    winWidth: '80%',
                    handler: 'showAddGmpUnstructuredQueriesWin',
                    stores: '[]'
                    //handler: 'showAddGmpUnstructuredQueriesWin'
                },{
                    text: 'Overrall Comments and recommendation',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-weixin',
                    childXtype: 'applicationcommentspnl',
                    winTitle: 'Inspection Comments',
                    winWidth: '60%',
                    name: 'comments_btn',
                    comment_type_id: 1,
                    stores: '[]'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'commonuseregistrationstr',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%'
                }
            ]
        }
    ]
});