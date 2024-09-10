
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.RenewalSIAPremiseReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.renewalsiapremisereceivingwizard',
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
            xtype: 'onlinesiapremisedetailstabpnl',
            tbar:[ {
                xtype: 'button',
                iconCls: 'x-fa fa-search',
                tooltip: 'Search',
                text: 'Search Licence Application',
                action: 'searchNewDrugShop',
                name: 'search_drugshop',
                ui: 'soft-red',
                childXtype: 'newsiapremiseselectiongrid',
                winTitle: 'Applications due for Renewal Selection List',
                winWidth: '90%',
                margin: '30 0 0 0'
            }]
            
        },
         {
            xtype: 'applicationapplicantpnl'
        },
        {
            xtype: 'premregappdocuploadsgenericgrid'
        }
        ,
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
                    enableToggle: true,iconAlign: 'top',
                    text: 'PREMISE DETAILS',
                    wizard_pnl : 'renewalsiapremisereceivingwizard',
                    action: 'quickNav'
                },{
                    step: 1,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,iconAlign: 'top',
                    wizard_pnl : 'renewalsiapremisereceivingwizard',
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,iconAlign: 'top',
                    text: 'DOCUMENT UPLOADS',
                    wizard_pnl : 'renewalsiapremisereceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-money-bill-wave',
                    enableToggle: true,iconAlign:'top',
                    text: 'INVOICE & PAYMENT DETAILS',
                    wizard_pnl : 'renewalsiapremisereceivingwizard',
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
                    wizard_pnl : 'renewalsiapremisereceivingwizard',
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
                    wizard_pnl : 'renewalsiapremisereceivingwizard',
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
