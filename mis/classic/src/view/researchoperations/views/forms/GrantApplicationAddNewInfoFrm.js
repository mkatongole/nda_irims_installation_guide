
Ext.define('Admin.view.research_operations.views.forms.GrantApplicationAddNewInfoFrm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.grantapplicationaddnewinfofrm',
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
                    iconCls: 'fa fa-user',
                    pressed: true,
                    enableToggle: true,
                    text: 'BASIC PERSONNELS INFO',
                    action: 'quickNav',
                    handler: 'quickNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
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
                    currentPnlXtype: 'grantapplicationpnl',
                    containerPnlXtype: 'drugshopinchargespnl',
                    hiddenCompXtype: 'drugshopinchargesgrid',
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
                    text: 'Save/Update Incharge Information',
                    iconCls: 'x-fa fa-save',
                    action: 'save-grant',
                    ui: 'soft-purple',
                    handler: 'saveGrantApplicationInformation'
                },
                {
                    text: 'Deactivate',
                    iconCls: 'x-fa fa-lock',
                    action: 'block',
                    ui: 'soft-red',
                    hidden: true,
                    handler: 'deactivateSystemPersonnel'
                },
                 {
                    text: 'Activate',
                    iconCls: 'x-fa fa-lock',
                    action: 'activate',
                    ui: 'soft-blue',
                    hidden: true,
                    handler: 'activateSystemPersonnel'
                },
                {
                    text: 'Delete',
                    hidden: true,
                    iconCls: 'x-fa fa-trash',
                    action: 'delete',
                    ui: 'soft-red',
                    handler: 'deleteSystemPersonnel'
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
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }

});
