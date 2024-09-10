/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitManagerSubGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'importexportpermitmanagersubgrid',
    listeners: {
        
    },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitmanagersubstr',
                proxy: {
                    url: 'importexportpermits/getImportExportManagerReviewApplications'
                }
            },
            isLoad: false
        },

          afterrender: function(grid) {
                var pnl = grid.up('panel'),
                subModuleId = pnl.down('hiddenfield[name=sub_module_id]').getValue();
                grid.columns.forEach(function(column) {
                if(subModuleId==12 || subModuleId===12){

                            if (column.dataIndex === 'td_application_type') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'td_shipment_date') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'td_transport_document') {
                                column.setHidden(true);
                            } 
                             if (column.dataIndex === 'td_transport_document_number') {
                                column.setHidden(true);
                            } 
                             if (column.dataIndex === 'td_clearing_agent') {
                                column.setHidden(true);
                            }

                            //
                            if (column.dataIndex === 'proforma_invoice_no') {
                                column.setHidden(false);
                            } 
                            if (column.dataIndex === 'vc_application_type') {
                                column.setHidden(false);
                            }
                            if (column.dataIndex === 'registration_level') {
                                column.setHidden(false);
                            }
                            if (column.dataIndex === 'importation_reason') {
                                column.setHidden(false);
                            }
                            if (column.dataIndex === 'product_category') {
                                column.setHidden(false);
                            }
                            if (column.dataIndex === 'date_added') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'application_status') {
                                column.setHidden(true);
                            }
                              
                          }else if(subModuleId==115 || subModuleId===115){
                            if (column.dataIndex === 'td_application_type') {
                                column.setHidden(false);
                            }
                            if (column.dataIndex === 'td_shipment_date') {
                                column.setHidden(false);
                            }
                            if (column.dataIndex === 'td_transport_document') {
                                column.setHidden(false);
                            } 
                             if (column.dataIndex === 'td_transport_document_number') {
                                column.setHidden(false);
                            } 
                             if (column.dataIndex === 'td_clearing_agent') {
                                column.setHidden(false);
                            } 

                            if (column.dataIndex === 'proforma_invoice_no') {
                                column.setHidden(true);
                            } 
                            if (column.dataIndex === 'vc_application_type') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'registration_level') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'importation_reason') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'premises_name') {
                                column.setHidden(true);
                            }
                             if (column.dataIndex === 'business_type') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'product_category') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'date_added') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'application_status') {
                                column.setHidden(true);
                            }
                              
                          }else{
                            if (column.dataIndex === 'td_application_type') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'td_shipment_date') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'td_transport_document') {
                                column.setHidden(true);
                            } 
                             if (column.dataIndex === 'td_transport_document_number') {
                                column.setHidden(true);
                            } 
                             if (column.dataIndex === 'td_clearing_agent') {
                                column.setHidden(true);
                            }
                            //
                            if (column.dataIndex === 'proforma_invoice_no') {
                                column.setHidden(true);
                            } 
                            if (column.dataIndex === 'vc_application_type') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'registration_level') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'importation_reason') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'product_category') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'date_added') {
                                column.setHidden(false);
                            }
                            if (column.dataIndex === 'application_status') {
                                column.setHidden(false);
                            }
                            
                          }
                    });
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
            
        }
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    },'->',{
        xtype: 'combo',
        fieldLabel: 'Zones',
        forceSelection: true,
        hidden:true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'zone_id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
             beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_zones'
                    }
                   }
                },
                isLoad: true
            },
           beforequery: function() {
                var store=this.getStore();
                
                var all={name: 'All',id:0};
                  store.insert(0, all);
                },
            afterrender: function(combo) {
                        combo.select(combo.getStore().getAt(0));	
                    }
        }
    }],
    
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        tdCls: 'wrap-text',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        text: 'VC Application Type',
        dataIndex: 'vc_application_type',
        flex: 1,
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    }, {
        xtype: 'gridcolumn',
        text: 'Registration Level',
        dataIndex: 'registration_level',
        flex: 1,
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_added',
        text: 'Application Date',
        tdCls: 'wrap-text',
        flex: 1
    },{
        xtype: 'gridcolumn',
        text: 'Business Name',
        dataIndex: 'premises_name',
        flex: 1,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'business_type',
        text: 'Business Type',
        tdCls: 'wrap-text',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        text: 'Importation Reason',
        dataIndex: 'importation_reason',
        flex: 1,
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },
     {
        xtype: 'gridcolumn',
        text: 'Product Category',
        dataIndex: 'product_category',
        flex: 1,
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },
    {
        xtype: 'gridcolumn',
        text: 'Invoice No',
        dataIndex: 'proforma_invoice_no',
        flex: 1,
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },

    {
        xtype: 'gridcolumn',
        text: 'Declaration Type',
        dataIndex: 'td_application_type',
        flex: 1,
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },
    {
        xtype: 'gridcolumn',
        text: 'Shipment Date',
        dataIndex: 'td_shipment_date',
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },
    {
        xtype: 'gridcolumn',
        text: 'Transport Document ',
        dataIndex: 'td_transport_document',
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        text: 'Transport Document No',
        dataIndex: 'td_transport_document_number',
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },
     {
        xtype: 'gridcolumn',
        text: 'Clearing Agent',
        dataIndex: 'td_clearing_agent',
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },
   {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                        text: 'Preview Import/Export Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'editpreviewPermitinformation'
                    },{
                        text: 'All Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '40%',
                        isReadOnly: 1,
                        document_type_id: '',
                        hidden: true,
                        handler: 'showPreviousUploadedDocs'
                    },{
                        text: 'View Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                        //hidden: true,
                        isnotDoc:1,
                        handler: 'showApplicationChecklists'
                    },{
                         xtype: 'transitionsbtn'
                    }
                ]
            }
        }
    }]
});