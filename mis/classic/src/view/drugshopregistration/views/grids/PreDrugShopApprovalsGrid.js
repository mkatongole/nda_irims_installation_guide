/**
 * Created by Kip on 11/2/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.grids.PreDrugShopApprovalsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'predrugshopapprovalsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('recommendation_id');
           
            if (recommendation_id > 0) {
                return 'valid-row';
            }else{
                return 'invalid-row';
            }
        
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_premises_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    isApprovalSubmission:1,
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    margin: 3,
    tbar: [{
        xtype: 'tbspacer',
        width: 5
     },{
            text:'Batch Approval Recommendation',
            name:'batch_approval_recommendation',
            disabled: true,
            table_name: 'tra_premises_applications',
            stores: '["approvaldecisionsstr"]',
            handler:'getBatPremisechApplicationApprovalDetails',
            approval_frm: 'batchpremiseapprovalrecommfrm',
            iconCls: 'x-fa fa-chevron-circle-up',
            margin: 5
        
      },
        {
        xtype: 'combo',
        emptyText: 'DISTRICT',
        flex: 1,
        //labelWidth: 80,
        width: 190,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'district_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                 url: 'commonparam/getCommonParamFromTable',
                                 extraParams: {
                                 table_name: 'par_premise_districts'
                        }
                       }
                    },
                        isLoad: false
            },afterrender: function (cmbo) {
                 var grid = cmbo.up('grid'),
                 store = cmbo.getStore(),
                 filterObj = {country_id: 37},
                 filterStr = JSON.stringify(filterObj);
                 store.removeAll();
                 store.load({params: {filters: filterStr}});
              },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid'),
                regionStore = grid.down('combo[name=region_id]').getStore(),
                filterObj = {district_id: newVal},
                filterStr = JSON.stringify(filterObj);
                regionStore.removeAll();
                regionStore.load({params: {filters: filterStr}});
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    },

    {
        xtype: 'combo',
        emptyText: 'REGION',
        flex: 1,
        //labelWidth: 80,
        width: 190,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'region_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                 url: 'commonparam/getCommonParamFromTable',
                                 extraParams: {
                                 table_name: 'par_premise_regions'
                        }
                       }
                    },
                 isLoad: false
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    },{
        xtype: 'combo',
        emptyText: 'ZONE',
        flex: 1,
        width: 190,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'zone_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_zones'
                            }
                        }
                        },
                        isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'button',
        text: 'Filter',
        ui: 'soft-green',
        iconCls: 'x-fa fa-search',
        handler: function(btn) {
          var grid = btn.up('grid');
              grid.getStore().load();
        },
    },{
        xtype: 'button',
        text: 'Clear',
        ui: 'soft-red',
        iconCls: 'x-fa fa-times',
        handler: function(btn) {
          var grid = btn.up('grid'),
                gridStr = grid.getStore();
                grid.down('combo[name=region_id]').clearValue();
                grid.down('combo[name=district_id]').clearValue();
                grid.down('combo[name=zone_id]').clearValue();
                gridStr.load();
        },
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'approvalsstr',
                proxy: {
                    url: 'premiseregistration/getDrugShopApplicationsAtApproval'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
                grid.down('button[name=batch_approval_recommendation]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
               // return true;
            } else {
             //   return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
                grid.down('button[name=batch_approval_recommendation]').setDisabled(true);
            }
        }
       },
    // columns: [{
    //     xtype: 'widgetcolumn',
    //     width: 120,
    //     widget: {
    //         width: 120,
    //         textAlign: 'left',
    //         xtype: 'button',
    //         itemId: 'prints',
    //         ui: 'soft-green',
    //         text: 'Print License/Letter',
    //         iconCls: 'x-fa fa-certificate',
    //         backend_function: 'printPremiseRegistrationCertificate',
    //         handler: 'printColumnPremisePermit'
    //     },
    //     onWidgetAttach: function (col, widget, rec) {
    //         // Get the decision_id from the record
    //         var decision_id = rec.get('decision_id');


    //         // Disable the 'Print License/Letter' button if the decision_id is not 1
    //         if (decision_id !== 1) {
    //             widget.setDisabled(true);
    //         }

    //         // // Attach a listener to the record's change event to update the button's state
    //         // rec.on('change', function (record, modifiedFieldNames) {
    //         //     if (modifiedFieldNames.includes('decision_id')) {
    //         //         var newDecisionId = record.get('decision_id');
    //         //         widget.setDisabled(newDecisionId !== 1);
    //         //     }
    //         // });
    //     }
    // },


    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            itemId: 'prints',
            ui: 'soft-green',
            text: 'Print Approvals',
            iconCls: 'x-fa fa-certificate',
            backend_function: 'printPremiseRegistrationCertificate',
            //handler: 'printColumnPremisePermit',
            handler: 'printTCPDFColumnPremisePermit',
            bind: {
                disabled: '{record.decision_id <= 0 || record.decision_id === null}'
                //disabled: '{record.decision_id !== 1}'
            }
        }
    },

    {
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        hidden:true,
        text: 'Application No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Drug Shop Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        hidden:true,
        dataIndex: 'region_name',
        text: 'Region/Province Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'District Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'zone_name',
        hidden:true,
        text: 'Processing Zone',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        hidden:true,
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        hidden: true,
        text: 'Date Received',
        flex: 1
    },{
        header: 'Recomendation',
        dataIndex: 'chiefregional_inspector_recommendation_id',
        flex: 1,
        renderer: function (value, metaData,record) {
            var chiefregional_inspector_recommendation_id = record.get('chiefregional_inspector_recommendation_id')
            if (chiefregional_inspector_recommendation_id==1 || chiefregional_inspector_recommendation_id===1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return 'Recommended';
            }else if(chiefregional_inspector_recommendation_id==2 || chiefregional_inspector_recommendation_id===2){
              metaData.tdStyle = 'color:white;background-color:red';
              return 'Not Recommended';
          }else{
            return 'Missing Recommendation';
           }
        }
      },  {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        xtype: 'widgetcolumn',
        width: 150,
        widget: {
            width: 150,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-red',
            text: 'Approve/Reject',
            iconCls: 'x-fa fa-chevron-circle-up',
            handler: 'getApplicationApprovalDetails',
            stores: '["approvaldecisionsstr"]',
            table_name: 'tra_premises_applications'
        }
    },{
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
                items: [ {
                            text: 'Request for Additional Information',
                            iconCls: 'x-fa fa-file-pdf-o',
                            handler: 'showApplicationQueries'
                        },
                     {
                        text: 'Inspection Report',
                        iconCls: 'x-fa fa-exchange',
                        menu: {
                            xtype: 'menu',
                            items: [
                                
                                {
                                    text: 'Inspection Report',
                                    iconCls: 'x-fa fa-bars',
                                    childXtype: 'drugshopinspectiondetailstabpnl',
                                    winTitle: 'Inspection Report',
                                    winWidth: '60%',
                                    name: 'inspection_details',
                                    stores: '[]',
                                    hidden:true,
                                    report_type_id:1,
                                    handler: 'showInspectionDetails'
                                },
                                {
                                    text: 'Inspection Report(RID)',
                                    iconCls: 'x-fa fa-bars',
                                    childXtype: 'drugshopinspectiondetailstabpnl',
                                    winTitle: 'Inspection Report(Regional Inspector)',
                                    winWidth: '60%',
                                    name: 'inspection_details',
                                    stores: '[]',
                                    hidden:true,
                                    report_type_id:2,
                                    handler: 'showInspectionDetails'
                                },
                                {
                                    text: 'Inspection Report',
                                    iconCls: 'x-fa fa-bars',
                                    childXtype: 'drugshopinspectiondetailstabpnl',
                                    winTitle: 'Inspection Report',
                                    winWidth: '60%',
                                    name: 'inspection_details',
                                    stores: '[]',
                                    //hidden:true,
                                    report_type_id:3,
                                    handler: 'showInspectionDetails'
                                },{
                                    text: 'Print Final Inspection Report',
                                    iconCls: 'x-fa fa-print',
                                    name:'btn_print_inspection_report',
                                    handler: 'doPrintInspectionReport'
                                }
                            ]
                        }
                    }, 
                    
                    {
                        text: 'Preview DrugShop Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showPreDrugShopApplicationMoreDetails'
                    },
                    // {
                    //     text: 'Print',
                    //     iconCls: 'x-fa fa-print',
                    //     name: 'prints',
                    //     menu: {
                    //         xtype: 'menu',
                    //         items: [
                    //             {
                    //                 text: 'Premise Certificate',
                    //                 iconCls: 'x-fa fa-certificate',
                    //                 backend_function: 'printPremiseRegistrationCertificate',
                    //                 handler: 'printPremiseCertificate'
                    //             }, {
                    //                 text: 'Premise Permit',
                    //                 iconCls: 'x-fa fa-certificate',
                    //                 backend_function: 'printPremiseBusinessPermit',
                    //                 handler: 'printPremisePermit'
                    //             }
                    //         ]
                    //     }
                    // },
                    {
                        text: 'Application Details',
                        iconCls: 'x-fa fa-bars',
                        handler: 'onViewApprovalApplicationDetails',
                        interfaceXtype: 'newsinglepremiseapproval',
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        text: 'Return Back Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-green',
                        storeID: 'productManagerMeetingStr',
                        table_name: 'tra_premises_applications',
                        action: 'process_returnsubmission_btn',
                        winWidth: '50%',
                        toaster: 0
                    },
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',
                        hidden: true,
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        }
    //     ,
    //     onWidgetAttach: function (col, widget, rec) {
    //         var decision_id = rec.get('decision_id');
    //         if (decision_id === 1 || decision_id == 1) {//Granted
    //             widget.down('menu menuitem[name=prints]').setDisabled(false);
    //         }else{
    //             widget.down('menu menuitem[name=prints]').setDisabled(true);
    //         }
    //     }
    }
    ]
});
