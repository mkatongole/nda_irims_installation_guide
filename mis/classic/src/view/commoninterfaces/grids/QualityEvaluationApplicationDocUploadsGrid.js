Ext.define('Admin.view.commoninterfaces.grids.QualityEvaluationApplicationDocUploadsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    
    xtype: 'qualityevaluationapplicationdocuploadsgrid',
    cls: 'dashboard-todo-list',
    viewModel: 'commoninterfacesVm',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    storeID: 'qualityevaluationapplicationdocuploadsStr',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'process_id'
    },{
        xtype: 'hiddenfield',
        name: 'module_id'
    },{
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
        xtype: 'hiddenfield',
        name: 'document_type_id',
        value:34
    }, 
    {
        xtype: 'hiddenfield',
        name: 'reference_record_id'        
    },{
        xtype: 'hiddenfield',
        name: 'table_name'           
    },{
        xtype: 'hiddenfield',
        name: 'reference_table_name'           
    },{
        xtype: 'button',
        text: 'Add/Update Comment',
        iconCls: 'x-fa fa-plus',
        name:'update_report',
        handler:'saveQualitySummaryReport',
        ui: 'soft-blue',
        winWidth: '35%',
        stores: '[]'
    },{
        xtype: 'button',
        text: 'Upload Document/Report',
        name: 'add_upload',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-blue',
        winTitle: 'Document Upload',
        margin:5,
        hidden:true,
        childXtype: 'appresumabledocuploadsfrm',
        newTab: 'applicationDocUploadsFrm',
        winWidth: '40%',
        show_assessor: true,
        stores: '["bioequivalencetrialevaluationapplicationdocuploadsStr"]',
        storeID: 'bioequivalencetrialevaluationapplicationdocuploadsStr',
        // bind: {
        //     hidden: '{isReadOnly}'
        // }
    },  {
        xtype: 'exportbtn',
        hidden: true
    }, {
        xtype: 'tbspacer',
        width: 20
    },{
        xtype: 'hiddenfield',
        name: 'prodclass_category_id'
    },{
        xtype: 'hiddenfield',
        name: 'query_ref_id'
    } , 
    {
        xtype: 'combo',
        fieldLabel: 'Applicable Documents',
        labelWidth: 150,
        readOnly:true,
        hidden:true,
        value:35,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'applicable_documents',
        queryMode: 'local',
        width: 500,
        labelStyle: "font-weight:bold",
        // bind: {
        //     hidden: '{isReadOnly}'  // negated
        // },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'documentmanagement/getProcessApplicableDocTypes'
                    }
                },
                isLoad: false
            },
            change: function () {
                var grid = this.up('grid'),
                    store = grid.getStore();
                store.load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    },
   
    {
        xtype: 'splitbutton',
        name: 'downloadAll',
        text: 'Download All',
        hidden: true,
        iconCls: 'fa fa-download',
        ui: 'soft-green',
         menu: {
                xtype: 'menu',
                items: [{
                    text: 'Download Files',
                    iconCls: 'x-fa fa-file',
                    handler: 'downloadAllSelectedDocuments',
                    type: 'file'
                }, {
                    text: 'Download as Zip',
                    iconCls: 'x-fa fa-archive',
                    handler: 'downloadAllSelectedDocuments',
                    type: 'zip'

                }]
            }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'qualityevaluationapplicationdocuploadsStr',
                proxy: {
                    url: 'documentmanagement/onLoadApplicationDocumentsUploads',
                },grouper: {
			        groupFn: function (item) {
			            return item.get('document_type') +item.get('document_requirement');
			        }
			    },
            },
            isLoad: true
        }
    },
    export_title: 'Document uploads',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('qualityevaluationapplicationdocuploadsgrid').fireEvent('refresh', this);
        }
    }],
     selModel:{
        selType: 'checkboxmodel',
        //mode: 'SINGLE'
    },
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        editing: true
    }
    ],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '=> {[values.rows[0].data.document_type]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],

    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'document_requirement',
        text: 'Required Document(s)',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'is_mandatory',
        text: 'Is Mandatory',
        flex: 0.7,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:red';
                return "Is-Mandatory";
            } else {
                metaData.tdStyle = 'color:white;background-color:red';
                return "Not-Mandatory";
            }

        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'file_name',
        text: 'File Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'initial_file_name',
        hidden:true,
        text: 'Initial File Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'uploaded_by',
        text: 'Upload By',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'uploaded_on',
        text: 'Upload Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'file_type',
        hidden:true,
        text: 'File Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        hidden:true,
        text: 'Remarks',
        flex: 1
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'asessor_comment', 
        tdCls: 'wrap-text',
        text: ' Comment(Assessor)',
        flex:2,
           editor: {
                xtype: 'textareafield'
            }
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'reviewer_comment', 
        tdCls: 'wrap-text',
        text: ' Comment(Reviewer)',
        flex:2,
        // editor: {
        //     xtype: 'textareafield'
        //  }
        }, 
        {
        xtype: 'gridcolumn',
        dataIndex: 'query', 
        tdCls: 'wrap-text',
        text: 'Query',
        flex:1,
           editor: {
                xtype: 'textareafield'
            }
        },
       {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Preview',
                    iconCls: 'x-fa fa-eye',
                    handler: 'previewUploadedDocument',
                    download: 0
                }, {
                    text: 'Update Document',
                    iconCls: 'x-fa fa-upload',
                    winTitle: 'Update Document',
                    childXtype: 'applicationDocUploadsFrm',
                    winWidth: '35%',
                    hidden:true,
                    handler: 'updateApplicationDocUploadWin',
                    stores: '[]',
                    bind: {
                       // hidden: '{isReadOnly}'  // false
                    }

                },  {
                    text: 'Preview Previous Version',
                    iconCls: 'x-fa fa-eye',
                    storeId: 'previousDocumentsUploads',
                    childXtype: 'previousDocumentVersionsGrid',
                    winTitle: 'Document Previous Versions',
                    winWidth: '70%',
                    hidden:true,
                    handler: 'previewPreviousUploadedDocument',
                    bind: {
                        //hidden: '{isReadOnly}'  // false
                    }
                }]
            }
        }
    }]
});
