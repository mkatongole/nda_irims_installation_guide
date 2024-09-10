/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpInspectionReportsReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gvpinspectionreportsreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gvpinspectionreportsreviewgrid'
        }
    ]
});