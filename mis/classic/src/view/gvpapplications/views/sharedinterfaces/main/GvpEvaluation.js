/**
 * Created by Kip on 5/24/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.main.GvpEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'gvpevaluation',
    controller: 'gvpapplicationsvctr',
    viewModel: 'gvpapplicationsvm',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'applicationprocesstoolbar',
           
    }],
    items: [
        {
            xtype: 'gvpevaluationpanel'
        }
    ]
});