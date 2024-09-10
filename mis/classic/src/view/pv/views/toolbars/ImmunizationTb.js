Ext.define('Admin.view.pv.views.toolbars.ImmunizationTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'immunizationtb',
    ui: 'footer',
    defaults: {
        ui: 'soft-blue',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            sec_dashboard:'pvdashPnl',
            name: 'pvHomeBtn'
        },
        {
            text: 'New Report',
            iconCls: 'x-fa fa-plus',
            handler: 'showNewPv',
            app_type: 273
        }
    ]
});