/**
 * Created by Kip on 11/12/2018.
 */
Ext.define(
  "Admin.view.importexportpermits.views.commoninterfaces.OnlineImportExportDetailsPnl",
  {
    extend: "Ext.tab.Panel",
    xtype: "onlineimportexportdetailspnl",
    layout: {
      //
      type: "card",
    },
    defaults: {
      margin: 3,
    },
    viewModel: {
      type: "importexportpermitsvm",
    },
    items: [
      {
        xtype: "onlineimportexportdetailsfrm",
        autoScroll: true,
        title: "Application Information",
      },
      {
        xtype: "onlineimportexportpermitsproductsgrid",
        title: "Products Details",
      },
      {
        xtype: "senderreceiverdetailsfrm",
        title: "Sender/Receiver Details",
      },
      {
        xtype: "importexportpremisesfrm",
        title: "Business Details",
      },
      {
        xtype: "hiddenfield",
        name: "_token",
        value: token,
      },
    ],
  }
);
