/**
 * Created by Jeff on 14/2/2024.
 */

Ext.define('Admin.view.research_operations.views.panels.ResearchInnovationReviewMeetingRecommendationPnl', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.researchinnovationreviewmeetingrecommendationpnl',
    xtype: 'researchinnovationreviewmeetingrecommendationpnl',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Meeting Details',
            region: 'north',
            height: 170,
            collapsible: true,
            xtype: 'meetingdetailsfrm',

        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'researchinnovationthematicgrid'

        },
        {
            xtype: 'panel',
            layout:'accordion', region: 'west',
            width: 400,
            collapsible: true,
            collapsed: false,
            titleCollapse: true,
            title:'Meeting Participants & Agendas',
            layout: {
                type: 'accordion',
                titleCollapse: false,
                animate: true,
                activeOnTop: true
            },
            items:[{
                title: 'Participants',
                xtype: 'tcmeetingparticipantsgrid',
                region: 'west',
                width: 400,
                collapsible: true,
                titleCollapse: true
            },{
                xtype: 'tcmeetingagendasgrid',
                title:'Agendas',
                 listeners: {
                    afterrender: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    }
                },
                tbar: [
                    {
                        xtype: 'hiddenfield',
                        name: 'isReadOnly'
                    },
                    {
                        xtype: 'button',
                        text: 'Add',
                        name: 'add_agendas',
                        iconCls: 'x-fa fa-plus',
                        ui: 'soft-green',
                        handler: 'showAddTcMeetingParticipants',
                        childXtype: 'tcmeetingagendasfrm',
                        storeId: 'tcmeetingagendasfrm',
                        winTitle: 'Meeting Agendas',
                        winWidth: '50%',
                        stores: '[]'
                    }
                ],
            }]

        }
        
    ]
});
