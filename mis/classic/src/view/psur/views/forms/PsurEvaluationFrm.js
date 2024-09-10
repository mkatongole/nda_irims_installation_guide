Ext.define('Admin.view.psur.views.forms.PsurEvaluationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'psurEvaluationFrm',
    controller: 'psurVctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        margin: 5,
        allowBlank: true,
        labelWidth: '100%', 
        labelAlign: 'top'
    },
    scrollable: true,
    autoScroll: true,
     items: [
        {
          xtype: 'hiddenfield',
          name: 'assessment_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        }, 
          {
            xtype:'fieldset',
            columnWidth: 1,
            isnotlinelisting:1,
            title: 'Estimated exposure and use patterns',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                margin: '5', 
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[                           
                 {
                    xtype: 'htmleditor',
                    fieldLabel: 'Comment on the adequacy and reliability of the methods used to calculate/estimate the product exposure indices',
                    name: 'reliability_of_methods_used_tocalculate_product_exposure',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,
                },

                  {
                    xtype: 'htmleditor',
                    name: 'rc_reliability_of_methods_used_tocalculate_product_exposure',
                    fieldLabel: "Reviewer's Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    resizable: false,

                  },

                  
                  {
                    xtype: 'htmleditor',
                    name: 'cumulative_exposure_adverse_event_trends',
                    fieldLabel: 'Comment on the cumulative, and interval exposure trends relative to adverse event trends. Increase in adverse events with a decreasing or unchanged exposure may be a reason for concern and discussion of probable causes for this.',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_cumulative_exposure_adverse_event_trends',
                    fieldLabel: "Reviewer's Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },  
                  {
                    xtype: 'htmleditor',
                    name: 'exposure_adverse_event_patterns',
                    fieldLabel: 'comment on the exposure-adverse event patterns in special groups and any impression on possible increased event in any particular groups',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_exposure_adverse_event_patterns',
                    fieldLabel: "Reviewer's Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                   {
                    xtype: 'htmleditor',
                    name: 'estimated_exposure_additional_comments',
                    fieldLabel: 'Additional comments',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_estimated_exposure_additional_comments',
                    fieldLabel: "Reviewer's Additional Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  }

        ]
        },{
            xtype:'fieldset',
            columnWidth: 1,
            isnotlinelisting:1,
            title: 'Summary of significant findings from clinical trials in the reporting interval',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                isnotlinelisting:1,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                
                {
                    xtype: 'htmleditor',
                    name: 'safety_efficacy_findings',
                    fieldLabel: 'Comment on the emerging safety and efficacy findings from clinical trials that are not consistent with previous knowledge or labeling. Evaluate the evidence for these being potential risks, information reported that can facilitate characterization, pointing out any missing critical information. Also verify that all potential risks from clinical trials are included in the overview of signals',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_safety_efficacy_findings',
                    fieldLabel: "Reviewer's Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'clinical_trial_significant_additional_comment',
                    fieldLabel: 'Additional comments',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comment_estimated_exposure_comments',
                    fieldLabel: "Reviewer's Additional Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  }
        ]
        },

        {
            xtype:'fieldset',
            columnWidth: 1,
            isnotlinelisting:1,
            title: 'Overview of signals',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                isnotlinelisting:1,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
          
                {
                    xtype: 'htmleditor',
                    name: 'adequacy_signal_evaluation',
                    fieldLabel: 'Evaluate and comment on the adequacy of the signal evaluation, the basis upon which the signal was either refuted or considered to be a potential or identified risk by the marketing authorisation holder. The evaluations should adequately explore all possible sources of information (literature, other regulatory bodies, spontaneous reports, registries, etc.). Any omissions that the officer considers critical to the evaluation should be pointed out',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_adequacy_signal_evaluation',
                    fieldLabel: "Reviewer's Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'identified_risk_mah',
                    fieldLabel: 'For signals considered to be a potential or identified risk by the marketing authorisation holder, a comment on the adequacy of the risk minimization strategies proposed by the MAH should be made. Such measures should be applicable in Uganda`s health system and have capacity to mitigate the risk.',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_identified_risk_mah',
                    fieldLabel: "Reviewer's Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'signal_overview_additional_comment',
                    fieldLabel: 'Additional comments',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_signal_overview_additional_comment',
                    fieldLabel: "Reviewer's Additional Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,
                  },
        ]
        },

      {
            xtype:'fieldset',
            columnWidth: 1,
            isnotlinelisting:1,
            title: 'Benefit evaluation',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                
                {
                    xtype: 'htmleditor',
                    name: 'important_baseline_efficacy',
                    fieldLabel: 'Comment on any new positive benefit (efficacy and effectiveness) information in the authorised indications reported by the MAH. comment on the MAH`s reported evidence for and limitations against the benefits, and the reliability of the MAH`s conclusions.',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_important_baseline_efficacy',
                    fieldLabel: "Reviewer's Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                
                  {
                    xtype: 'htmleditor',
                    name: 'benefit_evaluation_additional_comment',
                    fieldLabel: 'Additional comments',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_benefit_evaluation_additional_comment',
                    fieldLabel: "Reviewer's Additional Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },

        ]
        },

          {
            xtype:'fieldset',
            columnWidth: 1,
            isnotlinelisting:1,
            title: 'Benefit-risk evaluation',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                {
                    xtype: 'htmleditor',
                    name: 'appraisal_current_benefit_risk',
                    fieldLabel: ' Comment on the MAH`s overall appraisal of the current benefit and risk of the medicinal product as used in clinical practice. This should be succinct, and in line with the risks and benefits presented. Any omissions, over bearings, or liberties taken in the MAH`s appraisal of the risk-benefit should be highlighted. ',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                   {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_appraisal_current_benefit_risk',
                    fieldLabel: "Reviewer's Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                
                  {
                    xtype: 'htmleditor',
                    name: 'benefit_risk_additional_comment',
                    fieldLabel: 'Additional comments',
                    columnWidth: 1,
                    category:1,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },
                  {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_benefit_risk_additional_comment',
                    fieldLabel: "Reviewer's Additional Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    labelAlign: 'top',  
                    labelStyle: 'white-space: normal;', 
                    resizable: false,

                  },

        ]
        },



         {
          xtype:'fieldset',
          columnWidth: 1,
          isnotlinelisting:1,
          title: 'Evaluation summary, conclusion and recommendation',
          collapsible: true,
          defaults: {
              labelAlign: 'top',
              allowBlank: true,
              labelAlign: 'top',
              margin: 5,
              xtype: 'textfield',
              columnWidth: 1,
          },
          layout: 'column',
          items :[
            
              {
                  xtype: 'htmleditor',
                  name: 'overall_conclusion',
                  fieldLabel: 'State in brief your considered technical opinion of the product`s safety and efficacy profile and recommend any action points to be communicated to the MAH or to be taken by NDA and any other stakeholders. Comment on whether the report is in agreement with the current local safety impression as per reporting in Uganda or divergent. Suggest any plausible causes of any divergences and measures to reconcile the two safety pictures. ',
                  columnWidth: 1,
                  category:1,
                  labelAlign: 'top',  
                  labelStyle: 'white-space: normal;', 
                  resizable: false,

                 },
                 {
                    xtype: 'htmleditor',
                    name: 'reviewers_comments_overall_conclusion',
                    fieldLabel: "Reviewer's Comments <span style='font-size: 9px; color: blue;'> NOTE: To be filled by Reviewer</span></span>",
                    columnWidth: 1,
                    category:2,
                    resizable: false,

                  },

        ]
        },
        {
          xtype: 'htmleditor',
          name: 'draft_response',
          fieldLabel: 'Draft Feedback',
          columnWidth: 1,
          category:1,
          labelAlign: 'top',  
          labelStyle: 'white-space: normal;', 
          resizable: false,

        }, 
       
       {
          xtype: 'htmleditor',
          name: 'reviewers_draft_response',
          fieldLabel: "Reviewer's Draft Feedback <span style='font-size: 9px; color: blue;'> NOTE: Reviewer required to draft his/her Draft Response</span></span>",
          columnWidth: 1,
          category:2,
          resizable: false,
        },

        {
          xtype: 'htmleditor',
          name: 'reviewers_final_response',
          fieldLabel: "Final Feedback<span style='font-size: 9px; color: blue;'> NOTE: Final Response by Manager</span></span>",
          columnWidth: 1,
          category:3,
          resizable: false,
        },
     
    ],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Details',
                iconCls: 'x-fa fa-save',
                action: 'save',
                name:'save_btn',
                table_name: 'tra_psur_evaluation_details',
                storeID: 'psurAssessmentStr',
                formBind: true,
                ui: 'soft-blue',
                action_url: 'psur/onSavePsurAssessmentDetails',
                handler: 'savepsurAssessmentdetails'
            }
        ]
    }
    ]
});