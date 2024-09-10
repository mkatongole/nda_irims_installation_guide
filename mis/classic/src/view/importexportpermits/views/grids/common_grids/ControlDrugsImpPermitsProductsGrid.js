/**
 * Created by Softclans on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ControlDrugsImpPermitsProductsGrid', {
	extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'controldrugsimppermitsproductsgrid',
    itemId: 'controldrugsimppermitsproductsgrid',
    
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
        text: 'Add  Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        name:'add_products',
        ui: 'soft-green',
        childXtype: 'controldrugsimppermitsproductsfrm',
        winTitle: 'Control Drugs Import Permit Products details',
        winWidth: '40%',
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
            this.up('controldrugsimppermitsproductsgrid').fireEvent('refresh', this);//
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
                storeId: 'controldrugsimppermitsproductsstr',
                    proxy: {
                        url: 'importexportpermits/getControlledImpproductsDetails',
                        
                    }
            },
            isLoad: true
        }
    },
    columns: [{
            xtype:'rownumberer',
            width: 20 
          },{
              xtype: 'gridcolumn',
              dataIndex: 'brand_name',
              tdCls: 'wrap-text',
              text: 'Brand Name',
              width: 150
          },{
              xtype: 'gridcolumn',
              dataIndex: 'controlled_drugssubstances',
              tdCls:'wrap-text',
              text: 'Controlled Substance salt',
              width: 150
          },{
              xtype: 'gridcolumn',
              dataIndex: 'controlleddrugs_basesalt',
              text: 'Controlled Substance Base',
              width: 150
          }, {
              xtype: 'gridcolumn',
              dataIndex: 'drugs_schedule',
              text: 'Controlled Substance Schedule',
              width: 150
          },{
              xtype: 'gridcolumn',
              dataIndex: 'controlleddrug_type',
              text: 'Type of Controlled Drug',
              width: 150
          },{
              xtype: 'gridcolumn',
              dataIndex: 'quantity',
              text: 'Quantity',
              width: 150
          }, {
              xtype: 'gridcolumn',
              dataIndex: 'product_strength',
              text: 'Strength',
              width: 150
          }, {
              xtype: 'gridcolumn',
              dataIndex: 'controlleddrug_base',
              text: 'Amount of Base in Grams',
              width: 150
          }, {
              xtype: 'gridcolumn',
              dataIndex: 'pack_size',
              tdCls: 'wrap-text',
              text: 'Pack Size',
              width: 150
          },  {
              xtype: 'gridcolumn',
              dataIndex: 'unit_price',
              tdCls: 'wrap-text',
              text: 'Price Per Pack',
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
                    childXtype: 'controldrugsimppermitsproductsfrm',
                    winTitle: 'Control Drugs Import Permit Products details',
                    winWidth: '60%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_permits_products',
                    storeID: 'importexportpermitsproductsstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeletePermitOtherdetails'
                }]
            }
        }
    }]
});
