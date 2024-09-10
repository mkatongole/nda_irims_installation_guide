Ext.define('Admin.view.productregistration.views.grids.quality_summary.SummaryInformationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'summaryinformationgrid',
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
        value:'tra_product_summary_information'
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
            this.up('grid').fireEvent('refresh', this, 'tra_product_summary_information');
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 1000,
                storeId: 'summaryinformationgridstr',
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
        dataIndex: 'non_proprietary_name',
        text: 'Non Proprietary Name(FPP)',
        width: 150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Proprietary Name(FPP)',
        width: 150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'international_non_proprietary_name',
        text: 'International Non Proprietary Name(API)',
        width: 150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name_address',
        text: 'Applicant Name Address',
        width: 150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dosage Form',
        width: 150,
        tdCls: 'wrap-text'
        },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Reference No',
        width: 150,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'strength',
        text: 'Strength',
        width: 150,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'route_of_admnistration',
        text: 'Route Of Admnistration',
        width: 150,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'indication',
        text: 'Proposed Indication',
        width: 150,
        tdCls: 'wrap-text'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'contact_information',
        text: 'Contact Information',
        width: 150,
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
