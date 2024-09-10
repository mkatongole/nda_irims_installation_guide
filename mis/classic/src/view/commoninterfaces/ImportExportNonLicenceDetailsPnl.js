 
/**
 * Created by softclans.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.ImportExportNonLicenceDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'importexportnonlicencedetailspnl',
    // layout: {//
    //     type: 'fit'
    // },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    // listeners: {
    //     tabchange: 'funcActiveImportOtherInformationTab'
    // },
     items: [{
        xtype: 'importexportapplicantdetailsfrm',
        autoScroll: true,
        title: 'APPLICANT DETAILS',
        scrollable:true
    },{
        xtype: 'onlineimportexportnonlicencebusinessdetailsfrm',
        title: 'APPLICATION DETAILS',
        scrollable:true
    },{
         xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
   
});


