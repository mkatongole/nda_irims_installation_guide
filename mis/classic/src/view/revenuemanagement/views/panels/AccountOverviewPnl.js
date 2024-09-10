Ext.define('Admin.view.RevenueManagement.views.panels.AccountOverviewPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'accountOverviewPnl',
    controller: 'revenuemanagementvctr',
    // height: Ext.Element.getViewportHeight() - 118,
    // requires: ['Ext.chart.theme.Muted'],
    // width: '100%',
    // layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 90,
            defaults: {
                labelAlign: 'top',
                margin: '-12 15 0 15',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: [ {
                xtype: 'displayfield',
                name: 'total_receivables',
                fieldLabel: 'Total Receivables',
                value: '0.00 UGX',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '18px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, 
            '->', {
                xtype: 'displayfield',
                name: 'total_payables',
                fieldLabel: 'Total Payables',
                value: '0.00 UGX',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '18px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, 
            '->', {
                xtype: 'displayfield',
                name: 'account_balance',
                fieldLabel: 'Account Balance',
                value: '0.00 UGX',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '18px'
                }  
            }]
        }],
     profiles: {
        classic: {
            width: 650
        },
        neptune: {
            width: 650
        },
        graphite: {
            width: 800
        },
        'classic-material': {
            width: 800
        }
    },
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.interactions.CrossZoom'
    ],

    layout: 'fit',
    // height: 500,
    tbar: [
        '->',{
            xtype: 'datefield',
            name: 'date_from',
            emptyText: 'From Date',
            margin: '0 10 10 0'
        },{
            xtype: 'datefield',
            name: 'date_to',
            emptyText: 'To Date',
            margin: '0 10 10 0'
        },{
            text: 'Filter',
            iconCls: 'x-fa fa-filter',
            ui: 'soft-blue',
            handler: 'onReloadData'
        },
        {
            text: 'Undo Zoom',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-eye',
            handler: 'onZoomUndo'
        },{
            text: 'Refresh',
            iconCls: 'x-fa fa-sync',
            ui: 'soft-purple',
            handler: 'onReloadData'
        },{
            text: 'Download',
            iconCls: 'x-fa fa-download',
            ui: 'soft-purple',
            handler: 'onDownload'
        }
    ],
    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: '100%',
        listeners: {
            beforerender: {
                fn: 'setCompStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        url: 'revenuemanagement/getCustomerReceivedAmount'
                    }
                },
                isLoad: true
            }
        },
        // interactions: {
        //     type: 'panzoom',
        //     zoomOnPanGesture: true
        // },
        interactions: {
            type: 'crosszoom',
            zoomOnPanGesture: false,
            tooltip: {
                renderer: 'onEditTipRender'
            },
        },
        series: [
            {
                type: 'line',
                yField: 'total_amount',
                xField: 'trans_date',
                fill: true,
                smooth: true,
                style: {
                    lineWidth: 4
                },
                marker: {
                    type: 'circle',
                    radius: 10,
                    lineWidth: 2
                },
               renderer: 'onSeriesRender'
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['total_amount'],
                minimum: 0,
                listeners: {
                    rangechange: 'onAxisRangeChange'
                },
                title: {
                    text: 'Total Amount'
                },
            },
            {
                type: 'category',
                position: 'bottom',
                fields: ['trans_date'],
                title: {
                    text: 'Date'
                },
            }
        ]
    }]
});