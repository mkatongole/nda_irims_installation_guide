Ext.define('Admin.view.pv.views.panels.PvHistoryDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'pvHistoryDetailsPnl',
    
    controller: 'pvvctr',
    autoScroll: true,
    defaults:{
        margin: 3
    },
    itemId: 'pvHistoryDetailsPnl', 
    viewModel: {
        type: 'pvvm'
    },
    items: [{
        xtype: 'pvmedicalhistoryGrid',
        title: 'Medical history',
    },{
        xtype: 'pvdrughistoryGrid',
        title: 'Drug history',
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