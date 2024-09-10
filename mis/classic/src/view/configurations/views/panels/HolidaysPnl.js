Ext.define('Admin.view.configurations.views.panels.HolidaysPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'holidayspnl',
    title: 'Holidays',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'holidaysGrid'
        }
    ]
});
