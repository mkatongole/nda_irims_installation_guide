/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpInspectionReportsReview', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpInspectionReportsReview',
    xtype: 'newgvpinspectionreportsreview',
    items: [
        {
            xtype: 'newgvpinspectionreportsreviewpanel'
        }
    ]
});