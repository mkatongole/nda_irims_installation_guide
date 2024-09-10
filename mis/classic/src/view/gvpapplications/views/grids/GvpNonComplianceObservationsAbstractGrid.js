/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpNonComplianceObservationsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gvpnoncomplianceobservationsabstractgrid',

    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'category',
                text: 'Category(Severity)',
                flex: 1,
                hidden: true
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'observation',
                text: 'Observation',
                flex: 1,
                tdCls: 'wrap',
                renderer: function(value) {
                    return '<span style="color: red; font-weight: bold; font-style: italic; white-space: normal;">' + value + '</span>';
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'reference',
                text: 'GVP Guidelines reference no:',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'description',
                text: 'Guideline Description',
                flex: 2,
                tdCls: 'wrap',
                renderer: function(value){
                    return '<span style ="color: green;">' + value + '</span>';
                }
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'application_section',
                text: 'Section',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'status_name',
                text: 'Status',
                width: 150
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});