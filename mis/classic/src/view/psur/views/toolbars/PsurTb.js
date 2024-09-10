Ext.define('Admin.view.productregistration.views.toolbars.PsurTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'psurTb',
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
    items: [{
        xtype: 'hiddenfield',
        name: 'section_id',
        //value: 2
        },
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            sec_dashboard:'psurDashPnl',
            name: 'psurHomeBtn'
        },
        {
            text: 'New Report(PSUR/PBRER)',
            iconCls: 'x-fa fa-plus',
            handler: 'showNewPsur',
            app_type: 116
        },
        {
            text: 'New Report(RMP/REMS)',
            iconCls: 'x-fa fa-plus',
            handler: 'showNewPsur',
            app_type: 128
        },
        {
            text: 'New Report(LINE LISTING)',
            iconCls: 'x-fa fa-plus',
            handler: 'showNewPsur',
            app_type: 129
        }
    ]
});