/**
 * Created by Kip on 6/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.GvpComparePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gvpcomparepanel',
    controller: 'gvpapplicationsvctr',
    viewModel: 'gvpapplicationsvm',
    height: 600,
    layout: {
        type: 'border'
    },
    defaults:{
        collapsible: true,
        split: true,
        titleCollapse: true
    },
    dockedItems:{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        items:[
            '->',
            {
                text: 'Accept Changes Made(If Any)',
                iconCls: 'x-fa fa-check-square-o',
                ui: 'soft-purple',
                handler: 'acceptPortalAmendedDetails'
            }
        ]
    },
    items:[
        {
            xtype: 'gvpmiscomparepreviewpnl',
            flex: 0.5,
            title: 'Initial/MIS Details',
            region: 'center'
        },
        {
            xtype: 'gvpportalcomparepreviewpnl',
            flex: 0.5,
            title: 'Amended/PORTAL Details',
            region: 'east'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        }
    ]
});