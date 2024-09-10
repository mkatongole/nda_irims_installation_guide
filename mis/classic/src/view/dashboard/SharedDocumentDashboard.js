Ext.define('Admin.view.dashboard.SharedDocumentDashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'shareddocumentDashboard',
    margin: 2,
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },
    layout: 'border',
    listeners: {
        hide: 'onHideView'
    }, 
    items: [ {
            xtype: 'tabpanel',
            region: 'center',
            userCls: 'big-100 small-100',
            items: [
                {
                    title: 'Shared Documents (Controlled Documents Dashboard)',
                    xtype: 'controllleddocumentsaccessdashboard',
                    height: Ext.Element.getViewportHeight() - 161
                }
            ]
        }, {
            xtype: 'panel',
            title: 'Notifications & Messages',
            region: 'south',
            height: 250,
            titleCollapse: true,
            collapsed: true,
            collapsible: true
        },
        
    ]
});
