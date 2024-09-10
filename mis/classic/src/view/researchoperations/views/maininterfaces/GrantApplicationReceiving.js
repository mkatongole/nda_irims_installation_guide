/**
 * Created by Jeff on 4/04/2024.
 */
Ext.define('Admin.view.research_operations.views.maininterfaces.GrantApplicationReceiving', {
    extend: 'Admin.view.research_operations.views.sharedinterfaces.GrantApplication',
    xtype: 'grantapplicationreceivingmaininterface',

    items: [
        {
            xtype: 'grantapplicationgrid'
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