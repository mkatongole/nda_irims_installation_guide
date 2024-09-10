/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.DeclaredOnlineImportExportPermitsProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'declaredonlineimportexportpermitsproductsgrid',
    itemId: 'declaredonlineimportexportpermitsproductsgrid',
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
        //hidden: true,
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
    }],

    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Impor/Export  Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('declaredonlineimportexportpermitsproductsgrid').fireEvent('refresh', this);//
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
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'onlineimportexportpermitsproductsstr',
               groupField:'sub_module',
                proxy: {
                    url: 'importexportpermits/getDeclaredOnlImportexportpermitsproductsDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
        width: 20
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        tdCls: 'wrap-text',
        text: 'Registration No',
        tdCls: 'wrap-text',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Generic Name',
        tdCls: 'wrap-text',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_strength',
        text: 'Strength',
        tdCls: 'wrap-text',
        width: 80
    },{
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dosage Name',
        tdCls: 'wrap-text',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'units_of_strength',
        text: 'Units (strength)',
        tdCls: 'wrap-text',
        width: 70
    },{
        xtype: 'gridcolumn',
        dataIndex: 'batch_qty',
        text: 'Number of Packs (Batch)',
        tdCls: 'wrap-text',
        width: 60
    },{
        xtype: 'gridcolumn',
        dataIndex: 'batch_qty',
        text: 'Number of Packs (Batch)',
        tdCls: 'wrap-text',
        width: 60
    },{
        xtype: 'gridcolumn',
        dataIndex: 'batch_units',
        text: 'Number of Units (Batch)',
        tdCls: 'wrap-text',
        width: 80
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_batch_no',
        text: ' Batch No',
        tdCls: 'wrap-text',
        width: 60
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_manufacturing_date',
        text: 'Mgf Date',
        tdCls: 'wrap-text',
        width: 80
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_expiry_date',
        text: 'Product Expiry Date',
        tdCls: 'wrap-text',
         width: 80
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'units_for_quantity',
        text: 'Units for Quantity',
        tdCls: 'wrap-text',
        width: 80
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pack_price',
        text: 'Price Per pack(FOB)',
        tdCls: 'wrap-text',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',
        tdCls: 'wrap-text',
        text: 'Currency Name',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total_value',
        text: 'Total Value',
        tdCls: 'wrap-text',
        width: 200,
        summaryType: 'sum',
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return 'Fob '+val
        }
    },{
        
        xtype: 'gridcolumn',
        dataIndex: 'narcotic_permit',
        text: 'Narcotics Permit No',
        tdCls: 'wrap-text',
        width: 150
    }, {
        header: 'Product Recommendation (Acceptance)',
        dataIndex: 'permitprod_recommendation',
        width: 150,
         hidden:true,
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
        hidden:true,
        renderer: function (val) {
            if (val == '') {
                val = 'Recommendation Remarks';
            }
            return val;
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
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    disabled: true,
                    childXtype: 'importexportpermitsproductsfrm',
                    winTitle: 'Import/Export Permit Products details',
                    winWidth: '90%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }]
            }
        }
    }]
});
