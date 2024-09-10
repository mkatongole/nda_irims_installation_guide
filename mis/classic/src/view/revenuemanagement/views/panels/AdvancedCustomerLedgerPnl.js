Ext.define('Admin.view.RevenueManagement.views.panels.AdvancedCustomerLedgerPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'advancedCustomerLedgerPnl',
    // requires: [
    //     'Ext.panel.Panel',
    //     'Ext.button.Button',
    //     'Ext.layout.container.Accordion'
    // ],
    controller: 'revenuemanagementvctr',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    layout: 'border',
    // padding: 10,
    split: true,
    items: [
        {
            xtype: 'panel',
            cls: 'faq-left-sidebar shadow',
            margin: 10,
            scrollable: true,
            // height: Ext.Element.getViewportHeight() - 118,
            autoScroll: true,
            header: false,
            ui: 'light',
            width: '30%',
            region: 'west',
            collapsible: true,
            tbar: [{
                xtype: 'button',
                ui: 'soft-blue',
                name: 'back',
                text: 'Back',
                iconCls: 'fa fa-arrow-left',
                handler: 'backTOCustomerList'
            },{
                xtype: 'hiddenfield',
                name: 'CustomerId',
                value: 2
            }],
            items: [
                {
                    xtype: 'form',
                    title: 'Customer Details',
                    ui: 'light',
                    cls: 'shadow pages-faq-container',
                    iconCls: 'x-fa fa-user',
                    listeners: {
                        afterrender: 'loadCustomerDetailsForm',
                    },                    
                    bodyPadding: 10,
                    defaults: {
                        labelAlign: 'left',
                        iconCls: 'fa fa-check',
                        columnWidth: 1,
                        labelStyle: "color:#595959;font-size:13px",
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold',
                            'font-size': '14px'
                        }
                    },
                    layout: 'column',
                    items: [
                    {
                        xtype: 'textfield',
                        name: 'applicant_name',
                        labelAlign: 'top',
                        readOnly: true,
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold',
                            'font-size': '14px'
                        },
                        inputWrapCls: '',
                        triggerWrapCls: '',
                        margin: '20 0 20 2',
                        fieldLabel: 'Customer Name'
                    },{
                        xtype: 'textfield',
                        name: 'customer_number',
                        labelAlign: 'top',
                        margin: '20 0 20 2',
                        readOnly: true,
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold',
                            'font-size': '14px'
                        },
                        inputWrapCls: '',
                        triggerWrapCls: '',
                        border: false,
                        value: '0000',
                        fieldLabel: 'Customer Number'
                    },{
                        xtype:'fieldset',
                        columnWidth: 1,
                        title: 'Customer Account Details',
                        collapsible: true,
                        defaults: {
                            labelAlign: 'top',
                            allowBlank: false,
                            labelAlign: 'top',
                            margin: 5,
                            xtype: 'textfield',
                            allowBlank: false,
                            columnWidth: 1,
                        },
                        layout: 'column',
                        items :[
                        {
                            xtype: 'combo', 
                            anyMatch: true,
                            fieldLabel: 'Account Type',
                            name: 'traderaccount_type_id',
                            readOnly: true,
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold',
                                'font-size': '14px'
                            },
                            valueField: 'id',
                            displayField: 'name',
                            forceSelection: true,
                            allowBlank: false,
                            queryMode: 'local',
                            listeners: {
                                beforerender: {
                                    fn: 'setCompStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                             
                                            extraParams:{
                                                table_name: 'par_traderaccount_types'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            }
                        }, {
                            fieldLabel: 'Email Address',
                            name: 'app_email',
                            readOnly: true,
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold',
                                'font-size': '14px'
                            },
                            vtype: 'email'
                        },{
                            fieldLabel: 'TIN No',
                            name: 'tpin_no',
                            allowBlank: true,
                            readOnly: true,
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold',
                                'font-size': '14px'
                            },
                            hidden: true,
                            xtype: 'textfield',
                            labelAlign: 'top'
                        }]
                    },{
                        xtype:'fieldset',
                        columnWidth: 1,
                        title: 'Contacts Details',
                        collapsible: true,
                        collapsed: true,
                        defaults: {
                            labelAlign: 'top',
                            allowBlank: false,
                            labelAlign: 'top',
                            margin: 5,
                            xtype: 'textfield',
                            allowBlank: false,
                            columnWidth: 1,
                        },
                        layout: 'column',
                        items :[
                            {
                                fieldLabel: 'Country',
                                name: 'app_country_id',
                                xtype: 'combo', 
                                anyMatch: true,
                                queryMode: 'local',
                                readOnly: true,
                                fieldStyle: {
                                    'color': 'green',
                                    'font-weight': 'bold',
                                    'font-size': '14px'
                                },
                                forceSelection: true,
                                displayField: 'name',
                                valueField: 'id',
                                listeners: {
                                    beforerender: {
                                        fn: 'setCompStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                 
                                                extraParams:{
                                                    table_name: 'par_countries'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    },
                                    change:function(cbo, value){
                                        var form = cbo.up('form'),
                                            tpin_no = form.down('textfield[name=tpin_no]'),
                                            pacra_reg_no  = form.down('textfield[name=tpin_no]');
                                            regionStore = form.down('combo[name=app_region_id]').getStore();
                        
                                            filter = {
                                                    country_id: value
                                            };
                                            filter = JSON.stringify(filter);
                                            regionStore.removeAll();
                                            regionStore.load({params:{filters:filter}});
                                            //check if country is zambia
                                            tpin_no.setVisible(true);
                                            pacra_reg_no.setVisible(true);
                                    }
                                }
                            },
                            {
                                fieldLabel: 'District',
                                name: 'app_region_id',
                                xtype: 'combo', 
                                readOnly: true,
                                fieldStyle: {
                                    'color': 'green',
                                    'font-weight': 'bold',
                                    'font-size': '14px'
                                },
                                anyMatch: true,
                                forceSelection: true,
                                queryMode: 'local',
                                
                                displayField: 'name',
                                valueField: 'id',
                                listeners: {
                                    beforerender: {
                                        fn: 'setCompStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                 
                                                extraParams:{
                                                    table_name: 'par_regions'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    },
                                    change:function(cbo, value){
                                        var form = cbo.up('form'),
                                            districtStore = form.down('combo[name=app_district_id]').getStore();
                                            filter = {
                                                    region_id: value
                                            };
                                            filter = JSON.stringify(filter);
                                            districtStore.removeAll();
                                            districtStore.load({params:{filters:filter}});
                                    }
                                }
                            }, 
                            {
                                fieldLabel: 'Region/City/Town(Optional)',
                                name: 'app_district_id',
                                xtype: 'combo', anyMatch: true,
                                queryMode: 'local',
                                forceSelection: true,
                                allowBlank:true,
                                readOnly: true,
                                fieldStyle: {
                                    'color': 'green',
                                    'font-weight': 'bold',
                                    'font-size': '14px'
                                },
                                displayField: 'name',
                                valueField: 'id', 
                                listeners: {
                                    beforerender: {
                                        fn: 'setCompStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                 
                                                extraParams:{
                                                    table_name: 'par_districts'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    },
                                }
                            }, 
                            {
                                fieldLabel: 'Postal Address',
                                name: 'app_postal_address',
                                readOnly: true,
                                fieldStyle: {
                                    'color': 'green',
                                    'font-weight': 'bold',
                                    'font-size': '14px'
                                },
                        
                            }, 
                            {
                                fieldLabel: 'Telephone NO',
                                readOnly: true,
                                fieldStyle: {
                                    'color': 'green',
                                    'font-weight': 'bold',
                                    'font-size': '14px'
                                },
                                name: 'app_telephone'
                        
                            }, 
                            {
                                fieldLabel: 'Mobile NO',
                                name: 'app_mobile_no',
                                readOnly: true,
                                fieldStyle: {
                                    'color': 'green',
                                    'font-weight': 'bold',
                                    'font-size': '14px'
                                },
                                xtype: 'textfield',
                                labelAlign: 'top'
                            },
                            {
                                fieldLabel: 'Physical Address',
                                name: 'app_physical_address',
                                readOnly: true,
                                fieldStyle: {
                                    'color': 'green',
                                    'font-weight': 'bold',
                                    'font-size': '14px'
                                },
                                columnWidth: 1,
                                xtype: 'textarea'
                            }
                            ]
                        }],
                }
            ]
        },
        {
            xtype: 'tabpanel',
            // cls: 'faq-left-sidebar shadow',
            // cls: 'shadow pages-faq-container',
            region: 'center',
            items: [{
                 xtype: 'accountOverviewPnl',
                 title: 'Account Overview'
             },{
                 xtype: 'issuedQuotesReportGrid',
                 title: 'Quotes Issued'
             },{
                 xtype: 'issuedInvoiceReportGrid',
                 title: 'Invoices Raised'
             },{
                 xtype: 'issuedReceiptReportGrid',
                 title: 'Payments'
             },{
                 xtype: 'postPaymentInvoiceReportGrid',
                 title: 'Post Payments'
             }]
        }
    ]
});
