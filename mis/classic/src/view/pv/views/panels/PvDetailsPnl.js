Ext.define('Admin.view.pv.views.panels.PvDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'pvDetailsPnl',
    
    controller: 'pvvctr',
    autoScroll: true,
    defaults:{
        margin: 3
    },
    itemId: 'pvDetailsPnlId', 
    viewModel: {
        type: 'pvvm'
    },
    listeners: {
        tabchange: 'funcActiveOtherPvInformationTab'
    },
    items: [{
        xtype: 'panel',
        region: 'center',
        layout: 'fit',
        title: 'Report information',
        itemId:'detailspanel',
        items:[{
            xtype: 'pvDetailsFrm',
            scrollable:true
        }]
    },{
        xtype: 'pvpersonnelGrid',
        title: 'Initial Reporter Information',
    },{
        xtype: 'pvsenderGrid',
        hidden:true,
        title: 'Sender Information',
    },{
        xtype: 'pvstudyinformationtGrid',
        title: 'Study Information',
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
        xtype: 'hiddenfield',
        name: 'pv_id',
        value: ''
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});