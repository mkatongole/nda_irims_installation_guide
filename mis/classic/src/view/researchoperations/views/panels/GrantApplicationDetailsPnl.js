Ext.define('Admin.view.research_operations.views.panels.GrantApplicationDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'grantapplicationdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'researchoperationsvm'
    },
    // listeners: {
    //     tabchange: 'funcActiveImportOtherInformationTab'
    // },
    items: [{
            xtype: 'grantapplicationbasicinfofrm',
            autoScroll: true, 
            title: 'Grant Details'
           },
           {
            title: 'Project Title and Summary'
           },
           {
            title: 'Project Details',
           },
           {
            title: 'Budget and Financial Information',
           }, 
           {
            title: 'Partnerships and Collaborations',
           },
           {
            title: 'Compliance and Regulatory Information',
           }, 
           {
            title: 'Impact and Evaluation',
           },
           {
            title: 'Upload Supporting documents',
           },             
        {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
        }
]
});
