Ext.define('Admin.view.productregistration.views.grids.quality_summary.PropertiesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'propertiesgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    minHeight: 200,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [{
        xtype: 'button',
        text: 'Update/Save',
        iconCls: 'x-fa fa-plus',
        name:'update_report',
        handler:'saveQualitySummaryReport',
        ui: 'soft-green',
        winWidth: '35%',
        stores: '[]'
    },{
        xtype:'hiddenfield',
        name: 'table_name',
        value:'tra_general_properties'
    }],
    selType: 'cellmodel',
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        editing: true
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this, 'tra_general_properties');
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 1000,
                storeId: 'propertiesgridstr',
                proxy: {
                    url: 'productregistration/getQualitySummaryDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'solubilities',
        text: 'Solubilities',
        width:150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_description',
        text: 'Physical Description',
        width:100,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'medium',
        text: 'Medium',
        width:100,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'solubility',
        text: 'Solubility(mg/ml)',
        width:100,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'polymorphic_form',
        text: 'polymorphic_form',
        width:100,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'solvate',
        text: 'solvate',
        width:100,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'hydrate',
        text: 'Hydrate',
        width:100,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'other',
        text: 'Other',
        width:100,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'ph',
        text: 'PH',
        width:100,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'pk',
        text: 'PK',
        width:100,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'partition_coefficient',
        text: 'Partition Coefficient',
        width:150,
        tdCls: 'wrap-text'
        },
         {
        xtype: 'gridcolumn',
        dataIndex: 'melting_boiling_point',
        text: 'Melting Boiling Point',
        width:150,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'is_recommended',
        text: 'Recommended?',
        align: 'center',    
        tdCls: 'wrap-text',   
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
                
        },{
        xtype: 'gridcolumn',
        dataIndex: 'recommendation', // Corrected dataIndex
        tdCls: 'wrap-text',
        text: 'Recommendation',
        width: 250,
        editor: {
            xtype: 'textareafield'
        },
        renderer: function (val) {
            if (val === '') { // Use strict equality check (===) here
                val = 'Recommendation';
            }
            return val;
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'has_query',
        tdCls: 'wrap-text',
        text: 'Has Query?',
        width: 120,
        editor: {
            xtype: 'combo',
            store: 'confirmationstr',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
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
        dataIndex: 'query',
        tdCls: 'wrap-text',
        text: 'Query',
        width: 250,
        editor: {
            xtype: 'textareafield'
        },
        renderer: function (val) {
            if (val === '') { // Use strict equality check (===) here
                val = 'Query';
            }
            return val;
        }
    }]
});
