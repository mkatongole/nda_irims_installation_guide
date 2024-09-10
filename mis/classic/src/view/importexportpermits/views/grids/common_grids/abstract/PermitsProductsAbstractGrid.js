/**
 * Created by Softclans on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.abstract.PermitsProductsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'permitsproductsabstractgrid',
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
        },
        {
            ptype: 'cellediting',
            clicksToEdit: 1,
            editing: true
        },
        {
            ptype: 'filterfield'
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
            width: 80
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'units_of_strength',
            tdCls: 'wrap-text',
            text: 'Unit Of Strength',
            width: 80
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'dosage_form',
            tdCls: 'wrap-text',
            text: 'Dosage Form',
            width: 150
        },{
            xtype: 'gridcolumn',
            dataIndex: 'product_to_be_imported',
            text: 'Product to be Imported',
            width: 150,
            hidden: true
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'no_of_packs',
            text: 'Number of Packs',
            width: 80
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'currency_name',
            tdCls: 'wrap-text',
            text: 'Currency',
            width: 80
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
            width: 80
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
          renderer: function (value, metaData,record) {
              var is_registered = record.get('is_registered')
              if (is_registered==1 || is_registered===1) {
                  metaData.tdStyle = 'color:white;background-color:green';
                  return record.get('product_registration_status');
              }else if(is_registered==2 || is_registered===2){
                metaData.tdStyle = 'color:white;background-color:red';
                return record.get('product_registration_status');
            }else{
              return record.get('product_registration_status');
             }
          }
       },
       {
          header: 'Product Recommendation(Acceptance)',
          dataIndex: 'permitprod_recommendation',
          width: 150,
          renderer: function (value, metaData,record) {
              var permitprod_recommendation_id = record.get('permitprod_recommendation_id')
              if (permitprod_recommendation_id==2 || permitprod_recommendation_id===2) {
                  metaData.tdStyle = 'color:white;background-color:green';
                  return record.get('permitprod_recommendation');
              }else if(permitprod_recommendation_id==3 || permitprod_recommendation_id===3){
                metaData.tdStyle = 'color:white;background-color:red';
                return record.get('permitprod_recommendation');
            }else{
              return record.get('permitprod_recommendation');
             }
          }
       }, {
            xtype: 'gridcolumn',
            dataIndex: 'permitprod_recommendation_remarks',
            tdCls: 'wrap-text',
            text: 'Recommendation Remarks',
            width: 150
        }];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
