/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialOnlinePreviewWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.clinicaltrialonlinepreviewwizard',
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    name: 'wizardPanel',
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
            xtype: 'clinicaltrialapplicantpnl'
        },
        {
            xtype: 'clinicaltrialsdetailspnl'
        },
        {
            xtype: 'onlineclinicaltrialstudysitesgrid'
        },
        {
            xtype:'tabpanel',
            //layout: 'fit',
            items:[{
                xtype: 'onlineclinicaltrialotherinvestigatorsgrid',
                title:'CO-/SUB INVESTIGATORS'
            },{
                xtype: 'onlineclinicaltrialmonitorsgrid',
                title:' MONITORS'
            },{
                xtype: 'clinicaltrialmonitorsgrid',
                title: 'Other Trial Staff(s)'
            }]
        },
          {
            
            xtype: 'tabpanel',
           // title:'Clinical Trial Products',
            layout: 'accordion',
            items:[{
                xtype: 'impproductsgrid',
                title:'Clinical Trial Investigational Products'
            },{
                xtype: 'impProductshandlinggrid',
                title: 'Details of Handling Trial'
            },{
                xtype: 'clinicalcomparatorproductsgrid',
                title:'Clinical Trial Comparator Products'
            },{
                xtype: 'clinicalcomparatorproductsgrid',
                title:'Dose Toxicity Details(Mandatory Study Phase IV)'
            }]
        },
        {
            xtype: 'clinicaltrialonlinedocuploadsgenericgrid'
        },
        {
            xtype: 'clinicaltrialonlinescreeninggrid'
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
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: '<span style="font-size: 9px;"><b>APPLICANT DETAILS</b></span>', 
                    //text: 'APPLICANT DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: '<span style="font-size: 9px;"><b>CLINICAL TRIAL DETAILS</b></span>', 
                    //text: 'CLINICAL TRIAL DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineDetails'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: '<span style="font-size: 9px;"><b>STUDY SITES</b></span>', 
                   // text: 'STUDY SITES',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineDetails'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-plus-square',
                    enableToggle: true,
                    text: '<span style="font-size: 9px;"><b>OTHER INVESTIGATORS</b></span>', 
                    //text: 'CO-/SUB INVESTIGATORS & MONITORS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineDetails'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: '<span style="font-size: 9px;"><b>PRODUCTS & NON CLINICAL DETAILS</b></span>', 
                    //text: 'PRODUCTS & NON CLINICAL DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineDetails'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: '<span style="font-size: 9px;"><b>DOCUMENTS</b></span>', 
                    //text: 'DOCUMENT UPLOADS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineDetails'
                },
                {
                    step: 6,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: '<span style="font-size: 9px;"><b>PRE-CHECKING</b></span>', 
                    //text: 'PRE-CHECKING',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineDetails'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            name: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    name: 'prev_btn',
                    handler: 'onPrevCardClickOnlineDetails'
                },
                {
                    text: 'Preview Queries/Responses',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'x-fa fa-bars',
                    name: 'preview_queries_btn'
                },
               
                {
                    text: 'Query Application',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'x-fa fa-sliders',
                    name: 'query_btn',
                    handler: 'queryOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                {
                    text: 'Reject Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-down',
                    name: 'reject_btn',
                    handler: 'submitRejectedOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                '->',
                {
                    text: 'Save Pre-Checking Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    disabled: true
                }, {
                    text: 'Receive Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-up',
                    hidden: true,
                    name: 'receive_btn',
                    handler: 'receiveOnlineApplicationDetailsFrmBtn',
                    storeID: 'onlineclinicaltrialstr',
                    winWidth: '50%',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },{
                    text: 'Receive & Invoice Application',
                    ui: 'soft-purple',
                    iconCls: 'fa  fa-print',
                    winWidth: '50%',hidden: true,
                    storeID: 'onlineproductregistrationstr',
                    winWidth: '30%',
                    name: 'receive_invoicebtn'
                }, {
                    text: 'Print Invoice',
                    ui: 'soft-purple',
                    name: 'print_invoice',hidden: true,
                    iconCls: 'fa fa-print',
                    report_type: 'Invoice'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-check',
                    name: 'submit_btn',
                    storeID: 'onlineclinicaltrialstr',
                    winWidth: '50%',
                    bind: {
                        disabled: '{!atEnd}'
                    }
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
                    name: 'next_btn',
                    handler: 'onNextCardClickOnlineDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
