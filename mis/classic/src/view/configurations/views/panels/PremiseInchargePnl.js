Ext.define('Admin.view.configurations.views.panels.PremiseInchargePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premiseinchargepnl',
    title: 'Pharmacist',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'premiseinchargegrid'
        }
    ]
});
