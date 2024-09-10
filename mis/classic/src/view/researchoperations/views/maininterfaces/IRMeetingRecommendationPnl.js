/**
 * Created by Jeff on 3/11/2024.
 */
Ext.define('Admin.view.research_operations.views.maininterfaces.IRMeetingRecommendationPnl', {
    extend: 'Admin.view.research_operations.views.sharedinterfaces.ResearchInnovationReceiving',
    xtype: 'irmeetingrecommendationpnl',
    items: [
      {
          xtype: 'irmeetingschedulingpnl'
      },
  ]
});