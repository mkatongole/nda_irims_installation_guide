
Ext.define('Admin.view.clinicaltrial.views.panels.PreClinicalTrialsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'preclinicaltrialsdetailspnl',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    scrollable: true,
    items: [
        {
            xtype: 'preclinicaltrialdetailsfrm',
            title:'Pre-Submission Details'
        }
      
    ]
});