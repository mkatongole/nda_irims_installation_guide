/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.grids.DrugShopInspectionHistoryGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'drugshopinspectionhistorygrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
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
    tbar: [
        {
            xtype: 'tbspacer',
            width: 20
        },
        
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },{
            xtype: 'hiddenfield',
            name: 'report_type_id'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                application_id = grid.down('hiddenfield[name=application_id]').getValue();
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
                report_type_id = grid.down('hiddenfield[name=report_type_id]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code,
                report_type_id:report_type_id,
            };
        }
    }],
    /* features: [{
         ftype: 'searching',
         minChars: 2,
         mode: 'local'
     }],*/
    plugins: [{
        ptype: 'filterfield'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: true,
                proxy: {
                    url: 'premiseregistration/getPremiseInspectionHistory',
					reader: {
                        type: 'json',
                        totalProperty: 'totalCount',
                        rootProperty: 'results'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        text: 'Inspection Type',
        flex: 1,
    },
      {
        xtype: 'datecolumn',
        dataIndex: 'actual_start_date',
        format: 'Y-m-d',
        text: 'Inspection Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'assaigned_by',
        hidden:true,
        text: 'Assaigned By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'report_by',
        text: 'Inspection By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'recommendation',
        text: 'Inspector Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'report_date',
        text: 'Report Date',
        flex: 1
       
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Preview Details',
                        childXtype: 'drugshopinspectiondetailstabpnl',
                        winTitle: 'Inspection History',
                        winWidth: '70%',
                        isReadOnly:1,
                        name: 'preview_report_btn',
                        stores: '[]',
                        report_type_id:1,
                        handler: 'showInspectionHistoryMoreDetails'
                    }
                ]
            }
        }
    }]
});
