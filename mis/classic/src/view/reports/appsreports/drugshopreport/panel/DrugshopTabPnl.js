Ext.define('Admin.view.reports.appsreport.drugshopreport.panel.DrugshopTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'drugshoptabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'drugshoptabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'drugshopgraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});