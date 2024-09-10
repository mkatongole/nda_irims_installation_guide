/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.importexportpermitevaluationpnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'importexportpermitevaluationpnl', 
     permitsdetails_panel: 'previewimportexportpermitdetails',
    itemId: 'main_processpanel',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        height: 40,
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
                hidden: true,
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            },{
                xtype: 'displayfield',
                name: 'tracking_no',
               
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            },  {
                xtype: 'displayfield',
                name: 'reference_no',
               
                fieldLabel: 'Ref No',
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
            },{
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            },{
                xtype: 'hiddenfield',
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }
            ]
        }
    ],
    items: [{
            xtype:'tabpanel',
            layout: 'fit',
           // title: 'Application Details((Permit, Sender/Receiver, Licenses Outlets and Documents)',
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
                    title: 'Permit Information'
                },  {
                    xtype: 'senderreceiverdetailsfrm',collapsible: true,
                    title: 'Sender/Receiver Details',
                },{
                    xtype: 'importexportpremisesfrm',collapsible: true,
                    title: 'Licensed Outlet Details',
                }],
                bbar:[{
                    text: 'Update Permit Application Details',
                    ui: 'soft-purple',
                    hidden:true,
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    action_url: 'importexportpermits/onSavePermitinformation',
                    handler: 'savePermitInformation'
                }]

            },{
                xtype: 'panel',
                title: 'Uploaded Application Documents',
                xtype: 'previewpermitdocuploadsgrid'
            }]
        },
        {
            xtype: 'importexportpermitsproductsgrid',
            itemId: 'importexportpermitsproductsgrid',
            title: 'Recommendation on Import/Export Products Details',
            bind: {
                title: 'Products Details Recommendations'
            },
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },
            plugins: [{
                ptype: 'gridexporter'
            }, {
                ptype: 'cellediting',
                clicksToEdit: 1,
                editing: true
            },{
                ptype: 'filterfield'
            }],
            
            tbar:[{
                text:'Recommend Selected Permits Products',
               // name:'btn_recommendallproducts',
               viewXtype: 'permitsproductsrecommendationfrm',
               winTitle: 'Products Recommendation',
               winWidth: '40%',
                handler: 'funcPermitsProductRecommendationWin',
                iconCls: 'x-fa fa-plus',
                ui: 'soft-red',
				bind: {
					disabled: '{isReadOnly}'  // negated
				}
            },'->',{
                text:'Update Permits Products Recommendation',
                name:'btn_updatesprodrecommendtion',
                iconCls: 'x-fa fa-plus',
                ui: 'soft-green',
                hidden:true,
				bind: {
					disabled: '{isReadOnly}'  // negated
				}

            }],features: [{
                ftype: 'summary'
            },{
                ftype: 'searching',
                minChars: 2,
                mode: 'local'
            }],
            // columns: [{
            //     xtype:'rownumberer'  
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
            //     //flex: 2,
            //     width: 150,
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
            // }, {
            //       xtype: 'gridcolumn',
            //       dataIndex: 'total_value',
            //       tdCls: 'wrap-text',
            //       text: 'Total Price',
            //       flex: 1,
            //   },

            //   {
                  
            //       xtype: 'gridcolumn',
            //       dataIndex: 'verification_fee_percentage',
            //       tdCls: 'wrap-text',
            //       text: 'Verification Fee %',
            //       flex: 1,
            //   },{
            //       xtype: 'gridcolumn',
            //       dataIndex: 'verification_fee',
            //       tdCls: 'wrap-text',
            //       text: 'Verification Fees',
            //       width: 200,
            //       summaryType: 'sum',
            //       renderer: function (val, meta, record) {
            //           return Ext.util.Format.number(val, '0,000.00');
            //       },
            //       summaryRenderer: function (val) {
            //           val = Ext.util.Format.number(val, '0,000.00');
            //           return 'Total Verification Fees '+val
            //       }
            //   },
            //      {
            //     xtype: 'gridcolumn',
            //     text: 'Registration Status', 
            //     tdCls: 'wrap-text',
            //     dataIndex: 'certificate_no',
            //     renderer: function (value, metaData) {
            //         if (value !='') {
            //             metaData.tdStyle = 'color:white;background-color:green';
            //             return "Registered/Authorised";
            //         }
        
            //         metaData.tdStyle = 'color:white;background-color:red';
            //         return "Not Registered";
            //     }
        
            // },{   
            //     xtype: 'gridcolumn',
            //     dataIndex: 'prodregistrationvalidation_recommendation_id',
            //     tdCls:'wrap-text',
            //     text: 'Product Registration Validation Recommendation',
            //     flex: 1,
            //         renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            //             var textVal = '';
                       
            //             if (val == 2) {
            //                 textVal = "Accepted";
            //                 meta.tdStyle = 'color:white;background-color:green';
                            
            //             }else if(val == 3){
            //                 meta.tdStyle = 'color:white;background-color:red';
            //                 textVal = "Rejected";
            //             }else{
            //                // meta.tdStyle = 'color:white;background-color:blue';
            //             }
            //             return textVal;
            //         }
            //   },{   
            //     xtype: 'gridcolumn',
            //     dataIndex: 'prodregistrationvalidation_recommendation_remarks',
            //     tdCls:'wrap-text',
            //     text: 'Product Registration Validation Recommendation',
            //     flex: 1,
            //     renderer: function (val) {
            //         if (val == '') {
                       
            //                  var val = 'Recommendation Remarks';
            //         }
            //         return val;
            //     }
            //   },{   
            //     xtype: 'gridcolumn',
            //     dataIndex: 'permitprod_recommendation_id',
            //     tdCls:'wrap-text',
            //     text: 'Permits Product Recommendation(Acceptance)',
            //     flex: 1,
            //         editor: {
            //             xtype: 'combo',
            //             store: 'permitprod_recommendationstr',
            //             valueField: 'id',
            //             displayField: 'name',
            //             queryMode: 'local',
            //             listeners: {
                           
            //             }
            //         },
            //         renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            //             var textVal = 'Select Recommendation';
            //           /*  if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
            //                // textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
            //             }
            //             */
            //             if (val == 2) {
            //                 meta.tdStyle = 'color:white;background-color:green';
            //                 textVal = 'Accepted';
                            
            //             }else if(val == 3){
            //                 meta.tdStyle = 'color:white;background-color:red';
            //                 textVal = 'Rejected';
                           
            //             }else if(val == 3){
            //                 meta.tdStyle = 'color:white;background-color:yellow';
            //                 textVal = 'Queried';
                           
            //             }else{
            //                 meta.tdStyle = 'color:white;background-color:blue';
            //                 textVal = 'Initial Request';
            //             }
                        
            //             return textVal;
            //         }
            //   },{   
            //     xtype: 'gridcolumn',
            //     dataIndex: 'permitprod_recommendation_remarks',
            //     tdCls:'wrap-text',
            //     text: 'Recommendation Remarks',
            //     flex: 1,
            //     editor: {
            //         xtype:'textfield'
            //     },renderer: function (val) {
            //         if (val == '') {
                       
            //                  var val = 'Recommendation Remarks';
            //         }
            //         return val;
            //     }
            //   },{
            //     xtype: 'widgetcolumn',
            //     width: 120,
            //     widget: {
            //         width: 120,
            //         textAlign: 'left',
            //         xtype: 'button',
            //         ui: 'soft-green',
            //         text: 'Download Report',
            //         iconCls: 'x-fa fa-eye',
            //         handler: 'previewUploadedDocument',
            //         download: 0
            //     }
            // }]
        },{
            xtype: 'productscreeninggrid',
            title: 'Application Screening & Recommendation',
            listeners:{
                beforerender:function(grid){
                    btn = grid.down('button[name=raise_checklist_query]');
                    btn.setVisible(false);
                }
            }
        },{
            title: 'Other Details',
            region: 'east',
            width: 400,
            collapsed: true,
            collapsible: true,
            titleCollapse: true,
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 5,
                    defaults: {
                        margin: 2,
                        labelAlign: 'top'
                    },
                    fieldDefaults: {
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold'
                        }
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Applicant Details',
                            name: 'applicant_details'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Premises Details',
                            name: 'premises_details'
                        }
                    ]
                }
            ]
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
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'Application Details',
                    iconAlign: 'top',
                    action: 'quickNav',max_step:2,
                    wizard: 'importexportpermitevaluationpnl',
                    handler: 'quickScreeningNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,iconAlign: 'top',
                    text: 'Recommendation on Import/Export Products Details',
                    max_step:2,
                    action: 'quickNav', wizard: 'importexportpermitevaluationpnl',
                    handler: 'quickScreeningNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,iconAlign: 'top',
                    text: 'Application Screening & Recommendation',
                    max_step:2,
                    action: 'quickNav', wizard: 'importexportpermitevaluationpnl',
                    handler: 'quickScreeningNavigation'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    xtype: 'transitionsbtn'
                },{
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
                            }
                        ]
                    }
                },{
                    text: 'Preview & Edit  Details(Preview Option)',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-edit',
                    hidden: true,
                    isReadOnly: 0,
                    winTitle: 'Preview & Edit Permit Details',
                    winWidth: '60%',
                    name: 'more_app_details',
                    stores: '[]'
                },
                {
                    text: 'Documents/Reports(Preview Option)',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    hidden: true,
                    childXtype: 'importexportdocuploadsgrid',
                    winTitle: 'Screening Documents',
                    winWidth: '80%',
                    handler: 'showApplicationEvaluationUploads',
                    stores: '[]',
                    isWin: 1
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },max_step:2,
                    wizard:'importexportpermitevaluationpnl',
                    handler: 'onPrevScreeningCardClick'
                },{
                    xtype: 'button',
                    text: "Raise/View Query & Responses(Request for Information)",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-green',
                    handler: 'showAddApplicationUnstrcuturedQueries',
					bind: {
						disabled: '{isReadOnly}'  // negated
					}
					
                },{
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%',
					bind: {
						disabled: '{isReadOnly}'  // negated
					}
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',max_step:2,
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'importexportpermitevaluationpnl',
                    handler: 'onNextScreeningCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
