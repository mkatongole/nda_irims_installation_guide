
Ext.define('Admin.view.productregistration.views.grids.common_grids.QualitySummaryReportEvaluationGrid', {
    extend: 'Admin.view.productregistration.views.grids.common_grids.QualitySummaryReportAbstractGrid',
    controller: 'productregistrationvctr',
    xtype: 'qualitysummaryReportevaluationGrid',
    cls: 'dashboard-todo-list',
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
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },
    {
        xtype:'hiddenfield',
        name: 'application_code'

    },'->'],
    plugins: [
        {
            ptype: 'gridexporter'
    }],
    export_title: 'Quality Summary Report',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store=this.getStore();
            var grid=this.up('grid'),
            wizard = grid.up('panel'),
            mainTabPnl = grid.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
            grid.down('hiddenfield[name=application_code]').setValue(application_code);
                       
            store.getProxy().extraParams = {
                    application_code: application_code
                        
            };
        }
    }],

    selType: 'cellmodel',
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'cellediting',
        clicksToEdit: 1,
        editing: true
    },{
        ptype: 'filterfield'
    }],
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        hideGroupedHeader: true,
        enableGroupingMenu: false
    },{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'qualityevaluationgridstr',
                groupField:'Section',
                proxy: {
                   url: 'productregistration/getQualitySectionPerSection'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=update_report]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [z];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
               
            }
        }
    },
    columns: [
         ]
});

