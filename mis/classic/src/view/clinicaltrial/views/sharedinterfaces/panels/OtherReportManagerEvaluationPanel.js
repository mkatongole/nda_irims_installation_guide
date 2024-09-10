/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.OtherReportManagerEvaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'otherreportmanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'otherreportmanagerevaluationgrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'ctrotherreportappmoredetailswizard'
        }
    ]
});