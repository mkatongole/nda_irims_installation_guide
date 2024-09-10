/**
 * Created by Softclans on 12/30/2018.
 */
 Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpDeskReviewProcessPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gvpdeskreviewprocesspanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [{
            title: 'GVP Site Inspection Process',
            region: 'center',
            xtype:'tabpanel',
            layout: 'fit',
            items: [
                {
                    xtype: 'gvpappdocuploadsgenericgrid',
                    title: 'GVP Inspection Report'
                }, 
                {
                    xtype: 'gvpproductlinedetailsinspectiongrid',
                    title: 'GVP Site Product Line Details Recommendations',
                    hidden: true,
                },
                {
                title: 'GVP Inspection Checklists',
                layout: 'fit',
                items: [
                        {
                            xtype: 'productscreeninggrid'
                        }
                    ]
                },
                {
                   
                    xtype:'panel',
                    hidden:true,
                    title: 'Inspection Details & Inspectors',
                    layout: 'border',
                    items:[{
                         xtype: 'gvpinspectiondetailsupdatefrm',
                         itemId:'gvpaddscheduleteamfrmId',
                         region:'center',
                        hidden:true,
                         title: 'Inspection Details'
                    },{
                        title: 'Inspectors',
                        region: 'east',
                        width: 400,
                        hidden:true,
                        collapsible: true,
                        titleCollapse: true, 
                        collapsed: true,
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
                                        childXtype: 'gvpinspectorsfrm',
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
                                                inspection_id = grid.up('gvpinspectionpanel').down('form').down('hiddenfield[name=id]').getValue();
                                            store.getProxy().extraParams = {
                                                inspection_id: inspection_id
                                            };
                                        }
                                    }
                                ],
                                listeners: {
                                    beforerender: {
                                        fn: 'setGvpApplicationGridsStore',
                                        config: {
                                            pageSize: 10000,
                                            storeId: 'gvpinspectorsstr',
                                            proxy: {
                                                url: 'gvpapplications/getGvpScheduleInspectors'
                                            }
                                        },
                                        isLoad: false
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
                                                    handler: 'showEditGvpApplicationWinFrm',
                                                    childXtype: 'gvpinspectorsfrm',
                                                    winTitle: 'Inspector Details',
                                                    winWidth: '30%',
                                                    stores: '[]'
                                                },{
                                                    text: 'Delete',
                                                    iconCls: 'x-fa fa-trash',
                                                    tooltip: 'Delete Record',
                                                    table_name: 'gvp_inspectorsdetails',
                                                    storeID: 'gvpinspectorsstr',
                                                    action_url: 'gvpapplications/deleteGvpApplicationRecord',
                                                    action: 'actual_delete',
                                                    handler: 'doDeleteGvpApplicationWidgetParam',
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
                },

                 {
                    xtype: 'inspectionscaparequestsgrid',
                    title: 'GVP Site CAPA Submission and Responses',
                    hidden: true,
                }
            ]
        },{
            title: 'Other Details',
            region: 'south',
            width: 200,
            collapsed: false,
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
                    childXtype: 'gvpappprevdocuploadsgenericgrid',
                    winTitle: 'Application Documents',
                    winWidth: '80%',isReadOnly: 1,
                    document_type_id: '',
                    handler: 'showPreviousNonGridPanelUploadedDocs',
                    ui: 'soft-purple',
                    stores: '[]',
                    target_stage: 'deskreviewrequireduploads'
                },
               
               
                {
                    text: 'Documents/Reports',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    childXtype: 'gvpappdocuploadsgenericgrid',
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
                },{
                    
                    text: 'CAPA Submission and Responses(Details of Non-Compliance Observations)',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-weixin',
                    hidden: true,
                    name: 'btn_raisequery',
                    childXtype: 'inspectionscaparequestsgrid',
                    winTitle: 'Manufacturing Site CAPA Submission and Responses',
                    winWidth: '80%',
                    handler: 'showAddGvpUnstructuredQueriesWin',
                    stores: '[]'
                    //handler: 'showAddGvpUnstructuredQueriesWin'
                }, 
                {
                    text: 'Overrall Comments and recommendation',
                    ui: 'soft-purple',
                    //hidden: true,
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