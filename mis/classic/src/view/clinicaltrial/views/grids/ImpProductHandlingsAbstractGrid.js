/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ImpProductHandlingsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'impproducthandlingabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'investigator_name',
                text: 'Investigator Name',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'delivery_details',
                text: 'Shipping/Delivery Details',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype: 'gridcolumn',
                dataIndex: 'storage_arrangement',
                text: 'Storage Arrangement',
                flex: 1,
                tdCls: 'wrap'
            },  {
                xtype: 'gridcolumn',
                dataIndex: 'container',
                text: 'Container',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'container_material',
                text: 'Container Material',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'no_of_units',
                text: 'No of Units',
                flex: 1,
                tdCls: 'wrap'
            },  {
                xtype: 'gridcolumn',
                dataIndex: 'no_of_packs',
                text: 'No of Packs',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype: 'gridcolumn',
                dataIndex: 'si_units',
                text: 'SI Units',
                flex: 1,
                tdCls: 'wrap'
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});