
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.DrugQualityReportPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugqualityreportpnl',
    //title: 'Incharge Personnel',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'drugqualityreportrnl',
    items: [
        {
            xtype: 'drugqualityreportgrid'
        }
    ]
});

