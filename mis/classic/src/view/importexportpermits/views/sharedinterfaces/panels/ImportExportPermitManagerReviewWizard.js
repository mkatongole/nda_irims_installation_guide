/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportPermitManagerReviewWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.importexportpermitmanagerreviewwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    viewModel: {
        type: 'importexportpermitsvm'
    },
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
                
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Reference No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'hiddenfield',
                    name: 'process_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'workflow_stage_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }]
        }
    ],
    items: [
        {
                xtype:'tabpanel',
                layout: 'fit',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        ui: 'footer',
                        dock: 'top',
                        margin: 3,
                        items: [
                            {
                                xtype: 'tbseparator',
                                width: 2
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Zone',
                                labelWidth: 50,
                                width: 400,
                                hidden:true,
                                name: 'zone_id',
                                valueField: 'id',
                                displayField: 'name',
                                queryMode: 'local',
                                forceSelection: true,
                                listeners: {
                                    beforerender: {
                                        fn: 'setOrgConfigCombosStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                extraParams: {
                                                    model_name: 'Zone'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                },
                                labelStyle: 'font-weight:bold'
                            },{
                                xtype: 'combo',
                                fieldLabel: 'Prechecking Recommendation',
                                labelWidth: 108,
                                width: 315,
                                hidden: true,
                                name: 'prechecking_recommendation_id',
                                valueField: 'id',
                                displayField: 'name',readOnly: true,
                                queryMode: 'local',
                                forceSelection: true,
                                listeners: {
                                    beforerender: {
                                        fn: 'setOrgConfigCombosStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                url: 'configurations/getNonrefParameter',
                                                extraParams: {
                                                    table_name: 'par_evaluation_recommendations'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                },
                                labelStyle: 'font-weight:bold'
                                
                            },{
                                xtype: 'combo',
                                fieldLabel: 'Approval Review Recommendation',
                                labelWidth: 250,
                                width: 500,
                                name: 'review_recommendation_id',
                                valueField: 'id',
                                displayField: 'name',readOnly: true,
                                queryMode: 'local',
                                forceSelection: true,
                                listeners: {
                                    beforerender: {
                                        fn: 'setOrgConfigCombosStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                url: 'configurations/getNonrefParameter',
                                                extraParams: {
                                                    table_name: 'par_permits_reviewrecommendations'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                },
                                labelStyle: 'font-weight:bold'
                            },{
                                xtype: 'combo',
                                fieldLabel: 'Approval recommendation',
                                labelWidth: 320,
                                width: 700,
                                name: 'approval_recommendation_id',
                                valueField: 'id',
                                displayField: 'name',
                                hidden: true,
                                queryMode: 'local',
                                forceSelection: true,
                                readOnly: true,
                                listeners: {
                                    beforerender: {
                                        fn: 'setOrgConfigCombosStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                url: 'configurations/getNonrefParameter',
                                                extraParams: {
                                                    table_name: 'par_permits_reviewrecommendations'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                },
                                labelStyle: 'font-weight:bold'
                            }
                        ]
                    }
                ],
                items:[{
                    xtype: 'panel',
                    autoScroll: true, 
                    itemId:'permitsdetails_panel', 
                    viewModel: 'importexportpermitsvm',
                    title: 'Application Details',
                    items:[{
                        xtype: 'importexportapplicantdetailsfrm',
                        collapsible: true,
                        title: 'APPLICANT DETAILS'
                    },{
                        xtype: 'importexportdetailsfrm',
                        autoScroll: true,
                        collapsible: true,
                        title: 'Application Details', 
                        title: 'Application Details'
                    },  {
                        xtype: 'senderreceiverdetailsfrm',
                        collapsible: true,
                        title: 'Sender/Receiver Details',
                    },{
                        xtype: 'importexportpremisesfrm',
                        collapsible: true,
                        title: 'Business Details',
                    }]
                },{
                    xtype: 'panel',
                    title: 'Uploaded Application Documents',
                    xtype: 'previewpermitdocuploadsgrid'
                },{
                    xtype: 'importexportpermitsproductsgrid',
                    itemId: 'importexportpermitsproductsgrid',
                    title: 'Recommendation on Import/Export Permit Products Details',
                    bind: {
                        title: 'Products Details Recommendations'
                    },
                  //   selModel: {
                  //       selType: 'checkboxmodel',
                  //       mode: 'MULTI'
                  //   },
                  //   plugins: [{
                  //       ptype: 'gridexporter'
                  //   },{
                  //       ptype: 'filterfield'
                  //   }],
                  //   listeners:{
                  //       beforerender: function(grid){
                  //           var btn = grid.down('button[name=add_products]');
                  //           btn.setVisible(false);
                  //       }
                  //   },
                  //   columns: [{
                  //       xtype:'rownumberer'  
                  //   },{
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'certificate_no',
                  //     tdCls: 'wrap-text',
                  //     text: 'Registration No',
                  //     flex: 1,
                  // },{
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'brand_name',
                  //     tdCls: 'wrap-text',
                  //     text: 'Brand Name',
                  //     flex: 1,
                  //     width: 180
                  // }, {
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'product_strength',
                  //     tdCls: 'wrap-text',
                  //     text: 'Strength',
                  //     flex: 1,
                  // }, {
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'units_of_strength',
                  //     tdCls: 'wrap-text',
                  //     text: 'Unit Of Strenght',
                  //     flex: 1,
                  // }, {
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'dosage_form',
                  //     tdCls: 'wrap-text',
                  //     text: 'Dosage Form',
                  //    // flex: 2,
                  //    width: 150,
                  // }, {
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'no_of_packs',
                  //     text: 'Number of Packs',
              
                  //     flex: 1,
                  // },{
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'currency_name',
                  //     tdCls: 'wrap-text',
                  //     text: 'Currency ',
                  //     flex: 1,
                  // },{
                      
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'unit_price',
                  //     tdCls: 'wrap-text',
                  //     text: 'Price Per Pack',
                  //     flex: 1,
                  // },{
                      
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'pack_size',
                  //     tdCls: 'wrap-text',
                  //     text: 'Pack Size',
                  //     //flex: 2,
                  //     width: 150,
                  // },  {
          
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'total_value',
                  //     tdCls: 'wrap-text',
                  //     text: 'Total Price',
                  //     flex: 1,
                  // },

                  // {
                      
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'verification_fee_percentage',
                  //     tdCls: 'wrap-text',
                  //     text: 'Verification Fee %',
                  //     flex: 1,
                  // },{
                  //     xtype: 'gridcolumn',
                  //     dataIndex: 'verification_fee',
                  //     tdCls: 'wrap-text',
                  //     text: 'Verification Fees',
                  //     width: 200,
                  //     summaryType: 'sum',
                  //     renderer: function (val, meta, record) {
                  //         return Ext.util.Format.number(val, '0,000.00');
                  //     },
                  //     summaryRenderer: function (val) {
                  //         val = Ext.util.Format.number(val, '0,000.00');
                  //         return 'Total Verification Fees '+val
                  //     }
                  // },

                  //   {
                  //       xtype: 'gridcolumn',
                  //       text: 'Registration Status', 
                  //       tdCls: 'wrap-text',
                  //       dataIndex: 'certificate_no',
                  //       renderer: function (value, metaData) {
                  //           if (value !='') {
                  //               metaData.tdStyle = 'color:white;background-color:green';
                  //               return "Registered/Authorised";
                  //           }
                
                  //           metaData.tdStyle = 'color:white;background-color:red';
                  //           return "Not Registered";
                  //       }
                
                  //   },{   
                  //       xtype: 'gridcolumn',
                  //       dataIndex: 'prodregistrationvalidation_recommendation_id',
                  //       tdCls:'wrap-text',
                  //       text: 'Product Registration Validation Recommendation',
                  //       flex: 1,
                  //           renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                  //               var textVal = '';
                            
                  //               if (val == 2) {
                  //                   textVal = "Accepted";
                  //                   meta.tdStyle = 'color:white;background-color:green';
                                    
                  //               }else if(val == 3){
                  //                   meta.tdStyle = 'color:white;background-color:red';
                  //                   textVal = "Rejected";
                  //               }else{
                  //               // meta.tdStyle = 'color:white;background-color:blue';
                  //               }
                  //               return textVal;
                  //           }
                  //   },{   
                  //       xtype: 'gridcolumn',
                  //       dataIndex: 'prodregistrationvalidation_recommendation_remarks',
                  //       tdCls:'wrap-text',
                  //       text: 'Product Registration Validation Recommendation',
                  //       flex: 1,
                  //       renderer: function (val) {
                  //           if (val == '') {
                            
                  //                   var val = 'Recommendation Remarks';
                  //           }
                  //           return val;
                  //       }
                  //   },{   
                  //       xtype: 'gridcolumn',
                  //       dataIndex: 'permitprod_recommendation_id',
                  //       tdCls:'wrap-text',
                  //       text: 'Permits Product Recommendation(Acceptance)',
                  //       flex: 1,
                  //           editor: {
                  //               xtype: 'combo',
                  //               store: 'permitprod_recommendationstr',
                  //               valueField: 'id',
                  //               displayField: 'name',
                  //               queryMode: 'local',
                  //               listeners: {
                                
                  //               }
                  //           },
                  //           renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                  //               var textVal = 'Select Recommendation';
                  //           /*  if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                  //               // textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                  //               }
                  //               */
                  //               if (val == 2) {
                  //                   meta.tdStyle = 'color:white;background-color:green';
                  //                   textVal = 'Accepted';
                                    
                  //               }else if(val == 3){
                  //                   meta.tdStyle = 'color:white;background-color:red';
                  //                   textVal = 'Rejected';
                                
                  //               }else if(val == 3){
                  //                   meta.tdStyle = 'color:white;background-color:yellow';
                  //                   textVal = 'Queried';
                                
                  //               }else{
                  //                   meta.tdStyle = 'color:white;background-color:blue';
                  //                   textVal = 'Initial Request';
                  //               }
                                
                  //               return textVal;
                  //           }
                  //   },{   
                  //       xtype: 'gridcolumn',
                  //       dataIndex: 'permitprod_recommendation_remarks',
                  //       tdCls:'wrap-text',
                  //       text: 'Recommendation Remarks',
                  //       flex: 1,
                  //       editor: {
                  //           xtype:'textfield'
                  //       },renderer: function (val) {
                  //           if (val == '') {
                            
                  //                   var val = 'Recommendation Remarks';
                  //           }
                  //           return val;
                  //       }
                  //   },{
                  //       xtype: 'widgetcolumn',
                  //       width: 120,
                  //       widget: {
                  //           width: 120,
                  //           textAlign: 'left',
                  //           xtype: 'button',
                  //           ui: 'soft-green',
                  //           text: 'Download Report',
                  //           iconCls: 'x-fa fa-eye',
                  //           handler: 'previewUploadedDocument',
                  //           download: 0
                  //       }
                  //   }]
            },
            {
                title: 'Screening Checklist & Recommendation',
                xtype: 'panel',
                autoScroll: true, 
                layout: 'fit',
                items: [{
                            xtype: 'importexportscreeninggrid', 
                            collapsible: true,
                            title: 'Screening Checklist'

                    },{
                            title: 'Screening Recommendation',
                            xtype: 'applicationcommentspnl',
                            collapsible: true,
                            listeners:{
                                beforerender: function(pnl){
                                        var grid = pnl.down('grid');
                                        grid.down('button[name=add_btn]').setVisible(false);
                                }
                            }
                    },{
                            xtype:'applicationqueriesgrid', collapsible: true,
                            title: 'Request for Additional Information(Queries)',
                            listeners:{
                                beforerender: function(grid){
                                        grid.down('button[name=add_query]').setVisible(false);
                                }
                            }
                    }]
            }]
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        }
    ],
    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            style: {
                "background-color": "#90c258"
            },
            bodyStyle: {
                "background-color": "#90c258"
            },
            layout: {
                pack: 'center'
            },
            items: [{
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Application Details',
                    action: 'quickNav',  pressed: true,
                    wizard: 'importexportpermitmanagerreviewwizard',
                    handler: 'quickNavigationReview',
                    bind: {
                        text: 'Application Details'
                    },
                }
            ]
        };



        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [{
                    xtype: 'transitionsbtn',
                },
                {
                    text: 'Back to List',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'back_to_list',
                    hidden: true
                },{
                    text: 'Previous Permits( Amendment)',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    childXtype: 'previmportexportpermitreleasegrid',
                    winTitle: 'Preview Previous Permits',
                    winWidth: '80%',hidden: true,
                    handler: 'showPrevimportexportPermitreleasegrid',
                  
                },{
                    text: 'Submit Application To Trader',
                    ui: 'soft-red',
                    iconCls: 'fa fa-check',
                    hidden: true,
                    name: 'process_tradersubmission_btn',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%',
                    
                },{
                    text: 'Return Back',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'returnback_submission_btn',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%',
                    
                },{
                    text: 'Save Screening Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn'
                },
                '->',
                
                {
                    text: 'Save/Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    hidden:true,
                    action_url: 'saveImportPermittReceivingBaseDetails',
                    wizard: 'importexportpermitmanagerreviewwizard',
                    handler: 'saveImporExportPermitReceivingBaseDetails'
                },'->',
                {
                    text: 'Preview Approval Document',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-sliders',
                    menu: {
                        xtype: 'menu',
                        items: [{
                                ui: 'soft-red',
                                iconCls: 'fa fa-print',
                                text: 'Preview Approval Document',
                                is_preview : true,
                                name: 'preview_importexportpermit',
                            },{
                                ui: 'soft-green',
                                iconCls: 'fa fa-print',
                                text: 'Print Approval Document',
                                is_preview : false,
                                hidden:true,
                                name: 'print_importexportpermit',
                            }
                        ]
                    }
                }, {
                        text: 'Review & Approval Recommendation',
                        ui: 'soft-purple',
                        iconCls: 'fa fa-check',
                        ui: 'soft-purple',
                        iconCls: 'fa fa-sliders',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'Reject Application',
                                    iconCls: 'x-fa fa-bars',
                                    decision_id: 3,
                                    winWidth: '90%', ui: 'soft-red',
                                    name: 'reject_recommendation',
                                    stores: '[]'
                                },{
                                    text: 'Approve Application',
                                    iconCls: 'x-fa fa-bars', decision_id: 1,
                                    winWidth: '90%',ui: 'soft-green',
                                    name: 'approve_recommendation',
                                    stores: '[]'
                                }
                            ]
                        }
                },
                {
                    text: 'Close & Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%',
                    
                }
            ]
        };
        me.callParent(arguments);
    }
});
