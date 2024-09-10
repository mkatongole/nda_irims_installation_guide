
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromotionsOtherInformationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'promotionsotherinformationpnl',
    layout: {
        //type: 'fit'
    },
    defaults:{
        margin: 3
    },
    height: '100%',
    autoScroll: true,
    items: [{
        xtype: 'promotionmaterialdetailsgrid',
        title: 'Promotional Material'
    },{
        xtype: 'promotiommaterialproductgrid',
        title: 'Product Particulars'
    }]
});