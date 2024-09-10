

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.DeclaredOnlineImportExportDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'declaredonlineimportexportdetailsfrm',
    itemId: 'importexportdetailsfrm',
    layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.33,
        labelAlign: 'top',
        allowBlank: false,
        
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
    },{ 
        xtype: 'combo',
        fieldLabel: 'Application Process',
        readOnly: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule',
                            module_id: 4
                        }
                    }
                },
                isLoad: true
            }
        }
    }, { 
        xtype: 'combo',
        fieldLabel: 'Declaration Type',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'td_application_type_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_vc_application_type',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, { 
        xtype: 'combo',
        fieldLabel: 'Shipment Category',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'shipment_category_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_importshipment_category',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Shipment Mode',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        name: 'mode_oftransport_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_modesof_transport',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var form = cmbo.up('form'),
                    portStore = form.down('combo[name=port_id]').getStore(),
                    filterObj = { mode_oftransport_id: newVal },
                    filterStr = JSON.stringify(filterObj);
                portStore.removeAll();
                portStore.load({ params: { filters: filterStr } });
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Port Of Entry/Exit',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        name: 'port_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getPortOfEntry',
                        extraParams: {
                            table_name: 'par_ports_information',
                            has_filter: 0
                        }
                    }
                },
                isLoad: false
            }
        }
    }, {
        xtype: 'datefield',
        name: 'shipment_date',
        format: 'Y-m-d',
        allowBlank: false,
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Estimated Date/Time of Arrival/Exit',
    }, {
        xtype: 'combo',
        fieldLabel: 'Transport Document',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'transport_document_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_importtransport_documents',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'textfield',
        allowBlank: false,
        name: 'transport_document_number',
        fieldLabel: 'Transport Document No.',
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        width: 320,
        items: [{
            xtype: 'combo',
            fieldLabel: 'Clearing Agent',
            labelWidth: 80,
            columnWidth: 0.9,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            labelAlign: 'top',
            name: 'clearing_agent_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 1000,
                        storeId: 'clearingagentsStr',
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'tra_importclearingagent_data',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'button',
            text: 'Add',
            width: '50px',
            disabled: true,
            iconCls: 'x-fa fa-plus',
            columnWidth: 0.082,
            form: 'clearingAgentfrm',
            title: 'Add Agent',
            handler: 'showAddFormWin'
        }]
    }, {
        xtype: 'textfield',
        allowBlank: false,
        name: 'commercial_invoice_number',
        fieldLabel: 'Commercial Invoice No',
    }, {
        xtype: 'datefield',
        name: 'commercial_invoice_date',
        format: 'Y-m-d',
        allowBlank: false,
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Commercial Invoice Date',
    }, {
        xtype: 'textfield',
        allowBlank: false,
        name: 'pack_list_number',
        fieldLabel: 'Packing List No',
    }]
});
