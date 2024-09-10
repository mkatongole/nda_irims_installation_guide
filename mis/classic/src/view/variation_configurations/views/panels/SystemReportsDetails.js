
Ext.define('Admin.view.variation_configurations.views.panels.SystemReportsDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'systemreportsdetails',
    title: 'Application Reports',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'systemreportsdetailsgrid'
        }
    ]
});
