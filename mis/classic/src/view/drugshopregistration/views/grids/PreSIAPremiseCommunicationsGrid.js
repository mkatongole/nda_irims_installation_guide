
Ext.define('Admin.view.drugshopregistration.views.grids.PreSIAPremiseCommunicationsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'presiapremisecommunicationsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
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
        selType: 'checkboxmodel'
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
        //labelWidth: 80,
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
                proxy: {
                    url: 'premiseregistration/getManagerApplicationsGeneric'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        },
        itemdblclick: 'viewSelectedpApplicationMoreDetails'
    },
    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Print License/Letter',
            iconCls: 'x-fa fa-certificate',
            backend_function: 'printPremiseRegistrationCertificate',
            handler: 'printTCPDFColumnPremisePermit'
            //handler: 'printColumnPremisePermit'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        hidden:true,
        dataIndex: 'reference_no',
        text: 'Application No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        hidden:true,
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
        header: 'Recomendation',
        dataIndex: 'decision_id',
        flex: 1,
        renderer: function (value, metaData,record) {
            var decision_id = record.get('decision_id')
            if (decision_id==1 || decision_id===1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return record.get('approval_status');
            }else if(decision_id==2 || decision_id===2){
              metaData.tdStyle = 'color:white;background-color:red';
              return record.get('approval_status');
          }else{
            return 'Missing Final Decision';
           }
        }
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        flex: 1
    }, {
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
                items: [
                    {
                        text: 'Print',
                        iconCls: 'x-fa fa-print',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'Premise Certificate',
                                    iconCls: 'x-fa fa-certificate',
                                    backend_function: 'printPremiseRegistrationCertificate',
                                    handler: 'printPremiseCertificate'
                                },  {
                                    text: 'Cancellation Form',
                                    hidden:true,
                                    iconCls: 'x-fa fa-certificate',
                                    backend_function: 'printPremiseBusinessPermit',
                                    handler: 'printPremisePermit'
                                }
                            ]
                        }
                    },  {
                        text: 'Inspection Report',
                        iconCls: 'x-fa fa-exchange',
                        menu: {
                            xtype: 'menu',
                            items: [
                                
                                {
                                    text: 'Inspection Report(DID)',
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
                        text: 'Preview Premises Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showPreDrugShopApplicationMoreDetails'
                    }
                ]
            }
        }
    }]
});
