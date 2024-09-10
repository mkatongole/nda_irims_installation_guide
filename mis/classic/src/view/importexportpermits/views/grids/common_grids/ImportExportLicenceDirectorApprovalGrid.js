
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportLicenceDirectorApprovalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'importexportlicencedirectorapprovalgrid',
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
            isLoad: true 
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
                grid.down('button[name=batch_director_recommendation]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
                grid.down('button[name=batch_director_recommendation]').setDisabled(true);
            }
        }
        
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
     margin: 3,
    tbar: [ {
            xtype: 'tbspacer',
            width: 20
        },{
            text: 'Batch Review & Approval Recommendation',
            ui: 'soft-purple',
            disabled:true,
            name:'batch_director_recommendation',
            iconCls: 'x-fa fa-chevron-circle-up',
            ui: 'soft-purple',
            iconCls: 'fa fa-sliders',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Reject Application',
                        iconCls: 'x-fa fa-bars',
                        decision_id: 3,
                        winWidth: '90%', ui: 'soft-red',
                        name: 'reject_recommendation',
                        stores: '[]'
                    },{
                        text: 'Approve Application',
                        iconCls: 'x-fa fa-bars', decision_id: 1,
                        winWidth: '90%',ui: 'soft-green',
                        name: 'approve_recommendation',
                        stores: '[]'
                }
            ]
        }
     },'->',{
        xtype: 'combo',
        fieldLabel: 'Zones',
        forceSelection: true,
        queryMode: 'local',
        hidden: true,
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
        
    },{
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
    },
    {
        header: '(MIE) Recommendation',
        dataIndex: 'manager_recommendation',
        flex: 1,
        renderer: function (value, metaData,record) {
            var manager_recommendation_id = record.get('manager_recommendation_id')
            if (manager_recommendation_id==1 || manager_recommendation_id===1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return record.get('manager_recommendation');
            }else if(manager_recommendation_id==2 || manager_recommendation_id===2){
              metaData.tdStyle = 'color:white;background-color:red';
              return record.get('manager_recommendation');
          }else{
            return record.get('manager_recommendation');
           }
        }
    },
    //  {
    //     xtype: 'widgetcolumn',
    //     width: 150,
    //     widget: {
    //         width: 150,
    //         textAlign: 'left',
    //         xtype: 'button',
    //         ui: 'soft-red',
    //         text: 'Recommendation',
    //         iconCls: 'x-fa fa-chevron-circle-up',
    //         childXtype: 'applicationcommentspnl',
    //         winTitle: 'Assessment Comments',
    //         winWidth: '60%',
    //         handler: 'showCommentDetails',
    //         comment_type_id: 3,
    //         stores: '[]'
    //     }
    // }, 
    {
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            itemId: 'prints',
            ui: 'soft-green',
            text: 'Preview License/Letter',
            iconCls: 'x-fa fa-certificate',
            handler: 'generateImportExportPermit',
            bind: {
               // disabled: '{record.release_recommendation_id <= 0 || record.release_recommendation_id === null}'
                //disabled: '{record.decision_id !== 1}'
            }
        }
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
                        winWidth: '70%',
                        isReadOnly: 1,
                        document_type_id: '',
                       // hidden: true,
                        handler: 'showPreviousUploadedDocs'
                    },{
                        text: 'View Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                       // hidden: true,
                       isnotDoc:1,
                        handler: 'showApplicationChecklists'
                    },{
                        text: 'Request for Additional Information',
                        iconCls: 'x-fa fa-file-pdf-o',
                        handler: 'showApplicationQueries'
                    },
                    {
                         xtype: 'transitionsbtn'
                    }
                ]
            }
        }
    }]
});