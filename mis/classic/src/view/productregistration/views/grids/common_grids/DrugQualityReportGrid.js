
Ext.define('Admin.view.productregistration.views.grids.common_grids.DrugQualityReportGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'drugqualityreportgrid',
    controller: 'productregistrationvctr', 
    height: Ext.Element.getViewportHeight() - 118,
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'qualityevaluationgridstr',
                remoteFilter: true,
                enablePaging: true,
                proxy: {
                    url: 'productregistration/getQualitySummaryReportReport'
                }
            },
            isLoad: true
        },
        itemdblclick: 'addQualitySummaryReport'
    },

    // plugins: [{
    //         ptype: 'filterfield'
    //     }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
         beforeLoad: function() {
                    var store=this.getStore();
                    var grid=this.up('grid'),
                    wizard = grid.up('panel'),
                    mainTabPnl = grid.up('#contentPanel'),
                    containerPnl = mainTabPnl.getActiveTab(),
                    application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
                       
                    store.getProxy().extraParams = {
                        application_code: application_code
                        
                        }
                    
                            
        }
    }],
    // tbar: [{
    //     text: 'Double Click to select Section'
    // }],
    tbar: [
        {
            xtype: 'displayfield',
            value: 'Double Click to add response!!',
            fieldStyle: {
                'color': 'green'
            }
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        sortable: false,
       // text: 'Section',
        width:40,
       // flex: 1
        // filter: {
        //         xtype: 'textfield',
        //     }
     },{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        sortable: false,
       // text: 'Section',
        //width:150,
        flex: 1
        // filter: {
        //         xtype: 'textfield',
        //     }
    }
  ]
});

