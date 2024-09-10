
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.SAEReportManagerReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'saereportmanagerreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'saereportmanagerreviewgrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'ctrsaereportappmoredetailswizard',
        }
    ]
});