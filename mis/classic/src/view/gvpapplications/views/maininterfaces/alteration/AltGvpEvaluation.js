/**
 * Created by Kip on 5/24/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.alteration.AltGvpEvaluation', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpEvaluation',
    xtype: 'altgvpevaluation',
    items: [
        {
            xtype: 'altgvpevaluationpanel'
        }
    ]
});
