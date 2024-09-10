/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.MedDevicesGvpSchedulingDash', {
    extend: 'Ext.container.Container',
    xtype: 'meddevicesgvpschedulingdash',
    layout: 'responsivecolumn',
    controller: 'gvpapplicationsvctr',
    viewModel: 'gvpapplicationsvm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 5
        },
        {
            xtype: 'inspectionschedulingpnl'
        }
    ]
});
