
Ext.define('Admin.view.persponnelmanagement.views.dashboards.PvPersonnel', {
    extend: 'Ext.container.Container',
    xtype: 'pvpersonnel',
    itemId:'pvpersonnel',
    layout: 'responsivecolumn',
    controller: 'personelmanagementvctr',
    viewModel: 'personnelmanagementvm',
    items: [
        {
            xtype: 'pvpersonnelpnl'
        }
    ]
});
