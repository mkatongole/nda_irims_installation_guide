/**

 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitReleaseApprovalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'importexportpermitreleaseapprovalgrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitreleasegridStr',
                proxy: {
                    url: 'importexportpermits/getImportExportApprovedPermit'
                }
            },
            isLoad: true,
            autoLoad: true
        },
         afterrender: function(grid) {
                var pnl = grid.up('panel'),
                subModuleId = pnl.down('hiddenfield[name=sub_module_id]').getValue();
                grid.columns.forEach(function(column) {
                if(subModuleId==12 || subModuleId===12 || subModuleId==61 || subModuleId===61){

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
                              
                          }else if(subModuleId==115 || subModuleId===115 || subModuleId==123 || subModuleId===123){
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
                grid.down('button[name=batch_approval_recommendation]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('release_recommendation_id');
            if (recommendation_id > 0) {
               //return true;
            } else {
               //return false;
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
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('release_recommendation_id');
            if (recommendation_id > 0) {
                return 'valid-row';
            } else {
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
    tbar: [{
        xtype: 'exportbtn'
    }, {
        text:'Batch Approval Recommendation',
        name:'batch_approval_recommendation',
        disabled: true,
        table_name: 'tra_importexport_applications',
        stores: '[]',
        handler:'getBatchPermitApplicationApprovalDetails',
        approval_frm: 'batchpermitreleaserecommfrm',
        iconCls: 'x-fa fa-chevron-circle-up',
        margin: 5
    
  },{
        xtype: 'tbspacer'
    },'->',{
        xtype: 'combo',
        fieldLabel: 'Zones',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        hidden: true,
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
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
   
    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            itemId: 'prints',
            ui: 'soft-green',
            text: 'Print License/Letter',
            iconCls: 'x-fa fa-certificate',
            handler: 'generateImportExportPermit',
            bind: {
                disabled: '{record.release_recommendation_id <= 0 || record.release_recommendation_id === null}'
                //disabled: '{record.decision_id !== 1}'
            }
        }
    },
    
   {
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        tdCls: 'wrap-text',
        width: 150
    },{
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
        
    }, {
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
         width: 150,
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
        header: 'MIE Recommendation',
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
    {
        header: 'Director Recommendation',
        dataIndex: 'director_recommendation',
        flex: 1,
        renderer: function (value, metaData,record) {
            var director_recommendation_id = record.get('director_recommendation_id')
            if (director_recommendation_id==1 || director_recommendation_id===1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return record.get('director_recommendation');
            }else if(director_recommendation_id==2 || director_recommendation_id===2){
              metaData.tdStyle = 'color:white;background-color:red';
              return record.get('director_recommendation');
          }else{
            return record.get('director_recommendation');
           }
        }
      }, {
        header: 'Approval Recommendation',
        dataIndex: 'approval_recommendation',
        flex: 1,
        renderer: function (value, metaData,record) {
            var approval_recommendation_id = record.get('approval_recommendation_id')
            if (approval_recommendation_id==1 || approval_recommendation_id===1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return record.get('approval_recommendation');
            }else if(approval_recommendation_id==2 || approval_recommendation_id===2){
              metaData.tdStyle = 'color:white;background-color:red';
              return record.get('approval_recommendation');
          }else{
            return record.get('approval_recommendation');
           }
        }
      }, {
        xtype: 'widgetcolumn',
        width: 150,
        widget: {
            width: 150,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-red',
            text: 'Regulatory Decision',
             iconCls: 'x-fa fa-chevron-circle-up',
                    handler: 'getPermitReleaseRecommendationDetails',
                    approval_frm:'permitReleaseRecommFrm',
                    vwcontroller: '',
                    stores: '[]',
                    table_name: 'tra_importexport_applications'
        }
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
                items: [{
                    text: 'Permit Release Recommendation',
                    iconCls: 'x-fa fa-chevron-circle-up',
                    handler: 'getPermitReleaseRecommendationDetails',
                    approval_frm:'permitReleaseRecommFrm',
                    hidden: true,
                    vwcontroller: '',
                    stores: '[]',
                    table_name: 'tra_importexport_applications'
                },
                    {
                        text: 'Print/Preview Permit',
                        iconCls: 'x-fa fa-certificate',
                        handler: '',
                        name: 'certificate',
                        hidden: true,
                        handler: 'generateImportExportPermit'
                    },
                    {
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
                        text: 'View  Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                       // hidden: true,
                        isnotDoc:1,
                        handler: 'showApplicationChecklists'
                    },{
                        text: 'Request for Additional Information',
                        iconCls: 'x-fa fa-file-pdf-o',
                        handler: 'showApplicationQueries'
                    },{
                         xtype: 'transitionsbtn'
                    }
                ]
            }
        }
    }]
});