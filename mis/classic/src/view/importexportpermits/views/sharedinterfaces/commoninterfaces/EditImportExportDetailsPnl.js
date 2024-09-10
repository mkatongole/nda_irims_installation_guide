
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.EditImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'editimportexportdetailspnl',
    // layout: {//
    //     type: 'fit'
    // },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'editimportexportdetailsfrm',
        autoScroll: true,
        title: 'Import/Export Permit Information'
    }, 
   
    {
        xtype: 'senderreceiverdetailsfrm',
        hidden:true,
        title: 'Sender/Receiver Details',
    }, {
        xtype: 'importexportpremisesfrm',
        
        title: 'Business Details',
        autoScroll: true,
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


