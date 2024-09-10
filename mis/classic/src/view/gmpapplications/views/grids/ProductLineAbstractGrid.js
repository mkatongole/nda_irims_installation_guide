
Ext.define('Admin.view.gmpapplications.views.grids.ProductLineAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productlineabstractgrid',
    features: [
    {
        ftype: 'summary',
        dock: 'bottom'
    }],
    plugins: [{
            ptype: 'gridexporter'
    }],
    export_title: 'Product line Details',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    initComponent: function () {
        var defaultColumns = [
            {
              xtype: 'rownumberer'
           },
            {
                xtype: 'gridcolumn',
                dataIndex: 'product_line_name',
                text: 'DOSAGE FORM (line type)',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'product_line_category',tdCls:'wrap-text',
                text: 'PRODUCT CATEGORY',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'product_line_description',
                tdCls:'wrap-text',
                text: 'DOSAGE FORM DESCRIPTION',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'block',tdCls:'wrap-text',
                text: 'BLOCK',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'activities',
                text: 'MANUFACTURING ACTIVITY',
                flex: 2,
                tdCls: 'wrap-text'
            }
            ];
            this.columns = defaultColumns.concat(this.columns);
            this.callParent(arguments);
    }
});