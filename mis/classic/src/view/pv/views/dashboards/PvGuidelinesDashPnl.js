Ext.define('Admin.view.pv.views.dashboards.PvGuidelinesDashPnl', {
    extend: 'Ext.Container',
    xtype: 'pvguidelinesdashPnl',
    layout: 'border',
    items: [
        {
            xtype: 'pvguidelinesdocumentuploadsgrid',
            region: 'center',
            title: 'Guidelines',
            margin: 2
        }
    ]
});