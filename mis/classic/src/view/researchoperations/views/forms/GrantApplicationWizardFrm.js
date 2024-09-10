
Ext.define('Admin.view.research_operations.views.forms.GrantApplicationWizardFrm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.grantapplicationwizardfrm',
    padding: '2 0 2 0',
    
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    //title: 'Grant Application Form',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
  

    autoScroll: true,

    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'grantapplicationbasicinfofrm',
            itemId: 'grantapplicationbasicinfofrm'
        },
        {
            xtype: 'unstructureddocumentuploadsgrid'
        },
        {
            xtype: 'hiddenfield',
            name: 'active_personnel_id'
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
                    iconCls: 'fa fa-trophy',
                    pressed: true,
                    enableToggle: true,
                    text: 'Grant Application Info',
                    action: 'quickNav',
                    handler: 'quickNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Document Uploads',
                    action: 'quickNav',
                    handler: 'quickNavigation'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Home',
                    iconCls: 'x-fa fa-backward',
                    action: 'back',
                    currentPnlXtype: 'grantapplicationaddnewpnl',
                    containerPnlXtype: 'grantapplicationpnl',
                    hiddenCompXtype: 'grantapplicationgrid',
                    containerType: 'grantapplicationpnl',
                    ui: 'soft-purple',
                    handler: 'researchBackToDashboardFromActive'
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    formBind: true,
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    action: 'next_user_card',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save/Update Grant Information',
                    iconCls: 'x-fa fa-save',
                    action: 'save-grant',
                    ui: 'soft-purple',
                },
                {
                    text: 'Deactivate Grant',
                    iconCls: 'x-fa fa-lock',
                    action: 'deactivate',
                    ui: 'soft-red',
                    hidden: true,
                    handler: 'deactivateGrant'
                },
                 {
                    text: 'Activate Grant',
                    iconCls: 'x-fa fa-lock',
                    action: 'activate',
                    ui: 'soft-blue',
                    hidden: true,
                    handler: 'activateGrant'
                },
                {
                    text: 'Delete',
                    hidden: true,
                    iconCls: 'x-fa fa-trash',
                    action: 'delete',
                    ui: 'soft-red',
                    handler: 'deleteGrant'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    formBind: true,
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    action: 'next_user_card',
                    handler: 'onGrantAppNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }

});
