/**
 * Created by Jeff on 14/2/2024.
 */
Ext.define('Admin.view.research_operations.views.maininterfaces.ResearchInnovationReceiving', {
    extend: 'Admin.view.research_operations.views.sharedinterfaces.ResearchInnovationReceiving',
    xtype: 'researchinnovationreceivingmaininterface',

    items: [
        {
            xtype: 'researchinnovationmeetingschedulingpnl'
        }
    ]
});