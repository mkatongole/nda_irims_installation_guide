Ext.define('Admin.view.pv.views.forms.PvDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvDetailsFrm',
    itemId: 'DetailsFrm',
    layout: {
        type: 'column'
    },
  
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    }, 
    autoScroll: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'pv_id',
            value: ''
        }, {
            xtype: 'hiddenfield',
            value: 'tra_pv_applications',
            name: 'table_name'
        },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Report Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[{
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                fieldLabel: 'Source of the Report',
                name: 'sourceofpsur_id',
                listeners: {
                    beforerender: {
                        fn: 'setCompStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_sourcesofsafety_alerts'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            },{
            xtype: 'combo',
            fieldLabel: 'Report Category(AEFI, ADR, ADSM, Study Reports)',
            name: 'report_category_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Report type',
            name: 'report_type_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_report_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'datefield',
            fieldLabel: 'Initial received date(NDA)',
            format: 'Y-m-d',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'initial_receive_date',
            maxValue: new Date(),
            listeners: {
                change: function(field, newValue) {
                    var reportDateField = field.up('form').down('datefield[name=report_date]');
                    var reportDateValue = reportDateField.getValue();

                    if (reportDateValue && newValue < reportDateValue) {
                        reportDateField.setValue(null);
                        toastr.error('Validation Error', 'Initial received date(NDA) must be later than the Date of report', 'Warning Response');
                    }
                }
            }
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Date of report',
            format: 'Y-m-d',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'report_date',
            maxValue: new Date(),
            listeners: {
                change: function(field, newValue) {
                    var initialReceiveDateField = field.up('form').down('datefield[name=initial_receive_date]');
                    var initialReceiveDateValue = initialReceiveDateField.getValue();

                    if (initialReceiveDateValue && newValue > initialReceiveDateValue) {
                        field.setValue(null);
                        toastr.error('Validation Error', 'Initial received date(NDA) must be later than the Date of report', 'Warning Response');
                    }
                }
            }
        },
           {
            xtype: 'combo',
            fieldLabel: 'Received from',
            name: 'adr_reporter_category_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_reporters_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }]
       },
    ]
});