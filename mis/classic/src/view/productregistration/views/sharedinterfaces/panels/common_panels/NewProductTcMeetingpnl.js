/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.common_panels.NewProductTcMeetingPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newProductTcMeetingpnl',
    layout: 'border',
    defaults: {
        split: true,
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'workflow_stage',
                fieldLabel: 'Workflow Stage',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'application_status',
                hidden: true,
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            },{
                xtype: 'displayfield',
                name: 'tracking_no',hidden: true,
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            },  {
                xtype: 'displayfield',
                name: 'reference_no',
                hidden: true,
                fieldLabel: 'Ref No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'hiddenfield',
                name: 'process_id'
            }, {
                xtype: 'hiddenfield',
                name: 'workflow_stage_id'
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_id'
            },{
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            },{
                xtype: 'hiddenfield',
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }
            ]
        }
    ],
    items: [
        {
            title: 'Commitee Details',
            region: 'north',
            height: 170,
            collapsible: true,
            xtype: 'productMeetingDetailsFrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'productManagerMeetingGrid',
            dockedItems: [{
                xtype: 'toolbar',
                ui: 'footer',
                scrollable: true,
                dock: 'bottom',
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        displayMsg: 'Showing {0} - {1} of {2} total records',
                        emptyMsg: 'No Records',
                        table_name: 'tra_product_applications',
                        width: '40%',
                        strict_mode: 0,
                        doRefresh: function () {
                            var store = this.getStore();
                            store.removeAll();
                            store.load();
                        },
                        beforeLoad: function () {
                            this.up('grid').fireEvent('refresh', this);
                        }
                    },'->',{
                        text: 'Commitee Uploads & Export',
                        ui: 'soft-purple',
                        iconCls: 'fa fa-sliders',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Export Commitee Details',
                                    iconCls: 'x-fa fa-save',
                                    ui: 'soft-purple',
                                    table_name: 'tra_product_applications',
                                    handler: 'exportMeetingDetails',
                                    toaster: 1
                                },{
                                    xtype: 'button',
                                    text: 'Upload Commitee Documents',
                                    iconCls: 'x-fa fa-upload',
                                    ui: 'soft-purple',
                                    name: 'save_btn',
                                    reference_table_name: 'tc_meeting_details',
                                    table_name: 'tc_meeting_uploaddocuments',
                                    handler: 'funcUploadTCMeetingtechnicalDocuments',
                                    document_type_id: 4,
                                    childXtype:'unstructureddocumentuploadsgrid',
                                    winTitle: 'Technical Commitee Documents Upload',
                                    winWidth: '80%',
                                    toaster: 0
                                }
                            ]
                        }
                    },
                     {
                        xtype: 'button',
                        text: 'Save Commitee Details',
                        iconCls: 'x-fa fa-save',
                        ui: 'soft-purple',
                        name: 'save_btn',
                        table_name: 'tra_product_applications',
                        toaster: 1
                    }, {
                        xtype: 'button',
                        text: 'Submit Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-purple',
                        name: 'submit_selected',
                        gridXtype:'productManagerMeetingGrid',
                        table_name: 'tra_product_applications',
                        action: 'process_submission_btn',
                        winWidth: '50%',
                        toaster: 0
                    }
                ]
            }
            ]
        },{
            xtype: 'panel',
            layout:'accordion', region: 'west',
            width: 400,collapsed: false,
            titleCollapse: true,
            title:'Meeting Participants & Agendas',
            layout: {
                type: 'accordion',
                titleCollapse: false,
                animate: true,
                activeOnTop: true
            },
            items:[{
                title: 'Participants',
                xtype: 'productTcMeetingParticipantsGrid',
                listeners: {
                    afterrender: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    }
                },
                tbar: [
                    {
                        xtype: 'hiddenfield',
                        name: 'isReadOnly'
                    },
                    {
                        xtype: 'button',
                        text: 'Add',
                        name: 'add_participant',
                        iconCls: 'x-fa fa-plus',
                        ui: 'soft-green',
                        handler: 'showAddTcMeetingParticipants',
                        childXtype: 'parmeetingparticipantsgrid',
                        winTitle: 'Meeting Participants',
                        winWidth: '70%',
                        stores: '[]'
                    },
                    {
                    xtype: 'button',
                    text: 'Update/Add Role',
                    iconCls: 'x-fa fa-plus',
                    handler:'updateParticipantRole',
                    ui: 'soft-red',
                    stores: '[]'
                }
                ],
            },{
                xtype: 'tcmeetingagendasgrid',
                title:'Agendas',
                listeners: {
                    afterrender: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    }
                },
                tbar: [
                    {
                        xtype: 'hiddenfield',
                        name: 'isReadOnly'
                    },
                    {
                        xtype: 'button',
                        text: 'Add',
                        name: 'add_agendas',
                        iconCls: 'x-fa fa-plus',
                        ui: 'soft-green',
                        handler: 'showAddTcMeetingParticipants',
                        childXtype: 'tcmeetingagendasfrm',
                        storeId: 'tcmeetingagendasfrm',
                        winTitle: 'Meeting Agendas',
                        winWidth: '50%',
                        stores: '[]'
                    }
                ],
            }]

        }
    ]
});