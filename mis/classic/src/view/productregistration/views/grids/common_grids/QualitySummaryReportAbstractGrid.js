
Ext.define('Admin.view.productregistration.views.grids.common_grids.QualitySummaryReportAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'qualitysummaryreportabstractgrid',
    plugins: [{
            ptype: 'gridexporter'
    }],
    export_title: 'Quality Summary Report',
 
    
    initComponent: function () {
        // These are the default columns that will show for every extended grid
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'report', tdCls: 'wrap-text',   
                text: 'Quality Summary Report',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'recommendation',
                text: 'Recommended?',
                align: 'center',     tdCls: 'wrap-text',   
                tdcls: 'editor-text',
                width: 120,
                editor: {
                    xtype: 'combo',
                    store: 'confirmationstr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    listeners: {
                       
                    }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = 'Select true or False';
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                }
                
            },
             {
                xtype: 'gridcolumn',
                dateaIndex: 'recommendations',
                tdCls:'wrap-text',
                text: 'Recommendation',
                width: 250,
                editor: {
                    xtype:'textareafield'
                },renderer: function (val) {
                    if (val == '') {
                       
                             var val = 'Recommendation';
                    }
                    return val;
                }
            },  
          
            {
                xtype: 'gridcolumn',
                dataIndex: 'has_query',tdCls:'wrap-text',
                text: 'Has Query?',
                width: 120,
                editor: {
                    xtype: 'combo',
                    store: 'confirmationstr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    listeners: {
                       
                    }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = 'Select true or False';
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                }
                
            },
            // {
            //   xtype: 'widgetcolumn',
            //   text: 'Query',
            //   dataIndex: 'query',
            //   flex: 1,
            //   widget: {
            //     xtype: 'textareafield',
            //     grow: true,
            //     editable: true
            // },
            {
                xtype: 'gridcolumn',
                dateaIndex: 'query',
                tdCls:'wrap-text',
                text: 'Query',
                width: 250,
                editor: {
                    xtype:'textareafield'
                },renderer: function (val) {
                    if (val == '') {
                       
                             var val = 'Query';
                    }
                    return val;
                }
            }];
            this.columns = defaultColumns.concat(this.columns);
            this.callParent(arguments);
    }
});