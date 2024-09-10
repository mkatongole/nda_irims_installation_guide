Ext.define('Admin.view.pv.views.panels.PvOtherDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'pvOtherDetailsPnl',
    
    controller: 'pvvctr',
    autoScroll: true,
    defaults:{
        margin: 3
    },
    itemId: 'pvOtherDetailsPnl', 
    viewModel: {
        type: 'pvvm'
    },
    items: [{
        xtype: 'panel',
        scrollable: true,
        autoScroll: true,
        itemId:'detailspanel',
        title: 'Patient',
        items:[{
            xtype: 'pvpatientFrm',
            scrollable: true,
        }]
    },{
        xtype: 'pvHistoryDetailsPnl',
        title: 'Medical and past drug history',
    },{
        xtype: 'pvreactionGrid',
        title: 'Reaction',
    },{
        xtype: 'pvSuspectedDrugGrid',
        title: 'Drug',
    },{
        xtype: 'pvtestGrid',
        title: 'Tests and procedures',
    },{
        xtype: 'pvSuspectedDrugGrid',
        is_other_drugs_used: 1,
        hidden:true,
        title: 'Other Medicine/Vaccine/Device Used',
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