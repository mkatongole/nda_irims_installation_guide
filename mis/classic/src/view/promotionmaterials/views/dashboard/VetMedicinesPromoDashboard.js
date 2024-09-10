Ext.define('Admin.view.promotionmaterials.views.dashboards.VetMedicinesPromoDashboard', {
	xtype: 'vetmedicinespromodashboard',
    extend: 'Ext.Container',
	layout: 'border',
    items: [
        {
            xtype: 'promotionadvertfoodhomegrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2,

        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ] 
});