/**
 * Created by Softclans on 11/12/2018.
 */
Ext.define(
  "Admin.view.importexportpermits.views.commoninterfaces.ControlledDrugsLicenseDetailsPnl",
  {
    extend: "Ext.tab.Panel",
    xtype: "controlleddrugslicensedetailspnl",

    layout: {
      //
      //: "card",
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
                xtype: 'controldrugslicensedetailsfrm',
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
            xtype: 'controldrugslicensesproductsgrid',
            title:'Control Drugs Application Products Details'
        }]
});