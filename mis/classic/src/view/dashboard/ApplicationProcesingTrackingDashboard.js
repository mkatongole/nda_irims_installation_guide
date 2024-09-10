Ext.define('Admin.view.dashboard.ApplicationProcesingTrackingDashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationprocesingtrackingdashboard',
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
                    title: 'Application Enquiries(Tracking Applications Processing)',
                    xtype: 'application_enquiriesGrid',
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
