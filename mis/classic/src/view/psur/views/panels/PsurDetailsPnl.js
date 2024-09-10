Ext.define('Admin.view.mir.views.panels.PsurDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'psurDetailsPnl',
    // layout: {//
    //     type: 'fit'
    // },
    controller: 'psurVctr',
    autoScroll: true,
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'psurVm'
    },

    items: [{
        xtype: 'productapplicantdetailsfrm',
        title: 'Applicant Details'
    },{
        xtype: 'panel',
        scrollable: true,
        autoScroll: true,
        itemId:'detailspanel',
        title: 'Report Details',
        items:[{
            xtype: 'psurdetailsFrm',
            scrollable: true,
        }]
    },
    {
        xtype: 'psurproductgrid',
        title: 'Product Details',
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});