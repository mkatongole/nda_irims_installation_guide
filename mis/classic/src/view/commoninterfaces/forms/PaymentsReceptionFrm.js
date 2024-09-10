/**
 * Created by Softclans on 1/6/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.PaymentsReceptionFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'paymentsreceptionfrm',
    controller: 'commoninterfacesVctr',
    frame: true,
    scrollable:true,
    bodyPadding: 5,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },{
            xtype: 'hiddenfield',
            name: 'invoice_no'
        },{
            xtype: 'hiddenfield',
            name: 'invoice_id'
        },
        {
            xtype: 'panel',
            layout: 'accordion',
            items: [
                {
                    xtype: 'panel',
                    hidden: true
                },
                {
                    xtype: 'panel',
                    title: 'Company/Applicant Details',
                    layout: 'column',
                    frame: true,
                    defaults: {
                        columnWidth: 0.5,
                        margin: 2
                    },
                    fieldDefaults: {
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold'
                        }
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'applicant_id'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Name',
                            name: 'applicant_name',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Contact Person',
                            name: 'contact_person',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Postal Address',
                            name: 'postal_address',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Physical Address',
                            name: 'physical_address',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'District',
                            name: 'district_name',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Region/State',
                            name: 'region_name',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Country',
                            name: 'country_name',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Telephone',
                            name: 'telephone_no',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                columnWidth: 0.33,
                margin: 3,
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
                    xtype: 'textfield',
                    fieldLabel: 'Proforma Invoice No',
                    allowBlank:true,
                    readOnly:true,
                    name: 'invoice_no'
                },
                 {
                    xtype: 'datefield',
                    fieldLabel: 'Proforma Invoice Date',
                    maxValue: new Date(),
                    name: 'date_of_invoicing',
                    readOnly:true,
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Transaction Date',
                    maxValue: new Date(),
                    name: 'trans_date',
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Currency',
                    store: 'currenciesstr',
                    valueField: 'id',
                    readOnly:true,
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    
                    name: 'currency_id',
                    allowBlank: false,
                    listeners: {
                        beforerender: function () {
                            var store = this.getStore(),
                                filterObj = {is_paying_currency: 1},
                                filterStr = JSON.stringify(filterObj);
                            store.removeAll();
                            store.load({params: {filters: filterStr}});
                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Amount',
                    minValue: 1,
                    readOnly:true,
                    name: 'amount_paid',
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Receipt Type',
                    store: 'receipttypestr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'receipt_type_id',
                    allowBlank: false,
                    listeners: {
                        change: function (cmb, newVal) {
                            var form = cmb.up('form'),
                                manual_receipt_no = form.down('textfield[name=manual_receipt_no]');
                            if (newVal == 2 || newVal === 2) {
                                manual_receipt_no.setVisible(true);
                            } else {
                                manual_receipt_no.setVisible(false);
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Manual Receipt No',
                    name: 'manual_receipt_no',
                    hidden: true
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Payment Mode',
                    store: 'paymentmodesstr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'payment_mode_id',
                    allowBlank: false,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Bank Payment Reference No',
                    name: 'trans_ref'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank Name',
                    store: 'banksstr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'bank_id',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Drawer',
                    name: 'drawer'
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Reason for Non-Electronic Payment',
                    name: 'non_gepg_reason',
                    columnWidth: 1,
                    allowBlank: false
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save Details',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-save',
                    formBind: true,
                    table_name: 'tra_payments',
                    action_url: 'saveApplicationPaymentDetails',
                    name: 'save_details',
                    storeID: 'invoicepaymentverificationdetailsGridStr'
                },
                {
                    xtype: 'button',
                    text: 'Clear',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-times',
                    action: 'save_requery',
                    action_url: '',
                    handler: ''
                }
            ]
        }
    ]
});