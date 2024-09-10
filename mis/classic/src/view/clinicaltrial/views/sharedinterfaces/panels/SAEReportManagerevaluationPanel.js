/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.SAEReportManagerevaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'saereportmanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'saereportmanagerevaluationgrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'ctrsaereportappmoredetailswizard'
        }
    ]
});