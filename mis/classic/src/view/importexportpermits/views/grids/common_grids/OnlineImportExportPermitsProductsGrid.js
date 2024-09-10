/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.OnlineImportExportPermitsProductsGrid', {
    extend: 'Admin.view.importexportpermits.views.grids.common_grids.abstract.PermitsProductsAbstractGrid',
    controller: 'importexportpermitsvctr',
    xtype: 'onlineimportexportpermitsproductsgrid',
    itemId: 'onlineimportexportpermitsproductsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var isregulated_product = record.get('isregulated_product');
            if (isregulated_product == 0 || isregulated_product === 0) {
               //  return 'invalid-row';
            }
            
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Permit Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        hidden:true,
        ui: 'soft-green',
        childXtype: 'importexportpermitsproductsfrm',
        winTitle: 'Add Permit Products Details',
        winWidth: '40%',
        handler: 'showAddProductOtherdetailsWinFrm',
        stores: '[]',
        // bind: {
        //     hidden: '{isReadOnly}'  // negated
        // }
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly',
        bind: {
            value: '{isReadOnly}'  // negated
        }
    }, {
        xtype: 'hiddenfield',
        name: 'product_category_id'
    }],

    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Impor/Export Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('onlineimportexportpermitsproductsgrid').fireEvent('refresh', this);//
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],

    listeners: {
        // afterrender: {
        //     fn: 'setProductRegGridsStore',
        //     config: {
        //         pageSize: 100000,
        //         storeId: 'onlineimportexportpermitsproductsstr',
        //        groupField:'sub_module',
        //         proxy: {
        //             url: 'importexportpermits/getOnlineImportexportpermitsproductsDetails'
        //         }
        //     },
        //     isLoad: true
        // }
         beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'onlineimportexportpermitsproductsstr',
                proxy: {
                    url: 'importexportpermits/getOnlineImportexportpermitsproductsDetails',
                    
                }
            },
            isLoad: true
        },

        afterrender: function(grid) {
                var pnl = grid.up('onlineimportexportdetailspnl'),
                form = pnl.down('onlineimportexportdetailsfrm'),
                productCategoryId = form.down('combo[name=product_category_id]').getValue();
                var isRegisterdId = form.down('combo[name=is_registered]').getValue();
                grid.columns.forEach(function (column) {
                  if (isRegisterdId == 2 ||isRegisterdId ===2) {
                    if (column.dataIndex === 'certificate_no') {
                        column.setHidden(true);
                    }
                }else{
                    if (column.dataIndex ==='certificate_no') {
                        column.setHidden(false);
                    }

                }

                if (column.dataIndex === 'product_registration_status') {
                    column.setHidden(true);
                } 
                if (column.dataIndex === 'permitprod_recommendation') {
                    column.setHidden(true);
                } 
                if (column.dataIndex === 'permitprod_recommendation_remarks') {
                    column.setHidden(true);
                } 
                if(productCategoryId==8 || productCategoryId==8){
                            if (column.dataIndex === 'gmdn_term') {
                                column.setHidden(true);
                            } 
                            if (column.dataIndex === 'manufacturer_name') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'product_to_be_imported') {
                                column.setHidden(true);
                            } 
                            if (column.dataIndex === 'product_strength') {
                                column.setHidden(false);
                            } 
                            if (column.dataIndex === 'units_of_strength') {
                                column.setHidden(false);
                            } 
                             if (column.dataIndex === 'dosage_form') {
                                column.setHidden(false);
                            } 
                      }else if(productCategoryId==9 || productCategoryId===9){
                            if (column.dataIndex === 'gmdn_term') {
                                column.setHidden(false);
                            } 
                            if (column.dataIndex === 'manufacturer_name') {
                                column.setHidden(false);
                            }
                            if (column.dataIndex === 'product_to_be_imported') {
                                column.setHidden(true);
                            } 
                            if (column.dataIndex === 'product_strength') {
                                column.setHidden(true);
                            } 
                            if (column.dataIndex === 'units_of_strength') {
                                column.setHidden(true);
                            } 
                             if (column.dataIndex === 'dosage_form') {
                                column.setHidden(true);
                            }
                           
                          }else{
                            if (column.dataIndex === 'gmdn_term') {
                                column.setHidden(true);
                            } 
                            if (column.dataIndex === 'manufacturer_name') {
                                column.setHidden(true);
                            }
                            if (column.dataIndex === 'product_to_be_imported') {
                                column.setHidden(false);
                            } 
                            if (column.dataIndex === 'product_strength') {
                                column.setHidden(false);
                            } 
                            if (column.dataIndex === 'units_of_strength') {
                                column.setHidden(false);
                            } 
                             if (column.dataIndex === 'dosage_form') {
                                column.setHidden(false);
                            }
                           
                          }
                    });
        }
    },
    columns: [  {
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
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    childXtype: 'importexportpermitsproductsfrm',
                    winTitle: 'Import/Export Permit Products details',
                    winWidth: '90%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_product_ingredients',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    storeID: 'foodproductingredientsstr', 
                    disabled: '{disableNameField}',
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteProductOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
