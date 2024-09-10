

Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductsSampledetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productsSampledetailsFrm',
    itemId: 'productsSampledetailsFrm',
    scrollable:true,
    layout: {
        type: 'column',
        columns: 2
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.5,
        labelAlign: 'top',
        allowBlank: false,
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },
    {
        xtype: 'hiddenfield',
        name: 'product_id'
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_sample_information'
    }, {
        xtype: 'datefield',
        name: 'submission_date',
        value: new Date(),
        readOnly:true,
        submitFormat: 'Y-m-d',
        format: 'd/m/Y',
        maxValue: new Date(),
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s',
        fieldLabel: 'Sample Submission Date',

    }, {
        xtype: 'textfield',
        name: 'batch_no',
        allowBlank: true,
        fieldLabel: 'Batch No',
    },{
        xtype:'datefield',
        submitFormat: 'Y-m-d',
        name:'manufacturing_date',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s',
        fieldLabel:'Manufacturing Date',
        format:'Y-m-d'
    },{
        xtype:'datefield',
        name:'expiry_date',
        submitFormat: 'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s',
        fieldLabel:'Expiry Date',
        format:'Y-m-d'
    },  
    // {
    //     xtype:'fieldcontainer',
    //     columnWidth: 0.5,
    //     layout: {
    //         type: 'hbox'
    //     },
    //     items:[{

    //         xtype:'textfield',
    //         name:'unit_pack',
    //         width:'50%',
    //         labelAlign: 'top',
    //         fieldLabel:'Unit Pack'
    //     },{
    //         xtype: 'combo',
    //         name: 'pack_unit_id',
    //         allowBlank: true,
    //         labelAlign: 'top',
    //         width:'50%',
    //         queryMode: 'local',
    //         fieldLabel: 'Unit Pack SI-Unit',
    //         valueField: 'id',
    //         displayField: 'name',
    //         listeners: {
    //             afterrender: {
    //                 fn: 'setConfigCombosStore',
    //                 config: {
    //                     pageSize: 10000,
    //                     proxy: {
    //                         url: 'configurations/getRegistrationApplicationParameters',
    //                         extraParams:{
    //                             table_name: 'par_si_units'
    //                         }
    //                     }
    //                 },
    //                 isLoad: true
    //             }
    //         }
    //     }]
    // },
    {
        xtype:'fieldcontainer',
        columnWidth: 1,
        layout: {
            type: 'hbox'
        },
        items:[{
            xtype: 'numberfield',
            name: 'quantity',
            width:'50%',
            labelAlign: 'top',
            fieldLabel: 'Quantity'
        },{
            xtype: 'combo',
            name: 'quantity_unit_id',
            allowBlank: true,forceSelection:true,
            fieldLabel: 'Quantity Units',
            queryMode: 'local',
            width:'50%',
            valueField: 'id',
            labelAlign: 'top',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosProdSampleSectionfilterStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'sampleanalysis/getSampleAnalyisParameter',
                            extraParams: {
                                table_name: 'packaging_units',
                                has_filter: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
        ]
    },{
        xtype: 'combo',
        name: 'storage_id',
        hidden:true,
        allowBlank: true,forceSelection:true,
        fieldLabel: 'Storage Condition(Optional)',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        
        listeners: {
            beforerender: {
                fn: 'setConfigCombosProdSampleSectionfilterStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'sampleanalysis/getSampleAnalyisParameter',
                        extraParams: {
                            table_name: 'storage_conditions',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textarea',
        fieldLabel:'Remarks(optional)',
        name:'remarks',columnWidth: 1,
        allowBlank: true
    }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Sample details',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_sample_information',
                storeID: 'productsSampledetailsStr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductSampleDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    } ]
});