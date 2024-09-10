/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialdetailsfrm',
    layout: 'column',
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },autoScroll: true,
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
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Identification of the Clinical Trial',
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
            xtype: 'textarea',
            grow: true, 
            growMax: 200, 
            fieldLabel: 'Study Title',
            name: 'study_title',
            columnWidth: 1
        },{
            xtype: 'textfield',
            fieldLabel: 'Title – short version',
            name: 'short_study_title',
            allowBlank:true,
          
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            allowBlank:true,
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
        }, {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            allowBlank:false,
            fieldLabel: 'Clinical Trial Fields Types',
            name: 'clincialtrialfields_type_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clincialtrialfields_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'textfield',
            allowBlank:true,
            fieldLabel: 'Protocol No',
            name: 'protocol_no'
        },{
            xtype: 'datefield',
            fieldLabel: 'Date of Protocol',
            name: 'date_of_protocol',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            allowBlank:false,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        
        
        {
            xtype: 'textfield',
            fieldLabel: 'Version No',
            allowBlank:false,
            name: 'version_no'
        }, {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            allowBlank:true,
            fieldLabel: 'Invetigational Product Type',
            name: 'clinical_prodsection_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_investigationalproduct_type'
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
            columnWidth: 0.66,
            defaults: {
                labelAlign: 'top',
                columnWidth: 0.5,
            },
            items: [{
                xtype: 'textfield',
                allowBlank:true,
                fieldLabel: 'Clinical Trials Registry Number  ',
                name: 'clinicaltrial_identification_no'
            },{
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                allowBlank:true,
                displayField: 'name',
                fieldLabel: 'Trial Registry',
                name: 'clinicaltrial_registry_id',
                listeners: {
                    beforerender: {
                        fn: 'setClinicalTrialCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_clinicaltrial_registries'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }]
        }
      ]
    },

    {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Participants',
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
            xtype: 'textfield',
            allowBlank:false,
            fieldLabel: 'Total number of Participants to be enrolled in Uganda',
            name: 'enrolled_uganda_no',
          
        },{
            xtype: 'textfield',
            allowBlank:false,
            fieldLabel: 'Total number of Participants to be enrolled, worldwide',
            name: 'enrolled_worldwide_no',
          
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Numbers of Participants',
            allowBlank:true,
            hidden:true,
            name: 'participant_no',
          
        },
        
         {
            xtype: 'textfield',
            allowBlank:false,
            fieldLabel: 'Number of trial sites in Uganda',
            name: 'sites_no',
          
        },
        {
            xtype: 'textfield',
            columnWidth: 1,
            allowBlank:false,
            fieldLabel: 'Intended numbers of participants at each site - evidence of availability',
            name: 'intended_no',
          
        },{
            xtype: 'datefield',
            fieldLabel: 'Expected Study Start Date',
            allowBlank:false,
            name: 'study_start_date',
            submitFormat: 'Y-m-d',
            
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'textfield',
            allowBlank:false,
            fieldLabel: 'First enrolment to Final Report (Year)',
            name: 'first_final_duration',
          
        },

        {
            xtype: 'textfield',
            fieldLabel: 'Individual Participants Screening period (Days)',
            name: 'screening_period',
          
        },

        {
            xtype: 'fieldcontainer',
            layout: 'column', columnWidth: 0.33,
           
            defaults: {
                labelAlign: 'top',
                columnWidth: 0.5,
            },
            items: [{
                xtype: 'numberfield',
                 allowBlank:true,
                fieldLabel: 'Individual Participants Follow-up period',
                name: 'follow_up_period',
                minValue: 1
            },
            {
                xtype: 'combo',
                name: 'follow_up_duration',
                allowBlank: false,
                 allowBlank:true,
                fieldLabel: 'Follow-up Duration Description',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setClinicalTrialCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                extraParams: {
                                    model_name: 'DurationDescription'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }]
        },

        {
            xtype: 'fieldcontainer',
            layout: 'column', columnWidth: 0.33,
           
            defaults: {
                labelAlign: 'top',
                columnWidth: 0.5,
            },
            items: [{
                xtype: 'numberfield',
                 allowBlank:true,
                fieldLabel: 'Individual Participants Intervention period',
                name: 'intervention_period',
                minValue: 1
            }, {
                xtype: 'combo',
                name: 'intervention_duration',
                 allowBlank:true,
                fieldLabel: 'Intervention Duration Description',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setClinicalTrialCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                extraParams: {
                                    model_name: 'DurationDescription'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }]
        },


        {
            xtype: 'fieldcontainer',
            layout: 'column', columnWidth: 0.33,
           
            defaults: {
                labelAlign: 'top',
                columnWidth: 0.5,
            },
            items: [{
                xtype: 'numberfield',
                 allowBlank:false,
                fieldLabel: '<br>Study Duration',
                name: 'study_duration',
                minValue: 1
            },
            {
                xtype: 'combo',
                name: 'duration_desc',
                 allowBlank:false,
                fieldLabel: '<br>Duration Description ',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setClinicalTrialCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                extraParams: {
                                    model_name: 'DurationDescription'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }]
        }

         ]
    },



      {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'History of Previous and In-progress Trials',
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
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            columnWidth: 1,
            value:2,
            displayField: 'name',
            allowBlank:false,
            fieldLabel: 'Is there previous Clinical trials with this (or similar) medicines in Uganda?',
            name: 'is_clinicaltrialin_uganda',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 2){
                            var form = combo.up('form'),
                            clinicalin_otheruganda_sites = form.down('textarea[name=clinicalin_otheruganda_sites]');
                            clinicalin_otheruganda_sites.setVisible(false);
                            clinicalin_otheruganda_sites.allowBlank = true;
                            clinicalin_otheruganda_sites.validate();
                        }else{
                            var form = combo.up('form'),
                            clinicalin_otheruganda_sites = form.down('textarea[name=clinicalin_otheruganda_sites]');
                            clinicalin_otheruganda_sites.setVisible(true);
                            clinicalin_otheruganda_sites.allowBlank = true;
                            clinicalin_otheruganda_sites.validate();
                        }
                        
                    }
                   
                }
        },{
            xtype: 'textarea',
            columnWidth: 1,  
            hidden:true,
            grow: true, 
            growMax: 200, 
            allowBlank:true,
            fieldLabel:'If previous trials with this (or similar) medicines in Uganda, List the titles of previous trials with this (or similar) medicines in Uganda',
            name:'clinicalin_otheruganda_sites'
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            columnWidth: 1,
            value:2,
            allowBlank:false,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Is Clinical Trial conducted in Other Countries',
            name: 'is_clinicaltrialin_othercountry',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 2){
                            var form = combo.up('form'),
                            clinicalin_othercountries_sites = form.down('textarea[name=clinicalin_othercountries_sites]');
                            clinicalin_othercountries_sites.setVisible(false);
                            clinicalin_othercountries_sites.allowBlank = true;
                            clinicalin_othercountries_sites.validate();
                        }else{
                            var form = combo.up('form'),
                            clinicalin_othercountries_sites = form.down('textarea[name=clinicalin_othercountries_sites]');
                            clinicalin_othercountries_sites.setVisible(true);
                            clinicalin_othercountries_sites.allowBlank = true;
                            clinicalin_othercountries_sites.validate();
                        }
                        
                    }
                   
                }
        },
          {
            xtype: 'textarea',
            columnWidth: 1,
            hidden:true,
            grow: true, 
            growMax: 200, 
            allowBlank:true,
            name: 'clinicalin_othercountries_sites',
            fieldLabel:'Name other regulatory authorities to which the application to do this trial has been submitted and/or approved If applicable, details of and reasons for this trial having been halted at any stage.'
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            columnWidth: 1,
            value:2,
            allowBlank:false,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Is there previous Clinical trials with this (or similar) medicines in Other Countries?',
            name: 'is_prevclinicaltrialin_othercountry',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 2){
                            var form = combo.up('form'),
                            prevclinicalin_othercountries_sites = form.down('textarea[name=prevclinicalin_othercountries_sites]');
                            prevclinicalin_othercountries_sites.setVisible(false);
                            prevclinicalin_othercountries_sites.allowBlank = true;
                            prevclinicalin_othercountries_sites.validate();
                        }else{
                            var form = combo.up('form'),
                            prevclinicalin_othercountries_sites = form.down('textarea[name=prevclinicalin_othercountries_sites]');
                            prevclinicalin_othercountries_sites.setVisible(true);
                            prevclinicalin_othercountries_sites.allowBlank = true;
                            prevclinicalin_othercountries_sites.validate();
                        }
                        
                    }
                   
                }
        },
          {
            xtype: 'textarea',
            columnWidth: 1,
            hidden:true,
            grow: true, 
            growMax: 200, 
            allowBlank:true,
            name: 'prevclinicalin_othercountries_sites',
            fieldLabel:'List the titles of previous trials with this (or similar) medicines in other countries'
        }

        ]
    },


     {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Ethics Review',
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
                xtype: 'fieldcontainer',
                layout: 'column', columnWidth: 0.66,
               
                defaults: {
                    labelAlign: 'top',
                    columnWidth: 0.5,
                },
                items:[{
                    xtype: 'textfield',
                    fieldLabel: 'Ethical No{Clearance or Submission No)',
                    name: 'clearance_no'
                },{
                    xtype: 'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    valueField: 'id',
                    displayField: 'name',
                    allowBlank: true,
                    fieldLabel: 'Ethics Committee',
                    emptyText:'Select Ethics Committee',
                    name: 'ctrethics_committee_id',
                    listeners: {
                        beforerender: {
                            fn: 'setClinicalTrialCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_ctrethics_committees'
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
            fieldLabel: 'UNCST No',
            allowBlank:true,
            name: 'uncst_no',
          
        }


         ]
    },
     {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Trial Conduct Monitoring and Reports',
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
                xtype: 'textarea',
                allowBlank:false,
                grow: true, 
                growMax: 200, 
                fieldLabel: 'Describe the Safety and Monitoring Plan for each site',
                columnWidth: 1,
                name: 'safety_monitoring_plan'
            },{
                xtype: 'textarea',
                allowBlank:false,
                grow: true, 
                growMax: 200, 
                fieldLabel: 'Describe the system to be used to detect, record, assign causality and the actions for adverse events',
                columnWidth: 1,
                name: 'system_used'
            },{
                xtype: 'textarea',
                allowBlank:false,
                grow: true, 
                growMax: 200, 
                fieldLabel: 'Describe the actions to be taken following reports of Serious Adverse Events',
                columnWidth: 1,
                name: 'action_seriousadverse_event'
            },{
                xtype: 'textarea',
                allowBlank:false,
                grow: true, 
                growMax: 200, 
                fieldLabel: 'Describe the composition and remit of the Data Safety Monitoring Board or similar body.  Include conditions for Pause- or Stop- rules',
                columnWidth: 1,
                name: 'safety_monitoring_board'
            },
            {
                xtype: 'textarea',
                allowBlank:false,
                grow: true, 
                growMax: 200, 
                fieldLabel: 'Describe Data Management Process',
                columnWidth: 1,
                name: 'data_management_process'
            },{
                xtype: 'textarea',
                allowBlank:false,
                grow: true, 
                growMax: 200, 
                fieldLabel: 'When will Interim Reports be submitted?',
                columnWidth: 1,
                name: 'interim_report_date'
            },{
                xtype: 'datefield',
                fieldLabel: 'Final Report - Estimated due-date?',
                name: 'estimated_due_report_date',
                submitFormat: 'Y-m-d',
                format: 'd/m/Y',
                columnWidth: 1,
                allowBlank:false,
               altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s'
            }

            ]
       },

     {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Description of the Trial',
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
            xtype: 'textarea',
            columnWidth: 1,
            allowBlank:false,
            grow: true, 
            growMax: 200, 
            fieldLabel: 'Rationale of the Study',
            name: 'purpose_of_trial'
          },
            {
                xtype: 'textarea',
                allowBlank:false,
                grow: true, 
                growMax: 200, 
                fieldLabel: 'Study Design',
                columnWidth: 1,
                name: 'trial_design'
            },{
            xtype: 'textarea',
            columnWidth: 1,
            allowBlank:false,
            grow: true, 
            growMax: 200, 
            fieldLabel: 'Brief summary describing the background and objectives of trial',
            name: 'clinicaltrial_description'
        }, {
        xtype: 'textarea',
        columnWidth: 1,
        allowBlank:false,
        grow: true, 
        growMax: 200, 
        fieldLabel: 'Primary objectives:',
        name: 'clinicaltrialprimary_objective'
      }, {
        xtype: 'textarea',
        allowBlank:false,
        grow: true, 
        growMax: 200, 
        fieldLabel: 'Secondary objectives',
        columnWidth: 1,
        name: 'clinicaltrialsecondary_objective'
       },
       {
        xtype: 'textarea',
        allowBlank:true,
        grow: true, 
        growMax: 200, 
        fieldLabel: 'Exploratory/Tertiary Objective',
        columnWidth: 1,
        name: 'explorator_objective'
       }

        ]
       },


          {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Other Description of the Trial',
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
                    xtype:'fieldset',
                    columnWidth: 1,
                    title: 'Outcomes Measurements and Analysis',
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
                    xtype: 'textarea',
                    allowBlank:false,
                    grow: true, 
                    growMax: 200, 
                    fieldLabel: 'Primary endpoints',
                     columnWidth: 1,
                    name: 'primary_endpoints'
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Secondary endpoints', 
                    columnWidth: 1,
                    grow: true, 
                    growMax: 200, 
                    allowBlank:false,
                    name: 'secondary_endpoints'
                }, 
                {
                    xtype: 'textarea',
                    fieldLabel: 'Exploratory/Tertiary End Points', 
                    columnWidth: 1,
                    grow: true, 
                    growMax: 200, 
                    allowBlank:true,
                    name: 'tertiary_endpoints'
                } 
                 ]
                },
                 {
                    xtype:'fieldset',
                    columnWidth: 1,
                    title: 'Statistical measures',
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
                        xtype: 'textarea',
                        fieldLabel: 'Sample size, Trial power and Level of significance used',
                        columnWidth: 1,
                        grow: true, 
                        growMax: 200, 
                        allowBlank:true,
                        name: 'sample_size'
                    },{
                        xtype: 'textarea',
                        allowBlank:true,
                        grow: true, 
                        growMax: 200, 
                        fieldLabel: 'Planned analyses',
                        columnWidth: 1,
                        name: 'planned_analyses'
                    },{
                        xtype: 'textarea',
                        allowBlank:true,
                        grow: true, 
                        growMax: 200, 
                        fieldLabel: 'Analysis sets',
                        columnWidth: 1,
                        name: 'analysis_sets'
                    }
                        
                 ]
               },
              {
                xtype:'fieldset',
                columnWidth: 1,
                title: 'Participants Eligibility',
                collapsible: true,
                defaults: {
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
                xtype: 'textarea',
                fieldLabel: 'Inclusion criteria',
                columnWidth: 1,
                grow: true, 
                growMax: 200, 
                allowBlank:false,
                name: 'inclusion_criteria'
            },{
                xtype: 'textarea',
                allowBlank:false,
                grow: true, 
                growMax: 200, 
                fieldLabel: 'Exclusion criteria',
                columnWidth: 1,
                name: 'exclusion_criteria'
            }
            ]
           }
        ]
       },

      

        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            hidden:true,
            displayField: 'name',
             allowBlank:true,
            fieldLabel: 'Clinical Funding Sources',
            name: 'clincialtrialfunding_source_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clincialtrialfunding_sources'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
    
        {
            xtype: 'textfield',
            fieldLabel: 'Clinical Trial Registry Publication Url',
            columnWidth: 1,
            hidden:true,
            allowBlank:true,
            name: 'publication_url',
          
        }
    ]
});