/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define(
  "Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportReceivingPermitswizard",
  {
    extend: "Ext.panel.Panel",
    alias: "widget.importexportreceivingpermitswizard",
    padding: "2 0 2 0",
    requires: ["Ext.layout.container.*", "Ext.toolbar.Fill"],
    reference: "wizardpnl",
    layout: "card",
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: "wizard three shadow",
    colorScheme: "soft-green",
    dockedItems: [
      {
        xtype: "toolbar",
        dock: "top",
        ui: "footer",
        height: 55,
        defaults: {
          labelAlign: "top",
          margin: "-12 5 0 5",
          labelStyle: "color:#595959;font-size:13px",
        },
        items: [
          "->",
          {
            xtype: "displayfield",
            name: "process_name",
            fieldLabel: "Process",
            fieldStyle: {
              color: "green",
              "font-weight": "bold",
              "font-size": "12px",
              "margin-top": "-2px",
            },
          },
          {
            xtype: "tbseparator",
            width: 20,
          },
          {
            xtype: "displayfield",
            name: "workflow_stage",
            fieldLabel: "Workflow Stage",
            fieldStyle: {
              color: "green",
              "font-weight": "bold",
              "font-size": "12px",
              "margin-top": "-2px",
            },
          },
          {
            xtype: "tbseparator",
            width: 20,
          },
          {
            xtype: "displayfield",
            name: "application_status",
            fieldLabel: "App Status",
            fieldStyle: {
              color: "green",
              "font-weight": "bold",
              "font-size": "12px",
              "margin-top": "-2px",
            },
          },
          {
            xtype: "tbseparator",
            width: 20,
          },
          {
            xtype: "displayfield",
            name: "tracking_no",
            fieldLabel: "Tracking No",
            fieldStyle: {
              color: "green",
              "font-weight": "bold",
              "font-size": "12px",
              "margin-top": "-2px",
            },
          },
          {
            xtype: "displayfield",
            name: "reference_no",
            fieldLabel: "Reference No",
            fieldStyle: {
              color: "green",
              "font-weight": "bold",
              "font-size": "12px",
              "margin-top": "-2px",
            },
          },
          {
            xtype: "hiddenfield",
            name: "process_id",
          },
          {
            xtype: "hiddenfield",
            name: "workflow_stage_id",
          },
          {
            xtype: "hiddenfield",
            name: "active_application_id",
          },
          {
            xtype: "hiddenfield",
            name: "module_id",
          },
          {
            xtype: "hiddenfield",
            name: "sub_module_id",
          },
          {
            xtype: "hiddenfield",
            name: "section_id",
          },
          {
            xtype: "hiddenfield",
            name: "active_application_code",
          },
          {
            xtype: "hiddenfield",
            name: "application_status_id",
          },
        ],
      },
    ],
    items: [
      {
        xtype: "importexportapplicantdetailsfrm",
        title: "APPLICANT DETAILS",
      },
      {
        xtype: "importexportdetailspnl", 
      },
      // {
      //   xtype: "importexportpermitsproductsgrid",
      //   title: "Import/Export Permit Products Details",
      // },
      {
        xtype: "importexportdocuploadsgrid",
        title: "Documents Submission",
      },
      {
        xtype: "productscreeninggrid",
        title: "Import/Export Application Prechecking",
      },

      {
        xtype: "appinvoicepaymentspanel",
        //title: "Invoicing",
      },
      {
        xtype: "hiddenfield",
        name: "active_application_id",
      },
    ],
    initComponent: function () {
      var me = this;
      this.tbar = {
        reference: "progress",
        itemId: "progress_tbar",
        defaultButtonUI: "wizard-" + this.colorScheme,
        cls: "wizardprogressbar",
        style: {
          "background-color": "#90c258",
        },
        bodyStyle: {
          "background-color": "#90c258",
        },
        layout: {
          pack: "center",
        },
        items: [
          {
            step: 0,
            iconCls: "fa fa-user",
            enableToggle: true,
            pressed: true,
            text: "Applicant",
            iconAlign: "top",
            action: "quickNav",
            max_step: 5,
            wizard: "importexportreceivingpermitswizard",
            handler: "quickNavigation",
          },
          {
            step: 1,
            iconCls: "fa fa-university",
            enableToggle: true,
            iconAlign: "top",
            text: " Application Details",
            max_step: 4,
            action: "quickNav",
            wizard: "importexportreceivingpermitswizard",
            handler: "quickNavigation",
          },
          // {
          //   step: 2,
          //   iconCls: "fa fa-university",
          //   enableToggle: true,
          //   iconAlign: "top",
          //   text: "Permit Products",
          //   max_step: 5,
          //   action: "quickNav",
          //   wizard: "importexportreceivingpermitswizard",
          //   handler: "quickNavigation",
          // },
          {
            step: 2,
            iconCls: "fa fa-upload",
            enableToggle: true,
            max_step: 4,
            text: "Documents Submission",
            action: "quickNav",
            iconAlign: "top",
            wizard: "importexportreceivingpermitswizard",
            handler: "quickNavigation",
          },
          {
            step: 3,
            iconCls: 'fa fa-check-square',
            enableToggle: true,
            max_step: 4,
            text: "Screening Checklist",
            action: "quickNav",
            iconAlign: "top",
            wizard: "importexportreceivingpermitswizard",
            handler: "quickNavigation",
          },

          {
            step: 4,
            iconCls: 'fa fa-money-bill-wave',
            enableToggle: true,
            max_step: 4,
            text: "Invoicing",
            action: "quickNav",
            iconAlign: "top",
            wizard: "importexportreceivingpermitswizard",
            handler: "quickNavigation",
          },
        ],
      };
      this.bbar = {
        reference: "navigation-toolbar",
        ui: "footer",
        items: [
          {
            text: "Back to List",
            ui: "soft-purple",
            iconCls: "fa fa-bars",
            name: "back_to_list",
            hidden: true,
          },
          "->",
          {
            text: "Previous",
            ui: "soft-purple",
            iconCls: "fa fa-arrow-left",
            bind: {
              disabled: "{atBeginning}",
            },
            max_step: 4,
            wizard: "importexportreceivingpermitswizard",
            handler: "onPrevCardClick",
          },
          {
            text: "Save/Update Application Details",
            ui: "soft-purple",
            iconCls: "fa fa-save",
            name: "save_btn",
            form_panel: "#importexportdetailsfrm",
            action_url: "saveImportPermittReceivingBaseDetails",
            wizard: "importexportreceivingpermitswizard",
            handler: "saveImporExportPermitReceivingBaseDetails",
          },
          {
            text: "Submit Application",
            ui: "soft-purple",
            iconCls: "fa fa-check",
            name: "process_submission_btn",
            storeID: "drugproductregistrationstr",
            table_name: "tra_importexport_applications",
            winWidth: "50%",
            handler: "showReceivingApplicationSubmissionWin",
          },
          {
            text: "Next",
            ui: "soft-purple",
            reference: "nextbutton",
            iconCls: "fa fa-arrow-right",
            iconAlign: "right",
            max_step: 4,
            bind: {
              disabled: "{atEnd}",
            },
            wizard: "importexportreceivingpermitswizard",
            handler: "onNextCardClick",
          },
        ],
      };
      me.callParent(arguments);
    },
  }
);
