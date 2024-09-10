/**
 * Created by Softclans on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.abstract.ControlledPermitsProductsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'controlledpermitsproductsabstractgrid',
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
   
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
    initComponent: function () {
        var defaultColumns = [{
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
          }];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
