
Ext.define('Admin.view.persponnelmanagement.views.dashboards.PremisePharmacistsDsh', {
    extend: 'Ext.container.Container',
    xtype: 'premisepharmacistsdsh',
    itemId:'premisepharmacists',
    layout: 'responsivecolumn',
    controller: 'personelmanagementvctr',
    viewModel: 'personnelmanagementvm',
    items: [
        {
            xtype: 'premisepharmacistpanel'
        }
    ]
});
