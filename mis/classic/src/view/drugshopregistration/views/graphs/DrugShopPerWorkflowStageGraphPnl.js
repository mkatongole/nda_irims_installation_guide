
Ext.define('Admin.view.drugshopregistration.views.graphs.DrugShopPerWorkflowStageGraphPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugshopperworkflowstagegraphpnl',
   // layout: 'fit',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.interactions.CrossZoom',
        'Admin.store.premiseRegistration.PremiseRegGridAbstractStore'
    ],
    listeners: {
        beforerender: function () {
            var store = Ext.create('Admin.store.premiseRegistration.PremiseRegGridAbstractStore', {}),
            storeProxy = store.getProxy();
            storeProxy.setExtraParams({
                primary_table: 'wf_workflows',
                group_by_fld: 'workflow_stage_id'
            });
            storeProxy.setUrl('premiseregistration/getDashboardGraphGridDugShopCount');
            this.down('cartesian').setStore(store);
            store.removeAll();
            store.load();
        },
        afterrender: 'filterCaseGraphDashboardData'
    },
    items: [{
        xtype: 'cartesian',
        plugins: {
            ptype: 'chartitemevents',
            moveEvents: true
        },
        theme: 'Muted',
        insetPadding: '40 20 10 20',
        width: '100%',
        height: 500,
        interactions: ['itemhighlight'],
        listeners: {
            itemclick: function (item, obj) {
                var record = obj.record,
                    workflow_stage_id = record.get('workflow_stage_id'),
                    workflow_stage = record.get('group_name'),
                    childObject = Ext.widget('caseresultslistgrid');
                childObject.down('combo[name=workflow_stage_id]').setReadOnly(true);
                childObject.down('combo[name=workflow_stage_id]').setValue(workflow_stage_id);
                funcShowCustomizableWindow(workflow_stage + ' Cases', '90%', childObject, 'customizablewindow');
            }
        },
        series: {
            type: 'bar3d',
            stacked: false,
            xField: 'group_name',
            yField: 'no_of_cases',
            title: 'Workflow Stages',
            style: {
                maxBarWidth: 80
            },
            label: {
                field: 'no_of_cases',
                display: 'insideEnd',
                onSeriesLabelRender: function (value) {
                    return Ext.util.Format.number(value, '0,000');
                }
            },
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    var formatString = '0,000 (Cases)',
                        sector = record.get('group_name'),
                        value = Ext.util.Format.number(record.get(item.field), formatString);
                    tooltip.setHtml(sector + ': ' + value);
                },
            }
        },
        legend: {
            docked: 'bottom'
        },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            grid: {
                odd: {
                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                },
                even: {
                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                }
            },
            title: 'Number of Drug Shop Applications',
            renderer: function (axis, label, layoutContext) {
                return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
            },
            listeners: {
                rangechange: function (axis, range) {
                    if (!range) {
                        return;
                    }
                    // expand the range slightly to make sure markers aren't clipped
                    if (range[1] > 15000000) {
                        range[1] = 18000000;
                    }
                },
            }
        }, {
            type: 'category3d',
            position: 'bottom',
            grid: true
        }],
        sprites: {
            type: 'text',
            fontSize: 12,
            width: 100,
            height: 30,
            x: 120,
            y: 20
        }
    }]
});
