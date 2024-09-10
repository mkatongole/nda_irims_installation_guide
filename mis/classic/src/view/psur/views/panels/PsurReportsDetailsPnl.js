/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.psur.views.panels.PsurReportsDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'psurreportsdetailspnl',
    layout: 'fit',
   // autoScroll: true,
    //scrollable: true,
    items: [
        {
            xtype: 'psurDetailsPnl'
        }
    ]
});