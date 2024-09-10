Ext.define('Admin.view.configurations.views.panels.DisposalBoardsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'disposalboardspnl',
    title: 'Pharmacist',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'disposalboardgrid'
        }
    ]
});
