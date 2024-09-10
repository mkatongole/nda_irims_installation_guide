/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialsOtherRptDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialsotherrptdetailspnl',
    autoScroll: true,
    items: [
        {
            xtype: 'clinicaltrialsotherrptdetailsfrm'
        }
    ]
});