 Ext.define('Admin.view.frontoffice.safetyreporting.grids.SrSpreadSheetView', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    width: '100%',
    xtype: 'srspreadsheetview',
    layout: 'fit',
    store: 'srsapplicationsstr',
    title: 'Sr Application SpreadSheet',
    referenceHolder: true,
    reference:'srgridpanel',
    plugins: [
        {
            ptype: 'filterfield'
        }],
    listeners: {
            beforerender: 'funcReloadspreadSheetStrs',
            },
            viewConfig: {
                emptyText: 'No Applications found under this criteria'
            },
        columns: [ {
        text: 'Action',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            ui: 'gray',
            iconCls: 'x-fa fa-th-list',
            textAlign: 'left',
            xtype: 'splitbutton',
            menu: {
            xtype: 'menu',
            items: [{
                text: 'Documents',
                iconCls: 'x-fa fa-edit',
                tooltip: 'View Documents',
                handler: 'func_viewUploadedDocs'
                }]
            }
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'adr_category',
        name: 'adr_category',
        text: 'ADR Category',
        width: 100,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'adr_category_id',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_adr_categories'
                                    } 
                                }
                            },
                            isLoad: true,
                        },
                        change: function(cmb, newValue, oldValue, eopts) {
                            var grid = cmb.up('grid');
                                grid.getStore().reload();
                         }
                 }
                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        name: 'tracking_no',
        text: 'Tracking No',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference No',
        hidden: true,
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'reporter_grid',
        name: 'reporter_grid',
        text: 'Reporter(s)',
        width: 400,
        tdCls: 'wrap',
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'medical_study_grid',
        name: 'medical_study_grid',
        tdCls: 'wrap',
        text: 'Medical Study',
        width: 400,
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'drug_history_grid',
        name: 'drug_history_grid',
        tdCls: 'wrap',
        text: 'Drug History',
        width: 400,
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'medical_history_grid',
        name: 'medical_history_grid',
        tdCls: 'wrap',
        text: 'Medical History',
        width: 400,
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'suspected_drug_grid',
        name: 'suspected_drug_grid',
        tdCls: 'wrap',
        text: 'Suspected Drug',
        width: 400,
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'tests_procedure_grid',
        name: 'tests_procedure_grid',
        tdCls: 'wrap',
        text: 'Tests & Procedures',
        width: 400,
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'patient_name',
        name: 'patient_name',
        text: 'Patient',
        width: 200,
        filter: {
            xtype: 'textfield',
        }
    }, 
    {
        xtype:'gridcolumn',
        dataIndex: 'gender_name',
        name: 'gender_name',
        text: 'Gender',
        hidden: true,
        width: 200,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'patient_gender_id',
            listeners: {
                beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                             extraParams: {
                                table_name: 'par_gender'
                            }   
                        }
                    },
                    isLoad: true,
                },
                change: function(cmb, newValue, oldValue, eopts) {
                    var grid = cmb.up('grid');
                        grid.getStore().reload();
                 }
            }
        }
    },
    {
        xtype: 'datecolumn',
        dataIndex: 'date_of_birth',
        name: 'date_of_birth',
        format: 'Y-m-d',
        text: 'Date of Birth',
        width: 210, 
        hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    }, 
    {
        xtype:'gridcolumn',
        dataIndex: 'patient_age',
        name: 'patient_age',
        text: 'Patient Age',
        width: 100,
    },
    {
        xtype:'gridcolumn',
        dataIndex: 'age_group_name',
        name: 'age_group_name',
        text: 'Age Group',
        hidden: true,
        width: 200,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'age_group_id',
            listeners: {
                beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                             extraParams: {
                                table_name: 'par_pv_age_groups'
                            }   
                        }
                    },
                    isLoad: true,
                },
                change: function(cmb, newValue, oldValue, eopts) {
                    var grid = cmb.up('grid');
                        grid.getStore().reload();
                 }
            }
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'patient_weight',
        name: 'patient_weight',
        text: 'Patient Weight',
        width: 200,
        filter: {
            xtype: 'numberfield',
        }
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'patient_height',
        name: 'patient_height',
        text: 'Patient Height',
        width: 200,
        filter: {
            xtype: 'numberfield',
        }
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'bmi',
        name: 'bmi',
        text: 'BMI',
        width: 200,
        filter: {
            xtype: 'numberfield',
        }
    }, 
    {
        xtype:'gridcolumn',
        dataIndex: 'sourceofpsur_name',
        name: 'sourceofpsur_name',
        text: 'Source of Psur',
        width: 200,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'sourceofpsur_id',
            listeners: {
                beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                             extraParams: {
                                table_name: 'par_sourcesofsafety_alerts'
                            }   
                        }
                    },
                    isLoad: true,
                },
                change: function(cmb, newValue, oldValue, eopts) {
                    var grid = cmb.up('grid');
                        grid.getStore().reload();
                 }
            }
        }
    },
    {
        xtype:'gridcolumn',
        dataIndex: 'adr_report_type',
        name: 'adr_report_type',
        text: 'Report Type',
        width: 200,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'adr_report_type_id',
            listeners: {
                beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                             extraParams: {
                                table_name: 'par_adr_report_types'
                            }   
                        }
                    },
                    isLoad: true,
                },
                change: function(cmb, newValue, oldValue, eopts) {
                    var grid = cmb.up('grid');
                        grid.getStore().reload();
                 }
            }
        }
    },
    {
        xtype:'gridcolumn',
        dataIndex: 'adr_reporter_category',
        name: 'adr_reporter_category',
        text: 'Report Category',
        width: 200,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'adr_reporter_category_id',
            listeners: {
                beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                             extraParams: {
                                table_name: 'par_adr_reporters_categories',
                            }   
                        }
                    },
                    isLoad: true,
                },
                change: function(cmb, newValue, oldValue, eopts) {
                    var grid = cmb.up('grid');
                        grid.getStore().reload();
                 }
            }
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        name: 'email_address',
        text: 'Email',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        name: 'telephone_no',
        text: 'Telephone No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
    {
        xtype: 'datecolumn',
        dataIndex: 'initial_receive_date',
        name: 'initial_receive_date',
        format: 'Y-m-d',
        text: 'NDA Receive Date',
        width: 210, 
        hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    }, 
    {
        xtype: 'datecolumn',
        dataIndex: 'report_date',
        name: 'report_date',
        format: 'Y-m-d',
        text: 'Report Date',
        width: 210, 
        hidden: true,
        filter: {
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    }, 
    {
        xtype: 'datecolumn',
        dataIndex: 'ReceivedFrom',
        name: 'ReceivedFrom',
        format: 'Y-m-d',
        text: 'Received From',
        width: 210, 
        hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    }, 
    {
        xtype: 'datecolumn',
        dataIndex: 'ReceivedTo',
        name: 'ReceivedTo',
         format: 'Y-m-d',
        text: 'Received To',
        width: 210, 
        hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        name: 'application_status',
        text: 'Application Status',
        width: 200,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'application_status',
                    listeners:
                     {
                         afterrender: {
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_system_statuses'
                                    }
                                }
                            },
                           isLoad: true
                        },
                                   
                     
                     change: function(cmb, newValue, oldValue, eopts) {
                        var grid = cmb.up('grid');
                            grid.getStore().reload();
                     }
                 }                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approval_recommendation',
        name: 'approval_recommendation',
        text: 'Approval Recommendation',
        hidden: true,
        width: 200,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'approval_recommendation',
                    listeners:
                     {
                         afterrender: {
                            //getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_srapproval_decisions'
                                    }
                                }
                            },
                           isLoad: true
                        },
                                   
                     
                     change: function(cmb, newValue, oldValue, eopts) {
                        var grid = cmb.up('grid');
                            grid.getStore().reload();
                     }
                 }                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'validity_status',
        name: 'validity_status',
        text: 'Validity Status',
        hidden:true,
        width: 200,
        filter: {
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'validity_status',
                listeners:
                    {
                        afterrender: {
                        //getConfigParamFromTable
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                    table_name: 'par_validity_statuses'
                                }
                            }
                        },
                        isLoad: true
                    },   
                change: function(cmb, newValue, oldValue, eopts) {
                var grid = cmb.up('grid');
                    grid.getStore().reload();
                }
            }                
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'is_reporter_notified',
        name: 'is_reporter_notified',
        text: 'Is Feedback Shared?',
        width: 200,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Yes";
            }
            metaData.tdStyle = 'color:white;background-color:gray';
            return "Pending";
        },
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'is_reporter_notified',
            store: {
                fields: ['id', 'name'],
                data: [
                    {id: 1, name: 'Yes'},
                    {id: 2, name: 'Pending'}
                ]
            },
            listeners: {
                change: function (cmb, newValue, oldValue, eOpts) {
                    var grid = cmb.up('grid');
                    grid.getStore().reload();
                }
            }
        }
    }
    
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'srsapplicationsstr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function () {
                var store = this.getStore()
                    range = this.down('combo[name=Range]').getValue()
                    var grid=this.up('grid')
                    adr_category=grid.down('combo[name=adr_category_id]').getValue()
                    patient_gender_id=grid.down('combo[name=patient_gender_id]').getValue()
                    age_group_id=grid.down('combo[name=age_group_id]').getValue()
                    sourceofpsur_id=grid.down('combo[name=sourceofpsur_id]').getValue()
                    adr_report_type_id=grid.down('combo[name=adr_report_type_id]').getValue()
                    adr_reporter_category_id=grid.down('combo[name=adr_reporter_category_id]').getValue()
                    application_status=grid.down('combo[name=application_status]').getValue()
                    approval_recommendation=grid.down('combo[name=approval_recommendation]').getValue()
                    validity_status=grid.down('combo[name=validity_status]').getValue()
                    is_reporter_notified=grid.down('combo[name=is_reporter_notified]').getValue()

                //acquire original filters
                var filter = {'t1.section_id':sr_sectionid};
                var   filters = JSON.stringify(filter);

              //pass to store
                store.getProxy().extraParams = {
                    pageSize:range,
                    adr_category_id: adr_category,
                    patient_gender_id:patient_gender_id,
                    age_group_id:age_group_id,
                    sourceofpsur_id:sourceofpsur_id,
                    adr_report_type_id:adr_report_type_id,
                    adr_reporter_category_id:adr_reporter_category_id,
                    is_reporter_notified: is_reporter_notified,
                    validity_status: validity_status,
                    application_status: application_status,
                    approval_recommendation: approval_recommendation,
                    filters: filters
                    };
                },
            items:[
                {
                 xtype: 'combobox',
                 forceSelection: true,
                 fieldLabel: 'Range',
                 displayField: 'size',
                 valueField: 'size',
                 name: 'Range',
                 queryMode: 'local',
                 value: 25,
                 
                listeners:{
                    afterrender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_page_sizes'
                                }
                            }
                        },
                        isLoad: true
                        },
                    select: 'setPageSize'
                }
                }
        ]
    }],
     listeners:{
       select: 'loadadditionalinfo',
         }
});