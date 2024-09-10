
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialsOtherRptDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialsotherrptdetailsfrm',
    layout: 'column',
    autoScroll: true,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
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
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Study Title',
            name: 'study_title',
            grow: true, 
            growMax: 200, 
            readOnly: true,
            columnWidth: 1
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Clinical Study Phase',
            name: 'phase_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_phases'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',readOnly: true,
            fieldLabel: 'Protocol No',
            name: 'protocol_no'
        },
        {
            xtype: 'textfield',readOnly: true,
            fieldLabel: 'Version No',
            name: 'version_no'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Date of Protocol',
            name: 'date_of_protocol',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',readOnly: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s'
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            hidden:true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Clinical Study Reporting Type',
            name: 'clinicalreport_type_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinicalreport_type'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            hidden:true,
            displayField: 'name',
            fieldLabel: 'Clinical Study Status',
            name: 'clinicalstudy_status_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinicalstudy_statuses'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Clinical Study Site',
            name: 'study_site_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'clinicaltrial/getclinicalStudySitesData',
                            extraParams: {
                                table_name: 'study_sites'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, 
      {
        xtype: 'datefield',
        name: 'reporting_start_date',
        fieldLabel: 'Reporting Period Start Date',
        submitFormat: 'Y-m-d',
        format: 'd/m/Y',
        hidden:true,
        allowBlank: false,
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s'
      },{
            xtype: 'datefield',
            fieldLabel: 'Reporting Period End Date',
            name: 'reporting_end_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s'
        },
        {
            xtype: 'textarea',columnWidth: 1,
            fieldLabel: 'Brief Description',
            grow: true, 
            growMax: 200, 
            name: 'brief_description',            

        },
    
    ]
});