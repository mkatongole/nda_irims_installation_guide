/**
 * Created by Jeff on 3/11/2024.
 */
Ext.define('Admin.view.research_operations.views.maininterfaces.ResearchInnovationReviewMeetingRecommendation', {
    extend: 'Admin.view.research_operations.views.sharedinterfaces.ResearchInnovationReceiving',
    xtype: 'researchinnovationreviewmeetingrecommendation',


    items: [
      {
          xtype: 'researchinnovationreviewmeetingrecommendationpnl'
      },
      // {
      //     xtype: 'hiddenfield',
      //     name: 'workflow_stage_id',
      //     value: 1462
      // },
      // {
      //     xtype: 'hiddenfield',
      //     name: 'process_id',
      //     value: 280
      // }
  ]
});