/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitReleaseGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'importexportpermitreleasegrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitreleasegridStr',
                proxy: {
                    url: 'importexportpermits/getImportExportApprovedPermit'
                }
            },  afterrender: function(grid) {
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
        isLoad: true,
         autoLoad: true
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
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
            ui: 'soft-green',
            text: 'Print/Preview Permit',
            iconCls: 'x-fa fa-certificate',
            name: 'certificate',
            handler: 'generateColumnImportExportPermit'
        }
    },{
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
    }, {
        xtype: 'gridcolumn',
        text: 'Invoice No',
        dataIndex: 'proforma_invoice_no',
        flex: 1,
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
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
        header: 'Recommendation(MIE)',
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
    }, {
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
      },  
    {
        header: 'Recommendation(Director)',
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
                        text: 'Print/Preview Permit',
                        iconCls: 'x-fa fa-certificate',
                        handler: '',
                        hidden:true,
                        name: 'certificate',
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
                        text: 'View Checklists & Recommendation',
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