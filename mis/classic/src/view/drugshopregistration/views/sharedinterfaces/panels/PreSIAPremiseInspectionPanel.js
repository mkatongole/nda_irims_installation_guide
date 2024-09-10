/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.PreSIAPremiseInspectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'prepresiapremiseinspectionpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    
    items: [
        {

           
            region: 'center',
            layout: 'fit',
            xtype:'tabpanel',
            listeners: {
                tabchange: function(tabPanel, newCard, oldCard) {
                  const selectedIndex = tabPanel.items.indexOf(newCard);
                  if (selectedIndex ===1) {
                    var panel=tabPanel.up('panel');
                    panel.down('button[name=save_screening_btn]').setHidden(false);

                  }
                  if (selectedIndex ===2) {
                    var panel=tabPanel.up('panel');
                    panel.down('button[name=save_screening_btn]').setHidden(true);

                  }
                  if (selectedIndex ===0) {
                    var panel=tabPanel.up('panel');
                    panel.down('button[name=save_screening_btn]').setHidden(true);

                  }
                }
              
            },
            items: [{
                     title: 'Application Details & Documents Uploads',
                    xtype:'presiapremiseappmoredetailswizard'
                },{
                   xtype: 'drugshopinspectiongrid',
                   title: 'Inspection Checklist'
               },{
                    xtype: 'drugshopinspectionfrm',
                    itemId: 'drugshopinspectionfrm',
                    title:'Inspection Report'
               },{
                    xtype: 'premregappdocuploadsgenericgrid',   //applicationdocuploadsgrid
                    title: 'Inspection document(s) Upload',
                    listeners:{
                        beforerender:function(pnl){
                            var panel = pnl.up('panel'),
                            mainPnl=panel.up('panel'),
                            premise_id = mainPnl.down('preinspectionsiapremisedetailsfrm').down('hiddenfield[name=premise_id]').getValue();
                            pnl.down('hiddenfield[name=reference_record_id]').setValue(premise_id);
                            pnl.down('hiddenfield[name=document_type_id]').setValue(11);
                            pnl.down('hiddenfield[name=table_name]').setValue('tc_incepttionconcept_uploaddocuments');
                            pnl.down('hiddenfield[name=reference_table_name]').setValue('tra_premise_inspection_details');

                        }
                    }
            }]
        },

        
        {
            xtype: 'toolbar',
            ui: 'footer',
            region: 'south',
            height: 45,
            split: false,
            items: [
                {
                    xtype: 'transitionsbtn',
                },
                //  {
                //     text: 'Return Back',
                //     ui: 'soft-purple',
                //     iconCls: 'fa fa-check',
                //     //name: 'returnback_submission_btn',
                //     handler: 'showAddApplicationInternalQueries',
                    
                // },
                  {
                    text: 'Return Back',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'returnback_submission_btn',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%',
                    
                },
                {
                    xtype: 'button',
                    text: "Raise/View CAPA/ Query & Responses",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-red',
                    handler: 'showAddApplicationUnstrcuturedQueries',
                },
            
                 {
                    text: 'Preview License/Inspection Report',
                    ui: 'soft-green',
                    name:'btn_print_inspection_report',
                    iconCls: 'fa fa-bars',
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                                text: 'Preview License',
                                iconCls: 'x-fa fa-print',
                                ui: 'soft-green',
                                peview:1,
                                handler: 'doPreviewDrugShopLicense'                            },
                            {
                                text: 'Print Inspection Report',
                                iconCls: 'x-fa fa-print',
                                ui: 'soft-green',
                                handler: 'doPrintInspectionReport'
                            },
                        ]
                    }
                },


                // {
                //     text: 'View IOD Report',
                //     ui: 'soft-green',
                //     iconCls: 'fa fa-eye',
                //     childXtype: 'premiseinspectiondetailstabpnl',
                //     winTitle: 'IOD Report',
                //     winWidth: '60%',
                //     name: 'preview_report_btn',
                //     stores: '[]',
                //     report_type_id:1,
                //     handler: 'showInspectionReportDetails',
                //     hidden: true
                // },
                // {
                //     text: 'View RID Recommendation',
                //     ui: 'soft-red',
                //     iconCls: 'fa fa-eye',
                //     childXtype: 'premiseinspectiondetailstabpnl',
                //     winTitle: 'RID Recommendation',
                //     winWidth: '60%',
                //     name: 'regional_inspector_report_btn',
                //     stores: '[]',
                //     report_type_id:2,
                //     handler: 'showInspectionReportDetails',
                //     hidden: true
                // },

                  {
                    text: 'Inspection History',
                    ui: 'soft-purple',
                    //hidden:true,
                    report_type_id:1,
                    handler: 'showInspectionHistoryDetails',
                    iconCls: 'x-fa fa-bars',
                    childXtype: 'drugshopinspectionhistorygrid',
                    winTitle: 'Inspection Details',
                    winWidth: '80%',
                    isReadOnly: 1,
                    stores: '[]'
                },
               
                '->',

                  {
                    text: 'Save Inspection Checklist',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    hidden: true
                },
                // {
                //     text: 'Submit Application',
                //     ui: 'soft-purple',
                //     iconCls: 'fa fa-check',
                //     isInspectionSubmit:1,
                //     name: 'process_submission_btn',
                //     storeID: 'foodpremiseregistrationstr',
                //     table_name: 'tra_premises_applications',
                //     winWidth: '50%'
                // }

                // {
                //         text: 'Review & Approval Recommendation',
                //         ui: 'soft-purple',
                //         iconCls: 'fa fa-check',
                //         ui: 'soft-purple',
                //         iconCls: 'fa fa-sliders',
                //         menu: {
                //             xtype: 'menu',
                //             items: [
                //                 {
                //                     text: 'Recommend Application',
                //                     iconCls: 'x-fa fa-bars',
                //                     recommendation_id: 1,
                //                     winWidth: '90%', ui: 'soft-red',
                //                     name: 'reject_recommendation',
                //                     stores: '[]'
                //                 },{
                //                     text: 'Not Recommend Application',
                //                     iconCls: 'x-fa fa-bars', recommendation_id: 2,
                //                     winWidth: '90%',ui: 'soft-green',
                //                     name: 'approve_recommendation',
                //                     stores: '[]'
                //                 }
                //                 //,
                //                 // {
                //                 //     text: 'Request Re-Inspection',
                //                 //     iconCls: 'x-fa fa-bars', 
                //                 //     recommendation_id: 3,
                //                 //     winWidth: '90%',ui: 'soft-green',
                //                 //     name: 'approve_recommendation',
                //                 //     stores: '[]'
                //                 // }
                //             ]
                //         }
                // },
                {
                    text: 'Close & Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    storeID: 'foodpremiseregistrationstr',
                    name: 'process_submission_btn',
                    isInspectionSubmit:1,
                    table_name: 'tra_premises_applications',
                    winWidth: '50%',
                    
                }
            ]
        }
    ],
});