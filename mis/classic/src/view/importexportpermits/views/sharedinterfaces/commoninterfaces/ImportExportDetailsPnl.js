
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.ImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'importexportdetailspnl',
    layout: {//
        //type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    listeners: {
        tabchange: 'funcActiveImportOtherInformationTab'
    },
    items: [{
            xtype: 'panel',
            autoScroll: true, 
            title: 'Application Details',
            items:[{
                xtype: 'importexportdetailsfrm',
                title: 'Application Details'
               },{
                xtype: 'senderreceiverdetailsfrm',
                //hidden:true,
                title: 'Sender/Receiver Details',
               },{
                xtype: 'importexportpremisesfrm',
                title: 'BUSINESS DETAILS',
            }]
          },{
            xtype: 'importexportpermitsproductsgrid',
            title:'Products Details'
        }]
});


