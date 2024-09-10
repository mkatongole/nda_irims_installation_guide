Ext.define('Admin.view.gmpapplications.views.grids.ProductBlockLineAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productblocklineabstractgrid',
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
        // These are the default columns that will show for every extended grid
        var defaultColumns = [{
                xtype: 'gridcolumn',
                dataIndex: 'name',
                text: 'Block Name/Identity',
                flex: 1,
                tdCls: 'wrap-text'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'inspection_manufacturing_Category',
                text: 'Inspection Manufacturing Category',
                flex: 2,
                tdCls: 'wrap-text'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'general_manufacturing_activity_type',
                text: 'General Manufacturing Activity Type',
                flex: 2,
                hidden:true,
                tdCls: 'wrap-text'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'inspection_manufacturing_activity',
                hidden:true,
                text: 'Inspection Manufacturing Activities',
                flex: 2,
                tdCls: 'wrap-text'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'lines_no',
                text: 'No of Lines',
                flex: 1
            }
            ];
            this.columns = defaultColumns.concat(this.columns);
            this.callParent(arguments);
    }
});

