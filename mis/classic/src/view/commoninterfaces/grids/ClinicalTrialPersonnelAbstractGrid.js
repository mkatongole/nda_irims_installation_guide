/**
 * Created by Softclans on 1/18/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.ClinicalTrialPersonnelAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'clinicaltrialpersonnelabstractgrid',
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'name',
                text: 'Name',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'contact_person',
                hidden:true,
                text: 'Contact Person',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'tin_no',
                text: 'TIN',
                hidden:true,
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'telephone',
                text: 'Telephone No',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'physical_address',
                text: 'Physical Address',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'postal_address',
                hidden:true,
                text: 'Postal Address',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'country_name',
                text: 'Country',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'region_name',
                text: 'Region',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
