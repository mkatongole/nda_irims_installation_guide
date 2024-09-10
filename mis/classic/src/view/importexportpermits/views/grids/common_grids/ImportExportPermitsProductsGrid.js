/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitsProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'importexportpermitsproductsgrid',
    itemId: 'importexportpermitsproductsgrid',
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
                // return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        // bind: {
        //     hidden: '{isReadOnly}'  // negated
        // },
        name: 'add_products',
        ui: 'soft-green',
        childXtype: 'importexportpermitsproductspnl',
        winTitle: 'Add Products Details',
        winWidth: '80%',
        handler: 'showAddImpPermitProductsWinFrm',
        stores: '[]',
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly',
        bind: {
            value: '{isReadOnly}'  // negated
        }
    }],
    export_title: 'Import/Export Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('importexportpermitsproductsgrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local',
        position: 'bottom',
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'cellediting',
        clicksToEdit: 3,
        editing: false
    }, {
        ptype: 'filterfield'
    }],
    listeners: {
        beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'importexportpermitsproductsstr',
                proxy: {
                    url: 'importexportpermits/getImportexportpermitsproductsDetails',
                }
            },
            isLoad: true
        },
        afterrender: function (grid) {
            var pnl = grid.up('importexportdetailspnl'),
                wizzardPnl = grid.up('importexportpermitevaluationpnl'),
                wizzardManagerPnl = grid.up('importexportpermitmanagerreviewwizard'),
                mainPnl = grid.up('panel').up('importexportdetailspnl'),
                form;

            if (wizzardPnl) {
                form = wizzardPnl.down('importexportdetailsfrm');
            } else if (mainPnl) {
                form = mainPnl.down('importexportdetailsfrm');
            } else if (wizzardManagerPnl) {
                form = wizzardManagerPnl.down('importexportdetailsfrm');
            } else {
                form = pnl.down('importexportdetailsfrm');
            }

            var productCategoryId = form.down('combo[name=product_category_id]').getValue();
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

                if (productCategoryId == 8 || productCategoryId ===8) {
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
                } else if (productCategoryId == 9 || productCategoryId ===9) {
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
                } else {
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
    columns: [{
        xtype: 'rownumberer',
        width: 20
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        tdCls: 'wrap-text',
        text: 'Registration No',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        tdCls: 'wrap-text',
        text: 'Brand Name',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gmdn_term',
        tdCls: 'wrap-text',
        text: 'GMDN Term Name',
        width: 150,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        tdCls: 'wrap-text',
        text: 'Manufacturing Site',
        width: 150,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_strength',
        tdCls: 'wrap-text',
        text: 'Strength',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'units_of_strength',
        tdCls: 'wrap-text',
        text: 'Unit Of Strength',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        tdCls: 'wrap-text',
        text: 'Dosage Form',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_to_be_imported',
        text: 'Product to be Imported',
        width: 150,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'no_of_packs',
        text: 'Number of Packs',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',
        tdCls: 'wrap-text',
        text: 'Currency',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'unit_price',
        tdCls: 'wrap-text',
        text: 'Price Per Pack',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pack_size',
        tdCls: 'wrap-text',
        text: 'Pack Size',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'total_value',
        tdCls: 'wrap-text',
        text: 'Total Value',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'verification_fee_percentage',
        tdCls: 'wrap-text',
        text: 'Verification Fee %',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'verification_fee',
        tdCls: 'wrap-text',
        text: 'Verification Fees',
        width: 150,
        summaryType: 'sum',
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return 'Total Verification Fees ' + val;
        }
    }, {
        header: 'Registration Status',
        dataIndex: 'product_registration_status',
        width: 150,
        renderer: function (value, metaData, record) {
            var is_registered = record.get('is_registered');
            if (is_registered == 1 || is_registered === 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return record.get('product_registration_status');
            } else if (is_registered == 2 || is_registered === 2) {
                metaData.tdStyle = 'color:white;background-color:red';
                return record.get('product_registration_status');
            } else {
                return record.get('product_registration_status');
            }
        }
    }, {
        header: 'Product Recommendation (Acceptance)',
        dataIndex: 'permitprod_recommendation',
        width: 150,
        renderer: function (value, metaData, record) {
            var permitprod_recommendation_id = record.get('permitprod_recommendation_id');
            if (permitprod_recommendation_id == 2 || permitprod_recommendation_id === 2) {
                metaData.tdStyle = 'color:white;background-color:green';
                return record.get('permitprod_recommendation');
            } else if (permitprod_recommendation_id == 3 || permitprod_recommendation_id === 3) {
                metaData.tdStyle = 'color:white;background-color:red';
                return record.get('permitprod_recommendation');
            } else if (record.get('permitprod_recommendation') == '') {
                return 'Missing Recommendation';
            } else {
                metaData.tdStyle = 'color:white;background-color:blue';
                return record.get('permitprod_recommendation');
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permitprod_recommendation_remarks',
        tdCls: 'wrap-text',
        text: 'Recommendation Remarks',
        width: 150,
        renderer: function (val) {
            if (val == '') {
                val = 'Recommendation Remarks';
            }
            return val;
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    // bind: {
                    //     hidden: '{isReadOnly}'  // negated
                    // },
                    childXtype: 'importexportpermitsproductsfrm',
                    winTitle: 'Import/Export Permit Products details',
                    winWidth: '80%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_permits_products',
                    // bind: {
                    //     hidden: '{isReadOnly}'  // negated
                    // },
                    storeID: 'importexportpermitsproductsstr',
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeletePermitOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
