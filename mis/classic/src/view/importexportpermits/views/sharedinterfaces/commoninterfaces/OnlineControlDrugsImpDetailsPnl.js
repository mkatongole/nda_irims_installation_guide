
/**
 * Created by Softclans on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.OnlineControlDrugsImpDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinecontroldrugsimpdetailspnl',
    layout: {
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
            xtype: "controldrugslicensedetailsfrm",
            autoScroll: true,
            title: "Application Information",
          },
          {
            xtype: "onlinecontrolledpermitsproductsgrid",
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
