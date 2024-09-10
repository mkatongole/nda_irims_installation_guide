Ext.define('Admin.view.research_operations.views.forms.ResearchAppDetailsDisplay', {
    extend: 'Ext.panel.Panel',
    xtype: 'researchappdetailsdisplay',
    layout: 'column',
    autoScroll: true,
    bodyPadding: 5,
    defaults: {
    columnWidth: 1,
    margin: 5
    },
    tpl: [
    '<div class="details-container">',
    '<h2>Research Application Details</h2>',
    '<p><strong>Type of Research:</strong> {research_type_name}</p>',
    '<p><strong>Aim of the Research:</strong> {aim_research}</p>',
    '<p><strong>Purpose of the Research Project:</strong> {research_purpose}</p>',
    '<p><strong>Primary Investigator or Project Lead:</strong> {project_lead}</p>',
    '<p><strong>Expected Duration (in months):</strong> {project_duration}</p>',
    '<p><strong>Key Objectives of the Research Project:</strong> {research_objectives}</p>',
    '<p><strong>Methods of Research:</strong> {research_methods}</p>',
    '<p><strong>Type of Meetings:</strong> {meeting_types_name}</p>',
    '<p><strong>Start Time of the Event:</strong> {exhibition_start_time}</p>',
    '<p><strong>End Time of the Event:</strong> {exhibition_end_time}</p>',
    '<p><strong>Description:</strong> {description_language}</p>',
    '</div>'
    ],
    data: {
        research_type_name: 'Quantitative',
        aim_research: 'To explore the effect of X on Y',
    } 
    
    });
    
    // Usage example:
    // Assuming you have a record with the form data