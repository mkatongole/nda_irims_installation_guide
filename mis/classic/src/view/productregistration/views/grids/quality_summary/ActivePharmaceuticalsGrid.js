Ext.define('Admin.view.productregistration.views.grids.quality_summary.ActivePharmaceuticalsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'activepharmaceuticalsgrid',
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
        value:'tra_active__pharmaceutical'
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
            this.up('grid').fireEvent('refresh', this, 'tra_active__pharmaceutical');
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 1000,
                storeId: 'activephamaceuticalgridstr',
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
        dataIndex: 'ingredient_name',
        text: 'Active Ingredient',
        flex:1,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Manufacturer Name',
        flex:1,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'cert_suitability',
        text: 'Cert Suitability',
        flex:1,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'EAC_file',
        text: 'EAC File(APIMF)',
        flex:1,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'full_details_PD',
        text: 'Full Details PD',
        flex:1,
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
