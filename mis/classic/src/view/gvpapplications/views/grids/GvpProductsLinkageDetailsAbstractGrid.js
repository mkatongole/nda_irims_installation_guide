/**
 * Created by Kip on 4/2/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpProductsLinkageDetailsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gvpproductslinkagedetailsabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'GVP Product Details',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'brand_name',
                text: 'Brand Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'common_name',
                text: 'Common Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'dosage_form',
                text: 'Dosage Form',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'classification_name',
                text: 'Classification',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'shelf_life',
                text: 'Shelf Life',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'storage_condition',
                text: 'Storage Conditions',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'certificate_no',
                text: 'Certificate No',
                flex: 1
            },
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
