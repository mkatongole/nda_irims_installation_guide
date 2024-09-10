Ext.define('Admin.view.dashboard.AssignedApplicationsChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'assignedapplicationschart',
    controller: 'dashboardvctr',
    height: 320,
    layout: 'fit',
    title: {
        text: '<span style="font-size: 14px;">Assigned Applications</span>',
         style: {
            backgroundColor: 'transparent',
            padding: '0',
            textAlign: 'center' 
        },
        flex: 1
    },
    tools: [
        {
         type: 'refresh',
         toggleValue: false,
          handler: function () {
            var store = Ext.getStore('assignedApplicationsChartStr');
            store.removeAll();
            store.reload();
         }
        }
    ],
    items: [
        {
        xtype: 'polar',
        id:'pieChart',
        radius: 250,
        interactions: ['rotate', 'itemhighlight'],
        innerPadding:15,
        // listeners: {
        //     beforerender: {
        //         fn: 'func_setStore',
        //             config: {
        //                 pageSize: 1000,
        //                 storeId: 'assignedApplicationsChartStr',
        //                 proxy: {
        //                      url: 'newreports/getGmpSummaryCartesianReport',
        //                 }
        //             },
        //     isLoad:true
        //  }
        store: {
        fields: ['name', 'value'],
        data: [{
            name: 'Due',
            value: 2
         }, {
            name: 'OverDue',
            value: 4
        }, {
            name: 'In Due',
            value: 1
        }

        ]
         },
        legend: {
            docked: 'bottom'
         },
         series: {
            type: 'pie',
            highlight: false,
            label: {
                field: 'name',
                display: 'inside',
                renderer: function (text, sprite, config, rendererData, index) {
                    var record = rendererData.store.getData().items[index];
                    return record.get('name') + ' (' + record.get('value') + ')';
                }
            },
            xField: 'value',
            donut: 30
             }
        }
    ]
});
