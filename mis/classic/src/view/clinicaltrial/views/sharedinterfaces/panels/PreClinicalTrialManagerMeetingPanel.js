/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.PreClinicalTrialManagerMeetingPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'preclinicaltrialmanagermeetingpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Meeting Details',
            region: 'north',
            height: 170,
            xtype: 'meetingdetailsfrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'preclinicaltrialmanagermeetinggrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'preclinicaltrialappmoredetailswizard',
        },
        {
            title: 'Participants',
            xtype: 'tcmeetingparticipantsgrid',
            region: 'west',
            width: 400,
            collapsible: true,
            titleCollapse: true
        }
    ]
});



