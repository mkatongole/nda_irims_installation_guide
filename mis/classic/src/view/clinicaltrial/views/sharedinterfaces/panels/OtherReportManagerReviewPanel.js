/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.OtherReportManagerReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'otherreportmanagerreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'otherreportmanagerreviewgrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'ctrotherreportappmoredetailswizard',
        }
    ]
});