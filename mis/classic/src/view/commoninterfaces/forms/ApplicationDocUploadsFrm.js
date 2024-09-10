Ext.define('Admin.view.commoninterfaces.forms.ApplicationDocUploadsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationDocUploadsFrm',
    controller: 'commoninterfacesVctr',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'document_type_id'
        },{
            xtype: 'hiddenfield',
            name: 'prodclass_category_id'
        },{
            xtype: 'hiddenfield',
            name: 'importexport_permittype_id'
        },{
            xtype: 'hiddenfield',
            name: 'premise_type_id'
        },
        
        {
            xtype: 'hiddenfield',
            name: 'query_ref_id'
        },  {
            xtype: 'hiddenfield',
            name: 'inspection_capa_id'
        },

        
        {
            xtype: 'hiddenfield',
            name: 'node_ref'
        },{
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'combo',
            name: 'doctype_id',
            allowBlank: false,
            forceSelection: true,
            fieldLabel: 'Document Type',
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'documentmanagement/getProcessApplicableDocTypes'
                        }
                    },
                    isLoad: false
                },
                change: function (cmbo, newVal, oldVal) {
                    var form = cmbo.up('form'),
                        section_id = form.down('hiddenfield[name=section_id]').getValue(),
                        module_id = form.down('hiddenfield[name=module_id]').getValue(),
                        sub_module_id = form.down('hiddenfield[name=sub_module_id]').getValue(),
                        prodclass_category_id = form.down('hiddenfield[name=prodclass_category_id]').getValue(),
                        importexport_permittype_id = form.down('hiddenfield[name=importexport_permittype_id]').getValue(),
                        docReqFld = form.down('combo[name=document_requirement_id]'),
                        docReqStr = docReqFld.getStore(),
                        assessment_start_date = form.down('datefield[name=assessment_start_date]'),
                        assessment_end_date = form.down('datefield[name=assessment_end_date]'),
                        assessment_by = form.down('combo[name=assessment_by]'),
                        selected_record = cmbo.getSelectedRecord();
                    if(selected_record.get('is_assessment_doc') == 1){
                        assessment_start_date.setVisible(true);
                        assessment_end_date.setVisible(true);
                        assessment_start_date.allowBlank = false;
                        assessment_end_date.allowBlank = false;
                        assessment_by.allowBlank = false;
                        assessment_end_date.validateValue(assessment_end_date.getValue());
                        assessment_start_date.validateValue(assessment_start_date.getValue());
                        assessment_by.validateValue(assessment_by.getValue());
                    }
                    docReqStr.removeAll();
                    docReqStr.load({
                        params: {
                            docType_id: newVal,
                            section_id: section_id,
                            module_id: module_id,
                            prodclass_category_id:prodclass_category_id,
                            importexport_permittype_id:importexport_permittype_id,
                            sub_module_id: sub_module_id
                        }
                    });
                }
            }
        },
        {
            xtype: 'combo',
            name: 'document_requirement_id',
            allowBlank: false,
            forceSelection: true,
            fieldLabel: 'Document Requirement',
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'document_requirementsStr',
                        proxy: {
                            url: 'documentmanagement/getProcessApplicableDocRequirements'
                        }
                    },
                    isLoad: false
                }
            }
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: true,
            valueField: 'id',
            value: user_id,
            displayField: 'name',
            fieldLabel: 'Uploaded/Report Prepared By',
            name: 'assessment_by',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'usermanagement/getUserList',
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'datefield',
            name: 'assessment_start_date',
            format: 'Y-m-d H:i:s',
            altFormats: 'Y-m-d H:i:s|Y-m-d',
            fieldLabel: 'Assessment Start Date',
            allowBlank: true,
            hidden: true
        },{
            xtype: 'datefield',
            name: 'assessment_end_date',
            format: 'Y-m-d H:i:s',
            altFormats: 'Y-m-d H:i:s|Y-m-d',
            fieldLabel: 'Assessment End Date',
            allowBlank: true,
            hidden: true
        },
        {
            xtype: 'filefield',
            fieldLabel: 'File/Document',
            allowBlank: false,
            name: 'uploaded_doc'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Remarks',
            name: 'description',
            allowBlank: true
        }
    ],
    buttons: [{
        xtype: 'button',
        text: 'Upload',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-upload',
        name: 'upload_file_btn',
        upload_tab: '',
        storeID: 'applicationDocumentsUploadsStr',
        formBind: true
    }]
});