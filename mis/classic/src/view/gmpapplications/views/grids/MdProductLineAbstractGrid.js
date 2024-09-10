
Ext.define('Admin.view.gmpapplications.views.grids.MdProductLineAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'mdproductlineabstractgrid',
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
                dataIndex: 'medical_device_family_name',
                text: 'Medical Device Group/Family Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'sterile_category',
                tdCls:'wrap-text',
                text: 'Sterile/Non-sterile',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'invasive_category',
                tdCls:'wrap-text',
                text: 'Invasive/Non- Invasive device',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'medicated_category',
                tdCls:'wrap-text',
                text: 'Medicated/Non-medicated',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'active_category',
                tdCls:'wrap-text',
                text: 'Active/Active',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'product_line_description',
                tdCls:'wrap-text',
                text: 'Device Description',
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