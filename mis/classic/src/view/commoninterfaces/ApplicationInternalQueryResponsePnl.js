/**
 * Created by Softclans on 2/11/2019.
 */
Ext.define('Admin.view.commoninterfaces.ApplicationIternalQueryResponsePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationinternalqueryresponsepnl',
    controller: 'commoninterfacesVctr',
	layout:'fit',
	autoScroll: true,
	items:[{
		xtype:'tabpanel',
		layout:'fit',
		items:[{
			xtype: 'applicationqueryresponsefrm',
			region:'center',
			title:'Query Response'
		}]
	}]
});