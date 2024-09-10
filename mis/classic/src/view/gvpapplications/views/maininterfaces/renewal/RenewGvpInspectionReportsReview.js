/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpInspectionReportsReview', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpInspectionReportsReview',
    xtype: 'renewgvpinspectionreportsreview',
    items: [
        {
            xtype: 'renewgvpinspectionreportsreviewpanel'
        }
    ]
});