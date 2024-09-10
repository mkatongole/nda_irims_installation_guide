
/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.psur.views.forms.PsurDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'psurdetailsFrm',
    controller: 'psurVctr',
    layout: 'column',
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    autoScroll: true,
    scrollable: true,
    bodyPadding: 5,
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [ {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
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
            items:[
            {
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                //allowBlank:false,
                displayField: 'name',
                fieldLabel: 'Report Type',
                name: 'psur_type_id',
                listeners: {
                    beforerender: {
                        fn: 'setCompStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_psur_type'
                                }
                            }
                        },
                         isLoad: true
                    }
                   
                }
            },

            

            {
                xtype: 'datefield',
                fieldLabel: 'Reporting Period From',
                format: 'Y-m-d',
                 allowBlank:false,
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                name: 'from_date',
                maxValue: new Date(),
                listeners: {
                    change: function(field, newValue) {
                        var reportDateField = field.up('form').down('datefield[name=to_date]');
                        var reportDateValue = reportDateField.getValue();

                        if (reportDateValue && newValue > reportDateValue) {
                            reportDateField.setValue(null);
                            toastr.error('Validation Error', 'Reporting Period To must be later than the Reporting Period From', 'Warning Response');
                        }
                    }
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Reporting Period To',
                format: 'Y-m-d',
                allowBlank:false,
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                name: 'to_date',
                maxValue: new Date(),
                listeners: {
                    change: function(field, newValue) {
                        var initialReceiveDateField = field.up('form').down('datefield[name=from_date]');
                        var initialReceiveDateValue = initialReceiveDateField.getValue();

                        if (initialReceiveDateValue && newValue < initialReceiveDateValue) {
                            field.setValue(null);
                            toastr.error('Validation Error', 'Reporting Period To must be later than the Reporting Period From', 'Warning Response');
                        }
                    }
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Approval Date',
                name: 'report_approval_date',submitFormat: 'Y-m-d',
                format: 'd/m/Y',
                hidden:true,
                allowBlank:true,
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Version No',
                name: 'version_no',
                allowBlank:true,
                bind:{
                    readOnly: '{isReadOnly}'
                }
            },

            {
                xtype: 'datefield',
                fieldLabel: 'International Birth Date',
                name: 'international_birth_date',submitFormat: 'Y-m-d',
                format: 'd/m/Y',
                allowBlank:true,
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
            },{
                xtype: 'datefield',
                fieldLabel: 'Data lock point',
                name: 'data_log_point',submitFormat: 'Y-m-d',
                format: 'd/m/Y',
                allowBlank:true,
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Remarks',
                name: 'remarks',
                columnWidth: 1
            }]
        }]

});