/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 10/16/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ControlDrugsImpManagerEvaluationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'controldrugsimpmanagerevaluationgrid',
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
            /*{
                fn:'moveSelectedRecordRowToTop'
            }*/
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
                    table_name: 'tra_importexport_applications',
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
                    storeID: 'importexportpermitsproductsstr',
                    table_name: 'tra_importexport_applications',
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
    listeners: {
        beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 10000,
                table_name: 'tra_importexport_applications',
                proxy: {
                    url: 'importexportpermits/getManagerEvaluationApplications'
                },
            },
            isLoad: true
        },
         afterrender: function(grid) {
                var pnl = grid.up('panel'),
                subModuleId = pnl.down('hiddenfield[name=sub_module_id]').getValue();
                grid.columns.forEach(function(column) {
                if(subModuleId==61 || subModuleId===61){

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
                              
                          }else if(subModuleId==123 || subModuleId===123){
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
                    text: 'Preview Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Import/Export Permit Applications',
                    winWidth: '40%',
                    isReadOnly:1,
                    handler: 'editpreviewPermitinformation'
                },{
                    text: 'Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    document_previewpnl: 'previewpermitdocuploadsgrid',
                    winTitle: 'Application Documents',
                    winWidth: '40%',
                    isReadOnly:1,
                    handler: 'funcPrevGridApplicationDocuments'
                }, {
                    text: 'Print Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Print Record',
                    action: 'edit',
                    childXtype: '',
                    hidden:true,
                    winTitle: 'Product Information',
                    winWidth: '40%',
                    handler: 'printpreviewProductInformation'
                },{
                    xtype: 'transitionsbtn'
                   }]
            }
        }
    }]
    
});
