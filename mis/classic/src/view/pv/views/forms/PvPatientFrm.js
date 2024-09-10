Ext.define('Admin.view.pv.views.forms.PvPatientFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvpatientFrm',
    controller: 'pvvctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        allowBlank: true,
        labelAlign: 'top'
    },
    scrollable: true,
    items: [{
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: 'table_name',
            value: 'tra_pv_applications',
            allowBlank: true
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Patient Details',
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
            items:[ {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Product Type',
            name: 'adr_type_id',
            forceSelection: true,
            allowBlank:true,
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
                                table_name: 'par_adr_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                    patient_name = form.down('textfield[name=patient_name]'),
                    title_id = form.down('combo[name=title_id]'),
                    species = form.down('textfield[name=species]'),
                    breed = form.down('textfield[name=breed]'),
                    animal_status_id = form.down('combo[name=animal_status_id]'),
                    humanvet_contact_id = form.down('combo[name=humanvet_contact_id]'),
                    local_supplier = form.down('textfield[name=local_supplier]'),
                    device_operator_id = form.down('combo[name=device_operator_id]'),
                    software_version = form.down('textfield[name=software_version]'),
                    catalogue_number = form.down('textfield[name=catalogue_number]'),
                    serial_number = form.down('textfield[name=serial_number]'),
                    model_number = form.down('textfield[name=model_number]'),
                    device_location_id = form.down('combo[name=device_location_id]');

                    if(newVal == 4){ //vet
                      species.setVisible(true);
                      breed.setVisible(true);
                      animal_status_id.setVisible(true);
                      humanvet_contact_id.setVisible(true);
                      patient_name.setVisible(false);
                      title_id.setVisible(false); 
                      local_supplier.setVisible(false);
                      device_operator_id.setVisible(false);
                      software_version.setVisible(false);
                      catalogue_number.setVisible(false);
                      serial_number.setVisible(false);
                       model_number.setVisible(false);
                      device_location_id.setVisible(false);

                    }else{
                      patient_name.setVisible(true);
                      title_id.setVisible(true);
                    } 
                    if(newVal == 1){ //medicine
                      species.setVisible(false);
                      breed.setVisible(false);
                      animal_status_id.setVisible(false);
                      humanvet_contact_id.setVisible(false);
                      local_supplier.setVisible(false);
                      device_operator_id.setVisible(false);
                      software_version.setVisible(false);
                      catalogue_number.setVisible(false);
                      serial_number.setVisible(false);
                       model_number.setVisible(false);
                      device_location_id.setVisible(false);

                    }else if(newVal == 2){ //medical dev
                     local_supplier.setVisible(true);
                     device_operator_id.setVisible(true);
                     software_version.setVisible(true);
                     catalogue_number.setVisible(true);
                     serial_number.setVisible(true);
                     model_number.setVisible(true);
                     device_location_id.setVisible(true);
                      species.setVisible(false);
                      breed.setVisible(false);
                      animal_status_id.setVisible(false);
                      humanvet_contact_id.setVisible(false);
                    
                    }
                    else if(newVal == 3){ //vaccine 
                      species.setVisible(false);
                      breed.setVisible(false);
                      animal_status_id.setVisible(false);
                      humanvet_contact_id.setVisible(false);
                      local_supplier.setVisible(false);
                      device_operator_id.setVisible(false);
                      software_version.setVisible(false);
                      catalogue_number.setVisible(false);
                      serial_number.setVisible(false);
                      model_number.setVisible(false);
                      device_location_id.setVisible(false);
                    }
                }
            }
        },
          {
            xtype: 'textfield',
            fieldLabel: 'Patient Name/Initials',
            name: 'patient_name',
            allowBlank: true,
        },

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Patient Title',
            name: 'title_id',
            forceSelection: true,
            allowBlank: true,
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
                                table_name: 'par_titles'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Gender/Sex',
            name: 'gender_id',
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
                                table_name: 'par_gender'
                            }
                        }
                    },
                    isLoad: true
                },change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                    last_menstruation_date = form.down('datefield[name=last_menstruation_date]');
                    is_pregnant = form.down('combo[name=is_pregnant]');
                    is_lactating = form.down('combo[name=is_lactating]');
                
                    if(newVal == 2){ 
                      last_menstruation_date.setVisible(true);
                      is_pregnant.setVisible(true);
                      is_lactating.setVisible(true);
                     // breed.setVisible(true);

                    }else{
                        last_menstruation_date.setVisible(false);
                        is_pregnant.setVisible(false);
                        is_lactating.setVisible(false);

                    }
            }
        }
        },
         {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Operator of the device',
            name: 'device_operator_id',
             hidden:true,
            forceSelection: true,
            allowBlank: true,
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
                                table_name: 'par_device_operator'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'textfield',
            fieldLabel: 'Name of local supplier',
            name: 'local_supplier',
            hidden:true,
            allowBlank: true,
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Software Version(if Applicable)',
            name: 'software_version',
             hidden:true,
            allowBlank: true,
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Catalogue number',
            name: 'catalogue_number',
             hidden:true,
            allowBlank: true,
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Serial number',
            name: 'serial_number',
             hidden:true,
            allowBlank: true,
        },
        {
            xtype: 'textfield',
             hidden:true,
            fieldLabel: 'Model number',
            name: 'model_number',
            allowBlank: true,
        }, {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Current location of device',
            name: 'device_location_id',
            forceSelection: true,
            allowBlank: true,
            hidden:true,
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
                                table_name: 'par_current_device_location'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Animal Species',
            name: 'species',
            hidden:true,
            allowBlank: true,
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Animal Breed',
            name: 'breed',
            hidden:true,
            allowBlank: true,
        }, {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Animal Status',
            name: 'animal_status_id',
            forceSelection: true,
            allowBlank: true,
            hidden:true,
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
                                table_name: 'par_animal_status'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Contact with treated animal?',
            name: 'humanvet_contact_id',
            forceSelection: true,
            allowBlank: true,
            hidden:true,
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
                                table_name: 'par_humanvet_contacts'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
         {
            xtype: 'datefield',
            name: 'last_menstruation_date',
            fieldLabel: 'Date of last menstruation',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            hidden:true,
            maxValue: new Date(),
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
           },
            {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Is Patient Pregnant?',
            name: 'is_pregnant',
            forceSelection: true,
            hidden:true,
            allowBlank: true,
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
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Is Patient Lactating?',
            name: 'is_lactating',
            forceSelection: true,
            allowBlank: true,
            hidden:true,
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
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
            {
            xtype: 'datefield',
            name: 'date_of_birth',
            fieldLabel: 'Date of birth',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            maxValue: new Date(),
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
           },
            // {
            // xtype: 'numberfield',
            // fieldLabel: 'Age at onset of reaction',
            // name: 'patient_age',
            // allowBlank: true,
            // },

             {
                xtype:'fieldcontainer',
                fieldLabel: 'Age at onset of reaction',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[{
                        xtype: 'numberfield',
                        hideLabel: true,
                        fieldLabel: ' ',
                        name: 'patient_age',
                        allowBlank: true
                    },
                    {
                        xtype: 'combo',
                        name: 'patient_age_unit_id',
                        fieldLabel: " ",
                        queryMode: 'local',
                        hideLabel: true,
                        forceSelection: true,
                        allowBlank: true,
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                            beforerender: {
                                fn: 'setCompStore',
                                config: {
                                    pageSize: 100,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_age_units'
                                        }
                                    }
                                },
                                isLoad: true
                            }
                        }
                 }
                ]
            } ,
           {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Age group',
            name: 'age_group_id',
            forceSelection: true,
            allowBlank: true,
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
                                table_name: 'par_pv_age_groups'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Body weight (kg)',
            name: 'patient_weight',
            allowBlank: false,
        },
         {
            xtype: 'numberfield',
            fieldLabel: 'Body height (cm)',
            name: 'patient_height',
            allowBlank: true,
            listeners: {
                change: function (field, newValue, oldValue) {
                    var weightField = Ext.ComponentQuery.query('numberfield[name=patient_weight]')[0];
                    var heightField = Ext.ComponentQuery.query('numberfield[name=patient_height]')[0];
                    var bmiField = Ext.ComponentQuery.query('textfield[name=bmi]')[0];

                    var weight = weightField.getValue();
                    var height = heightField.getValue() / 100; 

                    if (weight && height) {
                        var bmi = weight / (height * height);

                        bmiField.setValue(bmi.toFixed(2)); 
                    } else {
                        bmiField.setValue('');
                    }
                }
            }
        },
         {
            xtype: 'textfield',
            fieldLabel: 'BMI',
            name: 'bmi',
            readOnly:true,
            allowBlank: true,
        }
        
         ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_pv_applications',
                    storeID: '',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvPatientDetails'
                }
            ]
        }
    ]
});