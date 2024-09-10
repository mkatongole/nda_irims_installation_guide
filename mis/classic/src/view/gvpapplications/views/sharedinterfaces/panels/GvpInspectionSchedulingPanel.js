/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpInspectionSchedulingPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gvpinspectionschedulingpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'All Applications',
            region: 'north',
            height: 350,
            xtype: 'gvpinspectionschedulinggrid',
            collapsible: true,
            titleCollapse: true
        },
        {
            title: 'Physical Inspections',
            xtype: 'gvpinspectionschedulingphysicalgrid',
            region: 'center'
        },
        {
            title: 'Desk Review & Virtual Inspections',
            xtype: 'gvpinspectionschedulingdeskreviewgrid',
            region: 'east',
            width: '50%',
            collapsible: true,
            titleCollapse: true
        }
    ]
});