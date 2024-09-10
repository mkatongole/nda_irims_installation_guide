/**
 * Created by Softclans on 1/17/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.StudySitesAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'studysitesabstractgrid',
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'name',
                text: 'Site Name',
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
            }, {
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
            },{
                xtype: 'widgetcolumn',
                name:'view_sites',
                width: 160,
                widget:{
                    xtype: 'button',
                    text: 'View all Details',
                    childXtype: 'studysitefrm',
                    winTitle: 'Study Site',
                    itemId:'view_sites',
                    winWidth: '70%',
                    ui: 'soft-green',
                    iconCls: 'fa fa-eye',
                    handler: 'viewSiteDetails'
                }
            },{
                xtype: 'widgetcolumn',
                width: 120,
                name:'edit_sites',
                widget:{
                    xtype: 'button',
                    text: 'Edit',
                    iconCls: 'fa fa-edit',
                    itemId:'edit_sites',
                    childXtype: 'studysitefrm',
                    winTitle: 'Study Site',
                    winWidth: '70%',
                    handler: 'editSiteDetails'
                }
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
