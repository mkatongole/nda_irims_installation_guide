
Ext.define('Admin.view.usermanagement.views.forms.PvPersonnelWizardFrm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pvpersonnelwizardfrm',
    padding: '2 0 2 0',
    
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],

    layout: 'card',
    flex: 1,
  

    autoScroll: true,

    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'pvpersonnelbasicinfofrm',
            itemId: 'pvpersonnelbasicinfofrm'
        },
        {
            xtype: 'personneldocuploadsgenericgrid'
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
                    iconCls: 'fa fa-user',
                    pressed: true,
                    enableToggle: true,
                    text: 'BASIC PERSONNELS INFO',
                    action: 'quickNav',
                    handler: 'quickPvNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav',
                    handler: 'quickPvNavigation'
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
                    currentPnlXtype: 'pvstaffpnl',
                    containerPnlXtype: 'pvpersonnelpnl',
                    hiddenCompXtype: 'pvpersonnelgrid',
                    containerType: 'pvstaffpnl',
                    ui: 'soft-purple',
                    handler: 'personnelBackToDashboardFromActive'
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
                    handler: 'onPrePrevCardClick'
                },
                {
                    text: 'Save/Update PV staff Information',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    ui: 'soft-purple',
                    handler: 'savePvPersonnelInformation'
                },
                {
                    text: 'Deactivate',
                    iconCls: 'x-fa fa-lock',
                    action: 'block',
                    ui: 'soft-red',
                    hidden: true,
                    handler: 'deactivateSystemPvPersonnel'
                },
                 {
                    text: 'Activate',
                    iconCls: 'x-fa fa-lock',
                    action: 'activate',
                    ui: 'soft-blue',
                    hidden: true,
                    handler: 'activateSystemPvPersonnel'
                },
                {
                    text: 'Delete',
                    hidden: true,
                    iconCls: 'x-fa fa-trash',
                    action: 'delete',
                    ui: 'soft-red',
                    handler: 'deleteSystemPvPersonnel'
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
                    handler: 'onNextPvCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }

});
