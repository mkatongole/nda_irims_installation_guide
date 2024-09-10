
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.DeclaredImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'declaredimportexportdetailspnl',
    // layout: {//
    //     type: 'fit'
    // },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'declaredimportexportdetailsfrm',
        autoScroll: true,
        title: 'Application Details'
    }, {
        xtype: 'declaredonlineimportexportpermitsproductsgrid',
        title: 'Products Details',
    },  {
        xtype: 'senderreceiverdetailsfrm',
        hidden:true,
        title: 'Sender/Receiver Details',
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


