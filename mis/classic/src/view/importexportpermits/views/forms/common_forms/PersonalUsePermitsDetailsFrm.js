

Ext.define('Admin.view.importexportpermits.views.forms.common_forms.PersonalUsePermitsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'personalusepermitsdetailsfrm',
    itemId: 'importexportdetailsfrm',
    scrollable: true,
    layout: {
        type: 'column'
    },
    //autoScroll: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },

    items: [ {
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_importexport_applications'
    }, 
    {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'main_fieldset',
            title: 'Applicant Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[  {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: 'Applicant Name',
                bind: {
                    readOnly: '{isReadOnly}'
                }
            },{
                xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Email Address',
                bind: {
                    readOnly: '{isReadOnly}'
                }
            },{
                        xtype: 'combo',
                        fieldLabel: 'Country',
                        name: 'country_id',
                        //store: 'countriesstr',
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                        config: {
                                            pageSize: 10000,
                                            proxy: {
                                                 url: 'commonparam/getCommonParamFromTable',
                                                 extraParams: {
                                                 table_name: 'par_countries'
                                        }
                                       }
                                    },
                                isLoad: false
                            },
                            afterrender: function (cmbo) {
                                 var store = cmbo.getStore(),
                                 filterObj = {is_local: 1},
                                 filterStr = JSON.stringify(filterObj);
                                 store.removeAll();
                                 store.load({params: {filters: filterStr}});
                              },
                            change: function (cmbo, newVal) {
                                var form = cmbo.up('form'),
                                    districtStore = form.down('combo[name=district_id]').getStore(),
                                    filterObj = {country_id: newVal},
                                    filterStr = JSON.stringify(filterObj);
                                districtStore.removeAll();
                                districtStore.load({params: {filters: filterStr}});
                            }
                        }
                    },
                     {
                        xtype: 'combo',
                        fieldLabel: 'District',
                        name: 'district_id',
                        //store: 'regionsstr',
                        readOnly:false,
                        allowBlank:false,
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                                    beforerender: {
                                        fn: 'setParamCombosStore',
                                        config: {
                                            pageSize: 10000,
                                            proxy: {
                                                 url: 'commonparam/getCommonParamFromTable',
                                                 extraParams: {
                                                 table_name: 'par_premise_districts'
                                        }
                                       }
                                    },
                                        isLoad: false
                            },
                            change: function (cmbo, newVal) {
                                var form = cmbo.up('form'),
                                regionStore = form.down('combo[name=region_id]').getStore(),
                                countyStore = form.down('combo[name=county_id]').getStore(),
                                filterObj = {district_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                                regionStore.removeAll();
                                regionStore.load({params: {filters: filterStr}});
                                countyStore.removeAll();
                                countyStore.load({params: {filters: filterStr}});
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
                        xtype: 'combo',
                        fieldLabel: 'Region',
                        name: 'region_id',
                        //store: 'regionsstr',
                        readOnly:false,
                        allowBlank:false,
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                                    beforerender: {
                                        fn: 'setParamCombosStore',
                                        config: {
                                            pageSize: 10000,
                                            proxy: {
                                                 url: 'commonparam/getCommonParamFromTable',
                                                 extraParams: {
                                                 table_name: 'par_premise_regions'
                                        }
                                       }
                                    },
                                 isLoad: false
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
                        xtype: 'combo',
                        fieldLabel: 'County/Division',
                        name: 'county_id',
                        readOnly:false,
                        allowBlank:true,
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                                    beforerender: {
                                        fn: 'setParamCombosStore',
                                        config: {
                                            pageSize: 10000,
                                            proxy: {
                                                 url: 'commonparam/getCommonParamFromTable',
                                                 extraParams: {
                                                 table_name: 'par_county'
                                        }
                                       }
                                    },
                                 isLoad: false
                            },
                            change: function (cmbo, newVal) {
                                var form = cmbo.up('form'),
                                subCountyStore = form.down('combo[name=sub_county_id]').getStore(),
                                filterObj = {county_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                                subCountyStore.removeAll();
                                subCountyStore.load({params: {filters: filterStr}});
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
                        xtype: 'combo',
                        fieldLabel: 'Sub County',
                        name: 'sub_county_id',
                        readOnly:false,
                        allowBlank:true,
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                                    beforerender: {
                                        fn: 'setParamCombosStore',
                                        config: {
                                            pageSize: 10000,
                                            proxy: {
                                                 url: 'commonparam/getCommonParamFromTable',
                                                 extraParams: {
                                                 table_name: 'par_sub_county'
                                        }
                                       }
                                    },
                                 isLoad: false
                            },
                            change: function (cmbo, newVal) {
                                var form = cmbo.up('form'),
                                parishStore = form.down('combo[name=parish_id]').getStore(),
                                filterObj = {sub_county_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                                parishStore.removeAll();
                                parishStore.load({params: {filters: filterStr}});
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
                        xtype: 'combo',
                        fieldLabel: 'Parish',
                        name: 'parish_id',
                        readOnly:false,
                        allowBlank:true,
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                                    beforerender: {
                                        fn: 'setParamCombosStore',
                                        config: {
                                            pageSize: 10000,
                                            proxy: {
                                                 url: 'commonparam/getCommonParamFromTable',
                                                 extraParams: {
                                                 table_name: 'par_parishes'
                                        }
                                       }
                                    },
                                 isLoad: false
                            },
                             change: function (cmbo, newVal) {
                                var form = cmbo.up('form'),
                                villageStore = form.down('combo[name=village]').getStore(),
                                filterObj = {parish_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                                villageStore.removeAll();
                                villageStore.load({params: {filters: filterStr}});
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
                        xtype: 'combo',
                        fieldLabel: 'Village',
                        name: 'village',
                        readOnly:false,
                        allowBlank:true,
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                                    beforerender: {
                                        fn: 'setParamCombosStore',
                                        config: {
                                            pageSize: 10000,
                                            proxy: {
                                                 url: 'commonparam/getCommonParamFromTable',
                                                 extraParams: {
                                                 table_name: 'par_villages'
                                        }
                                       }
                                    },
                                 isLoad: false
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
                        xtype: 'fieldcontainer',
                        layout: 'column',
                        columnWidth: 0.5,
                        defaults: {
                            labelAlign: 'top'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'tpin_no',
                                columnWidth: 0.9,
                                 allowBlank: true,
                                fieldLabel: 'Tin No'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-search',
                                disabled: true,
                                columnWidth: 0.1,
                                tooltip: 'Search',
                                disabled:true,
                                action: 'search_tinno',
                                childXtype: 'tinnoeselectiongrid',
                                winTitle: 'Tin No Selection List',
                                winWidth: '90%',
                                margin: '30 0 0 0'
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        columnWidth: 0.5,
                        name: 'telephone_no',
                         allowBlank:true,
                        fieldLabel: 'Telephone No'
                    },
                   {
                        xtype: 'textarea',
                        columnWidth: 1,
                        name: 'street',
                         allowBlank:false,
                        fieldLabel: 'Street/Road'
                    },

                    {
                        xtype: 'textarea',
                        fieldLabel: 'Physical Address',
                        columnWidth: 1,
                        allowBlank:false,
                        name: 'physical_address'
            }
           

            ]
          },
          {
                xtype:'fieldset',
                columnWidth: 1,
                title: "Application Details",
                collapsible: true,
                defaults: {
                    labelAlign: 'top',
                    allowBlank: false,
                    labelAlign: 'top',
                    margin: 5,
                    xtype: 'textfield',
                    allowBlank: false,
                    columnWidth: 0.33,
                },
                layout: 'column',
                items:[{
                    xtype: 'combo',
                    fieldLabel: 'Application Type',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'application_type_id',
                    queryMode: 'local',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosSectionfilterStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_personalisedpermit_type',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'Access Category',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'has_medical_prescription',
                    queryMode: 'local',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosSectionfilterStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_prescription_options',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        },
                            change: function(combo, newVal, oldValue, eopts) {
                                if(newVal == 1){
                                    var form = combo.up('form'),
                                    prescribling_hospital = form.down('textfield[name=prescribling_hospital]');
                                    prescribling_hospital.setVisible(true);
                                    prescribling_hospital.allowBlank = false;
                                    prescribling_hospital.validate();


                                    var form = combo.up('form'),
                                    hospital_address = form.down('textfield[name=hospital_address]');
                                    hospital_address.setVisible(true);
                                    hospital_address.allowBlank = false;
                                    hospital_address.validate();


                                    var form = combo.up('form'),
                                    prescribing_doctor = form.down('textfield[name=prescribing_doctor]');
                                    prescribing_doctor.setVisible(true);
                                    prescribing_doctor.allowBlank = false;
                                    prescribing_doctor.validate();
                                }else{
                                    var form = combo.up('form'),

                                    prescribling_hospital = form.down('textfield[name=prescribling_hospital]');
                                    prescribling_hospital.setVisible(false);
                                    prescribling_hospital.allowBlank = true;
                                    prescribling_hospital.validate();


                                    var form = combo.up('form'),
                                    hospital_address = form.down('textfield[name=hospital_address]');
                                    hospital_address.setVisible(false);
                                    hospital_address.allowBlank = true;
                                    hospital_address.validate();


                                    var form = combo.up('form'),
                                    prescribing_doctor = form.down('textfield[name=prescribing_doctor]');
                                    prescribing_doctor.setVisible(false);
                                    prescribing_doctor.allowBlank = true;
                                    prescribing_doctor.validate();
                                   
                                }
                                
                            }
                    }
                },{
                    xtype: 'textfield',
                    name: 'prescribling_hospital',
                    allowBlank: true,
                    hidden:true,
                    fieldLabel: 'Name of Hospital/Health Center',
                    bind: {
                        readOnly: '{isReadOnly}'
                    }
                },  {
                    xtype: 'textfield',
                    name: 'hospital_address',
                    allowBlank: true,
                    hidden:true,
                    fieldLabel: 'Physcal Address of Hospital/Health Center',
                    bind: {
                        readOnly: '{isReadOnly}'
                    }
                }, {
                    xtype: 'textfield',
                    name: 'prescribing_doctor',
                    allowBlank: true,
                    hidden:true,
                    fieldLabel: 'Name of Practitioner',
                    bind: {
                        readOnly: '{isReadOnly}'
                    }
                }, ,{
                    xtype: 'combo',
                    fieldLabel: 'Mode of Transport',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'mode_oftransport_id',
                    queryMode: 'local',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosSectionfilterStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
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
                                filterObj = {mode_oftransport_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                                portStore.removeAll();
                                portStore.load({params: {filters: filterStr}});
                            }
                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'Port Of Entry/Exit',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'port_id',
                    queryMode: 'local',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosSectionfilterStore',
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
                    } ,
                    {
                    xtype: 'textfield',
                    allowBlank: true,
                    name: 'proforma_invoice_no',bind: {
                        readOnly: '{isReadOnly}'
                    },
                    fieldLabel: 'Proform Invoice No',
                }, {
                    xtype: 'datefield',
                    name: 'proforma_invoice_date',bind: {
                        readOnly: '{isReadOnly}'
                    },allowBlank: true,
                    format:'Y-m-d',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                    fieldLabel: 'Proform Invoice Date',
                },{
                    xtype: 'combo',
                    fieldLabel: 'Invoice Currency',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'proforma_currency_id',
                    queryMode: 'local',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosSectionfilterStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_currencies',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        }
                     }
                    } ,{
                    xtype: 'textfield',
                    allowBlank: true,
                    name: 'air_bill_no',bind: {
                        readOnly: '{isReadOnly}'
                    },
                    fieldLabel: 'Airway Bill/ BOL No',
                 }, {
                    xtype: 'combo',
                    fieldLabel: 'Country of Origin',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'product_origin_id',
                    queryMode: 'local',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosSectionfilterStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_countries',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        }
                     }
                    } ]
        },
          {
                xtype:'fieldset',
                columnWidth: 1,
                title: "Patient Details",
                collapsible: true,
                defaults: {
                    labelAlign: 'top',
                    allowBlank: false,
                    labelAlign: 'top',
                    margin: 5,
                    xtype: 'textfield',
                    allowBlank: false,
                    columnWidth: 0.33,
                },
                layout: 'column',
                  items:[

                   {
                        xtype: 'combo',
                        fieldLabel: 'Is application done by the importer or on behalf of the importer?',
                        name: 'applicant_contact_id',
                        columnWidth: 1,
                        allowBlank: false,
                        valueField: 'id',
                        displayField: 'name',
                        forceSelection: true,
                        queryMode: 'local',
                        emptyText: 'Select',
                        listeners: {
                            beforerender: {
                                fn: 'setConfigCombosStore',
                                config: {
                                    pageSize: 1000,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_consignee_options'
                                        }
                                    }
                                },
                                isLoad: true
                            },
                            change: function(combo, newVal, oldValue, eopts) {
                                 var form = combo.up('form'),
                                  patients_fullnames = form.down('textfield[name=patients_fullnames]');
                                  patients_email_address = form.down('textfield[name=patients_email_address]');
                                  patientsdistrict_id = form.down('textfield[name=patientsdistrict_id]');
                                  patients_phone_no = form.down('textfield[name=patients_phone_no]');
                                  patientscountry_id = form.down('textfield[name=patientscountry_id]');
                                  patientsregion_id = form.down('textfield[name=patientsregion_id]');
                                  patients_physical_address = form.down('textarea[name=patients_physical_address]');
                                  patient_tpin_no = form.down('textfield[name=patient_tpin_no]');
                                if(newVal == 2){
                                    patients_fullnames.allowBlank = false;
                                    patients_fullnames.validate();
                                    patients_fullnames.setVisible(true);
                                    patients_phone_no.allowBlank = false;
                                    patients_phone_no.validate();
                                    patients_phone_no.setVisible(true);
                                    patients_email_address.setVisible(true);
                                    patientscountry_id.setVisible(true);
                                    patientsregion_id.setVisible(true);
                                    patientsdistrict_id.setVisible(true);
                                    patients_physical_address.allowBlank = false;
                                    patients_physical_address.validate();
                                    patients_physical_address.setVisible(true);
                                    patient_tpin_no.setVisible(true);
                                }else{
                                    patients_fullnames.allowBlank = true;
                                    patients_fullnames.setVisible(false);
                                    patients_phone_no.allowBlank = true;
                                    patients_phone_no.setVisible(false);
                                    patients_email_address.setVisible(false);
                                    patientscountry_id.setVisible(false);
                                    patientsregion_id.setVisible(false);
                                    patientsdistrict_id.setVisible(false);
                                    patients_physical_address.allowBlank = true;
                                    patients_physical_address.setVisible(false);
                                    patient_tpin_no.setVisible(false);
                                }
                                
                            }
                           
                        }
                    },


             {
                xtype: 'textfield',
                name: 'patients_fullnames',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Patient/Persons Full Names'
            },
             {
                xtype: 'textfield',
                name: 'patients_phone_no',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Patient/Persons Phone No'
            },
             {
                xtype: 'textfield',
                name: 'patients_email_address',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Patient/Persons Email'
            },

              {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    name: 'patientscountry_id',
                    allowBlank: true,
                    hidden:true,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/country'
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmbo, newVal) {
                            var form = cmbo.up('form'),
                                regionStore = form.down('combo[name=patientsregion_id]').getStore(),
                                filterObj = {country_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                            regionStore.removeAll();
                            regionStore.load({params: {filters: filterStr}});
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Region',
                    name: 'patientsregion_id',
                    //store: 'regionsstr',
                    hidden:true,
                    allowBlank:true,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/region'
                                }
                            },
                            isLoad: false
                        },
                        change: function (cmbo, newVal) {
                            var form = cmbo.up('form'),
                                districtStore = form.down('combo[name=patientsdistrict_id]').getStore(),
                                filterObj = {region_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                            districtStore.removeAll();
                            districtStore.load({params: {filters: filterStr}});
                        }
                    }
                },
                
                {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'patientsdistrict_id',
                //store: 'regionsstr',
                hidden:true,
                readOnly:false,
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_districts'
                                }
                               }
                            },
                                isLoad: false
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
                xtype: 'textarea',
                name: 'patients_physical_address',
                allowBlank:true,
                hidden:true,
                columnWidth:1,
                fieldLabel: 'Patient/Persons Physical Address'
            },{
                xtype: 'textfield',
                name: 'patient_tpin_no',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'TIN'
            }
            ]
            },
            {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Inspection Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.5,
            },
            layout: 'column',
            items:[{
                xtype:'datefield',allowBlank: true,
                fieldLabel:'Date of Inspection',
                submitFormat: 'Y-m-d',
                value: new Date(),
                labelAlign: 'top',
                maxValue: new Date(),
                //readOnly:true,
                format: 'd/m/Y',
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                name: 'inspected_on'
            } ,

            {
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                labelAlign: 'top',
                displayField: 'name',
                allowBlank: true,
                fieldLabel: 'Inspection Recommendation',
                name: 'inspection_recommendation_id',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosSectionfilterStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getNonrefParameter',
                                extraParams: {
                                    table_name: 'par_poeinspection_recommendation',
                                    has_filter: 0
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }, 
            {
                xtype: 'textarea',
                fieldLabel: 'Inspection Remarks',
                name: 'remarks',
                labelAlign: 'top',
                columnWidth: 0.99,
                allowBlank: true
            }
           ]

     }
    ]
});