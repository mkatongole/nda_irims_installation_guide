Ext.define('Admin.view.pv.views.forms.PvSuspectedDrugFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvSuspectedDrugFrm',
    itemId: 'pvsuspectedgrugfrm',
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
    autoScroll: true,
    items: [{
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: 'table_name',
            value: 'tra_pv_suspected_drugs',
            allowBlank: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'is_other_drugs_used'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'pv_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'main_fieldset',
            title: 'Drug Details',
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
            xtype: 'combo', 
            anyMatch: true,
            fieldLabel: 'Report Category',
            name: 'report_category_id',
            forceSelection: true,
            readOnly: true,
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
                                table_name: 'par_adr_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Report Type',
            name: 'adr_type_id',
            forceSelection: true,
            readOnly: true,
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
                        model_no = form.down('textfield[name=model_no]'),
                        udi_no = form.down('textfield[name=udi_no]'),
                        device_operator = form.down('textfield[name=device_operator]'),
                       // dosage = form.down('textfield[name=dosage]'),
                        route_of_administration_id = form.down('combo[name=route_of_administration_id]');

                    if(newVal == 2){
                        model_no.setVisible(true);
                        udi_no.setVisible(true);
                        device_operator.setVisible(true);
                        //dosage.setVisible(true);
                        route_of_administration_id.setVisible(false);
                    }else{
                        model_no.setVisible(false);
                        udi_no.setVisible(false);
                        device_operator.setVisible(false);
                       // dosage.setVisible(false);
                        route_of_administration_id.setVisible(true);
                    }
                }
            }
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Drug Role',
            name: 'drug_role_id',
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
                                table_name: 'par_adr_drugrole'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
                xtype:'fieldcontainer',
                fieldLabel: 'Drug Name (WHODrug)',
                columnWidth: 1,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.33,
                    labelAlign: 'top'
                },
                items:[{
                        xtype: 'combo',
                        fieldLabel: 'Has WHODrug name?',
                        name: 'has_whodrug_name_id',
                        forceSelection: true,
                        allowBlank: false,
                        queryMode: 'local',
                        valueField: 'id',
                        value:1,
                        columnWidth: 0.33,
                        displayField: 'name',
                        listeners: {
                            beforerender: {
                                fn: 'setCompStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                        url: 'configurations/getConfigParamFromTable',
                                        extraParams: {
                                            table_name: 'par_confirmations'
                                        }
                                    }
                                },
                                isLoad: true
                            },
                            change:function(combo,value){
                                search_whodrug_name_btn=combo.up('form').down('button[name=search_whodrug_name]');
                                whodrug_level_id=combo.up('form').down('combo[name=whodrug_level_id]');
                                who_drug_name=combo.up('form').down('textfield[name=who_drug_name]');
                                if(value==2)
                                {
                                    search_whodrug_name_btn.setDisabled(true);
                                    whodrug_level_id.allowBlank = true;
                                    whodrug_level_id.setReadOnly(true);
                                    who_drug_name.allowBlank = true;
                                }
                                else{

                                    search_whodrug_name_btn.setDisabled(false);
                                    whodrug_level_id.allowBlank = false;
                                    whodrug_level_id.validate();
                                    whodrug_level_id.setReadOnly(false);
                                    who_drug_name.allowBlank = false;
                                    who_drug_name.validate();
                                }


                            }
                        }
                    },
                     {
                            xtype: 'combo', anyMatch: true,
                            fieldLabel: 'Who Drug Level',
                            name: 'whodrug_level_id',
                            columnWidth: 0.33,
                            allowBlank:false,
                            //hideLabel:true,
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
                                                table_name: 'par_pv_whodrug_levels'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            }
                },
                 {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                     columnWidth: 0.33,
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name',
                    //hideLabel:true,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'who_drug_name',
                            readOnly: true,
                            allowBlank:false,
                            columnWidth: 0.9
                        },
                    
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            name:'search_whodrug_name',
                            tooltip: 'Search WHODrug',
                            handler: 'showWHODugSelectionList',
                            winTitle: 'LTR Selection List',
                            winWidth: '90%'
                        }
                    ]
                }
                ]
            } ,
        
        {
            xtype: 'textfield',
            fieldLabel: 'Drug Name as Reported',
            name: 'brand_name',
            columnWidth:0.5,
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: 'MAH',
            columnWidth:0.5,
            name: 'mah_holder',
            allowBlank: true,
        },
       
        {
                xtype:'fieldcontainer',
                fieldLabel: 'Strength',
                columnWidth: 1,
                //hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[{
                        xtype: 'textfield',
                        fieldLabel: 'Strength',
                        hideLabel: true,
                        name: 'strength',
                        emptyText: 'e.g., 125mg/250mg | 30%/70%',
                        allowBlank: false,
                        listeners: {
                            render: function (field) {
                                Ext.create('Ext.tip.ToolTip', {
                                    target: field.getEl(),
                                    html: 'e.g., 125mg/250mg |30%/70%',
                                    trackMouse: true
                                });
                            }
                        }
                    },

                 {
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'SI Units',
                    name: 'si_unit_id',
                    hideLabel: true,
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
                                        table_name: 'par_si_units'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }]
                },

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Suspected Ingredient',
            name: 'suspected_ingredient_id',
            columnWidth:1,
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
                                table_name: 'par_adr_suspected_ingredients'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
         ]
        },

         {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Dosage information',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 0.33
            },
            layout: 'column',
            items:[
        //medical devices 
        {
            xtype: 'textfield',
            name: 'model_no',
            allowBlank: true,
            fieldLabel: 'Model Number',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'udi_no',
            allowBlank: true,
            fieldLabel: 'Unique Identifier(UDI) Number',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'device_operator',
            allowBlank: true,
            fieldLabel: 'Operator of Device(Healthcare Professional/Patient/Consumer)',
            hidden: true
        },
          {
                xtype:'fieldcontainer',
                fieldLabel: 'Dose',
                columnWidth: 0.33,
                //hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[ {
                        xtype: 'textfield',
                        name: 'dose_no',
                        hideLabel: true,
                        fieldLabel: 'Dose'
                    },
                    {
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'SI Units',
                    name: 'dose_unit_id',
                    hideLabel: true,
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
                                        table_name: 'par_si_units'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }]
                },
         {
            xtype: 'textfield',
            name: 'dose_interval',
            allowBlank:true,
            fieldLabel: 'Doses in Interval'
        },
        {
                xtype:'fieldcontainer',
                fieldLabel: 'Dosing Interval',
                columnWidth: 0.33,
                //hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[ {
                        xtype: 'textfield',
                        name: 'dose_unit_no',
                        hideLabel: true,
                        fieldLabel: 'Dose'
                    },
                    {
                    xtype: 'combo', anyMatch: true,
                    name: 'dose_interval_id',
                    hideLabel: true,
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
                                        table_name: 'par_age_units'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }]
                },
        {
            xtype: 'textfield',
            name: 'dosage',
            hidden:true,
            allowBlank:true,
            fieldLabel: 'Dosage'
        },{
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Dosage',
            name: 'dosage_form_id',
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
                                table_name: 'par_dosage_forms'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Route of Administration',
            name: 'route_of_administration_id',
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
                                table_name: 'par_route_of_administration'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

       

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Route of administration (EDQM Standard Terms)',
            name: 'edqm_route_of_administration_id',
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
                                table_name: 'par_edqm_routes_of_administration'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

       {
            xtype: 'textfield',
            name: 'batch_no',
            allowBlank:true,
            fieldLabel: 'Batch number'
        },
        {
                xtype:'fieldcontainer',
                fieldLabel: 'Start of administration',
                columnWidth: 0.33,
                hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[ {
                        xtype: 'datefield',
                        fieldLabel: 'Start of administration',
                        format: 'Y-m-d',
                        allowBlank:true,
                        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                        name: 'administration_start_date',
                        maxValue: new Date()
                    },
                    {
                        xtype: 'timefield',
                        fieldLabel:'Time',
                        labelAlign: 'top',
                        name: 'onset_time',
                        format: 'H:i',
                        allowBlank:true,
                        columnWidth: 0.4,
                        altFormats:'H:i',
                        increment: 1,
                        // minValue: '08:00', 
                        // maxValue: '17:00',
                
                    }]
                },{
                xtype:'fieldcontainer',
                fieldLabel: 'End date ',
                columnWidth: 0.33,
                hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[ {
                        xtype: 'datefield',
                        fieldLabel: 'End date ',
                        format: 'Y-m-d',
                        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                        name: 'end_date',
                        maxValue: new Date()
                    },
                    {
                        xtype: 'timefield',
                        fieldLabel:'Time',
                        labelAlign: 'top',
                        name: 'end_time',
                        format: 'H:i',
                        columnWidth: 0.4,
                        altFormats:'H:i',
                        increment: 1,
                        // minValue: '08:00', 
                        // maxValue: '17:00',
                
                    }]
            }]
        },

        {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Indication',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: true
            },
            layout: 'column',
            items:[
           {
                xtype:'fieldcontainer',
                fieldLabel: 'Indication (MedDRA)',
                columnWidth: 1,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[
                      {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'MedDRA Level',
                            name: 'indication_meddra_level_id',
                            forceSelection: true,
                            columnWidth: 0.5,
                            //hideLabel:true,
                            allowBlank:false,
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'name',
                            listeners: {
                                beforerender: {
                                    fn: 'setCompStore',
                                    config: {
                                        pageSize: 10000,
                                        proxy: {
                                            extraParams: {
                                                table_name: 'par_pv_medra_levels'
                                            }
                                        }
                                    },
                                    isLoad: true
                                },
                             change: function (cmbo, newVal) {
                                var form = cmbo.up('form'),
                                    indicationMedraStore = form.down('combo[name=indication_medra]').getStore(),
                                    filterObj = {meddra_level_id: newVal},
                                    filterStr = JSON.stringify(filterObj);
                                indicationMedraStore.removeAll();
                                indicationMedraStore.load({params: {filter: filterStr}});
                            }
                          
                        }
                     },
                  {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'Indication',
                            name: 'indication_medra',
                            forceSelection: true,
                            columnWidth: 0.5,
                            allowBlank:false,
                            //hideLabel:true,
                            queryMode: 'local',
                            valueField: 'name',
                            displayField: 'name',
                             listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 100,
                                        proxy: {
                                        url: 'configurations/getMedDRAtearm'
                                       }
                                    },
                                    isLoad: false
                                }
                         }
                       }
                    ]
                },
                {
                            xtype: 'textarea',
                            columnWidth: 1,
                            fieldLabel: 'Indication as reported by initial reporter',
                            name: 'indication',
                            allowBlank: true,
                }]
        },

          {
               xtype: 'fieldcontainer',
                columnWidth: 1,
                fieldLabel: 'Additional drug-related problems',
                layout: 'fit',
                items:[ {
                            xtype: 'tagfield',
                            anyMatch: true,
                            fieldLabel: 'Related Problem',
                            hideLabel: true,
                            columnWidth: 1,
                            name: 'adr_related_problems_id',
                            forceSelection: true,
                            filterPickList: true,
                            encodeSubmitValue: true,
                            queryMode: 'local',
                            valueField: 'id',
                            growMax: 100,
                            multiSelect: true,
                            allowBlank: true,
                            labelAlign: 'top',
                            displayField: 'name',
                            listeners: {
                                    beforerender: {
                                        fn: 'setCompStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                extraParams: {
                                                    table_name: 'par_adr_related_problems'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                }
            }]
         },

        

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Action taken',
            name: 'action_taken_id',
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
                                table_name: 'par_pv_action_taken'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Was a rechallenge performed?',
            name: 'rechallenge_id',
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
                                table_name: 'par_pv_assessment_confirmation'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                        rechallenge_reaction_id = form.down('combo[name=rechallenge_reaction_id]');

                    if(newVal == 1){
                        rechallenge_reaction_id.setVisible(true);
                    }else{
                        rechallenge_reaction_id.setVisible(false);
                    }
                }
            }
        },

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Did reaction recur on re-administration?',
            name: 'rechallenge_reaction_id',
            forceSelection: true,
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
                                table_name: 'par_pv_challenge_ractions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },


        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Was a Dechallenge performed?',
            name: 'dechallenge_id',
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
                                table_name: 'par_pv_assessment_confirmation'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                        dechallenge_reaction_id = form.down('combo[name=dechallenge_reaction_id]');

                    if(newVal == 1){
                        dechallenge_reaction_id.setVisible(true);
                    }else{
                        dechallenge_reaction_id.setVisible(false);
                    }
                }
            }
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Did reaction recur on re-administration?',
            name: 'dechallenge_reaction_id',
            forceSelection: true,
            queryMode: 'local',
            hidden:true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_pv_challenge_ractions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

       {
            xtype: 'htmleditor',
            fieldLabel: 'Additional information on drug',
            columnWidth: 1,
            name: 'remarks',
        }, 
        {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Vaccine information',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: true,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[
        {
            xtype: 'combo', anyMatch: true,
            name: 'vaccine_dose_no',
            fieldLabel: 'Dose number',
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
                                    table_name: 'par_vaccine_doses'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Expiry date',
            format: 'Y-m-d',
            allowBlank:true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'vaccine_expiry_date',
            maxValue: new Date()
        },

        {
            xtype: 'textfield',
            name: 'diluent_name',
            fieldLabel: 'Diluent name'
        },
        {
            xtype: 'textfield',
            name: 'diluent_batch_number',
            fieldLabel: 'Diluent batch number'
        },
         {
            xtype: 'combo', anyMatch: true,
            name: 'site_of_administration_id',
            fieldLabel: 'Site of administration',
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
                                    table_name: 'par_site_of_administration'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
        },
        {
            xtype: 'combo', anyMatch: true,
            name: 'vaccination_session_id',
            fieldLabel: 'Vaccination session',
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
                                    table_name: 'par_vaccination_sessions'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
             }
           ]
         },
         {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Time interval between administration and reaction onset',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: true
            },
            layout: 'column',
            items:[
        {
                xtype:'fieldcontainer',
                fieldLabel: 'First dose',
                columnWidth: 0.5,
                //hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[ {
                        xtype: 'textfield',
                        name: 'first_dose',
                        hideLabel: true,
                        fieldLabel: 'Dose'
                    },
                    {
                    xtype: 'combo', anyMatch: true,
                    name: 'first_dose_duration_id',
                    hideLabel: true,
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
                                        table_name: 'par_age_units'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }]
                },
                {
                xtype:'fieldcontainer',
                fieldLabel: 'Last dose',
                columnWidth: 0.5,
                //hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[ {
                        xtype: 'textfield',
                        name: 'last_dose',
                        hideLabel: true,
                        fieldLabel: 'Dose'
                    },
                    {
                    xtype: 'combo', anyMatch: true,
                    name: 'last_dose_duration_id',
                    hideLabel: true,
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
                                        table_name: 'par_age_units'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }]
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
                    table_name: 'tra_pv_suspected_drugs',
                    storeID: 'pvSuspectedDrugStr',
                    //formBind: true,
                    handler: 'doCreatePvWin',
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData'
                   
                }
            ]
        }
    ]
});