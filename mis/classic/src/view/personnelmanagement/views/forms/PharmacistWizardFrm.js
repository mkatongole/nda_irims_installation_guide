
Ext.define('Admin.view.usermanagement.views.forms.PharmacistWizardFrm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacistwizardfrm',
    padding: '2 0 2 0',
    
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],

    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
  

    autoScroll: true,

    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'pharmacistbasicinfofrm',
            itemId: 'pharmacistbasicinfofrm'
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
                    handler: 'quickPharmacistNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav',
                    handler: 'quickPharmacistNavigation'
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
                    currentPnlXtype: 'pharmacistpanel',
                    containerPnlXtype: 'premisepharmacistpanel',
                    hiddenCompXtype: 'premisepharmacistgrid',
                    containerType: 'pharmacistpanel',
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
                    handler: 'onPharmacistPrevCardClick'
                },
                {
                    text: 'Save/Update Personnel Information',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    ui: 'soft-purple',
                    handler: 'savePharmacistInformation'
                },
                {
                    text: 'Deactivate',
                    iconCls: 'x-fa fa-lock',
                    action: 'block',
                    ui: 'soft-red',
                    hidden: true,
                    handler: 'deactivateSystemPharmacistPersonnel'
                },
                 {
                    text: 'Activate',
                    iconCls: 'x-fa fa-lock',
                    action: 'activate',
                    ui: 'soft-blue',
                    hidden: true,
                    handler: 'activateSystemPharmacistPersonnel'
                },
                {
                    text: 'Delete',
                    hidden: true,
                    iconCls: 'x-fa fa-trash',
                    action: 'delete',
                    ui: 'soft-red',
                    handler: 'deleteSystemPhrmacistPersonnel'
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
                    handler: 'onPharmacistNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }

});
