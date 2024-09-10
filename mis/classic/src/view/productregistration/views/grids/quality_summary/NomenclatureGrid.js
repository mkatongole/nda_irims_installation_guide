Ext.define('Admin.view.productregistration.views.grids.quality_summary.NomenclatureGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'nomenclaturegrid',
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
        value:'tra_nomenclature_structure'
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
            this.up('grid').fireEvent('refresh', this, 'tra_nomenclature_structure');
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 1000,
                storeId: 'nomenclaturegridstr',
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
        dataIndex: 'international_non_proprietary_name',
        text: 'International Non Proprietary Name',
        width:150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Manufacturer Name',
        width:150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'compendial_name',
        text: 'Compendial Name',
        width:150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'chemical_name',
        text: 'Chemical Name',
        width:150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'laboratory_code',
        text: 'Laboratory Code',
        width:150,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'other_non_proprietary_name',
        text: 'Other Non Proprietary Name',
        width:150,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'registry_no',
        text: 'Registry No',
        width:150,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'structure',
        text: 'Structure',
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
