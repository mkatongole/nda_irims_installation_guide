
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewPremiseReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newpremisereceivingwizard',
    viewModel: 'premiseregistrationvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',
    items: [
        
        {
            xtype: 'premisedetailstabpnl',
            tbar:[ {
                xtype: 'button',
                iconCls: 'x-fa fa-search',
                tooltip: 'Search',
                text: 'Search Pre Inspection Application',
                action: 'searchPreInspectionPremise',
                name: 'search_PreInspection_Premise',
                ui: 'soft-red',
                childXtype: 'preinspectionpremiseselectiongrid',
                winTitle: 'Pre Inspection Selection List',
                winWidth: '90%',
                margin: '30 0 0 0'
            }]
            
        },

        {
            xtype: 'applicationapplicantpnl'
        },
        {
            xtype: 'premregappdocuploadsgenericgrid'
        },
        {
            xtype: 'appinvoicepaymentspanel'
        }
    ],

    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    iconAlign: 'top',
                    text: 'PREMISE DETAILS',
                    wizard_pnl : 'newpremisereceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    iconAlign: 'top',
                    wizard_pnl : 'newpremisereceivingwizard',
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    iconAlign: 'top',
                    text: 'DOCUMENT UPLOADS',
                    wizard_pnl : 'newpremisereceivingwizard',
                    action: 'quickNav'
                },
                {
                           step: 3,
                           iconCls: 'fa fa-money-bill-wave',
                           enableToggle: true,
                           iconAlign:'top',
                           text: 'Invoice & Payment Details',
                           wizard_pnl : 'newpremisereceivingwizard',
                           action: 'quickNav'
                       }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard_pnl : 'newpremisereceivingwizard',
                    name: 'prev_btn'
                },
                {
                    xtype: 'transitionsbtn'
                },
                {
                    xtype: 'applicationdismissalbtn'
                },
                {
                    text: 'Queries/Responses',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-gavel',
                    name: 'queries_responses',
                    hidden: true
                },
                {
                    xtype: 'button',
                    text: 'Queries',
                    name: 'manager_query',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-gavel',
                    winWidth: '80%',
                    hidden: true,
                    childXtype: 'allqueriesgrid',
                    winTitle: 'Application Queries'
                },
                {
                    xtype: 'button',
                    text: 'Query Responses',
                    ui: 'soft-purple',
                    name: 'manager_queryresp',
                    iconCls: 'fa fa-gavel',
                    hidden: true,
                    winWidth: '80%',
                    childXtype: 'allqueryresponsesgrid',
                    winTitle: 'Application Queries'
                },
                '->',
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1
                },
                
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    wizard_pnl : 'newpremisereceivingwizard',
                    name: 'next_btn'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    hidden: true,
                    name: 'process_submission_btn',
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%'
                }
            ]
        };
        me.callParent(arguments);
    }
});
