/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.OnlineImportExportPermitManagerSubGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'onlineimportexportpermitmanagersubgrid',
    
    itemId: 'onlineapplicationpermitmanagersubgrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'onlineimportexportpermitmanagersubgridstr',
                proxy: {
                    url: 'dashboard/getOnlineImportExportManagerReviewApplications'
                }
            },
            isLoad: true
        },
        afterrender: function(grid) {
                var pnl = grid.up('panel'),
                subModuleId = pnl.down('hiddenfield[name=sub_module_id]').getValue();
                grid.columns.forEach(function(column) {
                if(subModuleId==12 || subModuleId===12 || subModuleId==61 || subModuleId===61){
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
                            if (column.dataIndex === 'date_submitted') {
                                column.setHidden(true);
                            }
                            
                              
                          }else{
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
                            if (column.dataIndex === 'date_submitted') {
                                column.setHidden(false);
                            }
                           
                            
                          }
                    });
        },


        
        deselect: function (sel, record, index, eOpts) {
            
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
                grid.down('button[name=submit_selected]').setDisabled(false);
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid;
            
            grid.down('button[name=submit_selected]').setDisabled(false);

        },
        itemdblclick: 'onOlineIntrayItemDblClick'
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
    tbar: [
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to preview the application details.!!',
            fieldStyle: {
                'color': 'green'
            }
        }
    ],
    
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'gridcolumn',
        width: 50,
        renderer: function (val, meta, record) {
            var isRead = record.get('isRead');
            if (isRead == 1 || isRead === 1) {
                //return '<img src="' + base_url + '/resources/images/new3.jpg">';
            } else {
                return '<img src="' + base_url + '/resources/images/new3.jpg">';
            }
        }
    },
    {
        xtype: 'gridcolumn',
        text: 'Application Status',
        dataIndex: 'application_status',
        flex: 1,
        tdCls: 'wrap',
        filter: {
            xtype: 'combo',
            emptyText: 'status',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'online_status_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getOnlineApplicationStatus'
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                    var grid = cmbo.up('grid'),
                        store = grid.getStore();
                    store.removeAll();
                    store.load({params:{'is_assessment': 1}});
                }
            },
        }
    },
    {
        xtype: 'gridcolumn',
        text: 'Tracking No',
        dataIndex: 'tracking_no',
        flex: 1,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },
   
    {
        xtype: 'gridcolumn',
        text: 'Process',
        dataIndex: 'process_name',
        flex: 1,
        tdCls: 'wrap-text'
    },
   
    {
        xtype: 'gridcolumn',
        text: 'Applicant',
        dataIndex: 'applicant_name',
        flex: 1,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },
    {
        xtype: 'gridcolumn',
        text: 'Date Received',
        dataIndex: 'date_submitted',
        flex: 1,
        tdCls: 'wrap-text'
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
        
    },
     {
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
    },{
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
        text: 'Invoice No',
        dataIndex: 'proforma_invoice_no',
        flex: 1,
        hidden:true,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    }, 
    {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        //hidden:true,
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
                        handler: 'onpreviewonlineimpApplicationdetails'
                    }
                ]
            }
        }
    }]
});