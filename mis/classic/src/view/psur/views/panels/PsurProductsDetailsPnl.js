/**
 * Created by softclans
 */
Ext.define('Admin.view.productregistration.views.panels.PsurProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'psurProductsDetailsPnl',
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
    listeners: {
        tabchange: 'funcActivePsurProductsOtherInformationTab'
    },
    items: [{
        xtype: 'panel',
        itemId:'product_detailspanel',
        title: 'Product Details',
        autoScroll: true,
        items:[{
            xtype: 'drugsProductsDetailsFrm',
            autoScroll: true,
        }]
    }, {
        xtype: 'drugsProductsDetailsPnl',
        title: 'Product Other Details',
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
        xtype: 'hiddenfield',
        name: 'prodclass_category_id'
    },{
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});