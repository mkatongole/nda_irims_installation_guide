/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.DrugsGvpSchedulingDash', {
    extend: 'Ext.container.Container',
    xtype: 'drugsgvpschedulingdash',
    layout: 'responsivecolumn',
    controller: 'gvpapplicationsvctr',
    viewModel: 'gvpapplicationsvm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'inspectionschedulingpnl'
        }
    ]
});
